import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { CostPerHire } from '@/app/(rebrand)/_components/cost-per-hire'
import { captureCss } from '@/app/(rebrand)/_components/widgets-css'
import { REPVERA_TEAMS_LINE, REPVERA_WHAT, repveraLink } from '@/lib/repvera'

/**
 * "What does a hire really cost?": cost per hire on SHRM's own definition,
 * compared with SHRM's 2025 medians, read from SHRM's data brief.
 */

const SHRM_URL = 'https://www.shrm.org/content/dam/en/shrm/research/2025-recruiting-benchmarking-report.pdf'

export const metadata: Metadata = {
  title: 'What Does a Hire Really Cost? A Free Cost Per Hire Calculator, With SHRM Benchmarks',
  description:
    "Add up your recruiting costs the way SHRM defines them, divide by your hires, and see how you compare with SHRM's 2025 medians: $1,200 per non-executive hire and $10,625 per executive hire.",
  alternates: { canonical: '/hiring-costs' },
}

const css = `
  .cph{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(28px,4vw,56px);align-items:start;}
  .cph fieldset{border:0;min-width:0;margin-bottom:28px;}
  .cph legend{font-weight:900;font-size:clamp(22px,2.4vw,28px);letter-spacing:-0.015em;line-height:1.2;color:var(--ink);margin-bottom:8px;padding:0;}
  .cph-hint{font-size:15px;color:var(--ink-3);margin-bottom:10px;}
  .cph-row{display:grid;grid-template-columns:minmax(0,1fr) 170px;gap:14px;align-items:center;padding:10px 0;border-bottom:1px solid var(--rule);font-size:16px;color:var(--ink);}
  .cph-money{display:flex;align-items:center;gap:6px;}
  .cph-money i{font-style:normal;color:var(--ink-3);font-weight:700;}
  .cph-money input{width:100%;min-height:44px;border:1.5px solid var(--rule-2);border-radius:var(--r);padding:8px 12px;background:var(--surface);font:inherit;font-size:16px;text-align:right;font-variant-numeric:tabular-nums;}
  .cph-money input:focus{border-color:var(--coral);outline:none;box-shadow:0 0 0 3px var(--coral-tint);}
  .cph-level{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;margin-top:14px;font-size:16px;color:var(--ink-2);}
  .cph-level > span{font-weight:700;color:var(--ink);}
  .cph-level label{display:inline-flex;gap:8px;align-items:center;cursor:pointer;}
  .cph-level input{accent-color:var(--coral);width:18px;height:18px;}
  .cph-out{position:sticky;top:24px;background:var(--surface);border:1px solid var(--rule);border-top:3px solid var(--coral);border-radius:var(--r-lg);padding:clamp(22px,3vw,32px);box-shadow:var(--shadow);}
  .cph-k{display:block;font-size:14px;font-weight:800;color:var(--ink-3);}
  .cph-big{display:block;font-weight:900;font-size:clamp(44px,6vw,64px);letter-spacing:-0.03em;line-height:1.05;color:var(--ink);font-variant-numeric:tabular-nums;margin:4px 0 8px;}
  .cph-cmp{font-size:18px;line-height:1.5;color:var(--ink);font-weight:600;}
  .cph-note{font-size:14px;line-height:1.55;color:var(--ink-3);margin-top:10px;}
  .cph-bars{display:grid;gap:12px;margin-top:22px;}
  .cph-bar span{display:flex;justify-content:space-between;gap:12px;font-size:14px;color:var(--ink-2);}
  .cph-bar em{font-style:normal;font-weight:800;color:var(--ink);font-variant-numeric:tabular-nums;}
  .cph-bar i{display:block;height:8px;border-radius:4px;background:var(--coral);margin-top:4px;}
  .cph-empty{font-size:17px;color:var(--ink-2);line-height:1.5;}
  .cph-keep{margin-top:26px;}
  .cph-keep .cap{border-top:1px solid var(--rule);}
  .ours{max-width:760px;border-left:4px solid var(--indigo);padding:4px 0 4px 24px;}
  .ours-k{display:block;font-size:14px;font-weight:800;color:var(--indigo-text);}
  .ours p{font-size:18px;line-height:1.55;color:var(--ink);margin-top:6px;}
  .ours a{display:inline-block;margin-top:10px;}
  @media(max-width:900px){.cph{grid-template-columns:1fr;}.cph-out{position:static;}}
  @media(max-width:520px){.cph-row{grid-template-columns:1fr;gap:6px;}}
`

export default function HiringCostsPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + captureCss + css }} />
      <SiteNav active="hiring" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-hiring-teams">For hiring teams</a> / What a hire costs
          </p>
          <h1 className="display">What does a hire really cost?</h1>
          <p className="dek">
            Add up what you spent on recruiting in one period and divide by the people you hired. That&rsquo;s cost per hire as SHRM defines
            it. Then see where you stand against SHRM&rsquo;s 2025 medians.
          </p>
          <p className="dateline">
            Benchmarks:{' '}
            <a href={SHRM_URL} rel="nofollow noopener" target="_blank">
              SHRM 2025 Recruiting Benchmarking
            </a>
            , 2,371 organizations. Nothing you type leaves this page unless you ask us to email it.
          </p>
        </div>
      </header>

      <section className="wrap sec-tight" id="calculator" aria-label="Cost per hire calculator">
        <CostPerHire />
      </section>

      <section className="wrap sec" id="method">
        <h2>How it&rsquo;s counted</h2>
        <div className="rows">
          <div className="row">
            <span className="row-title">The definition</span>
            <p>
              SHRM counts third-party agency fees, advertising agency fees, job fair costs, online job board fees, employee referral costs,
              travel for applicants and staff, relocation, recruiter pay and benefits, and talent acquisition system costs, divided by the
              number of hires.
            </p>
          </div>
          <div className="row">
            <span className="row-title">The benchmark</span>
            <p>
              SHRM&rsquo;s 2025 medians: $1,200 per non-executive hire, down 27% since 2017, and $10,625 per executive hire, up 113% since
              2017. Medians, not averages, so one very expensive hire doesn&rsquo;t skew them.
            </p>
          </div>
          <div className="row">
            <span className="row-title">What it leaves out</span>
            <p>
              The new hire&rsquo;s own pay, and the time hiring managers spend interviewing, unless you count it in. Two teams with the same cost
              per hire can be running very different processes.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="repvera">
        <aside className="ours" aria-label="From the team behind hiring.productions">
          <span className="ours-k">From the team behind hiring.productions</span>
          <p>
            {REPVERA_TEAMS_LINE} {REPVERA_WHAT}
          </p>
          <a className="tl tl-strong" href={repveraLink('hiring-costs')} rel="noopener">
            See how RepVera works <span className="arr">&#8599;</span>
          </a>
        </aside>
      </section>

      <SiteFooter />
    </>
  )
}
