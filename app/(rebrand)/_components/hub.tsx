import { keepLast } from '@/lib/site-line'
import type { ReactNode } from 'react'
import { wholeList } from '@/lib/evidence/guided'
import { StartHere, retroCss } from './retro'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss, type BoardRow } from '@/app/(rebrand)/_components/scoreboard'
import { OnTheRise, risingCss } from '@/app/(rebrand)/_components/rising'
import { calcCss } from '@/app/(rebrand)/_components/widgets-css'
import { homeCss } from '@/app/(rebrand)/home-css'
import { JsonLd, graph, rankingLd, SITE } from '@/app/(rebrand)/_components/structured'
import { problemsFor } from '@/lib/evidence/recommend'

/**
 * Shared layout for the two audience hubs. The hero is a full block of the
 * side's color (indigo for job seekers, coral for hiring teams) carrying the
 * logos of every tool that side's guides cover.
 *
 * Six sections, no more (review of Nov 14, 2026): headline, "Where are you
 * stuck?", the scoreboard, Stephanie's picks, the guides and the email.
 * Everything else lives on its own page and is reached from the guides.
 */

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
  board: { title: string; checked: string; rows: BoardRow[]; foot?: ReactNode; heading?: string; lead?: string }
  guides: HubGuide[]
  inResearch: string
}

const hubCss = `
  .hub-hero{padding:clamp(40px,5.5vw,72px) 0 clamp(40px,5vw,64px);}
  .hub-seekers .hub-hero{background:var(--indigo);color:#fff;}
  .hub-hiring .hub-hero{background:var(--coral);color:var(--coral-deep);}
  .hub-hero .crumbs{color:inherit;}
  .hub-hero .crumbs a{text-decoration-color:currentColor;}
  .hub-hero h1{color:inherit;font-size:clamp(40px,5.4vw,68px);line-height:1.04;}
  .hub-hero .dek{color:inherit;}
  .hub-hero .dateline{color:inherit;}
  .hub-hero :focus-visible{outline-color:currentColor;}
  .hub-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,0.9fr);gap:56px;align-items:center;}
  .hub-logos{display:flex;flex-wrap:wrap;gap:10px;margin-top:32px;}
  .hub-logos a{display:inline-flex;border-radius:12px;}
  .hub-logos .lg{border:2px solid var(--ink);box-shadow:3px 3px 0 var(--ink);border-radius:12px;transition:transform .12s ease,box-shadow .12s ease;}
  .hub-logos a:hover .lg{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--ink);}
  @media (prefers-reduced-motion: reduce){.hub-logos .lg{transition:none;}}
  .hub-hero{position:relative;overflow:hidden;}
  .hub-start{background:#fff;color:var(--ink);border-radius:14px;padding:26px 26px 12px;border:3px solid var(--ink);box-shadow:8px 8px 0 var(--ink);}
  .hub-start h2{font-size:clamp(24px,2.4vw,30px);font-weight:900;letter-spacing:-0.02em;line-height:1.15;margin:0 0 8px;color:var(--ink);}
  .hub-start a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 0;border-top:1px solid var(--rule);font-weight:800;font-size:16.5px;color:var(--ink);}
  .hub-start a .arr{color:var(--ink-3);transition:transform .15s ease;}
  .hub-start a:hover{color:var(--indigo-text);}
  .hub-hiring .hub-start a:hover{color:var(--coral-text);}
  .hub-start a:hover .arr{transform:translateX(3px);}

  .sit-cta{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:40px;}
  .sit-cta p{font-size:19px;color:var(--ink);max-width:640px;line-height:1.5;font-weight:600;}


  @media(max-width:960px){
    .hub-grid{display:flex;flex-direction:column;align-items:stretch;gap:0;}
    .hub-grid > div:first-child{display:contents;}
    .hub-grid h1{order:1;}
    .hub-grid .dek{order:2;}
    .hub-grid .start-wrap{order:3;margin:28px 8px 0 0;}
    .hub-grid .hub-logos{order:4;margin-top:48px;}
    .hub-grid .dateline{order:5;}
  }
`

export function Hub(props: HubProps) {
  const sideName = props.side === 'seekers' ? 'For job seekers' : 'For hiring teams'
  return (
    <div className={`hub-${props.side}`}>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + risingCss + calcCss + homeCss + hubCss + retroCss }} />
      <JsonLd
        data={graph(
          rankingLd(
            props.board.title,
            `${SITE}/${props.side === 'seekers' ? 'for-job-seekers' : 'for-hiring-teams'}`,
            props.board.rows.map((r) => ({ name: r.name, url: r.href.startsWith('/') ? `${SITE}${r.href}` : r.href, score: r.score })),
          ),
        )}
      />
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
            <StartHere side={props.side}>
              <aside className="hub-start" aria-labelledby="hub-start-h">
                <h2 id="hub-start-h">Where are you stuck?</h2>
                {wholeList(props.side).map((p) => (
                  <a key={p.id} href={`/what-should-i-use?side=${props.side}&problem=${p.id}#questions`}>
                    {p.label} <span className="arr">&rarr;</span>
                  </a>
                ))}
              </aside>
            </StartHere>
          </div>
        </div>
      </header>

      <section className="wrap sec" id="scoreboard">
        <h2>{keepLast(props.board.heading ?? 'This month\u2019s scoreboard')}</h2>
        <p className="lead">{props.board.lead ?? 'Our picks are marked. Open any tool for the full review.'}</p>
        <div style={{ marginTop: 32 }}>
          <Scoreboard side={props.side} title={props.board.title} checked={props.board.checked} rows={props.board.rows} foot={props.board.foot} />
        </div>
      </section>

      <section className="wrap sec" id="rising">
        <h2>{props.side === 'seekers' ? 'Stephanie\u2019s up-and-coming\u00a0fav' : 'Stephanie\u2019s pick'}</h2>
        <p className="lead">This is Stephanie&rsquo;s opinion, and it has no effect on the score.</p>
        <OnTheRise side={props.side} showPicks />
      </section>

      <section className="wrap sec" id="guides">
        <h2>The guides</h2>
        <div className="guides">
          {props.guides.map((g) => (
            <a className="guide" href={g.href} key={g.href}>
              <span className="guide-side">
                <span>
                  <span className={`pill pill-sm pill-${props.side}`}>{props.side === 'seekers' ? 'Job seekers' : 'Hiring teams'}</span>
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
        <p className="research">Coming next: {props.inResearch}.</p>
      </section>

      <section className="wrap sec" id="signup">
        <div className="signup-card">
          <div>
            <h2>Get an email when these rankings change</h2>
            <p className="sublead">
              One email a month: the tools that moved and the prices that went&nbsp;up.
            </p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
