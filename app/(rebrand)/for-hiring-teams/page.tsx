import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import { atsAsOf, atsGrowth, atsTools, hiringBoard, shortDate } from '@/app/(rebrand)/_components/data'
import { formatMonth, guide } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-hiring-teams' },
  title: 'For Hiring Teams: Software and Training Ranked on Evidence',
  description:
    'Applicant tracking systems ranked by team size and recruiter training ranked for how you recruit, scored on dated public evidence and a practitioner’s read.',
}

const PICKS = [
  { name: 'Manatal', label: 'Small teams pick', line: 'Serious features at $15 per user, with no recruiter required.' },
  { name: 'Pinpoint', label: 'Growing teams pick', line: 'Highest user scores of all 14 systems we rank.' },
  { name: 'Ashby', label: 'Scaling teams pick', line: 'What the strongest scaling recruiting teams run.' },
]

export default function Page() {
  const byName = Object.fromEntries(atsTools.map((t) => [t.name, t]))
  const top = byName['Manatal']
  const growth = atsGrowth(top)
  const fastest = [...atsTools].sort((a, b) => (atsGrowth(b) ?? -1) - (atsGrowth(a) ?? -1))[0]

  return (
    <Hub
      side="hiring"
      title="The software behind well-run hiring, ranked by someone who has run it."
      dek="Applicant tracking systems ranked by team size and recruiter training ranked for how you recruit, scored on dated public evidence and a practitioner's read of what holds up in live hiring."
      dateline={`ATS data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={atsTools.map((t) => ({ domain: t.domain, name: t.name, href: '/guides/best-ats-for-small-teams' }))}
      feature={{
        domain: top.domain,
        name: top.name,
        title: 'Small teams pick right now',
        line: `Users rate it ${top.computed.user_score.toFixed(1)}.${growth !== null ? ` Reviews up ${Math.round(growth * 100)}% in a year${fastest.name === top.name ? `, the fastest of all ${atsTools.length}` : ''}.` : ''} ${top.sources.pricing.replace('/user/mo annual', ' per user a month, billed annually')}.`,
        href: '/guides/best-ats-for-small-teams',
        linkText: `See all ${atsTools.length}, ranked by team size`,
      }}
      situations={[
        {
          q: 'Hiring under 20 people a year?',
          a: 'Manatal leads the small-team standings at $15 per user. Breezy HR has the best free tier.',
          href: '/guides/best-ats-for-small-teams',
          link: 'See the small-team standings',
        },
        {
          q: 'Bringing on your first recruiter?',
          a: 'Pinpoint has the highest user scores of all 14 systems we rank, and it is built for a first real hiring function.',
          href: '/guides/best-ats-for-small-teams',
          link: 'See the growing-team standings',
        },
        {
          q: 'Scaling past 50 hires a year?',
          a: 'Ashby is what the strongest scaling recruiting teams run. Greenhouse if you want the classic structured-hiring standard.',
          href: '/guides/best-ats-for-small-teams',
          link: 'See the scaling-team standings',
        },
        {
          q: 'Training a recruiting team?',
          a: 'AIRS for the industry-standard credential set. SourceCon Academy for the deepest sourcing curriculum.',
          href: '/guides/best-recruiter-training',
          link: 'Read the training guide',
        },
      ]}
      situationsCta={{
        text: 'Tell us how you hire and we will recommend a stack. It is free, and no vendor can pay their way into the answer.',
        href: '/consulting',
        label: 'Get a recommendation',
      }}
      board={{
        title: 'Applicant tracking systems',
        checked: `data as of ${shortDate(atsAsOf)}`,
        rows: hiringBoard().map((r) => ({ ...r, tag: PICKS.find((x) => x.name === r.id)?.label })),
        foot: <>Ranked here on one board. The guide splits them by team size: small, growing and scaling.</>,
      }}
      guides={[
        {
          href: '/guides/best-ats-for-small-teams',
          title: `The ${atsTools.length} best applicant tracking systems, ranked by team size`,
          detail: 'Small, growing and scaling teams each get their own standings and their own pick.',
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
      ]}
      inResearch="recruiting software for startups, candidate assessments, high-volume hiring, and healthcare and clinical recruiting"
    />
  )
}
