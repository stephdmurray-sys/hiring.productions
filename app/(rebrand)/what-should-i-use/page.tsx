import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { RecQuestions, RecAnswer, RecSituations, RecHow, recCss, REC_PATH } from '@/app/(rebrand)/_components/recommender'
import { ScrollToAnswer } from '@/app/(rebrand)/_components/rec-form'
import { askFromState, recFramework, recommend, situationFor, stateFromParams } from '@/lib/evidence/recommend'
import { latestCheck } from '@/lib/evidence'
import { shortDate } from '@/app/(rebrand)/_components/data'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const DESCRIPTION =
  "Tell us what's going wrong and what you need. We cross off every tool that doesn't fit, show you why, and give you one pick, based on public reviews and real prices."

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams
  const ask = askFromState(stateFromParams(sp))
  const sit = ask ? situationFor(ask) : null
  const hasParams = Object.keys(sp).length > 0
  return {
    title: 'What Should I Use? The Right Hiring Tool for Your Situation',
    description: DESCRIPTION,
    // Every answer has a link; the common ones have a permanent page, which is the one to index.
    alternates: { canonical: sit ? `${REC_PATH}/${sit.slug}` : REC_PATH },
    robots: hasParams && !sit ? { index: false, follow: true } : undefined,
  }
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const state = stateFromParams(sp)
  const ask = askFromState(state)
  const r = ask ? recommend(ask) : null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + recCss }} />
      <SiteNav active="recommend" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / What should I use?
          </p>
          <h1 className="display">What should I use?</h1>
          <p className="dek">{recFramework.promise}</p>
          <p className="dateline">
            Ratings and prices checked {shortDate(latestCheck())}. No vendor can pay for a place, and commissions never change an answer.
          </p>
        </div>
      </header>

      <section className="wrap sec-tight" id="questions" aria-label="Your situation">
        <div className={state.side ? `rec-${state.side}-q` : undefined}>
          <RecQuestions state={state} />
        </div>
      </section>

      <div aria-live="polite">
        {r && ask && (
          <section className="wrap sec-tight rec-answer-wrap" id="answer" aria-labelledby="answer-h">
            <RecAnswer r={r} ask={ask} />
            <ScrollToAnswer />
          </section>
        )}
      </div>

      <section className="wrap sec" id="common">
        <h2>Common questions, answered</h2>
        <p className="lead">Each one has its own page, answered the same way as yours.</p>
        <RecSituations />
      </section>

      <section className="wrap sec" id="how">
        <h2>How we pick</h2>
        <p className="lead">
          The same rules for every visitor, and none of them can be bought.{' '}
          <a className="tl" href="/how-we-review#recommend">
            Every rule, in full
          </a>
        </p>
        <RecHow />
      </section>

      <section className="wrap sec" id="signup">
        <div className="rec-signup">
          <div>
            <h2>Answers change. We&rsquo;ll tell you.</h2>
            <p className="sublead">We re-check every price and score each month. One email when a ranking moves or a price goes up.</p>
          </div>
          <EvidenceSignup source="recommender" />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
