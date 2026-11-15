import { FREE_LEVEL_LABEL, FREE_LEVEL_SCORE, cheapestCover, latestCheck, resumeTools, type ToolEvidence, type VideoKind } from '@/lib/evidence'
import { atsYear } from '@/lib/evidence/recommend'
import { ATS_TIER, atsAsOfDate, atsInTier, atsProfile, atsSlug, type AtsProfile } from '@/lib/ats-profiles'

/**
 * "X vs Y" pages: every pair of rated tools that actually compete. Resume
 * builders against builders, checkers against checkers, and applicant
 * tracking systems within the same team size. Every "who wins" line is
 * computed from the same data as the scoreboards; nothing is written by
 * hand, so the comparison can't drift from the reviews.
 */

export type ComparePair = { slug: string; kind: 'resume' | 'ats'; a: string; b: string; searched?: boolean }

/**
 * Pairs people search for even though the tools sit in different groups (Nov 15, 2026): a resume checker
 * against a builder, or systems we rank for different team sizes. Same scores and prices as every other
 * comparison, with a plain note on what makes the two different.
 */
const SEARCHED_PAIRS: { kind: 'resume' | 'ats'; a: string; b: string }[] = [
  { kind: 'resume', a: 'teal', b: 'kickresume' },
  { kind: 'ats', a: 'manatal', b: 'greenhouse' },
]

const resumeSlug = (t: ToolEvidence) => t.id

export function comparePairs(): ComparePair[] {
  const out: ComparePair[] = []
  const { checkers, builders } = resumeTools()
  for (const group of [checkers, builders]) {
    const rated = group.filter((t) => t.overall !== null).sort((x, y) => (y.overall ?? 0) - (x.overall ?? 0))
    for (let i = 0; i < rated.length; i++)
      for (let j = i + 1; j < rated.length; j++)
        out.push({ slug: `${resumeSlug(rated[i])}-vs-${resumeSlug(rated[j])}`, kind: 'resume', a: rated[i].id, b: rated[j].id })
  }
  for (const tier of ['small', 'growing', 'scaling']) {
    const ts = atsInTier(tier)
    for (let i = 0; i < ts.length; i++)
      for (let j = i + 1; j < ts.length; j++)
        out.push({ slug: `${atsSlug(ts[i].name)}-vs-${atsSlug(ts[j].name)}`, kind: 'ats', a: atsSlug(ts[i].name), b: atsSlug(ts[j].name) })
  }
  for (const s of SEARCHED_PAIRS) if (!out.some((p) => (p.a === s.a && p.b === s.b) || (p.a === s.b && p.b === s.a))) out.push({ ...s, slug: `${s.a}-vs-${s.b}`, searched: true })
  return out
}

export function comparePair(slug: string): ComparePair | undefined {
  return comparePairs().find((p) => p.slug === slug)
}

/** Every comparison a tool appears in, for links from its review page. */
export function comparisonsFor(kind: 'resume' | 'ats', id: string): { slug: string; label: string }[] {
  return comparePairs()
    .filter((p) => p.kind === kind && (p.a === id || p.b === id))
    .map((p) => {
      const c = buildComparison(p.slug)!
      return { slug: p.slug, label: `${c.a.name} vs ${c.b.name}` }
    })
}

export const compareHref = (slug: string) => `/compare/${slug}`

const money = (n: number) => (n % 1 === 0 ? `$${n.toLocaleString('en-US')}` : `$${n.toFixed(2)}`)

export interface Side {
  name: string
  domain: string
  href: string
  overall: number
  parts: { label: string; value: number | null }[]
  bestFor: string
  free: string
  freeScore: number
  costLabel: string
  /** In US dollars; null when the price is a quote or in another currency. */
  cost: number | null
  /** The price as listed, in any currency; null when there's no listed price. */
  costShown: string | null
  costHow: string
  renews4w: boolean
  bestIf?: string
  skipIf?: string
  videos: { youtubeId: string; title: string; kind: VideoKind; channel?: string }[]
  goId: string
}

function summarizeSteps(steps: string[]): string {
  const counts = new Map<string, number>()
  for (const s of steps) counts.set(s, (counts.get(s) ?? 0) + 1)
  return [...counts.entries()].map(([label, n]) => (n > 1 ? `${n} × ${label.toLowerCase()}` : label)).join(', then ')
}

