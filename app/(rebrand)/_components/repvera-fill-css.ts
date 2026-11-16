/** Styles for repvera-fill.tsx: the stage list beside a profile that fills in. */
export const repveraFillCss = `
  .rf{display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.3fr);gap:clamp(22px,3vw,40px);align-items:start;margin-top:30px;}
  .rf-stages{list-style:none;margin:0;padding:0;display:grid;gap:12px;position:sticky;top:80px;}
  .rf-stage{display:grid;grid-template-columns:40px minmax(0,1fr);gap:14px;align-items:start;width:100%;padding:14px 16px;text-align:left;font:inherit;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;transition:transform .15s ease,box-shadow .15s ease,background .2s ease;}
  .rf-stage:hover{transform:translate(-1px,-1px);box-shadow:5px 5px 0 var(--ink);}
  .rf-stage b{display:block;font-size:16.5px;line-height:1.3;font-weight:900;}
  .rf-line{display:block;margin-top:4px;font-size:14.5px;line-height:1.45;color:var(--ink-2);}
  .rf-n{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:3px solid var(--ink);background:#fff;font-weight:900;font-size:16px;transition:background .25s ease,color .25s ease;}
  .rf-done .rf-n{background:var(--indigo);color:#fff;}
  .rf-now{background:var(--indigo-tint);box-shadow:5px 5px 0 var(--ink);}
  .rf-profile{position:relative;padding:clamp(20px,2.6vw,28px);background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--ink);}
  .rf-head{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
  .rf-head > span:nth-child(2){display:grid;font-size:14px;line-height:1.35;color:var(--ink-2);}
  .rf-head b{font-size:17px;color:var(--ink);}
  .rf-av{position:relative;flex:none;width:52px;height:52px;border-radius:50%;border:2px solid var(--ink);overflow:hidden;background:var(--lavender);}
  .rf-av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .rf-badge{margin-left:auto;padding:6px 12px;border:2px solid var(--ink);border-radius:999px;background:var(--paper-2);font-size:13.5px;font-weight:900;color:var(--ink-2);transition:background .3s ease,color .3s ease,transform .3s ease;}
  .rf-badge-on{background:var(--ok-bright);color:var(--ink);transform:rotate(-3deg);}
  .rf-known{margin:18px 0 0;font-size:clamp(20px,2.1vw,24px);line-height:1.3;font-weight:900;letter-spacing:-0.01em;color:var(--ink);}
  .rf-known mark{background:linear-gradient(transparent 60%,var(--indigo-tint) 60%);color:inherit;padding:0 2px;}
  .rf-sec{margin-top:18px;padding-top:16px;border-top:2px dashed var(--rule-2);opacity:.12;transform:translateY(8px);filter:blur(1.5px);transition:opacity .5s ease,transform .5s ease,filter .5s ease;}
  .rf-on{opacity:1;transform:none;filter:none;}
  .rf-k{display:flex;justify-content:space-between;gap:10px;margin:0 0 10px;font-size:14px;font-weight:900;color:var(--ink);}
  .rf-k span{font-weight:800;color:var(--indigo-text);}
  .rf-bar{display:flex;height:12px;border-radius:6px;overflow:hidden;border:2px solid var(--ink);}
  .rf-bar i{display:block;flex-basis:0;background:var(--indigo);border-right:2px solid #fff;}
  .rf-bar i:last-child{border-right:0;}
  .rf-legend{margin:8px 0 0;font-size:12.5px;line-height:1.5;color:var(--ink-3);}
  .rf-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;}
  .rf-chips{display:flex;flex-wrap:wrap;gap:6px;}
  .rf-chips span{padding:4px 10px;border:1.5px solid var(--ink);border-radius:999px;font-size:13px;font-weight:700;background:var(--paper);}
  .rf-patterns{display:grid;gap:8px;}
  .rf-patterns p{display:grid;grid-template-columns:minmax(0,1fr) 42%;gap:10px;align-items:center;margin:0;font-size:13px;font-weight:700;color:var(--ink);}
  .rf-patterns i{display:block;height:8px;border-radius:4px;background:var(--paper-2);overflow:hidden;}
  .rf-patterns b{display:block;height:100%;background:var(--indigo);border-radius:4px;}
  .rf-rule{margin:10px 0 0;font-size:12px;line-height:1.45;color:var(--ink-3);}
  .rf-traits{display:grid;gap:8px;}
  .rf-traits p{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 12px;align-items:center;margin:0;padding:10px 12px;background:var(--paper);border-radius:10px;font-size:14px;}
  .rf-traits b{font-weight:900;color:var(--ink);}
  .rf-marks{display:inline-flex;gap:4px;}
  .rf-marks i{width:14px;height:14px;border-radius:50%;border:2px solid var(--ink);background:#fff;}
  .rf-marks .rf-mark-on{background:var(--ok-bright);}
  .rf-detail{grid-column:1 / -1;font-size:12.5px;color:var(--ink-3);}
  .rf-finding{margin:14px 0 0;padding:14px 16px;background:var(--indigo-tint);border-radius:12px;font-size:15.5px;line-height:1.55;color:var(--ink);}
  .rf-finding b{display:block;margin-bottom:4px;font-weight:900;}
  @media(max-width:900px){
    .rf{grid-template-columns:1fr;}
    .rf-stages{position:static;grid-template-columns:repeat(2,minmax(0,1fr));}
  }
  @media(max-width:560px){
    .rf-stages{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}
    .rf-stage{grid-template-columns:30px minmax(0,1fr);gap:8px;padding:10px;}
    .rf-stage b{font-size:14px;}
    .rf-n{width:28px;height:28px;font-size:13px;border-width:2px;}
    .rf-line{display:none;}
    .rf-two{grid-template-columns:1fr;}
    .rf-badge{margin-left:0;}
  }
  @media(prefers-reduced-motion:reduce){
    .rf-sec,.rf-badge,.rf-n,.rf-stage{transition:none;}
    .rf-sec{opacity:1;transform:none;filter:none;}
  }
`
