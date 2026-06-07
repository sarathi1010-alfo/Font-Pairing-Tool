import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  const response = NextResponse.next();

  // Prevent Google from indexing Vercel deployment URLs directly.
  // This ensures only the custom domains (e.g. paletteflow.alfo.online) get indexed.
  if (hostname.includes('.vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

// Only run middleware on non-static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
