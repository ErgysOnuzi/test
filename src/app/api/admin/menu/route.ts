import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db, { schema } from '@/lib/db';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import { csrfProtection } from '@/lib/csrf';
// Use the schema directly for type inference
type InsertMenuItem = typeof schema.menuItems.$inferInsert;

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  try {
    const items = await db
      .select()
      .from(schema.menuItems);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
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
    const { 
      titleDe, 
      titleEn, 
      descriptionDe, 
      descriptionEn, 
      price, 
      categoryDe, 
      categoryEn, 
      allergens,
      isAvailable = true,
      imageUrl 
    } = body;
    
    // Validation
    if (!titleDe || !titleEn || !price || !categoryDe || !categoryEn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    }
    
    const insertData = {
      title: titleEn, // Primary title field
      titleDe: titleDe || null,
      titleEn: titleEn || null,
      description: descriptionEn || null, // Primary description field
      descriptionDe: descriptionDe || null,
      descriptionEn: descriptionEn || null,
      price,
      category: categoryEn, // Primary category field
      categoryDe: categoryDe || null,
      categoryEn: categoryEn || null,
      allergens: allergens || null,
      imageUrl: imageUrl || null,
      isAvailable: isAvailable ?? true
    };

    const result = await db
      .insert(schema.menuItems)
      .values(insertData)
      .returning();
    
    // Invalidate menu cache so public pages update
    revalidateTag('menu');
    
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}