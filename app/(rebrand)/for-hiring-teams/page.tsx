import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import { atsAsOf, atsHref, atsTools, hiringBoard, shortDate } from '@/app/(rebrand)/_components/data'
import { atsLeaders, atsScores, formatMonth, guide, hiringPick } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-hiring-teams' },
  title: 'For Hiring Teams: Software and Training, Ranked on Real Reviews and Prices',
  description:
    'Applicant tracking systems ranked by team size on dated public data: what users say, how the market is moving, and whether the price is public. Plus recruiter training ranked for how you recruit.',
}

const SEG_LABEL: Record<string, string> = { small: 'Small teams pick', growing: 'Growing teams pick', scaling: 'Scaling teams pick' }

export default function Page() {
  const leaders = atsLeaders()
  const tagFor = Object.fromEntries(Object.entries(leaders).map(([seg, name]) => [name, SEG_LABEL[seg]]))
  const byName = Object.fromEntries(atsTools.map((t) => [t.name, t]))
  const growing = byName[leaders.growing]
  const topUsers = [...atsTools].sort((a, b) => b.computed.user_score - a.computed.user_score)[0]
  const scaling = byName[leaders.scaling]
  const small = byName[leaders.small]

  return (
    <Hub
      side="hiring"
      title="The tools hiring teams run on, and which are worth paying for."
      dek="Applicant tracking systems ranked by team size on dated public data: what users say, how the market is moving, and whether the price is public. Every number has a date and a source."
      dateline={`ATS data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={atsTools.map((t) => ({ domain: t.domain, name: t.name, href: atsHref(t.name), tip: `${t.name} · ${atsScores(t).overall.toFixed(2)}` }))}
      board={{
        title: 'Applicant tracking systems',
        checked: `data as of ${shortDate(atsAsOf)}`,
        heading: 'How the systems rank',
        lead: `Ratings and prices as of ${shortDate(atsAsOf)}. We check them all again in December.`,
        rows: hiringBoard().map((r) => ({ ...r, tag: tagFor[r.id] })),
        foot: <>Ranked here on one board. The guide splits them by team size: small, growing and scaling.</>,
      }}
      guides={[
        {
          href: '/guides/best-ats-for-small-teams',
          title: `The ${atsTools.length} best applicant tracking systems, ranked by team size`,
          detail: 'Small, growing and scaling teams each get their own rankings and their own pick.',
          meta: `Data as of ${shortDate(atsAsOf)}`,
          logos: atsTools.slice(0, 6).map((t) => ({ domain: t.domain, name: t.name })),
        },
        {
          href: '/guides/best-recruiter-training',
          title: 'Recruiter training and certifications',
          detail: '19 programs, from sourcing and closing craft to SHRM and HRCI exam prep.',
          meta: 'Updated 23 Aug 2026',
          logos: [
            { domain: 'shrm.org', name: 'SHRM' },
            { domain: 'hrci.org', name: 'HRCI' },
            { domain: 'aihr.com', name: 'AIHR' },
          ],
        },
        {
          href: '/interview-scorecard',
          title: 'What should we ask in the interview?',
          detail: 'A structured scorecard for any role, on the US Office of Personnel Management\u2019s method, sent to you as a PDF and a spreadsheet.',
          meta: 'Free tool',
          logos: [],
        },
        {
          href: '/hiring-costs',
          title: 'What does a hire really cost?',
          detail: 'Cost per hire the way SHRM counts it, next to SHRM\u2019s 2025 medians: $1,200 per non-executive hire and $10,625 per executive hire.',
          meta: 'Free calculator',
          logos: [],
        },
        {
          href: '/is-this-a-real-candidate',
          title: 'Is this even a real candidate?',
          detail: 'The FBI\u2019s red flags for fake candidates as a checklist for your interviewers, and which systems flag fraud for you.',
          meta: 'Free checklist',
          logos: [],
        },
        {
          href: '/compare',
          title: 'Down to two systems?',
          detail: 'Any two applicant tracking systems for the same team size, side by side: scores, a year\u2019s cost and a demo of each.',
          meta: 'Comparisons',
          logos: [],
        },
      ]}
      inResearch="recruiting software for startups, candidate assessments, high-volume hiring, and healthcare and clinical recruiting"
    />
  )
}
