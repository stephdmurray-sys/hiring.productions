/**
 * The "stage" design system for the review site (see DESIGN.md).
 *
 * Color with a job to do: indigo is the job seeker's side, coral the
 * hiring team's side, and every tool shows up as its real logo. Evidence
 * still reads like evidence (dated, sourced, tabular), but on white cards
 * on warm paper, with real color blocks where a visitor chooses a side.
 *
 * Still out (the AI-template tells from the de-AI pass): purple glow
 * gradients, glass blur, uppercase eyebrow labels, pill badges, hover
 * lifts, pulsing dots, tilted card stacks, stat-number rows.
 */
export const siteCss = `
  :root{
    --paper:#FAF8F3; --paper-2:#F2EEE4; --surface:#FFFFFF; --surface-2:#FCFBFF;
    --ink:#1A1A22; --ink-2:#4A4A5A; --ink-3:#62627A;
    --rule:#E6E2D8; --rule-2:#D3CDBF; --rule-soft:#F1EFE8;
    --indigo:#6C47FF; --indigo-text:#5432E0; --indigo-deep:#4B2BD6; --indigo-ink:#211457; --indigo-tint:#EEEAFF; --lavender:#A78BFA;
    --coral:#FF4F6A; --coral-text:#C42E48; --coral-deep:#2A0B14; --coral-tint:#FFE8EC;
    --ok:#157347; --ok-bright:#5EE6A8;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;
    --r:8px; --r-lg:14px;
    --shadow:0 1px 0 rgba(0,0,0,0.03),0 12px 32px rgba(30,20,80,0.08);
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  html{background:var(--paper);}
  body{background:var(--paper);color:var(--ink);font-family:inherit;font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}
  img{max-width:100%;}
  :focus-visible{outline:2px solid var(--indigo);outline-offset:3px;}
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}

  .wrap{max-width:1200px;margin:0 auto;padding-left:32px;padding-right:32px;}
  .narrow{max-width:880px;}
  .mono{font-family:var(--mono);font-size:0.82em;letter-spacing:0;}
  .muted{color:var(--ink-3);font-size:14px;}
  .faint{color:var(--ink-3);}
  .nowrap{white-space:nowrap;}
  .logo-img{display:inline-block;vertical-align:-3px;border-radius:3px;flex-shrink:0;}
  .dot-seekers,.dot-hiring{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:9px;vertical-align:1px;}
  .dot-seekers{background:var(--indigo);}
  .dot-hiring{background:var(--coral);}

  /* Logos: the real mark on a white tile, a lettermark underneath */
  .lg{position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:#fff;border:1px solid rgba(20,16,40,0.10);border-radius:10px;overflow:hidden;vertical-align:middle;}
  .lg-round{border-radius:50%;}
  .lg-letter{font-weight:800;color:#3A3550;line-height:1;}
  .lg img{position:absolute;inset:15%;width:70%;height:70%;object-fit:contain;background:#fff;}
  .lg-stack{display:inline-flex;align-items:center;}
  .lg-stack .lg{border:2px solid #fff;margin-right:-6px;}
  .lg-stack .lg:last-child{margin-right:0;}

  /* Type */
  h1,h2,h3{font-family:inherit;color:var(--ink);text-wrap:balance;}
  .ph h1,.display{font-weight:900;font-size:clamp(44px,6.6vw,84px);line-height:1.02;letter-spacing:-0.03em;}
  h2{font-weight:900;font-size:clamp(40px,6vw,64px);line-height:1.04;letter-spacing:-0.025em;margin-bottom:16px;}
  .h3{font-weight:800;font-size:clamp(22px,2.4vw,28px);line-height:1.2;letter-spacing:-0.01em;margin:56px 0 10px;}
  .lead{font-size:clamp(18px,1.6vw,20px);line-height:1.6;color:var(--ink-2);max-width:700px;}
  .sublead{font-size:16px;color:var(--ink-2);max-width:700px;}
  .footnote{font-size:14px;color:var(--ink-3);line-height:1.6;margin-top:16px;max-width:860px;}
  .footnote a,.tl{color:var(--indigo-text);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;}
  .tl,.footnote a{transition:text-underline-offset .18s ease,text-decoration-thickness .18s ease;}
  .tl:hover,.footnote a:hover{text-decoration-thickness:2px;text-underline-offset:5px;}
  .arr{display:inline-block;transition:transform .2s ease;}
  a:hover > .arr,a:focus-visible > .arr{transform:translateX(4px);}

  /* Tooltips on logo tiles and list tiles: the name and the number, on hover or keyboard focus */
  [data-tip]{position:relative;}
  @media (hover:hover){
    [data-tip]::after{content:attr(data-tip);position:absolute;left:50%;bottom:calc(100% + 8px);transform:translate(-50%,4px);opacity:0;pointer-events:none;background:var(--ink);color:#fff;font-size:13px;font-weight:700;line-height:1.35;padding:6px 10px;border-radius:6px;white-space:nowrap;z-index:20;transition:opacity .15s ease,transform .15s ease;}
    [data-tip]:hover::after,[data-tip]:focus-visible::after{opacity:1;transform:translate(-50%,0);}
  }
  @media (prefers-reduced-motion: reduce){.arr,[data-tip]::after,.tl{transition:none;}}
  .tl-strong{font-weight:700;}
  .hl-seekers{color:var(--indigo);}
  .hl-hiring{color:var(--coral-text);}

  /* Page header */
  .ph{padding:clamp(40px,6vw,80px) 0 clamp(32px,4vw,48px);border-bottom:1px solid var(--rule);}
  .crumbs{font-size:14px;color:var(--ink-3);margin-bottom:22px;}
  .crumbs a{text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--rule-2);}
  .dek{font-size:clamp(19px,1.8vw,22px);line-height:1.55;color:var(--ink-2);max-width:760px;margin-top:22px;}
  .dateline{font-family:var(--mono);font-size:13px;color:var(--ink-3);margin-top:22px;line-height:1.7;}
  .dateline a{color:var(--ink-2);text-decoration:underline;text-underline-offset:3px;}
  .disclosure{font-size:14px;color:var(--ink-3);margin-top:8px;max-width:780px;}
  .disclosure a{text-decoration:underline;text-underline-offset:3px;}
  .demo-note{background:#FFF6D6;border-bottom:1px solid #F0DE9C;font-size:14px;color:#5A4500;padding:10px 0;}
  .demo-note b{color:#3D2F00;}

  /* Sections */
  .sec{padding-top:clamp(96px,11vw,150px);scroll-margin-top:64px;}
  .sec-tight{padding-top:clamp(56px,7vw,88px);}

  /* Sticky in-page index */
  .toc-bar{position:sticky;top:0;z-index:25;background:rgba(250,248,243,0.97);border-bottom:1px solid var(--rule);}
  .toc-bar .wrap{display:flex;gap:26px;overflow-x:auto;scrollbar-width:none;}
  .toc-bar .wrap::-webkit-scrollbar{display:none;}
  .toc-bar a{flex-shrink:0;font-weight:700;font-size:14.5px;color:var(--ink-2);padding:14px 0;border-bottom:2px solid transparent;}
  .toc-bar a:hover{color:var(--indigo-text);border-bottom-color:var(--indigo);}

  /* Buttons: one per moment */
  .btn{display:inline-block;font-weight:800;font-size:16px;line-height:1;padding:16px 22px;border-radius:var(--r);background:var(--ink);color:#fff;border:0;cursor:pointer;}
  .btn:hover{background:#000;}
  .btn-indigo{background:var(--indigo);}
  .btn-indigo:hover{background:var(--indigo-deep);}
  .btn-coral{background:var(--coral);color:var(--coral-deep);}
  .btn-coral:hover{background:#FF3A59;}
  .btn-quiet{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--ink);}
  .btn-quiet:hover{background:var(--surface);}

  /* Cards */
  .card{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);}
  .card-lift{box-shadow:var(--shadow);}

  /* Tables: white card, logos in the name column */
  .tscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:28px;border:1px solid var(--rule);border-radius:var(--r-lg);background:var(--surface);}
  table{width:100%;border-collapse:collapse;font-size:15px;}
  .ledger{background:var(--surface);}
  .ledger th{text-align:left;font-weight:700;font-size:13px;color:var(--ink-2);padding:13px 14px 11px;background:var(--surface-2);border-bottom:1px solid var(--rule);vertical-align:bottom;white-space:nowrap;}
  .ledger td{padding:14px;border-bottom:1px solid var(--rule-soft);color:var(--ink-2);vertical-align:top;}
  .ledger tr:last-child td{border-bottom:0;}
  .ledger td.num,.ledger th.num{text-align:right;font-variant-numeric:tabular-nums;}
  .ledger td b{color:var(--ink);}
  .ledger .group td{padding-top:22px;color:var(--ink);font-weight:800;font-size:15px;background:var(--surface-2);border-bottom:1px solid var(--rule);}
  .tool-cell{white-space:nowrap;}
  .tool-cell a{font-weight:800;color:var(--ink);margin-left:10px;text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .tool-cell a:hover{text-decoration-color:var(--indigo);}
  .tscore{font-weight:900;color:var(--ink);font-variant-numeric:tabular-nums;}

  /* Stances: colored words */
  .stance{font-weight:800;font-size:14.5px;white-space:nowrap;}
  .stance-agrees{color:var(--ok);}
  .stance-breaks{color:var(--indigo-text);}
  .stance-thin{color:var(--ink-3);font-weight:600;font-style:italic;}

  /* Rows */
  .rows{border-top:1px solid var(--rule);margin-top:28px;}
  .row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:24px;padding:24px 0;border-bottom:1px solid var(--rule);}
  .row b,.row-title{font-weight:800;font-size:21px;line-height:1.3;color:var(--ink);}
  .row p{color:var(--ink-2);}
  .row .tl{display:inline-block;margin-top:6px;}

  /* Forms */
  .field{display:grid;gap:6px;font-weight:700;font-size:15px;color:var(--ink);}
  input,select,textarea{font:inherit;font-size:16px;}
  .input,.signup input,.vf input:not([type=radio]),.vf select,.vf textarea{width:100%;min-height:52px;border:1.5px solid var(--rule-2);border-radius:var(--r);padding:10px 14px;background:var(--surface);color:var(--ink);font-weight:400;}
  .signup input:focus,.vf input:focus,.vf select:focus,.vf textarea:focus{border-color:var(--indigo);outline:none;box-shadow:0 0 0 3px var(--indigo-tint);}
  .signup{display:flex;flex-wrap:wrap;gap:10px;max-width:560px;}
  .signup input{flex:1 1 240px;}
  .signup button{min-height:52px;}
  .signup-error{flex-basis:100%;font-size:15px;color:var(--coral-text);font-weight:700;}
  .signup-done{font-size:17px;font-weight:700;color:var(--ok);}

  /* Details (FAQ, evidence files, list of lists) */
  details > summary{list-style:none;cursor:pointer;}
  details > summary::-webkit-details-marker{display:none;}
  .faq{border-top:1px solid var(--rule);margin-top:28px;}
  .faq-item{border-bottom:1px solid var(--rule);}
  .faq-item summary{display:flex;justify-content:space-between;gap:20px;padding:20px 0;font-weight:800;font-size:19px;color:var(--ink);}
  .faq-item summary::after{content:"+";font-weight:400;font-size:26px;line-height:1;color:var(--indigo);}
  .faq-item[open] summary::after{content:"\\2212";}
  .faq-item p{color:var(--ink-2);padding:0 0 22px;max-width:760px;}

  /* The ink band (findings ticker) */
  .ticker{background:var(--ink);color:#fff;overflow:hidden;white-space:nowrap;border-radius:var(--r);}
  .ticker-track{display:inline-flex;gap:56px;padding:15px 0;animation:tk 60s linear infinite;font-family:var(--mono);font-size:14px;}
  .ticker:hover .ticker-track{animation-play-state:paused;}
  .ticker-track b{color:#FF9DAE;font-weight:700;}
  .ticker-track i{font-style:normal;color:#C4B5FF;}
  @keyframes tk{to{transform:translateX(-50%);}}
  @media (prefers-reduced-motion: reduce){.ticker-track{animation:none;}.ticker{overflow-x:auto;}}

  @media(max-width:760px){
    .wrap{padding-left:18px;padding-right:18px;}
    .row{grid-template-columns:1fr;gap:6px;}
    body{font-size:16.5px;}
  }
`
