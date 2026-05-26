'use client'

import Link from 'next/link'

/**
 * Homepage hero — pain-anchor rewrite (5/25 strategist critique).
 *
 * Previous hero ("Your entire job search. Produced.") was the brand
 * positioning, but cold visitors weren't connecting it to their own
 * stuck moment. The critic's diagnosis: the page explains the product
 * instead of speaking to current frustration. Strategic shift:
 *
 *   From: "All-in-one job search tools"
 *   To:   "Fix what is not working in your job search, starting right now."
 *
 * Hero now leads with:
 *   1. A pain anchor in the eyebrow ("if your job search isn't working")
 *   2. A direct H1 that names the visitor's actual experience
 *      ("Stop guessing what to do next")
 *   3. The product as a system — who to reach, what to fix, what to do
 *   4. A tension line that contrasts current behavior vs. new path
 *   5. A CTA that promises immediate value ("Get your job search plan")
 *
 * The production metaphor still owns the brand voice (scene cards,
 * closing) but does not gate the first-impression moment. Brand voice
 * rule: "if it doesn't fit naturally, drop it" — and on a cold-traffic
 * hero, metaphor is friction the visitor pays for before comprehension.
 */
export function HomepageHero() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#FAF8F3',
        color: '#1A1A22',
        padding: 'clamp(72px, 10vw, 128px) 24px clamp(48px, 7vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient indigo radial — single restrained glow, on-brand */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 760,
          height: 760,
          background:
            'radial-gradient(circle, rgba(108,71,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 920,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Pain-anchor eyebrow. Bumped from 12px to 15px (5/26) so it
            actually carries visual weight as the pain hook. The eyebrow
            is doing critical work (it names the visitor's current
            state before the H1 even lands), and 12px was rendering as
            fine-print rather than a load-bearing line. */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#C73E5A',
            marginBottom: 22,
          }}
        >
          If your job search isn&apos;t working
        </div>

        {/* H1 — direct, second-person, present-tense. No metaphor in the
            way of the promise. "Stop guessing" names the current state.
            "What to do next" is the visitor's actual question. */}
        <h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 6.5vw, 72px)',
            lineHeight: 1.04,
            letterSpacing: '-0.022em',
            color: '#1A1A22',
            margin: 0,
          }}
        >
          Stop guessing
          <br />
          what to do next.
        </h1>

        {/* Subhead — the system, in plain language. Four concrete
            things the product does. "Why it all matters" is the new
            focal emphasis (5/26): the recruiter-side context is the
            actual moat (most career sites prescribe without
            explaining; we explain). "Then we help you do it" stays
            in body color so it does not compete with the indigo
            emphasis on "why it all matters" — one focal point per
            paragraph per CLAUDE.md design rule 1.

            Honesty pass (5/26): dropped "who to reach out to" because
            no candidate-side outreach-finder tool ships yet. Replaced
            with "what's breaking your search" which routes to the
            diagnostic tool that does ship. */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(17px, 1.95vw, 21px)',
            lineHeight: 1.55,
            color: '#1A1A22',
            maxWidth: 720,
            margin: '28px auto 0',
            letterSpacing: '-0.003em',
          }}
        >
          We show you what is breaking your search, what to fix, what to do
          next, and{' '}
          <span style={{ fontWeight: 800, color: '#5A4FE0' }}>
            why it all matters
          </span>
          . Then we help you do it.
        </p>

        <div
          style={{
            marginTop: 'clamp(32px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <Link
            href="/sign-in"
            className="hp-hero-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '17px 36px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#FFFFFF',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: '0.005em',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 16px 40px rgba(108,71,255,0.22)',
              transition: 'transform 0.2s ease',
            }}
          >
            Get your job search plan →
          </Link>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#5A5A6E',
            }}
          >
            Free. No credit card. About 2 minutes.
          </div>
          <style>{`.hp-hero-cta:hover { transform: translateY(-2px); }`}</style>
        </div>
      </div>
    </section>
  )
}
