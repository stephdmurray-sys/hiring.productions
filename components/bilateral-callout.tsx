import Link from 'next/link'

/**
 * "Both sides of the table" callout — candidate-only.
 *
 * Tells a candidate that their Pro tier also unlocks the hiring-team
 * tools so they can see exactly how recruiters source, screen, and
 * decide. That bilateral perspective is the candidate-side wedge.
 *
 * Reframed 5/26: this component is no longer rendered on hiring-team
 * pages. Hiring teams are consulting clients, not Pro subscribers,
 * so showing them the $14.99/mo or $99/yr Pro pricing is the wrong
 * conversion path. The hiring-team variant has been removed.
 *
 * Previous prop `audience: 'candidate' | 'hiring'` is now just
 * 'candidate' — kept as a literal in the type so any leftover
 * `audience="hiring"` usage fails type-check at build time and
 * surfaces the regression.
 */
interface BilateralCalloutProps {
  audience: 'candidate'
}

export function BilateralCallout(_: BilateralCalloutProps) {
  return (
    <section style={{ padding: 'clamp(48px, 6vw, 64px) clamp(20px, 5vw, 24px)' }}>
      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(108,71,255,0.10) 0%, rgba(255,79,106,0.06) 100%)',
          border: '1px solid rgba(108,71,255,0.30)',
          borderRadius: 18,
          padding: 'clamp(28px, 5vw, 40px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -80,
            right: -60,
            width: 260,
            height: 260,
            background:
              'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 60%)',
            pointerEvents: 'none',
            opacity: 0.7,
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            background: 'rgba(167,139,250,0.14)',
            border: '1px solid rgba(167,139,250,0.35)',
            borderRadius: 100,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 14,
          }}
        >
          ◆ BOTH SIDES OF THE TABLE
        </div>

        <h2
          style={{
            position: 'relative',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(22px, 3.2vw, 30px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: '#1A1A22',
            margin: '0 0 14px',
          }}
        >
          Your Pro tier unlocks the other side of the table.
        </h2>
        <p
          style={{
            position: 'relative',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '15.5px',
            color: '#5A5A6E',
            lineHeight: 1.65,
            margin: '0 0 20px',
          }}
        >
          Every hiring-team tool (JD-through-candidate-eyes, the boolean
          string a recruiter actually pastes, the AI-application detector,
          the interview scorecard, the offer pitch) is included with Pro
          at $14.99/mo or $99/yr. The candidates who close offers fastest
          are the ones who can see how the other side actually thinks.
        </p>
        <Link
          href="/tools"
          style={{
            position: 'relative',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '14px',
            color: '#A78BFA',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          See the hiring-team tools →
        </Link>
      </div>
    </section>
  )
}
