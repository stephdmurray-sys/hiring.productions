import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { ShortToolRow, shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { Capture } from '@/app/(rebrand)/_components/capture'
import { captureCss } from '@/app/(rebrand)/_components/widgets-css'
import { Dots, Squiggle } from '@/app/(rebrand)/_components/retro'
import { keepLast } from '@/lib/site-line'
import { PORTFOLIO_PICKS, PORTFOLIO_SITES } from '@/lib/evidence/shortlists'
import { PROOF, REPVERA_QUESTIONS } from '@/lib/evidence/guided'

/**
 * The proof kit (Stephanie approved, Nov 15, 2026): the picker's proof
 * answer as its own page, in three steps, with the checklist by email.
 * Her point: when someone has no work samples, RepVera covers the proof on
 * its own, so it comes first and step two can be skipped.
 */

const PATH = '/show-how-you-work'
const TITLE = REPVERA_QUESTIONS.seekers

export const metadata: Metadata = {
  title: 'How Do I Show Employers How I Work Before the Interview? A Three-Step Proof Kit',
  description:
    'Send proof of how you work with your application: receipts from people who have worked with you, your work if people can see it, and where to put the link. No work samples? The first step covers it.',
  alternates: { canonical: PATH },
}

export default function Page() {
  const repvera = PORTFOLIO_SITES.sections.flatMap((s) => s.tools).find((t) => t.name === 'RepVera')!
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + captureCss + shortListCss + toolPageCss + css }} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Show how you work
          </>
        }
        sticker="3 steps"
        title={TITLE}
        dek="Send proof with your application, so how you work arrives before you do. No work samples? Step one covers it on its own."
      />

      <section className="wrap sec sl-sec sl-sec-seekers" id="people">
        <StepHead n={1} title="Get receipts from the people who have worked with you" sub="This works for every job, with or without work samples." />
        <div className="sl-tools sl-tools-one pk-one">
          <ShortToolRow t={repvera} side="seekers" />
        </div>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="work">
        <StepHead n={2} title="Add your work, if people can see it" sub="Designs, writing or code. No work samples? Skip this step. Step one is your proof." />
        <div className="sl-tools">
          {PORTFOLIO_PICKS.map((t) => (
            <ShortToolRow t={t} side="seekers" key={t.name} />
          ))}
        </div>
        <p className="pk-more">
          <a className="tl" href={PROOF.more.href}>
            {keepLast(PROOF.more.text)} <span className="arr">&rarr;</span>
          </a>
        </p>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="where">
        <StepHead n={3} title="Put the link where they’ll see it" />
        <div className="sl-callout">
          <Squiggle className="slc-squig" />
          <p className="sl-text">{keepLast(PROOF.where.text)}</p>
        </div>
      </section>

      <section className="wrap sec" id="email" style={{ paddingBottom: 'clamp(96px,11vw,150px)' }}>
        <div className="tp-signup tp-signup-seekers pk-email">
          <Dots />
          <h2>Get this checklist by&nbsp;email.</h2>
          <Capture
            source="proof_kit"
            audience="candidate"
            promise="The three steps, with the links, in your inbox."
            cta="Email me the checklist"
            done="Sent. Check your inbox for the checklist."
          />
        </div>
        <p className="tp-fine">Nobody pays to be featured.</p>
      </section>

      <SiteFooter />
    </>
  )
}

const css = `
  .pk-one{margin-top:32px;}
  .pk-more{margin-top:24px;font-size:17px;font-weight:700;}
  .pk-email{align-items:center;}
`
