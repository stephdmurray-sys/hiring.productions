import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Edge middleware that gates the /admin route.
 *
 * Before this middleware, /admin was a public client-side page that
 * rendered a "paste your token to unlock" form when no token was
 * present. That UX confirmed to any visitor that an admin dashboard
 * exists — useful as an explicit signal, but ALSO an invitation for
 * the curious to attempt to guess or brute-force the token.
 *
 * Now: any request to /admin without a valid token returns a Next.js
 * 404. A visitor sees the same "page not found" experience they'd
 * see typing any other random URL on the site. No indication an
 * admin area exists at all.
 *
 * Auth model: token can arrive two ways.
 *   1. URL query param: /admin?token=XXX (the one-tap bookmark flow)
 *   2. Cookie hp_admin_token, planted automatically the first time a
 *      visitor presents a valid token in the URL
 *
 * Either path lets the dashboard load. Wrong/missing both = 404.
 *
 * If ADMIN_TOKEN env is unset the middleware fails closed (404 for
 * everyone) so a forgotten env var doesn't accidentally make /admin
 * public.
 */
export function middleware(request: NextRequest) {
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
  const res = NextResponse.next()
  if (urlToken === expected && cookieToken !== expected) {
    res.cookies.set('hp_admin_token', expected, {
      // Readable from client JS so the /admin page can pick it up
      // for its /api/admin/stats fetch without needing the URL param.
      // Security trade-off: a malicious JS injection could read this,
      // but the same threat model applies to the localStorage token
      // the page also uses. The middleware is what actually gates
      // access to the page render; the cookie is a UX convenience.
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      path: '/admin',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }
  return res
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
