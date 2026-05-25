import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Edge middleware. Does TWO things:
 *
 * 1. Supabase session refresh — runs on every route. Reads the refresh
 *    token from cookies, gets a new access token if needed, writes it
 *    back. Without this, users would silently sign out after the access
 *    token TTL (~1 hour).
 *
 * 2. Admin gating — for /admin routes only. Requires the ADMIN_TOKEN to
 *    arrive via ?token=XXX or the hp_admin_token cookie; otherwise 404
 *    (not 401 — we hide that an admin area exists at all).
 *
 * The two interact: the admin response carries the refreshed Supabase
 * cookies so Stephanie's admin session stays live alongside her
 * platform session.
 */
export async function middleware(request: NextRequest) {
  // Always refresh the Supabase session first, regardless of route.
  // The response carries the refreshed auth cookies, which we'll either
  // return as-is or use as the base for the admin gate below.
  const supabaseResponse = await updateSession(request)

  // Only the admin gate layers extra logic on top of the Supabase response.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const expected = process.env.ADMIN_TOKEN
    if (!expected) {
      return new NextResponse('Not found', { status: 404 })
    }

    const urlToken = request.nextUrl.searchParams.get('token')
    const cookieToken = request.cookies.get('hp_admin_token')?.value
    const authed = urlToken === expected || cookieToken === expected

    if (!authed) {
      return new NextResponse('Not found', { status: 404 })
    }

    // First-time URL-based auth: plant a cookie so the visitor can
    // bookmark just /admin (no token in the URL) and still get in.
    // Copy the cookie onto the Supabase-refreshed response so we don't
    // lose either the admin cookie or the refreshed auth cookies.
    if (urlToken === expected && cookieToken !== expected) {
      supabaseResponse.cookies.set('hp_admin_token', expected, {
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
        path: '/admin',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }
  }

  return supabaseResponse
}

export const config = {
  // Match every route EXCEPT static assets, Next internals, and api/auth
  // callback (which the auth callback route handler manages itself).
  // Includes /admin for the gate above; the gate is applied conditionally.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - api/track, api/stripe webhooks (no session needed)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/track|api/stripe).*)',
  ],
}
