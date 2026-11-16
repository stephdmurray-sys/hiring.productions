'use client'

import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { REPVERA_EXAMPLE as R, repveraReceipts } from '@/lib/repvera-example'
import { keepLast } from '@/lib/site-line'

/**
 * "Watch a real profile fill in" (Stephanie, Nov 16, 2026): how a RepVera
 * profile pulls in each section as receipts arrive, so a job seeker goes from
 * "take my word for it" to proof. Laid out the way the real profile is, at
 * full width, inside a product window: four steps across the top, then the
 * profile, filling in step by step on Stephanie's real data.
 * Plays once when the profile scrolls into view: each step lights up and
 * its sections fill in, 1.5 seconds apart, until the whole profile shows.
 * The steps are not buttons (Stephanie, Nov 16, 2026: the numbers weren't
 * obvious to click). Reduced motion and no-JS show the whole profile.
 * Styles: repvera-fill-css.ts.
 */

const SHARED = [
  { title: 'Receipts come in', line: 'From managers, peers and clients, each verified through their work email.' },
  { title: 'Their words show up', line: 'Word for word. Nobody sees anyone else’s answers.' },
  { title: 'Patterns become proof', line: 'A trait is confirmed when different kinds of people, at different companies, say the same thing.' },
]

/** Step one is the only one that changes by side: the job seeker's own word, or the candidate's resume (hiring answer, Nov 16, 2026). */
const STEPS_BY_SIDE = {
  seekers: [{ title: 'You say it', line: 'On its own, what you’re known for is your word.' }, ...SHARED],
  hiring: [{ title: 'The resume says it', line: 'On its own, a resume is the candidate’s word.' }, ...SHARED],
}

/** Shades for the relationship types, darkest first. */
const SHADES = ['#1a1a22', '#3b2a99', '#5432e0', '#6c47ff', '#8a6dff', '#a78bfa', '#c4b2fc', '#dcd2fd']

function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split(/\[\[|\]\]/).map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>))}
    </>
  )
}

