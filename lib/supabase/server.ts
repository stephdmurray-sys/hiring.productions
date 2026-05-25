/**
 * Supabase SERVER client.
 *
 * Used in Server Components, Route Handlers, and Server Actions to read/write
 * data on behalf of the signed-in user. Session is read from Next's cookies()
 * helper — this client respects RLS, so it can only see the current user's
 * rows.
 *
 * For service-role operations (Stripe webhooks, admin tasks, scheduled jobs)
 * use createAdminClient() instead — it bypasses RLS.
 */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // `setAll` was called from a Server Component — Next forbids
            // mutating cookies there. The middleware refresh handles this
            // case, so the error is safe to ignore here.
          }
        },
      },
    },
  )
}

/**
 * Service-role client — bypasses RLS. Use only in:
 *   - Stripe webhook handlers (need to flip membership_tier across users)
 *   - Scheduled jobs that operate on all users
 *   - Migration / admin scripts
 *
 * Never expose to Client Components. Never use to handle user requests
 * without manually scoping queries — RLS isn't doing it for you here.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  )
}
