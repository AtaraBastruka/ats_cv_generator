// middleware.ts - Make sure this is at the ROOT of your project
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);


export const config = {
  matcher: [// This regex excludes:
    // 1. /api/ routes
    // 2. /_next/static (Next.js's static assets like JS, CSS chunks)
    // 3. /_next/image (Next.js's image optimization API)
    // 4. /favicon.ico
    // 5. Any path that contains a dot (e.g., .css, .js, .png, .svg, .webp) - this catches all your static assets
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};