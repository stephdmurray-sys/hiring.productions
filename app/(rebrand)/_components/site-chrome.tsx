import { Motion } from './motion'
import { WEIGHTS, framework } from '@/lib/evidence'
import { repveraLink } from '@/lib/repvera'
import { SITE_LINE } from '@/lib/site-line'

/**
 * Shared navigation and footer. The nav is a solid indigo bar (the brand
 * color, on every page) and runs by topic, not by audience: the homepage
 * doors ("I'm a job seeker", "I'm hiring") lead to the audience pages.
 * The footer is the dark backstage band; its ratings summary is one
 * sentence everywhere except How we review, which keeps the full block.
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
  .site-nav .nav-toggle{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;}
  .site-nav .nav-menu{display:none;}
  /* Older page templates set nav{height:62px}; the bar must grow to hold the wrapped links row. */
  .site-nav nav{height:auto;}
  @media(max-width:900px){
    .site-nav nav{flex-wrap:wrap;gap:4px 0;padding:14px 0 4px;}
    /* Phones: a Menu button opens every link as a list, so nothing is cut off at the edge. */
    .site-nav nav{flex-wrap:wrap;gap:0;padding:12px 0;min-height:0;}
    .site-nav .nav-menu{display:inline-flex;margin-left:auto;align-items:center;gap:8px;font-weight:800;font-size:15px;color:var(--ink,#1A1A22);background:#fff;border:2px solid var(--ink,#1A1A22);border-radius:10px;box-shadow:3px 3px 0 var(--ink,#1A1A22);padding:9px 14px;cursor:pointer;}
    .site-nav .nav-menu i{display:block;width:16px;height:2px;background:currentColor;box-shadow:0 -5px 0 currentColor,0 5px 0 currentColor;margin:5px 0;}
    .site-nav .nav-toggle:focus-visible + .nav-menu{outline:3px solid #fff;outline-offset:3px;}
    .site-nav .links{display:none;margin-left:0;width:100%;flex-direction:column;align-items:stretch;gap:0;padding:10px 0 6px;}
    .site-nav .nav-toggle:checked ~ .links{display:flex;}
    .site-nav .links a{padding:13px 0;font-size:18px;border-bottom:1px solid rgba(255,255,255,0.22);}
    .site-nav .links a.on{border-bottom-color:rgba(255,255,255,0.22);text-decoration:underline;text-underline-offset:5px;text-decoration-thickness:2px;}
  }

  /* Phones: data tables stack into one card per row, each value with its column name (labels set by motion.tsx). */
  @media(max-width:600px){
    table.tbl-stack,table.tbl-stack tbody,table.tbl-stack tr,table.tbl-stack td{display:block !important;width:auto !important;min-width:0 !important;max-width:none !important;}
    table.tbl-stack{border:0 !important;margin-top:20px !important;}
    table.tbl-stack thead,table.tbl-stack tr.tbl-head{display:none !important;}
    table.tbl-stack tr{position:relative;border:2px solid var(--ink,#1A1A22) !important;border-radius:14px !important;background:#fff !important;margin:0 0 14px !important;padding:8px 16px !important;box-shadow:3px 3px 0 var(--ink,#1A1A22);}
    table.tbl-stack td{display:flex !important;justify-content:space-between;align-items:baseline;gap:16px;text-align:right !important;padding:9px 0 !important;border:0 !important;border-bottom:1px solid var(--rule,#E3DED2) !important;background:none !important;white-space:normal !important;}
    table.tbl-stack td:last-child{border-bottom:0 !important;}
    table.tbl-stack td[data-label]::before{content:attr(data-label);flex:none;max-width:48%;text-align:left;font-weight:800;font-size:13.5px;line-height:1.35;color:var(--ink-2,#4A4A5A);}
    table.tbl-stack td[data-label=""]::before{display:none;}
    table.tbl-stack td.tbl-title{justify-content:flex-start;text-align:left !important;font-size:18px !important;font-weight:900;padding-top:12px !important;}
    table.tbl-stack td.tbl-rank{position:absolute;top:10px;right:14px;border:0 !important;padding:0 !important;font-weight:900;color:var(--ink-3,#62627A);}
    table.tbl-stack td.tbl-span{justify-content:flex-start;text-align:left !important;}
    .tscroll:has(> table.tbl-stack),div:has(> table.tbl-stack){overflow:visible !important;border:0 !important;background:none !important;box-shadow:none !important;}
  }

  /* Scroll-in motion (motion.tsx). Only elements below the first screen are ever hidden, and only with scripts on. */
  .rv-hide{opacity:0;transform:translateY(22px);}
  .rv-show{opacity:1;transform:none;transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1);}
  @media (prefers-reduced-motion: reduce){.rv-hide{opacity:1;transform:none;}.rv-show{transition:none;}}
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
  .frate-one{padding:0 0 32px;margin-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.14);line-height:1.6;max-width:820px;}
  .frate-one a{color:#fff;font-weight:700;text-decoration:underline;text-underline-offset:3px;}
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

type NavKey = 'hiring' | 'seekers' | 'resume' | 'ats' | 'guides' | 'review' | 'vendors' | 'consulting' | 'recommend' | null

export function Wordmark() {
  return (
    <span className="wordmark">
      hiring<i>.</i>productions
    </span>
  )
}

export function SiteNav({ active = null }: { active?: NavKey }) {
  // Pages for one audience light up that audience's topic.
  const on = active === 'seekers' ? 'resume' : active === 'hiring' ? 'ats' : active
  // The page header below takes this side's color (site-css .ph).
  const side = on === 'resume' ? 'seekers' : on === 'ats' ? 'hiring' : undefined
  const link = (key: NavKey, href: string, label: string) => (
    <a href={href} className={on === key ? 'on' : undefined} aria-current={on === key ? 'page' : undefined}>
      {label}
    </a>
  )
  return (
    <div className="site-nav" data-side={side}>
      <div className="wrap">
        <nav aria-label="Main">
          <a href="/" aria-label="hiring.productions home">
            <Wordmark />
          </a>
          <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-label="Menu" />
          <label htmlFor="nav-toggle" className="nav-menu" aria-hidden="true">
            <i /> Menu
          </label>
          <span className="links">
            {link('recommend', '/what-should-i-use', 'What should I use?')}
            {link('resume', '/guides/best-resume-tools', 'Resume tools')}
            {link('ats', '/guides/best-ats-for-small-teams', 'Applicant tracking systems')}
            {link('guides', '/guides', 'Guides')}
            {link('review', '/how-we-review', 'How we review')}
          </span>
        </nav>
      </div>
    </div>
  )
}

export function SiteFooter({ ratings = 'short' }: { ratings?: 'short' | 'full' }) {
  return (
    <footer className="site-footer">
      <Motion />
      <div className="wrap">
        {ratings === 'short' ? (
          <p className="frate-one">
            Scores come from public data and are checked every month. <a href="/how-we-review">See how ratings work.</a>
          </p>
        ) : (
        <section className="frate" aria-labelledby="frate-h">
          <div>
            <h2 id="frate-h">How ratings work</h2>
            <p>{framework.summary}</p>
            <p className="frate-links">
              <a href="/how-we-review#scores">How each score is built</a>
              <a href="/how-we-review#research">The research behind it</a>
              <a href="/how-we-review#judgment">Where Stephanie comes in</a>
              <a href="/how-we-review#recommend">How we pick a tool for you</a>
            </p>
          </div>
          <div className="frate-parts">
            {[
              { k: 'Users', w: WEIGHTS.user, d: 'What people who use it rate it, on public review sites' },
              { k: 'Popularity', w: WEIGHTS.market, d: 'How many people use it, and how fast that’s growing' },
              { k: 'Best-of lists', w: WEIGHTS.critics, d: 'Independent best-of lists that name it' },
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
        )}
        <div className="fgrid">
          <div>
            <Wordmark />
            <p className="fabout">{SITE_LINE} Every score carries the date we checked it.</p>
          </div>
          <div className="flinks">
            <p className="fh">Job seekers</p>
            <a href="/guides/best-resume-tools">Resume builders</a>
            <a href="/guides/best-resume-tools#rankings">ATS resume checkers</a>
            <a href="/guides/best-resume-tools#cost">What your search will cost</a>
            <a href="/interview-practice">Interview practice</a>
            <a href="/free-job-search">The $0 job search</a>
            <a href="/how-ats-actually-works">What screening software does</a>
            <a href="/is-this-a-real-job">Is this job even real?</a>
            <a href="/reviews">Every resume tool review</a>
            <a href="/for-job-seekers">Everything for job seekers</a>
          </div>
          <div className="flinks">
            <p className="fh">Hiring teams</p>
            <a href="/guides/best-ats-for-small-teams">Applicant tracking systems</a>
            <a href="/guides/best-recruiter-training">Recruiter training</a>
            <a href="/interview-scorecard">Interview scorecard builder</a>
            <a href="/hiring-costs">What a hire costs</a>
            <a href="/is-this-a-real-candidate">Spotting fake candidates</a>
            <a href="/guides/hiring-fraud-tools">Fraud tools to know</a>
            <a href="/hiring-stack">Free stack recommendation</a>
            <a href="/for-hiring-teams">Everything for hiring teams</a>
          </div>
          <div className="flinks">
            <p className="fh">About</p>
            <a href="/about/stephanie">About Stephanie</a>
            <a href="/how-we-review">How we review</a>
            <a href="/on-the-rise">On the rise</a>
            <a href="/compare">Compare two tools</a>
            <a href="/who-to-follow">Who to follow</a>
            <a href="/advertiser-disclosure">Advertiser disclosure</a>
            <a href="/for-vendors">For vendors</a>
            <a href="mailto:hello@hiring.productions">hello@hiring.productions</a>
          </div>
        </div>
        <div className="fbase">
          <span>
            &copy; 2026 hiring.productions &middot; <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a>
          </span>
          <span>
            Nobody pays to be featured, ranked or scored. Made by <a href="/about/stephanie">Stephanie Murray</a>, who also built{' '}
            <a href={repveraLink('footer')} rel="noopener">RepVera</a>. It&rsquo;s listed here without a score.
          </span>
        </div>
      </div>
    </footer>
  )
}
