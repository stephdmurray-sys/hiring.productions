'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Mail } from 'lucide-react'

interface EmailUnlockModalProps {
  open: boolean
  onClose: () => void
  /**
   * Where the user was when the modal fired. Sent to /api/lead so we
   * can see which tools convert best. e.g. "anon-limit:keyword-gap".
   */
  source: string
  /** Called after the email is captured + cookie planted. */
  onUnlocked: () => void
}

/**
 * Slide-up email capture. Fires when an anon user hits their 3-run
 * daily limit OR (optionally) right before they hit it. Drops a
 * hashed-email cookie via /api/lead that bumps them to the 10-run
 * lifetime tier.
 */
export function EmailUnlockModal({ open, onClose, source, onUnlocked }: EmailUnlockModalProps) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      // Give the transition a beat, then focus.
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error === 'invalid-email' ? "That doesn't look like a valid email." : 'Something went wrong. Try again?')
        setSubmitting(false)
        return
      }
      onUnlocked()
    } catch {
      setError('Network blip. Try again?')
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#14141B',
          border: '1px solid rgba(108,71,255,0.30)',
          borderRadius: 20,
          padding: 32,
          maxWidth: 460,
          width: '100%',
          position: 'relative',
          boxShadow: '0 30px 100px rgba(108,71,255,0.25)',
        }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'transparent',
            border: 'none',
            color: '#8B8AA0',
            cursor: 'pointer',
            padding: 6,
            borderRadius: 6,
            display: 'flex',
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            marginBottom: 18,
          }}
        >
          <Mail size={20} color="#FFFFFF" strokeWidth={2.2} />
        </div>

        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: '26px',
            color: '#F2F0FF',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 10px',
          }}
        >
          You&apos;ve used your 3 free insights today.
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '15px',
            color: '#9D9CB3',
            lineHeight: 1.55,
            margin: '0 0 22px',
          }}
        >
          Drop your email and I&apos;ll unlock <span style={{ color: '#F2F0FF', fontWeight: 800 }}>10 more insights</span> across every free tool. No card. No password. The 6-second resume-read guide goes to your inbox right after.
        </p>

        <form onSubmit={submit}>
          <input
            ref={inputRef}
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@work.com"
            style={{
              width: '100%',
              padding: '14px 16px',
              background: '#0F0F12',
              border: error
                ? '1.5px solid #FF4F6A'
                : '1.5px solid rgba(167,139,250,0.30)',
              borderRadius: 12,
              color: '#F2F0FF',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <div
              style={{
                marginTop: 8,
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                color: '#FF4F6A',
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: 14,
              width: '100%',
              padding: '14px 18px',
              background: submitting
                ? 'rgba(108,71,255,0.5)'
                : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '14.5px',
              cursor: submitting ? 'default' : 'pointer',
              letterSpacing: '0.01em',
              boxShadow: submitting ? 'none' : '0 18px 40px rgba(108,71,255,0.30)',
            }}
          >
            {submitting ? 'Unlocking…' : 'Unlock 10 more insights →'}
          </button>
        </form>

        <p
          style={{
            marginTop: 16,
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12px',
            color: '#6B6A82',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          One email a week, max. Unsubscribe anytime. We never sell your data.
        </p>
      </div>
    </div>
  )
}
