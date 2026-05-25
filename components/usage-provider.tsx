'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { X, Lock } from 'lucide-react'
import { EmailUnlockModal } from './email-unlock-modal'
import { UsagePill } from './usage-pill'
import { isMember, getMemberEmail } from '@/lib/membership'
import { analytics } from '@/lib/analytics'

/** Paths where the usage pill should show. */
function isToolPath(pathname: string): boolean {
  return pathname === '/resume' || pathname.startsWith('/tools/')
}

/**
 * Mount-once provider that wires the rate-limit UX to the rest of the
 * site without forcing every tool page to import a helper.
 *
 * What it does:
 *   - Patches window.fetch to watch for /api/tool responses.
 *   - On 429 with reason=anon-limit   → opens the EmailUnlockModal.
 *   - On 429 with reason=email-limit  → opens the Pro paywall modal.
 *   - On 429 with reason=budget-*     → opens the "we're at capacity" modal.
 *   - On 402 with reason=pro-required → opens the "this is a Pro tool" modal.
 *   - On 200                          → fires hp:usage-changed for the pill.
 *
 * Page code keeps doing `fetch('/api/tool', ...)` exactly as before.
 */
type ModalKind = null | 'email' | 'paywall' | 'capacity' | 'pro-tool'

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

    // Tracks whether we've already attempted a Pro-cookie auto-heal in
    // this page session. Prevents an infinite retry loop if the heal
    // legitimately fails (e.g. localStorage says "member" but Stripe
    // returns active: false).
    let healAttempted = false

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

      // Fire tool_run_attempt BEFORE the fetch resolves — that's the
      // moment of intent. Whether it succeeds or hits a gate is captured
      // by separate events on the response.
      if (isToolCall && typeof init?.body === 'string') {
        try {
          const parsed = JSON.parse(init.body) as { toolId?: string }
          if (parsed.toolId) analytics.toolRunAttempt(parsed.toolId)
        } catch {
          // ignore
        }
      }

      let res = await original(input, init)

      if (!isToolCall) return res

      // ----- Auto-heal Pro cookie ------------------------------------
      // A user can be Pro on the client (localStorage flag set by
      // activateMembership) but anon on the server (no hp_pro cookie).
      // This happens when:
      //   1. They paid before the cookie-planting code shipped
      //   2. They're on a different browser than the one Stripe
      //      redirected back to
      //   3. The cookie expired or was cleared
      //
      // The auto-heal: when a Pro-required 402 fires AND localStorage
      // says they're a member, silently call verify-customer to
      // re-plant the cookie, then retry the original tool call. User
      // never sees the paywall — the tool just takes 1-2 extra seconds
      // the first time.
      if (
        res.status === 402 &&
        !healAttempted &&
        typeof window !== 'undefined' &&
        isMember()
      ) {
        healAttempted = true
        const email = getMemberEmail()
        if (email) {
          try {
            const verifyRes = await original(
              `/api/stripe/verify-customer?email=${encodeURIComponent(email)}`,
              { method: 'GET' },
            )
            const verifyData = (await verifyRes.json().catch(() => ({}))) as {
              active?: boolean
            }
            if (verifyData.active) {
              // Cookie should now be planted — retry the original
              // request. The original caller is still awaiting, so we
              // swap in the retry response and they get a clean 200.
              res = await original(input, init)
            }
          } catch {
            // Verify failed — fall through to standard 402 handling.
          }
        }
      }
      // ---------------------------------------------------------------

      // Clone so we can read the body without consuming it for the caller.
      try {
        const clone = res.clone()
        // 402 = Pro-only tool hit by an anon/email user.
        // 429 = rate-limited (anon out, email out, or budget cap).
        // Both surface a modal so the tool page never has to render
        // the raw error.
        if (res.status === 429 || res.status === 402) {
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

          // Analytics: every gate firing is a funnel event.
          if (toolId && (reason === 'anon-limit' || reason === 'email-limit' || reason === 'pro-required' || reason === 'budget-anon' || reason === 'budget-global' || reason === 'pro-limit')) {
            analytics.toolRunBlocked(toolId, reason)
          }

          if (reason === 'anon-limit') {
            setModal('email')
            analytics.emailModalOpen(`${reason}:${toolId || 'unknown'}`)
          } else if (reason === 'email-limit') {
            setModal('paywall')
            analytics.paywallModalOpen('email-limit')
          } else if (reason === 'budget-anon' || reason === 'budget-global') {
            setModal('capacity')
          } else if (reason === 'pro-required') {
            setModal('pro-tool')
            analytics.paywallModalOpen('pro-required')
          }
        } else if (res.status === 200) {
          window.dispatchEvent(new CustomEvent('hp:usage-changed'))
          // Analytics: successful tool run. Best-effort toolId parse + tier
          // is read off the response so we know whether it was anon / email
          // / pro who ran it.
          try {
            const successClone = res.clone()
            const data = (await successClone.json().catch(() => ({}))) as {
              tier?: 'anon' | 'email' | 'pro'
            }
            const toolId = (() => {
              if (typeof init?.body === 'string') {
                try {
                  return (JSON.parse(init.body) as { toolId?: string })?.toolId ?? ''
                } catch {
                  return ''
                }
              }
              return ''
            })()
            if (toolId) {
              analytics.toolRunSuccess(toolId, data.tier ?? 'anon')
            }
          } catch {
            // Silent — analytics shouldn't break the success path.
          }
        }
      } catch {
        // Don't let our shim ever break a real call.
      }

      return res
    }

    window.fetch = patched

    // Listen for the pill's click → open the matching modal proactively.
    // Lets users re-summon the upgrade flow without burning another tool call.
    const onRequestModal = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { kind?: ModalKind; source?: string }
        | undefined
      if (!detail?.kind) return
      if (detail.source) setSource(detail.source)
      setModal(detail.kind)
    }
    window.addEventListener('hp:request-modal', onRequestModal)

    return () => {
      window.fetch = original
      window.removeEventListener('hp:request-modal', onRequestModal)
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
        body="Unlocks both sides — every candidate Recruiter Insight AND every hiring-team tool, unlimited, $14.99/month or $99/year. Less than Jobscan charges for one day."
        primary={{ label: 'Get Full Access', href: '/pricing' }}
      />
      <SimpleModal
        open={modal === 'capacity'}
        onClose={() => setModal(null)}
        eyebrow="AT CAPACITY"
        title="We're at today's capacity."
        body="The free tier is capped so it stays free. It resets at midnight UTC. Members keep going without the cap."
        primary={{ label: 'See membership', href: '/pricing' }}
      />
      <SimpleModal
        open={modal === 'pro-tool'}
        onClose={() => setModal(null)}
        eyebrow="ACT TWO — RECRUITER INSIGHTS"
        title="This one's a Recruiter Insight."
        body="Unlocks both sides of the table — every candidate Recruiter Insight AND every hiring-team tool, for $14.99/mo or $99/yr. Less than Jobscan charges for one day."
        primary={{ label: 'Get Full Access', href: '/pricing' }}
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
          background: '#FFFFFF',
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
            color: '#1A1A22',
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
          onClick={() => {
            analytics.paywallPricingClick(eyebrow || 'modal')
            onClose()
          }}
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
