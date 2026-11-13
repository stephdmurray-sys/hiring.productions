import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { HashOpener } from '@/app/(rebrand)/_components/hash-opener'
import {
  MIN_REVIEWS,
  STANCE_LABEL,
  STATUS_LABEL,
  VIDEO_KIND_LABEL,
  absenceUnconfirmed,
  formatCount,
  formatDate,
  formatMonth,
  gridCell,
  guide,
  hasUnverified,
  latestCheck,
  resumeLists,
  resumeTools,
  risingPick,
  videos,
  type Appearance,
  type ToolEvidence,
} from '@/lib/evidence'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/best-resume-tools' },
  title: 'The Best Resume Tools of 2026: Builders and ATS Checkers, Ranked on Evidence',
  description:
    'Ten resume builders and ATS checkers ranked on citable public evidence, checked every month against what other reviewers rank, with labeled demo videos and what a year of each one really costs.',
}

const SEGMENT_LABEL = { checker: 'Checkers', builder: 'Builders' } as const
const SEGMENT_SINGULAR = { checker: 'checker', builder: 'builder' } as const

const ON_THIS_PAGE = [
  ['short', 'Our picks'],
  ['agree', 'Do reviewers agree?'],
  ['rankings', 'Rankings'],
  ['cost', 'What a year costs'],
  ['videos', 'Watch before you pay'],
  ['evidence', 'Evidence file'],
  ['faq', 'Questions'],
] as const

function Logo({ domain, size = 16 }: { domain: string; size?: number }) {
  return (
    <img
      className="logo-img"
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      width={size}
      height={size}
      alt=""
    />
  )
}

