import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { AutoForm, PrintButton } from '@/app/(rebrand)/_components/tool-forms'
import { Capture } from '@/app/(rebrand)/_components/capture'
import { captureCss } from '@/app/(rebrand)/_components/widgets-css'
import { REPVERA_NOTE_LABEL, REPVERA_WHAT, repveraLink } from '@/lib/repvera'
import { SCORECARD_MAX, cleanRole, pickCompetencies, scorecardData as data } from '@/lib/scorecard'

/**
 * "What will they ask me in the interview?": interview practice for job
 * seekers, built from the same content hiring teams use on
 * /interview-scorecard (the US Office of Personnel Management's structured
 * interview method). The candidate sees the questions, the follow-ups and
 * what a strong answer shows, then plans their own.
 */

const PATH = '/interview-practice'
const SITE = 'https://hiring.productions'
const MAX = SCORECARD_MAX

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function read(sp: Record<string, string | string[] | undefined>) {
  const role = Array.isArray(sp.role) ? sp.role[0] : sp.role
  const { chosen, tooMany } = pickCompetencies(sp.c)
  return { role: cleanRole(role), chosen, tooMany }
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams
  return {
    title: 'What Will They Ask Me in the Interview? Free Interview Practice',
    description:
      'Practice the questions structured interviews use, the follow-ups you will hear, and what a strong answer shows. Built on the US Office of Personnel Management’s interview method, the same one hiring teams use. Free.',
    alternates: { canonical: PATH },
    robots: Object.keys(sp).length > 0 ? { index: false, follow: true } : undefined,
  }
}

const css = `
  .ip-build{display:grid;gap:40px;}
  .ip-q{border:0;min-width:0;}
  .ip-q legend{font-weight:900;font-size:clamp(26px,3vw,34px);letter-spacing:-0.02em;line-height:1.15;color:var(--ink);margin-bottom:16px;padding:0;}
  .ip-role{width:100%;max-width:520px;min-height:52px;border:1.5px solid var(--rule-2);border-radius:var(--r);padding:10px 14px;background:var(--surface);font:inherit;font-size:17px;color:var(--ink);}
  .ip-role:focus{border-color:var(--indigo);outline:none;box-shadow:0 0 0 3px var(--indigo-tint);}
  .ip-hint{font-size:15px;color:var(--ink-3);margin:-6px 0 14px;}
  .ip-list{border-top:1px solid var(--rule);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:32px;}
  .ip-opt{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start;padding:14px 4px;border-bottom:1px solid var(--rule);cursor:pointer;}
  .ip-opt input{width:20px;height:20px;margin-top:2px;accent-color:var(--indigo);}
  .ip-opt b{font-size:17px;font-weight:800;color:var(--ink);}
  .ip-opt:has(input:checked) b{color:var(--indigo-text);}
  .ip-opt.ip-off{cursor:not-allowed;}
  .ip-opt.ip-off b{color:var(--ink-3);}
  .ip-opt:has(input:focus-visible){outline:2px solid var(--indigo);outline-offset:2px;border-radius:6px;}
  .ip-build[data-js] .ip-submit{display:none;}
  body:has(.ip-build[data-pending]) #practice{opacity:.55;transition:opacity .2s ease;}

  .ip-rules{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px;margin-top:28px;border-top:1px solid var(--rule);}
  .ip-rules li{list-style:none;padding:18px 0;border-bottom:1px solid var(--rule);font-size:18px;line-height:1.5;color:var(--ink);}
  .ip-rules li b{display:block;font-weight:800;}
  .ip-rules li span{display:block;font-size:16px;color:var(--ink-2);margin-top:4px;}

  .ip-top{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:20px;}
  .ip-top h2{margin:0;}
  .qcard{margin-top:28px;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:clamp(22px,3.4vw,36px);box-shadow:var(--shadow);break-inside:avoid;page-break-inside:avoid;}
  .qcard h3{font-weight:900;font-size:22px;letter-spacing:-0.015em;}
  .q-ask{margin-top:12px;font-size:clamp(19px,1.9vw,22px);line-height:1.45;font-weight:700;color:var(--ink);}
  .q-ask span{display:block;font-size:14px;font-weight:800;color:var(--indigo-text);margin-bottom:4px;}
  .q-probes{margin-top:16px;font-size:15.5px;color:var(--ink-2);line-height:1.55;}
  .q-probes b{color:var(--ink);}
  .q-levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:18px;}
  .q-levels div{padding:12px 14px;border-radius:10px;border:1px solid var(--rule);font-size:14.5px;line-height:1.5;color:var(--ink-2);}
  .q-levels div.top{background:var(--indigo-tint);border-color:transparent;color:var(--ink);}
  .q-levels b{display:block;font-size:14px;color:var(--ink);margin-bottom:2px;}
  .q-plan{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:18px;}
  .q-plan label{display:grid;gap:6px;font-size:14px;font-weight:800;color:var(--ink-2);}
  .q-plan textarea{min-height:96px;resize:vertical;border:1.5px solid var(--rule-2);border-radius:var(--r);padding:10px 12px;font:inherit;font-size:15px;color:var(--ink);background:var(--surface);}
  .q-plan textarea:focus{border-color:var(--indigo);outline:none;box-shadow:0 0 0 3px var(--indigo-tint);}
  .ip-src{margin-top:24px;font-size:13px;color:var(--ink-3);line-height:1.6;max-width:860px;}
  .ip-src a{text-decoration:underline;text-underline-offset:3px;}
  .ip-empty{font-size:18px;color:var(--ink-2);}
  .other{max-width:820px;border-left:4px solid var(--coral);padding:4px 0 4px 24px;}
  .other-k{display:block;font-size:15px;font-weight:800;color:var(--coral-text);}
  .other p{font-size:clamp(19px,1.9vw,22px);line-height:1.5;color:var(--ink);font-weight:600;margin-top:8px;}
  .other a{display:inline-block;margin-top:10px;}
  .ours{max-width:760px;border-left:4px solid var(--indigo);padding:4px 0 4px 24px;}
  .ours-k{display:block;font-size:14px;font-weight:800;color:var(--indigo-text);}
  .ours p{font-size:18px;line-height:1.55;color:var(--ink);margin-top:6px;}
  .ours a{display:inline-block;margin-top:10px;}
  @media(max-width:760px){.ip-list,.ip-rules,.q-levels,.q-plan{grid-template-columns:1fr;}}
  @media print{
    .site-nav,.site-footer,.ph,#build,#how,.ip-top .btn,.no-print{display:none !important;}
    body,html{background:#fff !important;}
    .qcard{box-shadow:none;}
    .sec,.sec-tight{padding-top:0 !important;}
  }
`

