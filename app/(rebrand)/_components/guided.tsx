import { Logo } from './logo'
import { keepLast } from '@/lib/site-line'
import { PickerFeedback, TrackOnce, TrackedLink } from './picker-track'
import { ASK_FOR_IT, GUIDED, PROOF, REPVERA_ANSWER, guidedStep, isStep, wholeList, type GuidedTarget, type Side } from '@/lib/evidence/guided'
import { PORTFOLIO_PICKS } from '@/lib/evidence/shortlists'
import { Kit } from './recommender'
import { Dots, Zigzag } from './retro'
import { ShortToolRow } from './short-list'

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
  return (
    <div className={`g-first g-${side}`}>
      <span className={`pill pill-${side}`}>{side === 'seekers' ? 'I\u2019m a job seeker' : 'I\u2019m hiring'}</span>
      <h3 className="g-first-q">{keepLast(step.question)}</h3>
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
export function RepveraAnswer({ side, from }: { side: Side; from?: string }) {
  const a = REPVERA_ANSWER[side]
  const seekers = side === 'seekers'
  const back = from === 'all' ? stepHref(side, 'all') : stepHref(side, isStep(side, from) ? from : a.back)
  const btn = side === 'seekers' ? 'btn btn-indigo' : 'btn btn-coral'
  return (
    <div className={`rec-ans rec-${side} rv-ans`}>
      <TrackOnce event="repvera_answer_view" side={side} />
      <TrackOnce event="picker_finish" side={side} problem="repvera" />
      <h2 className="rec-title" id="answer-h">
        {a.heading}
      </h2>
      <p className="rec-lead">{keepLast(a.opening)}</p>
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
        {a.lines.map((l) => (
          <p className="rv-line" key={l.slice(0, 24)}>
            {l}
          </p>
        ))}
        <p className="rv-note">{a.note}</p>
        <TrackedLink href={a.url} className={btn} event="repvera_profile_click" side={side}>
          {a.button} <span className="arr">&#8599;</span>
        </TrackedLink>
      </div>
      </div>
      {seekers && (
        <Kit k={PROOF.work}>
          <p className="rv-work-lead">{keepLast(PROOF.workLead)}</p>
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
      {seekers ? (
        <Kit k={PROOF.where.k}>
          <p className="kit-wont">{keepLast(PROOF.where.text)}</p>
          <p className="rv-more">
            <a className="tl" href={PROOF.email.href}>
              {keepLast(PROOF.email.text)} <span className="arr">&rarr;</span>
            </a>
          </p>
        </Kit>
      ) : (
        <Kit k={ASK_FOR_IT.k}>
          <p className="kit-wont">{keepLast(ASK_FOR_IT.text)}</p>
        </Kit>
      )}
      <p className="rv-back">
        <a className="tl" href={back}>
          Go back and pick a different answer
        </a>
      </p>
      <p className="rec-fine">Nobody pays to be featured.</p>
      <PickerFeedback side={side} problem="repvera" />
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
  .g-start{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,48px);margin-top:36px;}
  .g-first-q{font-size:clamp(24px,2.6vw,30px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;margin:16px 0 0;}
  .g-first .g-cards{margin-top:18px;gap:12px;}
  .g-first .g-card{min-height:64px;padding:16px 20px;font-size:18px;}
  @media(max-width:860px){.g-start{grid-template-columns:1fr;}}
  .g-cards{display:grid;gap:14px;margin-top:28px;}
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
  .rv-back{margin-top:36px;font-size:15px;}
  .rv-k{margin-top:36px;}
  .rv-k + .rec-pick{margin-top:0;}
  .rec-seekers.rv-ans .rec-pick{border:3px solid var(--indigo);box-shadow:6px 6px 0 var(--indigo);}
  .rec-hiring.rv-ans .rec-pick{border:3px solid var(--coral);box-shadow:6px 6px 0 var(--coral);}
  .rv-work-lead{font-size:18px;line-height:1.55;color:var(--ink-2);max-width:720px;text-wrap:pretty;}
  .rv-work{margin-top:22px;}
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
