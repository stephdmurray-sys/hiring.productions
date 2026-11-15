import { cheapestCover, forgetCost, latestCheck, plansFor, resumeTools, type ToolEvidence } from '@/lib/evidence'

/**
 * Pricing traps (Nov 15, 2026): how each resume tool bills, built only from
 * the plans on file (resume-guide.json, read from each pricing page) and
 * re-checked monthly with the rankings. A tool gets its own trap page when
 * the data shows the pattern that catches people: a cheap trial that rolls
 * into billing every 4 weeks. Every other tool still appears on the main
 * page with what 3 months costs and what the first year costs if you forget
 * to cancel. Nothing here is typed by hand except the framing.
 */

export interface TrapFacts {
  t: ToolEvidence
  trial: { price: number; days: number } | null
  renewal: { price: number; days: number } | null
  renews4w: boolean
  /** e.g. "free download is .txt only", from the pricing line on file. */
  freeCatch: string | null
  threeMonths: number | null
  firstYearIfForgotten: number | null
  rows: { months: number; pay: number | null; forget: number | null }[]
  cancelVideo: { youtubeId: string; title: string; channel: string } | null
  checked: string
}

export const money = (n: number) => (n % 1 === 0 ? `$${n.toLocaleString('en-US')}` : `$${n.toFixed(2)}`)

export function trapFacts(t: ToolEvidence): TrapFacts {
  const plans = plansFor(t.id)
  const trialPlan = plans.find((p) => p.trial)
  const renewPlan = plans.find((p) => !p.trial && !p.once && p.days === 28)
  const freeCatch =
    t.pricingLine
      .split('·')
      .map((x) => x.trim())
      .find((x) => x.toLowerCase().startsWith('free download')) ?? null
  const v = t.videos.find((x) => x.title.toLowerCase().includes('cancel'))
  return {
    t,
    trial: trialPlan ? { price: trialPlan.price, days: trialPlan.days } : null,
    renewal: renewPlan ? { price: renewPlan.price, days: renewPlan.days } : null,
    renews4w: !!t.yearCost?.renewsEvery4Weeks,
    freeCatch,
    threeMonths: cheapestCover(t.id, 90)?.total ?? null,
    firstYearIfForgotten: forgetCost(t.id, 90),
    rows: [1, 3, 6, 12].map((m) => ({ months: m, pay: cheapestCover(t.id, m * 30)?.total ?? null, forget: forgetCost(t.id, m * 30) })),
    cancelVideo: v ? { youtubeId: v.youtubeId, title: v.title, channel: v.channel ?? '' } : null,
    checked: latestCheck(),
  }
}

/** Tools with their own trap page: a trial that rolls into billing every 4 weeks. */
export function trapTools(): ToolEvidence[] {
  return resumeTools().all.filter((t) => t.yearCost?.renewsEvery4Weeks && plansFor(t.id).some((p) => p.trial))
}

export const trapHref = (id: string) => `/pricing-traps/${id}`

/** Every resume tool, by what the first year costs if you pay for 3 months and forget to cancel. */
export function forgetTable(): TrapFacts[] {
  return resumeTools()
    .all.map((t) => trapFacts(t))
    .filter((f) => f.threeMonths !== null)
    .sort((a, b) => (b.firstYearIfForgotten ?? 0) - (a.firstYearIfForgotten ?? 0))
}

/** The free versions worth using instead: rated tools with a free version you can keep using. */
export function freeAlternatives(t: ToolEvidence): ToolEvidence[] {
  return resumeTools()
    .all.filter((x) => x.id !== t.id && x.freeLevel === 'full' && x.overall !== null)
    .sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0))
}

/** "Yes. The free plan gives you X. Pro is $60 a year." becomes "The free plan gives you X." */
export function freeOnly(answer: string): string {
  const s = answer
    .replace(/^Yes[.,]\s*(with\s+)?/i, '')
    .split(/(?<=\.)\s+/)
    .filter((x) => !x.includes('$'))
    .join(' ')
  return s.charAt(0).toUpperCase() + s.slice(1)
}
