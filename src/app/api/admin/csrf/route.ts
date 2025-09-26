import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/serverAuth';
import {
  generateCSRFToken,
  addCSRFCookieToResponse,
  getCSRFTokenForClient,
} from '@/lib/csrf';

/**
 * GET /api/admin/csrf - Get CSRF token for authenticated admin users
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication first
    if (!(await verifyAdminAuth(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Try to get existing token first
    let token = await getCSRFTokenForClient(request);

    // If no existing token, generate new one
    if (!token) {
      const { token: newToken, secret } = generateCSRFToken();
      token = newToken;

      const response = NextResponse.json({
        csrf_token: token,
        message: 'CSRF token generated successfully',
      });

      return addCSRFCookieToResponse(response, secret);
    }

    return NextResponse.json({
      csrf_token: token,
      message: 'CSRF token retrieved successfully',
    });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
