import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { boardCss } from '@/app/(rebrand)/_components/scoreboard'
import { OnTheRise, risingCss } from '@/app/(rebrand)/_components/rising'
import { Capture } from '@/app/(rebrand)/_components/capture'
import { captureCss } from '@/app/(rebrand)/_components/widgets-css'
import { discovery, formatMonth, guide, latestCheck, rising, resumeTools } from '@/lib/evidence'
import { shortDate } from '@/app/(rebrand)/_components/data'

/**
 * "Which tools are about to break out?": the tools we're watching that
 * don't have enough public evidence to score yet, the ones that graduated,
 * and how a tool gets on the radar. Never ranked, never paid for, and
 * RepVera never appears here (GROWTH.md).
 */

export const metadata: Metadata = {
  title: 'On the Rise: The Hiring Tools About to Break Out, and What We Know So Far',
  description:
    'Up-and-coming tools for job seekers and hiring teams that don’t have enough public reviews for a rating yet. Each shows only what we can back up, with dates.',
  alternates: { canonical: '/on-the-rise' },
}

const css = `
  .grad{border-top:1px solid var(--rule);margin-top:28px;}
  .grad-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:24px;padding:22px 0;border-bottom:1px solid var(--rule);}
  .grad-row b{font-size:21px;font-weight:800;}
  .grad-row .mono{display:block;color:var(--ink-3);margin-top:4px;}
  .grad-row p{color:var(--ink-2);}
  .grad-row .tl{display:inline-block;margin-top:6px;}
  .radar{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:48px;margin-top:28px;list-style:none;padding:0;}
  .radar li{padding:18px 0;border-bottom:1px solid var(--rule);}
  .radar b{display:block;font-size:18px;font-weight:800;color:var(--ink);}
  .radar span{display:block;margin-top:4px;color:var(--ink-2);font-size:16px;line-height:1.5;}
  @media(max-width:760px){.grad-row{grid-template-columns:1fr;gap:6px;}.radar{grid-template-columns:1fr;}}
`

export default function OnTheRisePage() {
  const all = resumeTools().all
  const scored = Object.fromEntries(all.map((t) => [t.id, t]))
  const triggers = discovery.triggers.filter((t) => t.id !== 'editor-added')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + risingCss + captureCss + css }} />
      <SiteNav />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / On the rise
          </p>
          <h1 className="display">Which tools are about to break out?</h1>
          <p className="dek">
            New tools for job seekers and hiring teams that people are starting to talk about. None has enough public reviews for a rating
            yet, so each one shows only what we can back up, with dates. When one gets enough reviews, it gets rated.
          </p>
          <p className="dateline">
            Checked {shortDate(latestCheck())}. Next check {formatMonth(guide.nextCheck)}. Never ranked, never paid for.
          </p>
        </div>
      </header>

      <section className="wrap sec-tight" id="watching">
        <h2>Tools we&rsquo;re watching</h2>
        <OnTheRise showPicks linkAll={false} />
      </section>

      <section className="wrap sec-tight" id="alerts">
        <Capture
          source="on_the_rise"
          promise="Tell me when one of these gets rated, or a new tool starts showing up on best-of lists."
          cta="Tell me when one breaks out"
          done="You're on the list. One short note when it happens."
        />
      </section>

      {rising.graduated.length > 0 && (
        <section className="wrap sec" id="graduated">
          <h2>Now rated</h2>
          <p className="lead">Tools that started on this page and now have enough reviews for a rating.</p>
          <div className="grad">
            {rising.graduated.map((g) => {
              const t = scored[g.id]
              return (
                <div className="grad-row" key={g.id}>
                  <div>
                    <b>{g.name}</b>
                    <span className="mono">{shortDate(g.date)}</span>
                  </div>
                  <div>
                    <p>
                      {t && t.overall !== null
                        ? `Rated ${t.overall.toFixed(2)} out of 5, #${t.rank} of the ${t.segment === 'checker' ? 'ATS resume checkers' : 'resume builders'}.`
                        : `Moved to ${g.to}.`}{' '}
                      {g.note}
                    </p>
                    {t && (
                      <a className="tl" href={`/reviews/${t.id}`}>
                        Is {t.name} worth it? <span className="arr">&rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section className="wrap sec" id="radar">
        <h2>How we find new tools</h2>
        <p className="lead">
          A good tool shouldn&rsquo;t need a marketing budget to get noticed. If it shows up in any one of these places, we check it within a
          month.
        </p>
        <ul className="radar">
          {triggers.map((t) => (
            <li key={t.id}>
              <b>{t.label}</b>
              <span>{t.note}</span>
            </li>
          ))}
        </ul>
        <p className="footnote">
          Getting checked is free, and no one can pay for a place. Follower counts don&rsquo;t count, because they measure marketing reach and tell you nothing about whether a tool works.
        </p>
      </section>

      <NextStep side="both" line="Want a tool we can score today? Answer a few questions and get your best match." button="Help me choose" href="/what-should-i-use#questions" />
      <SiteFooter />
    </>
  )
}
