'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Sample Read — anonymized example of a real tool output, restructured
 * as a dashboard.
 *
 * v1 (prose-heavy magazine article format) was diagnostically right but
 * overwhelming to a panicking job seeker at 2am. v2 keeps the same
 * diagnostic depth — verdict + three actionable fixes + closing read —
 * but presents it as a scannable dashboard: one big verdict, three
 * issue cards in a row, one closing sentence, one CTA. ~60% less text.
 *
 * Voice rules respected: no invented person's name, no fabricated
 * company logo, no fake testimonial. The "candidate" is a generic
 * archetype; the recruiter voice is Stephanie's calibrated read.
 */

interface Fix {
  label: string
  quote: string
  fix: string
}

const FIXES: Fix[] = [
  {
    label: 'Buried wedge',
    quote: 'Healthcare role sits under ad-tech.',
    fix: 'Reorder. Healthcare is her differentiator for clinical SaaS — should come first.',
  },
  {
    label: 'No proof',
    quote: '“Drove cross-functional initiatives that delivered measurable impact.”',
    fix: 'Generic. Add one specific number per role. Her patient-intake redesign cut onboarding 14 → 3 days. That goes first.',
  },
  {
    label: 'Anonymous headline',
    quote: '“Strategic Product Leader.”',
    fix: 'Every senior PM says this. Change to “Senior PM, B2B SaaS · healthcare and fintech.” Surfaces her in 4 of 5 clinical searches.',
  },
]

export function SampleRead() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#14141B',
        color: '#F2F0FF',
        padding: 'clamp(64px, 9vw, 112px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Section eyebrow + heading */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          02.5 — Inside a real read
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            textAlign: 'center',
            margin: '0 0 14px',
          }}
        >
          What you actually get back.
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 16,
            color: '#9D9CB3',
            lineHeight: 1.55,
            textAlign: 'center',
            maxWidth: 560,
            margin: '0 auto 36px',
          }}
        >
          A sample from <em>Through a Recruiter&rsquo;s Eyes.</em> Identifying details scrubbed.
        </p>

        {/* The result card — dashboard layout */}
        <article
          style={{
            background: '#0F0F12',
            border: '1px solid rgba(108,71,255,0.30)',
            borderRadius: 18,
            padding: 'clamp(24px, 4vw, 36px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.40)',
          }}
        >
          {/* Top stripe — same flourish the live tool uses */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            }}
          />

          {/* Sample meta row */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                background: 'rgba(167,139,250,0.14)',
                border: '1px solid rgba(167,139,250,0.35)',
                padding: '4px 10px',
                borderRadius: 100,
              }}
            >
              Sample
            </span>
            <span
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: '#8B8AA0',
              }}
            >
              Senior Product Manager · 8 yrs · B2B SaaS
            </span>
          </div>

          {/* THE VERDICT — big visual anchor */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: 18,
              alignItems: 'stretch',
              marginBottom: 28,
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,79,106,0.12), rgba(108,71,255,0.10))',
                border: '1px solid rgba(255,79,106,0.30)',
                borderRadius: 14,
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 10.5,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#FF8FA3',
                  marginBottom: 8,
                }}
              >
                Verdict
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(22px, 2.8vw, 28px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.015em',
                  color: '#F2F0FF',
                }}
              >
                Borderline screen-in.
              </div>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 10.5,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#A78BFA',
                  marginBottom: 8,
                }}
              >
                Today
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: '#F2F0FF',
                  lineHeight: 1.3,
                }}
              >
                In <span style={{ color: '#FF8FA3' }}>0 of 5</span> recruiter searches I&rsquo;d run.
              </div>
            </div>
            <div
              style={{
                background: 'rgba(94,230,168,0.06)',
                border: '1px solid rgba(94,230,168,0.30)',
                borderRadius: 14,
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 10.5,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#5EE6A8',
                  marginBottom: 8,
                }}
              >
                After three fixes
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: '#F2F0FF',
                  lineHeight: 1.3,
                }}
              >
                In <span style={{ color: '#5EE6A8' }}>4 of 5</span> searches.
              </div>
            </div>
          </div>

          {/* THE THREE FIXES — scannable cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: 14,
              marginBottom: 28,
            }}
          >
            {FIXES.map((fix, i) => (
              <FixCard key={i} index={i + 1} fix={fix} />
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/tools/resume-recruiter-eyes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 24px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 14.5,
              color: 'white',
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(108,71,255,0.28)',
            }}
          >
            Run this read on your resume <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </article>
      </div>
    </section>
  )
}

function FixCard({ index, fix }: { index: number; fix: Fix }) {
  return (
    <div
      style={{
        background: '#14141B',
        border: '1px solid rgba(167,139,250,0.18)',
        borderRadius: 12,
        padding: '18px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 13,
            color: '#A78BFA',
            opacity: 0.7,
          }}
        >
          0{index}
        </span>
        <span
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#F2F0FF',
          }}
        >
          {fix.label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 13.5,
          color: '#C9C7DA',
          lineHeight: 1.5,
          paddingLeft: 11,
          borderLeft: '2px solid rgba(167,139,250,0.45)',
        }}
      >
        {fix.quote}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: 13.5,
          color: '#F2F0FF',
          lineHeight: 1.5,
        }}
      >
        {fix.fix}
      </div>
    </div>
  )
}
