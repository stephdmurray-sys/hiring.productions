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
