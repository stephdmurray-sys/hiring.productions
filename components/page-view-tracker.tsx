'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Fires a beacon to /api/track/view on every page load and every
 * client-side route change. Lives in the root layout so it covers
 * every page on the site (homepage, /tools, /rank/*, every tool page,
 * etc.) without each page having to opt in.
 *
 * Why server-side beacon instead of relying solely on Vercel Analytics
 * or Microsoft Clarity:
 *   - I (the assistant) can read my own server-side event log via
 *     /api/admin/stats. Vercel Analytics and Clarity have no public
 *     read APIs, so without this beacon there's no way to query
 *     "how many visitors today" programmatically.
 *
 * Why /admin is excluded:
 *   - Operational dashboard traffic shouldn't pollute the funnel.
 *
 * Why we skip when /admin is in the path:
 *   - Same reason — but checked client-side so the beacon doesn't
 *     even fire from the dashboard tab.
 *
 * Why a ref and not state:
 *   - The ref prevents the StrictMode double-effect from firing two
 *     beacons on each navigation in dev. In production it's a no-op.
 */
export function PageViewTracker() {
  const pathname = usePathname()
  const lastTrackedRef = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return
    // Don't track admin dashboard hits — those would skew the funnel.
    if (pathname.startsWith('/admin')) return
    // Dedupe same-path renders (StrictMode + concurrent renders).
    if (lastTrackedRef.current === pathname) return
    lastTrackedRef.current = pathname

    const referrer =
      typeof document !== 'undefined' ? document.referrer.slice(0, 200) : ''

    // Fire-and-forget. Failure to track must never break the page.
    // keepalive: true so the request still completes if the user
    // navigates away mid-flight (browsers will keep the request alive
    // for up to a few seconds after page unload).
    fetch('/api/track/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, referrer }),
      keepalive: true,
    }).catch(() => {
      // Silent — analytics is never load-bearing.
    })
  }, [pathname])

  return null
}
