import type { Metadata } from 'next'
import { Logo, MOCK_LINES, MockBanner, bannerCss, logoCss, mockData, money, PUBLISHER_DOMAINS } from '../mock-kit'
import { formatCount } from '@/lib/evidence'

export const metadata: Metadata = { title: 'Mockup A: Center stage', robots: { index: false, follow: false } }

const css = `
  :root{--stage:#170F3A;--stage-2:#21165A;--indigo:#6C47FF;--lav:#A78BFA;--coral:#FF4F6A;--ink:#1A1A22;--ink-2:#4A4A5A;--ink-3:#77778A;--paper:#FAF8F3;--rule:#E6E2D8;--ok:#5EE6A8;}
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--paper);color:var(--ink);font-family:inherit;-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}
  .wrap{max-width:1180px;margin:0 auto;padding:0 32px;}

  .a-nav{background:var(--stage);color:#fff;}
  .a-nav .wrap{display:flex;align-items:center;gap:28px;height:68px;}
  .wordmark{font-weight:800;font-size:21px;letter-spacing:-0.01em;}
  .wordmark i{font-style:normal;color:var(--coral);}
  .a-nav nav{display:flex;gap:26px;margin-left:auto;font-size:15px;font-weight:600;color:#CFC6F5;}
  .a-nav nav a:hover{color:#fff;}
  .a-cta{background:var(--coral);color:#fff;font-weight:700;font-size:14.5px;padding:10px 16px;border-radius:6px;}

  .a-hero{background:var(--stage);color:#fff;padding:72px 0 88px;position:relative;overflow:hidden;}
  .a-hero::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6px;background:linear-gradient(90deg,var(--indigo),var(--coral));}
  .a-grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:56px;align-items:center;}
  .a-hero h1{font-weight:900;font-size:clamp(44px,6.2vw,76px);line-height:1.02;letter-spacing:-0.03em;text-wrap:balance;}
  .a-hero h1 em{font-style:normal;color:var(--coral);}
  .a-sub{font-size:20px;line-height:1.55;color:#D9D2F7;margin-top:22px;max-width:560px;}
  .a-doors{display:flex;gap:12px;margin-top:32px;flex-wrap:wrap;}
  .a-door{display:flex;flex-direction:column;gap:4px;padding:16px 20px;border-radius:8px;min-width:240px;}
  .a-door b{font-size:18px;font-weight:800;}
  .a-door span{font-size:14px;opacity:0.85;}
  .a-door-seek{background:var(--indigo);color:#fff;}
  .a-door-hire{background:#fff;color:var(--stage);border-left:6px solid var(--coral);}
  .a-proof{display:flex;align-items:center;gap:10px;margin-top:26px;font-size:14px;color:#B9AEEA;}
  .a-proof .dot{width:8px;height:8px;border-radius:50%;background:var(--ok);}

  .a-stack{position:relative;height:470px;}
  .a-card{position:absolute;background:#fff;color:var(--ink);border-radius:10px;padding:20px 22px;box-shadow:0 18px 40px rgba(5,2,20,0.45);width:min(400px,100%);}
  .a-card-1{right:0;bottom:0;z-index:3;}
  .a-card-2{left:0;top:96px;z-index:2;width:min(360px,92%);}
  .a-card-3{right:24px;top:0;z-index:1;width:min(330px,85%);background:var(--stage-2);color:#fff;border:1px solid rgba(255,255,255,0.12);}
  .a-card-head{display:flex;align-items:center;gap:12px;}
  .a-card-head b{font-size:19px;font-weight:800;}
  .a-tag{margin-left:auto;font-size:13px;font-weight:800;padding:4px 10px;border-radius:5px;white-space:nowrap;}
  .a-tag-break{background:#EEE9FF;color:#4E2FE0;}
  .a-tag-agree{background:#E6F7EE;color:#11663E;}
  .a-rows{margin-top:14px;}
  .a-rows div{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-top:1px solid #EEECF4;font-size:14.5px;color:var(--ink-2);}
  .a-rows b{color:var(--ink);}
  .a-cost b{color:var(--coral);font-size:22px;font-weight:900;}
  .a-pubs{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;}
  .a-pub{display:flex;align-items:center;gap:8px;font-size:13.5px;color:var(--ink-2);background:#F6F5FA;border-radius:6px;padding:5px 10px 5px 5px;}
  .a-pub i{font-style:normal;font-weight:800;color:var(--indigo);}
  .a-card-3 p{font-size:14px;color:#D9D2F7;margin-top:8px;}
  .a-card-3 .a-pubs .a-pub{background:rgba(255,255,255,0.08);color:#fff;}
  .a-stamp{font-size:12px;color:var(--ink-3);margin-top:10px;font-family:ui-monospace,Menlo,monospace;}

  .a-marquee{background:#fff;border-bottom:1px solid var(--rule);overflow:hidden;padding:22px 0;}
  .a-marquee p{font-size:14px;font-weight:700;color:var(--ink-2);margin-bottom:14px;}
  .a-track{display:flex;gap:14px;width:max-content;animation:a-scroll 60s linear infinite;}
  .a-marquee:hover .a-track{animation-play-state:paused;}
  .a-chip{display:flex;align-items:center;gap:10px;padding:8px 16px 8px 8px;border:1px solid var(--rule);border-radius:8px;font-weight:700;font-size:15px;background:#fff;white-space:nowrap;}
  @keyframes a-scroll{to{transform:translateX(-50%);}}
  @media (prefers-reduced-motion: reduce){.a-track{animation:none;flex-wrap:wrap;width:auto;}}

  .a-sec{padding:96px 0 0;}
  .a-sec h2{font-weight:900;font-size:clamp(40px,5vw,60px);letter-spacing:-0.025em;line-height:1.05;}
  .a-lead{font-size:19px;color:var(--ink-2);margin-top:12px;max-width:680px;}
  .a-side{display:flex;align-items:center;gap:10px;font-weight:800;font-size:16px;margin:44px 0 16px;}
  .a-side::before{content:"";width:12px;height:12px;border-radius:3px;}
  .a-side-seek::before{background:var(--indigo);}
  .a-side-hire::before{background:var(--coral);}
  .a-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .a-pick{display:flex;flex-direction:column;gap:12px;background:#fff;border:1px solid var(--rule);border-radius:10px;padding:22px;border-top:4px solid var(--indigo);}
  .a-pick-hire{border-top-color:var(--coral);}
  .a-pick-label{font-size:14px;font-weight:700;color:var(--indigo);}
  .a-pick-hire .a-pick-label{color:#D43651;}
  .a-pick-id{display:flex;align-items:center;gap:14px;}
  .a-pick-id b{font-size:24px;font-weight:800;letter-spacing:-0.01em;}
  .a-score{display:flex;align-items:center;gap:12px;}
  .a-score b{font-size:28px;font-weight:900;font-variant-numeric:tabular-nums;}
  .a-bar{flex:1;height:8px;background:#EFEDF6;border-radius:4px;overflow:hidden;}
  .a-bar i{display:block;height:100%;background:var(--indigo);border-radius:4px;transform-origin:left;animation:a-fill 1.1s ease-out both;}
  .a-pick-hire .a-bar i{background:var(--coral);}
  @keyframes a-fill{from{transform:scaleX(0);}}
  .a-pick p{font-size:15px;color:var(--ink-2);line-height:1.55;}
  .a-pick small{font-size:13.5px;color:var(--ink-3);}
  .a-go{font-weight:700;font-size:14.5px;color:var(--indigo);margin-top:auto;}
  .a-pick-hire .a-go{color:#D43651;}
  .a-rising{background:var(--stage);border-color:var(--stage);color:#fff;border-top:4px solid transparent;border-image:linear-gradient(90deg,var(--indigo),var(--coral)) 1;border-image-slice:1;border-width:4px 0 0 0;}
  .a-rising .a-pick-label{color:var(--lav);}
  .a-rising p{color:#D9D2F7;}
  .a-rising small{color:#B9AEEA;}
  .a-rising .a-go{color:var(--lav);}
  .a-rising .a-bar{background:rgba(255,255,255,0.12);}
  .a-photo{display:flex;align-items:center;gap:12px;font-size:13.5px;color:#D9D2F7;}
  .a-photo span{width:44px;height:44px;border-radius:50%;border:2px dashed rgba(255,255,255,0.45);display:flex;align-items:center;justify-content:center;font-size:10px;text-align:center;line-height:1.1;color:#B9AEEA;}
  .a-foot{height:120px;}
  @media(max-width:960px){.a-grid{grid-template-columns:1fr;}.a-stack{height:auto;display:grid;gap:14px;}.a-card{position:relative;inset:auto;width:100%;}.a-card-3{display:none;}.a-cards{grid-template-columns:1fr;}.a-nav nav{display:none;}}
`

