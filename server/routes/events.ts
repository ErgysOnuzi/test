import express from 'express'
import { inMemoryStorage } from '../inMemoryStorage'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth, requireAuthWithCSRF } from './admin'

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const events = inMemoryStorage.getAllEvents()
    console.log(`🎉 Fetched ${events.length} events`)
    return res.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// GET /api/events/:id - Get specific event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const event = inMemoryStorage.getEventById(parseInt(id!))
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    return res.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return res.status(500).json({ error: 'Failed to fetch event' })
  }
})

// POST /api/events - Create new event
router.post('/', requireAuthWithCSRF, async (req, res) => {
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
    return res.status(201).json(newEvent)
  } catch (error) {
    console.error('Error creating event:', error)
    return res.status(500).json({ error: 'Failed to create event' })
  }
})

// PUT /api/events/:id - Update event
router.put('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedEvent = inMemoryStorage.updateEvent(parseInt(id!), updateData)
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    console.log(`🎉 Updated event: ${updatedEvent.title_en}`)
    return res.json(updatedEvent)
  } catch (error) {
    console.error('Error updating event:', error)
    return res.status(500).json({ error: 'Failed to update event' })
  }
})

// POST /api/events/:id/book - Book event (public endpoint)
router.post('/:id/book', async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, guests, specialRequests } = req.body

    // Validate required fields
    if (!name || !email || !phone || !guests) {
      return res.status(400).json({ error: 'Name, email, phone, and number of guests are required' })
    }

    // Get the event to check availability
    const event = inMemoryStorage.getEventById(parseInt(id!))
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Check availability
    const availableSpots = event.max_attendees - event.current_attendees
    if (guests > availableSpots) {
      return res.status(400).json({ 
        error: `Only ${availableSpots} spots available, but ${guests} requested` 
      })
    }

    // Create booking as PENDING - admin will confirm
    const booking = inMemoryStorage.createEventBooking({
      eventId: parseInt(id),
      name,
      email,
      phone,
      guests: parseInt(guests),
      specialRequests: specialRequests || '',
      totalAmount: event.price * parseInt(guests),
      status: 'pending',
      created_at: new Date().toISOString()
    })

    // DO NOT update event capacity yet - wait for admin confirmation
    // Capacity will be updated when admin confirms the booking

    console.log(`🎉 Event booking created: ${name} for ${guests} guests at ${event.title_en}`)
    
    return res.status(201).json({
      success: true,
      booking,
      message: 'Booking submitted successfully! Your reservation is pending confirmation by our staff. You will receive a confirmation email shortly.',
      status: 'pending'
    })
  } catch (error) {
    console.error('Error creating event booking:', error)
    return res.status(500).json({ error: 'Failed to create booking' })
  }
})

// DELETE /api/events/:id - Delete event
router.delete('/:id', requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params
    const deleted = inMemoryStorage.deleteEvent(parseInt(id!))
    
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' })
    }

    console.log(`🎉 Deleted event ID: ${id}`)
    return res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return res.status(500).json({ error: 'Failed to delete event' })
  }
})

export default router