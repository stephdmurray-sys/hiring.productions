import type { ReactNode } from 'react'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { homeCss } from '@/app/(rebrand)/home-css'

/**
 * Shared layout for the two audience hubs. Indigo marks the job seeker's
 * side, coral the hiring team's, as small dots only.
 */

export interface HubPick {
  href: string
  label: string
  name: string
  domain: string
  line: string
  overall: string
  users: string
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
  dateline: string
  receipt: ReactNode
  situations: HubSituation[]
  situationsCta?: { text: string; href: string; label: string }
  picks: HubPick[]
  guides: HubGuide[]
  inResearch: string
}

const hubCss = `
  .hub-side{display:inline-flex;align-items:center;font-weight:700;font-size:15px;color:var(--ink-2);margin-bottom:14px;}
  .sit-cta{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;margin-top:32px;padding:26px 0 0;border-top:2px solid var(--ink);}
  .sit-cta p{font-size:19px;color:var(--ink);max-width:640px;line-height:1.5;}
`

export function HubLogo({ domain, size = 16 }: { domain: string; size?: number }) {
  return <img className="logo-img" src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} width={size} height={size} alt="" />
}

export function Hub(props: HubProps) {
  const sideName = props.side === 'seekers' ? 'For job seekers' : 'For hiring teams'
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss + hubCss }} />
      <SiteNav active={props.side} />

      <header className="ph home-ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / {sideName}
          </p>
          <p className="hub-side">
            <span className={props.side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
            {sideName}
          </p>
          <div className="home-grid" style={{ marginTop: 0 }}>
            <div>
              <h1 className="display" style={{ fontSize: 'clamp(38px,4.6vw,60px)', lineHeight: 1.04 }}>
                {props.title}
              </h1>
              <p className="dek" style={{ marginTop: 22 }}>
                {props.dek}
              </p>
              <p className="dateline">{props.dateline}</p>
            </div>
            {props.receipt}
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
                  {s.link} &rarr;
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

      <section className="wrap sec" id="picks">
        <h2>This month&rsquo;s picks</h2>
        <div className="tscroll">
          <table className="ledger picks-table">
            <thead>
              <tr>
                <th>Pick</th>
                <th>Tool</th>
                <th>Why</th>
                <th className="num">Overall</th>
                <th className="num">Users</th>
              </tr>
            </thead>
            <tbody>
              {props.picks.map((p) => (
                <tr key={p.name}>
                  <td className="pick-cell">{p.label}</td>
                  <td className="tool-cell">
                    <HubLogo domain={p.domain} />
                    <a href={p.href}>{p.name}</a>
                  </td>
                  <td>{p.line}</td>
                  <td className="num tscore">{p.overall}</td>
                  <td className="num">{p.users}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap sec" id="guides">
        <h2>The guides</h2>
        <div className="rows">
          {props.guides.map((g) => (
            <a className="row guide-row" href={g.href} key={g.href}>
              <span>
                <span className={props.side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
                Live guide
                <span className="mono guide-date">{g.meta}</span>
              </span>
              <span>
                <span className="row-title">{g.title}</span>
                <span className="guide-d">{g.detail}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="footnote">In research now: {props.inResearch}.</p>
      </section>

      <section className="wrap sec-tight" id="signup">
        <div className="signup-block">
          <div>
            <h2 className="h2-small">The monthly evidence check</h2>
            <p className="sublead">One email a month with what changed: rankings that moved and prices that went up.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
