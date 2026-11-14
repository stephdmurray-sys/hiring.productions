import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'

/**
 * The 404 page, in the same design as the rest of the site. One focal
 * point (the question), one button (the recommender), and the two hubs
 * as plain links for people who know which side they're on.
 */

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const css = `
  .nf{padding-bottom:clamp(96px,11vw,150px);}
  .nf-links{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:28px;font-size:18px;font-weight:800;}
`

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav />
      <header className="ph nf">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Not found
          </p>
          <h1 className="display">This page isn&rsquo;t here.</h1>
          <p className="dek">It may have moved when we rebuilt the site. Tell us where you&rsquo;re stuck and we&rsquo;ll point you to the right tool.</p>
          <p style={{ marginTop: 32 }}>
            <a className="btn btn-indigo" href="/what-should-i-use">
              What should I use?
            </a>
          </p>
          <p className="nf-links">
            <a className="tl" href="/for-job-seekers">
              For job seekers
            </a>
            <a className="tl" href="/for-hiring-teams">
              For hiring teams
            </a>
            <a className="tl" href="/reviews">
              Every tool, reviewed
            </a>
          </p>
        </div>
      </header>
      <SiteFooter />
    </>
  )
}
