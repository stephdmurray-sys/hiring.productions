import ats from '@/lib/scorecards/ats-small-teams.json'
import videosData from '@/lib/evidence/ats-videos.json'
import { html as guideHtml } from '@/app/(rebrand)/_html/guide-ats'
import { atsScores } from '@/lib/evidence'

/**
 * One profile per applicant tracking system, for its review page. Scores
 * come from the scorecard data (atsScores); the "best for" line, starting
 * price, free option and written verdict come from the ATS guide itself,
 * so the guide and the review pages can never say different things.
 */

export type AtsTool = (typeof ats.tools)[number]
export type AtsVideo = { tool: string; youtubeId: string; title: string; kind: 'vendor' | 'independent'; channel: string }

export const ATS_TIER: Record<string, string> = { small: 'Small teams', growing: 'Growing teams', scaling: 'Scaling teams' }
export const ATS_TIER_DETAIL: Record<string, string> = {
  small: 'under 20 hires a year',
  growing: '20 to 50 hires a year',
  scaling: 'more than 50 hires a year',
}

export const atsSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const atsReviewHref = (name: string) => `/reviews/ats/${atsSlug(name)}`

function text(s: string) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&euro;/g, '€')
    .replace(/&rsquo;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;|&#\d+;/g, '')
    .replace(/[†*]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

interface GuideRow {
  bestFor: string
  startingPrice: string
  freeOption: string
}
interface GuideVerdict {
  bestIf?: string
  skipIf?: string
  like?: string
  watch?: string
}

const rows: Record<string, GuideRow> = {}
for (const m of guideHtml.matchAll(/<tr><td>\d+<\/td>([\s\S]*?)<\/tr>/g)) {
  const cells = [...m[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((c) => c[1])
  const name = text(cells[0]?.match(/<b>([\s\S]*?)<\/b>/)?.[1] ?? '')
  if (name && cells.length >= 4) rows[name] = { bestFor: text(cells[1]), startingPrice: text(cells[2]), freeOption: text(cells[3]) }
}

const verdicts: Record<string, GuideVerdict> = {}
for (const block of guideHtml.split('<div class="review">').slice(1)) {
  const name = text(block.match(/class="review-name">([\s\S]*?)<\/span>/)?.[1] ?? '')
  if (!name) continue
  const get = (key: string) => {
    const m = block.match(new RegExp(`<span class="v-key[^"]*">${key}</span><span class="v-val">([\\s\\S]*?)</span>`))
    return m ? text(m[1]) : undefined
  }
  verdicts[name] = { bestIf: get('Best if'), skipIf: get('Skip it if'), like: get('What we like'), watch: get('Watch for') }
}

const videos = (videosData as { videos: AtsVideo[] }).videos
export const atsVideosChecked = (videosData as { checked: string }).checked

export interface AtsProfile {
  t: AtsTool
  slug: string
  tier: string
  scores: ReturnType<typeof atsScores>
  rank: number
  tierCount: number
  isLeader: boolean
  row?: GuideRow
  verdict?: GuideVerdict
  videos: AtsVideo[]
  growth: number | null
}

export function atsInTier(segment: string): AtsTool[] {
  return ats.tools.filter((x) => x.segment === segment).sort((a, b) => atsScores(b).overall - atsScores(a).overall)
}

export function atsProfiles(): AtsProfile[] {
  return ats.tools.map((t) => {
    const tier = atsInTier(t.segment)
    const g = t.momentum && typeof t.momentum.annualized_growth === 'number' ? t.momentum.annualized_growth : null
    return {
      t,
      slug: atsSlug(t.name),
      tier: t.segment,
      scores: atsScores(t),
      rank: tier.findIndex((x) => x.name === t.name) + 1,
      tierCount: tier.length,
      isLeader: tier[0]?.name === t.name,
      row: rows[t.name],
      verdict: verdicts[t.name],
      videos: videos.filter((v) => v.tool === t.name),
      growth: g,
    }
  })
}

export function atsProfile(slug: string): AtsProfile | undefined {
  return atsProfiles().find((p) => p.slug === slug)
}

export const atsAsOfDate = ats.as_of
