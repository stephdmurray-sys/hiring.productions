'use client'

import { useState, type FormEvent } from 'react'
import { OWNERSHIP_DISCLOSURE } from '@/lib/repvera'

/**
 * Monthly evidence email signup. Posts to the site's existing lead
 * endpoint with its own source, so the welcome email matches what the
 * visitor signed up for.
 */
export function EvidenceSignup({ source = 'evidence_report' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className="signup-done" role="status">
        You&rsquo;re on the list. The next one lands in your inbox the first week of the month.
      </p>
    )
  }

  return (
    <form className="signup" onSubmit={submit}>
      <label htmlFor={`signup-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`signup-${source}`}
        type="email"
        required
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn" disabled={state === 'sending'}>
        {state === 'sending' ? 'Adding you…' : 'Send me the monthly email'}
      </button>
      {state === 'error' && (
        <p className="signup-error" role="alert">
          That didn&rsquo;t go through. Check the address and try again.
        </p>
      )}
      <p className="signup-fine">
        {OWNERSHIP_DISCLOSURE} One email a month. Unsubscribe in one click. <a href="/privacy">Privacy</a>
      </p>
    </form>
  )
}
