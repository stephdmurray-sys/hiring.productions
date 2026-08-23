export const html = `<style>
  :root{
    --hero:#1A1038; --hero-2:#241452;
    --purple:#6D28D9; --purple-dark:#5B21B6; --purple-chip:#7C3AED;
    --ink:#141420; --gray:#4B5563; --gray-lt:#6B7280;
    --card:#F4F5F7; --border:#E5E7EB; --gold:#F5A623; --green:#12B76A;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Open Sans',sans-serif;color:var(--ink);background:#fff;font-size:15px;line-height:1.65;}
  h1,h2,h3{font-family:'Poppins',sans-serif;}
  a{text-decoration:none;color:inherit;}
  .wrap{max-width:1120px;margin:0 auto;padding:0 24px;}
  .narrow{max-width:860px;}

  .navbar{background:var(--hero);color:#fff;}
  nav{display:flex;align-items:center;gap:28px;height:62px;}
  .logo{display:flex;align-items:center;gap:9px;font-family:'Poppins',sans-serif;font-weight:800;font-size:19px;}
  .logo-mark{width:30px;height:30px;border-radius:8px;background:var(--purple-chip);display:flex;align-items:center;justify-content:center;font-size:15px;}
  .nav-links{display:flex;gap:18px;align-items:center;font-size:13px;font-weight:600;color:#D6CCF5;flex:1;min-width:0;}
  .nav-links a{white-space:nowrap;}
  .nav-links a:hover{color:#fff;}
  .chev{font-size:9px;opacity:0.7;margin-left:3px;}
  .free-chip{background:var(--green);color:#fff;font-size:10px;font-weight:700;border-radius:4px;padding:2px 6px;margin-left:5px;}
  .nav-search{display:flex;background:#fff;border-radius:6px;overflow:hidden;}
  .nav-search input{border:none;outline:none;padding:9px 12px;font-family:inherit;font-size:13px;width:180px;}
  .nav-search button{border:none;background:var(--purple);color:#fff;padding:0 14px;cursor:pointer;display:flex;align-items:center;}

  .page-hero{background:linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:32px 0 38px;}
  .crumbs{font-size:12.5px;color:#8B7FBF;margin-bottom:16px;}
  .crumbs a{color:#B3A8DE;}
  .page-hero h1{font-weight:700;font-size:clamp(26px,3.4vw,38px);line-height:1.2;margin-bottom:12px;max-width:840px;}
  .byline{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:12.5px;color:#B3A8DE;}
  .dot{opacity:0.5;}
  .disclosure{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.14);border-radius:10px;padding:10px 16px;font-size:12.5px;color:#C9BFE8;margin-top:16px;max-width:840px;}

  section{padding:44px 0 0;}
  h2{font-weight:700;font-size:clamp(20px,2.4vw,26px);margin-bottom:12px;}
  .lead{font-size:15px;color:var(--gray);max-width:760px;}

  /* Quick picks */
  .picks{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px;}
  .pick{border:1px solid var(--border);border-radius:14px;padding:20px;box-shadow:0 2px 10px rgba(20,20,32,0.04);}
  .pick.winner{border:2px solid var(--purple);position:relative;}
  .pick-flag{position:absolute;top:-11px;left:18px;background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;padding:4px 12px;border-radius:999px;}
  .pick-id{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
  .favicon{width:36px;height:36px;border-radius:9px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;}
  .pick-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:16.5px;}
  .pick-best{font-size:12.5px;color:var(--gray);line-height:1.5;margin-bottom:14px;}
  .visit{display:block;text-align:center;background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;border-radius:999px;padding:11px;}
  .visit:hover{background:var(--purple-dark);}

  table{width:100%;border-collapse:collapse;margin-top:20px;font-size:13.5px;}
  th{font-family:'Poppins',sans-serif;font-weight:600;font-size:11.5px;letter-spacing:0.05em;text-transform:uppercase;color:var(--gray-lt);text-align:left;padding:10px 12px;border-bottom:2px solid var(--border);}
  td{padding:12px;border-bottom:1px solid var(--border);color:var(--gray);vertical-align:middle;}
  td b{color:var(--ink);}
  .tstars{color:var(--gold);font-size:12px;letter-spacing:1px;}
  .tscore{font-weight:700;color:var(--ink);}

  /* Full reviews */
  .review{border:1px solid var(--border);border-radius:16px;padding:clamp(22px,3vw,30px);margin-top:22px;box-shadow:0 2px 10px rgba(20,20,32,0.04);}
  .review-head{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-bottom:4px;}
  .review-id{display:flex;align-items:center;gap:12px;}
  .review-rank{font-family:'Poppins',sans-serif;font-weight:800;font-size:15px;color:var(--gray-lt);}
  .review-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:20px;}
  .etag{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:10px;letter-spacing:0.05em;text-transform:uppercase;padding:4px 10px;border-radius:999px;}
  .etag-res{background:rgba(75,85,99,0.1);color:var(--gray);}
  .review-updated{font-size:11.5px;color:var(--gray-lt);margin-bottom:14px;}
  .scores-row{display:flex;gap:22px;flex-wrap:wrap;margin-bottom:16px;padding:12px 16px;background:var(--card);border-radius:10px;}
  .sc{font-size:12.5px;color:var(--gray);}
  .sc b{color:var(--ink);font-size:13.5px;}
  .sc .st{color:var(--gold);letter-spacing:1px;font-size:12px;}
  .verdict{display:grid;gap:10px;}
  .v-row{display:flex;gap:12px;font-size:14.5px;line-height:1.6;}
  .v-key{font-family:'Poppins',sans-serif;font-weight:700;flex-shrink:0;width:110px;font-size:12px;letter-spacing:0.03em;padding-top:3px;text-transform:uppercase;}
  .v-good{color:#0A7D48;}
  .v-bad{color:#C1113A;}
  .v-watch{color:var(--gray-lt);}
  .v-val{color:var(--gray);}
  .review .visit{max-width:280px;margin-top:18px;}
  .pricing-line{font-size:13px;color:var(--gray-lt);margin-top:12px;}

  /* FAQ */
  .faq details{border:1px solid var(--border);border-radius:12px;padding:16px 20px;margin-bottom:10px;}
  .faq summary{font-family:'Poppins',sans-serif;font-weight:600;font-size:15px;cursor:pointer;}
  .faq p{font-size:14px;color:var(--gray);margin-top:10px;}

  .callout{background:var(--card);border-left:3px solid var(--purple);border-radius:0 10px 10px 0;padding:15px 20px;margin-top:22px;font-size:13.5px;color:var(--gray);}
  .callout b{color:var(--ink);}

  footer{background:var(--hero);color:#B3A8DE;margin-top:64px;padding:32px 0;font-size:12.5px;text-align:center;}

  @media(max-width:1080px){.nav-search{display:none;}}
  @media(max-width:880px){.picks{grid-template-columns:1fr;}.nav-links{display:none;}}
</style>


  <div class="navbar">
    <div class="wrap">
      <nav>
        <a href="/" class="logo"><span class="logo-mark">H</span>Hiring.Productions</a>
        <span class="nav-links">
          <a href="/for-hiring-teams">For Hiring Teams <span class="chev">&#9660;</span></a>
          <a href="/for-job-seekers">For Job Seekers <span class="chev">&#9660;</span></a>
          <a href="/how-we-review">How We Review</a>
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
      <p class="crumbs"><a href="/">Home</a> &rsaquo; <a href="/for-hiring-teams">For Hiring Teams</a> &rsaquo; Applicant Tracking Systems</p>
      <h1>14 Best Applicant Tracking Systems for Small Teams: Full Comparison 2026</h1>
      <div class="byline">
        <span>Updated August 22, 2026</span>
        <span class="dot">&middot;</span>
        <span>Scores refresh weekly</span>
        <span class="dot">&middot;</span>
        <a href="/how-we-review" style="color:#C9BFE8;text-decoration:underline;">How we review</a>
      </div>
      <p class="disclosure">
        Some links below are affiliate links: if you buy through them, the
        vendor pays us a commission. Vendors cannot pay for placement, rankings,
        or scores. <a href="/advertiser-disclosure" style="color:#fff;text-decoration:underline;">Full disclosure</a>
      </p>
    </div>
  </div>

  <section class="wrap narrow">
    <h2>The short version</h2>
    <p class="lead">
      If your team hires fewer than 50 people a year and nobody is a full-time
      recruiter, you need three things from an ATS: a pipeline your hiring
      managers understand in one meeting, pricing that does not assume an
      enterprise budget, and setup measured in days. These three deliver that.
      The other eleven are below, with the reasons you would pick them instead.
    </p>
    <div class="picks">
      <div class="pick winner">
        <span class="pick-flag">Top pick</span>
        <div class="pick-id">
          <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=breezy.hr&sz=64" width="22" height="22" alt=""></span>
          <span class="pick-name">Breezy HR</span>
        </div>
        <p class="pick-best">Best overall for teams hiring under 50 a year. Real free tier, pipeline anyone can read.</p>
        <a href="/go/breezy-hr" class="visit">Visit Breezy HR &#8599;</a>
      </div>
      <div class="pick">
        <div class="pick-id">
          <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=jazzhr.com&sz=64" width="22" height="22" alt=""></span>
          <span class="pick-name">JazzHR</span>
        </div>
        <p class="pick-best">Best step up when you outgrow the free tier and need more workflow control.</p>
        <a href="/go/jazzhr" class="visit">Visit JazzHR &#8599;</a>
      </div>
      <div class="pick">
        <div class="pick-id">
          <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=manatal.com&sz=64" width="22" height="22" alt=""></span>
          <span class="pick-name">Manatal</span>
        </div>
        <p class="pick-best">Best on a tight budget. Serious features at the lowest real price in the category.</p>
        <a href="/go/manatal" class="visit">Visit Manatal &#8599;</a>
      </div>
    </div>
  </section>

  <section class="wrap narrow">
    <h2>All 14, compared</h2>
    <table>
      <tr><th>#</th><th>Tool</th><th>Best for</th><th>Starting price</th><th>Free option</th><th>Practitioner score</th></tr>
      <tr><td>1</td><td><b>Breezy HR</b></td><td>Under 50 hires a year</td><td>$0 (Bootstrap tier)</td><td>Yes</td><td><span class="tstars">★★★★★</span> <span class="tscore">4.6</span></td></tr>
      <tr><td>2</td><td><b>JazzHR</b></td><td>Growing past the free tier</td><td>$99/mo</td><td>Trial</td><td><span class="tstars">★★★★☆</span> <span class="tscore">4.3</span></td></tr>
      <tr><td>3</td><td><b>Manatal</b></td><td>Tight budgets</td><td>$15/user/mo</td><td>Trial</td><td><span class="tstars">★★★★☆</span> <span class="tscore">4.2</span></td></tr>
      <tr><td>4</td><td><b>Workable</b></td><td>All-rounder with sourcing built in</td><td>$149/mo</td><td>Trial</td><td><span class="tstars">★★★★☆</span> <span class="tscore">4.1</span></td></tr>
      <tr><td>5</td><td><b>Pinpoint</b></td><td>Candidate experience focus</td><td>Custom</td><td>Demo</td><td><span class="tstars">★★★★☆</span> <span class="tscore">4.0</span></td></tr>
      <tr><td>6</td><td><b>Ashby</b></td><td>Scaling startups with a dedicated recruiter. See our startup guide, where it ranks higher</td><td>Custom</td><td>Demo</td><td><span class="tstars">★★★★☆</span> <span class="tscore">4.0</span></td></tr>
      <tr><td>7</td><td><b>Fountain</b></td><td>High-volume hourly hiring, not salaried small teams. See our high-volume guide</td><td>Custom</td><td>Demo</td><td><span class="tstars">★★★★☆</span> <span class="tscore">3.9</span></td></tr>
      <tr><td colspan="6" style="text-align:center;color:var(--gray-lt);font-size:12.5px;">+ 7 more in the full table (mockup truncates here)</td></tr>
    </table>
    <p class="callout"><b>Skip the enterprise suites</b> (Greenhouse, Lever, Workday) until you pass 50 hires a year or add a dedicated recruiter. You will pay for depth you cannot use and setup you cannot staff.</p>
  </section>

  <section class="wrap narrow">
    <h2>The full reviews</h2>

    <div class="review">
      <div class="review-head">
        <span class="review-id">
          <span class="review-rank">#1</span>
          <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=breezy.hr&sz=64" width="22" height="22" alt=""></span>
          <span class="review-name">Breezy HR</span>
        </span>
        <span class="etag etag-res">Research based</span>
      </div>
      <p class="review-updated">Updated August 22, 2026 &middot; Pricing verified this week</p>
      <div class="scores-row">
        <span class="sc"><span class="st">★★★★☆</span> <b>4.4</b> Market</span>
        <span class="sc"><span class="st">★★★★★</span> <b>4.5</b> User</span>
        <span class="sc"><span class="st">★★★★★</span> <b>4.6</b> Practitioner</span>
      </div>
      <div class="verdict">
        <div class="v-row"><span class="v-key v-good">Best if</span><span class="v-val">You hire under 50 people a year and the hiring managers do most of the work. The pipeline view needs no training, and the Bootstrap tier is a real product, not a demo.</span></div>
        <div class="v-row"><span class="v-key v-bad">Skip it if</span><span class="v-val">You need serious reporting, multi-entity compliance, or agency workflows. It will frustrate you within a quarter.</span></div>
        <div class="v-row"><span class="v-key">What we like</span><span class="v-val">Fastest setup in the category. Position posting to 50+ boards in one step. Pricing that scales with postings, not seats.</span></div>
        <div class="v-row"><span class="v-key v-watch">Watch for</span><span class="v-val">The automation templates tempt you to over-automate candidate email. Keep a human in the thread.</span></div>
      </div>
      <p class="pricing-line">Pricing: free Bootstrap tier (1 position) &middot; paid from $157/mo &middot; no long-term contract required</p>
      <a href="/go/breezy-hr" class="visit">Visit Breezy HR &#8599;</a>
    </div>

    <div class="review">
      <div class="review-head">
        <span class="review-id">
          <span class="review-rank">#2</span>
          <span class="favicon"><img src="https://www.google.com/s2/favicons?domain=jazzhr.com&sz=64" width="22" height="22" alt=""></span>
          <span class="review-name">JazzHR</span>
        </span>
        <span class="etag etag-res">Research based</span>
      </div>
      <p class="review-updated">Updated August 22, 2026</p>
      <div class="scores-row">
        <span class="sc"><span class="st">★★★★☆</span> <b>4.2</b> Market</span>
        <span class="sc"><span class="st">★★★★☆</span> <b>4.2</b> User</span>
        <span class="sc"><span class="st">★★★★☆</span> <b>4.3</b> Practitioner</span>
      </div>
      <div class="verdict">
        <div class="v-row"><span class="v-key v-good">Best if</span><span class="v-val">You outgrew a free tier and need real workflow control: custom stages, approvals, and reporting a small team can actually run.</span></div>
        <div class="v-row"><span class="v-key v-bad">Skip it if</span><span class="v-val">You are under 10 hires a year. You will pay for structure you do not need yet.</span></div>
        <div class="v-row"><span class="v-key">What we like</span><span class="v-val">Unlimited users on every plan, so hiring managers cost nothing to add. Clean upgrade path from scrappy to structured.</span></div>
        <div class="v-row"><span class="v-key v-watch">Watch for</span><span class="v-val">Per-job pricing on the entry plan adds up fast if you post many short-lived roles.</span></div>
      </div>
      <p class="pricing-line">Pricing: from $99/mo (Hero plan) &middot; annual contract discounts</p>
      <a href="/go/jazzhr" class="visit">Visit JazzHR &#8599;</a>
    </div>

    <p class="callout" style="text-align:center;"><b>Mockup truncates here.</b> The real guide continues through all 14 with the same format.</p>
  </section>

  <section class="wrap narrow faq">
    <h2>Questions small teams actually ask</h2>
    <details><summary>Do I even need an ATS under 10 hires a year?</summary><p>Usually not a paid one. Breezy&rsquo;s free tier or a shared inbox with discipline covers you until scheduling and candidate volume start costing you real hours. The switch point is when candidates start falling through cracks you cannot see.</p></details>
    <details><summary>What does an ATS actually cost for a small team?</summary><p>Between $0 and $300 a month for the tools on this list. Anyone quoting you five figures a year is selling enterprise software to the wrong buyer.</p></details>
    <details><summary>How long does setup take?</summary><p>For every tool in our top 5: days, not months. If a vendor proposes an implementation project, that is a signal the product is built for a bigger company than yours.</p></details>
  </section>

  <footer>
    &copy; 2026 Hiring.Productions &middot; How We Review &middot; Advertiser Disclosure &middot; Privacy &middot; Terms
  </footer>

`
