import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { AtsFlow, type FlowStep } from '@/app/(rebrand)/_components/ats-flow'
import { atsFlowCss } from '@/app/(rebrand)/_components/ats-flow-css'
import { ValuePropBuilder } from '@/app/(rebrand)/_components/value-prop-builder'
import { valuePropCss } from '@/app/(rebrand)/_components/value-prop-css'
import { keepLast } from '@/lib/site-line'

/**
 * "What's our employer value proposition?" The hiring mirror of
 * /professional-value-proposition (Stephanie, Nov 15, 2026): why someone
 * would take this job, built from what the team already says about working
 * there, turned into one line for the job post, outreach, the interview
 * close and the offer.
 */

const PATH = '/employer-value-proposition'
const TITLE = 'What’s our employer value proposition?'

export const metadata: Metadata = {
  title: 'What’s Our Employer Value Proposition? Build Yours From What Your Team Says',
  description:
    'Say what your team is known for, easily. Start with what your team says about working there, finish “Our team is known for…”, and see how it sounds when a candidate asks, in your first message and in the job post. Free, and nothing is saved.',
  alternates: { canonical: PATH },
}

export default function Page() {
  const steps: FlowStep[] = [
    {
      title: 'Ask five people on the team',
      todo: 'Ask: what would you tell a friend about working here?',
      why: 'Ask people at different levels and on different teams, so one person’s week doesn’t set the whole line.',
    },
    {
      title: 'Look for what repeats',
      todo: 'Paste their answers into the builder.',
      why: 'The words more than one person uses are the ones a candidate will hear again when they talk to your team.',
      more: { href: '#build', label: 'Back to the builder', up: true },
    },
    {
      title: 'Use it everywhere a candidate looks',
      todo: 'The job post, your first message, the interview close and the offer.',
      why: 'When the same reason shows up at every step, a candidate hears one clear reason to say yes.',
    },
  ].map((s) => ({ ...s, title: keepLast(s.title), todo: keepLast(s.todo), why: keepLast(s.why) }))

  const url = `${SITE}${PATH}`
  const ld = graph(
    {
      '@type': 'WebApplication',
      '@id': `${url}#tool`,
      name: TITLE,
      url,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      description: 'Finish “Our team is known for…” from what the team says about working there, and hear how it sounds at each step of hiring.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'For hiring teams', item: `${SITE}/for-hiring-teams` },
        { '@type': 'ListItem', position: 3, name: TITLE, item: url },
      ],
    },
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + atsFlowCss + valuePropCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="hiring" />
      <ToolHero
        side="hiring"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-hiring-teams">For hiring teams</a> / Employer value proposition
          </>
        }
        sticker="Free, nothing saved"
        title={TITLE}
        dek="Why would someone take this job? It starts with “Our team is known for…”, and your team has already said the rest."
      />
      <p className="wrap vp-jump">
        Job seeker? <a className="tl" href="/professional-value-proposition">Build your professional value&nbsp;proposition</a>
      </p>

      <section className="wrap sec sl-sec sl-sec-hiring" id="build">
        <StepHead title="Build yours" sub="Start with what your team says. Your line updates as you type." />
        <ValuePropBuilder side="hiring" />
      </section>

      <section className="wrap sec sl-sec sl-sec-hiring" id="find">
        <StepHead title="Find it in what your team already says" />
        <div className="evp-flow">
          <AtsFlow steps={steps} />
        </div>
        <p className="tp-fine">Nobody pays to be featured.</p>
      </section>
      <div className="sec" />

      <SiteFooter />
    </>
  )
}

const css = `
  .vp-jump{margin-top:28px;font-size:16px;font-weight:700;color:var(--ink-2);}
  .evp-flow .af-lit .af-n{background:var(--coral);color:var(--coral-deep);}
  .evp-flow .af-todo{background:var(--coral-tint);}
  .evp-flow .af-why-btn{color:var(--coral-text);}
  #find .tp-fine{margin-top:44px;}
`
