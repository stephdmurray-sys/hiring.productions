'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isMember } from '@/lib/membership'

interface StripeCheckoutButtonProps {
  children: React.ReactNode
  style?: React.CSSProperties
  /** Label to show when the user is already a member */
  memberLabel?: string
  /** Where to send members. Default: /tools */
  memberHref?: string
}

/**
 * Smart checkout button:
 * - If the user is NOT a member → starts Stripe Checkout
 * - If they ARE already a member → renders a link to their tools instead
 *   (avoids double-charging existing members who click "Go Pro" out of habit)
 */
export function StripeCheckoutButton({
  children,
  style,
  memberLabel = 'Open your tools →',
  memberHref = '/tools',
}: StripeCheckoutButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [memberActive, setMemberActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    setMemberActive(isMember())
  }, [])

  const handleCheckout = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/stripe/checkout', { method: 'POST' })
      if (!response.ok) throw new Error('Checkout unavailable')
      const data = await response.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch {
      setError('Payment unavailable right now — try again shortly.')
      setLoading(false)
    }
  }

  // While we don't know yet (SSR / first render), show the default button.
  // This prevents flicker — it'll swap to member state on the next render if needed.
  if (mounted && memberActive) {
    return (
      <div>
        <Link
          href={memberHref}
          style={{
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: 'none',
            color: '#fff',
            borderRadius: '10px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            cursor: 'pointer',
            width: '100%',
            display: 'block',
            textAlign: 'center',
            textDecoration: 'none',
            ...style,
          }}
        >
          {memberLabel}
        </Link>
        <p
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#5EE6A8',
            fontFamily: "'Figtree', sans-serif",
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          You’re already a member.
        </p>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          background: loading
            ? 'rgba(108,71,255,0.5)'
            : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          border: 'none',
          color: '#fff',
          borderRadius: '10px',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          cursor: loading ? 'not-allowed' : 'pointer',
          width: '100%',
          display: 'block',
          opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.2s',
          ...style,
        }}
      >
        {loading ? 'Redirecting to checkout...' : children}
      </button>
      {error && (
        <p
          style={{
            marginTop: '8px',
            fontSize: '13px',
            color: '#FF4F6A',
            fontFamily: "'Figtree', sans-serif",
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
