/**
 * Homepage layer on the stage system: the both-sides split, the
 * scoreboard tabs, the publisher band and the guide rows.
 */
export const homeCss = `
  .hero{padding-top:clamp(48px,6.5vw,88px);}
  .hero h1 span{color:var(--indigo);}
  .hero .dek{max-width:680px;}

  /* Both sides: one indigo half, one coral half */
  .sides{display:grid;grid-template-columns:1fr 1fr;border-radius:var(--r-lg);overflow:hidden;margin-top:40px;}
  .side{padding:34px 34px 32px;display:flex;flex-direction:column;gap:18px;min-height:460px;}
  .side-seekers{background:var(--indigo);color:#fff;}
  .side-hiring{background:var(--coral);color:var(--coral-deep);}
  .side-k{display:flex;align-items:center;gap:9px;font-size:16px;font-weight:800;}
  .side-k i{width:10px;height:10px;border-radius:50%;background:currentColor;opacity:0.85;}
  .side h2{font-size:clamp(30px,3.2vw,42px);font-weight:900;letter-spacing:-0.02em;line-height:1.06;margin:0;color:inherit;}
  .side-logos{display:flex;flex-wrap:wrap;gap:10px;}
  .side-logos a{display:inline-flex;border-radius:12px;}
  .side-logos .lg{border:0;box-shadow:0 2px 0 rgba(0,0,0,0.14);border-radius:12px;}
  .side-logos a:hover .lg{box-shadow:0 0 0 3px rgba(255,255,255,0.7);}
  .side-feature{margin-top:auto;display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;padding:18px;border-radius:12px;}
  .side-seekers .side-feature{background:rgba(255,255,255,0.13);}
  .side-hiring .side-feature{background:rgba(255,255,255,0.3);}
  .side-feature b{display:block;font-size:20px;font-weight:800;line-height:1.25;}
  .side-feature span{font-size:15px;opacity:0.92;line-height:1.45;}
  .side-go{display:inline-flex;align-self:flex-start;font-weight:800;font-size:16px;padding:14px 20px;border-radius:var(--r);}
  .side-seekers .side-go{background:#fff;color:var(--indigo-deep);}
  .side-seekers .side-go:hover{background:#F1EDFF;}
  .side-hiring .side-go{background:var(--coral-deep);color:#fff;}
  .side-hiring .side-go:hover{background:#000;}
  .side :focus-visible{outline-color:#fff;}
  .side-hiring :focus-visible{outline-color:var(--coral-deep);}
  .hero .ticker{margin-top:16px;}

  /* Section heads with the action on the right */
  .sec-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;}
  .sec-head .lead{margin-top:4px;}

  /* Scoreboard tabs: two boards, one visible */
  .boards{margin-top:36px;}
  .board-tabs{display:inline-flex;gap:4px;padding:4px;background:#EEEBE3;border-radius:10px;margin-bottom:16px;}
  .board-tabs label{font-weight:800;font-size:15px;padding:10px 16px;border-radius:7px;color:var(--ink-2);cursor:pointer;display:flex;align-items:center;gap:8px;}
  .board-tabs label i{width:9px;height:9px;border-radius:50%;}
  .board-tabs label[for=b-seek] i{background:var(--indigo);}
  .board-tabs label[for=b-hire] i{background:var(--coral);}
  #b-seek:checked ~ .board-tabs label[for=b-seek],#b-hire:checked ~ .board-tabs label[for=b-hire]{background:#fff;color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,0.08);}
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

  /* Guides */
  .guides{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:36px;}
  .guide{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:24px;display:flex;flex-direction:column;gap:12px;border-top:4px solid var(--indigo);}
  .guide.hiring{border-top-color:var(--coral);}
  .guide-side{font-size:14px;font-weight:800;color:var(--ink-2);display:flex;align-items:center;}
  .guide b{font-size:22px;font-weight:900;line-height:1.2;letter-spacing:-0.01em;}
  .guide:hover b{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px;}
  .guide p{font-size:15px;color:var(--ink-2);}
  .guide .lg-stack{margin-top:auto;padding-top:6px;}
  .guide .mono{color:var(--ink-3);}
  .research{font-size:15px;color:var(--ink-3);margin-top:20px;max-width:860px;}

  /* Signup */
  .signup-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;background:var(--indigo-tint);border-radius:var(--r-lg);padding:clamp(28px,4vw,48px);}
  .signup-card h2{font-size:clamp(32px,4vw,44px);margin-bottom:8px;}

  @media(max-width:960px){
    .sides,.band-grid,.signup-card{grid-template-columns:1fr;}
    .guides{grid-template-columns:1fr;}
    .side{min-height:0;}
  }
  @media(max-width:640px){
    .side{padding:26px 22px;}
    .sec-head{grid-template-columns:1fr;}
    .side-logos .lg{width:44px !important;height:44px !important;}
  }
`
