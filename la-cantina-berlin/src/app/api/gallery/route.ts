import { NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc, eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Get all active gallery items ordered by sort order and creation date
    const galleryItems = await db
      .select()
      .from(schema.gallery)
      .where(eq(schema.gallery.isActive, true))
      .orderBy(asc(schema.gallery.sortOrder), asc(schema.gallery.createdAt));
    
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}