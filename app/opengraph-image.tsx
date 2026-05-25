import { ImageResponse } from 'next/og'

// Renders the site-wide Open Graph image at /opengraph-image.png.
// File-based convention — Next.js auto-discovers this and serves it.
// The hardcoded /images/og-image.jpg reference in app/layout.tsx is
// no longer needed once this exists.

export const runtime = 'edge'
export const alt = 'hiring.productions — Both sides of hiring. Finally in the open.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#FAF8F3',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow — top-right */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(108,71,255,0.32) 0%, rgba(108,71,255,0) 70%)',
          }}
        />
        {/* Radial glow — bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            left: -240,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,79,106,0.28) 0%, rgba(255,79,106,0) 70%)',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#1A1A22',
            marginBottom: 36,
            display: 'flex',
          }}
        >
          hiring.productions
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 24,
            display: 'flex',
          }}
        >
          BOTH SIDES OF HIRING. FINALLY IN THE OPEN.
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#1A1A22',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Behind every strong hire</span>
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            is a real production.
          </span>
        </div>

        {/* Footer line */}
        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 96,
            fontSize: 22,
            fontWeight: 500,
            color: '#9D9CB3',
            display: 'flex',
          }}
        >
          Free tools and the Recruiter Insights every recruiter wishes you knew.
        </div>
      </div>
    ),
    { ...size },
  )
}
