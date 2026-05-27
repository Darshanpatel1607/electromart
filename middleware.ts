import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/crm') || request.nextUrl.pathname.startsWith('/follow-ups') || request.nextUrl.pathname.startsWith('/tasks') || request.nextUrl.pathname.startsWith('/calendar')) {
    const token = request.cookies.get('admin_auth')?.value;
    if (token !== '1') return NextResponse.redirect(new URL('/admin-login', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/crm/:path*', '/follow-ups/:path*', '/tasks/:path*', '/calendar/:path*'] };
