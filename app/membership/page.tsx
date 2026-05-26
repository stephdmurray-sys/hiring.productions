'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { activateMembership, isMember } from '@/lib/membership'
import { User, Building2, Lock } from 'lucide-react'
import { CATALOG } from '@/lib/tools-catalog'
import { PricingFAQ } from '@/components/pricing-faq'

/**
 * Membership page — momentum-positioning rewrite (5/26 strategist).
 *
 * Old framing: "buy access to a feature catalog."
 * New framing: "buy ongoing direction during a stressful process."
 *
 * The critic's core call was that the page suffered from a positioning
 * identity crisis. The actual value is guidance, momentum, and direction
 * during a high-stress moment in someone's life. The old hero
 * ("The whole production. One price. No nonsense.") and the dominant
 * "How We Compare" feature-vs-feature table both read as software-y.
 *
 * Strategic rewrite:
 *   - Hero leads with momentum, not catalog
 *   - New "Why searches stall" section names the pain
 *   - New 4-week path section shows progression, not tracking
 *   - Comparison table cut (had dark-mode color leftovers anyway)
 *   - Price defense folded into a single sentence
 *   - Tools grid retained but reframed
 */
// Tools shown on the membership page — sourced from the catalog so they stay
// in sync as we add tools. We exclude `soon`-tier tools because the page is
// "what you actually get when you become a member," and showing tools that
// don't exist yet would overstate the offer.
const tools = CATALOG.filter((t) => t.tier !== 'soon').map((t) => ({
  name: t.name,
  desc: t.desc,
  type: t.audience,
  free: t.tier === 'free',
  href: t.href,
}))

// Pain anchors for the "Why searches stall" section.
const STALL_REASONS = [
  'Applications disappear into silence.',
  'Follow-ups get forgotten.',
  'Momentum dies after the first wave of effort.',
  'People stop knowing what to do next.',
]

// Four-scene progression. Action-verb headers mirror the homepage
// hero pattern (Get Seen / Get In / Get the Offer). Each scene builds
// on the last so the visitor reads it as compounding progress. No
// time labels — we move people through the whole production of
// hiring, but pace varies by person and we will not promise weeks.
const PATH = [
  {
    title: 'Get found.',
    body: 'Fix what is keeping you invisible. Resume, LinkedIn, recruiter visibility.',
  },
  {
    title: 'Get in.',
    body: 'Find the right people. Send messages that actually get opened.',
  },
  {
    title: 'Get through.',
    body: 'Walk into interviews prepared. Decoded questions, real rehearsal.',
  },
  {
    title: 'Get the offer.',
    body: 'Read what is actually on the table. Negotiate without leaving money behind.',
  },
]

