'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import { CATALOG } from '@/lib/tools-catalog'
import { THEMES } from '@/lib/tool-themes'

interface ProUpsellPanelProps {
  /**
   * Names of Pro catalog tools to feature in the upsell.
   * Must exactly match `name` in the catalog.
   */
  recommend: string[]
  /** Optional override of the eyebrow / heading. */
  eyebrow?: string
  heading?: string
}

/**
 * Reusable "next step" panel that appears at the bottom of a FREE tool
 * result. Lists 1–3 Pro tools that would deepen the user's fix and
 * routes them toward the $20/year membership. The lead-magnet → Pro
 * funnel lives here.
 */
export function ProUpsellPanel({
  recommend,
  eyebrow = 'YOUR NEXT INSIDE LOOK',
  heading,
}: ProUpsellPanelProps) {
  const tools = recommend
    .map((name) => CATALOG.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))

  if (tools.length === 0) return null

  const headingText =
    heading ?? (tools.length === 1 ? 'Want the full version?' : 'Want the full picture?')

  return (
    <section
      style={{
        marginTop: '32px',
        background: '#14141B',
        border: '1px solid rgba(108,71,255,0.30)',
        borderRadius: '18px',
        padding: '28px 28px 24px',
        boxShadow: '0 24px 60px rgba(108,71,255,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          right: -60,
          width: 260,
          height: 260,
          background:
            'radial-gradient(circle, rgba(108,71,255,0.20) 0%, transparent 60%)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <div style={{ position: 'relative' }}>
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(167,139,250,0.10)',
            border: '1px solid rgba(167,139,250,0.25)',
            color: '#A78BFA',
            padding: '4px 10px',
            borderRadius: '100px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          <Lock size={10} strokeWidth={2.5} />
          {eyebrow}
        </div>

        {/* Heading */}
        <h3
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: '22px',
            letterSpacing: '-0.015em',
            color: '#F2F0FF',
            lineHeight: 1.2,
            margin: '0 0 6px',
          }}
        >
          {headingText}
        </h3>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13.5px',
            color: '#9D9CB3',
            margin: '0 0 20px',
            lineHeight: 1.55,
          }}
        >
          Members get the next inside look on the same diagnosis.{' '}
          <span style={{ color: '#F2F0FF', fontWeight: 800 }}>$20/year</span> — less than Jobscan
          charges for one day.
        </p>

        {/* Tool cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              tools.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
          }}
        >
          {tools.map((tool) => {
            const theme = THEMES[tool.theme]
            return (
              <Link
                key={tool.href}
                href={tool.href}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <div
                  style={{
                    background: '#0F0F12',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    padding: '16px 18px',
                    transition: 'border-color 0.18s ease, transform 0.18s ease',
                  }}
                  className="hp-upsell-card"
                >
                  <div
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 800,
                      fontSize: '10px',
                      letterSpacing: '0.10em',
                      color: theme.accent,
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {tool.subtitle}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 800,
                      fontSize: '15px',
                      color: '#F2F0FF',
                      letterSpacing: '-0.005em',
                      lineHeight: 1.3,
                      marginBottom: '6px',
                    }}
                  >
                    {tool.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: '13px',
                      color: '#9D9CB3',
                      lineHeight: 1.5,
                      marginBottom: '10px',
                    }}
                  >
                    {tool.hook}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 800,
                      fontSize: '12.5px',
                      color: theme.accent,
                    }}
                  >
                    {tool.cta} →
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom link to pricing */}
        <div
          style={{
            marginTop: '18px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              color: '#9D9CB3',
            }}
          >
            All five inside looks for{' '}
            <span style={{ color: '#F2F0FF', fontWeight: 800 }}>$20/year</span>. Cancel anytime.
          </div>
          <Link
            href="/pricing"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '13px',
              color: '#A78BFA',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            See pricing &amp; comparison →
          </Link>
        </div>
      </div>

      <style>{`
        .hp-upsell-card:hover {
          border-color: rgba(167,139,250,0.45) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  )
}
