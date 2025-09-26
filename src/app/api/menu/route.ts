import { NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc } from 'drizzle-orm';

// Cache for 5 minutes
export const revalidate = 300;
export const dynamic = 'force-static';

export async function GET() {
  try {
    const items = await db
      .select()
      .from(schema.menuItems)
      .orderBy(asc(schema.menuItems.categoryDe), asc(schema.menuItems.titleDe));
    
    return NextResponse.json(items, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}