import type { Metadata } from 'next'
import { PICKER_INTRO } from '@/lib/evidence/kit'
import { keepLast } from '@/lib/site-line'
import { moneyLine } from '@/lib/money'
import { notFound } from 'next/navigation'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss } from '@/app/(rebrand)/_components/scoreboard'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { videoCardCss } from '@/app/(rebrand)/_components/widgets-css'
import { hiringBoard, shortDate } from '@/app/(rebrand)/_components/data'
import { reviewCss } from '@/app/(rebrand)/reviews/[tool]/review-css'
import { VIDEO_KIND_LABEL, formatCount, formatMonth, guide } from '@/lib/evidence'
import { atsCapability, atsYear } from '@/lib/evidence/recommend'
import { compareHref, comparisonsFor } from '@/lib/compare'
import { ATS_TIER, ATS_TIER_DETAIL, atsAsOfDate, atsInTier, atsProfile, atsProfiles, atsReviewHref } from '@/lib/ats-profiles'

/**
 * One page per applicant tracking system, answering what a hiring team asks
 * before a demo: is it worth it for a team our size, what does a year cost
 * for our seats, what do users say, what does it look like, and what else
 * should we look at. Everything comes from the ATS scorecard data and the
 * ATS guide, so the monthly refresh updates these pages too.
 */

type Params = { slug: string }
const SITE = 'https://hiring.productions'
const SEATS = [1, 3, 5, 10]

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return atsProfiles().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const p = atsProfile(slug)
  if (!p) return {}
  const name = p.t.name
  return {
    alternates: { canonical: atsReviewHref(name) },
    title: `Is ${name} Worth It? ${name} Review, Pricing and Alternatives (2026)`,
    description: `${name} applicant tracking system review for ${ATS_TIER[p.tier].toLowerCase()}: rated ${p.scores.overall.toFixed(2)} out of 5, #${p.rank} of ${p.tierCount}. What a year costs for your team, what users say on G2 and Capterra, a demo video, and the alternatives.`,
  }
}

function Meter({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div className="meter">
      <span className="meter-l">{label}</span>
      <span className="meter-bar" aria-hidden="true">
        <i style={{ width: `${(value / 5) * 100}%` }} />
      </span>
      <b>{value.toFixed(2)}</b>
      <span className="meter-n">{note}</span>
    </div>
  )
}

const money = (n: number, currency: string) =>
  currency === 'USD' ? `$${Math.round(n).toLocaleString('en-US')}` : `${currency} ${Math.round(n).toLocaleString('en-US')}`

const css = `
  .ats-page .rv-big b{color:var(--coral-text);}
  .ats-page .meter-bar i{background:var(--coral);}
  .cost-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:28px;}
  .cost-cell{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:18px 18px 16px;}
  .cost-cell span{display:block;font-size:14px;font-weight:800;color:var(--ink-3);}
  .cost-cell b{display:block;font-size:clamp(26px,3vw,34px);font-weight:900;letter-spacing:-0.02em;margin-top:4px;color:var(--ink);font-variant-numeric:tabular-nums;}
  .cost-cell small{display:block;font-size:13px;color:var(--ink-3);margin-top:4px;}
  .cost-quote b{font-size:20px;}
  .cost-note{margin-top:16px;font-size:15px;color:var(--ink-2);max-width:820px;}
  .say{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:28px;max-width:760px;}
  .say div{border:1px solid var(--rule);border-radius:var(--r-lg);padding:16px 18px;background:var(--surface);}
  .say b{display:block;font-size:30px;font-weight:900;color:var(--ink);}
  .say span{display:block;font-size:14.5px;color:var(--ink-2);}
  .caps{border-top:1px solid var(--rule);margin-top:24px;max-width:860px;}
  .caps div{padding:16px 0;border-bottom:1px solid var(--rule);font-size:17px;color:var(--ink);}
  .caps a{font-size:14px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;margin-left:6px;}
  .ats-cta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;padding:28px 32px;border-radius:var(--r-lg);background:var(--coral-tint);}
  .ats-cta p{font-size:clamp(19px,1.9vw,22px);font-weight:800;color:var(--ink);max-width:640px;}
  @media(max-width:860px){.cost-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.say{grid-template-columns:1fr;}}
`

