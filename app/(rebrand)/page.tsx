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
    'Independent reviews of the tools on both sides of hiring. Every score is dated, every rival list is checked monthly, and no vendor can pay for a place.',
}

const ATS_PICKS = [
  { name: 'Manatal', label: 'Small teams pick', line: 'Serious features at $15 per user, no recruiter required.' },
  { name: 'Pinpoint', label: 'Growing teams pick', line: 'Highest user scores of all 14 systems we rank.' },
  { name: 'Ashby', label: 'Scaling teams pick', line: 'What the strongest scaling recruiting teams run.' },
]

const IN_RESEARCH = {
  seekers: ['Job search trackers', 'Interview practice', 'Career coaching', 'LinkedIn profile tools'],
  hiring: ['Recruiting software for startups', 'Candidate assessments', 'High-volume hiring'],
}

function Logo({ domain, size = 20 }: { domain: string; size?: number }) {
  return (
    <img
      className="logo-img"
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      width={size}
      height={size}
      alt=""
    />
  )
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

export default function Home() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const atsByName = Object.fromEntries(ats.tools.map((t) => [t.name, t]))
  const checked = latestCheck()

  // Hero evidence cards, all from the data layer
  const resumeIo = byId['resume-io']
  const teal = byId['teal']
  const flexjobs = benchmarks.find((l) => l.id === 'flexjobs-resume-builders')
  const builders = all.filter((t) => t.segment === 'builder').length

  // Why lists don't count, tallied from benchmarks.json
  const counting = benchmarks.filter((l) => l.status === 'counts').length
  const tally = benchmarks.reduce<Record<string, number>>((acc, l) => {
    if (l.status !== 'counts') acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {})

  const seekerPicks = [
    ...guide.picks.map((p) => ({ t: byId[p.tool], label: p.label, rising: false })),
    { t: byId[risingPick.tool], label: risingPick.label, rising: true },
  ]
  const toolsScored = all.length + ats.tools.length

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss }} />
      <SiteNav />

      <header className="h-hero">
        <div className="wrap h-grid">
          <div className="h-copy">
            <h1>
              Hiring is a production.
              <br />
              We&rsquo;re here for everyone in it.
            </h1>
            <p className="h-sub">
              Independent reviews of the tools on both sides of hiring. Every score is dated, every rival list is checked monthly, and
              no vendor can pay for a place.
            </p>
            <div className="doors">
              <a className="door door-seekers" href="/for-job-seekers">
                <span className="door-k">I&rsquo;m getting hired</span>
                <span className="door-d">Resume builders, ATS checkers, and what a year of each really costs</span>
                <span className="door-go" aria-hidden="true">
                  &rarr;
                </span>
              </a>
              <a className="door door-hiring" href="/for-hiring-teams">
                <span className="door-k">I&rsquo;m hiring</span>
                <span className="door-d">Applicant tracking systems ranked by team size, plus recruiter training</span>
                <span className="door-go" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
            <p className="h-proof">
              <span className="pulse" aria-hidden="true" /> Evidence checked {formatDate(checked)} &middot; next check{' '}
              {formatMonth(guide.nextCheck)}
            </p>
          </div>

          <div className="stack" aria-label="Examples from our evidence files">
            {flexjobs && (
              <div className="ecard ecard-c">
                <p className="ec-k">Who owns the list?</p>
                <p className="ec-big">{flexjobs.publication}&rsquo;s top 4</p>
                <div className="ec-pills">
                  {flexjobs.picks.slice(0, 4).map((p) => (
                    <span key={p.name ?? p.tool}>{p.name ?? byId[p.tool!]?.name}</span>
                  ))}
                </div>
                <p className="ec-foot">All four owned by its parent company. Not counted.</p>
              </div>
            )}
            <div className="ecard ecard-b">
              <div className="ec-head">
                <span className="ec-logo">
                  <Logo domain={teal.domain} />
                </span>
                <b>{teal.name}</b>
                <span className="stance stance-agrees">Agrees with the field</span>
              </div>
              <div className="ec-dots">
                {teal.counted.map((a) => (
                  <span key={a.list.id}>
                    <i>{a.position ? `#${a.position}` : 'Pick'}</i>
                    {a.list.publication}
                  </span>
                ))}
              </div>
            </div>
            <div className="ecard ecard-a">
              <div className="ec-head">
                <span className="ec-logo">
                  <Logo domain={resumeIo.domain} />
                </span>
                <b>{resumeIo.name}</b>
                <span className="stance stance-breaks">Breaks from the pack</span>
              </div>
              <div className="ec-rows">
                <div>
                  <span>Users</span>
                  <b>
                    {resumeIo.userScore?.toFixed(1)} <small>({formatCount(resumeIo.citableReviews)} reviews)</small>
                  </b>
                </div>
                <div>
                  <span>Other reviewers</span>
                  <b>{resumeIo.counted.map((a) => `${a.list.publication} pick`).join(', ') || 'None counted'}</b>
                </div>
                <div>
                  <span>Our rank</span>
                  <b>
                    #{resumeIo.rank} of {builders} builders
                  </b>
                </div>
                <div className="ec-cost">
                  <span>A year if you forget to cancel</span>
                  <b>{resumeIo.yearCost ? money(resumeIo.yearCost.amount) : 'n/a'}</b>
                </div>
              </div>
              <p className="ec-foot">Checked {formatDate(checked)}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="wrap" id="picks">
        <h2>This month&rsquo;s picks</h2>
        <p className="lead">The tools that lead on the evidence right now, on both sides of the table. Every card opens the full ranking.</p>

        <p className="side-label side-seekers">For job seekers</p>
        <div className="mini-grid">
          {seekerPicks.map(({ t, label, rising }) => (
            <a key={t.id} href={`/guides/best-resume-tools#evidence-${t.id}`} className={`mini${rising ? ' mini-rising' : ''}`}>
              <span className="mini-label">{label}</span>
              <span className="mini-id">
                <span className="mini-logo">
                  <Logo domain={t.domain} size={22} />
                </span>
                <b>{t.name}</b>
              </span>
              <span className="mini-stats">
                <span>
                  <b>{t.overall?.toFixed(2)}</b> overall
                </span>
                <span>
                  <b>{t.userScore?.toFixed(1)}</b> from {formatCount(t.citableReviews)} users
                </span>
              </span>
              <span className="mini-go">See the evidence &rarr;</span>
            </a>
          ))}
        </div>

        <p className="side-label side-hiring">For hiring teams</p>
        <div className="mini-grid">
          {ATS_PICKS.map((p) => {
            const t = atsByName[p.name]
            return (
              <a key={p.name} href="/guides/best-ats-for-small-teams" className="mini mini-hiring">
                <span className="mini-label">{p.label}</span>
                <span className="mini-id">
                  <span className="mini-logo">
                    <Logo domain={t.domain} size={22} />
                  </span>
                  <b>{p.name}</b>
                </span>
                <span className="mini-line">{p.line}</span>
                <span className="mini-stats">
                  <span>
                    <b>{t.overall_draft.toFixed(2)}</b> overall
                  </span>
                  <span>
                    <b>{t.computed.user_score.toFixed(1)}</b> user score
                  </span>
                </span>
                <span className="mini-go">See the ranking &rarr;</span>
              </a>
            )
          })}
        </div>
      </section>

      <section className="wrap" id="lists">
        <div className="band">
          <div className="band-copy">
            <p className="band-k">Who owns the list you&rsquo;re reading?</p>
            <h2>
              Some of the loudest &ldquo;best resume builder&rdquo; lists are published by companies that sell resume builders.
            </h2>
            <p className="band-p">
              We check every list you&rsquo;re likely to read, every month, and only count the independent, current ones. The rest stay on
              the page with the reason they don&rsquo;t count.
            </p>
            <a className="btn btn-light band-btn" href="/guides/best-resume-tools#agree">
              See how the lists compare &rarr;
            </a>
          </div>
          <div className="band-tally" aria-label="Lists we checked">
            <p className="tally-big">
              <b>{benchmarks.length}</b> lists checked
            </p>
            <div className="tally-row tally-counts">
              <span>Count</span>
              <span className="tally-bar">
                <i style={{ width: `${(counting / benchmarks.length) * 100}%` }} />
              </span>
              <b>{counting}</b>
            </div>
            {(Object.keys(tally) as ListStatus[]).map((k) => (
              <div className="tally-row" key={k}>
                <span>{STATUS_LABEL[k]}</span>
                <span className="tally-bar">
                  <i style={{ width: `${(tally[k] / benchmarks.length) * 100}%` }} />
                </span>
                <b>{tally[k]}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" id="guides">
        <h2>The guides</h2>
        <p className="lead">Each one ranks a whole category on dated evidence, names a winner for a specific situation, and shows its work.</p>
        <div className="guide-grid">
          <a className="gcard gcard-seekers" href="/guides/best-resume-tools">
            <span className="gside">Job seekers</span>
            <b>The best resume tools of 2026</b>
            <span>
              {all.length} builders and checkers, {benchmarks.length} rival lists, {videos.length} labeled demos
            </span>
            <span className="gmeta">Checked {formatDate(checked)}</span>
          </a>
          <a className="gcard gcard-hiring" href="/guides/best-ats-for-small-teams">
            <span className="gside">Hiring teams</span>
            <b>The 14 best applicant tracking systems, ranked by team size</b>
            <span>Small, growing and scaling teams, each with its own pick</span>
            <span className="gmeta">Data as of {formatDate(ats.as_of)}</span>
          </a>
          <a className="gcard gcard-hiring" href="/guides/best-recruiter-training">
            <span className="gside">Hiring teams</span>
            <b>Recruiter training and certifications</b>
            <span>19 programs, from sourcing craft to SHRM and HRCI exam prep</span>
            <span className="gmeta">Updated August 23, 2026</span>
          </a>
        </div>
        <div className="research">
          <p className="research-k">In research now</p>
          <div className="research-chips">
            {IN_RESEARCH.seekers.map((n) => (
              <span key={n} className="rchip rchip-seekers">
                {n}
              </span>
            ))}
            {IN_RESEARCH.hiring.map((n) => (
              <span key={n} className="rchip rchip-hiring">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" id="method">
        <h2>How we review</h2>
        <div className="method-grid">
          <div className="mstep">
            <span className="mstep-n">01</span>
            <b>Read the evidence</b>
            <p>Ratings, prices and traffic from public sources, each one dated and saved, so every number can be checked.</p>
          </div>
          <div className="mstep">
            <span className="mstep-n">02</span>
            <b>Check the other lists</b>
            <p>Every month we compare our ranking with the lists you&rsquo;re likely to read, and say where we break from the pack.</p>
          </div>
          <div className="mstep">
            <span className="mstep-n">03</span>
            <b>Apply the recruiter&rsquo;s read</b>
            <p>A practitioner&rsquo;s judgment on what holds up in real hiring, and what only demos well.</p>
          </div>
        </div>
        <div className="numbers">
          <div>
            <b>{toolsScored}</b>
            <span>tools scored on public evidence</span>
          </div>
          <div>
            <b>{benchmarks.length}</b>
            <span>rival lists checked</span>
          </div>
          <div>
            <b>{videos.length}</b>
            <span>demo videos, labeled by who made them</span>
          </div>
          <div>
            <b>0</b>
            <span>paid placements</span>
          </div>
        </div>
        <a className="textlink" href="/how-we-review">
          Read the full methodology &rarr;
        </a>
      </section>

      <section className="wrap" id="radar">
        <div className="radar">
          <div>
            <h2 className="radar-h">On our radar</h2>
            <p className="lead">
              New tools we&rsquo;re watching before they earn a ranking. Building one? Listing is free, and scores are earned.
            </p>
          </div>
          <div className="radar-cards">
            <div className="rcard">
              <span className="mini-logo">
                <Logo domain="metaview.ai" size={22} />
              </span>
              <b>Metaview</b>
              <span>AI interview notes</span>
            </div>
            <div className="rcard">
              <span className="mini-logo">
                <Logo domain="juicebox.ai" size={22} />
              </span>
              <b>Juicebox</b>
              <span>AI sourcing search</span>
            </div>
            <a className="rcard rcard-cta" href="/for-vendors">
              <b>Get on the radar</b>
              <span>For vendors &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="wrap" id="signup">
        <div className="signup-band">
          <div>
            <h2 className="signup-h">The monthly evidence check</h2>
            <p>One email a month: what moved, what changed price, and who broke from the pack.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
