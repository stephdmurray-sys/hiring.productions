import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { formatMonth, guide } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-hiring-teams' },
  title: 'For Hiring Teams: Software and Training Ranked on Evidence',
  description:
    'Applicant tracking systems ranked by team size and recruiter training ranked for how you recruit, scored on dated public evidence and a practitioner’s read.',
}

const PICKS = [
  { name: 'Manatal', label: 'Small teams', line: 'Serious features at $15 per user, with no recruiter required.' },
  { name: 'Pinpoint', label: 'Growing teams', line: 'Highest user scores of all 14 systems we rank.' },
  { name: 'Ashby', label: 'Scaling teams', line: 'What the strongest scaling recruiting teams run.' },
]

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

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
      dateline={`ATS data as of ${shortDate(ats.as_of)} · next check ${formatMonth(guide.nextCheck)}`}
      receipt={
        <aside className="receipt" aria-label="Small teams pick right now">
          <p className="receipt-h">Small teams pick right now: {top.name}</p>
          <dl>
            <div>
              <dt>User score</dt>
              <dd>{top.computed.user_score.toFixed(1)} on public reviews</dd>
            </div>
            {growth !== null && (
              <div>
                <dt>Review growth</dt>
                <dd>+{growth}% a year, the fastest of all 14</dd>
              </div>
            )}
            <div>
              <dt>Price</dt>
              <dd>{top.sources.pricing}</dd>
            </div>
          </dl>
          <p className="receipt-foot">
            <a className="tl" href="/guides/best-ats-for-small-teams">
              See all 14, ranked by team size
            </a>
          </p>
        </aside>
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
      picks={PICKS.map((p) => {
        const t = byName[p.name]
        return {
          href: '/guides/best-ats-for-small-teams',
          label: p.label,
          name: p.name,
          domain: t.domain,
          line: p.line,
          overall: t.overall_draft.toFixed(2),
          users: t.computed.user_score.toFixed(1),
        }
      })}
      guides={[
        {
          href: '/guides/best-ats-for-small-teams',
          title: 'The 14 best applicant tracking systems, ranked by team size',
          detail: 'Small, growing and scaling teams each get their own standings and their own pick.',
          meta: `Data as of ${shortDate(ats.as_of)}`,
        },
        {
          href: '/guides/best-recruiter-training',
          title: 'Recruiter training and certifications',
          detail: '19 programs, from sourcing and closing craft to SHRM and HRCI exam prep.',
          meta: 'Updated 23 Aug 2026',
        },
      ]}
      inResearch="recruiting software for startups, candidate assessments, high-volume hiring, and healthcare and clinical recruiting"
    />
  )
}
