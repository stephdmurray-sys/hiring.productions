/**
 * CSS for the interactive widgets. Kept out of the 'use client' files:
 * a string exported from a client module reaches server pages as a client
 * reference, not as text.
 */
export const calcCss = `
  .calc{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);box-shadow:var(--shadow);overflow:hidden;}
  .calc-top{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:28px;align-items:center;padding:24px 26px;background:var(--surface-2);border-bottom:1px solid var(--rule);}
  .calc-q{font-weight:800;font-size:19px;line-height:1.3;}
  .calc-q output{display:block;font-weight:900;font-size:clamp(36px,4vw,48px);letter-spacing:-0.02em;color:var(--indigo);line-height:1.1;margin-top:4px;}
  .calc-range{width:100%;accent-color:var(--indigo);height:32px;cursor:pointer;}
  .calc-ticks{display:flex;justify-content:space-between;font-size:12.5px;color:var(--ink-3);font-family:var(--mono);margin-top:2px;}
  .calc-key{display:flex;gap:18px;flex-wrap:wrap;font-size:13.5px;color:var(--ink-2);margin-top:10px;}
  .calc-key i{display:inline-block;width:14px;height:8px;border-radius:2px;margin-right:6px;vertical-align:1px;}
  .calc-key .k-on{background:var(--indigo);}
  .calc-key .k-forget{background:repeating-linear-gradient(135deg,#FFB3C0 0 3px,#FFE0E6 3px 6px);}
  .calc-row{display:grid;grid-template-columns:36px minmax(0,160px) minmax(0,1fr) minmax(0,190px);gap:14px;align-items:center;padding:12px 26px;border-bottom:1px solid var(--rule-soft);}
  .calc-row:last-child{border-bottom:0;}
  .calc-row b{font-weight:800;font-size:16px;}
  .calc-row b a:hover{text-decoration:underline;text-underline-offset:3px;}
  .calc-name small{display:block;font-size:12.5px;color:var(--ink-3);font-weight:400;line-height:1.3;}
  .calc-name small.warn{color:var(--coral-text);font-weight:700;}
  .calc-bar{position:relative;height:14px;background:#F2F0F7;border-radius:4px;overflow:hidden;}
  .calc-bar .forget{position:absolute;inset:0 auto 0 0;background:repeating-linear-gradient(135deg,#FFB3C0 0 3px,#FFE0E6 3px 6px);border-radius:4px;}
  .calc-bar .on{position:absolute;inset:0 auto 0 0;background:var(--indigo);border-radius:4px;transition:width .35s cubic-bezier(.2,.7,.2,1);}
  @media (prefers-reduced-motion: reduce){.calc-bar .on{transition:none;}}
  .calc-cost{text-align:right;font-variant-numeric:tabular-nums;}
  .calc-cost b{font-size:19px;font-weight:900;}
  .calc-cost span{display:block;font-size:12.5px;color:var(--ink-3);}
  .calc-cost span.warn{color:var(--coral-text);font-weight:700;}
  .calc-foot{padding:14px 26px;font-size:13.5px;color:var(--ink-2);background:var(--surface-2);border-top:1px solid var(--rule);}
  @media(max-width:760px){
    .calc-top{grid-template-columns:1fr;gap:12px;padding:20px 18px;}
    .calc-row{grid-template-columns:36px minmax(0,1fr) auto;padding:12px 18px;}
    .calc-bar{grid-column:2 / -1;grid-row:2;}
    .calc-foot{padding:12px 18px;}
  }
`

export const videoCardCss = `
  .vid-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:36px;}
  .vid{margin:0;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);overflow:hidden;}
  .vid iframe{display:block;width:100%;aspect-ratio:16/9;border:0;}
  .vfacade{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;cursor:pointer;background-color:#24194F;background-size:cover;background-position:center;}
  .vplay{position:absolute;left:14px;bottom:14px;width:48px;height:48px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,0.25);}
  .vfacade:hover .vplay{background:var(--ok-bright);}
  .vid-meta{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:start;padding:14px 16px 16px;}
  .vid-meta b{display:block;font-size:16.5px;font-weight:800;line-height:1.25;}
  .vid-meta .vid-title{display:block;font-size:14px;color:var(--ink-2);line-height:1.4;margin-top:2px;}
  .vid-kind{display:inline-block;font-size:12.5px;font-weight:800;margin-top:8px;color:var(--ink-2);}
  .vid-kind.k-independent,.vid-kind.k-comparison{color:var(--indigo-text);}
  .vid-kind.k-vendor{color:var(--ink-3);}
  @media(max-width:900px){.vid-grid{grid-template-columns:1fr;}}
`
