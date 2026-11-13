import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import { HashOpener } from '@/app/(rebrand)/_components/hash-opener'
import { guidePageCss } from './guide-page-css'
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
    'Ten resume builders and ATS checkers ranked on citable public evidence, checked every month against the other lists you are likely to read, with labeled demo videos and what a year of each tool costs.',
}

const SEGMENT_LABEL = { checker: 'Checker', builder: 'Builder' } as const
const SEGMENT_SINGULAR = { checker: 'checker', builder: 'builder' } as const

const ON_THIS_PAGE = [
  ['short', 'Picks'],
  ['agree', 'Do reviewers agree?'],
  ['rankings', 'Rankings'],
  ['cost', 'What a year costs'],
  ['videos', 'Videos'],
  ['evidence', 'Evidence file'],
  ['faq', 'Questions'],
] as const

function Logo({ domain, size = 16 }: { domain: string; size?: number }) {
  return (
    <img className="logo-img" src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} width={size} height={size} alt="" />
  )
}

function money(n: number) {
  return n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`
}

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
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

function Bar({ label, value, places = 1 }: { label: string; value: number | null; places?: number }) {
  return (
    <div className="sbar">
      <span>{label}</span>
      <span className="sbar-track" aria-hidden="true">
        {value !== null && <i style={{ width: `${(value / 5) * 100}%` }} />}
      </span>
      <b>{value !== null ? value.toFixed(places) : 'n/e'}</b>
    </div>
  )
}

function RankTable({ tools }: { tools: ToolEvidence[] }) {
  return (
    <div className="tscroll">
      <table className="ledger">
        <thead>
          <tr>
            <th className="num">#</th>
            <th>Tool</th>
            <th>Best for</th>
            <th>Actually free?</th>
            <th>Price</th>
            <th className="num">Overall*</th>
            <th className="num">User</th>
            <th className="num">Market</th>
            <th className="num">Practitioner*</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t) => (
            <tr key={t.id}>
              <td className="num">{t.enoughEvidence ? t.rank : '–'}</td>
              <td className="tool-cell">
                <Logo domain={t.domain} />
                <a href={`#evidence-${t.id}`}>{t.name}</a>
              </td>
              <td>{t.bestFor}</td>
              <td>{t.freeTier}</td>
              <td>{t.pricing}</td>
              <td className="num tscore">{t.overall !== null ? t.overall.toFixed(2) : <span className="faint">n/e&dagger;</span>}</td>
              <td className="num">{t.userScore !== null ? t.userScore.toFixed(1) : <span className="faint">n/e&dagger;</span>}</td>
              <td className="num">{t.marketScore.toFixed(2)}</td>
              <td className="num">{t.practitionerScore.toFixed(1)}</td>
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
          {t.enoughEvidence ? `#${t.rank}` : '–'} {SEGMENT_LABEL[t.segment]}
        </span>
        <span className="ef-name">
          <Logo domain={t.domain} size={18} />
          {t.name}
        </span>
        <span className="ef-score">{t.overall !== null ? t.overall.toFixed(2) : 'n/e'}</span>
        <Stance t={t} />
        <span className="ef-toggle" aria-hidden="true" />
      </summary>

      <div className="ef-body">
        <p className="ef-call">{t.call.line}</p>
        <div className="ef-grid">
          <div className="sbars">
            <Bar label="User" value={t.userScore} />
            <Bar label="Market" value={t.marketScore} places={2} />
            <Bar label="Practitioner*" value={t.practitionerScore} />
          </div>
          <dl className="facts">
            <div>
              <dt>What users say</dt>
              <dd>
                {t.enoughEvidence ? (
                  <p>
                    {t.userScore?.toFixed(1)} from {formatCount(t.citableReviews)} citable reviews.
                  </p>
                ) : (
                  <p>
                    Not enough evidence: {formatCount(t.citableReviews)} citable review{t.citableReviews === 1 ? '' : 's'}, and we need{' '}
                    {MIN_REVIEWS}.
                  </p>
                )}
                <ul>
                  {t.ratings.length === 0 && <li>No citable review listings found.</li>}
                  {t.ratings.map((r) => (
                    <li key={r.platform} className={r.droppedBecause ? 'faint' : undefined}>
                      {r.rating} from {formatCount(r.reviews)} on {r.platform}
                      {r.sourceStatus === 'permission-pending' && !r.droppedBecause && <span className="flag"> (permission pending)</span>}
                      {r.droppedBecause && <> (not counted: {r.droppedBecause.toLowerCase()})</>}
                    </li>
                  ))}
                </ul>
                {ratingsDate && <p className="mono faint">Read {shortDate(ratingsDate)}</p>}
              </dd>
            </div>
            <div>
              <dt>What other reviewers rank</dt>
              <dd>
                {t.counted.length === 0 && (
                  <p>
                    {absenceUnconfirmed(t)
                      ? 'Not on the current lists we’ve checked so far. Full lists are confirmed at the next check.'
                      : 'Not named on any current list we track.'}
                  </p>
                )}
                <ul>
                  {t.counted.map((a) => (
                    <li key={a.list.id}>
                      <a className="tl" href={a.list.url} target="_blank" rel="noopener noreferrer">
                        {a.list.publication}
                      </a>{' '}
                      {placement(a)} ({a.list.edition})
                    </li>
                  ))}
                  {t.notCounted.map((a) => (
                    <li key={a.list.id} className="faint">
                      {a.list.publication} {placement(a)} (not counted: {STATUS_LABEL[a.list.status].toLowerCase()})
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>Demos</dt>
              <dd>
                <p>{t.walkthrough ? `Walked through with the vendor on ${formatDate(t.walkthrough.date)}.` : 'Our walkthrough is not booked yet.'}</p>
                <ul>
                  {t.videos.map((v) => (
                    <li key={v.youtubeId}>
                      <a className="tl" href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer">
                        {v.title}
                      </a>{' '}
                      ({VIDEO_KIND_LABEL[v.kind].toLowerCase()}
                      {v.year && !v.title.includes(String(v.year)) ? `, ${v.year}` : ''})
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>What it costs</dt>
              <dd>
                <p>{t.pricingLine}</p>
                {t.yearCost && (
                  <p className="faint">
                    A paid year: {t.yearCost.approx ? 'about ' : ''}
                    {money(t.yearCost.amount)} ({t.yearCost.how.charAt(0).toLowerCase() + t.yearCost.how.slice(1)})
                  </p>
                )}
              </dd>
            </div>
          </dl>
        </div>

        {t.verdict && (
          <dl className="verdict">
            <div>
              <dt>Best if</dt>
              <dd>{t.verdict.bestIf}</dd>
            </div>
            <div>
              <dt>Skip it if</dt>
              <dd>{t.verdict.skipIf}</dd>
            </div>
            <div>
              <dt>What we like</dt>
              <dd>{t.verdict.like}</dd>
            </div>
            <div>
              <dt>Watch for</dt>
              <dd>{t.verdict.watch}</dd>
            </div>
          </dl>
        )}
        <a href={`/go/${t.id}`} className="tl tl-strong ef-visit">
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + guidePageCss }} />
      <HashOpener prefix="evidence-" />
      <SiteNav active="seekers" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Resume tools
          </p>
          <h1>The best resume tools of 2026</h1>
          <p className="dek">
            {all.length} builders and ATS checkers, ranked on dated evidence and checked every month against the {lists.length} other lists
            you&rsquo;re likely to read.
          </p>
          <p className="dateline">
            Lists and videos checked {shortDate(checked)} &middot; ratings read {shortDate(ratingsRead)} &middot; next check{' '}
            {formatMonth(guide.nextCheck)} &middot; <a href="/how-we-review">how we review</a>
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
            <b>Demo build.</b> Other reviewers&rsquo; lists and video labels on this page came from search listings on {formatDate(checked)}.
            Each one is confirmed on the live page at the {formatMonth(guide.nextCheck)} check.
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

      <section className="wrap sec" id="short">
        <h2>Our picks</h2>
        <p className="lead">
          Resume tools are where job seekers get burned: builders that are free until you try to download, and $2 trials that quietly renew
          every 4 weeks. So this guide ranks on citable evidence and prints every renewal price.
        </p>
        <div className="picks">
          {guide.picks.map((p) => {
            const t = byId[p.tool]
            return (
              <div className="pick" key={p.tool}>
                <p className="pick-label">{p.label}</p>
                <h3 className="pick-name">
                  <Logo domain={t.domain} size={22} />
                  {t.name}
                </h3>
                <p className="pick-line">
                  {p.line}
                  {t.headlineRating ? ` ${t.headlineRating}.` : ''}
                </p>
                <p className="pick-facts">
                  {t.overall?.toFixed(2)} overall &middot; #{t.rank} {SEGMENT_SINGULAR[t.segment]}
                  {t.yearCost ? ` · ${money(t.yearCost.amount)} a paid year` : ''}
                </p>
                <a href={`/go/${t.id}`} className="tl tl-strong">
                  Visit {t.name} &#8599;
                </a>
              </div>
            )
          })}
          <div className="pick pick-rising">
            <p className="pick-label">{risingPick.label}</p>
            <h3 className="pick-name">
              <Logo domain={rising.domain} size={22} />
              {rising.name}
            </h3>
            <p className="pick-quote">&ldquo;{risingPick.line}&rdquo;</p>
            <p className="pick-sig">Stephanie Murray, 2025 Transform Award, Talent Strategy of the Year</p>
            <p className="pick-facts">
              {rising.userScore?.toFixed(1)} from {formatCount(rising.citableReviews)} users &middot; #{rising.rank}{' '}
              {SEGMENT_SINGULAR[rising.segment]} &middot; $0 for a clean PDF
            </p>
            <a href={`/go/${rising.id}`} className="tl tl-strong">
              Visit {rising.name} &#8599;
            </a>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="agree">
        <h2>Do the other reviewers agree?</h2>
        <p className="lead">
          We track {lists.length} other &ldquo;best resume tool&rdquo; lists and re-check them every month. {counting.length} of them count:
          they&rsquo;re current, and their publishers don&rsquo;t sell what they rank. Here is where those {counting.length} land next to us.
        </p>
        <div className="tscroll">
          <table className="ledger agree-grid">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Our rank</th>
                <th className="num">Users</th>
                {counting.map((l) => (
                  <th key={l.id} className="col-list">
                    {l.publication}
                    <span className="mono">{l.edition}</span>
                  </th>
                ))}
                <th className="col-list">
                  Not counted
                  <span className="mono">{notCounting} lists</span>
                </th>
                <th>Our call</th>
              </tr>
            </thead>
            <tbody>
              {all.map((t) => (
                <tr key={t.id}>
                  <td className="tool-cell">
                    <Logo domain={t.domain} />
                    <a href={`#evidence-${t.id}`}>{t.name}</a>
                  </td>
                  <td className="nowrap">{rankLabel(t)}</td>
                  <td className="num nowrap">
                    {t.userScore !== null ? (
                      <>
                        <b>{t.userScore.toFixed(1)}</b> <span className="faint">({formatCount(t.citableReviews)})</span>
                      </>
                    ) : (
                      <span className="faint">too few</span>
                    )}
                  </td>
                  {counting.map((l) => {
                    const c = gridCell(t, l)
                    return (
                      <td key={l.id} className="cell">
                        {c.state === 'named' && <b>{c.label}</b>}
                        {c.state === 'unknown' && (
                          <span className="faint" title="Full list not confirmed yet">
                            ?
                          </span>
                        )}
                        {c.state === 'not-named' && <span className="faint">no</span>}
                        {c.state === 'not-covered' && <span className="faint">&middot;</span>}
                      </td>
                    )
                  })}
                  <td className="cell">
                    {t.notCounted.length > 0 ? (
                      <span title={t.notCounted.map((a) => a.list.publication).join(', ')}>{t.notCounted.length}</span>
                    ) : (
                      <span className="faint">&middot;</span>
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
        <p className="footnote">
          A position (#1) or &ldquo;Pick&rdquo; means the list names the tool. A question mark means we haven&rsquo;t confirmed the full list
          yet. A dot means the list doesn&rsquo;t cover that kind of tool.
        </p>

        {breaks.length > 0 && (
          <>
            <h3 className="h3">Where we break from the pack</h3>
            <div className="rows">
              {breaks.map((t) => (
                <div className="row" key={t.id}>
                  <span className="row-title">
                    <Logo domain={t.domain} size={18} /> {t.name}
                  </span>
                  <div>
                    <p>{t.call.line}</p>
                    <a className="tl" href={`#evidence-${t.id}`}>
                      Open the evidence file
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="owner">
          <h3 className="h3">Who owns the list you&rsquo;re reading?</h3>
          <p className="lead">
            BOLD owns MyPerfectResume, LiveCareer and Zety. It also owns FlexJobs and Monster, and both of their &ldquo;best resume
            builder&rdquo; lists put BOLD brands on top. We show those lists. We don&rsquo;t count them.
          </p>
        </div>

        <details className="lists-details">
          <summary>
            All {lists.length} lists we checked, and why {notCounting} don&rsquo;t count
          </summary>
          <div className="tscroll">
            <table className="ledger">
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
                      <a className="tl" href={l.url} target="_blank" rel="noopener noreferrer">
                        {l.title}
                      </a>
                    </td>
                    <td className="mono">{l.edition}</td>
                    <td className="nowrap">
                      {l.status === 'counts' ? <b>{STATUS_LABEL[l.status]}</b> : <span className="faint">{STATUS_LABEL[l.status]}</span>}
                    </td>
                    <td>{l.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote">
            A list counts when it shows an update or current-year edition within the last 12 months and its publisher doesn&rsquo;t own what
            it ranks. Every list is re-checked monthly and saved to the Internet Archive.
          </p>
        </details>
      </section>

      <section className="wrap sec" id="rankings">
        <h2>Ranked on evidence</h2>
        <p className="lead">
          Where a tool has fewer than {MIN_REVIEWS} citable public reviews, we say so instead of inventing stars.
        </p>
        <h3 className="h3">ATS resume checkers</h3>
        <p className="sublead">Tools that read your resume the way applicant tracking software does, before a recruiter ever sees it.</p>
        <RankTable tools={checkers} />
        <h3 className="h3">Resume builders</h3>
        <p className="sublead">Where you write the thing. Read the &ldquo;Actually free?&rdquo; column first.</p>
        <RankTable tools={builders} />
        <p className="footnote">
          Ratings read {formatDate(ratingsRead)} from dated public sources: {ratingPlatforms.join(', ')}. The G2 family (G2, Capterra,
          GetApp, Software Advice) shares one review pool and counts once. *Practitioner and Overall scores are in final review. &dagger;n/e:
          fewer than {MIN_REVIEWS} citable public reviews. Methodology on <a href="/how-we-review">How We Review</a>.
        </p>
      </section>

      <section className="wrap sec" id="cost">
        <h2>What a year really costs</h2>
        <p className="lead">
          The sticker price is the trial. This is the cheapest published way to pay for 12 months of each paid plan. Plans billed every 4
          weeks charge you 13 times a year.
        </p>
        <div className="cost-chart" role="list">
          {costRows.map((t) => {
            const c = t.yearCost!
            return (
              <div className={`cost-row${c.renewsEvery4Weeks ? ' cost-trap' : ''}`} role="listitem" key={t.id}>
                <span className="cost-name">
                  <Logo domain={t.domain} />
                  {t.name}
                </span>
                <span className="cost-track" aria-hidden="true">
                  <i style={{ width: `${Math.max(3, (c.amount / maxCost) * 100)}%` }} />
                </span>
                <span className="cost-amt">
                  {c.approx ? 'about ' : ''}
                  {money(c.amount)}
                </span>
                <span className="cost-how">
                  {c.how}
                  {c.renewsEvery4Weeks && <b>. Renews every 4 weeks</b>}
                  {t.freeTier.startsWith('Yes') && <>. Has a real free tier</>}
                </span>
              </div>
            )
          })}
        </div>
        <p className="footnote">
          Worked out from the vendors&rsquo; published prices, read {formatDate(ratingsRead)}. Pricing pages are saved to the Internet Archive
          every month.
        </p>
        <p className="boxnote">
          <b>If you take one thing from this page:</b> never leave a 4-week resume trial running. Resume.io and Zety let you build for free,
          then only export plain text unless you pay. Resume.io&rsquo;s only citable review base is 1.5 out of 5 across 195 Product Hunt
          reviews, nearly all about exactly this.
        </p>
      </section>

      <section className="wrap sec" id="videos">
        <h2>Watch before you pay</h2>
        <p className="lead">
          Every video is labeled by who made it. A company&rsquo;s own demo is the best-case tour. An independent creator shows what happens
          after you sign up. New videos are pulled every month.
        </p>
        <div className="vid-grid">
          {featured.map((v) => {
            const t = byId[v.tool]
            return (
              <figure className="vid" key={v.youtubeId}>
                <VideoEmbed youtubeId={v.youtubeId} title={v.title} />
                <figcaption>
                  <b>{t.name}</b>
                  <span className="vid-kind">{VIDEO_KIND_LABEL[v.kind]}</span>
                  <span className="vid-title">{v.title}</span>
                  <span className="mono faint">
                    {v.year && !v.title.includes(String(v.year)) ? `${v.year} · ` : ''}
                    {v.verified ? 'channel confirmed' : 'label from the title, channel check pending'}
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </section>

      <section className="wrap sec" id="evidence">
        <h2>The evidence file</h2>
        <p className="lead">Each tool&rsquo;s sources, with the date we read them. Open a tool to see what its ranking rests on.</p>
        <div className="efiles">
          {all.map((t) => (
            <EvidenceFile key={t.id} t={t} />
          ))}
        </div>
        <ul className="refresh-log">
          {guide.refreshLog.map((entry) => (
            <li key={entry.date}>
              <span className="mono">{shortDate(entry.date)}</span> {entry.what}. {entry.how}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap narrow sec" id="faq">
        <h2>Questions job seekers ask</h2>
        <div className="faq">
          <Faq q="Are free resume builders actually free?">
            Usually not. The common pattern is free to build and paid to download anything usable. Here, only FlowCV gives you a
            watermark-free PDF for nothing, and Teal and Kickresume have free tiers that produce real documents. Everyone else charges at
            the exit.
          </Faq>
          <Faq q="Do ATS scores mean anything?">
            Partly. Keyword and formatting checks catch real problems, and Jobscan&rsquo;s per-job reports are useful. A score is also a
            sales device: a middling free number with a paid path to a better one. Real applicant tracking systems don&rsquo;t grade you out
            of 100. Use the checks and ignore the number.
          </Faq>
          <Faq q="What should a resume tool cost?">
            $0 covers most people: FlowCV plus Teal&rsquo;s free tier is a complete setup. If you&rsquo;re applying at volume, $79 to $96 a
            year buys the top paid tools. Anything billed every 4 weeks is priced on the hope that you forget it.
          </Faq>
          <Faq q="Why don't you count every “best resume builder” list?">
            Some of the most visible ones are published by companies that sell resume builders. When a list&rsquo;s owner also owns the tools
            at the top of it, that list is advertising. We still show every list we checked and say why it does or doesn&rsquo;t count.
          </Faq>
          <Faq q="How often does this page change?">
            Every month. In the first week of each month we re-read every rating, re-check every list, pull new demo videos and save each
            vendor&rsquo;s pricing page to the Internet Archive. If a ranking moves, the evidence file says why.
          </Faq>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
