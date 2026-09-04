// middleware.ts
// Updated security middleware compatible with Edge runtime (Next.js 16+)
// Applies strict security headers to all dynamic routes while excluding static assets.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Static Content Security Policy (no nonce, suitable for Edge runtime)
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=()');

  return response;
}

export const config = {
  // Apply to all paths except static files and API routes.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
