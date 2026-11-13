import Image from 'next/image'
import { Logo } from './logo'
import { formatCount, formatMonth, guide, rising, type RisingTool, type ToolEvidence } from '@/lib/evidence'

/**
 * On the rise. Two kinds of mention, never ranked:
 *  - Stephanie's up-and-coming pick: a scored tool she'd point a friend to.
 *  - Honorable mentions: tools too new for a score. Each card shows the
 *    evidence it already has and its path to a score (independent lists,
 *    25 citable reviews, a recruiter walkthrough), so "no score" reads as
 *    "not yet" instead of "not good".
 */

export const risingCss = `
  .rise-grid{display:grid;grid-template-columns:minmax(0,0.9fr) minmax(0,1.6fr);gap:28px;margin-top:40px;align-items:start;}
  .rise-grid.solo{grid-template-columns:1fr;}
  .pick-card{background:var(--indigo);color:#fff;border-radius:var(--r-lg);padding:30px;display:flex;flex-direction:column;gap:18px;}
  .pick-who{display:flex;align-items:center;gap:14px;}
  .pick-who img{width:64px;height:64px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.35);}
  .pick-who b{display:block;font-size:17px;font-weight:800;}
  .pick-who span{font-size:14px;color:#DCD3FF;}
  .pick-tool{display:flex;align-items:center;gap:14px;}
  .pick-tool b{font-size:30px;font-weight:900;letter-spacing:-0.02em;line-height:1.1;}
  .pick-quote{font-size:19px;line-height:1.55;color:#fff;}
  .pick-facts{display:flex;flex-wrap:wrap;gap:6px 22px;font-size:14.5px;color:#DCD3FF;border-top:1px solid rgba(255,255,255,0.2);padding-top:14px;}
  .pick-facts b{color:#fff;font-weight:800;}
  .pick-card .tl{color:#fff;}

  .hm-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;}
  .hm{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);padding:22px;display:flex;flex-direction:column;gap:12px;border-top:4px solid var(--indigo);}
  .hm.hiring{border-top-color:var(--coral);}
  .hm-id{display:flex;align-items:center;gap:12px;}
  .hm-id b{display:block;font-size:19px;font-weight:800;line-height:1.2;}
  .hm-id span{font-size:13.5px;color:var(--ink-3);}
  .hm-id b{color:var(--ink);}
  .hm p{font-size:15px;color:var(--ink-2);line-height:1.5;}
  .hm-ev{list-style:none;display:grid;gap:7px;}
  .hm-ev li{display:flex;align-items:center;gap:9px;font-size:14px;color:var(--ink);}
  .hm-ev a{text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .hm-ev a:hover{text-decoration-color:var(--ink);}
  .hm-ev em{font-style:normal;color:var(--ink-3);}
  .hm-path{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:auto;padding-top:12px;border-top:1px solid var(--rule-soft);}
  .hm-step{font-size:12.5px;line-height:1.35;color:var(--ink-3);}
  .hm-step i{display:block;height:5px;border-radius:3px;background:#ECE9F2;margin-bottom:7px;}
  .hm-step.done{color:var(--ink);font-weight:700;}
  .hm-step.done i{background:var(--ok);}
  .hm-score{font-size:13.5px;color:var(--ink-3);}
  .hm-score b{color:var(--ink);}
  .rise-note{font-size:15px;color:var(--ink-2);margin-top:22px;max-width:760px;}
  .rise-note a{color:var(--indigo-text);font-weight:700;text-decoration:underline;text-underline-offset:3px;}
  @media(max-width:960px){.rise-grid{grid-template-columns:1fr;}}
  @media(max-width:640px){.hm-list{grid-template-columns:1fr;}.pick-card{padding:24px;}}
`

function HonorableMention({ t }: { t: RisingTool }) {
  const lists = t.evidence.length
  const reviews = t.citableReviews
  return (
    <article className={`hm ${t.side}`}>
      <div className="hm-id">
        <Logo domain={t.domain} name={t.name} size={44} />
        <span>
          <b>{t.name}</b>
          <span>
            {t.category} &middot; for {t.side === 'seekers' ? 'job seekers' : 'hiring teams'}
          </span>
        </span>
      </div>
      <p>{t.what}</p>
      {lists > 0 && (
        <ul className="hm-ev" aria-label="Evidence so far">
          {t.evidence.map((e) => (
            <li key={e.url}>
              <Logo domain={e.domain} name={e.publication} size={20} round />
              <span>
                <a href={e.url} rel="nofollow noopener" target="_blank">
                  {e.publication}
                </a>
                : {e.note} <em>({e.date.length > 4 ? formatMonth(e.date) : e.date})</em>
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="hm-path" aria-label="Path to a score">
        <span className={`hm-step${lists ? ' done' : ''}`}>
          <i />
          {lists ? `On ${lists} independent list${lists === 1 ? '' : 's'}` : 'Lists checked next month'}
        </span>
        <span className={`hm-step${reviews !== null && reviews >= rising.minReviews ? ' done' : ''}`}>
          <i />
          {reviews === null ? `Reviews counted next month` : `${formatCount(reviews)} of ${rising.minReviews} reviews`}
        </span>
        <span className="hm-step">
          <i />
          Recruiter walkthrough
        </span>
      </div>
      <span className="hm-score">
        <b>Score: not yet.</b> Watching since {formatMonth(t.watchingSince)}.
      </span>
    </article>
  )
}

export function OnTheRise({
  side,
  pick,
  showNote = true,
}: {
  side?: 'seekers' | 'hiring'
  /** Stephanie's up-and-coming pick, when this page shows it. */
  pick?: { t: ToolEvidence; line: string; confirmed: boolean } | null
  showNote?: boolean
}) {
  const tools = rising.tools.filter((t) => !side || t.side === side)
  return (
    <>
      <div className={`rise-grid${pick ? '' : ' solo'}`}>
        {pick && (
          <aside className="pick-card" aria-label="Stephanie's up-and-coming pick">
            <div className="pick-who">
              <Image src="/stephanie.jpg" alt="Stephanie Murray" width={64} height={64} />
              <span>
                <b>Stephanie&rsquo;s up-and-coming pick</b>
                <span>20 years in talent</span>
              </span>
            </div>
            <div className="pick-tool">
              <Logo domain={pick.t.domain} name={pick.t.name} size={52} />
              <b>{pick.t.name}</b>
            </div>
            <p className="pick-quote">&ldquo;{pick.line}&rdquo;</p>
            <div className="pick-facts">
              {pick.t.userScore !== null && (
                <span>
                  <b>{pick.t.userScore.toFixed(1)}</b> from {formatCount(pick.t.citableReviews)} users
                </span>
              )}
              <span>
                Free tier: <b>{pick.t.freeTier.replace(/^Yes, /, '')}</b>
              </span>
            </div>
            <a className="tl tl-strong" href={`/reviews/${pick.t.id}`}>
              Is {pick.t.name} worth it? Read the review &rarr;
            </a>
          </aside>
        )}
        <div className="hm-list">
          {tools.map((t) => (
            <HonorableMention t={t} key={t.id} />
          ))}
        </div>
      </div>
      {showNote && (
        <p className="rise-note">
          No score until a tool has {rising.minReviews} citable reviews and a recruiter walkthrough. Next check:{' '}
          {formatMonth(guide.nextCheck)}. Building one? <a href="/for-vendors">Listing is free</a>.
        </p>
      )}
    </>
  )
}
