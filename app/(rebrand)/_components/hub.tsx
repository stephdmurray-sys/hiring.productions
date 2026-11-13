import type { ReactNode } from 'react'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { homeCss } from '@/app/(rebrand)/home-css'

/**
 * Shared layout for the two audience hubs. Indigo is the job seeker's
 * side, coral the hiring team's.
 */

export interface HubPick {
  href: string
  label: string
  name: string
  domain: string
  line?: string
  stats: { value: string; label: string }[]
  rising?: boolean
}

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
}

export interface HubProps {
  side: 'seekers' | 'hiring'
  title: string
  dek: string
  proof: string
  heroCard: ReactNode
  situations: HubSituation[]
  situationsCta?: { text: string; href: string; label: string }
  picks: HubPick[]
  guides: HubGuide[]
  inResearch: string[]
}

const hubCss = `
  .hub-hero{color:#fff;padding:clamp(48px,7vw,96px) 0 clamp(56px,7vw,96px);overflow:hidden;}
  .hub-seekers .hub-hero{background:radial-gradient(900px 520px at 90% 0%,rgba(108,71,255,0.42) 0%,rgba(108,71,255,0) 60%),linear-gradient(160deg,var(--hero) 55%,var(--hero-2));}
  .hub-hiring .hub-hero{background:radial-gradient(900px 520px at 90% 0%,rgba(255,79,106,0.3) 0%,rgba(255,79,106,0) 60%),linear-gradient(160deg,var(--hero) 55%,var(--hero-2));}
  .hub-grid{display:grid;grid-template-columns:1.15fr 0.85fr;gap:56px;align-items:center;}
  .hub-crumbs{font-size:13px;color:#8B7FBF;margin-bottom:20px;}
  .hub-crumbs a{color:#B3A8DE;}
  .hub-hero h1{font-weight:900;font-size:clamp(40px,6.5vw,72px);line-height:1.02;letter-spacing:-0.035em;text-wrap:balance;}
  .hub-side{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;}
  .hub-side::before{content:"";width:9px;height:9px;border-radius:50%;}
  .hub-seekers .hub-side{color:#C4B5FD;} .hub-seekers .hub-side::before{background:#6C47FF;}
  .hub-hiring .hub-side{color:#FF8DA0;} .hub-hiring .hub-side::before{background:#FF4F6A;}
  .hub-dek{font-size:clamp(17px,1.6vw,20px);line-height:1.6;color:#D6CCF5;max-width:600px;margin-top:20px;}
  .hub-proof{display:flex;align-items:center;gap:10px;margin-top:26px;font-size:13px;color:#B3A8DE;}
  .hub-card{background:#fff;color:var(--ink);border-radius:20px;padding:24px;box-shadow:0 24px 60px rgba(8,4,24,0.45);}
  .hub-card .hc-k{font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;}
  .hub-seekers .hub-card .hc-k{color:#6C47FF;} .hub-hiring .hub-card .hc-k{color:#E23A56;}
  .hc-id{display:flex;align-items:center;gap:12px;}
  .hc-id b{font-weight:900;font-size:24px;}
  .hc-rows{margin-top:14px;}
  .hc-rows div{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid #F1F2F4;font-size:13.5px;color:var(--gray);}
  .hc-rows b{color:var(--ink);text-align:right;}
  .hc-go{display:inline-block;margin-top:14px;font-weight:700;font-size:13.5px;}
  .hub-seekers .hc-go{color:#6C47FF;} .hub-hiring .hc-go{color:#E23A56;}

  .sit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:36px;}
  .sit{display:flex;flex-direction:column;gap:10px;background:#fff;border:1px solid var(--border);border-radius:18px;padding:26px;transition:transform .18s,box-shadow .18s,border-color .18s;}
  .sit:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(20,20,32,0.08);}
  .hub-seekers .sit:hover{border-color:#C9BCFF;} .hub-hiring .sit:hover{border-color:#FFB3C0;}
  .sit b{font-weight:800;font-size:21px;line-height:1.25;color:var(--ink);letter-spacing:-0.01em;}
  .sit span{font-size:15px;color:var(--gray);line-height:1.6;}
  .sit i{font-style:normal;margin-top:auto;padding-top:6px;font-weight:700;font-size:13.5px;}
  .hub-seekers .sit i{color:#6C47FF;} .hub-hiring .sit i{color:#E23A56;}
  .sit-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:16px;background:var(--hero);color:#fff;border-radius:18px;padding:24px 28px;}
  .sit-cta p{font-size:17px;color:#D6CCF5;max-width:620px;}
  .sit-cta p b{color:#fff;}
  .sit-cta a{background:#FF4F6A;color:#fff;font-weight:800;font-size:15px;border-radius:999px;padding:14px 22px;transition:transform .15s,background .15s;}
  .sit-cta a:hover{background:#E23A56;transform:translateY(-1px);}

  .hub-hiring .mini-label{color:#E23A56;}
  .hub-hiring .mini:hover{border-color:#FFB3C0;}
  .hub-hiring .mini-go{color:#E23A56;}
  @media(max-width:980px){.hub-grid{grid-template-columns:1fr;gap:36px;}}
  @media(max-width:760px){.sit-grid{grid-template-columns:1fr;}.site-nav .links{-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent);mask-image:linear-gradient(90deg,#000 82%,transparent);}}
`

