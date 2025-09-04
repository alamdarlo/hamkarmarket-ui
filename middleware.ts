import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const userCookie = request.cookies.get('user');
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/'];
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route
  );
  
  // If trying to access a protected route without a token
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If trying to access auth routes while already authenticated
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  // Check for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!userCookie) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    try {
      const user = JSON.parse(userCookie.value);
      if (!user.roles || !user.roles.includes('Admin')) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};