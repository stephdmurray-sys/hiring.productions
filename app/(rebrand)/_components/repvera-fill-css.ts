/** Styles for repvera-fill.tsx: four steps across the top, then the profile in a product window. */
export const repveraFillCss = `
  .rf{margin-top:30px;}

  /* The steps, with a line that fills as the profile does */
  .rf-steps{position:relative;list-style:none;margin:0 0 28px;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;}
  .rf-steps::before,.rf-steps::after{content:"";position:absolute;top:21px;left:12.5%;height:4px;border-radius:2px;}
  .rf-steps::before{right:12.5%;background:var(--rule-2);}
  .rf-steps::after{width:calc((100% - 25%) * var(--rf-progress, 100) / 100);background:var(--ink);transition:width .6s ease;}
  .rf-steps li{position:relative;z-index:1;}
  .rf-step{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;padding:0 6px;text-align:center;font:inherit;color:var(--ink);background:none;border:0;}
  .rf-n{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;border:3px solid var(--ink);background:#fff;font-weight:900;font-size:19px;box-shadow:3px 3px 0 var(--ink);transition:background .3s ease,color .3s ease,transform .3s ease;}
  .rf-done .rf-n{background:var(--indigo);color:#fff;}
  .rf-hiring .rf-done .rf-n{background:var(--coral);color:var(--ink);}
  .rf-now .rf-n{transform:scale(1.08) rotate(-6deg);}
  .rf-step b{margin-top:4px;font-size:16.5px;line-height:1.25;font-weight:900;}
  .rf-line{font-size:14px;line-height:1.45;color:var(--ink-2);max-width:250px;}

  /* The window */
  .rfw{background:#fff;border:3px solid var(--ink);border-radius:20px;box-shadow:10px 10px 0 var(--ink);overflow:hidden;}
  .rfw-bar{display:flex;align-items:center;gap:16px;padding:12px 18px;background:var(--paper-2);border-bottom:2px solid var(--ink);}
  .rfw-dots{display:inline-flex;gap:7px;}
  .rfw-dots i{width:12px;height:12px;border-radius:50%;border:2px solid var(--ink);background:#fff;}
  .rfw-dots i:first-child{background:var(--coral);}
  .rfw-url{flex:1;max-width:420px;padding:5px 14px;border-radius:999px;background:#fff;border:1.5px solid var(--rule-2);font:13px/1.4 var(--mono,ui-monospace,monospace);color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .rfw-in{padding:clamp(22px,3vw,40px);}
  .rfw-head{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:20px;align-items:center;}
  .rfw-av{position:relative;width:84px;height:84px;border-radius:50%;border:3px solid var(--ink);overflow:hidden;background:var(--lavender);}
  .rfw-av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .rfw-name{margin:0;font-size:clamp(22px,2.2vw,26px);font-weight:900;letter-spacing:-0.01em;color:var(--ink);}
  .rfw-role{margin:2px 0 0;font-size:15px;font-weight:700;color:var(--ink-2);}
  .rfw-bio{margin:6px 0 0;max-width:620px;font-size:14.5px;line-height:1.5;color:var(--ink-3);}
  .rfw-badge{align-self:start;padding:8px 14px;border:2px solid var(--ink);border-radius:999px;background:var(--paper-2);font-size:14px;font-weight:900;color:var(--ink-2);white-space:nowrap;transition:background .35s ease,color .35s ease,transform .35s ease;}
  .rfw-badge-on{background:var(--ok-bright);color:var(--ink);transform:rotate(-3deg);box-shadow:3px 3px 0 var(--ink);}
  .rfw-tabs{display:flex;flex-wrap:wrap;gap:4px 26px;margin:24px 0 0;padding-bottom:10px;border-bottom:1px solid var(--rule);font-size:14.5px;font-weight:700;color:var(--ink-3);}
  .rfw-tab-on{color:var(--ink);box-shadow:0 12px 0 -9px var(--indigo);}

  .rfw-row{display:grid;grid-template-columns:150px minmax(0,1fr);gap:24px;padding:24px 0;border-bottom:1px solid var(--rule);}
  .rfw-row:last-child{border-bottom:0;padding-bottom:0;}
  .rfw-row-full{grid-template-columns:1fr;}
  .rfw-k{margin:4px 0 0;font-size:13.5px;font-weight:900;color:var(--ink-3);}
  .rfw-known{margin:0;font-size:clamp(22px,2.4vw,30px);line-height:1.25;font-weight:900;letter-spacing:-0.015em;color:var(--ink);}
  .rfw-known-more{margin:8px 0 0;max-width:760px;font-size:clamp(17px,1.6vw,19px);line-height:1.5;font-weight:600;color:var(--ink-2);}
  .rfw-known mark{background:linear-gradient(transparent 58%,var(--indigo-tint) 58%);color:inherit;padding:0;}

  .rfw-stack{display:flex;height:16px;border-radius:8px;overflow:hidden;}
  .rfw-stack i{display:block;flex-basis:0;border-right:2px solid #fff;}
  .rfw-stack i:last-child{border-right:0;}
  .rfw-legend{display:flex;flex-wrap:wrap;gap:8px 20px;margin:14px 0 0;padding:0;list-style:none;font-size:14px;color:var(--ink-2);}
  .rfw-legend li{display:inline-flex;align-items:center;gap:7px;}
  .rfw-legend i{width:10px;height:10px;border-radius:50%;}
  .rfw-legend b{color:var(--ink);font-weight:900;}
  .rfw-total{margin-left:auto;font-weight:700;}
  .rfw-total b{font-size:16px;color:var(--indigo-text);}

  .rfw-read{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:16px;}
  .rfw-card{grid-column:span 4;display:flex;flex-direction:column;padding:18px 20px;background:#fff;border:1.5px solid var(--rule-2);border-radius:14px;}
  .rfw-summary{grid-column:span 7;background:var(--paper);}
  .rfw-summary + .rfw-card{grid-column:span 5;}
  .rfw-ck{margin:0 0 12px;font-size:15px;font-weight:900;color:var(--ink);}
  .rfw-text{margin:0;font-size:16px;line-height:1.65;color:var(--ink-2);}
  .rfw-text b{color:var(--ink);font-weight:900;}
  .rfw-note{margin:auto 0 0;padding-top:14px;font-size:12.5px;line-height:1.45;color:var(--ink-3);}
  .rfw-patterns{display:grid;gap:10px;}
  .rfw-patterns p{display:grid;grid-template-columns:minmax(0,1fr) 46%;gap:12px;align-items:center;margin:0;font-size:14px;font-weight:700;color:var(--ink);}
  .rfw-patterns i{display:block;height:9px;border-radius:5px;background:var(--paper-2);overflow:hidden;}
  .rfw-patterns b{display:block;height:100%;background:var(--ink);border-radius:5px;transition:width .9s cubic-bezier(.2,.8,.2,1);}
  .rfw-chips{display:flex;flex-wrap:wrap;gap:7px;}
  .rfw-chips span{padding:5px 11px;border:1.5px solid var(--rule-2);border-radius:999px;font-size:13.5px;font-weight:700;color:var(--ink);background:var(--paper);}
  .rfw-traits{display:grid;gap:12px;}
  .rfw-traits p{margin:0;}
  .rfw-traits > div > p:first-child{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:14.5px;}
  .rfw-traits b{font-weight:900;color:var(--ink);}
  .rfw-detail{margin-top:2px !important;font-size:12.5px;line-height:1.45;color:var(--ink-3);}
  .rfw-marks{display:inline-flex;gap:4px;}
  .rfw-marks i{width:13px;height:13px;border-radius:50%;border:2px solid var(--ink);background:#fff;}
  .rfw-marks .rfw-mark-on{background:var(--ok-bright);}
  .rfw-values{display:grid;gap:10px;margin:0;padding:0;list-style:none;}
  .rfw-values li{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid var(--rule);font-size:14.5px;font-weight:800;color:var(--ink);}
  .rfw-values li:last-child{border-bottom:0;padding-bottom:0;}
  .rfw-values i{position:relative;width:18px;height:18px;border-radius:50%;background:var(--ok-bright);border:2px solid var(--ink);}
  .rfw-values i::after{content:"";position:absolute;left:4px;top:1px;width:4px;height:8px;border-right:2px solid var(--ink);border-bottom:2px solid var(--ink);transform:rotate(45deg);}
  .rfw-finding{margin:0;padding:18px 22px;background:var(--indigo-tint);border-radius:14px;font-size:clamp(17px,1.6vw,19px);line-height:1.55;color:var(--ink);}
  .rfw-finding b{display:block;margin-bottom:6px;font-weight:900;}

  /* Sections fill in */
  .rf-sec{opacity:.14;filter:blur(2px);transform:translateY(6px);transition:opacity .55s ease,filter .55s ease,transform .55s ease;}
  .rf-on{opacity:1;filter:none;transform:none;}

  @media(max-width:1000px){
    .rfw-summary,.rfw-summary + .rfw-card{grid-column:span 12;}
    .rfw-card{grid-column:span 6;}
    .rfw-read > .rfw-card:last-child{grid-column:span 12;}
  }
  @media(max-width:760px){
    .rf-steps{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:22px;}
    .rf-steps::before,.rf-steps::after{display:none;}
    .rf-line{display:none;}
    .rfw-head{grid-template-columns:auto minmax(0,1fr);}
    .rfw-badge{grid-column:1 / -1;justify-self:start;}
    .rfw-row{grid-template-columns:1fr;gap:10px;}
    .rfw-card,.rfw-read > .rfw-card:last-child{grid-column:span 12;}
    .rfw-total{margin-left:0;}
    .rfw-url{max-width:none;}
  }
  @media(max-width:480px){
    .rfw-av{width:60px;height:60px;}
    .rfw-bio{display:none;}
    .rfw-tabs{gap:4px 16px;font-size:13.5px;}
  }
  /* The example Work tab (repvera-work.tsx) */
  .rw{margin-top:28px;}
  .rw-k{margin:0 0 16px;font-size:clamp(20px,2.2vw,24px);font-weight:900;letter-spacing:-0.01em;line-height:1.2;color:var(--ink);}
  .rw-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;align-items:center;}
  .rw-av{display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;border:3px solid var(--ink);background:var(--lavender);font-weight:900;font-size:22px;color:var(--ink);}
  .rw-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:22px;}
  .rw-card{display:flex;flex-direction:column;border:1.5px solid var(--rule-2);border-radius:14px;overflow:clip;background:#fff;}
  .rw-thumb{position:relative;display:flex;justify-content:center;align-items:flex-end;height:118px;padding-top:14px;background:var(--indigo-tint);border-bottom:1.5px solid var(--rule-2);}
  .rw-type{position:absolute;top:10px;left:12px;padding:2px 7px;border-radius:4px;background:#fff;border:1px solid var(--rule-2);font:800 10.5px/1.4 var(--mono,ui-monospace,monospace);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);}
  .rw-page{display:flex;flex-direction:column;gap:5px;width:46%;max-width:160px;height:96px;padding:12px 12px 0;background:#fff;border-radius:6px 6px 0 0;box-shadow:0 2px 10px rgba(26,26,34,.12);overflow:hidden;}
  .rw-page b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:9.5px;line-height:1.3;font-weight:900;color:var(--ink);}
  .rw-page i{display:block;height:4px;border-radius:2px;background:var(--paper-2);}
  .rw-page i:last-child{width:60%;}
  .rw-body{display:flex;flex-direction:column;gap:6px;padding:16px 18px 18px;flex:1;}
  .rw-status{display:inline-flex;align-items:center;gap:7px;margin:0;font-size:12px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);}
  .rw-status i{width:12px;height:12px;border-radius:50%;border:2px solid var(--ink);background:#fff;}
  .rw-witnessed .rw-status i{background:var(--ok-bright);}
  .rw-awaiting .rw-status i{background:var(--lavender);}
  .rw-shared .rw-status i{display:none;}
  .rw-title{margin:2px 0 0;font-size:16.5px;line-height:1.35;font-weight:900;color:var(--ink);text-wrap:pretty;}
  .rw-org{margin:0;font:700 11.5px/1.4 var(--mono,ui-monospace,monospace);letter-spacing:.05em;text-transform:uppercase;color:var(--ink-3);}
  .rw-desc{margin:auto 0 0;padding-top:12px;border-top:1px solid var(--rule);font-size:14px;line-height:1.5;color:var(--ink-2);}
  .rw-wit{display:flex;align-items:center;gap:10px;margin-top:auto;padding-top:12px;border-top:1px solid var(--rule);}
  .rw-wit-av{flex:none;display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:var(--ink);color:#fff;font-size:12px;font-weight:900;}
  .rw-wit > span:last-child{display:grid;font-size:13.5px;line-height:1.35;color:var(--ink-3);}
  .rw-wit b{font-size:14.5px;font-weight:900;color:var(--ink);}
  .rw-read{margin:4px 0 0;font-size:14px;font-weight:800;color:var(--ink);}
  .rw-foot{margin:20px auto 0;max-width:620px;text-align:center;font-size:13px;line-height:1.5;color:var(--ink-3);}
  .rw-note{margin:14px 0 0;font-size:13.5px;line-height:1.5;color:var(--ink-3);}
  @media(max-width:700px){.rw-grid{grid-template-columns:1fr;}.rw-av{width:56px;height:56px;font-size:18px;}}
  @media(prefers-reduced-motion:reduce){
    .rf-sec,.rfw-badge,.rf-n,.rf-steps::after,.rfw-patterns b{transition:none;}
    .rf-sec{opacity:1;filter:none;transform:none;}
  }
`
