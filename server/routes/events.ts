import express from 'express'
import { eq } from 'drizzle-orm'
import db, { schema } from '../../src/lib/db'

const router = express.Router()

// GET /api/events - Get all events
router.get('/', async (req, res) => {
  try {
    const allEvents = await db.select().from(schema.events)
    
    const transformedEvents = allEvents.map((event: any) => ({
      id: event.id,
      title_de: event.titleDe,
      title_en: event.titleEn,
      description_de: event.descriptionDe,
      description_en: event.descriptionEn,
      event_date: event.date,
      price: event.price,
      max_attendees: event.capacity,
      current_attendees: event.currentBookings,
      created_at: event.createdAt,
    }))

    console.log(`🎉 Fetched ${transformedEvents.length} events`)
    res.json(transformedEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// GET /api/events/:id - Get specific event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const [event] = await db.select().from(schema.events).where(eq(schema.events.id, parseInt(id)))
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const transformedEvent = {
      id: event.id,
      title_de: event.titleDe,
      title_en: event.titleEn,
      description_de: event.descriptionDe,
      description_en: event.descriptionEn,
      event_date: event.date,
      price: event.price,
      max_attendees: event.capacity,
      current_attendees: event.currentBookings,
      created_at: event.createdAt,
    }

    res.json(transformedEvent)
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
})

export default router