function stars(n: number) {
  const full = Math.max(0, Math.min(5, Math.floor(n + 0.25)))
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

function placement(a: Appearance) {
  if (a.position) return `#${a.position}`
  return a.list.format === 'picks' ? 'pick' : 'listed'
}

function rankLabel(t: ToolEvidence) {
  if (!t.enoughEvidence) return 'Unranked'
  return `#${t.rank} ${SEGMENT_SINGULAR[t.segment]}`
}

function Stance({ t }: { t: ToolEvidence }) {
  return <span className={`stance stance-${t.call.stance}`}>{STANCE_LABEL[t.call.stance]}</span>
}

function Bar({ label, value, note }: { label: string; value: number | null; note?: string }) {
  return (
    <div className="sbar">
      <span className="sbar-label">{label}</span>
      <span className="sbar-track" aria-hidden="true">
        {value !== null && <span className="sbar-fill" style={{ width: `${(value / 5) * 100}%` }} />}
      </span>
      <span className="sbar-val">
        {value !== null ? value.toFixed(label === 'Market' ? 2 : 1) : 'n/e'}
        {note && <span className="muted"> {note}</span>}
      </span>
    </div>
  )
}

function RankTable({ tools }: { tools: ToolEvidence[] }) {
  return (
    <div className="tscroll">
      <table className="rank-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Tool</th>
            <th>Best for</th>
            <th>Actually free?</th>
            <th>Price</th>
            <th>Overall*</th>
            <th>User</th>
            <th>Market</th>
            <th>Practitioner*</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t) => (
            <tr key={t.id}>
              <td className="rank-n">{t.enoughEvidence ? t.rank : '–'}</td>
              <td className="tool-cell">
                <Logo domain={t.domain} size={18} />
                <a href={`#evidence-${t.id}`}>{t.name}</a>
              </td>
              <td>{t.bestFor}</td>
              <td>{t.freeTier}</td>
              <td>{t.pricing}</td>
              <td className="nowrap">
                {t.overall !== null ? (
                  <>
                    <span className="tstars">{stars(t.overall)}</span> <span className="tscore">{t.overall.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="faint">n/e&dagger;</span>
                )}
              </td>
              <td>{t.userScore !== null ? t.userScore.toFixed(1) : <span className="faint">n/e&dagger;</span>}</td>
              <td>{t.marketScore.toFixed(2)}</td>
              <td>{t.practitionerScore.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EvidenceFile({ t }: { t: ToolEvidence }) {
  const ratingsDate = t.ratings.length ? t.ratings.map((r) => r.asOf).sort().slice(-1)[0] : null
  return (
    <details className="efile" id={`evidence-${t.id}`}>
      <summary>
        <span className="ef-rank">
          {t.enoughEvidence ? `#${t.rank}` : 'Unranked'}
          <span className="ef-seg">{SEGMENT_LABEL[t.segment]}</span>
        </span>
        <span className="ef-logo">
          <Logo domain={t.domain} size={24} />
        </span>
        <span className="ef-name">{t.name}</span>
        <span className="ef-score">{t.overall !== null ? t.overall.toFixed(2) : 'n/e'}</span>
        <Stance t={t} />
        <span className="ef-chev" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 5l4 4 4-4" />
          </svg>
        </span>
      </summary>

      <div className="ef-body">
        <p className="ef-call">{t.call.line}</p>

        <div className="sbars">
          <Bar label="User" value={t.userScore} />
          <Bar label="Market" value={t.marketScore} />
          <Bar label="Practitioner" value={t.practitionerScore} note="*" />
        </div>

        <div className="erows">
          <div className="erow">
            <h4>What users say</h4>
            {t.enoughEvidence ? (
              <p className="sum">
                {t.userScore?.toFixed(1)} from {formatCount(t.citableReviews)} citable reviews
              </p>
            ) : (
              <p className="sum">
                Not enough evidence: {formatCount(t.citableReviews)} citable review{t.citableReviews === 1 ? '' : 's'}, and we need{' '}
                {MIN_REVIEWS}.
              </p>
            )}
            <ul>
              {t.ratings.length === 0 && <li>No citable review listings found.</li>}
              {t.ratings.map((r) => (
                <li key={r.platform} className={r.droppedBecause ? 'dropped' : undefined}>
                  {r.rating} &middot; {formatCount(r.reviews)} reviews &middot; {r.platform}
                  {r.sourceStatus === 'permission-pending' && !r.droppedBecause && <span className="flag">Permission pending</span>}
                  {r.droppedBecause && <span className="muted"> &middot; not counted: {r.droppedBecause}</span>}
                </li>
              ))}
            </ul>
            {ratingsDate && <p className="muted">Read {formatDate(ratingsDate)}</p>}
          </div>

          <div className="erow">
            <h4>What other reviewers rank</h4>
            {t.counted.length === 0 && (
              <p className="sum">
                {absenceUnconfirmed(t)
                  ? 'Not on the current lists we’ve checked so far. Full lists are confirmed at the next check.'
                  : 'Not named on any current list we track.'}
              </p>
            )}
            <ul>
              {t.counted.map((a) => (
                <li key={a.list.id}>
                  <a href={a.list.url} target="_blank" rel="noopener noreferrer">
                    {a.list.publication}
                  </a>{' '}
                  {placement(a)} &middot; {a.list.edition}
                </li>
              ))}
              {t.notCounted.map((a) => (
                <li key={a.list.id} className="dropped">
                  {a.list.publication} {placement(a)} &middot; not counted: {STATUS_LABEL[a.list.status].toLowerCase()}
                </li>
              ))}
            </ul>
          </div>

          <div className="erow">
            <h4>Demos</h4>
            <p className="sum">
              {t.walkthrough ? `Walked through with the vendor, ${formatDate(t.walkthrough.date)}` : 'Our walkthrough: not booked yet'}
            </p>
            <ul>
              {t.videos.length === 0 && <li>No demo video pulled yet.</li>}
              {t.videos.map((v) => (
                <li key={v.youtubeId}>
                  <a href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer">
                    {v.title}
                  </a>{' '}
                  <span className="muted">
                    &middot; {VIDEO_KIND_LABEL[v.kind].toLowerCase()}
                    {v.year && !v.title.includes(String(v.year)) ? ` · ${v.year}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="erow">
            <h4>What it really costs</h4>
            <p className="sum">{t.pricingLine}</p>
            {t.yearCost && (
              <p className="muted">
                A year of the paid plan: {t.yearCost.approx ? 'about ' : ''}
                {money(t.yearCost.amount)} ({t.yearCost.how.charAt(0).toLowerCase() + t.yearCost.how.slice(1)})
              </p>
            )}
          </div>
        </div>

        {t.verdict && (
          <div className="verdict">
            <div className="v-row">
              <span className="v-key v-good">Best if</span>
              <span className="v-val">{t.verdict.bestIf}</span>
            </div>
            <div className="v-row">
              <span className="v-key">Skip it if</span>
              <span className="v-val">{t.verdict.skipIf}</span>
            </div>
            <div className="v-row">
              <span className="v-key">What we like</span>
              <span className="v-val">{t.verdict.like}</span>
            </div>
            <div className="v-row">
              <span className="v-key">Watch for</span>
              <span className="v-val">{t.verdict.watch}</span>
            </div>
          </div>
        )}
        <a href={`/go/${t.id}`} className="textlink">
          Visit {t.name} &#8599;
        </a>
      </div>
    </details>
  )
}

function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="faq-item">
      <summary>{q}</summary>
      <p>{children}</p>
    </details>
  )
}

export default function Page() {
  const { checkers, builders, all } = resumeTools()
  const lists = resumeLists()
  const counting = lists.filter((l) => l.status === 'counts')
  const notCounting = lists.length - counting.length
  const byId = Object.fromEntries(all.map((t) => [t.id, t]))
  const breaks = all.filter((t) => t.call.stance === 'breaks')
  const featured = videos.filter((v) => v.featured)
  const checked = latestCheck()
  const ratingPlatforms = Array.from(new Set(all.flatMap((t) => t.ratings.map((r) => r.platform))))
  const ratingsRead = all.flatMap((t) => t.ratings.map((r) => r.asOf)).sort().slice(-1)[0]
  const rising = byId[risingPick.tool]
  const costRows = all.filter((t) => t.yearCost).sort((a, b) => a.yearCost!.amount - b.yearCost!.amount)
  const maxCost = Math.max(...costRows.map((t) => t.yearCost!.amount))
  const listsCountingIds = new Set(counting.map((l) => l.id))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss }} />
      <HashOpener prefix="evidence-" />

      <SiteNav active="seekers" />

      <header className="g-hero">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> &rsaquo; <a href="/for-job-seekers">For job seekers</a> &rsaquo; Resume tools
          </p>
          <h1>The best resume tools of 2026</h1>
          <p className="dek">
            Builders and ATS checkers, ranked on dated evidence and checked every month against the other lists you&rsquo;re likely to
            read.
          </p>
          <div className="glance">
            <div>
              <b>{all.length}</b>
              <span>tools compared</span>
            </div>
            <div>
              <b>{lists.length}</b>
              <span>other reviewers&rsquo; lists checked</span>
            </div>
            <div>
              <b>{videos.length}</b>
              <span>demo and review videos</span>
            </div>
            <div>
              <b>Monthly</b>
              <span>next check {formatMonth(guide.nextCheck)}</span>
            </div>
          </div>
          <p className="byline">
            Lists and videos checked {formatDate(checked)} <span className="dot">&middot;</span> Ratings read {formatDate(ratingsRead)}{' '}
            <span className="dot">&middot;</span> <a href="/how-we-review">How we review</a>
          </p>
          <p className="disclosure">
            Some links below are affiliate links: if you buy through one, the vendor pays us a commission. Placement, rankings and scores
            can&rsquo;t be bought, which is why the category&rsquo;s biggest advertiser ranks where the evidence puts it.{' '}
            <a href="/advertiser-disclosure">Full disclosure</a>
          </p>
        </div>
      </header>

      {hasUnverified() && (
        <div className="demo-note">
          <div className="wrap">
            <b>Demo build.</b> Other reviewers&rsquo; lists and video labels on this page came from search listings on{' '}
            {formatDate(checked)}. Each one is confirmed on the live page at the {formatMonth(guide.nextCheck)} check.
          </div>
        </div>
      )}

      <nav className="toc-bar" aria-label="On this page">
        <div className="wrap">
          {ON_THIS_PAGE.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="wrap" id="short">
        <h2>Our picks</h2>
        <p className="lead">
          Resume tools are where job seekers get burned: free builders that charge for the download, $2 trials that quietly renew every
          4 weeks, and scores designed to sell the fix. So this guide ranks on citable evidence, checks itself against the other lists
          you&rsquo;ll read, and prints every renewal price.
        </p>
        <div className="picks">
          {guide.picks.map((p, i) => {
            const t = byId[p.tool]
            return (
              <div className="pick" key={p.tool}>
                <span className="pick-label">{p.label}</span>
                <div className="pick-id">
                  <span className="pick-logo">
                    <Logo domain={t.domain} size={28} />
                  </span>
                  <span className="pick-name">{t.name}</span>
                </div>
                <div className="pick-stats">
                  <span>
                    <b>{t.overall?.toFixed(2)}</b>overall score
                  </span>
                  <span>
                    <b>#{t.rank}</b>
                    {SEGMENT_SINGULAR[t.segment]}
                  </span>
                  {t.yearCost && (
                    <span>
                      <b>{money(t.yearCost.amount)}</b>a year, paid
                    </span>
                  )}
                </div>
                <p className="pick-best">
                  {p.line}
                  {t.headlineRating ? ` ${t.headlineRating}.` : ''}
                </p>
                <a href={`/go/${t.id}`} className={i === 0 ? 'btn btn-solid' : 'btn btn-outline'}>
                  Visit {t.name} &#8599;
                </a>
              </div>
            )
          })}
          <div className="pick pick-rising">
            <span className="pick-label">{risingPick.label}</span>
            <div className="pick-id">
              <span className="pick-logo">
                <Logo domain={rising.domain} size={28} />
              </span>
              <span className="pick-name">{rising.name}</span>
            </div>
            <div className="pick-stats">
              <span>
                <b>{rising.userScore?.toFixed(1)}</b>from {formatCount(rising.citableReviews)} users
              </span>
              <span>
                <b>#{rising.rank}</b>
                {SEGMENT_SINGULAR[rising.segment]}, on evidence
              </span>
              <span>
                <b>$0</b>for a clean PDF
              </span>
            </div>
            <p className="pick-best">{risingPick.line}</p>
            <div className="rising-by">
              <span className="rising-avatar" aria-hidden="true">
                SM
              </span>
              <span>
                <b>Stephanie Murray</b>
                <br />
                2025 Transform Award, Talent Strategy of the Year
              </span>
            </div>
            <a href={`/go/${rising.id}`} className="btn btn-light">
              Visit {rising.name} &#8599;
            </a>
          </div>
        </div>
      </section>

      <section className="wrap" id="agree">
        <h2>Do the other reviewers agree?</h2>
        <p className="lead">
          We track {lists.length} other &ldquo;best resume tool&rdquo; lists and re-check them every month. Only {counting.length} count:
          current, and not published by a company that sells what it ranks. Here&rsquo;s where they land next to us.
        </p>
        <div className="tscroll">
          <table className="agree-grid">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Our rank</th>
                <th>Users</th>
                {counting.map((l) => (
                  <th key={l.id} className="col-list">
                    {l.publication}
                    <span>{l.edition}</span>
                  </th>
                ))}
                <th className="col-list">
                  Not counted
                  <span>{notCounting} lists</span>
                </th>
                <th>Our call</th>
              </tr>
            </thead>
            <tbody>
              {all.map((t) => (
                <tr key={t.id}>
                  <td className="tool-cell">
                    <Logo domain={t.domain} size={18} />
                    <a href={`#evidence-${t.id}`}>{t.name}</a>
                  </td>
                  <td className="nowrap">{rankLabel(t)}</td>
                  <td className="nowrap">
                    {t.userScore !== null ? (
                      <>
                        <b>{t.userScore.toFixed(1)}</b> <span className="muted">({formatCount(t.citableReviews)})</span>
                      </>
                    ) : (
                      <span className="muted">Too few</span>
                    )}
                  </td>
                  {counting.map((l) => {
                    const c = gridCell(t, l)
                    return (
                      <td key={l.id} className="cell">
                        {c.state === 'named' && <span className="dot-named">{c.label}</span>}
                        {c.state === 'unknown' && (
                          <span className="dot-unknown" title="Full list not confirmed yet">
                            ?
                          </span>
                        )}
                        {c.state === 'not-named' && <span className="dot-no" title="Checked: not named" />}
                        {c.state === 'not-covered' && (
                          <span className="dot-na" title="This list doesn't cover this kind of tool">
                            &middot;
                          </span>
                        )}
                      </td>
                    )
                  })}
                  <td className="cell">
                    {t.notCounted.length > 0 ? (
                      <span className="dot-muted" title={t.notCounted.map((a) => a.list.publication).join(', ')}>
                        {t.notCounted.length}
                      </span>
                    ) : (
                      <span className="dot-na">&middot;</span>
                    )}
                  </td>
                  <td>
                    <Stance t={t} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="legend">
          <span className="dot-named">#1</span> named, with its position <span className="dot-unknown">?</span> full list not confirmed yet{' '}
          <span className="dot-na">&middot;</span> list doesn&rsquo;t cover this kind of tool
        </p>

        {breaks.length > 0 && (
          <>
            <h3 className="h3">Where we break from the pack</h3>
            <div className="breaks-grid">
              {breaks.map((t) => (
                <a className="break-card" key={t.id} href={`#evidence-${t.id}`}>
                  <span className="bc-name">
                    <Logo domain={t.domain} size={20} />
                    {t.name}
                  </span>
                  <span className="bc-line">{t.call.line}</span>
                  <span className="bc-more">See the evidence &rarr;</span>
                </a>
              ))}
            </div>
          </>
        )}

        <div className="owner-note">
          <p className="on-eyebrow">Who owns the list you&rsquo;re reading?</p>
          <p>
            BOLD owns MyPerfectResume, LiveCareer and Zety. It also owns FlexJobs and Monster, and both of their &ldquo;best resume
            builder&rdquo; lists put BOLD brands on top. We show those lists. We don&rsquo;t count them.
          </p>
        </div>

        <details className="lists-details">
          <summary>
            All {lists.length} lists we checked, and why {notCounting} don&rsquo;t count
          </summary>
          <div className="tscroll">
            <table>
              <thead>
                <tr>
                  <th>List</th>
                  <th>Edition</th>
                  <th>Status</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                {lists.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <b>{l.publication}</b>
                      <br />
                      <a href={l.url} target="_blank" rel="noopener noreferrer">
                        {l.title}
                      </a>
                    </td>
                    <td>{l.edition}</td>
                    <td>
                      <span className={`lstatus${listsCountingIds.has(l.id) ? ' lstatus-counts' : ''}`}>{STATUS_LABEL[l.status]}</span>
                    </td>
                    <td>{l.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            A list counts when it shows an update or current-year edition within the last 12 months and its publisher doesn&rsquo;t own
            what it ranks. Every list is re-checked monthly and saved to the Internet Archive.
          </p>
        </details>
      </section>

      <section className="wrap" id="rankings">
        <h2>Ranked on evidence</h2>
        <p className="lead">
          Where a tool has fewer than {MIN_REVIEWS} citable public reviews, we say &ldquo;not enough evidence&rdquo; instead of inventing
          stars.
        </p>
        <h3 className="h3">ATS resume checkers</h3>
        <p className="sublead">Tools that read your resume the way applicant tracking software does, before a recruiter ever sees it.</p>
        <RankTable tools={checkers} />
        <h3 className="h3">Resume builders</h3>
        <p className="sublead">Where you actually write the thing. Read the &ldquo;Actually free?&rdquo; column first.</p>
        <RankTable tools={builders} />
        <p className="footnote">
          Ratings read {formatDate(ratingsRead)} from dated public sources: {ratingPlatforms.join(', ')}. The G2 family (G2, Capterra,
          GetApp, Software Advice) shares one review pool and counts once. *Practitioner and Overall scores are in final review.
          &dagger;n/e: fewer than {MIN_REVIEWS} citable public reviews exist. Methodology on <a href="/how-we-review">How We Review</a>.
        </p>
      </section>

      <section className="wrap" id="cost">
        <h2>What a year really costs</h2>
        <p className="lead">
          The sticker price is the trial. This is the cheapest published way to pay for 12 months of each paid plan. Plans billed every 4
          weeks charge you 13 times a year, not 12.
        </p>
        <div className="cost-chart" role="list">
          {costRows.map((t) => {
            const c = t.yearCost!
            return (
              <div className={`cost-row${c.renewsEvery4Weeks ? ' cost-trap' : ''}`} role="listitem" key={t.id}>
                <span className="cost-name">
                  <Logo domain={t.domain} size={18} />
                  {t.name}
                </span>
                <span className="cost-track">
                  <span className="cost-fill" style={{ width: `${Math.max(4, (c.amount / maxCost) * 100)}%` }} />
                </span>
                <span className="cost-amt">
                  {c.approx ? 'about ' : ''}
                  {money(c.amount)}
                </span>
                <span className="cost-how">
                  {c.how}
                  {c.renewsEvery4Weeks && <b> &middot; renews every 4 weeks</b>}
                  {t.freeTier.startsWith('Yes') && <> &middot; real free tier too</>}
                </span>
              </div>
            )
          })}
        </div>
        <p className="footnote">
          Worked out from the vendors&rsquo; published prices, read {formatDate(ratingsRead)}. Pricing pages are saved to the Internet
          Archive every month.
        </p>
        <div className="callout">
          <b>If you take one thing from this page:</b> never leave a 4-week resume trial running. Resume.io and Zety let you build for
          free, then only export plain text unless you pay. Resume.io&rsquo;s only citable review base is 1.5 out of 5 across 195 Product
          Hunt reviews, overwhelmingly about exactly this.
        </div>
      </section>

      <section className="wrap" id="videos">
        <h2>Watch before you pay</h2>
        <p className="lead">
          Every video is labeled by who made it. A company&rsquo;s own demo is the best-case tour. An independent creator shows what
          happens after you sign up. New videos are pulled every month.
        </p>
        <div className="vid-grid">
          {featured.map((v) => {
            const t = byId[v.tool]
            const tagClass = v.kind === 'vendor' ? 'vtag-vendor' : v.kind === 'comparison' ? 'vtag-compare' : 'vtag-third'
            return (
              <div className="vid-card" key={v.youtubeId}>
                <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                <div className="vid-meta">
                  <span className={`vtag ${tagClass}`}>{VIDEO_KIND_LABEL[v.kind]}</span>
                  <p className="vid-tool">{t.name}</p>
                  <p className="vid-title">{v.title}</p>
                  <p className="vid-foot">
                    {v.year && !v.title.includes(String(v.year)) ? `${v.year} · ` : ''}
                    {v.verified ? 'Channel confirmed' : 'Label from the title; channel check pending'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="wrap narrow" id="evidence">
        <h2>The evidence file</h2>
        <p className="lead">Every tool, every source, dated. Open any tool to see what its ranking rests on.</p>
        <div className="efiles">
          {all.map((t) => (
            <EvidenceFile key={t.id} t={t} />
          ))}
        </div>
        <ul className="refresh-log">
          {guide.refreshLog.map((entry) => (
            <li key={entry.date}>
              <b>{formatDate(entry.date)}:</b> {entry.what}. {entry.how}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap narrow" id="faq">
        <h2>Questions job seekers actually ask</h2>
        <div className="faq">
          <Faq q="Are free resume builders actually free?">
            Usually not. The common pattern is free to build, paid to download anything usable. In this field, only FlowCV gives you a
            watermark-free PDF for nothing, and Teal and Kickresume have free tiers that produce real documents. Everyone else charges at
            the exit.
          </Faq>
          <Faq q="Do ATS scores mean anything?">
            Partly. Keyword and formatting checks catch real problems, and Jobscan&rsquo;s per-job reports are useful. But a score is also a
            sales device: a middling free number with a paid path to a better one. Real applicant tracking systems don&rsquo;t grade you out
            of 100. Use the checks; don&rsquo;t chase the number.
          </Faq>
          <Faq q="What should a resume tool cost?">
            $0 covers most people: FlowCV plus Teal&rsquo;s free tier is a complete setup. If you&rsquo;re applying at volume, $79 to $96 a
            year buys the top paid tools. Anything billed every 4 weeks is priced to be forgotten, not to be fair.
          </Faq>
          <Faq q="Why don't you count every “best resume builder” list?">
            Because some of the most visible ones are published by companies that sell resume builders. When a list&rsquo;s owner also
            owns the tools at the top of it, that&rsquo;s an ad, not a review. We still show every list we checked and say why it does or
            doesn&rsquo;t count, so you can judge for yourself.
          </Faq>
          <Faq q="How often does this page change?">
            Every month. In the first week of each month we re-read every rating, re-check every list, pull new demo videos and save each
            vendor&rsquo;s pricing page to the Internet Archive, so a price change is on record. If a ranking moves, the evidence file says
            why.
          </Faq>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
