/**
 * Magic-link callback handler.
 *
 * When a user clicks the magic-link in their email, Supabase routes them
 * to this URL with a `code` query param. We exchange the code for a
 * session, then redirect into the app.
 *
 * Where they land depends on state:
 *   - No profile.current_scene set → /onboarding (capture target role)
 *   - Profile fully onboarded → /dashboard
 *   - ?next=/some/path was passed → respect that override
 *
 * Pattern from @supabase/ssr docs (Next App Router Server-side Auth flow).
 */
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? null

  if (!code) {
    // No code = invalid callback. Bounce back to sign-in with an error flag.
    return NextResponse.redirect(`${origin}/sign-in?error=missing_code`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent(error.message)}`,
    )
  }

  // Explicit override wins.
  if (next) {
    return NextResponse.redirect(`${origin}${next}`)
  }

  // Otherwise: check whether this user has completed onboarding. Brand-new
  // users land on the magic-link callback for the first time with an
  // empty profile (current_scene = null). Send them to onboarding.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/sign-in?error=no_user`)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_scene')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile?.current_scene) {
    return NextResponse.redirect(`${origin}/onboarding`)
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
