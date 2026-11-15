import type { Metadata } from 'next'
import Image from 'next/image'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { AtsFlow, type FlowStep } from '@/app/(rebrand)/_components/ats-flow'
import { atsFlowCss } from '@/app/(rebrand)/_components/ats-flow-css'
import { ValuePropBuilder } from '@/app/(rebrand)/_components/value-prop-builder'
import { valuePropCss } from '@/app/(rebrand)/_components/value-prop-css'
import { TrackedLink } from '@/app/(rebrand)/_components/picker-track'
import { Dots } from '@/app/(rebrand)/_components/retro'
import { keepLast } from '@/lib/site-line'
import { quotes } from '@/lib/repvera-quotes'

/**
 * "What's my professional value proposition?" (Stephanie, Nov 15, 2026).
 * The builder turns what you do and what people say about working with you
 * into one line, four ways. Then RepVera, in Stephanie's words: it helps you
 * uncover your value prop through how others experience working with you,
 * with Tai's quote about seeing the themes (shown once he approves it).
 * The hiring mirror is /employer-value-proposition.
 */

const PATH = '/professional-value-proposition'
const TITLE = 'What’s my professional value proposition?'

export const metadata: Metadata = {
  title: 'What’s My Professional Value Proposition? Build Yours From What People Say About You',
  description:
    'A free builder: what you do, what changes because of you, and the words people who have worked with you keep using, turned into one line for your resume, LinkedIn headline, interviews and cover letters. Nothing is saved.',
  alternates: { canonical: PATH },
}

const REPVERA_URL = 'https://www.repvera.com/?utm_source=hiring.productions&utm_medium=referral&utm_campaign=value_prop'
const REPVERA_PROFILE = 'https://www.repvera.com/u/stephaniemurray'

export default function Page() {
  const steps: FlowStep[] = [
    {
      title: 'Ask the people who’ve worked with you',
      todo: 'Send your RepVera link to managers, teammates and clients.',
      why: 'Each of them writes a short receipt about what it was like to work with you, and it’s verified through their work email.',
    },
    {
      title: 'See the themes',
      todo: 'Look for what comes up again and again.',
      why: 'Your receipts sit in one place, with the themes broken down by who said them: managers, peers, clients.',
    },
    {
      title: 'Put their words to work',
      todo: 'Paste them into the builder.',
      why: 'The words they repeat become your line for your resume, LinkedIn, interviews and cover letters.',
      more: { href: '#build', label: 'Back to the builder', up: true },
    },
  ].map((s) => ({ ...s, title: keepLast(s.title), todo: keepLast(s.todo), why: keepLast(s.why) }))
  const tai = quotes(['tai-themes'])[0]

  const url = `${SITE}${PATH}`
  const ld = graph(
    {
      '@type': 'WebApplication',
      '@id': `${url}#tool`,
      name: TITLE,
      url,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      description: 'Build a professional value proposition from what you do and the words people who have worked with you use about you.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'For job seekers', item: `${SITE}/for-job-seekers` },
        { '@type': 'ListItem', position: 3, name: TITLE, item: url },
      ],
    },
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + atsFlowCss + valuePropCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Value proposition
          </>
        }
        sticker="Free, nothing saved"
        title={TITLE}
        dek="The one line that tells a hiring team why you. The people you’ve worked with have already said it."
      />
      <p className="wrap vp-jump">
        Hiring? <a className="tl" href="/employer-value-proposition">Build your employer value&nbsp;proposition</a>
      </p>

      <section className="wrap sec sl-sec sl-sec-seekers" id="build">
        <StepHead title="Build yours" sub="Three steps. Your line updates as you type." />
        <ValuePropBuilder side="seekers" noWords={{ text: 'Nobody has said it in writing yet?', href: '#repvera', label: 'Get receipts from the people who’ve worked with you' }} />
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="repvera">
        <StepHead title="Find it in how others experience working with you" />
        <div className="vp-rv">
          <Dots className="vp-rv-dots" />
          <p className="vp-rv-built">Stephanie built this one</p>
          <p className="vp-rv-lead">{keepLast('RepVera helps you uncover your value prop through how others experience working with you.')}</p>
          <AtsFlow steps={steps} />
          {tai && (
            <figure className="vp-quote">
              <blockquote>&ldquo;{tai.text}&rdquo;</blockquote>
              <figcaption>
                {tai.photo && (
                  <span className="vp-quote-av">
                    <Image src={tai.photo} alt="" width={112} height={112} />
                  </span>
                )}
                <span>
                  <b>{tai.name}</b>
                  <span>{tai.title}</span>
                </span>
              </figcaption>
            </figure>
          )}
          <p className="vp-rv-note">Full disclosure: I built RepVera, so I don’t give it a score. Take a look and decide for yourself.</p>
          <p className="tp-cta">
            <TrackedLink href={REPVERA_URL} className="btn btn-indigo" event="repvera_profile_click" side="seekers" newTab>
              Start your RepVera <span className="arr">&#8599;</span>
            </TrackedLink>
            <a className="tl" href={REPVERA_PROFILE} rel="noopener" target="_blank">
              See a real RepVera profile first
            </a>
          </p>
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
  .vp-rv{position:relative;margin-top:36px;max-width:980px;padding:clamp(26px,4vw,44px);background:var(--indigo-tint);border:3px solid var(--ink);border-radius:20px;box-shadow:8px 8px 0 var(--ink);}
  .vp-rv > :not(.memphis){position:relative;z-index:2;}
  .vp-rv-dots{top:-30px;right:-22px;color:var(--lavender);}
  .vp-rv-built{display:inline-block;margin:0;padding:5px 12px;border-radius:999px;background:var(--ink);color:#fff;font-size:13.5px;font-weight:800;}
  .vp-rv-lead{margin:16px 0 0;max-width:760px;font-size:clamp(22px,2.4vw,28px);line-height:1.3;font-weight:900;letter-spacing:-0.01em;color:var(--ink);text-wrap:balance;}
  .vp-rv .af{margin-top:30px;}
  .vp-quote{margin:36px 0 0;padding:22px 24px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);max-width:860px;}
  .vp-quote blockquote{margin:0;font-size:clamp(18px,1.8vw,21px);line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .vp-quote figcaption{display:flex;align-items:center;gap:14px;margin-top:16px;font-size:14.5px;line-height:1.35;color:var(--ink-2);}
  .vp-quote figcaption > span:last-child{display:grid;}
  .vp-quote figcaption b{font-size:16px;color:var(--ink);}
  .vp-quote-av{position:relative;flex:none;width:56px;height:56px;border-radius:50%;border:2px solid var(--ink);overflow:hidden;background:var(--lavender);}
  .vp-quote-av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .vp-rv-note{margin:28px 0 0;padding:14px 16px;border-left:4px solid var(--ink);background:#fff;font-size:16px;line-height:1.55;color:var(--ink);}
  #repvera .tp-fine{margin-top:36px;}
`
