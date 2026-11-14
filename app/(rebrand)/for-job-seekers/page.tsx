import type { Metadata } from 'next'
import { Hub } from '@/app/(rebrand)/_components/hub'
import { CostCalculator } from '@/app/(rebrand)/_components/cost-calculator'
import { calcTools, money, seekerBoard, shortDate } from '@/app/(rebrand)/_components/data'
import { benchmarks, formatCount, formatMonth, guide, latestCheck, resumeTools, risingPick, videos } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/for-job-seekers' },
  title: 'For Job Seekers: Resume Tools, Ranked on Real Reviews and Prices',
  description:
    'Resume builders and ATS checkers scored on dated public data: what users say, what independent reviewers pick, and what a year really costs.',
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
    { t: byId[risingPick.tool], label: "Stephanie's pick" },
  ]

  return (
    <Hub
      side="seekers"
      title="The tools that get you seen, and which ones are worth paying for."
      dek="Resume builders and ATS checkers, scored on dated public data: what users say, what independent reviewers pick, and what a year really costs. Picked out by a recruiter who reads the other side."
      dateline={`Checked ${shortDate(checked)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={all.map((t) => ({ domain: t.domain, name: t.name, href: `/reviews/${t.id}`, tip: `${t.name} · ${t.overall !== null ? t.overall.toFixed(2) : 'not scored'}` }))}
      feature={{
        domain: top.domain,
        name: top.name,
        title: 'Best overall right now',
        line: `${top.rawUserScore?.toFixed(1)} from ${formatCount(top.citableReviews)} users, named by ${top.counted.length} independent lists, and first on our scoreboard too. The free version is actually useful.`,
        href: `/reviews/${top.id}`,
        linkText: `Is ${top.name} worth it?`,
      }}
      situations={[
        {
          q: 'Applying and hearing nothing back?',
          a: "Often no person has read it yet: 88% of employers in a Harvard Business School study agreed their systems filter out qualified people who don\u2019t match the posting\u2019s exact criteria. Use the posting\u2019s words, then run a checker.",
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
          q: 'Interview coming up?',
          a: 'Practice the questions structured interviews actually use, the follow-ups you will hear, and what a strong answer shows. Free.',
          href: '/interview-practice',
          link: 'Practice for your interview',
        },
        {
          q: 'Losing track of applications?',
          a: `${top.name} keeps every application, contact and follow-up in one pipeline, and its free version is enough to run a whole search.`,
          href: `/reviews/${top.id}`,
          link: `Read the ${top.name} review`,
        },
      ]}
      situationsCta={{
        text: 'Tell us what\u2019s going wrong and what you can spend. We cross off every tool that doesn\u2019t fit and give you one pick, with the real cost.',
        href: '/what-should-i-use?side=seekers#questions',
        label: 'What should I use?',
      }}
      board={{
        title: 'Resume builders and checkers',
        checked: `checked ${shortDate(checked)}`,
        rows: seekerBoard().map((r) => ({ ...r, tag: pickRows.find((x) => x.t.id === r.id)?.label })),
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
