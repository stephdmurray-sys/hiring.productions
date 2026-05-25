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
      <Link
        href="/for-companies"
        style={{
          display: 'block',
          background: '#FFF4F1',
          borderBottom: '1px solid rgba(255,79,106,0.18)',
          padding: '12px 24px',
          textAlign: 'center',
          fontFamily: "'Figtree', sans-serif",
          fontSize: 13.5,
          fontWeight: 600,
          color: '#5A5A6E',
          textDecoration: 'none',
          letterSpacing: '0.005em',
        }}
      >
        Hiring, not job-seeking?{' '}
        <span
          style={{
            color: '#C73E5A',
            fontWeight: 800,
            borderBottom: '1px solid rgba(199,62,90,0.45)',
            paddingBottom: 1,
          }}
        >
          Different door &rarr;
        </span>
      </Link>

      {/* ──────────────── HERO ─────────────────
         The hook + positioning + primary CTA. Extracted from
         StartHereBoard so the homepage flow is now:
           Hero → DashboardPreview → AuthorityStrip → ScenesBoard →
           PricingTransparency → Closing.
         This narrative order — established by user audit of the original
         layout — matches how a skeptical job seeker actually decides:
           hook → product proof → who built it → free entry → cost →
           ask. */}
      <HomepageHero />

      {/* ──────────────── DASHBOARD PREVIEW ─────────────────
         Conversion lever — shows visitors WHAT they get when they sign in.
         Animates on scroll-into-view. Pattern from Linear/Cal.com/Stripe
         Atlas. Behavioral basis: goal gradient (Hull 1932) + endowed
         progress (Nunes & Drèze 2006). */}
      <DashboardPreview />

      {/* ──────────────── AUTHORITY ─────────────────
         Trust signal for skeptical job seekers. Source credibility
         (Hovland & Weiss 1951). Real recruiter, real credentials, photo,
         no fake metrics. */}
      <AuthorityStrip />

      {/* ──────────────── FREE TOOLS ENTRY ─────────────────
         "Or skip the system, try a free tool right now." Demoted to
         secondary surface because the dashboard preview above shows
         visitors the full product first. Lower-pressure framing reduces
         decision paralysis (Schwartz 2004). */}
      <StartHereBoard hideHero />

      {/* ──────────────── PRICING TRANSPARENCY ─────────────────
         Kills the "wait, what's this cost" objection before the closing
         forces it. Three tiers: free forever, $14.99/mo Pro tools,
         coached platform coming soon. */}
      <PricingTransparency />

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

          <div style={{ marginTop: 44 }}>
            <Link
              href="/membership"
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
              Go Pro
            </Link>
          </div>

          <div style={{ marginTop: 20 }}>
            <Link
              href="/tools"
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
              Browse tools →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
