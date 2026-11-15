import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { videoCardCss } from '@/app/(rebrand)/_components/widgets-css'
import { JsonLd, graph, PERSON, SITE, pricingFaqs, toolOffers } from '@/app/(rebrand)/_components/structured'
import { keepLast } from '@/lib/site-line'
import { moneyLine } from '@/lib/money'
import { formatDate } from '@/lib/evidence'
import { comparisonsFor } from '@/lib/compare'
import { freeAlternatives, freeOnly, money, trapFacts, trapHref, trapTools } from '@/lib/pricing-traps'

/**
 * One tool's billing, laid out: a cheap trial that rolls into billing every
 * 4 weeks, what that costs by how long you search, and the free versions
 * worth using instead. Every number comes from the plans on file and
 * changes with the monthly check.
 */

type Params = { tool: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return trapTools().map((t) => ({ tool: t.id }))
}

const find = (id: string) => trapTools().find((t) => t.id === id)

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tool } = await params
  const t = find(tool)
  if (!t) return {}
  const f = trapFacts(t)
  const year = f.firstYearIfForgotten !== null ? money(f.firstYearIfForgotten) : ''
  const title = `${t.name}’s ${year} Year: How Its 4-Week Billing Works, and Free Alternatives`
  const description = `${t.name}’s ${f.trial ? `${money(f.trial.price)} trial` : 'plan'} renews at ${f.renewal ? money(f.renewal.price) : ''} every 4 weeks. Pay for a 3-month search and forget to cancel, and the first year comes to ${year}. What it costs, how to stop it, and free alternatives. Checked ${formatDate(f.checked)}.`
  return {
    title,
    description,
    alternates: { canonical: trapHref(t.id) },
    openGraph: { type: 'article', url: `${SITE}${trapHref(t.id)}`, title: `What does ${t.name} really cost? ${year} in the first year if you forget to cancel`, description, siteName: 'hiring.productions', modifiedTime: f.checked, authors: ['Stephanie Murray'] },
    twitter: { card: 'summary_large_image', title: `What does ${t.name} really cost?`, description },
  }
}

