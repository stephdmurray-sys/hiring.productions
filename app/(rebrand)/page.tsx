import type { Metadata } from 'next'
import { Dots, Squiggle, Swash, Zigzag, retroCss } from '@/app/(rebrand)/_components/retro'
import { JsonLd, graph, resumeRankingLd, atsRankingLd } from '@/app/(rebrand)/_components/structured'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { Logo, PUBLISHER_DOMAINS } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss } from '@/app/(rebrand)/_components/scoreboard'
import { recCss } from '@/app/(rebrand)/_components/recommender'
import { problemsFor } from '@/lib/evidence/recommend'
import { CostCalculator } from '@/app/(rebrand)/_components/cost-calculator'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { calcCss, videoCardCss } from '@/app/(rebrand)/_components/widgets-css'
import { WhoToFollow, followCss } from '@/app/(rebrand)/_components/follow'
import { atsAsOf, atsGrowth, atsHref, atsTools, calcTools, hiringBoard, money, seekerBoard, shortDate } from '@/app/(rebrand)/_components/data'
import {
  STATUS_LABEL,
  VIDEO_KIND_LABEL,
  benchmarks,
  formatCount,
  formatMonth,
  guide,
  latestCheck,
  resumeTools,
  rising,
  risingPick,
  hiringPick,
  videos,
  atsLeaders,
  atsScores,
} from '@/lib/evidence'
import { homeCss } from './home-css'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Hiring Is a Production. We Are Here for Everyone in It.',
  description:
    'Independent reviews of the tools on both sides of hiring: resume builders, ATS checkers and applicant tracking systems. Every score is dated, and no vendor can pay for a place.',
}

const SEEKER_LOGOS = ['teal', 'kickresume', 'flowcv', 'jobscan', 'rezi', 'resume-worded', 'enhancv', 'novoresume']
const HIRING_LOGOS = ['Manatal', 'Pinpoint', 'Ashby', 'Greenhouse', 'Teamtailor', 'Workable', 'BambooHR', 'Breezy HR']

