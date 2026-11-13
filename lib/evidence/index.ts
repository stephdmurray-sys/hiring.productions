/**
 * Evidence layer for the review guides.
 *
 * One rule: numbers live in data files, never in page copy. Pages read
 * from here, so a monthly refresh (see REFRESH.md) updates the JSON and
 * every page that shows the number changes with it.
 *
 *   lib/scorecards/resume-tools.json  ratings, prices, traffic, practitioner drafts
 *   lib/evidence/benchmarks.json      other reviewers' lists
 *   lib/evidence/videos.json          demo and review videos
 *   lib/evidence/sources.json         which sources we use and the rules for each
 *   lib/evidence/resume-guide.json    picks, our calls, verdict copy, refresh log
 */
import scorecard from '@/lib/scorecards/resume-tools.json'
import benchmarksData from './benchmarks.json'
import videosData from './videos.json'
import sourcesData from './sources.json'
import guideData from './resume-guide.json'
import risingData from './rising.json'
import founderPicksData from './founder-picks.json'
import discoveryData from './discovery.json'

export type ListStatus = 'counts' | 'stale' | 'owner-conflict' | 'ranks-itself' | 'lead-page'
export type Stance = 'agrees' | 'breaks' | 'thin'
export type VideoKind = 'vendor' | 'independent' | 'comparison'
export type SourceStatus = 'foundation' | 'secondary' | 'permission-pending' | 'excluded'

export interface BenchmarkPick {
  tool?: string
  name?: string
  position?: number
}

export interface BenchmarkList {
  id: string
  publication: string
  title: string
  url: string
  covers: string[]
  format: string
  picks: BenchmarkPick[]
  picksComplete: boolean
  edition: string
  status: ListStatus
  reason: string
  checked: string
  verified: boolean
}

export interface Video {
  tool: string
  youtubeId: string
  title: string
  kind: VideoKind
  basis: string
  year: number | null
  featured: boolean
  verified: boolean
}

export interface Source {
  id: string
  name: string
  role: string
  status: SourceStatus
  reads: string
  rule: string
  family?: string[]
}

export interface Rating {
  platform: string
  rating: number
  reviews: number
  asOf: string
  sourceStatus: SourceStatus
  /** Present when this rating was dropped to avoid double counting. */
  droppedBecause?: string
}

export interface Appearance {
  list: BenchmarkList
  position?: number
}

export interface ToolEvidence {
  id: string
  name: string
  domain: string
  segment: 'checker' | 'builder'
  rank: number | null
  ratings: Rating[]
  citableReviews: number
  enoughEvidence: boolean
  userScore: number | null
  marketScore: number
  practitionerScore: number
  overall: number | null
  freeTier: string
  pricing: string
  bestFor: string
  pricingLine: string
  /** Plain answer to "Is it free?", written by the editor. */
  freeAnswer: string
  call: { stance: Stance; line: string }
  verdict: { bestIf: string; skipIf: string; like: string; watch: string } | null
  walkthrough: { date: string; by: string } | null
  yearCost: YearCost | null
  counted: Appearance[]
  notCounted: Appearance[]
  videos: Video[]
  headlineRating: string | null
  dataNotes: string
}

export interface YearCost {
  amount: number
  how: string
  renewsEvery4Weeks: boolean
  /** True when the vendor only publishes an approximate price. */
  approx?: boolean
}

export type GridCell =
  | { state: 'named'; label: string }
  | { state: 'not-named' }
  | { state: 'unknown' }
  | { state: 'not-covered' }

export const WEIGHTS = { market: 0.25, user: 0.35, practitioner: 0.4 }
export const MIN_REVIEWS = 25

export const STATUS_LABEL: Record<ListStatus, string> = {
  counts: 'Counts',
  stale: 'Out of date',
  'owner-conflict': 'Owner conflict',
  'ranks-itself': 'Ranks itself',
  'lead-page': 'Lead page',
}

export const STANCE_LABEL: Record<Stance, string> = {
  agrees: 'Agrees with the field',
  breaks: 'Breaks from the pack',
  thin: 'Too little evidence',
}

export const VIDEO_KIND_LABEL: Record<VideoKind, string> = {
  vendor: 'Made by the company',
  independent: 'Independent creator',
  comparison: 'Side-by-side test',
}

export const sources = sourcesData.sources as Source[]
export const benchmarks = benchmarksData.lists as BenchmarkList[]
export const videos = videosData.videos as Video[]
export const guide = guideData

/** Platform name as written in the scorecards -> source id in sources.json. */
const PLATFORM_SOURCE: Record<string, string> = {
  G2: 'g2',
  Capterra: 'g2',
  GetApp: 'g2',
  'Software Advice': 'g2',
  'Chrome Web Store': 'chrome-web-store',
  'Google Play': 'google-play',
  'App Store': 'app-store',
  'Product Hunt': 'product-hunt',
  TrustRadius: 'trustradius',
}

