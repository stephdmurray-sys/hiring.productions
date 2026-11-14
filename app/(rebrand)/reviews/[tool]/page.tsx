import type { Metadata } from 'next'
import { toolReviewLd, SITE } from '@/app/(rebrand)/_components/structured'
import { notFound } from 'next/navigation'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { Logo, PUBLISHER_DOMAINS } from '@/app/(rebrand)/_components/logo'
import { Scoreboard, boardCss } from '@/app/(rebrand)/_components/scoreboard'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { videoCardCss } from '@/app/(rebrand)/_components/widgets-css'
import { money, seekerRow, shortDate } from '@/app/(rebrand)/_components/data'
import {
  FREE_LEVEL_LABEL,
  MIN_REVIEWS,
  STANCE_LABEL,
  STATUS_LABEL,
  VIDEO_KIND_LABEL,
  cheapestCover,
  forgetCost,
  formatCount,
  formatMonth,
  guide,
  hasUnverified,
  latestCheck,
  resumeTools,
  risingPick,
  type ToolEvidence,
} from '@/lib/evidence'
import { reviewCss } from './review-css'
import { compareHref, comparisonsFor } from '@/lib/compare'

/**
 * One page per tool, answering what people actually search before they pay:
 * is it worth it, is it free, what does it really cost, does it renew, and
 * what's the alternative. Everything comes from the evidence layer, so the
 * monthly refresh updates these pages too.
 */

type Params = { tool: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return resumeTools().all.map((t) => ({ tool: t.id }))
}

function find(id: string): ToolEvidence | undefined {
  return resumeTools().all.find((t) => t.id === id)
}

const SEGMENT = { checker: 'ATS resume checker', builder: 'resume builder' } as const
const SEGMENT_PLURAL = { checker: 'checkers', builder: 'builders' } as const

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tool } = await params
  const t = find(tool)
  if (!t) return {}
  return {
    alternates: { canonical: `/reviews/${t.id}` },
    title: `Is ${t.name} Worth It? ${t.name} Review, Real Cost and Alternatives (2026)`,
    description: `${t.name} ${SEGMENT[t.segment]} review: ${t.call.line} Pricing, what a year really costs, which independent lists name it, demo videos and the best alternatives. Checked ${shortDate(latestCheck())}.`,
  }
}

function Meter({ label, value, note }: { label: string; value: number | null; note: string }) {
  return (
    <div className="meter">
      <span className="meter-l">{label}</span>
      <span className="meter-bar" aria-hidden="true">
        <i style={{ width: `${((value ?? 0) / 5) * 100}%` }} />
      </span>
      <b>{value !== null ? value.toFixed(1) : 'n/e'}</b>
      <span className="meter-n">{note}</span>
    </div>
  )
}

