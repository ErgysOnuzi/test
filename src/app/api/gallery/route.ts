import { NextRequest, NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc, eq, and, sql } from 'drizzle-orm';

// Add caching to improve performance
export const revalidate = 300; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '36');

    // Get active gallery items with optimized fields and pagination
    const galleryItems = await db
      .select({
        id: schema.gallery.id,
        imageUrl: schema.gallery.imageUrl,
        description: schema.gallery.description,
        category: schema.gallery.category,
        createdAt: schema.gallery.createdAt,
      })
      .from(schema.gallery)
      .where(eq(schema.gallery.isActive, true))
      .orderBy(asc(schema.gallery.sortOrder), asc(schema.gallery.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination info
    const totalResults = await db
      .select({ count: sql`COUNT(*)` })
      .from(schema.gallery)
      .where(eq(schema.gallery.isActive, true));

    if (
      !totalResults ||
      totalResults.length === 0 ||
      totalResults[0]?.count === undefined
    ) {
      throw new Error(
        'Failed to get gallery count - database query returned no valid count'
      );
    }

    const totalCount = Number(totalResults[0].count);
    const hasMore = offset + limit < totalCount;

    const response = NextResponse.json({
      images: galleryItems,
      pagination: {
        offset,
        limit,
        total: totalCount,
        hasMore,
        nextOffset: hasMore ? offset + limit : null,
      },
    });

    // Add cache headers for better performance
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=86400'
    );

    return response;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}
