'use client'

import { useEffect, useState } from 'react'

interface UsageState {
  tier: 'anon' | 'email' | 'pro'
  remaining: number
  limit: number
  blocked: boolean
}

/**
 * Small lavender pill that tells the visitor where they are in their
 * quota. Reads /api/usage on mount and after every successful tool run
 * (callers can fire the `hp:usage-changed` window event).
 *
 * Hidden for Pro members — they don't need to think about it.
 */
export function UsagePill() {
  const [state, setState] = useState<UsageState | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/usage', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as UsageState
        if (!cancelled) setState(data)
      } catch {
        // Silent — pill just stays hidden.
      }
    }
    load()
    const onChange = () => load()
    window.addEventListener('hp:usage-changed', onChange)
    return () => {
      cancelled = true
      window.removeEventListener('hp:usage-changed', onChange)
    }
  }, [])

  if (!state) return null
  if (state.tier === 'pro') return null

  const tone = state.blocked ? 'blocked' : state.remaining <= 1 ? 'warn' : 'ambient'
  const colorMap = {
    ambient: { fg: '#A78BFA', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.30)' },
    warn: { fg: '#FF4F6A', bg: 'rgba(255,79,106,0.10)', border: 'rgba(255,79,106,0.30)' },
    blocked: { fg: '#FF4F6A', bg: 'rgba(255,79,106,0.18)', border: 'rgba(255,79,106,0.45)' },
  } as const
  const c = colorMap[tone]

  const label =
    state.tier === 'anon'
      ? `${state.remaining} of ${state.limit} free insights left today`
      : `${state.remaining} of ${state.limit} unlocked insights left`

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.fg,
        borderRadius: 100,
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: '11px',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
      }}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: c.fg,
          opacity: 0.9,
        }}
      />
      {label}
    </div>
  )
}
