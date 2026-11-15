/** Styles for the stack builder (stack-builder.tsx). Kept out of the client file so server pages can read the string. */
export const stackCss = `
  .sb{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:clamp(28px,4vw,56px);align-items:start;margin-top:8px;}
  .sb-main{display:grid;gap:28px;min-width:0;}
  .sb-starters{display:flex;flex-wrap:wrap;gap:12px;align-items:center;}
  .sb-starter{font:inherit;font-weight:800;font-size:16px;padding:14px 18px;border-radius:12px;border:2px solid var(--ink);background:var(--surface);color:var(--ink);box-shadow:4px 4px 0 var(--ink);cursor:pointer;transition:transform .12s ease,box-shadow .12s ease;}
  .sb-starter:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ink);}
  .sb-starter-free{background:var(--indigo);color:#fff;}
  .sb-hiring .sb-starter-free{background:var(--coral);color:var(--coral-deep);}
  .sb-clear{font:inherit;font-size:15px;font-weight:700;background:none;border:0;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:8px;}
  .sb-control{display:grid;gap:12px;padding:22px 24px;border:2px solid var(--ink);border-radius:var(--r-lg);background:var(--surface);}
  .sb-control-2{grid-template-columns:1fr;gap:20px;}
  .sb-control-k{display:block;font-weight:900;font-size:clamp(20px,2vw,24px);letter-spacing:-0.01em;color:var(--ink);margin-bottom:10px;}
  .sb-chips{display:flex;flex-wrap:wrap;gap:8px;}
  .sb-chip{font:inherit;font-weight:800;font-size:15px;padding:10px 14px;border-radius:999px;border:2px solid var(--ink);background:var(--surface);color:var(--ink);cursor:pointer;min-height:44px;}
  .sb-chip[aria-checked="true"]{background:var(--ink);color:#fff;}
  .sb-range{width:100%;max-width:520px;accent-color:var(--indigo);height:28px;}
  .sb-slot{border:2px solid var(--ink);border-radius:var(--r-lg);background:var(--surface);padding:clamp(20px,2.6vw,32px);box-shadow:5px 5px 0 var(--rule-2);transition:box-shadow .15s ease;}
  .sb-slot-on{box-shadow:6px 6px 0 var(--ink);}
  .sb-slot-head{display:flex;justify-content:space-between;align-items:baseline;gap:14px;flex-wrap:wrap;}
  .sb-slot-head h3{font-size:clamp(22px,2.4vw,26px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;margin:0;}
  .sb-slot-state{font-family:var(--mono);font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);}
  .sb-slot-on .sb-slot-state{color:var(--indigo-text);}
  .sb-hiring .sb-slot-on .sb-slot-state{color:var(--coral-text);}
  .sb-why{margin:6px 0 0;color:var(--ink-2);font-size:16.5px;}
  .sb-dupe{margin:16px 0 0;}
  .sb-dupe button{font:inherit;font-size:15.5px;font-weight:800;text-align:left;background:var(--indigo-tint);color:var(--ink);border:2px dashed var(--indigo);border-radius:12px;padding:12px 14px;cursor:pointer;width:100%;}
  .sb-hiring .sb-dupe button{background:var(--coral-tint);border-color:var(--coral);}
  .sb-opts{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,210px),1fr));gap:10px;margin-top:18px;}
  .sb-opt{font:inherit;display:flex;align-items:center;gap:10px;text-align:left;padding:10px 12px;min-height:58px;border-radius:12px;border:2px solid var(--rule-2);background:var(--paper);color:var(--ink);cursor:pointer;transition:transform .12s ease,border-color .12s ease,box-shadow .12s ease;}
  .sb-opt:hover{border-color:var(--ink);transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--ink);}
  .sb-opt[aria-pressed="true"]{border-color:var(--ink);background:var(--indigo);color:#fff;box-shadow:4px 4px 0 var(--ink);}
  .sb-hiring .sb-opt[aria-pressed="true"]{background:var(--coral);color:var(--coral-deep);}
  .sb-opt .lg{flex:none;}
  .sb-opt-t{display:grid;min-width:0;flex:1;}
  .sb-opt-t b{font-size:15.5px;font-weight:800;line-height:1.2;}
  .sb-opt-t small{font-size:12.5px;font-weight:600;opacity:.8;line-height:1.3;}
  .sb-score{flex:none;font-weight:900;font-size:15px;font-variant-numeric:tabular-nums;}
  .sb-detail{margin-top:20px;padding-top:18px;border-top:1px dashed var(--rule-2);display:grid;gap:12px;justify-items:start;}
  .sb-free{margin:0;color:var(--ink-2);font-size:16px;max-width:640px;}
  .sb-toggle{display:inline-flex;border:2px solid var(--ink);border-radius:999px;overflow:hidden;}
  .sb-toggle button{font:inherit;font-weight:800;font-size:15px;padding:10px 16px;min-height:44px;background:var(--surface);color:var(--ink);border:0;cursor:pointer;}
  .sb-toggle button[aria-checked="true"]{background:var(--ink);color:#fff;}
  .sb-cost{margin:0;font-size:16px;color:var(--ink-2);}
  .sb-cost b{font-size:22px;font-weight:900;color:var(--ink);margin-right:4px;font-variant-numeric:tabular-nums;}
  .sb-renew{margin:0;font-size:15.5px;font-weight:700;color:var(--ink);background:var(--paper-2,#F2EEE4);border-radius:10px;padding:10px 12px;}
  .sb-trap{margin:0;font-size:15px;font-weight:700;color:var(--coral-text);}
  .sb-trap a{color:inherit;text-decoration:underline;text-underline-offset:3px;}
  .sb-bill{position:sticky;top:20px;background:var(--surface);border:2px solid var(--ink);border-radius:var(--r-lg) var(--r-lg) 0 0;padding:26px 24px 34px;box-shadow:6px 6px 0 var(--ink);
    -webkit-mask:linear-gradient(#000 0 0) top/100% calc(100% - 12px) no-repeat,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/24px 12px repeat-x;
    mask:linear-gradient(#000 0 0) top/100% calc(100% - 12px) no-repeat,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/24px 12px repeat-x;}
  .sb-bill-k{font-family:var(--mono);font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);margin:0 0 14px;}
  .sb-empty{font-size:16px;color:var(--ink-2);margin:0 0 18px;}
  .sb-lines{list-style:none;padding:0;margin:0 0 18px;display:grid;gap:10px;font-family:var(--mono);font-size:14px;}
  .sb-lines li{display:flex;align-items:baseline;gap:8px;}
  .sb-lines li span{display:grid;}
  .sb-lines li small{font-size:11.5px;color:var(--ink-3);}
  .sb-lines li i{flex:1;border-bottom:2px dotted var(--rule-2);transform:translateY(-4px);}
  .sb-lines li b{font-weight:800;white-space:nowrap;}
  .sb-total{display:grid;gap:2px;padding-top:16px;border-top:2px solid var(--ink);}
  .sb-total > span:first-child{font-weight:800;font-size:15px;color:var(--ink-2);}
  .sb-total b{font-size:clamp(48px,5vw,64px);font-weight:900;letter-spacing:-0.03em;line-height:1;color:var(--indigo);font-variant-numeric:tabular-nums;}
  .sb-hiring .sb-total b{color:var(--coral-text);}
  .sb-eur,.sb-sub{font-size:14.5px;font-weight:700;color:var(--ink-2);}
  .sb-pop{animation:sbpop .35s cubic-bezier(.2,.9,.3,1.4);}
  @keyframes sbpop{from{transform:scale(.9);opacity:.4;}to{transform:none;opacity:1;}}
  .sb-forget{margin:14px 0 0;padding:12px 14px;border-radius:12px;background:var(--coral-tint);color:var(--coral-text);font-weight:700;font-size:15px;}
  .sb-forget b{font-size:20px;font-weight:900;}
  .sb-save{margin:14px 0 0;padding:12px 14px;border-radius:12px;border:2px dashed var(--indigo);color:var(--ink);font-weight:800;font-size:15px;}
  .sb-hiring .sb-save{border-color:var(--coral);}
  .sb-perhire{margin:14px 0 0;font-size:14.5px;color:var(--ink-2);line-height:1.5;}
  .sb-perhire b{display:block;font-size:24px;font-weight:900;color:var(--ink);}
  .sb-perhire a{color:var(--coral-text);font-weight:800;text-decoration:underline;text-underline-offset:3px;}
  .sb-remind{display:block;width:100%;margin-top:12px;font:inherit;font-weight:800;font-size:16px;padding:14px 16px;border-radius:var(--r);border:2px solid var(--ink);background:var(--surface);color:var(--ink);box-shadow:4px 4px 0 var(--ink);cursor:pointer;}
  .sb-remind:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ink);}
  .sb-unpriced{margin:14px 0 0;font-size:14px;color:var(--ink-2);}
  .sb-free-btn{width:100%;margin-top:18px;font-size:17px;}
  .sb-note{margin:14px 0 0;font-size:15px;font-weight:700;color:var(--ink);background:var(--indigo-tint);border-radius:12px;padding:12px 14px;overflow-wrap:anywhere;}
  .sb-share{margin:14px 0 0;}
  .sb-share button{font:inherit;font-size:15px;font-weight:800;background:none;border:0;padding:6px 0;color:var(--indigo-text);text-decoration:underline;text-underline-offset:3px;cursor:pointer;}
  .sb-hiring .sb-share button{color:var(--coral-text);}
  .sb-fine{margin:16px 0 0;font-size:13px;color:var(--ink-3);line-height:1.5;}
  .sb-capture{grid-column:1 / 2;}
  .sb-mini{display:none;}
  @media(max-width:980px){
    .sb-mini{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:40;align-items:center;gap:12px;padding:12px 16px;border:2px solid var(--ink);border-radius:14px;background:var(--surface);box-shadow:4px 4px 0 var(--ink);color:var(--ink);text-decoration:none;}
    .sb-mini span{font-weight:800;font-size:14.5px;color:var(--ink-2);}
    .sb-mini b{font-size:26px;font-weight:900;color:var(--indigo);font-variant-numeric:tabular-nums;}
    .sb-hiring .sb-mini b{color:var(--coral-text);}
    .sb-mini .sb-mini-go{margin-left:auto;color:var(--ink);text-decoration:underline;text-underline-offset:3px;}
    .sb{grid-template-columns:1fr;}
    .sb-bill{position:relative;top:0;order:2;}
    .sb-capture{grid-column:auto;order:3;}
  }
  @media (prefers-reduced-motion: reduce){.sb-pop{animation:none;}.sb-starter,.sb-opt,.sb-slot{transition:none;}.sb-starter:hover,.sb-opt:hover{transform:none;}}
`
