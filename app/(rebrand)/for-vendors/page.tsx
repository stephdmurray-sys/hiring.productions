import type { Metadata } from 'next'
import { PAYS_US } from '@/lib/money'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { homeCss } from '@/app/(rebrand)/home-css'
import { VendorForm } from './vendor-form'

export const metadata: Metadata = {
  alternates: { canonical: '/for-vendors' },
  title: 'For Vendors: Get Your Tool Reviewed, Free',
  description:
    'Submit your hiring or job-search product for review. Listing is free, answering our questions or giving us a demo makes your review more complete, and no payment changes a score or a ranking.',
}

const LADDER = [
  {
    level: 'Public info only',
    takes: 'Nothing. Every tool starts here.',
    changes: 'Built from your help pages, pricing pages, public reviews and traffic data.',
  },
  {
    level: 'Vendor answered Stephanie\u2019s questions',
    takes: 'Written answers: pricing, features, who it’s for and product materials.',
    changes: 'The review says so, and gets more specific about who the product suits.',
  },
  {
    level: 'Stephanie saw a live demo',
    takes: 'A live demo, answering the same questions every vendor gets.',
    changes: 'The most complete kind of review, shown on the review with the date.',
  },
]

const vendorCss = `
  .ladder td:first-child{white-space:nowrap;}
  .ladder td:first-child b{font-size:17px;}
  .ladder .lvl{display:block;font-family:var(--mono);font-size:12.5px;color:var(--ink-3);margin-bottom:2px;}
  .vf{display:grid;gap:18px;}
  .vf-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .vf label,.vf legend{display:grid;gap:6px;font-weight:700;font-size:15px;color:var(--ink);}
  .vf textarea{min-height:96px;resize:vertical;}
  .vf-asks{border:0;display:grid;border-top:1px solid var(--rule);}
  .vf-asks legend{margin-bottom:8px;}
  .vf-ask{display:flex !important;align-items:center;gap:12px;font-weight:600 !important;padding:13px 2px;border-bottom:1px solid var(--rule);cursor:pointer;}
  .vf-ask input{width:18px;height:18px;accent-color:var(--ink);}
  .vf-opt{font-weight:500;color:var(--ink-3);font-size:14px;}
  .vf-error{color:var(--coral-text);font-weight:700;}
  .vf-fine{font-size:14px;color:var(--ink-3);}
  .vf-done{border-top:2px solid var(--ink);padding-top:22px;}
  .vf-done b{display:block;font-weight:800;font-size:24px;margin-bottom:6px;color:var(--ok);}
  .vf-done p{color:var(--ink-2);}
  @media(max-width:600px){.vf-row{grid-template-columns:1fr;}}
`

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + homeCss + vendorCss }} />
      <SiteNav active="vendors" />

      <header className="ph home-ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / For vendors
          </p>
          <h1 className="display" style={{ maxWidth: 980 }}>
            Listing is free. Your score comes from public reviews and data.
          </h1>
          <p className="dek">
            Stephanie Murray reviews the tools job seekers and hiring teams use. The more she knows about your product, the more complete its
            review.
          </p>
        </div>
      </header>

      <section className="wrap sec" id="ladder">
        <h2>Three kinds of review</h2>
        <p className="lead">Every review says which kind it is. None of them changes a score.</p>
        <div className="tscroll">
          <table className="ledger ladder">
            <thead>
              <tr>
                <th>Level</th>
                <th>What it takes</th>
                <th>What changes on your review</th>
              </tr>
            </thead>
            <tbody>
              {LADDER.map((r, i) => (
                <tr key={r.level}>
                  <td>
                    <span className="lvl">Level {i + 1}</span>
                    <b>{r.level}</b>
                  </td>
                  <td>{r.takes}</td>
                  <td>{r.changes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap sec" id="money">
        <div className="split">
          <h2>What money can&rsquo;t buy</h2>
          <div className="prose">
            <p>No vendor can pay for a score or for a place in a ranking, and getting in touch doesn&rsquo;t change a ranking.</p>
            <p>
              {PAYS_US.size === 0 ? 'Right now, no link on this site earns us anything.' : 'A few vendor links earn us a commission.'} The
              line under every button to a vendor&rsquo;s site says whether we earn anything from it, and a commission never touches a score.
              New products can go on the watch list before they have enough reviews to rank.
            </p>
            <p>
              <a className="tl tl-strong" href="/how-we-review">
                Read how we review <span className="arr">&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="submit">
        <div className="split">
          <div>
            <h2>Send Stephanie your product</h2>
            <p className="sublead">It takes two minutes. You get a confirmation right away, and you&rsquo;ll hear back from Stephanie within five business days.</p>
          </div>
          <VendorForm />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
