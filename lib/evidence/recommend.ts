/**
 * The recommendation engine: a visitor’s problem and limits in, a short kit out.
 *
 * The rules live in recommend.json and are the public promise. In short:
 * diagnose first; "no tool" is a real answer; limits rule tools out but
 * never re-score them; unknown is not yes; the best match is the top-rated
 * tool that fits, with up to two alternatives, each carrying one label
 * (best free option, most complete, Stephanie’s pick); only scored tools can
 * be the best match; every tool left out is listed with the reason; nothing
 * about commissions is an input; the same situation always gets the same
 * answer. The fixed lines around the tools live in kit.ts.
 */
import ats from '@/lib/scorecards/ats-small-teams.json'
import data from './recommend.json'
import { atsScores, cheapestCover, forgetCost, hiringPick, latestCheck, resumeTools, rising, risingPick, type AtsTool, type ToolEvidence } from './index'
import type { AlsoLabel } from './kit'

export const recFramework = data

export type SeekerMust = 'free-usable' | 'no-4-week' | 'tracker'
export type HiringMust = 'published-price' | 'free-start'

export interface SeekerAsk {
  side: 'seekers'
  problem: string
  /** How long the search is expected to take. */
  months: number
  /** Most they’ll spend on the whole search, in USD. null means no limit. */
  budget: number | null
  must: SeekerMust[]
}

export interface HiringAsk {
  side: 'hiring'
  problem: string
  hiresPerYear: number
  /** Company headcount: some published prices only cover small companies. */
  employees: number
  /** People who will log in. */
  seats: number
  /** Most they’ll spend a year, in USD. null means no limit. */
  budget: number | null
  must: HiringMust[]
}

export type Ask = SeekerAsk | HiringAsk

export interface Cost {
  total: number
  how: string
  ifYouForget: number | null
  /** For a tool with a real free version: what paying for more would cost. */
  upgrade?: { total: number; how: string; ifYouForget: number | null }
}

export interface Candidate {
  /** The partner id behind /go/{id}, the outbound link. */
  id: string
  name: string
  domain: string
  href: string
  linkText: string
  score: number
  /** Why this tool, in plain sentences built from the data. The first is the one-sentence reason. */
  reasons: string[]
  cost: Cost | null
}

/** "Also worth a look": one more tool, with exactly one label and one line. */
export interface Also {
  label: AlsoLabel
  id: string
  name: string
  domain: string
  /** null for a tool too new to score (Stephanie's pick can be one). */
  score: number | null
  line: string
  /** Our review page, if the tool has one. */
  href: string | null
  linkText: string | null
}

export interface OtherSide {
  line: string
  source: string
  url: string
}

export interface Recommendation {
  side: 'seekers' | 'hiring'
  problem: { id: string; label: string; why: string }
  /** tool: a scored pick. nothing-fits: every tool broke a limit. watching: nothing scorable yet. no-tool: not a tool problem. */
  verdict: 'tool' | 'nothing-fits' | 'watching' | 'no-tool'
  /** The one-line conclusion. */
  headline: string
  pick: Candidate | null
  /** Up to two alternatives, each with one label. */
  also: Also[]
  ruledOut: { name: string; reasons: string[] }[]
  couldNotCheck: { name: string; reasons: string[] }[]
  /** Tools that fit everything asked for but rate lower and carry no label: listed under "What we ruled out". */
  ratedLower: { name: string; reasons: string[] }[]
  nearMiss: { name: string; gap: string } | null
  watching: { name: string; domain: string; what: string }[]
  /** Published research on what the other side of the table sees. Kept on file; answers show Stephanie’s own line instead (kit.ts). */
  otherSide: OtherSide
  guidance: { text: string; href: string } | null
  /** How many tools were considered for this problem. */
  considered: number
  /** What the pick's cost covers: "for 3 months" or "a year". */
  costSpan: string
  checked: string
}

/** "A, B and C": a list the way people say it. */
const listJoin = (xs: string[]) => (xs.length < 3 ? xs.join(' and ') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)
const money = (n: number) => (n % 1 === 0 ? `$${n.toLocaleString('en-US')}` : `$${n.toFixed(2)}`)
const inCurrency = (n: number, currency: string) => (currency === 'USD' ? money(n) : `${currency} ${n.toLocaleString('en-US')}`)
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
const monthsText = (m: number) => (m === 12 ? 'a year' : plural(m, 'month'))

