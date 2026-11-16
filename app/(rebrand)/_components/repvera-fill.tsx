'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { REPVERA_EXAMPLE as R, repveraReceipts } from '@/lib/repvera-example'

/**
 * "Watch a real profile fill in" (Stephanie, Nov 16, 2026: show how RepVera
 * pulls in the different sections as people use it, so a job seeker goes from
 * "take my word for it" to proof). Four stages, shown on Stephanie's real
 * profile: you say it, receipts come in, their words and patterns show up,
 * traits are confirmed and the line is backed. It plays once when it scrolls
 * into view; tapping a stage stops it there. Reduced motion and no-JS show the
 * whole profile. Styles: repvera-fill-css.ts.
 */

const STAGES = [
  { title: 'You say it', line: 'On its own, “I’m known for…” is your word.' },
  { title: 'People who’ve worked with you send receipts', line: 'Managers, peers, clients. Each one is verified through their work email.' },
  { title: 'Their words show up, word for word', line: 'Nothing is paraphrased, and nobody sees anyone else’s answers.' },
  { title: 'Patterns become proof', line: 'A trait is confirmed when different kinds of people, at different companies, describe the same thing.' },
]

export function RepveraFill() {
  const total = repveraReceipts()
  const [stage, setStage] = useState(STAGES.length)
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef(0)
  const touched = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setStage(1)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return
        io.disconnect()
        let n = 1
        timer.current = window.setInterval(() => {
          n++
          setStage(n)
          if (n >= STAGES.length) window.clearInterval(timer.current)
        }, 2200)
      },
      { threshold: 0.2 },
    )
    io.observe(el.querySelector('.rf-profile') ?? el)
    return () => {
      io.disconnect()
      window.clearInterval(timer.current)
    }
  }, [])

  const show = (n: number) => `rf-sec${stage >= n ? ' rf-on' : ''}`
  const proven = stage >= 4

  return (
    <div className="rf" ref={ref}>
      <ol className="rf-stages">
        {STAGES.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={`rf-stage${stage === i + 1 ? ' rf-now' : ''}${stage > i ? ' rf-done' : ''}`}
              aria-pressed={stage === i + 1}
              onClick={() => {
                // A tap takes over from the autoplay.
                touched.current = true
                window.clearInterval(timer.current)
                setStage(i + 1)
              }}
            >
              <span className="rf-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                <b>{s.title}</b>
                <span className="rf-line">{s.line}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="rf-profile" aria-live="polite">
        <div className="rf-head">
          <span className="rf-av">
            <Image src={R.photo} alt="" width={96} height={96} />
          </span>
          <span>
            <b>{R.name}</b>
            <span>{R.headline}</span>
          </span>
          <span className={proven ? 'rf-badge rf-badge-on' : 'rf-badge'}>{proven ? `Backed by ${total} receipts` : 'Your word'}</span>
        </div>
        <p className="rf-known">
          I’m known for <mark>{R.knownFor}</mark>.
        </p>

        <div className={show(2)}>
          <p className="rf-k">
            Who’s behind it <span>{total} receipts</span>
          </p>
          <div className="rf-bar" aria-hidden="true">
            {R.who.map(([label, n], i) => (
              <i key={label} style={{ flexGrow: n, opacity: 1 - i * 0.09 }} />
            ))}
          </div>
          <p className="rf-legend">{R.who.map(([label, n]) => `${label} ${n}`).join(' · ')}</p>
        </div>

        <div className={`${show(3)} rf-two`}>
          <div>
            <p className="rf-k">How people describe her</p>
            <div className="rf-chips">
              {R.words.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
            <p className="rf-rule">{R.rules.verbatim}</p>
          </div>
          <div>
            <p className="rf-k">Strongest patterns</p>
            <div className="rf-patterns">
              {R.patterns.map(([label, w]) => (
                <p key={label}>
                  <span>{label}</span>
                  <i aria-hidden="true">
                    <b style={{ width: `${w}%` }} />
                  </i>
                </p>
              ))}
            </div>
            <p className="rf-rule">{R.rules.apart}</p>
          </div>
        </div>

        <div className={show(4)}>
          <p className="rf-k">Confirmed traits</p>
          <div className="rf-traits">
            {R.traits.map((t) => (
              <p key={t.name}>
                <b>{t.name}</b>
                <span className="rf-marks" aria-label={`${t.marks} of 3 marks`}>
                  {[1, 2, 3].map((m) => (
                    <i key={m} className={m <= t.marks ? 'rf-mark-on' : ''} />
                  ))}
                </span>
                <span className="rf-detail">{t.detail}</span>
              </p>
            ))}
          </div>
          <p className="rf-finding">
            <b>{R.said}</b> {R.finding}
          </p>
        </div>
      </div>
    </div>
  )
}
