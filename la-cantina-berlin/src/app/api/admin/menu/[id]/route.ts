import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import db, { schema } from '@/lib/db';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import { eq } from 'drizzle-orm';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await db
      .delete(schema.menuItems)
      .where(eq(schema.menuItems.id, id))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Invalidate menu cache so public pages update
    revalidateTag('menu');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { isAvailable } = body;
    
    if (typeof isAvailable !== 'boolean') {
      return NextResponse.json({ error: 'Invalid availability status' }, { status: 400 });
    }

    const result = await db
      .update(schema.menuItems)
      .set({ isAvailable })
      .where(eq(schema.menuItems.id, id))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Invalidate menu cache so public pages update
    revalidateTag('menu');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (!id) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

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
      isAvailable,
      imageUrl 
    } = body;
    
    // Validation
    if (!titleDe || !titleEn || !price || !categoryDe || !categoryEn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    }

    const result = await db
      .update(schema.menuItems)
      .set({
        title: titleEn, // Primary title field
        titleDe,
        titleEn,
        description: descriptionEn, // Primary description field
        descriptionDe: descriptionDe || null,
        descriptionEn: descriptionEn || null,
        price,
        category: categoryEn, // Primary category field
        categoryDe,
        categoryEn,
        allergens: allergens || null,
        imageUrl: imageUrl || null,
        isAvailable: isAvailable ?? true
      })
      .where(eq(schema.menuItems.id, id))
      .returning();
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Invalidate menu cache so public pages update
    revalidateTag('menu');

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}