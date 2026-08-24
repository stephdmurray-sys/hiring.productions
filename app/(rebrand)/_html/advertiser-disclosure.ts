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
              </nav>
    </div>
  </div>
  <div class="wrap" style="max-width:760px;padding:52px 24px 72px;">
    <h1 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:32px;margin-bottom:18px;">Advertiser disclosure</h1>
    <p style="color:#4B5563;margin-bottom:14px;">Some links on Hiring.Productions are affiliate links. If you click one and buy, the vendor pays us a commission. It costs you nothing extra.</p>
    <p style="color:#4B5563;margin-bottom:14px;">That is the entire business model, and it never touches the scores. Vendors cannot pay to be reviewed, to be ranked, or to be recommended. Listing is free. Demos are welcome. Scores are earned.</p>
    <p style="color:#4B5563;margin-bottom:14px;">Some tools we rank highly, including some number one picks, have no affiliate relationship with us at all. We rank them anyway, because the rankings are the product.</p>
    <p style="color:#4B5563;">Questions: <b>hello@hiring.productions</b>. See also <a href="/how-we-review" style="color:#6D28D9;font-weight:700;">how we review</a>.</p>
  </div>
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
