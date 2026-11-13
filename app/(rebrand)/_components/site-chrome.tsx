/**
 * Shared navigation and footer for the rebuilt (React) pages, so every
 * page links only to places that exist.
 */

export const chromeCss = `
  .site-nav{background:var(--hero);color:#fff;position:relative;z-index:30;}
  .site-nav nav{display:flex;align-items:center;gap:28px;height:64px;}
  .site-nav .logo{display:flex;align-items:center;gap:9px;font-family:inherit;font-weight:800;font-size:19px;color:#fff;}
  .site-nav .logo-mark{width:30px;height:30px;border-radius:8px;background:var(--purple-chip);display:flex;align-items:center;justify-content:center;font-size:15px;}
  .site-nav .links{display:flex;gap:6px;align-items:center;margin-left:auto;}
  .site-nav .links a{font-family:inherit;font-size:13.5px;font-weight:600;color:#D6CCF5;padding:8px 12px;border-radius:999px;white-space:nowrap;transition:background .15s,color .15s;}
  .site-nav .links a:hover{color:#fff;background:rgba(255,255,255,0.08);}
  .site-nav .links a.on{color:#fff;background:rgba(255,255,255,0.1);}
  .site-nav .links a.cta{border:1.5px solid rgba(255,79,106,0.7);color:#fff;margin-left:6px;}
  .site-nav .links a.cta:hover{background:rgba(255,79,106,0.16);}
  .site-nav a:focus-visible{outline:3px solid #C4B5FD;outline-offset:2px;}
  @media(max-width:900px){
    .site-nav nav{height:auto;min-height:60px;flex-wrap:wrap;gap:8px;padding:12px 0;}
    .site-nav .links{margin-left:0;width:100%;overflow-x:auto;scrollbar-width:none;gap:4px;padding-bottom:2px;}
    .site-nav .links::-webkit-scrollbar{display:none;}
    .site-nav .links a{font-size:13px;padding:10px 12px;}
  }

  .site-footer{background:var(--hero);color:#B3A8DE;margin-top:clamp(96px,12vw,140px);padding:64px 0 32px;font-size:14px;text-align:left;line-height:1.5;}
  .site-footer .fgrid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:36px;}
  .site-footer .fabout{max-width:300px;line-height:1.7;margin-top:14px;}
  .site-footer .fh{font-family:inherit;color:#fff;font-weight:700;font-size:13px;margin-bottom:14px;text-transform:none;letter-spacing:0;}
  .site-footer .flinks a{display:block;margin-bottom:10px;color:#B3A8DE;transition:color .15s;}
  .site-footer .flinks a:hover{color:#fff;}
  .site-footer .fbase{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:48px;padding-top:22px;border-top:1px solid rgba(255,255,255,0.12);font-size:12.5px;color:#8B7FBF;}
  .site-footer .fbase a{color:#B3A8DE;}
  @media(max-width:760px){.site-footer .fgrid{grid-template-columns:1fr 1fr;}.site-footer .fgrid > div:first-child{grid-column:1 / -1;}}
`

type NavKey = 'hiring' | 'seekers' | 'review' | 'vendors' | 'consulting' | null

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
          <a href="/" className="logo">
            <span className="logo-mark">H</span>Hiring.Productions
          </a>
          <span className="links">
            {link('seekers', '/for-job-seekers', 'For Job Seekers')}
            {link('hiring', '/for-hiring-teams', 'For Hiring Teams')}
            {link('review', '/how-we-review', 'How We Review')}
            {link('vendors', '/for-vendors', 'For Vendors')}
            <a href="/consulting" className={`cta${active === 'consulting' ? ' on' : ''}`}>
              Get a recommendation
            </a>
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
            <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#fff', fontWeight: 800, fontSize: 18 }}>
              <span className="logo-mark" style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--purple-chip)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                H
              </span>
              Hiring.Productions
            </a>
            <p className="fabout">
              Independent reviews of the tools on both sides of hiring. Researched, cited, and re-checked every month.
            </p>
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
            <a href="/consulting">Get a free recommendation</a>
            <a href="/for-hiring-teams">All hiring team guides</a>
          </div>
          <div className="flinks">
            <p className="fh">Company</p>
            <a href="/how-we-review">How we review</a>
            <a href="/advertiser-disclosure">Advertiser disclosure</a>
            <a href="/for-vendors">For vendors</a>
            <a href="mailto:hello@hiring.productions">Contact</a>
          </div>
        </div>
        <div className="fbase">
          <span>&copy; 2026 Hiring.Productions. All rights reserved.</span>
          <span>No vendor can pay for a placement, a ranking, or a score.</span>
        </div>
      </div>
    </footer>
  )
}