/** "Partly. You get 5 free scans a month. ..." becomes "You get 5 free scans a month. ...": the why, without the yes/no. */
function freeGap(answer: string): string {
  return answer.replace(/^(Partly|No|Not really|Yes)[.,:]?\s*/i, '').trim()
}

/** "Yes, with basic templates and real downloads. Premium is..." becomes "basic templates and real downloads". */
function freeDetail(answer: string): string {
  const sentences = answer.split('. ')
  const first = sentences[0].replace(/^Yes[.,:]?/i, '').trim()
  const rest = first === '' ? (sentences[1] ?? '') : first
  return rest.replace(/^with\s+/i, '').replace(/\.$/, '').replace(/^The free (plan|tier) /i, 'the free $1 ') || 'a real free version'
}

interface Judged<T> {
  tool: T
  name: string
  fails: string[]
  unknown: string[]
  score: number | null
  cost: Cost | null
}

interface Problem {
  id: string
  label: string
  kind: 'tool' | 'watching' | 'no-tool'
  why: string
  segments?: string[]
  needs?: string[]
  /** Capabilities worth naming in the answer when a system has them on file, without ruling others out. */
  highlight?: string[]
  categories?: string[]
  showFounderPick?: boolean
  guidance?: { text: string; href: string }
  otherSide: OtherSide
}

export function problemsFor(side: 'seekers' | 'hiring'): Problem[] {
  return data[side].problems as Problem[]
}

function findProblem(side: 'seekers' | 'hiring', id: string): Problem {
  const p = problemsFor(side).find((x) => x.id === id)
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
    also: [],
    ruledOut: [],
    couldNotCheck: [],
    ratedLower: [],
    nearMiss: null,
    watching: [],
    otherSide: problem.otherSide,
    guidance: problem.guidance ?? null,
    considered: 0,
    costSpan: '',
    // Hiring answers rest on the applicant tracking data, which has its own check date.
    checked: side === 'hiring' ? ats.as_of : latestCheck(),
  }
}

function watchingFor(side: 'seekers' | 'hiring', problem: Problem, r: Recommendation) {
  r.verdict = 'watching'
  r.watching = rising.tools
    .filter((t) => t.side === side && problem.categories?.includes(t.category))
    .map((t) => ({ name: t.name, domain: t.domain, what: t.what }))
  // Stephanie's pick for this category, where the site has one (her sourcing pick).
  if (problem.showFounderPick && problem.categories?.includes(hiringPick.category))
    r.also = [{ label: 'Stephanie’s pick', id: hiringPick.id, name: hiringPick.name, domain: hiringPick.domain, score: null, line: hiringPick.line, href: null, linkText: null }]
  r.headline = `We don’t rate a tool for this yet. ${problem.why}`
}

/** The best match: the top-rated of the tools that fit. */
function rank<T>(fits: Judged<T>[]): Judged<T>[] {
  return [...fits].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
}

/**
 * "Also worth a look": up to two of the other tools that fit, each with one
 * label, in this order. A label only goes where the data backs it:
 * - Best free option: the top-rated tool with a real free version, only when the best match isn't free.
 * - Most complete: covers the most of what we track (job seekers: checker, builder, tracker), at least as much as the best match.
 * - Stephanie's pick: her pick for this category, when it fits and isn't the best match.
 */
function alsoWorth<T>(
  ranked: Judged<T>[],
  { isFree, breadth, stephanieId, toAlso }: { isFree: (j: Judged<T>) => boolean; breadth?: (j: Judged<T>) => number; stephanieId?: string; toAlso: (j: Judged<T>, label: AlsoLabel) => Also },
): Also[] {
  const [pick, ...rest] = ranked
  if (!pick) return []
  const out: Also[] = []
  const used = new Set<Judged<T>>()
  const add = (j: Judged<T> | undefined, label: AlsoLabel) => {
    if (j && !used.has(j) && out.length < 2) {
      used.add(j)
      out.push(toAlso(j, label))
    }
  }
  if (!isFree(pick)) add(rest.find(isFree), 'Best free option')
  if (breadth) {
    const most = Math.max(...ranked.map(breadth))
    if (most >= 2 && breadth(pick) <= most) add(rest.find((j) => !used.has(j) && breadth(j) === most), 'Most complete')
  }
  if (stephanieId) add(rest.find((j) => idOf(j) === stephanieId), 'Stephanie’s pick')
  return out
}

