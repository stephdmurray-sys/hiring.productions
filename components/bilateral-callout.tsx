import Link from 'next/link'

interface BilateralCalloutProps {
  /** Which side the visitor is currently on. The callout shows the OTHER side. */
  audience: 'candidate' | 'hiring'
}

/**
 * Small "both sides of the table" callout that sits inside audience hubs
 * (after-layoff, for-small-teams, etc.) to make the bilateral access
 * benefit of Pro visible.
 *
 * A candidate-side visitor sees: "Your Pro membership also unlocks the hiring-team
 * tools — see exactly how recruiters source, screen, and decide."
 *
 * A hiring-side visitor sees: "Your Pro membership also unlocks the candidate tools
 * — see exactly what applicants run their resume through before it hits
 * your inbox."
 *
 * That bilateral promise is the brand's core wedge per BRAND.md ("both
 * sides over either side"), but it's not currently visible enough.
 */
export function BilateralCallout({ audience }: BilateralCalloutProps) {
  const isForCandidate = audience === 'candidate'
  const title = isForCandidate
    ? 'Your Pro membership unlocks the other side of the table.'
    : 'Your Pro membership unlocks the candidate side of the table.'
  const body = isForCandidate
    ? "Every hiring-team tool (JD-through-candidate-eyes, the boolean string a recruiter actually pastes, the AI-application detector, the interview scorecard, the offer pitch) is included in your $14.99/mo or $99/yr. The candidates who close offers fastest are the ones who can see how the other side actually thinks."
    : "Every candidate-side tool (the AI resume check, the recruiter's actual read on a resume, the keyword gap analysis, the LinkedIn rewrite) is included in your $14.99/mo or $99/yr. The hiring teams that hire well are the ones who can see what their applicants are running their resumes through before they hit the inbox."
  const cta = isForCandidate
    ? 'See the hiring-team tools →'
    : 'See the candidate-side tools →'
  const href = '/tools'

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
          {title}
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
          {body}
        </p>
        <Link
          href={href}
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
          {cta}
        </Link>
      </div>
    </section>
  )
}
