import { NextRequest, NextResponse } from 'next/server';
import { generateAdminToken, createSecureCookie, validateAdminPassword } from '@/lib/serverAuth';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimiter';
import { generateCSRFToken, addCSRFCookieToResponse } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP address - extract first IP from forwarded header
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIP = forwardedFor ? forwardedFor.split(',')[0]?.trim() || 'unknown' : 
                     request.headers.get('x-real-ip') || 
                     'dev-localhost';
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      const rateLimitHeaders = getRateLimitHeaders(0);
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429, headers: rateLimitHeaders }
      );
    }
    
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }
    
    if (!validateAdminPassword(password)) {
      const rateLimitHeaders = getRateLimitHeaders(rateLimit.remaining);
      console.warn(`Failed admin login attempt from IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401, headers: rateLimitHeaders }
      );
    }
    
    // Generate secure JWT token
    const token = generateAdminToken();
    const cookie = createSecureCookie(token);
    
    // Generate CSRF token for new session
    const { token: csrfToken, secret: csrfSecret } = generateCSRFToken();
    
    // Create response with secure cookie and rate limit headers
    const rateLimitHeaders = getRateLimitHeaders(rateLimit.remaining);
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { headers: rateLimitHeaders }
    );
    
    response.cookies.set(cookie);
    const responseWithCSRF = addCSRFCookieToResponse(response, csrfSecret);
    console.info(`Successful admin login from IP: ${clientIP}`);
    
    return responseWithCSRF;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}