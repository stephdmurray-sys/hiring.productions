'use client'

import { useState, useEffect } from 'react'
import { Lock, Sparkles, ArrowRight, Mail } from 'lucide-react'
import { isMember, activateMembership } from '@/lib/membership'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'

interface ToolGateProps {
  toolName: string
  toolDescription: string
  children: React.ReactNode
  isFree?: boolean
}

export function ToolGate({
  toolName,
  toolDescription,
  children,
  isFree = false,
}: ToolGateProps) {
  const [isClient, setIsClient] = useState(false)
  const [isMemberUser, setIsMemberUser] = useState(false)
  const [restoreEmail, setRestoreEmail] = useState('')

  useEffect(() => {
    setIsClient(true)
    setIsMemberUser(isMember())
  }, [])

  if (!isClient) {
    return <>{children}</>
  }

  // Show content if member or free tool
  if (isMemberUser || isFree) {
    return <>{children}</>
  }

  const handleRestore = () => {
    if (restoreEmail.trim()) {
      activateMembership(restoreEmail)
      window.location.reload()
    }
  }

  return (
    <div style={{ background: '#0F0F12', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Top Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '80px 40px 40px',
        }}
      >
        {/* Lock Icon Circle */}
        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            background: 'rgba(108,71,255,0.15)',
            border: '1px solid rgba(108,71,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock size={32} color="#6C47FF" />
        </div>

        {/* Pro Tool Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            background: 'rgba(255,79,106,0.15)',
            color: '#FF4F6A',
            marginBottom: '20px',
          }}
        >
          PRO TOOL
        </div>

        {/* Tool Name */}
        <h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            margin: 0,
            marginTop: '20px',
            marginBottom: '16px',
          }}
        >
          {toolName}
        </h1>

        {/* Tool Description */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '17px',
            fontWeight: 400,
            color: '#8B8AA0',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {toolDescription}
        </p>
      </div>

      {/* Blurred Preview */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '40px auto',
          paddingX: '40px',
        }}
      >
        <div
          style={{
            filter: 'blur(8px)',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.4,
            maxHeight: '300px',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>

      {/* Paywall Card */}
      <div
        style={{
          position: 'relative',
          margin: '-60px auto 0',
          maxWidth: '480px',
          background: '#1A1A22',
          border: '1.5px solid rgba(108,71,255,0.4)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 24px 80px rgba(108,71,255,0.2)',
          zIndex: 10,
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        {/* Member Benefit */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            color: '#A78BFA',
          }}
        >
          <Sparkles size={18} color="#A78BFA" />
          Members get all 20 inside looks, unlimited.
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '24px',
            fontWeight: 900,
            color: '#F2F0FF',
            margin: '16px 0 0 0',
            letterSpacing: '-0.01em',
          }}
        >
          Unlock this inside look for $20/year.
        </h2>

        {/* Features */}
        <div style={{ marginTop: '20px' }}>
          {[
            'All 20 inside looks — both sides of hiring',
            'Unlimited runs, no limits ever',
            'Access delivered instantly to your email',
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: '#F2F0FF',
                marginTop: idx === 0 ? 0 : '12px',
              }}
            >
              <span
                style={{
                  color: '#6C47FF',
                  fontSize: '16px',
                  fontWeight: 700,
                  marginTop: '-2px',
                }}
              >
                ✓
              </span>
              {feature}
            </div>
          ))}
        </div>

        {/* Primary Button */}
        <StripeCheckoutButton
          style={{
            width: '100%',
            marginTop: '12px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: 'none',
            borderRadius: '10px',
            padding: '15px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '16px',
            fontWeight: 800,
            color: 'white',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          Get Full Access — $20/year
        </StripeCheckoutButton>

        {/* Divider */}
        <div
          style={{
            margin: '20px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        />

        {/* Restore Access */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#8B8AA0',
            textAlign: 'center',
          }}
        >
          Already a member?
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              marginTop: '12px',
            }}
          >
            <input
              type="email"
              value={restoreEmail}
              onChange={(e) => setRestoreEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleRestore()}
              placeholder="your@email.com"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                color: '#F2F0FF',
                boxSizing: 'border-box',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <button
              onClick={handleRestore}
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(108,71,255,0.5)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '12px',
                fontWeight: 700,
                color: '#A78BFA',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(108,71,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Restore
            </button>
          </div>
        </div>

        {/* Fine Print */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12px',
            fontWeight: 400,
            color: '#8B8AA0',
            textAlign: 'center',
            margin: '16px 0 0 0',
          }}
        >
          Billed annually. Cancel anytime. Free inside looks stay free forever.
        </p>
      </div>
    </div>
  )
}
