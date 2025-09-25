import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';

export async function GET() {
  if (!(await verifyAdminAuth())) {
    return unauthorizedResponse();
  }

  try {
    const reservations = await db
      .select()
      .from(schema.reservations)
      .orderBy(desc(schema.reservations.createdAt));

    // Map database status to frontend status
    const mappedReservations = reservations.map(reservation => ({
      ...reservation,
      status: reservation.status === 'confirmed' ? 'accepted' : 
              reservation.status === 'cancelled' ? 'rejected' : 
              reservation.status
    }));

    return NextResponse.json(mappedReservations);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminAuth())) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status || !['accepted', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid reservation ID or status' }, { status: 400 });
    }

    // Map frontend status to database status
    const dbStatus = status === 'accepted' ? 'confirmed' : 
                     status === 'rejected' ? 'cancelled' : 
                     status;

    const result = await db
      .update(schema.reservations)
      .set({ status: dbStatus })
      .where(eq(schema.reservations.id, parseInt(id)))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}