'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { activateMembership, isMember } from '@/lib/membership'
import { User, Building2, Lock } from 'lucide-react'
import { CATALOG } from '@/lib/tools-catalog'

// Tools shown on the membership page — sourced from the catalog so they stay
// in sync as we add tools. We exclude `soon`-tier tools because the page is
// "what you actually get when you become a member," and showing tools that
// don't exist yet would overstate the offer.
const tools = CATALOG.filter((t) => t.tier !== 'soon').map((t) => ({
  name: t.name,
  desc: t.desc,
  type: t.audience,
  free: t.tier === 'free',
}))

export default function MembershipPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  // Tracks whether the visitor already has a member signal (localStorage
  // flag set by Stripe success flow). Used to gate the "Already a member?
  // Sign in" link so it doesn't intercept first-time buyers at the moment
  // of intent. Real session data (Clarity recording 05-14) showed a user
  // click Get Full Access then immediately click the Sign in link below
  // it, get bounced to /sign-in with no account, and abandon the buy.
  const [hasMemberSignal, setHasMemberSignal] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check for existing-member signal. Drives whether to show the
    // "Already a member?" recovery link (see comment on the state above).
    setHasMemberSignal(isMember())

    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      const sessionId = params.get('session_id')
      if (sessionId) {
        fetch(`/api/stripe/session?session_id=${sessionId}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.email) {
              activateMembership(data.email, {
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
                jobTitle: data.jobTitle,
              })
              setShowSuccess(true)
            }
          })
      }
    }
  }, [])
  return (
    <div style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* Success Banner */}
      {showSuccess && (
        <div style={{
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          padding: '20px 40px',
          textAlign: 'center',
          width: '100%',
        }}>
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '24px',
            fontWeight: 900,
            color: 'white',
            margin: 0,
          }}>
            You&apos;re in. The whole production is yours.
          </h2>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            marginTop: '6px',
            margin: '6px 0 0 0',
          }}>
            Check your email for your receipt.{' '}
            <Link href="/tools" style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: 'white',
              textDecoration: 'underline',
            }}>
              Start exploring →
            </Link>
          </p>
        </div>
      )}

      {/* Hero */}
      <section style={{
        padding: '100px 40px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Radial glows */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(108,71,255,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,79,106,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <h1 style={{
          fontSize: 'clamp(38px, 6vw, 72px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
          position: 'relative',
          zIndex: 1,
        }}>
          The whole production. One price. No nonsense.
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#8B8AA0',
          lineHeight: 1.6,
          marginBottom: '32px',
          position: 'relative',
          zIndex: 1,
        }}>
          Less than Jobscan charges for a single day. Unlimited runs, both sides of hiring, forever.
        </p>

        {/* Stat pills */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}>
          {[`${tools.length} Recruiter Insights`, 'Both Sides of Hiring', 'Cancel anytime'].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px 24px',
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '13px',
                fontWeight: 600,
                color: '#F2F0FF',
              }}
            >
              {stat}
            </div>
          ))}
        </div>

        {/* Dual-tier CTA. Monthly is the primary path (active search
            lifecycle pays while you need it). Annual is the savings
            play — 45% off ($93/yr saved vs paying monthly all year). */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '12px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <StripeCheckoutButton
            plan="monthly"
            style={{
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              color: '#fff',
              padding: '15px 24px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              display: 'block',
            }}
          >
            Start monthly — $14.99/mo
          </StripeCheckoutButton>
          <StripeCheckoutButton
            plan="annual"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(167,139,250,0.45)',
              color: '#F2F0FF',
              padding: '13.5px 24px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              display: 'block',
            }}
          >
            Save 45% — $99/year
          </StripeCheckoutButton>
        </div>

        {/* "Already a member?" recovery link — gated behind an existing
            localStorage member signal so it doesn't intercept first-time
            buyers at the moment of intent. The Clarity recording for
            b90nty showed exactly this failure mode: visitor clicks Get
            Full Access, sees this Sign-in link directly below, doubts
            whether they already paid, clicks Sign-in, lands on /sign-in
            with no account to recover, and abandons the buy without
            completing checkout. For users without a member signal the
            link is now hidden; if they paid on another device they can
            still reach /sign-in via the top navigation. */}
        {hasMemberSignal && (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: '14px',
              textAlign: 'center',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              color: '#9D9CB3',
            }}
          >
            Already a member?{' '}
            <Link
              href="/sign-in"
              style={{
                color: '#A78BFA',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Sign in →
            </Link>
          </div>
        )}
      </section>

      {/* Comparison Table */}
      <section style={{
        padding: '100px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#8B8AA0',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          Feature Comparison
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          marginBottom: '48px',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          How We Compare
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            minWidth: '900px',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Row label column */}
                  <th style={{ padding: '24px 20px', background: 'transparent', border: 'none' }} />

                  {/* hiring.productions — dominant column */}
                  <th style={{
                    padding: '32px 20px 24px',
                    textAlign: 'left',
                    background: 'rgba(108,71,255,0.15)',
                    border: '2px solid #6C47FF',
                    verticalAlign: 'top',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.5px',
                        background: 'rgba(255,79,106,0.15)',
                        color: '#FF4F6A',
                      }}>
                        Best Value
                      </span>
                      <span style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 800, fontSize: '20px', color: '#F2F0FF' }}>
                        hiring.productions
                      </span>
                    </div>
                  </th>

                  {/* Competitor columns */}
                  {['Jobscan', 'Teal', 'Resume.io', 'VMock', 'Career Coach'].map((name) => (
                    <th key={name} style={{
                      padding: '24px 20px',
                      textAlign: 'left',
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 700,
                      fontSize: '16px',
                      color: '#F2F0FF',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      verticalAlign: 'bottom',
                    }}>
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: 'Price',
                    ours: '$14.99/mo or $99/yr',
                    competitors: ['$49.95/mo', '$9/week', '$24.95/mo', 'Enterprise', '$200+/hr'],
                    isPrice: true,
                  },
                  {
                    label: 'Candidate Recruiter Insights',
                    ours: `✓ ${tools.filter((t) => t.type === 'candidate').length}`,
                    competitors: ['Resume only', 'Resume only', 'Resume only', 'Resume only', 'Varies'],
                  },
                  {
                    label: 'Hiring team Recruiter Insights',
                    ours: `✓ ${tools.filter((t) => t.type === 'hiring').length}`,
                    competitors: ['✗', '✗', '✗', '✗', '✗'],
                  },
                  {
                    label: 'Both sides of hiring',
                    ours: '✓ Only platform',
                    competitors: ['✗', '✗', '✗', '✗', '✗'],
                  },
                  {
                    label: 'JD decoder',
                    ours: '✓',
                    competitors: ['✗', '✗', '✗', '✗', '✗'],
                  },
                  {
                    label: 'ATS reality check',
                    ours: '✓',
                    competitors: ['✓', '✓', '✗', '✓', '✗'],
                  },
                  {
                    label: 'Culture decoder',
                    ours: '✓',
                    competitors: ['✗', '✗', '✗', '✗', '✗'],
                  },
                  {
                    label: 'Salary negotiation script',
                    ours: '✓',
                    competitors: ['✗', '✗', '✗', '✗', '✓'],
                  },
                  {
                    label: 'AI candidate detection',
                    ours: '✓',
                    competitors: ['✗', '✗', '✗', '✗', '✗'],
                  },
                  {
                    label: 'Unlimited runs',
                    ours: '✓',
                    competitors: ['✗ Limited', '✗ Limited', '✗ Limited', '✗ Limited', 'Per session'],
                  },
                  {
                    label: 'Built by TA experts',
                    ours: '✓ Real practice',
                    competitors: ['✗', '✗', '✗', '✗', 'Varies'],
                  },
                ].map((row, idx) => (
                  <tr key={idx} style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'transparent',
                  }}>
                    {/* Row label */}
                    <td style={{
                      padding: '16px 20px',
                      fontWeight: 600,
                      color: '#8B8AA0',
                      whiteSpace: 'nowrap' as const,
                    }}>
                      {row.label}
                    </td>

                    {/* Our column */}
                    <td style={{
                      padding: '16px 20px',
                      background: 'rgba(108,71,255,0.08)',
                      borderLeft: '2px solid #6C47FF',
                      borderRight: '2px solid #6C47FF',
                    }}>
                      {row.isPrice ? (
                        <span style={{
                          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '18px',
                          fontWeight: 900,
                          fontFamily: "'Figtree', sans-serif",
                        }}>
                          {row.ours}
                        </span>
                      ) : (
                        <span style={{
                          color: '#6C47FF',
                          fontWeight: 700,
                          fontSize: row.ours === '✓' ? '20px' : '14px',
                          fontFamily: "'Figtree', sans-serif",
                        }}>
                          {row.ours}
                        </span>
                      )}
                    </td>

                    {/* Competitor columns */}
                    {row.competitors.map((val, cIdx) => {
                      const isX = val === '✗' || val.startsWith('✗')
                      return (
                        <td key={cIdx} style={{
                          padding: '16px 20px',
                          color: isX ? 'rgba(255,255,255,0.15)' : '#8B8AA0',
                          fontSize: val === '✓' ? '20px' : '14px',
                          fontFamily: "'Figtree', sans-serif",
                          fontWeight: 400,
                        }}>
                          {val}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* All 20 Tools Grid */}
      <section style={{
        padding: '100px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#8B8AA0',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          Your Recruiter Insights
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          marginBottom: '14px',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          All {tools.length} Recruiter Insights — both sides of the table
        </h2>
        <p style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          color: '#9D9CB3',
          textAlign: 'center',
          maxWidth: '620px',
          margin: '0 auto 48px',
          lineHeight: 1.6,
        }}>
          One membership unlocks every candidate-side tool AND every hiring-team tool.
          Understanding the other side is what makes you better at your own — a candidate
          who sees how recruiters screen becomes a better applicant; a hiring team that
          sees what candidates worry about writes better job posts.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {tools.map((tool, idx) => (
            <div
              key={idx}
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '160px',
              }}
            >
              {/* Icon circle top-left */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: tool.type === 'candidate' ? 'rgba(108,71,255,0.15)' : 'rgba(255,79,106,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tool.type === 'candidate' ? (
                  <User size={18} color="#A78BFA" />
                ) : (
                  <Building2 size={18} color="#FF4F6A" />
                )}
              </div>

              {/* Free or Pro badge top-right */}
              {tool.free ? (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(34,197,94,0.15)',
                    color: '#22C55E',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Free
                </div>
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(168,85,247,0.15)',
                    color: '#A855F7',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  <Lock size={12} /> Pro
                </div>
              )}

              <div style={{ paddingTop: '32px' }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#F2F0FF',
                  paddingRight: '32px',
                }}>
                  {tool.name}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#8B8AA0',
                  flex: 1,
                  lineHeight: 1.5,
                }}>
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '13px',
          color: '#8B8AA0',
          textAlign: 'center',
          marginTop: '32px',
        }}>
          Free tools — JD SEO Scorecard and Resume AI Checker — stay free forever. No account needed.
        </p>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 40px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#8B8AA0',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          Ready to Get Started?
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <StripeCheckoutButton
            plan="monthly"
            style={{
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              color: '#fff',
              padding: '15px 24px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              display: 'block',
            }}
          >
            Start monthly — $14.99/mo
          </StripeCheckoutButton>
          <StripeCheckoutButton
            plan="annual"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(167,139,250,0.45)',
              color: '#F2F0FF',
              padding: '13.5px 24px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              display: 'block',
            }}
          >
            Save 45% — $99/year
          </StripeCheckoutButton>
        </div>
        <p style={{
          fontSize: '13px',
          color: '#8B8AA0',
          marginTop: '16px',
        }}>
          Cancel anytime. Free tools stay free forever. Access delivered instantly to your email. No account needed for free tools.
        </p>
      </section>

      <Footer />
    </div>
  )
}