export default async function TrapPage({ params }: { params: Promise<Params> }) {
  const { tool } = await params
  const t = find(tool)
  if (!t) notFound()
  const f = trapFacts(t)
  const alts = freeAlternatives(t).slice(0, 3)
  const faqs = [
    ...pricingFaqs(t),
    ...(alts[0] ? [{ q: `What’s a free alternative to ${t.name}?`, a: `${alts[0].name}, scored ${alts[0].overall?.toFixed(2)} out of 5. ${freeOnly(alts[0].freeAnswer)}` }] : []),
  ]
  const vs = comparisonsFor('resume', t.id).slice(0, 4)
  const url = `${SITE}${trapHref(t.id)}`
  const ld = graph(
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: `What does ${t.name} really cost?`,
      url,
      author: PERSON,
      publisher: { '@id': `${SITE}/#organization` },
      datePublished: f.checked,
      dateModified: f.checked,
      about: { '@id': `${SITE}/reviews/${t.id}#tool` },
    },
    { '@type': 'SoftwareApplication', '@id': `${SITE}/reviews/${t.id}#tool`, name: t.name, url: `https://${t.domain}`, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: toolOffers(t) },
    { '@type': 'FAQPage', mainEntity: faqs.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })) },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Pricing traps', item: `${SITE}/pricing-traps` },
        { '@type': 'ListItem', position: 3, name: t.name, item: url },
      ],
    },
  )

  const steps = [
    f.trial && { big: money(f.trial.price), text: `for a ${f.trial.days}-day trial. It renews on its own when the trial ends.` },
    f.renewal && { big: money(f.renewal.price), text: `every ${f.renewal.days / 7} weeks after that, until you cancel.` },
    { big: '13', text: 'charges a year, because a year has 13 four-week periods.' },
    f.freeCatch && { big: '.txt', text: `${f.freeCatch.charAt(0).toUpperCase()}${f.freeCatch.slice(1)}, so a formatted resume means paying.` },
  ].filter(Boolean) as { big: string; text: string }[]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + videoCardCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/pricing-traps">Pricing traps</a> / {t.name}
          </>
        }
        sticker="Renews every 4 weeks"
        title={`What does ${t.name} really cost?`}
        dek={`${t.name}’s ${f.trial ? `${money(f.trial.price)} trial` : 'plan'} renews at ${f.renewal ? money(f.renewal.price) : ''} every 4 weeks. Pay for a 3-month search and forget to cancel, and the first year comes to ${f.firstYearIfForgotten !== null ? money(f.firstYearIfForgotten) : ''}.`}
        dateline={`Prices checked ${formatDate(f.checked)} from ${t.name}’s own pricing · nobody pays to be featured`}
      />

      <section className="wrap sec sl-sec sl-sec-seekers" id="how">
        <StepHead n={1} title="How the billing works" />
        <div className="pt-steps">
          {steps.map((s) => (
            <article className="pt-step" key={s.big}>
              <p className="pt-big">{s.big}</p>
              <p className="pt-text">{keepLast(s.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="cost">
        <StepHead n={2} title="What it costs, by how long you search" sub="The cheapest published way to pay, next to what the first year costs if you then forget to cancel." />
        <div className="tscroll">
          <table className="pt-table">
            <thead>
              <tr>
                <th>Your search</th>
                <th>You pay</th>
                <th>First year if you forget to cancel</th>
              </tr>
            </thead>
            <tbody>
              {f.rows.map((r) => (
                <tr key={r.months}>
                  <td>{r.months === 12 ? 'A year' : `${r.months} month${r.months === 1 ? '' : 's'}`}</td>
                  <td>{r.pay !== null ? money(r.pay) : 'n/a'}</td>
                  <td className="pt-forget">{r.forget !== null ? money(r.forget) : 'n/a'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {t.verdict?.watch && <p className="pt-watch">{keepLast(t.verdict.watch)}</p>}
        <p className="tp-cta">
          <a className="tl" href="/guides/best-resume-tools#cost">
            Compare what every resume tool costs for your timeline <span className="arr">&rarr;</span>
          </a>
        </p>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="stop">
        <StepHead n={3} title="How to keep it from billing you" />
        <div className="sl-callout">
          <p className="sl-text">{keepLast('Put a reminder in your calendar for the day before the trial ends, and cancel before then if you don’t want the 4-week plan.')}</p>
        </div>
        {f.cancelVideo && (
          <div className="pt-video">
            <p className="pt-video-k">
              Watch: {f.cancelVideo.title}
              {f.cancelVideo.channel ? `, from ${f.cancelVideo.channel}` : ''} (made by an independent creator)
            </p>
            <VideoEmbed youtubeId={f.cancelVideo.youtubeId} title={f.cancelVideo.title} />
          </div>
        )}
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="free">
        <StepHead n={4} title="Free alternatives with a free version you can keep using" sub="Scored with the same data as every tool we rate." />
        <div className="sl-tools">
          {alts.map((a) => (
            <div className="sl-tool sl-tool-seekers" key={a.id}>
              <div className="sl-top">
                <Logo domain={a.domain} name={a.name} size={52} />
                <div>
                  <span className="sl-kind">{a.overall?.toFixed(2)} out of 5</span>
                  <h3 className="sl-name">{a.name}</h3>
                </div>
              </div>
              <p className="sl-line">
                <b>Free: </b>
                {keepLast(freeOnly(a.freeAnswer))}
              </p>
              <div className="sl-act">
                <span className="kit-go">
                  <a className="sl-go" href={`/go/${a.id}`} rel="nofollow noopener">
                    Go to {a.name} <span className="arr">&#8599;</span>
                  </a>
                  <span className="money">{moneyLine(a.id)}</span>
                </span>
                <a className="tl pt-review" href={`/reviews/${a.id}`}>
                  Is {a.name} worth it? <span className="arr">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        {vs.length > 0 && (
          <p className="pt-vs">
            Side by side:{' '}
            {vs.map((v, i) => (
              <span key={v.slug}>
                <a className="tl" href={`/compare/${v.slug}`}>
                  {v.label}
                </a>
                {i < vs.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        )}
      </section>

      <section className="wrap sec" id="faq">
        <h2>Questions people ask about {t.name}&rsquo;s billing</h2>
        <div className="pt-faq">
          {faqs.map((x) => (
            <details key={x.q}>
              <summary>{x.q}</summary>
              <p>{keepLast(x.a)}</p>
            </details>
          ))}
        </div>
      </section>

      <NextStep side="seekers" line="Want the tool that fits your search, at its real price? Answer a few questions." button="Help me choose" href="/what-should-i-use?side=seekers#questions" />
      <SiteFooter />
    </>
  )
}

const css = `
  .pt-steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:22px;margin-top:32px;}
  .pt-step{display:flex;flex-direction:column;gap:8px;padding:22px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);}
  .pt-step:nth-child(3){background:var(--coral-tint);}
  .pt-big{margin:0;font-weight:900;font-size:clamp(36px,4.4vw,52px);line-height:1;letter-spacing:-0.03em;color:var(--ink);}
  .pt-text{margin:0;font-size:17px;line-height:1.5;color:var(--ink-2);font-weight:600;}
  .pt-table{width:100%;max-width:760px;margin-top:28px;border-collapse:collapse;border-top:3px solid var(--ink);font-size:17px;}
  .pt-table th{text-align:left;font-size:14px;font-weight:800;color:var(--ink-2);padding:12px 10px;border-bottom:1px solid var(--ink);}
  .pt-table td{padding:14px 10px;border-bottom:1px solid var(--rule);font-variant-numeric:tabular-nums;font-weight:700;}
  .pt-table .pt-forget{color:var(--coral-text);font-weight:900;}
  .pt-watch{margin-top:22px;max-width:760px;padding:14px 16px;border-left:4px solid var(--coral);background:var(--surface);font-size:17px;line-height:1.55;color:var(--ink);}
  .pt-video{margin-top:28px;max-width:760px;}
  .pt-video-k{font-size:15px;font-weight:800;color:var(--ink);margin-bottom:12px;}
  .pt-review{display:inline-block;margin-top:14px;font-size:15px;font-weight:800;}
  .pt-vs{margin-top:28px;font-size:16px;font-weight:700;color:var(--ink);}
  .pt-faq{margin-top:24px;max-width:820px;border-top:1px solid var(--rule);}
  .pt-faq details{border-bottom:1px solid var(--rule);}
  .pt-faq summary{padding:18px 0;font-size:18px;font-weight:800;cursor:pointer;color:var(--ink);}
  .pt-faq details p{padding:0 0 18px;font-size:17px;line-height:1.6;color:var(--ink-2);}
`
