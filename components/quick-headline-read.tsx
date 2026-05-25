'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw, HelpCircle, X } from 'lucide-react'

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
  const [helpOpen, setHelpOpen] = useState(false)
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

            {/* Inline help — "where do I find my headline?" reveal.
                Stylized LinkedIn profile mockup with the headline area
                highlighted and Stephanie's actual headline as the
                example. Lowers friction for visitors who don't know
                where the headline lives, while demonstrating what a
                strong headline looks like. */}
            <div style={{ textAlign: 'center', marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setHelpOpen((v) => !v)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#A78BFA',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <HelpCircle size={13} strokeWidth={2.5} />
                Where do I find my headline?
              </button>
            </div>

            {helpOpen && (
              <HeadlineHelp onClose={() => setHelpOpen(false)} />
            )}
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
              {/* Render the response as distinct paragraphs. The system
                  prompt asks for 3 sentences separated by \n\n. We split
                  and render each one with breathing room so the eye sees
                  three points, not a wall of text. */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {state.read
                  .split(/\n\s*\n/)
                  .map((p) => p.trim())
                  .filter(Boolean)
                  .map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(16px, 1.9vw, 18px)',
                        lineHeight: 1.55,
                        color: '#F2F0FF',
                        margin: 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
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

/**
 * Inline help panel — stylized LinkedIn profile mockup with the headline
 * area highlighted. The headline shown is Stephanie's actual headline,
 * which doubles as an example of a STRONG headline (role-led, named
 * outcomes, specific) for visitors to model.
 *
 * Built as a styled HTML/CSS mockup rather than a screenshot to avoid
 * any LinkedIn TOS friction and to stay consistent with the existing
 * LinkedIn-export guide pattern in components/linkedin-pdf-upload.tsx.
 */
function HeadlineHelp({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        marginTop: 14,
        background: '#14141B',
        border: '1px solid rgba(167,139,250,0.30)',
        borderRadius: 14,
        padding: 'clamp(20px, 3vw, 26px)',
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close help"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'transparent',
          border: 'none',
          color: '#8B8AA0',
          cursor: 'pointer',
          padding: 4,
          display: 'inline-flex',
        }}
      >
        <X size={14} strokeWidth={2.5} />
      </button>

      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: 14,
          color: '#C9C7DA',
          lineHeight: 1.55,
          margin: '0 0 16px',
        }}
      >
        Open{' '}
        <a
          href="https://www.linkedin.com/in/me"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#A78BFA', textDecoration: 'underline' }}
        >
          linkedin.com/in/me
        </a>
        . The line under your name and photo is your headline. Copy it, paste it
        above.
      </p>

      {/* Stylized LinkedIn profile card — mimics the actual LinkedIn UI.
          Light card, dark text. The headline area is wrapped in a coral
          highlight box with a small "← this is your headline" pointer. */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 10,
          padding: '18px 18px 16px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
        }}
      >
        {/* Cover strip */}
        <div
          aria-hidden
          style={{
            height: 36,
            margin: '-18px -18px 0',
            borderRadius: '10px 10px 0 0',
            background: 'linear-gradient(135deg, #0A66C2, #4A90D9)',
            opacity: 0.85,
          }}
        />

        {/* Profile photo placeholder */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: '3px solid #FFFFFF',
            marginTop: -28,
            marginBottom: 8,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 18,
          }}
        >
          SM
        </div>

        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 17,
            color: '#1F2937',
            lineHeight: 1.2,
          }}
        >
          Stephanie Murray
        </div>

        {/* THE HEADLINE — highlighted with a coral box + pointer */}
        <div
          style={{
            position: 'relative',
            marginTop: 6,
            padding: '6px 10px',
            background: 'rgba(255,79,106,0.10)',
            border: '1.5px solid #FF4F6A',
            borderRadius: 6,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 13.5,
            color: '#1F2937',
            lineHeight: 1.4,
          }}
        >
          Founder · hiring.productions &amp; RepVera · Senior TA Director ·
          20 years building TA from zero
          <span
            style={{
              display: 'inline-block',
              marginLeft: 10,
              color: '#FF4F6A',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              verticalAlign: 'middle',
            }}
            aria-hidden
          >
            ← your headline
          </span>
        </div>

        <div
          style={{
            marginTop: 8,
            fontFamily: "'Figtree', sans-serif",
            fontSize: 12,
            color: '#6B7280',
          }}
        >
          San Francisco Bay Area &middot; 14k followers
        </div>
      </div>

      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: 12.5,
          color: '#8B8AA0',
          lineHeight: 1.55,
          margin: '14px 0 0',
        }}
      >
        That highlighted line is Stephanie&rsquo;s actual headline. Yours sits in
        the same spot.
      </p>
    </div>
  )
}
