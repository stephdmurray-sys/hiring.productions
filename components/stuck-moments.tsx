'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Stuck Moments — the search-intent mirror (5/25 strategist critique).
 *
 * The page was missing the scannable "I am right here" anchor. Visitors
 * do not think in features; they think in problems they are currently
 * in. This section lists five common stuck moments and shows the
 * one-line answer the product provides for each.
 *
 * Five rows, intentionally NOT a card grid. Cards introduce decoration
 * the eye has to parse. Rows let the visitor scan top-to-bottom in a
 * single beat:
 *
 *   "Not getting responses?"        → "We show you why you are being
 *                                      skipped, and what to fix."
 *
 * Single CTA at the bottom (per CLAUDE.md rule 5: one CTA per moment).
 * Routing intentionally bundles all five through the same /sign-in
 * funnel — each stuck moment leads to the same first action (build
 * your plan), which then routes to the right tool inside the dashboard.
 */

interface StuckMoment {
  /** The visitor's pain, phrased the way they would search for it. */
  question: string
  /** One-line answer: what the system does about it. */
  answer: string
}

const MOMENTS: StuckMoment[] = [
  {
    question: 'Not getting responses?',
    answer:
      'We show you exactly why your resume is being skipped and what to fix.',
  },
  {
    question: "Don't know who to reach out to?",
    answer:
      'We find the recruiters and hiring managers who are actually hiring for your role.',
  },
  {
    question: 'Not sure what to say in messages?',
    answer:
      'We write outreach that gets opened, in your voice, for the specific person.',
  },
  {
    question: 'Got an interview but feel unprepared?',
    answer:
      'We decode the questions, rehearse you against the real rubric, and tell you how you actually come across.',
  },
  {
    question: 'Received an offer and not sure what to do?',
    answer:
      'We read the offer for what is actually on the table and give you the words to negotiate.',
  },
]

export function StuckMoments() {
  return (
    <section
      style={{
        background: '#FAF8F3',
        padding: 'clamp(56px, 8vw, 96px) 24px clamp(48px, 7vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        {/* Section header — direct question. Eyebrow tagged as deep
            indigo so the eye registers it as a section anchor, not a
            sub-thought of the hero above. */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
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
            Find yourself in this list
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 4.8vw, 52px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.04,
              color: '#1A1A22',
              margin: 0,
            }}
          >
            Where are you stuck?
          </h2>
        </div>

        {/* The list — five stuck moments. No links per row; the whole
            section funnels to one CTA below. Hover lifts the row
            subtly so it reads as scannable, not actionable per-row. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            background: '#FFFFFF',
            border: '1px solid #ECECF2',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(108,71,255,0.06)',
          }}
        >
          {MOMENTS.map((m, i) => (
            <div
              key={m.question}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: 'clamp(20px, 2.6vw, 28px) clamp(20px, 3vw, 32px)',
                borderTop: i === 0 ? 'none' : '1px solid #F2F0F8',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 13,
                    letterSpacing: '0.14em',
                    color: '#A78BFA',
                    flexShrink: 0,
                    width: 24,
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(18px, 2.1vw, 22px)',
                    color: '#1A1A22',
                    letterSpacing: '-0.012em',
                    margin: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {m.question}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(14.5px, 1.55vw, 16.5px)',
                  lineHeight: 1.55,
                  color: '#5A5A6E',
                  margin: 0,
                  paddingLeft: 38,
                  letterSpacing: '0.003em',
                }}
              >
                {m.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Single CTA — funnels the whole section through one action. */}
        <div
          style={{
            marginTop: 'clamp(32px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Link
            href="/sign-in"
            className="stuck-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#FFFFFF',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: '0.005em',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 14px 32px rgba(108,71,255,0.22)',
              transition: 'transform 0.2s ease',
            }}
          >
            Start getting responses{' '}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 12.5,
              color: '#8B8AA0',
            }}
          >
            We will pick up at whichever step you are stuck on.
          </div>
          <style>{`.stuck-cta:hover { transform: translateY(-2px); }`}</style>
        </div>
      </div>
    </section>
  )
}
