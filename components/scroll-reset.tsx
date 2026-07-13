'use client'

import { Suspense, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Resets scroll to the top on every client-side route change.
 *
 * Why this exists: globals.css sets `scroll-behavior: smooth` on <html>.
 * Next.js resets scroll on navigation with a plain window.scrollTo(0, 0),
 * which CSS turns into an ANIMATED scroll that gets canceled by the render
 * churn of the incoming page. Net effect in production: scroll position
 * persisted across navigations, so clicking a bottom-of-page CTA landed
 * visitors mid-page (or staring at the footer) on the next screen. Worst
 * case observed: homepage bottom CTA -> /sign-in rendered as a blank
 * viewport because the form was scrolled out of view.
 *
 * `behavior: 'instant'` bypasses the CSS smooth behavior entirely, so the
 * reset always lands. Smooth scrolling is preserved everywhere else
 * (anchor links, user scrolling).
 *
 * Back/forward navigations are exempt: the browser (and Next.js) restore
 * the previous scroll position on popstate, and stomping that would break
 * the "go back to where I was" expectation.
 */
function ScrollResetInner() {
  const pathname = usePathname()
  const isPopStateRef = useRef(false)
  const lastPathRef = useRef(pathname)

  useEffect(() => {
    const onPopState = () => {
      isPopStateRef.current = true
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (pathname === lastPathRef.current) return
    lastPathRef.current = pathname

    if (isPopStateRef.current) {
      // Browser back/forward — let scroll restoration do its thing.
      isPopStateRef.current = false
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

// usePathname needs a Suspense boundary to keep static generation happy.
export function ScrollReset() {
  return (
    <Suspense fallback={null}>
      <ScrollResetInner />
    </Suspense>
  )
}
