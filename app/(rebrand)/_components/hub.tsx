import type { ReactNode } from 'react'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss, type BoardRow } from '@/app/(rebrand)/_components/scoreboard'
import { OnTheRise, risingCss } from '@/app/(rebrand)/_components/rising'
import { calcCss } from '@/app/(rebrand)/_components/widgets-css'
import { homeCss } from '@/app/(rebrand)/home-css'

/**
 * Shared layout for the two audience hubs. The hero is a full block of the
 * side's color (indigo for job seekers, coral for hiring teams) carrying the
 * logos of every tool that side's guides cover.
 */

export interface HubSituation {
  q: string
  a: string
  href: string
  link: string
}

export interface HubGuide {
  href: string
  title: string
  detail: string
  meta: string
  logos: { domain: string; name: string }[]
}

export interface HubProps {
  side: 'seekers' | 'hiring'
  title: string
  dek: string
  dateline: string
  logos: { domain: string; name: string; href: string; tip?: string }[]
  feature: { domain: string; name: string; title: string; line: string; href: string; linkText: string }
  situations: HubSituation[]
  situationsCta?: { text: string; href: string; label: string }
  board: { title: string; checked: string; rows: BoardRow[]; foot?: ReactNode }
  /** Extra section after the scoreboard, e.g. the cost calculator. */
  extra?: ReactNode
  guides: HubGuide[]
  inResearch: string
}

const hubCss = `
  .hub-hero{padding:clamp(40px,5.5vw,72px) 0 clamp(40px,5vw,64px);}
  .hub-seekers .hub-hero{background:var(--indigo);color:#fff;}
  .hub-hiring .hub-hero{background:var(--coral);color:var(--coral-deep);}
  .hub-hero .crumbs{color:inherit;opacity:0.85;}
  .hub-hero .crumbs a{text-decoration-color:currentColor;}
  .hub-hero h1{color:inherit;font-size:clamp(40px,5.4vw,68px);line-height:1.04;}
  .hub-hero .dek{color:inherit;opacity:0.94;}
  .hub-hero .dateline{color:inherit;opacity:0.8;}
  .hub-hero :focus-visible{outline-color:currentColor;}
  .hub-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,0.9fr);gap:56px;align-items:center;}
  .hub-logos{display:flex;flex-wrap:wrap;gap:10px;margin-top:32px;}
  .hub-logos a{display:inline-flex;border-radius:12px;}
  .hub-logos .lg{border:0;box-shadow:0 2px 0 rgba(0,0,0,0.14);border-radius:12px;}
  .hub-logos a:hover .lg{box-shadow:0 0 0 3px rgba(255,255,255,0.7);}
  .hub-feature{background:#fff;color:var(--ink);border-radius:var(--r-lg);padding:24px;display:grid;gap:14px;box-shadow:0 18px 40px rgba(20,10,60,0.18);}
  .hub-feature-id{display:flex;align-items:center;gap:14px;}
  .hub-feature-id span{font-size:14px;font-weight:800;color:var(--ink-2);}
  .hub-feature-id b{display:block;font-size:26px;font-weight:900;letter-spacing:-0.02em;color:var(--ink);line-height:1.1;}
  .hub-feature p{color:var(--ink-2);font-size:16px;}
  .hub-feature .tl{font-weight:800;}

  .sit-cta{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:40px;}
  .sit-cta p{font-size:19px;color:var(--ink);max-width:640px;line-height:1.5;font-weight:600;}


  @media(max-width:960px){.hub-grid{grid-template-columns:1fr;gap:28px;}}
`

export function Hub(props: HubProps) {
  const sideName = props.side === 'seekers' ? 'For job seekers' : 'For hiring teams'
  return (
    <div className={`hub-${props.side}`}>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + risingCss + calcCss + homeCss + hubCss }} />
      <SiteNav active={props.side} />

      <header className="hub-hero">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / {sideName}
          </p>
          <div className="hub-grid">
            <div>
              <h1 className="display">{props.title}</h1>
              <p className="dek">{props.dek}</p>
              <div className="hub-logos">
                {props.logos.map((l) => (
                  <a key={l.name} href={l.href} aria-label={l.name} data-tip={l.tip}>
                    <Logo domain={l.domain} name={l.name} size={48} />
                  </a>
                ))}
              </div>
              <p className="dateline">{props.dateline}</p>
            </div>
            <aside className="hub-feature" aria-label={props.feature.title}>
              <div className="hub-feature-id">
                <Logo domain={props.feature.domain} name={props.feature.name} size={56} />
                <span>
                  {props.feature.title}
                  <b>{props.feature.name}</b>
                </span>
              </div>
              <p>{props.feature.line}</p>
              <a className="tl" href={props.feature.href}>
                {props.feature.linkText} <span className="arr">&rarr;</span>
              </a>
            </aside>
          </div>
        </div>
      </header>

      <section className="wrap sec" id="start">
        <h2>Where is it going wrong?</h2>
        <div className="rows">
          {props.situations.map((s) => (
            <div className="row" key={s.q}>
              <span className="row-title">{s.q}</span>
              <div>
                <p>{s.a}</p>
                <a className="tl tl-strong" href={s.href}>
                  {s.link} <span className="arr">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        {props.situationsCta && (
          <div className="sit-cta">
            <p>{props.situationsCta.text}</p>
            <a className="btn" href={props.situationsCta.href}>
              {props.situationsCta.label}
            </a>
          </div>
        )}
      </section>

      <section className="wrap sec" id="scoreboard">
        <h2>This month&rsquo;s scoreboard</h2>
        <p className="lead">Our picks are marked. Open any tool for the full review.</p>
        <div style={{ marginTop: 32 }}>
          <Scoreboard side={props.side} title={props.board.title} checked={props.board.checked} rows={props.board.rows} foot={props.board.foot} />
        </div>
      </section>

      {props.extra}

      <section className="wrap sec" id="rising">
        <h2>Stephanie&rsquo;s pick</h2>
        <p className="lead">A pick is my judgment. A score is the evidence. You get both, labeled, and one never changes the other.</p>
        <OnTheRise side={props.side} showPicks />
      </section>

      <section className="wrap sec" id="guides">
        <h2>The guides</h2>
        <div className="guides">
          {props.guides.map((g) => (
            <a className="guide" href={g.href} key={g.href}>
              <span className="guide-side">
                <span className={props.side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
                <span>
                  Live guide
                  <span className="mono">{g.meta}</span>
                </span>
              </span>
              <span>
                <b>{g.title}</b>
                <span className="guide-d">{g.detail}</span>
              </span>
              <span className="lg-stack">
                {g.logos.map((l) => (
                  <Logo key={l.name} domain={l.domain} name={l.name} size={34} round />
                ))}
              </span>
            </a>
          ))}
        </div>
        <p className="research">In research now: {props.inResearch}.</p>
      </section>

      <section className="wrap sec" id="signup">
        <div className="signup-card">
          <div>
            <h2>The monthly evidence check</h2>
            <p className="sublead">One email a month with what changed: rankings that moved, prices that went up, and who&rsquo;s on the rise.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
