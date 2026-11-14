import { Logo } from './logo'
import { keepLast } from '@/lib/site-line'
import { PickerFeedback, TrackOnce } from './picker-track'
import { REPVERA_PROBLEM, REPVERA_QUESTIONS, wholeList } from '@/lib/evidence/guided'
import { Capture } from './capture'
import { captureCss } from './widgets-css'
import { RecForm, CopyLink } from './rec-form'
import { recFramework as data, problemsFor, situations, askToQuery, situationFor, verdictTitle, type Ask, type AskState, type Recommendation } from '@/lib/evidence/recommend'

/**
 * "What should I use?": the questions and the answer. Built to the site's
 * rules: one focal point per section (the answer), one button per moment,
 * color only for a side (indigo for job seekers, coral for hiring teams),
 * rows on a ruled board, never a card grid or a stepper.
 */

export const REC_PATH = '/what-should-i-use'
const SITE = 'https://hiring.productions'

const money = (n: number) => (n % 1 === 0 ? `$${n.toLocaleString('en-US')}` : `$${n.toFixed(2)}`)

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

function limitLabel(side: 'seekers' | 'hiring', id: string, value: number | null): string {
  return data[side].limits.find((l) => l.id === id)?.options.find((o) => o.value === value)?.label ?? ''
}

/** A plain-language line of what the visitor told us. */
export function askSummary(ask: Ask): string {
  const p = problemsFor(ask.side).find((x) => x.id === ask.problem)!
  if (p.kind !== 'tool') return p.label
  const must = ask.must.map((m) => data[ask.side].mustHaves.find((x) => x.id === m)?.label.toLowerCase()).filter(Boolean)
  const parts =
    ask.side === 'seekers'
      ? [p.label, `looking for ${limitLabel('seekers', 'months', ask.months).toLowerCase()}`, `budget: ${limitLabel('seekers', 'budget', ask.budget).toLowerCase()}`]
      : [
          p.label,
          `${limitLabel('hiring', 'hires', ask.hiresPerYear).toLowerCase()} hires a year`,
          `${limitLabel('hiring', 'employees', ask.employees).toLowerCase()} employees`,
          `${limitLabel('hiring', 'seats', ask.seats).toLowerCase()} using it`,
          `budget: ${limitLabel('hiring', 'budget', ask.budget).toLowerCase()}`,
        ]
  return [...parts, ...must.map((m) => `must have ${m}`)].join(' · ')
}

// ---------------------------------------------------------------- questions

function Radio({ name, value, checked, children, className }: { name: string; value: string; checked: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={`opt${className ? ` ${className}` : ''}`}>
      <input type="radio" name={name} value={value} defaultChecked={checked} />
      <span>{children}</span>
    </label>
  )
}

/**
 * The picker form. With only="side" it shows just the side choice (the guided
 * questions take over below it). `from` keeps the guided step a visitor came
 * from, so "Back" can return to it after they change a limit.
 */
export function RecQuestions({ state, only, from, repveraProblem }: { state: AskState; only?: 'side'; from?: string; repveraProblem?: string }) {
  const side = state.side
  const problem = state.problem
  const problemId = problem?.id ?? repveraProblem
  const v = (x: number | null) => (x === null ? 'any' : String(x))
  return (
    <RecForm action={REC_PATH}>
      <fieldset className="rec-q rec-sides">
        <legend>Are you looking for a job, or hiring?</legend>
        <div className="rec-side-opts">
          <Radio name="side" value="seekers" checked={side === 'seekers'} className="opt-side opt-seekers">
            <b>I&rsquo;m a job seeker</b>
            Resumes, job trackers, interview practice
          </Radio>
          <Radio name="side" value="hiring" checked={side === 'hiring'} className="opt-side opt-hiring">
            <b>I&rsquo;m hiring</b>
            Applicant tracking, finding candidates, interviews
          </Radio>
        </div>
      </fieldset>

      {side && only !== 'side' && (
        <fieldset className="rec-q">
          <legend>{data[side].title}</legend>
          <div className="rec-rows">
            {wholeList(side).map((p) => (
              <Radio key={p.id} name="problem" value={p.id} checked={problemId === p.id} className="opt-row">
                {p.label}
              </Radio>
            ))}
          </div>
        </fieldset>
      )}
      {from && <input type="hidden" name="from" value={from} />}

      {side && only !== 'side' && problem?.kind === 'tool' && (
        <fieldset className="rec-q">
          <legend>{side === 'seekers' ? 'What’s your budget and timeline?' : 'Tell us about your team'}</legend>
          <div className="rec-limits">
            {data[side].limits.map((l) => {
              const current = l.id === 'months' ? state.months : l.id === 'hires' ? state.hires : l.id === 'employees' ? state.employees : l.id === 'seats' ? state.seats : state.budget
              return (
                <div className="rec-limit" role="radiogroup" aria-labelledby={`lim-${l.id}`} key={l.id}>
                  <span className="rec-limit-k" id={`lim-${l.id}`}>
                    {l.label}
                  </span>
                  <span className="rec-words">
                    {l.options.map((o) => (
                      <Radio key={String(o.value)} name={l.id} value={v(o.value)} checked={current !== undefined && current === o.value} className="opt-word">
                        {o.label}
                      </Radio>
                    ))}
                  </span>
                </div>
              )
            })}
            <div className="rec-limit">
              <span className="rec-limit-k">Any must-haves?</span>
              <span className="rec-words">
                {data[side].mustHaves.map((m) => (
                  <label className="opt opt-word opt-check" key={m.id}>
                    <input type="checkbox" name="must" value={m.id} defaultChecked={state.must.includes(m.id)} />
                    <span>{m.label}</span>
                  </label>
                ))}
              </span>
            </div>
          </div>
        </fieldset>
      )}

      <div className="rec-submit">
        <button className="btn" type="submit">
          {!side ? 'Next' : !problem ? 'Next' : 'Show my answer'}
        </button>
      </div>
    </RecForm>
  )
}

