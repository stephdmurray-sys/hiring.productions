import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { RecAnswer, RecSituations, RecHow, recCss, askSummary, REC_PATH } from '@/app/(rebrand)/_components/recommender'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { answerText, askToQuery, recommend, situations } from '@/lib/evidence/recommend'

/**
 * A permanent page for a common situation: the question people actually
 * ask, answered by the recommender. Same rules, same evidence, computed at
 * build time, so it can be linked, indexed and quoted.
 */

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return situations().map((s) => ({ slug: s.slug }))
}

function find(slug: string) {
  return situations().find((s) => s.slug === slug) ?? null
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const s = find(slug)
  if (!s) return {}
  const r = recommend(s.ask)
  const year = r.checked.slice(0, 4)
  return {
    title: `${s.question} (${year})`,
    description: answerText(r).slice(0, 300),
    alternates: { canonical: `${REC_PATH}/${s.slug}` },
  }
}

export default async function SituationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const s = find(slug)
  if (!s) notFound()
  const r = recommend(s.ask)
  const url = `${SITE}${REC_PATH}/${s.slug}`

  const ld = graph(
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      dateModified: r.checked,
      publisher: { '@id': `${SITE}/#organization` },
      mainEntity: [{ '@type': 'Question', name: s.question, acceptedAnswer: { '@type': 'Answer', text: answerText(r), url } }],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'What should I use?', item: `${SITE}${REC_PATH}` },
        { '@type': 'ListItem', position: 3, name: s.question, item: url },
      ],
    },
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + recCss }} />
      <JsonLd data={ld} />
      <SiteNav active="recommend" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href={REC_PATH}>What should I use?</a> / {s.question}
          </p>
          <h1 className="display">{s.question}</h1>
          <p className="dek">
            Answered from public reviews and real prices, for this situation: {askSummary(s.ask).replace(/^(?!I[ \u2019'])\w/, (c) => c.toLowerCase())}.{' '}
            <a className="tl" href={`${REC_PATH}?${askToQuery(s.ask)}`}>
              Change the details
            </a>
          </p>
        </div>
      </header>

      <section className="wrap sec-tight rec-answer-wrap" id="answer" aria-labelledby="answer-h">
        <RecAnswer r={r} ask={s.ask} editHref={`${REC_PATH}?${askToQuery(s.ask)}#questions`} />
      </section>

      <section className="wrap sec" id="common">
        <h2>More questions, answered</h2>
        <RecSituations exclude={s.slug} />
      </section>

      <section className="wrap sec" id="how">
        <h2>How this answer was made</h2>
        <p className="lead">
          The same rules for every visitor, and none of them can be bought.{' '}
          <a className="tl" href="/how-we-review#recommend">
            Every rule, in full
          </a>
        </p>
        <RecHow />
      </section>

      <SiteFooter />
    </>
  )
}
