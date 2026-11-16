import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Dots } from '@/app/(rebrand)/_components/retro'
import { AtsFlow, type FlowStep } from '@/app/(rebrand)/_components/ats-flow'
import { atsFlowCss } from '@/app/(rebrand)/_components/ats-flow-css'
import { keepLast } from '@/lib/site-line'
import { moneyLine } from '@/lib/money'
import { formatDate, latestCheck, resumeTools } from '@/lib/evidence'
import { recFramework } from '@/lib/evidence/recommend'
import {
  CHECKED,
  KNOCKOUTS,
  KNOCKOUT_DOCS,
  MYTH,
  NO_ACCOUNT_CHECKERS,
  PARSE_COUNTER,
  PARSE_RESULT,
  PARSING,
  QUEUE,
  SILENT,
  SKILLSYNCER,
  allSources,
  type Source,
} from '@/lib/evidence/ats-explainer'

/**
 * "What does the screening software do to my resume?" Rebuilt Nov 15, 2026
 * from Stephanie's brief, then cut the same day ("GET TO THE POINT"): the
 * answer first, one short block per idea, one source line per section.
 * Facts come from lib/evidence/ats-explainer.ts (read at the source on
 * Nov 15, 2026) and recommend.json (Ladders, Harvard Business School).
 */

const PATH = '/how-ats-actually-works'

export const metadata: Metadata = {
  title: 'What Does the Screening Software Do to My Resume? How Applicant Tracking Systems Really Work',
  description:
    'Software rarely rejects a resume on its own, and the 75% figure has no study behind it. What happens after you click apply, the knockout questions that can reject you, what breaks the read, and free checkers.',
  alternates: { canonical: PATH },
}

const ON_THIS_PAGE: [string, string][] = [
  ['steps', 'After you apply'],
  ['knockout', 'Knockout questions'],
  ['parsing', 'What breaks the read'],
  ['pile', 'The pile'],
  ['checkers', 'Free checkers'],
  ['hiring', 'If you’re hiring'],
]

const research = (id: string) => recFramework.seekers.problems.find((p) => p.id === id)!.otherSide

function Sources({ items }: { items: Source[] }) {
  return (
    <p className="ax-src">
      {items.length > 1 ? 'Sources: ' : 'Source: '}
      {items.map((s, i) => (
        <span key={s.url}>
          {i > 0 && '; '}
          <a href={s.url} rel="nofollow noopener" target="_blank">
            {s.source.split(',')[0]}
          </a>
          , {s.date.replace(/^(read|updated) /, '')}
        </span>
      ))}
    </p>
  )
}

/** "Partly. The score is free; the fixes cost $49 a month." becomes free: "The score is free." and paid: "The fixes cost $49 a month." */
function freeAndPaid(answer: string): { free: string; paid: string } {
  const parts = answer
    .replace(/^(Yes|Partly|No)[.,:]\s*/i, '')
    .split(/(?<=[.;])\s+/)
    .map((p) => p.replace(/;$/, '.'))
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  return {
    free: cap(parts.filter((p) => !p.includes('$')).join(' ')),
    paid: cap(parts.filter((p) => p.includes('$')).join(' ')),
  }
}