export default function MockA() {
  const d = mockData()
  const resumeIo = d.byId['resume-io']
  const teal = d.byId['teal']
  const flex = d.benchmarks.find((l) => l.id === 'flexjobs-resume-builders')!
  const marquee = [
    ...d.all.map((t) => ({ name: t.name, domain: t.domain })),
    ...d.ats.tools.map((t) => ({ name: t.name, domain: t.domain })),
  ]
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css + logoCss + bannerCss }} />
      <MockBanner letter="A" name="Center stage" />
      <div className="a-nav">
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
          <a className="a-cta" href="#">
            Get a recommendation
          </a>
        </div>
      </div>

      <header className="a-hero">
        <div className="wrap a-grid">
          <div>
            <h1>
              Hiring is a production. We&rsquo;re here for <em>everyone</em> in&nbsp;it.
            </h1>
            <p className="a-sub">
              Independent reviews of the tools on both sides of hiring. Every score carries the date we checked it, and no vendor can pay
              for a place.
            </p>
            <div className="a-doors">
              <a className="a-door a-door-seek" href="#">
                <b>I&rsquo;m getting hired &rarr;</b>
                <span>Resume builders and ATS checkers</span>
              </a>
              <a className="a-door a-door-hire" href="#">
                <b>I&rsquo;m hiring &rarr;</b>
                <span>ATS ranked by team size</span>
              </a>
            </div>
            <p className="a-proof">
              <span className="dot" /> Evidence checked 13 Nov 2026 &middot; next check December 2026
            </p>
          </div>

          <div className="a-stack">
            <div className="a-card a-card-3">
              <div className="a-card-head">
                <Logo domain="flexjobs.com" name="FlexJobs" size={36} />
                <b>Who owns this list?</b>
              </div>
              <p>FlexJobs&rsquo; top four resume builders are all owned by its parent company.</p>
              <div className="a-pubs">
                {flex.picks.slice(0, 4).map((p) => (
                  <span className="a-pub" key={p.name ?? p.tool}>
                    {p.name ?? d.byId[p.tool!].name}
                  </span>
                ))}
              </div>
            </div>
            <div className="a-card a-card-2">
              <div className="a-card-head">
                <Logo domain={teal.domain} name={teal.name} size={40} />
                <b>{teal.name}</b>
                <span className="a-tag a-tag-agree">Agrees with the field</span>
              </div>
              <div className="a-pubs">
                {teal.counted.map((a) => (
                  <span className="a-pub" key={a.list.id}>
                    <Logo domain={PUBLISHER_DOMAINS[a.list.publication]} name={a.list.publication} size={24} />
                    {a.list.publication} <i>{a.position ? `#${a.position}` : 'pick'}</i>
                  </span>
                ))}
              </div>
            </div>
            <div className="a-card a-card-1">
              <div className="a-card-head">
                <Logo domain={resumeIo.domain} name={resumeIo.name} size={44} />
                <b>{resumeIo.name}</b>
                <span className="a-tag a-tag-break">Breaks from the pack</span>
              </div>
              <div className="a-rows">
                <div>
                  <span>Users</span>
                  <b>
                    {resumeIo.userScore?.toFixed(1)} from {formatCount(resumeIo.citableReviews)}
                  </b>
                </div>
                <div>
                  <span>Other reviewers</span>
                  <b>Zapier pick</b>
                </div>
                <div>
                  <span>Our rank</span>
                  <b>#4 of 7 builders</b>
                </div>
                <div className="a-cost">
                  <span>A year if you forget to cancel</span>
                  <b>{money(resumeIo.yearCost!.amount)}</b>
                </div>
              </div>
              <p className="a-stamp">Checked 13 Nov 2026</p>
            </div>
          </div>
        </div>
      </header>

      <div className="a-marquee" aria-label="Every tool we score">
        <div className="wrap">
          <p>Every tool we score, re-checked monthly</p>
        </div>
        <div className="a-track">
          {[...marquee, ...marquee].map((t, i) => (
            <span className="a-chip" key={`${t.name}-${i}`}>
              <Logo domain={t.domain} name={t.name} size={32} />
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <section className="wrap a-sec">
        <h2>This month&rsquo;s picks</h2>
        <p className="a-lead">The tools leading on the evidence right now, on both sides of the table.</p>
        <p className="a-side a-side-seek">For job seekers</p>
        <div className="a-cards">
          {d.seekerPicks.map(({ t, label }) => {
            const rising = t.id === d.rising.id
            return (
              <a key={t.id} href="#" className={`a-pick${rising ? ' a-rising' : ''}`}>
                <span className="a-pick-label">{label}</span>
                <span className="a-pick-id">
                  <Logo domain={t.domain} name={t.name} size={52} />
                  <b>{t.name}</b>
                </span>
                <span className="a-score">
                  <b>{t.overall?.toFixed(2)}</b>
                  <span className="a-bar">
                    <i style={{ width: `${((t.overall ?? 0) / 5) * 100}%` }} />
                  </span>
                </span>
                <p>{MOCK_LINES[t.id]}</p>
                {rising ? (
                  <span className="a-photo">
                    <span>Your photo</span>
                    Stephanie Murray&rsquo;s pick
                  </span>
                ) : (
                  <small>
                    {t.userScore?.toFixed(1)} from {formatCount(t.citableReviews)} users
                  </small>
                )}
                <span className="a-go">See the evidence &rarr;</span>
              </a>
            )
          })}
        </div>
        <p className="a-side a-side-hire">For hiring teams</p>
        <div className="a-cards">
          {d.atsPicks.map(({ t, label, line }) => (
            <a key={t.name} href="#" className="a-pick a-pick-hire">
              <span className="a-pick-label">{label}</span>
              <span className="a-pick-id">
                <Logo domain={t.domain} name={t.name} size={52} />
                <b>{t.name}</b>
              </span>
              <span className="a-score">
                <b>{t.overall_draft.toFixed(2)}</b>
                <span className="a-bar">
                  <i style={{ width: `${(t.overall_draft / 5) * 100}%` }} />
                </span>
              </span>
              <p>{line}</p>
              <small>{t.computed.user_score.toFixed(1)} user score</small>
              <span className="a-go">See the ranking &rarr;</span>
            </a>
          ))}
        </div>
      </section>
      <div className="a-foot" />
    </>
  )
}
