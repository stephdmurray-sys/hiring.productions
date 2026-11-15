'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The "what happens after you click apply" flow chart (Stephanie, Nov 15,
 * 2026: "bring back the flow chart... we want cool interactive elements").
 * As you scroll, the line fills in and each step lights up; "Why?" opens the
 * detail behind a step, so the page stays short until someone asks for more.
 * With reduced motion, every step shows lit and nothing moves.
 * Styles live in ats-flow-css.ts (a client module can't hand CSS to a server page).
 */

export interface FlowStep {
  title: string
  todo: string
  why: string
  /** A link under the detail. Arrows: up for a section above, down for one below, across for another page. */
  more?: { href: string; label: string; up?: boolean }
  /** The step that can say no without a person. */
  auto?: boolean
}

export function AtsFlow({ steps }: { steps: FlowStep[] }) {
  const ref = useRef<HTMLOListElement>(null)
  // Server render and no-JS: every step lit.
  const [reached, setReached] = useState(steps.length)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const ol = ref.current
    if (!ol || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(ol.querySelectorAll<HTMLElement>('.af-step'))
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.62
        let n = 0
        items.forEach((el, i) => {
          if (el.getBoundingClientRect().top < line) n = i + 1
        })
        setReached(n)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <ol className="af" ref={ref}>
      {steps.map((s, i) => {
        const lit = i < reached
        const isOpen = open === i
        const id = `af-why-${i}`
        return (
          <li key={s.title} className={`af-step${s.auto ? ' af-auto' : ''}${lit ? ' af-lit' : ''}`}>
            {i < steps.length - 1 && (
              <span className="af-seg" aria-hidden="true">
                <span className={i + 1 < reached ? 'af-fill af-fill-on' : 'af-fill'} />
              </span>
            )}
            <span className="af-n" aria-hidden="true">
              {i + 1}
            </span>
            <div className="af-card">
              {s.auto && <span className="af-tag">The automatic no</span>}
              <h3>{s.title}</h3>
              <p className="af-todo">
                <b>Do this: </b>
                {s.todo}
              </p>
              <button type="button" className="af-why-btn" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : i)}>
                {isOpen ? 'Got it' : 'Why?'}
                <span className="af-chev" aria-hidden="true" />
              </button>
              <div className="af-why" id={id} hidden={!isOpen}>
                <p>{s.why}</p>
                {s.more && (
                  <a className="tl" href={s.more.href}>
                    {s.more.label} <span className="arr">{s.more.up ? '\u2191' : s.more.href.startsWith('#') ? '\u2193' : '\u2192'}</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