// ---------------------------------------------------------------- answer

function monthsText(m: number) {
  return m === 12 ? 'a year' : m === 1 ? '1 month' : `${m} months`
}

function CostLine({ r, ask }: { r: Recommendation; ask: Ask }) {
  const c = r.pick?.cost
  if (!r.pick) return null
  if (!c) return <p className="rec-cost">Price by quote. Ask for it in writing before you book a demo.</p>
  const span = ask.side === 'seekers' ? `for ${monthsText(ask.months)}` : 'a year'
  const forget = (total: number, f: number | null) =>
    f && f > total + 0.005 ? (
      <>
        {' '}
        If you forget to cancel, the first year costs <strong>{money(f)}</strong>.
      </>
    ) : null
  if (c.total === 0)
    return (
      <p className="rec-cost">
        <span>What you&rsquo;ll pay</span>
        <b>Free</b>
        {c.upgrade && (
          <em>
            If you upgrade: {money(c.upgrade.total)} {span}.{forget(c.upgrade.total, c.upgrade.ifYouForget)}
          </em>
        )}
      </p>
    )
  return (
    <p className="rec-cost">
      <span>What you&rsquo;ll pay</span>
      <b>
        {money(c.total)} {span}
      </b>
      <em>
        {c.how}.{forget(c.total, c.ifYouForget)}
      </em>
    </p>
  )
}

