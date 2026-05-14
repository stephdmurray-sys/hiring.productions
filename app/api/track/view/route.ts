import { NextRequest, NextResponse } from 'next/server'
import { resolveIdentity, COOKIE_NAMES } from '@/lib/identity'
import { logEvent } from '@/lib/event-log'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * /api/track/view — page-view beacon.
 *
 * Fires from a client-side component in the root layout on every page
 * load and every client-side route change. Logs a `page_view` event
 * containing the path + the visitor's anon key, so the /admin dashboard
 * can compute:
 *   - Total page views per day
 *   - Unique visitors per day (distinct anon keys)
 *   - Top pages by visits
 *
 * Why a server-side endpoint instead of just relying on Vercel
 * Analytics: I (the assistant) can curl my own endpoint anytime to
 * read the operational state. Vercel Analytics doesn't expose an API.
 *
 * Cost shape: every page load = 2 Redis commands (ZADD + occasional
 * ZREMRANGEBYSCORE). For ~500 visitors × 3 pages/day = ~3k commands/day,
 * well within Upstash free tier. If the site grows past ~3k visitors/day
 * this becomes the dominant Redis traffic and we'd want to either
 * batch writes or sample.
 *
 * Body shape:
 *   { path: string, referrer?: string }
 *
 * Returns 204 — no body, no caching, very cheap. Errors swallow
 * silently because failed analytics should never break a page load.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      path?: string
      referrer?: string
    }

    const path = (body.path ?? '').toString().slice(0, 200)
    if (!path) return new NextResponse(null, { status: 204 })

    // Reuse the existing identity helper so we get the SAME anon key
    // that gates and quota track. Means uniques in /admin map 1:1 to
    // the same people the rest of the gate logic sees.
    const identity = await resolveIdentity(request)

    void logEvent('page_view', {
      tier: identity.tier,
      // Anon key (or hashed email / Stripe customer ID for logged-in
      // users) — used in the dashboard to compute unique visitors.
      meta: {
        path,
        anonId: identity.key.slice(0, 24),
        referrer: (body.referrer ?? '').toString().slice(0, 200),
      },
    })

    const res = new NextResponse(null, { status: 204 })

    // If we just minted a fresh anon token, plant it so subsequent
    // requests get the same identity — keeps uniques accurate.
    if (identity.newAnonToken) {
      res.cookies.set(COOKIE_NAMES.ANON, identity.newAnonToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
    }

    return res
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
