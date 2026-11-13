/**
 * The "evidence desk" design system for the review site.
 *
 * Built from what the site is: a desk that reads public evidence and
 * prints its receipts. So it looks like a report, not a template:
 * paper and ink, hairline rules, real tables, small radii, figures and
 * dates set like receipts, and brand indigo/coral used only as marks.
 *
 * Deliberately absent (the common tells of AI-generated design, and
 * banned by CLAUDE.md's five rules): gradients, glows, dark hero
 * bands, glass blur, uppercase eyebrow labels, pill badges, big rounded
 * cards, drop shadows, hover lifts, pulsing dots, stat-number rows,
 * three-equal-card grids.
 */
export const siteCss = `
  :root{
    --paper:#FAF8F3; --paper-2:#F2EEE4; --surface:#FFFFFF;
    --ink:#1A1A22; --ink-2:#4A4A5A; --ink-3:#77778A;
    --rule:#E3DED2; --rule-2:#CFC8B8;
    --indigo:#6C47FF; --indigo-text:#5432E0;
    --coral:#FF4F6A; --coral-text:#C42E48;
    --ok:#1F8A55;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
    --r:3px;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html{background:var(--paper);}
  body{background:var(--paper);color:var(--ink);font-family:inherit;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}
  img{max-width:100%;}
  :focus-visible{outline:2px solid var(--indigo);outline-offset:3px;}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}

  .wrap{max-width:1160px;margin:0 auto;padding-left:32px;padding-right:32px;}
  .narrow{max-width:880px;}
  .mono{font-family:var(--mono);font-size:0.82em;letter-spacing:0;}
  .muted{color:var(--ink-3);font-size:14px;}
  .faint{color:var(--ink-3);}
  .nowrap{white-space:nowrap;}
  .logo-img{display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;}
  .dot-seekers,.dot-hiring{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:9px;vertical-align:1px;}
  .dot-seekers{background:var(--indigo);}
  .dot-hiring{background:var(--coral);}

  /* Type */
  h1,h2,h3{font-family:inherit;color:var(--ink);text-wrap:balance;}
  .ph h1,.display{font-weight:800;font-size:clamp(44px,7vw,88px);line-height:1;letter-spacing:-0.025em;}
  h2{font-weight:800;font-size:clamp(40px,6vw,64px);line-height:1.04;letter-spacing:-0.02em;margin-bottom:18px;}
  .h3{font-weight:800;font-size:clamp(22px,2.4vw,28px);line-height:1.2;letter-spacing:-0.01em;margin:56px 0 10px;}
  .lead{font-size:clamp(18px,1.6vw,20px);line-height:1.6;color:var(--ink-2);max-width:700px;}
  .sublead{font-size:16px;color:var(--ink-2);max-width:700px;}
  .footnote{font-size:14px;color:var(--ink-3);line-height:1.6;margin-top:16px;max-width:860px;}
  .footnote a,.tl{color:var(--indigo-text);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}
  .tl:hover,.footnote a:hover{text-decoration-thickness:2px;}
  .tl-strong{font-weight:700;}

  /* Page header: paper, a heavy rule under it, no band */
  .ph{padding:clamp(40px,6vw,80px) 0 clamp(32px,4vw,48px);border-bottom:2px solid var(--ink);}
  .crumbs{font-size:14px;color:var(--ink-3);margin-bottom:22px;}
  .crumbs a{text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--rule-2);}
  .dek{font-size:clamp(19px,1.8vw,23px);line-height:1.5;color:var(--ink-2);max-width:760px;margin-top:22px;}
  .dateline{font-family:var(--mono);font-size:13px;color:var(--ink-3);margin-top:22px;line-height:1.7;}
  .dateline a{color:var(--ink-2);text-decoration:underline;text-underline-offset:3px;}
  .disclosure{font-size:14px;color:var(--ink-3);margin-top:8px;max-width:780px;}
  .disclosure a{text-decoration:underline;text-underline-offset:3px;}
  .demo-note{background:var(--paper-2);border-bottom:1px solid var(--rule);font-size:14px;color:var(--ink-2);padding:12px 0;}
  .demo-note b{color:var(--ink);}

  /* Sections: spacing varies with weight, set per section */
  .sec{padding-top:clamp(72px,9vw,120px);scroll-margin-top:64px;}
  .sec-tight{padding-top:clamp(48px,6vw,72px);}

  /* Sticky in-page index: solid paper, hairline, plain links */
  .toc-bar{position:sticky;top:0;z-index:25;background:var(--paper);border-bottom:1px solid var(--rule);}
  .toc-bar .wrap{display:flex;gap:26px;overflow-x:auto;scrollbar-width:none;}
  .toc-bar .wrap::-webkit-scrollbar{display:none;}
  .toc-bar a{flex-shrink:0;font-weight:600;font-size:14.5px;color:var(--ink-2);padding:14px 0;border-bottom:2px solid transparent;}
  .toc-bar a:hover{color:var(--ink);border-bottom-color:var(--ink);}

  /* Buttons: rectangular, solid ink; one per moment */
  .btn{display:inline-block;font-weight:700;font-size:16px;line-height:1;padding:15px 22px;border-radius:var(--r);background:var(--ink);color:var(--paper);border:1.5px solid var(--ink);cursor:pointer;}
  .btn:hover{background:#000;}
  .btn-quiet{background:transparent;color:var(--ink);}
  .btn-quiet:hover{background:var(--surface);}

  /* Ledger tables */
  .tscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:28px;}
  table{width:100%;border-collapse:collapse;font-size:15px;}
  .ledger{border-top:2px solid var(--ink);border-bottom:1px solid var(--ink);background:transparent;}
  .ledger th{text-align:left;font-weight:700;font-size:13px;color:var(--ink-2);padding:12px 12px 10px 0;border-bottom:1px solid var(--ink);vertical-align:bottom;white-space:nowrap;}
  .ledger td{padding:14px 12px 14px 0;border-bottom:1px solid var(--rule);color:var(--ink-2);vertical-align:top;}
  .ledger tr:last-child td{border-bottom:0;}
  .ledger td.num,.ledger th.num{text-align:right;font-variant-numeric:tabular-nums;}
  .ledger td b{color:var(--ink);}
  .ledger .group td{padding-top:26px;color:var(--ink);font-weight:800;font-size:15px;border-bottom:1px solid var(--ink);}
  .tool-cell{white-space:nowrap;}
  .tool-cell a{font-weight:700;color:var(--ink);margin-left:8px;text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .tool-cell a:hover{text-decoration-color:var(--ink);}
  .tscore{font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums;}

  /* Stances: words, not pills */
  .stance{font-weight:700;font-size:14.5px;white-space:nowrap;}
  .stance-agrees{color:var(--ink);}
  .stance-breaks{color:var(--indigo-text);}
  .stance-thin{color:var(--ink-3);font-weight:600;font-style:italic;}

  /* Rows: lists separated by hairlines instead of cards */
  .rows{border-top:1px solid var(--ink);margin-top:28px;}
  .row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:24px;padding:22px 0;border-bottom:1px solid var(--rule);}
  .row b,.row-title{font-weight:800;font-size:20px;line-height:1.3;color:var(--ink);}
  .row p{color:var(--ink-2);}
  .row .tl{display:inline-block;margin-top:6px;}

  /* Forms */
  .field{display:grid;gap:6px;font-weight:700;font-size:15px;color:var(--ink);}
  input,select,textarea{font:inherit;font-size:16px;}
  .input,.signup input,.vf input:not([type=radio]),.vf select,.vf textarea{width:100%;min-height:50px;border:1.5px solid var(--ink);border-radius:var(--r);padding:10px 14px;background:var(--surface);color:var(--ink);font-weight:400;}
  .signup{display:flex;flex-wrap:wrap;gap:10px;max-width:560px;}
  .signup input{flex:1 1 240px;}
  .signup button{min-height:50px;}
  .signup-error{flex-basis:100%;font-size:15px;color:var(--coral-text);font-weight:700;}
  .signup-done{font-size:17px;font-weight:700;color:var(--ok);}

  /* Details (FAQ, evidence files, list of lists) */
  details > summary{list-style:none;cursor:pointer;}
  details > summary::-webkit-details-marker{display:none;}
  .faq{border-top:1px solid var(--ink);margin-top:28px;}
  .faq-item{border-bottom:1px solid var(--rule);}
  .faq-item summary{display:flex;justify-content:space-between;gap:20px;padding:20px 0;font-weight:700;font-size:19px;color:var(--ink);}
  .faq-item summary::after{content:"+";font-weight:400;font-size:24px;line-height:1;color:var(--ink-3);}
  .faq-item[open] summary::after{content:"\\2212";}
  .faq-item p{color:var(--ink-2);padding:0 0 22px;max-width:760px;}

  @media(max-width:760px){
    .wrap{padding-left:18px;padding-right:18px;}
    .row{grid-template-columns:1fr;gap:6px;}
    body{font-size:16.5px;}
  }
`
