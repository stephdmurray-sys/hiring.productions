import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss } from '@/app/(rebrand)/_components/scoreboard'
import { OnTheRise, risingCss } from '@/app/(rebrand)/_components/rising'
import { seekerRow, shortDate } from '@/app/(rebrand)/_components/data'
import { MIN_REVIEWS, formatCount, latestCheck, resumeTools } from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/reviews' },
  title: 'Every Tool Review: Resume Builders and ATS Checkers, Scored on Evidence',
  description:
    'One review per tool: is it worth it, what it really costs, who else names it, and the best alternatives. Checked every month.',
}

const css = `
  .ix-unscored{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:28px;}
  .ix-u{display:flex;gap:14px;align-items:center;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:16px 18px;}
  .ix-u b{display:block;font-size:17px;font-weight:800;}
  .ix-u span span{font-size:13.5px;color:var(--ink-3);}
  .ix-u:hover b{text-decoration:underline;text-underline-offset:3px;}
  .ix-boards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;margin-top:36px;align-items:start;}
  @media(max-width:1000px){.ix-boards{grid-template-columns:1fr;}}
`

export default function ReviewsIndex() {
  const { checkers, builders, all } = resumeTools()
  const checked = latestCheck()
  const scored = (list: typeof all) => list.filter((t) => t.overall !== null).map(seekerRow)
  const unscored = all.filter((t) => t.overall === null)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + risingCss + css }} />
      <SiteNav active="seekers" />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Reviews
          </p>
          <h1 className="display">Every tool, reviewed on the evidence</h1>
          <p className="dek">Is it worth it, what it really costs, who else names it, and what to use instead. One page per tool.</p>
          <p className="dateline">Checked {shortDate(checked)}</p>
        </div>
      </header>

      <section className="wrap sec-tight">
        <div className="ix-boards">
          <Scoreboard side="seekers" title="ATS resume checkers" checked={`checked ${shortDate(checked)}`} rows={scored(checkers)} />
          <Scoreboard side="seekers" title="Resume builders" checked={`checked ${shortDate(checked)}`} rows={scored(builders)} />
        </div>
      </section>

      {unscored.length > 0 && (
        <section className="wrap sec">
          <h2>Reviewed, not scored</h2>
          <p className="lead">
            These have reviews here, but fewer than {MIN_REVIEWS} citable user reviews, so they don&rsquo;t get a score.
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
        <h2>On the rise</h2>
        <p className="lead">Too new for a review page. These are the ones we&rsquo;re watching.</p>
        <OnTheRise />
      </section>

      <SiteFooter />
    </>
  )
}
