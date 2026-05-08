'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { activateMembership } from '@/lib/membership'
import { User, Building2, Lock } from 'lucide-react'

const tools = [
  { name: 'Resume AI Checker', desc: 'See if your resume reads as AI-written', type: 'candidate', free: true },
  { name: 'Your Resume, Through a Recruiter\'s Eyes', desc: 'The internal monologue of a recruiter in 6 seconds', type: 'candidate', free: false },
  { name: 'What This Job Actually Is', desc: 'What\'s really between the lines of any JD', type: 'candidate', free: false },
  { name: 'Would You Even Make It Through?', desc: 'Your ATS score and top 3 fixes', type: 'candidate', free: false },
  { name: 'Where You Actually Have a Shot', desc: 'Platform rankings by real response rate data', type: 'candidate', free: false },
  { name: 'What This Company Feels Like to Work At', desc: 'What their culture copy actually signals', type: 'candidate', free: false },
  { name: 'Would a Recruiter Even Find You?', desc: 'The boolean string that finds — or misses — you', type: 'candidate', free: false },
  { name: 'LinkedIn Profile Rewriter', desc: 'Headline, About, and experience rewritten in one pass', type: 'candidate', free: false },
  { name: 'What They\'re Really Asking', desc: 'The competency underneath any interview question', type: 'candidate', free: false },
  { name: 'How You Actually Come Across', desc: 'Three rewritten versions of your professional pitch', type: 'candidate', free: false },
  { name: 'What\'s Breaking Your Search', desc: 'Specific diagnosis for your exact situation', type: 'candidate', free: false },
  { name: 'What You\'re Actually Worth', desc: 'Market rate plus a word-for-word negotiation script', type: 'candidate', free: false },
  { name: 'Is Your Job Even Being Seen?', desc: 'JD SEO score across 8 major platforms', type: 'hiring', free: true },
  { name: 'Your Job Post, Through Candidate Eyes', desc: 'Why strong candidates click away from your posting', type: 'hiring', free: false },
  { name: 'Is This Even a Real Candidate?', desc: 'Human-authored or AI-generated — what flagged it', type: 'hiring', free: false },
  { name: 'What You\'re Actually Evaluating', desc: 'Structured scorecard that reduces gut-feel decisions', type: 'hiring', free: false },
  { name: 'Are Your Interviewers Even Ready?', desc: 'Prep guide that stops you losing your best candidates', type: 'hiring', free: false },
  { name: 'The Search String That Finds Your Candidate', desc: 'Boolean search ready to paste into LinkedIn', type: 'hiring', free: false },
  { name: 'How Your Offer Actually Lands', desc: 'How it reads to someone with options', type: 'hiring', free: false },
  { name: 'How to Reach Out Without Being Ignored', desc: 'Messages that actually get responses', type: 'hiring', free: false },
  { name: 'Your Hiring Process, From the Outside', desc: 'Every step through a candidate\'s eyes', type: 'hiring', free: false },
  { name: 'What Day One Actually Looks Like', desc: 'Onboarding through a new hire\'s eyes', type: 'hiring', free: false },
]

export default function MembershipPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      const sessionId = params.get('session_id')
      if (sessionId) {
        fetch(`/api/stripe/session?session_id=${sessionId}`)
          .then(r => r.json())
          .then(data => {
            if (data.email) {
              activateMembership(data.email)
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
            You&apos;re in. All 20 inside looks are unlocked.
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
          All 20 inside looks. One price. No nonsense.
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
          {['20 Inside Looks', 'Both Sides of Hiring', '$20/year — not per month'].map((stat, idx) => (
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

        <StripeCheckoutButton style={{
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          border: 'none',
          color: '#fff',
          padding: '15px 32px',
          borderRadius: '10px',
          fontFamily: "'Figtree', sans-serif",
          fontSize: '16px',
          fontWeight: 800,
          cursor: 'pointer',
          width: '100%',
          display: 'block',
          position: 'relative',
          zIndex: 1,
        }}>
          Get Full Access — $20/year
        </StripeCheckoutButton>
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
                    ours: '$20/year',
                    competitors: ['$49.95/mo', '$9/week', '$24.95/mo', 'Enterprise', '$200+/hr'],
                    isPrice: true,
                  },
                  {
                    label: 'Candidate inside looks',
                    ours: '✓ 12',
                    competitors: ['Resume only', 'Resume only', 'Resume only', 'Resume only', 'Varies'],
                  },
                  {
                    label: 'Hiring team inside looks',
                    ours: '✓ 8',
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
                    ours: '✓ 20 years',
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
          Your Inside Looks
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 900,
          marginBottom: '48px',
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          All 20 Inside Looks
        </h2>

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
          Free inside looks — JD SEO Scorecard and Resume AI Checker — stay free forever. No account needed.
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
        <StripeCheckoutButton style={{
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          border: 'none',
          color: '#fff',
          padding: '15px 32px',
          borderRadius: '10px',
          fontFamily: "'Figtree', sans-serif",
          fontSize: '16px',
          fontWeight: 800,
          cursor: 'pointer',
          width: '100%',
          display: 'block',
          marginBottom: '16px',
        }}>
          Get Full Access — $20/year
        </StripeCheckoutButton>
        <p style={{
          fontSize: '13px',
          color: '#8B8AA0',
          marginTop: '16px',
        }}>
          Billed annually. Free inside looks stay free forever. Access delivered instantly to your email. No account needed for free looks.
        </p>
      </section>

      <Footer />
    </div>
  )
}
