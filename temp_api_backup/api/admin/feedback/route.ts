import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import { desc, sql } from 'drizzle-orm';
import { logError } from '@/lib/errorHandling';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  try {
    // Get all feedbacks for admin (including pending and rejected) with proper field mapping
    const feedbacks = await db
      .select({
        id: schema.feedbacks.id,
        name: schema.feedbacks.name,
        email: schema.feedbacks.email,
        rating: schema.feedbacks.rating,
        comment: schema.feedbacks.comment,
        status: schema.feedbacks.status,
        isPublic: schema.feedbacks.isPublic,
        reservationId: schema.feedbacks.reservationId,
        createdAt: schema.feedbacks.createdAt,
      })
      .from(schema.feedbacks)
      .orderBy(desc(schema.feedbacks.createdAt));

    return NextResponse.json(feedbacks);
  } catch (error) {
    logError('Admin Feedback Fetch', error, {
      operation: 'GET /api/admin/feedback',
    });
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}
