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
      title="The software behind well-run hiring, and which ones are worth paying for."
      dek="Applicant tracking systems ranked by team size on dated public data: what users say, how the market is moving, and whether the price is public. Every number has a date and a source."
      dateline={`ATS data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={atsTools.map((t) => ({ domain: t.domain, name: t.name, href: atsHref(t.name), tip: `${t.name} · ${atsScores(t).overall.toFixed(2)}` }))}
      feature={{
        domain: hiringPick.domain,
        name: hiringPick.name,
        title: "Stephanie's top pick",
        line: `${hiringPick.line} ${hiringPick.facts}.`,
        href: '#rising',
        linkText: 'Why it’s her pick',
      }}
      situations={[
        {
          q: 'Need to find people who aren’t applying?',
          a: `${hiringPick.name} is Stephanie's top pick: search for people in plain language instead of Boolean strings. We’re building a ranking of sourcing tools next.`,
          href: '#rising',
          link: `Why ${hiringPick.name}`,
        },
        {
          q: 'Hiring under 20 people a year?',
          a: `${small.name} is top-rated for small teams (${atsScores(small).overall.toFixed(2)}). ${atsTools
            .filter((t) => t.segment === 'small' && t.sources.free_tier)
            .map((t) => t.name)
            .join(' and ')} have free tiers.`,
          href: '/guides/best-ats-for-small-teams#tier-small',
          link: 'See the small-team rankings',
        },
        {
          q: 'Bringing on your first recruiter?',
          a:
            topUsers.name === growing.name
              ? `${growing.name} is top-rated for growing teams and has the highest user ratings of all ${atsTools.length}.`
              : `${growing.name} is top-rated for growing teams. ${topUsers.name} has the highest user ratings of all ${atsTools.length} (${topUsers.computed.user_score.toFixed(2)})${atsScores(topUsers).value <= 2 ? ', but you have to ask for its price' : ''}.`,
          href: '/guides/best-ats-for-small-teams#tier-growing',
          link: 'See the growing-team rankings',
        },
        {
          q: 'Scaling past 50 hires a year?',
          a: `${scaling.name} is top-rated for scaling teams${atsScores(scaling).value > 2 ? ' and lists its price' : ''}. ${atsTools
            .filter((t) => t.segment === 'scaling' && atsScores(t).value <= 2)
            .map((t) => t.name)
            .join(', ')} make you ask for a quote.`,
          href: '/guides/best-ats-for-small-teams#tier-scaling',
          link: 'See the scaling-team rankings',
        },
        {
          q: 'Training a recruiting team?',
          a: 'AIRS for the industry-standard credential set. SourceCon Academy for the deepest sourcing curriculum.',
          href: '/guides/best-recruiter-training',
          link: 'Read the training guide',
        },
      ]}
      situationsCta={{
        text: 'Tell us how many people you hire, how big you are and what you can spend. We cross off every system that doesn\u2019t fit and give you one pick, with the real price.',
        href: '/what-should-i-use?side=hiring#questions',
        label: 'What should I use?',
      }}
      board={{
        title: 'Applicant tracking systems',
        checked: `data as of ${shortDate(atsAsOf)}`,
        heading: 'How the systems rank',
        lead: `Ratings and prices as of ${shortDate(atsAsOf)}. We check them all again in December.`,
        rows: hiringBoard().map((r) => ({ ...r, tag: tagFor[r.id] })),
        foot: <>Ranked here on one board. The guide splits them by team size: small, growing and scaling.</>,
      }}
      extra={
        <section className="wrap sec" id="tools">
          <h2>Free tools, built on published standards</h2>
          <p className="lead">Nothing you type is kept unless you ask us to email it.</p>
          <div className="rows">
            {[
              {
                q: 'What should we ask in the interview?',
                a: 'A structured scorecard for any role: the same questions for every candidate, probes and a 1 to 5 scale, on the US Office of Personnel Management\u2019s method.',
                href: '/interview-scorecard',
                link: 'Build a scorecard',
              },
              {
                q: 'What does a hire really cost?',
                a: 'Cost per hire the way SHRM counts it, next to SHRM\u2019s 2025 medians: $1,200 per non-executive hire and $10,625 per executive hire.',
                href: '/hiring-costs',
                link: 'Work out your cost per hire',
              },
              {
                q: 'Is this even a real candidate?',
                a: 'The FBI\u2019s red flags for fake candidates as a checklist for your interviewers, and which systems flag fraud for you.',
                href: '/is-this-a-real-candidate',
                link: 'See the red flags',
              },
            ].map((t) => (
              <div className="row" key={t.href}>
                <span className="row-title">{t.q}</span>
                <div>
                  <p>{t.a}</p>
                  <a className="tl tl-strong" href={t.href}>
                    {t.link} <span className="arr">&rarr;</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      }
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
      ]}
      inResearch="recruiting software for startups, candidate assessments, high-volume hiring, and healthcare and clinical recruiting"
    />
  )
}
