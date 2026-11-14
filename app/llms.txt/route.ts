import followData from '@/lib/evidence/follow.json'
import { MIN_REVIEWS, WEIGHTS, benchmarks, formatCount, framework, hiringPick, latestCheck, resumeTools, rising, risingPick } from '@/lib/evidence'
import { hiringBoard, atsAsOf } from '@/app/(rebrand)/_components/data'
import { answerText, recFramework, recommend, situations } from '@/lib/evidence/recommend'

/**
 * llms.txt: a plain-text map of the review site for AI assistants and
 * answer engines (the llmstxt.org format), generated from the same evidence
 * layer as the pages, so it updates with every monthly check. The longer
 * version, with every number, is /llms-full.txt.
 */
export const dynamic = 'force-static'

const BASE = 'https://hiring.productions'

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export function GET() {
  const { checkers, builders, all } = resumeTools()
  const line = (t: (typeof checkers)[number]) =>
    `- [${t.name}](${BASE}/reviews/${t.id}): ${t.overall !== null ? `${t.overall.toFixed(2)}/5, #${t.rank}` : `not scored (${formatCount(t.citableReviews)} of ${MIN_REVIEWS} public reviews)`}. ${t.bestFor}. ${t.yearCost ? `A paid year: ${t.yearCost.approx ? 'about ' : ''}${money(t.yearCost.amount)}${t.yearCost.renewsEvery4Weeks ? ' (renews every 4 weeks)' : ''}.` : ''}`
  const counting = benchmarks.filter((l) => l.status === 'counts')
  const people = followData.people as { name: string; known: string; side: string; links: { url: string }[] }[]
  const person = (p: (typeof people)[number]) => `- [${p.name}](${p.links[0]?.url}): ${p.known}`

  const body = `# hiring.productions

> Independent reviews of the tools on both sides of hiring: resume builders and ATS checkers for job seekers, applicant tracking systems and recruiter training for hiring teams. Founded by Stephanie Murray (20 years in talent acquisition). Every score is computed from public, dated data and re-checked monthly; no vendor can pay for a placement, a ranking or a score.

Evidence last checked: ${latestCheck()}. Every number below has a source on the linked page. Quoting and citing is welcome; please link the page you quote.

## How scores work

- Overall = ${WEIGHTS.user * 100}% user ratings + ${WEIGHTS.market * 100}% popularity + ${WEIGHTS.critics * 100}% best-of lists + ${WEIGHTS.value * 100}% value, each out of 5. Every input is public data; no one's personal score is an input, Stephanie's included.
- Users: review-site ratings, adjusted toward the category average when a tool has few reviews (the IMDb weighted-rating method). A tool needs at least ${MIN_REVIEWS} public user reviews to be scored. G2, Capterra, GetApp and Software Advice share one review pool and count once.
- Popularity: web traffic rank and review volume. Best-of lists: how many independent "best of" lists name it (${counting.length} of ${benchmarks.length} lists currently count; vendor-published lists never do). Value: the free version and the real cost of a paid year, minus a point for 4-week billing.
- Stephanie's picks are editorial, labeled as hers, and never change a score.
- Full method and the research behind it: ${BASE}/how-we-review

## Guides

- [The best resume tools of 2026](${BASE}/guides/best-resume-tools): builders and ATS checkers ranked on public reviews and real prices, the agreement grid against other lists, demo videos and what a search really costs.
- [Applicant tracking systems by team size](${BASE}/guides/best-ats-for-small-teams): small, growing and scaling teams, ranked within each tier.
- [Recruiter training and certifications](${BASE}/guides/best-recruiter-training)
- [For job seekers](${BASE}/for-job-seekers): where a search goes wrong and the tools that fix it.
- [For hiring teams](${BASE}/for-hiring-teams): applicant tracking, sourcing and strategic guidance.
- [All resume tool reviews](${BASE}/reviews)

## What should I use? (${BASE}/what-should-i-use)

${recFramework.promise} Every answer has its own link and a date. The full rules and the research behind them: ${BASE}/how-we-review#recommend

${situations()
  .map((x) => `- [${x.question}](${BASE}/what-should-i-use/${x.slug}): ${answerText(recommend(x.ask), { short: true })}`)
  .join('\n')}

## Free tool for job seekers

- [What will they ask me in the interview?](${BASE}/interview-practice): practice the questions structured interviews use, the follow-ups you will hear, and what a strong answer shows, from the US Office of Personnel Management's method (the same content hiring teams get from the interview scorecard).

## Free tools for hiring teams

- [What should we ask in the interview?](${BASE}/interview-scorecard): a structured interview scorecard for any role, with the same questions for every candidate, probes and a 1 to 5 scale. Definitions are the US Office of Personnel Management's (MOSAIC competencies, January 2013); the method follows OPM's structured interview guide.
- [What does a hire really cost?](${BASE}/hiring-costs): cost per hire as SHRM defines it, compared with SHRM's 2025 medians ($1,200 per non-executive hire, $10,625 per executive hire; 2,371 organizations).
- [Is this even a real candidate?](${BASE}/is-this-a-real-candidate): the FBI's red flags for fake candidates (I-012325-PSA, January 2025; PSA220628, June 2022), and which applicant tracking systems have fraud detection on file (Greenhouse, Ashby).

## Tool reviews: ATS resume checkers

${checkers.map(line).join('\n')}

## Tool reviews: resume builders

${builders.map(line).join('\n')}

## Applicant tracking systems (data as of ${atsAsOf})

${hiringBoard()
  .map((r, i) => `- ${r.name} (${r.domain}): ${r.score.toFixed(2)}/5, #${i + 1} overall. ${r.sub}.`)
  .join('\n')}

## Stephanie's picks (editorial; a pick never changes a score)

- For job seekers: ${all.find((t) => t.id === risingPick.tool)?.name}, her up-and-coming pick.
- For hiring teams: ${hiringPick.name} (${hiringPick.category}), her top pick. ${hiringPick.scoreStatus}

## On the rise: new tools to watch (not rated yet)

Page: ${BASE}/on-the-rise. Tools here have no score until they reach ${rising.minReviews} public reviews. Never ranked, never paid for.

${rising.tools.map((t) => `- ${t.name} (${t.category}, for ${t.side === 'seekers' ? 'job seekers' : 'hiring teams'}): ${t.what}${t.evidence.length ? ` Named by ${t.evidence.map((e) => `${e.publication}${e.confirmed === false ? ' (not yet confirmed)' : ''}`).join(' and ')}.` : ''}`).join('\n')}

Graduated to a score: ${rising.graduated.map((g) => `${g.name} (${g.to}, ${g.date})`).join('; ') || 'none yet'}.

## Who to follow (${BASE}/who-to-follow)

The best in talent acquisition:
${people.filter((p) => p.side === 'hiring').map(person).join('\n')}

For job seekers:
${people.filter((p) => p.side === 'seekers').map(person).join('\n')}

## About the ratings

${framework.summary}

## Optional

- [Everything above in full, with every score part, price and source](${BASE}/llms-full.txt)
- [About Stephanie Murray](${BASE}/about/stephanie)
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