const idOf = <T>(j: Judged<T>) => ((j.tool as { id?: string }).id ?? slugOf(j.name))
const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Every tool that fit but didn't make the kit, with its score, for "What we ruled out". */
function lower<T>(ranked: Judged<T>[], shown: Also[]): { name: string; reasons: string[] }[] {
  const names = new Set(shown.map((a) => a.name))
  return ranked
    .slice(1)
    .filter((j) => !names.has(j.name))
    .map((j) => ({ name: j.name, reasons: [`Fits everything you asked for, but rates lower: ${(j.score ?? 0).toFixed(2)} out of 5.`] }))
}

/** The scored tool closest to fitting: fewest broken limits, then the best score. */
function closest<T>(all: Judged<T>[]): { name: string; gap: string } | null {
  const scored = all.filter((t) => t.score !== null && t.fails.length > 0)
  scored.sort((a, b) => a.fails.length - b.fails.length || (b.score ?? 0) - (a.score ?? 0))
  const c = scored[0]
  return c ? { name: c.name, gap: c.fails.join(' ') } : null
}

function firstReason(name: string, fitCount: number, noun: string, score: number) {
  return fitCount === 1
    ? `The only ${noun} that fits everything you asked for, at ${score.toFixed(2)} out of 5.`
    : `The top-rated of the ${fitCount} ${noun}s that fit everything you asked for, at ${score.toFixed(2)} out of 5.`
}

// ---------------------------------------------------------------- job seekers

const capabilities = data.seekers.capabilities as unknown as Record<string, string[]>

function judgeSeekerTool(t: ToolEvidence, ask: SeekerAsk): Judged<ToolEvidence> {
  const days = ask.months * 30
  const cover = cheapestCover(t.id, days)
  const fails: string[] = []
  const unknown: string[] = []

  const free = t.freeLevel === 'full'
  const paid = cover ? { total: cover.total, how: cover.steps.join(', then '), ifYouForget: forgetCost(t.id, days) } : null
  // A real free version is what it costs you; the paid plan is shown as the upgrade.
  const cost: Cost | null = free ? { total: 0, how: 'The free version', ifYouForget: 0, upgrade: paid ?? undefined } : paid

  if (ask.budget !== null && !free) {
    if (ask.budget === 0) fails.push(`The free version is too limited. ${freeGap(t.freeAnswer)}`)
    else if (!paid) unknown.push('No price listed on their website.')
    else if (paid.total > ask.budget) fails.push(`Costs ${money(paid.total)} for ${monthsText(ask.months)}, more than your ${money(ask.budget)} budget.`)
  }
  if (ask.must.includes('free-usable') && !free && ask.budget !== 0) fails.push(`The free version is too limited, or there isn’t one. ${freeGap(t.freeAnswer)}`)
  if (ask.must.includes('no-4-week') && t.yearCost?.renewsEvery4Weeks) fails.push('Renews every 4 weeks: 13 charges a year.')
  if (ask.must.includes('tracker') && !capabilities.tracker.includes(t.id)) unknown.push('We couldn’t confirm a job tracker.')
  if (t.overall === null) unknown.push(`Not rated yet: ${t.citableReviews} of the 25 public reviews we need.`)

  return { tool: t, name: t.name, fails, unknown, score: t.overall, cost }
}

function seekerCandidate(j: Judged<ToolEvidence>, ask: SeekerAsk, fitCount: number, first: boolean): Candidate {
  const t = j.tool
  const reasons = [first ? firstReason(t.name, fitCount, 'tool', t.overall!) : `${t.overall!.toFixed(2)} out of 5.`, `${t.bestFor}.`]
  const c = j.cost
  if (c && c.total === 0) {
    reasons.push(`Free: ${freeDetail(t.freeAnswer)}.`)
    const u = c.upgrade
    if (u) {
      const forget = u.ifYouForget && u.ifYouForget > u.total * 1.5 ? `, or ${money(u.ifYouForget)} for the year if you forget to cancel` : ''
      reasons.push(`If you upgrade: ${money(u.total)} for ${monthsText(ask.months)}${forget}.`)
    }
  } else if (c) {
    reasons.push(`Costs ${money(c.total)} for ${monthsText(ask.months)}.`)
    if (c.ifYouForget && c.ifYouForget > c.total * 1.5) reasons.push(`If you forget to cancel, the year comes to ${money(c.ifYouForget)}. Set a reminder the day you sign up.`)
  }
  return { id: t.id, name: t.name, domain: t.domain, href: `/reviews/${t.id}`, linkText: `Is ${t.name} worth it?`, score: t.overall!, reasons, cost: c }
}

