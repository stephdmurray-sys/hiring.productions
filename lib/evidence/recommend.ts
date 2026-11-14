/**
 * The recommendation engine: a visitor's problem and limits in, one pick out.
 *
 * The rules live in recommend.json and are the public promise. In short:
 * diagnose first; "no tool" is a real answer; limits rule tools out but
 * never re-score them; unknown is not yes; one pick and one alternative;
 * only scored tools can be the pick; Stephanie's picks sit beside the
 * answer, labeled; nothing about commissions is an input; the same
 * situation always gets the same answer.
 */
import ats from '@/lib/scorecards/ats-small-teams.json'
import data from './recommend.json'
import {
  atsScores,
  cheapestCover,
  forgetCost,
  hiringPick,
  latestCheck,
  resumeTools,
  rising,
  risingPick,
  type AtsTool,
  type ToolEvidence,
} from './index'

export const framework = data

type SeekerMust = 'free-usable' | 'no-4-week' | 'tracker'
type HiringMust = 'published-price' | 'free-start'

export interface SeekerAsk {
  side: 'seekers'
  problem: string
  /** How long the search is expected to take. */
  months: number
  /** Most they'll spend on the whole search, in USD. null means no limit. */
  budget: number | null
  must: SeekerMust[]
}

export interface HiringAsk {
  side: 'hiring'
  problem: string
  hiresPerYear: number
  /** People who will log in. */
  seats: number
  /** Most they'll spend a year, in USD. null means no limit. */
  budget: number | null
  must: HiringMust[]
}

export type Ask = SeekerAsk | HiringAsk

export interface Candidate {
  name: string
  href: string
  score: number
  /** Why this tool, in plain sentences built from the data. */
  reasons: string[]
  cost: { total: number; how: string; ifYouForget: number | null; upgrade?: { total: number; how: string; ifYouForget: number | null } } | null
}

export interface Recommendation {
  side: 'seekers' | 'hiring'
  problem: { id: string; label: string; why: string }
  /** tool: a scored pick. nothing-fits: every tool broke a limit. watching: nothing scorable yet. no-tool: not a tool problem. */
  verdict: 'tool' | 'nothing-fits' | 'watching' | 'no-tool'
  /** The one-line conclusion. */
  headline: string
  pick: Candidate | null
  alt: (Candidate & { why: string }) | null
  ruledOut: { name: string; reasons: string[] }[]
  couldNotCheck: { name: string; reasons: string[] }[]
  nearMiss: { name: string; gap: string } | null
  watching: { name: string; what: string }[]
  /** Stephanie's pick, labeled as hers. Shown beside the answer only when it fits every limit. */
  stephanie: { name: string; line: string; href: string } | null
  /** Stephanie's take from the other side of the table. Null until she confirms the line. */
  otherSide: string | null
  /** The unconfirmed draft, for the internal desk only. */
  otherSideDraft: string | null
  guidance: { text: string; href: string } | null
  checked: string
}

