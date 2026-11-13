import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { guideCss } from './guide-css'
import { VideoEmbed } from '@/app/(rebrand)/_components/video-embed'
import {
  MIN_REVIEWS,
  STANCE_LABEL,
  STATUS_LABEL,
  VIDEO_KIND_LABEL,
  formatCount,
  formatDate,
  formatMonth,
  guide,
  hasUnverified,
  latestCheck,
  resumeLists,
  resumeTools,
  videos,
  type Appearance,
  type ToolEvidence,
} from '@/lib/evidence'

export const metadata: Metadata = {
  title: 'The Best Resume Tools of 2026: Builders and ATS Checkers, Ranked on Evidence',
  description:
    'Ten resume builders and ATS checkers ranked on citable public evidence, checked every month against what other reviewers rank, with demo videos and every renewal price printed plainly.',
}

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Open+Sans:wght@400;600;700&display=swap');"

const SEGMENT_LABEL = { checker: 'Checkers', builder: 'Builders' } as const
const SEGMENT_SINGULAR = { checker: 'checker', builder: 'builder' } as const

function favicon(domain: string, size = 16) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      width={size}
      height={size}
      alt=""
      style={{ verticalAlign: '-3px', borderRadius: 4, marginRight: 6 }}
    />
  )
}

function stars(n: number) {
  const full = Math.max(0, Math.min(5, Math.floor(n + 0.25)))
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function placement(a: Appearance) {
  if (a.position) return `#${a.position}`
  return a.list.format === 'picks' ? 'pick' : 'listed'
}

function rankLabel(t: ToolEvidence) {
  if (!t.enoughEvidence) return 'Not ranked: thin evidence'
  return `#${t.rank} ${SEGMENT_SINGULAR[t.segment]}`
}

function Stance({ t }: { t: ToolEvidence }) {
  return <span className={`stance stance-${t.call.stance}`}>{STANCE_LABEL[t.call.stance]}</span>
}

function RankTable({ tools }: { tools: ToolEvidence[] }) {
  return (
    <div className="tscroll">
      <table>
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
              <td>{t.rank}</td>
              <td>
                {favicon(t.domain)}
                <b>
                  <a href={`#evidence-${t.id}`} style={{ color: 'var(--ink)' }}>
                    {t.name}
                  </a>
                </b>
              </td>
              <td>{t.bestFor}</td>
              <td>{t.freeTier}</td>
              <td>{t.pricing}</td>
              <td>
                {t.overall !== null ? (
                  <>
                    <span className="tstars">{stars(t.overall)}</span> <span className="tscore">{t.overall.toFixed(2)}</span>
                  </>
                ) : (
                  <span style={{ color: 'var(--faint)' }}>n/e&dagger;</span>
                )}
              </td>
              <td>{t.userScore !== null ? t.userScore.toFixed(1) : <span style={{ color: 'var(--faint)' }}>n/e&dagger;</span>}</td>
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
    <div className="efile" id={`evidence-${t.id}`}>
      <div className="review-head">
        <div className="review-id">
          <span className="review-rank">
            {t.enoughEvidence ? `#${t.rank}` : 'Unranked'} &middot; {SEGMENT_LABEL[t.segment]}
          </span>
          <span className="favicon">{favicon(t.domain, 20)}</span>
          <span className="review-name">{t.name}</span>
        </div>
        <span className="etag etag-res">{t.walkthrough ? 'Vendor demoed' : 'Research based'}</span>
      </div>

      <div className="scores-row" style={{ marginTop: 12 }}>
        <span className="sc">
          Overall <b>{t.overall !== null ? t.overall.toFixed(2) : 'n/e'}</b>
        </span>
        <span className="sc">
          User <b>{t.userScore !== null ? t.userScore.toFixed(1) : 'n/e'}</b>
        </span>
        <span className="sc">
          Market <b>{t.marketScore.toFixed(2)}</b>
        </span>
        <span className="sc">
          Practitioner <b>{t.practitionerScore.toFixed(1)}</b> <span className="muted">draft</span>
        </span>
      </div>

      <div className="erows">
        <div className="erow">
          <h4>What users say</h4>
          {t.enoughEvidence ? (
            <p className="sum">
              User score {t.userScore?.toFixed(1)} from {formatCount(t.citableReviews)} citable reviews
            </p>
          ) : (
            <p className="sum">
              Not enough evidence: {formatCount(t.citableReviews)} citable review{t.citableReviews === 1 ? '' : 's'}. We need{' '}
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
          {t.counted.length === 0 && <p className="sum">Not named on any current list we track.</p>}
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
          <h4>Our call</h4>
          <Stance t={t} />
          <p className="call-line">{t.call.line}</p>
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
      <p style={{ fontSize: 12.5, color: 'var(--gray-lt)', marginTop: 12 }}>Pricing: {t.pricingLine}</p>
      <a href={`/go/${t.id}`} className="visit" style={{ maxWidth: 280, marginTop: 14 }}>
        Visit {t.name} &#8599;
      </a>
    </div>
  )
}

function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details
      style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', marginTop: 14 }}
    >
      <summary style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{q}</summary>
      <p style={{ fontSize: 13.5, color: 'var(--gray)', lineHeight: 1.7, marginTop: 10 }}>{children}</p>
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS + guideCss }} />

      <div className="navbar">
        <div className="wrap">
          <nav>
            <a href="/" className="logo">
              <span className="logo-mark">H</span>Hiring.Productions
            </a>
            <span className="nav-links">
              <a href="/for-hiring-teams">
                For Hiring Teams <span className="chev">&#9660;</span>
              </a>
              <a href="/for-job-seekers">
                For Job Seekers <span className="chev">&#9660;</span>
              </a>
              <a href="/how-we-review">How We Review</a>
              <a href="/for-vendors">
                For Vendors <span className="chev">&#9660;</span>
              </a>
              <a href="/consulting">
                Get a Recommendation<span className="free-chip">FREE</span>
              </a>
            </span>
          </nav>
        </div>
      </div>

      <div className="page-hero" style={{ padding: '40px 0 44px' }}>
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> &rsaquo; <a href="/for-job-seekers">For job seekers</a> &rsaquo; Resume tools
          </p>
          <h1>The Best Resume Tools of 2026: Builders and ATS Checkers, Ranked on Evidence</h1>
          <p className="byline">
            Lists and videos checked {formatDate(checked)} <span className="dot">&middot;</span> Ratings read {formatDate(ratingsRead)}{' '}
            <span className="dot">&middot;</span> Next full check {formatMonth(guide.nextCheck)}{' '}
            <span className="dot">&middot;</span> {all.length} tools <span className="dot">&middot;</span>{' '}
            <a href="/how-we-review" style={{ color: '#D6CCF5' }}>
              How we review
            </a>
          </p>
          <div className="disclosure">
            Some links below are affiliate links: if you buy through them, the vendor pays us a commission. Placement, rankings, and
            scores cannot be bought, which is why the category&rsquo;s biggest advertiser ranks where the evidence puts it.{' '}
            <a href="/advertiser-disclosure" style={{ color: '#fff' }}>
              Full disclosure
            </a>
          </div>
        </div>
      </div>

      {hasUnverified() && (
        <div className="demo-note">
          <div className="wrap">
            <b>Demo build.</b> Other reviewers&rsquo; lists and video labels on this page came from search listings on{' '}
            {formatDate(checked)}. Each one is confirmed on the live page at the {formatMonth(guide.nextCheck)} check.
          </div>
        </div>
      )}

      <section className="wrap narrow" style={{ padding: '22px 24px 0' }}>
        <div className="author-strip">
          <span className="author-avatar">SM</span>
          <p>
            <b style={{ color: 'var(--ink)', fontFamily: "'Poppins',sans-serif" }}>
              {guide.callsReviewed ? 'Reviewed by Stephanie Murray' : 'Scored by Stephanie Murray'}
            </b>
            <br />
            {guide.callsReviewed ? '18 years of in-house talent acquisition' : 'Practitioner scores and calls in final review'} &middot; 2025
            Transform Award, Talent Strategy of the Year &middot;{' '}
            <a href="/how-we-review" style={{ color: 'var(--purple)', fontWeight: 600 }}>
              How we score
            </a>
          </p>
        </div>
      </section>

      <section className="wrap narrow">
        <h2>The short version</h2>
        <p className="lead">
          Resume tools are where job seekers get burned: free builders that charge for the download, $2 trials that quietly renew every
          4 weeks, and scores designed to sell the fix. So this guide ranks on citable evidence, checks itself against every other list
          you are likely to read, and prints every renewal price. Where a tool has fewer than {MIN_REVIEWS} citable public reviews, we
          say &ldquo;not enough evidence&rdquo; instead of inventing stars.
        </p>
        <div className="picks">
          {guide.picks.map((p) => {
            const t = byId[p.tool]
            return (
              <div className="pick winner" key={p.tool}>
                <span className="pick-flag">{p.label}</span>
                <div className="pick-id">
                  <span className="favicon">{favicon(t.domain, 22)}</span>
                  <span className="pick-name">{t.name}</span>
                </div>
                <p className="pick-best">
                  {p.line}
                  {t.headlineRating ? ` ${t.headlineRating}.` : ''}
                </p>
                <a href={`/go/${t.id}`} className="visit">
                  Visit {t.name} &#8599;
                </a>
              </div>
            )
          })}
        </div>
      </section>

      <section className="wrap" id="agree">
        <h2>Do the other reviewers agree?</h2>
        <p className="lead">
          We track {lists.length} other &ldquo;best resume tool&rdquo; lists and re-check them every month. Only {counting.length} count:
          current, and not published by a company that sells what it ranks. Here is where they land next to us.
        </p>
        <div className="tscroll">
          <table className="agree-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Our rank</th>
                <th>Users</th>
                <th>Named on lists that count</th>
                <th>Our call</th>
              </tr>
            </thead>
            <tbody>
              {all.map((t) => (
                <tr key={t.id}>
                  <td>
                    {favicon(t.domain)}
                    <b>
                      <a href={`#evidence-${t.id}`} style={{ color: 'var(--ink)' }}>
                        {t.name}
                      </a>
                    </b>
                  </td>
                  <td>{rankLabel(t)}</td>
                  <td>
                    {t.userScore !== null ? (
                      <>
                        <b>{t.userScore.toFixed(1)}</b> <span className="muted">({formatCount(t.citableReviews)})</span>
                      </>
                    ) : (
                      <span className="muted">Too few reviews</span>
                    )}
                  </td>
                  <td>
                    {t.counted.length === 0 && <span className="muted">None</span>}
                    {t.counted.map((a) => (
                      <span className="lchip" key={a.list.id}>
                        <a href={a.list.url} target="_blank" rel="noopener noreferrer">
                          {a.list.publication} {placement(a)}
                        </a>
                      </span>
                    ))}
                    {t.notCounted.length > 0 && (
                      <span className="muted">
                        {' '}
                        +{t.notCounted.length} not counted
                      </span>
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

        {breaks.length > 0 && (
          <>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 19, margin: '34px 0 0' }}>
              Where we break from the pack
            </h3>
            <div className="breaks-grid">
              {breaks.map((t) => (
                <div className="break-card" key={t.id}>
                  <p className="bc-name">
                    {favicon(t.domain, 18)}
                    {t.name}
                  </p>
                  <p>{t.call.line}</p>
                  <a href={`#evidence-${t.id}`}>See the evidence &rarr;</a>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="owner-note">
          <b>Who owns the list you&rsquo;re reading?</b> BOLD owns MyPerfectResume, LiveCareer and Zety. It also owns FlexJobs and
          Monster, and both of their &ldquo;best resume builder&rdquo; lists put BOLD brands on top. We show those lists. We don&rsquo;t
          count them.
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
                      <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--purple)' }}>
                        {l.title}
                      </a>
                    </td>
                    <td>{l.edition}</td>
                    <td>
                      <span className={`lstatus${l.status === 'counts' ? ' lstatus-counts' : ''}`}>{STATUS_LABEL[l.status]}</span>
                    </td>
                    <td>{l.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            A list counts when it shows an update or current-year edition within the last 12 months and its publisher does not own what it
            ranks. Every list is re-checked monthly and saved to the Internet Archive.
          </p>
        </details>
      </section>

      <section className="wrap">
        <h2>Ranked on evidence</h2>
        <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 19, margin: '30px 0 6px' }}>ATS resume checkers</h3>
        <p style={{ fontSize: 13.5, color: 'var(--gray)', maxWidth: 760, lineHeight: 1.65 }}>
          Tools that read your resume the way applicant tracking software does, before a recruiter ever sees it.
        </p>
        <RankTable tools={checkers} />
        <h3 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 19, margin: '34px 0 6px' }}>Resume builders</h3>
        <p style={{ fontSize: 13.5, color: 'var(--gray)', maxWidth: 760, lineHeight: 1.65 }}>
          Where you actually write the thing. The &ldquo;Actually free?&rdquo; column is the one to read first.
        </p>
        <RankTable tools={builders} />
        <p style={{ textAlign: 'center', color: 'var(--gray-lt)', fontSize: 12, lineHeight: 1.6, marginTop: 16 }}>
          Ratings read {formatDate(ratingsRead)} from dated public sources: {ratingPlatforms.join(', ')}. The G2 family (G2, Capterra,
          GetApp, Software Advice) shares one review pool and counts once. Methodology on{' '}
          <a href="/how-we-review" style={{ color: 'var(--purple)', fontWeight: 600 }}>
            How We Review
          </a>
          . *Practitioner and Overall scores are in final review. &dagger;n/e = fewer than {MIN_REVIEWS} citable public reviews exist; we
          do not invent stars.
        </p>
        <div className="callout">
          <b>Billing patterns, plainly.</b> Resume.io and Zety let you build free, then only export plain text unless you pay: a $2.95 or
          $1.95 trial that renews at $29.95 or $25.95 <b>every 4 weeks</b>, which is 13 charges a year, not 12. Resume.io&rsquo;s only
          citable review base is 1.5 out of 5 across 195 Product Hunt reviews, overwhelmingly about exactly this. Enhancv has no free plan
          at all: the trial watermarks your download. If you take one thing from this page: never leave a 4-week resume trial running.
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
        <p className="lead">
          Every tool, every source, dated. This is what each ranking above rests on, and what changes when the evidence does.
        </p>
        {all.map((t) => (
          <EvidenceFile key={t.id} t={t} />
        ))}
        <ul className="refresh-log">
          {guide.refreshLog.map((entry) => (
            <li key={entry.date}>
              <b>{formatDate(entry.date)}:</b> {entry.what}. {entry.how}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap narrow" style={{ paddingBottom: 64 }}>
        <h2>Questions job seekers actually ask</h2>
        <Faq q="Are free resume builders actually free?">
          Usually not. The common pattern is free to build, paid to download anything usable. In this field, only FlowCV gives you a
          watermark-free PDF for nothing, and Teal and Kickresume have free tiers that produce real documents. Everyone else charges at the
          exit.
        </Faq>
        <Faq q="Do ATS scores mean anything?">
          Partly. Keyword and formatting checks catch real problems, and Jobscan&rsquo;s per-job reports are useful. But a score is also a
          sales device: a middling free number with a paid path to a better one. Real applicant tracking systems do not grade you out of
          100. Use the checks; do not chase the number.
        </Faq>
        <Faq q="What should a resume tool cost?">
          $0 covers most people: FlowCV plus Teal&rsquo;s free tier is a complete setup. If you are applying at volume, $79 to $96 a year
          buys the top paid tools. Anything billed every 4 weeks is priced to be forgotten, not to be fair.
        </Faq>
        <Faq q="Why don't you count every “best resume builder” list?">
          Because some of the most visible ones are published by companies that sell resume builders. When a list&rsquo;s owner also
          owns the tools at the top of it, that is an ad, not a review. We still show every list we checked and say why it does or
          doesn&rsquo;t count, so you can judge for yourself.
        </Faq>
        <Faq q="How often does this page change?">
          Every month. In the first week of each month we re-read every rating, re-check every list, pull new demo videos and save each
          vendor&rsquo;s pricing page to the Internet Archive, so a price change is on record. If a ranking moves, the evidence file says
          why.
        </Faq>
      </section>

      <footer>
        &copy; 2026 Hiring.Productions &middot; How We Review &middot; Advertiser Disclosure &middot; Privacy &middot; Terms
      </footer>
    </>
  )
}