export default function Home() {
  const { all } = resumeTools()
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const atsByName = Object.fromEntries(atsTools.map((t) => [t.name, t]))
  const checked = latestCheck()

  const top = byId[guide.picks[0].tool]
  const pick = byId[risingPick.tool]
  const resumeIo = byId['resume-io']
  const kick = byId['kickresume']
  const smallPick = atsByName[atsLeaders().small]
  const smallPrice = smallPick.sources.pricing.match(/\$\d+/)?.[0]
  const fastest = [...atsTools].sort((a, b) => (atsGrowth(b) ?? -1) - (atsGrowth(a) ?? -1))[0]
  const fastestPct = Math.round((atsGrowth(fastest) ?? 0) * 100)
  const flexjobs = benchmarks.find((l) => l.status === 'owner-conflict')
  const topLists = top.counted.length
  const firstRiser = rising.tools.find((t) => t.evidence.length > 0)

  const ticker = [
    <>
      <b>{resumeIo.name}</b> renews every 4 weeks: <b>{money(resumeIo.yearCost!.amount)}</b> a year if you forget to cancel
    </>,
    topLists >= 2 && (
      <>
        <i>{topLists} current, independent lists</i> name {top.name}. We rank it first too
      </>
    ),
    flexjobs && (
      <>
        <i>{flexjobs.publication}</i>&rsquo;s list picks tools its parent company owns, so we don&rsquo;t count it
      </>
    ),
    <>
      {pick.name}: {pick.rawUserScore?.toFixed(1)} from {formatCount(pick.citableReviews)} users. Stephanie&rsquo;s up-and-coming pick
    </>,
    <>
      Stephanie&rsquo;s top pick for hiring teams: <i>{hiringPick.name}</i>
    </>,
    <>
      {fastest.name} reviews up <b>{fastestPct}%</b> in a year, fastest of {atsTools.length} applicant tracking systems (data as of {shortDate(atsAsOf)})
    </>,
    kick.yearCost && (
      <>
        {kick.name}: <b>{money(kick.yearCost.amount)}</b> a year, flat
      </>
    ),
    firstRiser && (
      <>
        One to watch: <i>{firstRiser.name}</i>, {firstRiser.evidence[0].note.replace(/^\w/, (c) => c.toLowerCase())} ({firstRiser.evidence[0].publication})
      </>
    ),
  ].filter(Boolean)

  const featured = videos.filter((v) => v.featured).slice(0, 3)
  const SEG_LABEL: Record<string, string> = { small: 'Small teams pick', growing: 'Growing teams pick', scaling: 'Scaling teams pick' }
  const ATS_TAGS: Record<string, string> = Object.fromEntries(Object.entries(atsLeaders()).map(([seg, name]) => [name, SEG_LABEL[seg]]))
  const TAGS: Record<string, string> = Object.fromEntries([
    ...guide.picks.map((p) => [p.tool, p.label]),
    [risingPick.tool, "Stephanie's pick"],
  ])
  const counting = benchmarks.filter((l) => l.status === 'counts')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + calcCss + videoCardCss + followCss + homeCss + recCss + retroCss }} />
      <JsonLd data={graph(resumeRankingLd(), atsRankingLd())} />
      <SiteNav />

      <header className="wrap hero">
        <h1 className="display">
          Hiring is a production. We&rsquo;re here for <Swash><span>everyone</span></Swash> in&nbsp;it.
        </h1>
        <p className="dek">
          Independent reviews of the tools on both sides of the table. Every score is dated, and no vendor can pay for a place.
        </p>

        <div className="sides">
          <div className="lane lane-seekers">
          <Dots className="lane-tl" />
          <Zigzag className="lane-bl" />
          <section className="side side-seekers" aria-labelledby="side-seekers-h">
            <span className="side-k">
              <i />
              I&rsquo;m a job seeker
            </span>
            <h2 id="side-seekers-h">Resume builders and ATS checkers, ranked on real reviews and real prices</h2>
            <div className="side-logos">
              {SEEKER_LOGOS.map((id) => byId[id]).map((t) => (
                <a key={t.id} href={`/reviews/${t.id}`} aria-label={`${t.name} review`} data-tip={`${t.name} · ${t.overall !== null ? t.overall.toFixed(2) : 'not scored'}`}>
                  <Logo domain={t.domain} name={t.name} size={52} />
                </a>
              ))}
            </div>
            <div className="side-feature">
              <Logo domain={top.domain} name={top.name} size={56} />
              <div>
                <b>Best overall: {top.name}</b>
                <span>
                  {top.rawUserScore?.toFixed(1)} from {formatCount(top.citableReviews)} users, and the free version is actually useful
                </span>
              </div>
            </div>
            <a className="side-go" href="/guides/best-resume-tools">
              Open the resume tools guide <span className="arr">&rarr;</span>
            </a>
          </section>
          </div>

          <div className="lane lane-hiring">
          <Squiggle className="lane-tr" />
          <Dots className="lane-br" />
          <section className="side side-hiring" aria-labelledby="side-hiring-h">
            <span className="side-k">
              <i />
              I&rsquo;m hiring
            </span>
            <h2 id="side-hiring-h">Applicant tracking systems, ranked by team size</h2>
            <div className="side-logos">
              {HIRING_LOGOS.map((n) => atsByName[n])
                .filter(Boolean)
                .map((t) => (
                  <a key={t.name} href={atsHref(t.name)} aria-label={`${t.name} in the ATS guide`} data-tip={`${t.name} · ${atsScores(t).overall.toFixed(2)}`}>
                    <Logo domain={t.domain} name={t.name} size={52} />
                  </a>
                ))}
            </div>
            <div className="side-feature">
              <Logo domain={smallPick.domain} name={smallPick.name} size={56} />
              <div>
                <b>Small teams pick: {smallPick.name}</b>
                <span>
                  Reviews up {Math.round((atsGrowth(smallPick) ?? 0) * 100)}% in a year{smallPrice ? `, at ${smallPrice} per user` : ''}
                </span>
              </div>
            </div>
            <a className="side-go" href="/guides/best-ats-for-small-teams">
              Open the ATS guide <span className="arr">&rarr;</span>
            </a>
          </section>
          </div>
        </div>

        <div className="ticker" aria-label="What changed this month">
          <div className="ticker-track">
            {[...ticker, ...ticker].map((node, i) => (
              <span key={i} aria-hidden={i >= ticker.length ? true : undefined}>
                {node}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="wrap sec" id="what-to-use">
        <h2>What should I use?</h2>
        <p className="lead">
          Tell us what&rsquo;s going wrong. We cross off every tool that doesn&rsquo;t fit your budget or your team, show you why, and give you
          one pick. If no tool fixes it, we&rsquo;ll say so.
        </p>
        <div className="rec-sits">
          {(['seekers', 'hiring'] as const).map((side) => (
            <div key={side}>
              <span className="rec-sits-k">
                <span className={`pill pill-${side}`}>{side === 'seekers' ? 'I’m a job seeker' : 'I’m hiring'}</span>
              </span>
              {problemsFor(side).map((p) => (
                <a className="rec-sit" href={`/what-should-i-use?side=${side}&problem=${p.id}#questions`} key={p.id}>
                  {p.label} <span className="arr">&rarr;</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" id="scoreboard">
        <div className="sec-head">
          <div>
            <h2>This month&rsquo;s scoreboard</h2>
            <p className="lead">Scored on user ratings, popularity, best-of lists and price. Open any tool for the full review.</p>
          </div>
        </div>
        <div className="boards">
          <input type="radio" name="board" id="b-seek" className="sr-only" defaultChecked />
          <input type="radio" name="board" id="b-hire" className="sr-only" />
          <div className="board-tabs">
            <label htmlFor="b-seek">
              <i />
              Resume tools
            </label>
            <label htmlFor="b-hire">
              <i />
              Applicant tracking
            </label>
          </div>
          <div className="p-seek">
            <Scoreboard
              side="seekers"
              title="Resume builders and checkers"
              checked={`checked ${shortDate(checked)}`}
              rows={seekerBoard().map((r) => ({ ...r, tag: TAGS[r.id] }))}
              foot={
                <>
                  Coral bar: renews every 4 weeks. {resumeIo.name} costs <b>{money(resumeIo.yearCost!.amount)}</b> a year if you forget to
                  cancel.
                </>
              }
            />
          </div>
          <div className="p-hire">
            <Scoreboard
              side="hiring"
              title="Applicant tracking systems"
              checked={`data as of ${shortDate(atsAsOf)}`}
              rows={hiringBoard(8).map((r) => ({ ...r, tag: ATS_TAGS[r.id] }))}
              foot={<>Top 8 of {atsTools.length}. The guide ranks all of them by team size: small, growing and scaling.</>}
            />
          </div>
        </div>
        <p className="board-note">
          Every score is public data: user ratings (40%), popularity (25%), best-of lists (20%) and value (15%). Hover a row to see the parts.{' '}
          <a className="tl" href="/how-we-review">
            How we score
          </a>
        </p>
      </section>

      <section className="wrap sec" id="cost">
        <h2>What will your search actually cost?</h2>
        <p className="lead">
          Drag to your timeline. Every tool re-sorts by the cheapest way to pay for it, and shows what happens if you forget to cancel.
        </p>
        <div style={{ marginTop: 36 }}>
          <CostCalculator tools={calcTools()} checked={shortDate(checked)} />
        </div>
      </section>


      <section className="band" id="lists">
        <div className="wrap band-grid">
          <div>
            <h2>We check the other lists so you don&rsquo;t have to</h2>
            <p>
              {benchmarks.length} &ldquo;best resume tool&rdquo; lists, checked every month. {counting.length} are current and
              independent, so they count. The rest are out of date, or published by companies that sell what they rank.
            </p>
            <a className="tl tl-strong" href="/guides/best-resume-tools#agree">
              See where every list lands <span className="arr">&rarr;</span>
            </a>
          </div>
          <div className="pubs">
            {benchmarks.map((l) => (
              <div key={l.id} className={`pub${l.status === 'counts' ? ' counts' : ''}`} data-tip={l.reason} tabIndex={0}>
                <Logo domain={PUBLISHER_DOMAINS[l.publication]} name={l.publication} size={36} round />
                <span>
                  <b>{l.publication}</b>
                  <span>{l.status === 'counts' ? 'Counts' : STATUS_LABEL[l.status]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap sec" id="watch">
        <h2>Watch before you pay</h2>
        <p className="lead">Each video is labeled: made by the company, or by an independent creator.</p>
        <div className="vid-grid">
          {featured.map((v) => {
            const t = byId[v.tool]
            return (
              <figure className="vid" key={v.youtubeId}>
                <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                <figcaption className="vid-meta">
                  <Logo domain={t.domain} name={t.name} size={36} />
                  <span>
                    <b>
                      <a href={`/reviews/${t.id}`}>{t.name}</a>
                    </b>
                    <span className="vid-title">{v.title}</span>
                    <span className={`vid-kind k-${v.kind}`}>{VIDEO_KIND_LABEL[v.kind]}</span>
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </section>

      <section className="wrap sec" id="follow">
        <h2>Who to follow</h2>
        <p className="lead">The best people to follow in recruiting and HR, and for your job search.</p>
        <WhoToFollow />
      </section>

      <section className="wrap sec" id="guides">
        <h2>The guides</h2>
        <div className="guides">
          <a className="guide" href="/guides/best-resume-tools">
            <span className="guide-side">
              <span>
                <span className="pill pill-sm pill-seekers">Job seekers</span>
                <span className="mono">{`Checked ${shortDate(checked)}`}</span>
              </span>
            </span>
            <span>
              <b>The best resume tools of 2026</b>
              <span className="guide-d">{all.length} builders and checkers, {benchmarks.length} rival lists, {videos.length} labeled demo videos, and what your search will cost.</span>
            </span>
            <span className="lg-stack">
              {all.slice(0, 5).map((t) => (
                <Logo key={t.id} domain={t.domain} name={t.name} size={34} round />
              ))}
            </span>
          </a>
          <a className="guide" href="/guides/best-ats-for-small-teams">
            <span className="guide-side">
              <span>
                <span className="pill pill-sm pill-hiring">Hiring teams</span>
                <span className="mono">{`Data as of ${shortDate(atsAsOf)}`}</span>
              </span>
            </span>
            <span>
              <b>The {atsTools.length} best applicant tracking systems, by team size</b>
              <span className="guide-d">Small, growing and scaling teams each get their own rankings and their own pick.</span>
            </span>
            <span className="lg-stack">
              {atsTools.slice(0, 5).map((t) => (
                <Logo key={t.name} domain={t.domain} name={t.name} size={34} round />
              ))}
            </span>
          </a>
          <a className="guide" href="/guides/best-recruiter-training">
            <span className="guide-side">
              <span>
                <span className="pill pill-sm pill-hiring">Hiring teams</span>
                <span className="mono">{'Updated 23 Aug 2026'}</span>
              </span>
            </span>
            <span>
              <b>Recruiter training and certifications</b>
              <span className="guide-d">19 programs, from sourcing and closing craft to SHRM and HRCI exam prep.</span>
            </span>
            <span className="lg-stack">
              <Logo domain="shrm.org" name="SHRM" size={34} round />
              <Logo domain="hrci.org" name="HRCI" size={34} round />
              <Logo domain="aihr.com" name="AIHR" size={34} round />
            </span>
          </a>
        </div>
        <p className="research">
          Coming next: job search trackers, interview practice, career coaching, LinkedIn profile tools, recruiting software for startups,
          candidate assessments and high-volume hiring. Next check: {formatMonth(guide.nextCheck)}.
        </p>
      </section>

      <section className="wrap sec" id="signup">
        <div className="signup-card">
          <div>
            <h2>One email a month</h2>
            <p className="sublead">One email a month with what changed: rankings that moved, prices that went up, and who&rsquo;s on the rise.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