export default function MembershipPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  // Tracks whether the visitor already has a member signal (localStorage
  // flag set by Stripe success flow). Used to gate the "Already a member?
  // Sign in" link so it doesn't intercept first-time buyers at the moment
  // of intent.
  const [hasMemberSignal, setHasMemberSignal] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

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
    <div style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <style>{`
        .membership-tool-card:hover {
          border-color: rgba(167,139,250,0.45) !important;
          transform: translateY(-2px);
        }
        .week-card:hover {
          border-color: rgba(108,71,255,0.35) !important;
          transform: translateY(-3px);
        }
      `}</style>
      <Navigation variant="light" />

      {/* Success Banner */}
      {showSuccess && (
        <div
          style={{
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            padding: '20px 40px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '24px',
              fontWeight: 900,
              color: 'white',
              margin: 0,
            }}
          >
            You are in. The whole production is yours.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.85)',
              margin: '6px 0 0 0',
            }}
          >
            Check your email for your receipt.{' '}
            <Link
              href="/tools"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: 'white',
                textDecoration: 'underline',
              }}
            >
              Start exploring →
            </Link>
          </p>
        </div>
      )}

      {/* ──────────────── HERO ─────────────────
         Momentum-positioned. "Keep your job search moving." is the
         strategist's strongest direction. Subhead anchors continuity
         (pick up where you left off), not storage. */}
      <section
        style={{
          padding: 'clamp(80px, 11vw, 128px) 24px clamp(40px, 6vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient indigo glow — single restrained source, on-brand for
            light mode. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -220,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 820,
            height: 820,
            background:
              'radial-gradient(circle, rgba(108,71,255,0.10) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            maxWidth: 880,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 18,
            }}
          >
            Your job search, with direction
          </div>

          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 'clamp(40px, 6.5vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.022em',
              color: '#1A1A22',
              margin: 0,
            }}
          >
            Keep your job search
            <br />
            moving.
          </h1>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(17px, 1.95vw, 21px)',
              lineHeight: 1.55,
              color: '#1A1A22',
              maxWidth: 700,
              margin: '28px auto 0',
            }}
          >
            Pick up exactly where you left off, with clear next steps every
            time you come back.
          </p>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(14.5px, 1.55vw, 16.5px)',
              lineHeight: 1.55,
              color: '#5A5A6E',
              maxWidth: 620,
              margin: '18px auto 0',
            }}
          >
            Resume, LinkedIn, outreach, interviews, offers. All connected.
            All moving forward together.
          </p>

          {/* Dual-tier CTA. Single visual unit on desktop, stacks on mobile. */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: 12,
              maxWidth: 480,
              margin: 'clamp(32px, 4vw, 44px) auto 0',
            }}
          >
            <StripeCheckoutButton
              plan="monthly"
              style={{
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                border: 'none',
                color: '#fff',
                padding: '16px 24px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                width: '100%',
                display: 'block',
                boxShadow: '0 14px 32px rgba(108,71,255,0.22)',
              }}
            >
              Start monthly · $14.99
            </StripeCheckoutButton>
            <StripeCheckoutButton
              plan="annual"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid rgba(108,71,255,0.35)',
                color: '#1A1A22',
                padding: '14.5px 24px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                width: '100%',
                display: 'block',
              }}
            >
              Annual · $99 (save 45%)
            </StripeCheckoutButton>
          </div>

          {/* Price defense in one line (replaces the cut comparison table). */}
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#8B8AA0',
              marginTop: 14,
              letterSpacing: '0.005em',
            }}
          >
            Less than one hour of career coaching. Less than Jobscan charges
            for a single day. Cancel anytime.
          </p>

          {hasMemberSignal && (
            <div
              style={{
                position: 'relative',
                marginTop: 18,
                textAlign: 'center',
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13,
                color: '#5A5A6E',
              }}
            >
              Already a member?{' '}
              <Link
                href="/sign-in"
                style={{
                  color: '#5A4FE0',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Sign in →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ──────────────── WHY SEARCHES STALL ─────────────────
         Names the pain of NOT having this. Strategist's core insight:
         the page only described benefits, never the cost of staying
         stuck. Four stall causes, one resolution. */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 24px',
          background: '#FAF8F3',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C73E5A',
                marginBottom: 14,
              }}
            >
              Why most job searches stall
            </div>
            <h2
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 'clamp(34px, 5vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: '-0.024em',
                color: '#1A1A22',
                margin: 0,
              }}
            >
              It is not because people stop trying.
            </h2>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECECF2',
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(108,71,255,0.05)',
            }}
          >
            {STALL_REASONS.map((reason, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: 'clamp(18px, 2.4vw, 26px) clamp(20px, 3vw, 32px)',
                  borderTop: i === 0 ? 'none' : '1px solid #F2F0F8',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#FF4F6A',
                    opacity: 0.85,
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 'clamp(16px, 1.85vw, 19px)',
                    fontWeight: 600,
                    color: '#1A1A22',
                    margin: 0,
                    lineHeight: 1.4,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {reason}
                </p>
              </div>
            ))}

            {/* Resolution row — structurally part of the card so it
                cannot be misread as a floating line. Gradient-tinted
                background + indigo accent bar set it apart from the
                pain rows above. */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: 'clamp(22px, 2.8vw, 30px) clamp(20px, 3vw, 32px)',
                borderTop: '1px solid #F2F0F8',
                background:
                  'linear-gradient(135deg, rgba(108,71,255,0.07), rgba(255,79,106,0.05))',
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 4,
                  height: 28,
                  borderRadius: 2,
                  background:
                    'linear-gradient(180deg, #6C47FF, #FF4F6A)',
                }}
              />
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(16px, 1.9vw, 20px)',
                  lineHeight: 1.4,
                  color: '#5A4FE0',
                  margin: 0,
                  letterSpacing: '-0.005em',
                }}
              >
                This keeps your search organized, guided, and moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── THE FOUR SCENES ─────────────────
         A path, not a tracker. Four scenes the system moves the
         visitor through. No time commitment — pace varies by
         person and we will not promise weeks. */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 24px',
          background: '#FAF8F3',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(36px, 4.5vw, 52px)',
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#5A4FE0',
                marginBottom: 14,
              }}
            >
              A path, not a tracker
            </div>
            <h2
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 'clamp(34px, 5vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: '-0.024em',
                color: '#1A1A22',
                margin: '0 0 14px',
              }}
            >
              The whole production, scene by scene.
            </h2>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 'clamp(15.5px, 1.7vw, 17.5px)',
                color: '#5A5A6E',
                maxWidth: 600,
                margin: '0 auto',
                lineHeight: 1.55,
              }}
            >
              Each scene builds on the last. Your progress compounds instead
              of resetting.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
              gap: 16,
            }}
          >
            {PATH.map((step, i) => (
              <article
                key={step.title}
                className="week-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #ECECF2',
                  borderRadius: 16,
                  padding: 'clamp(22px, 2.8vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 16px rgba(108,71,255,0.04)',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    color: '#A78BFA',
                  }}
                >
                  Scene 0{i + 1}
                </span>
                <h3
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(22px, 2.6vw, 26px)',
                    letterSpacing: '-0.015em',
                    color: '#1A1A22',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: 14.5,
                    color: '#5A5A6E',
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── TOOLS GRID ─────────────────
         Reframed header — these are the steps inside the system, not
         a catalog of features. */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 24px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(36px, 4.5vw, 52px)',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 14,
            }}
          >
            What is inside
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 'clamp(34px, 5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.024em',
              color: '#1A1A22',
              margin: '0 0 14px',
            }}
          >
            Every Recruiter Insight, both sides of the table.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 'clamp(14.5px, 1.6vw, 16.5px)',
              color: '#5A5A6E',
              textAlign: 'center',
              maxWidth: 620,
              margin: '0 auto',
              lineHeight: 1.55,
            }}
          >
            One subscription unlocks every candidate-side tool and every
            hiring-team tool. A candidate who sees how recruiters screen
            becomes a better applicant. A hiring team that sees what
            candidates worry about writes better job posts.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 18,
          }}
        >
          {tools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.href}
              className="membership-tool-card"
              style={{
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 14,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: 168,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.18s ease, transform 0.18s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background:
                    tool.type === 'candidate'
                      ? 'rgba(108,71,255,0.15)'
                      : 'rgba(255,79,106,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tool.type === 'candidate' ? (
                  <User size={18} color="#6C47FF" />
                ) : (
                  <Building2 size={18} color="#FF4F6A" />
                )}
              </div>

              {tool.free ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(94,230,168,0.18)',
                    color: '#138A55',
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 100,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  Free
                </div>
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'rgba(167,139,250,0.18)',
                    color: '#5A4FE0',
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 100,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  <Lock size={11} /> Pro
                </div>
              )}

              <div style={{ paddingTop: 36 }}>
                <h3
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#1A1A22',
                    margin: '0 0 8px',
                    paddingRight: 32,
                    lineHeight: 1.3,
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 13,
                    color: '#5A5A6E',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 13,
            color: '#8B8AA0',
            textAlign: 'center',
            marginTop: 32,
            lineHeight: 1.55,
          }}
        >
          Free tools stay free forever. No account needed.
        </p>
      </section>

      {/* ──────────────── CTA ─────────────────
         Final ask. Mirrors the hero CTA so the funnel reads as one
         consistent offer. */}
      <section
        style={{
          padding: 'clamp(64px, 9vw, 112px) 24px',
          textAlign: 'center',
          maxWidth: 620,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 'clamp(34px, 5vw, 52px)',
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: '-0.024em',
            color: '#1A1A22',
            margin: '0 0 14px',
          }}
        >
          Your search, finally moving forward.
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 16,
            color: '#5A5A6E',
            margin: '0 0 32px',
            lineHeight: 1.55,
          }}
        >
          Start today. Cancel anytime. Free tools stay free forever.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: 12,
            marginBottom: 14,
          }}
        >
          <StripeCheckoutButton
            plan="monthly"
            style={{
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: 12,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              display: 'block',
              boxShadow: '0 14px 32px rgba(108,71,255,0.22)',
            }}
          >
            Start monthly · $14.99
          </StripeCheckoutButton>
          <StripeCheckoutButton
            plan="annual"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(108,71,255,0.35)',
              color: '#1A1A22',
              padding: '14.5px 24px',
              borderRadius: 12,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              cursor: 'pointer',
              width: '100%',
              display: 'block',
            }}
          >
            Annual · $99 (save 45%)
          </StripeCheckoutButton>
        </div>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 13,
            color: '#8B8AA0',
            marginTop: 12,
          }}
        >
          Less than one hour of coaching. Less than Jobscan for a single day.
        </p>
      </section>

      <PricingFAQ />

      <Footer />
    </div>
  )
}
