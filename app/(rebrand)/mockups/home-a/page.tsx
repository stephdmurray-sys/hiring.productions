import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Dots, Squiggle, Swash, Zigzag, retroCss } from '@/app/(rebrand)/_components/retro'
import { ToolIcon } from '@/app/(rebrand)/_components/free-tools'
import { keepLast } from '@/lib/site-line'
import { HERO, NOW_PLAYING, STUCK, mockBarCss, sideName } from '../home-kit'

export const metadata: Metadata = { title: 'Homepage option A: Clapperboards', robots: { index: false, follow: false } }

/**
 * Homepage option A, "Clapperboards" (Nov 16, 2026). Closest to the layout Stephanie liked:
 * the headline on the left, two clapperboards on the right that snap shut on hover, the
 * challenges in a band under the hero, then four featured pages, two per side.
 */
export default function HomeA() {
  const lanes = [HERO.seekers, HERO.hiring].map((l, i) => ({ ...l, side: (i === 0 ? 'seekers' : 'hiring') as 'seekers' | 'hiring' }))
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + retroCss + mockBarCss + css }} />
      <p className="mock-bar">
        Option A: Clapperboards <a href="/mockups/home-b">See option B</a>
      </p>
      <SiteNav />

      <header className="wrap ha-hero">
        <div className="ha-copy">
          <h1 className="display ha-h1">
            Hiring is a{' '}
            <span className="ha-nowrap">
              <Swash>production</Swash>.
            </span>
          </h1>
          <p className="dek ha-dek">{keepLast(HERO.dek)}</p>
          <ul className="ha-trust">
            {HERO.trust.map((t) => (
              <li key={t}>
                <i aria-hidden="true" />
                {keepLast(t)}
              </li>
            ))}
          </ul>
        </div>

        <div className="ha-claps">
          <Dots className="ha-dots" />
          <Zigzag className="ha-zig" />
          {lanes.map((l) => (
            <a className={`clap clap-${l.side}`} href={l.href} key={l.side}>
              <span className="clap-stick" aria-hidden="true" />
              <span className="clap-band" aria-hidden="true" />
              <span className="clap-k">{l.k}</span>
              <span className="clap-title">
                {l.title[0]}
                <mark>{l.title[1]}</mark>
                {l.title[2]}
              </span>
              <span className="clap-line">{keepLast(l.line)}</span>
              <span className="btn clap-go">
                {l.cta} <span className="arr">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </header>

      <section className="ha-stuck" aria-labelledby="stuck-h">
        <div className="wrap">
          <Squiggle className="ha-squig" />
          <h2 id="stuck-h">Where are you stuck?</h2>
          <div className="ha-groups">
            {(['seekers', 'hiring'] as const).map((side) => (
              <div className={`ha-group ha-group-${side}`} key={side}>
                <p className={`pill pill-${side} ha-group-k`}>{sideName(side)}</p>
                <div className="ha-tiles">
                  {STUCK[side].map((c) => (
                    <a className={`ha-tile ha-${side}`} href={c.href} key={c.id}>
                      <span className="ha-icon">
                        <ToolIcon name={c.icon} />
                      </span>
                      <span className="ha-q">{keepLast(c.title)}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap ha-now" aria-labelledby="now-h">
        <div className="ha-now-head">
          <h2 id="now-h">Now playing</h2>
          <a className="tl" href="/guides">
            Every guide <span className="arr">&rarr;</span>
          </a>
        </div>
        <div className="ha-cards">
          {NOW_PLAYING.map((f) => (
            <a className={`ha-card ha-${f.side}`} href={f.href} key={f.href}>
              <span className="ha-card-icon">
                <ToolIcon name={f.icon} />
              </span>
              <span className="ha-card-body">
                <span className={`pill pill-sm pill-${f.side}`}>{sideName(f.side)}</span>
                <b>{keepLast(f.title)}</b>
                <span>{keepLast(f.line)}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="ha-rest">The rest of the homepage stays as it is under here: the scoreboard, Stephanie&rsquo;s picks and the guides.</p>
      </section>

      <SiteFooter />
    </>
  )
}

const css = `
  /* Hero: words left, clapperboards right */
  .ha-nowrap{white-space:nowrap;}
  .ha-hero{overflow-x:clip;display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.3fr);gap:clamp(32px,5vw,72px);align-items:center;padding-top:clamp(56px,7vw,96px);padding-bottom:clamp(72px,9vw,120px);}
  .ha-copy{position:relative;z-index:3;}
  .ha-h1{font-size:clamp(50px,6.4vw,84px);line-height:.98;}
  .ha-h1 .swash-line path{stroke:var(--indigo);}
  .ha-dek{margin-top:26px;max-width:520px;}
  .ha-trust{list-style:none;display:grid;gap:12px;margin:30px 0 0;padding:0;}
  .ha-trust li{display:flex;align-items:center;gap:12px;font-size:17px;font-weight:700;color:var(--ink);}
  .ha-trust i{position:relative;flex:none;width:24px;height:24px;border:2.5px solid var(--ink);border-radius:7px;background:var(--lavender);}
  .ha-trust i::after{content:"";position:absolute;left:6px;top:2px;width:6px;height:11px;border-right:3px solid var(--ink);border-bottom:3px solid var(--ink);transform:rotate(45deg);}

  .ha-claps{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:28px;padding-top:40px;}
  .ha-claps::before{content:"";position:absolute;z-index:0;inset:-8% -10% -14% -8%;border-radius:46% 54% 42% 58% / 52% 44% 56% 48%;background:var(--indigo-tint);}
  .ha-claps > .m-dots,.ha-claps > .m-zig{z-index:1;}
  .ha-dots{top:-6px;right:-18px;color:var(--lavender);}
  .ha-zig{bottom:-46px;left:22%;color:var(--coral);}

  /* A clapperboard: a striped stick hinged at the left that snaps shut on hover */
  .clap{--side:var(--indigo);position:relative;z-index:2;display:flex;flex-direction:column;gap:14px;padding:58px 26px 28px;background:var(--side);color:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--ink);text-decoration:none;}
  .clap-hiring{--side:var(--coral);color:var(--ink);}
  .clap-band,.clap-stick{position:absolute;left:-3px;right:-3px;height:30px;border:3px solid var(--ink);background:repeating-linear-gradient(135deg,var(--ink) 0 22px,#fff 22px 44px);}
  .clap-band{top:-3px;border-radius:18px 18px 0 0;}
  .clap-stick{top:-34px;border-radius:8px;transform-origin:3px 100%;transform:rotate(-11deg);transition:transform .22s cubic-bezier(.3,1.6,.6,1);}
  .clap-stick::before{content:"";position:absolute;left:-2px;bottom:-12px;width:14px;height:14px;border-radius:50%;background:var(--ink);}
  .clap:hover .clap-stick,.clap:focus-visible .clap-stick{transform:rotate(0deg);}
  .clap-k{font-size:14px;font-weight:800;opacity:.92;}
  .clap-title{font-size:clamp(28px,2.7vw,38px);font-weight:900;line-height:1.02;letter-spacing:-0.025em;text-wrap:balance;}
  .clap-title mark{display:inline-block;background:#fff;color:var(--ink);padding:0 8px;border-radius:10px;transform:rotate(-2deg);}
  .clap-hiring .clap-title mark{transform:rotate(2deg);}
  .clap-line{font-size:17px;line-height:1.5;}
  .clap-go{align-self:flex-start;margin-top:6px;background:#fff;color:var(--ink);}
  .clap:hover .clap-go{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ink);}

  /* Where are you stuck? */
  .ha-stuck{position:relative;background:linear-gradient(90deg,var(--indigo-tint) 50%,var(--coral-tint) 50%);border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);padding:clamp(64px,8vw,104px) 0;}
  .ha-stuck .wrap{position:relative;}
  .ha-squig{top:-18px;right:4%;color:var(--coral);}
  .ha-stuck h2{font-size:clamp(40px,6vw,64px);font-weight:900;letter-spacing:-0.025em;line-height:1.05;text-align:center;}
  .ha-groups{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,3vw,44px);margin-top:44px;}
  .ha-group{display:flex;flex-direction:column;}
  .ha-group-k{align-self:flex-start;margin:0 0 16px;}
  .ha-tiles{flex:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:1fr;gap:16px;}
  .ha-tile{--fti-accent:var(--indigo);display:flex;flex-direction:column;align-items:center;gap:14px;padding:22px 14px 20px;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--indigo);text-align:center;text-decoration:none;transition:transform .14s ease,box-shadow .14s ease;}
  .ha-hiring.ha-tile{--fti-accent:var(--coral);box-shadow:6px 6px 0 var(--coral);}
  .ha-tile:hover,.ha-tile:focus-visible{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--ink);}
  .ha-icon{display:grid;place-items:center;width:72px;height:72px;border:3px solid var(--ink);border-radius:18px;background:var(--indigo-tint);}
  .ha-hiring .ha-icon{background:var(--coral-tint);}
  .ha-tile:nth-child(odd) .ha-icon{transform:rotate(-4deg);}
  .ha-tile:nth-child(even) .ha-icon{transform:rotate(3deg);}
  .ha-icon .fti{width:46px;height:46px;}
  .ha-q{font-size:17.5px;font-weight:900;line-height:1.2;letter-spacing:-0.01em;}

  /* Now playing */
  .ha-now{padding-top:clamp(80px,10vw,128px);}
  .ha-now-head{display:flex;justify-content:space-between;align-items:baseline;gap:20px;flex-wrap:wrap;}
  .ha-now h2{font-size:clamp(40px,6vw,64px);font-weight:900;letter-spacing:-0.025em;line-height:1.05;}
  .ha-now-head .tl{font-size:17px;font-weight:800;}
  .ha-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:36px;}
  .ha-card{--fti-accent:var(--indigo);display:flex;gap:20px;align-items:flex-start;padding:24px;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);text-decoration:none;transition:transform .14s ease,box-shadow .14s ease;}
  .ha-card.ha-hiring{--fti-accent:var(--coral);}
  .ha-card:hover,.ha-card:focus-visible{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--ink);}
  .ha-card-icon{flex:none;display:grid;place-items:center;width:84px;height:84px;border:3px solid var(--ink);border-radius:18px;background:var(--indigo-tint);}
  .ha-hiring .ha-card-icon{background:var(--coral-tint);}
  .ha-card-icon .fti{width:54px;height:54px;}
  .ha-card-body{display:grid;gap:8px;justify-items:start;}
  .ha-card-body b{font-size:clamp(20px,1.9vw,23px);font-weight:900;line-height:1.2;letter-spacing:-0.015em;}
  .ha-card-body > span:last-child{font-size:16px;line-height:1.5;color:var(--ink-2);}
  .ha-rest{margin-top:48px;padding:16px 20px;border:2px dashed var(--rule-2);border-radius:12px;font-size:15px;color:var(--ink-3);text-align:center;}

  @media(max-width:1000px){
    .ha-hero{grid-template-columns:1fr;}
    .ha-groups{grid-template-columns:1fr;}
    .ha-stuck{background:var(--paper);}
    .ha-group{padding:22px 18px;border:3px solid var(--ink);border-radius:20px;}
    .ha-group-seekers{background:var(--indigo-tint);}
    .ha-group-hiring{background:var(--coral-tint);}
  }
  @media(max-width:640px){
    .ha-claps{grid-template-columns:1fr;gap:64px;padding-top:56px;}
    .clap-stick{transform:rotate(-6deg);}
    .ha-claps::before{inset:20px -12px -24px -12px;border-radius:32px;}
    .ha-tiles{grid-template-columns:1fr;grid-template-rows:none;}
    .ha-tile{flex-direction:row;text-align:left;padding:16px;}
    .ha-icon{width:60px;height:60px;}
    .ha-icon .fti{width:38px;height:38px;}
    .ha-cards{grid-template-columns:1fr;}
    .ha-card-icon{width:64px;height:64px;}
    .ha-card-icon .fti{width:40px;height:40px;}
  }
  @media(prefers-reduced-motion:reduce){.clap-stick,.ha-tile,.ha-card{transition:none;}}
`
