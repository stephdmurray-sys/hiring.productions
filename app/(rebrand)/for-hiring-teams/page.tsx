import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import { atsAsOf, atsTools, hiringBoard, shortDate } from '@/app/(rebrand)/_components/data'
import { atsLeaders, atsScores, formatMonth, guide, hiringPick } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-hiring-teams' },
  title: 'For Hiring Teams: Software and Training Ranked on Evidence',
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
      title="The software behind well-run hiring, ranked on the evidence."
      dek="Applicant tracking systems ranked by team size on dated public data: what users say, how the market is moving, and whether the price is public. Every number has a date and a source."
      dateline={`ATS data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={atsTools.map((t) => ({ domain: t.domain, name: t.name, href: '/guides/best-ats-for-small-teams', tip: `${t.name} · ${atsScores(t).overall.toFixed(2)}` }))}
      feature={{
        domain: hiringPick.domain,
        name: hiringPick.name,
        title: "Stephanie's top pick",
        line: `${hiringPick.line} ${hiringPick.facts}.`,
        href: '#rising',
        linkText: 'Why it’s her pick, and where its score stands',
      }}
      situations={[
        {
          q: 'Sourcing without a dedicated sourcer?',
          a: `${hiringPick.name} is Stephanie's top pick: search for people in plain language instead of Boolean strings. A sourcing scoreboard is in research now.`,
          href: '#rising',
          link: `Why ${hiringPick.name}`,
        },
        {
          q: 'Hiring under 20 people a year?',
          a: `${small.name} leads the small-team standings on the data (${atsScores(small).overall.toFixed(2)}). ${atsTools
            .filter((t) => t.segment === 'small' && t.sources.free_tier)
            .map((t) => t.name)
            .join(' and ')} have free tiers.`,
          href: '/guides/best-ats-for-small-teams',
          link: 'See the small-team standings',
        },
        {
          q: 'Bringing on your first recruiter?',
          a:
            topUsers.name === growing.name
              ? `${growing.name} leads the growing-team standings and has the highest user ratings of all ${atsTools.length}.`
              : `${growing.name} leads the growing-team standings on the data. ${topUsers.name} has the highest user ratings of all ${atsTools.length} (${topUsers.computed.user_score.toFixed(2)})${atsScores(topUsers).value <= 2 ? ', but its price is quote-only' : ''}.`,
          href: '/guides/best-ats-for-small-teams',
          link: 'See the growing-team standings',
        },
        {
          q: 'Scaling past 50 hires a year?',
          a: `${scaling.name} leads the scaling-team standings on the data${atsScores(scaling).value > 2 ? ' and publishes its price' : ''}. ${atsTools
            .filter((t) => t.segment === 'scaling' && atsScores(t).value <= 2)
            .map((t) => t.name)
            .join(', ')} are quote-only.`,
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
        text: 'Tell us how many people you hire, how big you are and what you can spend. We rule out every system that doesn\u2019t fit and give you one pick, with the real price.',
        href: '/what-should-i-use?side=hiring#questions',
        label: 'What should we use?',
      }}
      board={{
        title: 'Applicant tracking systems',
        checked: `data as of ${shortDate(atsAsOf)}`,
        rows: hiringBoard().map((r) => ({ ...r, tag: tagFor[r.id] })),
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
