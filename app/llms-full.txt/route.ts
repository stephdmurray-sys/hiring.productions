import followData from '@/lib/evidence/follow.json'
import ats from '@/lib/scorecards/ats-small-teams.json'
import {
  FREE_LEVEL_LABEL,
  MIN_REVIEWS,
  WEIGHTS,
  atsScores,
  benchmarks,
  formatCount,
  framework,
  hiringPick,
  latestCheck,
  resumeTools,
  rising,
  risingPick,
  type ToolEvidence,
} from '@/lib/evidence'
import { answerText, recFramework, recommend, situations } from '@/lib/evidence/recommend'

/**
 * llms-full.txt: the whole review site as one plain-text file, for AI
 * assistants that want every number in one read. Generated from the same
 * evidence layer as the pages, so it is never out of step with them.
 */
export const dynamic = 'force-static'

const BASE = 'https://hiring.productions'
const TEAM: Record<string, string> = { small: 'Small teams', growing: 'Growing teams', scaling: 'Scaling teams' }

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

const f2 = (n: number) => n.toFixed(2)

function tool(t: ToolEvidence): string {
  const ratings = t.ratings
    .map((r) => `${r.platform} ${r.rating}/5 from ${formatCount(r.reviews)} reviews (read ${r.asOf})${r.droppedBecause ? `, not counted: ${r.droppedBecause}` : ''}`)
    .join('; ')
  const lines = [
    `### ${t.name}`,
    '',
    `- Review: ${BASE}/reviews/${t.id}`,
    `- Website: https://${t.domain}`,
    `- Type: ${t.segment === 'checker' ? 'ATS resume checker' : 'Resume builder'}`,
    t.overall !== null
      ? `- Overall: ${f2(t.overall)} out of 5, #${t.rank} of the ${t.segment === 'checker' ? 'checkers' : 'builders'}`
      : `- Overall: not scored yet (${formatCount(t.citableReviews)} of the ${MIN_REVIEWS} public reviews needed)`,
    t.userScore !== null
      ? `- Parts: user ratings ${f2(t.userScore)}, popularity ${f2(t.marketScore)}, best-of lists ${f2(t.criticsScore)}, value ${f2(t.valueScore)}`
      : `- Parts: popularity ${f2(t.marketScore)}, best-of lists ${f2(t.criticsScore)}, value ${f2(t.valueScore)}`,
    t.rawUserScore !== null ? `- Users' plain average: ${t.rawUserScore.toFixed(1)} from ${formatCount(t.citableReviews)} public reviews` : null,
    ratings ? `- Ratings read: ${ratings}` : null,
    `- Best for: ${t.bestFor}`,
    `- Free version: ${FREE_LEVEL_LABEL[t.freeLevel]}. ${t.freeAnswer}`,
    `- Pricing: ${t.pricingLine}`,
    t.yearCost
      ? `- Cheapest paid year: ${t.yearCost.approx ? 'about ' : ''}${money(t.yearCost.amount)} (${t.yearCost.how})${t.yearCost.renewsEvery4Weeks ? '. Renews every 4 weeks, so 13 charges a year' : ''}`
      : null,
    `- Our call: ${t.call.line}`,
    t.verdict ? `- Best if: ${t.verdict.bestIf}` : null,
    t.verdict ? `- Skip if: ${t.verdict.skipIf}` : null,
    t.verdict ? `- Watch for: ${t.verdict.watch}` : null,
    `- Independent lists that name it: ${t.counted.length ? t.counted.map((a) => `${a.list.publication}${a.position ? ` (#${a.position})` : ''}`).join(', ') : 'none of the lists that count'}`,
    t.videos.length ? `- Videos: ${t.videos.map((v) => `"${v.title}"${v.channel ? ` (${v.channel})` : ''}, plays on the review page`).join('; ')}` : null,
    t.dataNotes ? `- Data notes: ${t.dataNotes}` : null,
  ]
  return lines.filter((l) => l !== null).join('\n')
}