/** Checker, builder, tracker: how many of the three a tool does, from capabilities on file. */
const seekerBreadth = (j: Judged<ToolEvidence>) => ['checker', 'builder', 'tracker'].filter((k) => capabilities[k]?.includes(j.tool.id)).length

function seekerAlso(j: Judged<ToolEvidence>, label: AlsoLabel): Also {
  const t = j.tool
  const line =
    label === 'Best free option'
      ? `Free: ${freeDetail(t.freeAnswer)}.`
      : label === 'Stephanie’s pick' && risingPick.tool === t.id
        ? risingPick.line
        : `${t.bestFor}.`
  return { label, id: t.id, name: t.name, domain: t.domain, score: t.overall, line, href: `/reviews/${t.id}`, linkText: `Is ${t.name} worth it?` }
}

export function recommendSeeker(ask: SeekerAsk): Recommendation {
  const problem = findProblem('seekers', ask.problem)
  const r = base('seekers', problem)

  if (problem.kind === 'no-tool') {
    r.verdict = 'no-tool'
    r.headline = `Don’t buy a tool for this. ${problem.why}`
    return r
  }
  if (problem.kind === 'watching') {
    watchingFor('seekers', problem, r)
    return r
  }

  const inScope = resumeTools().all.filter(
    (t) =>
      (!problem.segments || problem.segments.includes(t.segment)) && (!problem.needs || problem.needs.every((n) => capabilities[n]?.includes(t.id))),
  )
  r.considered = inScope.length
  r.costSpan = `for ${monthsText(ask.months)}`
  const judged = inScope.map((t) => judgeSeekerTool(t, ask))
  for (const j of judged) {
    if (j.fails.length) r.ruledOut.push({ name: j.name, reasons: j.fails })
    else if (j.unknown.length) r.couldNotCheck.push({ name: j.name, reasons: j.unknown })
  }
  const fits = judged.filter((j) => !j.fails.length && !j.unknown.length)
  const ranked = rank(fits)
  const pick = ranked[0]

  if (!pick) {
    r.verdict = 'nothing-fits'
    r.nearMiss = closest(judged)
    r.headline = r.nearMiss
      ? `Nothing we rate fits everything you asked for. The closest is ${r.nearMiss.name}. ${r.nearMiss.gap}`
      : 'Nothing we rate fits everything you asked for.'
    return r
  }
  r.pick = seekerCandidate(pick, ask, fits.length, true)
  r.also = alsoWorth(ranked, {
    isFree: (j) => j.cost?.total === 0,
    breadth: seekerBreadth,
    stephanieId: risingPick.tool,
    toAlso: seekerAlso,
  })
  r.ratedLower = lower(ranked, r.also)
  r.headline = `${pick.name}. ${r.pick.reasons[0]}`
  return r
}

// ---------------------------------------------------------------- hiring teams

interface Price {
  amount?: number
  per?: 'user-month' | 'month' | 'year'
  currency?: string
  note?: string
  free?: string
  quote?: boolean
  maxEmployees?: number
}

const prices = data.hiring.prices as unknown as Record<string, Price>

export function segmentFor(hiresPerYear: number): 'small' | 'growing' | 'scaling' {
  const s = data.hiring.segments
  if (hiresPerYear <= s.small.maxHires) return 'small'
  if (hiresPerYear <= s.growing.maxHires) return 'growing'
  return 'scaling'
}

/** A year of the cheapest published plan for this many seats, in its own currency. */
export function atsYear(name: string, seats: number): { amount: number; currency: string; how: string } | null {
  const p = prices[name]
  if (!p || p.quote || p.amount === undefined) return null
  const amount = p.per === 'user-month' ? p.amount * 12 * seats : p.per === 'month' ? p.amount * 12 : p.amount
  const cur = p.currency ?? 'USD'
  const note = p.note ? ` (${p.note})` : ''
  const how =
    p.per === 'user-month'
      ? `${inCurrency(p.amount, cur)} a user a month for ${plural(seats, 'user')}${note}`
      : p.per === 'month'
        ? `${inCurrency(p.amount, cur)} a month${note}`
        : `${p.note ?? 'Published price'}, billed yearly`
  return { amount, currency: cur, how }
}

