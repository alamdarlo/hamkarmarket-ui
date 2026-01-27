import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
 
const ADMIN_ROUTES = ['/admin']
const USER_ROUTES = ['/dashboard']

export function proxy(request: NextRequest) {
  const publicPaths = ['/Home','/login', '/api/auth/login', '/api/auth/refresh', '/favicon.ico'];
  const path = request.nextUrl.pathname;

  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next(); // اجازه عبور بدون check
  }

    const token = request.cookies.get('access_token')?.value;

  if (!token) {
    // redirect به login فقط اگر مسیر فعلی login نیست
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// try {
//     const payload = jwt.decode(token) as { roles: string[] }

//     const path = request.nextUrl.pathname

//     if (
//       ADMIN_ROUTES.some((r) => path.startsWith(r)) &&
//       !payload.roles.includes('Admin')
//     ) {
//       return NextResponse.redirect(new URL('/403', request.url))
//     }

//     if (
//       USER_ROUTES.some((r) => path.startsWith(r)) &&
//       !payload.roles.includes('User')
//     ) {
//       return NextResponse.redirect(new URL('/403', request.url))
//     }

//     return NextResponse.next()
//   } catch {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }


}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
// export const config = {
//   matcher: '/about/:path*',
// }