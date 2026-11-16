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
import { RepveraFill } from '@/app/(rebrand)/_components/repvera-fill'
import { RepveraWork } from '@/app/(rebrand)/_components/repvera-work'
import { repveraFillCss } from '@/app/(rebrand)/_components/repvera-fill-css'
import { REPVERA_EXAMPLE } from '@/lib/repvera-example'

/**
 * The proof kit (Stephanie approved, Nov 15, 2026): the picker's proof
 * answer as its own page, in three steps, with the checklist by email.
 * Her point: when someone has no work samples, RepVera covers the proof on
 * its own, so it comes first and step two can be skipped.
 */

const PATH = '/show-how-you-work'
const TITLE = REPVERA_QUESTIONS.seekers

export const metadata: Metadata = {
  title: 'How Do I Prove What I’m Like to Work With? A Three-Step Proof Kit',
  description:
    'Send proof of how you work with your application: receipts from people who have worked with you, your work if people can see it, and where to put the link. No work samples? The first step covers it.',
  alternates: { canonical: PATH },
}

export default function Page() {
  const repvera = PORTFOLIO_SITES.sections.flatMap((s) => s.tools).find((t) => t.name === 'RepVera')!
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + captureCss + shortListCss + toolPageCss + repveraFillCss + css }} />
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
        {/* The large profile on every profile view (Stephanie, Nov 16, 2026). */}
        <h3 className="pk-prof-k">{PROOF.profileK}</h3>
        <RepveraFill side="seekers" />
        <p className="pk-prof-src">
          {keepLast(`Stephanie’s own RepVera profile, as of ${REPVERA_EXAMPLE.asOf}.`)}{' '}
          <a className="tl" href={REPVERA_EXAMPLE.profileUrl} rel="noopener" target="_blank">
            See the whole profile <span className="arr">&#8599;</span>
          </a>
        </p>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="work">
        <StepHead n={2} title="Add your work, if people can see it" sub="Designs, writing or code. No work samples? Skip this step. Step one is your proof." />
        <p className="pk-rv-work">{keepLast(PROOF.repveraWork)}</p>
        <RepveraWork k={PROOF.workTabK} note={PROOF.workTabNote} />
        <div className="sl-tools pk-sites">
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
  .pk-rv-work{margin-top:18px;max-width:720px;padding-left:14px;border-left:4px solid var(--indigo);font-size:18px;line-height:1.5;font-weight:800;color:var(--ink);text-wrap:pretty;}
  .pk-one{margin-top:32px;}
  .pk-sites{margin-top:48px;}
  .pk-prof-k{margin:48px 0 0;font-size:clamp(22px,2.4vw,26px);font-weight:900;letter-spacing:-0.01em;line-height:1.2;color:var(--ink);}
  .pk-prof-src{margin:22px 0 0;font-size:13.5px;line-height:1.5;color:var(--ink-3);}
  .pk-prof-src .tl{font-size:13.5px;}
  .pk-more{margin-top:24px;font-size:17px;font-weight:700;}
  .pk-email{align-items:center;}
`
