'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Authority strip — the trust signal for skeptical visitors.
 *
 * Voice constraint (per Stephanie 5/26): Brightside appears at most
 * once per page as a credential-level bio mention. Never in titles.
 * Never as a named methodology ("the Brightside Talent Collective"
 * was used today and removed). Throughout the body, the achievement
 * is reframed as work she did at "a fast-growing healthcare startup,"
 * with the specific numbers (15-day time-to-hire, 50%+ onboarding
 * cut, 19 to 1,500+ clinicians scale) intact because those are HER
 * credentials, verifiable through the public Transform Award piece.
 *
 * Behavioral grounding:
 *   - Source credibility (Hovland & Weiss 1951): direct quote from
 *     an award-winning recruiter beats a credentials list.
 *   - Specificity over abstraction: the time-to-hire and onboarding
 *     numbers carry the weight that the named-methodology mentions
 *     used to do.
 */
export function AuthorityStrip() {
  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: 'clamp(48px, 6vw, 80px) 24px',
        borderTop: '1px solid #ECECF2',
        borderBottom: '1px solid #ECECF2',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(160px, 220px) 1fr',
          gap: 'clamp(24px, 4vw, 56px)',
          alignItems: 'center',
        }}
      >
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
            sizes="220px"
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>

        <div>
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
            The recruiter behind it
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 64px)',
              letterSpacing: '-0.022em',
              lineHeight: 1.08,
              color: '#1A1A22',
              margin: '0 0 18px',
            }}
          >
            Stephanie Murray. 20 years inside hiring.
          </h2>

          <blockquote
            style={{
              borderLeft: '3px solid #6C47FF',
              paddingLeft: 16,
              margin: '0 0 22px',
              fontFamily: "'Figtree', sans-serif",
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(16.5px, 1.8vw, 19px)',
              lineHeight: 1.55,
              color: '#1A1A22',
              letterSpacing: '0.002em',
            }}
          >
            &ldquo;Relationship-building, creativity, and human-centered
            practices can drive powerful outcomes, even when the entire
            process is remote.&rdquo;
          </blockquote>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 15.5,
              color: '#5A5A6E',
              lineHeight: 1.6,
              margin: '0 0 14px',
            }}
          >
            Senior Director of Talent Acquisition at a fast-growing healthcare startup.
            Built and ran the talent function as it scaled from 19 employees
            to over 1,500 clinicians. Reduced time-to-hire to 15 days. Cut
            onboarding times by more than half.{' '}
            <strong style={{ color: '#5A4FE0', fontWeight: 800 }}>
              2025 Transform Award Winner, Talent Strategy of the Year.
            </strong>
          </p>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 14,
              color: '#1A1A22',
              fontWeight: 600,
              lineHeight: 1.55,
              margin: '0 0 14px',
            }}
          >
            Now she coaches candidates through the exact playbook she ran
            on the other side of the table.
          </p>

          <Link
            href="/about/stephanie"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13.5,
              fontWeight: 700,
              color: '#5A4FE0',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(90,79,224,0.35)',
              paddingBottom: 1,
              letterSpacing: '0.005em',
            }}
          >
            Read the full story →
          </Link>
        </div>
      </div>
    </section>
  )
}
