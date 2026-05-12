'use client'

import Link from 'next/link'

// Link style is the same across every footer link — extracted as a constant
// instead of repeated inline 8 times.
const linkStyle: React.CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontSize: '14px',
  fontWeight: 500,
  color: '#8B8AA0',
  textDecoration: 'none',
  transition: 'color 0.2s',
}
const onHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = '#F2F0FF'
}
const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.color = '#8B8AA0'
}

const columnHeading: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#8B8AA0',
  marginBottom: '16px',
  fontFamily: "'Figtree', sans-serif",
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="hp-footer"
      style={{
        background: '#0F0F12',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '64px 40px 48px',
        // Breathing room from whatever page content sits above. Guarantees a
        // visible gap even when a tool's result card or upsell panel runs
        // right up to the bottom of the page.
        marginTop: '80px',
      }}
    >
      <div
        className="hp-footer-grid"
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          marginBottom: '48px',
        }}
      >
        {/* Brand */}
        <div className="hp-footer-brand">
          <Link
            href="/"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '18px',
              fontWeight: 800,
              color: '#F2F0FF',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            hiring.productions
          </Link>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#8B8AA0',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            The only place where both sides of hiring finally see the whole thing.
          </p>
          <Link
            href="/membership"
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: 800,
            }}
          >
            Go Pro — $20/yr
          </Link>
        </div>

        {/* Tools */}
        <div>
          <div style={columnHeading}>Tools</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/resume" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
              Does My Resume Read as AI?
            </Link>
            <Link
              href="/tools/whats-breaking-search"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              What’s Breaking Your Search
            </Link>
            <Link
              href="/tools/ghosted"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Have I Been Ghosted?
            </Link>
            <Link
              href="/tools/recruiter-search-rank"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Where Do You Rank in a Recruiter Search?
            </Link>
            <Link href="/jd-seo-score" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
              JD SEO Scorecard
            </Link>
            <Link
              href="/tools"
              style={{ ...linkStyle, color: '#A78BFA', fontWeight: 600 }}
              onMouseEnter={onHover}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A78BFA')}
            >
              See every tool →
            </Link>
          </nav>
        </div>

        {/* Answers — /q/ pages targeting high-volume search queries.
            Lives in the footer so every page on the site internal-links to
            them (link equity flows to the question content) and so visitors
            who'd benefit can actually discover them. */}
        <div>
          <div style={columnHeading}>Answers</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/q/is-my-resume-good"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Is my resume good?
            </Link>
            <Link
              href="/q/7-second-rule-resume"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              What is the 7-second rule?
            </Link>
            <Link
              href="/q/how-to-beat-ats"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              How to beat an ATS
            </Link>
            <Link
              href="/q/resume-red-flags"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              What are resume red flags?
            </Link>
            <Link
              href="/q/explain-resume-gap"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              How to explain a resume gap
            </Link>
            <Link
              href="/q/why-am-i-not-getting-responses"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Why am I not getting responses?
            </Link>
            <Link
              href="/answers"
              style={{ ...linkStyle, color: '#A78BFA', fontWeight: 600 }}
              onMouseEnter={onHover}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A78BFA')}
            >
              See every answer →
            </Link>
          </nav>
        </div>

        {/* For your moment — audience hubs */}
        <div>
          <div style={columnHeading}>For Your Moment</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/after-layoff"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              After a Layoff
            </Link>
            <Link
              href="/for-new-grads"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              For New Grads
            </Link>
            <Link
              href="/career-changers"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Career Changers
            </Link>
            <Link
              href="/returning-to-work"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              Returning to Work
            </Link>
          </nav>
        </div>

        {/* Company */}
        <div>
          <div style={columnHeading}>Company</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/pricing" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
              Pricing
            </Link>
            <Link href="/sign-in" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
              Sign in
            </Link>
            <Link
              href="/for-companies"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              For Companies
            </Link>
            <Link
              href="/for-candidates"
              style={linkStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              For Candidates
            </Link>
            <Link href="/consulting" style={linkStyle} onMouseEnter={onHover} onMouseLeave={onLeave}>
              Consulting
            </Link>
            <a
              href="https://www.repvera.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, cursor: 'pointer' }}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              RepVera
            </a>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="hp-footer-bottom"
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13px',
            color: '#8B8AA0',
          }}
        >
          © {year} Hiring.Productions. All rights reserved.
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
            fontSize: '13px',
            fontFamily: "'Figtree', sans-serif",
          }}
        >
          <span style={{ color: '#8B8AA0' }}>Built by Stephanie Murray</span>
          <a
            href="https://www.linkedin.com/in/stephaniemurray11/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...linkStyle, fontSize: '13px' }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          >
            LinkedIn
          </a>
          <Link href="/privacy" style={{ ...linkStyle, fontSize: '13px' }} onMouseEnter={onHover} onMouseLeave={onLeave}>
            Privacy
          </Link>
          <Link href="/terms" style={{ ...linkStyle, fontSize: '13px' }} onMouseEnter={onHover} onMouseLeave={onLeave}>
            Terms
          </Link>
        </div>
      </div>

      {/* Responsive layout. The footer carries 5 link columns + a brand
          block — too many for the old auto-fit grid to handle cleanly on
          desktop (it wrapped the 5th column to a new row, which looked
          unintentional). Below: fixed 5-column on desktop with the brand
          column wider, collapsing to 2 columns on tablet (brand spans the
          row) and 1 column on phones. */}
      <style>{`
        .hp-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
          gap: 36px;
        }
        @media (max-width: 1024px) {
          .hp-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .hp-footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          .hp-footer {
            padding: 48px 24px 32px !important;
            margin-top: 56px !important;
          }
          .hp-footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
            margin-bottom: 36px !important;
          }
          .hp-footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </footer>
  )
}