export default async function AtsReviewPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = atsProfile(slug)
  if (!p) notFound()
  const { t, scores: s } = p
  const name = t.name
  const g2 = t.sources.g2
  const cap = (t.sources as { capterra?: { rating: number; reviews: number; as_of: string } }).capterra
  const tier = ATS_TIER[p.tier]
  const asOf = shortDate(atsAsOfDate)
  const costs = SEATS.map((n) => ({ n, c: atsYear(name, n) }))
  const quoteOnly = costs.every((x) => !x.c)
  const fraud = atsCapability('fraud-detection', name)
  const matching = atsCapability('ai-matching', name)
  const sameTier = new Set(atsInTier(p.tier).map((x) => x.name))
  const alternatives = hiringBoard().filter((r) => r.id !== name && sameTier.has(r.id))
  const best = alternatives[0]
  const versus = comparisonsFor('ats', p.slug)
  const growthPct = p.growth !== null ? Math.round(p.growth * 100) : null
  const verdictLine = `${name} is rated ${s.overall.toFixed(2)} out of 5, #${p.rank} of ${p.tierCount} systems we rank for ${tier.toLowerCase()} (${ATS_TIER_DETAIL[p.tier]}).`

  const faqs = [
    { q: `Is ${name} worth it?`, a: `${verdictLine}${p.row ? ` Best for: ${p.row.bestFor}.` : ''}` },
    {
      q: `How much does ${name} cost?`,
      a: quoteOnly
        ? `${name} doesn't list a price; you have to ask for a quote. Its pricing as we read it on ${asOf}: ${t.sources.pricing}.`
        : `${t.sources.pricing}. For 3 users that's about ${money(costs[1].c!.amount, costs[1].c!.currency)} a year (${costs[1].c!.how}), as listed on ${asOf}.`,
    },
    { q: `Is there a free version of ${name}?`, a: t.sources.free_tier ? `Yes, ${name} has a free plan.` : `No free plan; ${p.row?.freeOption === 'Trial' ? 'there is a free trial' : 'ask about a trial or demo'}.` },
    ...(best ? [{ q: `What's the best alternative to ${name}?`, a: `${best.name}, the ${best.score > s.overall ? 'higher' : 'next'}-rated system for ${tier.toLowerCase()} (${best.score.toFixed(2)} out of 5).` }] : []),
  ]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Applicant tracking systems', item: `${SITE}/guides/best-ats-for-small-teams` },
          { '@type': 'ListItem', position: 3, name: `${name} review`, item: `${SITE}${atsReviewHref(name)}` },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name,
        applicationCategory: 'BusinessApplication',
        url: `https://${t.domain}`,
        review: {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'hiring.productions', url: SITE },
          reviewRating: { '@type': 'Rating', ratingValue: Number(s.overall.toFixed(2)), bestRating: 5, worstRating: 1 },
        },
      },
    ],
  }

  return (
    <div className="ats-page">
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + videoCardCss + reviewCss + css }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav active="hiring" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-hiring-teams">For hiring teams</a> /{' '}
            <a href="/guides/best-ats-for-small-teams">Applicant tracking</a> / {name}
          </p>
          <div className="rv-head">
            <div>
              <div className="rv-id">
                <Logo domain={t.domain} name={name} size={64} />
                <span className="pill pill-hiring">
                  {tier}
                  {p.isLeader ? ' pick' : ''}
                </span>
              </div>
              <h1 className="display rv-h1">Is {name} worth it for your team?</h1>
              <p className="dek">{p.row ? `${p.row.bestFor}. ` : ''}{verdictLine}</p>
              <p className="dateline">
                Ratings and prices as of {asOf} &middot; next check {formatMonth(guide.nextCheck)}
              </p>
              <p className="rv-visit">
                <a className="tl tl-strong" href={`/go/${p.slug}`} rel="nofollow">
                  Go to {name}&rsquo;s site <span className="arr">&#8599;</span>
                </a>
                <span className="money">{moneyLine(p.slug)}</span>
              </p>
            </div>
            <aside className="rv-score card card-lift" aria-label={`${name} score`}>
              <div className="rv-big">
                <b>{s.overall.toFixed(2)}</b>
                <span>
                  out of 5
                  <br />#{p.rank} of {p.tierCount} for {tier.toLowerCase()}
                </span>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {p.verdict && (p.verdict.bestIf || p.verdict.skipIf) && (
        <section className="wrap sec-tight rv-verdict" id="verdict">
          {p.verdict.bestIf && (
            <div>
              <h2 className="rv-h2">Pick it if</h2>
              <p>{p.verdict.bestIf}</p>
            </div>
          )}

      <section className="wrap sec-tight" id="score">
        <h2 className="rv-h2 rv-score-h">How the {s.overall.toFixed(2)} breaks down</h2>
        <div className="rv-breakdown card">
          <Meter
            label="Users"
            value={s.user}
            note={g2 ? `${g2.rating} on G2 from ${formatCount(g2.reviews)} reviews; adjusted for sample size` : 'from public review sites'}
          />
          <Meter
            label="Popularity"
            value={s.market}
            note={growthPct !== null ? `reviews up ${growthPct}% in a year` : 'how many teams use it, and how fast that’s growing'}
          />
          <Meter label="Value" value={s.value} note={quoteOnly ? 'no listed price: you have to ask for a quote' : t.sources.free_tier ? 'listed price and a free plan' : 'listed price'} />
        </div>
      </section>

      <section className="wrap sec" id="cost">
        <h2>What a year costs</h2>
        <p className="lead">{quoteOnly ? `${name} doesn’t list a price. You have to ask for a quote.` : `From ${name}’s pricing page as of ${asOf}, for the number of people who log in.`}</p>
        {!quoteOnly && (
          <div className="cost-grid">
            {costs.map(({ n, c }) => (
              <div className={`cost-cell${c ? '' : ' cost-quote'}`} key={n}>
                <span>
                  {n} user{n === 1 ? '' : 's'}
                </span>
                <b>{c ? money(c.amount, c.currency) : 'Quote'}</b>
                <small>{c ? 'a year' : 'above the listed plan'}</small>
              </div>
            ))}
          </div>
        )}
        <p className="cost-note">
          Pricing as listed: {t.sources.pricing}.{t.sources.free_tier ? ' There’s a free plan.' : p.row?.freeOption === 'Trial' ? ' Free trial, no free plan.' : ''} Ask for the
          price in writing before you book a demo.
        </p>
      </section>

      <section className="wrap sec" id="users">
        <h2>What users say</h2>
        <div className="say">
          {g2 && (
            <div>
              <b>{g2.rating}</b>
              <span>
                on G2, from {formatCount(g2.reviews)} reviews (read {shortDate(g2.as_of)})
              </span>
            </div>
          )}
          {cap && (
            <div>
              <b>{cap.rating}</b>
              <span>
                on Capterra, from {formatCount(cap.reviews)} reviews (read {shortDate(cap.as_of)})
              </span>
            </div>
          )}
        </div>
        <p className="cost-note">G2 and Capterra are separate review pools. The users score above weighs them by how many reviews each has.</p>
      </section>

          {p.verdict.skipIf && (
            <div>
              <h2 className="rv-h2">Skip it if</h2>
              <p>{p.verdict.skipIf}</p>
            </div>
          )}
          {p.verdict.like && (
            <div>
              <h2 className="rv-h2">What&rsquo;s good</h2>
              <p>{p.verdict.like}</p>
            </div>
          )}
          {p.verdict.watch && (
            <div className="rv-watch">
              <h2 className="rv-h2">Watch out for</h2>
              <p>{p.verdict.watch}</p>
            </div>
          )}
        </section>
      )}

      {p.videos.length > 0 && (
        <section className="wrap sec" id="videos">
          <h2>See {name} before you book a demo</h2>
          <p className="lead">Labeled by who made each one.</p>
          <div className="vid-grid">
            {p.videos.map((v) => (
              <figure className="vid" key={v.youtubeId}>
                <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                <figcaption className="vid-meta">
                  <Logo domain={t.domain} name={name} size={36} />
                  <span>
                    <b>{v.title}</b>
                    <span className={`vid-kind k-${v.kind}`}>
                      {VIDEO_KIND_LABEL[v.kind]}: {v.channel}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {(fraud || matching) && (
        <section className="wrap sec" id="features">
          <h2>Built-in checks</h2>
          <div className="caps">
            {fraud && (
              <div>
                <b>Fraud detection:</b> {fraud.what}.
                <a href={fraud.url} rel="nofollow noopener" target="_blank">
                  {fraud.source}, {fraud.date}
                </a>
              </div>
            )}
            {matching && (
              <div>
                <b>AI candidate matching:</b> {matching.what}.
                <a href={matching.url} rel="nofollow noopener" target="_blank">
                  {matching.source}, {matching.date}
                </a>
              </div>
            )}
          </div>
          <p className="cost-note">As the vendor describes them. We haven&rsquo;t tested how well they work.</p>
        </section>
      )}


      {alternatives.length > 0 && (
        <section className="wrap sec" id="alternatives">
          <h2>Alternatives to {name}</h2>
          <p className="lead">The other systems we rank for {tier.toLowerCase()}, best first.</p>
          <div style={{ marginTop: 32, paddingBottom: 'clamp(96px,11vw,150px)' }}>
            <Scoreboard side="hiring" title={`${tier}: ${ATS_TIER_DETAIL[p.tier]}`} checked={`data as of ${asOf} · next check ${formatMonth(guide.nextCheck)}`} rows={alternatives} />
            {versus.length > 0 && (
              <p className="rv-versus">
                <b>Side by side:</b>{' '}
                {versus.map((v, i) => (
                  <span key={v.slug}>
                    {i > 0 && ' · '}
                    <a className="tl" href={compareHref(v.slug)}>
                      {v.label}
                    </a>
                  </span>
                ))}
              </p>
            )}

      <section className="wrap sec" id="fit">
        <div className="ats-cta">
          <p>{keepLast(PICKER_INTRO)}</p>
          <a className="btn btn-coral" href="/what-should-i-use?side=hiring&problem=spreadsheets#questions">
            What should we use?
          </a>
        </div>
      </section>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  )
}