function resumeSide(t: ToolEvidence): Side {
  const c = cheapestCover(t.id, 90)
  return {
    name: t.name,
    domain: t.domain,
    href: `/reviews/${t.id}`,
    overall: t.overall ?? 0,
    parts: [
      { label: 'Users', value: t.userScore },
      { label: 'Popularity', value: t.marketScore },
      { label: 'Best-of lists', value: t.criticsScore },
      { label: 'Value', value: t.valueScore },
    ],
    bestFor: t.bestFor,
    free: FREE_LEVEL_LABEL[t.freeLevel],
    freeScore: FREE_LEVEL_SCORE[t.freeLevel],
    costLabel: '3 months, paid',
    cost: c ? c.total : null,
    costShown: c ? money(c.total) : null,
    costHow: c ? summarizeSteps(c.steps) : 'No paid plan on file',
    renews4w: !!t.yearCost?.renewsEvery4Weeks,
    bestIf: t.verdict?.bestIf,
    skipIf: t.verdict?.skipIf,
    videos: t.videos.slice(0, 1).map((v) => ({ youtubeId: v.youtubeId, title: v.title, kind: v.kind, channel: v.channel })),
    goId: t.id,
  }
}

function atsSide(p: AtsProfile): Side {
  const y = atsYear(p.t.name, 3)
  return {
    name: p.t.name,
    domain: p.t.domain,
    href: `/reviews/ats/${p.slug}`,
    overall: p.scores.overall,
    parts: [
      { label: 'Users', value: p.scores.user },
      { label: 'Popularity', value: p.scores.market },
      { label: 'Value', value: p.scores.value },
    ],
    bestFor: p.row?.bestFor ?? ATS_TIER[p.tier],
    free: p.t.sources.free_tier ? 'Free plan' : p.row?.freeOption === 'Trial' ? 'Free trial, no free plan' : 'No free plan',
    freeScore: p.t.sources.free_tier ? 5 : p.row?.freeOption === 'Trial' ? 3 : 1,
    costLabel: 'A year, 3 users',
    cost: y && y.currency === 'USD' ? y.amount : null,
    costShown: y ? (y.currency === 'USD' ? money(Math.round(y.amount)) : `${y.currency} ${Math.round(y.amount).toLocaleString('en-US')}`) : null,
    costHow: y ? y.how : 'No listed price: you have to ask for a quote',
    renews4w: false,
    bestIf: p.verdict?.bestIf,
    skipIf: p.verdict?.skipIf,
    videos: p.videos.slice(0, 1).map((v) => ({ youtubeId: v.youtubeId, title: v.title, kind: v.kind, channel: v.channel })),
    goId: p.slug,
  }
}

/** A win is a fact one side has over the other. `says` is how it reads after the tool's name. */
export interface Win {
  what: string
  winner: string | null
  line: string
  says?: string
}

export interface Comparison {
  pair: ComparePair
  a: Side
  b: Side
  group: string
  /** For a searched pair across groups: what makes the two different, in plain words. */
  note?: string
  asOf: string
  wins: Win[]
  verdict: string
}

/** Score gaps smaller than this are a tie: the data can't tell them apart. */
const TIE = 0.05

