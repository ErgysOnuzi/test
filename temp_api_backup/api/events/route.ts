import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const events = await db
      .select()
      .from(schema.events)
      .orderBy(asc(schema.events.date));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST endpoint removed for security - event creation should only be available to admins
// Admin event creation available through /api/admin/events route
