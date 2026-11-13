import type { Metadata } from 'next'
import { Hub, HubLogo } from '@/app/(rebrand)/_components/hub'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { formatDate, formatMonth, guide } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-hiring-teams' },
  title: 'For Hiring Teams: Software and Training Ranked on Evidence',
  description:
    'Applicant tracking systems ranked by team size and recruiter training ranked for how you recruit, scored on dated public evidence and a practitioner’s read.',
}

const PICKS = [
  { name: 'Manatal', label: 'Small teams pick', line: 'Serious features at $15 per user, no recruiter required.' },
  { name: 'Pinpoint', label: 'Growing teams pick', line: 'Highest user scores of all 14 systems we rank.' },
  { name: 'Ashby', label: 'Scaling teams pick', line: 'What the strongest scaling recruiting teams run.' },
]

export default function Page() {
  const byName = Object.fromEntries(ats.tools.map((t) => [t.name, t]))
  const top = byName['Manatal']
  const rate = top.momentum?.annualized_growth
  const growth = typeof rate === 'number' ? Math.round(rate * 100) : null

  return (
    <Hub
      side="hiring"
      title="The software behind well-run hiring, ranked by someone who has run it."
      dek="Applicant tracking systems ranked by team size and recruiter training ranked for how you recruit, scored on dated public evidence and a practitioner's read of what holds up in live hiring."
      proof={`ATS data as of ${formatDate(ats.as_of)} · next check ${formatMonth(guide.nextCheck)}`}
      heroCard={
        <div className="hub-card">
          <p className="hc-k">Small teams pick right now</p>
          <div className="hc-id">
            <span className="mini-logo">
              <HubLogo domain={top.domain} />
            </span>
            <b>{top.name}</b>
          </div>
          <div className="hc-rows">
            <div>
              <span>User score</span>
              <b>{top.computed.user_score.toFixed(1)}</b>
            </div>
            {growth !== null && (
              <div>
                <span>Review growth</span>
                <b>+{growth}% a year</b>
              </div>
            )}
            <div>
              <span>Starting price</span>
              <b>{top.sources.pricing}</b>
            </div>
          </div>
          <a className="hc-go" href="/guides/best-ats-for-small-teams">
            See all 14, ranked &rarr;
          </a>
        </div>
      }
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
          a: 'AIRS for the industry-standard credential set, SourceCon Academy for the deepest sourcing curriculum.',
          href: '/guides/best-recruiter-training',
          link: 'See the training guide',
        },
      ]}
      situationsCta={{
        text: 'Not sure where to start? Tell us how you hire, and we recommend a stack. Free, and no vendor can pay their way into the answer.',
        href: '/consulting',
        label: 'Get a recommendation',
      }}
      picks={PICKS.map((p) => {
        const t = byName[p.name]
        return {
          href: '/guides/best-ats-for-small-teams',
          label: p.label,
          name: p.name,
          domain: t.domain,
          line: p.line,
          stats: [
            { value: t.overall_draft.toFixed(2), label: 'overall' },
            { value: t.computed.user_score.toFixed(1), label: 'user score' },
          ],
        }
      })}
      guides={[
        {
          href: '/guides/best-ats-for-small-teams',
          title: 'The 14 best applicant tracking systems, ranked by team size',
          detail: 'Small, growing and scaling teams each get their own standings and their own pick.',
          meta: `Data as of ${formatDate(ats.as_of)}`,
        },
        {
          href: '/guides/best-recruiter-training',
          title: 'Recruiter training and certifications',
          detail: '19 programs, from sourcing and closing craft to SHRM and HRCI exam prep.',
          meta: 'Updated August 23, 2026',
        },
      ]}
      inResearch={['Recruiting software for startups', 'Candidate assessments', 'High-volume hiring', 'Healthcare and clinical recruiting']}
    />
  )
}
