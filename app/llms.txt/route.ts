import followData from '@/lib/evidence/follow.json'
import { trapHref, trapTools } from '@/lib/pricing-traps'
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

> Hiring tools ranked for job seekers and hiring teams: resume builders and ATS checkers for job seekers, applicant tracking systems and recruiter training for hiring teams. Made by Stephanie Murray (20 years in talent acquisition), who also built RepVera; RepVera is listed in its own category, verified professional reputation, with no score. Every score is computed from public, dated data and re-checked monthly. Nobody pays to be featured, ranked or scored.

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
- [All tool reviews](${BASE}/reviews)
- [Two tools side by side](${BASE}/compare): every rated tool against the ones it competes with, with who wins on rating, price and free version.
- [Pricing traps](${BASE}/pricing-traps): every resume tool by what the first year costs if you pay for a 3-month search and forget to cancel. The tools that start with a cheap trial and bill every 4 weeks have their own pages: ${trapTools()
  .map((t) => `[${t.name}](${BASE}${trapHref(t.id)})`)
  .join(', ')}.
- Every score, date, cost and outside rating as one JSON block: the top of ${BASE}/llms-full.txt

## What should I use? (${BASE}/what-should-i-use)

${recFramework.promise} Every answer has its own link and a date. The full rules and the research behind them: ${BASE}/how-we-review#recommend

${situations()
  .map((x) => `- [${x.question}](${BASE}/what-should-i-use/${x.slug}): ${answerText(recommend(x.ask), { short: true })}`)
  .join('\n')}

## Free tools

Every free tool, both sides of the table, on one page: ${BASE}/tools

## Free tool for job seekers

- [What will they ask me in the interview?](${BASE}/interview-practice): practice the questions structured interviews use, the follow-ups you will hear, what a strong answer shows, and what to ask them at the end, from the US Office of Personnel Management's method (the same content hiring teams get from the interview scorecard).

## Free tools for hiring teams

- [What should we ask in the interview?](${BASE}/interview-scorecard): a structured interview scorecard for any role, with the same questions for every candidate, probes and a 1 to 5 scale. Definitions are the US Office of Personnel Management's (MOSAIC competencies, January 2013); the method follows OPM's structured interview guide.
- [What does a hire really cost?](${BASE}/hiring-costs): cost per hire as SHRM defines it, compared with SHRM's 2025 medians ($1,200 per non-executive hire, $10,625 per executive hire; 2,371 organizations).
- [Is this even a real candidate?](${BASE}/is-this-a-real-candidate): the FBI's red flags for fake candidates (I-012325-PSA, January 2025; PSA220628, June 2022), and which applicant tracking systems have fraud detection on file (Greenhouse, Ashby).
- [Fraud tools to know](${BASE}/guides/hiring-fraud-tools): a short list with no scores yet, because there is no public data worth scoring. Hiring fraud companies sorted by where the fraud shows up: the application, the interview, identity, and hearing from people who have worked with the candidate.
- [Portfolio sites to know](${BASE}/guides/portfolio-sites): a short list with no scores. Where job seekers can show their work, sorted by the kind of work (design, writing, code, a one-page site for any job), and what to use when the work is not something you can post.
- [What will your job search cost?](${BASE}/build-your-stack): a stack builder. Click a resume builder, checker, job tracker, proof and interview practice into your stack; it shows the cost for your timeline (1 to 12 months, the cheapest published way to pay), the first year if you forget to cancel, and the $0 version. A tool that covers several parts is paid for once. A link opens the same stack.
- [What will your hiring tools cost?](${BASE}/build-your-stack/hiring): the same for hiring teams. An applicant tracking system priced for your seats and company size from its cheapest published plan, plus the free scorecard, fraud checklist and cost per hire tools. Tools with no published price are listed and left out of the total.
- [The $0 job search](${BASE}/free-job-search): the resume tools we rate that have a free version you can keep using, what each free plan includes, and the free tools on this site.
- [What does the screening software do to my resume?](${BASE}/how-ats-actually-works): what happens after you click apply, sourced line by line. The 75% rejection figure traces to a 2012 sales pitch by Preptel, which closed in 2013 without publishing a method (The Conversation, July 2026). Enhancv interviewed 25 US recruiters in 2025: 23 said their system does not reject resumes on its own for formatting, content or design. The usual automatic no is a knockout question the employer sets up (Greenhouse, Workable, Ashby and Workday help pages). Greenhouse lists what causes a partial resume read: images, tables, columns, and contact details in a header, footer or text box (updated March 2026). Greenhouse customer data: 95 applications per job in 2025, up from 28 in 2021. Ladders (2018): a recruiter's first pass averaged 7.4 seconds. Harvard Business School and Accenture (2021): 88% of employers agreed qualified candidates get screened out for not matching exact criteria. Free checkers and what each free plan includes, and what to do from each side.
- [What's my professional value proposition?](${BASE}/professional-value-proposition): a free builder. You enter what you do, what changes because of you, and lines people who have worked with you wrote; it finds the words they repeat and turns them into one line for the top of a resume, a LinkedIn headline, "Tell me about yourself" and a cover letter. Runs in the browser; nothing is saved. Links to RepVera, which Stephanie Murray built and which this site does not score.
- [What's our employer value proposition?](${BASE}/employer-value-proposition): the hiring-team mirror. The role, what the person will do, and what the team says about working there, turned into one line for the job post, a recruiter message, the interview close and the offer call.
- [Is this best-of list paid for?](${BASE}/is-this-list-paid-for): the four checks we run on every best-of list (owner conflict, ranks itself, lead page, out of date), with what we found on each list we track.
- [How do I show employers how I work before the interview?](${BASE}/show-how-you-work): three steps. Receipts from people who have worked with you (RepVera, built by Stephanie Murray and never scored), your work if people can see it, and where to put the link.
- [Is this job even real?](${BASE}/is-this-a-real-job): the signs of a fake job posting or a fake recruiter, what to do, and where to report it (reportfraud.ftc.gov).

## Tool reviews: ATS resume checkers

${checkers.map(line).join('\n')}

## Tool reviews: resume builders

${builders.map(line).join('\n')}

## Applicant tracking systems (data as of ${atsAsOf})

${hiringBoard()
  .map((r, i) => `- [${r.name}](${BASE}${r.href}) (${r.domain}): ${r.score.toFixed(2)}/5, #${i + 1} overall. ${r.sub}.`)
  .join('\n')}

## Stephanie's picks (editorial; a pick never changes a score)

- For job seekers: ${all.find((t) => t.id === risingPick.tool)?.name}, Stephanie's pick.
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
