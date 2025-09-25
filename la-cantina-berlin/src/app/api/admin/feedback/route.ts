import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import { desc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  try {
    // Get all feedbacks for admin (including pending and rejected)
    const feedbacks = await db
      .select()
      .from(schema.feedbacks)
      .orderBy(desc(schema.feedbacks.createdAt));

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Error fetching admin feedbacks:', error);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}