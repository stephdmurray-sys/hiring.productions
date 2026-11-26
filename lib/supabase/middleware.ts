/**
 * Session refresh middleware — runs on every request.
 *
 * Supabase auth tokens expire and need refreshing. Without this, users would
 * get silently signed out after the access token TTL (~1 hour). The middleware
 * fires before every request, reads the refresh token from cookies, gets a
 * new access token if needed, and writes it back.
 *
 * IMPORTANT: this must run on EVERY route that could have an authenticated
 * user. The middleware.ts at the repo root applies this via matcher.
 *
 * Pattern from @supabase/ssr docs (Next.js App Router section).
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Nobody signed in (every visitor and every search crawler since sign-in
  // was retired on Nov 14, 2026): there is no session to refresh, so skip the
  // Supabase call entirely. Nov 26, 2026: Search Console reported server
  // errors (5xx); a page should never fail because this refresh did.
  const hasSession = request.cookies.getAll().some((c) => c.name.startsWith('sb-'))
  if (!hasSession) return supabaseResponse

  try {
    return await refreshSession(request, supabaseResponse)
  } catch (err) {
    console.error('Supabase session refresh failed; serving the page anyway', err)
    return NextResponse.next({ request })
  }
}

async function refreshSession(request: NextRequest, initial: NextResponse) {
  let supabaseResponse = initial

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // CRITICAL: don't run code between createServerClient and getUser() —
  // a missing await or out-of-order call breaks the session refresh.
  await supabase.auth.getUser()

  return supabaseResponse
}