const G2_FAMILY = new Set(['Capterra', 'GetApp', 'Software Advice'])

export function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function sourceStatusFor(platform: string): SourceStatus {
  const id = PLATFORM_SOURCE[platform]
  const s = sources.find((x) => x.id === id)
  return s ? s.status : 'excluded'
}

/**
 * The G2 family shares one review pool. If a tool has a G2 rating, any
 * Capterra, GetApp or Software Advice rating is dropped so the same reviews
 * are not counted twice. Excluded sources never count.
 */
export function usableRatings(raw: { platform: string; rating: number; reviews: number; as_of: string }[]): Rating[] {
  const hasG2 = raw.some((r) => r.platform === 'G2')
  return raw.map((r) => {
    const rating: Rating = {
      platform: r.platform,
      rating: r.rating,
      reviews: r.reviews,
      asOf: r.as_of,
      sourceStatus: sourceStatusFor(r.platform),
    }
    if (hasG2 && G2_FAMILY.has(r.platform)) {
      rating.droppedBecause = 'Shares G2’s review pool, so it is counted once, as G2.'
    } else if (rating.sourceStatus === 'excluded') {
      rating.droppedBecause = 'Source excluded by policy.'
    }
    return rating
  })
}

function round(n: number, places = 2): number {
  const f = 10 ** places
  return Math.round(n * f) / f
}

export function userScoreFrom(ratings: Rating[]): { score: number | null; citable: number } {
  const used = ratings.filter((r) => !r.droppedBecause)
  const citable = used.reduce((s, r) => s + r.reviews, 0)
  if (citable < MIN_REVIEWS) return { score: null, citable }
  const weighted = used.reduce((s, r) => s + r.rating * r.reviews, 0) / citable
  return { score: round(weighted), citable }
}

export function overallFrom(market: number, user: number | null, practitioner: number): number | null {
  if (user === null) return null
  return round(WEIGHTS.market * market + WEIGHTS.user * user + WEIGHTS.practitioner * practitioner)
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US')
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1))
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

export function formatMonth(iso: string): string {
  const [y, m] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(y, (m || 1) - 1, 1))
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

/** "4.9 across 3,200 Chrome Web Store ratings": the largest usable source. */
function headline(ratings: Rating[]): string | null {
  const used = ratings.filter((r) => !r.droppedBecause)
  if (!used.length) return null
  const top = [...used].sort((a, b) => b.reviews - a.reviews)[0]
  if (top.reviews < MIN_REVIEWS) return null
  return `${top.rating} across ${formatCount(top.reviews)} ${top.platform} ratings`
}

function appearancesFor(toolId: string): { counted: Appearance[]; notCounted: Appearance[] } {
  const counted: Appearance[] = []
  const notCounted: Appearance[] = []
  for (const list of benchmarks) {
    const pick = list.picks.find((p) => p.tool === toolId)
    if (!pick) continue
    const a: Appearance = { list, position: pick.position }
    if (list.status === 'counts') counted.push(a)
    else notCounted.push(a)
  }
  return { counted, notCounted }
}

type ScorecardTool = (typeof scorecard.tools)[number]

interface EditorialTool {
  bestFor: string
  pricingLine: string
  freeAnswer: string
  call: { stance: Stance; line: string }
  verdict: { bestIf: string; skipIf: string; like: string; watch: string } | null
  walkthrough: { date: string; by: string } | null
  yearCost?: YearCost
}

const editorialTools = guide.tools as unknown as Record<string, EditorialTool>

function build(tool: ScorecardTool): ToolEvidence {
  const id = slug(tool.name)
  const editorial = editorialTools[id]
  if (!editorial) throw new Error(`resume-guide.json has no entry for ${id}`)
  const ratings = usableRatings(tool.sources.ratings as { platform: string; rating: number; reviews: number; as_of: string }[])
  const { score: userScore, citable } = userScoreFrom(ratings)
  const marketScore = tool.computed.market_traction_score
  const practitionerScore = tool.product_score_draft
  const { counted, notCounted } = appearancesFor(id)
  return {
    id,
    name: tool.name,
    domain: tool.domain,
    segment: tool.segment as 'checker' | 'builder',
    rank: null,
    ratings,
    citableReviews: citable,
    enoughEvidence: userScore !== null,
    userScore,
    marketScore,
    practitionerScore,
    overall: overallFrom(marketScore, userScore, practitionerScore),
    freeTier: tool.sources.free_tier,
    pricing: tool.sources.pricing,
    bestFor: editorial.bestFor,
    pricingLine: editorial.pricingLine,
    freeAnswer: editorial.freeAnswer,
    call: editorial.call as { stance: Stance; line: string },
    verdict: editorial.verdict,
    walkthrough: editorial.walkthrough as { date: string; by: string } | null,
    yearCost: editorial.yearCost ?? null,
    counted,
    notCounted,
    videos: videos.filter((v) => v.tool === id),
    headlineRating: headline(ratings),
    dataNotes: tool.data_notes,
  }
}

