'use client'

import Link from 'next/link'

/**
 * Pricing transparency strip — kills the "wait, what's this cost"
 * objection before it makes the visitor bounce.
 *
 * Skeptical job seekers (especially post-layoff, watching every dollar)
 * mistrust sites that hide pricing. The closing currently has a "Go Pro"
 * button without context — a job seeker reading that thinks "ah, here
 * comes the upsell."
 *
 * This strip surfaces the actual pricing model BEFORE the closing so
 * visitors aren't surprised:
 *   - Free forever for the diagnostic tools (no email gate, no payment)
 *   - $14.99/mo (or $99/yr) for ALL individual tools
 *   - Coached platform tier coming soon
 *
 * No copy hides anything. No countdown timers. No "limited offer"
 * pressure. Per BRAND.md voice rules.
 *
 * Sits between StartHereBoard (free tools) and the closing.
 */
export function PricingTransparency() {
  return (
    <section
      style={{
        padding: 'clamp(32px, 4.5vw, 56px) 24px clamp(40px, 6vw, 64px)',
        background: '#FAF8F3',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 4vw, 40px)' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 12,
            }}
          >
            What it costs
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              color: '#1A1A22',
              margin: '0 0 14px',
            }}
          >
            No surprises. No upsells.
          </h2>

          {/* Anti-competitor reframe (added 5/25 per audit): the price
              looks different when the comparison is "everything you are
              already paying for" instead of "free." Names the alternative
              the visitor is currently mentally comparing against. */}
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(15px, 1.7vw, 17px)',
              lineHeight: 1.55,
              color: '#5A5A6E',
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            This replaces the resume sites, the rank checkers, the negotiation
            coaches, and the spreadsheet you have been keeping. One system, by
            someone who actually hires.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: 16,
          }}
        >
          {/* Free tier */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #ECECF2',
              borderRadius: 14,
              padding: '24px 22px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1F8A55',
                marginBottom: 10,
              }}
            >
              Free forever
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: '-0.02em',
                color: '#1A1A22',
                marginBottom: 6,
              }}
            >
              $0
            </div>
            {/* Outcome-first framing (5/25 audit): lead with what this
                tier accomplishes, then list tools as evidence. */}
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 14.5,
                fontWeight: 700,
                color: '#1A1A22',
                lineHeight: 1.45,
                margin: '0 0 10px',
              }}
            >
              Find out what is breaking your search before you send another
              application.
            </p>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13,
                color: '#8B8AA0',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Resume AI check, recruiter search rank, job description decoder,
              ghost-job detector.
            </p>
          </div>

          {/* Tools tier */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(108,71,255,0.40)',
              borderRadius: 14,
              padding: '24px 22px',
              boxShadow: '0 8px 24px rgba(108,71,255,0.10)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: 16,
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#FFFFFF',
                fontFamily: "'Figtree', sans-serif",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: 100,
              }}
            >
              Most pick this
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5A4FE0',
                marginBottom: 10,
              }}
            >
              Pro tools
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: '-0.02em',
                color: '#1A1A22',
                marginBottom: 2,
              }}
            >
              $14.99
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#5A5A6E',
                  letterSpacing: 0,
                }}
              >
                {' '}
                / mo
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 12,
                color: '#8B8AA0',
                marginBottom: 12,
              }}
            >
              or $99 / year. Save 45%.
            </div>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 14.5,
                fontWeight: 700,
                color: '#1A1A22',
                lineHeight: 1.45,
                margin: '0 0 10px',
              }}
            >
              Get the words. Get seen. Get the offer.
            </p>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13,
                color: '#8B8AA0',
                lineHeight: 1.55,
                margin: '0 0 16px',
              }}
            >
              LinkedIn rewrite, interview rehearsal room, offer negotiation
              script, recruiter eyes resume read. Cancel anytime.
            </p>
            <Link
              href="/membership"
              style={{
                display: 'inline-block',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#FFFFFF',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                textDecoration: 'none',
                borderRadius: 8,
              }}
            >
              See what is inside Pro →
            </Link>
          </div>

          {/* Platform tier — coming soon */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px dashed #ECECF2',
              borderRadius: 14,
              padding: '24px 22px',
              opacity: 0.85,
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#8B8AA0',
                marginBottom: 10,
              }}
            >
              Coached platform · soon
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 24,
                letterSpacing: '-0.02em',
                color: '#1A1A22',
                marginBottom: 6,
              }}
            >
              In the queue
            </div>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 14.5,
                fontWeight: 700,
                color: '#1A1A22',
                lineHeight: 1.45,
                margin: '0 0 10px',
              }}
            >
              A coached job search that ends in an offer.
            </p>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13,
                color: '#8B8AA0',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Progress tracking, interview transcription, multi-role pipeline,
              weekly nudges, a recruiter in every scene.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