export function GET() {
  const { checkers, builders, all } = resumeTools()
  const counting = benchmarks.filter((l) => l.status === 'counts')
  const people = followData.people as { name: string; known: string; side: string; why: string; links: { label: string; url: string }[] }[]
  const atsRanked = [...ats.tools].sort((a, b) => atsScores(b).overall - atsScores(a).overall)

  const body = `# hiring.productions: the full evidence file

> Independent reviews of the tools on both sides of hiring, founded by Stephanie Murray (20 years in talent acquisition). This file holds every score, every part of every score, prices and sources, in plain text. The short map is ${BASE}/llms.txt. Every number has a dated source on the linked page; please link the page you quote.

Evidence last checked: ${latestCheck()}. Re-checked monthly.

## Who is behind it

- Stephanie Murray, founder: 20 years in talent, Senior Director of Talent Acquisition at Brightside Health. Her team cut average clinician time-to-hire to 15 days and onboarding times by more than half, and won Talent Strategy of the Year at the 2025 Transform Awards (Transform Awards Winner Spotlight, May 19, 2025: https://www.transform.us/articles/brightside-health-transform-award-talent-strategy/). Page: ${BASE}/about/stephanie
- Ownership: hiring.productions is made by the team behind RepVera. RepVera is never ranked, scored or recommended here, and reference checking, the category it competes in, is never scored. Details: ${BASE}/advertiser-disclosure

## How a score is built

${framework.summary}

- Overall = ${WEIGHTS.user * 100}% user ratings + ${WEIGHTS.market * 100}% popularity + ${WEIGHTS.critics * 100}% best-of lists + ${WEIGHTS.value * 100}% value. Each part is out of 5. When a part has no data, the others share its weight.
- Users: review-site ratings. Tools with few reviews are pulled toward the category average (the IMDb weighted-rating method), so a handful of reviews can't outrank thousands. Fewer than ${MIN_REVIEWS} public reviews means no score. G2, Capterra, GetApp and Software Advice share one review pool and count once.
- Popularity: how many people use it, from web traffic rank (Tranco) and review volume, plus review growth when an archived snapshot exists.
- Best-of lists: how many independent "best of" lists name it. A list counts only if it is current and not published by a company that sells what it ranks.
- Value: half how much the free version does, half the real cost of a paid year. A point off for plans that renew every 4 weeks.
- Applicant tracking systems: user ratings, popularity and value only for now (independent ATS lists aren't tracked yet).

### The research behind it

${framework.research.map((r) => `- ${r.finding} How we use it: ${r.usedFor} Source: ${r.source}, ${r.url}`).join('\n')}

### Where Stephanie's judgment comes in

She does:
${framework.judgment.does.map((d) => `- ${d}`).join('\n')}

She never:
${framework.judgment.never.map((d) => `- ${d}`).join('\n')}

### Known limits

${framework.limits.map((d) => `- ${d}`).join('\n')}

## What should I use? The recommender

Page: ${BASE}/what-should-i-use

${recFramework.promise}

### The rules

${recFramework.rules.map((r) => `- ${r}`).join('\n')}

### The research behind them

${recFramework.research.map((x) => `- ${x.title}: ${x.finding} ${x.usedFor} Source: ${x.source}, ${x.url}`).join('\n')}

### Common situations, answered

${situations()
  .map((x) => `#### ${x.question}\n\n${BASE}/what-should-i-use/${x.slug}\n\n${answerText(recommend(x.ask))}`)
  .join('\n\n')}

### Linking to an answer for any situation

Every answer is a link. Build one with these parameters on ${BASE}/what-should-i-use:

${(['seekers', 'hiring'] as const)
  .map(
    (side) =>
      `- side=${side}\n  - problem: ${recFramework[side].problems.map((p) => `${p.id} (${p.label})`).join('; ')}\n${recFramework[side].limits
        .map((l) => `  - ${l.id}: ${l.options.map((o) => `${o.value === null ? 'any' : o.value} (${o.label})`).join('; ')}`)
        .join('\n')}\n  - must (optional, comma separated): ${recFramework[side].mustHaves.map((m) => `${m.id} (${m.label})`).join('; ')}`,
  )
  .join('\n')}

Example: ${BASE}/what-should-i-use?side=seekers&problem=no-callbacks&months=3&budget=0

## Free tools for hiring teams

