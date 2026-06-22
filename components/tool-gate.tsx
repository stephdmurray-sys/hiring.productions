'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { isMember, activateMembership } from '@/lib/membership'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { CATALOG, FLAGSHIP_PRO } from '@/lib/tools-catalog'

interface ToolGateProps {
  toolName: string
  toolDescription: string
  children: React.ReactNode
  isFree?: boolean
  /**
   * Drives which paywall the visitor sees when not a Pro subscriber:
   *
   *   'candidate' — the $14.99/mo Pro tier paywall (default). Candidate
   *                 tools convert via Pro subscription.
   *   'hiring'    — a consulting CTA panel routing to /consulting.
   *                 Hiring teams are consulting clients, not Pro
   *                 subscribers, so they never see the $14.99/mo
   *                 pricing per Stephanie's 5/26 positioning rule.
   *
   * Pro subscribers (isMember) still see the tool render regardless of
   * category, so a candidate with Pro retains bilateral access to
   * hiring-team tools as the wedge intends.
   */
  category?: 'candidate' | 'hiring'
}

// Sourced from the catalog so the paywall stays in sync as flagship Pro tools
// are added or rearranged — no hardcoded list to maintain in two places.
const PRO_TOOLS = FLAGSHIP_PRO.map((name) => {
  const tool = CATALOG.find((t) => t.name === name)
  return {
    name,
    sub: tool?.subtitle ?? '',
    desc: tool?.desc ?? '',
  }
})