export function RepveraFill({ side = 'seekers' }: { side?: 'seekers' | 'hiring' }) {
  const STEPS = STEPS_BY_SIDE[side]
  const total = repveraReceipts()
  const [step, setStep] = useState(STEPS.length)
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setStep(1)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        let n = 1
        timer.current = window.setInterval(() => {
          n++
          setStep(n)
          if (n >= STEPS.length) window.clearInterval(timer.current)
        }, 1500)
      },
      { threshold: 0.2 },
    )
    io.observe(el.querySelector('.rfw') ?? el)
    return () => {
      io.disconnect()
      window.clearInterval(timer.current)
    }
  }, [])

  const at = (n: number) => (step >= n ? ' rf-on' : '')
  const proven = step >= 4
  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className={`rf rf-${side}`} ref={ref}>
      <ol className="rf-steps" style={{ ['--rf-progress' as string]: `${progress}%` }}>
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <div className={`rf-step${step === i + 1 ? ' rf-now' : ''}${step > i ? ' rf-done' : ''}`} aria-current={step === i + 1 ? 'step' : undefined}>
              <span className="rf-n" aria-hidden="true">
                {i + 1}
              </span>
              <b>{keepLast(s.title)}</b>
              <span className="rf-line">{keepLast(s.line)}</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="rfw" aria-live="polite">
        <div className="rfw-bar" aria-hidden="true">
          <span className="rfw-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="rfw-url">{R.profilePath}</span>
        </div>

        <div className="rfw-in">
          <div className="rfw-head">
            <span className="rfw-av">
              <Image src={R.photo} alt="" width={128} height={128} />
            </span>
            <div className="rfw-who">
              <p className="rfw-name">{R.name}</p>
              <p className="rfw-role">{R.headline}</p>
              <p className="rfw-bio">{keepLast(R.bio)}</p>
            </div>
            <span className={proven ? 'rfw-badge rfw-badge-on' : 'rfw-badge'}>{proven ? `Backed by ${total} receipts` : side === 'hiring' ? 'Their word' : 'Your word'}</span>
          </div>
          <p className="rfw-tabs" aria-hidden="true">
            {R.tabs.map((t, i) => (
              <span key={t} className={i === 0 ? 'rfw-tab-on' : ''}>
                {t}
              </span>
            ))}
          </p>

          {/* A RepVera profile is written by other people, so it never says "I'm" (Stephanie, Nov 16, 2026). */}
          <div className="rfw-row rfw-row-full">
            <div>
              <p className="rfw-known">
                Known for <mark>{R.knownFor}</mark>.
              </p>
              <p className="rfw-known-more">{keepLast(R.knownMore)}</p>
            </div>
          </div>

          <div className={`rfw-row rf-sec${at(2)}`}>
            <p className="rfw-k">Who’s behind it</p>
            <div>
              <div className="rfw-stack" aria-hidden="true">
                {R.who.map(([label, n], i) => (
                  <i key={label} style={{ flexGrow: n, background: SHADES[i] }} />
                ))}
              </div>
              <ul className="rfw-legend">
                {R.who.map(([label, n], i) => (
                  <li key={label}>
                    <i style={{ background: SHADES[i] }} aria-hidden="true" />
                    {label} <b>{n}</b>
                  </li>
                ))}
                <li className="rfw-total">
                  <b>{total}</b> receipts
                </li>
              </ul>
            </div>
          </div>

          <div className="rfw-row">
            <p className="rfw-k">The read</p>
            <div className="rfw-read">
              <div className={`rfw-card rfw-summary rf-sec${at(3)}`}>
                <p className="rfw-ck">Summary</p>
                <p className="rfw-text">
                  <Bold text={keepLast(R.summary)} />
                </p>
              </div>
              <div className={`rfw-card rf-sec${at(3)}`}>
                <p className="rfw-ck">Strongest patterns</p>
                <div className="rfw-patterns">
                  {R.patterns.map(([label, w]) => (
                    <p key={label}>
                      <span>{label}</span>
                      <i aria-hidden="true">
                        <b style={{ width: step >= 3 ? `${w}%` : '0%' }} />
                      </i>
                    </p>
                  ))}
                </div>
                <p className="rfw-note">{keepLast(R.rules.apart)}</p>
              </div>
              <div className={`rfw-card rf-sec${at(3)}`}>
                <p className="rfw-ck">How people describe her</p>
                <div className="rfw-chips">
                  {R.words.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <p className="rfw-note">{keepLast(R.rules.verbatim)}</p>
              </div>
              <div className={`rfw-card rf-sec${at(4)}`}>
                <p className="rfw-ck">Confirmed traits</p>
                <div className="rfw-traits">
                  {R.traits.map((t) => (
                    <div key={t.name}>
                      <p>
                        <b>{t.name}</b>
                        <span className="rfw-marks" aria-label={`${t.marks} of 3 marks`}>
                          {[1, 2, 3].map((m) => (
                            <i key={m} className={m <= t.marks ? 'rfw-mark-on' : ''} />
                          ))}
                        </span>
                      </p>
                      <p className="rfw-detail">{keepLast(t.detail)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`rfw-card rf-sec${at(4)}`}>
                <p className="rfw-ck">Selected values</p>
                <ul className="rfw-values">
                  {R.values.map((v) => (
                    <li key={v}>
                      {v}
                      <i aria-label="Echoed in receipts" />
                    </li>
                  ))}
                </ul>
                <p className="rfw-note">{keepLast(R.rules.values)}</p>
              </div>
            </div>
          </div>

          <div className={`rfw-row rf-sec${at(4)}`}>
            <p className="rfw-k">The finding</p>
            <p className="rfw-finding">
              <b>{R.said}</b> {keepLast(R.finding)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
