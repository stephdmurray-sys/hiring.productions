'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HomepageHero } from '@/components/homepage-hero'
import { DashboardPreview } from '@/components/dashboard-preview'
import { AuthorityStrip } from '@/components/authority-strip'
import { StartHereBoard } from '@/components/start-here-board'
import { PricingTransparency } from '@/components/pricing-transparency'

/**
 * Homepage v2 — single-wedge positioning.
 *
 * Clarity data (May 2026) showed two patterns: (1) brief homepage exits
 * with no clicks, and (2) users hopping between For Companies and For
 * Candidates before bouncing. Both diagnose the same root: the homepage
 * was asking visitors to pick a side before showing them anything they
 * could DO. This rebuild leads with one tool — Where Do You Rank in a
 * Recruiter Search — as the single front door. Bilateral access (which
 * is still the wedge of the product) is preserved as the membership
 * benefit below the fold, not the homepage tagline above it.
 */
export default function HomePage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');
        .recruiter-insight-card:hover {
          border-color: rgba(108,71,255,0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(108,71,255,0.10);
        }
        .hero-btn:hover {
          transform: translateY(-2px);
        }
        .result-mock-card:hover {
          border-color: rgba(108,71,255,0.35) !important;
        }
      `}</style>
      <Navigation variant="light" />

      {/* ──────────────── AUDIENCE PRE-ROUTER ─────────────────
         Thin strip above the candidate hero so hiring leaders landing
         cold don't have to scroll past four candidate question cards
         to find the "different door." The candidate experience is
         the homepage default; this strip is a passive signpost for
         visitors in the wrong room.
      */}
      {/* Quieted per critic feedback (5/25): the previous pink-tinted
         strip competed with the hero CTA for first-glance attention.
         Path-choosing belongs AFTER commitment, not before it. We keep
         the link for hiring-side visitors who land cold, but render it
         as a subtle, near-invisible signpost rather than a banner. */}
      <Link
        href="/for-companies"
        style={{
          display: 'block',
          background: 'transparent',
          padding: '8px 24px',
          textAlign: 'center',
          fontFamily: "'Figtree', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: '#8B8AA0',
          textDecoration: 'none',
          letterSpacing: '0.005em',
        }}
      >
        Hiring, not job-seeking?{' '}
        <span
          style={{
            color: '#5A5A6E',
            fontWeight: 600,
            borderBottom: '1px solid rgba(139,138,160,0.3)',
            paddingBottom: 1,
          }}
        >
          Different door &rarr;
        </span>
      </Link>

      {/* ──────────────── HERO ─────────────────
         The hook + positioning + primary CTA. Homepage flow is now:
           Hero → DashboardPreview → ScenesBoard → PricingTransparency
           → AuthorityStrip → Closing.
         AuthorityStrip is the LAST trust signal before the closing
         CTA. Per Stephanie's instinct and the Cialdini authority-
         at-decision-moment research: founder credentials fire hardest
         right before a buy decision, not as the third thing visitors
         see. Hero already names her ("Built by Stephanie Murray, a
         20-year recruiter") so the credential is established for cold
         traffic; the photo + full credentials become the closing
         argument. */}
      <HomepageHero />

      {/* ──────────────── DASHBOARD PREVIEW ─────────────────
         Conversion lever — shows visitors WHAT they get when they sign in.
         Animates on scroll-into-view. Pattern from Linear/Cal.com/Stripe
         Atlas. Behavioral basis: goal gradient (Hull 1932) + endowed
         progress (Nunes & Drèze 2006). */}
      <DashboardPreview />

      {/* ──────────────── EMOTIONAL BRIDGE ─────────────────
         One line of acknowledgment between system sections (5/25 audit).
         The page was reading as competent but cold. A skeptical job
         seeker needs ONE moment where the founder shows up and says
         "I see you" before they trust the system. Italic, lavender,
         restrained — not a heading, just a voice. */}
      <section
        style={{
          background: '#FAF8F3',
          padding: 'clamp(24px, 4vw, 48px) 24px',
        }}
      >
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 'clamp(18px, 2.2vw, 24px)',
            lineHeight: 1.45,
            color: '#5A4FE0',
            textAlign: 'center',
            maxWidth: 720,
            margin: '0 auto',
            letterSpacing: '-0.005em',
          }}
        >
          You are not bad at this. The system is broken. Here is the one I
          would build for you.
        </p>
      </section>

      {/* ──────────────── FREE TOOLS ENTRY ─────────────────
         Reframed 5/25: scenes are positioned as a piece of the system
         sampled one at a time, not as a separate offering. Resolves the
         contradiction with the hero's "all in one place" promise. */}
      <StartHereBoard hideHero />

      {/* ──────────────── PROOF BRIDGE ─────────────────
         Single honest, sourceable line that frames Pricing below. The
         site had no proof anywhere; this is the one verifiable result
         we have (Brightside Health scale, Transform Award 2025). It
         sits BEFORE pricing so $14.99 is read against a real outcome,
         not against "free." */}
      <section
        style={{
          background: '#FAF8F3',
          padding: 'clamp(16px, 3vw, 32px) 24px clamp(8px, 2vw, 16px)',
        }}
      >
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(14px, 1.55vw, 16px)',
            lineHeight: 1.55,
            color: '#5A5A6E',
            textAlign: 'center',
            maxWidth: 640,
            margin: '0 auto',
            letterSpacing: '0.005em',
          }}
        >
          The playbook that scaled one healthcare team from 19 to 1,500
          clinicians. The same system, opened up for you.
        </p>
      </section>

      {/* ──────────────── PRICING TRANSPARENCY ─────────────────
         Kills the "wait, what's this cost" objection before the closing
         forces it. Three tiers: free forever, $14.99/mo Pro tools,
         coached platform coming soon. */}
      <PricingTransparency />

      {/* ──────────────── AUTHORITY ─────────────────
         Trust signal positioned as the closing argument, just before
         the final Go Pro CTA. Source credibility (Hovland & Weiss 1951)
         fires hardest at the decision moment, not 4 sections before
         it. Stephanie's photo + Brightside + Transform Award land
         right when the visitor is deciding whether to convert. */}
      <AuthorityStrip />

      {/* ─────────────── CLOSING ───────────────
         Rule 5: one CTA per moment. Light-mode redesign: warm cream
         background, indigo→coral gradient still carries the resolution
         line, single Go Pro CTA, secondary path as text link. */}
      <section
        style={{
          background: '#FAF8F3',
          padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              letterSpacing: '-0.028em',
              lineHeight: 1.04,
              color: '#1A1A22',
              margin: 0,
            }}
          >
            The room you were never in.
          </h2>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              letterSpacing: '-0.028em',
              lineHeight: 1.04,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}
          >
            Open for the first time.
          </h2>

          {/* CTA realigned 5/25 per audit: the entire page sells the
              Stage 1 free conversion (sign in, get your dashboard). The
              closing was breaking that funnel by jumping to "Go Pro"
              before the visitor had seen the product. Pro sells itself
              once they are in the dashboard. */}
          <div style={{ marginTop: 44 }}>
            <Link
              href="/sign-in"
              className="hero-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '17px 40px',
                borderRadius: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '17px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                boxShadow: '0 16px 40px rgba(108,71,255,0.28)',
              }}
            >
              Start your search, free →
            </Link>
          </div>

          <div style={{ marginTop: 14 }}>
            <span
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: '#8B8AA0',
              }}
            >
              No credit card. Magic-link sign-in. About 30 seconds.
            </span>
          </div>

          <div style={{ marginTop: 18 }}>
            <Link
              href="/membership"
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: 13.5,
                color: '#8B8AA0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(139,138,160,0.35)',
                paddingBottom: 1,
              }}
            >
              Or see what is inside Pro →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
