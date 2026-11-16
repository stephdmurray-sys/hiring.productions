import Image from 'next/image'
import { Logo } from './logo'
import { quotes, type RepveraQuote } from '@/lib/repvera-quotes'
import { keepLast } from '@/lib/site-line'
import { PickerFeedback, PickerSuggest, TrackOnce, TrackedLink } from './picker-track'
import { CopyLink } from './rec-form'
import { Capture } from './capture'
import { ASK_FOR_IT, GUIDED, HIRING_READ, PROOF, REPVERA_ANSWER, REPVERA_PROBLEM, guidedStep, isStep, wholeList, type GuidedTarget, type Side } from '@/lib/evidence/guided'
import { PORTFOLIO_PICKS } from '@/lib/evidence/shortlists'
import { Kit } from './recommender'
import { Dots, Zigzag } from './retro'
import { ShortToolRow } from './short-list'
import { KnowList } from './know-list'
import { SEE_HOW } from '@/lib/evidence/tools-to-know'
import { RepveraFill } from './repvera-fill'
import { REPVERA_EXAMPLE } from '@/lib/repvera-example'

/**
 * The guided picker screens (lib/evidence/guided.ts holds the copy). Every
 * answer card is a plain link, so a tap moves forward with or without
 * scripts, and every screen has its own address. Each screen has "Back" and
 * "Show me the whole list".
 */

const REC = '/what-should-i-use'

const stepHref = (side: Side, step: string) => `${REC}?side=${side}&g=${step}#questions`
const problemHref = (side: Side, problem: string, from?: string) => `${REC}?side=${side}&problem=${problem}${from ? `&from=${from}` : ''}#questions`
const targetHref = (side: Side, to: GuidedTarget, from: string) =>
  'step' in to ? stepHref(side, to.step) : 'href' in to ? to.href : problemHref(side, to.problem, from)

