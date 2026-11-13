import type { Metadata } from 'next'
import { Logo, MockBanner, bannerCss, logoCss, mockData, money, PUBLISHER_DOMAINS } from '../mock-kit'
import { STATUS_LABEL, formatCount } from '@/lib/evidence'

export const metadata: Metadata = { title: 'Mockup B: Both sides', robots: { index: false, follow: false } }

const css = `
  :root{--indigo:#6C47FF;--indigo-deep:#4B2BD6;--coral:#FF4F6A;--coral-deep:#2A0B14;--ink:#1A1A22;--ink-2:#4A4A5A;--ink-3:#77778A;--paper:#FAF8F3;--rule:#E6E2D8;--ok:#1F8A55;}
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--paper);color:var(--ink);font-family:inherit;-webkit-font-smoothing:antialiased;}
  a{color:inherit;text-decoration:none;}
  .wrap{max-width:1240px;margin:0 auto;padding:0 32px;}

  .b-nav .wrap{display:flex;align-items:center;gap:28px;height:72px;}
  .wordmark{font-weight:800;font-size:22px;letter-spacing:-0.01em;}
  .wordmark i{font-style:normal;color:var(--coral);}
  .b-nav nav{display:flex;gap:26px;margin-left:auto;font-size:15px;font-weight:600;color:var(--ink-2);}

  .b-head{padding:48px 0 36px;}
  .b-head h1{font-weight:900;font-size:clamp(44px,6.4vw,84px);line-height:1;letter-spacing:-0.03em;max-width:1040px;text-wrap:balance;}
  .b-head p{font-size:20px;color:var(--ink-2);margin-top:20px;max-width:640px;line-height:1.55;}

  .b-split{display:grid;grid-template-columns:1fr 1fr;gap:0;border-radius:14px;overflow:hidden;}
  .b-side{padding:36px 36px 32px;display:flex;flex-direction:column;gap:18px;min-height:440px;}
  .b-seek{background:var(--indigo);color:#fff;}
  .b-hire{background:var(--coral);color:var(--coral-deep);}
  .b-side-k{font-size:15px;font-weight:800;opacity:0.9;}
  .b-side h2{font-size:clamp(32px,3.4vw,44px);font-weight:900;letter-spacing:-0.02em;line-height:1.05;}
  .b-logos{display:flex;flex-wrap:wrap;gap:10px;}
  .b-logos .mlogo{box-shadow:0 2px 0 rgba(0,0,0,0.12);border:0;}
  .b-feature{margin-top:auto;display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;padding:18px;border-radius:10px;}
  .b-seek .b-feature{background:rgba(255,255,255,0.12);}
  .b-hire .b-feature{background:rgba(255,255,255,0.28);}
  .b-feature b{display:block;font-size:20px;font-weight:800;}
  .b-feature span{font-size:15px;opacity:0.9;}
  .b-go{display:inline-flex;align-self:flex-start;font-weight:800;font-size:15.5px;padding:13px 18px;border-radius:6px;}
  .b-seek .b-go{background:#fff;color:var(--indigo-deep);}
  .b-hire .b-go{background:var(--coral-deep);color:#fff;}

  .b-ticker{background:var(--ink);color:#fff;overflow:hidden;white-space:nowrap;margin-top:28px;border-radius:10px;}
  .b-ticker-track{display:inline-flex;gap:48px;padding:14px 0;animation:b-scroll 55s linear infinite;font-family:ui-monospace,Menlo,monospace;font-size:14px;}
  .b-ticker:hover .b-ticker-track{animation-play-state:paused;}
  .b-ticker-track span b{color:#FF8DA0;font-weight:700;}
  .b-ticker-track span i{font-style:normal;color:#B6A6FF;}
  @keyframes b-scroll{to{transform:translateX(-50%);}}
  @media (prefers-reduced-motion: reduce){.b-ticker-track{animation:none;}}

  .b-sec{padding:96px 0 0;}
  .b-sec h2.b-h{font-weight:900;font-size:clamp(40px,5vw,60px);letter-spacing:-0.025em;line-height:1.05;}
  .b-lead{font-size:19px;color:var(--ink-2);margin-top:12px;max-width:700px;}
  .b-pubs{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:32px;}
  .b-pub{display:flex;align-items:center;gap:12px;padding:14px;background:#fff;border:1px solid var(--rule);border-radius:10px;}
  .b-pub b{display:block;font-size:15.5px;font-weight:800;}
  .b-pub span{font-size:13px;color:var(--ink-3);}
  .b-pub.counts{border-color:#BFE6CF;}
  .b-pub.counts span{color:var(--ok);font-weight:700;}
  .b-pub.out{opacity:0.62;}

  .b-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:32px;}
  .b-card{background:#fff;border:1px solid var(--rule);border-radius:10px;padding:22px;display:flex;flex-direction:column;gap:12px;}
  .b-card-id{display:flex;align-items:center;gap:14px;}
  .b-card-id b{font-size:22px;font-weight:800;}
  .b-card-label{font-size:14px;font-weight:700;color:var(--indigo);}
  .b-meter{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;font-size:13.5px;color:var(--ink-3);}
  .b-meter i{display:block;height:8px;border-radius:4px;background:#EFEDF6;overflow:hidden;}
  .b-meter i::after{content:"";display:block;height:100%;width:var(--w);background:var(--indigo);border-radius:4px;}
  .b-meter b{color:var(--ink);font-weight:800;font-variant-numeric:tabular-nums;}
  .b-card p{font-size:15px;color:var(--ink-2);}
  .b-foot{height:120px;}
  @media(max-width:900px){.b-split,.b-row{grid-template-columns:1fr;}.b-nav nav{display:none;}}
`

