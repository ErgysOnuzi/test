import express from 'express'
import { inMemoryStorage } from '../inMemoryStorage'
import { validateFeedback, handleValidationErrors } from '../middleware/validation'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth, requireAuthWithCSRF } from './admin'

// GET /api/feedback - Get all feedback submissions (admin)
router.get('/', requireAuth, async (req, res) => {
  try {
    const feedback = inMemoryStorage.getAllFeedback()
    console.log(`⭐ Fetched ${feedback.length} feedback submissions`)
    res.json(feedback)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return res.status(500).json({ error: 'Failed to fetch feedback' })
  }
})

// GET /api/feedback/:id - Get specific feedback
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const feedback = inMemoryStorage.getFeedbackById(parseInt(id))
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' })
    }

    res.json(feedback)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return res.status(500).json({ error: 'Failed to fetch feedback' })
  }
})

// POST /api/feedback - Submit new feedback with validation
router.post('/', validateFeedback, handleValidationErrors, async (req, res) => {
  try {
    const {
      name,
      email,
      rating,
      experience,
      suggestions = ''
    } = req.body

    if (!name || !email || !rating || !experience) {
      return res.status(400).json({ error: 'Name, email, rating, and experience are required' })
    }

    const newFeedback = inMemoryStorage.createFeedback({
      name,
      email,
      rating: parseInt(rating),
      experience,
      suggestions,
      created_at: new Date().toISOString(),
      approved: false
    })

    console.log(`⭐ New feedback submitted: ${newFeedback.name} (${newFeedback.rating} stars)`)
    res.status(201).json({ 
      success: true, 
      feedback: newFeedback,
      message: 'Feedback submitted successfully'
    })
  } catch (error) {
    console.error('Error creating feedback:', error)
    return res.status(500).json({ error: 'Failed to submit feedback' })
  }
})

// PUT /api/feedback/:id - Update feedback (admin) with CSRF protection
router.put('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedFeedback = inMemoryStorage.updateFeedback(parseInt(id), updateData)
    
    if (!updatedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' })
    }

    console.log(`⭐ Updated feedback: ${updatedFeedback.name}`)
    res.json(updatedFeedback)
  } catch (error) {
    console.error('Error updating feedback:', error)
    return res.status(500).json({ error: 'Failed to update feedback' })
  }
})

// DELETE /api/feedback/:id - Delete feedback (admin) with CSRF protection
router.delete('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const success = inMemoryStorage.deleteFeedback(parseInt(id))
    
    if (!success) {
      return res.status(404).json({ error: 'Feedback not found' })
    }

    console.log(`⭐ Deleted feedback: ${id}`)
    res.json({ success: true, message: 'Feedback deleted successfully' })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    return res.status(500).json({ error: 'Failed to delete feedback' })
  }
})

// PATCH /api/feedback/:id/approve - Approve/reject feedback (admin) with CSRF protection
router.patch('/:id/approve', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const { approved } = req.body

    const updatedFeedback = inMemoryStorage.updateFeedback(parseInt(id), { approved: !!approved })
    
    if (!updatedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' })
    }

    console.log(`⭐ ${approved ? 'Approved' : 'Rejected'} feedback: ${updatedFeedback.name}`)
    res.json(updatedFeedback)
  } catch (error) {
    console.error('Error updating feedback approval:', error)
    return res.status(500).json({ error: 'Failed to update feedback approval' })
  }
})

export default router