- [What should we ask in the interview?](${BASE}/interview-scorecard): a structured interview scorecard for any role, with the same questions for every candidate, probes and a 1 to 5 scale. Definitions are the US Office of Personnel Management's (MOSAIC competencies, January 2013); the method follows OPM's structured interview guide.
- [What does a hire really cost?](${BASE}/hiring-costs): cost per hire as SHRM defines it, compared with SHRM's 2025 medians ($1,200 per non-executive hire, $10,625 per executive hire; 2,371 organizations).
- [Is this even a real candidate?](${BASE}/is-this-a-real-candidate): the FBI's red flags for fake candidates (I-012325-PSA, January 2025; PSA220628, June 2022), and which applicant tracking systems have fraud detection on file (Greenhouse, Ashby).

## The "best of" lists we re-read

${benchmarks.map((l) => `- ${l.publication}, "${l.title}" (${l.url}): ${l.status === 'counts' ? 'counts.' : `does not count. ${l.reason}`} Checked ${l.checked}.`).join('\n')}

${counting.length} of ${benchmarks.length} lists currently count.

## ATS resume checkers, ranked

${checkers.map(tool).join('\n\n')}

## Resume builders, ranked

${builders.map(tool).join('\n\n')}

## Applicant tracking systems, ranked (data as of ${ats.as_of})

Guide: ${BASE}/guides/best-ats-for-small-teams

${atsRanked
  .map((t, i) => {
    const s = atsScores(t)
    const reads = [
      t.sources.g2 ? `G2 ${t.sources.g2.rating}/5 from ${formatCount(t.sources.g2.reviews)} reviews (read ${t.sources.g2.as_of})` : null,
      t.sources.capterra ? `Capterra ${t.sources.capterra.rating}/5 from ${formatCount(t.sources.capterra.reviews)} reviews (read ${t.sources.capterra.as_of})` : null,
    ]
      .filter(Boolean)
      .join('; ')
    return `### ${i + 1}. ${t.name}

- Website: https://${t.domain}
- Best for: ${TEAM[t.segment] ?? 'All teams'}
- Overall: ${f2(s.overall)} out of 5. Parts: user ratings ${f2(s.user)}, popularity ${f2(s.market)}, value ${f2(s.value)}
- Ratings read: ${reads || 'none on file'}
- Pricing: ${t.sources.pricing}${t.sources.free_tier ? ' (has a free tier)' : ''}${t.data_notes ? `\n- Data notes: ${t.data_notes}` : ''}`
  })
  .join('\n\n')}

## Stephanie's picks (editorial, labeled as hers, never change a score)

- For job seekers: ${all.find((t) => t.id === risingPick.tool)?.name}, her up-and-coming pick. ${risingPick.line}
- For hiring teams: ${hiringPick.name} (${hiringPick.category}, ${hiringPick.url}), her top pick. ${hiringPick.line} ${hiringPick.scoreStatus}

## On the rise: new tools to watch (not rated yet)

Page: ${BASE}/on-the-rise. Tools here have no score until they reach ${rising.minReviews} public reviews. Never ranked, never paid for.

${rising.tools
  .map(
    (t) =>
      `- ${t.name} (${t.category}, for ${t.side === 'seekers' ? 'job seekers' : 'hiring teams'}): ${t.what}${t.evidence.length ? ` Named by ${t.evidence.map((e) => `${e.publication} (${e.url})${e.confirmed === false ? ', not yet confirmed on the page' : ''}`).join(' and ')}.` : ''}`,
  )
  .join('\n')}

### Graduated to a score

${rising.graduated.map((g) => `- ${g.name}, ${g.date}: ${g.to}. ${g.note}`).join('\n') || '- None yet.'}

## Who to follow

Chosen by Stephanie for being seriously helpful or funny. Page: ${BASE}/who-to-follow

${['hiring', 'seekers']
  .map(
    (side) =>
      `### ${side === 'hiring' ? 'The best in talent acquisition' : 'For job seekers'}\n\n` +
      people
        .filter((p) => p.side === side)
        .map((p) => `- ${p.name} (${p.known}): ${p.why} ${p.links.map((l) => `${l.label}: ${l.url}`).join('; ')}`)
        .join('\n'),
  )
  .join('\n\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
