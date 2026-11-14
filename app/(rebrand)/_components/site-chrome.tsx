import { Motion } from './motion'
import { WEIGHTS, framework } from '@/lib/evidence'
import { repveraLink } from '@/lib/repvera'

/**
 * Shared navigation and footer. The nav is a solid indigo bar (the brand
 * color, on every page); the footer is the dark backstage band.
 */

export const chromeCss = `
  .site-nav{background:var(--indigo,#6C47FF);color:#fff;position:relative;z-index:30;}
  .site-nav nav{display:flex;align-items:center;gap:28px;min-height:66px;}
  .wordmark{font-weight:800;font-size:21px;letter-spacing:-0.01em;color:var(--ink,#1A1A22);white-space:nowrap;}
  .wordmark i{font-style:normal;color:var(--coral,#FF4F6A);}
  .site-nav .wordmark{color:#fff;}
  .site-nav .wordmark i{color:#FFB3C0;}
  .site-nav .links{display:flex;gap:26px;align-items:center;margin-left:auto;}
  .site-nav .links a{font-size:15px;font-weight:700;color:#fff;padding:6px 0;border-bottom:2px solid transparent;white-space:nowrap;}
  .site-nav .links a:hover{color:#fff;border-bottom-color:rgba(255,255,255,0.5);}
  .site-nav .links a.on{color:#fff;border-bottom-color:#fff;}
  .site-nav :focus-visible{outline-color:#fff;}
  /* Older page templates set nav{height:62px}; the bar must grow to hold the wrapped links row. */
  .site-nav nav{height:auto;}
  @media(max-width:900px){
    .site-nav nav{flex-wrap:wrap;gap:4px 0;padding:14px 0 4px;}
    .site-nav .links{margin-left:0;width:100%;overflow-x:auto;scrollbar-width:none;gap:22px;}
    .site-nav .links::-webkit-scrollbar{display:none;}
    .site-nav .links a{padding:10px 0;}
  }

  .site-footer{margin-top:clamp(96px,12vw,150px);background:var(--indigo-ink,#211457);color:#CFC6F2;padding:56px 0 36px;font-size:15px;text-align:left;}
  .site-footer .wordmark{color:#fff;}
  .site-footer .wordmark i{color:#FF8DA0;}
  .site-footer .fgrid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:32px;}
  .site-footer .fabout{max-width:300px;margin-top:12px;line-height:1.6;}
  .site-footer .fh{font-weight:800;color:#fff;font-size:15px;margin-bottom:12px;text-transform:none;letter-spacing:0;}
  .site-footer .flinks a{display:block;padding:5px 0;color:#CFC6F2;}
  .site-footer .flinks a:hover{color:#fff;text-decoration:underline;text-underline-offset:3px;}
  .site-footer .fbase{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:44px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.14);font-size:13.5px;color:#A99CDB;}
  .site-footer :focus-visible{outline-color:#fff;}
  .frate{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:40px;padding:0 0 40px;margin-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.14);}
  .frate h2{font-size:22px;font-weight:900;color:#fff;letter-spacing:-0.01em;margin:0 0 10px;}
  .frate p{line-height:1.6;max-width:520px;}
  .frate-parts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-items:start;}
  .frate-part{padding:12px 14px;border-radius:10px;background:rgba(255,255,255,0.06);}
  .frate-part b{display:block;font-size:22px;font-weight:900;color:#fff;line-height:1.1;}
  .frate-part span{display:block;font-weight:800;color:#fff;font-size:14px;margin-top:2px;}
  .frate-part small{display:block;font-size:12.5px;color:#B9ABF5;line-height:1.4;margin-top:4px;}
  .frate-links{display:flex;flex-wrap:wrap;gap:6px 20px;margin-top:14px;font-size:14px;}
  .frate-links a{color:#fff;font-weight:700;text-decoration:underline;text-underline-offset:3px;}
  @media(max-width:900px){.frate{grid-template-columns:1fr;gap:20px;}.frate-parts{grid-template-columns:repeat(2,minmax(0,1fr));}}
  @media(max-width:760px){.site-footer .fgrid{grid-template-columns:1fr 1fr;}.site-footer .fgrid > div:first-child{grid-column:1 / -1;}}
`

