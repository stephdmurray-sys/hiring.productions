'use client'

import { track } from '@vercel/analytics'

/**
 * Typed analytics events for the hiring.productions funnel.
 *
 * Vercel Analytics' track() takes (eventName, properties). This module
 * gives us a single place to:
 *   - Define every event name as a typed constant
 *   - Document what each event means and when it fires
 *   - Strip out properties that are too high-cardinality (raw tool IDs
 *     are fine; raw user emails would be a privacy leak)
 *
 * View events at:
 *   https://vercel.com/murray-media/hiring-productions/analytics
 *   → "Events" tab → filter by event name
 *
 * Funnel diagrams Vercel can produce from these:
 *
 *   FREE → EMAIL:
 *     pageview → tool_run_attempt → tool_run_blocked(anon-limit)
 *       → email_modal_open → email_capture_submit
 *
 *   EMAIL → PRO:
 *     tool_run_attempt → tool_run_blocked(email-limit)
 *       → paywall_modal_open → paywall_pricing_click → checkout_start
 *
 *   PRO-ONLY TOOL TRY:
 *     pageview(/tools/<pro>) → tool_run_attempt
 *       → tool_run_blocked(pro-required) → paywall_modal_open → ...
 *
 *   REPVERA HANDOFF:
 *     tool_run_success → repvera_click
 */

type ToolRunReason =
  | 'anon-limit'
  | 'email-limit'
  | 'pro-required'
  | 'budget-anon'
  | 'budget-global'
  | 'pro-limit'

type EventName =
  | 'tool_run_attempt'
  | 'tool_run_success'
  | 'tool_run_blocked'
  | 'email_modal_open'
  | 'email_capture_submit'
  | 'paywall_modal_open'
  | 'paywall_pricing_click'
  | 'checkout_start'
  | 'repvera_click'
  | 'consulting_click'

/**
 * Tiny wrapper so we get typed event names + structured props. The
 * underlying Vercel `track()` is safe to call before init (events are
 * queued) and is a no-op in environments where Analytics isn't loaded.
 */
function emit(event: EventName, props?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  try {
    track(event, props)
  } catch {
    // Don't let analytics fail break the calling code path.
  }
}

// ----- Public API ----------------------------------------------------

export const analytics = {
  /** User clicked submit on a tool's primary CTA. Fires regardless of outcome. */
  toolRunAttempt: (toolId: string) => emit('tool_run_attempt', { toolId }),

  /** /api/tool returned 200 with a real result. */
  toolRunSuccess: (toolId: string, tier: 'anon' | 'email' | 'pro') =>
    emit('tool_run_success', { toolId, tier }),

  /** /api/tool returned 402 or 429. `reason` is the specific gate fired. */
  toolRunBlocked: (toolId: string, reason: ToolRunReason) =>
    emit('tool_run_blocked', { toolId, reason }),

  /** Email-unlock modal opened (user about to be offered the 8-more-insights deal). */
  emailModalOpen: (source: string) => emit('email_modal_open', { source }),

  /** Email-unlock modal form submitted successfully. */
  emailCaptureSubmit: (source: string) => emit('email_capture_submit', { source }),

  /**
   * Pro paywall modal opened — either email tier exhausted OR anon hit a
   * Pro-only tool OR site-wide budget cap.
   */
  paywallModalOpen: (reason: ToolRunReason | 'pill-click' | 'unknown') =>
    emit('paywall_modal_open', { reason }),

  /** Clicked the "Get Full Access" CTA on a paywall modal. */
  paywallPricingClick: (from: string) => emit('paywall_pricing_click', { from }),

  /** Stripe Checkout button clicked anywhere on the site. */
  checkoutStart: (source: string) => emit('checkout_start', { source }),

  /** Any RepVera CTA clicked (footer, BilateralCallout, RepVeraMoment, ProUpsellPanel). */
  repveraClick: (source: string) => emit('repvera_click', { source }),

  /** Clicked any consulting CTA — the secondary handoff for hiring-side. */
  consultingClick: (source: string) => emit('consulting_click', { source }),
}
