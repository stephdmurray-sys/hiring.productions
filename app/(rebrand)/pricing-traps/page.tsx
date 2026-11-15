import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { JsonLd, graph, PERSON, SITE } from '@/app/(rebrand)/_components/structured'
import { formatDate, latestCheck } from '@/lib/evidence'
import { forgetTable, money, trapHref, trapTools } from '@/lib/pricing-traps'

/**
 * Pricing traps: every resume tool by what the first year costs if you pay
 * for a 3-month search and forget to cancel, with the tools that bill every
 * 4 weeks first in line. Built from the plans on file, re-checked monthly.
 */

export const metadata: Metadata = {
  title: 'Resume Tool Pricing Traps: Which Ones Bill Every 4 Weeks, and What Forgetting to Cancel Costs',
  description:
    'Every resume builder and checker we rate, by what 3 months costs and what the first year costs if you forget to cancel. Which ones start with a cheap trial and bill every 4 weeks. From each tool’s own pricing, checked monthly.',
  alternates: { canonical: '/pricing-traps' },
  openGraph: { type: 'article', url: `${SITE}/pricing-traps`, title: 'Which resume tools keep charging you?', siteName: 'hiring.productions' },
}

export default function Page() {
  const rows = forgetTable()
  const traps = new Set(trapTools().map((t) => t.id))
  const checked = latestCheck()
  const ld = graph(
    { '@type': 'Article', '@id': `${SITE}/pricing-traps#article`, headline: 'Which resume tools keep charging you?', url: `${SITE}/pricing-traps`, author: PERSON, publisher: { '@id': `${SITE}/#organization` }, dateModified: checked },
    {
      '@type': 'ItemList',
      name: 'Resume tools by first-year cost if you forget to cancel',
      itemListElement: rows.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.t.name,
        url: `${SITE}${traps.has(r.t.id) ? trapHref(r.t.id) : `/reviews/${r.t.id}`}`,
        description: `3 months: ${r.threeMonths !== null ? money(r.threeMonths) : 'n/a'}. First year if you forget to cancel: ${r.firstYearIfForgotten !== null ? money(r.firstYearIfForgotten) : 'n/a'}.${r.renews4w ? ' Bills every 4 weeks.' : ''}`,
      })),
    },
  )
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Pricing traps
          </>
        }
        sticker={`${traps.size} tools bill every 4 weeks`}
        title="Which resume tools keep charging you?"
        dek="Every resume tool we rate, by what the first year costs if you pay for a 3-month search and forget to cancel. The ones that start with a cheap trial and bill every 4 weeks are marked."
        dateline={`From each tool’s own pricing, checked ${formatDate(checked)} · nobody pays to be featured`}
      />

      <section className="wrap sec sl-sec sl-sec-seekers" id="list">
        <StepHead title="The first year, if you forget to cancel" sub="Most expensive first." />
        <div className="tscroll">
          <table className="ptx-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>3 months</th>
                <th>First year if you forget</th>
                <th>Billing</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.t.id} className={r.renews4w ? 'ptx-trap' : undefined}>
                  <td>
                    <a href={traps.has(r.t.id) ? trapHref(r.t.id) : `/reviews/${r.t.id}`}>
                      <Logo domain={r.t.domain} name={r.t.name} size={28} /> {r.t.name}
                    </a>
                  </td>
                  <td>{r.threeMonths !== null ? money(r.threeMonths) : 'n/a'}</td>
                  <td className="ptx-forget">{r.firstYearIfForgotten !== null ? money(r.firstYearIfForgotten) : 'n/a'}</td>
                  <td className="ptx-billing">{r.renews4w ? <b className="ptx-flag">Every 4 weeks</b> : r.t.pricingLine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="traps">
        <StepHead title="The ones that bill every 4 weeks" sub="A cheap trial, then a charge every 4 weeks: 13 a year." />
        <div className="free-grid">
          {rows
            .filter((r) => traps.has(r.t.id))
            .map((r) => (
              <a className="kit-free" href={trapHref(r.t.id)} key={r.t.id}>
                <span>
                  <b>What does {r.t.name} really cost?</b>
                  <span>
                    {r.firstYearIfForgotten !== null ? money(r.firstYearIfForgotten) : ''} in the first year if you forget to cancel.
                  </span>
                </span>
                <span className="arr" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            ))}
        </div>
      </section>

      <NextStep side="seekers" line="Skip the bill. These tools have a free version you can keep using." button="The $0 job search" href="/free-job-search" />
      <SiteFooter />
    </>
  )
}

const css = `
  .ptx-table{width:100%;max-width:900px;margin-top:28px;border-collapse:collapse;border-top:3px solid var(--ink);font-size:16.5px;}
  .ptx-table th{text-align:left;font-size:14px;font-weight:800;color:var(--ink-2);padding:12px 10px;border-bottom:1px solid var(--ink);}
  .ptx-table td{padding:12px 10px;border-bottom:1px solid var(--rule);font-variant-numeric:tabular-nums;font-weight:700;vertical-align:middle;}
  .ptx-table td a{display:inline-flex;align-items:center;gap:10px;color:var(--ink);font-weight:800;text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .ptx-trap td{background:var(--coral-tint);}
  .ptx-forget{color:var(--coral-text);font-weight:900;}
  .ptx-flag{color:var(--coral-text);}
  .ptx-billing{font-weight:600 !important;color:var(--ink-2);font-size:15px;}
`
