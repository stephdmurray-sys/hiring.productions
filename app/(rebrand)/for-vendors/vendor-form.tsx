'use client'

import { useState, type FormEvent } from 'react'
import { VENDOR_ASKS, VENDOR_CATEGORIES } from '@/lib/vendor-options'

export function VendorForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [product, setProduct] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/vendor-submittal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok) {
        setProduct(String(data.product ?? ''))
        setState('done')
      } else {
        setError(json.error ?? 'That did not go through. Try again.')
        setState('error')
      }
    } catch {
      setError('That did not go through. Try again.')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="vf-done" role="status">
        <b>{product ? `${product} is on file.` : 'You are on file.'}</b>
        <p>Check your inbox for a confirmation. You&rsquo;ll hear back from Stephanie within five business days.</p>
      </div>
    )
  }

  return (
    <form className="vf" onSubmit={submit}>
      <div className="vf-row">
        <label>
          Your name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Work email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="vf-row">
        <label>
          Product name
          <input name="product" required />
        </label>
        <label>
          Website
          <input name="website" required inputMode="url" placeholder="example.com" />
        </label>
      </div>
      <label>
        Category
        <select name="category" required defaultValue="">
          <option value="" disabled>
            Pick the closest fit
          </option>
          {VENDOR_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <fieldset className="vf-asks">
        <legend>What would you like to do?</legend>
        {VENDOR_ASKS.map((a, i) => (
          <label key={a} className="vf-ask">
            <input type="radio" name="ask" value={a} required defaultChecked={i === 0} />
            <span>{a}</span>
          </label>
        ))}
      </fieldset>
      <label>
        <span>
          Anything we should know? <span className="vf-opt">(optional)</span>
        </span>
        <textarea name="note" rows={3} placeholder="Who it's for, what's new, where the public reviews live" />
      </label>
      <button type="submit" className="btn" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send it in'}
      </button>
      {state === 'error' && (
        <p className="vf-error" role="alert">
          {error}
        </p>
      )}
      <p className="vf-fine">Listing is free and always will be. Nothing on this form buys a score or a ranking.</p>
    </form>
  )
}
