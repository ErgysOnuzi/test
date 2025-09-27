import { NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc } from 'drizzle-orm';

// Cache for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const rawItems = await db
      .select()
      .from(schema.menuItems)
      .orderBy(asc(schema.menuItems.categoryDe), asc(schema.menuItems.titleDe));

    // Map to camelCase format expected by frontend
    const items = rawItems.map(item => ({
      id: item.id,
      title: item.title,
      titleDe: item.titleDe,
      titleEn: item.titleEn,
      description: item.description,
      descriptionDe: item.descriptionDe,
      descriptionEn: item.descriptionEn,
      price: item.price,
      category: item.category,
      categoryDe: item.categoryDe,
      categoryEn: item.categoryEn,
      isAvailable: item.isAvailable,
      allergens: item.allergens,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(items, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}
