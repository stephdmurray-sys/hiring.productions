import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { coverageReport, discovery, formatCount, formatMonth } from '@/lib/evidence'

/**
 * The monthly desk: an internal checklist, not linked from the site and not
 * indexed. It is how the "never leave a good one out" rules are enforced:
 * every tool on the radar, why it's there, when its check is due, and which
 * categories have no scoreboard yet.
 */
export const metadata: Metadata = { title: 'The monthly desk', robots: { index: false, follow: false } }

const css = `
  .desk-flag{font-weight:800;color:var(--coral-text);}
  .desk-ok{font-weight:800;color:var(--ok);}
  .desk-tool{display:flex;align-items:center;gap:10px;font-weight:800;color:var(--ink);white-space:nowrap;}
  .desk-gap{border-top:1px solid var(--ink);margin-top:28px;}
  .desk-gap > div{display:grid;grid-template-columns:minmax(0,0.8fr) minmax(0,2fr);gap:24px;padding:18px 0;border-bottom:1px solid var(--rule);}
  .desk-gap b{font-size:19px;}
  .desk-rules{margin-top:24px;padding-left:22px;max-width:860px;color:var(--ink-2);}
  .desk-rules li{margin-bottom:10px;}
  @media(max-width:760px){.desk-gap > div{grid-template-columns:1fr;gap:4px;}}
`

export default function Desk() {
  const r = coverageReport()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav />
      <header className="ph">
        <div className="wrap">
          <h1 className="display">The monthly desk</h1>
          <p className="dek">Every tool on our radar, why it&rsquo;s there, and when its check is due. Internal: not linked, not indexed.</p>
          <p className="dateline">
            Check month: {formatMonth(r.month)} &middot;{' '}
            {r.overdue.length ? (
              <span className="desk-flag">{r.overdue.length} overdue</span>
            ) : (
              <span className="desk-ok">nothing overdue</span>
            )}{' '}
            &middot; {r.categoryGaps.length} categor{r.categoryGaps.length === 1 ? 'y' : 'ies'} without a board
          </p>
        </div>
      </header>

      <section className="wrap sec-tight">
        <h2>The check queue</h2>
        <div className="tscroll">
          <table className="ledger">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Category</th>
                <th>Why it&rsquo;s on our radar</th>
                <th>Reviews counted</th>
                <th>Check due</th>
                <th>Ranks on</th>
              </tr>
            </thead>
            <tbody>
              {r.queue.map((q) => (
                <tr key={q.id}>
                  <td>
                    <span className="desk-tool">
                      <Logo domain={q.domain} name={q.name} size={28} />
                      {q.name}
                    </span>
                    {q.founderPick && <span className="muted">Stephanie&rsquo;s pick</span>}
                  </td>
                  <td>
                    <span className={q.side === 'seekers' ? 'dot-seekers' : 'dot-hiring'} />
                    {q.category}
                  </td>
                  <td>{q.triggers.map((t) => t.label).join('; ')}</td>
                  <td>{q.citableReviews === null ? <span className="desk-flag">Not counted yet</span> : formatCount(q.citableReviews)}</td>
                  <td>{q.overdue ? <span className="desk-flag">Overdue: {formatMonth(q.checkDue)}</span> : formatMonth(q.checkDue)}</td>
                  <td>{q.board ?? <span className="desk-flag">No board</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap sec">
        <h2>Category gaps</h2>
        <p className="lead">Tools that can&rsquo;t be ranked because we have no scoreboard for their category. Each one is a decision: build the board, or say why not.</p>
        <div className="desk-gap">
          {r.categoryGaps.map((g) => (
            <div key={g.category}>
              <b>{g.category}</b>
              <span>
                {g.tools.map((t) => t.name).join(', ')}
                {g.tools.some((t) => t.founderPick) && ' (includes Stephanie’s pick)'}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <h2>The rules</h2>
        <ol className="desk-rules">
          {discovery.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section className="wrap sec">
        <h2>The discovery net</h2>
        <div className="rows">
          {discovery.triggers.map((t) => (
            <div className="row" key={t.id}>
              <span className="row-title">{t.label}</span>
              <p>{t.note}</p>
            </div>
          ))}
        </div>
        <h3 className="h3">Not signals</h3>
        <div className="rows">
          {discovery.notSignals.map((n) => (
            <div className="row" key={n.label}>
              <span className="row-title">{n.label}</span>
              <p>{n.why}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
