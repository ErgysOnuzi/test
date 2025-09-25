import { NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc, eq, and } from 'drizzle-orm';

export async function GET() {
  try {
    // Get all active uploaded gallery items (exclude Instagram items)
    const galleryItems = await db
      .select()
      .from(schema.gallery)
      .where(
        and(
          eq(schema.gallery.isActive, true),
          eq(schema.gallery.category, 'uploaded')
        )
      )
      .orderBy(asc(schema.gallery.sortOrder), asc(schema.gallery.createdAt));
    
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}