type NavKey = 'hiring' | 'seekers' | 'review' | 'vendors' | 'consulting' | 'recommend' | null

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
            {link('recommend', '/what-should-i-use', 'What should I use?')}
            {link('seekers', '/for-job-seekers', 'For job seekers')}
            {link('hiring', '/for-hiring-teams', 'For hiring teams')}
            {link('review', '/how-we-review', 'How we review')}
            {link('vendors', '/for-vendors', 'For vendors')}
          </span>
        </nav>
      </div>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Motion />
      <div className="wrap">
        <section className="frate" aria-labelledby="frate-h">
          <div>
            <h2 id="frate-h">How ratings work</h2>
            <p>{framework.summary}</p>
            <p className="frate-links">
              <a href="/how-we-review#scores">How each score is built</a>
              <a href="/how-we-review#research">The research behind it</a>
              <a href="/how-we-review#judgment">Where Stephanie comes in</a>
              <a href="/how-we-review#recommend">How a recommendation is made</a>
            </p>
          </div>
          <div className="frate-parts">
            {[
              { k: 'Users', w: WEIGHTS.user, d: 'What real users rate it, on sources we can cite' },
              { k: 'Market', w: WEIGHTS.market, d: 'Traffic, review volume and growth' },
              { k: 'Critics', w: WEIGHTS.critics, d: 'Independent best-of lists that name it' },
              { k: 'Value', w: WEIGHTS.value, d: 'What a year costs, and the free version' },
            ].map((p) => (
              <div className="frate-part" key={p.k}>
                <b>{Math.round(p.w * 100)}%</b>
                <span>{p.k}</span>
                <small>{p.d}</small>
              </div>
            ))}
          </div>
        </section>
        <div className="fgrid">
          <div>
            <Wordmark />
            <p className="fabout">Independent reviews of the tools on both sides of hiring. Every score carries the date we checked it.</p>
          </div>
          <div className="flinks">
            <p className="fh">Job seekers</p>
            <a href="/guides/best-resume-tools">Resume builders</a>
            <a href="/guides/best-resume-tools#rankings">ATS resume checkers</a>
            <a href="/guides/best-resume-tools#cost">What your search will cost</a>
            <a href="/reviews">Every resume tool review</a>
            <a href="/for-job-seekers">All job seeker guides</a>
          </div>
          <div className="flinks">
            <p className="fh">Hiring teams</p>
            <a href="/guides/best-ats-for-small-teams">Applicant tracking systems</a>
            <a href="/guides/best-recruiter-training">Recruiter training</a>
            <a href="/interview-scorecard">Interview scorecard builder</a>
            <a href="/hiring-costs">What a hire costs</a>
            <a href="/is-this-a-real-candidate">Spotting fake candidates</a>
            <a href="/consulting">Free stack recommendation</a>
            <a href="/for-hiring-teams">All hiring team guides</a>
          </div>
          <div className="flinks">
            <p className="fh">About</p>
            <a href="/how-we-review">How we review</a>
            <a href="/who-to-follow">Who to follow</a>
            <a href="/advertiser-disclosure">Advertiser disclosure</a>
            <a href="/for-vendors">For vendors</a>
            <a href="mailto:hello@hiring.productions">hello@hiring.productions</a>
          </div>
        </div>
        <div className="fbase">
          <span>&copy; 2026 hiring.productions</span>
          <span>
            No vendor can pay for a placement, a ranking or a score. hiring.productions is made by the team behind{' '}
            <a href={repveraLink('footer')} rel="noopener">RepVera</a>, which is never ranked or reviewed here.
          </span>
        </div>
      </div>
    </footer>
  )
}
