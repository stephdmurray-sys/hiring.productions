import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'

/**
 * Privacy, in plain words. Every line here describes what the code does
 * today (lead capture in app/api/lead, lib/submit-lead.ts; analytics in
 * app/layout.tsx). If either changes, this page changes with it. A formal,
 * lawyer-reviewed policy replaces it before paid advertising.
 */

export const metadata: Metadata = {
  title: 'Privacy: What We Collect and What We Do With It',
  description:
    'What hiring.productions collects, where it is kept, which analytics run on the site, and how to see or delete your data. Plain words, kept current.',
  alternates: { canonical: 'https://hiring.productions/privacy' },
  robots: { index: false, follow: true },
}

const UPDATED = '14 Nov 2026'

const css = `
  .pv{max-width:820px;}
  .pv h2{font-size:clamp(26px,3vw,34px);margin-top:clamp(48px,6vw,72px);}
  .pv p,.pv li{font-size:18px;line-height:1.65;color:var(--ink-2);}
  .pv p{margin-top:14px;}
  .pv ul{margin-top:14px;padding-left:20px;display:grid;gap:8px;}
  .pv b{color:var(--ink);}
  .pv a{color:var(--indigo-text);text-decoration:underline;text-underline-offset:3px;}
  .pv-end{padding-bottom:clamp(96px,11vw,150px);}
`

export default function PrivacyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Privacy
          </p>
          <h1 className="display">What we collect, and what we do with it</h1>
          <p className="dek">The short version, in plain words, while a formal policy is reviewed by a lawyer. It goes up before we run paid advertising.</p>
          <p className="dateline">Last updated {UPDATED}</p>
        </div>
      </header>

      <section className="wrap sec-tight pv pv-end">
        <h2>When you ask us to email you something</h2>
        <p>
          We keep your email address, the page you signed up on, and what you asked for, so the email fits. That can include the job title on a
          scorecard, the numbers you put in the cost per hire calculator, your situation in &ldquo;What should I use?&rdquo;, and your company size if
          you chose to give it.
        </p>
        <ul>
          <li>
            <b>Where it&rsquo;s kept:</b> our database (Upstash), our email service (Resend), and a private Google Sheet we use as a backup.
          </li>
          <li>
            <b>What we never do:</b> sell your email, or share it with any company we review.
          </li>
          <li>
            <b>Leaving:</b> every email has a one-click unsubscribe.
          </li>
          <li>
            <b>Who we are:</b> hiring.productions is made by the team behind RepVera. Some emails to hiring teams include a labeled note about
            RepVera.
          </li>
        </ul>

        <h2>Forms you send us</h2>
        <p>
          A stack recommendation request or a vendor submission is emailed to Stephanie and kept in the same database, so we can reply.
        </p>

        <h2>The free tools</h2>
        <p>
          The interview scorecard, interview practice and cost per hire calculator run in your browser. Nothing you type in them is kept unless
          you ask us to email it. Nothing on this site is for sale, so we never ask for payment details.
        </p>

        <h2>Analytics and cookies</h2>
        <ul>
          <li>
            <b>Vercel Analytics:</b> counts page views, without cookies.
          </li>
          <li>
            <b>Vercel Speed Insights:</b> measures how fast pages load, anonymously.
          </li>
          <li>
            <b>Microsoft Clarity:</b> records how visitors move through pages (clicks, scrolling, where people stop) as anonymized session
            recordings and heatmaps, so we can fix what&rsquo;s confusing. It hides what you type into forms, and it uses cookies.
          </li>
          <li>
            <b>Our own cookie:</b> once you give us your email, a cookie remembers that you signed up.
          </li>
        </ul>
        <p>No Google Analytics, no Meta pixel, no LinkedIn tag, no selling data to advertisers.</p>

        <h2>Your data, your call</h2>
        <p>
          Email <a href="mailto:hello@hiring.productions?subject=My%20data">hello@hiring.productions</a> to see what we have on you, export it,
          correct it or delete it. We&rsquo;ll do it within seven days. If what we collect ever grows, this page changes first, with a new date
          at the top.
        </p>
      </section>
      <SiteFooter />
    </>
  )
}