export default async function ReviewPage({ params }: { params: Promise<Params> }) {
  const { tool } = await params
  const t = find(tool)
  if (!t) notFound()

  const { checkers, builders } = resumeTools()
  const peers = t.segment === 'checker' ? checkers : builders
  const checked = latestCheck()
  const isPick = guide.picks.find((p) => p.tool === t.id)
  const isRising = risingPick.tool === t.id

  const alternatives = peers.filter((x) => x.id !== t.id && x.overall !== null).sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0))
  const bestAlt = alternatives[0]
  const versus = comparisonsFor('resume', t.id)
  const months = [1, 3, 6, 12]
  const costRows = months.map((m) => ({ m, on: cheapestCover(t.id, m * 30), forget: forgetCost(t.id, m * 30) }))
  const cheaperAlt =
    cheapestCover(t.id, 90) !== null
      ? alternatives
          .filter((x) => cheapestCover(x.id, 90) !== null)
          .sort((a, b) => cheapestCover(a.id, 90)!.total - cheapestCover(b.id, 90)!.total)[0]
      : undefined

  const verdictLine = t.enoughEvidence
    ? `${t.name} ranks #${t.rank} of ${peers.length} ${SEGMENT_PLURAL[t.segment]} we track, with an overall score of ${t.overall?.toFixed(2)} out of 5.`
    : `${t.name} doesn't have enough public reviews for a score yet (${formatCount(t.citableReviews)} of the ${MIN_REVIEWS} we require).`

  const faqs: { q: string; a: string }[] = [
    { q: `Is ${t.name} worth it?`, a: `${verdictLine} ${t.call.line}` },
    {
      q: `Is ${t.name} free?`,
      a: t.freeAnswer,
    },
    {
      q: `How much does ${t.name} cost for a year?`,
      a: t.yearCost
        ? `${t.yearCost.approx ? 'About ' : ''}${money(t.yearCost.amount)} (${t.yearCost.how.toLowerCase()}), from the published pricing as of ${shortDate(checked)}.`
        : `${t.pricingLine}.`,
    },
  ]
  if (t.yearCost?.renewsEvery4Weeks) {
    faqs.push({
      q: `Does ${t.name} renew automatically?`,
      a: `Yes. ${t.pricingLine.split('·')[0].trim()}. That's 13 charges a year, not 12, so a year costs ${money(t.yearCost.amount)} if you never cancel.`,
    })
  }
  if (bestAlt) {
    faqs.push({
      q: `What's the best alternative to ${t.name}?`,
      a: `${bestAlt.name}, the highest-scoring ${SEGMENT[t.segment]} we track (${bestAlt.overall?.toFixed(2)} out of 5). ${bestAlt.bestFor}.`,
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Resume tools', item: `${SITE}/guides/best-resume-tools` },
          { '@type': 'ListItem', position: 3, name: `${t.name} review`, item: `${SITE}/reviews/${t.id}` },
        ],
      },
      toolReviewLd(t),
    ],
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + boardCss + videoCardCss + reviewCss }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav active="seekers" />
      {hasUnverified() && (
        <div className="demo-note">
          <div className="wrap">
            <b>Still being confirmed.</b> A list placement or video on this page was read from a search listing and is confirmed on the live
            page at the next monthly check.
          </div>
        </div>
      )}

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/guides/best-resume-tools">Resume tools</a> / {t.name}
          </p>
          <div className="rv-head">
            <div>
              <div className="rv-id">
                <Logo domain={t.domain} name={t.name} size={64} />
                <span>
                  <span className="rv-seg">
                    <span className="dot-seekers" />
                    {SEGMENT[t.segment][0].toUpperCase() + SEGMENT[t.segment].slice(1)}
                    {isPick ? ` · ${isPick.label}` : isRising ? ` · ${risingPick.label}` : ''}
                  </span>
                </span>
              </div>
              <h1 className="display rv-h1">Is {t.name} worth paying for?</h1>
              <p className="dek">{t.call.line}</p>
              <p className="dateline">
                Checked {shortDate(checked)} &middot; next check {formatMonth(guide.nextCheck)} &middot;{' '}
                <a href={`/guides/best-resume-tools#evidence-${t.id}`}>every detail</a>
              </p>
              <p className="rv-visit">
                <a className="tl tl-strong" href={`/go/${t.id}`} rel="nofollow">
                  Go to {t.name}&rsquo;s site <span className="arr">&#8599;</span>
                </a>
              </p>
            </div>

            <aside className="rv-score card card-lift" aria-label={`${t.name} score`}>
              {t.enoughEvidence ? (
                <>
                  <div className="rv-big">
                    <b>{t.overall?.toFixed(2)}</b>
                    <span>
                      out of 5
                      <br />#{t.rank} of {peers.length} {SEGMENT_PLURAL[t.segment]}
                    </span>
                  </div>
                  <Meter
                    label="Users"
                    value={t.userScore}
                    note={`users say ${t.rawUserScore?.toFixed(1)} across ${formatCount(t.citableReviews)} reviews${t.rawUserScore !== null && t.userScore !== null && Math.abs(t.rawUserScore - t.userScore) >= 0.05 ? '; adjusted for sample size' : ''}`}
                  />
                  <Meter label="Popularity" value={t.marketScore} note="how many people use it, and how fast that’s growing" />
                  <Meter
                    label="Best-of lists"
                    value={t.criticsScore}
                    note={t.counted.length ? `named on ${t.counted.length} independent list${t.counted.length === 1 ? '' : 's'}` : 'no independent list names it yet'}
                  />
                  <Meter label="Value" value={t.valueScore} note={`${FREE_LEVEL_LABEL[t.freeLevel].toLowerCase()}${t.yearCost ? `; ${money(t.yearCost.amount)} a paid year` : ''}`} />
                </>
              ) : (
                <>
                  <div className="rv-big rv-none">
                    <b>Not scored</b>
                    <span>
                      {formatCount(t.citableReviews)} of {MIN_REVIEWS} public reviews
                    </span>
                  </div>
                  <span className="rv-progress" aria-hidden="true">
                    <i style={{ width: `${Math.min(100, (t.citableReviews / MIN_REVIEWS) * 100)}%` }} />
                  </span>
                  <p className="rv-none-p">
                    We don&rsquo;t score a tool until enough real users have reviewed it on sources we can cite. Checked again in{' '}
                    {formatMonth(guide.nextCheck)}.
                  </p>
                </>
              )}
              <p className="rv-stance">
                <span className={`stance stance-${t.call.stance}`}>{STANCE_LABEL[t.call.stance]}</span>
              </p>
            </aside>
          </div>
        </div>
      </header>

      {t.verdict && (
        <section className="wrap sec-tight" id="verdict">
          <div className="rv-verdict">
            <div>
              <h2 className="rv-h2">Pay for it if</h2>
              <p>{t.verdict.bestIf}</p>
            </div>
            <div>
              <h2 className="rv-h2">Skip it if</h2>
              <p>{t.verdict.skipIf}</p>
            </div>
            <div>
              <h2 className="rv-h2">What&rsquo;s good</h2>
              <p>{t.verdict.like}</p>
            </div>
            <div className="rv-watch">
              <h2 className="rv-h2">Watch out for</h2>
              <p>{t.verdict.watch}</p>
            </div>
          </div>
        </section>
      )}

      <section className="wrap sec" id="cost">
        <h2>What {t.name} really costs</h2>
        <p className="lead">
          <b>Is it free?</b> {t.freeAnswer}{' '}
          {t.yearCost?.renewsEvery4Weeks && <b className="rv-warn">That&rsquo;s 13 charges a year, not 12.</b>}
        </p>
        {costRows[0].on && (
          <div className="tscroll">
            <table className="ledger rv-cost">
              <thead>
                <tr>
                  <th>If your search takes</th>
                  <th className="num">Cheapest way to pay</th>
                  <th className="num">A year, if you forget to cancel</th>
                  <th>How</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map(({ m, on, forget }) => (
                  <tr key={m}>
                    <td>
                      <b>
                        {m} month{m === 1 ? '' : 's'}
                      </b>
                    </td>
                    <td className="num tscore">
                      {t.yearCost?.approx ? 'about ' : ''}
                      {money(on!.total)}
                    </td>
                    <td className={`num${forget! > on!.total + 0.005 ? ' rv-forget' : ''}`}>
                      {forget! > on!.total + 0.005 ? money(forget!) : 'no renewal inside a year'}
                    </td>
                    <td>{summarizeSteps(on!.steps)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="footnote">
          From {t.name}&rsquo;s published pricing as of {shortDate(checked)}. A month is 30 days.{' '}
          {cheaperAlt && cheaperAlt.id !== t.id && cheapestCover(cheaperAlt.id, 90)!.total < cheapestCover(t.id, 90)!.total && (
            <>
              For a 3-month search, {cheaperAlt.name} costs {money(cheapestCover(cheaperAlt.id, 90)!.total)}.{' '}
            </>
          )}
          <a href="/#cost">Compare every tool on your timeline</a>.
        </p>
      </section>

      <section className="wrap sec" id="lists">
        <h2>Who else names {t.name}?</h2>
        <p className="lead">
          We check the &ldquo;best resume tool&rdquo; lists every month and count only current, independent ones.
        </p>
        <div className="rv-lists">
          {t.counted.length === 0 && (
            <p className="rv-empty">None of the current, independent lists we&rsquo;ve checked name {t.name} so far.</p>
          )}
          {[...t.counted, ...t.notCounted].map((a) => (
            <a className={`rv-list${a.list.status === 'counts' ? ' counts' : ''}`} key={a.list.id} href={a.list.url} rel="nofollow noopener" target="_blank">
              <Logo domain={PUBLISHER_DOMAINS[a.list.publication]} name={a.list.publication} size={40} round />
              <span>
                <b>
                  {a.list.publication}
                  {a.position ? ` · #${a.position}` : ''}
                </b>
                <span className="rv-list-t">{a.list.title}</span>
                <span className={`rv-list-s${a.list.status === 'counts' ? ' ok' : ''}`}>
                  {a.list.status === 'counts' ? 'Counts' : `Not counted: ${STATUS_LABEL[a.list.status].toLowerCase()}`}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {t.videos.length > 0 && (
        <section className="wrap sec" id="videos">
          <h2>Watch {t.name} before you pay</h2>
          <p className="lead">Labeled by who made each one.</p>
          <div className="vid-grid">
            {t.videos.map((v) => (
              <figure className="vid" key={v.youtubeId}>
                <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                <figcaption className="vid-meta">
                  <Logo domain={t.domain} name={t.name} size={36} />
                  <span>
                    <b>{v.title}</b>
                    <span className={`vid-kind k-${v.kind}`}>{VIDEO_KIND_LABEL[v.kind]}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {alternatives.length > 0 && (
        <section className="wrap sec" id="alternatives">
          <h2>Alternatives to {t.name}</h2>
          <p className="lead">The other {SEGMENT_PLURAL[t.segment]} with enough reviews for a score, best first.</p>
          <div style={{ marginTop: 32 }}>
            <Scoreboard
              side="seekers"
              title={`Other rated ${SEGMENT_PLURAL[t.segment]}`}
              checked={`checked ${shortDate(checked)}`}
              rows={alternatives.map(seekerRow)}
            />
          </div>
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
        </section>
      )}

      <section className="wrap sec" id="faq">
        <h2>Questions about {t.name}</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap sec" id="signup">
        <div className="rv-signup">
          <div>
            <h2>Know when {t.name}&rsquo;s price or rank moves</h2>
            <p className="sublead">One email a month with what changed across every tool we track.</p>
          </div>
          <EvidenceSignup />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

function summarizeSteps(steps: string[]): string {
  const counts = new Map<string, number>()
  for (const s of steps) counts.set(s, (counts.get(s) ?? 0) + 1)
  return [...counts.entries()].map(([label, n]) => (n > 1 ? `${n} × ${label}` : label)).join(', then ')
}
