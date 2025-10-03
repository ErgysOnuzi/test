import express, { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
import { dbPromise } from '../db'
import * as schema from '../../shared/schema'
import { validateReservation, handleValidationErrors } from '../middleware/validation'

const router = express.Router()

// Import admin authentication middleware
import { requireAuth, requireAuthWithCSRF } from './admin'

// POST /api/reservations - Create new reservation with validation
router.post('/', validateReservation, handleValidationErrors, async (req: Request, res: Response) => {
  try {
    const db = await dbPromise
    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests
    } = req.body

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const [reservation] = await db.insert(schema.reservations).values({
      name: name,
      email: email || '',
      phone: phone,
      date: date,
      time: time,
      guests: parseInt(guests),
      notes: specialRequests || '',
      status: 'pending',
    }).returning()

    if (!reservation) {
      return res.status(500).json({ error: 'Failed to create reservation' })
    }

    // Transform to match GET endpoint format
    const transformedReservation = {
      id: reservation.id,
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      notes: reservation.notes,
      status: reservation.status,
      createdAt: reservation.createdAt,
    }

    console.log(`📅 New reservation created: ${reservation.id}`)
    return res.status(201).json({ 
      success: true, 
      reservation: transformedReservation,
      message: 'Reservation created successfully'
    })
  } catch (error) {
    console.error('Error creating reservation:', error)
    return res.status(500).json({ error: 'Failed to create reservation' })
  }
})

// GET /api/reservations - Get all reservations (admin)
router.get('/', requireAuth, async (req, res) => {
  try {
    const db = await dbPromise
    const allReservations = await db.select().from(schema.reservations)
    
    const transformedReservations = allReservations.map((reservation: any) => ({
      id: reservation.id,
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      notes: reservation.notes,
      status: reservation.status,
      createdAt: reservation.createdAt,
    }))

    console.log(`📅 Fetched ${transformedReservations.length} reservations`)
    return res.json(transformedReservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return res.status(500).json({ error: 'Failed to fetch reservations' })
  }
})

// PUT /api/reservations/:id - Update reservation (admin)
router.put('/:id', requireAuthWithCSRF, async (req: Request, res: Response) => {
  try {
    const db = await dbPromise
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }
    
    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      notes,
      status
    } = req.body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone
    if (date !== undefined) updateData.date = date
    if (time !== undefined) updateData.time = time
    if (guests !== undefined) updateData.guests = parseInt(guests)
    if (notes !== undefined) updateData.notes = notes
    if (status !== undefined) updateData.status = status

    const [updatedReservation] = await db
      .update(schema.reservations)
      .set(updateData)
      .where(eq(schema.reservations.id, parseInt(id)))
      .returning()

    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    // Transform to match GET endpoint format
    const transformedReservation = {
      id: updatedReservation.id,
      name: updatedReservation.name,
      email: updatedReservation.email,
      phone: updatedReservation.phone,
      date: updatedReservation.date,
      time: updatedReservation.time,
      guests: updatedReservation.guests,
      notes: updatedReservation.notes,
      status: updatedReservation.status,
      createdAt: updatedReservation.createdAt,
    }

    console.log(`📅 Updated reservation: ${updatedReservation.name} - ${updatedReservation.status}`)
    return res.json({
      success: true,
      reservation: transformedReservation,
      message: 'Reservation updated successfully'
    })
  } catch (error) {
    console.error('Error updating reservation:', error)
    return res.status(500).json({ error: 'Failed to update reservation' })
  }
})

// DELETE /api/reservations/:id - Delete reservation (admin)
router.delete('/:id', requireAuthWithCSRF, async (req: Request, res: Response) => {
  try {
    const db = await dbPromise
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }
    
    const [deletedReservation] = await db
      .delete(schema.reservations)
      .where(eq(schema.reservations.id, parseInt(id)))
      .returning()

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    console.log(`🗑️ Deleted reservation: ${deletedReservation.name}`)
    return res.json({
      success: true,
      message: 'Reservation deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return res.status(500).json({ error: 'Failed to delete reservation' })
  }
})

// PATCH /api/reservations/:id/status - Update reservation status (admin)
router.patch('/:id/status', requireAuthWithCSRF, async (req: Request, res: Response) => {
  try {
    const db = await dbPromise
    const { id } = req.params
    
    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }
    
    const { status } = req.body

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be: pending, confirmed, cancelled, or completed' })
    }

    const [updatedReservation] = await db
      .update(schema.reservations)
      .set({ status })
      .where(eq(schema.reservations.id, parseInt(id)))
      .returning()

    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    // Transform to match GET endpoint format
    const transformedReservation = {
      id: updatedReservation.id,
      name: updatedReservation.name,
      email: updatedReservation.email,
      phone: updatedReservation.phone,
      date: updatedReservation.date,
      time: updatedReservation.time,
      guests: updatedReservation.guests,
      notes: updatedReservation.notes,
      status: updatedReservation.status,
      createdAt: updatedReservation.createdAt,
    }

    console.log(`🔄 Updated reservation status: ${updatedReservation.name} -> ${status}`)
    return res.json({
      success: true,
      reservation: transformedReservation,
      message: `Reservation ${status} successfully`
    })
  } catch (error) {
    console.error('Error updating reservation status:', error)
    return res.status(500).json({ error: 'Failed to update reservation status' })
  }
})

export default router