export const html = `<style>
  :root{
    --hero:#1A1038; --hero-2:#241452;
    --purple:#6D28D9; --purple-dark:#5B21B6; --purple-chip:#7C3AED;
    --ink:#141420; --gray:#4B5563; --gray-lt:#6B7280;
    --card:#F4F5F7; --border:#E5E7EB; --gold:#F5A623; --green:#12B76A;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Open Sans',sans-serif;color:var(--ink);background:#fff;font-size:15px;line-height:1.6;}
  h1,h2,h3{font-family:'Poppins',sans-serif;}
  a{text-decoration:none;color:inherit;}
  .wrap{max-width:1120px;margin:0 auto;padding:0 24px;}

  /* Nav — identical to homepage */
  .navbar{background:var(--hero);color:#fff;}
  nav{display:flex;align-items:center;gap:28px;height:62px;}
  .logo{display:flex;align-items:center;gap:9px;font-family:'Poppins',sans-serif;font-weight:800;font-size:19px;}
  .logo-mark{width:30px;height:30px;border-radius:8px;background:var(--purple-chip);display:flex;align-items:center;justify-content:center;font-size:15px;}
  .nav-links{display:flex;gap:18px;align-items:center;font-size:13px;font-weight:600;color:#D6CCF5;flex:1;min-width:0;}
  .nav-links a{white-space:nowrap;}
  .nav-links a:hover{color:#fff;}
  .nav-links a.active{color:#fff;}
  .chev{font-size:9px;opacity:0.7;margin-left:3px;}
  .free-chip{background:var(--green);color:#fff;font-size:10px;font-weight:700;border-radius:4px;padding:2px 6px;margin-left:5px;}
  .nav-search{display:flex;background:#fff;border-radius:6px;overflow:hidden;}
  .nav-search input{border:none;outline:none;padding:9px 12px;font-family:inherit;font-size:13px;width:180px;}
  .nav-search button{border:none;background:var(--purple);color:#fff;padding:0 14px;cursor:pointer;display:flex;align-items:center;}

  /* Page hero */
  .page-hero{background:linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:34px 0 40px;}
  .crumbs{font-size:12.5px;color:#8B7FBF;margin-bottom:18px;}
  .crumbs a{color:#B3A8DE;}
  .crumbs a:hover{color:#fff;}
  .page-hero h1{font-weight:700;font-size:clamp(28px,3.6vw,40px);margin-bottom:10px;}
  .page-hero .sub{font-size:14.5px;color:#C9BFE8;max-width:640px;line-height:1.7;margin-bottom:18px;}
  .byline{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:12.5px;color:#B3A8DE;}
  .byline .dot{opacity:0.5;}
  .badge-live{display:inline-flex;align-items:center;gap:6px;background:rgba(18,183,106,0.15);color:#6EE7A8;font-weight:700;font-size:11px;letter-spacing:0.05em;text-transform:uppercase;border-radius:999px;padding:4px 12px;}
  .badge-live .pulse{width:7px;height:7px;border-radius:50%;background:#12B76A;}

  /* Layout: sticky ToC + content */
  .layout{display:grid;grid-template-columns:230px 1fr;gap:44px;padding:44px 0 0;}
  .toc{position:sticky;top:24px;align-self:start;border-right:1px solid var(--border);padding-right:20px;}
  .toc-h{font-family:'Poppins',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--gray-lt);margin-bottom:12px;}
  .toc a{display:block;font-size:13.5px;color:var(--gray);padding:6px 0;border-left:2px solid transparent;padding-left:10px;margin-left:-12px;}
  .toc a.on{color:var(--purple);font-weight:700;border-left:2px solid var(--purple);}
  .toc a:hover{color:var(--purple);}

  .content section{margin-bottom:48px;}
  .content h2{font-weight:700;font-size:22px;margin-bottom:12px;padding-top:6px;}
  .lead{font-size:14.5px;color:var(--gray);max-width:660px;margin-bottom:6px;}

  .score-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:20px;}
  .scard{background:var(--card);border-radius:12px;padding:20px;}
  .scard .pct{font-family:'Poppins',sans-serif;font-weight:800;font-size:22px;color:var(--purple);}
  .scard h3{font-weight:600;font-size:15px;margin:4px 0 6px;}
  .scard p{font-size:13px;color:var(--gray);line-height:1.55;}
  .scard .src{font-size:11.5px;color:var(--gray-lt);margin-top:10px;padding-top:10px;border-top:1px solid var(--border);}

  /* Sample scorecard */
  .sample{border:1px solid var(--border);border-radius:14px;padding:20px 22px;margin-top:22px;box-shadow:0 2px 10px rgba(20,20,32,0.05);max-width:520px;}
  .sample-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:4px;}
  .sample-id{display:flex;align-items:center;gap:10px;}
  .favicon{width:34px;height:34px;border-radius:8px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;}
  .sample-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:16px;}
  .etag{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:10px;letter-spacing:0.05em;text-transform:uppercase;padding:4px 10px;border-radius:999px;}
  .etag-demo{background:rgba(18,183,106,0.12);color:#0A7D48;}
  .sample-note{font-size:11.5px;color:var(--gray-lt);margin-bottom:12px;}
  .rating{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:12.5px;color:var(--gray);}
  .stars{position:relative;display:inline-block;font-size:13px;letter-spacing:1px;color:#DDD;line-height:1;}
  .stars::before{content:"★★★★★";}
  .stars-fill{position:absolute;left:0;top:0;overflow:hidden;color:var(--gold);white-space:nowrap;}
  .stars-fill::before{content:"★★★★★";}
  .rating b{color:var(--ink);font-size:12.5px;}
  .rating .when{margin-left:auto;font-size:11px;color:var(--gray-lt);}
  .sample-link{font-size:12px;color:var(--purple);font-weight:700;}

  .evidence{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:20px;}
  .ecard{border:1px solid var(--border);border-radius:12px;padding:18px;}
  .ecard .etag{margin-bottom:10px;}
  .etag-sub{background:rgba(109,40,217,0.1);color:var(--purple);}
  .etag-res{background:rgba(75,85,99,0.1);color:var(--gray);}
  .ecard p{font-size:12.5px;color:var(--gray);line-height:1.55;}

  table{width:100%;border-collapse:collapse;margin-top:18px;font-size:13.5px;}
  th{font-family:'Poppins',sans-serif;font-weight:600;font-size:11.5px;letter-spacing:0.05em;text-transform:uppercase;color:var(--gray-lt);text-align:left;padding:9px 12px;border-bottom:2px solid var(--border);}
  td{padding:11px 12px;border-bottom:1px solid var(--border);color:var(--gray);}
  td b{color:var(--ink);}
  .pill{display:inline-block;background:rgba(109,40,217,0.08);color:var(--purple);font-weight:700;font-size:11.5px;border-radius:999px;padding:3px 11px;}

  .callout{background:var(--card);border-left:3px solid var(--purple);border-radius:0 10px 10px 0;padding:15px 20px;margin-top:20px;font-size:13.5px;color:var(--gray);}
  .callout b{color:var(--ink);}

  .money{background:var(--hero);color:#fff;border-radius:14px;padding:28px clamp(20px,3.5vw,36px);}
  .money h2{color:#fff;font-size:20px;}
  .money p{font-size:13.5px;color:#C9BFE8;line-height:1.75;}

  .vendor-cta{border:1px solid var(--border);border-radius:14px;padding:24px clamp(20px,3.5vw,32px);margin-top:20px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;}
  .vendor-cta h2{font-size:17px;margin-bottom:2px;}
  .vendor-cta p{font-size:13px;color:var(--gray);}
  .vbtn{background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:12px 24px;border-radius:999px;white-space:nowrap;}

  /* Footer — full, matching homepage */
  footer{background:var(--hero);color:#B3A8DE;margin-top:64px;padding:52px 0 30px;font-size:13px;}
  .fcols{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;}
  .fabout{max-width:280px;line-height:1.7;}
  .fh{font-family:'Poppins',sans-serif;color:#fff;font-weight:600;font-size:12.5px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;}
  .flinks a{display:block;margin-bottom:8px;}
  .flinks a:hover{color:#fff;}
  .fbase{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:38px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);font-size:12px;color:#8B7FBF;}

  @media(max-width:1080px){
    .nav-search{display:none;}
  }
  @media(max-width:880px){
    .layout{grid-template-columns:1fr;}
    .toc{display:none;}
    .score-cards,.evidence{grid-template-columns:1fr;}
    .nav-links{display:none;}
    .fcols{grid-template-columns:1fr 1fr;}
  }
</style>


  <div class="navbar">
    <div class="wrap">
      <nav>
        <a href="/" class="logo"><span class="logo-mark">H</span>Hiring.Productions</a>
        <span class="nav-links">
          <a href="/for-hiring-teams">For Hiring Teams <span class="chev">&#9660;</span></a>
          <a href="/for-job-seekers">For Job Seekers <span class="chev">&#9660;</span></a>
          <a href="/how-we-review" class="active">How We Review</a>
          <a href="/for-vendors">For Vendors <span class="chev">&#9660;</span></a>
          <a href="/consulting">Get a Recommendation<span class="free-chip">FREE</span></a>
        </span>
        <span class="nav-search">
          <input type="text" placeholder="Search hiring software...">
          <button aria-label="Search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.5-4.5"/></svg></button>
        </span>
      </nav>
    </div>
  </div>

  <div class="page-hero">
    <div class="wrap">
      <p class="crumbs"><a href="/">Home</a> &rsaquo; How We Review</p>
      <h1>How we review hiring software</h1>
      <p class="sub">
        Every score on this site can be traced to its inputs. This page explains
        exactly where our numbers come from, how often they refresh, and what
        vendors can and cannot influence.
      </p>
      <div class="byline">
        <span class="badge-live"><span class="pulse"></span> Live scoring system</span>
        <span>Last updated August 22, 2026</span>
        <span class="dot">&middot;</span>
        <span>By the Hiring.Productions editorial team</span>
      </div>
    </div>
  </div>

  <div class="wrap layout">
    <aside class="toc">
      <p class="toc-h">On this page</p>
      <a href="#scores" class="on">The three scores</a>
      <a href="#example">What it looks like</a>
      <a href="#evidence">Evidence levels</a>
      <a href="#refresh">Refresh schedule</a>
      <a href="#money">How we make money</a>
      <a href="#vendors">For vendors</a>
    </aside>

    <div class="content">
      <section id="scores">
        <h2>Three scores, three different sources</h2>
        <p class="lead">
          Every tool carries three scores, calculated independently and never
          averaged into one number, because a tool can be popular and still be
          wrong for you.
        </p>
        <div class="score-cards">
          <div class="scard">
            <p class="pct">25%</p>
            <h3>Market Score</h3>
            <p>Footprint and momentum: web-traffic rank, total review volume, and review velocity, meaning how fast real users are adopting the tool right now, measured against dated archive baselines.</p>
            <p class="src"><b>Source:</b> Tranco traffic rank, public review counts, and Internet Archive baselines. Refreshed weekly.</p>
          </div>
          <div class="scard">
            <p class="pct">35%</p>
            <h3>User Score</h3>
            <p>What daily users report: satisfaction, support quality, and the complaints that repeat.</p>
            <p class="src"><b>Source:</b> synthesized monthly from public user reviews. Our words, never copied.</p>
          </div>
          <div class="scard">
            <p class="pct">40%</p>
            <h3>Practitioner Score</h3>
            <p>The recruiter&rsquo;s eye: how the tool holds up in real hiring workflows, and what only demos well.</p>
            <p class="src"><b>Source:</b> 18 years of in-house talent acquisition. Re-scored quarterly.</p>
          </div>
        </div>
        <p class="callout">
          <b>Weights apply to ranking position only.</b> All three scores are
          always displayed separately on every review, so you can weigh them
          your own way.
        </p>
      </section>

      <section id="example">
        <h2>What it looks like on a review</h2>
        <p class="lead">Every scorecard shows the three scores, the evidence level, and when each input last refreshed.</p>
        <div class="sample">
          <div class="sample-head">
            <span class="sample-id">
              <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=breezy.hr&sz=64" width="22" height="22" alt=""></span>
              <span class="sample-name">Breezy HR</span>
            </span>
            <span class="etag etag-res">Research based</span>
          </div>
          <p class="sample-note">Best for teams hiring under 50 people a year</p>
          <div class="rating"><span class="stars"><span class="stars-fill" style="width:60%"></span></span><b>3.0</b> Market Score <span class="when">refreshed Aug 22, 2026</span></div>
          <div class="rating"><span class="stars"><span class="stars-fill" style="width:89%"></span></span><b>4.5</b> User Score <span class="when">synthesized Aug 2026</span></div>
          <div class="rating"><span class="stars"><span class="stars-fill" style="width:90%"></span></span><b>4.5</b> Practitioner Score <span class="when">in final review</span></div>
          <a href="#" class="sample-link">How these scores are calculated &#8599;</a>
        </div>
      </section>

      <section id="evidence">
        <h2>Every review states its evidence level</h2>
        <p class="lead">We tell you exactly what our verdict rests on. No review pretends to be more than it is.</p>
        <div class="evidence">
          <div class="ecard">
            <span class="etag etag-res">Research based</span>
            <p>The vendor walked us through the live product and answered our structured questionnaire. Our strongest evidence level.</p>
          </div>
          <div class="ecard">
            <span class="etag etag-sub">Vendor submitted</span>
            <p>The vendor completed our written submittal: pricing, features, ideal customer, product materials.</p>
          </div>
          <div class="ecard">
            <span class="etag etag-res">Research based</span>
            <p>Built from documentation, pricing pages, public user reviews, and market data. The vendor has not yet engaged.</p>
          </div>
        </div>
      </section>

      <section id="refresh">
        <h2>A living scoring system</h2>
        <p class="lead">Reviews rot. Ours are wired to notice, and every review displays when each input was last refreshed.</p>
        <table>
          <tr><th>Signal</th><th>Refresh</th><th>How</th></tr>
          <tr>
            <td><b>Market signals</b></td>
            <td><span class="pill">Weekly</span></td>
            <td>Automated pull, every Monday</td>
          </tr>
          <tr>
            <td><b>Pricing and packaging changes</b></td>
            <td><span class="pill">Weekly</span></td>
            <td>Automated monitoring of every vendor&rsquo;s pricing page. Changes flag the review for update</td>
          </tr>
          <tr>
            <td><b>User sentiment</b></td>
            <td><span class="pill">Monthly</span></td>
            <td>Public reviews re-read and re-synthesized</td>
          </tr>
          <tr>
            <td><b>Practitioner scores and rankings</b></td>
            <td><span class="pill">Quarterly</span></td>
            <td>Full category re-evaluation, plus immediate review after major vendor changes</td>
          </tr>
        </table>
        <p class="callout">
          <b>If a review goes stale, it says so.</b> Any review more than one
          quarter past its re-evaluation date is flagged on the page until it is
          re-scored.
        </p>
      </section>

      <section id="money">
        <div class="money">
          <h2>How this site makes money</h2>
          <p>
            Some links on this site are affiliate links: if you buy through
            them, the vendor pays us a commission. That is the entire business
            model, and it never touches the scores. Vendors cannot pay to be
            reviewed, ranked, or recommended. Listing is free. Demos are
            welcome. Scores are earned. When a specific link earns us a
            commission, the page says so.
          </p>
        </div>
      </section>

      <section id="vendors">
        <div class="vendor-cta">
          <div>
            <h2>Vendors: get your evidence level up</h2>
            <p>Submit your product or book a demo walkthrough. Both are free, and both make your review more complete.</p>
          </div>
          <a href="#" class="vbtn">Submit your product</a>
        </div>
      </section>
    </div>
  </div>

  <footer>
    <div class="wrap">
      <div class="fcols">
        <div>
          <a href="#" class="logo" style="color:#fff;margin-bottom:14px;"><span class="logo-mark">H</span>Hiring.Productions</a>
          <p class="fabout">Independent reviews of hiring software for companies and job seekers. Researched, tested, and updated quarterly.</p>
          <p style="margin-top:14px;font-size:12.5px;">hello@hiring.productions</p>
        </div>
        <div class="flinks">
          <p class="fh">Hiring team software</p>
          <a href="/guides/best-ats-for-small-teams">Applicant Tracking Systems</a>
          <a href="#">Recruiting Software</a>
          <a href="#">Assessment Tools</a>
          <a href="#">Recruiter Training</a>
        </div>
        <div class="flinks">
          <p class="fh">Job seeker tools</p>
          <a href="#">Resume Builders</a>
          <a href="#">ATS Resume Checkers</a>
          <a href="#">Interview Practice</a>
          <a href="#">Career Coaching</a>
        </div>
        <div class="flinks">
          <p class="fh">Company</p>
          <a href="/how-we-review">How We Review</a>
          <a href="/advertiser-disclosure">Advertiser Disclosure</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div class="fbase">
        <span>&copy; 2026 Hiring.Productions. All rights reserved.</span>
        <span>Privacy Policy &middot; Terms &middot; Sitemap</span>
      </div>
    </div>
  </footer>

`
