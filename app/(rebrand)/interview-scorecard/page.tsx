import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import data from '@/lib/tools/scorecard.json'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { AutoForm, PrintButton } from '@/app/(rebrand)/_components/tool-forms'
import { Capture } from '@/app/(rebrand)/_components/capture'
import { captureCss } from '@/app/(rebrand)/_components/widgets-css'
import { REPVERA_NOTE_LABEL, REPVERA_WHAT, repveraLink } from '@/lib/repvera'
import { SCORECARD_MAX, SCORECARD_PATH, cleanRole, pickCompetencies, scorecardUrl } from '@/lib/scorecard'

/**
 * "What should we ask in the interview?": a structured interview scorecard
 * built on the US Office of Personnel Management's method. Definitions are
 * OPM's, verbatim; questions and probes follow OPM's guide; benchmarks
 * follow OPM's worked example and are labeled as a starting point.
 */

const PATH = SCORECARD_PATH
const MAX = SCORECARD_MAX

type SearchParams = Promise<Record<string, string | string[] | undefined>>

/** What the address asks for, cleaned by the same rules the email and the files use. */
function read(sp: Record<string, string | string[] | undefined>) {
  const role = Array.isArray(sp.role) ? sp.role[0] : sp.role
  const { chosen, tooMany } = pickCompetencies(sp.c)
  return { role: cleanRole(role), chosen, tooMany }
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams
  const hasParams = Object.keys(sp).length > 0
  return {
    title: 'What Should We Ask in the Interview? A Free Structured Interview Scorecard',
    description:
      "Pick 4 to 6 skills and get the same questions for every candidate, probes and a 1 to 5 rating scale with benchmarks, built on the US Office of Personnel Management's structured interview method. Free, printable.",
    alternates: { canonical: PATH },
    robots: hasParams ? { index: false, follow: true } : undefined,
  }
}

const css = `
  .sc-build{display:grid;gap:40px;}
  .sc-q{border:0;min-width:0;}
  .sc-q legend{font-weight:900;font-size:clamp(26px,3vw,34px);letter-spacing:-0.02em;line-height:1.15;color:var(--ink);margin-bottom:16px;padding:0;}
  .sc-role{width:100%;max-width:520px;min-height:52px;border:1.5px solid var(--rule-2);border-radius:var(--r);padding:10px 14px;background:var(--surface);font:inherit;font-size:17px;color:var(--ink);}
  .sc-role:focus{border-color:var(--coral);outline:none;box-shadow:0 0 0 3px var(--coral-tint);}
  .sc-hint{font-size:15px;color:var(--ink-3);margin:-6px 0 14px;}
  .sc-list{border-top:1px solid var(--rule);}
  .sc-opt{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start;padding:16px 4px;border-bottom:1px solid var(--rule);cursor:pointer;}
  .sc-opt input{width:20px;height:20px;margin-top:3px;accent-color:var(--coral);}
  .sc-opt b{display:block;font-size:18px;font-weight:800;color:var(--ink);}
  .sc-opt span{display:block;font-size:15px;color:var(--ink-2);line-height:1.5;margin-top:2px;}
  .sc-opt:has(input:checked) b{color:var(--coral-text);}
  .sc-opt.sc-off{cursor:not-allowed;}
  .sc-opt.sc-off b,.sc-opt.sc-off span{color:var(--ink-3);}
  .sc-opt:has(input:focus-visible){outline:2px solid var(--coral);outline-offset:2px;border-radius:6px;}
  .sc-build[data-js] .sc-submit{display:none;}
  body:has(.sc-build[data-pending]) #scorecard{opacity:.55;transition:opacity .2s ease;}

  .sc-top{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:20px;}
  .sc-top h2{margin:0;}
  .sheet{margin-top:32px;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:clamp(24px,4vw,44px);box-shadow:var(--shadow);}
  .sheet-head{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px 24px;padding-bottom:24px;border-bottom:2px solid var(--ink);}
  .sheet-head span{display:block;font-size:13px;font-weight:700;color:var(--ink-3);}
  .sheet-head i{display:block;height:28px;border-bottom:1px solid var(--rule-2);}
  .sheet-rules{list-style:none;display:grid;gap:6px;padding:20px 0;border-bottom:1px solid var(--rule);font-size:15px;color:var(--ink-2);}
  .sheet-rules li::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--coral);margin-right:10px;vertical-align:2px;}
  .comp{padding:28px 0;border-bottom:1px solid var(--rule);break-inside:avoid;page-break-inside:avoid;}
  .comp h3{font-weight:900;font-size:24px;letter-spacing:-0.015em;line-height:1.2;}
  .comp-def{font-size:14px;color:var(--ink-3);line-height:1.55;margin-top:6px;}
  .comp-ask{margin-top:16px;font-size:18px;line-height:1.5;color:var(--ink);font-weight:600;}
  .comp-ask b{color:var(--coral-text);font-weight:800;margin-right:6px;}
  .probes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:14px;font-size:14px;color:var(--ink-2);}
  .probes b{display:block;font-size:13px;color:var(--ink-3);margin-bottom:2px;}
  .scale{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:18px;border:1px solid var(--rule);border-radius:8px;overflow:hidden;}
  .scale div{padding:10px 12px;border-right:1px solid var(--rule);font-size:13px;line-height:1.45;color:var(--ink-2);min-height:96px;}
  .scale div:last-child{border-right:0;}
  .scale b{display:block;font-size:14px;color:var(--ink);margin-bottom:4px;}
  .notes{margin-top:16px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px;align-items:end;}
  .notes i{display:block;height:84px;border:1px dashed var(--rule-2);border-radius:8px;}
  .notes span{font-size:13px;font-weight:700;color:var(--ink-3);}
  .rate{display:flex;gap:6px;margin-top:6px;}
  .rate em{font-style:normal;width:34px;height:34px;border:1.5px solid var(--rule-2);border-radius:6px;display:grid;place-items:center;font-weight:800;color:var(--ink-3);}
  .final{padding-top:24px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;}
  .final h3{font-weight:900;font-size:20px;}
  .final ul{list-style:none;display:grid;gap:8px;margin-top:10px;font-size:14px;color:var(--ink-2);}
  .final li b{color:var(--ink);}
  .sheet-src{margin-top:24px;font-size:13px;color:var(--ink-3);line-height:1.6;}
  .sheet-src a{text-decoration:underline;text-underline-offset:3px;}
  .sc-empty{font-size:18px;color:var(--ink-2);}
  .sc-rules{list-style:disc;padding-left:20px;display:grid;gap:6px;color:var(--ink-2);}

  .ours{max-width:760px;border-left:4px solid var(--indigo);padding:4px 0 4px 24px;}
  .ours-k{display:block;font-size:14px;font-weight:800;color:var(--indigo-text);}
  .ours p{font-size:18px;line-height:1.55;color:var(--ink);margin-top:6px;}
  .ours a{display:inline-block;margin-top:10px;}

  @media(max-width:760px){
    .sheet-head,.probes,.final{grid-template-columns:1fr;}
    .scale{grid-template-columns:1fr;}
    .scale div{border-right:0;border-bottom:1px solid var(--rule);min-height:0;}
  }
  @media print{
    .site-nav,.site-footer,.ph,#build,.sc-top .btn,.no-print{display:none !important;}
    body,html{background:#fff !important;}
    .sheet{box-shadow:none;border:0;padding:0;margin:0;}
    .sec,.sec-tight{padding-top:0 !important;}
    #scorecard h2{font-size:28px;}
  }
`

