'use client'

import Image from 'next/image'

/**
 * Authority strip — the trust signal for skeptical job seekers.
 *
 * Job seekers in pain are burned by AI tools, fake coaches, and
 * generic resume builders. They need to see a real recruiter behind
 * this before they sign up. The strip is tight, factual, with one
 * photo and three credibility claims that are all sourceable.
 *
 * Sits between DashboardPreview (the product) and StartHereBoard
 * (the free tools). Functions as the bridge: "this works because
 * this person built it."
 *
 * Behavioral grounding:
 *   - Source credibility (Hovland & Weiss 1951) — claims are weighted
 *     by the perceived expertise of the source. A real recruiter
 *     coaching candidates beats an anonymous "AI career assistant"
 *     on every dimension.
 *   - Specificity over abstraction — "20 years TA, employee #19 at
 *     Brightside" beats "experienced talent professional."
 *   - No fake metrics — all three claims are real and sourceable.
 */
export function AuthorityStrip() {
  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: 'clamp(36px, 5vw, 60px) 24px',
        borderTop: '1px solid #ECECF2',
        borderBottom: '1px solid #ECECF2',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 200px) 1fr',
          gap: 'clamp(20px, 4vw, 48px)',
          alignItems: 'center',
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #ECECF2',
            background: '#FAFAFB',
          }}
        >
          <Image
            src="/images/stephanie-murray.jpg"
            alt="Stephanie Murray, founder of hiring.productions"
            fill
            sizes="200px"
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>

        {/* Authority text */}
        <div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 10,
            }}
          >
            The recruiter behind it
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 64px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#1A1A22',
              margin: '0 0 14px',
            }}
          >
            Stephanie Murray. 20 years inside hiring.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 15.5,
              color: '#5A5A6E',
              lineHeight: 1.6,
              margin: '0 0 16px',
            }}
          >
            Senior Director of Talent Acquisition at Brightside Health. Scaled
            the team from employee #19 to 1,500+ clinicians nationwide. Transform
            Award Winner, Talent Strategy of the Year 2025.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 14,
              color: '#1A1A22',
              fontWeight: 600,
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            Now she coaches candidates through the exact playbook she ran on
            the other side of the table.
          </p>
        </div>
      </div>
    </section>
  )
}
