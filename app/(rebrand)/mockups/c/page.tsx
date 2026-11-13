import type { Metadata } from 'next'
import { Logo, MockBanner, bannerCss, logoCss, mockData, money, PUBLISHER_DOMAINS } from '../mock-kit'
import { VIDEO_KIND_LABEL, formatCount } from '@/lib/evidence'

export const metadata: Metadata = { title: 'Mockup C: Scoreboard', robots: { index: false, follow: false } }

const css = `
  :root{--indigo:#6C47FF;--indigo-ink:#2B1B7A;--lav:#EEEAFF;--coral:#FF4F6A;--coral-text:#C42E48;--ink:#1A1A22;--ink-2:#4A4A5A;--ink-3:#77778A;--paper:#FAF8F3;--rule:#E6E2D8;}
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--paper);color:var(--ink);font-family:inherit;-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}
  .wrap{max-width:1200px;margin:0 auto;padding:0 32px;}

  .c-nav{background:var(--indigo);color:#fff;}
  .c-nav .wrap{display:flex;align-items:center;gap:28px;height:64px;}
  .wordmark{font-weight:800;font-size:21px;letter-spacing:-0.01em;}
  .wordmark i{font-style:normal;color:#FFC2CC;}
  .c-nav nav{display:flex;gap:26px;margin-left:auto;font-size:15px;font-weight:600;color:#E6E0FF;}

  .c-hero{padding:64px 0 72px;}
  .c-grid{display:grid;grid-template-columns:0.9fr 1.1fr;gap:56px;align-items:start;}
  .c-hero h1{font-weight:900;font-size:clamp(44px,5.6vw,72px);line-height:1.02;letter-spacing:-0.03em;text-wrap:balance;}
  .c-hero h1 span{color:var(--indigo);}
  .c-sub{font-size:20px;color:var(--ink-2);margin-top:20px;line-height:1.55;}
  .c-cta{display:inline-block;margin-top:28px;background:var(--ink);color:#fff;font-weight:800;font-size:16px;padding:15px 22px;border-radius:6px;}
  .c-also{display:block;margin-top:14px;font-size:15px;color:var(--ink-2);}
  .c-also a{color:var(--coral-text);font-weight:700;text-decoration:underline;text-underline-offset:3px;}

  .board{background:#fff;border:1px solid var(--rule);border-radius:12px;box-shadow:0 1px 0 rgba(0,0,0,0.03),0 12px 32px rgba(30,20,80,0.08);overflow:hidden;}
  .board-head{display:flex;justify-content:space-between;align-items:baseline;padding:18px 22px;border-bottom:1px solid var(--rule);background:#FCFBFF;}
  .board-head b{font-size:17px;font-weight:800;}
  .board-head span{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:var(--ink-3);}
  .board-row{display:grid;grid-template-columns:28px 44px minmax(0,1fr) 140px 52px;gap:14px;align-items:center;padding:14px 22px;border-bottom:1px solid #F1EFE8;}
  .board-row:last-child{border-bottom:0;}
  .board-rank{font-weight:900;font-size:17px;color:var(--ink-3);text-align:right;}
  .board-name b{display:block;font-size:17px;font-weight:800;}
  .board-name span{display:flex;align-items:center;gap:4px;font-size:13px;color:var(--ink-3);margin-top:3px;}
  .board-name .mlogo{margin-right:-6px;border:2px solid #fff;}
  .board-bar{height:10px;background:#F0EEF7;border-radius:5px;overflow:hidden;}
  .board-bar i{display:block;height:100%;background:var(--indigo);border-radius:5px;transform-origin:left;animation:c-fill 1.2s cubic-bezier(.2,.7,.2,1) both;}
  .board-row:nth-child(3) .board-bar i{animation-delay:.08s}.board-row:nth-child(4) .board-bar i{animation-delay:.16s}.board-row:nth-child(5) .board-bar i{animation-delay:.24s}.board-row:nth-child(6) .board-bar i{animation-delay:.32s}
  .board-row.trap .board-bar i{background:var(--coral);}
  @keyframes c-fill{from{transform:scaleX(0);}}
  @media (prefers-reduced-motion: reduce){.board-bar i{animation:none;}}
  .board-score{font-weight:900;font-size:19px;text-align:right;font-variant-numeric:tabular-nums;}
  .board-foot{padding:12px 22px;font-size:13.5px;color:var(--ink-2);background:#FCFBFF;border-top:1px solid var(--rule);}
  .board-foot b{color:var(--coral-text);}

  .c-band{background:var(--indigo-ink);color:#fff;padding:56px 0;}
  .c-band-grid{display:grid;grid-template-columns:0.8fr 1.2fr;gap:48px;align-items:center;}
  .c-band h2{font-weight:900;font-size:clamp(34px,4vw,48px);letter-spacing:-0.02em;line-height:1.06;}
  .c-band p{color:#D8D0FF;font-size:17px;margin-top:12px;}
  .c-logos{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
  .c-logo{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 8px;border-radius:10px;background:rgba(255,255,255,0.06);text-align:center;font-size:13px;}
  .c-logo b{font-size:13.5px;}
  .c-logo span{color:#B6A6FF;}
  .c-logo.counts{background:rgba(94,230,168,0.12);outline:1px solid rgba(94,230,168,0.5);}
  .c-logo.counts span{color:#5EE6A8;font-weight:700;}

  .c-sec{padding:96px 0 0;}
  .c-sec h2{font-weight:900;font-size:clamp(40px,5vw,60px);letter-spacing:-0.025em;line-height:1.05;}
  .c-lead{font-size:19px;color:var(--ink-2);margin-top:12px;max-width:700px;}
  .c-vids{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:32px;}
  .c-vid{background:#fff;border:1px solid var(--rule);border-radius:10px;overflow:hidden;}
  .c-thumb{position:relative;aspect-ratio:16/9;background:#24194F center/cover no-repeat;}
  .c-thumb .play{position:absolute;left:14px;bottom:14px;width:46px;height:46px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;}
  .c-kind{position:absolute;right:12px;top:12px;font-size:12.5px;font-weight:800;background:#fff;color:var(--ink);padding:4px 9px;border-radius:5px;}
  .c-kind.indie{background:var(--indigo);color:#fff;}
  .c-vid-meta{display:flex;align-items:center;gap:12px;padding:14px 16px;}
  .c-vid-meta b{display:block;font-size:16px;font-weight:800;}
  .c-vid-meta span{font-size:13.5px;color:var(--ink-2);display:block;line-height:1.4;}
  .c-foot{height:120px;}
  @media(max-width:960px){.c-grid,.c-band-grid{grid-template-columns:1fr;}.c-vids{grid-template-columns:1fr;}.c-logos{grid-template-columns:repeat(3,1fr);}.c-nav nav{display:none;}.board-row{grid-template-columns:22px 40px minmax(0,1fr) 46px;}.board-bar{display:none;}}
`

