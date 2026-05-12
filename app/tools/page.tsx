'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ToolCard } from '@/components/tool-card'
import { Marquee } from '@/components/marquee'
import { AudienceHubsRow } from '@/components/audience-hubs-row'
import { CATALOG, FLAGSHIP_PRO, type CatalogTool, type ToolAudience } from '@/lib/tools-catalog'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'

type AudienceFilter = 'all' | ToolAudience

export default function ToolsPage() {
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>('all')

  const filtered = useMemo(() => {
    if (audienceFilter === 'all') return CATALOG
    return CATALOG.filter((t) => t.audience === audienceFilter)
  }, [audienceFilter])

  // The 5 flagship Pro tools (in catalog order if listed in FLAGSHIP_PRO)
  const flagshipPro: CatalogTool[] = useMemo(
    () =>
      FLAGSHIP_PRO.map((name) => filtered.find((t) => t.name === name)).filter(
        (t): t is CatalogTool => Boolean(t),
      ),
    [filtered],
  )

  // Free tools (visible)
  const freeTools = useMemo(() => filtered.filter((t) => t.tier === 'free'), [filtered])

  // Pro extras — Pro tools not in the flagship 5
  const proExtras = useMemo(
    () => filtered.filter((t) => t.tier === 'pro' && !FLAGSHIP_PRO.includes(t.name as never)),
    [filtered],
  )

  // Coming soon
  const comingSoon = useMemo(() => filtered.filter((t) => t.tier === 'soon'), [filtered])

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* THEATRICAL HERO */}
      <section
        style={{
          padding: '90px 24px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Stage spotlight */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 1100px 700px at 50% -150px, rgba(108,71,255,0.25) 0%, rgba(255,79,106,0.10) 35%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: '24px',
            }}
          >
            ◆ TONIGHT&apos;S PROGRAM
          </div>

          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(48px, 7vw, 88px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.98,
              color: '#F2F0FF',
              margin: '0 0 24px',
            }}
          >
            Both sides of hiring.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              On the same stage.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              color: '#9D9CB3',
              lineHeight: 1.55,
              maxWidth: '620px',
              margin: '0 auto 32px',
            }}
          >
            Free tools you can run today. The whole production members live on for $20/year. A hiring-team set built from the same recruiting practice.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/pricing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                borderRadius: '12px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 18px 40px rgba(108,71,255,0.32)',
                letterSpacing: '0.01em',
              }}
            >
              See pricing & comparison →
            </Link>
            <Link
              href="#flagship"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                background: 'transparent',
                color: '#A78BFA',
                border: '1.5px solid rgba(167,139,250,0.4)',
                borderRadius: '12px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Browse the program ↓
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE — theatrical "now showing" */}
      <Marquee
        items={[
          'NOW SHOWING — 6 SECONDS WITH YOUR RESUME',
          'BOOLEAN STRINGS THAT FIND YOU',
          'INTERVIEW QUESTIONS DECODED',
          'NEGOTIATION SCRIPTS',
          'KEYWORD GAPS REVEALED',
          'BOTH SIDES OF HIRING',
        ]}
      />

      {/* AUDIENCE FILTER */}
      <section style={{ padding: '40px 24px 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 6, padding: 4, background: '#14141B', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 100 }}>
          <FilterPill active={audienceFilter === 'all'} onClick={() => setAudienceFilter('all')} label="Both sides" />
          <FilterPill
            active={audienceFilter === 'candidate'}
            onClick={() => setAudienceFilter('candidate')}
            label="For candidates"
          />
          <FilterPill
            active={audienceFilter === 'hiring'}
            onClick={() => setAudienceFilter('hiring')}
            label="For hiring teams"
          />
        </div>
      </section>

      {/* AUDIENCE HUBS — curated entry points by candidate moment */}
      <AudienceHubsRow padding="48px 24px 0" />

      {/* FLAGSHIP PRO — featured row */}
      {flagshipPro.length > 0 && (
        <section id="flagship" style={{ padding: '40px 24px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionHeader
              eyebrow="THE FIVE INSIDE LOOKS"
              eyebrowColor="#A78BFA"
              title="The whole production. $20 a year."
              sub="Each one replaces a $30–80/month tool. Five together for less than Jobscan charges for one day."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
                marginTop: '32px',
              }}
            >
              {flagshipPro.map((tool) => (
                <ToolCard key={tool.href} tool={tool} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FREE TOOLS — standard grid */}
      {freeTools.length > 0 && (
        <section style={{ padding: '48px 24px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionHeader
              eyebrow="FREE — START HERE"
              eyebrowColor="#5EE6A8"
              title="Five free tools. No account. No card."
              sub="Built to help — and to give you a sense of what the Pro inside looks deliver."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '20px',
                marginTop: '32px',
              }}
            >
              {freeTools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} variant="standard" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRO EXTRAS */}
      {proExtras.length > 0 && (
        <section style={{ padding: '48px 24px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionHeader
              eyebrow="ALSO INCLUDED IN PRO"
              eyebrowColor="#A78BFA"
              title="More inside looks, same membership."
              sub="The full library — included in the $20/year all the same."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '20px',
                marginTop: '32px',
              }}
            >
              {proExtras.map((tool) => (
                <ToolCard key={tool.href} tool={tool} variant="standard" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMING SOON */}
      {comingSoon.length > 0 && (
        <section style={{ padding: '48px 24px 20px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <SectionHeader
              eyebrow="ON THE WAY"
              eyebrowColor="#8B8AA0"
              title="Coming to the catalog."
              sub="In production right now. The whole hiring-team set lands first."
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '20px',
                marginTop: '32px',
              }}
            >
              {comingSoon.map((tool) => (
                <ToolCard key={tool.href} tool={tool} variant="standard" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CLOSING CTA */}
      <section style={{ padding: '80px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            textAlign: 'center',
            background: '#14141B',
            border: '1px solid rgba(108,71,255,0.30)',
            borderRadius: '24px',
            padding: '56px 36px',
            boxShadow: '0 30px 100px rgba(108,71,255,0.18)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -100,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 500,
              height: 500,
              background:
                'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: '16px',
              position: 'relative',
            }}
          >
            ◆ THE WHOLE PRODUCTION
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: '#F2F0FF',
              margin: '0 0 16px',
              position: 'relative',
            }}
          >
            Every inside look. $20 a year.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              color: '#9D9CB3',
              lineHeight: 1.6,
              margin: '0 0 28px',
              position: 'relative',
            }}
          >
            Less than Jobscan charges for one day. Less than Teal+ charges for a week and a half.
          </p>
          <StripeCheckoutButton
            style={{
              padding: '15px 36px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              borderRadius: '12px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '15px',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 18px 40px rgba(108,71,255,0.32)',
              position: 'relative',
            }}
          >
            Get Full Access — $20/year
          </StripeCheckoutButton>
          <div style={{ marginTop: 14, position: 'relative' }}>
            <Link
              href="/pricing"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                color: '#A78BFA',
                textDecoration: 'none',
              }}
            >
              See full pricing comparison →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// =====================================================================
// Section header
// =====================================================================

function SectionHeader({
  eyebrow,
  eyebrowColor,
  title,
  sub,
}: {
  eyebrow: string
  eyebrowColor: string
  title: string
  sub: string
}) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
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
          color: eyebrowColor,
          marginBottom: '14px',
        }}
      >
        <span style={{ width: 24, height: 1, background: eyebrowColor, opacity: 0.6 }} />
        {eyebrow}
        <span style={{ width: 24, height: 1, background: eyebrowColor, opacity: 0.6 }} />
      </div>
      <h2
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          color: '#F2F0FF',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          color: '#9D9CB3',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {sub}
      </p>
    </div>
  )
}

// =====================================================================
// Filter pill
// =====================================================================

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'linear-gradient(135deg, #6C47FF, #FF4F6A)' : 'transparent',
        color: active ? '#FFFFFF' : '#C9C7DA',
        border: 'none',
        borderRadius: 100,
        padding: '10px 20px',
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: '12.5px',
        letterSpacing: '0.02em',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  )
}