const money = (n: number) => (n % 1 === 0 ? `$${n.toLocaleString('en-US')}` : `$${n.toFixed(2)}`)
const inCurrency = (n: number, currency: string) => (currency === 'USD' ? money(n) : `${currency} ${n.toLocaleString('en-US')}`)
/** "Yes, with basic templates and real downloads. Premium is..." becomes "basic templates and real downloads" */
function freeDetail(answer: string): string {
  const first = answer.split('. ')[0]
  const cut = first.replace(/^Yes[.,:]?/i, '').trim()
  const rest = cut === '' ? answer.split('. ')[1] ?? '' : cut
  return rest.replace(/^with\s+/i, '').replace(/\.$/, '').replace(/^The free (plan|tier) /i, 'the free $1 ') || 'a real free version'
}
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`

interface Judged<T> {
  tool: T
  name: string
  fails: string[]
  unknown: string[]
  score: number | null
  cost: Candidate['cost']
}

interface Problem {
  id: string
  label: string
  kind: string
  why: string
  segments?: string[]
  needs?: string[]
  categories?: string[]
  guidance?: { text: string; href: string }
  otherSide: { line: string; confirmed: boolean }
}

function findProblem(side: 'seekers' | 'hiring', id: string): Problem {
  const p = (data[side].problems as Problem[]).find((x) => x.id === id)
  if (!p) throw new Error(`Unknown ${side} problem: ${id}`)
  return p
}

function base(side: 'seekers' | 'hiring', problem: Problem): Recommendation {
  return {
    side,
    problem: { id: problem.id, label: problem.label, why: problem.why },
    verdict: 'tool',
    headline: '',
    pick: null,
    alt: null,
    ruledOut: [],
    couldNotCheck: [],
    nearMiss: null,
    watching: [],
    stephanie: null,
    otherSide: problem.otherSide.confirmed ? problem.otherSide.line : null,
    otherSideDraft: problem.otherSide.confirmed ? null : problem.otherSide.line,
    guidance: problem.guidance ?? null,
    checked: latestCheck(),
  }
}

/** Pick and alternative from the tools that fit: best score first; the alternative is the best cheaper one, else the next best. */
function choose<T>(fits: Judged<T>[]): { pick: Judged<T> | null; alt: Judged<T> | null; altWhy: string } {
  const ranked = [...fits].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  const pick = ranked[0] ?? null
  if (!pick) return { pick: null, alt: null, altWhy: '' }
  const rest = ranked.slice(1)
  const pickCost = pick.cost?.total
  const cheaper = pickCost !== undefined ? rest.find((t) => t.cost && t.cost.total < pickCost) : undefined
  if (cheaper) return { pick, alt: cheaper, altWhy: `The cheaper route: ${money(cheaper.cost!.total)} instead of ${money(pickCost!)}.` }
  const next = rest[0] ?? null
  return { pick, alt: next, altWhy: next ? 'The next best score among the tools that fit.' : '' }
}

/** The tool closest to fitting: fewest broken limits, then the best score. */
function closest<T>(all: Judged<T>[]): { name: string; gap: string } | null {
  const scored = all.filter((t) => t.score !== null && t.fails.length > 0)
  scored.sort((a, b) => a.fails.length - b.fails.length || (b.score ?? 0) - (a.score ?? 0))
  const c = scored[0]
  return c ? { name: c.name, gap: c.fails.join(' ') } : null
}

// ---------------------------------------------------------------- job seekers

function judgeSeekerTool(t: ToolEvidence, ask: SeekerAsk): Judged<ToolEvidence> {
  const days = ask.months * 30
  const cover = cheapestCover(t.id, days)
  const fails: string[] = []
  const unknown: string[] = []
  const caps = data.seekers.capabilities as unknown as Record<string, string[]>

  const free = t.freeLevel === 'full'
  const paid: Candidate['cost'] = cover ? { total: cover.total, how: cover.steps.join(', then '), ifYouForget: forgetCost(t.id, days) } : null
  // A real free version is what it costs you; the paid plan is shown as the upgrade.
  const cost: Candidate['cost'] = free
    ? { total: 0, how: 'The free version', ifYouForget: 0, upgrade: paid ?? undefined }
    : paid

  if (t.overall === null) unknown.push(`Not scored yet (${t.citableReviews} of the 25 citable reviews needed).`)
  if (ask.budget !== null && !free) {
    if (ask.budget === 0) fails.push(`No free version you can rely on: ${t.freeAnswer}`)
    else if (!paid) unknown.push('No published price on file.')
    else if (paid.total > ask.budget) fails.push(`Costs ${money(paid.total)} for ${plural(ask.months, 'month')}, over your ${money(ask.budget)}.`)
  }
  if (ask.must.includes('free-usable') && !free) fails.push(`The free version is capped or missing: ${t.freeAnswer}`)
  if (ask.must.includes('no-4-week') && t.yearCost?.renewsEvery4Weeks) fails.push('Renews every 4 weeks, 13 charges a year.')
  if (ask.must.includes('tracker') && !caps.tracker.includes(t.id)) unknown.push('No job tracker on file.')

  return { tool: t, name: t.name, fails, unknown, score: t.overall, cost }
}

function seekerCandidate(j: Judged<ToolEvidence>, ask: SeekerAsk, fitCount: number, first: boolean): Candidate {
  const t = j.tool
  const reasons = [
    first
      ? `Highest score of the ${plural(fitCount, 'tool')} that fit everything you asked for (${t.overall!.toFixed(2)} out of 5).`
      : `${t.overall!.toFixed(2)} out of 5.`,
    t.bestFor + '.',
  ]
  const c = j.cost
  if (c && c.total === 0) {
    reasons.push(`Free: ${freeDetail(t.freeAnswer)}.`)
    const u = c.upgrade
    if (u) {
      const forget = u.ifYouForget && u.ifYouForget > u.total * 1.5 ? ` (${money(u.ifYouForget)} for the year if you forget to cancel)` : ''
      reasons.push(`Paying for more covers ${plural(ask.months, 'month')} for ${money(u.total)}${forget}.`)
    }
  } else if (c) {
    reasons.push(`Covers ${plural(ask.months, 'month')} for ${money(c.total)}.`)
    if (c.ifYouForget && c.ifYouForget > c.total * 1.5) reasons.push(`If you forget to cancel, the year comes to ${money(c.ifYouForget)}. Set a reminder.`)
  }
  return { name: t.name, href: `/reviews/${t.id}`, score: t.overall!, reasons, cost: j.cost }
}

export function recommendSeeker(ask: SeekerAsk): Recommendation {
  const problem = findProblem('seekers', ask.problem)
  const r = base('seekers', problem)

  if (problem.kind === 'no-tool') {
    r.verdict = 'no-tool'
    r.headline = `Don't buy a tool for this. ${problem.why}`
    return r
  }
  if (problem.kind === 'watching') {
    r.verdict = 'watching'
    r.watching = rising.tools.filter((t) => t.side === 'seekers' && problem.categories?.includes(t.category)).map((t) => ({ name: t.name, what: t.what }))
    r.headline = `Nothing we can score fixes this yet. ${problem.why}`
    return r
  }

  const caps = data.seekers.capabilities as unknown as Record<string, string[]>
  const inScope = resumeTools().all.filter(
    (t) => (!problem.segments || problem.segments.includes(t.segment)) && (!problem.needs || problem.needs.every((n) => caps[n]?.includes(t.id))),
  )
  // A problem that needs a capability (e.g. a tracker) makes that a must-have.
  const judged = inScope.map((t) => judgeSeekerTool(t, ask))
  for (const j of judged) {
    if (j.fails.length) r.ruledOut.push({ name: j.name, reasons: j.fails })
    else if (j.unknown.length) r.couldNotCheck.push({ name: j.name, reasons: j.unknown })
  }
  const fits = judged.filter((j) => !j.fails.length && !j.unknown.length)
  const { pick, alt, altWhy } = choose(fits)

  if (!pick) {
    r.verdict = 'nothing-fits'
    r.nearMiss = closest(judged)
    r.headline = r.nearMiss
      ? `Nothing we've scored fits every limit you set. Closest: ${r.nearMiss.name}. ${r.nearMiss.gap}`
      : 'Nothing we have scored fits every limit you set.'
    return r
  }
  r.pick = seekerCandidate(pick, ask, fits.length, true)
  r.alt = alt ? { ...seekerCandidate(alt, ask, fits.length, false), why: altWhy } : null
  r.headline = `${pick.name}. ${r.pick.reasons[0]}`

  const sp = judged.find((j) => j.tool.id === risingPick.tool)
  if (sp && !sp.fails.length && !sp.unknown.length && sp.tool.id !== pick.tool.id)
    r.stephanie = { name: sp.name, line: risingPick.line, href: `/reviews/${sp.tool.id}` }
  return r
}

