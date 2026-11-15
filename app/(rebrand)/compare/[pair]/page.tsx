import type { Metadata } from 'next'
import { PICKER_INTRO } from '@/lib/evidence/kit'
import { moneyLine } from '@/lib/money'
import { notFound } from 'next/navigation'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { videoCardCss } from '@/app/(rebrand)/_components/widgets-css'
import { shortDate } from '@/app/(rebrand)/_components/data'
import { VIDEO_KIND_LABEL, formatMonth, guide as evidenceGuide } from '@/lib/evidence'
import { buildComparison, compareHref, comparePairs, type Side } from '@/lib/compare'

/**
 * "X vs Y": the search people make when they've narrowed it to two. Every
 * line on the page is computed from the same data as the scoreboards (see
 * lib/compare.ts), so it updates with the monthly refresh and can't
 * disagree with the review pages.
 */

type Params = { pair: string }
const SITE = 'https://hiring.productions'

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return comparePairs().map((p) => ({ pair: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pair } = await params
  const c = buildComparison(pair)
  if (!c) return {}
  return {
    alternates: { canonical: compareHref(pair) },
    title: `${c.a.name} vs ${c.b.name}: Which Is Better? Ratings, Price and Free Version (2026)`,
    description: `${c.verdict} ${c.a.name} and ${c.b.name} side by side: user ratings, what they really cost, the free versions and a video of each.`,
  }
}

/** Drops cross-references meant for the guide table ("See our high-volume guide"). */
const bestFor = (s: string) => s.replace(/\.\s*See our[^.]*\.?$/, '')

function Meter({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="meter">
      <span className="meter-l">{label}</span>
      <span className="meter-bar" aria-hidden="true">
        <i style={{ width: `${((value ?? 0) / 5) * 100}%` }} />
      </span>
      <b>{value === null ? 'n/a' : value.toFixed(2)}</b>
    </div>
  )
}

const css = `
  .vs{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;margin-top:8px;}
  .vs-side{padding:32px;display:flex;flex-direction:column;gap:22px;}
  .vs-id{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
  .vs-id h2{font-size:clamp(26px,2.6vw,32px);margin:0;letter-spacing:-0.02em;}
  .vs-big{display:flex;align-items:baseline;gap:10px;}
  .vs-big b{font-size:clamp(56px,7vw,80px);font-weight:900;line-height:0.9;letter-spacing:-0.035em;font-variant-numeric:tabular-nums;}
  .vs-big span{font-size:15px;color:var(--ink-3);font-weight:700;}
  .k-resume .vs-win .vs-big b{color:var(--indigo-text);}
  .k-ats .vs-win .vs-big b{color:var(--coral-text);}
  .meter{display:grid;grid-template-columns:96px minmax(0,1fr) 46px;gap:4px 12px;align-items:center;padding:4px 0;}
  .meter-l{font-weight:700;font-size:14.5px;}
  .meter-bar{height:8px;background:#F0EEF7;border-radius:4px;overflow:hidden;}
  .meter-bar i{display:block;height:100%;background:var(--indigo);border-radius:4px;}
  .meter b{font-weight:900;text-align:right;font-variant-numeric:tabular-nums;}
  .k-ats .meter-bar i{background:var(--coral);}
  .vs-facts{border-top:1px solid var(--rule);display:grid;}
  .vs-facts div{display:grid;grid-template-columns:120px minmax(0,1fr);gap:12px;padding:12px 0;border-bottom:1px solid var(--rule);font-size:16px;color:var(--ink-2);}
  .vs-facts dt{font-weight:800;color:var(--ink-3);font-size:14px;padding-top:2px;}
  .vs-facts dd{margin:0;}
  .vs-facts dd b{color:var(--ink);font-size:18px;}
  .vs-facts small{display:block;color:var(--ink-3);font-size:14px;margin-top:2px;}
  .vs-links{display:flex;flex-wrap:wrap;gap:8px 20px;margin-top:auto;font-size:16px;font-weight:800;}
  .wins{border-top:1px solid var(--ink);margin-top:28px;max-width:960px;}
  .wins div{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,0.6fr) minmax(0,1.6fr);gap:20px;align-items:baseline;padding:20px 0;border-bottom:1px solid var(--rule);}
  .wins dt{font-size:18px;font-weight:900;color:var(--ink);}
  .wins dd{margin:0;font-size:17px;color:var(--ink-2);}
  .wins .tie{font-weight:800;color:var(--ink-3);font-size:15px;}
  .fit{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;margin-top:28px;}
  .fit h3{font-size:clamp(22px,2.2vw,26px);font-weight:900;letter-spacing:-0.01em;}
  .fit .fit-for{font-size:clamp(19px,1.8vw,21px);font-weight:800;color:var(--ink);margin-top:10px;}
  .fit p{font-size:17px;color:var(--ink-2);margin-top:12px;line-height:1.6;}
  .fit p b{color:var(--ink);}
  .vid-grid.two{grid-template-columns:repeat(2,minmax(0,1fr));}
  .cmp-cta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;padding:32px;border-radius:var(--r-lg);}
  .k-resume .cmp-cta{background:var(--indigo-tint);}
  .k-ats .cmp-cta{background:var(--coral-tint);}
  .cmp-cta p{font-size:clamp(19px,1.9vw,22px);font-weight:800;color:var(--ink);max-width:640px;}
  .more{columns:2;column-gap:48px;margin-top:24px;max-width:860px;}
  .more li{list-style:none;padding:10px 0;border-bottom:1px solid var(--rule);break-inside:avoid;font-size:17px;}
  .cmp-end{padding-bottom:clamp(96px,11vw,150px);}
  @media(max-width:860px){.vs,.fit{grid-template-columns:1fr;}.vid-grid.two{grid-template-columns:1fr;}.more{columns:1;}
    .wins div{grid-template-columns:1fr;gap:4px;}}
  @media(max-width:440px){.vs-side{padding:24px 20px;}.vs-facts div{grid-template-columns:1fr;gap:2px;}}
`

export default async function ComparePage({ params }: { params: Promise<Params> }) {
  const { pair } = await params
  const c = buildComparison(pair)
  if (!c) notFound()
  const { a, b, wins, verdict } = c
  const resume = c.pair.kind === 'resume'
  const pill = resume ? 'pill pill-seekers pill-sm' : 'pill pill-hiring pill-sm'
  const ratedHigher = wins[0].winner
  const asOf = shortDate(c.asOf)
  const hub = resume ? { href: '/for-job-seekers', label: 'For job seekers' } : { href: '/for-hiring-teams', label: 'For hiring teams' }
  const guide = resume ? { href: '/guides/best-resume-tools', label: 'Resume tools' } : { href: '/guides/best-ats-for-small-teams', label: 'Applicant tracking' }
  const cta = resume
    ? { href: '/what-should-i-use?side=seekers#questions', text: PICKER_INTRO, button: 'What should I use?' }
    : { href: '/what-should-i-use?side=hiring&problem=spreadsheets#questions', text: PICKER_INTRO, button: 'What should we use?' }
  const more = comparePairs()
    .filter((p) => p.kind === c.pair.kind && p.slug !== pair)
    .map((p) => ({ slug: p.slug, c: buildComparison(p.slug)! }))
    .filter((x) => x.c.group === c.group)
  const cost = wins.find((w) => w.what.startsWith('Costs') || w.what === 'Lists its price')

  const faqs = [
    { q: `Is ${a.name} better than ${b.name}?`, a: `${verdict} Ratings as of ${asOf}.` },
    ...(cost ? [{ q: `Which is cheaper, ${a.name} or ${b.name}?`, a: cost.line }] : []),
    { q: `Is ${a.name} free?`, a: `${a.name}: ${a.free}.` },
    { q: `Is ${b.name} free?`, a: `${b.name}: ${b.free}.` },
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${SITE}/compare` },
          { '@type': 'ListItem', position: 3, name: `${a.name} vs ${b.name}`, item: `${SITE}${compareHref(pair)}` },
        ],
      },
    ],
  }

  const sideCard = (s: Side) => (
    <article className={`vs-side card${ratedHigher === s.name ? ' vs-win' : ''}`} aria-label={s.name}>
      <div className="vs-id">
        <Logo domain={s.domain} name={s.name} size={48} />
        <h2>{s.name}</h2>
        {ratedHigher === s.name && <span className={pill}>Rated higher</span>}
      </div>
      <div className="vs-big">
        <b>{s.overall.toFixed(2)}</b>
        <span>out of 5</span>
      </div>
      <div>
        {s.parts.map((p) => (
          <Meter key={p.label} label={p.label} value={p.value} />
        ))}
      </div>
      <dl className="vs-facts">
        <div>
          <dt>{s.costLabel}</dt>
          <dd>
            <b>{s.costShown ?? 'Ask for a quote'}</b>
            {s.costShown && <small>{s.costHow}</small>}
          </dd>
        </div>
        <div>
          <dt>Free version</dt>
          <dd>{s.free}</dd>
        </div>
        {s.renews4w && (
          <div>
            <dt>Billing</dt>
            <dd>Every 4 weeks: 13 charges a year</dd>
          </div>
        )}
      </dl>
      <p className="vs-links">
        <a className="tl" href={s.href}>
          Full {s.name} review
        </a>
        <a className="tl" href={`/go/${s.goId}`} rel="nofollow">
          {s.name}&rsquo;s site <span className="arr">&#8599;</span>
        </a>
      </p>
      <p className="money" style={{ marginTop: -14 }}>
        {s.name}&rsquo;s site: {moneyLine(s.goId).charAt(0).toLowerCase() + moneyLine(s.goId).slice(1)}
      </p>
    </article>
  )

  return (
    <div className={resume ? 'k-resume' : 'k-ats'}>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + videoCardCss + css }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav active={resume ? 'seekers' : 'hiring'} />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href={hub.href}>{hub.label}</a> / <a href={guide.href}>{guide.label}</a> / {a.name} vs {b.name}
          </p>
          <h1 className="display">
            {a.name} or {b.name}?
          </h1>
          <p className="dek">{verdict}</p>
          <p className="dateline">
            Two of the {c.group} we rate &middot; ratings and prices as of {asOf} &middot; next check {formatMonth(evidenceGuide.nextCheck)}
          </p>
        </div>
      </header>

      <section className="wrap sec-tight" aria-label="Side by side">
        <div className="vs">
          {sideCard(a)}
          {sideCard(b)}
        </div>
      </section>

      <section className="wrap sec" id="who-wins">
        <h2>Who wins what</h2>
        <dl className="wins">
          {wins.map((w) => (
            <div key={w.what}>
              <dt>{w.what}</dt>
              <dd>{w.winner ? <span className={pill}>{w.winner}</span> : <span className="tie">Tie</span>}</dd>
              <dd>{w.line}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap sec" id="fit">
        <h2>Which one fits you</h2>
        <div className="fit">
          {[a, b].map((s) => (
            <div key={s.name}>
              <h3>{s.name}</h3>
              <p className="fit-for">{bestFor(s.bestFor)}.</p>
              {s.bestIf && (
                <p>
                  <b>Pick it if:</b> {s.bestIf}
                </p>
              )}
              {s.skipIf && (
                <p>
                  <b>Skip it if:</b> {s.skipIf}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {(a.videos.length > 0 || b.videos.length > 0) && (
        <section className="wrap sec" id="videos">
          <h2>See both before you pay</h2>
          <p className="lead">Labeled by who made each one.</p>
          <div className="vid-grid two">
            {[a, b].flatMap((s) =>
              s.videos.map((v) => (
                <figure className="vid" key={v.youtubeId}>
                  <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                  <figcaption className="vid-meta">
                    <Logo domain={s.domain} name={s.name} size={36} />
                    <span>
                      <b>{v.title}</b>
                      <span className={`vid-kind k-${v.kind}`}>
                        {VIDEO_KIND_LABEL[v.kind]}
                        {v.channel ? `: ${v.channel}` : ''}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              )),
            )}
          </div>
        </section>
      )}


      <section className="wrap sec cmp-end" id="more">
        <h2>More comparisons</h2>
        <p className="lead">The other {c.group} we rate, two at a time.</p>
        <ul className="more">
          {more.map((m) => (
            <li key={m.slug}>
              <a className="tl" href={compareHref(m.slug)}>
                {m.c.a.name} vs {m.c.b.name}
              </a>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 24, fontSize: 16 }}>
          <a className="tl" href="/compare">
            Every comparison
          </a>
        </p>
      </section>

      <section className="wrap sec" id="next">
        <div className="cmp-cta">
          <p>{cta.text}</p>
          <a className={resume ? 'btn btn-indigo' : 'btn btn-coral'} href={cta.href}>
            {cta.button}
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
