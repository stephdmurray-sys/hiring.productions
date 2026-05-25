/**
 * Supabase BROWSER client.
 *
 * Used in Client Components ("use client") that need to interact with
 * Supabase from the browser — typically for auth flows (sign-in, sign-out)
 * and listening to auth-state changes.
 *
 * Never imports the service-role key. All queries go through the anon key
 * + Row Level Security, so users can only read/write their own rows.
 *
 * Per @supabase/ssr docs: use `createBrowserClient` in Client Components,
 * `createServerClient` in Server Components, Route Handlers, and Server
 * Actions. Don't mix them — the cookie/session handling differs.
 */
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
