'use client'

/**
 * Theatrical marquee bar — like a Broadway theater's "now showing"
 * scrolling sign. Subtle motion: slow CSS scroll, no JS, no images.
 */

interface MarqueeProps {
  items: string[]
  speedSeconds?: number
}

export function Marquee({ items, speedSeconds = 50 }: MarqueeProps) {
  // Duplicate the items so the loop has no visible seam
  const loop = [...items, ...items]

  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(90deg, #0F0F12 0%, #14141B 50%, #0F0F12 100%)',
        borderTop: '1px solid rgba(108,71,255,0.20)',
        borderBottom: '1px solid rgba(108,71,255,0.20)',
        overflow: 'hidden',
        padding: '14px 0',
      }}
    >
      {/* Edge fades so text dissolves at left/right rather than cutting off */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '12%',
          background: 'linear-gradient(90deg, #0F0F12 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '12%',
          background: 'linear-gradient(270deg, #0F0F12 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          gap: '64px',
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: `hp-marquee ${speedSeconds}s linear infinite`,
        }}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '20px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '12px',
              color: '#A78BFA',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            {item}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes hp-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="hp-marquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
