import type { Metadata } from 'next'
import Image from 'next/image'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Dots, Squiggle, Zigzag, retroCss } from '@/app/(rebrand)/_components/retro'
import { ToolIcon } from '@/app/(rebrand)/_components/free-tools'
import { keepLast } from '@/lib/site-line'
import { HERO, NOW_PLAYING, STUCK, mockBarCss, sideShort } from '../home-kit'

export const metadata: Metadata = { title: 'Homepage option B: Two doors', robots: { index: false, follow: false } }

/**
 * Homepage option B, "Two doors" (Nov 16, 2026). The headline over one big split card: an
 * indigo door for job seekers and a coral door for hiring teams, each with its three questions
 * right in the hero, and Stephanie on the seam. Then the featured pages as ticket stubs.
 */
export default function HomeB() {
  const doors = (['seekers', 'hiring'] as const).map((side) => ({ side, ...HERO[side], qs: STUCK[side] }))
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + retroCss + mockBarCss + css }} />
      <p className="mock-bar">
        Option B: Two doors <a href="/mockups/home-a">See option A</a>
      </p>
      <SiteNav />

      <header className="wrap hb-hero">
        <Squiggle className="hb-squig" />
        <h1 className="display hb-h1">{HERO.h1}</h1>
        <p className="dek hb-dek">{keepLast(HERO.dek)}</p>
      </header>

      <section className="wrap hb-stage" aria-label="Pick your side">
        <div className="hb-doors">
          <Dots className="hb-dots" />
          <Zigzag className="hb-zig" />
          <figure className="hb-face">
            <span className="hb-face-img">
              <Image src="/people/stephanie-love.webp" alt="Stephanie Murray" width={240} height={240} priority />
            </span>
            <figcaption>Made by Stephanie</figcaption>
          </figure>
          {doors.map((d) => (
            <div className={`hb-door hb-${d.side}`} key={d.side}>
              <p className="hb-k">{d.k}</p>
              <h2 className="hb-title">
                {d.title[0]}
                <span className="hb-word">{d.title[1]}</span>
                {d.title[2]}
              </h2>
              <p className="hb-line">{keepLast(d.line)}</p>
              <ul className="hb-qs">
                {d.qs.map((c) => (
                  <li key={c.id}>
                    <a href={c.href}>
                      <span className="hb-q-icon">
                        <ToolIcon name={c.icon} />
                      </span>
                      <span className="hb-q">{keepLast(c.title)}</span>
                      <span className="hb-q-arr" aria-hidden="true">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a className="btn hb-go" href={d.href}>
                {d.cta} <span className="arr">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
        <p className="hb-trust">
          <span>{HERO.trust[0]}</span>
          <span>{HERO.trust[1]}</span>
        </p>
      </section>

      <section className="wrap hb-now" aria-labelledby="hb-now-h">
        <h2 id="hb-now-h">Now playing</h2>
        <div className="hb-tickets">
          {NOW_PLAYING.map((f) => (
            <a className={`hb-ticket hb-t-${f.side}`} href={f.href} key={f.href}>
              <span className="hb-stub">
                <ToolIcon name={f.icon} />
                <span>{sideShort(f.side)}</span>
              </span>
              <span className="hb-t-body">
                <b>{keepLast(f.title)}</b>
                <span>{keepLast(f.line)}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="hb-all">
          <a className="tl" href="/guides">
            Every guide <span className="arr">&rarr;</span>
          </a>
        </p>
        <p className="hb-rest">The rest of the homepage stays as it is under here: the scoreboard, Stephanie&rsquo;s picks and the guides.</p>
      </section>

      <SiteFooter />
    </>
  )
}

const css = `
  .hb-hero{position:relative;text-align:center;padding-top:clamp(56px,7vw,96px);}
  .hb-squig{top:40px;left:6%;color:var(--coral);}
  .hb-h1{font-size:clamp(52px,8vw,108px);line-height:.96;}
  .hb-dek{margin:24px auto 0;max-width:640px;}

  /* The two doors, Stephanie on the seam */
  .hb-stage{padding-top:clamp(88px,9vw,120px);}
  .hb-doors{position:relative;display:grid;grid-template-columns:1fr 1fr;border:3px solid var(--ink);border-radius:26px;box-shadow:10px 10px 0 var(--ink);}
  .hb-dots{top:-36px;left:-26px;color:var(--lavender);}
  .hb-zig{bottom:-48px;right:8%;color:var(--indigo);}
  .hb-door{--fti-accent:var(--indigo);display:flex;flex-direction:column;gap:14px;padding:clamp(72px,7vw,92px) clamp(22px,3.4vw,48px) clamp(28px,3.4vw,44px);}
  .hb-seekers{background:var(--indigo);color:#fff;border-radius:23px 0 0 23px;}
  .hb-hiring{--fti-accent:var(--coral);background:var(--coral);color:var(--ink);border-radius:0 23px 23px 0;border-left:3px solid var(--ink);}
  .hb-k{font-size:15px;font-weight:800;opacity:.92;}
  .hb-title{font-size:clamp(34px,4vw,54px);font-weight:900;line-height:1;letter-spacing:-0.03em;text-wrap:balance;}
  .hb-word{display:inline-block;padding:0 10px;border-radius:12px;background:#fff;color:var(--ink);transform:rotate(-2deg);}
  .hb-hiring .hb-word{transform:rotate(2deg);}
  .hb-line{font-size:18px;line-height:1.5;max-width:460px;}
  .hb-qs{list-style:none;display:grid;gap:12px;margin:10px 0 6px;padding:0;}
  .hb-qs a{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;padding:12px 16px 12px 12px;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:16px;box-shadow:4px 4px 0 var(--ink);text-decoration:none;transition:transform .14s ease,box-shadow .14s ease;}
  .hb-qs a:hover,.hb-qs a:focus-visible{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ink);}
  .hb-q-icon{display:grid;place-items:center;width:52px;height:52px;border:2.5px solid var(--ink);border-radius:13px;background:var(--indigo-tint);}
  .hb-hiring .hb-q-icon{background:var(--coral-tint);}
  .hb-q-icon .fti{width:34px;height:34px;}
  .hb-q{font-size:18px;font-weight:900;line-height:1.2;letter-spacing:-0.01em;}
  .hb-q-arr{font-size:22px;font-weight:900;}
  .hb-go{align-self:flex-start;margin-top:8px;background:#fff;color:var(--ink);}
  .hb-face{position:absolute;z-index:3;top:-64px;left:50%;margin:0;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;}
  .hb-face-img{position:relative;display:block;width:128px;height:128px;border-radius:50%;border:3px solid var(--ink);overflow:hidden;background:var(--lavender);box-shadow:5px 5px 0 var(--ink);}
  .hb-face-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .hb-face figcaption{margin-top:-14px;padding:6px 12px;background:var(--ink);color:#fff;border-radius:10px;font-size:13.5px;font-weight:900;white-space:nowrap;transform:rotate(-4deg);}
  .hb-trust{display:flex;justify-content:center;flex-wrap:wrap;gap:8px 28px;margin-top:40px;font-size:16px;font-weight:700;color:var(--ink-2);}
  .hb-trust span::before{content:"";display:inline-block;width:9px;height:9px;margin-right:10px;border-radius:50%;background:var(--ink);vertical-align:2px;}

  /* Now playing, as ticket stubs */
  .hb-now{padding-top:clamp(96px,11vw,150px);}
  .hb-now h2{font-size:clamp(40px,6vw,64px);font-weight:900;letter-spacing:-0.025em;line-height:1.05;}
  .hb-tickets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:36px;}
  .hb-ticket{--fti-accent:var(--indigo);display:grid;grid-template-columns:118px minmax(0,1fr);background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);overflow:clip;text-decoration:none;transition:transform .14s ease,box-shadow .14s ease;}
  .hb-t-hiring{--fti-accent:var(--coral);}
  .hb-ticket:hover,.hb-ticket:focus-visible{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--ink);}
  .hb-stub{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:18px 10px;background:var(--indigo-tint);border-right:3px dashed var(--ink);font-size:13px;font-weight:900;text-align:center;}
  .hb-t-hiring .hb-stub{background:var(--coral-tint);}
  .hb-stub::before,.hb-stub::after{content:"";position:absolute;right:-13px;width:22px;height:22px;border-radius:50%;background:var(--paper);border:3px solid var(--ink);}
  .hb-stub::before{top:-14px;}
  .hb-stub::after{bottom:-14px;}
  .hb-stub .fti{width:48px;height:48px;}
  .hb-t-body{display:grid;gap:8px;align-content:center;padding:22px 24px;}
  .hb-t-body b{font-size:clamp(20px,1.9vw,23px);font-weight:900;line-height:1.2;letter-spacing:-0.015em;}
  .hb-t-body > span{font-size:16px;line-height:1.5;color:var(--ink-2);}
  .hb-all{margin-top:28px;font-size:17px;font-weight:800;}
  .hb-rest{margin-top:48px;padding:16px 20px;border:2px dashed var(--rule-2);border-radius:12px;font-size:15px;color:var(--ink-3);text-align:center;}

  @media(max-width:900px){
    .hb-doors{grid-template-columns:1fr;}
    .hb-seekers{border-radius:23px 23px 0 0;}
    .hb-hiring{border-radius:0 0 23px 23px;border-left:0;border-top:3px solid var(--ink);padding-top:clamp(32px,6vw,48px);}
    .hb-tickets{grid-template-columns:1fr;}
  }
  @media(max-width:520px){
    .hb-face-img{width:104px;height:104px;}
    .hb-ticket{grid-template-columns:84px minmax(0,1fr);}
    .hb-stub .fti{width:38px;height:38px;}
    .hb-q{font-size:16.5px;}
  }
  @media(prefers-reduced-motion:reduce){.hb-qs a,.hb-ticket{transition:none;}}
`
