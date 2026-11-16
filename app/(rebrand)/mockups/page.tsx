import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Design directions', robots: { index: false, follow: false } }

const css = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#FAF8F3;color:#1A1A22;font-family:inherit;}
  .m{max-width:900px;margin:0 auto;padding:64px 32px;}
  h1{font-weight:900;font-size:48px;letter-spacing:-0.02em;}
  p.l{font-size:18px;color:#4A4A5A;margin-top:10px;}
  .opts{display:grid;gap:14px;margin-top:32px;}
  .opt{display:grid;grid-template-columns:56px 1fr;gap:18px;align-items:center;background:#fff;border:1px solid #E6E2D8;border-radius:10px;padding:20px;}
  .opt:hover{border-color:#6C47FF;}
  .opt i{font-style:normal;width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:26px;color:#fff;}
  .opt b{display:block;font-size:21px;font-weight:800;}
  .opt span{color:#4A4A5A;}
`

const OPTIONS = [
  { href: '/mockups/home-a', letter: '1', name: 'Homepage facelift A: Clapperboards', bg: 'linear-gradient(135deg,#6C47FF 50%,#FF4F6A 50%)', what: 'Nov 16, 2026. The headline left, two clapperboards right that snap shut on hover, then Where are you stuck? and Now playing.' },
  { href: '/mockups/home-b', letter: '2', name: 'Homepage facelift B: Two doors', bg: 'linear-gradient(90deg,#6C47FF 50%,#FF4F6A 50%)', what: 'Nov 16, 2026. The headline over one split card, each side with its three questions right in the hero, Stephanie on the seam, then ticket stubs.' },
  { href: '/mockups/a', letter: 'A', name: 'Center stage', bg: '#170F3A', what: 'The first redesign’s dark indigo stage, cleaned up: real logos on the evidence cards, a moving strip of every tool we score, colorful pick cards.' },
  { href: '/mockups/b', letter: 'B', name: 'Both sides', bg: 'linear-gradient(90deg,#6C47FF 50%,#FF4F6A 50%)', what: 'An indigo half for job seekers and a coral half for hiring teams, each full of logos, with a ticker of this month’s findings.' },
  { href: '/mockups/c', letter: 'C', name: 'Scoreboard', bg: '#6C47FF', what: 'A light page with a live scoreboard: logos, filling score bars, publisher logos for the lists, and video thumbnails.' },
]

export default function Mockups() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="m">
        <h1>Three directions</h1>
        <p className="l">Same content, three looks. Pick one, or mix: &ldquo;A&rsquo;s hero with C&rsquo;s scoreboard&rdquo; works too.</p>
        <div className="opts">
          {OPTIONS.map((o) => (
            <a className="opt" href={o.href} key={o.letter}>
              <i style={{ background: o.bg }}>{o.letter}</i>
              <span>
                <b>{o.name}</b>
                <span>{o.what}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
