'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ToolCard } from '@/components/tool-card'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'
import { MOMENTS } from '@/lib/moments'
import { ArrowRight } from 'lucide-react'

/**
 * Tools page — moment-led, not catalog-led.
 *
 * Previously this page led with theatrical framing ("Tonight's Program",
 * "Act One — Free", a scrolling marquee). The brief's audit flagged that
 * job seekers in a panic don't want to decode a creative concept — they
 * want to find what helps them right now. This rewrite organizes every
 * tool by the moment a candidate is actually in:
 *
 *   - Free tools (top of funnel — no upload, no account)
 *   - The Silence
 *   - The Interview
 *   - The Offer
 *   - The Situation
 *
 * The four moments mirror the homepage Start Here board (same MOMENTS
 * data) so a visitor who started there sees consistent structure here.
 * Hiring-team tools live on /for-companies — surfaced as a sidebar
 * callout rather than mixed in.
 */
export default function ToolsPage() {
  // Free tools that aren't already routed by a moment — these are the
  // top-of-funnel candidate entry points.
  const momentToolNames = new Set(MOMENTS.flatMap((m) => m.toolNames))
  const freeTopOfFunnel = CATALOG.filter(
    (t) =>
      t.audience === 'candidate' &&
      t.tier === 'free' &&
      !momentToolNames.has(t.name),
  )

  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* HERO — direct, no theater */}
      <section style={heroSection}>
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>Every tool</Eyebrow>
          <Heading>
            Organized by the moment
            <br />
            you&rsquo;re actually in.
          </Heading>
          <SubHeading>
            Free to start. Pro unlocks the deeper tools — both sides of the table.
          </SubHeading>
        </div>
      </section>

      {/* FREE — TOP OF FUNNEL */}
      {freeTopOfFunnel.length > 0 && (
        <MomentSection
          number="01"
          eyebrow="Free, no account"
          title="Start anywhere."
          sub="No card. No email. Use them right now."
        >
          {freeTopOfFunnel.map((tool) => (
            <ToolCard key={tool.name} tool={tool} variant="standard" />
          ))}
        </MomentSection>
      )}

      {/* THE FOUR MOMENTS */}
      {MOMENTS.map((moment, idx) => {
        const tools = moment.toolNames
          .map((n) => CATALOG.find((t) => t.name === n))
          .filter((t): t is CatalogTool => Boolean(t))
        const sectionNumber = String(idx + 2).padStart(2, '0')
        return (
          <MomentSection
            key={moment.id}
            number={sectionNumber}
            eyebrow={moment.title}
            title={`“${moment.quote}”`}
            sub={moment.sub}
            startHere={tools[0]?.name}
            altBackground={idx % 2 === 0}
          >
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} variant="standard" />
            ))}
          </MomentSection>
        )
      })}

      {/* HIRING TEAM CALLOUT */}
      <section
        style={{
          padding: 'clamp(64px, 8vw, 96px) 24px',
          background: '#FAF8F3',
          borderTop: '1px solid #ECECF2',
        }}
      >
        <div
          style={{
            maxWidth: 880,
            margin: '0 auto',
            background:
              'linear-gradient(135deg, rgba(255,79,106,0.10), rgba(108,71,255,0.06))',
            border: '1px solid rgba(255,79,106,0.25)',
            borderRadius: 20,
            padding: 'clamp(28px, 4vw, 44px)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#FF8FA3',
              marginBottom: 16,
            }}
          >
            Hiring, not job-searching?
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(24px, 3vw, 32px)',
              letterSpacing: '-0.015em',
              color: '#1A1A22',
              margin: '0 0 20px',
              lineHeight: 1.15,
            }}
          >
            The hiring-team toolkit lives on its own page.
          </h2>
          <Link
            href="/for-companies"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: '1.5px solid rgba(255,143,163,0.5)',
              color: '#FF8FA3',
              padding: '13px 26px',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            See the hiring-team tools <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* PRO CTA */}
      <section
        style={{
          padding: 'clamp(72px, 9vw, 112px) 24px clamp(80px, 10vw, 128px)',
          textAlign: 'center',
          background: '#FFFFFF',
          borderTop: '1px solid rgba(108,71,255,0.18)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: 18,
            }}
          >
            Go Pro
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              letterSpacing: '-0.02em',
              color: '#1A1A22',
              margin: '0 0 14px',
              lineHeight: 1.08,
            }}
          >
            Unlimited runs. Both sides of the table.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 17,
              color: '#9D9CB3',
              lineHeight: 1.55,
              maxWidth: 560,
              margin: '0 auto 28px',
            }}
          >
            Less than one hour with a career coach.
          </p>
          <Link
            href="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 32px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              border: 'none',
              color: 'white',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 14px 38px rgba(108,71,255,0.28)',
            }}
          >
            See pricing <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// =====================================================================
// Section primitives
// =====================================================================

const heroSection: React.CSSProperties = {
  position: 'relative',
  background: '#FAF8F3',
  padding: 'clamp(72px, 10vw, 132px) 24px clamp(40px, 6vw, 72px)',
  overflow: 'hidden',
}

function MomentSection({
  number,
  eyebrow,
  title,
  sub,
  startHere,
  altBackground = false,
  children,
}: {
  number: string
  eyebrow: string
  title: string
  sub: string
  startHere?: string
  altBackground?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      style={{
        padding: 'clamp(56px, 8vw, 96px) 24px',
        background: altBackground ? '#FFFFFF' : '#FAF8F3',
        borderTop: '1px solid #ECECF2',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#A78BFA',
            }}
          >
            {number} — {eyebrow}
          </div>
          {startHere && (
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1A1A22',
                background: 'rgba(108,71,255,0.18)',
                border: '1px solid rgba(167,139,250,0.4)',
                padding: '3px 10px',
                borderRadius: 100,
              }}
            >
              Start with {startHere}
            </div>
          )}
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.8vw, 42px)',
            letterSpacing: '-0.02em',
            color: '#1A1A22',
            margin: '0 0 12px',
            lineHeight: 1.08,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 16,
            color: '#9D9CB3',
            lineHeight: 1.55,
            maxWidth: 640,
            margin: '0 0 32px',
          }}
        >
          {sub}
        </p>

        {/* Tool grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 18,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: 12,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#A78BFA',
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 900,
        fontSize: 'clamp(36px, 5.5vw, 60px)',
        lineHeight: 1.05,
        letterSpacing: '-0.025em',
        color: '#1A1A22',
        margin: 0,
      }}
    >
      {children}
    </h1>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(16px, 1.8vw, 18px)',
        lineHeight: 1.55,
        color: '#C9C7DA',
        textAlign: 'center',
        maxWidth: 600,
        margin: '20px auto 0',
      }}
    >
      {children}
    </p>
  )
}
