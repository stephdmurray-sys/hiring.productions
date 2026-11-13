import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { homeCss } from '@/app/(rebrand)/home-css'
import { VendorForm } from './vendor-form'

export const metadata: Metadata = {
  alternates: { canonical: '/for-vendors' },
  title: 'For Vendors: Get Reviewed on the Evidence',
  description:
    'Submit your hiring or job-search product for review. Listing is free. A submittal or a walkthrough raises your evidence level; nothing buys a score, a ranking, or a recommendation.',
}

const LADDER = [
  {
    level: 'Research based',
    who: 'Where every tool starts',
    what: 'Built from public documentation, pricing pages, public user reviews and market data. You don’t have to do anything.',
  },
  {
    level: 'Vendor submitted',
    who: 'You send a written submittal',
    what: 'Pricing, features, ideal customer and product materials. Your review says so, and gets more specific.',
  },
  {
    level: 'Vendor demoed',
    who: 'You walk us through the live product',
    what: 'The same structured questions every vendor gets, answered on the real product. Our strongest evidence level.',
  },
]

const vendorCss = `
  .v-hero{background:radial-gradient(900px 520px at 90% 0%,rgba(108,71,255,0.38) 0%,rgba(108,71,255,0) 60%),linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:clamp(48px,7vw,96px) 0 clamp(56px,7vw,96px);}
  .v-hero .crumbs{font-size:13px;color:#8B7FBF;margin-bottom:20px;}
  .v-hero .crumbs a{color:#B3A8DE;}
  .v-hero h1{font-weight:900;font-size:clamp(40px,6.5vw,72px);line-height:1.02;letter-spacing:-0.035em;max-width:900px;text-wrap:balance;}
  .v-dek{font-size:clamp(17px,1.6vw,20px);line-height:1.6;color:#D6CCF5;max-width:680px;margin-top:20px;}
  .ladder{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px;align-items:end;}
  .rung{background:#fff;border:1px solid var(--border);border-radius:18px;padding:26px;display:flex;flex-direction:column;gap:10px;}
  .rung:nth-child(1){min-height:220px;}
  .rung:nth-child(2){min-height:260px;}
  .rung:nth-child(3){min-height:300px;background:var(--hero);border-color:var(--hero);color:#fff;}
  .rung-n{font-weight:900;font-size:14px;color:#6C47FF;}
  .rung:nth-child(3) .rung-n{color:#C4B5FD;}
  .rung b{font-weight:900;font-size:24px;letter-spacing:-0.01em;}
  .rung i{font-style:normal;font-weight:700;font-size:14px;color:var(--gray);}
  .rung:nth-child(3) i{color:#D6CCF5;}
  .rung p{font-size:15px;line-height:1.6;color:var(--gray);margin-top:auto;}
  .rung:nth-child(3) p{color:#D6CCF5;}
  .never{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;margin-top:16px;}
  .never-list{display:grid;gap:10px;}
  .never-list span{display:flex;align-items:center;gap:12px;font-weight:800;font-size:clamp(24px,3vw,34px);letter-spacing:-0.02em;color:var(--ink);}
  .never-list span::before{content:"";width:22px;height:3px;border-radius:2px;background:#FF4F6A;flex-shrink:0;}
  .never p{font-size:17px;line-height:1.7;color:var(--gray);}
  .never p a{color:#6C47FF;font-weight:700;}
  .v-form-wrap{display:grid;grid-template-columns:0.8fr 1.2fr;gap:48px;align-items:start;}
  .v-form-wrap .lead{margin-top:0;}
  .vf{display:grid;gap:16px;background:#fff;border:1px solid var(--border);border-radius:22px;padding:clamp(22px,3vw,32px);}
  .vf-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .vf label,.vf legend{display:grid;gap:6px;font-weight:700;font-size:14px;color:var(--ink);}
  .vf input:not([type=radio]),.vf select,.vf textarea{width:100%;min-height:48px;border:1.5px solid var(--border);border-radius:12px;padding:10px 14px;font:inherit;font-size:16px;font-weight:400;color:var(--ink);background:#fff;transition:border-color .15s;}
  .vf textarea{min-height:96px;resize:vertical;}
  .vf input:focus,.vf select:focus,.vf textarea:focus{outline:none;border-color:#6C47FF;box-shadow:0 0 0 3px rgba(108,71,255,0.15);}
  .vf-asks{border:0;display:grid;gap:8px;}
  .vf-asks legend{margin-bottom:6px;}
  .vf-ask{display:flex !important;align-items:center;gap:10px;font-weight:600 !important;border:1.5px solid var(--border);border-radius:12px;padding:12px 14px;cursor:pointer;min-height:48px;}
  .vf-ask:has(input:checked){border-color:#6C47FF;background:#F7F5FF;}
  .vf-ask input{width:18px;height:18px;accent-color:#6C47FF;}
  .vf-opt{font-weight:500;color:var(--gray-lt);font-size:12.5px;}
  .vf button{min-height:52px;border:0;border-radius:999px;background:#6C47FF;color:#fff;font:inherit;font-weight:800;font-size:16px;cursor:pointer;transition:transform .15s,background .15s;box-shadow:0 8px 20px rgba(108,71,255,0.3);}
  .vf button:hover{background:#5A36E8;transform:translateY(-1px);}
  .vf button:disabled{opacity:0.7;cursor:default;transform:none;}
  .vf-error{color:#E23A56;font-weight:700;font-size:14px;}
  .vf-fine{font-size:13px;color:var(--gray-lt);}
  .vf-done{background:#fff;border:1px solid var(--border);border-radius:22px;padding:32px;}
  .vf-done b{display:block;font-weight:900;font-size:24px;margin-bottom:8px;}
  .vf-done p{font-size:16px;color:var(--gray);}
  @media(max-width:900px){.ladder,.never,.v-form-wrap{grid-template-columns:1fr;}.rung{min-height:0 !important;}}
  @media(max-width:600px){.vf-row{grid-template-columns:1fr;}}
`

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss + vendorCss }} />
      <SiteNav active="vendors" />
      <header className="v-hero">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> &rsaquo; For vendors
          </p>
          <h1>Get reviewed on the evidence, not on your ad budget.</h1>
          <p className="v-dek">
            We review the tools job seekers and hiring teams use. Listing is free and always will be. What you can change is how much
            we know about your product.
          </p>
        </div>
      </header>

      <section className="wrap" id="ladder">
        <h2>The evidence ladder</h2>
        <p className="lead">Every review states which level it rests on. Climbing it makes your review more complete. It never moves your score on its own.</p>
        <div className="ladder">
          {LADDER.map((r, i) => (
            <div className="rung" key={r.level}>
              <span className="rung-n">Level {i + 1}</span>
              <b>{r.level}</b>
              <i>{r.who}</i>
              <p>{r.what}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" id="never">
        <h2>What none of this buys</h2>
        <div className="never">
          <div className="never-list">
            <span>A score</span>
            <span>A ranking</span>
            <span>A recommendation</span>
          </div>
          <p>
            Some links on the site are affiliate links, and they never touch the scores. Several of our top picks pay us nothing at all.
            Early-stage products go on our radar before they enter the rankings: watched, not judged. Read{' '}
            <a href="/how-we-review">how we review</a> before you reach out.
          </p>
        </div>
      </section>

      <section className="wrap" id="submit">
        <div className="v-form-wrap">
          <div>
            <h2>Send us your product</h2>
            <p className="lead">
              Two minutes. You get a confirmation right away, and a reply about next steps within five business days.
            </p>
          </div>
          <VendorForm />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
