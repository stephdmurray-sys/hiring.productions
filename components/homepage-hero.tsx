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

        {/* H1 — production metaphor used as STRUCTURE not decoration.
            "Produced" implies a managed, professional system covering
            every part. "Your entire job search" sets the scope before
            the metaphor. Two short sentences land in 5 seconds. */}
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
          Your entire job search.
          <br />
          Produced.
        </h1>

        {/* Subhead 1 — the unified promise. Memorable, parallel with
            the H1's brevity. Tells the visitor the production
            metaphor isn't decoration; it's the organizing principle.
            Bolded indigo to act as the anchor between H1 and the
            action list below. */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(18px, 2vw, 22px)',
            lineHeight: 1.45,
            color: '#5A4FE0',
            margin: '24px auto 0',
            letterSpacing: '0.005em',
          }}
        >
          Every scene, covered.
        </p>

        {/* Subhead 2 — the action list. Concrete deliverables grouped
            into pairs that map to journey phases:
              Line 1: resume + LinkedIn  → "Get Seen"
              Line 2: outreach + scripts → "Get In"
              Line 3: interviews + offers → "Get the Offer"
            Each is an action verb the visitor recognizes, then a
            unifying "All in one place" closes the loop. */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(16px, 1.85vw, 19px)',
            lineHeight: 1.55,
            color: '#1A1A22',
            maxWidth: 700,
            margin: '20px auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span>Fix your resume. Upgrade your LinkedIn.</span>
          <span>Find the right people. Know what to say.</span>
          <span>
            Turn conversations into interviews, and offers into better ones.
          </span>
          <span
            style={{
              color: '#5A4FE0',
              fontWeight: 700,
              marginTop: 10,
            }}
          >
            All in one place.
          </span>
        </div>

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
            Start your search, free →
          </Link>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#5A5A6E',
            }}
          >
            Get your resume, outreach, and next steps in minutes. No credit
            card.
          </div>
          <style>{`.hp-hero-cta:hover { transform: translateY(-2px); }`}</style>
        </div>
      </div>
    </section>
  )
}
