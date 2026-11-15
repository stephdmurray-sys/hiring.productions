export const reviewCss = `
  .rv-visit{margin-top:14px;font-size:16px;}
  .rv-head{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,0.9fr);gap:56px;align-items:start;}
  .rv-id{display:flex;align-items:center;gap:16px;margin-bottom:20px;}
  .rv-seg{display:flex;align-items:center;font-weight:800;font-size:15px;color:var(--ink-2);}
  .rv-h1{font-size:clamp(40px,5.6vw,72px);}
  .rv-score{padding:26px;display:grid;gap:14px;}
  .rv-big{display:flex;align-items:center;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--rule-soft);}
  .rv-big b{font-size:64px;font-weight:900;letter-spacing:-0.03em;line-height:1;color:var(--indigo);font-variant-numeric:tabular-nums;}
  .rv-big span{font-size:14.5px;color:var(--ink-2);line-height:1.45;}
  .rv-none b{font-size:36px;color:var(--ink);}
  .rv-progress{display:block;height:10px;border-radius:5px;background:#F0EEF7;overflow:hidden;}
  .rv-progress i{display:block;height:100%;background:var(--lavender);border-radius:5px;}
  .rv-none-p{font-size:14.5px;color:var(--ink-2);}
  .meter{display:grid;grid-template-columns:72px minmax(0,1fr) 44px;gap:4px 12px;align-items:center;}
  .meter-l{font-weight:700;font-size:14.5px;}
  .meter-bar{height:8px;background:#F0EEF7;border-radius:4px;overflow:hidden;}
  .meter-bar i{display:block;height:100%;background:var(--indigo);border-radius:4px;}
  .meter b{font-weight:900;text-align:right;font-variant-numeric:tabular-nums;}
  .meter-n{grid-column:2 / -1;font-size:12.5px;color:var(--ink-3);margin-top:-2px;}
  .rv-versus{margin-top:28px;font-size:17px;line-height:1.9;color:var(--ink-2);max-width:960px;}
  .rv-versus b{color:var(--ink);}
  .rv-math{font-size:13px;color:var(--ink-3);padding-top:10px;border-top:1px solid var(--rule-soft);}
  .rv-stance{padding-top:12px;border-top:1px solid var(--rule-soft);}

  .rv-verdict{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;}
  .rv-verdict > div{display:flex;flex-direction:column;gap:10px;padding:22px 24px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);}
  .rv-verdict > div:first-child{background:var(--indigo-tint);}
  .rv-verdict > .rv-watch{background:var(--coral-tint);}
  .rv-h2{font-size:22px;font-weight:900;letter-spacing:-0.01em;margin:0;}
  .rv-watch .rv-h2{color:var(--coral-text);}
  .rv-verdict p{color:var(--ink);font-size:18px;line-height:1.55;margin:0;text-wrap:pretty;}
  @media(max-width:760px){.rv-verdict{grid-template-columns:1fr;gap:16px;}}
  .rv-score-h{margin-bottom:16px;}
  .rv-breakdown{padding:26px;display:grid;gap:14px;max-width:680px;}
  .rv-warn{color:var(--coral-text);}
  .rv-cost td{vertical-align:middle;}
  .rv-cost .rv-forget{color:var(--coral-text);font-weight:800;}

  .rv-lists{border-top:1px solid var(--ink);margin-top:32px;}
  .rv-list{display:flex;gap:16px;align-items:center;padding:18px 0;border-bottom:1px solid var(--rule);}
  .rv-list:hover b{text-decoration:underline;text-underline-offset:3px;}
  .rv-list b{display:block;font-size:17px;font-weight:800;}
  .rv-list-t{display:block;font-size:14.5px;color:var(--ink-2);line-height:1.4;margin-top:2px;}
  .rv-list-s{display:block;font-size:13px;color:var(--ink-3);margin-top:6px;font-weight:700;}
  .rv-list-s.ok{color:var(--ok);}
  .rv-empty{font-size:17px;color:var(--ink-2);padding:18px 0;border-bottom:1px solid var(--rule);}

  .rv-signup{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;border-top:1px solid var(--ink);padding-top:40px;}
  .rv-signup h2{font-size:clamp(30px,3.6vw,42px);margin-bottom:8px;}

  @media(max-width:960px){.rv-head,.rv-signup{grid-template-columns:1fr;gap:32px;}}
  @media(max-width:700px){.rv-verdict > div{grid-template-columns:1fr;gap:6px;}}
`
