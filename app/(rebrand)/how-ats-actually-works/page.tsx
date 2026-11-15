import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Dots, Squiggle } from '@/app/(rebrand)/_components/retro'
import { keepLast } from '@/lib/site-line'
import { moneyLine } from '@/lib/money'
import { formatDate, latestCheck, resumeTools } from '@/lib/evidence'
import { recFramework } from '@/lib/evidence/recommend'
import { CHECKED, KNOCKOUTS, KNOCKOUT_DOCS, MYTH, NO_ACCOUNT_CHECKERS, PARSE_COUNTER, PARSE_RESULT, PARSING, QUEUE, SILENT, SKILLSYNCER, allSources, type Source } from '@/lib/evidence/ats-explainer'

/**
 * "What does the screening software do to my resume?" Rebuilt Nov 15, 2026
 * from Stephanie's brief: the 75% myth first, then the real sequence, the
 * knockout questions that are the usual automatic no, what still breaks the
 * read, what recruiters do with the pile, free checkers, and what to do from
 * each side. Each finding appears once, in the section where it matters.
 * Facts come from lib/evidence/ats-explainer.ts (read at the source on
 * Nov 15, 2026) and recommend.json (Ladders, Harvard Business School).
 */

const PATH = '/how-ats-actually-works'

export const metadata: Metadata = {
  title: 'What Does the Screening Software Do to My Resume? How Applicant Tracking Systems Really Work',
  description:
    'What happens after you click apply, step by step: where the 75% rejection figure came from, the knockout questions that can reject you on their own, what still breaks the read, free resume checkers, and what to do. Every line sourced.',
  alternates: { canonical: PATH },
}

const ON_THIS_PAGE: [string, string][] = [
  ['myth', 'The 75% figure'],
  ['steps', 'After you apply'],
  ['knockout', 'Knockout questions'],
  ['parsing', 'What breaks the read'],
  ['pile', 'The pile'],
  ['checkers', 'Free checkers'],
  ['do', 'What to do'],
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
            {s.source}
          </a>
          , {s.date}
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
  return { free: cap(parts.filter((p) => !p.includes('$')).join(' ')), paid: cap(parts.filter((p) => p.includes('$')).join(' ')) }
}

