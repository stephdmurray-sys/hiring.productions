'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw } from 'lucide-react'

/**
 * Quick Headline Read — the homepage live widget.
 *
 * Visitor pastes a LinkedIn headline. ~3 seconds later, a real
 * recruiter take returns. First interaction with the site IS the
 * product, not a marketing pitch. Same engagement pattern as
 * Cal.com's inline calendar, Anthropic's "try Claude" box,
 * Cursor's homepage editor.
 *
 * Calls /api/quick-read. Anon visitors, no gate beyond global budget.
 * After the read displays, a CTA routes to the full resume tool —
 * the widget creates demand for the deeper run.
 */

type State =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; read: string; headline: string }
  | { status: 'error'; message: string }

export function QuickHeadlineRead() {
  const [state, setState] = useState<State>({ status: 'idle' })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const headline = inputRef.current?.value.trim() ?? ''
    if (!headline) return
    setState({ status: 'submitting' })

    try {
      const res = await fetch('/api/quick-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline }),
      })
      const data = await res.json()
      if (!res.ok) {
        setState({
          status: 'error',
          message: data?.message ?? 'Something went wrong. Try again in a moment.',
        })
        return
      }
      setState({ status: 'success', read: data.read, headline })
    } catch {
      setState({
        status: 'error',
        message: 'Couldn’t reach the server. Try again in a moment.',
      })
    }
  }

  const handleReset = () => {
    setState({ status: 'idle' })
    if (inputRef.current) {
      inputRef.current.value = ''
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  return (
    <section
      style={{
        background: '#0F0F12',
        color: '#F2F0FF',
        padding: 'clamp(56px, 8vw, 96px) 24px clamp(40px, 6vw, 72px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 14,
            textAlign: 'center',
          }}
        >
          Try it
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4.2vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            textAlign: 'center',
            margin: '0 0 14px',
          }}
        >
          Paste your LinkedIn headline.
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 16,
            color: '#9D9CB3',
            lineHeight: 1.5,
            textAlign: 'center',
            margin: '0 0 32px',
          }}
        >
          Get a recruiter&rsquo;s real take in five seconds. No account.
        </p>

        {state.status !== 'success' && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              maxLength={240}
              required
              disabled={state.status === 'submitting'}
              placeholder="e.g. Strategic Product Manager · Driving Growth Through Innovation"
              style={{
                width: '100%',
                padding: '18px 22px',
                background: '#14141B',
                border: '1px solid rgba(167,139,250,0.30)',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontSize: 16,
                color: '#F2F0FF',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#A78BFA')}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'rgba(167,139,250,0.30)')
              }
            />
            <button
              type="submit"
              disabled={state.status === 'submitting'}
              style={{
                padding: '15px 28px',
                background:
                  state.status === 'submitting'
                    ? 'rgba(108,71,255,0.5)'
                    : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                border: 'none',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: 'white',
                cursor: state.status === 'submitting' ? 'not-allowed' : 'pointer',
                boxShadow: '0 14px 38px rgba(108,71,255,0.28)',
                transition: 'transform 0.15s ease, opacity 0.15s ease',
                opacity: state.status === 'submitting' ? 0.8 : 1,
              }}
            >
              {state.status === 'submitting' ? 'Reading…' : 'Get the read'}
            </button>
          </form>
        )}

        {state.status === 'error' && (
          <p
            style={{
              marginTop: 16,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 14,
              color: '#FF8FA3',
              textAlign: 'center',
            }}
          >
            {state.message}
          </p>
        )}

        {/* SUCCESS — the read */}
        {state.status === 'success' && (
          <article style={{ marginTop: 8 }}>
            {/* The headline the user pasted, quoted small */}
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 14,
                color: '#8B8AA0',
                marginBottom: 16,
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              Your headline:{' '}
              <span style={{ color: '#C9C7DA' }}>&ldquo;{state.headline}&rdquo;</span>
            </div>

            {/* The read */}
            <div
              style={{
                background: '#14141B',
                border: '1px solid rgba(255,79,106,0.30)',
                borderRadius: 14,
                padding: 'clamp(24px, 4vw, 32px)',
                borderLeft: '3px solid #FF4F6A',
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#FF8FA3',
                  marginBottom: 14,
                }}
              >
                The recruiter&rsquo;s read
              </div>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(16px, 1.9vw, 18px)',
                  lineHeight: 1.55,
                  color: '#F2F0FF',
                  margin: 0,
                }}
              >
                {state.read}
              </p>
            </div>

            {/* Conversion ask */}
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                gap: 12,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/tools/resume-recruiter-eyes"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 26px',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  borderRadius: 10,
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 14.5,
                  color: 'white',
                  textDecoration: 'none',
                  boxShadow: '0 12px 28px rgba(108,71,255,0.22)',
                }}
              >
                Get the read on your full resume <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
              <button
                onClick={handleReset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '14px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#C9C7DA',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} strokeWidth={2.5} /> Try another
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