export default async function InterviewPracticePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const { role, chosen, tooMany } = read(sp)
  const ids = chosen.map((c) => c.id)
  const full = chosen.length >= MAX
  const m = data.method
  const avoidFirst = m.avoid.find((a) => a.name === 'First impressions')
  const share = `${SITE}${PATH}?${new URLSearchParams({ ...(role ? { role } : {}), ...(ids.length ? { c: ids.join(',') } : {}) }).toString()}`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + captureCss + css }} />
      <SiteNav active="seekers" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Interview practice
          </p>
          <h1 className="display">What will they ask me in the interview?</h1>
          <p className="dek">
            Pick the skills the job asks for. You get the questions structured interviews use, the follow-ups you&rsquo;ll hear, and
            what a strong answer shows. Then plan yours.
          </p>
          <p className="dateline">Free, no sign-up. Built on the US Office of Personnel Management&rsquo;s interview method, the one hiring teams use.</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="how">
        <h2>How a structured interview works</h2>
        <ul className="ip-rules">
          <li>
            <b>Everyone gets the same questions.</b>
            <span>In the same order, so you can prepare for them.</span>
          </li>
          <li>
            <b>Each answer is rated on a scale.</b>
            <span>Against set examples of a weak, average and strong answer. They&rsquo;re below for every question.</span>
          </li>
          <li>
            <b>Say &ldquo;I,&rdquo; not &ldquo;we.&rdquo;</b>
            <span>When you say &ldquo;we did,&rdquo; interviewers are told to ask what you did.</span>
          </li>
          <li>
            <b>Pick your hardest example.</b>
            <span>In the method&rsquo;s own example, how demanding the situation was sets the rating.</span>
          </li>
          {avoidFirst && (
            <li>
              <b>A nervous start isn&rsquo;t the end.</b>
              <span>Interviewers are told not to rate on the first few minutes.</span>
            </li>
          )}
          <li>
            <b>Expect follow-ups.</b>
            <span>Who was involved, what you did, and how it turned out. Have all three ready.</span>
          </li>
        </ul>
      </section>

      <section className="wrap sec" id="build" aria-label="Choose what to practice">
        <AutoForm action={PATH} multi={['c']} limits={{ c: MAX }} className="ip-build">
          <fieldset className="ip-q">
            <legend>What&rsquo;s the job?</legend>
            <label className="sr-only" htmlFor="ip-role">
              Job title
            </label>
            <input id="ip-role" className="ip-role" type="text" name="role" maxLength={80} placeholder="For example, Project Manager" defaultValue={role} />
          </fieldset>
          <fieldset className="ip-q">
            <legend>Which skills does the posting ask for?</legend>
            <p className="ip-hint">
              Look for them in the job description. Pick up to {MAX}.{chosen.length > 0 ? ` ${chosen.length} of ${MAX} chosen.` : ''}
              {full ? ' To swap one, untick it first.' : ''}
              {tooMany ? ` Only the first ${MAX} are used.` : ''}
            </p>
            <div className="ip-list">
              {data.competencies.map((c) => (
                <label className={`ip-opt${full && !ids.includes(c.id) ? ' ip-off' : ''}`} key={c.id}>
                  <input type="checkbox" name="c" value={c.id} defaultChecked={ids.includes(c.id)} disabled={full && !ids.includes(c.id)} />
                  <b>{c.name}</b>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="ip-submit">
            <button className="btn btn-indigo" type="submit">
              Show my practice questions
            </button>
          </div>
        </AutoForm>
      </section>

      <section className="wrap sec" id="practice" aria-label="Your practice questions">
        {chosen.length === 0 ? (
          <p className="ip-empty">Pick at least one skill above and your practice questions appear here.</p>
        ) : (
          <>
            <div className="ip-top">
              <h2>{role ? `${role}: practice questions` : 'Your practice questions'}</h2>
              <PrintButton label="Print my practice sheet" />
            </div>
            {chosen.map((c, i) => (
              <article className="qcard" key={c.id}>
                <h3>
                  {i + 1}. {c.name}
                </h3>
                <p className="q-ask">
                  <span>They&rsquo;ll ask</span>
                  {c.question}
                </p>
                <p className="q-probes">
                  <b>Then they&rsquo;ll follow up:</b> {m.probes.flatMap((p) => p.items).join(' ')}
                </p>
                <div className="q-levels" aria-label="How answers are rated">
                  <div className="top">
                    <b>A 5 sounds like</b>
                    {c.outstanding}
                  </div>
                  <div>
                    <b>A 3 sounds like</b>
                    {c.average}
                  </div>
                  <div>
                    <b>A 1 sounds like</b>
                    {c.low}
                  </div>
                </div>
                <div className="q-plan">
                  <label>
                    The situation
                    <textarea name={`${c.id}-situation`} placeholder="Where, when, who was involved, and what was at stake" />
                  </label>
                  <label>
                    What you did
                    <textarea name={`${c.id}-action`} placeholder="Your steps. Say “I”" />
                  </label>
                  <label>
                    How it turned out
                    <textarea name={`${c.id}-result`} placeholder="The result, with a number if you have one" />
                  </label>
                </div>
              </article>
            ))}
            <p className="ip-src">
              Questions and follow-ups:{' '}
              <a href={data.sources.guide.url} rel="nofollow noopener" target="_blank">
                {data.sources.guide.name}
              </a>
              . Skill definitions:{' '}
              <a href={data.sources.competencies.url} rel="nofollow noopener" target="_blank">
                {data.sources.competencies.name}
              </a>
              . The 1, 3 and 5 examples follow{' '}
              <a href={data.sources.example.url} rel="nofollow noopener" target="_blank">
                OPM&rsquo;s worked example
              </a>
              ; each hiring team sets its own. Nothing you type here leaves this page.
            </p>
          </>
        )}
      </section>

      {chosen.length > 0 && (
        <section className="wrap sec-tight no-print" id="keep">
          <Capture
            source="interview_practice"
            audience="candidate"
            promise="Email me these practice questions, with the follow-ups and what a strong answer shows."
            cta="Email me my questions"
            done="Sent. Your practice questions are in your inbox."
            extras={{ role, ids: ids.join(','), url: share }}
          />
        </section>
      )}

      <section className="wrap sec no-print" id="other-side">
        <aside className="other" aria-label="What the hiring side sees">
          <span className="other-k">What the hiring side sees</span>
          <p>These are the same questions hiring teams get when they build a scorecard here, and they score each answer on the same 1 to 5 scale.</p>
          <a className="tl" href="/interview-scorecard">
            See the interviewer&rsquo;s scorecard <span className="arr">&rarr;</span>
          </a>
        </aside>
      </section>

      <section className="wrap sec no-print" id="repvera">
        <aside className="ours" aria-label={REPVERA_NOTE_LABEL}>
          <span className="ours-k">{REPVERA_NOTE_LABEL}</span>
          <p>{REPVERA_WHAT}</p>
          <a className="tl tl-strong" href={repveraLink('interview-practice')} rel="noopener">
            See how RepVera works <span className="arr">&#8599;</span>
          </a>
        </aside>
      </section>

      <NextStep side="seekers" line="Send proof of how you work with your application, too." button="Show how you work" href="/show-how-you-work" />
      <SiteFooter />
    </>
  )
}
