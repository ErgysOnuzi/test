import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';
import db, { schema } from '@/lib/db';
import { csrfProtection } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }

  // CSRF Protection
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;

  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Check if we have too many files
    if (files.length > 120) {
      return NextResponse.json({ error: 'Maximum 120 files allowed' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uploadResults = [];
    const errors = [];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        // Check file type
        if (!file.type.startsWith('image/')) {
          errors.push(`File ${file.name}: Must be an image`);
          continue;
        }

        // Check file size (20MB limit per file)
        const maxSize = 20 * 1024 * 1024; // 20MB
        if (file.size > maxSize) {
          errors.push(`File ${file.name}: Size must be less than 20MB`);
          continue;
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const extension = path.extname(file.name);
        const fileName = `gallery-${timestamp}-${randomId}${extension}`;
        const filePath = path.join(uploadsDir, fileName);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Generate public URL
        const publicUrl = `/uploads/gallery/${fileName}`;

        // Save to database
        const result = await db
          .insert(schema.gallery)
          .values({
            imageUrl: publicUrl
          })
          .returning();

        uploadResults.push({
          success: true,
          fileName: file.name,
          imageUrl: publicUrl,
          id: result[0].id
        });

      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        errors.push(`File ${file.name}: Upload failed`);
      }
    }

    return NextResponse.json({
      success: true,
      uploaded: uploadResults.length,
      errors: errors.length,
      results: uploadResults,
      errorMessages: errors
    });

  } catch (error) {
    console.error('Error in bulk upload:', error);
    return NextResponse.json({ error: 'Failed to process bulk upload' }, { status: 500 });
  }
}