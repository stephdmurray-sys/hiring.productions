import { Logo } from './logo'
import { Kit, kitCss } from './recommender'
import { FollowOn } from './follow'
import { PickerArrival, TrackedLink } from './picker-track'
import { keepLast } from '@/lib/site-line'
import { moneyLine, PAYS_US } from '@/lib/money'
import { formatDate } from '@/lib/evidence'
import type { ShortList, ShortTool } from '@/lib/evidence/shortlists'

/**
 * The short list template: a category too new to score. No scores, a few
 * tools sorted by the situation they fit, a reason for each, and a date.
 * The intro says there are no scores, at the top of the page. Every vendor
 * link goes to the company's own site through /go, with what we earn from
 * it right under the button. RepVera, where it appears, carries Stephanie's
 * note and no money line: she built it.
 */

/** One tool on a short list (also used inside picker answers). */
export function ShortToolRow({ t, side }: { t: ShortTool; side: 'seekers' | 'hiring' }) {
  return (
    <div className="sl-tool">
      <Logo domain={t.domain} name={t.name} size={52} />
      <div className="sl-body">
        <h3 className="sl-name">
          {t.name}
          {t.label && <span className={`kit-label kit-label-${side}`}>{t.label}</span>}
        </h3>
        <p className="sl-line">{keepLast(t.line)}</p>
        {t.note && <p className="sl-note">{t.note}</p>}
        {t.link ? (
          <TrackedLink href={t.link.url} className="sl-go" event="repvera_profile_click" side={side}>
            {t.link.text} <span className="arr">&#8599;</span>
          </TrackedLink>
        ) : (
          t.go && (
            <span className="kit-go">
              <a className="sl-go" href={`/go/${t.go}`} rel="nofollow noopener">
                Go to {t.name} <span className="arr">&#8599;</span>
              </a>
              <span className="money">{moneyLine(t.go)}</span>
            </span>
          )
        )}
      </div>
    </div>
  )
}

