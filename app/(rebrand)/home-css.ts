/**
 * Homepage layer on the evidence-desk system. Indigo and coral appear
 * only as small marks for each side of the table.
 */
export const homeCss = `
  .home-ph{padding-top:clamp(48px,7vw,96px);}
  .home-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,0.95fr);gap:56px;align-items:start;margin-top:36px;}
  .home-grid .dek{margin-top:0;}

  .doors{margin-top:30px;border-top:1px solid var(--ink);}
  .door{display:grid;grid-template-columns:1fr auto;gap:2px 16px;padding:18px 0;border-bottom:1px solid var(--rule);}
  .door-k{font-weight:800;font-size:22px;color:var(--ink);}
  .door-d{grid-column:1;color:var(--ink-2);font-size:16px;}
  .door-arr{grid-column:2;grid-row:1 / span 2;align-self:center;font-size:24px;color:var(--ink-3);}
  .door:hover .door-k{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px;}
  .door:hover .door-arr{color:var(--ink);}

  /* The receipt: a flat slip, ruled, set like a printout */
  .receipt{background:var(--surface);border:1px solid var(--ink);padding:22px 24px 18px;}
  .receipt-h{font-weight:800;font-size:15px;padding-bottom:12px;border-bottom:1px dashed var(--rule-2);}
  .receipt dl div{display:grid;grid-template-columns:110px 1fr;gap:14px;padding:13px 0;border-bottom:1px dashed var(--rule-2);font-size:15px;}
  .receipt dt{font-weight:800;color:var(--ink);}
  .receipt dd{color:var(--ink-2);}
  .receipt dd b{color:var(--coral-text);font-weight:800;}
  .receipt-foot{font-family:var(--mono);font-size:12.5px;color:var(--ink-3);padding-top:12px;}

  .picks-table .pick-cell{color:var(--ink);font-weight:600;white-space:nowrap;}
  .picks-table td:nth-child(3){min-width:280px;}

  .split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:start;}
  .split-radar{grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);}
  .h2-small{font-size:clamp(32px,4vw,44px);}
  .prose p{color:var(--ink-2);margin-bottom:16px;max-width:620px;}
  .prose p:first-child{font-size:clamp(19px,1.8vw,22px);color:var(--ink);line-height:1.5;}

  .tally td{color:var(--ink);}
  .tally .bar{display:block;height:4px;background:var(--paper-2);margin-top:8px;max-width:260px;}
  .tally .bar i{display:block;height:100%;background:var(--ink-3);}
  .tally .tally-counts td{font-weight:800;}
  .tally .tally-counts .bar i{background:var(--ok);}

  .guide-row{grid-template-columns:minmax(0,0.8fr) minmax(0,2fr);align-items:baseline;}
  .guide-row > span:first-child{font-weight:700;color:var(--ink-2);font-size:15px;}
  .guide-date{display:block;color:var(--ink-3);margin-top:4px;font-weight:400;}
  .guide-d{display:block;color:var(--ink-2);margin-top:4px;}
  .guide-row:hover .row-title{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px;}

  .radar-list{list-style:none;border-top:1px solid var(--ink);margin-top:16px;}
  .radar-list li{display:flex;align-items:center;gap:10px;padding:14px 0;border-bottom:1px solid var(--rule);color:var(--ink-2);}
  .radar-list b{color:var(--ink);}

  .signup-block{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;border-top:2px solid var(--ink);padding-top:36px;}

  @media(max-width:960px){
    .home-grid,.split,.split-radar,.signup-block{grid-template-columns:1fr;gap:32px;}
  }
  @media(max-width:760px){
    .picks-table thead{display:none;}
    .picks-table,.picks-table tbody,.picks-table tr,.picks-table td{display:block;}
    .picks-table tr{padding:14px 0;border-bottom:1px solid var(--rule);}
    .picks-table td{padding:2px 0 !important;border:0 !important;min-width:0 !important;}
    .picks-table .group td{padding-top:20px !important;padding-bottom:8px !important;border-bottom:1px solid var(--ink) !important;}
    .picks-table td.num{display:inline-block;text-align:left;margin:6px 18px 0 0;}
    .picks-table td.num:nth-child(4)::before{content:"Overall ";font-weight:400;color:var(--ink-3);}
    .picks-table td.num:nth-child(5)::before{content:"Users ";color:var(--ink-3);}
    .picks-table .pick-cell{font-size:14px;color:var(--ink-3);}
    .picks-table .tool-cell a{margin-left:6px;font-size:19px;}
    .guide-row{grid-template-columns:1fr;}
    .receipt dl div{grid-template-columns:1fr;gap:2px;}
  }
`
