'use client'

import Link from 'next/link'

interface Hub {
  href: string
  eyebrow: string
  title: string
  tagline: string
  accent: string
}

// All four hubs share the lavender accent. The copy differentiates the hubs;
// the color does not. Disciplined palette per BRAND.md.
const HUB_ACCENT = '#A78BFA'

const HUBS: Hub[] = [
  {
    href: '/for-new-grads',
    eyebrow: 'NEW GRADS',
    title: 'No experience yet?',
    tagline: 'Resume, GPA, school, keywords. What hiring managers really weigh in the first six seconds.',
    accent: HUB_ACCENT,
  },
  {
    href: '/after-layoff',
    eyebrow: 'AFTER A LAYOFF',
    title: 'Just laid off?',
    tagline: 'Frame the gap, decode the silence, run a search that lands in months not quarters.',
    accent: HUB_ACCENT,
  },
  {
    href: '/career-changers',
    eyebrow: 'CAREER CHANGERS',
    title: 'Switching fields?',
    tagline: 'Translate your past into the language of the new field, without losing the credibility you’ve built.',
    accent: HUB_ACCENT,
  },
  {
    href: '/returning-to-work',
    eyebrow: 'RETURNING TO WORK',
    title: 'Coming back after a break?',
    tagline: 'Re-enter at level. The framing that works, the network moves that actually land roles.',
    accent: HUB_ACCENT,
  },
]

interface Props {
  /** Optional heading eyebrow over the row */
  showHeader?: boolean
  /** Top/bottom padding override */
  padding?: string
}

export function AudienceHubsRow({ showHeader = true, padding = '60px 24px' }: Props) {
  return (
    <section style={{ padding, background: '#FAF8F3' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {showHeader && (
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '11px',
                letterSpacing: '0.20em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                marginBottom: '14px',
              }}
            >
              <span style={{ width: 24, height: 1, background: '#A78BFA', opacity: 0.6 }} />
              WHERE YOU ARE IN THE SEARCH
              <span style={{ width: 24, height: 1, background: '#A78BFA', opacity: 0.6 }} />
            </div>
            <h2
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(26px, 3.4vw, 38px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: '#1A1A22',
                margin: '0 0 10px',
              }}
            >
              Pick the path that matches your moment.
            </h2>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#5A5A6E',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Each hub is a curated set of free tools and recruiter-grade answers for one specific moment in a job search.
            </p>
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {HUBS.map((hub) => (
            <HubCard key={hub.href} hub={hub} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HubCard({ hub }: { hub: Hub }) {
  return (
    <Link
      href={hub.href}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 22px 26px',
        background: '#FFFFFF',
        border: '1px solid #ECECF2',
        borderRadius: '14px',
        textDecoration: 'none',
        color: 'inherit',
        overflow: 'hidden',
        transition: 'transform 0.18s ease, border-color 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = `${hub.accent}66`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = '#ECECF2'
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: hub.accent,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: hub.accent,
          marginBottom: '12px',
        }}
      >
        ◆ {hub.eyebrow}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: '20px',
          letterSpacing: '-0.015em',
          lineHeight: 1.2,
          color: '#1A1A22',
          marginBottom: '10px',
        }}
      >
        {hub.title}
      </div>
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: 1.55,
          color: '#5A5A6E',
          margin: '0 0 18px',
        }}
      >
        {hub.tagline}
      </p>
      <div
        style={{
          marginTop: 'auto',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: '13px',
          color: hub.accent,
        }}
      >
        Open this hub →
      </div>
    </Link>
  )
}
