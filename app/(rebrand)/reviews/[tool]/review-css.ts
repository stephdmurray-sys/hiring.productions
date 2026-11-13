export const reviewCss = `
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
  .meter{display:grid;grid-template-columns:92px minmax(0,1fr) 34px;gap:4px 12px;align-items:center;}
  .meter-l{font-weight:700;font-size:14.5px;}
  .meter-bar{height:8px;background:#F0EEF7;border-radius:4px;overflow:hidden;}
  .meter-bar i{display:block;height:100%;background:var(--indigo);border-radius:4px;}
  .meter b{font-weight:900;text-align:right;font-variant-numeric:tabular-nums;}
  .meter-n{grid-column:2 / -1;font-size:12.5px;color:var(--ink-3);margin-top:-2px;}
  .rv-stance{padding-top:12px;border-top:1px solid var(--rule-soft);}

  .rv-verdict{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;}
  .rv-verdict > div{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:24px;border-left:4px solid var(--indigo);}
  .rv-verdict > div.rv-watch{border-left-color:var(--coral);}
  .rv-h2{font-size:22px;font-weight:900;letter-spacing:-0.01em;margin-bottom:8px;}
  .rv-verdict p{color:var(--ink-2);}
  .rv-warn{color:var(--coral-text);}
  .rv-cost td{vertical-align:middle;}
  .rv-cost .rv-forget{color:var(--coral-text);font-weight:800;}

  .rv-lists{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:32px;}
  .rv-list{display:flex;gap:14px;align-items:flex-start;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:18px;}
  .rv-list:hover b{text-decoration:underline;text-underline-offset:3px;}
  .rv-list.counts{box-shadow:inset 0 0 0 1px #BFE6CF;border-color:#BFE6CF;}
  .rv-list b{display:block;font-size:17px;font-weight:800;}
  .rv-list-t{display:block;font-size:14.5px;color:var(--ink-2);line-height:1.4;margin-top:2px;}
  .rv-list-s{display:block;font-size:13px;color:var(--ink-3);margin-top:6px;font-weight:700;}
  .rv-list-s.ok{color:var(--ok);}
  .rv-empty{grid-column:1 / -1;font-size:17px;color:var(--ink-2);}

  .rv-signup{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;background:var(--indigo-tint);border-radius:var(--r-lg);padding:clamp(28px,4vw,48px);}
  .rv-signup h2{font-size:clamp(30px,3.6vw,42px);margin-bottom:8px;}

  @media(max-width:960px){.rv-head,.rv-signup{grid-template-columns:1fr;gap:32px;}}
  @media(max-width:700px){.rv-verdict,.rv-lists{grid-template-columns:1fr;}}
`