/** Rank inside each segment: overall score first, thin-evidence tools last by practitioner score. */
function rankSegment(tools: ToolEvidence[]): ToolEvidence[] {
  const sorted = [...tools].sort((a, b) => {
    if (a.overall !== null && b.overall !== null) return b.overall - a.overall
    if (a.overall !== null) return -1
    if (b.overall !== null) return 1
    return b.practitionerScore - a.practitionerScore
  })
  return sorted.map((t, i) => ({ ...t, rank: i + 1 }))
}

export function resumeTools(): { checkers: ToolEvidence[]; builders: ToolEvidence[]; all: ToolEvidence[] } {
  const built = scorecard.tools.map(build)
  const checkers = rankSegment(built.filter((t) => t.segment === 'checker'))
  const builders = rankSegment(built.filter((t) => t.segment === 'builder'))
  return { checkers, builders, all: [...checkers, ...builders] }
}

export function resumeLists(): BenchmarkList[] {
  const order: ListStatus[] = ['counts', 'stale', 'lead-page', 'owner-conflict', 'ranks-itself']
  return [...benchmarks].sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))
}

/** True while any list or video on the page still rests on search listings rather than the live page. */
export function hasUnverified(): boolean {
  return benchmarks.some((l) => !l.verified) || videos.some((v) => !v.verified)
}

export function latestCheck(): string {
  const log = guide.refreshLog
  return log[log.length - 1].date
}

const SEGMENT_COVER: Record<ToolEvidence['segment'], string> = { checker: 'checkers', builder: 'builders' }

/**
 * One cell of the agreement grid: did this list name this tool?
 * A list we have not read in full never claims a tool is missing.
 */
export function gridCell(t: ToolEvidence, list: BenchmarkList): GridCell {
  const pick = list.picks.find((p) => p.tool === t.id)
  if (pick) return { state: 'named', label: pick.position ? `#${pick.position}` : 'Pick' }
  if (!list.covers.includes(SEGMENT_COVER[t.segment])) return { state: 'not-covered' }
  return list.picksComplete ? { state: 'not-named' } : { state: 'unknown' }
}

/** True when no counting list names the tool but at least one relevant list has not been read in full. */
export function absenceUnconfirmed(t: ToolEvidence): boolean {
  if (t.counted.length > 0) return false
  return benchmarks.some(
    (l) => l.status === 'counts' && l.covers.includes(SEGMENT_COVER[t.segment]) && !l.picksComplete,
  )
}

export interface RisingPick {
  tool: string
  label: string
  line: string
  confirmed: boolean
}

export const risingPick = (guide as unknown as { risingPick: RisingPick }).risingPick

export interface RisingEvidence {
  publication: string
  domain: string
  note: string
  date: string
  url: string
}

export interface RisingTool {
  /** Why it is on our radar: trigger ids from discovery.json. */
  trigger: string[]
  /** The month its next check is due, YYYY-MM. */
  checkDue: string
  /** The scoreboard it would rank on; null means its category has no board yet. */
  board: string | null
  /** For a tool with enough reviews: what still stands between it and a score. */
  missing?: string
  /** Partial scoring done so far (live reads), kept until the last input arrives. */
  scoring?: Record<string, string | number>
  id: string
  name: string
  domain: string
  side: 'seekers' | 'hiring'
  category: string
  what: string
  evidence: RisingEvidence[]
  /** Citable reviews counted so far; null until the first full check. */
  citableReviews: number | null
  watchingSince: string
  verified: boolean
}

/** On the rise: honorable mentions that have no score yet. Never ranked. */
export const rising = {
  minReviews: risingData.minReviews,
  tools: risingData.tools as RisingTool[],
}

/** A pricing plan, for the cost calculator. days: how long one payment covers; once: never renews. */
export interface Plan {
  label: string
  price: number
  days: number
  once?: boolean
  /** A trial can only be bought once, at the start. */
  trial?: boolean
}

const plansById = (guideData as unknown as { plans: Record<string, Plan[]> }).plans

export function plansFor(id: string): Plan[] {
  return plansById[id] ?? []
}

/**
 * The cheapest way to pay for `days` of use, choosing among a tool's plans,
 * with a trial (if any) used once at the start. Returns null if the tool
 * has no paid plans on file.
 */
