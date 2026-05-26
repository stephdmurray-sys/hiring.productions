'use client'

interface RepveraBridgeProps {
  /**
   * Which tool this bridge is appearing in. Drives the contextual copy so
   * the link to RepVera reads as a natural next step from THIS specific
   * tool's value moment, not a generic banner.
   */
  source: 'recruiter-eyes' | 'linkedin' | 'rehearsal-room' | 'generic'
  /** Whether to render inside a white document (light variant) or on the dark page (dark variant). */
  variant?: 'light' | 'dark'
}

const COPY: Record<RepveraBridgeProps['source'], { eyebrow: string; title: string; body: string; cta: string }> = {
  'recruiter-eyes': {
    eyebrow: 'The next signal',
    title: 'Your resume is one signal. Real recommendations are the other.',
    body: 'A recruiter trusts what former colleagues say about you more than anything you write about yourself. RepVera makes those one-click to collect, from the people who actually worked with you.',
    cta: 'Build your RepVera, free',
  },
  linkedin: {
    eyebrow: 'After the rewrite',
    title: 'You named the right people to ask. RepVera makes them one-click.',
    body: 'The Recommendations strategy above told you who to ask and what to ask them. RepVera turns those asks into a sharable proof layer, backed by the actual people who worked with you, not LinkedIn endorsements from strangers.',
    cta: 'Build your RepVera, free',
  },
  'rehearsal-room': {
    eyebrow: 'Beyond the script',
    title: 'When they ask about your last role, real testimonials do the talking.',
    body: 'The script gets you into the interview. What gets you the offer is what your past managers and peers say about you when no one\'s in the room. RepVera collects those, in their words, before the recruiter even calls.',
    cta: 'Start your RepVera, free',
  },
  generic: {
    eyebrow: 'The proof layer',
    title: 'Your reel of past performances.',
    body: 'Hiring.productions is the script and the rehearsal. RepVera is the reel. Real recommendations from the people who actually worked with you. Free to start.',
    cta: 'Start your RepVera, free',
  },
}

export function RepveraBridge({ source, variant = 'light' }: RepveraBridgeProps) {
  const copy = COPY[source]
  const isLight = variant === 'light'

  const palette = isLight
    ? {
        bg: 'linear-gradient(135deg, #FAF6FF 0%, #FFF4F1 100%)',
        border: 'rgba(108,71,255,0.2)',
        eyebrow: '#7A6CFF',
        title: '#1A1A22',
        body: '#5A5A6E',
      }
    : {
        bg: 'linear-gradient(135deg, #1A1A22 0%, #2A1F3D 100%)',
        border: 'rgba(108,71,255,0.4)',
        eyebrow: '#A78BFA',
        title: '#F2F0FF',
        body: '#B8B6CF',
      }

  return (
    <div
      style={{
        margin: isLight ? '24px 0 8px' : '32px 0',
        padding: '28px 32px',
        background: palette.bg,
        border: `1.5px solid ${palette.border}`,
        borderRadius: '14px',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: palette.eyebrow,
          marginBottom: '10px',
        }}
      >
        {copy.eyebrow}
      </div>
      <h3
        style={{
          fontSize: '20px',
          fontWeight: 900,
          color: palette.title,
          letterSpacing: '-0.02em',
          margin: '0 0 12px 0',
          lineHeight: 1.25,
        }}
      >
        {copy.title}
      </h3>
      <p
        style={{
          fontSize: '14.5px',
          color: palette.body,
          lineHeight: 1.6,
          margin: '0 0 18px 0',
        }}
      >
        {copy.body}
      </p>
      <a
        href="https://www.repvera.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '12px 22px',
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '10px',
          fontWeight: 800,
          fontSize: '14px',
          fontFamily: 'Figtree, sans-serif',
        }}
      >
        {copy.cta} →
      </a>
    </div>
  )
}