// ---------------------------------------------------------------- hiring teams

type Price = { amount?: number; per?: 'user-month' | 'month' | 'year'; currency?: string; note?: string; free?: string; quote?: boolean }

export function segmentFor(hiresPerYear: number): 'small' | 'growing' | 'scaling' {
  const s = data.hiring.segments
  if (hiresPerYear <= s.small.maxHires) return 'small'
  if (hiresPerYear <= s.growing.maxHires) return 'growing'
  return 'scaling'
}

/** A year of the cheapest published plan for this many seats, in its own currency. */
export function atsYear(name: string, seats: number): { amount: number; currency: string; how: string } | null {
  const p = (data.hiring.prices as unknown as Record<string, Price>)[name]
  if (!p || p.quote || p.amount === undefined) return null
  const amount = p.per === 'user-month' ? p.amount * 12 * seats : p.per === 'month' ? p.amount * 12 : p.amount
  const cur = p.currency ?? 'USD'
  const note = p.note ? ` (${p.note})` : ''
  const how =
    p.per === 'user-month'
      ? `${inCurrency(p.amount, cur)} a user a month, ${plural(seats, 'user')}, 12 months${note}`
      : p.per === 'month'
        ? `${inCurrency(p.amount, cur)} a month, 12 months${note}`
        : `${inCurrency(p.amount, cur)} a year${note}`
  return { amount, currency: cur, how }
}

