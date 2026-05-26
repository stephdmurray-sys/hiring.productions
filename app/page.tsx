'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HomepageHero } from '@/components/homepage-hero'
import { StuckMoments } from '@/components/stuck-moments'
import { DashboardPreview } from '@/components/dashboard-preview'
import { ProofMoment } from '@/components/proof-moment'
import { AuthorityStrip } from '@/components/authority-strip'
import { StartHereBoard } from '@/components/start-here-board'
import { PricingTransparency } from '@/components/pricing-transparency'

/**
 * Homepage — pain-anchor restructure (5/25 strategist critique).
 *
 * Strategic shift: the page used to lead with "all-in-one job search
 * tools." It now leads with "fix what is not working in your job search,
 * starting right now." Cold visitors arrive in a stuck moment; the
 * homepage now meets them in that moment first, then shows the system
 * that fixes it.
 *
 * Section flow:
 *   1. Audience pre-router (quiet)
 *   2. Hero — pain anchor + tension line + "Get your job search plan"
 *   3. Stuck Moments — five scannable pain prompts, one shared CTA
 *   4. Dashboard Preview — "Here is what happens when you start"
 *   5. Proof Moment — LinkedIn before/after, the "oh, it actually works"
 *   6. Emotional bridge — one line of acknowledgment in Stephanie's voice
 *   7. StartHereBoard — scene cards as deeper exploration
 *   8. Proof bridge — Brightside scale framing line
 *   9. Pricing Transparency — outcome-first tier copy
 *  10. Authority Strip — founder credibility at decision moment
 *  11. Closing — final ask, same CTA as hero (funnel bookend)
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
         Quieted 5/25: subtle signpost for hiring-side visitors who
         landed in the wrong room. Does not compete with hero. */}
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
         Pain anchor + tension + "Get your job search plan." Production
         metaphor stays in the brand voice elsewhere; it does not gate
         the first-impression moment. */}
      <HomepageHero />

      {/* ──────────────── STUCK MOMENTS ─────────────────
         The search-intent mirror. Five stuck moments, scannable rows,
         shared CTA. Visitor finds themselves in the list before the
         system asks them to trust it. */}
      <StuckMoments />

      {/* ──────────────── DASHBOARD PREVIEW ─────────────────
         "Here is what happens when you start." The dashboard mock IS
         the visualization of the 6-step what-happens-after-signup flow
         the strategist asked for. Six outcome-named checkboxes, real
         dashboard chrome. */}
      <DashboardPreview />

      {/* ──────────────── PROOF MOMENT ─────────────────
         LinkedIn before/after. One artifact the visitor can read and
         immediately understand the difference between what they have
         now and what the system gives them. The "oh, it actually
         works" beat the page was missing. */}
      <ProofMoment />

      {/* ──────────────── EMOTIONAL BRIDGE ─────────────────
         One line in Stephanie's voice. The page is system-heavy; this
         is the moment the founder shows up. */}
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

      {/* ──────────────── DEEPER EXPLORATION ─────────────────
         Scene cards as a piece of the system, sampled one at a time.
         For visitors who want to taste before they sign up. */}
      <StartHereBoard hideHero />

      {/* ──────────────── PROOF BRIDGE ─────────────────
         Brightside scale (19 → 1,500). Sourceable. Frames the price
         against a real outcome, not against "free." */}
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
         Outcome-first tier copy. Anti-competitor reframe. */}
      <PricingTransparency />

      {/* ──────────────── AUTHORITY ─────────────────
         Founder credibility at decision moment (Hovland & Weiss 1951). */}
      <AuthorityStrip />

      {/* ─────────────── CLOSING ───────────────
         Final ask. Same CTA as the hero — funnel bookend. The metaphor
         lives here: "the room you were never in" earns its placement
         as the resolution line. */}
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
              Get your job search plan →
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
              Free. No credit card. About 2 minutes.
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
