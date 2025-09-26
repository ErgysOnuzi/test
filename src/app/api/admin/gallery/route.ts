import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db, { schema } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import { csrfProtection } from '@/lib/csrf';
import { logError } from '@/lib/errorHandling';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }

  try {
    // Only fetch uploaded images, exclude Instagram items
    const images = await db
      .select()
      .from(schema.gallery)
      .where(eq(schema.gallery.category, 'uploaded'))
      .orderBy(desc(schema.gallery.createdAt));
    return NextResponse.json(images);
  } catch (error) {
    logError('Admin Gallery Fetch', error, { operation: 'GET /api/admin/gallery' });
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }

  // CSRF Protection
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;

  try {
    const body = await request.json();
    const { imageUrl, image_url, description } = body;

    // Accept both camelCase and snake_case for compatibility
    const finalImageUrl = imageUrl || image_url;

    if (!finalImageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(schema.gallery)
      .values({
        imageUrl: finalImageUrl,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    logError('Admin Gallery Create', error, { operation: 'POST /api/admin/gallery' });
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }

  // CSRF Protection
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const result = await db
      .delete(schema.gallery)
      .where(eq(schema.gallery.id, parseInt(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    logError('Admin Gallery Delete', error, { operation: 'DELETE /api/admin/gallery' });
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
