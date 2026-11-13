import Image from 'next/image'
import { Logo } from './logo'
import { formatCount, formatMonth, guide, latestCheck, rising, type RisingTool, type ToolEvidence } from '@/lib/evidence'

/**
 * Waiting in the wings: tools too new for a score.
 *
 * Built as an extension of the scoreboard, not as cards: same white board,
 * same ruled rows, with the score column replaced by who the tool is for.
 * Each row shows only evidence it has. Beside it, Stephanie's pick is set
 * like a columnist's note (byline, a sentence, a link), never as a
 * testimonial card.
 */

export const risingCss = `
  .wings{display:grid;grid-template-columns:minmax(0,0.8fr) minmax(0,1.2fr);gap:64px;align-items:start;margin-top:40px;}
  .wings.solo{grid-template-columns:minmax(0,1fr);max-width:960px;}
  .note-by{display:flex;align-items:center;gap:12px;font-size:15px;color:var(--ink-3);line-height:1.35;}
  .note-by img{width:48px;height:48px;border-radius:50%;object-fit:cover;}
  .note-by b{display:block;color:var(--ink);font-weight:800;}
  .note-h{display:flex;align-items:center;gap:14px;font-size:clamp(26px,2.8vw,34px);font-weight:900;letter-spacing:-0.02em;line-height:1.15;margin:28px 0 14px;}
  .note-h a:hover{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:2px;}
  .note p{font-size:19px;line-height:1.6;color:var(--ink-2);max-width:520px;}
  .note .note-facts{font-family:var(--mono);font-size:13px;color:var(--ink-3);margin-top:16px;}
  .note .tl{display:inline-block;margin-top:14px;}

  .wing-row{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:16px;align-items:start;padding:16px 22px;border-bottom:1px solid var(--rule-soft);}
  .wing-row:last-of-type{border-bottom:0;}
  .wing-name{font-size:17px;font-weight:800;line-height:1.3;}
  .wing-name span{font-weight:400;color:var(--ink-3);font-size:14.5px;}
  .wing-what{display:block;font-size:14.5px;color:var(--ink-2);margin-top:2px;}
  .wing-ev{display:flex;align-items:center;flex-wrap:wrap;gap:4px 8px;font-size:13.5px;color:var(--ink-3);margin-top:6px;}
  .wing-e{display:inline-flex;align-items:center;gap:7px;}
  .wing-ev a{color:var(--ink-2);text-decoration:underline;text-decoration-color:var(--rule-2);text-underline-offset:3px;}
  .wing-ev a:hover{text-decoration-color:var(--ink);}
  .wing-side{font-size:13.5px;font-weight:700;color:var(--ink-2);white-space:nowrap;padding-top:3px;}
  @media(max-width:960px){.wings{grid-template-columns:1fr;gap:48px;}}
  @media(max-width:640px){.wing-row{grid-template-columns:40px minmax(0,1fr);padding:14px 16px;}.wing-side{grid-column:2;padding-top:0;}}
`

function shortDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

function WingRow({ t }: { t: RisingTool }) {
  return (
    <div className="wing-row">
      <Logo domain={t.domain} name={t.name} size={44} />
      <div>
        <div className="wing-name">
          {t.name} <span>{t.category.toLowerCase()}</span>
        </div>
        <span className="wing-what">{t.what}</span>
        <span className="wing-ev">
          {t.evidence.length > 0 ? (
            t.evidence.map((e, i) => (
              <span key={e.url} className="wing-e">
                <Logo domain={e.domain} name={e.publication} size={18} round />
                <span>
                  <a href={e.url} rel="nofollow noopener" target="_blank">
                    {e.publication}
                  </a>
                  : {e.note.charAt(0).toLowerCase() + e.note.slice(1)} ({e.date.length > 4 ? formatMonth(e.date) : e.date})
                  {i < t.evidence.length - 1 ? ';' : ''}
                </span>
              </span>
            ))
          ) : (
            <>Lists and reviews get their first check in {formatMonth(guide.nextCheck)}.</>
          )}
          {t.citableReviews !== null && (
            <span>
              {formatCount(t.citableReviews)} of {rising.minReviews} reviews
            </span>
          )}
        </span>
      </div>
      <span className="wing-side">
        <span className={t.side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
        {t.side === 'seekers' ? 'Job seekers' : 'Hiring teams'}
      </span>
    </div>
  )
}

export function OnTheRise({
  side,
  pick,
}: {
  side?: 'seekers' | 'hiring'
  /** Stephanie's up-and-coming pick, when this page shows it. */
  pick?: { t: ToolEvidence; line: string; confirmed: boolean } | null
}) {
  const tools = rising.tools.filter((t) => !side || t.side === side)
  const body = pick?.line.replace(/^The one I'd tell a friend about first\.\s*/, '') ?? ''
  return (
    <div className={`wings${pick ? '' : ' solo'}`}>
      {pick && (
        <div className="note">
          <div className="note-by">
            <Image src="/stephanie.jpg" alt="" width={48} height={48} />
            <span>
              <b>Stephanie Murray</b>
              Founder, 20 years in talent
            </span>
          </div>
          <h3 className="note-h">
            <Logo domain={pick.t.domain} name={pick.t.name} size={44} />
            <span>
              My up-and-coming pick: <a href={`/reviews/${pick.t.id}`}>{pick.t.name}</a>
            </span>
          </h3>
          <p>{body}</p>
          <p className="note-facts">
            {pick.t.userScore !== null && `${pick.t.userScore.toFixed(1)} from ${formatCount(pick.t.citableReviews)} users`}
            {pick.t.rank ? ` · #${pick.t.rank} ${pick.t.segment}` : ''}
          </p>
          <a className="tl tl-strong" href={`/reviews/${pick.t.id}`}>
            Is {pick.t.name} worth it? &rarr;
          </a>
        </div>
      )}
      <div className="board" aria-label="Not scored yet">
        <div className="board-head">
          <b>Not scored yet</b>
          <span>checked {shortDate(latestCheck())}</span>
        </div>
        {tools.map((t) => (
          <WingRow t={t} key={t.id} />
        ))}
        <div className="board-foot">
          A tool gets a score once it has {rising.minReviews} citable reviews and a recruiter walkthrough. Building one?{' '}
          <a className="tl" href="/for-vendors">
            Listing is free
          </a>
          .
        </div>
      </div>
    </div>
  )
}