function Logo({ domain, size = 22 }: { domain: string; size?: number }) {
  return (
    <img
      className="logo-img"
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      width={size}
      height={size}
      alt=""
    />
  )
}

export function HubLogo(props: { domain: string; size?: number }) {
  return <Logo {...props} />
}

export function Hub(props: HubProps) {
  const sideName = props.side === 'seekers' ? 'For job seekers' : 'For hiring teams'
  return (
    <div className={`hub-${props.side}`}>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss + hubCss }} />
      <SiteNav active={props.side} />

      <header className="hub-hero">
        <div className="wrap hub-grid">
          <div>
            <p className="hub-crumbs">
              <a href="/">Home</a> &rsaquo; {sideName}
            </p>
            <p className="hub-side">{sideName}</p>
            <h1>{props.title}</h1>
            <p className="hub-dek">{props.dek}</p>
            <p className="hub-proof">
              <span className="pulse" aria-hidden="true" /> {props.proof}
            </p>
          </div>
          {props.heroCard}
        </div>
      </header>

      <section className="wrap" id="start">
        <h2>Start with what&rsquo;s going wrong</h2>
        <p className="lead">Match the tool to the actual problem, not the other way around.</p>
        <div className="sit-grid">
          {props.situations.map((s) => (
            <a className="sit" href={s.href} key={s.q}>
              <b>{s.q}</b>
              <span>{s.a}</span>
              <i>{s.link} &rarr;</i>
            </a>
          ))}
        </div>
        {props.situationsCta && (
          <div className="sit-cta">
            <p>{props.situationsCta.text}</p>
            <a href={props.situationsCta.href}>{props.situationsCta.label}</a>
          </div>
        )}
      </section>

      <section className="wrap" id="picks">
        <h2>This month&rsquo;s picks</h2>
        <p className="lead">The tools that lead on the evidence right now. Every card opens the full ranking.</p>
        <div className="mini-grid" style={{ marginTop: 36 }}>
          {props.picks.map((p) => (
            <a key={p.name} href={p.href} className={`mini${p.rising ? ' mini-rising' : ''}`}>
              <span className="mini-label">{p.label}</span>
              <span className="mini-id">
                <span className="mini-logo">
                  <Logo domain={p.domain} />
                </span>
                <b>{p.name}</b>
              </span>
              {p.line && <span className="mini-line">{p.line}</span>}
              <span className="mini-stats">
                {p.stats.map((st) => (
                  <span key={st.label}>
                    <b>{st.value}</b> {st.label}
                  </span>
                ))}
              </span>
              <span className="mini-go">See the evidence &rarr;</span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap" id="guides">
        <h2>The guides</h2>
        <div className="guide-grid">
          {props.guides.map((g) => (
            <a key={g.href} className={`gcard gcard-${props.side}`} href={g.href}>
              <span className="gside">Live guide</span>
              <b>{g.title}</b>
              <span>{g.detail}</span>
              <span className="gmeta">{g.meta}</span>
            </a>
          ))}
        </div>
        <div className="research">
          <p className="research-k">In research now</p>
          <div className="research-chips">
            {props.inResearch.map((n) => (
              <span key={n} className={`rchip rchip-${props.side}`}>
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" id="signup">
        <div className="signup-band">
          <div>
            <h2 className="signup-h">The monthly evidence check</h2>
            <p>One email a month: what moved, what changed price, and who broke from the pack.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
