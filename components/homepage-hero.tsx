'use client'

import Link from 'next/link'

/**
 * Homepage hero — the dedicated hook/positioning/primary-CTA block.
 *
 * Extracted from StartHereBoard so the homepage flow becomes:
 *   1. HomepageHero (hook + positioning + primary CTA)
 *   2. DashboardPreview ("here's what you get")
 *   3. AuthorityStrip ("here's who built it")
 *   4. StartHereBoard hideHero ("or skip ahead — try a free tool")
 *   5. PricingTransparency
 *   6. Closing
 *
 * Behavioral grounding (per PLATFORM-VISION.md):
 *   - Identity-protective cognition bypass: "Pull back the curtain"
 *     reads as voyeurism, not feedback — defenses don't fire
 *   - Concrete positioning: "networking, interviewing, negotiating"
 *     beats abstract "career coaching"
 *   - Single primary CTA: skeptical job seekers respond to clarity, not
 *     option overload (Schwartz 2004, paradox of choice)
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
        {/* Brand-promise eyebrow. The metaphor stays in the brand but
            is no longer the H1, so visitors who don't know the category
            aren't asked to decode poetry first. */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#5A4FE0',
            marginBottom: 18,
          }}
        >
          Pull back the curtain on hiring
        </div>

        {/* H1 — plain-English category statement. Job seeker (audience),
            run your search (outcome verb), recruiter would (mechanism +
            differentiator). 5-second test friendly. */}
        <h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 6.5vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1A1A22',
            margin: 0,
          }}
        >
          Run your job search the way a recruiter would.
        </h1>

        {/* Subhead 1 — category clarity. What it IS (software), who it's
            FOR (stalled, laid off, pivoting), who BUILT it (recruiter). */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(17px, 2vw, 21px)',
            lineHeight: 1.5,
            color: '#1A1A22',
            maxWidth: 720,
            margin: '24px auto 0',
          }}
        >
          Job-search software for the moment you&apos;re stalled, laid off, or
          pivoting. Built by Stephanie Murray, a 20-year recruiter.
        </p>

        {/* Subhead 2 — mechanism + outcome, brand-voiced. The "scene with
            you" line moved here as supporting color (not the primary
            positioning). */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.55,
            color: '#5A5A6E',
            maxWidth: 640,
            margin: '14px auto 0',
          }}
        >
          A recruiter in the scene with you. Networking, interviewing,
          negotiating. From silence to signed.
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
            Start your search — free →
          </Link>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#5A5A6E',
            }}
          >
            No credit card. Five free tools. Magic-link sign-in.
          </div>
          <style>{`.hp-hero-cta:hover { transform: translateY(-2px); }`}</style>
        </div>
      </div>
    </section>
  )
}
