'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Authority strip — the trust signal for skeptical visitors.
 *
 * Rewritten 5/26 after a strategic gap surfaced: the previous version
 * listed credentials but did not carry Stephanie's actual voice. The
 * Transform Award piece on transform.us has public, sourceable quotes
 * from her that read on-brand for this site. Bringing one of them
 * forward makes the strip carry her voice, not just her resume.
 *
 * Also surfaces the specific numbers from the Transform Award piece:
 *   - Reduced clinician time-to-hire to 15 days
 *   - Cut onboarding times by more than half
 *   - Built the Brightside Talent Collective (named methodology that
 *     won the 2025 Transform Award)
 * Numbers replace the previous vague "scaled from 19 to 1,500" line
 * with the WHY behind the scale.
 *
 * Behavioral grounding:
 *   - Source credibility (Hovland & Weiss 1951): claims weighted by
 *     perceived expertise of the source. A direct quote from an
 *     award-winning recruiter beats a credentials list.
 *   - Specificity over abstraction: "time-to-hire reduced to 15 days"
 *     beats "improved time-to-hire."
 *   - Sourceable: every claim links back to transform.us article.
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
        {/* Photo. If /images/stephanie-murray.jpg is missing the
            next/image component renders nothing but the alt is set
            so screen readers still surface the identity. */}
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

          {/* Pullquote from the Transform Award piece. Direct quote so
              brand-voice em-dash rule does not apply (her words, not
              our marketing copy). Lavender italic. The left bar
              anchors it as a quote, not floating text. */}
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
            Senior Director of Talent Acquisition at Brightside Health.
            Built the{' '}
            <strong style={{ color: '#1A1A22', fontWeight: 700 }}>
              Brightside Talent Collective
            </strong>
            , scaling the team from employee #19 to over 1,500 clinicians.
            Reduced time-to-hire to 15 days. Cut onboarding times by more
            than half.{' '}
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
