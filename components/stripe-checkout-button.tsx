'use client'

import { useState } from 'react'

interface StripeCheckoutButtonProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function StripeCheckoutButton({ children, style }: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        <p style={{
          marginTop: '8px',
          fontSize: '13px',
          color: '#FF4F6A',
          fontFamily: "'Figtree', sans-serif",
          textAlign: 'center',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}
