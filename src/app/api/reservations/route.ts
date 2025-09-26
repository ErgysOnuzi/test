import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import { sendEmail } from '@/utils/replitmail';
import { handleAPIError, logError } from '@/lib/errorHandling';
import { sanitizeContactInput } from '@/lib/xssProtection';
import { createSecureResponse } from '@/lib/securityHeaders';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Sanitize input to prevent XSS attacks
    const sanitized = sanitizeContactInput(body);
    
    // Validate required fields after sanitization
    if (!sanitized.name || !sanitized.phone || !body.date || !body.time || !body.guests) {
      return createSecureResponse({ error: 'Required fields missing or invalid.' }, 400);
    }
    
    // Additional validation
    if (sanitized.name.length < 2 || sanitized.name.length > 100) {
      return createSecureResponse({ error: 'Name must be between 2 and 100 characters.' }, 400);
    }
    
    if (!sanitized.phone || sanitized.phone.length < 7) {
      return createSecureResponse({ error: 'Please provide a valid phone number.' }, 400);
    }

    // Validate guests count (1-100)
    const guestCount = parseInt(body.guests);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 100) {
      return createSecureResponse({ error: 'Number of guests must be between 1 and 100.' }, 400);
    }

    // Insert sanitized reservation into database
    const result = await db
      .insert(schema.reservations)
      .values({
        name: sanitized.name,
        phone: sanitized.phone,
        date: body.date, // Date validation handled by frontend
        time: body.time, // Time validation handled by frontend
        guests: guestCount
      })
      .returning();

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error('Failed to create reservation - database insert returned no result');
    }

    const newReservation = result[0];

    // Log success securely without exposing sensitive details
    logError('Reservation Success', null, { 
      reservationReceived: true,
      timestamp: new Date().toISOString()
    });

    // Send email notification to restaurant
    try {
      await sendEmail({
        to: 'info@ristorante-la-cantina.de', // Restaurant email
        subject: 'New Reservation - Ristorante La Cantina Bleibtreu',
        text: `New reservation received:

Guest Name: ${sanitized.name}
Phone: ${sanitized.phone}
Email: ${sanitized.email || 'Not provided'}
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
            <p><strong>Guest Name:</strong> ${sanitized.name}</p>
            <p><strong>Phone:</strong> ${sanitized.phone}</p>
            <p><strong>Email:</strong> ${sanitized.email || 'Not provided'}</p>
            <p><strong>Date:</strong> ${body.date}</p>
            <p><strong>Time:</strong> ${body.time}</p>
            <p><strong>Number of Guests:</strong> ${guestCount}</p>
            <p><strong>Status:</strong> <span style="color: green;">Confirmed</span></p>
          </div>
          <hr>
          <p><small>Reservation ID: ${newReservation.id} | Received: ${new Date().toLocaleString('de-DE')}</small></p>
        `
      });
      // Log email success without exposing details
    } catch (emailError) {
      logError('Reservation Email Notification', emailError);
      // Don't fail the entire request if email fails
    }

    return createSecureResponse({ 
      message: 'Reservation successfully saved',
      reservation: newReservation 
    }, 200);

  } catch (error) {
    return handleAPIError(
      'Reservation Processing',
      error,
      'Unable to process your reservation at this time. Please try again later.',
      500
    );
  }
}

// GET endpoint removed for security - reservations contain PII and should only be accessible by admins
// Admin access available through /api/admin/reservations route