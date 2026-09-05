// middleware.ts
// Updated security middleware compatible with Edge runtime (Next.js 16+)
// Applies strict security headers to all dynamic routes while excluding static assets.

import { NextResponse } from 'next/server';

export function proxy() {
  const response = NextResponse.next();

  const isDev = process.env.NODE_ENV === 'development';
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com",
    "font-src 'self' data:",
    "connect-src 'self' ws: wss:",
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
