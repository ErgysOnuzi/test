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
    if (!sanitized.name || !sanitized.email || !sanitized.message) {
      return createSecureResponse({ error: 'All fields are required and must be valid.' }, 400);
    }
    
    // Additional validation
    if (sanitized.name.length < 2 || sanitized.name.length > 100) {
      return createSecureResponse({ error: 'Name must be between 2 and 100 characters.' }, 400);
    }
    
    if (sanitized.message.length < 10 || sanitized.message.length > 1000) {
      return createSecureResponse({ error: 'Message must be between 10 and 1000 characters.' }, 400);
    }

    // Insert sanitized contact message into database
    const result = await db
      .insert(schema.contactMessages)
      .values({
        name: sanitized.name,
        email: sanitized.email,
        message: sanitized.message,
      })
      .returning();

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error('Failed to create contact message - database insert returned no result');
    }

    const newMessage = result[0];

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

Name: ${sanitized.name}
Email: ${sanitized.email}
Message:
${sanitized.message}

Message ID: ${newMessage.id}
Received: ${new Date().toLocaleString('de-DE')}

Please respond to this inquiry promptly.`,
        html: `
          <h2>New Contact Message - Ristorante La Cantina Bleibtreu</h2>
          <p><strong>Name:</strong> ${sanitized.name}</p>
          <p><strong>Email:</strong> ${sanitized.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${sanitized.message.replace(/\n/g, '<br>')}
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

    return createSecureResponse({ 
      message: 'Message sent successfully!',
      contact: newMessage 
    }, 201);

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