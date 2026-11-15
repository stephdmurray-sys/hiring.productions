/** Styles for Stephanie's verdict faces and the face loop (pick-face.tsx, face-loop.tsx). Sizes scale from the box size. */
export const pickFaceCss = `
  .pf{position:relative;display:inline-block;flex:none;vertical-align:middle;}
  .pf-circle{position:absolute;inset:0;border-radius:50%;border:3px solid var(--ink);box-shadow:5px 5px 0 var(--ink);overflow:hidden;transition:background-color .25s ease;}
  .pf-circle img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .pf-solid .pf-circle{background:var(--indigo-tint);}
  .pf-worth .pf-circle{background:var(--coral);}
  .pf-love .pf-circle{background:var(--indigo);}
  .pf-dots{position:absolute;left:-14%;top:-12%;width:46%;height:46%;background-image:radial-gradient(circle,var(--lavender) 30%,transparent 34%);background-size:17% 17%;z-index:0;}
  .pf-circle{z-index:1;}
  .pf-zig{position:absolute;left:-18%;bottom:-16%;width:44%;height:auto;z-index:0;overflow:visible;}
  .pf-zig polyline{fill:none;stroke:currentColor;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}
  .pf-solid .pf-zig,.pf-worth .pf-zig{color:var(--indigo);}
  .pf-love .pf-zig{color:var(--coral);}
  .pf-sticker{position:absolute;right:-22%;bottom:-2%;z-index:2;padding:7px 11px 6px;font-weight:900;font-size:13px;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;border:3px solid var(--ink);border-radius:10px;transform:rotate(-4deg);}
  .pf-solid .pf-sticker{background:var(--ink);color:#fff;box-shadow:4px 4px 0 var(--coral);}
  .pf-worth .pf-sticker{background:var(--indigo);color:#fff;box-shadow:4px 4px 0 var(--ink);}
  .pf-love .pf-sticker{background:var(--coral);color:var(--ink);box-shadow:4px 4px 0 var(--ink);}
  .pf-loop .pf-zig{transition:color .25s ease;}
  .pf-loop .pf-circle img{transition:opacity .15s ease,transform .3s cubic-bezier(.34,1.56,.64,1);}
  .pf-loop .pf-on{opacity:1;transform:translateY(0) scale(1);}
  .pf-loop .pf-off{opacity:0;transform:translateY(12%) scale(.86);}
  /* The small mark beside a "Stephanie's pick" label. */
  .kit-label + .pm{margin-left:10px;}
  .pm{display:inline-flex;align-items:center;gap:8px;vertical-align:middle;}
  .pm-face{position:relative;width:32px;height:32px;border-radius:50%;border:2px solid var(--ink);overflow:hidden;flex:none;}
  .pm-face img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .pm-solid .pm-face{background:var(--indigo-tint);}
  .pm-worth .pm-face{background:var(--coral);}
  .pm-love .pm-face{background:var(--indigo);}
  .pm-label{padding:4px 8px 3px;font-weight:900;font-size:11.5px;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;border:2px solid var(--ink);border-radius:7px;transform:rotate(-3deg);}
  .pm-solid .pm-label{background:var(--ink);color:#fff;}
  .pm-worth .pm-label{background:var(--indigo);color:#fff;}
  .pm-love .pm-label{background:var(--coral);color:var(--ink);}
  @media (prefers-reduced-motion: reduce){.pf-circle,.pf-loop .pf-circle img,.pf-loop .pf-zig{transition:none;}}
`
