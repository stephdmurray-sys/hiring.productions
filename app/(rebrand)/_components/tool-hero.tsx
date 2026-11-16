import type { ReactNode } from 'react'
import { Dots, Squiggle, Zigzag } from './retro'
import { keepLast } from '@/lib/site-line'
import type { FreeTool } from '@/lib/evidence/kit'

/**
 * The colored hero for the free tool pages: the side's color, the 80s
 * shapes anchored to its edges, and a sticker. Styles come from
 * shortListCss (short-list.tsx), so every free tool page and short list
 * reads as one family.
 */
export function ToolHero({ side, crumbs, sticker, title, dek, dateline }: { side: 'seekers' | 'hiring'; crumbs: ReactNode; sticker?: string; title: string; dek: string; dateline?: string }) {
  return (
    <header className={`sl-hero sl-hero-${side}`}>
      <div className="wrap sl-hero-in">
        <Dots className="slh-dots" />
        <Zigzag className="slh-zig" />
        <Squiggle className="slh-squig" />
        <p className="crumbs">{crumbs}</p>
        {sticker && <p className="sl-sticker">{sticker}</p>}
        <h1 className="display">{keepLast(title)}</h1>
        <p className="dek">{keepLast(dek)}</p>
        {dateline && <p className="dateline">{dateline}</p>}
      </div>
    </header>
  )
}

/** A numbered section heading, the same as on the short lists. */
export function StepHead({ n, title, sub }: { n?: number; title: string; sub?: string }) {
  // Numbers only where the sections are steps a visitor takes in order.
  return (
    <div className={n ? 'sl-head' : 'sl-head sl-head-plain'}>
      {n ? (
        <span className="sl-num sl-num-big" aria-hidden="true">
          {n}
        </span>
      ) : null}
      <div>
        <h2 className="sl-h">{keepLast(title)}</h2>
        {sub && <p className="lead">{keepLast(sub)}</p>}
      </div>
    </div>
  )
}

/** The site's own free tools, as cards. */
export function FreeCards({ items }: { items: FreeTool[] }) {
  return (
    <div className="free-grid">
      {items.map((f) => (
        <a className="kit-free" href={f.href} key={f.href}>
          <span>
            <b>{keepLast(f.title)}</b>
            <span>{keepLast(f.detail)}</span>
          </span>
          <span className="arr" aria-hidden="true">
            &rarr;
          </span>
        </a>
      ))}
    </div>
  )
}

export const toolPageCss = `
  .free-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:22px;margin-top:32px;}
  @media(min-width:760px){.free-grid:has(> :nth-child(4):last-child){grid-template-columns:repeat(2,minmax(0,1fr));}}
  .free-grid .kit-free{height:100%;}
  .tp-cta{display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px;margin-top:28px;}
  .tp-fine{margin-top:44px;font-size:14px;font-weight:700;color:var(--ink-2);}
  .tp-signup{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:end;padding:clamp(28px,4vw,44px);border:3px solid var(--ink);border-radius:20px;box-shadow:8px 8px 0 var(--ink);}
  .tp-signup-seekers{background:var(--indigo-tint);}
  .tp-signup-hiring{background:var(--coral-tint);}
  .tp-signup .m-dots{top:-34px;right:-26px;color:var(--lavender);}
  .tp-signup > :not(.memphis){position:relative;z-index:2;}
  .tp-signup h2{margin:0;}
  @media(max-width:760px){.tp-signup{grid-template-columns:1fr;gap:20px;}.tp-signup .m-dots{right:-10px;}}
`

/** The $0 job search's score line and free text. */
export const freeSearchCss = `
  .fj-score{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:14px;color:var(--ink-2);margin:0;}
  .fj-score .rec-bar{display:inline-block;width:110px;height:8px;border-radius:4px;background:var(--rule-soft);overflow:hidden;}
  .fj-score .rec-bar i{display:block;height:100%;border-radius:4px;background:var(--indigo);}
  .fj-free b{color:var(--ink);}
  .fj-up{font-size:14.5px;line-height:1.5;color:var(--ink-3);margin:0;}
  .fj-review{display:inline-block;margin-top:14px;font-size:15px;font-weight:800;}
`
