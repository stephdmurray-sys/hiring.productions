import type { Metadata } from 'next'
import { PICKER_INTRO } from '@/lib/evidence/kit'
import { keepLast } from '@/lib/site-line'
import { GuidedFirst, guidedCss } from '@/app/(rebrand)/_components/guided'
import Image from 'next/image'
import { wholeList } from '@/lib/evidence/guided'
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
import { FaceLoop } from '@/app/(rebrand)/_components/face-loop'
import { pickFaceCss } from '@/app/(rebrand)/_components/pick-face-css'
import { FreeToolsMirror, freeToolsCss } from '@/app/(rebrand)/_components/free-tools'
import { HomeTop, homeTopCss } from '@/app/(rebrand)/_components/home-top'
import { STUCK } from '@/lib/home-top'
import { freeToolCount } from '@/lib/free-tools'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title: 'Hiring Is a Production: Straight Answers on Which Hiring Tools Are Worth It',
  description:
    'Hiring tools ranked for job seekers and hiring teams: resume builders, ATS checkers and applicant tracking systems. Every score is dated, the method is published, and nobody pays to be featured.',
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
  const smallPick = atsByName[atsLeaders().small]
  const fastest = [...atsTools].sort((a, b) => (atsGrowth(b) ?? -1) - (atsGrowth(a) ?? -1))[0]


  const SEG_LABEL: Record<string, string> = { small: 'Small teams pick', growing: 'Growing teams pick', scaling: 'Scaling teams pick' }
  const ATS_TAGS: Record<string, string> = Object.fromEntries(Object.entries(atsLeaders()).map(([seg, name]) => [name, SEG_LABEL[seg]]))
  const TAGS: Record<string, string> = Object.fromEntries([
    ...guide.picks.map((p) => [p.tool, p.label]),
    [risingPick.tool, risingPick.label],
  ])
  const counting = benchmarks.filter((l) => l.status === 'counts')
  // The band shows every list that counts and one example of each reason a list doesn't; the guide shows all of them.
  const bandLists = [...counting, ...benchmarks.filter((l, i, all) => l.status !== 'counts' && all.findIndex((x) => x.status === l.status) === i)]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + calcCss + videoCardCss + followCss + homeCss + recCss + retroCss + guidedCss + freeToolsCss + pickFaceCss + homeTopCss }} />
      <JsonLd data={graph(resumeRankingLd(), atsRankingLd())} />
      <SiteNav />

      {/* Stephanie picked option A, "Clapperboards" (Nov 16, 2026). */}
      <HomeTop />

      <section className="wrap sec" id="what-to-use">
        <h2>What should I use?</h2>
        <p className="lead">{keepLast(PICKER_INTRO)}</p>
        <div className="g-start">
          <GuidedFirst side="seekers" />
          <GuidedFirst side="hiring" />
        </div>
      </section>

      {/* Free tools: their own band, split in the two side colors, mirrored row by row (Nov 15, 2026). */}
      <section className="ftb" id="free-tools" aria-labelledby="free-tools-h">
        <div className="wrap ftb-in">
          <Dots className="ftb-dots" />
          <Zigzag className="ftb-zig" />
          <p className="ftb-sticker">Free, no sign-up</p>
          <h2 id="free-tools-h">Free tools for both sides of the&nbsp;table</h2>
          <p className="lead ftb-lead">Each row asks the same question from both sides. Pick yours.</p>
          <FreeToolsMirror rows={4} skip={[...STUCK.seekers, ...STUCK.hiring].map((c) => c.id)} />
          <p className="ftb-cta">
            <a className="btn" href="/tools">
              {`See all ${freeToolCount()} free tools`} <span className="arr">&rarr;</span>
            </a>
          </p>
        </div>
      </section>

      <section className="wrap sec" id="scoreboard">
        <div className="sec-head">
          <div>
            <h2>This month&rsquo;s&nbsp;scoreboard</h2>
            <p className="lead">Open any tool for the full review.</p>
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
                  cancel.{' '}
                  <a className="tl" href="/guides/best-resume-tools#cost">
                    What will your search cost?
                  </a>
                </>
              }
            />
          </div>
          <div className="p-hire">
            <Scoreboard
              side="hiring"
              title="Applicant tracking systems"
              checked={`data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`}
              rows={hiringBoard(8).map((r) => ({ ...r, tag: ATS_TAGS[r.id] }))}
              foot={<>Top 8 of {atsTools.length}. The guide ranks all of them by team size: small, growing and scaling.</>}
            />
          </div>
        </div>
      </section>

      <section className="band" id="lists">
        <div className="wrap band-grid">
          <div>
            <h2>We check the other lists so you don&rsquo;t have to</h2>
            <p>
              We read {benchmarks.length} &ldquo;best resume tool&rdquo; lists every month. Only {counting.length} count: they&rsquo;re
              current, and their publishers don&rsquo;t sell what they&nbsp;rank.
            </p>
            <a className="tl tl-strong" href="/is-this-list-paid-for">
              See all {benchmarks.length} lists <span className="arr">&rarr;</span>
            </a>
          </div>
          <div className="pubs">
            {bandLists.map((l) => (
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
                <span className="mono">{`Data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`}</span>
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
      </section>

      <section className="wrap sec" id="who-makes-this">
        <div className="who">
          <span className="who-loop">
            <FaceLoop size={150} />
          </span>
          <div>
            <h2>Who makes this</h2>
            <p>
              I&rsquo;m Stephanie Murray. I&rsquo;ve spent twenty years in talent acquisition, most of it on the hiring side, picking and using
              tools like the ones on this&nbsp;site.
            </p>
            <p className="who-later">I also built RepVera. It&rsquo;s listed here, and it&rsquo;s the only tool I don&rsquo;t&nbsp;score.</p>
            <a className="tl tl-strong" href="/about/stephanie">
              More about Stephanie <span className="arr">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="signup">
        <div className="signup-card">
          <div>
            <h2>Get an email when these rankings change</h2>
            <p className="sublead">
              One email a month: the tools that moved and the prices that went&nbsp;up.
            </p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