function judgeAts(t: AtsTool, ask: HiringAsk): Judged<AtsTool> {
  const price = (data.hiring.prices as unknown as Record<string, Price>)[t.name]
  const year = atsYear(t.name, ask.seats)
  const fails: string[] = []
  const unknown: string[] = []
  const usd = year && year.currency === 'USD' ? year.amount : null

  if (ask.must.includes('published-price') && (!price || price.quote)) fails.push('No published price: quote only.')
  if (ask.must.includes('free-start') && !price?.free) fails.push('No free plan on file.')
  if (ask.budget !== null) {
    if (ask.budget === 0 && !price?.free) fails.push('No free plan on file.')
    else if (ask.budget > 0 && (!price || price.quote)) unknown.push("Quote only, so we can't check it against your budget.")
    else if (ask.budget > 0 && year && year.currency !== 'USD') unknown.push(`Priced in ${year.currency} (${year.how}); we don't convert currencies.`)
    else if (ask.budget > 0 && usd !== null && usd > ask.budget) fails.push(`About ${money(usd)} a year for ${plural(ask.seats, 'user')}, over your ${money(ask.budget)}.`)
  }
  const cost: Candidate['cost'] =
    ask.budget === 0 && price?.free
      ? { total: 0, how: `The free plan (${price.free})`, ifYouForget: null }
      : usd !== null
        ? { total: usd, how: year!.how, ifYouForget: null }
        : null
  return { tool: t, name: t.name, fails: [...new Set(fails)], unknown, score: atsScores(t).overall, cost }
}

const TIER: Record<string, string> = { small: 'small-team', growing: 'growing-team', scaling: 'scaling-team' }

function atsCandidate(j: Judged<AtsTool>, fitCount: number, first: boolean): Candidate {
  const s = atsScores(j.tool)
  const tier = TIER[j.tool.segment] ?? ''
  const reasons = [
    first
      ? `Highest score of the ${fitCount} ${tier} ${fitCount === 1 ? 'system' : 'systems'} that fit everything you asked for (${s.overall.toFixed(2)} out of 5).`
      : `${s.overall.toFixed(2)} out of 5.`,
  ]
  if (j.cost) reasons.push(j.cost.total === 0 ? `Starts free: ${j.cost.how.replace(/^The free plan \(|\)$/g, '')}.` : `About ${money(j.cost.total)} a year: ${j.cost.how}.`)
  return { name: j.name, href: '/guides/best-ats-for-small-teams', score: s.overall, reasons, cost: j.cost }
}

export function recommendHiring(ask: HiringAsk): Recommendation {
  const problem = findProblem('hiring', ask.problem)
  const r = base('hiring', problem)

  if (problem.kind === 'no-tool') {
    r.verdict = 'no-tool'
    r.headline = `Don't buy software for this. ${problem.why}`
    return r
  }
  if (problem.kind === 'watching') {
    r.verdict = 'watching'
    r.watching = rising.tools.filter((t) => t.side === 'hiring' && problem.categories?.includes(t.category)).map((t) => ({ name: t.name, what: t.what }))
    if (problem.categories?.includes(hiringPick.category)) r.stephanie = { name: hiringPick.name, line: hiringPick.line, href: hiringPick.url }
    r.headline = `Nothing we can score fixes this yet. ${problem.why}`
    return r
  }

  const seg = segmentFor(ask.hiresPerYear)
  const segLabel = data.hiring.segments[seg].label
  const judged = ats.tools.filter((t) => t.segment === seg).map((t) => judgeAts(t, ask))
  for (const j of judged) {
    if (j.fails.length) r.ruledOut.push({ name: j.name, reasons: j.fails })
    else if (j.unknown.length) r.couldNotCheck.push({ name: j.name, reasons: j.unknown })
  }
  const fits = judged.filter((j) => !j.fails.length && !j.unknown.length)
  const { pick, alt, altWhy } = choose(fits)

  if (!pick) {
    r.verdict = 'nothing-fits'
    // Look one tier either side for the closest fit.
    const wider = ats.tools.filter((t) => t.segment !== seg).map((t) => judgeAts(t, ask))
    const fitsElsewhere = wider.filter((j) => !j.fails.length && !j.unknown.length).sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0]
    r.nearMiss = fitsElsewhere
      ? { name: fitsElsewhere.name, gap: `Fits your limits, but it's ranked for ${data.hiring.segments[fitsElsewhere.tool.segment as 'small'].label.split(':')[0].toLowerCase()}.` }
      : closest(judged)
    r.headline = r.nearMiss
      ? `Nothing ranked for ${segLabel.split(':')[0].toLowerCase()} fits every limit you set. Closest: ${r.nearMiss.name}. ${r.nearMiss.gap}`
      : `Nothing ranked for ${segLabel.split(':')[0].toLowerCase()} fits every limit you set.`
    return r
  }
  r.pick = atsCandidate(pick, fits.length, true)
  r.alt = alt ? { ...atsCandidate(alt, fits.length, false), why: altWhy } : null
  r.headline = `${pick.name}. ${r.pick.reasons[0]}`
  return r
}

export function recommend(ask: Ask): Recommendation {
  return ask.side === 'seekers' ? recommendSeeker(ask) : recommendHiring(ask)
}
