'use client'

import { useEffect } from 'react'

/**
 * Score bars fill when they scroll into view (or when a hidden tab is
 * opened), instead of finishing off-screen before anyone sees them.
 * Without JavaScript, or with reduced motion, bars simply show full.
 */
export function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.remove('rv-wait')
          io.unobserve(e.target)
        }
      },
      { threshold: 0.2 },
    )
    const vh = window.innerHeight
    for (const b of Array.from(document.querySelectorAll<HTMLElement>('.board'))) {
      const r = b.getBoundingClientRect()
      const hidden = b.offsetParent === null
      if (hidden || r.top > vh * 0.9 || r.bottom < 0) {
        b.classList.add('rv-wait')
        io.observe(b)
      }
    }
    return () => io.disconnect()
  }, [])
  return null
}
