import followData from '@/lib/evidence/follow.json'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { WEIGHTS, latestCheck, atsScores, type ToolEvidence } from '@/lib/evidence'
import { seekerBoard, hiringBoard } from './data'

/**
 * Machine-readable copies of what each page says (schema.org JSON-LD), so
 * search engines and AI assistants read the scores, rankings and people
 * exactly as a visitor sees them. Built from the same data as the page.
 * Our own score is published as our Review; users' ratings from other sites
 * are listed as plain facts (additionalProperty), never as an
 * aggregateRating we didn't collect ourselves.
 */

export const SITE = 'https://hiring.productions'
const ORG = { '@id': `${SITE}/#organization` }

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

function prop(name: string, value: string | number) {
  return { '@type': 'PropertyValue', name, value }
}

/** One tool, reviewed: our score as a Review, the four parts and the user facts as properties. */
export function toolReviewLd(t: ToolEvidence) {
  const page = `${SITE}/reviews/${t.id}`
  const props = [
    t.rawUserScore !== null ? prop("Users' average rating (out of 5)", t.rawUserScore) : null,
    prop('Citable user reviews counted', t.citableReviews),
    t.userScore !== null ? prop(`Users score (${WEIGHTS.user * 100}% of overall)`, t.userScore) : null,
    prop(`Popularity score (${WEIGHTS.market * 100}% of overall)`, t.marketScore),
    prop(`Best-of lists score (${WEIGHTS.critics * 100}% of overall)`, t.criticsScore),
    prop(`Value score (${WEIGHTS.value * 100}% of overall)`, t.valueScore),
    t.yearCost ? prop('Cheapest paid year (USD)', t.yearCost.amount) : null,
    t.yearCost?.renewsEvery4Weeks ? prop('Billing', 'Renews every 4 weeks (13 charges a year)') : null,
    prop('Free version', t.freeAnswer),
    prop('Independent lists that name it', t.counted.map((a) => a.list.publication).join(', ') || 'None found yet'),
  ].filter(Boolean)
  return {
    '@type': 'SoftwareApplication',
    '@id': `${page}#tool`,
    name: t.name,
    url: `https://${t.domain}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: t.segment === 'checker' ? 'ATS resume checker' : 'Resume builder',
    operatingSystem: 'Web',
    additionalProperty: props,
    ...(t.overall !== null
      ? {
          review: {
            '@type': 'Review',
            url: page,
            author: ORG,
            publisher: ORG,
            datePublished: latestCheck(),
            reviewBody: t.call.line,
            reviewRating: { '@type': 'Rating', ratingValue: t.overall, bestRating: 5, worstRating: 1 },
          },
        }
      : {}),
  }
}

/** A ranked list (a scoreboard or a standings table). */
export function rankingLd(name: string, url: string, items: { name: string; url: string; score: number | null }[]) {
  return {
    '@type': 'ItemList',
    name,
    url,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.score !== null ? `${it.name} (${it.score.toFixed(2)} out of 5)` : it.name,
      url: it.url,
    })),
  }
}

/** The resume tool scoreboard, best first. */
export function resumeRankingLd() {
  return rankingLd(
    'Best resume tools, ranked by public data (users, market, critics, value)',
    `${SITE}/guides/best-resume-tools`,
    seekerBoard().map((r) => ({ name: r.name, url: `${SITE}${r.href}`, score: r.score })),
  )
}

/** The applicant tracking system standings, best first. */
export function atsRankingLd() {
  return rankingLd(
    'Best applicant tracking systems for small and growing teams, ranked by public data (users, market, value)',
    `${SITE}/guides/best-ats-for-small-teams`,
    hiringBoard().map((r) => ({ name: r.name, url: `https://${r.domain}`, score: r.score })),
  )
}

const TEAM: Record<string, string> = { small: 'Small teams', growing: 'Growing teams', scaling: 'Scaling teams' }

/** Each applicant tracking system with its computed parts. */
export function atsToolsLd() {
  return ats.tools.map((t) => {
    const sc = atsScores(t)
    return {
      '@type': 'SoftwareApplication',
      name: t.name,
      url: `https://${t.domain}`,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Applicant tracking system',
      operatingSystem: 'Web',
      additionalProperty: [
        prop('Best for', TEAM[t.segment] ?? 'All teams'),
        prop('Overall score (out of 5)', Number(sc.overall.toFixed(2))),
        prop('Users score', Number(sc.user.toFixed(2))),
        prop('Popularity score', Number(sc.market.toFixed(2))),
        prop('Value score', Number(sc.value.toFixed(2))),
        prop('Pricing', t.sources.pricing),
      ],
    }
  })
}

/** Who to follow, as people with their own profile links. */
export function peopleLd() {
  const people = followData.people as { id: string; name: string; known: string; side: string; why: string; photo: string | null; links: { url: string }[] }[]
  return {
    '@type': 'ItemList',
    name: 'Who to follow: the best in talent acquisition, and the most helpful voices for job seekers',
    url: `${SITE}/who-to-follow`,
    numberOfItems: people.length,
    itemListElement: people.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: p.name,
        description: `${p.known}. ${p.why}`,
        ...(p.photo ? { image: `${SITE}${p.photo}` } : {}),
        url: p.links[0]?.url,
        sameAs: p.links.map((l) => l.url),
        knowsAbout: p.side === 'hiring' ? 'Talent acquisition' : 'Job search',
      },
    })),
  }
}

export function graph(...nodes: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
