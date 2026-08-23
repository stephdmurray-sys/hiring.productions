export const html = `<style>
  :root{
    --hero:#1A1038; --hero-2:#241452;
    --purple:#6D28D9; --purple-dark:#5B21B6; --purple-chip:#7C3AED;
    --ink:#141420; --gray:#4B5563; --gray-lt:#6B7280; --faint:#9CA3AF;
    --card:#F4F5F7; --border:#E5E7EB; --gold:#F5A623; --green:#12B76A;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Open Sans',sans-serif;color:var(--ink);background:#fff;font-size:15px;line-height:1.55;padding-bottom:56px;}
  h1,h2,h3,.poppins{font-family:'Poppins',sans-serif;}
  a{text-decoration:none;color:inherit;}
  .wrap{max-width:1120px;margin:0 auto;padding:0 24px;}

  /* Nav */
  .navbar{background:var(--hero);color:#fff;}
  nav{display:flex;align-items:center;gap:28px;height:62px;}
  .logo{display:flex;align-items:center;gap:9px;font-family:'Poppins',sans-serif;font-weight:800;font-size:19px;letter-spacing:0.02em;}
  .logo-mark{width:30px;height:30px;border-radius:8px;background:var(--purple-chip);display:flex;align-items:center;justify-content:center;font-size:15px;}
  .nav-links{display:flex;gap:18px;align-items:center;font-size:13px;font-weight:600;color:#D6CCF5;flex:1;min-width:0;}
  .nav-links a{white-space:nowrap;}
  .nav-links a:hover{color:#fff;}
  .chev{font-size:9px;opacity:0.7;margin-left:3px;}
  .free-chip{background:var(--green);color:#fff;font-size:10px;font-weight:700;border-radius:4px;padding:2px 6px;margin-left:5px;letter-spacing:0.03em;}
  .nav-search{display:flex;background:#fff;border-radius:6px;overflow:hidden;}
  .nav-search input{border:none;outline:none;padding:9px 12px;font-family:inherit;font-size:13px;width:180px;}
  .nav-search button{border:none;background:var(--purple);color:#fff;padding:0 14px;font-size:14px;cursor:pointer;}

  /* Hero */
  .hero{background:linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:58px 0 46px;}
  .hero-grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:40px;align-items:center;}
  .hero h1{font-weight:700;font-size:clamp(34px,4.2vw,50px);line-height:1.15;letter-spacing:-0.01em;margin-bottom:18px;}
  .hero-sub{font-size:14.5px;color:#C9BFE8;max-width:460px;margin-bottom:26px;line-height:1.65;}
  .hero-cta{display:inline-block;background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:600;font-size:13.5px;letter-spacing:0.08em;text-transform:uppercase;padding:15px 30px;border-radius:999px;}
  .hero-cta:hover{background:var(--purple-chip);}
  .hero-doors{display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:520px;}
  .hdoor{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:14px;padding:18px 18px 16px;}
  .hdoor-label{font-family:'Poppins',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;color:#B3A8DE;margin-bottom:4px;}
  .hdoor-desc{font-size:12.5px;color:#C9BFE8;margin-bottom:14px;line-height:1.45;}
  .hdoor-btn{display:block;text-align:center;font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:12px 10px;border-radius:999px;}
  .hdoor-btn-fill{background:var(--purple);color:#fff;}
  .hdoor-btn-fill:hover{background:var(--purple-chip);}
  .hdoor-btn-line{background:#fff;color:var(--hero);}
  .hdoor-btn-line:hover{background:#EDE9FE;}
  .featured{display:flex;align-items:center;gap:22px;margin-top:38px;flex-wrap:wrap;}
  .featured-label{font-size:10.5px;font-weight:700;letter-spacing:0.12em;color:#8B7FBF;}
  .press{font-family:'Poppins',sans-serif;font-weight:700;font-size:13px;color:#B3A8DE;opacity:0.85;}
  .press.serif{font-family:Georgia,serif;font-style:italic;}

  /* Photo collage */
  .collage{position:relative;height:400px;}
  .polaroid{position:absolute;background:#fff;padding:6px 6px 6px;border-radius:6px;box-shadow:0 12px 30px rgba(0,0,0,0.35);}
  .polaroid img{display:block;object-fit:cover;border-radius:3px;}

  /* Best software section */
  .best{padding:64px 0 0;text-align:center;}
  .best h2{font-weight:700;font-size:clamp(26px,3.2vw,36px);letter-spacing:-0.01em;margin-bottom:34px;}
  .top-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:left;}
  .tcard{background:#fff;border:1px solid var(--border);border-radius:14px;padding:0 22px 22px;box-shadow:0 2px 10px rgba(20,20,32,0.05);position:relative;}
  .ribbon{display:flex;align-items:flex-start;gap:10px;padding-top:18px;margin-bottom:14px;}
  .ribbon-tag{background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:11.5px;letter-spacing:0.06em;padding:5px 11px;border-radius:5px;flex-shrink:0;}
  .ribbon-desc{font-size:12px;font-weight:600;color:var(--gray);line-height:1.45;padding-top:3px;}
  .tool-id{display:flex;align-items:center;gap:12px;margin:6px 0 14px;}
  .favicon{width:40px;height:40px;border-radius:10px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.08);}
  .tool-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:18px;}
  .rating{display:flex;align-items:center;gap:8px;margin-bottom:7px;font-size:12.5px;color:var(--gray);}
  .stars{position:relative;display:inline-block;font-size:14px;letter-spacing:1px;color:#DDD;line-height:1;}
  .stars::before{content:"★★★★★";}
  .stars-fill{position:absolute;left:0;top:0;overflow:hidden;color:var(--gold);white-space:nowrap;}
  .stars-fill::before{content:"★★★★★";}
  .rating b{color:var(--ink);font-size:13px;}
  .visit{display:block;text-align:center;background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:600;font-size:12.5px;letter-spacing:0.1em;text-transform:uppercase;border-radius:999px;padding:13px;margin-top:16px;}
  .visit:hover{background:var(--purple-dark);}
  .visit span{font-size:13px;}

  /* Categories */
  .cats{padding:72px 0 0;}
  .cats-head{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;margin-bottom:30px;}
  .cats h2{font-weight:700;font-size:clamp(26px,3.2vw,36px);line-height:1.2;}
  .cats-intro{font-size:13.5px;color:var(--gray);line-height:1.7;padding-top:8px;}
  .cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .ccard{background:var(--card);border-radius:14px;padding:28px 24px 24px;transition:box-shadow .15s;}
  .ccard:hover{box-shadow:0 6px 18px rgba(20,20,32,0.1);}
  .logo-stack{display:flex;margin-bottom:18px;}
  .lchip{width:44px;height:44px;border-radius:50%;background:#fff;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.12);display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;font-size:13px;margin-right:-10px;}
  .ccard h3{font-weight:600;font-size:16.5px;line-height:1.35;margin-bottom:6px;}
  .ccard .upd{font-size:12px;color:var(--gray-lt);}
  .side-label{font-family:'Poppins',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:var(--purple);margin:34px 0 14px;}

  /* Methodology */
  .method{background:var(--card);margin-top:72px;padding:56px 0;}
  .method h2{font-weight:700;font-size:clamp(24px,3vw,32px);margin-bottom:26px;}
  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .step{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(20,20,32,0.05);}
  .step-n{font-family:'Poppins',sans-serif;font-weight:800;font-size:26px;color:var(--purple);margin-bottom:8px;}
  .step h3{font-weight:600;font-size:15.5px;margin-bottom:6px;}
  .step p{font-size:13.5px;color:var(--gray);line-height:1.6;}

  /* Stats */
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:60px 0 0;text-align:center;}
  .stat-n{font-family:'Poppins',sans-serif;font-weight:800;font-size:32px;color:var(--hero);}
  .stat-l{font-size:13px;color:var(--gray-lt);margin-top:2px;}

  /* Newsletter */
  .news{background:var(--hero);border-radius:18px;margin:68px auto 0;padding:42px clamp(24px,5vw,54px);display:flex;justify-content:space-between;align-items:center;gap:30px;flex-wrap:wrap;color:#fff;}
  .news h2{font-weight:700;font-size:22px;margin-bottom:4px;}
  .news p{font-size:13.5px;color:#C9BFE8;}
  .news-form{display:flex;gap:10px;flex-wrap:wrap;}
  .news-input{border:none;border-radius:999px;padding:13px 20px;font-family:inherit;font-size:13.5px;min-width:250px;}
  .news-btn{background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:600;font-size:12.5px;letter-spacing:0.08em;text-transform:uppercase;padding:13px 26px;border-radius:999px;border:none;cursor:pointer;}

  /* Footer */
  footer{background:var(--hero);color:#B3A8DE;margin-top:72px;padding:52px 0 30px;font-size:13px;}
  .fcols{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;}
  .fabout{max-width:280px;line-height:1.7;}
  .fh{font-family:'Poppins',sans-serif;color:#fff;font-weight:600;font-size:12.5px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;}
  .flinks a{display:block;margin-bottom:8px;}
  .flinks a:hover{color:#fff;}
  .fbase{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:38px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);font-size:12px;color:#8B7FBF;}

  /* Sticky banner */
  .sticky{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid var(--border);box-shadow:0 -4px 16px rgba(0,0,0,0.07);padding:10px 20px;display:flex;justify-content:center;align-items:center;gap:16px;font-size:13px;z-index:20;}
  .sticky b{font-weight:700;}
  .sticky-btn{background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:600;font-size:11.5px;letter-spacing:0.06em;text-transform:uppercase;padding:8px 18px;border-radius:999px;white-space:nowrap;}

  @media(max-width:1080px){
    .nav-search{display:none;}
  }
  @media(max-width:920px){
    .hero-grid{grid-template-columns:1fr;}
    .collage{display:none;}
    .hero-doors{max-width:none;}
  }
  @media(max-width:520px){
    .hero-doors{grid-template-columns:1fr;}
    .top-cards,.cat-grid,.steps{grid-template-columns:1fr;}
    .cats-head{grid-template-columns:1fr;}
    .stats{grid-template-columns:repeat(2,1fr);}
    .fcols{grid-template-columns:1fr 1fr;}
    .nav-links{display:none;}
  }

  /* Track pages */
  body{padding-bottom:0;}
  .track-hero{background:linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:44px 0 48px;}
  .crumb{font-size:12.5px;color:#8B7FBF;margin-bottom:14px;}
  .crumb a{color:#B3A8DE;}
  .track-hero h1{font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(30px,3.8vw,44px);margin-bottom:12px;}
  .track-sub{font-size:14.5px;color:#C9BFE8;max-width:640px;line-height:1.7;}
  .hero-meta{display:flex;gap:24px;flex-wrap:wrap;margin-top:24px;font-size:12.5px;color:#B3A8DE;font-weight:600;}
  .hero-meta span{display:flex;align-items:center;gap:8px;}
  .sec{padding:60px 0 0;}
  .sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:26px;flex-wrap:wrap;}
  .sec-head h2{font-weight:700;font-size:clamp(24px,3vw,34px);letter-spacing:-0.01em;}
  .sec-head p{font-size:13.5px;color:var(--gray);max-width:460px;line-height:1.6;}
  .gcard-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
  .gcard{background:#fff;border:1px solid var(--border);border-radius:14px;padding:24px 22px 20px;display:flex;flex-direction:column;box-shadow:0 2px 10px rgba(20,20,32,0.04);transition:box-shadow .15s,transform .15s;}
  a.gcard:hover{box-shadow:0 10px 26px rgba(20,20,32,0.12);transform:translateY(-2px);}
  .gcard-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
  .icon-tile{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .badge{font-family:'Poppins',sans-serif;font-weight:700;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:4px 9px;border-radius:5px;}
  .badge-live{background:#E7F8F0;color:#0E9F5D;}
  .badge-next{background:#EDE9FE;color:#6D28D9;}
  .badge-plan{background:#F1F2F4;color:#6B7280;}
  .gcard h3{font-weight:600;font-size:16px;line-height:1.35;margin-bottom:7px;}
  .gcard-desc{font-size:12.5px;color:var(--gray);line-height:1.6;margin-bottom:18px;}
  .gcard-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:14px;border-top:1px solid var(--border);}
  .mini-stack{display:flex;padding-left:2px;}
  .mchip{width:28px;height:28px;border-radius:50%;background:#fff;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.16);display:flex;align-items:center;justify-content:center;margin-right:-8px;}
  .mchip img{border-radius:50%;display:block;}
  .gcard-cta{font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;color:var(--purple);white-space:nowrap;}
  .gcard-cta.muted{color:var(--gray-lt);}
  .foot-note{font-size:11.5px;color:var(--faint);font-weight:600;}
  .fit-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
  .fit-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:20px 18px 18px;box-shadow:0 2px 8px rgba(20,20,32,0.04);display:flex;flex-direction:column;}
  .fit-q{font-family:'Poppins',sans-serif;font-weight:600;font-size:13.5px;line-height:1.4;margin-bottom:8px;}
  .fit-a{font-size:12.5px;color:var(--gray);line-height:1.55;margin-bottom:14px;}
  .fit-link{font-family:'Poppins',sans-serif;font-weight:600;font-size:12px;color:var(--purple);margin-top:auto;}
  .method-link{display:inline-block;margin-top:22px;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;color:var(--purple);}
  @media(max-width:920px){.gcard-grid{grid-template-columns:repeat(2,1fr);}.fit-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:520px){.gcard-grid,.fit-grid{grid-template-columns:1fr;}}
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
  
  <div class="track-hero">
    <div class="wrap">
      <p class="crumb"><a href="/">Home</a> &rsaquo; For hiring teams</p>
      <h1>For hiring teams</h1>
      <p class="track-sub">The software and training behind well-run hiring: ATS, sourcing, assessment, and recruiter development. Reviewed with transparent scoring and evidence levels.</p>
      <div class="hero-meta"><span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B7FBF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5.5"/></svg> 6 buyer guides in production</span><span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B7FBF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5.5"/></svg> 40+ tools researched</span><span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B7FBF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5.5"/></svg> Scores refreshed weekly</span></div>
    </div>
  </div>
  <section class="sec wrap">
    <div class="sec-head">
      <h2>Buyer guides</h2>
      <p>Each guide compares the whole category, names a winner for a specific situation, and shows the scoring. Start with the one that matches how you hire.</p>
    </div>
    <div class="gcard-grid"><a href="/guides/best-ats-for-small-teams" class="gcard"><span class="gcard-top"><span class="logo-stack" style="margin-bottom:0;"><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=breezy.hr&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=jazzhr.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=manatal.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=pinpointhq.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span></span><span class="badge badge-live">Live</span></span><h3>Applicant Tracking Systems, Ranked by Team Size</h3><p class="gcard-desc">The system every other tool plugs into. 14 platforms ranked for small, growing, and scaling teams.</p><span class="gcard-foot"><span class="foot-note">14 systems compared</span><span class="gcard-cta">Read the guide &rarr;</span></span></a><a href="#news" class="gcard"><span class="gcard-top"><span class="logo-stack" style="margin-bottom:0;"><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=ashbyhq.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=greenhouse.io&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=lever.co&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=workable.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span></span><span class="badge badge-next">Coming Next</span></span><h3>Recruiting Software for Startups</h3><p class="gcard-desc">Built to scale from 5 hires a year to 50 without replatforming. Ashby leads the field.</p><span class="gcard-foot"><span class="foot-note">Research underway</span><span class="gcard-cta muted">Get notified &rarr;</span></span></a><a href="#news" class="gcard"><span class="gcard-top"><span class="logo-stack" style="margin-bottom:0;"><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=socialtalent.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=aihr.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=linkedin.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span></span><span class="badge badge-next">Coming Next</span></span><h3>Recruiter Training and Certifications</h3><p class="gcard-desc">Sourcing, screening, and closing skills for recruiters and the managers who interview with them.</p><span class="gcard-foot"><span class="foot-note">Research underway</span><span class="gcard-cta muted">Get notified &rarr;</span></span></a><a href="#news" class="gcard"><span class="gcard-top"><span class="logo-stack" style="margin-bottom:0;"><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=testgorilla.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=vervoe.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=hirevue.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span></span><span class="badge badge-plan">Planned</span></span><h3>Candidate Assessment Tools</h3><p class="gcard-desc">Skills tests and structured interviews that predict performance better than a resume can.</p><span class="gcard-foot"><span class="foot-note">Research queued</span><span class="gcard-cta muted">Get notified &rarr;</span></span></a><a href="#news" class="gcard"><span class="gcard-top"><span class="logo-stack" style="margin-bottom:0;"><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=fountain.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=paradox.ai&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=harri.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span></span><span class="badge badge-plan">Planned</span></span><h3>High-Volume Hiring Tools</h3><p class="gcard-desc">Hourly and frontline hiring at scale, where speed to offer decides who you get. Fountain leads the field.</p><span class="gcard-foot"><span class="foot-note">Research queued</span><span class="gcard-cta muted">Get notified &rarr;</span></span></a><a href="#news" class="gcard"><span class="gcard-top"><span class="logo-stack" style="margin-bottom:0;"><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=vivian.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=incrediblehealth.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span><span class="lchip" style="margin-right:-9px;"><img src="https://www.google.com/s2/favicons?domain=apploi.com&sz=64" width="22" height="22" alt="" style="border-radius:50%;"></span></span><span class="badge badge-plan">Planned</span></span><h3>Healthcare and Clinical Recruiting</h3><p class="gcard-desc">Sourcing and credentialing clinicians, from first license check to signed offer.</p><span class="gcard-foot"><span class="foot-note">Research queued</span><span class="gcard-cta muted">Get notified &rarr;</span></span></a></div>
  </section>
  <section class="sec wrap">
    <div class="sec-head">
      <h2>Top rated for small teams right now</h2>
      <p>Computed from sourced public data on August 22, 2026. Practitioner scores are in final review; full receipts in the ATS guide.</p>
    </div>
    <div class="top-cards"><div class="tcard"><div class="ribbon"><span class="ribbon-tag">TOP</span><span class="ribbon-desc">Fastest-rising ATS in the field, at $15 per user</span></div><div class="tool-id"><span class="favicon"><img src="https://www.google.com/s2/favicons?domain=manatal.com&sz=64" width="26" height="26" alt=""></span><span class="tool-name">Manatal</span></div><div class="rating"><span class="stars"><span class="stars-fill" style="width:81%"></span></span><b>4.0</b> Market Score</div><div class="rating"><span class="stars"><span class="stars-fill" style="width:95%"></span></span><b>4.7</b> User Score</div><div class="rating"><span class="stars"><span class="stars-fill" style="width:88%"></span></span><b>4.4</b> Practitioner Score</div><a href="/go/manatal" class="visit">Visit Website <span>&#8599;</span></a></div><div class="tcard"><div class="ribbon"><span class="ribbon-tag">TOP</span><span class="ribbon-desc">Highest user scores of all 14 systems reviewed</span></div><div class="tool-id"><span class="favicon"><img src="https://www.google.com/s2/favicons?domain=pinpointhq.com&sz=64" width="26" height="26" alt=""></span><span class="tool-name">Pinpoint</span></div><div class="rating"><span class="stars"><span class="stars-fill" style="width:70%"></span></span><b>3.5</b> Market Score</div><div class="rating"><span class="stars"><span class="stars-fill" style="width:95%"></span></span><b>4.8</b> User Score</div><div class="rating"><span class="stars"><span class="stars-fill" style="width:86%"></span></span><b>4.3</b> Practitioner Score</div><a href="/go/pinpoint" class="visit">Visit Website <span>&#8599;</span></a></div><div class="tcard"><div class="ribbon"><span class="ribbon-tag">TOP</span><span class="ribbon-desc">Best free tier for teams under 50 hires a year</span></div><div class="tool-id"><span class="favicon"><img src="https://www.google.com/s2/favicons?domain=breezy.hr&sz=64" width="26" height="26" alt=""></span><span class="tool-name">Breezy HR</span></div><div class="rating"><span class="stars"><span class="stars-fill" style="width:60%"></span></span><b>3.0</b> Market Score</div><div class="rating"><span class="stars"><span class="stars-fill" style="width:89%"></span></span><b>4.5</b> User Score</div><div class="rating"><span class="stars"><span class="stars-fill" style="width:90%"></span></span><b>4.5</b> Practitioner Score</div><a href="/go/breezy-hr" class="visit">Visit Website <span>&#8599;</span></a></div></div>
  </section>
  <section class="sec wrap" style="padding-bottom:8px;">
    <div class="sec-head">
      <h2>Start with your situation</h2>
      <p>Skip the category research. These are the short answers.</p>
    </div>
    <div class="fit-grid"><div class="fit-card" style="border-top:3px solid #6D28D9;"><p class="fit-q">Hiring under 50 people a year?</p><p class="fit-a">Manatal leads the current standings; Breezy HR has the best free tier. The guide compares all 14.</p><a href="/guides/best-ats-for-small-teams" class="fit-link">Read the ATS guide &rarr;</a></div><div class="fit-card" style="border-top:3px solid #2563EB;"><p class="fit-q">Scaling a startup fast?</p><p class="fit-a">Ashby is what the strongest startup recruiting teams run. Full guide in research.</p><a href="/go/ashby" class="fit-link">Visit Ashby &rarr;</a></div><div class="fit-card" style="border-top:3px solid #E11D48;"><p class="fit-q">Hiring hourly at volume?</p><p class="fit-a">Fountain is built for frontline throughput and speed to offer. Full guide in research.</p><a href="/go/fountain" class="fit-link">Visit Fountain &rarr;</a></div><div class="fit-card" style="border-top:3px solid #12B76A;"><p class="fit-q">Not sure where to start?</p><p class="fit-a">Tell us the role, the stage, and the budget. We recommend a stack for free.</p><a href="/consulting" class="fit-link">Get a recommendation &rarr;</a></div></div>
  </section>
  <section class="method">
    <div class="wrap">
      <h2>How these reviews work</h2>
      <div class="steps">
        <div class="step"><div class="step-n">1</div><h3>Research the field</h3><p>Every serious platform in the category gets mapped: pricing, integrations, contract terms, and deal-breakers. No pay-to-play placement.</p></div>
        <div class="step"><div class="step-n">2</div><h3>Score on evidence</h3><p>Three weighted scores per tool, and every number traces to a source. Where the evidence is thin, the score says so.</p></div>
        <div class="step"><div class="step-n">3</div><h3>Refresh weekly</h3><p>Pricing pages, market rankings, and community sentiment get re-checked on a schedule, so a 2026 score never quietly goes stale.</p></div>
      </div>
      <a href="/how-we-review" class="method-link">Read the full methodology &rarr;</a>
    </div>
  </section>

  <section class="wrap" id="news">
    <div class="news">
      <div><h2>Get new guides first</h2><p>One email when a guide goes live or a ranking changes. No filler.</p></div>
      <form class="news-form" onsubmit="return false;"><input type="email" class="news-input" placeholder="Work email"><button class="news-btn">Subscribe</button></form>
    </div>
  </section>

  <footer>
    <div class="wrap">
      <div class="fcols">
        <div>
          <a href="#" class="logo" style="color:#fff;margin-bottom:14px;"><span class="logo-mark">H</span>Hiring.Productions</a>
          <p class="fabout">Independent reviews of hiring software for companies and job seekers. Researched, tested, and updated quarterly.</p>
          <p style="margin-top:14px;font-size:12.5px;">hello@hiring.productions</p>
          <div style="display:flex;gap:12px;margin-top:14px;">
            <a href="#" aria-label="LinkedIn" style="width:30px;height:30px;border-radius:6px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="#C9BFE8"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2-.04-4.65-2.83-4.65-2.83 0-3.27 2.2-3.27 4.5V24H8V8z"/></svg></a>
            <a href="#" aria-label="YouTube" style="width:30px;height:30px;border-radius:6px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="#C9BFE8"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg></a>
            <a href="#" aria-label="TikTok" style="width:30px;height:30px;border-radius:6px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;"><svg width="13" height="13" viewBox="0 0 24 24" fill="#C9BFE8"><path d="M12.5.02h4.1c.3 1.7 1.3 3.2 2.7 4.2 1 .7 2.2 1.1 3.5 1.2v4.1c-1.5 0-3-.4-4.3-1-.6-.3-1.2-.7-1.7-1.1v7.7c0 2-.8 4-2.2 5.4a7.6 7.6 0 0 1-8.7 1.5 7.6 7.6 0 0 1-4.3-6.9c0-2 .8-4 2.2-5.4a7.6 7.6 0 0 1 6.5-2.1v4.2a3.5 3.5 0 0 0-3.9 1.3 3.5 3.5 0 0 0 2.9 5.5 3.5 3.5 0 0 0 3.2-3.5V.02z"/></svg></a>
          </div>
        </div>
        <div class="flinks">
          <p class="fh">Hiring team software</p>
          <a href="/guides/best-ats-for-small-teams">Applicant Tracking Systems</a>
          <a href="#">Recruiting Software</a>
          <a href="#">Assessment Tools</a>
          <a href="#">Background Checks</a>
        </div>
        <div class="flinks">
          <p class="fh">Job seeker tools</p>
          <a href="#">Resume Builders</a>
          <a href="#">ATS Resume Checkers</a>
          <a href="#">Interview Practice</a>
          <a href="#">Job Search Trackers</a>
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
  </footer>`
