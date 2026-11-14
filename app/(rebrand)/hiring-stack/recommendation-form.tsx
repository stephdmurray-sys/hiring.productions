'use client'

import { useState } from 'react'
import { OWNERSHIP_DISCLOSURE } from '@/lib/repvera'

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
        setError(json.error ?? 'Something went wrong. Email hello@hiring.productions and we\u2019ll take it from there.')
        return
      }
      setStatus('done')
    } catch {
      setStatus('error')
      setError('Something went wrong. Email hello@hiring.productions and we\u2019ll take it from there.')
    }
  }

  return (
    <div className="cs wrap">
      <div className="cs-form">
        {status === 'done' ? (
          <div className="cs-done" role="status">
            <b>Got it.</b> Your recommendation lands in your inbox within two business days, from Stephanie, with the reasoning attached. If
            it hasn&rsquo;t arrived by then, check your spam folder.
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <label htmlFor="rec-name">Your name</label>
            <input id="rec-name" name="name" required maxLength={120} autoComplete="name" />

            <label htmlFor="rec-email">Work email</label>
            <input id="rec-email" name="email" type="email" required maxLength={200} autoComplete="email" />

            <label htmlFor="rec-company">Company</label>
            <input id="rec-company" name="company" required maxLength={160} autoComplete="organization" />

            <label htmlFor="rec-hires">How many hires a year?</label>
            <select id="rec-hires" name="hires" required defaultValue="">
              <option value="" disabled>
                Pick the closest
              </option>
              {HIRES.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <label htmlFor="rec-roles">What are you hiring?</label>
            <input id="rec-roles" name="roles" required maxLength={240} placeholder="2 engineers, a nurse practitioner, seasonal warehouse staff" />

            <label htmlFor="rec-stack">What do you use now?</label>
            <input id="rec-stack" name="stack" maxLength={240} placeholder="An ATS, job boards, spreadsheets, nothing yet" />

            <label htmlFor="rec-pain">What&rsquo;s breaking right now?</label>
            <textarea id="rec-pain" name="pain" maxLength={2000} placeholder="Slow to offer, no view of the pipeline, candidates ghosting, too many tools" />

            <button className="btn btn-indigo" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending\u2026' : 'Send my situation'}
            </button>
            {status === 'error' && (
              <p className="cs-error" role="alert">
                {error}
              </p>
            )}
            <p className="cs-fine">
              {OWNERSHIP_DISCLOSURE} <a href="/privacy">Privacy</a>
            </p>
          </form>
        )}
      </div>

      <div className="cs-side">
        <h2>What comes back</h2>
        <ul>
          <li>
            <b>The tools she would run.</b>
            The applicant tracking system, the job boards and the screening setup she would use for your hiring volume, named.
          </li>
          <li>
            <b>Why she picked each one.</b>
            Every pick traces to the scores you can read on <a href="/how-we-review">How we review</a>. Vendors can&rsquo;t pay for placement,
            rankings or scores.
          </li>
          <li>
            <b>Whether you need more than tools.</b>
            Most teams need the right tools and nothing else. If yours needs more, she&rsquo;ll say so, and you decide from there.
          </li>
          <li>
            <b>From a practitioner.</b>
            Stephanie Murray: 20 years in talent. Her team won Talent Strategy of the Year at the 2025 Transform Awards.{' '}
            <a href="/about/stephanie">About Stephanie</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
