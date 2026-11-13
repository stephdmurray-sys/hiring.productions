import { Logo } from './logo'
import { WEIGHTS } from '@/lib/evidence'

/**
 * The scoreboard: rank, logo, name, who else names it, a filling bar and
 * the score. Bars take the side's color (indigo for job seekers, coral for
 * hiring teams); a coral bar on the job seeker board marks a tool that
 * renews every 4 weeks.
 */

export interface BoardRow {
  id: string
  name: string
  domain: string
  href: string
  score: number
  /** Independent lists that name the tool, shown as publisher logos. */
  lists?: { publication: string; domain: string }[]
  /** Shown when no counting list names it, e.g. "4.9 from 83 users". */
  sub: string
  trap?: boolean
  /** An editor's label, e.g. "Best overall", set after the name in the side's color. */
  tag?: string
  /** The three scores the overall is built from. Hovering a row splits the bar into them. */
  parts?: { users: number; market: number; recruiter: number }
}

export const boardCss = `
  .board{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);box-shadow:var(--shadow);overflow:hidden;}
  .board-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:18px 22px;border-bottom:1px solid var(--rule);background:var(--surface-2);}
  .board-head b{font-size:17px;font-weight:800;}
  .board-head span{font-family:var(--mono);font-size:12.5px;color:var(--ink-3);white-space:nowrap;}
  .board-row{display:grid;grid-template-columns:24px 44px minmax(0,1fr) minmax(80px,260px) 52px;gap:14px;align-items:center;padding:13px 22px;border-bottom:1px solid var(--rule-soft);}
  a.board-row:hover{background:var(--surface-2);}
  a.board-row:hover .board-name > b{text-decoration:underline;text-underline-offset:3px;}
  .board-row:last-of-type{border-bottom:0;}
  .board-rank{font-weight:900;font-size:16px;color:var(--ink-3);text-align:right;font-variant-numeric:tabular-nums;}
  .board-name{min-width:0;}
  .board-name b{display:block;font-size:17px;font-weight:800;line-height:1.25;}
  .board-tag{font-style:normal;font-size:13.5px;font-weight:800;margin-left:10px;}
  .board-seekers .board-tag{color:var(--indigo-text);}
  .board-hiring .board-tag{color:var(--coral-text);}
  .board-bar{height:10px;background:#F0EEF7;border-radius:5px;overflow:hidden;}
  .bar-fill{display:flex;gap:0;height:100%;transform-origin:left;animation:bfill 1.1s cubic-bezier(.2,.7,.2,1) both;transition:gap .25s ease;}
  .bar-fill i{display:block;height:100%;flex-basis:0;transition:background-color .25s ease;}
  .bar-fill i:first-child{border-radius:5px 0 0 5px;}.bar-fill i:last-child{border-radius:0 5px 5px 0;}.bar-fill i:only-child{border-radius:5px;}
  .board-seekers .bar-fill i{background:var(--indigo);}
  .board-hiring .bar-fill i,.board-row.trap .bar-fill i{background:var(--coral);}
  .board-row:nth-of-type(2) .bar-fill{animation-delay:.06s}.board-row:nth-of-type(3) .bar-fill{animation-delay:.12s}.board-row:nth-of-type(4) .bar-fill{animation-delay:.18s}.board-row:nth-of-type(5) .bar-fill{animation-delay:.24s}.board-row:nth-of-type(6) .bar-fill{animation-delay:.3s}.board-row:nth-of-type(n+7) .bar-fill{animation-delay:.36s}
  @keyframes bfill{from{transform:scaleX(0);}}
  .board.rv-wait .bar-fill{animation:none;transform:scaleX(0);}

  /* Hover a row: the bar splits into what the score is made of, and the line under the name says so */
  a.board-row:hover .bar-fill,a.board-row:focus-visible .bar-fill{gap:3px;}
  .board-seekers a.board-row:not(.trap):hover .bar-fill i.p-u{background:var(--indigo);}
  .board-seekers a.board-row:not(.trap):hover .bar-fill i.p-m{background:var(--lavender);}
  .board-seekers a.board-row:not(.trap):hover .bar-fill i.p-r{background:var(--indigo-ink);}
  .board-hiring a.board-row:hover .bar-fill i.p-u,a.board-row.trap:hover .bar-fill i.p-u{background:var(--coral);}
  .board-hiring a.board-row:hover .bar-fill i.p-m,a.board-row.trap:hover .bar-fill i.p-m{background:#FFB3C0;}
  .board-hiring a.board-row:hover .bar-fill i.p-r,a.board-row.trap:hover .bar-fill i.p-r{background:#8E1F33;}
  .board-sub{display:grid;margin-top:3px;}
  .board-sub > span{grid-area:1 / 1;display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity .2s ease,transform .2s ease;}
  .board-sub .sub-parts{opacity:0;transform:translateY(4px);gap:12px;}
  .sub-parts b{font-weight:800;color:var(--ink);display:inline;font-size:13px;}
  .sub-parts i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:5px;}
  a.board-row:hover .sub-main,a.board-row:focus-visible .sub-main{opacity:0;transform:translateY(-4px);}
  a.board-row:hover .sub-parts,a.board-row:focus-visible .sub-parts{opacity:1;transform:none;}
  .board-seekers .sub-parts .k-u{background:var(--indigo);}.board-seekers .sub-parts .k-m{background:var(--lavender);}.board-seekers .sub-parts .k-r{background:var(--indigo-ink);}
  .board-hiring .sub-parts .k-u,.board-row.trap .sub-parts .k-u{background:var(--coral);}.board-hiring .sub-parts .k-m,.board-row.trap .sub-parts .k-m{background:#FFB3C0;}.board-hiring .sub-parts .k-r,.board-row.trap .sub-parts .k-r{background:#8E1F33;}

  /* Publisher logos fan out so each list is visible */
  .board-row .lg-stack .lg{transition:margin .25s ease;}
  a.board-row:hover .lg-stack .lg{margin-right:3px;}

  @media (prefers-reduced-motion: reduce){.bar-fill{animation:none;}.board.rv-wait .bar-fill{transform:none;}.bar-fill,.bar-fill i,.board-sub > span,.board-row .lg-stack .lg{transition:none;}}
  .board-score{font-weight:900;font-size:19px;text-align:right;font-variant-numeric:tabular-nums;}
  .board-foot{padding:13px 22px;font-size:14px;color:var(--ink-2);background:var(--surface-2);border-top:1px solid var(--rule);}
  .board-foot b{color:var(--coral-text);}
  @media(max-width:640px){
    .board-row{grid-template-columns:20px 40px minmax(0,1fr) 46px;gap:12px;padding:12px 16px;}
    .board-bar{display:none;}
    .board-long{display:none;}
    .board-sub .sub-parts{display:none;}
    a.board-row:hover .sub-main{opacity:1;transform:none;}
    .board-head{padding:16px;}
    .board-foot{padding:12px 16px;}
  }
`

