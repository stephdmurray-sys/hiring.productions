import { Logo } from './logo'
import { keepLast } from '@/lib/site-line'
import { PickerFeedback, TrackOnce, TrackedLink } from './picker-track'
import { GUIDED, REPVERA_ANSWER, guidedStep, wholeList, type GuidedTarget, type Side } from '@/lib/evidence/guided'

/**
 * The guided picker screens (lib/evidence/guided.ts holds the copy). Every
 * answer card is a plain link, so a tap moves forward with or without
 * scripts, and every screen has its own address. Each screen has "Back" and
 * "Show me the whole list".
 */

const REC = '/what-should-i-use'

const stepHref = (side: Side, step: string) => `${REC}?side=${side}&g=${step}#questions`
const problemHref = (side: Side, problem: string, from?: string) => `${REC}?side=${side}&problem=${problem}${from ? `&from=${from}` : ''}#questions`
const targetHref = (side: Side, to: GuidedTarget, from: string) => ('step' in to ? stepHref(side, to.step) : problemHref(side, to.problem, from))

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

export function GuidedStepView({ side, stepId }: { side: Side; stepId?: string }) {
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
      <Links side={side} back={step.back} />
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

/** RepVera's answer for one side: no score, no rank, and always Stephanie's note. */
export function RepveraAnswer({ side, from }: { side: Side; from?: string }) {
  const a = REPVERA_ANSWER[side]
  const back = from === 'all' ? stepHref(side, 'all') : stepHref(side, a.back)
  const btn = side === 'seekers' ? 'btn btn-indigo' : 'btn btn-coral'
  return (
    <div className={`rec-ans rec-${side} rv-ans`}>
      <TrackOnce event="repvera_answer_view" side={side} />
      <TrackOnce event="picker_finish" side={side} problem="repvera" />
      <h2 className="rec-title" id="answer-h">
        {a.heading}
      </h2>
      <p className="rec-lead">{a.opening}</p>
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
        <p className="rv-back">
          <a className="tl" href={back}>
            Go back and pick a different answer
          </a>
        </p>
      </div>
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
  .rv-back{margin-top:16px;font-size:15px;}
  .rec-fine{margin-top:18px;font-size:14px;font-weight:700;color:var(--ink-2);}
  .rec-help{margin-top:36px;padding-top:24px;border-top:1px solid var(--rule);}
  .rec-help-q{font-size:20px;font-weight:900;color:var(--ink);}
  .rec-help-opts{display:flex;flex-wrap:wrap;gap:12px;margin-top:14px;}
  .rec-help-btn{min-width:96px;min-height:48px;padding:10px 20px;font:inherit;font-size:16px;font-weight:800;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:10px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;}
  .rec-help-btn:hover{transform:translate(1px,1px);box-shadow:2px 2px 0 var(--ink);}
  .rec-help-done{margin-top:12px;font-size:16px;font-weight:700;color:var(--ink-2);}
  @media(max-width:560px){.g-card{min-height:68px;padding:18px 18px;}.g-links{justify-content:flex-start;}}
  @media (prefers-reduced-motion: reduce){.g-card{transition:none;}}
`