export function buildComparison(slug: string): Comparison | undefined {
  const pair = comparePair(slug)
  if (!pair) return undefined
  let a: Side, b: Side, group: string, asOf: string
  let note: string | undefined
  if (pair.kind === 'resume') {
    const all = resumeTools().all
    const ta = all.find((t) => t.id === pair.a)!
    const tb = all.find((t) => t.id === pair.b)!
    a = resumeSide(ta)
    b = resumeSide(tb)
    group = pair.searched ? 'resume tools' : ta.segment === 'checker' ? 'resume checkers' : 'resume builders'
    if (pair.searched) note = `${ta.name} is ranked with resume ${ta.segment}s and ${tb.name} with resume ${tb.segment}s, scored the same way. ${ta.name}: ${lower(ta.bestFor)}. ${tb.name}: ${lower(tb.bestFor)}.`
    asOf = latestCheck()
  } else {
    const pa = atsProfile(pair.a)!
    const pb = atsProfile(pair.b)!
    a = atsSide(pa)
    b = atsSide(pb)
    group = pair.searched ? 'applicant tracking systems' : `applicant tracking systems for ${ATS_TIER[pa.tier].toLowerCase()}`
    if (pair.searched)
      note = `We rank ${pa.t.name} for ${ATS_TIER[pa.tier].toLowerCase()} and ${pb.t.name} for ${ATS_TIER[pb.tier].toLowerCase()}. They’re scored the same way, so the numbers compare, but each is built for a different size of team.`
    asOf = atsAsOfDate
  }
  const wins: Win[] = []
  const hi = a.overall >= b.overall ? a : b
  const lo = hi === a ? b : a
  const tied = hi.overall - lo.overall < TIE
  wins.push({
    what: tied ? 'Rated about the same' : 'Rated higher',
    winner: tied ? null : hi.name,
    line: `${hi.name} ${hi.overall.toFixed(2)}, ${lo.name} ${lo.overall.toFixed(2)} out of 5.`,
  })
  if (a.cost !== null && b.cost !== null) {
    const cheap = a.cost <= b.cost ? a : b
    const dear = cheap === a ? b : a
    const close = dear.cost! - cheap.cost! < Math.max(5, dear.cost! * 0.05)
    wins.push({
      what: close ? 'Costs about the same' : 'Costs less',
      winner: close ? null : cheap.name,
      line: `${pair.kind === 'resume' ? 'For a 3-month search' : 'A year for 3 users'}: ${cheap.name} ${cheap.costShown}, ${dear.name} ${dear.costShown}.`,
      says: close ? undefined : `costs ${money(Math.round(dear.cost! - cheap.cost!))} less`,
    })
  } else if (!a.costShown !== !b.costShown) {
    const listed = a.costShown ? a : b
    const other = listed === a ? b : a
    wins.push({
      what: 'Lists its price',
      winner: listed.name,
      line: `${listed.name} publishes its price. ${other.name} makes you ask for a quote.`,
      says: 'publishes its price',
    })
  }
  if (a.freeScore !== b.freeScore) {
    const better = a.freeScore > b.freeScore ? a : b
    const worse = better === a ? b : a
    wins.push({
      what: 'Better free option',
      winner: better.name,
      line: `${better.name}: ${lower(better.free)}. ${worse.name}: ${lower(worse.free)}.`,
      says:
        pair.kind === 'resume'
          ? better.freeScore === 5
            ? 'has a free version you can really use'
            : 'has a capped free version'
          : better.freeScore === 5
            ? 'has a free plan'
            : 'has a free trial',
    })
  }
  if (a.renews4w !== b.renews4w) {
    const trap = a.renews4w ? a : b
    const safe = trap === a ? b : a
    wins.push({
      what: 'No billing every 4 weeks',
      winner: safe.name,
      line: `${trap.name} renews every 4 weeks, which is 13 charges a year.`,
      says: 'doesn’t bill every 4 weeks',
    })
  }
  const userA = a.parts[0].value
  const userB = b.parts[0].value
  if (userA !== null && userB !== null && Math.abs(userA - userB) >= TIE) {
    const u = userA > userB ? a : b
    const other = u === a ? b : a
    wins.push({
      what: 'Users rate it higher',
      winner: u.name,
      line: `Users: ${u.name} ${Math.max(userA, userB).toFixed(1)}, ${other.name} ${Math.min(userA, userB).toFixed(1)} out of 5.`,
      says: 'gets better reviews from users',
    })
  }
  return { pair, a, b, group, note, asOf, wins, verdict: verdictFor(hi, lo, tied, wins) }
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

function listJoin(xs: string[]): string {
  return xs.length <= 1 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`
}

/** One or two plain sentences, built only from the wins above. */
function verdictFor(hi: Side, lo: Side, tied: boolean, wins: Win[]): string {
  const saysFor = (name: string) => wins.filter((w) => w.winner === name && w.says).map((w) => w.says!)
  const hiSays = saysFor(hi.name)
  const loSays = saysFor(lo.name)
  if (tied) {
    const parts = [hiSays.length ? `${hi.name} ${listJoin(hiSays)}` : '', loSays.length ? `${lo.name} ${listJoin(loSays)}` : ''].filter(Boolean)
    return `Rated about the same.${parts.length ? ` ${parts.join('; ')}.` : ''}`
  }
  const first = `${hi.name} ${listJoin(['is rated higher', ...hiSays])}.`
  return loSays.length ? `${first} ${lo.name} ${listJoin(loSays)}.` : first
}
