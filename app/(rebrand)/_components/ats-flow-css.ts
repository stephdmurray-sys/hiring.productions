/** Styles for ats-flow.tsx: the numbered flow chart with a line that fills as you scroll. */
export const atsFlowCss = `
  .af{list-style:none;margin:40px 0 0;padding:0;display:grid;gap:22px;max-width:860px;}
  .af-step{position:relative;display:grid;grid-template-columns:64px minmax(0,1fr);gap:22px;align-items:start;}
  .af-seg{position:absolute;left:30px;top:64px;bottom:-22px;width:4px;border-radius:2px;background:var(--rule-2);overflow:hidden;}
  .af-fill{position:absolute;inset:0;background:var(--ink);transform:scaleY(0);transform-origin:top;transition:transform .45s ease;}
  .af-fill-on{transform:scaleY(1);}
  .af-n{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;border:3px solid var(--ink);background:#fff;color:var(--ink);font-weight:900;font-size:28px;box-shadow:4px 4px 0 var(--ink);transition:background .3s ease,color .3s ease,transform .3s ease;}
  .af-lit .af-n{background:var(--indigo);color:#fff;transform:rotate(-6deg);}
  .af-auto.af-lit .af-n{background:var(--coral);color:var(--coral-deep);}
  .af-card{padding:20px 24px 18px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);opacity:.5;transform:translateX(10px);transition:opacity .4s ease,transform .4s ease,box-shadow .2s ease;}
  .af-lit .af-card{opacity:1;transform:none;}
  .af-auto .af-card{background:var(--coral-tint);}
  .af-auto.af-lit .af-card{animation:af-wobble .5s ease .15s 1;}
  .af-card h3{margin:0;font-size:clamp(21px,2.1vw,25px);line-height:1.2;font-weight:900;letter-spacing:-0.01em;text-wrap:balance;}
  .af-todo{margin:12px 0 0;padding:10px 14px;background:var(--indigo-tint);border-radius:12px;font-size:17px;line-height:1.45;color:var(--ink);}
  .af-auto .af-todo{background:#fff;}
  .af-tag{display:inline-block;margin:0 0 10px;padding:6px 12px;border:2px solid var(--ink);border-radius:999px;background:var(--coral);color:var(--coral-deep);font-size:13px;font-weight:900;box-shadow:2px 2px 0 var(--ink);transform:rotate(-2deg);}
  .af-why-btn{display:inline-flex;align-items:center;gap:8px;margin-top:12px;padding:6px 2px;background:none;border:0;font:inherit;font-size:15px;font-weight:800;color:var(--indigo-text);cursor:pointer;text-decoration:underline;text-underline-offset:3px;}
  .af-auto .af-why-btn{color:var(--coral-text);}
  .af-chev{width:8px;height:8px;border-right:2.5px solid currentColor;border-bottom:2.5px solid currentColor;transform:rotate(45deg) translateY(-2px);transition:transform .2s ease;}
  .af-why-btn[aria-expanded="true"] .af-chev{transform:rotate(-135deg) translateY(-2px);}
  .af-why{margin-top:6px;padding-top:12px;border-top:2px dashed var(--rule-2);}
  .af-why p{margin:0;font-size:16.5px;line-height:1.6;color:var(--ink-2);text-wrap:pretty;}
  .af-why a{display:inline-block;margin-top:10px;font-weight:700;font-size:15px;}
  .af-step:hover .af-card{box-shadow:8px 8px 0 var(--ink);}
  @keyframes af-wobble{0%,100%{transform:none}25%{transform:rotate(-1deg)}50%{transform:rotate(.8deg)}75%{transform:rotate(-.4deg)}}
  @media(max-width:560px){
    .af-step{grid-template-columns:44px minmax(0,1fr);gap:14px;}
    .af-n{width:44px;height:44px;font-size:20px;}
    .af-seg{left:20px;top:44px;}
    .af-card{padding:18px 18px 16px;}
  }
  @media(prefers-reduced-motion:reduce){
    .af-fill,.af-n,.af-card{transition:none;}
    .af-card{opacity:1;transform:none;}
    .af-fill{transform:none;}
    .af-auto.af-lit .af-card{animation:none;}
  }
`
