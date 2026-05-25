'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { StartHereBoard } from '@/components/start-here-board'
import { QuickHeadlineRead } from '@/components/quick-headline-read'

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
    <main style={{ background: '#0F0F12', color: '#F2F0FF' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');
        .recruiter-insight-card:hover {
          border-color: rgba(108,71,255,0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(108,71,255,0.12);
        }
        .hero-btn:hover {
          transform: translateY(-2px);
        }
        .result-mock-card:hover {
          border-color: rgba(108,71,255,0.35) !important;
        }
      `}</style>
      <Navigation variant="dark" />

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
          background: '#14141B',
          borderBottom: '1px solid rgba(255,79,106,0.18)',
          padding: '12px 24px',
          textAlign: 'center',
          fontFamily: "'Figtree', sans-serif",
          fontSize: 13.5,
          fontWeight: 600,
          color: '#C9C7DA',
          textDecoration: 'none',
          letterSpacing: '0.005em',
        }}
      >
        Hiring a role, not searching for one?{' '}
        <span
          style={{
            color: '#FF8FA3',
            fontWeight: 800,
            borderBottom: '1px solid rgba(255,143,163,0.45)',
            paddingBottom: 1,
          }}
        >
          The hiring-team page is here &rarr;
        </span>
      </Link>

      {/* ──────────────── START HERE — QUESTION BOARD ─────────────────
         Question-led entry. The primary homepage funnel for candidates.
      */}
      <StartHereBoard />

      {/* ──────────────── LIVE QUICK READ ─────────────────
         Paste-your-headline live widget. The visitor's first interaction
         with the site is using the product itself, not reading about it.
         Cal.com / Anthropic / Cursor-style engagement pattern. Uses
         /api/quick-read (Haiku, ~$0.002 per run, capped by global $5/day
         budget ceiling).
      */}
      <QuickHeadlineRead />

      {/* ─────────────── CLOSING — the ask, with price visible ───────────────
         Rule 5: one CTA per moment. The page never names what Pro costs
         above the fold; the closing carries the price so visitors leave
         with the number, not just the metaphor. Secondary path is a
         text link so it doesn't compete as a button. */}
      <section
        style={{
          background: '#0F0F12',
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
              color: '#F2F0FF',
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

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '17px',
              color: '#C9C7DA',
              marginTop: 28,
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Every Recruiter Insight. Both sides of the table. Less than one hour with a coach.
          </p>

          <div
            style={{
              marginTop: 36,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 5vw, 56px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#F2F0FF',
            }}
          >
            $14.99
            <span
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                color: '#9D9CB3',
                letterSpacing: '0',
                marginLeft: 8,
              }}
            >
              / month · or $99 / year
            </span>
          </div>

          <div style={{ marginTop: 32 }}>
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
              Or browse every tool first →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
