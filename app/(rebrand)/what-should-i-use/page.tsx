import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { RecQuestions, RecAnswer, RecSituations, recCss, REC_PATH } from '@/app/(rebrand)/_components/recommender'
import { GuidedStepView, RepveraAnswer, guidedCss } from '@/app/(rebrand)/_components/guided'
import { isRepveraProblem, stepFor } from '@/lib/evidence/guided'
import { TrackOnce } from '@/app/(rebrand)/_components/picker-track'
import { ScrollToAnswer } from '@/app/(rebrand)/_components/rec-form'
import { askFromState, recFramework, recommend, situationFor, stateFromParams } from '@/lib/evidence/recommend'
import { latestCheck } from '@/lib/evidence'
import { shortDate } from '@/app/(rebrand)/_components/data'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const DESCRIPTION =
  "Tell us what's going wrong and what you need. We cross off every tool that doesn't fit, show you why, and recommend one tool and a cheaper backup, based on public reviews and real prices."

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
  const one = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? v[0] : v
  }
  const rawProblem = one('problem')
  const repvera = isRepveraProblem(state.side, rawProblem)
  const from = one('from')
  // Back from an answer: the guided step it came from, the whole list, or the first question.
  const backStep = state.side && state.problem ? (from === 'all' ? 'all' : from ?? stepFor(state.side, state.problem.id) ?? 'q1') : null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + recCss + guidedCss }} />
      <SiteNav active="recommend" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / What should I use?
          </p>
          <h1 className="display">What should I use?</h1>
          <p className="dek">{recFramework.promise}</p>
          <p className="dateline">
            Ratings and prices checked {shortDate(latestCheck())}. Nobody pays to be featured in an answer.
          </p>
        </div>
      </header>

      <section className="wrap sec-tight" id="questions" aria-label="Your situation">
        <div className={state.side ? `rec-${state.side}-q` : undefined}>
          {!state.side || (!state.problem && !repvera) ? (
            <>
              <RecQuestions state={state} only="side" />
              {state.side && <GuidedStepView side={state.side} stepId={one('g')} />}
            </>
          ) : repvera ? (
            <>
              <TrackOnce event="picker_start" side={state.side ?? undefined} />
              <RecQuestions state={state} only="side" />
            </>
          ) : (
            <>
              <TrackOnce event="picker_start" side={state.side ?? undefined} />
              <p className="g-links g-links-top">
                <a href={`${REC_PATH}?side=${state.side}&g=${backStep}#questions`}>&larr; Back</a>
              </p>
              <RecQuestions state={state} from={from} />
            </>
          )}
        </div>
      </section>

      <div aria-live="polite">
        {repvera && state.side && (
          <section className="wrap sec-tight rec-answer-wrap" id="answer" aria-labelledby="answer-h">
            <RepveraAnswer side={state.side} from={from} />
            <ScrollToAnswer />
          </section>
        )}
        {r && ask && (
          <section className="wrap sec-tight rec-answer-wrap" id="answer" aria-labelledby="answer-h">
            <RecAnswer r={r} ask={ask} />
            <ScrollToAnswer />
          </section>
        )}
      </div>

      <section className="wrap sec" id="common">
        <h2>Common questions,&nbsp;answered</h2>
        <RecSituations />
        <p className="lead" style={{ marginTop: 28 }}>
          Every answer follows the same rules, and nobody can pay to be in one.{' '}
          <a className="tl" href="/how-we-review#recommend">
            The rules, and the research behind them
          </a>
        </p>
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
