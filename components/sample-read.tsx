'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Sample Read — aggressive minimalist rebuild.
 *
 * v3 follows the five design rules (CLAUDE.md):
 *   1. One focal point per section — the 0 → 4 visual anchor.
 *   2. Whitespace is content — 96px+ between sections, 64px+ inside.
 *   3. Restraint with color — gradient anchor, lavender accent, the rest neutral.
 *   4. Type does the work — hierarchy by size, no decorative borders.
 *   5. One CTA per moment — single button, single destination.
 *   6. Write the conclusion — three lines of read, not three paragraphs.
 *
 * v2 was a dashboard (verdict pill + three numeric cards + three fix
 * cards) — diagnostically right but 15 visual elements competing. v3
 * uses 5 elements total. Same information, one-fifth the chrome.
 */

const FIXES: { label: string; fix: string }[] = [
  {
    label: 'Buried wedge.',
    fix: 'Healthcare role is third. It’s her differentiator for clinical SaaS — should be first.',
  },
  {
    label: 'No proof.',
    fix: 'Six years of platform work, not one number. Her patient-intake redesign cut onboarding 14 → 3 days. That line goes first.',
  },
  {
    label: 'Anonymous headline.',
    fix: '"Strategic Product Leader." Every senior PM says this. Change to "Senior PM, B2B SaaS · healthcare and fintech."',
  },
]

export function SampleRead() {
  return (
    <section
      style={{
        background: '#0F0F12',
        color: '#F2F0FF',
        padding: 'clamp(96px, 12vw, 160px) 24px',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* HEADING. One line. */}
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(34px, 5vw, 56px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: '#F2F0FF',
            textAlign: 'center',
            margin: '0 0 16px',
          }}
        >
          What you actually get back.
        </h2>

        {/* Sub. One line. */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 16,
            color: '#8B8AA0',
            lineHeight: 1.55,
            textAlign: 'center',
            margin: '0 0 clamp(72px, 9vw, 112px)',
          }}
        >
          A sample from <em>Through a Recruiter&rsquo;s Eyes.</em>
        </p>

        {/* Meta — one line, tiny. */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#6B6A82',
            textAlign: 'center',
            margin: '0 0 24px',
          }}
        >
          Senior PM &middot; 8 yrs &middot; B2B SaaS
        </p>

        {/* THE VISUAL ANCHOR — two-column scoreboard. Big isolated stats,
            captions below, no card borders, no decorative pills. The eye
            lands on the numbers FIRST, then reads the labels. Sentence-
            scale text was too slow because every word competed at equal
            weight; scoreboard typography puts the focal point in the
            ratios where it belongs. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* BEFORE */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#6B6A82',
                marginBottom: 18,
              }}
            >
              Today
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
              <span
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(96px, 14vw, 160px)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#F2F0FF',
                }}
              >
                0
              </span>
              <span
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#3F3D52',
                  marginLeft: 6,
                }}
              >
                /5
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.5,
                color: '#8B8AA0',
                marginTop: 18,
              }}
            >
              recruiter searches she&rsquo;s in
            </div>
          </div>

          {/* AFTER */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                marginBottom: 18,
              }}
            >
              After three fixes
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
              <span
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(96px, 14vw, 160px)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                4
              </span>
              <span
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#5E4DB8',
                  marginLeft: 6,
                }}
              >
                /5
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.5,
                color: '#C9C7DA',
                marginTop: 18,
              }}
            >
              searches she&rsquo;d surface in
            </div>
          </div>
        </div>

        {/* THE THREE FIXES — plain text. No cards. No borders. */}
        <div style={{ marginBottom: 'clamp(56px, 7vw, 80px)' }}>
          {FIXES.map((fix, i) => (
            <div
              key={i}
              style={{
                paddingBottom: i < FIXES.length - 1 ? 28 : 0,
                marginBottom: i < FIXES.length - 1 ? 28 : 0,
                borderBottom: i < FIXES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 'clamp(17px, 1.8vw, 19px)',
                  lineHeight: 1.6,
                  color: '#F2F0FF',
                  margin: 0,
                }}
              >
                <span style={{ fontWeight: 900 }}>{fix.label}</span>{' '}
                <span style={{ color: '#9D9CB3' }}>{fix.fix}</span>
              </p>
            </div>
          ))}
        </div>

        {/* ONE CTA. */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/tools/resume-recruiter-eyes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 32px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Run this read on your resume <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
