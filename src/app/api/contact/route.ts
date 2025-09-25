import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc } from 'drizzle-orm';
import { sendEmail } from '@/utils/replitmail';

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

    console.log('Contact message saved successfully with ID:', newMessage.id);

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
      console.log('Contact notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send contact notification email:', emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({ 
      message: 'Message sent successfully!',
      contact: newMessage 
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint removed for security - contact messages contain PII and should only be accessible by admins
// Admin access available through /api/admin/contact route