import { NextRequest, NextResponse } from 'next/server'
import { readEvents, type LoggedEvent } from '@/lib/event-log'
import {
  getRecentDailySpend,
  DAILY_BUDGET_CENTS,
  ANON_CUTOFF_CENTS,
  dayKey,
} from '@/lib/usage'

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
  const pageViewsByPath: Record<string, number> = {}
  // anonId set per day so we can compute distinct uniques per day.
  const uniquesByDay: Record<string, Set<string>> = {}
  // Distinct anonIds across the whole window for the headline visitor count.
  const uniqueVisitors = new Set<string>()
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

    // Page-view aggregation. The meta dict on the event carries path +
    // anonId for page_view events specifically (see /api/track/view).
    if (e.type === 'page_view' && e.meta) {
      const path = (e.meta.path as string) ?? '(unknown)'
      pageViewsByPath[path] = (pageViewsByPath[path] ?? 0) + 1

      const anonId = (e.meta.anonId as string) ?? ''
      if (anonId) {
        uniqueVisitors.add(anonId)
        uniquesByDay[dayKey] = uniquesByDay[dayKey] ?? new Set<string>()
        uniquesByDay[dayKey].add(anonId)
      }
    }
  }

  // Daily unique visitor counts — Set → number for JSON-safe output.
  const uniquesByDayCounts: Record<string, number> = {}
  for (const [day, set] of Object.entries(uniquesByDay)) {
    uniquesByDayCounts[day] = set.size
  }

  // Today / yesterday cuts for the headline cards.
  const today = new Date(now).toISOString().slice(0, 10)
  const yesterday = new Date(now - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  // Top 15 pages by view count — caps the table so high-traffic sites
  // don't blow up the JSON response.
  const topPages = Object.entries(pageViewsByPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)

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

  const pageViewCount = byType.page_view ?? 0

  // Authoritative daily spend pulled from lib/usage.ts's Redis counters.
  // This is the SAME number the $5/day budget guardrail reads — it's the
  // truth source for "did we hit the cap." `spend:` keys carry a 48-hour
  // TTL so historical days zero out; we only get today + yesterday
  // reliably. The event-log-derived costCents earlier in the response
  // may diverge from this if any tool runs happened before the event
  // log was wired correctly (early days of /admin shipping).
  const recentSpend = await getRecentDailySpend(Math.max(2, periodDays))
  const todayKey = dayKey()
  const yesterdayKey = dayKey(new Date(now - 24 * 60 * 60 * 1000))
  const todaySpendCents = recentSpend[todayKey] ?? 0
  const yesterdaySpendCents = recentSpend[yesterdayKey] ?? 0

  return NextResponse.json({
    periodDays,
    generatedAt: new Date(now).toISOString(),
    eventCount: events.length,
    // Visitor summary — the headline metric. uniqueVisitors is the
    // distinct anon-cookie count across the whole window; today/yesterday
    // are the deltas the user actually wants to see at a glance.
    visitors: {
      uniqueInWindow: uniqueVisitors.size,
      today: uniquesByDayCounts[today] ?? 0,
      yesterday: uniquesByDayCounts[yesterday] ?? 0,
      pageViews: pageViewCount,
      // Pages-per-visitor: floor-divide signal of engagement depth.
      pagesPerVisitor:
        uniqueVisitors.size > 0
          ? Math.round((pageViewCount / uniqueVisitors.size) * 10) / 10
          : null,
    },
    uniquesByDay: uniquesByDayCounts,
    topPages,
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
    // Authoritative daily spend telemetry — this is what the budget
    // guardrail reads, so it's the number to watch for cap warnings.
    spend: {
      today: {
        cents: todaySpendCents,
        dollars: (todaySpendCents / 100).toFixed(2),
      },
      yesterday: {
        cents: yesterdaySpendCents,
        dollars: (yesterdaySpendCents / 100).toFixed(2),
      },
      dailyBudgetCents: DAILY_BUDGET_CENTS,
      dailyBudgetDollars: (DAILY_BUDGET_CENTS / 100).toFixed(2),
      anonCutoffCents: ANON_CUTOFF_CENTS,
      anonCutoffDollars: (ANON_CUTOFF_CENTS / 100).toFixed(2),
      // 0-100 — UI uses this to render a progress bar / warning.
      pctOfBudget: Math.round((todaySpendCents / DAILY_BUDGET_CENTS) * 100),
      // Reading recent N days for spend trend (most will be 0 due to TTL).
      byDay: recentSpend,
    },
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