export function Scoreboard({
  title,
  checked,
  rows,
  side,
  foot,
  label,
}: {
  title: string
  checked: string
  rows: BoardRow[]
  side: 'seekers' | 'hiring'
  foot?: React.ReactNode
  label?: string
}) {
  return (
    <div className={`board board-${side}`} aria-label={label ?? title}>
      <div className="board-head">
        <b>{title}</b>
        <span>{checked}</span>
      </div>
      {rows.map((t, i) => (
        <a className={`board-row${t.trap ? ' trap' : ''}`} href={t.href} key={t.id}>
          <span className="board-rank">{i + 1}</span>
          <Logo domain={t.domain} name={t.name} size={44} />
          <span className="board-name">
            <b>
              {t.name}
              {t.tag && <em className="board-tag">{t.tag}</em>}
            </b>
            <span className="board-sub">
              <span className="sub-main">
                {t.lists && t.lists.length > 0 ? (
                  <>
                    <span className="lg-stack">
                      {t.lists.map((l) => (
                        <Logo key={l.publication} domain={l.domain} name={l.publication} size={20} round />
                      ))}
                    </span>
                    <span className="board-long">named on </span>
                    {t.lists.length} independent list{t.lists.length === 1 ? '' : 's'}
                  </>
                ) : (
                  t.sub
                )}
              </span>
              {t.parts && (
                <span className="sub-parts" aria-hidden="true">
                  <span>
                    <i className="k-u" />
                    Users <b>{t.parts.users.toFixed(1)}</b>
                  </span>
                  <span>
                    <i className="k-m" />
                    Market <b>{t.parts.market.toFixed(1)}</b>
                  </span>
                  <span>
                    <i className="k-r" />
                    Recruiter <b>{t.parts.recruiter.toFixed(1)}</b>
                  </span>
                </span>
              )}
            </span>
          </span>
          <span className="board-bar" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${(t.score / 5) * 100}%` }}>
              {t.parts ? (
                <>
                  <i className="p-u" style={{ flexGrow: WEIGHTS.user * t.parts.users }} />
                  <i className="p-m" style={{ flexGrow: WEIGHTS.market * t.parts.market }} />
                  <i className="p-r" style={{ flexGrow: WEIGHTS.practitioner * t.parts.recruiter }} />
                </>
              ) : (
                <i style={{ flexGrow: 1 }} />
              )}
            </span>
          </span>
          <span className="board-score">{t.score.toFixed(2)}</span>
        </a>
      ))}
      {foot && <div className="board-foot">{foot}</div>}
    </div>
  )
}
