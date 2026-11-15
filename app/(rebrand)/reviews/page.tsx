import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { keepLast } from '@/lib/site-line'
import { REPVERA_CATEGORY } from '@/lib/repvera'
import { REPVERA_ANSWER } from '@/lib/evidence/guided'
import { TrackedLink } from '@/app/(rebrand)/_components/picker-track'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss } from '@/app/(rebrand)/_components/scoreboard'
import { OnTheRise, risingCss } from '@/app/(rebrand)/_components/rising'
import { atsAsOf, hiringBoard, seekerRow, shortDate } from '@/app/(rebrand)/_components/data'
import { MIN_REVIEWS, formatCount, formatMonth, guide, latestCheck, resumeTools } from '@/lib/evidence'
import { JsonLd, graph, resumeRankingLd } from '@/app/(rebrand)/_components/structured'

export const metadata: Metadata = {
  alternates: { canonical: '/reviews' },
  title: 'Hiring Tool Reviews: Resume Builders, ATS Checkers and Applicant Tracking Systems',
  description:
    'One review per tool: is it worth it, what it really costs, who else names it, and the best alternatives. Checked every month.',
}

const css = `
  .ix-unscored{border-top:1px solid var(--ink);margin-top:28px;max-width:960px;}
  .ix-u{display:flex;gap:14px;align-items:center;padding:16px 0;border-bottom:1px solid var(--rule);}
  .ix-u b{display:block;font-size:17px;font-weight:800;}
  .ix-u span span{font-size:13.5px;color:var(--ink-3);}
  .ix-u:hover b{text-decoration:underline;text-underline-offset:3px;}
  /* One board per row: side by side, the name, lists and bar don't fit and the text gets cut off. */
  .rv-list{max-width:760px;margin-top:28px;padding:28px;border:3px solid var(--ink);border-radius:16px;background:#fff;box-shadow:6px 6px 0 var(--ink);}
  .rv-list-id{display:flex;align-items:center;gap:16px;}
  .rv-list-id b{display:block;font-size:24px;font-weight:900;color:var(--ink);}
  .rv-list-built{display:inline-block;margin-top:6px;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:800;background:var(--ink);color:#fff;}
  .rv-list-line{margin-top:18px;font-size:19px;font-weight:700;line-height:1.5;color:var(--ink);text-wrap:pretty;}
  .rv-list-note{margin:16px 0 22px;padding:14px 16px;border-left:4px solid var(--ink);background:var(--surface);font-size:16px;line-height:1.55;color:var(--ink);text-wrap:pretty;}
  .ix-boards{display:grid;grid-template-columns:1fr;gap:32px;margin-top:36px;}
`

export default function ReviewsIndex() {
  const { checkers, builders, all } = resumeTools()
  const checked = latestCheck()
  const scored = (list: typeof all) => list.filter((t) => t.overall !== null).map(seekerRow)
  const unscored = all.filter((t) => t.overall === null)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + risingCss + css }} />
      <JsonLd data={graph(resumeRankingLd())} />
      <SiteNav active="seekers" />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Reviews
          </p>
          <h1 className="display">Every tool,&nbsp;reviewed</h1>
          <p className="dek">Resume tools for job seekers and applicant tracking systems for hiring teams. Is it worth it, what it really costs, and what to use instead. One page per tool.</p>
          <p className="dateline">Checked {shortDate(checked)}</p>
        </div>
      </header>

      <section className="wrap sec" id="resume-tools">
        <h2>Resume tools</h2>
        <div className="ix-boards">
          <Scoreboard side="seekers" title="ATS resume checkers" checked={`checked ${shortDate(checked)}`} rows={scored(checkers)} />
          <Scoreboard side="seekers" title="Resume builders" checked={`checked ${shortDate(checked)}`} rows={scored(builders)} />
        </div>
      </section>

      <section className="wrap sec" id="ats">
        <h2>Applicant tracking systems</h2>
        <p className="lead">For hiring teams. Each has its own page with what a year costs for your seats, what users say and a demo video.</p>
        <div style={{ marginTop: 32 }}>
          <Scoreboard side="hiring" title="Applicant tracking systems" checked={`data as of ${shortDate(atsAsOf)} · next check ${formatMonth(guide.nextCheck)}`} rows={hiringBoard()} />
        </div>
        <p style={{ marginTop: 28, fontSize: 17 }}>
          Down to two?{' '}
          <a className="tl" href="/compare">
            See any two side by side
          </a>
          .
        </p>
      </section>

      <section className="wrap sec" id="verified-reputation">
        <h2>{keepLast(REPVERA_CATEGORY)}</h2>
        <p className="lead">This category has no scores and no ranks.</p>
        <div className="rv-list">
          <div className="rv-list-id">
            <Logo domain="repvera.com" name="RepVera" size={56} />
            <span>
              <b>RepVera</b>
              <span className="rv-list-built">{REPVERA_ANSWER.hiring.label}</span>
            </span>
          </div>
          <p className="rv-list-line">{REPVERA_ANSWER.hiring.lines[0]}</p>
          <p className="rv-list-note">{REPVERA_ANSWER.hiring.note}</p>
          <TrackedLink href={REPVERA_ANSWER.hiring.url} className="btn btn-indigo" event="repvera_profile_click">
            {REPVERA_ANSWER.hiring.button} <span className="arr">&#8599;</span>
          </TrackedLink>
        </div>
      </section>

      {unscored.length > 0 && (
        <section className="wrap sec">
          <h2>Reviewed, not rated yet</h2>
          <p className="lead">
            These have reviews here, but fewer than {MIN_REVIEWS} public user reviews, so they don&rsquo;t get a score.
          </p>
          <div className="ix-unscored">
            {unscored.map((t) => (
              <a className="ix-u" href={`/reviews/${t.id}`} key={t.id}>
                <Logo domain={t.domain} name={t.name} size={44} />
                <span>
                  <b>{t.name}</b>
                  <span>
                    {formatCount(t.citableReviews)} of {MIN_REVIEWS} reviews &middot; {t.bestFor}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="wrap sec">
        <h2>New tools to watch</h2>
        <p className="lead">Too new for a review page. These are the ones we&rsquo;re watching.</p>
        <OnTheRise />
      </section>

      <NextStep side="both" line="Not sure which tool fits you? Answer a few questions and get your best match." button="Help me choose" href="/what-should-i-use#questions" />
      <SiteFooter />
    </>
  )
}