export function ShortListPage({ list }: { list: ShortList }) {
  return (
    <>
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/guides">Guides</a> / {list.title}
          </p>
          <h1 className="display">{list.title}</h1>
          <p className="dek">{keepLast(list.intro)}</p>
          <p className="dateline">Last checked {formatDate(list.checked)}</p>
          <nav className="sl-jump" aria-label="Sections">
            {list.sections.map((s) => (
              <a href={`#${s.id}`} key={s.id}>
                {keepLast(s.heading)} <span className="arr" aria-hidden="true">&darr;</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {list.sections.map((s) => (
        <section className="wrap sec sl-sec" id={s.id} key={s.id}>
          <h2 className="sl-h">{keepLast(s.heading)}</h2>
          {s.sub && <p className="lead">{keepLast(s.sub)}</p>}
          {s.tools.length > 0 && (
            <div className="sl-tools">
              {s.tools.map((t) => (
                <ShortToolRow t={t} side={list.side} key={t.name} />
              ))}
            </div>
          )}
          {s.also && (
            <div className="sl-also">
              <p>
                Also in this space:{' '}
                {s.also.map((a, i) => (
                  <span key={a.go}>
                    <a className="tl" href={`/go/${a.go}`} rel="nofollow noopener">
                      {a.name}
                    </a>
                    {i < s.also!.length - 2 ? ', ' : i === s.also!.length - 2 ? ' and ' : '.'}
                  </span>
                ))}
              </p>
              <span className="money">
                {s.also.some((a) => PAYS_US.has(a.go)) ? 'We earn a commission if you buy through one of these links.' : 'We earn nothing from these links.'}
              </span>
            </div>
          )}
          {s.text && (
            <p className="sl-text">
              {s.text.before}
              {(s.text.links ?? []).map((l, i, all) => (
                <span key={l.href}>
                  <a className="tl" href={l.href}>
                    {l.text}
                  </a>
                  {i < all.length - 2 ? ', ' : i === all.length - 2 ? ' and ' : ''}
                </span>
              ))}
              {keepLast(s.text.after)}
            </p>
          )}
        </section>
      ))}

      <section className="wrap sec sl-end">
        {list.follow && list.follow.length > 0 && (
          <Kit k="Who to follow on this">
            <FollowOn ids={list.follow} />
          </Kit>
        )}
        {list.free && (
          <Kit k="Free from us">
            <a className="kit-free" href={list.free.href}>
              <span>
                <b>{list.free.title}</b>
                <span>{keepLast(list.free.detail)}</span>
              </span>
              <span className="arr" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </Kit>
        )}
        <p className="sl-vendors">
          <a className="tl" href="/for-vendors">
            Missing from this page? Tell&nbsp;us.
          </a>
        </p>
        <p className="rec-fine">Nobody pays to be featured.</p>
        {list.pickerProblem && <PickerArrival side={list.side} problem={list.pickerProblem} />}
      </section>
    </>
  )
}

/** The tool rows on their own, for a picker answer that lists short list tools. */
export const slToolCss = `
  .sl-tools{display:grid;gap:0;margin-top:32px;border-top:1px solid var(--rule);max-width:880px;}
  .sl-tool{display:grid;grid-template-columns:auto minmax(0,1fr);gap:20px;align-items:start;padding:28px 0;border-bottom:1px solid var(--rule);}
  .sl-name{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:clamp(22px,2.4vw,26px);font-weight:900;letter-spacing:-0.015em;line-height:1.2;}
  .sl-line{font-size:18px;line-height:1.6;color:var(--ink-2);margin-top:8px;max-width:720px;text-wrap:pretty;}
  .sl-note{margin:16px 0 4px;padding:14px 16px;border-left:4px solid var(--ink);background:var(--surface);font-size:16px;line-height:1.55;color:var(--ink);max-width:720px;}
  .sl-go{display:inline-flex;align-items:center;gap:6px;margin-top:16px;padding:12px 18px;border:2px solid var(--ink);border-radius:10px;background:#fff;color:var(--ink);font-size:15.5px;font-weight:800;line-height:1;box-shadow:3px 3px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease;}
  .sl-go:hover,.sl-go:focus-visible{transform:translate(1px,1px);box-shadow:2px 2px 0 var(--ink);}
  @media(max-width:560px){.sl-tool{grid-template-columns:1fr;gap:12px;}}
  @media (prefers-reduced-motion: reduce){.sl-go{transition:none;}}
`

export const shortListCss =
  kitCss +
  slToolCss +
  `
  .sl-jump{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px;max-width:980px;}
  .sl-jump a{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border:2px solid var(--ink);border-radius:10px;background:#fff;color:var(--ink);font-size:15px;font-weight:800;line-height:1.3;box-shadow:3px 3px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease;}
  .sl-jump a:hover,.sl-jump a:focus-visible{transform:translate(1px,1px);box-shadow:2px 2px 0 var(--ink);}
  .sl-sec{scroll-margin-top:24px;}
  .sl-h{font-size:clamp(30px,3.8vw,46px);line-height:1.1;letter-spacing:-0.02em;max-width:900px;}
  .sl-sec .lead{margin-top:14px;}
  .sl-also{margin-top:24px;max-width:880px;}
  .sl-also p{font-size:17px;font-weight:700;color:var(--ink);}
  .sl-text{margin-top:18px;font-size:clamp(19px,1.9vw,22px);line-height:1.55;color:var(--ink);font-weight:600;max-width:780px;text-wrap:pretty;}
  .sl-end .kit:first-child{margin-top:0;}
  .sl-vendors{margin-top:44px;font-size:18px;font-weight:700;}
  .sl-end .rec-fine{margin-top:14px;font-size:14px;font-weight:700;color:var(--ink-2);}
  @media(max-width:560px){.sl-jump a{font-size:14px;}}
  @media (prefers-reduced-motion: reduce){.sl-jump a{transition:none;}}
`
