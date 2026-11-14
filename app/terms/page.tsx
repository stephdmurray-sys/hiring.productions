import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'

/**
 * Terms, in plain words, for the free version of the site. Nothing is
 * for sale in this version (Stephanie, Nov 14, 2026), so there is no
 * payment, refund or membership section. A formal, lawyer-reviewed
 * version replaces this before paid advertising, like the privacy page.
 */

export const metadata: Metadata = {
  title: 'Terms: Using hiring.productions',
  description: 'The plain terms for using hiring.productions: free to use, ratings built from public data, no advice, and how to reach us.',
  alternates: { canonical: 'https://hiring.productions/terms' },
  robots: { index: false, follow: true },
}

const UPDATED = '14 Nov 2026'

const css = `
  .tm{max-width:820px;}
  .tm h2{font-size:clamp(26px,3vw,34px);margin-top:clamp(48px,6vw,72px);}
  .tm p,.tm li{font-size:18px;line-height:1.65;color:var(--ink-2);}
  .tm p{margin-top:14px;}
  .tm ul{margin-top:14px;padding-left:20px;display:grid;gap:8px;}
  .tm a{color:var(--indigo-text);text-decoration:underline;text-underline-offset:3px;}
  .tm-end{padding-bottom:clamp(96px,11vw,150px);}
`

export default function TermsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Terms
          </p>
          <h1 className="display">Using this site</h1>
          <p className="dek">The plain version, while a formal one is reviewed by a lawyer.</p>
          <p className="dateline">Last updated {UPDATED}</p>
        </div>
      </header>

      <section className="wrap sec-tight tm tm-end">
        <h2>It&rsquo;s free</h2>
        <p>Everything on hiring.productions is free to use. Nothing is for sale here, and there&rsquo;s no account to make.</p>

        <h2>What the ratings are</h2>
        <p>
          Every score is built from dated public data, the way <a href="/how-we-review">How we review</a> describes. Scores are our reading of
          that data on the date shown, not a guarantee about any product. Prices and features change; check the vendor&rsquo;s own page before
          you buy.
        </p>

        <h2>What the free tools are</h2>
        <p>
          The recommender, interview scorecard, interview practice and cost per hire calculator give general information, built on published
          sources we name on each page. They aren&rsquo;t legal, employment or financial advice. For a hiring decision with legal weight, talk
          to someone who can advise on your situation.
        </p>

        <h2>What we ask</h2>
        <ul>
          <li>Don&rsquo;t copy the site&rsquo;s data in bulk or scrape it. Quoting a score with a link back is welcome.</li>
          <li>Don&rsquo;t send us anything you don&rsquo;t have the right to share.</li>
        </ul>

        <h2>Links and money</h2>
        <p>
          Right now no link on this site earns us anything. If that changes, the line under the vendor&rsquo;s button will say so. No one can pay for a placement, a ranking, a score or a recommendation.{' '}
          <a href="/advertiser-disclosure">Who pays for this site</a>.
        </p>

        <h2>Changes and contact</h2>
        <p>
          When these terms change, the date above changes. Questions: <a href="mailto:hello@hiring.productions">hello@hiring.productions</a>.
          How we handle your data is on the <a href="/privacy">privacy page</a>.
        </p>
      </section>
      <SiteFooter />
    </>
  )
}
