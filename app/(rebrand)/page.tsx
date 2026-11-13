import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import ats from '@/lib/scorecards/ats-small-teams.json'
import {
  STATUS_LABEL,
  benchmarks,
  formatCount,
  formatDate,
  formatMonth,
  guide,
  latestCheck,
  resumeTools,
  risingPick,
  videos,
  type ListStatus,
} from '@/lib/evidence'
import { homeCss } from './home-css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Hiring Is a Production. We Are Here for Everyone in It.',
  description:
    'Independent reviews of the tools on both sides of hiring. Every score carries the date we checked it, and no vendor can pay for a place.',
}

const ATS_PICKS = [
  { name: 'Manatal', label: 'Small teams', line: 'Serious features at $15 per user, with no recruiter required.' },
  { name: 'Pinpoint', label: 'Growing teams', line: 'Highest user scores of all 14 systems we rank.' },
  { name: 'Ashby', label: 'Scaling teams', line: 'What the strongest scaling recruiting teams run.' },
]

const SEEKER_LINES: Record<string, string> = {
  teal: 'Checker, builder and job tracker in one, on a free tier that is a real product.',
  kickresume: '$96 a year is the whole price, and students get six months free.',
  flowcv: 'The only builder here that hands you a clean PDF for nothing.',
}

const IN_RESEARCH =
  'job search trackers, interview practice, career coaching, LinkedIn profile tools, recruiting software for startups, candidate assessments and high-volume hiring'

function Logo({ domain, size = 16 }: { domain: string; size?: number }) {
  return (
    <img className="logo-img" src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} width={size} height={size} alt="" />
  )
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