interface Capability {
  what: string
  source: string
  date: string
  url: string
}

const atsCapabilities = (data.hiring as unknown as { capabilities: Record<string, Record<string, Capability>> }).capabilities

const CAPABILITY_MISSING: Record<string, string> = {
  'fraud-detection': 'We couldn’t confirm built-in fraud detection.',
  'ai-matching': 'We couldn’t confirm AI candidate matching.',
}

/** A system's capability, from its own dated product page; undefined means not on file. */
export function atsCapability(kind: string, name: string): Capability | undefined {
  return atsCapabilities[kind]?.[name]
}

function judgeAts(t: AtsTool, ask: HiringAsk, problem?: Problem): Judged<AtsTool> {
  const price = prices[t.name]
  const fails: string[] = []
  const unknown: string[] = []
  // What the problem needs (e.g. fraud detection): unknown is not yes.
  for (const need of problem?.needs ?? []) if (!atsCapability(need, t.name)) unknown.push(CAPABILITY_MISSING[need] ?? 'Not on file.')
  // A published price that only covers smaller companies is a quote for this one.
  const tooBig = price?.maxEmployees !== undefined && ask.employees > price.maxEmployees
  const quoteOnly = !price || price.quote || tooBig
  const year = quoteOnly ? null : atsYear(t.name, ask.seats)
  const usd = year && year.currency === 'USD' ? year.amount : null
  const quoteWhy = tooBig
    ? `Its listed price covers up to ${price!.maxEmployees} employees. Above that, you have to ask for a quote.`
    : 'No listed price: you have to ask for a quote.'

  if (ask.must.includes('published-price') && quoteOnly) fails.push(quoteWhy)
  if ((ask.must.includes('free-start') || ask.budget === 0) && !price?.free) fails.push('We couldn’t find a free plan.')
  if (ask.budget !== null && ask.budget > 0 && !(ask.must.includes('published-price') && quoteOnly)) {
    if (quoteOnly) unknown.push(`${quoteWhy} We can’t check it against your budget.`)
    else if (year && year.currency !== 'USD') unknown.push(`Priced in ${year.currency} (${year.how}); we don’t convert currencies.`)
    else if (usd !== null && usd > ask.budget) fails.push(`About ${money(usd)} a year (${year!.how}), more than your ${money(ask.budget)} budget.`)
  }
  const cost: Cost | null =
    ask.budget === 0 && price?.free
      ? { total: 0, how: `The free plan: ${price.free}`, ifYouForget: null }
      : usd !== null
        ? { total: usd, how: year!.how, ifYouForget: null }
        : null
  return { tool: t, name: t.name, fails: [...new Set(fails)], unknown, score: atsScores(t).overall, cost }
}

const TIER: Record<string, string> = { small: 'small-team', growing: 'growing-team', scaling: 'scaling-team' }
const TIER_NAME: Record<string, string> = { small: 'small teams', growing: 'growing teams', scaling: 'scaling teams' }

function atsCandidate(j: Judged<AtsTool>, fitCount: number, first: boolean, problem?: Problem): Candidate {
  const s = atsScores(j.tool)
  const price = prices[j.name]
  const reasons = [first ? firstReason(j.name, fitCount, `${TIER[j.tool.segment]} system`, s.overall) : `${s.overall.toFixed(2)} out of 5.`]
  for (const kind of [...(problem?.needs ?? []), ...(problem?.highlight ?? [])]) {
    const c = atsCapability(kind, j.name)
    if (c) reasons.push(`${c.what} (${c.source}, ${c.date}).`)
  }
  if (j.cost && j.cost.total === 0) reasons.push(`Starts free: ${price?.free}.`)
  else if (j.cost) reasons.push(`About ${money(j.cost.total)} a year: ${j.cost.how}.`)
  else reasons.push('Price by quote: ask for it in writing before the demo.')
  if (j.cost && j.cost.total > 0 && price?.free) reasons.push(`There’s also a free plan to try it on: ${price.free}.`)
  return {
    id: slugOf(j.name),
    name: j.name,
    domain: j.tool.domain,
    href: `/reviews/ats/${slugOf(j.name)}`,
    linkText: `Is ${j.name} worth it?`,
    score: s.overall,
    reasons,
    cost: j.cost,
  }
}

