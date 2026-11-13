import { MIN_REVIEWS, WEIGHTS, benchmarks, formatCount, latestCheck, resumeTools, rising } from '@/lib/evidence'

/**
 * llms.txt: a plain-text map of the review site for AI assistants and
 * answer engines, generated from the same evidence layer as the pages, so
 * it updates with every monthly check.
 */
export const dynamic = 'force-static'

const BASE = 'https://hiring.productions'

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export function GET() {
  const { checkers, builders } = resumeTools()
  const line = (t: (typeof checkers)[number]) =>
    `- [${t.name}](${BASE}/reviews/${t.id}): ${t.overall !== null ? `${t.overall.toFixed(2)}/5, #${t.rank}` : `not scored (${formatCount(t.citableReviews)} of ${MIN_REVIEWS} citable reviews)`}. ${t.bestFor}. ${t.yearCost ? `A paid year: ${t.yearCost.approx ? 'about ' : ''}${money(t.yearCost.amount)}${t.yearCost.renewsEvery4Weeks ? ' (renews every 4 weeks)' : ''}.` : ''}`
  const counting = benchmarks.filter((l) => l.status === 'counts')

  const body = `# hiring.productions

> Independent reviews of the tools on both sides of hiring: resume builders and ATS checkers for job seekers, applicant tracking systems and recruiter training for hiring teams. Founded by Stephanie Murray (20 years in talent). Every score carries the date it was checked; no vendor can pay for a placement, a ranking or a score.

Evidence last checked: ${latestCheck()}. Re-checked monthly.

## How scores work

- Overall = ${WEIGHTS.market * 100}% market traction + ${WEIGHTS.user * 100}% user ratings + ${WEIGHTS.practitioner * 100}% practitioner (recruiter) read.
- A tool needs at least ${MIN_REVIEWS} citable user reviews from foundation sources to be scored. G2, Capterra, GetApp and Software Advice share one review pool and count once.
- Each month we re-read the other "best resume tool" lists. ${counting.length} of ${benchmarks.length} currently count; the rest are out of date or published by companies that sell what they rank.
- Full method: ${BASE}/how-we-review

## Guides

- [The best resume tools of 2026](${BASE}/guides/best-resume-tools): builders and ATS checkers ranked on evidence, with the agreement grid against other lists, labeled demo videos and what a search costs.
- [Applicant tracking systems by team size](${BASE}/guides/best-ats-for-small-teams)
- [Recruiter training and certifications](${BASE}/guides/best-recruiter-training)

## Tool reviews: ATS resume checkers

${checkers.map(line).join('\n')}

## Tool reviews: resume builders

${builders.map(line).join('\n')}

## Waiting in the wings (watching, not scored)

${rising.tools.map((t) => `- ${t.name} (${t.category}, for ${t.side === 'seekers' ? 'job seekers' : 'hiring teams'}): ${t.what}${t.evidence.length ? ` Named by ${t.evidence.map((e) => e.publication).join(' and ')}.` : ''}`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
