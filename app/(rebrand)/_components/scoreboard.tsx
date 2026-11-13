import { Logo } from './logo'

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
}

export const boardCss = `
  .board{background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-lg);box-shadow:var(--shadow);overflow:hidden;}
  .board-head{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:18px 22px;border-bottom:1px solid var(--rule);background:var(--surface-2);}
  .board-head b{font-size:17px;font-weight:800;}
  .board-head span{font-family:var(--mono);font-size:12.5px;color:var(--ink-3);white-space:nowrap;}
  .board-row{display:grid;grid-template-columns:24px 44px minmax(0,1fr) minmax(80px,260px) 52px;gap:14px;align-items:center;padding:13px 22px;border-bottom:1px solid var(--rule-soft);}
  a.board-row:hover{background:var(--surface-2);}
  a.board-row:hover .board-name b{text-decoration:underline;text-underline-offset:3px;}
  .board-row:last-of-type{border-bottom:0;}
  .board-rank{font-weight:900;font-size:16px;color:var(--ink-3);text-align:right;font-variant-numeric:tabular-nums;}
  .board-name{min-width:0;}
  .board-name b{display:block;font-size:17px;font-weight:800;line-height:1.25;}
  .board-tag{font-style:normal;font-size:13.5px;font-weight:800;margin-left:10px;}
  .board-seekers .board-tag{color:var(--indigo-text);}
  .board-hiring .board-tag{color:var(--coral-text);}
  .board-name > span{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-3);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .board-bar{height:10px;background:#F0EEF7;border-radius:5px;overflow:hidden;}
  .board-bar i{display:block;height:100%;border-radius:5px;transform-origin:left;animation:bfill 1.1s cubic-bezier(.2,.7,.2,1) both;}
  .board-seekers .board-bar i{background:var(--indigo);}
  .board-hiring .board-bar i{background:var(--coral);}
  .board-row.trap .board-bar i{background:var(--coral);}
  .board-row:nth-of-type(2) .board-bar i{animation-delay:.06s}.board-row:nth-of-type(3) .board-bar i{animation-delay:.12s}.board-row:nth-of-type(4) .board-bar i{animation-delay:.18s}.board-row:nth-of-type(5) .board-bar i{animation-delay:.24s}.board-row:nth-of-type(6) .board-bar i{animation-delay:.3s}.board-row:nth-of-type(n+7) .board-bar i{animation-delay:.36s}
  @keyframes bfill{from{transform:scaleX(0);}}
  @media (prefers-reduced-motion: reduce){.board-bar i{animation:none;}}
  .board-score{font-weight:900;font-size:19px;text-align:right;font-variant-numeric:tabular-nums;}
  .board-foot{padding:13px 22px;font-size:14px;color:var(--ink-2);background:var(--surface-2);border-top:1px solid var(--rule);}
  .board-foot b{color:var(--coral-text);}
  @media(max-width:640px){
    .board-row{grid-template-columns:20px 40px minmax(0,1fr) 46px;gap:12px;padding:12px 16px;}
    .board-bar{display:none;}
    .board-long{display:none;}
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
            <span>
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
          </span>
          <span className="board-bar" aria-hidden="true">
            <i style={{ width: `${(t.score / 5) * 100}%` }} />
          </span>
          <span className="board-score">{t.score.toFixed(2)}</span>
        </a>
      ))}
      {foot && <div className="board-foot">{foot}</div>}
    </div>
  )
}
