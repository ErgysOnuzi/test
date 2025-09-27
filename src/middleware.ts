import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = new URL(request.url);

  // Set aggressive caching for static assets
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/static/') ||
    (url.pathname.includes('.') &&
      (url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.jpeg') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.ico') ||
        url.pathname.endsWith('.webp') ||
        url.pathname.endsWith('.avif')))
  ) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }

  // Set shorter cache for API routes
  if (url.pathname.startsWith('/api/')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=86400'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
