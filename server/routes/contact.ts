import express from 'express'
import { db } from '../db'
import * as schema from '../../shared/schema'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth } from './admin'

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
    res.status(201).json({ 
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
    res.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return res.status(500).json({ error: 'Failed to fetch contact submissions' })
  }
})

export default router