import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Get all approved feedbacks for public display
    const feedbacks = await db
      .select({
        id: schema.feedbacks.id,
        name: schema.feedbacks.name,
        rating: schema.feedbacks.rating,
        comment: schema.feedbacks.comment,
        createdAt: schema.feedbacks.createdAt,
      })
      .from(schema.feedbacks)
      .where(eq(schema.feedbacks.status, 'approved'))
      .orderBy(desc(schema.feedbacks.createdAt));

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, rating, comment } = await request.json();

    // Validate required fields
    if (!name || !email || !rating || !comment) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Insert feedback with auto-approval for immediate display
    const [newFeedback] = await db
      .insert(schema.feedbacks)
      .values({
        name,
        email,
        rating,
        comment,
        status: 'approved',
        isPublic: true,
        reservationId: null,
      })
      .returning();

    return NextResponse.json({ 
      message: 'Feedback submitted successfully', 
      id: newFeedback.id 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}