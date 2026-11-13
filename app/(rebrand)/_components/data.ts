/**
 * Page-ready views of the evidence layer, shared by the homepage, the hubs,
 * the guide and the review pages.
 */
import ats from '@/lib/scorecards/ats-small-teams.json'
import { cheapestCover, forgetCost, formatCount, resumeTools, type ToolEvidence } from '@/lib/evidence'
import { PUBLISHER_DOMAINS } from './logo'
import type { BoardRow } from './scoreboard'
import type { CalcTool } from './cost-calculator'

export function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function listNames(names: string[]) {
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export function seekerRow(t: ToolEvidence): BoardRow {
  return {
    id: t.id,
    name: t.name,
    domain: t.domain,
    href: `/reviews/${t.id}`,
    score: t.overall ?? 0,
    lists: t.counted.map((a) => ({ publication: a.list.publication, domain: PUBLISHER_DOMAINS[a.list.publication] ?? '' })),
    sub: t.userScore !== null ? `${t.userScore.toFixed(1)} from ${formatCount(t.citableReviews)} users` : 'Too few reviews to score users',
    trap: !!t.yearCost?.renewsEvery4Weeks,
  }
}

/** Every scored resume tool, best first. */
export function seekerBoard(): BoardRow[] {
  return resumeTools()
    .all.filter((t) => t.overall !== null)
    .sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0))
    .map(seekerRow)
}

const TEAM: Record<string, string> = { small: 'Small teams', growing: 'Growing teams', scaling: 'Scaling teams' }

export type AtsTool = (typeof ats.tools)[number]

export function atsGrowth(t: AtsTool): number | null {
  const g = t.momentum?.annualized_growth
  return typeof g === 'number' ? g : null
}

/** Applicant tracking systems, best first. Fast-growing review counts are called out. */
export function hiringBoard(limit?: number): BoardRow[] {
  const rows = [...ats.tools]
    .sort((a, b) => b.overall_draft - a.overall_draft)
    .map((t) => {
      const g = atsGrowth(t)
      const sub =
        g !== null && g >= 0.3
          ? `${TEAM[t.segment] ?? 'All teams'} · reviews up ${Math.round(g * 100)}% in a year`
          : `${TEAM[t.segment] ?? 'All teams'} · users ${t.computed.user_score.toFixed(1)}`
      return {
        id: t.name,
        name: t.name,
        domain: t.domain,
        href: '/guides/best-ats-for-small-teams',
        score: t.overall_draft,
        sub,
      } satisfies BoardRow
    })
  return limit ? rows.slice(0, limit) : rows
}

export const atsAsOf = ats.as_of
export const atsTools = ats.tools

/** The calculator's rows: cheapest cost and forget-to-cancel cost for 1 to 12 months. */
export function calcTools(): CalcTool[] {
  return resumeTools()
    .all.filter((t) => cheapestCover(t.id, 30) !== null)
    .map((t) => ({
      id: t.id,
      name: t.name,
      domain: t.domain,
      costs: Array.from({ length: 12 }, (_, i) => cheapestCover(t.id, (i + 1) * 30)!.total),
      forgets: Array.from({ length: 12 }, (_, i) => forgetCost(t.id, (i + 1) * 30)!),
      renews4w: !!t.yearCost?.renewsEvery4Weeks,
      approx: !!t.yearCost?.approx,
      free: t.freeTier.replace(/^Yes, /, ''),
    }))
}
