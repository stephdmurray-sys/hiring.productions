/** Styles for value-prop-builder.tsx. Indigo on the job seeker page, coral on the hiring page. */
export const valuePropCss = `
  .vp{--vp:var(--indigo);--vp-tint:var(--indigo-tint);--vp-text:var(--indigo-text);--vp-on:#fff;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(24px,3vw,40px);align-items:start;margin-top:40px;}
  .vp-hiring{--vp:var(--coral);--vp-tint:var(--coral-tint);--vp-text:var(--coral-text);--vp-on:var(--coral-deep);}
  .vp-in{display:grid;gap:18px;padding:clamp(22px,3vw,30px);background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);}
  .vp-step{display:grid;grid-template-columns:38px minmax(0,1fr);gap:6px 14px;align-items:center;}
  .vp-n{grid-row:span 2;align-self:start;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:3px solid var(--ink);background:var(--vp);color:var(--vp-on);font-weight:900;font-size:17px;}
  .vp-q{font-size:17px;line-height:1.35;font-weight:800;color:var(--ink);}
  .vp-step input,.vp-step textarea{width:100%;font:inherit;font-size:16.5px;line-height:1.45;color:var(--ink);background:var(--paper);border:2px solid var(--ink);border-radius:10px;padding:11px 13px;}
  .vp-step textarea{resize:vertical;min-height:120px;}
  .vp-step input::placeholder,.vp-step textarea::placeholder{color:var(--ink-3);}
  .vp-step input:focus,.vp-step textarea:focus{outline:3px solid var(--vp);outline-offset:1px;}
  .vp-words{padding:16px 16px 14px;background:var(--vp-tint);border-radius:14px;}
  .vp-k{margin:0;font-size:15px;font-weight:800;color:var(--ink);}
  .vp-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;}
  .vp-chip{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;font:inherit;font-size:15.5px;font-weight:800;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:999px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;transition:transform .12s ease,box-shadow .12s ease,background .12s ease;}
  .vp-chip:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--ink);}
  .vp-chip[aria-pressed="true"]{background:var(--vp);color:var(--vp-on);}
  .vp-times{font-size:12.5px;font-weight:900;opacity:.75;}
  .vp-none{margin:8px 0 0;font-size:15px;line-height:1.5;color:var(--ink-2);}
  .vp-private{margin:0;font-size:13.5px;color:var(--ink-3);}
  .vp-out{position:sticky;top:72px;}
  .vp-out-k{margin:0 0 14px;font-size:clamp(22px,2.2vw,26px);font-weight:900;letter-spacing:-0.01em;color:var(--ink);}
  .vp-cards{display:grid;grid-template-columns:1fr;gap:14px;}
  .vp-card{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 16px;align-items:start;padding:16px 18px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);}
  .vp-card:first-child{background:var(--vp-tint);}
  .vp-card > p{grid-column:1;}
  .vp-where{margin:0;font-size:13.5px;font-weight:900;color:var(--vp-text);}
  .vp-text{margin:0;font-size:17px;line-height:1.45;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .vp-card:first-child .vp-text{font-size:clamp(19px,1.9vw,22px);}
  .vp-note{margin:0;font-size:13.5px;line-height:1.45;color:var(--ink-3);}
  .vp-copy{grid-column:2;grid-row:1 / span 3;align-self:center;padding:7px 14px;font:inherit;font-size:14px;font-weight:800;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;}
  .vp-copy:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink);}
  @media(max-width:900px){
    .vp{grid-template-columns:1fr;}
    .vp-out{position:static;}
  }
  @media(max-width:560px){
    .vp-card{grid-template-columns:1fr;}
    .vp-copy{grid-column:1;grid-row:auto;justify-self:start;}
  }
  @media(prefers-reduced-motion:reduce){.vp-chip{transition:none;}.vp-chip:hover{transform:none;}}
`
