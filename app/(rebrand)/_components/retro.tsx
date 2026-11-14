import type { ReactNode } from 'react'

/**
 * The 80s layer (Stephanie, Nov 14, 2026): a "Start here" sticker, a
 * hand-drawn arrow that draws itself and keeps nudging toward the box it
 * points at, Memphis shapes (squiggle, zigzag, dot grid) and a hand-drawn
 * underline. Every shape is anchored to a corner of the box it frames;
 * nothing floats loose (Stephanie: "on purpose, not random"). Hard ink
 * outlines and shadows instead of soft blurs, so it reads as made by a
 * person, not generated.
 *
 * Shapes take their color from `color` (currentColor), so each page sets
 * them with one class. Colors stay inside the palette. Every animation
 * stops for people who ask their device for less motion.
 */

export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg className={`memphis m-squig ${className}`} viewBox="0 0 92 28" aria-hidden="true">
      <path d="M4 16 Q 14 2, 24 14 T 44 14 T 64 14 T 86 12" />
    </svg>
  )
}

export function Zigzag({ className = '' }: { className?: string }) {
  return (
    <svg className={`memphis m-zig ${className}`} viewBox="0 0 112 30" aria-hidden="true">
      <polyline points="4,24 20,6 36,24 52,6 68,24 84,6 100,24" />
    </svg>
  )
}

export function Dots({ className = '' }: { className?: string }) {
  return <span className={`memphis m-dots ${className}`} aria-hidden="true" />
}

/** A word with a hand-drawn underline that draws itself once. */
export function Swash({ children }: { children: ReactNode }) {
  return (
    <span className="swash">
      {children}
      <svg className="swash-line" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength={1} d="M4 15 C 60 7, 120 5, 180 9 S 270 15, 296 7" />
      </svg>
    </span>
  )
}

export function StartHere({ side, children }: { side: 'seekers' | 'hiring'; children: ReactNode }) {
  return (
    <div className={`start-wrap start-${side}`}>
      <Squiggle />
      <Dots />
      <Zigzag />
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
  .memphis{position:absolute;z-index:1;pointer-events:none;overflow:visible;}
  .memphis path,.memphis polyline{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}
  .m-squig{width:92px;height:28px;animation:m-float 6s ease-in-out infinite;}
  .m-squig path{stroke-width:5;}
  .m-dots{width:126px;height:96px;background-image:radial-gradient(circle,currentColor 2.6px,transparent 3.1px);background-size:14px 14px;animation:m-drift 9s ease-in-out infinite;}
  .m-zig{width:112px;height:30px;animation:m-float 7s ease-in-out .8s infinite;}
  .m-zig polyline{stroke-width:5.5;}
  @keyframes m-float{0%,100%{transform:translate(0,0) rotate(0deg);}50%{transform:translate(0,-9px) rotate(5deg);}}
  @keyframes m-drift{0%,100%{transform:translate(0,0);}50%{transform:translate(-7px,6px);}}

  .swash{position:relative;display:inline-block;white-space:nowrap;}
  .swash-line{position:absolute;left:-2%;bottom:-0.14em;width:104%;height:0.26em;overflow:visible;pointer-events:none;}
  .swash-line path{fill:none;stroke:var(--coral);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke;stroke-dasharray:1;stroke-dashoffset:1;animation:sa-draw .9s ease-out .4s forwards;}

  .start-wrap{position:relative;padding-top:88px;}
  .start-wrap > aside{position:relative;z-index:2;}
  .start-wrap .m-squig{top:30px;right:28px;}
  .start-wrap .m-dots{top:62px;right:-30px;}
  .start-wrap .m-zig{bottom:-34px;right:-26px;}
  .start-seekers .m-squig{color:var(--lavender);}
  .start-seekers .m-dots{color:var(--lavender);}
  .start-seekers .m-zig{color:var(--coral);}
  .start-hiring .m-squig{color:#fff;}
  .start-hiring .m-dots{color:var(--ink);opacity:.55;}
  .start-hiring .m-zig{color:var(--indigo);}

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

  @media(max-width:960px){.start-sticker{left:0;}.start-arrow{left:156px;}}
  @media(max-width:700px){.start-wrap .m-squig{display:none;}.start-wrap .m-dots{right:-46px;}}
  @media (prefers-reduced-motion: reduce){
    .start-sticker,.start-arrow g,.memphis{animation:none;}
    .start-arrow .sa-line,.start-arrow .sa-head,.swash-line path{animation:none;stroke-dashoffset:0;}
  }
`
