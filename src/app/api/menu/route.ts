import { NextResponse } from 'next/server';
import db, { schema } from '@/lib/db';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const items = await db
      .select()
      .from(schema.menuItems)
      .orderBy(asc(schema.menuItems.categoryDe), asc(schema.menuItems.titleDe));
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}