export default function MockC() {
  const d = mockData()
  const rows = [...d.all]
    .filter((t) => t.overall !== null)
    .sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0))
  const resumeIo = d.byId['resume-io']
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css + logoCss + bannerCss }} />
      <MockBanner letter="C" name="Scoreboard" />
      <div className="c-nav">
        <div className="wrap">
          <span className="wordmark">
            hiring<i>.</i>productions
          </span>
          <nav>
            <a href="#">For job seekers</a>
            <a href="#">For hiring teams</a>
            <a href="#">How we review</a>
            <a href="#">For vendors</a>
          </nav>
        </div>
      </div>

      <header className="wrap c-hero">
        <div className="c-grid">
          <div>
            <h1>
              Hiring is a production. We&rsquo;re here for <span>everyone</span> in&nbsp;it.
            </h1>
            <p className="c-sub">
              Independent reviews of the tools on both sides of hiring. Every score carries the date we checked it, and no vendor can pay
              for a place.
            </p>
            <a className="c-cta" href="#">
              See the resume tools scoreboard &rarr;
            </a>
            <span className="c-also">
              Hiring instead? <a href="#">ATS ranked by team size</a>
            </span>
          </div>

          <div className="board" aria-label="Resume tools scoreboard">
            <div className="board-head">
              <b>Resume tools, this month</b>
              <span>checked 13 Nov 2026</span>
            </div>
            {rows.map((t, i) => (
              <div className={`board-row${t.yearCost?.renewsEvery4Weeks ? ' trap' : ''}`} key={t.id}>
                <span className="board-rank">{i + 1}</span>
                <Logo domain={t.domain} name={t.name} size={44} />
                <span className="board-name">
                  <b>{t.name}</b>
                  <span>
                    {t.counted.length > 0 ? (
                      <>
                        {t.counted.map((a) => (
                          <Logo key={a.list.id} domain={PUBLISHER_DOMAINS[a.list.publication]} name={a.list.publication} size={20} round />
                        ))}
                        <em style={{ fontStyle: 'normal', marginLeft: 10 }}>
                          named on {t.counted.length} list{t.counted.length === 1 ? '' : 's'}
                        </em>
                      </>
                    ) : (
                      <>
                        {t.userScore?.toFixed(1)} from {formatCount(t.citableReviews)} users
                      </>
                    )}
                  </span>
                </span>
                <span className="board-bar">
                  <i style={{ width: `${((t.overall ?? 0) / 5) * 100}%` }} />
                </span>
                <span className="board-score">{t.overall?.toFixed(2)}</span>
              </div>
            ))}
            <div className="board-foot">
              Coral bar: renews every 4 weeks. {resumeIo.name} costs <b>{money(resumeIo.yearCost!.amount)}</b> a year if you forget to cancel.
            </div>
          </div>
        </div>
      </header>

      <div className="c-band">
        <div className="wrap c-band-grid">
          <div>
            <h2>We check the other lists so you don&rsquo;t have to</h2>
            <p>
              {d.benchmarks.length} &ldquo;best resume tool&rdquo; lists, re-checked monthly. Green ones count. The rest are out of date or
              published by companies that sell what they rank.
            </p>
          </div>
          <div className="c-logos">
            {d.benchmarks.slice(0, 12).map((l) => (
              <div key={l.id} className={`c-logo${l.status === 'counts' ? ' counts' : ''}`}>
                <Logo domain={PUBLISHER_DOMAINS[l.publication]} name={l.publication} size={40} round />
                <b>{l.publication}</b>
                <span>{l.status === 'counts' ? 'Counts' : 'Not counted'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="wrap c-sec">
        <h2>Watch before you pay</h2>
        <p className="c-lead">Labeled by who made each one: the company&rsquo;s best-case tour, or an independent creator after sign-up.</p>
        <div className="c-vids">
          {d.featured.slice(0, 3).map((v) => {
            const t = d.byId[v.tool]
            return (
              <div className="c-vid" key={v.youtubeId}>
                <div className="c-thumb" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg)` }}>
                  <span className={`c-kind${v.kind === 'independent' ? ' indie' : ''}`}>{VIDEO_KIND_LABEL[v.kind]}</span>
                  <span className="play" aria-hidden="true">
                    <svg width="18" height="20" viewBox="0 0 20 22" fill="#1A1A22">
                      <path d="M2 1.5v19L19 11z" />
                    </svg>
                  </span>
                </div>
                <div className="c-vid-meta">
                  <Logo domain={t.domain} name={t.name} size={36} />
                  <div>
                    <b>{t.name}</b>
                    <span>{v.title}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <div className="c-foot" />
    </>
  )
}
