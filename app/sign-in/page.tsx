'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle2 } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

/**
 * Sign-in page — magic-link flow via OUR custom backend.
 *
 * Calls /api/auth/send-magic-link which:
 *   - Generates a token via Supabase admin API (service-role)
 *   - Sends a branded email through Resend (from: hiring.productions)
 *   - Returns a token-only URL: /auth/verify?token=XXX
 *
 * The visitor clicks the email link → /auth/verify exchanges the token for
 * a session via supabase.auth.verifyOtp() → routes to /onboarding or
 * /dashboard.
 *
 * This flow bypasses Supabase's Site URL config entirely so we don't
 * depend on dashboard settings + we get full email branding control.
 */
export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  // Show a friendly check-your-email screen if the visitor returns to /sign-in
  // shortly after submitting (e.g. they clicked back). LocalStorage retains
  // the last-sent address for 30 minutes.
  const [lastSentEmail, setLastSentEmail] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hp_last_magic_link')
      if (stored) {
        const { email: storedEmail, ts } = JSON.parse(stored) as {
          email: string
          ts: number
        }
        if (Date.now() - ts < 30 * 60 * 1000) {
          setLastSentEmail(storedEmail)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.error ?? 'Something went wrong sending the link.')
        setLoading(false)
        return
      }

      try {
        localStorage.setItem(
          'hp_last_magic_link',
          JSON.stringify({ email: trimmed, ts: Date.now() }),
        )
      } catch {
        // ignore quota errors
      }

      setSent(true)
    } catch {
      setError("Couldn't reach the server. Try again in a moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      <section
        style={{
          padding: '110px 24px 100px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 700px 500px at 50% 0%, rgba(108,71,255,0.10) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '460px',
            margin: '0 auto',
          }}
        >
          {sent ? (
            <SuccessCard email={email.trim().toLowerCase()} />
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(108,71,255,0.12)',
                    border: '1px solid rgba(108,71,255,0.25)',
                    marginBottom: 20,
                  }}
                >
                  <Mail size={24} color="#6C47FF" strokeWidth={2} />
                </div>
                <h1
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(32px, 4vw, 44px)',
                    letterSpacing: '-0.025em',
                    color: '#1A1A22',
                    margin: '0 0 12px',
                    lineHeight: 1.1,
                  }}
                >
                  Start your search.
                </h1>
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15px',
                    color: '#5A5A6E',
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  New here or returning — same magic link. No passwords, no resets, no friction.
                </p>
              </div>

              <form
                onSubmit={handleSignIn}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #ECECF2',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <label
                  htmlFor="signin-email"
                  style={{
                    display: 'block',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 700,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#5A5A6E',
                    marginBottom: '10px',
                  }}
                >
                  Email
                </label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoFocus
                  style={{
                    width: '100%',
                    background: '#FAFAFB',
                    border: '1px solid #ECECF2',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15px',
                    color: '#1A1A22',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
                />

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    background:
                      !email.trim() || loading
                        ? '#ECECF2'
                        : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '15px',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '15px',
                    color: !email.trim() || loading ? '#8B8AA0' : 'white',
                    cursor: !email.trim() || loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow:
                      !email.trim() || loading
                        ? 'none'
                        : '0 12px 28px rgba(108,71,255,0.20)',
                  }}
                >
                  {loading ? 'Sending…' : 'Send magic link'}
                </button>

                {error && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: '10px 14px',
                      background: 'rgba(255,79,106,0.08)',
                      border: '1px solid rgba(255,79,106,0.25)',
                      borderRadius: 8,
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: '#C73E5A',
                      lineHeight: 1.5,
                    }}
                  >
                    {error}
                  </div>
                )}

                {lastSentEmail && !error && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: '10px 14px',
                      background: 'rgba(108,71,255,0.06)',
                      border: '1px solid rgba(108,71,255,0.18)',
                      borderRadius: 8,
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: '#5A4FE0',
                      lineHeight: 1.5,
                    }}
                  >
                    We sent a link to <strong>{lastSentEmail}</strong> recently. Check
                    your inbox (and spam) before requesting another.
                  </div>
                )}
              </form>

              <div
                style={{
                  marginTop: 24,
                  textAlign: 'center',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  color: '#5A5A6E',
                }}
              >
                Not signed up yet?{' '}
                <Link
                  href="/membership"
                  style={{
                    color: '#5A4FE0',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  See what you get →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function SuccessCard({ email }: { email: string }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(31,138,85,0.22)',
        borderRadius: '20px',
        padding: '36px',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(31,138,85,0.10)',
          marginBottom: 20,
        }}
      >
        <CheckCircle2 size={28} color="#1F8A55" strokeWidth={2.2} />
      </div>
      <h1
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: '28px',
          letterSpacing: '-0.02em',
          color: '#1A1A22',
          margin: '0 0 8px',
        }}
      >
        Check your email.
      </h1>
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          color: '#5A5A6E',
          margin: '0 0 8px',
          lineHeight: 1.5,
        }}
      >
        We sent a sign-in link to <strong style={{ color: '#1A1A22' }}>{email}</strong>.
      </p>
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '13.5px',
          color: '#8B8AA0',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        Click the link to finish signing in. Check spam if you don&apos;t see it within a minute.
      </p>
    </div>
  )
}
