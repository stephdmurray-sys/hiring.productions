'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import { CATALOG } from '@/lib/tools-catalog'
import { getTheme } from '@/lib/tool-themes'
import { analytics } from '@/lib/analytics'

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
 * routes them toward the $14.99/mo or $99/yr membership. The lead-magnet → Pro
 * funnel lives here.
 */
export function ProUpsellPanel({
  recommend,
  eyebrow = 'YOUR NEXT RECRUITER INSIGHT',
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
        background: '#FFFFFF',
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
            color: '#1A1A22',
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
            color: '#5A5A6E',
            margin: '0 0 20px',
            lineHeight: 1.55,
          }}
        >
          Members get the next Recruiter Insight on the same diagnosis, plus every tool from the
          other side of the table.{' '}
          <span style={{ color: '#1A1A22', fontWeight: 800 }}>Pro</span> costs less than Jobscan
          charges for one day.
        </p>

        {/* Tool cards — equal-height enforced via flex column + auto-margin
            on the CTA. Without this, cards size to their content and a
            tool with a longer hook line renders taller than its neighbor,
            producing the staircased card heights Stephanie flagged. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              tools.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            alignItems: 'stretch',
          }}
        >
          {tools.map((tool) => {
            const theme = getTheme(tool)
            return (
              // Single-element card: the Link IS the card. The previous
              // Link-wrapping-div structure was fighting itself because
              // height: 100% on the Link did not cascade to the inner
              // div reliably, so marginTop: auto on the CTA had nothing
              // to push against. Collapsing to one element makes the
              // grid cell stretch the Link directly, flex column on the
              // Link gives the CTA's marginTop: auto a real anchor.
              <Link
                key={tool.href}
                href={tool.href}
                className="hp-upsell-card"
                style={{
                  textDecoration: 'none',
                  background: '#FAF8F3',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '16px 18px',
                  transition: 'border-color 0.18s ease, transform 0.18s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: 0,
                }}
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
                    color: '#1A1A22',
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
                    color: '#5A5A6E',
                    lineHeight: 1.5,
                    marginBottom: '10px',
                  }}
                >
                  {tool.hook}
                </div>
                {/* CTA pinned to bottom. With the Link itself being the
                    flex-column container and height: 100% making it
                    fill its grid cell, marginTop: auto here has the
                    extra space to push against. */}
                <div
                  style={{
                    marginTop: 'auto',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '12.5px',
                    color: theme.accent,
                  }}
                >
                  {tool.cta} →
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
            borderTop: '1px solid #ECECF2',
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
              color: '#5A5A6E',
            }}
          >
            The whole production for{' '}
            <span style={{ color: '#1A1A22', fontWeight: 800 }}>Pro</span>. Cancel anytime.
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

        {/* RepVera moment — the alternative path. Pro tools deepen the
            diagnosis; RepVera changes the medium entirely. Visually
            distinct (coral accent, separated by stronger divider) so it
            reads as "or" not "also." */}
        <div
          style={{
            marginTop: '20px',
            padding: '18px 20px',
            background: 'linear-gradient(135deg, rgba(255,79,106,0.08) 0%, rgba(167,139,250,0.06) 100%)',
            border: '1px solid rgba(255,79,106,0.22)',
            borderRadius: '12px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '3px 10px',
              background: 'rgba(255,79,106,0.14)',
              border: '1px solid rgba(255,79,106,0.35)',
              borderRadius: 100,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FF4F6A',
              marginBottom: '10px',
            }}
          >
            Another way in
          </div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              color: '#1A1A22',
              letterSpacing: '-0.005em',
              lineHeight: 1.35,
              marginBottom: '6px',
            }}
          >
            Your resume is one of 200. RepVera is the page that&apos;s not.
          </div>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13.5px',
              color: '#5A5A6E',
              lineHeight: 1.55,
              margin: '0 0 12px',
            }}
          >
            A personal page recruiters actually read instead of skimming. Built around what you&apos;ve actually done. Free to start.
          </p>
          <a
            href="https://www.repvera.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.repveraClick('pro-upsell-panel')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '13px',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
              padding: '9px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            Start your RepVera, free →
          </a>
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
