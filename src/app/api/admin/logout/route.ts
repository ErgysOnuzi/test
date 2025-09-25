import { NextRequest, NextResponse } from 'next/server';
import { csrfProtection } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  // CSRF Protection
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;
  try {
    const response = NextResponse.json({ 
      success: true,
      message: 'Logout successful' 
    });
    
    // Clear the admin session and CSRF cookies
    response.cookies.set({
      name: 'la_cantina_admin_session',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });
    response.cookies.set({
      name: 'la_cantina_csrf_secret',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}