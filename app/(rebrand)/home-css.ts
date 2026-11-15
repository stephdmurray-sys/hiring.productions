/**
 * Homepage layer on the stage system: the both-sides split, the
 * scoreboard tabs, the publisher band and the guide rows.
 */
export const homeCss = `
  .hero{padding-top:clamp(48px,6.5vw,88px);}
  .hero-tag{display:inline-block;margin:0 0 22px;padding:7px 14px 6px;font-size:15px;font-weight:800;letter-spacing:.02em;color:var(--ink);background:#fff;border:2px solid var(--ink);border-radius:999px;box-shadow:3px 3px 0 var(--ink);}
  .hero-h1{font-size:clamp(40px,5.6vw,72px);text-wrap:balance;}
  .hero-hl{color:var(--indigo);}
  @media(min-width:900px){.hero-l1,.hero-l2{display:block;white-space:nowrap;}}
  .hero .dek{max-width:680px;text-wrap:pretty;}

  /* Both sides: one indigo half, one coral half */
  .hero{overflow-x:clip;}
  .sides{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:44px;margin-top:56px;}
  .lane{position:relative;display:flex;}
  .lane > .side{position:relative;z-index:2;flex:1;}
  .lane .lane-tl{top:-28px;left:-30px;}
  .lane .lane-bl{bottom:-38px;left:30px;}
  .lane .lane-tr{top:-30px;right:34px;}
  .lane .lane-br{bottom:-30px;right:-30px;}
  .lane-seekers .m-dots{color:var(--lavender);}
  .lane-seekers .m-zig{color:var(--coral);}
  .lane-hiring .m-squig{color:var(--indigo);}
  .lane-hiring .m-dots{color:var(--coral);}
  .side{padding:34px 34px 32px;display:flex;flex-direction:column;gap:20px;border:3px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--ink);}
  .side-act{margin-top:auto;padding-top:8px;display:flex;flex-direction:column;align-items:flex-start;gap:14px;}
  .side-all{font-size:15px;font-weight:700;color:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1.5px;}
  .side-all:hover{text-decoration-thickness:2.5px;}
  .hero-fine{margin-top:44px;text-align:center;font-size:14px;line-height:1.6;color:var(--ink-2);}
  .hero-fine p{text-wrap:balance;}
  .hero-fine p + p{margin-top:2px;}
  .hero-fine a{color:inherit;text-decoration:underline;text-underline-offset:3px;}
  .hero-fine a:hover{color:var(--ink);}
  .side-seekers{background:var(--indigo);color:#fff;}
  .side-hiring{background:var(--coral);color:var(--coral-deep);}
  .side-k{display:inline-flex;align-self:flex-start;align-items:center;gap:9px;font-size:15px;font-weight:800;padding:8px 16px 8px 13px;border-radius:999px;background:#fff;border:2px solid var(--ink);box-shadow:3px 3px 0 var(--ink);}
  .side-seekers .side-k{color:var(--indigo-text);}
  .side-hiring .side-k{color:var(--coral-text);}
  .side-k i{width:9px;height:9px;border-radius:50%;background:currentColor;}
  .side h2{font-size:clamp(30px,3.2vw,42px);font-weight:900;letter-spacing:-0.02em;line-height:1.06;margin:0;color:inherit;text-wrap:balance;}
  .side-logos{display:flex;flex-wrap:wrap;gap:8px;}
  .side-logos .lg{width:46px !important;height:46px !important;}
  .side-logos a{display:inline-flex;border-radius:12px;}
  .side-logos .lg{border:2px solid var(--ink);box-shadow:3px 3px 0 var(--ink);border-radius:12px;transition:transform .12s ease,box-shadow .12s ease;}
  .side-logos a:hover .lg{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--ink);}
  .side-feature{margin-top:auto;display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;padding:18px;border-radius:12px;}
  .side-seekers .side-feature{background:rgba(20,8,80,0.28);}
  .side-hiring .side-feature{background:rgba(255,255,255,0.3);}
  .side-feature b{display:block;font-size:20px;font-weight:800;line-height:1.25;}
  .side-feature span{font-size:15px;line-height:1.45;}
  .side-go{display:inline-flex;align-self:flex-start;font-weight:800;font-size:16px;padding:14px 20px;border-radius:var(--r);border:2px solid var(--ink);box-shadow:4px 4px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease;}
  .side-go:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink);}
  .side-go .arr{display:inline-block;margin-left:4px;animation:go-nudge 2.6s ease-in-out 1.8s infinite;}
  @keyframes go-nudge{0%,70%,100%{transform:translateX(0);}80%{transform:translateX(5px);}90%{transform:translateX(1px);}}
  @media (prefers-reduced-motion: reduce){.side-go .arr{animation:none;}}
  .side-seekers .side-go{background:#fff;color:var(--indigo-deep);}
  .side-seekers .side-go:hover{background:#F1EDFF;}
  .side-hiring .side-go{background:var(--coral-deep);color:#fff;}
  .side-hiring .side-go:hover{background:#000;}
  .side :focus-visible{outline-color:#fff;}
  .side-hiring :focus-visible{outline-color:var(--coral-deep);}
  .hero .ticker{margin-top:56px;}

  /* Section heads with the action on the right */
  .sec-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;}
  .sec-head .lead{margin-top:4px;}

  /* Scoreboard tabs: plain text tabs, one board visible */
  .boards{margin-top:36px;}
  .board-tabs{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;}
  .board-tabs label{font-weight:800;font-size:16px;padding:10px 18px 10px 15px;border-radius:999px;cursor:pointer;display:flex;align-items:center;gap:9px;transition:background .15s ease,color .15s ease;}
  .board-tabs label:hover{box-shadow:inset 0 0 0 2px currentColor;}
  .board-tabs label i{width:9px;height:9px;border-radius:50%;background:currentColor !important;}
  .board-tabs label[for=b-seek] i{background:var(--indigo);}
  .board-tabs label[for=b-hire] i{background:var(--coral);}
  .board-tabs label[for=b-seek]{background:var(--indigo-tint);color:var(--indigo-text);}
  .board-tabs label[for=b-hire]{background:var(--coral-tint);color:var(--coral-text);}
  #b-seek:checked ~ .board-tabs label[for=b-seek]{background:var(--indigo);color:#fff;}
  #b-hire:checked ~ .board-tabs label[for=b-hire]{background:var(--coral);color:var(--coral-deep);}
  #b-seek:focus-visible ~ .board-tabs label[for=b-seek],#b-hire:focus-visible ~ .board-tabs label[for=b-hire]{outline:2px solid var(--indigo);outline-offset:2px;}
  #b-seek:checked ~ .p-hire,#b-hire:checked ~ .p-seek{display:none;}
  .board-note{font-size:14px;color:var(--ink-3);margin-top:14px;max-width:860px;}

  /* The backstage band: who's behind the lists */
  .band{background:var(--indigo-ink);color:#fff;padding:clamp(72px,9vw,120px) 0;margin-top:clamp(96px,11vw,150px);}
  .band-grid{display:grid;grid-template-columns:minmax(0,0.85fr) minmax(0,1.15fr);gap:56px;align-items:center;}
  .band h2{color:#fff;}
  .band p{color:#D6CEFF;font-size:18px;line-height:1.6;margin-top:6px;max-width:520px;}
  .band .tl{color:#fff;display:inline-block;margin-top:22px;}
  .band :focus-visible{outline-color:#fff;}
  .pubs{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;}
  .pub{display:flex;align-items:center;gap:10px;padding:12px;border-radius:10px;background:rgba(255,255,255,0.06);font-size:13px;line-height:1.3;}
  .pub b{display:block;font-size:14px;font-weight:800;color:#fff;}
  .pub span{color:#B9ABF5;}
  .pub.counts{background:rgba(94,230,168,0.12);box-shadow:inset 0 0 0 1px rgba(94,230,168,0.55);}
  .pub.counts span{color:var(--ok-bright);font-weight:700;}
  .pub{transition:background-color .2s ease;cursor:default;}
  .pub:hover,.pub:focus-visible{background:rgba(255,255,255,0.12);}
  .pub[data-tip]::after{background:#fff;color:var(--ink);white-space:normal;width:230px;font-weight:600;}
  .guide .lg-stack .lg{transition:margin .25s ease;}
  .guide:hover .lg-stack .lg{margin-right:4px;}
  @media (prefers-reduced-motion: reduce){.pub,.guide .lg-stack .lg,.side-logos .lg,.side-go{transition:none;}}

  /* Guides: ruled rows, not cards */
  .guides{border-top:1px solid var(--ink);margin-top:36px;}
  .guide{display:grid;grid-template-columns:minmax(0,0.7fr) minmax(0,1.6fr) 170px;gap:32px;align-items:center;padding:28px 0;border-bottom:1px solid var(--rule);}
  .guide-side{font-size:15px;font-weight:800;color:var(--ink-2);display:flex;align-items:baseline;}
  .guide-side .mono{display:block;font-weight:400;color:var(--ink-3);margin-top:4px;}
  .guide b{display:block;font-size:clamp(22px,2.2vw,28px);font-weight:900;line-height:1.2;letter-spacing:-0.015em;}
  .guide:hover b{text-decoration:underline;text-underline-offset:5px;text-decoration-thickness:2px;}
  .guide-d{display:block;font-size:16px;color:var(--ink-2);margin-top:6px;}
  .guide-side .pill{flex-shrink:0;}
  .research{font-size:15px;color:var(--ink-3);margin-top:20px;max-width:860px;}
  .guide .lg-stack{justify-self:end;}
  @media(max-width:760px){.guide .lg-stack{justify-self:start;}}
  @media(max-width:760px){.guide{grid-template-columns:1fr;gap:10px;}}

  /* Who makes this */
  .who{display:grid;grid-template-columns:auto minmax(0,1fr);gap:clamp(24px,4vw,48px);align-items:start;max-width:880px;}
  .who-loop{display:block;padding:18px 26px 26px 18px;}
  .who-photo{width:clamp(88px,10vw,120px);height:auto;aspect-ratio:1;border-radius:50%;object-fit:cover;border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);}
  .who p{font-size:clamp(18px,1.7vw,20px);line-height:1.6;color:var(--ink-2);margin-top:14px;max-width:680px;text-wrap:pretty;}
  .who p.who-later{margin-top:clamp(40px,5vw,56px);}
  .who .tl{display:inline-block;margin-top:22px;font-size:17px;}
  @media(max-width:640px){.who{grid-template-columns:1fr;gap:18px;}}

  /* Signup */
  .signup-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;border-top:1px solid var(--ink);padding-top:40px;}
  .signup-card h2{font-size:clamp(32px,4vw,44px);margin-bottom:8px;}

  @media(max-width:960px){
    .sides,.band-grid,.signup-card{grid-template-columns:1fr;}
    .side{min-height:0;}
    .sides{gap:48px;}
  }
  @media(max-width:640px){
    .hero{padding-top:28px;}
    .hero-tag{margin-bottom:14px;font-size:14px;}
    .hero .dek{margin-top:12px;}
    .sides{margin-top:32px;}
    .side{gap:16px;}
    .side-act{padding-top:2px;}
    .side{padding:26px 22px;}
    .lane .lane-tl{left:-12px;}
    .lane .lane-br{right:-12px;}
    .sec-head{grid-template-columns:1fr;}
    .side-logos .lg{width:44px !important;height:44px !important;}
  }

  /* Free tools band: split down the middle in the two side colors, job seekers left, hiring teams right. */
  /* Space above the band: sections only pad their tops, so a band right after one needs its own gap. */
  .ftb{margin-top:clamp(96px,11vw,150px);position:relative;overflow:hidden;padding:clamp(80px,10vw,130px) 0;background:linear-gradient(90deg,var(--indigo-tint) 50%,var(--coral-tint) 50%);border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);}
  .ftb-in{position:relative;}
  .ftb h2{max-width:920px;margin:0;}
  .ftb-lead{margin-top:16px;}
  .ftb-sticker{display:inline-block;margin:0 0 20px;padding:9px 14px 8px;font-weight:900;font-size:14px;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;background:var(--ink);color:#fff;border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--coral);transform:rotate(-3deg);}
  .ftb-dots{position:absolute;top:-30px;right:0;color:var(--coral);opacity:.6;}
  .ftb-zig{position:absolute;bottom:-70px;left:-20px;color:var(--indigo);}
  .ftb-cta{margin:20px 0 0;text-align:center;}
  .ftb-cta .btn{font-size:18px;padding:18px 28px;}
  @media(max-width:860px){.ftb{background:var(--paper-2);}.ftb-dots,.ftb-zig{display:none;}}
`
