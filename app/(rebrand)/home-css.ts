/**
 * Homepage layer on top of the shared site styles. Indigo marks the job
 * seeker's side, coral the hiring team's, so "both sides of the table"
 * reads at a glance.
 */
export const homeCss = `
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}

  /* Hero */
  .h-hero{background:radial-gradient(900px 520px at 88% 10%,rgba(108,71,255,0.35) 0%,rgba(108,71,255,0) 60%),radial-gradient(700px 420px at 70% 100%,rgba(255,79,106,0.16) 0%,rgba(255,79,106,0) 60%),linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:clamp(56px,8vw,104px) 0 clamp(64px,8vw,104px);overflow:hidden;}
  .h-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:56px;align-items:center;}
  .h-copy h1{font-weight:900;font-size:clamp(40px,6.5vw,72px);line-height:1.02;letter-spacing:-0.035em;text-wrap:balance;}
  .h-sub{font-size:clamp(17px,1.6vw,20px);line-height:1.6;color:#D6CCF5;max-width:560px;margin-top:22px;}
  .doors{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:34px;max-width:600px;}
  .door{position:relative;display:flex;flex-direction:column;gap:6px;padding:20px 44px 20px 20px;border-radius:16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);transition:transform .18s,background .18s,border-color .18s;}
  .door:hover{transform:translateY(-2px);background:rgba(255,255,255,0.1);}
  .door-k{font-weight:800;font-size:18px;color:#fff;}
  .door-d{font-size:13.5px;color:#C9BFE8;line-height:1.5;}
  .door-go{position:absolute;right:18px;top:20px;font-size:20px;transition:transform .18s;}
  .door:hover .door-go{transform:translateX(3px);}
  .door-seekers{border-top:3px solid #6C47FF;}
  .door-seekers .door-go{color:#A78BFA;}
  .door-hiring{border-top:3px solid #FF4F6A;}
  .door-hiring .door-go{color:#FF8DA0;}
  .h-proof{display:flex;align-items:center;gap:10px;margin-top:26px;font-size:13px;color:#B3A8DE;}
  .pulse{width:8px;height:8px;border-radius:50%;background:#5EE6A8;box-shadow:0 0 0 0 rgba(94,230,168,0.6);animation:pulse 2.4s infinite;}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(94,230,168,0.55);}70%{box-shadow:0 0 0 10px rgba(94,230,168,0);}100%{box-shadow:0 0 0 0 rgba(94,230,168,0);}}
  @media (prefers-reduced-motion: reduce){.pulse{animation:none;}}

  /* Evidence card stack */
  .stack{position:relative;height:500px;}
  .ecard{position:absolute;background:#fff;color:var(--ink);border-radius:18px;padding:20px 22px;box-shadow:0 24px 60px rgba(8,4,24,0.45);width:min(380px,100%);}
  .ecard-a{right:0;bottom:0;z-index:3;}
  .ecard-b{left:0;top:132px;z-index:2;transform:rotate(-4deg);width:min(330px,90%);}
  .ecard-c{right:0;top:0;z-index:1;transform:rotate(4deg);width:min(310px,85%);background:#2A1A5E;color:#fff;}
  .ec-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
  .ec-head b{font-weight:800;font-size:17px;}
  .ec-head .stance{margin-left:auto;}
  .ec-logo{width:32px;height:32px;border-radius:9px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;}
  .ec-rows{margin-top:14px;display:grid;gap:0;}
  .ec-rows div{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid #F1F2F4;font-size:13px;color:var(--gray);}
  .ec-rows b{color:var(--ink);font-weight:700;text-align:right;}
  .ec-rows small{font-weight:600;color:var(--gray-lt);}
  .ec-cost b{color:#FF4F6A;font-size:20px;font-weight:900;}
  .ec-foot{font-size:11.5px;color:var(--faint);margin-top:8px;}
  .ecard-c .ec-foot{color:#B3A8DE;}
  .ec-dots{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}
  .ec-dots span{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--gray);background:#F7F7FA;border-radius:999px;padding:4px 10px 4px 4px;}
  .ec-dots i{font-style:normal;display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:22px;padding:0 6px;border-radius:999px;background:#6C47FF;color:#fff;font-weight:800;font-size:11px;}
  .ec-k{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#C4B5FD;}
  .ec-big{font-weight:800;font-size:18px;margin-top:6px;}
  .ec-pills{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
  .ec-pills span{font-size:12px;font-weight:700;background:rgba(255,255,255,0.12);border-radius:6px;padding:3px 8px;}

  /* Picks */
  .side-label{display:flex;align-items:center;gap:10px;font-weight:800;font-size:14px;letter-spacing:0.02em;margin:44px 0 16px;color:var(--ink);}
  .side-label::before{content:"";width:10px;height:10px;border-radius:50%;}
  .side-seekers::before{background:#6C47FF;}
  .side-hiring::before{background:#FF4F6A;}
  .mini-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
  .mini{display:flex;flex-direction:column;gap:10px;background:#fff;border:1px solid var(--border);border-radius:18px;padding:22px;transition:transform .18s,box-shadow .18s,border-color .18s;}
  .mini:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(20,20,32,0.08);border-color:#C9BCFF;}
  .mini-hiring:hover{border-color:#FFB3C0;}
  .mini-label{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#6C47FF;}
  .mini-hiring .mini-label{color:#E23A56;}
  .mini-id{display:flex;align-items:center;gap:10px;}
  .mini-id b{font-weight:800;font-size:20px;color:var(--ink);}
  .mini-logo{width:40px;height:40px;border-radius:11px;border:1px solid var(--border);background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .mini-line{font-size:14px;color:var(--gray);line-height:1.55;}
  .mini-stats{display:flex;gap:18px;font-size:12.5px;color:var(--gray-lt);margin-top:auto;padding-top:6px;}
  .mini-stats b{color:var(--ink);font-weight:800;font-size:16px;}
  .mini-go{font-size:13px;font-weight:700;color:#6C47FF;}
  .mini-hiring .mini-go{color:#E23A56;}
  .mini-rising{background:radial-gradient(400px 220px at 100% 0%,#3B1F86 0%,rgba(59,31,134,0) 70%),var(--hero);border-color:var(--hero);}
  .mini-rising .mini-label{color:#C4B5FD;}
  .mini-rising .mini-id b,.mini-rising .mini-stats b{color:#fff;}
  .mini-rising .mini-stats{color:#B3A8DE;}
  .mini-rising .mini-go{color:#C4B5FD;}
  .mini-rising .mini-logo{border-color:rgba(255,255,255,0.18);}

  /* Lists band */
  .band{display:grid;grid-template-columns:1.25fr 0.75fr;gap:48px;align-items:center;background:var(--hero);color:#fff;border-radius:28px;padding:clamp(32px,5vw,64px);}
  .band-k{font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#FF8DA0;margin-bottom:14px;}
  .band h2{color:#fff;font-size:clamp(30px,3.8vw,46px);line-height:1.12;}
  .band-p{font-size:17px;line-height:1.65;color:#D6CCF5;max-width:560px;}
  .band-btn{display:inline-block;margin-top:26px;padding:14px 22px;}
  .band-tally{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:24px;}
  .tally-big{font-size:15px;color:#C9BFE8;margin-bottom:16px;}
  .tally-big b{display:block;font-weight:900;font-size:56px;line-height:1;color:#fff;letter-spacing:-0.03em;}
  .tally-row{display:grid;grid-template-columns:118px 1fr 28px;align-items:center;gap:10px;font-size:13px;color:#C9BFE8;padding:6px 0;}
  .tally-row b{text-align:right;color:#fff;}
  .tally-bar{height:8px;border-radius:999px;background:rgba(255,255,255,0.1);overflow:hidden;}
  .tally-bar i{display:block;height:100%;border-radius:999px;background:rgba(255,255,255,0.45);}
  .tally-counts span:first-child{color:#fff;font-weight:700;}
  .tally-counts .tally-bar i{background:#5EE6A8;}

  /* Guides */
  .guide-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px;}
  .gcard{display:flex;flex-direction:column;gap:10px;background:#fff;border:1px solid var(--border);border-radius:18px;padding:24px;min-height:220px;transition:transform .18s,box-shadow .18s;}
  .gcard:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(20,20,32,0.08);}
  .gcard b{font-weight:800;font-size:21px;line-height:1.25;color:var(--ink);letter-spacing:-0.01em;}
  .gcard span{font-size:14px;color:var(--gray);line-height:1.55;}
  .gside{font-size:11px !important;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;}
  .gcard-seekers .gside{color:#6C47FF !important;}
  .gcard-hiring .gside{color:#E23A56 !important;}
  .gcard-seekers{border-top:4px solid #6C47FF;}
  .gcard-hiring{border-top:4px solid #FF4F6A;}
  .gmeta{margin-top:auto;font-size:12.5px !important;color:var(--gray-lt) !important;}
  .research{margin-top:22px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
  .research-k{font-size:13px;font-weight:700;color:var(--gray);}
  .research-chips{display:flex;flex-wrap:wrap;gap:8px;}
  .rchip{font-size:13px;font-weight:600;color:var(--gray);background:#fff;border:1px solid var(--border);border-radius:999px;padding:6px 12px;}
  .rchip::before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:8px;vertical-align:1px;}
  .rchip-seekers::before{background:#6C47FF;}
  .rchip-hiring::before{background:#FF4F6A;}

  /* Method */
  .method-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px;}
  .mstep{background:#fff;border:1px solid var(--border);border-radius:18px;padding:26px;}
  .mstep-n{display:block;font-weight:900;font-size:15px;color:#6C47FF;margin-bottom:14px;}
  .mstep b{display:block;font-weight:800;font-size:19px;color:var(--ink);margin-bottom:8px;}
  .mstep p{font-size:15px;color:var(--gray);line-height:1.6;}
  .numbers{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px;padding:28px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
  .numbers b{display:block;font-weight:900;font-size:clamp(32px,4vw,48px);line-height:1;color:var(--ink);letter-spacing:-0.03em;}
  .numbers span{display:block;font-size:13.5px;color:var(--gray-lt);margin-top:8px;}

  /* Radar */
  .radar{display:grid;grid-template-columns:0.9fr 1.1fr;gap:40px;align-items:center;}
  .radar-h{margin-bottom:12px;}
  .radar-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  .rcard{display:flex;flex-direction:column;gap:8px;background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px;}
  .rcard b{font-weight:800;font-size:17px;color:var(--ink);}
  .rcard span{font-size:13.5px;color:var(--gray);}
  .rcard-cta{background:transparent;border:1.5px dashed #C9BCFF;justify-content:center;transition:background .15s;}
  .rcard-cta:hover{background:#fff;}
  .rcard-cta span{color:#6C47FF;font-weight:700;}

  /* Signup */
  .signup-band{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;background:linear-gradient(120deg,#6C47FF,#FF4F6A);border-radius:28px;padding:clamp(32px,5vw,56px);color:#fff;}
  .signup-h{color:#fff;font-size:clamp(30px,3.6vw,44px);margin-bottom:10px;}
  .signup-band p{font-size:17px;color:rgba(255,255,255,0.88);line-height:1.6;}
  .signup{display:flex;flex-wrap:wrap;gap:10px;}
  .signup input{flex:1 1 220px;min-height:52px;border:0;border-radius:999px;padding:0 20px;font:inherit;font-size:16px;background:#fff;color:var(--ink);}
  .signup button{min-height:52px;border:0;border-radius:999px;padding:0 24px;font:inherit;font-weight:800;font-size:15px;background:var(--hero);color:#fff;cursor:pointer;transition:transform .15s;}
  .signup button:hover{transform:translateY(-1px);}
  .signup button:disabled{opacity:0.7;cursor:default;}
  .signup-error{flex-basis:100%;font-size:14px;color:#fff;font-weight:700;}
  .signup-done{font-size:17px;font-weight:700;color:#fff;}

  @media(max-width:980px){
    .h-grid{grid-template-columns:1fr;gap:40px;}
    .stack{height:auto;display:grid;gap:14px;}
    .ecard{position:relative;transform:none;width:100%;left:auto;right:auto;top:auto;bottom:auto;}
    .ecard-b,.ecard-c{display:none;}
    .band,.radar,.signup-band{grid-template-columns:1fr;}
  }
  @media(max-width:760px){
    .doors{grid-template-columns:1fr;}
    .mini-grid,.guide-grid,.method-grid,.radar-cards{grid-template-columns:1fr;}
    .numbers{grid-template-columns:repeat(2,1fr);}
    .band{border-radius:22px;}
  }
`
