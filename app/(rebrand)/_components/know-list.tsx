import { Logo } from './logo'
import { keepLast } from '@/lib/site-line'
import { moneyLine } from '@/lib/money'
import type { KnowTool } from '@/lib/evidence/tools-to-know'

/**
 * "Tools to know": the top options in a category we can't score yet (too few
 * public reviews), with plain facts only: what it does, what's free, the
 * price, where its reviews are, and the source and date for each. Used on
 * picker answers that have no best match and on the free tool pages
 * (Nov 16, 2026 value audit: no path should end with nothing to use).
 */
export function KnowList({ tools, side }: { tools: KnowTool[]; side: 'seekers' | 'hiring' }) {
  return (
    <div className={`know know-${side} know-n${tools.length}`}>
      {tools.map((t) => (
        <div className="know-card" key={t.go}>
          <div className="know-top">
            <Logo domain={t.domain} name={t.name} size={44} />
            <div>
              <b>{t.name}</b>
              {t.tag && <span className="know-tag">{t.tag}</span>}
            </div>
          </div>
          <p className="know-line">{keepLast(t.line)}</p>
          {t.free && (
            <p className="know-fact">
              <b>Free: </b>
              {keepLast(t.free)}
            </p>
          )}
          {t.paid && (
            <p className="know-fact">
              <b>If you pay: </b>
              {keepLast(t.paid)}
            </p>
          )}
          {t.reviews && <p className="know-reviews">{keepLast(t.reviews)}</p>}
          {t.watch && (
            <p className="know-watch">
              <b>Watch out: </b>
              {keepLast(t.watch)}
            </p>
          )}
          <span className="know-go">
            <a href={`/go/${t.go}`} rel="nofollow noopener">
              {t.cta ?? `Go to ${t.name}`} <span className="arr">&#8599;</span>
            </a>
            <span className="money">{moneyLine(t.go)}</span>
          </span>
          <a className="know-src" href={t.src.url} rel="nofollow noopener" target="_blank">
            Source: {t.src.label}, {t.src.date}
          </a>
        </div>
      ))}
    </div>
  )
}

export const knowCss = `
  .know{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:18px;margin-top:18px;}
  /* Even rows only (Stephanie hates a lone card): two or four go two across, three go three across or stack. */
  .know-n2,.know-n3,.know-n4{grid-template-columns:1fr;}
  @media(min-width:700px){.know-n2,.know-n4{grid-template-columns:repeat(2,minmax(0,1fr));}}
  @media(min-width:900px){.know-n3{grid-template-columns:repeat(3,minmax(0,1fr));}}
  .know-card{display:flex;flex-direction:column;gap:8px;padding:18px 20px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink);}
  .know-top{display:flex;align-items:center;gap:12px;}
  .know-top > div{display:grid;gap:2px;}
  .know-top b{font-size:18px;font-weight:900;color:var(--ink);}
  .know-tag{font-size:12.5px;font-weight:800;color:var(--ink-3);}
  .know-line{margin:2px 0 0;font-size:15.5px;line-height:1.5;color:var(--ink);}
  .know-fact{margin:0;font-size:14.5px;line-height:1.5;color:var(--ink-2);}
  .know-fact b{color:var(--ink);}
  .know-watch{margin:0;padding:8px 10px;border-radius:10px;background:var(--coral-tint);font-size:13.5px;line-height:1.45;color:var(--ink);}
  .know-watch b{color:var(--coral-text);}
  .know-reviews{margin:0;font-size:13px;line-height:1.45;color:var(--ink-3);}
  .know-go{display:flex;flex-direction:column;margin-top:auto;padding-top:6px;}
  .know-go a{font-weight:800;font-size:15px;text-decoration:underline;text-underline-offset:3px;}
  .know-seekers .know-go a{color:var(--indigo-text);}
  .know-hiring .know-go a{color:var(--coral-text);}
  .know-go .money{margin-top:4px;}
  .know-src{font-size:12px;line-height:1.4;color:var(--ink-3);text-decoration:underline;text-underline-offset:2px;}
`