function Progress({ side, at }: { side: Side; at: number }) {
  const total = GUIDED[side].depth
  return (
    <p className="g-progress" aria-label={`Question ${at} of up to ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <i key={i} className={i < at ? 'on' : undefined} aria-hidden="true" />
      ))}
    </p>
  )
}

function Links({ side, back }: { side: Side; back: string | null }) {
  return (
    <p className="g-links">
      <a href={back ? stepHref(side, back) : `${REC}#questions`}>&larr; Back</a>
      <a href={stepHref(side, 'all')}>Show me the whole list</a>
    </p>
  )
}

/** Once a side is chosen, the big side cards shrink to one line, so the question is the first thing on screen. */
export function SideSwitch({ side }: { side: Side }) {
  const other: Side = side === 'seekers' ? 'hiring' : 'seekers'
  return (
    <p className="g-side">
      <span className={`pill pill-${side}`}>{side === 'seekers' ? 'I\u2019m a job seeker' : 'I\u2019m hiring'}</span>
      <a href={`${REC}?side=${other}#questions`}>{other === 'hiring' ? 'Switch to hiring' : 'Switch to job seeker'}</a>
    </p>
  )
}

export function GuidedStepView({ side, stepId, back }: { side: Side; stepId?: string; back?: string }) {
  if (stepId === 'all') return <WholeList side={side} />
  const step = guidedStep(side, stepId)
  return (
    <div className={`g g-${side}`}>
      {step.depth === 1 && <TrackOnce event="picker_start" side={side} />}
      <Progress side={side} at={step.depth} />
      <h2 className="g-q">{keepLast(step.question)}</h2>
      <div className="g-cards">
        {step.options.map((o) => (
          <a className="g-card" href={targetHref(side, o.to, step.id)} key={o.label}>
            <span>{keepLast(o.label)}</span>
            <span className="arr" aria-hidden="true">
              &rarr;
            </span>
          </a>
        ))}
      </div>
      {step.extra && (
        <p className="g-extra">
          <a href={targetHref(side, step.extra.to, step.id)}>{keepLast(step.extra.label)}</a>
        </p>
      )}
      <Links side={side} back={back ?? step.back} />
    </div>
  )
}

/** The first guided question, for the homepage: one tap starts the picker. */
export function GuidedFirst({ side }: { side: Side }) {
  const step = guidedStep(side, 'q1')
  // One grid row per piece (label, question, each card, links, suggestion), shared with the other side
  // through subgrid, so the two sides line up row for row (.g-start in guidedCss). The free tools have
  // their own band below (free-tools.tsx).
  const rows = 2 + step.options.length + 1
  return (
    <div className={`g-first g-${side}`} style={{ gridRow: `span ${rows}` }}>
      <span className={`pill pill-${side}`}>{side === 'seekers' ? 'I\u2019m a job seeker' : 'I\u2019m hiring'}</span>
      <h3 className="g-first-q">{keepLast(step.question)}</h3>
      {step.options.map((o) => (
        <a className="g-card" href={targetHref(side, o.to, step.id)} key={o.label}>
          <span>{keepLast(o.label)}</span>
          <span className="arr" aria-hidden="true">
            &rarr;
          </span>
        </a>
      ))}
      {/* One row of quiet links under the cards; the suggestion box opens full width beneath them. */}
      <div className="g-first-links">
        {step.extra && <a href={targetHref(side, step.extra.to, step.id)}>{keepLast(step.extra.label)}</a>}
        <a href={stepHref(side, 'all')}>
          Show me the whole list <span className="arr">&rarr;</span>
        </a>
        <PickerSuggest side={side} />
      </div>
    </div>
  )
}

function WholeList({ side }: { side: Side }) {
  return (
    <div className={`g g-${side}`}>
      <h2 className="g-q">{keepLast(side === 'seekers' ? 'What’s breaking your search?' : 'Where is hiring going wrong?')}</h2>
      <div className="g-cards g-cards-list">
        {wholeList(side).map((p) => (
          <a className="g-card" href={problemHref(side, p.id, 'all')} key={p.id}>
            <span>{keepLast(p.label)}</span>
            <span className="arr" aria-hidden="true">
              &rarr;
            </span>
          </a>
        ))}
      </div>
      <PickerSuggest side={side} />
      <p className="g-links">
        <a href={stepHref(side, 'q1')}>&larr; Back to the questions</a>
      </p>
    </div>
  )
}

/**
 * RepVera's answer for one side: no score, no rank, and always Stephanie's note. For job seekers it
 * is the proof answer: RepVera for proof from people, then portfolio sites for proof from the work,
 * then where to put the link.
 */
/** One quote about RepVera: the words, then who said it (photo, initials, or a quote mark when they asked for no name). */
function RvQuote({ q, big = false }: { q: RepveraQuote; big?: boolean }) {
  const initials = q.name ? q.name.split(' ').map((w) => w[0]).join('') : null
  return (
    <figure className={big ? 'rv-q rv-q-big' : 'rv-q'}>
      <blockquote>&ldquo;{q.text}&rdquo;</blockquote>
      <figcaption>
        <span className="rv-av" aria-hidden="true">
          {q.photo ? <Image src={q.photo} alt="" width={96} height={96} /> : initials ? initials : '\u201C'}
        </span>
        <span className="rv-who">
          {q.name && <b>{q.name}</b>}
          {q.title && <span>{q.title}</span>}
          {!q.name && !q.title && <span>A RepVera user</span>}
          {q.context && <span className="rv-ctx">{q.context}</span>}
          {q.pilot && <span className="rv-ctx">Part of RepVera&rsquo;s free pilot for hiring teams.</span>}
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * The hiring answer around a large profile (Stephanie, Nov 16, 2026: "the profile being larger",
 * and clear enough that hiring teams grab it). Her card copy stays word for word. Order: the card
 * with the full-width profile filling in, what to ask about in the interview (read off the profile),
 * when to ask candidates for it, then the quotes and the one button.
 */
function HiringRepvera({ a, side, btn, lead, said }: { a: (typeof REPVERA_ANSWER)['hiring']; side: Side; btn: string; lead: RepveraQuote[]; said: RepveraQuote[] }) {
  const trait = (name: string) => REPVERA_EXAMPLE.traits.find((t) => t.name === name)!
  const asks = [
    { ...HIRING_READ.confirmed, t: trait(HIRING_READ.confirmed.trait), cls: 'rv-ask-yes' },
    { ...HIRING_READ.open, t: trait(HIRING_READ.open.trait), cls: 'rv-ask-open' },
  ]
  return (
    <>
      <div className="rv-lane rv-lane-wide">
        <Dots className="rv-dots" />
        <Zigzag className="rv-zig" />
        <div className="rec-pick">
          <div className="rec-id">
            <Logo domain="repvera.com" name={a.name} size={64} />
            <div>
              <b>{a.name}</b>
              <span className="rv-built">{a.label}</span>
            </div>
          </div>
          <div className="rv-text rv-text-wide">
            {a.lines.map((l, n) => (
              <p className={n === 0 ? 'rv-line rv-line-big' : 'rv-line'} key={l.slice(0, 24)}>
                {l}
              </p>
            ))}
          </div>
          <h3 className="rv-prof-k">{HIRING_READ.profileK}</h3>
          <RepveraFill side="hiring" />
          <p className="rv-prof-src">
            {keepLast(`Stephanie’s own RepVera profile, as of ${REPVERA_EXAMPLE.asOf}.`)}{' '}
            <TrackedLink href={a.second.url} className="tl" event="repvera_profile_click" side={side} newTab>
              See the whole profile <span className="arr">&#8599;</span>
            </TrackedLink>
          </p>
        </div>
      </div>
      <Kit k={HIRING_READ.askK}>
        <p className="kit-know-note">{keepLast(HIRING_READ.askLead)}</p>
        <div className="rv-asks">
          {asks.map((x) => (
            <div className={`rv-ask ${x.cls}`} key={x.trait}>
              <span className="rv-ask-tag">{x.tag}</span>
              <p className="rv-ask-trait">
                <b>{x.t.name}</b>
                <span className="rfw-marks" aria-label={`${x.t.marks} of 3 marks`}>
                  {[1, 2, 3].map((m) => (
                    <i key={m} className={m <= x.t.marks ? 'rfw-mark-on' : ''} />
                  ))}
                </span>
              </p>
              <p className="rv-ask-detail">{x.t.marks ? x.t.detail : x.t.detail.split('. ')[0] + '.'}</p>
              <p className="rv-ask-do">{keepLast(x.ask)}</p>
            </div>
          ))}
        </div>
      </Kit>
      <Kit k={ASK_FOR_IT.k}>
        <p className="kit-know-note">{keepLast(ASK_FOR_IT.lead)}</p>
        <ol className="rv-steps">
          {ASK_FOR_IT.steps.map((step, i) => (
            <li key={step}>
              <span className="rv-step-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>{keepLast(step)}</span>
            </li>
          ))}
        </ol>
      </Kit>
      <div className="rv-lane rv-lane-end">
        <div className="rec-pick">
          {lead.map((q) => (
            <RvQuote q={q} key={q.id} big />
          ))}
          {said.length > 0 && (
            <>
              <h3 className="rv-qk">{a.quotesK}</h3>
              <div className={`rv-quotes rv-quotes-${said.length}`}>
                {said.map((q) => (
                  <RvQuote q={q} key={q.id} />
                ))}
              </div>
            </>
          )}
          <p className="rv-note">{a.note}</p>
          {a.cta.k && <h3 className="rv-cta-k">{a.cta.k}</h3>}
          {a.cta.text && <p className="rv-cta-text">{keepLast(a.cta.text)}</p>}
          <p className="rv-cta">
            <TrackedLink href={a.cta.url} className={btn} event={a.cta.event} side={side} newTab>
              {a.cta.button} <span className="arr">&#8599;</span>
            </TrackedLink>
          </p>
          {a.cta.under && <p className="rv-under">{a.cta.under}</p>}
          <p className="rv-second">
            <TrackedLink href={a.second.url} className="tl" event="repvera_profile_click" side={side} newTab>
              {a.second.text} <span className="arr">&#8599;</span>
            </TrackedLink>
          </p>
        </div>
      </div>
    </>
  )
}

export function RepveraAnswer({ side, from }: { side: Side; from?: string }) {
  const a = REPVERA_ANSWER[side]
  const seekers = side === 'seekers'
  const back = from === 'all' ? stepHref(side, 'all') : stepHref(side, isStep(side, from) ? from : a.back)
  const btn = side === 'seekers' ? 'btn btn-indigo' : 'btn btn-coral'
  const lead = a.leadQuote ? quotes([a.leadQuote]) : []
  const said = quotes(a.quoteIds)
  const after = quotes(a.afterIds ?? [])
  return (
    <div className={`rec-ans rec-${side} rv-ans`}>
      <TrackOnce event="repvera_answer_view" side={side} />
      <TrackOnce event="picker_finish" side={side} problem="repvera" />
      <h2 className="rec-title" id="answer-h">
        {a.heading}
      </h2>
      <p className="rec-lead">{keepLast(a.opening)}</p>
      {seekers ? (
        <>
        {seekers && <h3 className="kit-k rv-k">{PROOF.people}</h3>}
        <div className="rv-lane">
        <Dots className="rv-dots" />
        <Zigzag className="rv-zig" />
        <div className="rec-pick">
          <div className="rec-id">
            <Logo domain="repvera.com" name={a.name} size={64} />
            <div>
              <b>{a.name}</b>
              <span className="rv-built">{a.label}</span>
            </div>
          </div>
          <div className="rv-body">
            <div className="rv-text">
              {a.lines.map((l, n) => (
                <p className={n === 0 ? 'rv-line rv-line-big' : 'rv-line'} key={l.slice(0, 24)}>
                  {l}
                </p>
              ))}
            </div>
            <a className="rv-shot" href={a.second.url} rel="noopener" target="_blank">
              <Image
                src="/repvera/profile-overview.webp"
                alt="A real RepVera profile: the finding, who is behind the profile, the summary and the strongest patterns"
                width={656}
                height={740}
                sizes="(max-width: 760px) 90vw, 320px"
              />
              <span>A real profile: Stephanie&rsquo;s own</span>
            </a>
          </div>
          {lead.map((q) => (
            <RvQuote q={q} key={q.id} big />
          ))}
          {said.length > 0 && (
            <>
              <h3 className="rv-qk">{a.quotesK}</h3>
              <div className={`rv-quotes rv-quotes-${said.length}`}>
                {said.map((q) => (
                  <RvQuote q={q} key={q.id} />
                ))}
              </div>
            </>
          )}
          {after.length > 0 && a.afterK && (
            <>
              <h3 className="rv-qk">{a.afterK}</h3>
              {after.map((q) => (
                <RvQuote q={q} key={q.id} big />
              ))}
            </>
          )}
          <p className="rv-note">{a.note}</p>
          {a.cta.k && <h3 className="rv-cta-k">{a.cta.k}</h3>}
          {a.cta.text && <p className="rv-cta-text">{keepLast(a.cta.text)}</p>}
          <p className="rv-cta">
            <TrackedLink href={a.cta.url} className={btn} event={a.cta.event} side={side} newTab>
              {a.cta.button} <span className="arr">&#8599;</span>
            </TrackedLink>
          </p>
          {a.cta.under && <p className="rv-under">{a.cta.under}</p>}
          <p className="rv-second">
            <TrackedLink href={a.second.url} className="tl" event="repvera_profile_click" side={side} newTab>
              {a.second.text} <span className="arr">&#8599;</span>
            </TrackedLink>
          </p>
        </div>
        </div>
        </>
      ) : (
        <HiringRepvera a={a} side={side} btn={btn} lead={lead} said={said} />
      )}
      {seekers && (
        <Kit k={PROOF.work} id="work">
          <p className="rv-work-lead">{keepLast(PROOF.workLead)}</p>
          <p className="rv-work-rv">{keepLast(PROOF.repveraWork)}</p>
          <p className="rv-nowork">{keepLast(PROOF.noWork)}</p>
          <div className="sl-tools rv-work">
            {PORTFOLIO_PICKS.map((t) => (
              <ShortToolRow t={t} side={side} key={t.name} />
            ))}
          </div>
          <p className="rv-more">
            <a className="tl" href={PROOF.more.href}>
              {keepLast(PROOF.more.text)} <span className="arr">&rarr;</span>
            </a>
          </p>
        </Kit>
      )}
      {/* Other ways to see how someone works, beside RepVera (Stephanie, Nov 16, 2026: "ok add the tools"). */}
      {!seekers &&
        SEE_HOW.map((set) => (
          <Kit k={set.k} key={set.k}>
            {set.note && <p className="kit-know-note">{keepLast(set.note)}</p>}
            <KnowList tools={set.tools} side={side} />
          </Kit>
        ))}
      {seekers ? (
        <Kit k={PROOF.where.k}>
          <p className="kit-wont">{keepLast(PROOF.where.text)}</p>
          <p className="rv-more">
            <a className="tl" href={PROOF.email.href}>
              {keepLast(PROOF.email.text)} <span className="arr">&rarr;</span>
            </a>
          </p>
        </Kit>
      ) : null}
      <p className="rv-back">
        <a className="tl" href={back}>
          Go back and pick a different answer
        </a>
      </p>
      <p className="rec-fine">Nobody pays to be featured.</p>
      <PickerFeedback side={side} problem="repvera" />
      {!seekers && (
        <div className="rec-keep">
          <Capture
            source="hiring_proof"
            audience="hiring"
            promise="Get this answer by email, with when to ask candidates for it."
            cta="Email me this answer"
            done="Sent. Check your inbox."
            askCompanySize
          />
        </div>
      )}
      <p className="rec-share">
        <CopyLink url={`https://hiring.productions/what-should-i-use?side=${side}&problem=${REPVERA_PROBLEM[side].id}`} title={a.heading} />
      </p>
    </div>
  )
}

export const guidedCss = `
  .g{max-width:820px;margin-top:28px;}
  .g-side{display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;font-size:15px;font-weight:700;}
  .g-side a{color:var(--ink-2);text-decoration:underline;text-underline-offset:3px;}
  .g-side a:hover{color:var(--ink);}
  .g-progress{display:flex;gap:8px;margin:0 0 18px;}
  .g-progress i{width:12px;height:12px;border-radius:50%;border:2px solid var(--ink);background:transparent;}
  .g-seekers .g-progress i.on{background:var(--indigo);}
  .g-hiring .g-progress i.on{background:var(--coral);}
  .g-q{margin:0;text-wrap:balance;}
  /* The two sides of the homepage picker share every row (subgrid), so cards, links, the dashed line and the tiles sit level. */
  .g-start{display:grid;grid-template-columns:1fr 1fr;column-gap:clamp(28px,4vw,48px);row-gap:0;margin-top:36px;}
  .g-first{display:grid;grid-template-rows:subgrid;min-width:0;}
  .g-first > .pill{justify-self:start;align-self:start;}
  .g-first-q{font-size:clamp(24px,2.6vw,30px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;margin:16px 0 18px;align-self:start;}
  .g-first > .g-card{min-height:64px;padding:16px 20px;font-size:18px;margin-bottom:12px;}
  .g-first > .g-first-links{align-self:start;margin:10px 0 0;align-items:baseline;}
  .g-first-links .g-sug-open{margin-top:0;}
  .g-first-links .g-sug,.g-first-links .g-sug-done{flex-basis:100%;margin-top:6px;}
  .g-first > .g-free-k{margin:24px 0 12px;padding-top:20px;border-top:2px dashed var(--rule-2);align-self:end;}
  .g-tiles{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:subgrid;column-gap:12px;}
  .g-tile{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:62px;margin-bottom:12px;padding:12px 16px;background:#fff;color:var(--ink);border:2px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);font-size:16px;font-weight:800;line-height:1.25;text-wrap:pretty;transition:transform .12s ease,box-shadow .12s ease,background .12s ease;}
  .g-tile .arr{flex:none;font-size:18px;}
  .g-tile:hover,.g-tile:focus-visible{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--ink);}
  .g-seekers .g-tile:hover{background:var(--indigo-tint);}
  .g-hiring .g-tile:hover{background:var(--coral-tint);}
  .g-first > .g-sug-open,.g-first > .g-sug-done{justify-self:start;align-self:start;margin-top:6px;}
  .g-first > .g-sug{align-self:start;margin-top:6px;}
  @media(max-width:860px){.g-start{grid-template-columns:1fr;}.g-first.g-hiring > .pill{margin-top:56px;}}
  @media(max-width:420px){.g-tile{font-size:15px;padding:12px;}}
  @media (prefers-reduced-motion: reduce){.g-tile{transition:none;}.g-tile:hover{transform:none;}}
  .g-cards{display:grid;gap:14px;margin-top:28px;}
  .g-first-links{display:flex;flex-wrap:wrap;gap:8px 22px;margin:16px 0 0;font-size:15.5px;font-weight:700;}
  .g-first-links a{color:var(--ink-2);text-decoration:underline;text-underline-offset:3px;}
  .g-first-links a:hover{color:var(--ink);}
  .g-free{margin-top:24px;padding-top:20px;border-top:2px dashed var(--rule-2);}
  .g-free-k{font-size:14px;font-weight:900;color:var(--ink);margin:0 0 10px;}
  .g-chips{display:flex;flex-wrap:wrap;gap:10px;margin:0;}
  .g-chip{display:inline-flex;align-items:center;padding:8px 14px;border:2px solid var(--ink);border-radius:999px;background:#fff;color:var(--ink);font-size:14.5px;font-weight:800;line-height:1.2;box-shadow:2px 2px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease,background .12s ease;}
  .g-chip:hover,.g-chip:focus-visible{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink);}
  .g-seekers .g-chip:hover{background:var(--indigo-tint);}
  .g-hiring .g-chip:hover{background:var(--coral-tint);}
  .g-sug-open{margin-top:16px;padding:0;font:inherit;font-size:15px;font-weight:700;color:var(--ink-2);background:none;border:0;text-decoration:underline;text-underline-offset:3px;cursor:pointer;}
  .g-sug-open:hover{color:var(--ink);}
  .g-sug{display:grid;gap:8px;margin-top:16px;max-width:560px;}
  .g-sug label{font-size:15px;font-weight:900;color:var(--ink);}
  .g-sug-row{display:flex;gap:8px;}
  .g-sug input{flex:1;min-width:0;min-height:46px;padding:10px 14px;font:inherit;font-size:16px;border:2px solid var(--ink);border-radius:10px;background:#fff;color:var(--ink);}
  .g-sug button{min-height:46px;padding:0 18px;font:inherit;font-size:15.5px;font-weight:900;color:#fff;background:var(--ink);border:2px solid var(--ink);border-radius:10px;cursor:pointer;}
  .g-sug-done{margin-top:16px;font-size:15px;font-weight:800;color:var(--ink);}
  @media (prefers-reduced-motion: reduce){.g-chip{transition:none;}}
  .g-card{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:76px;padding:20px 24px;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:14px;box-shadow:5px 5px 0 var(--ink);font-size:clamp(18px,2vw,21px);font-weight:800;line-height:1.35;text-wrap:pretty;transition:transform .12s ease,box-shadow .12s ease,background .12s ease;}
  .g-card .arr{flex-shrink:0;font-size:22px;}
  .g-card:hover,.g-card:focus-visible{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--ink);}
  .g-seekers .g-card:hover{background:var(--indigo-tint);}
  .g-hiring .g-card:hover{background:var(--coral-tint);}
  .g-cards-list .g-card{min-height:64px;padding:16px 22px;font-size:18px;}
  .g-extra{margin-top:20px;font-size:16px;font-weight:700;}
  .g-extra a,.g-links a{color:var(--ink-2);text-decoration:underline;text-underline-offset:3px;}
  .g-extra a:hover,.g-links a:hover{color:var(--ink);}
  .g-links{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;margin-top:28px;font-size:15px;font-weight:700;}
  .g-links.g-links-top{margin:0 0 12px;}
  .rv-built{display:inline-block;margin-top:6px;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:800;background:var(--ink);color:#fff;}
  .rv-line{font-size:18px;line-height:1.6;color:var(--ink-2);margin-top:14px;text-wrap:pretty;}
  .rv-line:first-of-type{color:var(--ink);font-weight:700;}
  .rv-note{margin:18px 0 22px;padding:14px 16px;border-left:4px solid var(--ink);background:var(--surface);font-size:16px;line-height:1.55;color:var(--ink);text-wrap:pretty;}
  .rv-body{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:28px;align-items:start;margin-top:6px;}
  .rv-line-big{font-size:clamp(20px,2vw,24px) !important;font-weight:900;line-height:1.3;letter-spacing:-0.01em;color:var(--ink) !important;}
  .rv-shot{display:block;border:3px solid var(--ink);border-radius:14px;overflow:hidden;background:#fff;box-shadow:5px 5px 0 var(--ink);transform:rotate(1.5deg);transition:transform .15s ease,box-shadow .15s ease;}
  .rv-shot:hover{transform:rotate(0) translate(-2px,-2px);box-shadow:7px 7px 0 var(--ink);}
  .rv-shot img{display:block;width:100%;height:auto;}
  .rv-shot span{display:block;padding:8px 12px;border-top:2px solid var(--ink);font-size:13px;font-weight:800;background:var(--paper-2);}
  .rv-q{margin:26px 0 0;padding:20px 22px;background:var(--paper);border:2px solid var(--ink);border-radius:14px;}
  .rv-q blockquote{margin:0;font-size:17px;line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .rv-q-big blockquote{font-size:clamp(19px,1.9vw,22px);font-weight:800;line-height:1.4;}
  .rv-q figcaption{display:flex;align-items:center;gap:12px;margin-top:14px;}
  .rv-av{position:relative;flex:none;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;border:2px solid var(--ink);overflow:hidden;background:var(--lavender);color:var(--ink);font-weight:900;font-size:16px;}
  .rec-hiring .rv-av{background:var(--coral-tint);}
  .rv-av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .rv-who{display:grid;font-size:14px;line-height:1.35;color:var(--ink-2);}
  .rv-who b{font-size:15px;color:var(--ink);}
  .rv-ctx{color:var(--ink-3);}
  .rv-qk{margin:30px 0 0;font-size:clamp(20px,2.2vw,24px);font-weight:900;letter-spacing:-0.01em;}
  .rv-quotes{display:grid;gap:14px;}
  .rv-quotes .rv-q{margin-top:14px;}
  .rv-quotes-2,.rv-quotes-4{grid-template-columns:repeat(2,minmax(0,1fr));}
  .rv-quotes-3{grid-template-columns:repeat(3,minmax(0,1fr));}
  .rv-quotes .rv-q{margin-top:0;}
  .rv-quotes{margin-top:14px;}
  .rv-cta-k{margin:8px 0 0;font-size:clamp(22px,2.4vw,28px);font-weight:900;letter-spacing:-0.015em;line-height:1.2;}
  .rv-cta-text{margin:10px 0 0;font-size:17px;line-height:1.55;color:var(--ink-2);max-width:620px;}
  .rv-cta{margin:20px 0 0;}
  .rv-cta .btn{font-size:17px;padding:17px 24px;}
  .rv-under{margin:12px 0 0;font-size:14.5px;font-weight:600;color:var(--ink-3);}
  .rv-second{margin:16px 0 0;font-size:16px;font-weight:700;}
  @media(max-width:860px){.rv-body{grid-template-columns:1fr;}.rv-shot{max-width:360px;transform:none;}.rv-quotes-3{grid-template-columns:1fr;}}
  @media(max-width:600px){.rv-quotes-2,.rv-quotes-4{grid-template-columns:1fr;}}
  .rv-back{margin-top:36px;font-size:15px;}
  .rv-k{margin-top:36px;}
  .rv-k + .rec-pick{margin-top:0;}
  .rec-seekers.rv-ans .rec-pick{border:3px solid var(--indigo);box-shadow:6px 6px 0 var(--indigo);}
  .rec-hiring.rv-ans .rec-pick{border:3px solid var(--coral);box-shadow:6px 6px 0 var(--coral);}
  .rv-work-lead{font-size:18px;line-height:1.55;color:var(--ink-2);max-width:720px;text-wrap:pretty;}
  .rv-work{margin-top:22px;}
  .rv-work-rv{margin-top:14px;max-width:720px;padding-left:14px;border-left:4px solid var(--indigo);font-size:18px;line-height:1.5;font-weight:800;color:var(--ink);text-wrap:pretty;}
  .rv-nowork{display:inline-block;margin-top:12px;padding:8px 14px;background:var(--lavender);color:var(--ink);border:2px solid var(--ink);border-radius:10px;box-shadow:3px 3px 0 var(--ink);font-size:16px;font-weight:800;line-height:1.35;}
  .rv-lane{position:relative;max-width:820px;margin-bottom:24px;}
  .rv-lane > .rec-pick{position:relative;z-index:2;}
  .rv-lane .rv-dots{top:-30px;right:-28px;}
  .rv-lane .rv-zig{bottom:-36px;right:44px;}
  .rec-seekers .rv-lane .m-dots{color:var(--lavender);}
  .rec-seekers .rv-lane .m-zig{color:var(--coral);}
  .rec-hiring .rv-lane .m-dots{color:var(--coral);}
  .rec-hiring .rv-lane .m-zig{color:var(--indigo);}
  @media(max-width:560px){.rv-lane .rv-dots{right:-12px;}}
  /* Hiring answer: the profile at full width, what to ask, when to ask for it (Nov 16, 2026) */
  .rv-lane-wide,.rv-lane-wide > .rec-pick{max-width:none;}
  .rv-lane-wide > .rec-pick{grid-template-columns:minmax(0,1fr);}
  .rv-text-wide{max-width:760px;}
  .rv-prof-k{margin:10px 0 0;font-size:clamp(22px,2.4vw,26px);font-weight:900;letter-spacing:-0.01em;line-height:1.2;color:var(--ink);}
  .rv-lane-wide .rf{margin-top:4px;}
  .rv-prof-src{margin:2px 0 0;font-size:13.5px;line-height:1.5;color:var(--ink-3);}
  .rv-prof-src .tl{font-size:13.5px;}
  .rv-asks{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:18px;}
  .rv-ask{display:flex;flex-direction:column;gap:8px;padding:20px 22px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);}
  .rv-ask-tag{align-self:flex-start;padding:4px 11px;border:2px solid var(--ink);border-radius:999px;font-size:12.5px;font-weight:900;color:var(--ink);}
  .rv-ask-yes .rv-ask-tag{background:var(--ok-bright);}
  .rv-ask-open .rv-ask-tag{background:var(--coral-tint);}
  .rv-ask-trait{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:4px 0 0;font-size:20px;line-height:1.2;color:var(--ink);}
  .rv-ask-trait b{font-weight:900;}
  .rv-ask-detail{margin:0;font-size:14.5px;line-height:1.45;color:var(--ink-3);}
  .rv-ask-do{margin:auto 0 0;padding-top:12px;border-top:1px solid var(--rule);font-size:16.5px;line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .rv-steps{list-style:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:18px 0 0;padding:0;}
  .rv-steps li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start;padding:20px 22px;background:var(--coral-tint);border:3px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);font-size:17.5px;line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .rv-step-n{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--coral);color:var(--ink);border:3px solid var(--ink);font-weight:900;font-size:17px;line-height:1;transform:rotate(-6deg);}
  .rv-lane-end{margin-top:44px;}
  @media(max-width:700px){.rv-asks,.rv-steps{grid-template-columns:1fr;}}
  .rv-more{margin-top:18px;font-size:17px;font-weight:700;}
  .rec-fine{margin-top:18px;font-size:14px;font-weight:700;color:var(--ink-2);}
  .rec-help{margin-top:36px;padding-top:24px;border-top:1px solid var(--rule);}
  .rec-help-q{font-size:20px;font-weight:900;color:var(--ink);}
  .rec-help-opts{display:flex;flex-wrap:wrap;gap:12px;margin-top:14px;}
  .rec-help-btn{min-width:96px;min-height:48px;padding:10px 20px;font:inherit;font-size:16px;font-weight:800;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:10px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;}
  .rec-help-btn:hover{transform:translate(1px,1px);box-shadow:2px 2px 0 var(--ink);}
  .rec-help-done{margin-top:12px;font-size:16px;font-weight:700;color:var(--ink-2);}
  @media(max-width:560px){.g-card{min-height:68px;padding:18px 18px;}.g-links{justify-content:flex-start;}}
  .g .g-q,.g .g-card{animation:g-in .5s cubic-bezier(.2,.7,.2,1) both;}
  .g .g-card:nth-child(1){animation-delay:.08s;}
  .g .g-card:nth-child(2){animation-delay:.16s;}
  .g .g-card:nth-child(3){animation-delay:.24s;}
  .g .g-card:nth-child(n+4){animation-delay:.3s;}
  @keyframes g-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
  .g-card .arr{transition:transform .15s ease;}
  .g-card:hover .arr{transform:translateX(4px);}
  @media (prefers-reduced-motion: reduce){.g-card{transition:none;}.g .g-q,.g .g-card{animation:none;}}
`
