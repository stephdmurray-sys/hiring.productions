'use client'

import { useEffect } from 'react'

/**
 * Score bars fill when they scroll into view (or when a hidden tab is
 * opened), instead of finishing off-screen before anyone sees them.
 * Without JavaScript, or with reduced motion, bars simply show full.
 */
export function Motion() {
  // The sticky "On this page" bar marks the section you're reading, so you always know where you are.
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc-bar a[href^="#"]'))
    if (!links.length) return
    const targets = links.map((a) => document.getElementById(a.hash.slice(1))).filter((el): el is HTMLElement => !!el)
    const mark = () => {
      const line = 140
      let current: HTMLElement | undefined
      for (const t of targets) if (t.getBoundingClientRect().top <= line) current = t
      for (const a of links) {
        if (current && a.hash === `#${current.id}`) a.setAttribute('aria-current', 'true')
        else a.removeAttribute('aria-current')
      }
    }
    mark()
    window.addEventListener('scroll', mark, { passive: true })
    return () => window.removeEventListener('scroll', mark)
  }, [])

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

    // Sections and cards below the first screen ease in as they arrive, a few at a time, so the page
    // feels like it moves with you. Anything already on screen (or above it) is never hidden.
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('rv-show')
          e.target.classList.remove('rv-hide')
          reveal.unobserve(e.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(
        'section, .guide, .g-card, .rec-sit, .cast, .pick, .efile, .vid, .row, .side, .sl-tool, .sign',
      ),
    ).filter((el) => !el.closest('footer, nav, header, .site-nav') && !el.querySelector('section'))
    const seen = new Set<HTMLElement>()
    for (const el of items) {
      if (seen.has(el)) continue
      seen.add(el)
      const r = el.getBoundingClientRect()
      if (el.offsetParent === null || r.top <= vh) continue
      // stagger siblings of the same kind
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.className === el.className) : []
      const i = Math.max(0, sibs.indexOf(el))
      el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`
      el.classList.add('rv-hide')
      reveal.observe(el)
    }
    return () => {
      io.disconnect()
      reveal.disconnect()
    }
  }, [])
  return null
}
