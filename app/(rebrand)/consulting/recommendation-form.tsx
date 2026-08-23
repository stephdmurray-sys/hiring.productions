'use client'

import { useState } from 'react'

const HIRES = ['Under 20 hires a year', '20 to 50 hires a year', '50+ hires a year', 'High-volume hourly']

export function RecommendationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setError(json.error ?? 'Something went wrong. Email hello@hiring.productions and we will take it from there.')
        return
      }
      setStatus('done')
    } catch {
      setStatus('error')
      setError('Something went wrong. Email hello@hiring.productions and we will take it from there.')
    }
  }

  return (
    <div className="rec-layout wrap">
      <div className="rec-form">
        {status === 'done' ? (
          <div className="rec-done">
            <b>Got it.</b> Your recommendation lands in your inbox within two
            business days, from Stephanie, with the reasoning attached. Check
            your spam folder if it has not arrived by then.
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <label htmlFor="rec-name">Your name</label>
            <input id="rec-name" name="name" required maxLength={120} />

            <label htmlFor="rec-email">Work email</label>
            <input id="rec-email" name="email" type="email" required maxLength={200} />

            <label htmlFor="rec-company">Company</label>
            <input id="rec-company" name="company" required maxLength={160} />

            <label htmlFor="rec-hires">How many hires a year?</label>
            <select id="rec-hires" name="hires" required defaultValue="">
              <option value="" disabled>
                Pick the closest tier
              </option>
              {HIRES.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <label htmlFor="rec-roles">What are you hiring?</label>
            <input
              id="rec-roles"
              name="roles"
              required
              maxLength={240}
              placeholder="e.g. 2 engineers, a nurse practitioner, seasonal warehouse staff"
            />

            <label htmlFor="rec-stack">Current tools, if any</label>
            <input id="rec-stack" name="stack" maxLength={240} placeholder="ATS, job boards, spreadsheets, nothing yet" />

            <label htmlFor="rec-pain">What is breaking right now?</label>
            <textarea
              id="rec-pain"
              name="pain"
              maxLength={2000}
              placeholder="Slow to offer, no pipeline visibility, candidates ghosting, too many tools"
            />

            <button className="rec-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send my situation'}
            </button>
            {status === 'error' && <p className="rec-error">{error}</p>}
          </form>
        )}
      </div>

      <div className="rec-side">
        <h2>What comes back</h2>
        <div className="rec-point">
          <span className="rec-n">1</span>
          <span>
            <b>A named stack, not a list of options.</b> The ATS, the boards,
            and the screening setup we would run for your exact tier and
            volume.
          </span>
        </div>
        <div className="rec-point">
          <span className="rec-n">2</span>
          <span>
            <b>The reasoning, with receipts.</b> Every pick traces to the same
            scoring you can read on <a href="/how-we-review" style={{ color: 'var(--purple)', fontWeight: 600 }}>How We Review</a>.
            Vendors cannot pay for placement, rankings, or scores.
          </span>
        </div>
        <div className="rec-point">
          <span className="rec-n">3</span>
          <span>
            <b>A straight answer on whether you need help.</b> Most teams just
            need the right tools. If your situation needs more than a stack,
            we will say so, and you decide from there.
          </span>
        </div>
        <div className="rec-point">
          <span className="rec-n">4</span>
          <span>
            <b>From a practitioner, not a portal.</b> Written by Stephanie
            Murray: 18 years in-house, scaled a healthcare company from 19
            employees to 1,500 clinicians.
          </span>
        </div>
      </div>
    </div>
  )
}
