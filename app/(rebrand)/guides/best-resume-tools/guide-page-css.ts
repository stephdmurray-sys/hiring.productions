/** Resume guide layer on the evidence-desk system. */
export const guidePageCss = `
  /* Picks: newspaper columns divided by rules, no cards */
  .picks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:36px;border-top:2px solid var(--ink);}
  .pick{display:flex;flex-direction:column;padding:22px 26px 6px 0;}
  .pick + .pick{padding-left:26px;border-left:1px solid var(--rule);}
  .pick-label{font-weight:700;font-size:15px;color:var(--ink-2);margin-bottom:10px;}
  .pick-name{display:flex;align-items:center;gap:10px;font-weight:800;font-size:clamp(26px,2.6vw,32px);letter-spacing:-0.01em;line-height:1.1;margin-bottom:12px;}
  .pick-line{color:var(--ink-2);margin-bottom:14px;}
  .pick-facts{font-family:var(--mono);font-size:13px;color:var(--ink-3);margin:0 0 12px;}
  .pick-rising .pick-label{color:var(--indigo-text);}
  .pick-quote{font-size:19px;line-height:1.5;color:var(--ink);margin-bottom:10px;}
  .pick-sig{font-size:14px;color:var(--ink-2);font-weight:600;margin-bottom:14px;}

  /* Agreement table */
  .agree-grid th.col-list,.agree-grid td.cell{text-align:center;}
  .agree-grid th.col-list span{display:block;font-weight:400;color:var(--ink-3);margin-top:2px;}
  .agree-grid td.cell b{color:var(--ink);}

  .owner{margin-top:8px;}
  .lists-details{margin-top:40px;border-top:1px solid var(--ink);border-bottom:1px solid var(--rule);}
  .lists-details > summary{padding:18px 0;font-weight:700;font-size:17px;display:flex;justify-content:space-between;gap:16px;}
  .lists-details > summary::after{content:"+";font-weight:400;font-size:24px;line-height:1;color:var(--ink-3);}
  .lists-details[open] > summary::after{content:"\\2212";}
  .lists-details .tscroll{margin-top:0;}
  .lists-details .footnote{margin-bottom:22px;}

  /* Cost chart: flat bars, ink by default, coral for 4-week billing */
  .cost-chart{margin-top:32px;border-top:2px solid var(--ink);border-bottom:1px solid var(--ink);}
  .cost-row{display:grid;grid-template-columns:170px minmax(0,1fr) 110px;grid-template-areas:"name track amt" ". how how";align-items:center;column-gap:18px;padding:12px 0;border-bottom:1px solid var(--rule);}
  .cost-row:last-child{border-bottom:0;}
  .cost-name{grid-area:name;display:flex;align-items:center;gap:9px;font-weight:700;color:var(--ink);font-size:16px;}
  .cost-track{grid-area:track;height:10px;background:var(--paper-2);}
  .cost-track i{display:block;height:100%;background:var(--ink-3);}
  .cost-trap .cost-track i{background:var(--coral);}
  .cost-amt{grid-area:amt;text-align:right;font-weight:800;font-size:17px;color:var(--ink);font-variant-numeric:tabular-nums;}
  .cost-trap .cost-amt{color:var(--coral-text);}
  .cost-how{grid-area:how;font-size:14px;color:var(--ink-3);margin-top:3px;}
  .cost-how b{color:var(--coral-text);font-weight:700;}
  .boxnote{margin-top:28px;border:1px solid var(--ink);background:var(--surface);padding:18px 22px;color:var(--ink-2);max-width:860px;}
  .boxnote b{color:var(--ink);}

  /* Videos */
  .vid-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px 24px;margin-top:32px;}
  .vid{margin:0;}
  .vid iframe{display:block;width:100%;aspect-ratio:16/9;border:0;}
  .vfacade{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;cursor:pointer;background-color:var(--ink);background-size:cover;background-position:center;}
  .vplay{position:absolute;left:14px;bottom:14px;width:44px;height:44px;border-radius:50%;background:var(--paper);display:flex;align-items:center;justify-content:center;}
  .vfacade:hover .vplay{background:#fff;}
  .vid figcaption{display:grid;gap:3px;padding-top:12px;border-top:2px solid var(--ink);margin-top:10px;font-size:15px;}
  .vid figcaption b{font-size:17px;font-weight:800;}
  .vid-kind{font-weight:700;color:var(--ink-2);font-size:14px;}
  .vid-title{color:var(--ink-2);}
  .vid .mono{font-size:12px;margin-top:4px;}

  /* Evidence files: ruled rows that open */
  .efiles{margin-top:32px;border-top:2px solid var(--ink);}
  .efile{border-bottom:1px solid var(--rule);scroll-margin-top:72px;}
  .efile > summary{display:grid;grid-template-columns:110px minmax(0,1fr) 64px 200px 24px;align-items:center;gap:16px;padding:18px 0;}
  .efile > summary:hover .ef-name{text-decoration:underline;text-underline-offset:4px;}
  .ef-rank{font-family:var(--mono);font-size:13px;color:var(--ink-3);}
  .ef-name{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px;color:var(--ink);}
  .ef-score{font-weight:800;font-size:18px;text-align:right;font-variant-numeric:tabular-nums;}
  .ef-toggle::after{content:"+";font-size:24px;line-height:1;color:var(--ink-3);}
  .efile[open] .ef-toggle::after{content:"\\2212";}
  .efile[open]{border-bottom-color:var(--ink);}
  .ef-body{padding:0 0 30px;}
  .ef-call{font-size:clamp(18px,1.6vw,21px);line-height:1.5;color:var(--ink);max-width:820px;margin-bottom:22px;}
  .ef-grid{display:grid;grid-template-columns:minmax(0,0.75fr) minmax(0,2fr);gap:40px;align-items:start;}
  .sbars{display:grid;gap:12px;border-top:1px solid var(--ink);padding-top:14px;}
  .sbar{display:grid;grid-template-columns:110px minmax(0,1fr) 44px;align-items:center;gap:10px;font-size:14px;color:var(--ink-2);}
  .sbar-track{height:6px;background:var(--paper-2);}
  .sbar-track i{display:block;height:100%;background:var(--ink);}
  .sbar b{text-align:right;font-variant-numeric:tabular-nums;color:var(--ink);}
  .facts{display:grid;grid-template-columns:1fr 1fr;gap:22px 32px;}
  .facts > div{border-top:1px solid var(--ink);padding-top:12px;}
  .facts dt{font-weight:800;font-size:15px;color:var(--ink);margin-bottom:6px;}
  .facts dd{font-size:15px;color:var(--ink-2);}
  .facts ul{list-style:none;margin:6px 0;}
  .facts li{margin-bottom:4px;}
  .facts p{margin-bottom:4px;}
  .flag{color:var(--coral-text);font-weight:700;}
  .verdict{display:grid;gap:0;margin-top:26px;border-top:1px solid var(--ink);}
  .verdict > div{display:grid;grid-template-columns:130px minmax(0,1fr);gap:16px;padding:12px 0;border-bottom:1px solid var(--rule);}
  .verdict dt{font-weight:800;color:var(--ink);font-size:15px;}
  .verdict dd{color:var(--ink-2);}
  .ef-visit{display:inline-block;margin-top:18px;}
  .refresh-log{list-style:none;margin-top:24px;font-size:14px;color:var(--ink-2);}
  .refresh-log li{margin-bottom:6px;}
  .refresh-log .mono{color:var(--ink-3);margin-right:8px;}

  @media(max-width:900px){
    .picks{grid-template-columns:1fr;}
    .pick,.pick + .pick{padding:22px 0;border-left:0;border-bottom:1px solid var(--rule);}
    .vid-grid{grid-template-columns:1fr;}
    .ef-grid,.facts{grid-template-columns:1fr;gap:20px;}
  }
  @media(max-width:760px){
    .efile > summary{grid-template-columns:minmax(0,1fr) auto 20px;grid-template-areas:"name score toggle" "rank stance stance";row-gap:4px;}
    .ef-name{grid-area:name;font-size:18px;}
    .ef-score{grid-area:score;}
    .ef-toggle{grid-area:toggle;}
    .ef-rank{grid-area:rank;}
    .efile > summary .stance{grid-area:stance;justify-self:end;}
    .cost-row{grid-template-columns:110px minmax(0,1fr) 84px;column-gap:10px;}
    .cost-name{font-size:14.5px;}
    .verdict > div{grid-template-columns:1fr;gap:2px;}
  }
`
