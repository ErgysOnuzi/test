import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_NAME = 'la_cantina_csrf_token';
const CSRF_SECRET_NAME = 'la_cantina_csrf_secret';

/**
 * Generate a secure CSRF token and secret pair
 */
export function generateCSRFToken(): { token: string; secret: string } {
  const secret = crypto.randomBytes(32).toString('hex');
  const nonce = crypto.randomBytes(32).toString('hex');
  const hmac = crypto.createHmac('sha256', secret).update(nonce).digest('hex');
  const token = `${nonce}.${hmac}`;
  return { token, secret };
}

/**
 * Create secure CSRF cookie
 */
export function createCSRFCookie(secret: string) {
  return {
    name: CSRF_SECRET_NAME,
    value: secret,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 2 // 2 hours, same as session
  };
}

/**
 * Validate CSRF token against the secret stored in cookie
 */
export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const csrfSecretCookie = cookieStore.get(CSRF_SECRET_NAME);
    
    if (!csrfSecretCookie?.value) {
      console.warn('CSRF validation failed: No secret cookie found');
      return false;
    }
    
    // Get token from header only (avoid consuming request body)
    const submittedToken = request.headers.get('x-csrf-token');
    
    if (!submittedToken) {
      console.warn('CSRF validation failed: No X-CSRF-Token header provided');
      return false;
    }
    
    // Parse token format: nonce.hmac
    const parts = submittedToken.split('.');
    if (parts.length !== 2) {
      console.warn('CSRF validation failed: Invalid token format');
      return false;
    }
    
    const [nonce, submittedHmac] = parts;
    
    // Compute expected HMAC from secret and nonce
    const expectedHmac = crypto
      .createHmac('sha256', csrfSecretCookie.value)
      .update(nonce)
      .digest('hex');
    
    // Timing-safe comparison
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedHmac, 'hex'),
      Buffer.from(submittedHmac, 'hex')
    );
    
    if (!isValid) {
      console.warn('CSRF validation failed: Token HMAC mismatch');
    }
    
    return isValid;
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
}

/**
 * Generate a new CSRF token for client use
 */
export async function getCSRFTokenForClient(request?: NextRequest): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const csrfSecretCookie = cookieStore.get(CSRF_SECRET_NAME);
    
    if (!csrfSecretCookie?.value) {
      return null;
    }
    
    // Generate a new token using the proper format: nonce.hmac
    const nonce = crypto.randomBytes(32).toString('hex');
    const hmac = crypto
      .createHmac('sha256', csrfSecretCookie.value)
      .update(nonce)
      .digest('hex');
    
    return `${nonce}.${hmac}`;
  } catch (error) {
    console.error('Error generating CSRF token for client:', error);
    return null;
  }
}

/**
 * CSRF protection middleware for admin routes
 */
export async function csrfProtection(request: NextRequest): Promise<NextResponse | null> {
  // Skip CSRF validation for GET and HEAD requests
  if (request.method === 'GET' || request.method === 'HEAD') {
    return null;
  }
  
  const isValid = await validateCSRFToken(request);
  
  if (!isValid) {
    return NextResponse.json(
      { error: 'CSRF token validation failed' }, 
      { status: 403 }
    );
  }
  
  return null; // Continue processing
}

/**
 * Helper to add CSRF token to response cookies
 */
export function addCSRFCookieToResponse(response: NextResponse, secret: string): NextResponse {
  const csrfCookie = createCSRFCookie(secret);
  response.cookies.set(csrfCookie);
  return response;
}