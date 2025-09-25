import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/serverAuth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  
  try {
    const body = await request.json();
    const { status, isPublic } = body;

    // Validate input - either status OR isPublic should be provided
    if (status !== undefined) {
      if (!['approved', 'rejected', 'pending'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
    } else if (isPublic !== undefined) {
      if (typeof isPublic !== 'boolean') {
        return NextResponse.json({ error: 'isPublic must be a boolean' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: 'Either status or isPublic must be provided' }, { status: 400 });
    }

    // Update feedback status or visibility
    let result;
    if (status !== undefined) {
      result = db.prepare(`
        UPDATE feedbacks 
        SET status = ? 
        WHERE id = ?
      `).run(status, id);
    } else {
      result = db.prepare(`
        UPDATE feedbacks 
        SET is_public = ? 
        WHERE id = ?
      `).run(isPublic, id);
    }

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    const message = status !== undefined 
      ? 'Feedback status updated successfully' 
      : 'Feedback visibility updated successfully';
    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Verify admin authentication
  if (!(await verifyAdminAuth(request))) {
    return unauthorizedResponse();
  }
  
  try {
    // Delete feedback
    const result = db.prepare(`
      DELETE FROM feedbacks WHERE id = ?
    `).run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}