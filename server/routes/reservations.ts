import express from 'express'
import { eq } from 'drizzle-orm'
import db, { schema } from '../../src/lib/db'

const router = express.Router()

// POST /api/reservations - Create new reservation
router.post('/', async (req, res) => {
  try {
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
      guest_name: name,
      guest_email: email,
      guest_phone: phone,
      reservation_date: new Date(`${date}T${time}`),
      guest_count: parseInt(guests),
      special_requests: specialRequests || '',
      status: 'pending',
      created_at: new Date(),
    }).returning()

    console.log(`📅 New reservation created: ${reservation.id}`)
    res.status(201).json({ 
      success: true, 
      id: reservation.id,
      message: 'Reservation created successfully'
    })
  } catch (error) {
    console.error('Error creating reservation:', error)
    res.status(500).json({ error: 'Failed to create reservation' })
  }
})

// GET /api/reservations - Get all reservations (admin)
router.get('/', async (req, res) => {
  try {
    const allReservations = await db.select().from(schema.reservations)
    
    const transformedReservations = allReservations.map((reservation: any) => ({
      id: reservation.id,
      guestName: reservation.guest_name,
      guestEmail: reservation.guest_email,
      guestPhone: reservation.guest_phone,
      reservationDate: reservation.reservation_date,
      guestCount: reservation.guest_count,
      specialRequests: reservation.special_requests,
      status: reservation.status,
      createdAt: reservation.created_at,
    }))

    res.json(transformedReservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    res.status(500).json({ error: 'Failed to fetch reservations' })
  }
})

export default router