export default function Page() {
  const hidden = research('no-callbacks')
  const ladders = research('rewriting')
  const hbs: Source = { source: 'Harvard Business School and Accenture, Hidden Workers', date: '2021', url: hidden.url }
  const firstPass: Source = { source: 'Ladders eye-tracking study', date: '2018', url: ladders.url }
  const caps = recFramework.seekers.capabilities as unknown as Record<string, string[]>
  const rated = resumeTools()
    .all.filter((t) => caps.checker?.includes(t.id))
    .sort((a, b) => (b.overall ?? -1) - (a.overall ?? -1))
  const plansChecked = formatDate(latestCheck())

  const steps: { title: string; line: string; means: string; more?: [string, string]; auto?: boolean }[] = [
    {
      title: 'It reads your resume into a profile',
      line: 'The system pulls your name, contact details, jobs and education out of the file and into fields a recruiter can search.',
      means: 'A plain, one-column file arrives whole.',
      more: ['#parsing', 'What breaks the read'],
    },
    {
      title: 'Knockout questions run',
      line: 'If the employer set up a rule, the wrong answer to a yes-or-no question rejects you on the spot. In most setups this is the only step that runs without a person.',
      means: 'Read each question twice and answer exactly what it asks.',
      more: ['#knockout', 'The questions that can reject you'],
      auto: true,
    },
    {
      title: 'Your application waits in a list',
      line: 'Everything that gets past the knockout questions sits in the system until someone opens it.',
      means: 'No reply yet usually means nobody has reached your application.',
    },
    {
      title: 'Recruiters search and sort the list',
      line: 'They search resumes for keywords, and some systems sort applicants by how well they match criteria the recruiter set.',
      means: 'Use the posting’s own words for the skills you have, so a search finds you.',
      more: ['#pile', 'What recruiters do with the pile'],
    },
    {
      title: 'A person reads from the top',
      line: 'The first read is fast, and it starts with whoever the search or sort put first.',
      means: 'Put your best match for this job at the top of page one.',
    },
    {
      title: 'The bottom of the list may never get opened',
      line: 'Recruiters often start interviewing from the first batch of strong applicants before they reach the rest.',
      means: 'Apply in the first few days a job is up.',
    },
  ]

  const seekerTodo = [
    'Answer knockout questions exactly as they’re asked, and tell the truth.',
    'Send one column with plain section names, and put your contact details in the first lines of the page.',
    'Use the posting’s own words for the skills you have.',
    'Put your best match for this job at the top of page one.',
    'Apply in the first few days a job is up.',
  ]
  const hiringTodo = [
    'Keep knockout questions to the legal and license requirements the job can’t do without.',
    'Read the list of people your rules rejected every week. Greenhouse and Workable both keep one.',
    'Turn on the rejection email, so nobody waits on an answer that’s already been made.',
    'Know what your system’s match score is built from before you sort by it.',
    'Decide what you’re looking for before anyone reads a resume, and score every applicant on the same things.',
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
      citation: citations.map((s) => ({ '@type': 'CreativeWork', name: s.source, url: s.url })),
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
            text: 'There is no study behind that figure. It traces to a 2012 sales pitch by Preptel, a resume company that closed in 2013 without publishing how it got the number. In 25 interviews with US recruiters in 2025, 23 said their system does not reject resumes on its own for formatting, content or design.',
          },
        },
        {
          '@type': 'Question',
          name: 'What rejects an application automatically?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Usually a knockout question: a yes-or-no question the employer sets up so that a wrong answer, such as no to work authorization, a required license or relocation, rejects the application right away. Greenhouse, Workable, Ashby and Workday all document this feature.',
          },
        },
      ],
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
        sticker="Every line sourced"
        title="What does the screening software do to my resume?"
        dek="Most systems don’t throw resumes out on their own. Here’s what happens after you click apply, step by step, from the systems’ own help pages and recruiter research."
        dateline={`Sources checked ${formatDate(CHECKED)}`}
      />
      <p className="wrap ats-jump">
        Hiring? <a className="tl" href="#hiring">Read it from your side of the&nbsp;table</a>
      </p>

      <nav className="toc-bar ax-toc" aria-label="On this page">
        <div className="wrap">
          {ON_THIS_PAGE.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* 1. The myth. Focal point: the struck-through 75%. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="myth">
        <StepHead title="Is software rejecting 75% of resumes?" sub="It’s the most repeated number about these systems, and there’s no study behind it." />
        <div className="mx">
          <div className="mx-heard">
            <p className="mx-k">What you’ve heard</p>
            <p className="mx-big" aria-label="75%, crossed out">
              75%
            </p>
            <p className="mx-claim">{keepLast(MYTH.claim)}</p>
          </div>
          <div className="mx-says">
            <p className="mx-k">What the evidence says</p>
            <div className="mx-row">
              <h3>It began as a sales pitch.</h3>
              <p>{keepLast('A resume company called Preptel used the figure in 2012. It never published how it got the number, and it closed in 2013.')}</p>
              <Sources items={[MYTH.origin, MYTH.traced]} />
            </div>
            <div className="mx-row">
              <h3>{keepLast('23 of 25 recruiters said their system doesn’t reject resumes on its own.')}</h3>
              <p>
                {keepLast(
                  'Enhancv, which sells a resume builder, interviewed 25 US recruiters in fall 2025. Those 23 said their system never rejects a resume for its formatting, content or design. The other 2 had switched on rules that reject applicants below a match score or experience threshold.',
                )}
              </p>
              <Sources items={[MYTH.survey]} />
            </div>
            <div className="mx-row">
              <h3>{keepLast('The usual automatic no is a question the employer wrote.')}</h3>
              <p>{keepLast('Employers can set a yes-or-no question to reject anyone who gives the wrong answer. These knockout rules are set and controlled by recruiters, in Greenhouse’s own words.')}</p>
              <Sources items={[MYTH.rules]} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The sequence. Focal point: the numbered track, with the automatic step marked. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="steps">
        <StepHead title="What happens after you click apply" sub="Six steps, in order, and what each one means for you." />
        <ol className="ax-steps">
          {steps.map((s, i) => (
            <li className={s.auto ? 'ax-step ax-step-auto' : 'ax-step'} key={s.title}>
              <span className="ax-n" aria-hidden="true">
                {i + 1}
              </span>
              <div className="ax-step-body">
                {s.auto && <span className="ax-auto">The automatic no</span>}
                <h3>{keepLast(s.title)}</h3>
                <p>{keepLast(s.line)}</p>
                <p className="ax-means">
                  <b>What it means for you: </b>
                  {keepLast(s.means)}
                </p>
                {s.more && (
                  <a className="tl ax-more" href={s.more[0]}>
                    {s.more[1]} <span className="arr">&darr;</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Knockout questions. Focal point: the list of question types and how to answer each. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="knockout">
        <StepHead
          title="The questions that can reject you on their own"
          sub="Employers write them, and the wrong answer can end your application before anyone opens your resume. Some systems don’t tell you it happened."
        />
        <div className="ko" role="table" aria-label="Knockout questions and how to answer them">
          <div className="ko-row ko-head" role="row">
            <span role="columnheader">What they ask about</span>
            <span role="columnheader">An example from a system’s own help page</span>
            <span role="columnheader">How to answer</span>
          </div>
          {KNOCKOUTS.map((k) => (
            <div className="ko-row" role="row" key={k.kind}>
              <span className="ko-kind" role="cell">
                {k.kind}
              </span>
              <span className="ko-ex" role="cell">
                <q>{k.example}</q>
                <a href={k.from.url} rel="nofollow noopener" target="_blank">
                  {k.from.source.split(',')[0]}
                </a>
              </span>
              <span className="ko-ans" role="cell">
                {keepLast(k.answer)}
              </span>
            </div>
          ))}
        </div>
        <p className="ax-note">
          {keepLast('Got a rejection email minutes after you applied? It was most likely a knockout answer. Over half of the roles in Greenhouse are set to send that email. In Workable, the person isn’t told until the employer sends a note.')}
        </p>
        <Sources items={[MYTH.rules, SILENT, ...KNOCKOUT_DOCS.filter((d) => d !== SILENT)]} />

        <div className="ax-hire" id="hiring">
          <Dots className="ax-hire-dots" />
          <p className="ax-pill">If you’re hiring</p>
          <h3>{keepLast('Your own rules may be screening out people you’d hire.')}</h3>
          <p>
            {keepLast(
              '88% of employers in a Harvard Business School and Accenture study agreed that qualified, high-skilled candidates get screened out for not matching a job description’s exact criteria. Every knockout question removes people for good.',
            )}
          </p>
          <Sources items={[hbs]} />
          <a className="tl ax-hire-go" href="#hiring-do">
            What to do from your side <span className="arr">&darr;</span>
          </a>
        </div>
      </section>

      {/* 4. Parsing. Focal point: the five breaks, each with its fix. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="parsing">
        <StepHead
          title="What still breaks the read"
          sub="None of these gets you rejected by itself. Each one can leave the recruiter looking at a half-filled profile they have to fix by hand."
        />
        <ul className="pz">
          {PARSING.map((p) => (
            <li className="pz-row" key={p.breaks}>
              <div className="pz-break">
                <span className="pz-k">Can break the read</span>
                <p>{keepLast(p.breaks)}</p>
              </div>
              <div className="pz-fix">
                <span className="pz-k">Fix</span>
                <p>{keepLast(p.fix)}</p>
                {p.note && <p className="pz-note">{keepLast(p.note)}</p>}
                <Sources items={p.from} />
              </div>
            </li>
          ))}
        </ul>
        <p className="ax-note">
          {keepLast('Researchers writing in The Conversation say newer systems read columns and tables. You can’t see which system an employer uses, so the plain version is the one that works everywhere.')}
        </p>
        <Sources items={[PARSE_RESULT, PARSE_COUNTER]} />
        <p className="tp-cta">
          <a className="btn btn-indigo" href="#checkers">
            Check your resume for free <span className="arr">&darr;</span>
          </a>
        </p>
      </section>

      {/* 5. The pile. Focal point: 95 applications per job. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="pile">
        <StepHead title="What recruiters do with the pile" />
        <div className="pile-big">
          <p className="pile-n">{QUEUE.perJob.now}</p>
          <div>
            <p className="pile-what">{keepLast('applications per job, on average')}</p>
            <p className="pile-then">{keepLast(`Up from ${QUEUE.perJob.then} in ${QUEUE.perJob.thenYear}, in Greenhouse customer data from August 2025.`)}</p>
            <Sources items={[QUEUE.volume]} />
          </div>
        </div>
        <div className="pile-facts">
          <div className="pile-fact">
            <h3>They search it</h3>
            <p>{keepLast('Recruiters search resumes for keywords. Greenhouse also suggests related words for them to search: a job that mentions JavaScript might prompt a search for React or TypeScript.')}</p>
            <Sources items={[QUEUE.search, MYTH.rules]} />
          </div>
          <div className="pile-fact">
            <h3>They sort it</h3>
            <p>{keepLast('Some systems score applicants against criteria the recruiter sets. Greenhouse groups them as strong, good, partial and limited matches, and lists each group by the date people applied.')}</p>
            <Sources items={[QUEUE.sort]} />
          </div>
          <div className="pile-fact">
            <h3>They read fast</h3>
            <p>{keepLast('A recruiter’s first pass on a resume averaged 7.4 seconds in Ladders’ eye-tracking study.')}</p>
            <Sources items={[firstPass]} />
          </div>
          <div className="pile-fact">
            <h3>They stop when they have enough</h3>
            <p>
              <q>{QUEUE.stop.quote}</q> {keepLast(QUEUE.stop.who)}
            </p>
            <Sources items={[QUEUE.stop.from]} />
          </div>
        </div>
        <p className="ax-concl">{keepLast('So being easy to find and early in the list does more for you than any checker’s score.')}</p>
      </section>

      {/* 6. Free checkers. Focal point: what each free plan gives you. */}
      <section className="wrap sec sl-sec sl-sec-seekers" id="checkers">
        <StepHead
          title="Free resume checkers, and what free gets you"
          sub="A checker compares your resume to one job posting. It can’t see the employer’s system, so use it to find missing skills and a broken layout, and don’t chase a perfect score."
        />
        <h3 className="ck-group">No account needed</h3>
        <p className="ck-group-note">{keepLast(`From each tool’s own page, read ${formatDate(CHECKED)}. We don’t rate these yet.`)}</p>
        <div className="ck">
          {NO_ACCOUNT_CHECKERS.map((c) => (
            <div className="ck-row" key={c.id}>
              <div className="ck-name">
                <Logo domain={c.domain} name={c.name} size={44} />
                <b>{c.name}</b>
              </div>
              <p className="ck-free">
                <b>Free: </b>
                {keepLast(c.free)}
              </p>
              <span className="ck-go">
                <a className="tl" href={c.url} rel="nofollow noopener" target="_blank">
                  Open it <span className="arr">&#8599;</span>
                </a>
                <span className="money">{moneyLine(c.id)}</span>
              </span>
            </div>
          ))}
        </div>

        <h3 className="ck-group">Free with an account</h3>
        <p className="ck-group-note">{keepLast(`Scores and free plans from our rankings, checked ${plansChecked}.`)}</p>
        <div className="ck">
          {rated.map((t) => {
            const { free, paid } = freeAndPaid(t.freeAnswer)
            return (
              <div className="ck-row" key={t.id}>
                <div className="ck-name">
                  <Logo domain={t.domain} name={t.name} size={44} />
                  <span>
                    <b>{t.name}</b>
                    <span className="ck-score">{t.overall !== null ? `${t.overall.toFixed(2)} out of 5` : 'Too few reviews to rate'}</span>
                  </span>
                </div>
                <p className="ck-free">
                  <b>Free: </b>
                  {keepLast(free)}
                  {paid && <span className="ck-paid">{keepLast(`If you pay: ${paid}`)}</span>}
                </p>
                <a className="tl ck-go" href={`/reviews/${t.id}`}>
                  Is {t.name} worth it? <span className="arr">&rarr;</span>
                </a>
              </div>
            )
          })}
          <div className="ck-row">
            <div className="ck-name">
              <Logo domain={SKILLSYNCER.domain} name={SKILLSYNCER.name} size={44} />
              <span>
                <b>{SKILLSYNCER.name}</b>
                <span className="ck-score">Not in our rankings yet</span>
              </span>
            </div>
            <p className="ck-free">
              <b>Free: </b>
              {keepLast(SKILLSYNCER.free)}
              <span className="ck-paid">{keepLast(`If you pay: ${SKILLSYNCER.paid}`)}</span>
            </p>
            <span className="ck-go">
              <a className="tl" href={SKILLSYNCER.url} rel="nofollow noopener" target="_blank">
                Open it <span className="arr">&#8599;</span>
              </a>
              <span className="money">{moneyLine(SKILLSYNCER.id)}</span>
            </span>
          </div>
        </div>
        <Sources items={[...NO_ACCOUNT_CHECKERS.map((c) => c.from), SKILLSYNCER.from]} />
        <div className="sl-callout">
          <Squiggle className="slc-squig" />
          <p className="sl-text">{keepLast('Tell us how you search, and get the checker that fits, with what its free plan leaves out.')}</p>
          <p className="tp-cta">
            <a className="btn btn-indigo" href="/what-should-i-use?side=seekers&problem=no-callbacks#questions">
              Which checker should I use? <span className="arr">&rarr;</span>
            </a>
          </p>
        </div>
      </section>

      {/* 7. What to do, from each side. Mirrored: the same number of steps a side. */}
      <section className="sec" id="do">
        <div className="wrap">
          <StepHead title="What to do next" sub="The same evidence, from each side of the table." />
        </div>
        <div className="do-band">
          <div className="wrap do-split">
            <div className="do-col do-seekers">
              <span className="do-pill do-pill-seekers">I’m a job seeker</span>
              <ol>
                {seekerTodo.map((t) => (
                  <li key={t}>{keepLast(t)}</li>
                ))}
              </ol>
              <a className="tl do-go" href="/free-job-search">
                See every resume tool with a real free version <span className="arr">&rarr;</span>
              </a>
            </div>
            <div className="do-col do-hiring" id="hiring-do">
              <span className="do-pill do-pill-hiring">I’m hiring</span>
              <ol>
                {hiringTodo.map((t) => (
                  <li key={t}>{keepLast(t)}</li>
                ))}
              </ol>
              <a className="tl do-go" href="/interview-scorecard">
                Build a free scorecard <span className="arr">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
        <p className="wrap tp-fine">Nobody pays to be featured.</p>
      </section>

      <SiteFooter />
    </>
  )
}

const css = `
  .ats-jump{margin-top:28px;font-size:16px;font-weight:700;color:var(--ink-2);}
  .ax-toc{margin-top:28px;}
  .ax-src{margin:10px 0 0;font-size:13px;line-height:1.5;color:var(--ink-3);text-wrap:pretty;}
  .ax-src a{color:inherit;text-decoration:underline;text-underline-offset:3px;}
  .ax-src a:hover{color:var(--ink);}
  .ax-note{margin:32px 0 0;max-width:760px;font-size:18px;line-height:1.6;font-weight:600;color:var(--ink);text-wrap:pretty;}
  .ax-concl{margin:44px 0 0;max-width:760px;font-size:clamp(22px,2.4vw,26px);line-height:1.3;font-weight:800;color:var(--ink);text-wrap:balance;}

  /* 1. Myth */
  .mx{display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.4fr);margin-top:44px;background:#fff;border:3px solid var(--ink);border-radius:20px;box-shadow:8px 8px 0 var(--ink);overflow:hidden;}
  .mx-heard{display:flex;flex-direction:column;justify-content:center;padding:clamp(28px,4vw,48px);background:var(--coral-tint);border-right:3px solid var(--ink);}
  .mx-says{display:grid;gap:30px;padding:clamp(28px,4vw,48px);}
  .mx-k{margin:0;font-size:14px;font-weight:800;color:var(--ink-2);}
  .mx-big{position:relative;align-self:flex-start;margin:14px 0 0;font-weight:900;font-size:clamp(88px,12vw,150px);line-height:.9;letter-spacing:-0.045em;color:var(--coral-text);}
  .mx-big::after{content:"";position:absolute;left:-6%;right:-6%;top:48%;height:clamp(9px,1.1vw,13px);background:var(--ink);border-radius:8px;transform:rotate(-9deg);}
  .mx-claim{margin:20px 0 0;font-size:20px;line-height:1.4;font-weight:700;color:var(--ink);text-wrap:balance;}
  .mx-row h3{margin:0;font-size:clamp(22px,2.2vw,26px);line-height:1.2;font-weight:900;letter-spacing:-0.01em;text-wrap:balance;}
  .mx-row > p:not(.ax-src){margin:8px 0 0;font-size:17.5px;line-height:1.6;color:var(--ink-2);text-wrap:pretty;}

  /* 2. Steps */
  .ax-steps{list-style:none;margin:44px 0 0;padding:0;display:grid;gap:22px;max-width:900px;}
  .ax-step{position:relative;display:grid;grid-template-columns:64px minmax(0,1fr);gap:22px;align-items:start;}
  .ax-step:not(:last-child)::before{content:"";position:absolute;left:30px;top:64px;bottom:-22px;width:4px;background:var(--ink);border-radius:2px;}
  .ax-n{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;border:3px solid var(--ink);background:var(--indigo);color:#fff;font-weight:900;font-size:28px;box-shadow:4px 4px 0 var(--ink);}
  .ax-step-body{padding:22px 26px 24px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);}
  .ax-step-body h3{margin:0;font-size:clamp(22px,2.2vw,26px);line-height:1.2;font-weight:900;letter-spacing:-0.01em;}
  .ax-step-body > p{margin:8px 0 0;font-size:17px;line-height:1.6;color:var(--ink-2);}
  .ax-step-body .ax-means{margin-top:14px;padding:12px 14px;background:var(--indigo-tint);border-radius:12px;color:var(--ink);}
  .ax-more{display:inline-block;margin-top:14px;font-weight:700;font-size:15.5px;}
  .ax-step-auto .ax-n{background:var(--coral);color:var(--coral-deep);}
  .ax-step-auto .ax-step-body{background:var(--coral-tint);}
  .ax-step-auto .ax-means{background:#fff;}
  .ax-auto{display:inline-block;margin:0 0 10px;padding:6px 12px;border:2px solid var(--ink);border-radius:999px;background:var(--coral);color:var(--coral-deep);font-size:13px;font-weight:900;box-shadow:2px 2px 0 var(--ink);transform:rotate(-2deg);}

  /* 3. Knockout questions */
  .ko{margin-top:44px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);overflow:hidden;}
  .ko-row{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.1fr) minmax(0,1.5fr);gap:24px;padding:20px 26px;border-top:1px solid var(--rule);}
  .ko-row:first-child{border-top:0;}
  .ko-head{background:var(--paper-2);font-size:14px;font-weight:800;color:var(--ink-2);padding-top:14px;padding-bottom:14px;}
  .ko-kind{font-weight:900;font-size:18px;line-height:1.3;color:var(--ink);}
  .ko-ex{display:flex;flex-direction:column;gap:6px;font-size:16px;line-height:1.5;color:var(--ink);}
  .ko-ex q{font-weight:600;}
  .ko-ex a{font-size:13px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .ko-ans{font-size:16.5px;line-height:1.55;color:var(--ink-2);}
  .ax-hire{position:relative;margin-top:56px;max-width:860px;padding:clamp(26px,4vw,40px);background:var(--coral-tint);border:3px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--ink);scroll-margin-top:72px;}
  .ax-hire > :not(.memphis){position:relative;z-index:2;}
  .ax-hire-dots{top:-30px;right:-22px;color:var(--coral);}
  .ax-pill{display:inline-block;margin:0;padding:6px 14px;border:2px solid var(--ink);border-radius:999px;background:var(--coral);color:var(--coral-deep);font-size:14px;font-weight:900;}
  .ax-hire h3{margin:16px 0 0;font-size:clamp(24px,2.6vw,30px);line-height:1.2;font-weight:900;letter-spacing:-0.015em;text-wrap:balance;}
  .ax-hire > p:not(.ax-src):not(.ax-pill){margin:12px 0 0;font-size:17.5px;line-height:1.6;color:var(--ink);}
  .ax-hire-go{display:inline-block;margin-top:18px;font-weight:800;color:var(--coral-text);}

  /* 4. Parsing */
  .pz{list-style:none;margin:44px 0 0;padding:0;display:grid;gap:18px;}
  .pz-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);overflow:hidden;}
  .pz-break{padding:20px 24px;background:var(--paper-2);border-right:3px solid var(--ink);}
  .pz-fix{padding:20px 24px;}
  .pz-k{display:block;font-size:13.5px;font-weight:800;color:var(--ink-3);}
  .pz-break .pz-k{color:var(--coral-text);}
  .pz-fix .pz-k{color:var(--indigo-text);}
  .pz-row p{margin:6px 0 0;font-size:17.5px;line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .pz-row .pz-note{font-weight:400;font-size:15.5px;color:var(--ink-2);}
  .pz-row p.ax-src{font-size:13px;line-height:1.5;font-weight:400;color:var(--ink-3);}

  /* 5. The pile */
  .pile-big{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(20px,3vw,36px);align-items:center;margin-top:40px;}
  .pile-n{margin:0;font-weight:900;font-size:clamp(110px,16vw,200px);line-height:.85;letter-spacing:-0.05em;color:var(--indigo-text);}
  .pile-what{margin:0;font-size:clamp(24px,2.8vw,32px);line-height:1.15;font-weight:900;letter-spacing:-0.015em;color:var(--ink);}
  .pile-then{margin:10px 0 0;font-size:18px;line-height:1.5;color:var(--ink-2);}
  .pile-facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:48px;}
  .pile-fact{padding:24px 26px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);}
  .pile-fact h3{margin:0;font-size:clamp(22px,2.2vw,26px);line-height:1.2;font-weight:900;letter-spacing:-0.01em;}
  .pile-fact > p:not(.ax-src){margin:8px 0 0;font-size:17px;line-height:1.6;color:var(--ink-2);}
  .pile-fact q{color:var(--ink);font-weight:600;}

  /* 6. Free checkers */
  .ck-group{margin:48px 0 0;font-size:clamp(22px,2.2vw,26px);font-weight:900;letter-spacing:-0.01em;}
  .ck-group-note{margin:6px 0 0;font-size:15px;color:var(--ink-3);}
  .ck{margin-top:18px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);overflow:hidden;}
  .ck-row{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.6fr) minmax(0,0.75fr);gap:24px;align-items:center;padding:18px 24px;border-top:1px solid var(--rule);}
  .ck-row:first-child{border-top:0;}
  .ck-name{display:flex;align-items:center;gap:14px;font-size:17px;line-height:1.3;}
  .ck-name > span{display:flex;flex-direction:column;gap:2px;}
  .ck-score{font-size:13.5px;font-weight:700;color:var(--ink-3);}
  .ck-free{margin:0;font-size:16px;line-height:1.55;color:var(--ink);}
  .ck-paid{display:block;margin-top:4px;color:var(--ink-3);font-size:14.5px;}
  .ck-go{font-weight:700;font-size:15.5px;}
  span.ck-go{display:flex;flex-direction:column;}
  .ck-go .money{margin-top:4px;}
  #checkers .sl-callout{margin-top:56px;}

  /* 7. What to do */
  .do-band{margin-top:44px;padding:clamp(36px,5vw,56px) 0;background:linear-gradient(90deg,var(--indigo-tint) 50%,var(--coral-tint) 50%);border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);}
  .do-split{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(28px,4vw,48px);}
  .do-col{padding:clamp(24px,3vw,32px);background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);scroll-margin-top:72px;}
  .do-pill{display:inline-flex;align-items:center;gap:8px;padding:7px 14px 7px 12px;border-radius:999px;font-size:14px;font-weight:800;}
  .do-pill::before{content:"";width:8px;height:8px;border-radius:50%;background:currentColor;}
  .do-pill-seekers{background:var(--indigo);color:#fff;}
  .do-pill-hiring{background:var(--coral);color:var(--coral-deep);}
  .do-col ol{margin:22px 0 0;padding:0;list-style:none;counter-reset:d;display:grid;gap:14px;}
  .do-col li{counter-increment:d;display:grid;grid-template-columns:32px minmax(0,1fr);gap:12px;font-size:17px;line-height:1.5;color:var(--ink);}
  .do-col li::before{content:counter(d);display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:2px solid var(--ink);border-radius:50%;font-weight:900;font-size:14px;}
  .do-seekers li::before{background:var(--indigo);color:#fff;}
  .do-hiring li::before{background:var(--coral);color:var(--coral-deep);}
  .do-go{display:inline-block;margin-top:24px;font-weight:800;}
  .do-hiring .do-go{color:var(--coral-text);}
  #do .tp-fine{margin-top:32px;}

  @media(max-width:860px){
    .mx{grid-template-columns:1fr;}
    .mx-heard{border-right:0;border-bottom:3px solid var(--ink);}
    .ko-head{display:none;}
    .ko-row{grid-template-columns:1fr;gap:10px;padding:20px 22px;}
    .pz-row{grid-template-columns:1fr;}
    .pz-break{border-right:0;border-bottom:3px solid var(--ink);}
    .pile-facts{grid-template-columns:1fr;}
    .ck-row{grid-template-columns:1fr;gap:12px;}
    .do-band{background:var(--paper-2);}
    .do-split{grid-template-columns:1fr;}
  }
  @media(max-width:560px){
    .ax-step{grid-template-columns:44px minmax(0,1fr);gap:14px;}
    .ax-n{width:44px;height:44px;font-size:20px;}
    .ax-step:not(:last-child)::before{left:20px;top:44px;}
    .ax-step-body{padding:18px 18px 20px;}
    .pile-big{grid-template-columns:1fr;gap:12px;}
  }
`
