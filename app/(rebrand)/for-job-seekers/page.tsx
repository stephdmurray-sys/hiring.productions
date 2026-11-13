import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import { CostCalculator } from '@/app/(rebrand)/_components/cost-calculator'
import { calcTools, money, seekerBoard, shortDate } from '@/app/(rebrand)/_components/data'
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

export default function Page() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const top = byId[guide.picks[0].tool]
  const traps = all.filter((t) => t.yearCost?.renewsEvery4Weeks)
  const checked = latestCheck()
  const resumeIo = byId['resume-io']

  const pickRows = [
    ...guide.picks.map((p) => ({ t: byId[p.tool], label: p.label })),
    { t: byId[risingPick.tool], label: risingPick.label },
  ]

  return (
    <Hub
      side="seekers"
      title="The tools that get you seen, ranked by someone who reads the other side."
      dek="Resume builders and ATS checkers, scored on dated public evidence and judged by a recruiter who knows what happens after you click apply."
      dateline={`Evidence checked ${shortDate(checked)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={all.map((t) => ({ domain: t.domain, name: t.name, href: `/reviews/${t.id}` }))}
      feature={{
        domain: top.domain,
        name: top.name,
        title: 'Best overall right now',
        line: `${top.userScore?.toFixed(1)} from ${formatCount(top.citableReviews)} users, named by ${top.counted.length} independent lists, and first on our scoreboard too. The free tier is a real product.`,
        href: `/reviews/${top.id}`,
        linkText: `Is ${top.name} worth it?`,
      }}
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
          href: '/reviews/flowcv',
          link: 'Read the FlowCV review',
        },
        {
          q: 'Worried about surprise charges?',
          a: `${traps.map((t) => t.name).join(' and ')} renew every 4 weeks, which is 13 charges a year. Drag the calculator below to your timeline.`,
          href: '#cost',
          link: 'See what your search will cost',
        },
        {
          q: 'Losing track of applications?',
          a: `${top.name} keeps every application, contact and follow-up in one pipeline, and its free tier is enough to run a search.`,
          href: `/reviews/${top.id}`,
          link: `Read the ${top.name} review`,
        },
      ]}
      picks={pickRows.map(({ t, label }) => ({
        href: `/reviews/${t.id}`,
        label,
        name: t.name,
        domain: t.domain,
        line: LINES[t.id] ?? t.bestFor,
        overall: t.overall,
        users: t.userScore,
        usersNote: `${formatCount(t.citableReviews)} citable user reviews`,
      }))}
      board={{
        title: 'Resume builders and checkers',
        checked: `checked ${shortDate(checked)}`,
        rows: seekerBoard(),
        foot: (
          <>
            Coral bar: renews every 4 weeks. {resumeIo.name} costs <b>{money(resumeIo.yearCost!.amount)}</b> a year if you forget to cancel.
          </>
        ),
      }}
      extra={
        <section className="wrap sec" id="cost">
          <h2>What will your search actually cost?</h2>
          <p className="lead">Drag to your timeline. Every tool re-sorts by the cheapest way to pay, and shows what happens if you forget to cancel.</p>
          <div style={{ marginTop: 36 }}>
            <CostCalculator tools={calcTools()} checked={shortDate(checked)} />
          </div>
        </section>
      }
      risingPick={{ t: byId[risingPick.tool], line: risingPick.line, confirmed: risingPick.confirmed }}
      guides={[
        {
          href: '/guides/best-resume-tools',
          title: 'The best resume tools of 2026',
          detail: `${all.length} builders and checkers, ${benchmarks.length} rival lists, ${videos.length} labeled demo videos, and what your search will cost.`,
          meta: `Checked ${shortDate(checked)}`,
          logos: all.slice(0, 6).map((t) => ({ domain: t.domain, name: t.name })),
        },
      ]}
      inResearch="job search trackers, interview practice, career coaching and LinkedIn profile tools"
    />
  )
}
