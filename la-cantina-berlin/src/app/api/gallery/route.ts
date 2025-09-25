import { NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc, eq, and } from 'drizzle-orm';

// Add caching to improve performance
export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    // Get active uploaded gallery items with optimized fields and limit
    const galleryItems = await db
      .select({
        id: schema.gallery.id,
        imageUrl: schema.gallery.imageUrl,
        description: schema.gallery.description,
        category: schema.gallery.category,
        createdAt: schema.gallery.createdAt,
      })
      .from(schema.gallery)
      .where(
        and(
          eq(schema.gallery.isActive, true),
          eq(schema.gallery.category, 'uploaded')
        )
      )
      .orderBy(asc(schema.gallery.sortOrder), asc(schema.gallery.createdAt))
      .limit(36); // Load first 36 images for better initial performance
    
    const response = NextResponse.json(galleryItems);
    
    // Add cache headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}