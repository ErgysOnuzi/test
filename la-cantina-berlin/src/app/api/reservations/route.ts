import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import { sendEmail } from '@/utils/replitmail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields  
    if (!body.name || !body.phone || !body.date || !body.time || !body.guests) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    // Validate guests count (1-100)
    const guestCount = parseInt(body.guests);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 100) {
      return NextResponse.json({ error: 'Number of guests must be between 1 and 100.' }, { status: 400 });
    }

    // Insert reservation into database
    const [newReservation] = await db
      .insert(schema.reservations)
      .values({
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        date: body.date,
        time: body.time,
        guests: guestCount,
        status: 'confirmed', // Auto-confirm all reservations
      })
      .returning();

    console.log('Reservation saved successfully with ID:', newReservation.id);

    // Send email notification to restaurant
    try {
      await sendEmail({
        to: 'info@ristorante-la-cantina.de', // Restaurant email
        subject: 'New Reservation - Ristorante La Cantina Bleibtreu',
        text: `New reservation received:

Guest Name: ${body.name}
Phone: ${body.phone}
Email: ${body.email}
Date: ${body.date}
Time: ${body.time}
Number of Guests: ${guestCount}
Status: Confirmed

Reservation ID: ${newReservation.id}
Received: ${new Date().toLocaleString('de-DE')}

Please prepare for this reservation.`,
        html: `
          <h2>New Reservation - Ristorante La Cantina Bleibtreu</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #d2691e; margin-top: 0;">Reservation Details</h3>
            <p><strong>Guest Name:</strong> ${body.name}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Date:</strong> ${body.date}</p>
            <p><strong>Time:</strong> ${body.time}</p>
            <p><strong>Number of Guests:</strong> ${guestCount}</p>
            <p><strong>Status:</strong> <span style="color: green;">Confirmed</span></p>
          </div>
          <hr>
          <p><small>Reservation ID: ${newReservation.id} | Received: ${new Date().toLocaleString('de-DE')}</small></p>
        `
      });
      console.log('Reservation notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send reservation notification email:', emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({ 
      message: 'Reservation successfully saved',
      reservation: newReservation 
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing reservation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint removed for security - reservations contain PII and should only be accessible by admins
// Admin access available through /api/admin/reservations route