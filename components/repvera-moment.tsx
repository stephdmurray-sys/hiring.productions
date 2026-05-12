interface RepVeraMomentProps {
  /** The contextual hook — what's true about THIS audience that makes RepVera fit. */
  title: string
  /** One short paragraph that bridges from the hook to RepVera. */
  body: string
  /** Optional CTA override; defaults to "Start your RepVera — free →" */
  ctaLabel?: string
}

/**
 * The RepVera-side door. Lives near the bottom of audience hub pages
 * (and anywhere a user might benefit from a personal-page alternative
 * to fixing their resume). Visually distinct from the Pro upsell —
 * coral-led gradient + a different framing ("change the medium" not
 * "deepen the diagnosis") so the two paths don't compete.
 */
export function RepVeraMoment({ title, body, ctaLabel = 'Start your RepVera — free →' }: RepVeraMomentProps) {
  return (
    <section style={{ padding: '24px 24px 80px' }}>
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(255,79,106,0.10) 0%, rgba(167,139,250,0.06) 100%)',
          border: '1px solid rgba(255,79,106,0.30)',
          borderRadius: 20,
          padding: 'clamp(28px, 5vw, 44px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -90,
            right: -60,
            width: 280,
            height: 280,
            background: 'radial-gradient(circle, rgba(255,79,106,0.18) 0%, transparent 60%)',
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
            background: 'rgba(255,79,106,0.16)',
            border: '1px solid rgba(255,79,106,0.40)',
            borderRadius: 100,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FF4F6A',
            marginBottom: 16,
          }}
        >
          ◆ THE OTHER PATH
        </div>

        <h2
          style={{
            position: 'relative',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.4vw, 34px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#F2F0FF',
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
            color: '#9D9CB3',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 auto 24px',
          }}
        >
          {body}
        </p>

        <a
          href="https://www.repvera.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '14px 28px',
            background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
            color: '#FFFFFF',
            borderRadius: 12,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '14px',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            boxShadow: '0 18px 40px rgba(255,79,106,0.30)',
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  )
}
