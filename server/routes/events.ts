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
    return res.status(500).json({ error: 'Failed to fetch event' })
  }
})

// POST /api/events - Create new event
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      titleDe,
      titleEn,
      descriptionDe,
      descriptionEn,
      date,
      startTime,
      endTime,
      capacity,
      price,
      imageUrl,
      isActive = true
    } = req.body

    if (!title || !date || !startTime) {
      return res.status(400).json({ error: 'Title, date, and start time are required' })
    }

    const [newEvent] = await db.insert(schema.events).values({
      title,
      description: description || '',
      titleDe: titleDe || title,
      titleEn: titleEn || title,
      descriptionDe: descriptionDe || description || '',
      descriptionEn: descriptionEn || description || '',
      date,
      startTime,
      endTime: endTime || '',
      capacity: capacity !== undefined && capacity !== '' ? parseInt(capacity) : null,
      currentBookings: 0,
      price: price !== undefined && price !== '' ? parseFloat(price) : null,
      imageUrl: imageUrl || null,
      isActive,
    }).returning()

    // Transform to match GET endpoint format
    const transformedEvent = {
      id: newEvent.id,
      title_de: newEvent.titleDe,
      title_en: newEvent.titleEn,
      description_de: newEvent.descriptionDe,
      description_en: newEvent.descriptionEn,
      event_date: newEvent.date,
      price: newEvent.price,
      max_attendees: newEvent.capacity,
      current_attendees: newEvent.currentBookings,
      created_at: newEvent.createdAt,
    }

    console.log(`🎉 Created new event: ${newEvent.title}`)
    return res.status(201).json({
      success: true,
      event: transformedEvent,
      message: 'Event created successfully'
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return res.status(500).json({ error: 'Failed to create event' })
  }
})

// PUT /api/events/:id - Update event
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      titleDe,
      titleEn,
      descriptionDe,
      descriptionEn,
      date,
      startTime,
      endTime,
      capacity,
      currentBookings,
      price,
      imageUrl,
      isActive
    } = req.body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (titleDe !== undefined) updateData.titleDe = titleDe
    if (titleEn !== undefined) updateData.titleEn = titleEn
    if (descriptionDe !== undefined) updateData.descriptionDe = descriptionDe
    if (descriptionEn !== undefined) updateData.descriptionEn = descriptionEn
    if (date !== undefined) updateData.date = date
    if (startTime !== undefined) updateData.startTime = startTime
    if (endTime !== undefined) updateData.endTime = endTime
    if (capacity !== undefined) updateData.capacity = capacity !== '' ? parseInt(capacity) : null
    if (currentBookings !== undefined) updateData.currentBookings = parseInt(currentBookings)
    if (price !== undefined) updateData.price = price !== '' ? parseFloat(price) : null
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl
    if (isActive !== undefined) updateData.isActive = isActive

    const [updatedEvent] = await db
      .update(schema.events)
      .set(updateData)
      .where(eq(schema.events.id, parseInt(id)))
      .returning()

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    // Transform to match GET endpoint format
    const transformedEvent = {
      id: updatedEvent.id,
      title_de: updatedEvent.titleDe,
      title_en: updatedEvent.titleEn,
      description_de: updatedEvent.descriptionDe,
      description_en: updatedEvent.descriptionEn,
      event_date: updatedEvent.date,
      price: updatedEvent.price,
      max_attendees: updatedEvent.capacity,
      current_attendees: updatedEvent.currentBookings,
      created_at: updatedEvent.createdAt,
    }

    console.log(`🎉 Updated event: ${updatedEvent.title}`)
    return res.json({
      success: true,
      event: transformedEvent,
      message: 'Event updated successfully'
    })
  } catch (error) {
    console.error('Error updating event:', error)
    return res.status(500).json({ error: 'Failed to update event' })
  }
})

// DELETE /api/events/:id - Delete event
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const [deletedEvent] = await db
      .delete(schema.events)
      .where(eq(schema.events.id, parseInt(id)))
      .returning()

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    console.log(`🗑️ Deleted event: ${deletedEvent.title}`)
    return res.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    return res.status(500).json({ error: 'Failed to delete event' })
  }
})

export default router