export function RecAnswer({ r, ask, headingLevel = 2, editHref }: { r: Recommendation; ask: Ask; headingLevel?: 2 | 3; editHref?: string }) {
  const { title, lead } = verdictTitle(r)
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const other = r.side === 'seekers' ? 'hiring' : 'seekers'
  const otherLabel = r.side === 'seekers' ? 'What the hiring side sees' : 'What candidates see'
  const btn = r.side === 'seekers' ? 'btn btn-indigo' : 'btn btn-coral'
  const sit = situationFor(ask)
  const url = sit ? `${SITE}${REC_PATH}/${sit.slug}` : `${SITE}${REC_PATH}?${askToQuery(ask)}`
  const others = r.ruledOut.length + r.couldNotCheck.length

  return (
    <div className={`rec-ans rec-${r.side}`}>
      <p className="dateline">
        Your answer, checked {shortDate(r.checked)}. For: {askSummary(ask)}
      </p>
      <H className="rec-title" id="answer-h">
        {title}
      </H>
      {lead && <p className="rec-lead">{lead}</p>}

      {r.pick && (
        <div className="rec-pick">
          <div className="rec-id">
            <Logo domain={r.pick.domain} name={r.pick.name} size={64} />
            <div>
              <b>{r.pick.name}</b>
              <span className="rec-score">
                <span className="rec-bar" aria-hidden="true">
                  <i style={{ width: `${(r.pick.score / 5) * 100}%` }} />
                </span>
                {r.pick.score.toFixed(2)} out of 5
              </span>
            </div>
          </div>
          {(() => {
            const why = r.pick.reasons.slice(1).filter((x) => !/^Free:|^If you upgrade|^Costs |^If you forget|^About \$|^Starts free|^Price by quote/.test(x))
            return why.length > 0 ? (
              <ul className="rec-why">
                {why.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : null
          })()}
          <CostLine r={r} ask={ask} />
          <a className={btn} href={r.pick.href}>
            {r.pick.linkText} <span className="arr">&rarr;</span>
          </a>
        </div>
      )}

      {r.alt && (
        <div className="rec-alt">
          <span className="rec-alt-k">Backup pick</span>
          <div className="rec-alt-body">
            <Logo domain={r.alt.domain} name={r.alt.name} size={44} />
            <div>
              <b>
                {r.alt.name} <span className="mono">{r.alt.score.toFixed(2)}</span>
              </b>
              <p>
                {[
                  r.alt.why,
                  ...r.alt.reasons
                    .slice(1)
                    .filter((x) => !/^If you upgrade|^If you forget|^There’s also|^Free: /.test(x)),
                ].join(' ')}
              </p>
              <a className="tl" href={r.alt.href}>
                {r.alt.linkText} <span className="arr">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {r.verdict === 'nothing-fits' && (
        <p className="rec-near">
          {editHref ? (
            <>
              <a className="tl" href={editHref}>
                Change the details
              </a>{' '}
              and the answer changes.
            </>
          ) : (
            'Loosen one limit above and the answer changes.'
          )}{' '}
          {r.side === 'hiring' && r.guidance ? 'Or skip the shopping:' : ''}
        </p>
      )}

      {r.watching.length > 0 && (
        <div className="rec-watch">
          <span className="rec-alt-k">New and worth watching (too new to rate)</span>
          {r.watching.map((w) => (
            <div className="rec-watch-row" key={w.name}>
              <Logo domain={w.domain} name={w.name} size={40} />
              <p>
                <b>{w.name}.</b> {w.what}
              </p>
            </div>
          ))}
        </div>
      )}

      {r.stephanie && (
        <div className="rec-watch">
          <span className="rec-alt-k">Stephanie&rsquo;s pick (her opinion, with no effect on any score)</span>
          <div className="rec-watch-row">
            <Logo domain={r.stephanie.domain} name={r.stephanie.name} size={40} />
            <p>
              <b>{r.stephanie.name}.</b> {r.stephanie.line}{' '}
              <a className="tl" href="/about/stephanie">
                Who is Stephanie?
              </a>
            </p>
          </div>
        </div>
      )}

      {r.guidance && !r.pick && (
        <p className="rec-guide">
          <a className={btn} href={r.guidance.href}>
            {r.guidance.text} <span className="arr">&rarr;</span>
          </a>
        </p>
      )}

      <aside className={`rec-other rec-other-${other}`} aria-label={otherLabel}>
        <span className="rec-other-k">{otherLabel}</span>
        <p>{r.otherSide.line}</p>
        <a className="rec-src" href={r.otherSide.url} rel="nofollow noopener" target="_blank">
          Source: {r.otherSide.source}
        </a>
      </aside>

      {others > 0 && (
        <details className="rec-more">
          <summary>
            Why not the others? {r.ruledOut.length > 0 && <span>{r.ruledOut.length} didn&rsquo;t fit</span>}
            {r.couldNotCheck.length > 0 && <span>{r.couldNotCheck.length} we couldn&rsquo;t check</span>}
          </summary>
          {r.ruledOut.length > 0 && (
            <ul className="rec-out">
              {r.ruledOut.map((o) => (
                <li key={o.name}>
                  <b>{o.name}</b> {o.reasons.join(' ')}
                </li>
              ))}
            </ul>
          )}
          {r.couldNotCheck.length > 0 && (
            <>
              <p className="rec-out-k">Couldn&rsquo;t confirm, so we won&rsquo;t recommend it</p>
              <ul className="rec-out">
                {r.couldNotCheck.map((o) => (
                  <li key={o.name}>
                    <b>{o.name}</b> {o.reasons.join(' ')}
                  </li>
                ))}
              </ul>
            </>
          )}
        </details>
      )}

      <p className="rec-fine">Nobody pays to be featured.</p>

      <p className="rec-share">
        <CopyLink url={url} title={title} />
      </p>

      <div className="rec-keep">
        <Capture
          source="recommender"
          audience={r.side === 'seekers' ? 'candidate' : 'hiring'}
          promise="Get this answer by email. If a price or rating changes it, we’ll tell you once."
          cta="Email me this answer"
          done="Sent. If this answer ever changes, you'll hear from us once."
          extras={{ ask: askToQuery(ask), answer_title: title }}
          askCompanySize={r.side === 'hiring'}
        />
      </div>

      <TrackOnce event="picker_finish" side={r.side} problem={r.problem.id} />
      <PickerFeedback side={r.side} problem={r.problem.id} />
    </div>
  )
}

/** The common situations, each with its own permanent page. */
export function RecSituations({ exclude }: { exclude?: string }) {
  const list = situations().filter((s) => s.slug !== exclude)
  return (
    <div className="rec-sits">
      {(['seekers', 'hiring'] as const).map((side) => (
        <div key={side}>
          <span className={`rec-sits-k rec-sits-${side}`}>
            <span className={`pill pill-${side}`}>{side === 'seekers' ? 'Job seekers ask' : 'Hiring teams ask'}</span>
          </span>
          {list
            .filter((s) => s.ask.side === side)
            .map((s) => (
              <a className="rec-sit" href={`${REC_PATH}/${s.slug}`} key={s.slug}>
                {keepLast(s.question)} <span className="arr">&rarr;</span>
              </a>
            ))}
          <a className="rec-sit" href={`${REC_PATH}?side=${side}&problem=${REPVERA_PROBLEM[side].id}#questions`}>
            {keepLast(REPVERA_QUESTIONS[side])} <span className="arr">&rarr;</span>
          </a>
        </div>
      ))}
    </div>
  )
}

export const recCss = captureCss + `
  .rec-keep{margin-top:40px;}
  /* Questions */
  .rec-form{display:grid;gap:clamp(40px,5vw,56px);}
  .rec-q{border:0;min-width:0;}
  .rec-q legend{font-weight:900;font-size:clamp(26px,3vw,34px);letter-spacing:-0.02em;line-height:1.15;color:var(--ink);margin-bottom:18px;padding:0;}
  .opt{position:relative;cursor:pointer;}
  .opt input{position:absolute;opacity:0;width:1px;height:1px;}
  .opt:has(input:focus-visible){outline:2px solid var(--indigo);outline-offset:3px;border-radius:6px;}

  .rec-side-opts{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .opt-side span{display:grid;gap:6px;padding:24px 26px;border-radius:var(--r-lg);font-size:16px;line-height:1.45;border:2px solid var(--rule-2);background:var(--surface);color:var(--ink-2);transition:background .15s ease,color .15s ease,border-color .15s ease;}
  .opt-side b{font-size:clamp(22px,2.4vw,28px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;color:var(--ink);}
  .opt-seekers:hover span{border-color:var(--indigo);}
  .opt-hiring:hover span{border-color:var(--coral);}
  .opt-seekers:has(input:checked) span{background:var(--indigo);border-color:var(--indigo);color:#fff;}
  .opt-seekers:has(input:checked) b{color:#fff;}
  .opt-hiring:has(input:checked) span{background:var(--coral);border-color:var(--coral);color:var(--coral-deep);}
  .opt-hiring:has(input:checked) b{color:var(--coral-deep);}

  .rec-rows{border-top:1px solid var(--rule);}
  .opt-row span{display:flex;align-items:center;gap:16px;padding:18px 4px;border-bottom:1px solid var(--rule);font-weight:800;font-size:clamp(18px,1.8vw,21px);line-height:1.3;color:var(--ink);}
  .opt-row span::before{content:"";flex-shrink:0;width:20px;height:20px;border-radius:50%;border:2px solid var(--rule-2);background:var(--surface);transition:border-color .15s ease,box-shadow .15s ease;}
  .opt-row:hover span::before{border-color:var(--ink-3);}
  .rec-seekers-q .opt-row:has(input:checked) span{color:var(--indigo-text);}
  .rec-seekers-q .opt-row:has(input:checked) span::before{border-color:var(--indigo);box-shadow:inset 0 0 0 4px var(--surface),inset 0 0 0 10px var(--indigo);}
  .rec-hiring-q .opt-row:has(input:checked) span{color:var(--coral-text);}
  .rec-hiring-q .opt-row:has(input:checked) span::before{border-color:var(--coral);box-shadow:inset 0 0 0 4px var(--surface),inset 0 0 0 10px var(--coral);}

  .rec-limits{border-top:1px solid var(--rule);}
  .rec-limit{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:24px;padding:20px 0;border-bottom:1px solid var(--rule);align-items:baseline;}
  .rec-limit-k{font-weight:800;font-size:18px;line-height:1.35;color:var(--ink);}
  .rec-words{display:flex;flex-wrap:wrap;gap:6px 22px;}
  .opt-word span{display:inline-block;font-size:17px;font-weight:600;color:var(--ink-2);padding:4px 0;border-bottom:2px solid transparent;transition:color .15s ease,border-color .15s ease;}
  .opt-word:hover span{color:var(--ink);border-bottom-color:var(--rule-2);}
  .rec-seekers-q .opt-word:has(input:checked) span{color:var(--indigo-text);font-weight:800;border-bottom-color:var(--indigo);}
  .rec-hiring-q .opt-word:has(input:checked) span{color:var(--coral-text);font-weight:800;border-bottom-color:var(--coral);}
  .opt-check span::before{content:"";display:inline-block;width:14px;height:14px;border:2px solid var(--rule-2);border-radius:3px;margin-right:8px;vertical-align:-2px;}
  .rec-seekers-q .opt-check:has(input:checked) span::before{background:var(--indigo);border-color:var(--indigo);}
  .rec-hiring-q .opt-check:has(input:checked) span::before{background:var(--coral);border-color:var(--coral);}
  .rec-form[data-js] .rec-submit{display:none;}
  body:has(.rec-form[data-pending]) .rec-answer-wrap{opacity:.55;transition:opacity .2s ease;}

  /* The answer */
  .rec-answer-wrap{scroll-margin-top:24px;}
  .rec-ans{border-top:3px solid var(--ink);padding-top:28px;}
  .rec-seekers{border-top-color:var(--indigo);}
  .rec-hiring{border-top-color:var(--coral);}
  .rec-title{font-weight:900;font-size:clamp(40px,6vw,64px);line-height:1.04;letter-spacing:-0.025em;margin:14px 0 14px;}
  .rec-lead{font-size:clamp(19px,1.8vw,22px);line-height:1.5;color:var(--ink-2);max-width:780px;}

  .rec-pick{margin-top:36px;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:clamp(24px,3.5vw,36px);display:grid;gap:22px;max-width:820px;box-shadow:var(--shadow);}
  .rec-id{display:flex;align-items:center;gap:18px;}
  .rec-id b{display:block;font-size:clamp(26px,3vw,34px);font-weight:900;letter-spacing:-0.02em;line-height:1.1;}
  .rec-score{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:14px;color:var(--ink-2);margin-top:6px;}
  .rec-bar{display:inline-block;width:120px;height:8px;border-radius:4px;background:var(--rule-soft);overflow:hidden;}
  .rec-bar i{display:block;height:100%;border-radius:4px;background:var(--ink);}
  .rec-seekers .rec-bar i{background:var(--indigo);}
  .rec-hiring .rec-bar i{background:var(--coral);}
  .rec-why{list-style:none;display:grid;gap:8px;}
  .rec-why li{color:var(--ink-2);padding-left:22px;position:relative;}
  .rec-why li::before{content:"";position:absolute;left:2px;top:.62em;width:8px;height:8px;border-radius:50%;background:var(--ink-3);}
  .rec-cost{display:grid;gap:2px;padding-top:18px;border-top:1px solid var(--rule-soft);}
  .rec-cost span{font-size:14px;font-weight:700;color:var(--ink-3);}
  .rec-cost b{font-size:30px;font-weight:900;letter-spacing:-0.02em;color:var(--ink);font-variant-numeric:tabular-nums;}
  .rec-cost em{font-style:normal;color:var(--ink-2);font-size:15.5px;}
  .rec-cost strong{color:var(--coral-text);}
  .rec-pick .btn{justify-self:start;}

  .rec-alt,.rec-watch{margin-top:32px;max-width:820px;border-top:1px solid var(--rule);padding-top:20px;display:grid;gap:14px;}
  .rec-alt-k{font-size:14px;font-weight:800;color:var(--ink-3);}
  .rec-alt-body,.rec-watch-row{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:start;}
  .rec-alt-body b{font-size:21px;font-weight:800;}
  .rec-alt-body b .mono{font-weight:600;color:var(--ink-3);margin-left:6px;}
  .rec-alt-body p,.rec-watch-row p{color:var(--ink-2);margin-top:4px;}
  .rec-watch-row b{color:var(--ink);}
  .rec-near{margin-top:28px;font-size:18px;color:var(--ink-2);max-width:780px;}
  .rec-guide{margin-top:28px;}

  .rec-other{margin-top:48px;max-width:820px;border-left:4px solid var(--ink);padding:4px 0 4px 24px;}
  .rec-other-hiring{border-left-color:var(--coral);}
  .rec-other-seekers{border-left-color:var(--indigo);}
  .rec-other-k{display:block;font-size:15px;font-weight:800;}
  .rec-other-hiring .rec-other-k{color:var(--coral-text);}
  .rec-other-seekers .rec-other-k{color:var(--indigo-text);}
  .rec-other p{font-size:clamp(19px,1.9vw,23px);line-height:1.5;color:var(--ink);font-weight:600;margin-top:8px;}
  .rec-src{display:inline-block;margin-top:10px;font-size:14px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .rec-src:hover{color:var(--ink);}

  .rec-more{margin-top:40px;max-width:820px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);}
  .rec-more summary{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 16px;padding:18px 0;font-weight:800;font-size:18px;color:var(--ink);}
  .rec-more summary span{font-weight:600;font-size:15px;color:var(--ink-3);}
  .rec-more summary::after{content:"+";margin-left:auto;font-weight:400;font-size:24px;line-height:1;color:var(--ink-3);}
  .rec-more[open] summary::after{content:"\\2212";}
  .rec-out{list-style:none;display:grid;gap:12px;padding-bottom:20px;}
  .rec-out li{color:var(--ink-2);font-size:15.5px;}
  .rec-out li b{color:var(--ink);margin-right:6px;}
  .rec-out-k{font-size:14px;font-weight:800;color:var(--ink-3);margin:4px 0 10px;}

  .rec-share{margin-top:28px;min-height:28px;}
  .rec-copy{font:inherit;font-size:15px;font-weight:800;color:var(--ink);background:transparent;border:0;border-bottom:2px solid var(--rule-2);padding:4px 0;cursor:pointer;}
  .rec-copy:hover{border-bottom-color:var(--ink);}
  .rec-copy .arr{margin-left:4px;}

  /* Common questions */
  .rec-sits{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,56px);margin-top:28px;}
  .rec-sits-k{display:flex;align-items:center;font-weight:800;font-size:16px;padding-bottom:12px;border-bottom:1px solid var(--rule);}
  .rec-sit{display:flex;justify-content:space-between;gap:16px;padding:16px 0;border-bottom:1px solid var(--rule);font-weight:700;font-size:17px;line-height:1.4;color:var(--ink);}
  .rec-sit:hover{color:var(--indigo-text);}
  .rec-sit .arr{color:var(--ink-3);}

  /* Monthly re-check signup */
  .rec-signup{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:end;border-top:1px solid var(--ink);padding-top:40px;}

  /* How an answer is made */
  .rec-rules{border-top:1px solid var(--rule);margin-top:28px;}
  .rec-rule{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:24px;padding:22px 0;border-bottom:1px solid var(--rule);}
  .rec-rule b{font-weight:800;font-size:20px;line-height:1.3;color:var(--ink);}
  .rec-rule p{color:var(--ink-2);}
  .rec-rule a{display:inline-block;margin-top:6px;font-size:14px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}

  @media (prefers-reduced-motion: reduce){.opt-side span,.opt-row span::before,.opt-word span{transition:none;}}
  @media(max-width:760px){
    .rec-side-opts{grid-template-columns:1fr;gap:10px;}
    .opt-side span{padding:18px 20px;}
    .rec-limit{grid-template-columns:1fr;gap:10px;}
    .rec-sits{grid-template-columns:1fr;}
    .rec-signup,.rec-rule{grid-template-columns:1fr;gap:8px;}
    .rec-bar{width:80px;}
  }
`

/** The rules and the research, in rows. The full list is on How we review. */
/** The rules only. The research behind them lives on How we review (#recommend), not on the tool's own pages. */
export function RecHow({ all = false }: { all?: boolean }) {
  const rules = all ? data.rules : [0, 1, 2, 3, 4, 9].map((i) => data.rules[i])
  const split = (r: string) => {
    const i = r.indexOf('. ')
    return i === -1 ? [r, ''] : [r.slice(0, i + 1), r.slice(i + 2)]
  }
  return (
    <div className="rec-rules">
      {rules.map((r) => {
        const [k, rest] = split(r)
        return (
          <div className="rec-rule" key={k}>
            <b>{k}</b>
            <p>{rest}</p>
          </div>
        )
      })}
    </div>
  )
}
