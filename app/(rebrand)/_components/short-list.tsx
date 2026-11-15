import { Logo } from './logo'
import { PickMark } from './pick-face'
import { pickFaceCss } from './pick-face-css'
import { verdictFor } from '@/lib/picks'
import { Kit, kitCss } from './recommender'
import { Dots, Squiggle, Zigzag, retroCss } from './retro'
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

/** One tool on a short list (also used inside picker answers), as a card with an ink outline. */
export function ShortToolRow({ t, side }: { t: ShortTool; side: 'seekers' | 'hiring' }) {
  return (
    <div className={`sl-tool sl-tool-${side}`}>
      <div className="sl-top">
        <Logo domain={t.domain} name={t.name} size={52} />
        <div>
          {t.kind && <span className="sl-kind">{t.kind}</span>}
          <h3 className="sl-name">{t.name}</h3>
        </div>
      </div>
      {t.label && (
        <span className="sl-label-row">
          <span className={`sl-label sl-label-${side}`}>{t.label}</span>
          {t.label === 'Stephanie’s pick' && t.go && <PickMark verdict={verdictFor(t.go)} />}
        </span>
      )}
      <p className="sl-line">{keepLast(t.line)}</p>
      {t.note && <p className="sl-note">{t.note}</p>}
      <div className="sl-act">
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
  const n = (i: number) => String(i + 1)
  return (
    <>
      <header className={`sl-hero sl-hero-${list.side}`}>
        <div className="wrap sl-hero-in">
          <Dots className="slh-dots" />
          <Zigzag className="slh-zig" />
          <Squiggle className="slh-squig" />
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/guides">Guides</a> / {list.title}
          </p>
          <p className="sl-sticker">Short list, no scores yet</p>
          <h1 className="display">{list.title}</h1>
          <p className="dek">{keepLast(list.intro)}</p>
          <p className="dateline">Last checked {formatDate(list.checked)}</p>
        </div>
      </header>

      <nav className={`wrap sl-pick sl-pick-${list.side}`} aria-label="Sections">
        {list.sections.map((s, i) => (
          <a className="sl-pick-card" href={`#${s.id}`} key={s.id}>
            <span className="sl-num" aria-hidden="true">
              {n(i)}
            </span>
            <span className="sl-pick-t">{keepLast(s.heading)}</span>
            <span className="arr" aria-hidden="true">
              &darr;
            </span>
          </a>
        ))}
      </nav>

      {list.sections.map((s, i) => (
        <section className={`wrap sec sl-sec sl-sec-${list.side}${s.text ? ' sl-sec-text' : ''}`} id={s.id} key={s.id}>
          <div className="sl-head">
            <span className="sl-num sl-num-big" aria-hidden="true">
              {n(i)}
            </span>
            <div>
              <h2 className="sl-h">{keepLast(s.heading)}</h2>
              {s.sub && <p className="lead">{keepLast(s.sub)}</p>}
            </div>
          </div>
          {s.tools.length > 0 && (
            <div className={`sl-tools${s.tools.length === 1 ? ' sl-tools-one' : ''}`}>
              {s.tools.map((t) => (
                <ShortToolRow t={t} side={list.side} key={t.name} />
              ))}
            </div>
          )}
          {s.also && (
            <div className="sl-also">
              <p className="sl-also-k">Also in this space</p>
              <p className="sl-chips">
                {s.also.map((a) => (
                  <a className="sl-chip" href={`/go/${a.go}`} rel="nofollow noopener" key={a.go}>
                    {a.name} <span className="arr">&#8599;</span>
                  </a>
                ))}
              </p>
              <span className="money">
                {s.also.some((a) => PAYS_US.has(a.go)) ? 'We earn a commission if you buy through one of these links.' : 'We earn nothing from these links.'}
              </span>
            </div>
          )}
          {s.text && (
            <div className="sl-callout">
              <Squiggle className="slc-squig" />
              <p className="sl-text">
                {s.text.before}
                {(s.text.links ?? []).map((l, j, all) => (
                  <span key={l.href}>
                    <a className="tl" href={l.href}>
                      {l.text}
                    </a>
                    {j < all.length - 2 ? ', ' : j === all.length - 2 ? ' and ' : ''}
                  </span>
                ))}
                {keepLast(s.text.after)}
              </p>
            </div>
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

/** The tool cards on their own, for a picker answer that lists short list tools. */
export const slToolCss = pickFaceCss + `
  .sl-tools{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:28px;margin-top:36px;}
  .sl-tools-one{grid-template-columns:minmax(0,560px);}
  .sl-tool{position:relative;display:flex;flex-direction:column;gap:12px;padding:24px 24px 22px;background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:6px 6px 0 var(--ink);}
  .sl-top{display:flex;align-items:center;gap:14px;}
  .sl-top .lg{border:2px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);flex-shrink:0;}
  .sl-kind{display:block;font-size:12.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);margin-bottom:2px;}
  .sl-name{font-size:clamp(22px,2.4vw,26px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;margin:0;}
  .sl-label-row{align-self:flex-start;display:flex;flex-wrap:wrap;align-items:center;gap:12px;}
  .sl-label{align-self:flex-start;display:inline-block;padding:5px 12px;border:2px solid var(--ink);border-radius:999px;font-size:13px;font-weight:800;line-height:1.2;box-shadow:2px 2px 0 var(--ink);transform:rotate(-2deg);}
  .sl-label-seekers{background:var(--lavender);color:var(--ink);}
  .sl-label-hiring{background:var(--coral);color:var(--coral-deep);}
  .sl-line{font-size:17px;line-height:1.6;color:var(--ink-2);margin:0;text-wrap:pretty;}
  .sl-note{margin:4px 0 0;padding:12px 14px;border-left:4px solid var(--ink);background:var(--surface);font-size:15.5px;line-height:1.55;color:var(--ink);}
  .sl-act{margin-top:auto;padding-top:8px;}
  .sl-go{display:inline-flex;align-items:center;gap:6px;padding:12px 18px;border:2px solid var(--ink);border-radius:10px;color:var(--ink);font-size:15.5px;font-weight:800;line-height:1;box-shadow:3px 3px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease,background .12s ease;}
  .sl-tool-seekers .sl-go{background:var(--indigo-tint);}
  .sl-tool-hiring .sl-go{background:var(--coral-tint);}
  .sl-go:hover,.sl-go:focus-visible{transform:translate(1px,1px);box-shadow:2px 2px 0 var(--ink);}
  .sl-go .arr{display:inline-block;transition:transform .15s ease;}
  .sl-go:hover .arr{transform:translate(2px,-2px);}
  @media (prefers-reduced-motion: reduce){.sl-go,.sl-go .arr{transition:none;}}
`

export const shortListCss =
  kitCss +
  retroCss +
  slToolCss +
  `
  .sl-hero{position:relative;overflow:hidden;padding:clamp(40px,6vw,80px) 0 clamp(48px,6vw,84px);border-bottom:3px solid var(--ink);}
  .sl-hero-seekers{background:var(--indigo);color:#fff;}
  .sl-hero-hiring{background:var(--coral);color:var(--coral-deep);}
  .sl-hero-in{position:relative;}
  .sl-hero .crumbs,.sl-hero .crumbs a,.sl-hero .dek,.sl-hero .dateline{color:inherit;}
  .sl-hero .crumbs a{text-decoration-color:currentColor;}
  .sl-hero h1{position:relative;z-index:2;color:inherit;max-width:900px;}
  .sl-hero .dek{position:relative;z-index:2;}
  .sl-hero :focus-visible{outline-color:currentColor;}
  .sl-sticker{position:relative;z-index:2;display:inline-block;margin:6px 0 18px;padding:9px 14px 8px;font-weight:900;font-size:14px;line-height:1;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--ink);transform:rotate(-4deg);animation:sl-st-in .7s cubic-bezier(.2,1.7,.4,1) .15s both;}
  .sl-hero-seekers .sl-sticker{background:var(--coral);color:var(--ink);}
  .sl-hero-hiring .sl-sticker{background:#fff;color:var(--ink);}
  .slh-dots{top:-6px;right:4%;}
  .slh-zig{bottom:-40px;right:0;}
  .slh-squig{display:none;}
  .sl-hero-seekers .slh-dots{color:var(--lavender);}
  .sl-hero-seekers .slh-zig{color:var(--coral);}
  .sl-hero-seekers .slh-squig{color:#fff;}
  .sl-hero-hiring .slh-dots{color:var(--ink);opacity:.5;}
  .sl-hero-hiring .slh-zig{color:var(--indigo);}
  .sl-hero-hiring .slh-squig{color:#fff;}
  @media(max-width:760px){.slh-zig{right:0;}.slh-dots{top:-30px;right:-62px;}}

  .sl-pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr));gap:18px;margin-top:clamp(40px,5vw,56px);}
  .sl-pick-card{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:14px;padding:16px 18px;background:#fff;color:var(--ink);border:3px solid var(--ink);border-radius:14px;box-shadow:5px 5px 0 var(--ink);font-size:16.5px;font-weight:800;line-height:1.3;transition:transform .12s ease,box-shadow .12s ease,background .12s ease;animation:g-in .5s cubic-bezier(.2,.7,.2,1) both;}
  .sl-pick-card:nth-child(2){animation-delay:.06s;}
  .sl-pick-card:nth-child(3){animation-delay:.12s;}
  .sl-pick-card:nth-child(4){animation-delay:.18s;}
  .sl-pick-card:nth-child(n+5){animation-delay:.24s;}
  .sl-pick-card:hover,.sl-pick-card:focus-visible{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--ink);}
  .sl-pick-seekers .sl-pick-card:hover{background:var(--indigo-tint);}
  .sl-pick-hiring .sl-pick-card:hover{background:var(--coral-tint);}
  .sl-pick-card .arr{font-size:20px;transition:transform .15s ease;}
  .sl-pick-card:hover .arr{transform:translateY(3px);}
  @keyframes g-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
  @keyframes sl-st-in{from{opacity:0;transform:rotate(-12deg) scale(.6);}to{opacity:1;transform:rotate(-4deg) scale(1);}}

  .sl-num{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:3px solid var(--ink);font-weight:900;font-size:17px;line-height:1;font-variant-numeric:tabular-nums;}
  .sl-pick-seekers .sl-num,.sl-sec-seekers .sl-num{background:var(--indigo);color:#fff;}
  .sl-pick-hiring .sl-num,.sl-sec-hiring .sl-num{background:var(--coral);color:var(--coral-deep);}
  .sl-num-big{width:64px;height:64px;font-size:28px;box-shadow:4px 4px 0 var(--ink);transform:rotate(-6deg);flex-shrink:0;}
  .sl-sec{scroll-margin-top:24px;}
  .sl-head{display:flex;align-items:flex-start;gap:22px;}
  .sl-h{font-size:clamp(40px,5.4vw,60px);line-height:1.1;letter-spacing:-0.02em;max-width:900px;margin:4px 0 0;}
  .sl-head .lead{margin-top:12px;}
  .sl-also{margin-top:28px;}
  .sl-also-k{font-size:14px;font-weight:900;color:var(--ink);margin:0 0 10px;}
  .sl-chips{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 4px;}
  .sl-chip{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border:2px solid var(--ink);border-radius:999px;background:#fff;color:var(--ink);font-size:15px;font-weight:800;line-height:1;box-shadow:3px 3px 0 var(--ink);transition:transform .12s ease,box-shadow .12s ease;}
  .sl-chip:hover{transform:translate(1px,1px);box-shadow:2px 2px 0 var(--ink);}
  .sl-callout{position:relative;margin-top:32px;max-width:860px;padding:clamp(24px,3.5vw,36px);border:3px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--ink);}
  .sl-sec-seekers .sl-callout{background:var(--indigo-tint);}
  .sl-sec-hiring .sl-callout{background:var(--coral-tint);}
  .slc-squig{top:-18px;right:28px;}
  .sl-sec-seekers .slc-squig{color:var(--coral);}
  .sl-sec-hiring .slc-squig{color:var(--indigo);}
  .sl-text{position:relative;z-index:2;margin:0;font-size:clamp(19px,2vw,23px);line-height:1.55;color:var(--ink);font-weight:700;text-wrap:pretty;}
  .sl-end .kit:first-child{margin-top:0;}
  .sl-vendors{margin-top:44px;font-size:18px;font-weight:700;}
  .sl-end .rec-fine{margin-top:14px;font-size:14px;font-weight:700;color:var(--ink-2);}
  @media(max-width:560px){.sl-head{gap:14px;}.sl-num-big{width:48px;height:48px;font-size:22px;}.sl-pick-card{font-size:15.5px;}}
  @media (prefers-reduced-motion: reduce){.sl-pick-card,.sl-sticker{animation:none;transition:none;}.sl-chip{transition:none;}}
`
