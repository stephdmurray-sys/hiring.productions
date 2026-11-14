'use client'

import { useState, type FormEvent } from 'react'
import { submitLead } from '@/lib/submit-lead'
import { OWNERSHIP_DISCLOSURE } from '@/lib/repvera'

/**
 * The one email ask on the review site. Rules (GROWTH.md): it comes after
 * the value, says exactly what you get and how often, asks for an email
 * first and at most two optional questions we actually use, and always
 * carries the ownership disclosure.
 */

const SIZES = ['1 to 20', '21 to 50', '51 to 100', '101 to 250', 'More than 250']

export interface CaptureProps {
  source: string
  /** What they get back, in one sentence. */
  promise: string
  /** The button: what happens when they press it. */
  cta: string
  /** What the page says once it's sent. */
  done: string
  audience?: 'candidate' | 'hiring'
  /** Context the welcome email uses (e.g. the answer's link). Plain strings. */
  extras?: Record<string, string>
  /** Optional questions; only ask what the email or follow-up uses. */
  askCompanySize?: boolean
  askRole?: boolean
}

export function Capture({ source, promise, cta, done, audience, extras, askCompanySize, askRole }: CaptureProps) {
  const [email, setEmail] = useState('')
  const [size, setSize] = useState('')
  const [role, setRole] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const id = `cap-${source.replace(/[^a-z0-9]+/gi, '-')}`

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    const res = await submitLead({
      email,
      source,
      audience,
      role: role.trim() || undefined,
      legacyExtras: {
        ...(extras ?? {}),
        ...(size ? { company_size: size } : {}),
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      },
    })
    setState(res.ok ? 'done' : 'error')
  }

  if (state === 'done') {
    return (
      <div className="cap cap-done" role="status">
        <p>{done}</p>
      </div>
    )
  }

  return (
    <form className="cap" onSubmit={submit} aria-labelledby={`${id}-promise`}>
      <p className="cap-promise" id={`${id}-promise`}>
        {promise}
      </p>
      <div className="cap-fields">
        <label className="sr-only" htmlFor={`${id}-email`}>
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {askCompanySize && (
          <>
            <label className="sr-only" htmlFor={`${id}-size`}>
              Company size (optional)
            </label>
            <select id={`${id}-size`} value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Company size (optional)</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s} employees
                </option>
              ))}
            </select>
          </>
        )}
        {askRole && (
          <>
            <label className="sr-only" htmlFor={`${id}-role`}>
              Your role (optional)
            </label>
            <input id={`${id}-role`} type="text" maxLength={120} placeholder="Your role (optional)" value={role} onChange={(e) => setRole(e.target.value)} />
          </>
        )}
        <button type="submit" className="btn" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : cta}
        </button>
      </div>
      {state === 'error' && (
        <p className="cap-error" role="alert">
          That didn&rsquo;t go through. Check the address and try again.
        </p>
      )}
      <p className="cap-fine">
        {OWNERSHIP_DISCLOSURE} Unsubscribe in one click. <a href="/privacy">Privacy</a>
      </p>
    </form>
  )
}
