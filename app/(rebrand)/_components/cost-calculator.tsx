'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'

/**
 * What will your search cost? Drag the months; every tool re-sorts by the
 * cheapest way to pay for that long (computed from published plans), with
 * what a year costs if you forget to cancel shown beside it. All numbers
 * are computed on the server from lib/evidence and passed in.
 */

export interface CalcTool {
  id: string
  name: string
  domain: string
  /** costs[m - 1] = cheapest total for m months, m = 1..12 */
  costs: number[]
  /** forgets[m - 1] = what the first year costs if you pay for m months, then forget to cancel */
  forgets: number[]
  renews4w: boolean
  approx: boolean
  free: string
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}


export function CostCalculator({ tools, checked, initial = 3 }: { tools: CalcTool[]; checked: string; initial?: number }) {
  const [months, setMonths] = useState(initial)
  const id = useId()
  const max = Math.max(...tools.flatMap((t) => t.forgets))
  const sorted = [...tools].sort((a, b) => a.costs[months - 1] - b.costs[months - 1])
  const plural = months === 1 ? '' : 's'

  // When the order changes, slide each row from where it was to where it is now.
  const rowEls = useRef(new Map<string, HTMLDivElement>())
  const lastTop = useRef(new Map<string, number>())
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rowEls.current.forEach((el, key) => {
      const top = el.offsetTop
      const before = lastTop.current.get(key)
      if (!reduce && before !== undefined && before !== top && typeof el.animate === 'function') {
        el.animate([{ transform: `translateY(${before - top}px)` }, { transform: 'translateY(0)' }], {
          duration: 420,
          easing: 'cubic-bezier(.2,.7,.2,1)',
        })
      }
      lastTop.current.set(key, top)
    })
  }, [months])

  return (
    <div className="calc">
      <div className="calc-top">
        <label className="calc-q" htmlFor={id}>
          If your search takes
          <output htmlFor={id}>
            {months} month{plural}
          </output>
        </label>
        <div>
          <input
            id={id}
            className="calc-range"
            type="range"
            min={1}
            max={12}
            step={1}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            aria-valuetext={`${months} month${plural}`}
          />
          <div className="calc-ticks" aria-hidden="true">
            <span>1 mo</span>
            <span>3</span>
            <span>6</span>
            <span>9</span>
            <span>12 mo</span>
          </div>
          <div className="calc-key">
            <span>
              <i className="k-on" />
              Cheapest way to pay for {months} month{plural}
            </span>
            <span>
              <i className="k-forget" />
              The first year, if you then forget to cancel
            </span>
          </div>
        </div>
      </div>
      <div role="list" aria-live="polite">
        {sorted.map((t) => {
          const on = t.costs[months - 1]
          const forget = t.forgets[months - 1]
          const forgetMore = forget > on + 0.005
          return (
            <div
              className="calc-row"
              role="listitem"
              key={t.id}
              ref={(el) => {
                if (el) rowEls.current.set(t.id, el)
                else rowEls.current.delete(t.id)
              }}
            >
              <span className="lg" style={{ width: 36, height: 36, fontSize: 15 }} aria-hidden="true">
                <span className="lg-letter">{t.name.charAt(0)}</span>
                <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=128`} alt="" loading="lazy" />
              </span>
              <span className="calc-name">
                <b>
                  <a href={`/reviews/${t.id}`}>{t.name}</a>
                </b>
                {t.renews4w ? <small className="warn">Renews every 4 weeks</small> : <small>Free: {t.free}</small>}
              </span>
              <span className="calc-bar" aria-hidden="true">
                <span className="forget" style={{ width: `${(forget / max) * 100}%` }} />
                <span className="on" style={{ width: `${(on / max) * 100}%` }} />
              </span>
              <span className="calc-cost">
                <b>
                  {t.approx ? 'about ' : ''}
                  {money(on)}
                </b>
                {forgetMore ? (
                  <span className={t.renews4w ? 'warn' : undefined}>{money(forget)} a year if you forget</span>
                ) : (
                  <span>no renewal inside a year</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
      <p className="calc-foot">
        Paid plans only, from each pricing page as of {checked}. A month is 30 days, so 4-week plans bill 13 times a year. Several tools have a
        free tier that may be all you need.
      </p>
    </div>
  )
}
