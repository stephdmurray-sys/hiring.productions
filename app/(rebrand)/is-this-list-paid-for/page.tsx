import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { Logo, PUBLISHER_DOMAINS } from '@/app/(rebrand)/_components/logo'
import { keepLast } from '@/lib/site-line'
import { formatDate, resumeLists } from '@/lib/evidence'

/**
 * "Is this best-of list paid for?" (Stephanie approved, Nov 15, 2026): the
 * best-of list check from the resume guide, as its own page. The four
 * checks are the rules every list is held to (benchmarks.json), each shown
 * with a real example from the lists we track, so a visitor can run them on
 * any list. Re-checked monthly with the rankings.
 */

export const metadata: Metadata = {
  title: 'Is This Best-of List Paid For? How to Check Any “Best Resume Builder” List',
  description:
    'Who owns the best resume builder list you’re reading, whether it ranks its own product, whether it’s a lead page, and whether it’s current. The four checks, and what we found on every list we track.',
  alternates: { canonical: '/is-this-list-paid-for' },
}

const STATUS: Record<string, { label: string; tone: 'ok' | 'flag' | 'old' }> = {
  counts: { label: 'We count it', tone: 'ok' },
  unconfirmed: { label: 'Not confirmed yet', tone: 'old' },
  stale: { label: 'Out of date', tone: 'old' },
  'lead-page': { label: 'Lead page', tone: 'flag' },
  'owner-conflict': { label: 'Owner conflict', tone: 'flag' },
  'ranks-itself': { label: 'Ranks itself', tone: 'flag' },
}

export default function Page() {
  const lists = resumeLists()
  const by = (s: string) => lists.filter((l) => l.status === s)
  const example = (s: string) => {
    const l = by(s)[0]
    if (!l) return ''
    return l.reason.startsWith(l.publication) ? l.reason : `${l.publication}: ${l.reason.charAt(0).toLowerCase()}${l.reason.slice(1)}`
  }
  const checks = [
    {
      q: 'Does the publisher own anything on the list?',
      a: 'Look up who owns the site, then who owns the tools it ranks.',
      eg: example('owner-conflict'),
    },
    {
      q: 'Does it put its own product on the list?',
      a: 'A publisher that sells a resume tool has a reason to rank it first.',
      eg: example('ranks-itself'),
    },
    {
      q: 'Is it a review, or a page built to collect your details?',
      a: 'A lead page scores tools to send you somewhere, with no review behind the score.',
      eg: example('lead-page'),
    },
    {
      q: 'Was it updated in the last 12 months?',
      a: 'An old list can miss price changes and new tools.',
      eg: `${by('stale').length} of the ${lists.length} lists we track haven’t been updated in the last 12 months.`,
    },
  ]
  const latest = lists.map((l) => l.checked).sort().pop()!
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + css }} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/guides">Guides</a> / Is this best-of list paid for?
          </>
        }
        sticker={`${lists.length} lists checked`}
        title={'Is this best\u2011of list paid for?'}
        dek="Before you trust a “best resume builder” list, check who wrote it. We hold every list we track to the same four checks each month. Here they are, so you can run them on any list."
        dateline={`Lists checked ${formatDate(latest)}`}
      />

      <section className="wrap sec sl-sec sl-sec-seekers" id="checks">
        <StepHead n={1} title="The four checks" sub="Each one comes with a real example from the lists we track." />
        <div className="lc-checks">
          {checks.map((c, i) => (
            <article className="lc-check" key={c.q}>
              <span className="lc-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{keepLast(c.q)}</h3>
              <p className="lc-a">{keepLast(c.a)}</p>
              {c.eg && <p className="lc-eg">{keepLast(c.eg)}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="lists">
        <StepHead n={2} title="Every list we track" sub="We show every one. Only the lists that pass all four checks count toward our rankings." />
        <div className="lc-lists">
          {lists.map((l) => {
            const s = STATUS[l.status] ?? { label: l.status, tone: 'old' as const }
            return (
              <div className="lc-row" key={l.url}>
                <Logo domain={PUBLISHER_DOMAINS[l.publication] ?? new URL(l.url).hostname.replace(/^www\./, '')} name={l.publication} size={40} />
                <div>
                  <p className="lc-pub">
                    {l.publication} <span className={`lc-pill lc-${s.tone}`}>{s.label}</span>
                  </p>
                  <a className="lc-title" href={l.url} rel="nofollow noopener" target="_blank">
                    {l.title} <span className="arr">&#8599;</span>
                  </a>
                  <p className="lc-why">{keepLast(l.reason)}</p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="tp-cta">
          <a className="btn btn-indigo" href="/guides/best-resume-tools#rankings">
            See our rankings <span className="arr">&rarr;</span>
          </a>
        </p>
      </section>

      <div className="sec" />
      <SiteFooter />
    </>
  )
}

const css = `
  .lc-checks{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:24px;margin-top:36px;}
  .lc-check{position:relative;display:flex;flex-direction:column;gap:10px;padding:26px 24px 24px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);}
  .lc-n{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:var(--coral);color:var(--coral-deep);border:3px solid var(--ink);font-weight:900;font-size:18px;line-height:1;transform:rotate(-6deg);}
  .lc-check h3{margin:4px 0 0;font-size:clamp(20px,2vw,23px);font-weight:900;letter-spacing:-0.01em;line-height:1.2;}
  .lc-a{margin:0;font-size:17px;line-height:1.55;color:var(--ink-2);}
  .lc-eg{margin:auto 0 0;padding:12px 14px;background:var(--indigo-tint);border:2px solid var(--ink);border-radius:12px;font-size:15px;line-height:1.5;color:var(--ink);}
  .lc-lists{display:grid;gap:0;margin-top:32px;border-top:3px solid var(--ink);max-width:900px;}
  .lc-row{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:start;padding:20px 0;border-bottom:1px solid var(--rule);}
  .lc-pub{margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:18px;font-weight:900;color:var(--ink);}
  .lc-pill{display:inline-block;padding:4px 10px;border:2px solid var(--ink);border-radius:999px;font-size:12.5px;font-weight:800;line-height:1.2;}
  .lc-ok{background:#5EE6A8;color:var(--ink);}
  .lc-flag{background:var(--coral);color:var(--coral-deep);}
  .lc-old{background:var(--surface);color:var(--ink-2);}
  .lc-title{display:inline-block;margin-top:6px;font-size:16px;font-weight:700;color:var(--ink);text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .lc-title:hover{text-decoration-color:var(--ink);}
  .lc-why{margin:6px 0 0;font-size:15.5px;line-height:1.55;color:var(--ink-2);text-wrap:pretty;}
`
