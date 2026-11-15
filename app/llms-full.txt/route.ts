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
import { buildComparison, comparePairs } from '@/lib/compare'
import { trapFacts, trapHref, trapTools } from '@/lib/pricing-traps'

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

/**
 * The machine-readable block at the top of the file: every rated tool with its score, the date it was
 * checked, what 3 months and a forgotten first year cost, and the outside ratings behind the score.
 */
function dataBlock() {
  const { all } = resumeTools()
  return {
    site: BASE,
    checked: latestCheck(),
    method: `${BASE}/how-we-review`,
    nobodyPaysToBeFeatured: true,
    weights: { users: WEIGHTS.user, popularity: WEIGHTS.market, bestOfLists: WEIGHTS.critics, value: WEIGHTS.value },
    author: { name: 'Stephanie Murray', role: 'Founder, 20 years in talent acquisition', url: `${BASE}/about/stephanie` },
    resumeTools: all.map((t) => {
      const f = trapFacts(t)
      return {
        name: t.name,
        kind: t.segment === 'checker' ? 'ATS resume checker' : 'resume builder',
        review: `${BASE}/reviews/${t.id}`,
        overall: t.overall,
        rank: t.overall !== null ? t.rank : null,
        checked: latestCheck(),
        freeVersion: FREE_LEVEL_LABEL[t.freeLevel],
        pricing: t.pricingLine,
        threeMonthSearchUSD: f.threeMonths,
        firstYearIfYouForgetToCancelUSD: f.firstYearIfForgotten,
        billsEvery4Weeks: f.renews4w,
        pricingTrapPage: trapTools().some((x) => x.id === t.id) ? `${BASE}${trapHref(t.id)}` : null,
        outsideRatings: t.ratings.map((r) => ({ source: r.platform, rating: r.rating, reviews: r.reviews, read: r.asOf, counted: !r.droppedBecause })),
        listsThatNameIt: t.counted.map((a) => a.list.publication),
      }
    }),
    applicantTrackingSystems: [...ats.tools]
      .sort((a, b) => atsScores(b).overall - atsScores(a).overall)
      .map((t) => ({
        name: t.name,
        rankedFor: TEAM[t.segment],
        review: `${BASE}/reviews/ats/${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
        overall: Number(atsScores(t).overall.toFixed(2)),
        checked: ats.as_of,
        pricing: t.sources.pricing,
        freePlan: !!t.sources.free_tier,
        outsideRatings: [
          t.sources.g2 ? { source: 'G2', rating: t.sources.g2.rating, reviews: t.sources.g2.reviews, read: t.sources.g2.as_of } : null,
          t.sources.capterra ? { source: 'Capterra', rating: t.sources.capterra.rating, reviews: t.sources.capterra.reviews, read: t.sources.capterra.as_of } : null,
        ].filter(Boolean),
      })),
    bestOfListsChecked: benchmarks.map((l) => ({ publication: l.publication, title: l.title, url: l.url, status: l.status, checked: l.checked })),
  }
}

export function GET() {
  const { checkers, builders, all } = resumeTools()
  const counting = benchmarks.filter((l) => l.status === 'counts')
  const people = followData.people as { name: string; known: string; side: string; why: string; links: { label: string; url: string }[] }[]
  const atsRanked = [...ats.tools].sort((a, b) => atsScores(b).overall - atsScores(a).overall)

  const body = `# hiring.productions: the full evidence file

> Hiring tools ranked for job seekers and hiring teams, made by Stephanie Murray (20 years in talent acquisition). This file holds every score, every part of every score, prices and sources, in plain text. The short map is ${BASE}/llms.txt. Every number has a dated source on the linked page; please link the page you quote.

Evidence last checked: ${latestCheck()}. Re-checked monthly.

## Data (JSON)

Every score, date, cost and source below, in one block for machines. The same numbers are in plain text further down and on the linked pages.

\`\`\`json
${JSON.stringify(dataBlock(), null, 1)}
\`\`\`

## Pricing traps: tools that bill every 4 weeks

${trapTools()
  .map((t) => {
    const f = trapFacts(t)
    return `- ${t.name} (${BASE}${trapHref(t.id)}): ${t.pricingLine}. A 3-month search costs ${f.threeMonths !== null ? money(f.threeMonths) : 'n/a'}; the first year costs ${f.firstYearIfForgotten !== null ? money(f.firstYearIfForgotten) : 'n/a'} if you forget to cancel. 13 charges a year. Checked ${f.checked}.`
  })
  .join('\n')}
- Every resume tool by first-year cost if you forget to cancel: ${BASE}/pricing-traps

## Who is behind it

- Stephanie Murray, founder: 20 years in talent, formerly Senior Director of Talent Acquisition at Brightside Health. Her team at Brightside cut average clinician time-to-hire to 15 days and onboarding times by more than half, and won Talent Strategy of the Year at the 2025 Transform Awards (Transform Awards Winner Spotlight, May 19, 2025: https://www.transform.us/articles/brightside-health-transform-award-talent-strategy/). Page: ${BASE}/about/stephanie
- Ownership: hiring.productions is made by Stephanie Murray, who also built RepVera. RepVera is listed in its own category, verified professional reputation, with no score and a note saying she built it. Nothing in that category is scored or ranked. No vendor link earns the site anything today. Details: ${BASE}/advertiser-disclosure

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

What she does:
${framework.judgment.does.map((d) => `- ${d}`).join('\n')}

What she never does:
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

## Free tool for job seekers

- [What will they ask me in the interview?](${BASE}/interview-practice): practice the questions structured interviews use, the follow-ups you will hear, and what a strong answer shows, from the US Office of Personnel Management's method (the same content hiring teams get from the interview scorecard).

## Free tools for hiring teams

- [What should we ask in the interview?](${BASE}/interview-scorecard): a structured interview scorecard for any role, with the same questions for every candidate, probes and a 1 to 5 scale. Definitions are the US Office of Personnel Management's (MOSAIC competencies, January 2013); the method follows OPM's structured interview guide.
- [What does a hire really cost?](${BASE}/hiring-costs): cost per hire as SHRM defines it, compared with SHRM's 2025 medians ($1,200 per non-executive hire, $10,625 per executive hire; 2,371 organizations).
- [Is this even a real candidate?](${BASE}/is-this-a-real-candidate): the FBI's red flags for fake candidates (I-012325-PSA, January 2025; PSA220628, June 2022), and which applicant tracking systems have fraud detection on file (Greenhouse, Ashby).
- [Fraud tools to know](${BASE}/guides/hiring-fraud-tools): a short list with no scores yet, because there is no public data worth scoring. Hiring fraud companies sorted by where the fraud shows up: the application, the interview, identity, and hearing from people who have worked with the candidate.
- [Portfolio sites to know](${BASE}/guides/portfolio-sites): a short list with no scores. Where job seekers can show their work, sorted by the kind of work (design, writing, code, a one-page site for any job), and what to use when the work is not something you can post.
- [The $0 job search](${BASE}/free-job-search): the resume tools we rate that have a free version you can keep using, what each free plan includes, and the free tools on this site.
- [What does the screening software do to my resume?](${BASE}/how-ats-actually-works): sourced findings only. Harvard Business School and Accenture (2021): 88% of employers agreed qualified, high-skilled candidates get screened out for not matching a job description's exact criteria. Ladders (2018): a recruiter's first pass averaged 7.4 seconds. Greenhouse's product page (February 2026) on AI-assisted matching that leaves the decision to a person.
- [Is this best-of list paid for?](${BASE}/is-this-list-paid-for): the four checks we run on every best-of list (owner conflict, ranks itself, lead page, out of date), with what we found on each list we track.
- [How do I show employers how I work before the interview?](${BASE}/show-how-you-work): three steps. Receipts from people who have worked with you (RepVera, built by Stephanie Murray and never scored), your work if people can see it, and where to put the link.
- [Is this job even real?](${BASE}/is-this-a-real-job): the signs of a fake job posting or a fake recruiter, what to do, and where to report it (reportfraud.ftc.gov).

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

- Review: ${BASE}/reviews/ats/${t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
- Website: https://${t.domain}
- Best for: ${TEAM[t.segment] ?? 'All teams'}
- Overall: ${f2(s.overall)} out of 5. Parts: user ratings ${f2(s.user)}, popularity ${f2(s.market)}, value ${f2(s.value)}
- Ratings read: ${reads || 'none on file'}
- Pricing: ${t.sources.pricing}${t.sources.free_tier ? ' (has a free tier)' : ''}${t.data_notes ? `\n- Data notes: ${t.data_notes}` : ''}`
  })
  .join('\n\n')}

## Two at a time: head-to-head comparisons

Computed from the same data as the scores above. A score gap under 0.05 counts as a tie.

${comparePairs()
  .map((p) => {
    const c = buildComparison(p.slug)!
    return `- [${c.a.name} vs ${c.b.name}](${BASE}/compare/${p.slug}): ${c.verdict}`
  })
  .join('\n')}

## Stephanie's picks (editorial, labeled as hers, never change a score)

- For job seekers: ${all.find((t) => t.id === risingPick.tool)?.name}, Stephanie's pick. ${risingPick.line}
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