export function ToolGate({
  toolName,
  toolDescription,
  children,
  isFree = false,
  category = 'candidate',
}: ToolGateProps) {
  const [isClient, setIsClient] = useState(false)
  const [isMemberUser, setIsMemberUser] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState('')
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [restoreError, setRestoreError] = useState('')

  useEffect(() => {
    setIsClient(true)
    setIsMemberUser(isMember())
  }, [])

  if (!isClient) return <>{children}</>
  if (isMemberUser || isFree) return <>{children}</>

  // Hiring-team tools: render the consulting gate instead of the Pro
  // paywall. Hiring teams are consulting clients, not subscribers.
  if (category === 'hiring') {
    return (
      <HiringTeamGate toolName={toolName} toolDescription={toolDescription} />
    )
  }

  const handleRestore = async () => {
    const email = restoreEmail.trim()
    if (!email) return

    setRestoreLoading(true)
    setRestoreError('')

    try {
      const r = await fetch(
        `/api/stripe/verify-customer?email=${encodeURIComponent(email)}`,
      )
      const data = await r.json()

      if (data.active === true) {
        activateMembership(email)
        window.location.reload()
      } else {
        setRestoreError(
          'No active Pro account found for this email. Use the same email you paid with at checkout.',
        )
      }
    } catch {
      setRestoreError('Couldn’t verify right now. Please try again in a moment.')
    } finally {
      setRestoreLoading(false)
    }
  }

  return (
    <div
      style={{
        background: '#FAF8F3',
        padding: '24px 24px 80px',
        position: 'relative',
      }}
    >
      {/* Soft top glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 600px 400px at 50% 0%, rgba(108,71,255,0.10) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '560px',
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid rgba(108,71,255,0.30)',
          borderRadius: '20px',
          padding: '40px 36px',
          boxShadow: '0 30px 100px rgba(108,71,255,0.18)',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(167,139,250,0.10)',
            border: '1px solid rgba(167,139,250,0.25)',
            color: '#A78BFA',
            padding: '5px 12px',
            borderRadius: '100px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '10.5px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <Lock size={11} strokeWidth={2.5} />
          Pro · $14.99/mo or $99/yr
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(26px, 3vw, 32px)',
            letterSpacing: '-0.02em',
            color: '#1A1A22',
            lineHeight: 1.12,
            margin: 0,
          }}
        >
          Unlock the whole production.
        </h2>

        {/* Price callout — OUR price is the hero */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            margin: '18px 0 8px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 5vw, 56px)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            $14.99
          </span>
          <span
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '17px',
              color: '#5A5A6E',
            }}
          >
            / month. Or $99/year.
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            color: '#5A5A6E',
            lineHeight: 1.55,
            margin: '0 0 28px',
          }}
        >
          Less than one hour with a career coach. Jobscan charges $49.95/month for one tool.
        </p>

        {/* What you get */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PRO_TOOLS.map((tool, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                padding: '14px 16px',
                background: 'rgba(108,71,255,0.06)',
                border: '1px solid rgba(108,71,255,0.14)',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '11px',
                  marginTop: '2px',
                }}
              >
                {idx + 1}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '15px',
                    color: '#1A1A22',
                    marginBottom: '2px',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {tool.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    color: '#A78BFA',
                    letterSpacing: '0.005em',
                    marginBottom: '6px',
                  }}
                >
                  {tool.sub}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 400,
                    fontSize: '13.5px',
                    color: '#8B8AA0',
                    lineHeight: 1.55,
                  }}
                >
                  {tool.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <StripeCheckoutButton
          style={{
            width: '100%',
            marginTop: '28px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: 'none',
            borderRadius: '12px',
            padding: '17px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '0.005em',
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 12px 30px rgba(108,71,255,0.30)',
          }}
        >
          Go Pro
        </StripeCheckoutButton>

        {/* Reassurance line */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '12.5px',
            color: '#8B8AA0',
            textAlign: 'center',
            marginTop: '12px',
            marginBottom: 0,
          }}
        >
          Cancel anytime. Free tools stay free forever.
        </p>

        {/* Divider */}
        <div
          style={{
            margin: '26px 0 18px',
            borderTop: '1px solid #ECECF2',
          }}
        />

        {/* Restore */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              color: '#A78BFA',
              marginBottom: '10px',
            }}
          >
            Already Pro?
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="email"
              value={restoreEmail}
              onChange={(e) => setRestoreEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRestore()}
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: '8px',
                padding: '10px 12px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                color: '#1A1A22',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
            />
            <button
              onClick={handleRestore}
              disabled={restoreLoading || !restoreEmail.trim()}
              style={{
                background: 'transparent',
                border: '1px solid rgba(167,139,250,0.40)',
                borderRadius: '8px',
                padding: '9px 16px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                color: '#A78BFA',
                cursor: restoreLoading || !restoreEmail.trim() ? 'not-allowed' : 'pointer',
                opacity: restoreLoading || !restoreEmail.trim() ? 0.6 : 1,
                whiteSpace: 'nowrap',
                transition: 'background 0.15s, opacity 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!restoreLoading) e.currentTarget.style.background = 'rgba(108,71,255,0.10)'
              }}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {restoreLoading ? 'Checking...' : 'Restore'}
            </button>
          </div>
          {restoreError && (
            <div
              style={{
                marginTop: 10,
                padding: '8px 12px',
                background: 'rgba(255,79,106,0.08)',
                border: '1px solid rgba(255,79,106,0.25)',
                borderRadius: 8,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: '12px',
                color: '#FF8FA3',
                lineHeight: 1.5,
                textAlign: 'left',
              }}
            >
              {restoreError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * HiringTeamGate — the consulting CTA panel shown when a non-Pro
 * visitor lands on a hiring-team tool. Replaces the $14.99/mo Pro
 * paywall for this category because hiring teams are consulting
 * clients, not subscribers.
 *
 * Routes to /consulting#contact which opens the inquiry modal on
 * mount, so the visitor is one click from the form Stephanie reads.
 */
function HiringTeamGate({
  toolName,
  toolDescription,
}: {
  toolName: string
  toolDescription: string
}) {
  return (
    <div
      style={{
        background: '#FAF8F3',
        padding: '24px 24px 80px',
        position: 'relative',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 600px 400px at 50% 0%, rgba(255,79,106,0.10) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '560px',
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid rgba(255,79,106,0.30)',
          borderRadius: '20px',
          padding: '40px 36px',
          boxShadow: '0 30px 100px rgba(255,79,106,0.14)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,79,106,0.10)',
            border: '1px solid rgba(255,79,106,0.30)',
            color: '#C73E5A',
            padding: '5px 12px',
            borderRadius: '100px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '10.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <Lock size={11} strokeWidth={2.5} />
          For hiring teams · Consulting engagement
        </div>

        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(26px, 3vw, 32px)',
            letterSpacing: '-0.02em',
            color: '#1A1A22',
            lineHeight: 1.12,
            margin: '0 0 14px',
          }}
        >
          {toolName} is part of the consulting engagement.
        </h2>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            color: '#5A5A6E',
            lineHeight: 1.6,
            margin: '0 0 14px',
          }}
        >
          {toolDescription}
        </p>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            color: '#5A5A6E',
            lineHeight: 1.6,
            margin: '0 0 28px',
          }}
        >
          Stephanie uses tools like this one inside her recruitment
          marketing consulting work. To put them to work on your hiring,
          tell her about your team and what is not working. She reads
          every inquiry personally and replies directly.
        </p>

        <Link
          href="/consulting#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FF4F6A, #6C47FF)',
            color: '#FFFFFF',
            padding: '17px',
            borderRadius: 12,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '0.005em',
            textDecoration: 'none',
            boxShadow: '0 12px 30px rgba(255,79,106,0.25)',
          }}
        >
          Tell Stephanie about your hiring →
        </Link>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '12.5px',
            color: '#8B8AA0',
            textAlign: 'center',
            marginTop: 14,
            marginBottom: 0,
          }}
        >
          Direct reply from Stephanie. Usually within 48 hours.
        </p>
      </div>
    </div>
  )
}
