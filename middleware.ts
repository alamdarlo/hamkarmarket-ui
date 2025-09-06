// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // API routes
  const isApiRoute = pathname.startsWith('/api');

  // Auth routes
  const isAuthRoute = pathname.startsWith('/(auth)');

  // Dashboard routes
  const isDashboardRoute = pathname.startsWith('/(dashboard)');

  // Redirect to dashboard if trying to access root
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Handle API routes
  if (isApiRoute) {
    // Allow API auth routes without token
    if (pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }

    // Check token for other API routes
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isValid = await verifyToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    return NextResponse.next();
  }

  // Handle auth routes
  if (isAuthRoute && token) {
    try {
      await verifyToken(token);
      // Redirect to dashboard if already authenticated
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Token is invalid, allow access to auth pages
    }
  }

  // Handle dashboard routes
  if (isDashboardRoute && !token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check admin routes
  if (pathname.startsWith('/(dashboard)/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const payload = await verifyToken(token);
      const user = payload as any;

      if (!user.roles || !user.roles.includes('Admin')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};