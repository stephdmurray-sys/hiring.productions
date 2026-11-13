import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import { benchmarks, formatCount, formatMonth, guide, latestCheck, resumeTools, risingPick, videos } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-job-seekers' },
  title: 'For Job Seekers: Resume Tools Ranked on Evidence',
  description:
    'Resume builders and ATS checkers scored on dated public evidence and judged by a recruiter who knows what happens after you click apply.',
}

const LINES: Record<string, string> = {
  teal: 'Checker, builder and job tracker in one, on a free tier that is a real product.',
  kickresume: '$96 a year is the whole price, and students get six months free.',
  flowcv: 'The only builder here that hands you a clean PDF for nothing.',
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export default function Page() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const top = byId[guide.picks[0].tool]
  const traps = all.filter((t) => t.yearCost?.renewsEvery4Weeks)
  const checked = latestCheck()

  const pickRows = [
    ...guide.picks.map((p) => ({ t: byId[p.tool], label: p.label })),
    { t: byId[risingPick.tool], label: "Stephanie's up-and-coming pick" },
  ]

  return (
    <Hub
      side="seekers"
      title="The tools that get you seen, ranked by someone who reads the other side."
      dek="Resume builders and ATS checkers, scored on dated public evidence and judged by a recruiter who knows what happens after you click apply."
      dateline={`Evidence checked ${shortDate(checked)} · next check ${formatMonth(guide.nextCheck)}`}
      receipt={
        <aside className="receipt" aria-label="Best overall right now">
          <p className="receipt-h">Best overall right now: {top.name}</p>
          <dl>
            <div>
              <dt>Users</dt>
              <dd>
                {top.userScore?.toFixed(1)} from {formatCount(top.citableReviews)} ratings
              </dd>
            </div>
            <div>
              <dt>Other lists</dt>
              <dd>{top.counted.map((a) => (a.position ? `${a.list.publication} #${a.position}` : `${a.list.publication} pick`)).join(', ')}</dd>
            </div>
            <div>
              <dt>Free tier</dt>
              <dd>{top.freeTier}</dd>
            </div>
            <div>
              <dt>A paid year</dt>
              <dd>{top.yearCost ? `${money(top.yearCost.amount)} (${top.yearCost.how.toLowerCase()})` : 'n/a'}</dd>
            </div>
          </dl>
          <p className="receipt-foot">
            <a className="tl" href={`/guides/best-resume-tools#evidence-${top.id}`}>
              Open the evidence file
            </a>
          </p>
        </aside>
      }
      situations={[
        {
          q: 'Applying and hearing nothing back?',
          a: "Silence usually means the applicant tracking system can't read your resume. Run it through a checker before the next application goes out.",
          href: '/guides/best-resume-tools#rankings',
          link: 'See the ATS checkers',
        },
        {
          q: 'Rewriting your resume from scratch?',
          a: `FlowCV gives you a clean PDF for free. Kickresume is the paid pick at ${money(byId['kickresume'].yearCost?.amount ?? 96)} a year, flat.`,
          href: '/guides/best-resume-tools#evidence-flowcv',
          link: 'Compare the builders',
        },
        {
          q: 'Worried about surprise charges?',
          a: `${traps.map((t) => t.name).join(' and ')} renew every 4 weeks, which is 13 charges a year. The guide prints what a year of every tool costs.`,
          href: '/guides/best-resume-tools#cost',
          link: 'See what a year costs',
        },
        {
          q: 'Losing track of applications?',
          a: `${top.name} keeps every application, contact and follow-up in one pipeline, and its free tier is enough to run a search.`,
          href: `/guides/best-resume-tools#evidence-${top.id}`,
          link: `Read ${top.name}'s evidence`,
        },
      ]}
      picks={pickRows.map(({ t, label }) => ({
        href: `/guides/best-resume-tools#evidence-${t.id}`,
        label,
        name: t.name,
        domain: t.domain,
        line: LINES[t.id] ?? t.bestFor,
        overall: t.overall?.toFixed(2) ?? 'n/e',
        users: t.userScore !== null ? `${t.userScore.toFixed(1)} (${formatCount(t.citableReviews)})` : 'n/e',
      }))}
      guides={[
        {
          href: '/guides/best-resume-tools',
          title: 'The best resume tools of 2026',
          detail: `${all.length} builders and checkers, ${benchmarks.length} rival lists, ${videos.length} labeled demo videos, and what a year of each costs.`,
          meta: `Checked ${shortDate(checked)}`,
        },
      ]}
      inResearch="job search trackers, interview practice, career coaching and LinkedIn profile tools"
    />
  )
}
