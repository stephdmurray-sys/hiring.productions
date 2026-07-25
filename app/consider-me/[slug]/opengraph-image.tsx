import { ImageResponse } from 'next/og'
import { getOpportunity } from '@/lib/opportunities'

// Open Graph image for each engagement page, so sharing a role link
// on LinkedIn shows a branded card instead of bare text. File-based
// convention: Next.js auto-wires this to og:image for the segment.

export const runtime = 'edge'
export const alt = 'Open engagement at hiring.productions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const opp = getOpportunity(slug)
  const title = opp?.title ?? 'Open engagement'
  const meta = opp?.meta ?? 'Contract. Remote.'

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
        {/* Radial glow, top right */}
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
        {/* Radial glow, bottom left */}
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
            fontSize: 40,
            fontWeight: 800,
            color: '#1A1A22',
            letterSpacing: '-0.02em',
            marginBottom: 48,
          }}
        >
          hiring.productions
        </div>

        {/* Open now pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#0F7A4F',
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#0F7A4F',
            }}
          >
            Open engagement
          </div>
        </div>

        {/* Role title */}
        <div
          style={{
            fontSize: title.length > 34 ? 72 : 84,
            fontWeight: 800,
            color: '#1A1A22',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: 1000,
            marginBottom: 28,
          }}
        >
          {title}
        </div>

        {/* Meta line */}
        <div
          style={{
            fontSize: 30,
            color: '#5A5A6E',
            marginBottom: 48,
          }}
        >
          {meta}
        </div>

        {/* Solid indigo apply pill */}
        <div
          style={{
            display: 'flex',
            background: '#6C47FF',
            color: '#FFFFFF',
            fontSize: 28,
            fontWeight: 800,
            padding: '20px 44px',
            borderRadius: 14,
          }}
        >
          Apply now
        </div>
      </div>
    ),
    { ...size },
  )
}