export default function MockB() {
  const d = mockData()
  const top = d.byId['teal']
  const manatal = d.atsByName['Manatal']
  const seekerLogos = ['teal', 'kickresume', 'flowcv', 'jobscan', 'rezi', 'resume-worded', 'enhancv', 'novoresume'].map((id) => d.byId[id])
  const hireLogos = ['Manatal', 'Pinpoint', 'Ashby', 'Greenhouse', 'Breezy HR', 'Teamtailor', 'Workable', 'BambooHR'].map((n) => d.atsByName[n]).filter(Boolean)
  const resumeIo = d.byId['resume-io']
  const ticker = [
    <>
      <b>Resume.io</b> renews every 4 weeks: <b>{money(resumeIo.yearCost!.amount)}</b> a year if you forget
    </>,
    <>
      <i>Fast Company</i> names Teal #1
    </>,
    <>
      <i>FlexJobs</i>&rsquo; top four are all owned by its parent company: not counted
    </>,
    <>
      FlowCV: 4.9 from 83 users, Stephanie&rsquo;s up-and-coming pick
    </>,
    <>
      Manatal reviews up <b>153%</b> in a year, the fastest of 14 ATS
    </>,
    <>
      Kickresume: <b>$96</b> a year, flat
    </>,
  ]
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css + logoCss + bannerCss }} />
      <MockBanner letter="B" name="Both sides" />
      <div className="b-nav">
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

      <div className="wrap">
        <header className="b-head">
          <h1>Hiring is a production. We&rsquo;re here for everyone in&nbsp;it.</h1>
          <p>Independent reviews of the tools on both sides of the table, with every score dated and no vendor able to pay for a place.</p>
        </header>

        <div className="b-split">
          <section className="b-side b-seek">
            <span className="b-side-k">I&rsquo;m getting hired</span>
            <h2>Resume builders and ATS checkers, ranked on evidence</h2>
            <div className="b-logos">
              {seekerLogos.map((t) => (
                <Logo key={t.id} domain={t.domain} name={t.name} size={52} />
              ))}
            </div>
            <div className="b-feature">
              <Logo domain={top.domain} name={top.name} size={56} />
              <div>
                <b>Best overall: {top.name}</b>
                <span>
                  {top.userScore?.toFixed(1)} from {formatCount(top.citableReviews)} users, on a free tier that is a real product
                </span>
              </div>
            </div>
            <a className="b-go" href="#">
              Open the resume tools guide &rarr;
            </a>
          </section>
          <section className="b-side b-hire">
            <span className="b-side-k">I&rsquo;m hiring</span>
            <h2>Applicant tracking systems, ranked by team size</h2>
            <div className="b-logos">
              {hireLogos.map((t) => (
                <Logo key={t.name} domain={t.domain} name={t.name} size={52} />
              ))}
            </div>
            <div className="b-feature">
              <Logo domain={manatal.domain} name={manatal.name} size={56} />
              <div>
                <b>Small teams pick: {manatal.name}</b>
                <span>Reviews up 153% in a year, at $15 per user</span>
              </div>
            </div>
            <a className="b-go" href="#">
              Open the ATS guide &rarr;
            </a>
          </section>
        </div>

        <div className="b-ticker" aria-label="This month in the evidence file">
          <div className="b-ticker-track">
            {[...ticker, ...ticker].map((node, i) => (
              <span key={i} aria-hidden={i >= ticker.length ? true : undefined}>
                {node}
              </span>
            ))}
          </div>
        </div>

        <section className="b-sec">
          <h2 className="b-h">The lists we check against, every month</h2>
          <p className="b-lead">
            {d.counting.length} count. The rest are shown with the reason, so you can see who&rsquo;s behind the &ldquo;best of&rdquo; list
            you&rsquo;re reading.
          </p>
          <div className="b-pubs">
            {d.benchmarks.map((l) => (
              <div key={l.id} className={`b-pub ${l.status === 'counts' ? 'counts' : 'out'}`}>
                <Logo domain={PUBLISHER_DOMAINS[l.publication]} name={l.publication} size={40} />
                <div>
                  <b>{l.publication}</b>
                  <span>{l.status === 'counts' ? 'Counts' : STATUS_LABEL[l.status]}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="b-sec">
          <h2 className="b-h">This month&rsquo;s picks for job seekers</h2>
          <div className="b-row">
            {d.seekerPicks.map(({ t, label }) => (
              <div className="b-card" key={t.id}>
                <span className="b-card-label">{label}</span>
                <span className="b-card-id">
                  <Logo domain={t.domain} name={t.name} size={48} />
                  <b>{t.name}</b>
                </span>
                <span className="b-meter">
                  Overall
                  <i style={{ ['--w' as string]: `${((t.overall ?? 0) / 5) * 100}%` }} />
                  <b>{t.overall?.toFixed(2)}</b>
                </span>
                <span className="b-meter">
                  Users
                  <i style={{ ['--w' as string]: `${((t.userScore ?? 0) / 5) * 100}%` }} />
                  <b>{t.userScore?.toFixed(1)}</b>
                </span>
                <p>{t.yearCost ? `A paid year: ${money(t.yearCost.amount)}` : ''}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="b-foot" />
    </>
  )
}
