import express from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import * as schema from '../../shared/schema'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth, requireAuthWithCSRF } from './admin'

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const [submission] = await db.insert(schema.contactMessages).values({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    }).returning()

    if (!submission) {
      return res.status(500).json({ error: 'Failed to create contact submission' })
    }

    console.log(`📧 New contact submission: ${submission.id}`)
    return res.status(201).json({ 
      success: true, 
      id: submission.id,
      message: 'Contact form submitted successfully'
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

// GET /api/contact - Get all contact submissions (admin)
router.get('/', requireAuth, async (req, res) => {
  try {
    const submissions = await db.select().from(schema.contactMessages)
    
    console.log(`📧 Fetched ${submissions.length} contact submissions`)
    return res.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return res.status(500).json({ error: 'Failed to fetch contact submissions' })
  }
})

// GET /api/contact/:id - Get specific contact submission (admin)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const [submission] = await db.select().from(schema.contactMessages)
      .where(eq(schema.contactMessages.id, parseInt(id)))
    
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found' })
    }

    return res.json(submission)
  } catch (error) {
    console.error('Error fetching contact submission:', error)
    return res.status(500).json({ error: 'Failed to fetch contact submission' })
  }
})

// PATCH /api/contact/:id/status - Update contact submission status (admin)
router.patch('/:id/status', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const { status, reply } = req.body // 'pending', 'read', 'replied', 'resolved'

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be: new, read, replied, or archived' })
    }

    const updateData: any = { status }
    if (reply !== undefined) updateData.reply = reply

    const [updated] = await db
      .update(schema.contactMessages)
      .set(updateData)
      .where(eq(schema.contactMessages.id, parseInt(id)))
      .returning()

    if (!updated) {
      return res.status(404).json({ error: 'Contact submission not found' })
    }

    console.log(`📧 Updated contact submission ${id}: ${status}`)
    return res.json({
      success: true,
      submission: updated,
      message: `Contact submission marked as ${status}`
    })
  } catch (error) {
    console.error('Error updating contact submission:', error)
    return res.status(500).json({ error: 'Failed to update contact submission' })
  }
})

// DELETE /api/contact/:id - Delete contact submission (admin)
router.delete('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    
    const [deleted] = await db
      .delete(schema.contactMessages)
      .where(eq(schema.contactMessages.id, parseInt(id)))
      .returning()

    if (!deleted) {
      return res.status(404).json({ error: 'Contact submission not found' })
    }

    console.log(`📧 Deleted contact submission: ${deleted.name} - ${deleted.subject}`)
    return res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return res.status(500).json({ error: 'Failed to delete contact submission' })
  }
})

export default router