import express from 'express'
import { db } from '../db'
import { events, eventBookings } from '../../shared/schema'
import { eq, desc } from 'drizzle-orm'
import { validateEventBooking, handleValidationErrors } from '../middleware/validation'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth, requireAuthWithCSRF } from './admin'

// Helper function to convert database event to API format
function eventToApiFormat(dbEvent: any) {
  return {
    id: dbEvent.id,
    title_de: dbEvent.titleDe || '',
    title_en: dbEvent.titleEn || '',
    description_de: dbEvent.descriptionDe || '',
    description_en: dbEvent.descriptionEn || '',
    event_date: dbEvent.date || '',
    price: dbEvent.price || 0,
    max_attendees: dbEvent.capacity || 10,
    current_attendees: dbEvent.currentBookings || 0,
    created_at: dbEvent.createdAt?.toISOString() || new Date().toISOString()
  }
}

// Helper function to convert API format to database format
function apiToDbFormat(apiData: any) {
  return {
    titleDe: apiData.title_de,
    titleEn: apiData.title_en,
    descriptionDe: apiData.description_de || '',
    descriptionEn: apiData.description_en || '',
    date: apiData.event_date,
    price: apiData.price,
    capacity: apiData.max_attendees,
    currentBookings: apiData.current_attendees || 0
  }
}

// Helper function to convert database booking to API format
function bookingToApiFormat(dbBooking: any) {
  return {
    id: dbBooking.id,
    eventId: dbBooking.eventId,
    name: dbBooking.name,
    email: dbBooking.email,
    phone: dbBooking.phone,
    guests: dbBooking.guests,
    specialRequests: dbBooking.specialRequests || '',
    totalAmount: dbBooking.totalPrice,
    status: dbBooking.status,
    created_at: dbBooking.createdAt?.toISOString() || new Date().toISOString()
  }
}

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const dbEvents = await db.select().from(events).orderBy(desc(events.createdAt))
    const apiEvents = dbEvents.map(eventToApiFormat)
    console.log(`🎉 Fetched ${apiEvents.length} events`)
    return res.json(apiEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    return res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// GET /api/events/:id - Get specific event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [dbEvent] = await db.select().from(events).where(eq(events.id, parseInt(id!)))
    
    if (!dbEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const apiEvent = eventToApiFormat(dbEvent)
    return res.json(apiEvent)
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

    const dbData = apiToDbFormat({
      title_de,
      title_en,
      description_de,
      description_en,
      event_date,
      price: parseFloat(price),
      max_attendees: parseInt(max_attendees),
      current_attendees: parseInt(current_attendees)
    })

    const [newDbEvent] = await db.insert(events).values(dbData).returning()
    const newEvent = eventToApiFormat(newDbEvent)

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

    // Check if event exists
    const [existingEvent] = await db.select().from(events).where(eq(events.id, parseInt(id!)))
    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Convert API format to database format for updating
    const dbUpdateData = apiToDbFormat(updateData)
    
    // Remove undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(dbUpdateData).filter(([, value]) => value !== undefined)
    )

    const [updatedDbEvent] = await db
      .update(events)
      .set({ ...cleanedData, updatedAt: new Date() })
      .where(eq(events.id, parseInt(id!)))
      .returning()

    const updatedEvent = eventToApiFormat(updatedDbEvent)
    console.log(`🎉 Updated event: ${updatedEvent.title_en}`)
    return res.json(updatedEvent)
  } catch (error) {
    console.error('Error updating event:', error)
    return res.status(500).json({ error: 'Failed to update event' })
  }
})

// POST /api/events/:id/book - Book event with validation
router.post('/:id/book', validateEventBooking, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone, guests, specialRequests } = req.body

    // Validate required fields
    if (!name || !email || !phone || !guests) {
      return res.status(400).json({ error: 'Name, email, phone, and number of guests are required' })
    }

    // Get the event to check availability
    const [event] = await db.select().from(events).where(eq(events.id, parseInt(id!)))
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Check availability
    const availableSpots = (event.capacity || 10) - (event.currentBookings || 0)
    if (guests > availableSpots) {
      return res.status(400).json({ 
        error: `Only ${availableSpots} spots available, but ${guests} requested` 
      })
    }

    // Create booking as PENDING - admin will confirm
    const [newDbBooking] = await db.insert(eventBookings).values({
      eventId: parseInt(id),
      name,
      email,
      phone,
      guests: parseInt(guests),
      specialRequests: specialRequests || '',
      totalPrice: (event.price || 0) * parseInt(guests),
      status: 'pending'
    }).returning()

    // DO NOT update event capacity yet - wait for admin confirmation
    // Capacity will be updated when admin confirms the booking

    const booking = bookingToApiFormat(newDbBooking)
    console.log(`🎉 Event booking created: ${name} for ${guests} guests at ${event.titleEn}`)
    
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
    
    // Check if event exists
    const [existingEvent] = await db.select().from(events).where(eq(events.id, parseInt(id!)))
    if (!existingEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Delete related bookings first
    await db.delete(eventBookings).where(eq(eventBookings.eventId, parseInt(id!)))
    
    // Delete the event
    await db.delete(events).where(eq(events.id, parseInt(id!)))

    console.log(`🎉 Deleted event ID: ${id}`)
    return res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return res.status(500).json({ error: 'Failed to delete event' })
  }
})

export default router