function listNames(names: string[]) {
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export default function Home() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const atsByName = Object.fromEntries(ats.tools.map((t) => [t.name, t]))
  const checked = latestCheck()

  const resumeIo = byId['resume-io']
  const teal = byId['teal']
  const rising = byId[risingPick.tool]
  const flexjobs = benchmarks.find((l) => l.id === 'flexjobs-resume-builders')

  const counting = benchmarks.filter((l) => l.status === 'counts').length
  const tally = benchmarks.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {})
  const order: ListStatus[] = ['counts', 'stale', 'ranks-itself', 'owner-conflict', 'lead-page']

  const seekerRows = [
    ...guide.picks.map((p) => ({ t: byId[p.tool], label: p.label })),
    { t: rising, label: "Stephanie's up-and-coming pick" },
  ]
  const toolsScored = all.length + ats.tools.length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss }} />
      <SiteNav />

      <header className="ph home-ph">
        <div className="wrap">
          <h1 className="display">
            Hiring is a production.
            <br />
            We&rsquo;re here for everyone in&nbsp;it.
          </h1>
          <div className="home-grid">
            <div>
              <p className="dek">
                Independent reviews of the tools on both sides of hiring. Every score carries the date we checked it, and no vendor can
                pay for a place.
              </p>
              <div className="doors">
                <a className="door" href="/for-job-seekers">
                  <span className="door-k">
                    <span className="dot-seekers" />
                    I&rsquo;m getting hired
                  </span>
                  <span className="door-d">Resume builders and ATS checkers, ranked on evidence, with what a year of each costs</span>
                  <span className="door-arr" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
                <a className="door" href="/for-hiring-teams">
                  <span className="door-k">
                    <span className="dot-hiring" />
                    I&rsquo;m hiring
                  </span>
                  <span className="door-d">Applicant tracking systems ranked by team size, and recruiter training</span>
                  <span className="door-arr" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>

            <aside className="receipt" aria-label="From this month's evidence file">
              <p className="receipt-h">From this month&rsquo;s evidence file</p>
              <dl>
                <div>
                  <dt>{resumeIo.name}</dt>
                  <dd>
                    {resumeIo.yearCost && <b>{money(resumeIo.yearCost.amount)}</b>} a year if you forget to cancel. It renews every 4
                    weeks.
                  </dd>
                </div>
                <div>
                  <dt>{teal.name}</dt>
                  <dd>
                    Named by{' '}
                    {listNames(teal.counted.map((a) => (a.position ? `${a.list.publication} (#${a.position})` : a.list.publication)))}.
                    We rank it first too.
                  </dd>
                </div>
                {flexjobs && (
                  <div>
                    <dt>{flexjobs.publication}&rsquo;s list</dt>
                    <dd>Its top four builders are all owned by its parent company. We show it and don&rsquo;t count it.</dd>
                  </div>
                )}
                <div>
                  <dt>{rising.name}</dt>
                  <dd>
                    {rising.userScore?.toFixed(1)} from {formatCount(rising.citableReviews)} users. Stephanie&rsquo;s up-and-coming pick.
                  </dd>
                </div>
              </dl>
              <p className="receipt-foot">
                Checked {shortDate(checked)} &middot; next check {formatMonth(guide.nextCheck)}
              </p>
            </aside>
          </div>
        </div>
      </header>

      <section className="wrap sec" id="picks">
        <h2>This month&rsquo;s picks</h2>
        <p className="lead">The tools leading on the evidence right now, on both sides of the table.</p>
        <div className="tscroll">
          <table className="ledger picks-table">
            <thead>
              <tr>
                <th>Pick</th>
                <th>Tool</th>
                <th>Why</th>
                <th className="num">Overall</th>
                <th className="num">Users</th>
              </tr>
            </thead>
            <tbody>
              <tr className="group">
                <td colSpan={5}>
                  <span className="dot-seekers" />
                  For job seekers
                </td>
              </tr>
              {seekerRows.map(({ t, label }) => (
                <tr key={t.id}>
                  <td className="pick-cell">{label}</td>
                  <td className="tool-cell">
                    <Logo domain={t.domain} />
                    <a href={`/guides/best-resume-tools#evidence-${t.id}`}>{t.name}</a>
                  </td>
                  <td>{SEEKER_LINES[t.id] ?? t.bestFor}</td>
                  <td className="num tscore">{t.overall?.toFixed(2)}</td>
                  <td className="num">
                    {t.userScore?.toFixed(1)} <span className="muted">({formatCount(t.citableReviews)})</span>
                  </td>
                </tr>
              ))}
              <tr className="group">
                <td colSpan={5}>
                  <span className="dot-hiring" />
                  For hiring teams
                </td>
              </tr>
              {ATS_PICKS.map((p) => {
                const t = atsByName[p.name]
                return (
                  <tr key={p.name}>
                    <td className="pick-cell">{p.label}</td>
                    <td className="tool-cell">
                      <Logo domain={t.domain} />
                      <a href="/guides/best-ats-for-small-teams">{p.name}</a>
                    </td>
                    <td>{p.line}</td>
                    <td className="num tscore">{t.overall_draft.toFixed(2)}</td>
                    <td className="num">{t.computed.user_score.toFixed(1)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="footnote">
          Overall blends market, user and practitioner scores; practitioner scores are in final review. Resume ratings read{' '}
          {formatDate(all.flatMap((t) => t.ratings.map((r) => r.asOf)).sort().slice(-1)[0])}; ATS data as of {formatDate(ats.as_of)}.
        </p>
      </section>

      <section className="wrap sec" id="lists">
        <div className="split">
          <div>
            <h2>Who owns the list you&rsquo;re reading?</h2>
            <p className="lead">
              Some of the most visible &ldquo;best resume builder&rdquo; lists are published by companies that sell resume builders. We
              read every list you&rsquo;re likely to see, every month, and count only the current, independent ones. The rest stay on the
              page with the reason.
            </p>
            <p style={{ marginTop: 22 }}>
              <a className="tl tl-strong" href="/guides/best-resume-tools#agree">
                See all {benchmarks.length} lists and where they land &rarr;
              </a>
            </p>
          </div>
          <table className="ledger tally">
            <thead>
              <tr>
                <th>Lists we checked this month</th>
                <th className="num">{benchmarks.length}</th>
              </tr>
            </thead>
            <tbody>
              {order
                .filter((k) => tally[k])
                .map((k) => (
                  <tr key={k} className={k === 'counts' ? 'tally-counts' : undefined}>
                    <td>
                      {STATUS_LABEL[k]}
                      <span className="bar" aria-hidden="true">
                        <i style={{ width: `${(tally[k] / benchmarks.length) * 100}%` }} />
                      </span>
                    </td>
                    <td className="num">{tally[k]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap sec" id="guides">
        <h2>The guides</h2>
        <div className="rows">
          <a className="row guide-row" href="/guides/best-resume-tools">
            <span>
              <span className="dot-seekers" />
              Job seekers
              <span className="mono guide-date">Checked {shortDate(checked)}</span>
            </span>
            <span>
              <span className="row-title">The best resume tools of 2026</span>
              <span className="guide-d">
                {all.length} builders and checkers, {benchmarks.length} rival lists, {videos.length} labeled demo videos, and what a year
                of each costs.
              </span>
            </span>
          </a>
          <a className="row guide-row" href="/guides/best-ats-for-small-teams">
            <span>
              <span className="dot-hiring" />
              Hiring teams
              <span className="mono guide-date">Data as of {shortDate(ats.as_of)}</span>
            </span>
            <span>
              <span className="row-title">The 14 best applicant tracking systems, ranked by team size</span>
              <span className="guide-d">Small, growing and scaling teams each get their own standings and their own pick.</span>
            </span>
          </a>
          <a className="row guide-row" href="/guides/best-recruiter-training">
            <span>
              <span className="dot-hiring" />
              Hiring teams
              <span className="mono guide-date">Updated 23 Aug 2026</span>
            </span>
            <span>
              <span className="row-title">Recruiter training and certifications</span>
              <span className="guide-d">19 programs, from sourcing and closing craft to SHRM and HRCI exam prep.</span>
            </span>
          </a>
        </div>
        <p className="footnote">In research now: {IN_RESEARCH}.</p>
      </section>

      <section className="wrap sec" id="method">
        <div className="split">
          <h2>How we review</h2>
          <div className="prose">
            <p>
              Every rating, price and list on this site comes from a public source, carries the date we read it, and is saved to the
              Internet Archive so you can check it.
            </p>
            <p>
              Each month we compare our rankings with the lists you&rsquo;re likely to read. Where we land somewhere else, the review says
              why. The final read is a recruiter&rsquo;s: what holds up in live hiring, and what only demos well.
            </p>
            <p>
              So far that&rsquo;s {toolsScored} tools scored, {benchmarks.length} rival lists checked and {videos.length} demo videos
              labeled by who made them. Paid placements: none.
            </p>
            <p>
              <a className="tl tl-strong" href="/how-we-review">
                Read the full methodology &rarr;
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sec-tight" id="radar">
        <div className="split split-radar">
          <h2 className="h2-small">On our radar</h2>
          <div>
            <p className="sublead">New tools we&rsquo;re watching before they earn a ranking.</p>
            <ul className="radar-list">
              <li>
                <Logo domain="metaview.ai" />
                <b>Metaview</b> AI interview notes
              </li>
              <li>
                <Logo domain="juicebox.ai" />
                <b>Juicebox</b> AI sourcing search
              </li>
            </ul>
            <p className="footnote">
              Building a hiring tool? Listing is free. <a href="/for-vendors">Tell us about it</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sec-tight" id="signup">
        <div className="signup-block">
          <div>
            <h2 className="h2-small">The monthly evidence check</h2>
            <p className="sublead">One email a month with what changed: rankings that moved and prices that went up.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
