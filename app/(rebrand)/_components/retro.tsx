import type { ReactNode } from 'react'

/**
 * The 80s layer (Stephanie, Nov 14, 2026): a "Start here" sticker, a
 * hand-drawn arrow that draws itself and keeps nudging toward the box it
 * points at, and Memphis shapes (squiggle, zigzag, ring, dot grid) peeking
 * out from behind it. Hard ink outlines and shadows instead of soft blurs,
 * so it reads as made by a person, not generated.
 *
 * Colors stay inside the palette: on indigo the sticker is coral and the
 * arrow white; on coral the sticker is indigo and the arrow ink. Every
 * animation stops for people who ask their device for less motion.
 */

export function StartHere({ side, children }: { side: 'seekers' | 'hiring'; children: ReactNode }) {
  return (
    <div className={`start-wrap start-${side}`}>
      <svg className="memphis m-squig" viewBox="0 0 92 28" aria-hidden="true">
        <path d="M4 16 Q 14 2, 24 14 T 44 14 T 64 14 T 86 12" />
      </svg>
      <span className="memphis m-dots" aria-hidden="true" />
      <svg className="memphis m-zig" viewBox="0 0 112 30" aria-hidden="true">
        <polyline points="4,24 20,6 36,24 52,6 68,24 84,6 100,24" />
      </svg>
      <svg className="memphis m-ring" viewBox="0 0 60 60" aria-hidden="true">
        <circle cx="30" cy="30" r="22" />
      </svg>
      <p className="start-sticker">Start here</p>
      <svg className="start-arrow" viewBox="0 0 170 96" aria-hidden="true">
        <g>
          <path
            className="sa-line"
            pathLength={1}
            d="M6 16 C 38 0, 84 0, 98 20 C 108 36, 88 48, 77 38 C 66 28, 88 18, 106 34 C 118 45, 121 55, 119 66"
          />
          <path className="sa-head" pathLength={1} d="M107 56 L119 67 L129 54" />
        </g>
      </svg>
      {children}
    </div>
  )
}

export const retroCss = `
  .start-wrap{position:relative;padding-top:88px;}
  .start-wrap > aside{position:relative;z-index:2;}

  .start-sticker{position:absolute;top:8px;left:-14px;z-index:3;margin:0;padding:10px 16px 9px;font-weight:900;font-size:17px;line-height:1;letter-spacing:.09em;text-transform:uppercase;white-space:nowrap;border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--ink);transform:rotate(-7deg);transform-origin:30% 60%;animation:st-in .7s cubic-bezier(.2,1.7,.4,1) .15s both, st-wiggle 5s ease-in-out 1.6s infinite;}
  .start-seekers .start-sticker{background:var(--coral);color:var(--ink);}
  .start-hiring .start-sticker{background:var(--indigo);color:#fff;}
  @keyframes st-in{from{opacity:0;transform:rotate(-16deg) scale(.6);}to{opacity:1;transform:rotate(-7deg) scale(1);}}
  @keyframes st-wiggle{0%,82%,100%{transform:rotate(-7deg);}86%{transform:rotate(-2deg);}90%{transform:rotate(-10deg);}94%{transform:rotate(-5deg);}}

  .start-arrow{position:absolute;top:12px;left:150px;width:170px;height:96px;z-index:3;overflow:visible;}
  .start-arrow path{fill:none;stroke-width:4.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;}
  .start-seekers .start-arrow path{stroke:#fff;}
  .start-hiring .start-arrow path{stroke:var(--ink);}
  .start-arrow .sa-line{animation:sa-draw 1s ease-out .55s forwards;}
  .start-arrow .sa-head{animation:sa-draw .25s ease-out 1.5s forwards;}
  .start-arrow g{animation:sa-nudge 1.6s ease-in-out 2s infinite;}
  @keyframes sa-draw{to{stroke-dashoffset:0;}}
  @keyframes sa-nudge{0%,100%{transform:translate(0,0);}50%{transform:translate(2px,5px);}}

  .memphis{position:absolute;z-index:1;pointer-events:none;overflow:visible;}
  .memphis path,.memphis polyline,.memphis circle{fill:none;stroke-linecap:round;stroke-linejoin:round;}
  .m-squig{top:30px;right:28px;width:92px;height:28px;animation:m-float 6s ease-in-out infinite;}
  .m-squig path{stroke-width:5;}
  .m-dots{top:62px;right:-30px;width:126px;height:96px;background-size:14px 14px;animation:m-drift 9s ease-in-out infinite;}
  .m-zig{bottom:-34px;right:-26px;width:112px;height:30px;animation:m-float 7s ease-in-out .8s infinite;}
  .m-zig polyline{stroke-width:5.5;}
  .m-ring{bottom:36px;left:-34px;width:60px;height:60px;animation:m-drift 8s ease-in-out .4s infinite;}
  .m-ring circle{stroke-width:6;}
  .start-seekers .m-squig path{stroke:var(--lavender);}
  .start-seekers .m-dots{background-image:radial-gradient(circle,var(--lavender) 2.6px,transparent 3.1px);}
  .start-seekers .m-zig polyline{stroke:var(--coral);}
  .start-seekers .m-ring circle{stroke:#fff;}
  .start-hiring .m-squig path{stroke:#fff;}
  .start-hiring .m-dots{background-image:radial-gradient(circle,var(--ink) 2.4px,transparent 2.9px);opacity:.55;}
  .start-hiring .m-zig polyline{stroke:var(--indigo);}
  .start-hiring .m-ring circle{stroke:#fff;}
  @keyframes m-float{0%,100%{transform:translate(0,0) rotate(0deg);}50%{transform:translate(0,-9px) rotate(5deg);}}
  @keyframes m-drift{0%,100%{transform:translate(0,0);}50%{transform:translate(-7px,6px);}}

  @media(max-width:960px){.start-sticker{left:0;}.start-arrow{left:156px;}.m-ring{left:-22px;}}
  @media(max-width:700px){.m-squig{display:none;}.m-dots{right:-46px;}}
  @media (prefers-reduced-motion: reduce){
    .start-sticker,.start-arrow g,.memphis{animation:none;}
    .start-arrow .sa-line,.start-arrow .sa-head{animation:none;stroke-dashoffset:0;}
  }
`
