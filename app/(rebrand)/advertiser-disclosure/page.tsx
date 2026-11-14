import type { Metadata } from 'next'
import { EARN_COMMISSION, EARN_NOTHING, PAYS_US } from '@/lib/money'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { REPVERA_CATEGORY, repveraLink } from '@/lib/repvera'

/**
 * Advertiser disclosure: who owns the site, how affiliate links work, and
 * what money never buys. The ownership section is the one the FTC's
 * reviews rule (16 CFR 465.6) makes load-bearing; see GROWTH.md.
 */

const FTC_RULE = {
  name: 'FTC, Trade Regulation Rule on the Use of Consumer Reviews and Testimonials, Federal Register, August 22, 2024',
  url: 'https://www.govinfo.gov/content/pkg/FR-2024-08-22/html/2024-18519.htm',
}

export const metadata: Metadata = {
  alternates: { canonical: '/advertiser-disclosure' },
  title: 'Advertiser Disclosure: Who Pays for hiring.productions, and What It Never Buys',
  description:
    'hiring.productions is made by Stephanie Murray, who also built RepVera. RepVera is listed in its own category with no score and no rank. No vendor link earns us anything today, and no one can pay for a placement, a ranking, a score or a recommendation.',
}

const css = `
  .dc{max-width:820px;}
  .dc p{font-size:clamp(18px,1.7vw,20px);line-height:1.6;color:var(--ink-2);margin-top:18px;}
  .dc p b{color:var(--ink);}
  .dc-src{display:inline-block;margin-top:18px;font-size:14px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .dc-never{list-style:none;padding:0;margin-top:28px;border-top:2px solid var(--ink);max-width:820px;}
  .dc-never li{padding:18px 0;border-bottom:1px solid var(--rule);font-size:20px;font-weight:700;color:var(--ink);}
  .dc-end{padding-bottom:clamp(96px,11vw,150px);}
`

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Advertiser disclosure
          </p>
          <h1 className="display">Who pays for this site?</h1>
          <p className="dek">Stephanie Murray does. No vendor link earns us anything today, and no money can change a score.</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="owner">
        <h2>Stephanie Murray, who also built RepVera</h2>
        <div className="dc">
          <p>
            hiring.productions is made by Stephanie Murray. She also built{' '}
            <a className="tl" href={repveraLink('disclosure')} rel="noopener">
              RepVera
            </a>
            , a record of what someone is like to work with, in the words of people who have worked with them. That&rsquo;s the business
            this site supports.
          </p>
          <p>
            <b>
              RepVera is listed in its own category, {REPVERA_CATEGORY.toLowerCase()}, with no score and no rank, and it is the
              recommendation for one situation on each side of the picker, always with Stephanie&rsquo;s note that she built it.
            </b>{' '}
            This site does not score that category, and doesn&rsquo;t rank anything in it.
          </p>
          <p>
            The FTC&rsquo;s rule on reviews bars a company from presenting a site it controls as an independent reviewer of a category that
            includes its own product. That&rsquo;s why the {REPVERA_CATEGORY.toLowerCase()} category has no scores or rankings at all.
          </p>
          <a className="dc-src" href={FTC_RULE.url} rel="nofollow noopener" target="_blank">
            Source: {FTC_RULE.name}, 16 CFR 465.6
          </a>
        </div>
      </section>

      <section className="wrap sec" id="affiliate">
        <h2>Affiliate links</h2>
        <div className="dc">
          <p>
            {PAYS_US.size === 0
              ? 'Right now, no link on this site earns us anything.'
              : `These vendors pay us a commission if you buy through our link: ${[...PAYS_US].join(', ')}. Every other link earns us nothing.`}{' '}
            Under every button to a vendor&rsquo;s site, one line tells you which it is: &ldquo;{EARN_NOTHING}&rdquo; or &ldquo;
            {EARN_COMMISSION}&rdquo;
          </p>
          <p>
            If we ever join a vendor&rsquo;s affiliate program, the line under its button changes the same day, and it&rsquo;s added to
            this page. A commission costs you nothing extra, and it never changes a score. Every vendor link goes through
            hiring.productions/go/ so we can count clicks and change a link in one place.
          </p>
        </div>
      </section>

      <section className="wrap sec dc-end" id="never">
        <h2>What money never buys</h2>
        <ul className="dc-never">
          <li>A place on a scoreboard</li>
          <li>A higher rank or a better score</li>
          <li>A recommendation from &ldquo;What should I use?&rdquo;</li>
          <li>A spot on the watch list</li>
        </ul>
        <p className="footnote">
          Every score is built from dated public data. <a href="/how-we-review">How we review</a>. Vendors can submit a tool for free on{' '}
          <a href="/for-vendors">For vendors</a>. Questions: <a href="mailto:hello@hiring.productions">hello@hiring.productions</a>.
        </p>
      </section>

      <SiteFooter />
    </>
  )
}
