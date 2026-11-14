import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { RecommendationForm } from './recommendation-form'

/**
 * /consulting: the human answer. The recommender picks one tool for one
 * problem; this is for a team that wants its whole setup looked at. It is
 * also where the recommender sends a team when nothing on file fits.
 * Free, no sales call, no vendor in the answer.
 */

export const metadata: Metadata = {
  alternates: { canonical: '/consulting' },
  title: 'What Should Our Hiring Stack Be? A Free Recommendation From Stephanie Murray',
  description:
    'Send how you hire and get back the applicant tracking system, job boards and screening setup Stephanie Murray would run for your team, with the reasoning. Free, no sales call, and no vendor can pay their way into the answer.',
}

const css = `
  .cs{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,0.85fr);gap:clamp(40px,6vw,96px);align-items:start;padding-top:clamp(56px,7vw,88px);padding-bottom:clamp(96px,11vw,150px);}
  .cs-form{background:var(--surface);border-radius:var(--r-lg);box-shadow:var(--shadow);padding:clamp(24px,3.4vw,40px);}
  .cs-form label{display:block;font-weight:800;font-size:15px;color:var(--ink);margin:22px 0 8px;}
  .cs-form label:first-of-type{margin-top:0;}
  .cs-form input,.cs-form select,.cs-form textarea{width:100%;min-height:52px;border:1.5px solid var(--rule-2);border-radius:var(--r);padding:12px 14px;background:var(--surface);color:var(--ink);font:inherit;font-size:16px;box-sizing:border-box;}
  .cs-form textarea{min-height:120px;resize:vertical;}
  .cs-form input:focus,.cs-form select:focus,.cs-form textarea:focus{border-color:var(--indigo);outline:none;box-shadow:0 0 0 3px var(--indigo-tint);}
  .cs-form ::placeholder{color:var(--ink-3);opacity:1;}
  .cs-form .btn{width:100%;margin-top:28px;font-size:17px;padding:18px 22px;}
  .cs-form .btn:disabled{opacity:.6;cursor:default;}
  .cs-fine{margin-top:14px;font-size:13.5px;line-height:1.55;color:var(--ink-3);}
  .cs-fine a{text-decoration:underline;text-underline-offset:3px;}
  .cs-error{margin-top:12px;font-size:15px;color:var(--coral-text);font-weight:700;}
  .cs-done{font-size:19px;line-height:1.6;color:var(--ink);}
  .cs-done b{display:block;font-size:clamp(26px,2.8vw,32px);font-weight:900;letter-spacing:-0.02em;margin-bottom:10px;}
  .cs-done b::before{content:"";display:inline-block;width:14px;height:14px;border-radius:50%;background:var(--ok-bright);margin-right:12px;vertical-align:middle;}
  .cs-side h2{font-size:clamp(26px,2.8vw,32px);font-weight:900;letter-spacing:-0.02em;line-height:1.15;}
  .cs-side ul{list-style:none;padding:0;margin-top:18px;border-top:1px solid var(--rule);}
  .cs-side li{padding:20px 0;border-bottom:1px solid var(--rule);font-size:17px;line-height:1.55;color:var(--ink-2);}
  .cs-side li b{display:block;color:var(--ink);font-size:19px;font-weight:800;margin-bottom:4px;}
  .cs-side li a{color:var(--indigo-text);text-decoration:underline;text-underline-offset:3px;}
  @media(max-width:880px){.cs{grid-template-columns:1fr;}}
`

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav active="hiring" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-hiring-teams">For hiring teams</a> / Stack recommendation
          </p>
          <h1 className="display">What should our whole hiring stack be?</h1>
          <p className="dek">
            The <a className="tl" href="/what-should-i-use?side=hiring">recommender</a> picks one tool for one problem. For the whole setup,
            send your situation: Stephanie sends back the stack she would run for your team, with the reasoning. Free, no sales call, and no
            vendor can pay their way into the answer.
          </p>
        </div>
      </header>

      <RecommendationForm />

      <SiteFooter />
    </>
  )
}
