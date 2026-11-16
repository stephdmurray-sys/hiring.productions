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
    { t: byId[risingPick.tool], label: risingPick.label },
  ]

  return (
    <Hub
      side="seekers"
      title="The tools that get you seen, and which ones are worth paying for."
      dek="Resume builders and ATS checkers, scored on public reviews and real prices."
      dateline={`Checked ${shortDate(checked)} · next check ${formatMonth(guide.nextCheck)}`}
      logos={all.map((t) => ({ domain: t.domain, name: t.name, href: `/reviews/${t.id}`, tip: `${t.name} · ${t.overall !== null ? t.overall.toFixed(2) : 'not scored'}` }))}
      board={{
        title: 'Resume builders and checkers',
        checked: `checked ${shortDate(checked)}`,
        rows: seekerBoard().map((r) => ({ ...r, tag: pickRows.find((x) => x.t.id === r.id)?.label })),
        foot: (
          <>
            Coral bar: renews every 4 weeks. {resumeIo.name} costs <b>{money(resumeIo.yearCost!.amount)}</b> a year if you forget to cancel.{' '}
            <a className="tl" href="/guides/best-resume-tools#cost">
              What will your search cost?
            </a>
          </>
        ),
      }}
      guides={[
        {
          href: '/guides/best-resume-tools',
          title: 'The best resume tools of 2026',
          detail: `${all.length} builders and checkers, ${benchmarks.length} rival lists, ${videos.length} labeled demo videos, and what your search will cost.`,
          meta: `Checked ${shortDate(checked)}`,
          logos: all.slice(0, 6).map((t) => ({ domain: t.domain, name: t.name })),
        },
        {
          href: '/build-your-stack',
          title: 'What will your job search cost?',
          detail: 'Click a tool into each part of your search and watch the bill: your timeline, the cost if you forget to cancel, and the $0 version.',
          meta: 'Free stack builder',
          logos: [],
        },
        {
          href: '/guides/best-resume-tools#cost',
          title: 'What will one tool cost?',
          detail: 'Drag to your timeline and every tool re-sorts by the cheapest way to pay, with what happens if you forget to cancel.',
          meta: 'Free calculator',
          logos: [],
        },
        {
          href: '/interview-practice',
          title: 'What will they ask me in the interview?',
          detail: 'The questions structured interviews use, the follow-ups you will hear, and what a strong answer shows.',
          meta: 'Free practice',
          logos: [],
        },
        {
          href: '/free-job-search',
          title: 'The $0 job search',
          detail: 'The resume tools with a real free version, what free gets you, and the free tools on this site.',
          meta: 'Free list',
          logos: [],
        },
        {
          href: '/how-ats-actually-works',
          title: 'What does the screening software do to my resume?',
          detail: 'What published research and the systems\u2019 own product pages say, and what to do about each one.',
          meta: 'Explainer, sourced',
          logos: [],
        },
        {
          href: '/show-how-you-work',
          title: 'How do I show employers how I work before the interview?',
          detail: 'Proof from the people who have worked with you and from your work, in three steps.',
          meta: 'Free checklist',
          logos: [],
        },
        {
          href: '/is-this-list-paid-for',
          title: 'Is this best-of list paid for?',
          detail: 'Who wrote the list you\u2019re reading, and the four checks to run on any list.',
          meta: 'Free check',
          logos: [],
        },
        {
          href: '/guides/portfolio-sites',
          title: 'Portfolio sites to know',
          detail: 'Where to show your work, sorted by the kind of work you do, and what to use when your work isn\u2019t something you can post.',
          meta: 'Short list, no scores yet',
          logos: [],
        },
        {
          href: '/is-this-a-real-job',
          title: 'Is this job even real?',
          detail: 'The signs to check before you send a resume or anything else.',
          meta: 'Free checklist',
          logos: [],
        },
        {
          href: '/compare',
          title: 'Down to two tools?',
          detail: 'Any two resume tools side by side: the scores, what each costs, the free versions and a video of each.',
          meta: 'Comparisons',
          logos: [],
        },
      ]}
      inResearch="job search trackers, interview practice, career coaching and LinkedIn profile tools"
    />
  )
}
