'use client'

import { Lock } from 'lucide-react'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'

/**
 * Conversion card shown to non-Pro users at the bottom of a redacted
 * recruiter-search-rank result. Pairs the inline [LOCKED:...] pills
 * (which mark individual sentences) with a single full-width call to
 * action that names exactly what's behind the paywall and triggers
 * Stripe checkout.
 *
 * Designed to be the visual peak of the result page — bigger than the
 * existing ProUpsellPanel, less of a generic "see Pro" link and more
 * of a "this is the missing half of YOUR diagnosis."
 */
export function UnlockPrescriptionCard() {
  return (
    <section
      style={{
        marginTop: 32,
        background: '#14141B',
        border: '1px solid rgba(108,71,255,0.35)',
        borderRadius: 20,
        padding: 'clamp(28px, 5vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(108,71,255,0.18)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          right: -70,
          width: 320,
          height: 320,
          background:
            'radial-gradient(circle, rgba(108,71,255,0.22) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -110,
          left: -80,
          width: 320,
          height: 320,
          background:
            'radial-gradient(circle, rgba(255,79,106,0.14) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative' }}>
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 11px',
            background: 'rgba(167,139,250,0.10)',
            border: '1px solid rgba(167,139,250,0.30)',
            borderRadius: 100,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '10.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 16,
          }}
        >
          <Lock size={11} strokeWidth={2.5} />
          The other half of your result
        </div>

        <h3
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(22px, 3.2vw, 30px)',
            letterSpacing: '-0.015em',
            color: '#F2F0FF',
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          You can see <em style={{ fontStyle: 'normal', color: '#A78BFA' }}>what&apos;s</em>{' '}
          broken. Members see <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>exactly how to fix it.</em>
        </h3>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14.5px',
            color: '#9D9CB3',
            lineHeight: 1.65,
            marginBottom: 22,
            maxWidth: 560,
          }}
        >
          Free runs show the diagnosis. The exact word-for-word rewrites — the lines
          to delete, the headline to replace, the skill entries to add — are part of
          your Pro membership.
        </p>

        {/* What's locked, line-listed */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 26px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: 10,
          }}
        >
          {[
            'The 4 other boolean strings recruiters run',
            'The exact line to replace in your headline',
            'The exact line to replace in your About',
            'The skill entries to add — verbatim',
            'The ranking math for every move',
            'Plus every other Recruiter Insight — both sides of the table',
          ].map((line) => (
            <li
              key={line}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13.5px',
                color: '#F2F0FF',
                lineHeight: 1.5,
              }}
            >
              <Lock
                size={12}
                strokeWidth={2.5}
                color="#A78BFA"
                style={{ marginTop: 3, flexShrink: 0 }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Stripe checkout button (auto-renders as "Open your tools" for
            existing members — so a Pro user who hits this card by mistake
            doesn't get double-charged). */}
        <StripeCheckoutButton
          memberLabel="You already have access. Open your tools →"
          memberHref="/tools/recruiter-search-rank"
          style={{
            padding: '15px 24px',
            fontSize: '15px',
            letterSpacing: '0.01em',
          }}
        >
          Unlock the rewrites →
        </StripeCheckoutButton>

        <div
          style={{
            marginTop: 12,
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12.5px',
            color: '#8B8AA0',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Less than what Jobscan charges for one day. Cancel anytime.
        </div>
      </div>
    </section>
  )
}