function atsAlso(j: Judged<AtsTool>, label: AlsoLabel): Also {
  const price = prices[j.name]
  const line = label === 'Best free option' && price?.free ? `Free plan: ${price.free}.` : `${atsScores(j.tool).overall.toFixed(2)} out of 5.`
  return { label, id: slugOf(j.name), name: j.name, domain: j.tool.domain, score: atsScores(j.tool).overall, line, href: `/reviews/ats/${slugOf(j.name)}`, linkText: `Is ${j.name} worth it?` }
}

export function recommendHiring(ask: HiringAsk): Recommendation {
  const problem = findProblem('hiring', ask.problem)
  const r = base('hiring', problem)

  if (problem.kind === 'no-tool') {
    r.verdict = 'no-tool'
    r.headline = `Don’t buy software for this. ${problem.why}`
    return r
  }
  if (problem.kind === 'watching') {
    watchingFor('hiring', problem, r)
    return r
  }

  const seg = segmentFor(ask.hiresPerYear)
  const inScope = ats.tools.filter((t) => t.segment === seg)
  r.considered = inScope.length
  r.costSpan = 'a year'
  const judged = inScope.map((t) => judgeAts(t, ask, problem))
  for (const j of judged) {
    if (j.fails.length) r.ruledOut.push({ name: j.name, reasons: j.fails })
    else if (j.unknown.length) r.couldNotCheck.push({ name: j.name, reasons: j.unknown })
  }
  const fits = judged.filter((j) => !j.fails.length && !j.unknown.length)
  const ranked = rank(fits)
  const pick = ranked[0]

  if (!pick) {
    r.verdict = 'nothing-fits'
    // A system ranked for another team size may still fit every limit.
    const elsewhere = ats.tools
      .filter((t) => t.segment !== seg)
      .map((t) => judgeAts(t, ask, problem))
      .filter((j) => !j.fails.length && !j.unknown.length)
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0]
    r.nearMiss = elsewhere
      ? { name: elsewhere.name, gap: `It fits everything you asked for, but we rank it for ${TIER_NAME[elsewhere.tool.segment]}.` }
      : closest(judged)
    r.headline = r.nearMiss
      ? `Nothing we rank for ${TIER_NAME[seg]} fits everything you asked for. The closest is ${r.nearMiss.name}. ${r.nearMiss.gap}`
      : `Nothing we rank for ${TIER_NAME[seg]} fits everything you asked for.`
    // A problem with its own free guidance (the fraud checklist) points there; otherwise, to a person.
    r.guidance = problem.guidance ?? data.hiring.fallback
    return r
  }
  r.pick = atsCandidate(pick, fits.length, true, problem)
  // No feature-breadth data on file for applicant tracking systems, and no Stephanie's pick in this category: only the free label can apply.
  r.also = alsoWorth(ranked, { isFree: (j) => !!prices[j.name]?.free, toAlso: atsAlso })
  r.ratedLower = lower(ranked, r.also)
  r.headline = `${pick.name}. ${r.pick.reasons[0]}`
  return r
}

export function recommend(ask: Ask): Recommendation {
  return ask.side === 'seekers' ? recommendSeeker(ask) : recommendHiring(ask)
}

// ---------------------------------------------------------------- links

type Params = Record<string, string | string[] | undefined>

/** What the visitor has answered so far, validated against the options on file. */
export interface AskState {
  side: 'seekers' | 'hiring' | null
  problem: Problem | null
  months: number | null
  budget: number | null | undefined
  hires: number | null
  employees: number | null
  seats: number | null
  must: string[]
}

function one(p: Params, key: string): string | undefined {
  const v = p[key]
  return Array.isArray(v) ? v[0] : v
}

function many(p: Params, key: string): string[] {
  const v = p[key]
  const list = Array.isArray(v) ? v : v ? [v] : []
  return list.flatMap((x) => x.split(',')).filter(Boolean)
}

function optionValue(side: 'seekers' | 'hiring', limit: string, raw: string | undefined): number | null | undefined {
  if (raw === undefined || raw === '') return undefined
  const l = data[side].limits.find((x) => x.id === limit)
  if (!l) return undefined
  const value = raw === 'any' ? null : Number(raw)
  return l.options.some((o) => o.value === value) ? value : undefined
}

