import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import { csrfProtection } from '@/lib/csrf';
import { logError } from '@/lib/errorHandling';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  try {
    const events = await db
      .select()
      .from(schema.events)
      .orderBy(desc(schema.events.date));

    return NextResponse.json(events);
  } catch (error) {
    logError('Admin Events Fetch', error, { operation: 'GET /api/admin/events' });
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }

  // CSRF Protection
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;

  try {
    const body = await request.json();
    const { title, description, date, capacity } = body;

    if (!title || !date) {
      return NextResponse.json(
        { error: 'Title and date are required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(schema.events)
      .values({
        title,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    logError('Admin Event Create', error, { operation: 'POST /api/admin/events' });
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }

  // CSRF Protection
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const result = await db
      .delete(schema.events)
      .where(eq(schema.events.id, parseInt(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    logError('Admin Event Delete', error, { operation: 'DELETE /api/admin/events' });
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