export default async function ScorecardPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const { role, chosen, tooMany } = read(sp)
  const ids = chosen.map((c) => c.id)
  const share = scorecardUrl(role, chosen)
  const full = chosen.length >= MAX
  const m = data.method

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + captureCss + css }} />
      <SiteNav active="hiring" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-hiring-teams">For hiring teams</a> / Interview scorecard
          </p>
          <h1 className="display">What should we ask in the interview?</h1>
          <p className="dek">
            Pick the skills the job needs. You get the same questions for every candidate, the follow-up probes, and a 1 to 5 scale
            with benchmarks, built on the US Office of Personnel Management&rsquo;s structured interview method. Print it, or send it to
            your panel.
          </p>
          <p className="dateline">Free, no sign-up. Every definition is OPM&rsquo;s own wording.</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="build" aria-label="Build your scorecard">
        <AutoForm action={PATH} multi={['c']} limits={{ c: MAX }} className="sc-build">
          <fieldset className="sc-q">
            <legend>What&rsquo;s the role?</legend>
            <label className="sr-only" htmlFor="sc-role">
              Role title
            </label>
            <input id="sc-role" className="sc-role" type="text" name="role" maxLength={80} placeholder="For example, Account Executive" defaultValue={role} />
          </fieldset>
          <fieldset className="sc-q">
            <legend>Which skills does the job need?</legend>
            <p className="sc-hint">
              {m.competencyCount} Pick up to {MAX}.{chosen.length > 0 ? ` ${chosen.length} of ${MAX} chosen.` : ''}
              {full ? ' To swap one, untick it first.' : ''}
              {tooMany ? ` Only the first ${MAX} are used.` : ''}
            </p>
            <div className="sc-list">
              {data.competencies.map((c) => (
                <label className={`sc-opt${full && !ids.includes(c.id) ? ' sc-off' : ''}`} key={c.id}>
                  <input type="checkbox" name="c" value={c.id} defaultChecked={ids.includes(c.id)} disabled={full && !ids.includes(c.id)} />
                  <span>
                    <b>{c.name}</b>
                    {c.definition.split(';')[0].replace(/\.$/, '')}.
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="sc-submit">
            <button className="btn" type="submit">
              Build the scorecard
            </button>
          </div>
        </AutoForm>
      </section>

      <section className="wrap sec" id="scorecard" aria-label="Your scorecard">
        {chosen.length === 0 ? (
          <p className="sc-empty">Pick at least one skill above and your scorecard appears here.</p>
        ) : (
          <>
            <div className="sc-top">
              <h2>{role ? `${role}: interview scorecard` : 'Your interview scorecard'}</h2>
              <PrintButton label="Print the scorecard" />
            </div>
            <div className="sheet">
              <div className="sheet-head">
                <div>
                  <span>Candidate</span>
                  <i />
                </div>
                <div>
                  <span>Interviewer</span>
                  <i />
                </div>
                <div>
                  <span>Date</span>
                  <i />
                </div>
              </div>
              <ul className="sheet-rules">
                {m.standard.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              {chosen.map((c, i) => (
                <div className="comp" key={c.id}>
                  <h3>
                    {i + 1}. {c.name}
                  </h3>
                  <p className="comp-def">{c.definition}</p>
                  <p className="comp-ask">
                    <b>Ask:</b>
                    {c.question}
                  </p>
                  <div className="probes">
                    {m.probes.map((p) => (
                      <div key={p.kind}>
                        <b>{p.kind} probes</b>
                        {p.items.join(' ')}
                      </div>
                    ))}
                  </div>
                  <div className="scale" aria-label="Rating scale">
                    <div>
                      <b>1 Low</b>
                      {c.low}
                    </div>
                    <div>
                      <b>2</b>
                    </div>
                    <div>
                      <b>3 Average</b>
                      {c.average}
                    </div>
                    <div>
                      <b>4</b>
                    </div>
                    <div>
                      <b>5 Outstanding</b>
                      {c.outstanding}
                    </div>
                  </div>
                  <div className="notes">
                    <div>
                      <span>Notes on the answer</span>
                      <i />
                    </div>
                    <div>
                      <span>Rating</span>
                      <div className="rate">
                        <em>1</em>
                        <em>2</em>
                        <em>3</em>
                        <em>4</em>
                        <em>5</em>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="final">
                <div>
                  <h3>Before anyone discusses a candidate</h3>
                  <ul>
                    {m.rating.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Rating errors to avoid</h3>
                  <ul>
                    {m.avoid.map((a) => (
                      <li key={a.name}>
                        <b>{a.name}.</b> {a.what}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="sheet-src">
                Definitions:{' '}
                <a href={data.sources.competencies.url} rel="nofollow noopener" target="_blank">
                  {data.sources.competencies.name}
                </a>
                . Method, probes and rating errors:{' '}
                <a href={data.sources.guide.url} rel="nofollow noopener" target="_blank">
                  {data.sources.guide.name}
                </a>
                . The benchmarks follow the pattern of{' '}
                <a href={data.sources.example.url} rel="nofollow noopener" target="_blank">
                  OPM&rsquo;s worked example
                </a>
                , where the level is set by how demanding a situation the candidate handled. They are a starting point: OPM&rsquo;s method has the
                people who know the job review and adjust them before the first interview.
              </p>
            </div>
          </>
        )}
      </section>

      {chosen.length > 0 && (
        <section className="wrap sec-tight no-print" id="keep">
          <Capture
            source="scorecard"
            audience="hiring"
            promise="Email me this scorecard as a PDF to print and an Excel sheet to score candidates side by side."
            cta="Email me the scorecard"
            done="Sent. The PDF and the Excel sheet are in your inbox."
            extras={{ role, ids: ids.join(','), url: share, competencies: chosen.map((c) => c.name).join(', ') }}
            askCompanySize
          />
        </section>
      )}

      <section className="wrap sec no-print" id="why">
        <h2>Why structure</h2>
        <p className="lead">{m.why}</p>
        <div className="rows">
          <div className="row">
            <span className="row-title">How to use the probes</span>
            <ul className="sc-rules">
              {m.probeRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap sec no-print" id="repvera">
        <aside className="ours" aria-label={REPVERA_NOTE_LABEL}>
          <span className="ours-k">{REPVERA_NOTE_LABEL}</span>
          <p>{REPVERA_WHAT}</p>
          <a className="tl tl-strong" href={repveraLink('interview-scorecard')} rel="noopener">
            See how RepVera works <span className="arr">&#8599;</span>
          </a>
        </aside>
      </section>

      <NextStep side="hiring" line="Want to know how someone works before the interview?" button="Show me how" href={"/what-should-i-use?side=hiring&problem=see-how-they-work"} />
      <SiteFooter />
    </>
  )
}
