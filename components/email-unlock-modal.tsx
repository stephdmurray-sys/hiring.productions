'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, Mail } from 'lucide-react'
import { analytics } from '@/lib/analytics'

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
      analytics.emailCaptureSubmit(source)
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
          background: '#FFFFFF',
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
            color: '#1A1A22',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 10px',
          }}
        >
          You&apos;ve used your 2 free insights today.
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '15px',
            color: '#5A5A6E',
            lineHeight: 1.55,
            margin: '0 0 8px',
          }}
        >
          Sign in for the upgraded experience — <span style={{ color: '#1A1A22', fontWeight: 800 }}>8 more free insights</span>, no card, no password.
        </p>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '15px',
            color: '#5A5A6E',
            lineHeight: 1.55,
            margin: '0 0 22px',
          }}
        >
          Or go Pro for unlimited — every Recruiter Insight, <span style={{ color: '#1A1A22', fontWeight: 800 }}>both sides of the table</span>. The candidate tools AND the hiring-team tools that show how recruiters actually screen. $14.99/mo or $99/yr.
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
              background: '#FAF8F3',
              border: error
                ? '1.5px solid #FF4F6A'
                : '1.5px solid rgba(167,139,250,0.30)',
              borderRadius: 12,
              color: '#1A1A22',
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
            {submitting ? 'Signing you in…' : 'Sign in for 8 more →'}
          </button>
        </form>

        {/* Three paths — two free, one not. The sign-in form above is the
            primary. Pro and RepVera are alternatives positioned as small
            text links so the modal still has one clear primary action. */}
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/pricing"
            onClick={() => {
              analytics.paywallPricingClick('email-modal')
              onClose()
            }}
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 800,
              color: '#A78BFA',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            See Pro — $14.99/mo or $99/yr →
          </Link>
          <span style={{ color: '#3F3E50', fontSize: '13px' }}>·</span>
          <a
            href="https://www.repvera.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              analytics.repveraClick('email-modal')
              onClose()
            }}
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            Start your RepVera — free →
          </a>
        </div>

        <p
          style={{
            marginTop: 14,
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12px',
            color: '#6B6A82',
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          Your account, your insights. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
