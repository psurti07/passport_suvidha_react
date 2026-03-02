import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // 1. Get the token from the cookies
  const token = request.cookies.get('authToken')?.value

  // 2. Check if the user is trying to access a protected route (/portal)
  const { pathname } = request.nextUrl
  const isPortalPath = pathname.startsWith('/portal')

  // 3. Redirect to signin if token is missing and path is protected
  if (!token && isPortalPath) {
    // console.log('Middleware: No token found, redirecting to /signin');
    const url = request.nextUrl.clone()
    url.pathname = '/signin'
    // Optionally add the original path as a query param for redirecting back after login
    // url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // 4. If user is logged in (has token) and tries to access signin page, redirect to portal
  // Optional: You might want to remove this if users should be able to see the sign-in page even when logged in.
  if (token && pathname === '/signin') {
    // console.log('Middleware: Token found, redirecting from /signin to /portal');
    const url = request.nextUrl.clone()
    url.pathname = '/portal'
    return NextResponse.redirect(url)
  }

  // 5. Allow the request to proceed if none of the above conditions are met
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.png, *.jpg, *.jpeg, *.gif, *.svg (image files)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg)).*)',
  ],
} 