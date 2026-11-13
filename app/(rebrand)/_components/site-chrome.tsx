/**
 * Shared navigation and footer. Paper header with a wordmark (the brand
 * is written in lowercase, BRAND.md), plain text links, and a footer set
 * like the back page of a report: a heavy rule, columns of links.
 */

export const chromeCss = `
  .site-nav{background:var(--paper);border-bottom:1px solid var(--rule);position:relative;z-index:30;}
  .site-nav nav{display:flex;align-items:center;gap:28px;min-height:68px;}
  .wordmark{font-weight:800;font-size:21px;letter-spacing:-0.01em;color:var(--ink);white-space:nowrap;}
  .wordmark i{font-style:normal;color:var(--coral);}
  .site-nav .links{display:flex;gap:26px;align-items:center;margin-left:auto;}
  .site-nav .links a{font-size:15px;font-weight:600;color:var(--ink-2);padding:6px 0;border-bottom:2px solid transparent;white-space:nowrap;}
  .site-nav .links a:hover{color:var(--ink);border-bottom-color:var(--rule-2);}
  .site-nav .links a.on{color:var(--ink);border-bottom-color:var(--ink);}
  @media(max-width:900px){
    .site-nav nav{flex-wrap:wrap;gap:4px 0;padding:14px 0 6px;}
    .site-nav .links{margin-left:0;width:100%;overflow-x:auto;scrollbar-width:none;gap:22px;}
    .site-nav .links::-webkit-scrollbar{display:none;}
    .site-nav .links a{padding:10px 0;}
  }

  .site-footer{margin-top:clamp(96px,12vw,150px);border-top:2px solid var(--ink);padding:44px 0 36px;font-size:15px;color:var(--ink-2);text-align:left;background:var(--paper);}
  .site-footer .fgrid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px;}
  .site-footer .fabout{max-width:300px;margin-top:12px;line-height:1.6;}
  .site-footer .fh{font-weight:800;color:var(--ink);font-size:15px;margin-bottom:12px;text-transform:none;letter-spacing:0;}
  .site-footer .flinks a{display:block;padding:5px 0;color:var(--ink-2);}
  .site-footer .flinks a:hover{color:var(--ink);text-decoration:underline;text-underline-offset:3px;}
  .site-footer .fbase{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:40px;padding-top:18px;border-top:1px solid var(--rule);font-size:13.5px;color:var(--ink-3);}
  @media(max-width:760px){.site-footer .fgrid{grid-template-columns:1fr 1fr;}.site-footer .fgrid > div:first-child{grid-column:1 / -1;}}
`

type NavKey = 'hiring' | 'seekers' | 'review' | 'vendors' | 'consulting' | null

export function Wordmark() {
  return (
    <span className="wordmark">
      hiring<i>.</i>productions
    </span>
  )
}

export function SiteNav({ active = null }: { active?: NavKey }) {
  const link = (key: NavKey, href: string, label: string) => (
    <a href={href} className={active === key ? 'on' : undefined} aria-current={active === key ? 'page' : undefined}>
      {label}
    </a>
  )
  return (
    <div className="site-nav">
      <div className="wrap">
        <nav aria-label="Main">
          <a href="/" aria-label="hiring.productions home">
            <Wordmark />
          </a>
          <span className="links">
            {link('seekers', '/for-job-seekers', 'For job seekers')}
            {link('hiring', '/for-hiring-teams', 'For hiring teams')}
            {link('review', '/how-we-review', 'How we review')}
            {link('vendors', '/for-vendors', 'For vendors')}
            {link('consulting', '/consulting', 'Free stack recommendation')}
          </span>
        </nav>
      </div>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Wordmark />
            <p className="fabout">Independent reviews of the tools on both sides of hiring. Every score carries the date we checked it.</p>
          </div>
          <div className="flinks">
            <p className="fh">Job seekers</p>
            <a href="/guides/best-resume-tools">Resume builders</a>
            <a href="/guides/best-resume-tools#rankings">ATS resume checkers</a>
            <a href="/guides/best-resume-tools#cost">What a year costs</a>
            <a href="/for-job-seekers">All job seeker guides</a>
          </div>
          <div className="flinks">
            <p className="fh">Hiring teams</p>
            <a href="/guides/best-ats-for-small-teams">Applicant tracking systems</a>
            <a href="/guides/best-recruiter-training">Recruiter training</a>
            <a href="/consulting">Free stack recommendation</a>
            <a href="/for-hiring-teams">All hiring team guides</a>
          </div>
          <div className="flinks">
            <p className="fh">About</p>
            <a href="/how-we-review">How we review</a>
            <a href="/advertiser-disclosure">Advertiser disclosure</a>
            <a href="/for-vendors">For vendors</a>
            <a href="mailto:hello@hiring.productions">hello@hiring.productions</a>
          </div>
        </div>
        <div className="fbase">
          <span>&copy; 2026 hiring.productions</span>
          <span>No vendor can pay for a placement, a ranking or a score.</span>
        </div>
      </div>
    </footer>
  )
}