export function stateFromParams(p: Params): AskState {
  const sideRaw = one(p, 'side')
  const side = sideRaw === 'seekers' || sideRaw === 'hiring' ? sideRaw : null
  const problem = side ? (problemsFor(side).find((x) => x.id === one(p, 'problem')) ?? null) : null
  const must = side ? many(p, 'must').filter((m) => data[side].mustHaves.some((x) => x.id === m)) : []
  const num = (limit: string, key = limit) => (side ? optionValue(side, limit, one(p, key)) : undefined)
  return {
    side,
    problem,
    months: side === 'seekers' ? (num('months') ?? null) : null,
    budget: side ? num('budget') : undefined,
    hires: side === 'hiring' ? (num('hires') ?? null) : null,
    employees: side === 'hiring' ? (num('employees') ?? null) : null,
    seats: side === 'hiring' ? (num('seats') ?? null) : null,
    must: [...new Set(must)],
  }
}

/** A complete ask, or null while questions are still open. Problems that aren’t tool problems need no limits. */
export function askFromState(s: AskState): Ask | null {
  if (!s.side || !s.problem) return null
  if (s.side === 'seekers') {
    if (s.problem.kind !== 'tool') return { side: 'seekers', problem: s.problem.id, months: 3, budget: null, must: [] }
    if (s.months === null || s.budget === undefined) return null
    return { side: 'seekers', problem: s.problem.id, months: s.months, budget: s.budget, must: s.must as SeekerMust[] }
  }
  if (s.problem.kind !== 'tool') return { side: 'hiring', problem: s.problem.id, hiresPerYear: 10, employees: 20, seats: 1, budget: null, must: [] }
  if (s.hires === null || s.employees === null || s.seats === null || s.budget === undefined) return null
  return { side: 'hiring', problem: s.problem.id, hiresPerYear: s.hires, employees: s.employees, seats: s.seats, budget: s.budget, must: s.must as HiringMust[] }
}

/** The link for an answer, so it can be shared, quoted and reopened. */
export function askToQuery(ask: Ask): string {
  const q = new URLSearchParams({ side: ask.side, problem: ask.problem })
  if (findProblem(ask.side, ask.problem).kind === 'tool') {
    if (ask.side === 'seekers') q.set('months', String(ask.months))
    else {
      q.set('hires', String(ask.hiresPerYear))
      q.set('employees', String(ask.employees))
      q.set('seats', String(ask.seats))
    }
    q.set('budget', ask.budget === null ? 'any' : String(ask.budget))
    if (ask.must.length) q.set('must', ask.must.join(','))
  }
  return q.toString()
}

// ---------------------------------------------------------------- situations

export interface Situation {
  slug: string
  question: string
  ask: Ask
}

export function situations(): Situation[] {
  return data.situations.list as Situation[]
}

/** The permanent page for this exact situation, if it has one. */
export function situationFor(ask: Ask): Situation | null {
  const q = askToQuery(ask)
  return situations().find((s) => askToQuery(s.ask) === q) ?? null
}

// ---------------------------------------------------------------- plain text

/** The answer’s title and lead: "Use Teal." and why. */
export function verdictTitle(r: Recommendation): { title: string; lead: string } {
  if (r.verdict === 'tool' && r.pick) return { title: `Use ${r.pick.name}.`, lead: r.pick.reasons[0] }
  const [first, ...rest] = r.headline.split('. ')
  return { title: `${first}.`, lead: rest.join('. ') }
}

/** The answer as one paragraph of plain text, for structured data and AI readers. Short leaves out the other side and the date. */
export function answerText(r: Recommendation, { short = false }: { short?: boolean } = {}): string {
  const { title, lead } = verdictTitle(r)
  const parts = [title, lead]
  if (r.pick?.cost) {
    const c = r.pick.cost
    parts.push(c.total === 0 ? 'It costs nothing.' : `About ${money(c.total)} ${r.costSpan}: ${c.how}.`)
  }
  if (r.also.length) parts.push(`Also worth a look: ${listJoin(r.also.map((a) => `${a.name} (${a.label.toLowerCase()})`))}.`)
  if (r.ruledOut.length) parts.push(`Ruled out: ${r.ruledOut.map((o) => o.name).join(', ')}.`)
  if (!short) parts.push(`Checked ${r.checked} by hiring.productions.`)
  return parts.filter(Boolean).join(' ')
}
