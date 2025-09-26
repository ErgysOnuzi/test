/**
 * Security headers configuration for enhanced protection
 * Implements security best practices for web applications
 */

import { NextResponse } from 'next/server';

/**
 * Get comprehensive security headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent XSS attacks
    'X-XSS-Protection': '1; mode=block',

    // Prevent content type sniffing
    'X-Content-Type-Options': 'nosniff',

    // Control framing to prevent clickjacking
    'X-Frame-Options': 'SAMEORIGIN',

    // Referrer policy for privacy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Remove server fingerprinting
    'X-Powered-By': '',

    // Cache control for security
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  };
}

/**
 * Add security headers to a NextResponse
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  const headers = getSecurityHeaders();

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Create a secure JSON response with proper headers
 */
export function createSecureResponse(
  data: any,
  status: number = 200,
  additionalHeaders?: Record<string, string>
): NextResponse {
  const response = NextResponse.json(data, { status });
  addSecurityHeaders(response);

  if (additionalHeaders) {
    Object.entries(additionalHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

/**
 * Security headers specifically for admin routes
 */
export function getAdminSecurityHeaders(): Record<string, string> {
  return {
    ...getSecurityHeaders(),
    // Stricter cache control for admin
    'Cache-Control': 'no-cache, no-store, must-revalidate, private',

    // Additional security for admin routes
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Permitted-Cross-Domain-Policies': 'none',
  };
}

/**
 * Content Security Policy for different page types
 */
export function getCSPHeader(pageType: 'public' | 'admin' = 'public'): string {
  const baseCSP = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'", // Required for CSS-in-JS
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "frame-src 'self' https://www.instagram.com https://*.instagram.com",
    "object-src 'none'",
    "base-uri 'self'",
  ];

  if (pageType === 'admin') {
    baseCSP.push("frame-ancestors 'none'");
  } else {
    baseCSP.push("frame-ancestors 'self'");
  }

  // Development mode needs unsafe-eval for hot reload
  if (process.env.NODE_ENV === 'development') {
    baseCSP[1] = "script-src 'self' 'unsafe-eval' 'unsafe-inline'";
  }

  return baseCSP.join('; ');
}
