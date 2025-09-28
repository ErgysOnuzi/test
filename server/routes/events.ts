import express from 'express'
import { inMemoryStorage } from '../inMemoryStorage'

const router = express.Router()

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const events = inMemoryStorage.getAllEvents()
    console.log(`🎉 Fetched ${events.length} events`)
    res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// GET /api/events/:id - Get specific event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const event = inMemoryStorage.getEventById(parseInt(id))
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return res.status(500).json({ error: 'Failed to fetch event' })
  }
})

// POST /api/events - Create new event
router.post('/', async (req, res) => {
  try {
    const {
      title_de,
      title_en,
      description_de = '',
      description_en = '',
      event_date,
      price = 0,
      max_attendees = 10,
      current_attendees = 0
    } = req.body

    if (!title_de || !title_en || !event_date) {
      return res.status(400).json({ error: 'German title, English title, and event date are required' })
    }

    const newEvent = inMemoryStorage.createEvent({
      title_de,
      title_en,
      description_de,
      description_en,
      event_date,
      price: parseFloat(price),
      max_attendees: parseInt(max_attendees),
      current_attendees: parseInt(current_attendees),
      created_at: new Date().toISOString()
    })

    console.log(`🎉 Created event: ${newEvent.title_en}`)
    res.status(201).json(newEvent)
  } catch (error) {
    console.error('Error creating event:', error)
    return res.status(500).json({ error: 'Failed to create event' })
  }
})

// PUT /api/events/:id - Update event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedEvent = inMemoryStorage.updateEvent(parseInt(id), updateData)
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    console.log(`🎉 Updated event: ${updatedEvent.title_en}`)
    res.json(updatedEvent)
  } catch (error) {
    console.error('Error updating event:', error)
    return res.status(500).json({ error: 'Failed to update event' })
  }
})

// DELETE /api/events/:id - Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = inMemoryStorage.deleteEvent(parseInt(id))
    
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' })
    }

    console.log(`🎉 Deleted event ID: ${id}`)
    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return res.status(500).json({ error: 'Failed to delete event' })
  }
})

export default router