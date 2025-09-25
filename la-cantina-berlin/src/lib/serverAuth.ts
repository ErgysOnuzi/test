import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// SECURITY: Use environment variable - NO hardcoded credentials
const SESSION_COOKIE_NAME = "la_cantina_admin_session";

export function generateAdminToken(): string {
  // Generate JWT token with proper signing
  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('SECURITY ERROR: JWT_SECRET environment variable must be set for production');
  }
  
  return jwt.sign(
    { 
      role: 'admin', 
      authenticated: true, 
      timestamp: Date.now() 
    }, 
    JWT_SECRET, 
    { expiresIn: '2h' }
  );
}

export function createSecureCookie(value: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production for dev testing
    sameSite: 'strict' as const, // Strict for admin routes
    maxAge: 60 * 60 * 2 // 2 hours max session
  };
}

export async function verifyAdminAuth(request?: NextRequest): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) return false;
    
    // Proper JWT verification with secret
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('SECURITY ERROR: JWT_SECRET environment variable must be set for production');
  }
    
    try {
      const decoded = jwt.verify(sessionCookie.value, JWT_SECRET) as any;
      return decoded.role === 'admin' && decoded.authenticated === true;
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return false;
    }
  } catch (error) {
    console.error('Auth verification error:', error);
    return false;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function validateAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('SECURITY ERROR: ADMIN_PASSWORD environment variable not set');
    return false;
  }
  return password === adminPassword;
}