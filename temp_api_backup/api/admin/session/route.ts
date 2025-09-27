import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/serverAuth';

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminAuth(request);

    return NextResponse.json({
      authenticated: isAuthenticated,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({
      authenticated: false,
    });
  }
}