export function cheapestCover(id: string, days: number): { total: number; steps: string[] } | null {
  const plans = plansFor(id)
  if (!plans.length) return null
  const repeatable = plans.filter((p) => !p.trial)
  const trial = plans.find((p) => p.trial)
  const solve = (need: number): { total: number; steps: string[] } => {
    // best[d]: the cheapest way to cover d days with plans that can repeat
    const best: { total: number; steps: string[] }[] = [{ total: 0, steps: [] }]
    for (let d = 1; d <= need; d++) {
      let pick = { total: Infinity, steps: [] as string[] }
      for (const p of repeatable) {
        const prev = p.once ? best[0] : best[Math.max(0, d - p.days)]
        const total = prev.total + p.price
        if (total < pick.total) pick = { total, steps: [...prev.steps, p.label] }
      }
      best[d] = pick
    }
    return best[need]
  }
  if (!trial) {
    const plain = solve(days)
    return { total: round(plain.total), steps: plain.steps }
  }
  // Sign-up starts with the trial, which renews into the paid plan.
  const rest = solve(Math.max(0, days - trial.days))
  return { total: round(trial.price + rest.total), steps: [trial.label, ...rest.steps] }
}

/** A search year: twelve 30-day months, matching the calculator. */
export const SEARCH_YEAR_DAYS = 360

/**
 * What the first year costs if you pay the cheapest way for `days` and
 * then forget to cancel: the last plan you bought keeps renewing until the
 * year is covered. A plan paid once never renews.
 */
export function forgetCost(id: string, days: number): number | null {
  const cover = cheapestCover(id, days)
  if (!cover) return null
  const plans = plansFor(id)
  const bought = cover.steps.map((label) => plans.find((p) => p.label === label)!)
  const last = bought[bought.length - 1]
  if (!last || last.once) return cover.total
  const covered = bought.reduce((s, p) => s + p.days, 0)
  const renewals = Math.max(0, Math.ceil((SEARCH_YEAR_DAYS - covered) / last.days))
  return round(cover.total + renewals * last.price)
}

export interface HiringPick {
  citableReviews: number | null
  scoring?: Record<string, string | number>
  trigger: string[]
  checkDue: string
  board: string | null
  id: string
  name: string
  domain: string
  url: string
  category: string
  label: string
  line: string
  confirmed: boolean
  scoreStatus: string
  facts: string
  evidence: { source: string; note: string; url: string }[]
  verified: boolean
}

/** Stephanie's pick for hiring teams: editorial, shown beside the evidence, never changes a score. */
export const hiringPick = founderPicksData.hiring as HiringPick

export interface DiscoveryTrigger {
  id: string
  label: string
  note: string
}

export const discovery = discoveryData as {
  rules: string[]
  triggers: DiscoveryTrigger[]
  notSignals: { label: string; why: string }[]
}

export interface QueueItem {
  id: string
  name: string
  domain: string
  side: 'seekers' | 'hiring'
  category: string
  triggers: DiscoveryTrigger[]
  checkDue: string
  board: string | null
  citableReviews: number | null
  overdue: boolean
  founderPick: boolean
}

/**
 * The coverage check behind /desk: every tool on the radar, why it's there,
 * whether its check is overdue, and which categories have no board.
 * "Overdue" means its due month has passed and it still has no review count.
 */
export function coverageReport(today = latestCheck()) {
  const month = today.slice(0, 7)
  const trig = (ids: string[]) => ids.map((id) => discovery.triggers.find((t) => t.id === id)).filter(Boolean) as DiscoveryTrigger[]
  const queue: QueueItem[] = [
    {
      id: hiringPick.id,
      name: hiringPick.name,
      domain: hiringPick.domain,
      side: 'hiring' as const,
      category: hiringPick.category,
      triggers: trig(hiringPick.trigger),
      checkDue: hiringPick.checkDue,
      board: hiringPick.board,
      citableReviews: hiringPick.citableReviews,
      overdue: hiringPick.checkDue < month && hiringPick.citableReviews === null,
      founderPick: true,
    },
    ...rising.tools.map((t) => ({
      id: t.id,
      name: t.name,
      domain: t.domain,
      side: t.side,
      category: t.category,
      triggers: trig(t.trigger),
      checkDue: t.checkDue,
      board: t.board,
      citableReviews: t.citableReviews,
      overdue: t.checkDue < month && t.citableReviews === null,
      founderPick: false,
    })),
  ]
  const gaps = new Map<string, QueueItem[]>()
  for (const q of queue) if (q.board === null) gaps.set(q.category, [...(gaps.get(q.category) ?? []), q])
  return {
    month,
    queue,
    overdue: queue.filter((q) => q.overdue),
    categoryGaps: [...gaps.entries()].map(([category, tools]) => ({ category, tools })),
  }
}
