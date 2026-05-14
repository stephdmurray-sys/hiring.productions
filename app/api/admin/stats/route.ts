import { NextRequest, NextResponse } from 'next/server'
import { readEvents, type LoggedEvent } from '@/lib/event-log'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * /api/admin/stats — the CTO observability endpoint.
 *
 * Returns a JSON snapshot of the funnel and operational state over a
 * configurable time window. Designed to be hit either from a browser
 * (the /admin HTML page) or directly via curl with an ADMIN_TOKEN.
 *
 * Auth model:
 *   - Pass `?token=<ADMIN_TOKEN>` in the URL, OR
 *   - Pass `Authorization: Bearer <ADMIN_TOKEN>` header
 *   - 401s with no body if token is wrong or missing — don't leak a
 *     "yes there's an admin endpoint" signal to scrapers
 *
 * Usage:
 *   curl "https://hiring.productions/api/admin/stats?token=XXX&days=7"
 *
 * Response shape — all counts are inclusive of the time window:
 *   {
 *     periodDays: 7,
 *     eventCount: 423,
 *     byType: { tool_run_success: 120, tool_run_blocked: 12, ... },
 *     byDay: { "2026-05-13": { tool_run_success: 18, ... }, ... },
 *     byTool: { "recruiter-search-rank": 42, "linkedin-rewrite": 18, ... },
 *     byBlockReason: { "anon-limit": 8, "pro-required": 3, "budget-anon": 1 },
 *     funnel: {
 *       toolAttempts, toolSuccesses, toolBlocked,
 *       emailCaptures, checkoutStarts, paymentSuccesses,
 *       conversionRates: { ... derived percentages ... }
 *     },
 *     costCents, costDollars,
 *     recentEvents: [last 20 events for spot-checking],
 *   }
 */
export async function GET(request: NextRequest) {
  // ----- Auth ---------------------------------------------------------------
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    // No token configured = endpoint is fully off. Fail closed so a
    // forgotten env var doesn't expose stats publicly.
    return new NextResponse(null, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const provided =
    searchParams.get('token') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    ''

  if (provided !== expected) {
    return new NextResponse(null, { status: 401 })
  }

  // ----- Time window --------------------------------------------------------
  const daysParam = parseInt(searchParams.get('days') ?? '7', 10)
  const periodDays = Number.isFinite(daysParam) && daysParam > 0 && daysParam <= 30 ? daysParam : 7
  const now = Date.now()
  const since = now - periodDays * 24 * 60 * 60 * 1000

  // ----- Read + aggregate ---------------------------------------------------
  const events = await readEvents(since, now)

  const byType: Record<string, number> = {}
  const byDay: Record<string, Record<string, number>> = {}
  const byTool: Record<string, number> = {}
  const byBlockReason: Record<string, number> = {}
  let costCents = 0

  for (const e of events) {
    byType[e.type] = (byType[e.type] ?? 0) + 1

    const dayKey = new Date(e.ts).toISOString().slice(0, 10)
    byDay[dayKey] = byDay[dayKey] ?? {}
    byDay[dayKey][e.type] = (byDay[dayKey][e.type] ?? 0) + 1

    if (e.toolId) {
      byTool[e.toolId] = (byTool[e.toolId] ?? 0) + 1
    }

    if (e.type === 'tool_run_blocked' && e.reason) {
      byBlockReason[e.reason] = (byBlockReason[e.reason] ?? 0) + 1
    }

    if (typeof e.costCents === 'number') {
      costCents += e.costCents
    }
  }

  // ----- Funnel -------------------------------------------------------------
  const toolAttempts = (byType.tool_run_success ?? 0) + (byType.tool_run_blocked ?? 0)
  const toolSuccesses = byType.tool_run_success ?? 0
  const toolBlocked = byType.tool_run_blocked ?? 0
  const emailCaptures = byType.email_capture ?? 0
  const checkoutStarts = byType.checkout_start ?? 0
  const paymentSuccesses = byType.payment_success ?? 0

  const pct = (numerator: number, denominator: number) =>
    denominator === 0 ? null : Math.round((numerator / denominator) * 1000) / 10

  // Last 20 events for spot-checking what's actually happening recently —
  // makes it easy to verify wiring without having to inspect Vercel logs.
  const recentEvents = events.slice(-20).reverse()

  return NextResponse.json({
    periodDays,
    generatedAt: new Date(now).toISOString(),
    eventCount: events.length,
    byType,
    byDay,
    byTool,
    byBlockReason,
    funnel: {
      toolAttempts,
      toolSuccesses,
      toolBlocked,
      emailCaptures,
      checkoutStarts,
      paymentSuccesses,
      conversionRates: {
        attemptToSuccess: pct(toolSuccesses, toolAttempts),
        toolToEmail: pct(emailCaptures, toolAttempts),
        toolToCheckout: pct(checkoutStarts, toolAttempts),
        checkoutToPayment: pct(paymentSuccesses, checkoutStarts),
        toolToPayment: pct(paymentSuccesses, toolAttempts),
      },
    },
    costCents,
    costDollars: (costCents / 100).toFixed(2),
    recentEvents: recentEvents.map((e: LoggedEvent) => ({
      type: e.type,
      ts: new Date(e.ts).toISOString(),
      toolId: e.toolId,
      tier: e.tier,
      reason: e.reason,
      source: e.source,
      costCents: e.costCents,
    })),
  })
}
