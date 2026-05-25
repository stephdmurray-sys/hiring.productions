'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, CheckCircle2 } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { isMember, activateMembership, getMemberEmail, clearMembership } from '@/lib/membership'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [memberState, setMemberState] = useState<{ active: boolean; email: string | null }>({
    active: false,
    email: null,
  })

  useEffect(() => {
    setMemberState({ active: isMember(), email: getMemberEmail() })
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    setLoading(true)
    setError('')

    try {
      const r = await fetch(`/api/stripe/verify-customer?email=${encodeURIComponent(trimmed)}`)
      const data = await r.json()

      if (data.active === true) {
        activateMembership(trimmed)
        router.push('/tools')
      } else {
        setError(
          "No active membership found for this email. Use the email you paid with at checkout — or get full access below.",
        )
      }
    } catch {
      setError('Couldn’t verify right now. Please try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    clearMembership()
    setMemberState({ active: false, email: null })
  }

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

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
              'radial-gradient(ellipse 700px 500px at 50% 0%, rgba(108,71,255,0.16) 0%, transparent 60%)',
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
          {/* Already signed in */}
          {memberState.active ? (
            <div
              style={{
                background: '#14141B',
                border: '1px solid rgba(94,230,168,0.30)',
                borderRadius: '20px',
                padding: '36px',
                textAlign: 'center',
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
                  background: 'rgba(94,230,168,0.15)',
                  marginBottom: 20,
                }}
              >
                <CheckCircle2 size={28} color="#5EE6A8" strokeWidth={2.2} />
              </div>
              <h1
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: '28px',
                  letterSpacing: '-0.02em',
                  color: '#F2F0FF',
                  margin: '0 0 8px',
                }}
              >
                You’re signed in.
              </h1>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  color: '#9D9CB3',
                  margin: '0 0 24px',
                }}
              >
                Signed in as <strong style={{ color: '#F2F0FF' }}>{memberState.email}</strong>.
              </p>
              <Link
                href="/tools"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  color: 'white',
                  borderRadius: '12px',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 18px 40px rgba(108,71,255,0.30)',
                }}
              >
                Open your tools →
              </Link>
              <div style={{ marginTop: 18 }}>
                <button
                  onClick={handleSignOut}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#8B8AA0',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Prominent "haven't paid yet?" callout — pulled UP above
                  the sign-in form because the dominant /sign-in visitor
                  is someone who arrived here by mistake (clicked the
                  former "Already a member?" link while trying to buy).
                  This callout gives them an obvious one-click route
                  back to checkout instead of leaving them stuck staring
                  at a sign-in form they can't satisfy. */}
              <Link
                href="/membership"
                style={{
                  display: 'block',
                  marginBottom: 24,
                  padding: '16px 18px',
                  background: 'linear-gradient(135deg, rgba(108,71,255,0.14), rgba(255,79,106,0.10))',
                  border: '1px solid rgba(167,139,250,0.32)',
                  borderRadius: 12,
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#A78BFA',
                    marginBottom: 6,
                  }}
                >
                  Never paid before?
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14.5,
                    color: '#F2F0FF',
                    fontWeight: 700,
                    lineHeight: 1.45,
                  }}
                >
                  Get full access →
                </div>
              </Link>

              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(108,71,255,0.15)',
                    border: '1px solid rgba(108,71,255,0.30)',
                    marginBottom: 20,
                  }}
                >
                  <Lock size={24} color="#A78BFA" strokeWidth={2} />
                </div>
                <h1
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(32px, 4vw, 44px)',
                    letterSpacing: '-0.025em',
                    color: '#F2F0FF',
                    margin: '0 0 12px',
                    lineHeight: 1.1,
                  }}
                >
                  Already a member? Sign in.
                </h1>
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15px',
                    color: '#9D9CB3',
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  Enter the email you used at checkout. We verify against Stripe — no password.
                </p>
              </div>

              <form
                onSubmit={handleSignIn}
                style={{
                  background: '#14141B',
                  border: '1px solid rgba(108,71,255,0.25)',
                  borderRadius: '16px',
                  padding: '28px 24px',
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
                    color: '#8B8AA0',
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
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15px',
                    color: '#F2F0FF',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)')}
                />

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    background:
                      !email.trim() || loading
                        ? 'rgba(255,255,255,0.05)'
                        : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                    border: !email.trim() || loading ? '1px solid rgba(255,255,255,0.10)' : 'none',
                    borderRadius: '10px',
                    padding: '15px',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '15px',
                    color: !email.trim() || loading ? '#6B6A82' : 'white',
                    cursor: !email.trim() || loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {loading ? 'Verifying…' : 'Sign in'}
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
                      color: '#FF8FA3',
                      lineHeight: 1.5,
                    }}
                  >
                    {error}
                  </div>
                )}
              </form>

              <div
                style={{
                  marginTop: 24,
                  textAlign: 'center',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  color: '#9D9CB3',
                }}
              >
                Not a member yet?{' '}
                <Link
                  href="/membership"
                  style={{
                    color: '#A78BFA',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Get full access →
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
