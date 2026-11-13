import type { Metadata } from 'next'
import { Hub, HubLogo } from '@/app/(rebrand)/_components/hub'
import { formatCount, formatDate, formatMonth, guide, latestCheck, resumeTools, risingPick, benchmarks, videos } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-job-seekers' },
  title: 'For Job Seekers: Resume Tools Ranked on Evidence',
  description:
    'Resume builders and ATS checkers ranked on dated evidence by a recruiter, checked monthly against every list you are likely to read, with what a year of each tool really costs.',
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export default function Page() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const top = byId[guide.picks[0].tool]
  const trap = all.filter((t) => t.yearCost?.renewsEvery4Weeks)

  const picks = [
    ...guide.picks.map((p) => ({ t: byId[p.tool], label: p.label, rising: false })),
    { t: byId[risingPick.tool], label: risingPick.label, rising: true },
  ].map(({ t, label, rising }) => ({
    href: `/guides/best-resume-tools#evidence-${t.id}`,
    label,
    name: t.name,
    domain: t.domain,
    rising,
    stats: [
      { value: t.overall?.toFixed(2) ?? 'n/e', label: 'overall' },
      { value: t.userScore?.toFixed(1) ?? 'n/e', label: `from ${formatCount(t.citableReviews)} users` },
    ],
  }))

  return (
    <Hub
      side="seekers"
      title="The tools that get you seen, ranked by someone who reads the other side."
      dek="Resume builders and ATS checkers, scored on dated public evidence, checked every month against the other lists you'll read, and judged by a recruiter who knows what happens after you click apply."
      proof={`Evidence checked ${formatDate(latestCheck())} · next check ${formatMonth(guide.nextCheck)}`}
      heroCard={
        <div className="hub-card">
          <p className="hc-k">Best overall right now</p>
          <div className="hc-id">
            <span className="mini-logo">
              <HubLogo domain={top.domain} />
            </span>
            <b>{top.name}</b>
          </div>
          <div className="hc-rows">
            <div>
              <span>Users</span>
              <b>
                {top.userScore?.toFixed(1)} from {formatCount(top.citableReviews)}
              </b>
            </div>
            <div>
              <span>Other reviewers</span>
              <b>{top.counted.map((a) => a.list.publication).join(', ')}</b>
            </div>
            <div>
              <span>Free tier</span>
              <b>{top.freeTier}</b>
            </div>
          </div>
          <a className="hc-go" href={`/guides/best-resume-tools#evidence-${top.id}`}>
            See the evidence &rarr;
          </a>
        </div>
      }
      situations={[
        {
          q: 'Applying but hearing nothing back?',
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
          a: `${trap.map((t) => t.name).join(' and ')} renew every 4 weeks: 13 charges a year, not 12. See what a year of every tool really costs.`,
          href: '/guides/best-resume-tools#cost',
          link: 'See what a year costs',
        },
        {
          q: 'Losing track of applications?',
          a: `${top.name} keeps every application, contact and follow-up in one pipeline, on a free tier that's a real product.`,
          href: `/guides/best-resume-tools#evidence-${top.id}`,
          link: `See ${top.name}'s evidence`,
        },
      ]}
      picks={picks}
      guides={[
        {
          href: '/guides/best-resume-tools',
          title: 'The best resume tools of 2026',
          detail: `${all.length} builders and checkers, ${benchmarks.length} rival lists checked, ${videos.length} labeled demo videos, and what a year of each one costs.`,
          meta: `Checked ${formatDate(latestCheck())}`,
        },
      ]}
      inResearch={['Job search trackers', 'Interview practice', 'Career coaching', 'LinkedIn profile tools']}
    />
  )
}
