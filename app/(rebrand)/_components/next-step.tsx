import { Dots, Squiggle } from './retro'
import { keepLast } from '@/lib/site-line'

/**
 * The closing band: one line and one button, so no page ends on more
 * information with nothing to do next (journey pass, Nov 15, 2026). Side
 * sets the color: indigo for job seekers, coral for hiring teams, ink when
 * the page is for both. Self-contained styles, so it also works at the end
 * of the static guides.
 */
export function NextStep({ side = 'both', line, button, href }: { side?: 'seekers' | 'hiring' | 'both'; line: string; button: string; href: string }) {
  return (
    <section className={`ns ns-${side}`} aria-label="Next step">
      <style dangerouslySetInnerHTML={{ __html: NS_CSS }} />
      <div className="ns-in">
        <div className="ns-box">
          <Squiggle className="ns-squig" />
          <Dots className="ns-dots" />
          <p className="ns-line">{keepLast(line)}</p>
          <a className="ns-btn" href={href}>
            {button} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}

const NS_CSS = `
  .ns{padding:clamp(72px,9vw,120px) 0 clamp(80px,10vw,128px);}
  .ns-in{max-width:1200px;margin:0 auto;padding:0 clamp(16px,4vw,32px);}
  .ns-box{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px 32px;padding:clamp(26px,4vw,40px);border:3px solid #1A1A22;border-radius:20px;box-shadow:8px 8px 0 #1A1A22;}
  .ns-seekers .ns-box{background:#6C47FF;color:#fff;}
  .ns-hiring .ns-box{background:#FF4F6A;color:#2A0B14;}
  .ns-both .ns-box{background:#fff;color:#1A1A22;}
  .ns-line{position:relative;z-index:2;margin:0;max-width:640px;font-weight:900;font-size:clamp(22px,2.6vw,30px);line-height:1.2;letter-spacing:-0.015em;text-wrap:balance;}
  .ns-btn{position:relative;z-index:2;display:inline-flex;align-items:center;gap:8px;padding:16px 22px;border:3px solid #1A1A22;border-radius:12px;background:#fff;color:#1A1A22;font-weight:900;font-size:17px;line-height:1;box-shadow:4px 4px 0 #1A1A22;text-decoration:none;transition:transform .12s ease,box-shadow .12s ease;}
  .ns-both .ns-btn{background:#6C47FF;color:#fff;}
  .ns-btn:hover,.ns-btn:focus-visible{transform:translate(2px,2px);box-shadow:2px 2px 0 #1A1A22;}
  .ns .memphis{position:absolute;z-index:1;pointer-events:none;overflow:visible;}
  .ns .memphis path{fill:none;stroke:currentColor;stroke-width:5;stroke-linecap:round;}
  .ns .m-squig{width:92px;height:28px;top:-18px;right:34px;}
  .ns .m-dots{width:110px;height:80px;bottom:-44px;left:-44px;background-image:radial-gradient(circle,currentColor 2.6px,transparent 3.1px);background-size:14px 14px;}
  .ns-seekers .m-squig{color:#FF4F6A;}
  .ns-seekers .m-dots{color:#A78BFA;}
  .ns-hiring .m-squig{color:#6C47FF;}
  .ns-hiring .m-dots{color:#1A1A22;opacity:.4;}
  .ns-both .m-squig{color:#FF4F6A;}
  .ns-both .m-dots{color:#A78BFA;}
  @media(max-width:560px){.ns .m-dots{left:-10px;}}
  @media (prefers-reduced-motion: reduce){.ns-btn{transition:none;}}
`
