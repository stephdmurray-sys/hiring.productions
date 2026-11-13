/** Resume guide layer on the stage system. */
export const guidePageCss = `
  /* Picks: cards with the side's color on top; Stephanie's pick in indigo */
  .picks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:36px;}
  .pick{display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--rule);border-top:4px solid var(--indigo);border-radius:var(--r-lg);padding:24px;}
  .pick-label{font-weight:800;font-size:14.5px;color:var(--indigo-text);margin-bottom:12px;}
  .pick-name{display:flex;align-items:center;gap:12px;font-weight:900;font-size:clamp(26px,2.6vw,32px);letter-spacing:-0.02em;line-height:1.1;margin-bottom:12px;}
  .pick-line{color:var(--ink-2);margin-bottom:14px;}
  .pick-facts{font-family:var(--mono);font-size:13px;color:var(--ink-3);margin:auto 0 12px;padding-top:6px;}
  .pick-rising{background:var(--indigo);border-color:var(--indigo);color:#fff;}
  .pick-rising .pick-label{color:#DCD3FF;}
  .pick-rising .pick-name{color:#fff;}
  .pick-rising .pick-facts{color:#DCD3FF;}
  .pick-rising .tl{color:#fff;}
  .pick-quote{font-size:18.5px;line-height:1.5;color:#fff;margin-bottom:10px;}
  .pick-sig{font-size:14px;color:#DCD3FF;font-weight:600;margin-bottom:14px;}

  /* Agreement table */
  .agree-grid th.col-list,.agree-grid td.cell{text-align:center;}
  .agree-grid th.col-list span{display:block;font-weight:400;color:var(--ink-3);margin-top:2px;}
  .agree-grid td.cell b{color:var(--ok);font-weight:900;}

  .owner{margin-top:8px;}
  .lists-details{margin-top:40px;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:0 22px;}
  .lists-details > summary{padding:18px 0;font-weight:800;font-size:17px;display:flex;justify-content:space-between;gap:16px;}
  .lists-details > summary::after{content:"+";font-weight:400;font-size:26px;line-height:1;color:var(--indigo);}
  .lists-details[open] > summary::after{content:"\\2212";}
  .lists-details .tscroll{margin-top:0;}
  .lists-details .footnote{margin-bottom:22px;}

  .boxnote{margin-top:28px;background:var(--coral-tint);border-radius:var(--r-lg);padding:20px 24px;color:var(--ink-2);max-width:900px;}
  .boxnote b{color:var(--coral-text);}

  .vid-check{display:block;font-size:12px;margin-top:4px;}

  /* Evidence files: rows that open */
  .efiles{margin-top:32px;background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);overflow:hidden;}
  .efile{border-bottom:1px solid var(--rule-soft);scroll-margin-top:72px;}
  .efile:last-child{border-bottom:0;}
  .efile > summary{display:grid;grid-template-columns:110px minmax(0,1fr) 64px 200px 24px;align-items:center;gap:16px;padding:16px 22px;}
  .efile > summary:hover{background:var(--surface-2);}
  .efile > summary:hover .ef-name{text-decoration:underline;text-underline-offset:4px;}
  .ef-rank{font-family:var(--mono);font-size:13px;color:var(--ink-3);}
  .ef-name{display:flex;align-items:center;gap:12px;font-weight:800;font-size:20px;color:var(--ink);}
  .ef-score{font-weight:900;font-size:18px;text-align:right;font-variant-numeric:tabular-nums;}
  .ef-toggle::after{content:"+";font-size:26px;line-height:1;color:var(--indigo);}
  .efile[open] .ef-toggle::after{content:"\\2212";}
  .efile[open] > summary{background:var(--surface-2);border-bottom:1px solid var(--rule-soft);}
  .ef-body{padding:24px 22px 30px;}
  .ef-call{font-size:clamp(18px,1.6vw,21px);line-height:1.5;color:var(--ink);max-width:820px;margin-bottom:22px;}
  .ef-grid{display:grid;grid-template-columns:minmax(0,0.75fr) minmax(0,2fr);gap:40px;align-items:start;}
  .sbars{display:grid;gap:12px;}
  .sbar{display:grid;grid-template-columns:110px minmax(0,1fr) 44px;align-items:center;gap:10px;font-size:14px;color:var(--ink-2);}
  .sbar-track{height:8px;background:#F0EEF7;border-radius:4px;overflow:hidden;}
  .sbar-track i{display:block;height:100%;background:var(--indigo);border-radius:4px;}
  .sbar b{text-align:right;font-variant-numeric:tabular-nums;color:var(--ink);font-weight:900;}
  .facts{display:grid;grid-template-columns:1fr 1fr;gap:22px 32px;}
  .facts > div{border-top:1px solid var(--rule);padding-top:12px;}
  .facts dt{font-weight:800;font-size:15px;color:var(--ink);margin-bottom:6px;}
  .facts dd{font-size:15px;color:var(--ink-2);}
  .facts ul{list-style:none;margin:6px 0;}
  .facts li{margin-bottom:4px;}
  .facts p{margin-bottom:4px;}
  .flag{color:var(--coral-text);font-weight:700;}
  .verdict{display:grid;gap:0;margin-top:26px;border-top:1px solid var(--rule);}
  .verdict > div{display:grid;grid-template-columns:130px minmax(0,1fr);gap:16px;padding:12px 0;border-bottom:1px solid var(--rule-soft);}
  .verdict dt{font-weight:800;color:var(--ink);font-size:15px;}
  .verdict dd{color:var(--ink-2);}
  .ef-visit{display:inline-block;margin-top:18px;}
  .refresh-log{list-style:none;margin-top:24px;font-size:14px;color:var(--ink-2);}
  .refresh-log li{margin-bottom:6px;}
  .refresh-log .mono{color:var(--ink-3);margin-right:8px;}

  @media(max-width:900px){
    .picks{grid-template-columns:1fr;}
    .ef-grid,.facts{grid-template-columns:1fr;gap:20px;}
  }
  @media(max-width:760px){
    .efile > summary{grid-template-columns:minmax(0,1fr) auto 20px;grid-template-areas:"name score toggle" "rank stance stance";row-gap:4px;padding:14px 16px;}
    .ef-name{grid-area:name;font-size:18px;}
    .ef-score{grid-area:score;}
    .ef-toggle{grid-area:toggle;}
    .ef-rank{grid-area:rank;}
    .efile > summary .stance{grid-area:stance;justify-self:end;}
    .ef-body{padding:20px 16px 26px;}
    .verdict > div{grid-template-columns:1fr;gap:2px;}
  }
`
