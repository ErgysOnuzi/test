import {routing} from './src/i18n/routing';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  // Handle root path redirect for Replit preview
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/de';
    return NextResponse.redirect(url);
  }
  
  // Use next-intl middleware for other paths
  return intlMiddleware(request);
}
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};