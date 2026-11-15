import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { Squiggle } from '@/app/(rebrand)/_components/retro'
import { keepLast } from '@/lib/site-line'
import { atsCapability, recFramework } from '@/lib/evidence/recommend'

/**
 * "What does the screening software do to my resume?" (Stephanie approved,
 * Nov 15, 2026). Built only from sourced lines already on file: the
 * published research behind the picker's answers (recommend.json otherSide)
 * and a system's own dated product page (capabilities). Each finding says
 * what to do about it. It replaces the old unsourced page at this address.
 */

const PATH = '/how-ats-actually-works'

export const metadata: Metadata = {
  title: 'What Does the Screening Software Do to My Resume? What the Research Says',
  description:
    'What published research and the systems’ own product pages say happens to your resume in an applicant tracking system, and what to do about each finding.',
  alternates: { canonical: PATH },
}

const problem = (id: string) => recFramework.seekers.problems.find((p) => p.id === id)!.otherSide

export default function Page() {
  const hidden = problem('no-callbacks')
  const ladders = problem('rewriting')
  const matching = atsCapability('ai-matching', 'Greenhouse')!
  const findings = [
    {
      big: '88%',
      text: 'of employers in a Harvard Business School and Accenture study agreed that qualified, high-skilled candidates get screened out for not matching a job description’s exact criteria.',
      todo: 'Use the posting’s own words for the skills you have.',
      source: hidden.source,
      url: hidden.url,
    },
    {
      big: '7.4 seconds',
      text: 'was a recruiter’s average first pass on a resume in Ladders’ 2018 eye-tracking study. The resumes that held attention had simple layouts with clear section headings.',
      todo: 'Pick the plainest template you can, with clear headings.',
      source: ladders.source,
      url: ladders.url,
    },
    {
      big: 'AI matching',
      text: `is in some systems now. Greenhouse describes ${matching.what}.`,
      todo: 'A person still makes the call, so write for the person reading it.',
      source: `${matching.source}, ${matching.date}`,
      url: matching.url,
    },
  ]
  const url = `${SITE}${PATH}`
  const ld = graph(
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: 'What does the screening software do to my resume?',
      url,
      publisher: { '@id': `${SITE}/#organization` },
      citation: findings.map((f) => ({ '@type': 'CreativeWork', name: f.source, url: f.url })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'For job seekers', item: `${SITE}/for-job-seekers` },
        { '@type': 'ListItem', position: 3, name: 'What does the screening software do to my resume?', item: url },
      ],
    },
  )
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Screening software
          </>
        }
        sticker="From published research"
        title="What does the screening software do to my resume?"
        dek="Here’s what published research and the systems’ own product pages say happens to your resume, and what to do about each one."
      />

      <section className="wrap sec sl-sec sl-sec-seekers" id="findings">
        <StepHead n={1} title="What the other side of the table says" sub="Each finding links to its source." />
        <div className="ats-finds">
          {findings.map((f) => (
            <article className="ats-find" key={f.big}>
              <p className="ats-big">{f.big}</p>
              <p className="ats-text">{keepLast(f.text)}</p>
              <p className="ats-todo">
                <b>What to do: </b>
                {keepLast(f.todo)}
              </p>
              <a className="ats-src" href={f.url} rel="nofollow noopener" target="_blank">
                Source: {f.source}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="check">
        <StepHead n={2} title="Check your resume before you send it" />
        <div className="sl-callout">
          <Squiggle className="slc-squig" />
          <p className="sl-text">{keepLast('A resume checker shows how your resume reads against a job posting, before a person or a system sees it.')}</p>
          <p className="tp-cta">
            <a className="btn btn-indigo" href="/what-should-i-use?side=seekers&problem=no-callbacks#questions">
              Which checker should I use? <span className="arr">&rarr;</span>
            </a>
          </p>
        </div>
      </section>

      <div className="sec" />
      <SiteFooter />
    </>
  )
}

const css = `
  .ats-finds{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:26px;margin-top:36px;}
  .ats-find{display:flex;flex-direction:column;gap:12px;padding:26px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);}
  .ats-big{margin:0;font-weight:900;font-size:clamp(40px,5vw,58px);line-height:1;letter-spacing:-0.03em;color:var(--indigo-text);}
  .ats-text{margin:0;font-size:17.5px;line-height:1.55;color:var(--ink);font-weight:600;text-wrap:pretty;}
  .ats-todo{margin:4px 0 0;padding:12px 14px;background:var(--indigo-tint);border:2px solid var(--ink);border-radius:12px;font-size:16px;line-height:1.5;color:var(--ink);}
  .ats-src{margin-top:auto;font-size:13.5px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .ats-src:hover{color:var(--ink);}
`