export default function Page() {
  const hidden = research('no-callbacks')
  const ladders = research('rewriting')
  const hbs: Source = {
    source: 'Harvard Business School and Accenture, Hidden Workers',
    date: '2021',
    url: hidden.url,
  }
  const firstPass: Source = {
    source: 'Ladders eye-tracking study',
    date: '2018',
    url: ladders.url,
  }
  const caps = recFramework.seekers.capabilities as unknown as Record<string, string[]>
  const rated = resumeTools()
    .all.filter((t) => caps.checker?.includes(t.id))
    .sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1))
  const plansChecked = formatDate(latestCheck())

  // The flow chart: the step, what to do, and the detail behind "Why?".
  const steps: FlowStep[] = [
    {
      title: 'It reads your resume into a profile',
      todo: 'Send one plain column.',
      why: 'The system pulls your name, contact details, jobs and education into fields a recruiter can search. Columns, tables and text boxes can leave fields empty.',
      more: { href: '#parsing', label: 'What breaks the read' },
    },
    {
      title: 'Knockout questions run',
      todo: 'Answer exactly what’s asked.',
      why: 'If the employer set up a rule, a wrong answer to a yes-or-no question rejects you on the spot. In most setups it’s the only step that runs without a person.',
      more: { href: '#knockout', label: 'The questions that can reject you' },
      auto: true,
    },
    {
      title: 'Everything else waits in a list',
      todo: 'Give it time. No reply usually means nobody has opened it yet.',
      why: 'Applications that get past the knockout questions sit in the system until a recruiter gets to them.',
    },
    {
      title: 'Recruiters search and sort the list',
      todo: 'Use the posting’s words for skills you have.',
      why: 'They search resumes by keyword, and some systems sort applicants by how well they match criteria the recruiter set.',
      more: { href: '#pile', label: 'What recruiters do with the pile' },
    },
    {
      title: 'A person reads from the top',
      todo: 'Put your best match for this job at the top of page one.',
      why: 'The first read is fast, and it starts with whoever the search or sort put first.',
    },
    {
      title: 'The bottom of the list may never get opened',
      todo: 'Apply in the first few days.',
      why: 'Recruiters often start interviewing from the first strong applicants before they reach the rest.',
      more: { href: '#pile', label: 'What recruiters do with the pile' },
    },
  ].map((st) => ({ ...st, title: keepLast(st.title), todo: keepLast(st.todo), why: keepLast(st.why) }))

  const hiringTodo = [
    'Keep knockout questions to legal and license requirements.',
    'Check who your rules rejected every week.',
    'Turn on the rejection email.',
    'Know what your match score is built from before you sort by it.',
    'Score every applicant on the same things.',
  ]

  const url = `${SITE}${PATH}`
  const citations = [...allSources(), hbs, firstPass]
  const ld = graph(
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: 'What does the screening software do to my resume?',
      description: 'What happens to a resume after someone clicks apply, step by step, from the systems’ own help pages and recruiter research.',
      url,
      dateModified: CHECKED,
      publisher: { '@id': `${SITE}/#organization` },
      citation: citations.map((s) => ({
        '@type': 'CreativeWork',
        name: s.source,
        url: s.url,
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do applicant tracking systems reject 75% of resumes before a person sees them?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The figure traces to a 2012 sales pitch by Preptel, a resume company that closed in 2013 without publishing how it got the number. In 25 interviews with US recruiters in 2025, 23 said their system does not reject resumes on its own.',
          },
        },
        {
          '@type': 'Question',
          name: 'What rejects an application automatically?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Usually a knockout question: a yes-or-no question the employer sets up so that a wrong answer, such as no to work authorization, a required license or relocation, rejects the application right away.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'For job seekers',
          item: `${SITE}/for-job-seekers`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'What does the screening software do to my resume?',
          item: url,
        },
      ],
    },
  )

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: siteCss + chromeCss + shortListCss + toolPageCss + atsFlowCss + css,
        }}
      />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Screening software
          </>
        }
        sticker="Every line sourced"
        title="What does the screening software do to my resume?"
        dek="Less than you’ve been told. Software rarely rejects a resume on its own, and the “75% get rejected” figure came from a 2012 sales pitch."
        dateline={`Sources checked ${formatDate(CHECKED)}`}
      />
      <div className="wrap">
        <div className="ax-myth">
          <p>
            {keepLast(
              '23 of 25 recruiters interviewed in 2025 said their system doesn’t reject resumes on its own. The automatic no comes from questions the employer writes.',
            )}
          </p>
          <Sources items={[MYTH.origin, MYTH.survey]} />
          <p className="ax-jump">
            Hiring?{' '}
            <a className="tl" href="#hiring">
              Skip to your side of the&nbsp;table
            </a>
          </p>
        </div>
      </div>

      <nav className="toc-bar ax-toc" aria-label="On this page">
        <div className="wrap">
          {ON_THIS_PAGE.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* The sequence, with what to do at each step. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="steps">
        <StepHead title="What happens after you click apply" sub="Six steps. In most setups only one of them can say no without a person." />
        <AtsFlow steps={steps} />
      </section>

      {/* Knockout questions. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="knockout">
        <StepHead title="The questions that can reject you on their own" sub="A wrong answer ends your application before anyone reads your resume." />
        <div className="ko" role="table" aria-label="Knockout questions and how to answer them">
          <div className="ko-row ko-head" role="row">
            <span role="columnheader">They ask</span>
            <span role="columnheader">How to answer</span>
          </div>
          {KNOCKOUTS.map((k) => (
            <div className="ko-row" role="row" key={k.kind}>
              <span className="ko-ex" role="cell">
                <b>{k.kind}</b>
                <q>{k.example}</q>
              </span>
              <span className="ko-ans" role="cell">
                {keepLast(k.answer)}
              </span>
            </div>
          ))}
        </div>
        <p className="ax-note">{keepLast('Rejection email minutes after you applied? It was most likely a knockout answer.')}</p>
        <Sources items={[MYTH.rules, KNOCKOUTS[1].from, KNOCKOUTS[3].from, KNOCKOUTS[4].from, KNOCKOUT_DOCS[2], KNOCKOUT_DOCS[3]]} />
      </section>

      {/* Parsing. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="parsing">
        <StepHead title="What still breaks the read" sub="These won’t get you rejected. They leave the recruiter a half-empty profile to fix by hand." />
        <div className="pz">
          {PARSING.map((p) => (
            <div className="pz-row" key={p.breaks}>
              <span className="pz-break">{keepLast(p.breaks)}</span>
              <span className="pz-fix">{keepLast(p.fix)}</span>
            </div>
          ))}
        </div>
        <p className="ax-note">{keepLast('Some newer systems read columns and tables. You can’t tell which system an employer uses, so plain is safest.')}</p>
        <Sources items={[PARSE_RESULT, ...PARSING.flatMap((p) => p.from).filter((s, i, a) => s !== PARSE_RESULT && a.indexOf(s) === i), PARSE_COUNTER]} />
      </section>

      {/* The pile. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="pile">
        <StepHead title="What recruiters do with the pile" />
        <div className="pile">
          <p className="pile-n">{QUEUE.perJob.now}</p>
          <div>
            <p className="pile-what">{keepLast(`applications per job, on average, up from ${QUEUE.perJob.then} in ${QUEUE.perJob.thenYear}`)}</p>
            <ul className="pile-list">
              <li>{keepLast('They search it by keyword.')}</li>
              <li>{keepLast('They sort it by match, then by the date you applied.')}</li>
              <li>{keepLast('They skim: a first pass averages 7.4 seconds.')}</li>
              <li>{keepLast('They often start interviewing before they reach the bottom.')}</li>
            </ul>
          </div>
        </div>
        <Sources items={[QUEUE.volume, QUEUE.search, QUEUE.sort, firstPass, QUEUE.stop.from]} />
      </section>

      {/* Free checkers. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="checkers">
        <StepHead title="Free resume checkers" sub="Use one to find missing skills and a broken layout. Don’t chase the score." />
        <div className="ck">
          {NO_ACCOUNT_CHECKERS.map((c) => (
            <div className="ck-row" key={c.id}>
              <div className="ck-name">
                <Logo domain={c.domain} name={c.name} size={40} />
                <span>
                  <b>{c.name.replace(/ (ATS )?resume checker$/, '')}</b>
                  <span className="ck-tag">No account needed</span>
                </span>
              </div>
              <p className="ck-free">{keepLast(c.free.split('. ')[0] + '.')}</p>
              <span className="ck-go">
                <a className="tl" href={c.url} rel="nofollow noopener" target="_blank">
                  Open it <span className="arr">&#8599;</span>
                </a>
                <span className="money">{moneyLine(c.id)}</span>
              </span>
            </div>
          ))}
          {rated.map((t) => {
            const { free, paid } = freeAndPaid(t.freeAnswer)
            return (
              <div className="ck-row" key={t.id}>
                <div className="ck-name">
                  <Logo domain={t.domain} name={t.name} size={40} />
                  <span>
                    <b>{t.name}</b>
                    <span className="ck-tag">{t.overall !== null ? `${t.overall.toFixed(2)} out of 5` : 'Too few reviews to rate'}</span>
                  </span>
                </div>
                <p className="ck-free">
                  {keepLast(free)}
                  {paid && <span className="ck-paid">{keepLast(paid.replace(/^Paid plans are /, 'Paid: '))}</span>}
                </p>
                <a className="tl ck-go" href={`/reviews/${t.id}`}>
                  Is it worth it? <span className="arr">&rarr;</span>
                </a>
              </div>
            )
          })}
          <div className="ck-row">
            <div className="ck-name">
              <Logo domain={SKILLSYNCER.domain} name={SKILLSYNCER.name} size={40} />
              <span>
                <b>{SKILLSYNCER.name}</b>
                <span className="ck-tag">Not rated yet</span>
              </span>
            </div>
            <p className="ck-free">
              {keepLast(SKILLSYNCER.free)}
              <span className="ck-paid">{keepLast(SKILLSYNCER.paid)}</span>
            </p>
            <span className="ck-go">
              <a className="tl" href={SKILLSYNCER.url} rel="nofollow noopener" target="_blank">
                Open it <span className="arr">&#8599;</span>
              </a>
              <span className="money">{moneyLine(SKILLSYNCER.id)}</span>
            </span>
          </div>
        </div>
        <p className="ax-src">
          {keepLast(
            `Scores and free plans for rated tools from our rankings, checked ${plansChecked}. Others from each tool’s own page, read ${formatDate(CHECKED)}.`,
          )}
        </p>
        <p className="tp-cta">
          <a className="btn btn-indigo" href="/what-should-i-use?side=seekers&problem=no-callbacks#questions">
            Which checker should I use? <span className="arr">&rarr;</span>
          </a>
        </p>
      </section>

      {/* The hiring side. */}
      <section className="sec ax-hire-sec" id="hiring">
        <div className="wrap">
          <div className="ax-hire">
            <Dots className="ax-hire-dots" />
            <p className="ax-pill">If you’re hiring</p>
            <h2 className="sl-h">{keepLast('Your own rules may be screening out people you’d hire.')}</h2>
            <p className="ax-hire-lead">
              {keepLast('88% of employers agreed qualified candidates get screened out for not matching a job description’s exact criteria.')}
            </p>
            <ol className="ax-hire-list">
              {hiringTodo.map((t) => (
                <li key={t}>{keepLast(t)}</li>
              ))}
            </ol>
            <Sources items={[hbs, SILENT, MYTH.rules, QUEUE.sort]} />
            <p className="tp-cta">
              <a className="btn btn-coral" href="/interview-scorecard">
                Build a free scorecard <span className="arr">&rarr;</span>
              </a>
            </p>
          </div>
          <p className="tp-fine">Nobody pays to be featured.</p>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

const css = `
  .ax-myth{margin-top:36px;max-width:820px;}
  .ax-myth > p:first-child{margin:0;font-size:clamp(20px,2vw,23px);line-height:1.45;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .ax-jump{margin:22px 0 0;font-size:16px;font-weight:700;color:var(--ink-2);}
  .ax-toc{margin-top:28px;}
  .ax-src{margin:14px 0 0;font-size:13px;line-height:1.5;color:var(--ink-3);text-wrap:pretty;}
  .ax-src a{color:inherit;text-decoration:underline;text-underline-offset:3px;}
  .ax-src a:hover{color:var(--ink);}
  .ax-note{margin:24px 0 0;font-size:18px;line-height:1.5;font-weight:700;color:var(--ink);}

  /* Knockout questions */
  .ko{margin-top:36px;max-width:980px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);overflow:hidden;}
  .ko-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:24px;padding:16px 24px;border-top:1px solid var(--rule);}
  .ko-row:first-child{border-top:0;}
  .ko-head{padding-top:12px;padding-bottom:12px;background:var(--paper-2);font-size:14px;font-weight:800;color:var(--ink-2);}
  .ko-ex{display:flex;flex-direction:column;gap:4px;}
  .ko-ex b{font-size:13.5px;font-weight:800;color:var(--ink-3);}
  .ko-ex q{font-size:17.5px;line-height:1.4;font-weight:700;color:var(--ink);}
  .ko-ans{font-size:16.5px;line-height:1.5;color:var(--ink-2);}

  /* Parsing */
  .pz{margin-top:36px;max-width:980px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);overflow:hidden;}
  .pz-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;padding:16px 24px;border-top:1px solid var(--rule);font-size:17px;line-height:1.45;}
  .pz-row:first-child{border-top:0;}
  .pz-break{color:var(--ink-2);}
  .pz-break::before{content:"Breaks: ";font-weight:800;color:var(--coral-text);}
  .pz-fix{font-weight:700;color:var(--ink);}
  .pz-fix::before{content:"Fix: ";font-weight:800;color:var(--indigo-text);}

  /* The pile */
  .pile{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(20px,3vw,40px);align-items:center;margin-top:32px;max-width:980px;}
  .pile-n{margin:0;font-weight:900;font-size:clamp(100px,14vw,170px);line-height:.85;letter-spacing:-0.05em;color:var(--indigo-text);}
  .pile-what{margin:0;font-size:clamp(20px,2.2vw,24px);line-height:1.3;font-weight:800;color:var(--ink);}
  .pile-list{margin:14px 0 0;padding-left:20px;display:grid;gap:6px;font-size:17px;line-height:1.5;color:var(--ink-2);}
  .pile-list li::marker{color:var(--indigo);}

  /* Free checkers */
  .ck{margin-top:36px;max-width:980px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);overflow:hidden;}
  .ck-row{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.6fr) minmax(0,0.7fr);gap:20px;align-items:center;padding:14px 24px;border-top:1px solid var(--rule);}
  .ck-row:first-child{border-top:0;}
  .ck-name{display:flex;align-items:center;gap:12px;font-size:17px;line-height:1.3;}
  .ck-name > span{display:flex;flex-direction:column;gap:2px;}
  .ck-tag{font-size:13px;font-weight:700;color:var(--ink-3);}
  .ck-free{margin:0;font-size:15.5px;line-height:1.5;color:var(--ink);}
  .ck-paid{display:block;margin-top:2px;color:var(--ink-3);font-size:14px;}
  .ck-go{font-weight:700;font-size:15px;}
  span.ck-go{display:flex;flex-direction:column;}
  .ck-go .money{margin-top:4px;}

  /* Hiring */
  .ax-hire{position:relative;max-width:980px;padding:clamp(28px,4vw,48px);background:var(--coral-tint);border:3px solid var(--ink);border-radius:20px;box-shadow:8px 8px 0 var(--ink);}
  .ax-hire > :not(.memphis){position:relative;z-index:2;}
  .ax-hire-dots{top:-30px;right:-22px;color:var(--coral);}
  .ax-pill{display:inline-block;margin:0;padding:6px 14px;border:2px solid var(--ink);border-radius:999px;background:var(--coral);color:var(--coral-deep);font-size:14px;font-weight:900;}
  .ax-hire .sl-h{margin-top:16px;}
  .ax-hire-lead{margin:14px 0 0;font-size:clamp(18px,1.8vw,20px);line-height:1.5;color:var(--ink);max-width:720px;}
  .ax-hire-list{margin:22px 0 0;padding:0;list-style:none;counter-reset:h;display:grid;gap:12px;}
  .ax-hire-list li{counter-increment:h;display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;align-items:center;font-size:18px;line-height:1.4;font-weight:700;color:var(--ink);}
  .ax-hire-list li::before{content:counter(h);display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:2px solid var(--ink);border-radius:50%;background:var(--coral);color:var(--coral-deep);font-weight:900;font-size:14px;}
  .ax-hire .btn-coral{background:var(--coral);color:var(--coral-deep);}
  .ax-hire-sec{padding-bottom:clamp(96px,11vw,150px);}
  .ax-hire-sec .tp-fine{margin-top:32px;}

  @media(max-width:760px){
    .ko-head{display:none;}
    .ko-row,.pz-row{grid-template-columns:1fr;gap:8px;padding:16px 18px;}
    .ck-row{grid-template-columns:1fr;gap:10px;padding:16px 18px;}
    .pile{grid-template-columns:1fr;gap:10px;}
  }
`
