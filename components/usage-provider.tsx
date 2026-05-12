'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X, Lock } from 'lucide-react'
import { EmailUnlockModal } from './email-unlock-modal'
import { UsagePill } from './usage-pill'

/** Paths where the usage pill should show. */
function isToolPath(pathname: string): boolean {
  return (
    pathname === '/resume' ||
    pathname.startsWith('/tools/') ||
    pathname === '/jd-seo-score'
  )
}

/**
 * Mount-once provider that wires the rate-limit UX to the rest of the
 * site without forcing every tool page to import a helper.
 *
 * What it does:
 *   - Patches window.fetch to watch for /api/tool responses.
 *   - On 429 with reason=anon-limit  → opens the EmailUnlockModal.
 *   - On 429 with reason=email-limit → opens the Pro paywall modal.
 *   - On 429 with reason=budget-*    → opens the "we're at capacity" modal.
 *   - On 200                         → fires hp:usage-changed for the pill.
 *
 * Page code keeps doing `fetch('/api/tool', ...)` exactly as before.
 */
type ModalKind = null | 'email' | 'paywall' | 'capacity'

interface UsageProviderProps {
  children?: React.ReactNode
}

export function UsageProvider({ children }: UsageProviderProps) {
  const [modal, setModal] = useState<ModalKind>(null)
  const [source, setSource] = useState('unknown')
  const pathname = usePathname()
  const showPill = pathname ? isToolPath(pathname) : false

  useEffect(() => {
    if (typeof window === 'undefined') return
    const original = window.fetch.bind(window)

    const patched: typeof window.fetch = async (input, init) => {
      const url =
        typeof input === 'string'
          ? input
          : input instanceof URL
            ? input.toString()
            : input instanceof Request
              ? input.url
              : ''
      const isToolCall = url.includes('/api/tool') && !url.includes('/api/tools-pdf')
      const res = await original(input, init)

      if (!isToolCall) return res

      // Clone so we can read the body without consuming it for the caller.
      try {
        const clone = res.clone()
        if (res.status === 429) {
          const data = await clone.json().catch(() => ({}))
          const reason = (data as { error?: string })?.error ?? ''
          const toolId = (() => {
            // Best-effort: parse from request body for telemetry.
            if (typeof init?.body === 'string') {
              try {
                return (JSON.parse(init.body) as { toolId?: string })?.toolId ?? ''
              } catch {
                return ''
              }
            }
            return ''
          })()
          setSource(`${reason}:${toolId || 'unknown'}`)
          if (reason === 'anon-limit') setModal('email')
          else if (reason === 'email-limit') setModal('paywall')
          else if (reason === 'budget-anon' || reason === 'budget-global') setModal('capacity')
          else if (reason === 'pro-required') setModal('paywall')
        } else if (res.status === 200) {
          window.dispatchEvent(new CustomEvent('hp:usage-changed'))
        }
      } catch {
        // Don't let our shim ever break a real call.
      }

      return res
    }

    window.fetch = patched
    return () => {
      window.fetch = original
    }
  }, [])

  return (
    <>
      {children}

      {showPill && (
        <div
          style={{
            position: 'fixed',
            bottom: 18,
            right: 18,
            zIndex: 400,
            pointerEvents: 'auto',
          }}
        >
          <UsagePill />
        </div>
      )}

      <EmailUnlockModal
        open={modal === 'email'}
        source={source}
        onClose={() => setModal(null)}
        onUnlocked={() => {
          setModal(null)
          window.dispatchEvent(new CustomEvent('hp:usage-changed'))
        }}
      />
      <SimpleModal
        open={modal === 'paywall'}
        onClose={() => setModal(null)}
        eyebrow="ACT TWO — RECRUITER INSIGHTS"
        title="You've used every free insight."
        body="The whole production — every Recruiter Insight, unlimited — is $20 for the year. Less than Jobscan charges for one day."
        primary={{ label: 'Get Full Access — $20/year', href: '/pricing' }}
      />
      <SimpleModal
        open={modal === 'capacity'}
        onClose={() => setModal(null)}
        eyebrow="AT CAPACITY"
        title="We're at today's capacity."
        body="The free tier is capped so it stays free. It resets at midnight UTC. Members keep going without the cap."
        primary={{ label: 'See membership', href: '/pricing' }}
      />
    </>
  )
}

function SimpleModal({
  open,
  onClose,
  eyebrow,
  title,
  body,
  primary,
}: {
  open: boolean
  onClose: () => void
  eyebrow: string
  title: string
  body: string
  primary: { label: string; href: string }
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#14141B',
          border: '1px solid rgba(108,71,255,0.30)',
          borderRadius: 20,
          padding: 32,
          maxWidth: 460,
          width: '100%',
          position: 'relative',
          boxShadow: '0 30px 100px rgba(108,71,255,0.25)',
        }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'transparent',
            border: 'none',
            color: '#8B8AA0',
            cursor: 'pointer',
            padding: 6,
            borderRadius: 6,
            display: 'flex',
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            marginBottom: 18,
          }}
        >
          <Lock size={18} color="#FFFFFF" strokeWidth={2.2} />
        </div>

        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: '26px',
            color: '#F2F0FF',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 10px',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '15px',
            color: '#9D9CB3',
            lineHeight: 1.55,
            margin: '0 0 22px',
          }}
        >
          {body}
        </p>

        <Link
          href={primary.href}
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            color: '#FFFFFF',
            borderRadius: 12,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '14.5px',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            boxShadow: '0 18px 40px rgba(108,71,255,0.30)',
          }}
        >
          {primary.label} →
        </Link>
      </div>
    </div>
  )
}
