import type { CSSProperties } from 'react'
import { keepLast } from '@/lib/site-line'
import { FREE_TOOL_CARDS, type FreeToolCard, type FreeToolIcon } from '@/lib/free-tools'

/**
 * The free tools, as big mirrored cards: job seekers on the left, hiring
 * teams on the right, each row asking the same question from both sides of
 * the table. The two columns share their rows (subgrid), so every card sits
 * level with its partner. Used on /tools (every tool) and the homepage band
 * (the first rows). Data: lib/free-tools.ts.
 */

/** F: the ink outline for a filled shape. S: a plain line (no fill). */
const F = { stroke: 'currentColor', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const S = { ...F, fill: 'none' } as const

/** Simple drawn icons, ink lines with one accent fill, so each tool is recognizable at a glance. */
export function ToolIcon({ name }: { name: FreeToolIcon }) {
  const accent = 'var(--fti-accent)'
  const body = (() => {
    switch (name) {
      case 'real':
        return (
          <>
            <rect x="9" y="7" width="22" height="29" rx="3" fill="#fff" {...F} />
            <path d="M14 15h12M14 21h12M14 27h7" {...S} />
            <circle cx="31" cy="31" r="8" fill={accent} {...F} />
            <path d="M37 37l5 5" {...S} />
          </>
        )
      case 'ask':
        return (
          <>
            <path d="M6 10h24a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H16l-7 6v-6H6a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" fill={accent} {...F} />
            <path d="M37 18h5a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3h-2v6l-7-6H24a3 3 0 0 1-3-3" fill="#fff" {...F} />
            <path d="M13 19h13" {...S} />
          </>
        )
      case 'screen':
        return (
          <>
            <path d="M5 8h38L28 26v12l-8 5V26z" fill={accent} {...F} />
            <path d="M12 8l4 6M24 8v6M36 8l-4 6" {...S} />
          </>
        )
      case 'bill':
        return (
          <>
            <path d="M10 5h28v36l-4.7-3-4.6 3-4.7-3-4.7 3-4.6-3L10 41z" fill="#fff" {...F} />
            <path d="M16 14h16M16 20h16M16 26h9" {...S} />
            <circle cx="31" cy="30" r="6" fill={accent} {...F} />
          </>
        )
      case 'free':
        return (
          <>
            <path d="M24 5h15a3 3 0 0 1 3 3v15L23 42a3 3 0 0 1-4.2 0L6 29.2a3 3 0 0 1 0-4.2z" fill={accent} {...F} />
            <circle cx="34" cy="13" r="3" fill="#fff" {...F} />
            <path d="M17 31l9-9" {...S} />
          </>
        )
      case 'repeat':
        return (
          <>
            <rect x="6" y="9" width="36" height="32" rx="4" fill="#fff" {...F} />
            <path d="M6 18h36M15 5v8M33 5v8" {...S} />
            <path d="M17 30a7 7 0 0 1 12-5l2 2M31 22v5h-5" stroke={accent} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M31 32a7 7 0 0 1-12 3l-2-2M17 38v-5h5" stroke={accent} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )
      case 'proof':
        return (
          <>
            <path d="M24 4l5.6 11.4 12.4 1.8-9 8.8 2.1 12.4L24 32.5l-11.1 5.9L15 26l-9-8.8 12.4-1.8z" fill={accent} {...F} />
            <path d="M18 23l4 4 8-8" {...S} />
          </>
        )
      case 'list':
        return (
          <>
            <rect x="7" y="6" width="34" height="36" rx="4" fill="#fff" {...F} />
            <path d="M13 16l3 3 5-6M13 28l3 3 5-6" {...S} />
            <path d="M26 17h9M26 29h9" {...S} />
            <circle cx="36" cy="38" r="0.5" {...S} />
            <rect x="24" y="12" width="13" height="10" rx="2" fill={accent} stroke="none" opacity=".45" />
          </>
        )
      case 'scorecard':
        return (
          <>
            <rect x="9" y="8" width="30" height="35" rx="4" fill="#fff" {...F} />
            <rect x="17" y="4" width="14" height="8" rx="2" fill={accent} {...F} />
            <path d="M15 21h18M15 28h18M15 35h10" {...S} />
            <circle cx="33" cy="35" r="2.4" fill={accent} {...F} />
          </>
        )
      case 'calculator':
        return (
          <>
            <rect x="9" y="4" width="30" height="40" rx="4" fill="#fff" {...F} />
            <rect x="14" y="9" width="20" height="9" rx="2" fill={accent} {...F} />
            <path d="M16 25h.01M24 25h.01M32 25h.01M16 32h.01M24 32h.01M32 32h.01M16 39h.01M24 39h8" {...S} strokeWidth={3.6} />
          </>
        )
      case 'shield':
        return (
          <>
            <path d="M24 4l17 6v12c0 10.5-7.2 18.6-17 22C14.2 40.6 7 32.5 7 22V10z" fill={accent} {...F} />
            <path d="M24 14v12M24 32v.01" {...S} strokeWidth={3.4} />
          </>
        )
      case 'layers':
        return (
          <>
            <path d="M24 6l19 9-19 9-19-9z" fill={accent} {...F} />
            <path d="M5 24l19 9 19-9" {...S} />
            <path d="M5 33l19 9 19-9" {...S} />
          </>
        )
    }
  })()
  return (
    <svg className="fti" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false">
      {body}
    </svg>
  )
}

function Card({ t }: { t: FreeToolCard }) {
  return (
    <a className={`ft-card ft-${t.side}`} href={t.href}>
      <span className="ft-icon">
        <ToolIcon name={t.icon} />
      </span>
      <span className="ft-body">
        <b className="ft-title">{keepLast(t.title)}</b>
        <span className="ft-what">{keepLast(t.what)}</span>
        <span className="ft-get">
          You get: <b>{t.get}</b>
        </span>
      </span>
      <span className="ft-arr" aria-hidden="true">
        &rarr;
      </span>
    </a>
  )
}

/** Both sides, row by row. `rows` limits it to the first rows (the homepage shows four). */
export function FreeToolsMirror({ rows, headings = true }: { rows?: number; headings?: boolean }) {
  const seekers = FREE_TOOL_CARDS.seekers.slice(0, rows)
  const hiring = FREE_TOOL_CARDS.hiring.slice(0, rows)
  const span = (n: number) => ({ gridRow: `span ${n + (headings ? 1 : 0)}` }) as CSSProperties
  return (
    <div className="ft-mirror">
      <div className="ft-col ft-col-seekers" id="for-job-seekers" style={span(seekers.length)}>
        {headings && (
          <p className="ft-side">
            <span className="pill pill-seekers">I&rsquo;m a job seeker</span>
          </p>
        )}
        {seekers.map((t) => (
          <Card t={t} key={t.id} />
        ))}
      </div>
      <div className="ft-col ft-col-hiring" id="for-hiring-teams" style={span(hiring.length)}>
        {headings && (
          <p className="ft-side">
            <span className="pill pill-hiring">I&rsquo;m hiring</span>
          </p>
        )}
        {hiring.map((t) => (
          <Card t={t} key={t.id} />
        ))}
      </div>
    </div>
  )
}

export const freeToolsCss = `
  .ft-mirror{display:grid;grid-template-columns:1fr 1fr;column-gap:clamp(20px,3vw,40px);row-gap:0;margin-top:36px;}
  .ft-col{display:grid;grid-template-rows:subgrid;min-width:0;}
  .ft-side{margin:0 0 16px;}
  .ft-card{position:relative;display:flex;align-items:flex-start;gap:18px;margin-bottom:18px;padding:22px 22px 20px;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);transition:transform .14s ease,box-shadow .14s ease;}
  .ft-card:hover,.ft-card:focus-visible{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--ink);}
  .ft-card:active{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--ink);}
  .ft-icon{flex:none;display:grid;place-items:center;width:68px;height:68px;border:3px solid var(--ink);border-radius:16px;color:var(--ink);}
  .ft-seekers .ft-icon{background:var(--indigo-tint);--fti-accent:var(--indigo);}
  .ft-hiring .ft-icon{background:var(--coral-tint);--fti-accent:var(--coral);}
  .ft-seekers:nth-child(odd) .ft-icon{transform:rotate(-4deg);}
  .ft-seekers:nth-child(even) .ft-icon{transform:rotate(3deg);}
  .ft-hiring:nth-child(odd) .ft-icon{transform:rotate(3deg);}
  .ft-hiring:nth-child(even) .ft-icon{transform:rotate(-4deg);}
  .fti{width:44px;height:44px;}
  .ft-body{display:grid;gap:8px;min-width:0;flex:1;}
  .ft-title{font-size:clamp(20px,1.9vw,24px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;}
  .ft-what{font-size:16px;line-height:1.5;color:var(--ink-2);}
  .ft-get{justify-self:start;margin-top:4px;font-size:13.5px;font-weight:700;color:var(--ink-2);padding:5px 10px;border-radius:999px;background:var(--paper-2);}
  .ft-get b{color:var(--ink);font-weight:900;}
  .ft-arr{flex:none;align-self:center;font-size:24px;font-weight:900;transition:transform .14s ease;}
  .ft-card:hover .ft-arr{transform:translateX(4px);}
  .ft-seekers .ft-arr{color:var(--indigo-text);}
  .ft-hiring .ft-arr{color:var(--coral-text);}
  @media(max-width:860px){
    .ft-mirror{grid-template-columns:1fr;}
    .ft-col-hiring > .ft-side{margin-top:32px;}
  }
  @media(max-width:480px){.ft-card{gap:14px;padding:18px 16px;}.ft-icon{width:56px;height:56px;border-radius:14px;}.fti{width:36px;height:36px;}.ft-arr{display:none;}}
  @media (prefers-reduced-motion: reduce){.ft-card,.ft-arr{transition:none;}.ft-card:hover{transform:none;}}
`
