import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { menuItems } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const items = await db.select().from(menuItems).where(eq(menuItems.isAvailable, true));
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}