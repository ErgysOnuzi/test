import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import { sendEmail } from '@/utils/replitmail';
import { handleAPIError, logError } from '@/lib/errorHandling';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Insert contact message into database
    const [newMessage] = await db
      .insert(schema.contactMessages)
      .values({
        name: body.name,
        email: body.email,
        message: body.message,
      })
      .returning();

    // Log success securely without exposing sensitive details
    logError('Contact Message Success', null, { 
      messageReceived: true,
      timestamp: new Date().toISOString()
    });

    // Send email notification to restaurant
    try {
      await sendEmail({
        to: 'info@ristorante-la-cantina.de', // Restaurant email
        subject: 'New Contact Message - Ristorante La Cantina Bleibtreu',
        text: `New contact message received:

Name: ${body.name}
Email: ${body.email}
Message:
${body.message}

Message ID: ${newMessage.id}
Received: ${new Date().toLocaleString('de-DE')}

Please respond to this inquiry promptly.`,
        html: `
          <h2>New Contact Message - Ristorante La Cantina Bleibtreu</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${body.message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>Message ID: ${newMessage.id} | Received: ${new Date().toLocaleString('de-DE')}</small></p>
        `
      });
      // Log email success without exposing details
    } catch (emailError) {
      logError('Contact Email Notification', emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({ 
      message: 'Message sent successfully!',
      contact: newMessage 
    }, { status: 201 });

  } catch (error) {
    return handleAPIError(
      'Contact Form Processing',
      error,
      'Unable to send your message at this time. Please try again later.',
      500
    );
  }
}

// GET endpoint removed for security - contact messages contain PII and should only be accessible by admins
// Admin access available through /api/admin/contact route