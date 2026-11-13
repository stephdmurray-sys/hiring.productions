/**
 * Styles for the resume tools guide. Base rules match the approved
 * rebrand mockups; the elevated guide layer below overrides and extends them.
 */
import { brand } from './brand'

export const siteCss = brand(`
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
  .chip{font-family:'Poppins',sans-serif;font-weight:700;font-size:10.5px;padding:3px 8px;border-radius:5px;white-space:nowrap;}
  .chip-up{background:#E7F8F0;color:#0A7D48;}
  .chip-flat{background:#F1F2F4;color:#6B7280;}
  .chip-na{background:#F1F2F4;color:#9CA3AF;}
  .vid-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:22px;}
  .vid-card{border:1px solid var(--border);border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(20,20,32,0.04);background:#fff;}
  .vid-card iframe{display:block;width:100%;aspect-ratio:16/9;border:0;}
  .vid-meta{padding:14px 16px 16px;}
  .vid-tool{font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;margin-bottom:4px;}
  .vid-src{font-size:12px;color:var(--gray-lt);}
  .vtag{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:9.5px;letter-spacing:0.06em;text-transform:uppercase;padding:3px 8px;border-radius:5px;margin-bottom:8px;}
  .vtag-third{background:#EDE9FE;color:#6D28D9;}
  .vtag-vendor{background:#F1F2F4;color:#6B7280;}
  @media(max-width:880px){.vid-grid{grid-template-columns:1fr;}}
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

  @media(max-width:1080px){}
  @media(max-width:880px){.picks{grid-template-columns:1fr;}.nav-links{display:none;}}

  /* Responsive data tables + author strip */
  .tscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:20px;}
  .tscroll table{min-width:640px;margin-top:0;}
  .tscroll th,.tscroll td{padding:11px 8px;}
  @media(max-width:880px){
    .tscroll th,.tscroll td{padding:10px 9px;font-size:12.5px;}
  }
  .author-strip{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px 18px;box-shadow:0 2px 8px rgba(20,20,32,0.04);}
  .author-avatar{width:44px;height:44px;border-radius:50%;background:var(--hero);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;flex-shrink:0;}
  .author-strip p{font-size:13px;color:var(--gray);line-height:1.55;}

  /* ================= Elevated guide layer =================
     Type, spacing and components for the evidence-led guide.
     Follows the five design rules: one focal point per section,
     generous whitespace, one accent color, size-led hierarchy,
     one primary action per moment. */
  :root{ --faint:#9CA3AF; --lav:#EEEAFF; --lav-2:#C9BCFF; --page:#F9F8F4; --coral:#FF4F6A; --coral-soft:#FFE9ED; --coral-dark:#E23A56; }
  body{-webkit-font-smoothing:antialiased;}
  .faint{color:var(--faint);}
  .muted{color:var(--gray-lt);font-size:12.5px;}
  .nowrap{white-space:nowrap;}
  .logo-img{display:inline-block;vertical-align:middle;border-radius:5px;flex-shrink:0;}

  .navbar{position:relative;z-index:30;}
  .nav-links a.on{color:#fff;}

  /* Hero */
  .g-hero{background:radial-gradient(1200px 500px at 85% -10%,#3B1F86 0%,rgba(59,31,134,0) 60%),linear-gradient(160deg,var(--hero) 55%,var(--hero-2));color:#fff;padding:clamp(48px,7vw,88px) 0 clamp(44px,6vw,72px);}
  .g-hero .crumbs{font-size:13px;color:#8B7FBF;margin-bottom:22px;}
  .g-hero .crumbs a{color:#B3A8DE;}
  .g-hero h1{text-wrap:balance;font-family:'Poppins',sans-serif;font-weight:800;font-size:clamp(40px,6.5vw,72px);line-height:1.04;letter-spacing:-0.03em;max-width:900px;}
  .dek{font-size:clamp(17px,1.6vw,20px);line-height:1.6;color:#D6CCF5;max-width:720px;margin-top:18px;}
  .glance{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(255,255,255,0.12);border-radius:14px;overflow:hidden;margin-top:36px;max-width:900px;}
  .glance div{background:rgba(26,16,56,0.72);padding:18px 20px;}
  .glance b{display:block;font-family:'Poppins',sans-serif;font-weight:800;font-size:clamp(24px,2.6vw,32px);line-height:1.1;color:#fff;}
  .glance span{display:block;font-size:12.5px;color:#B3A8DE;margin-top:4px;}
  .g-hero .byline{display:block;font-size:13px;color:#B3A8DE;margin-top:22px;}
  .g-hero .byline a{color:#fff;text-decoration:underline;text-underline-offset:3px;}
  .g-hero .disclosure{font-size:12.5px;color:#C9BFE8;margin-top:10px;max-width:760px;background:none;border:0;padding:0;}
  .g-hero .disclosure a{color:#fff;text-decoration:underline;text-underline-offset:3px;}

  .demo-note{background:#FFF8EB;border-bottom:1px solid #F3E2BF;color:#6B4E0E;font-size:13px;line-height:1.55;padding:11px 0;}
  .demo-note b{color:#4A3609;}

  /* Sticky in-page nav */
  .toc-bar{position:sticky;top:0;z-index:25;background:rgba(249,248,244,0.92);-webkit-backdrop-filter:saturate(1.4) blur(10px);backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid var(--border);}
  .toc-bar .wrap{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding-top:10px;padding-bottom:10px;}
  .toc-bar .wrap::-webkit-scrollbar{display:none;}
  .toc-bar a{flex-shrink:0;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;color:var(--gray);padding:8px 14px;border-radius:999px;transition:background .15s,color .15s;}
  .toc-bar a:hover{background:#fff;color:var(--ink);}
  .toc-bar a:focus-visible,.btn:focus-visible,.textlink:focus-visible,.break-card:focus-visible{outline:3px solid var(--purple);outline-offset:2px;}

  /* Sections and type */
  section,section.wrap{padding-top:clamp(80px,10vw,128px);padding-bottom:0;scroll-margin-top:64px;}
  h2{text-wrap:balance;font-family:'Poppins',sans-serif;font-weight:700;font-size:clamp(40px,6vw,64px);line-height:1.06;letter-spacing:-0.03em;margin-bottom:20px;color:var(--ink);}
  .h3{font-family:'Poppins',sans-serif;font-weight:700;font-size:24px;letter-spacing:-0.01em;margin:56px 0 8px;color:var(--ink);}
  .lead{font-size:18px;line-height:1.7;color:var(--gray);max-width:720px;}
  .sublead{font-size:15px;color:var(--gray);max-width:720px;line-height:1.65;}
  .footnote{font-size:12.5px;color:var(--gray-lt);line-height:1.65;margin-top:18px;max-width:860px;}
  .footnote a{color:var(--purple);font-weight:600;}

  /* Buttons */
  .btn{display:block;text-align:center;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;letter-spacing:0.02em;border-radius:999px;padding:13px 18px;transition:transform .15s,background .15s,box-shadow .15s;}
  .btn-solid{background:var(--purple);color:#fff;box-shadow:0 6px 18px rgba(109,40,217,0.28);}
  .btn-solid:hover{background:var(--purple-dark);transform:translateY(-1px);}
  .btn-outline{border:1.5px solid var(--border);color:var(--ink);background:#fff;}
  .btn-outline:hover{border-color:var(--purple);color:var(--purple);}
  .btn-light{background:#fff;color:var(--hero);}
  .btn-light:hover{transform:translateY(-1px);}
  .textlink{display:inline-block;margin-top:18px;font-family:'Poppins',sans-serif;font-weight:600;font-size:13.5px;color:var(--purple);}
  .textlink:hover{text-decoration:underline;text-underline-offset:3px;}

  /* Picks */
  .picks{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px;}
  .pick{display:flex;flex-direction:column;background:#fff;border:1px solid var(--border);border-radius:18px;padding:26px;box-shadow:0 1px 2px rgba(20,20,32,0.04),0 8px 24px rgba(20,20,32,0.04);transition:transform .18s,box-shadow .18s;}
  .pick:hover{transform:translateY(-2px);box-shadow:0 1px 2px rgba(20,20,32,0.04),0 14px 32px rgba(20,20,32,0.08);}
  .pick-label{font-family:'Poppins',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--purple);margin-bottom:16px;}
  .pick-id{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
  .pick-logo{width:48px;height:48px;border-radius:12px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .pick-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:22px;letter-spacing:-0.01em;}
  .pick-best{font-size:14.5px;color:var(--gray);line-height:1.6;margin-bottom:24px;}
  .pick .btn{margin-top:auto;}
  .pick-stats{display:flex;gap:20px;padding:6px 0 16px;margin-bottom:16px;border-bottom:1px solid #F1F2F4;font-size:12.5px;color:var(--gray-lt);}
  .pick-stats b{display:block;font-family:'Poppins',sans-serif;font-weight:800;font-size:22px;color:var(--ink);letter-spacing:-0.01em;}
  .pick-rising .pick-stats{border-bottom-color:rgba(255,255,255,0.12);color:#B3A8DE;}
  .pick-rising .pick-stats b{color:#fff;}
  .pick-rising{background:radial-gradient(500px 260px at 100% 0%,#3B1F86 0%,rgba(59,31,134,0) 70%),var(--hero);border-color:var(--hero);color:#fff;}
  .pick-rising .pick-label{color:#C4B5FD;}
  .pick-rising .pick-logo{border-color:rgba(255,255,255,0.18);}
  .pick-rising .pick-best{color:#D6CCF5;font-size:15px;}
  .rising-by{display:flex;align-items:center;gap:12px;font-size:12.5px;color:#B3A8DE;line-height:1.45;margin-bottom:20px;}
  .rising-by b{color:#fff;font-family:'Poppins',sans-serif;font-size:13.5px;}
  .rising-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#C084FC);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;flex-shrink:0;}

  /* Agreement grid */
  .tscroll{margin-top:32px;border:1px solid var(--border);border-radius:16px;background:#fff;}
  .tscroll table{margin-top:0;}
  .tscroll th{background:#FBFBFC;}
  .tscroll tr:last-child td{border-bottom:0;}
  .tool-cell{white-space:nowrap;}
  .tool-cell a{font-weight:700;color:var(--ink);margin-left:8px;}
  .tool-cell a:hover{color:var(--purple);}
  .agree-grid td{vertical-align:middle;}
  .agree-grid th.col-list{text-align:center;line-height:1.3;}
  .agree-grid th.col-list span{display:block;font-weight:500;letter-spacing:0;text-transform:none;font-size:11px;color:var(--faint);margin-top:2px;}
  .agree-grid td.cell{text-align:center;}
  .dot-named{display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:26px;padding:0 8px;border-radius:999px;background:var(--purple);color:#fff;font-family:'Poppins',sans-serif;font-weight:700;font-size:11.5px;}
  .dot-unknown{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:1.5px dashed #D1D5DB;color:var(--faint);font-weight:700;font-size:12px;}
  .dot-no{display:inline-block;width:12px;height:12px;border-radius:50%;border:1.5px solid #D1D5DB;}
  .dot-na{color:#D1D5DB;font-size:20px;line-height:1;}
  .dot-muted{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#F1F2F4;color:var(--gray);font-weight:700;font-size:12px;}
  .legend{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;margin-top:14px;font-size:12.5px;color:var(--gray-lt);}
  .legend .dot-named,.legend .dot-unknown{transform:scale(0.85);}
  .stance{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.04em;text-transform:uppercase;padding:5px 11px;border-radius:999px;white-space:nowrap;}
  .stance-agrees{background:#F1F2F4;color:var(--ink);}
  .stance-breaks{background:var(--lav);color:var(--purple);}
  .stance-thin{background:#fff;color:var(--gray-lt);border:1px dashed #D1D5DB;}

  .breaks-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:20px;}
  .break-card{display:flex;flex-direction:column;border:1px solid var(--border);border-radius:16px;padding:22px 24px;background:#fff;transition:transform .18s,box-shadow .18s,border-color .18s;}
  .break-card:hover{transform:translateY(-2px);border-color:var(--lav-2);box-shadow:0 12px 28px rgba(20,20,32,0.07);}
  .bc-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:17px;display:flex;align-items:center;gap:10px;margin-bottom:8px;color:var(--ink);}
  .bc-line{font-size:14.5px;color:var(--gray);line-height:1.6;flex:1;}
  .bc-more{margin-top:14px;font-size:13px;font-weight:600;color:var(--purple);}

  .owner-note{margin-top:40px;padding:28px 30px;border-radius:18px;background:var(--hero);color:#D6CCF5;font-size:16px;line-height:1.7;}
  .on-eyebrow{font-family:'Poppins',sans-serif;font-weight:700;font-size:20px;color:#fff;margin-bottom:8px;letter-spacing:-0.01em;}

  .lists-details{margin-top:24px;border:1px solid var(--border);border-radius:14px;padding:18px 22px;background:#fff;}
  .lists-details summary{font-family:'Poppins',sans-serif;font-weight:600;font-size:15px;cursor:pointer;color:var(--ink);}
  .lists-details .tscroll{border:0;margin-top:16px;}
  .lists-details table td{vertical-align:top;font-size:13px;}
  .lists-details table a{color:var(--purple);}
  .lstatus{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:10px;letter-spacing:0.05em;text-transform:uppercase;padding:3px 9px;border-radius:999px;white-space:nowrap;background:#F1F2F4;color:var(--gray);}
  .lstatus-counts{background:var(--lav);color:var(--purple);}

  /* Rankings */
  .rank-table .rank-n{font-family:'Poppins',sans-serif;font-weight:700;color:var(--ink);}
  .rank-table tbody tr{transition:background .12s;}
  .rank-table tbody tr:hover{background:#FBFAFF;}

  /* Cost chart */
  .cost-chart{margin-top:36px;display:grid;gap:4px;background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px 22px;}
  .cost-row{display:grid;grid-template-columns:170px 1fr 84px;grid-template-areas:"name track amt" ". how how";align-items:center;column-gap:16px;padding:10px 0;border-bottom:1px solid #F1F2F4;}
  .cost-row:last-child{border-bottom:0;}
  .cost-name{grid-area:name;display:flex;align-items:center;gap:9px;font-family:'Poppins',sans-serif;font-weight:600;font-size:14px;color:var(--ink);}
  .cost-track{grid-area:track;height:12px;background:#F4F3F8;border-radius:999px;overflow:hidden;}
  .cost-fill{display:block;height:100%;border-radius:999px;background:var(--lav-2);}
  .cost-trap .cost-fill{background:var(--purple);}
  .cost-amt{grid-area:amt;text-align:right;font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;color:var(--ink);font-variant-numeric:tabular-nums;}
  .cost-how{grid-area:how;font-size:12.5px;color:var(--gray-lt);margin-top:4px;}
  .cost-trap .cost-how b{color:var(--purple);font-weight:700;}
  .callout{margin-top:28px;border-left:3px solid var(--purple);background:#fff;border-radius:0 14px 14px 0;padding:18px 22px;font-size:15px;line-height:1.7;color:var(--gray);}

  /* Videos */
  .vid-grid{gap:20px;margin-top:36px;}
  .vid-card{border-radius:18px;transition:transform .18s,box-shadow .18s;}
  .vid-card:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(20,20,32,0.08);}
  .vid-meta{padding:16px 18px 18px;}
  .vid-tool{font-size:16px;}
  .vfacade{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;cursor:pointer;background-color:var(--hero);background-size:cover;background-position:center;}
  .vfacade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,16,56,0) 40%,rgba(26,16,56,0.55));}
  .vplay{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.94);display:flex;align-items:center;justify-content:center;z-index:1;box-shadow:0 4px 18px rgba(0,0,0,0.25);transition:transform .15s;}
  .vfacade:hover .vplay{transform:translate(-50%,-50%) scale(1.06);}
  .vfacade:focus-visible{outline:3px solid var(--purple);outline-offset:2px;}
  .vid-title{font-size:13.5px;color:var(--gray);line-height:1.5;margin-top:2px;}
  .vid-foot{font-size:11.5px;color:var(--faint);margin-top:10px;}
  .vtag-third{background:var(--lav);color:var(--purple);}
  .vtag-vendor{background:#F1F2F4;color:var(--gray);}
  .vtag-compare{background:#fff;color:var(--ink);border:1px solid var(--border);}

  /* Evidence file */
  .efiles{margin-top:32px;display:grid;gap:12px;}
  .efile{background:#fff;border:1px solid var(--border);border-radius:16px;scroll-margin-top:72px;transition:border-color .15s,box-shadow .15s;}
  .efile[open]{border-color:var(--lav-2);box-shadow:0 14px 34px rgba(20,20,32,0.07);}
  .efile summary{list-style:none;display:grid;grid-template-columns:86px 36px 1fr auto auto 20px;align-items:center;gap:14px;padding:18px 22px;cursor:pointer;}
  .efile summary::-webkit-details-marker{display:none;}
  .efile summary:focus-visible{outline:3px solid var(--purple);outline-offset:-3px;border-radius:16px;}
  .ef-rank{font-family:'Poppins',sans-serif;font-weight:800;font-size:15px;color:var(--ink);line-height:1.15;}
  .ef-seg{display:block;font-weight:600;font-size:11px;color:var(--faint);letter-spacing:0.04em;text-transform:uppercase;}
  .ef-logo{width:36px;height:36px;border-radius:10px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;}
  .ef-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:18px;color:var(--ink);}
  .ef-score{font-family:'Poppins',sans-serif;font-weight:800;font-size:18px;color:var(--ink);font-variant-numeric:tabular-nums;}
  .ef-chev{color:var(--faint);transition:transform .2s;display:flex;}
  .efile[open] .ef-chev{transform:rotate(180deg);}
  .ef-body{padding:4px 22px 24px;border-top:1px solid #F1F2F4;}
  .ef-call{font-size:16px;line-height:1.65;color:var(--ink);margin:18px 0 18px;}
  .sbars{display:grid;gap:10px;padding:16px 18px;background:#FBFBFC;border-radius:12px;}
  .sbar{display:grid;grid-template-columns:100px 1fr 64px;align-items:center;gap:12px;font-size:13px;}
  .sbar-label{color:var(--gray);font-weight:600;}
  .sbar-track{height:8px;background:#ECEBF3;border-radius:999px;overflow:hidden;}
  .sbar-fill{display:block;height:100%;background:var(--purple);border-radius:999px;}
  .sbar-val{text-align:right;font-family:'Poppins',sans-serif;font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums;}
  .erows{display:grid;grid-template-columns:1fr 1fr;gap:24px 32px;margin:22px 0 4px;}
  .erow h4{font-family:'Poppins',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.07em;text-transform:uppercase;color:var(--gray-lt);margin-bottom:8px;}
  .erow ul{list-style:none;}
  .erow li{font-size:13.5px;color:var(--gray);line-height:1.55;margin-bottom:6px;}
  .erow li a{color:var(--ink);font-weight:600;}
  .erow li a:hover{color:var(--purple);}
  .erow .sum{font-size:14px;color:var(--ink);font-weight:600;margin-bottom:8px;line-height:1.5;}
  .flag{display:inline-block;font-size:10.5px;font-weight:700;color:#7A5A12;background:#FDF3DF;border-radius:4px;padding:1px 6px;margin-left:6px;white-space:nowrap;}
  .dropped{color:var(--faint);}
  .efile .verdict{border-top:1px solid #F1F2F4;padding-top:18px;margin-top:18px;}
  .refresh-log{margin-top:22px;font-size:13px;color:var(--gray);list-style:none;}
  .refresh-log li{margin-bottom:6px;}

  /* FAQ */
  .faq{margin-top:28px;display:grid;gap:12px;}
  .faq-item{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px 22px;}
  .faq-item summary{font-family:'Poppins',sans-serif;font-weight:600;font-size:16px;cursor:pointer;color:var(--ink);}
  .faq-item p{font-size:15px;color:var(--gray);line-height:1.7;margin-top:12px;}

  .g-footer{background:var(--hero);color:#B3A8DE;margin-top:clamp(96px,12vw,140px);padding:30px 0;font-size:13px;text-align:left;}
  .g-footer .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;}
  .g-footer a{color:#D6CCF5;}

  @media(max-width:900px){
    .picks{grid-template-columns:1fr;}
    .glance{grid-template-columns:repeat(2,minmax(0,1fr));}
    .breaks-grid{grid-template-columns:1fr;}
  }
  @media(max-width:760px){
    .wrap{padding:0 16px;}
    .erows{grid-template-columns:1fr;}
    .v-row{flex-direction:column;gap:2px;}
    .v-key{width:auto;}
    .efile summary{grid-template-columns:36px 1fr auto 20px;grid-template-areas:"logo name score chev" "logo rank stance stance";row-gap:6px;padding:16px;}
    .ef-logo{grid-area:logo;}
    .ef-name{grid-area:name;font-size:17px;}
    .ef-score{grid-area:score;}
    .ef-chev{grid-area:chev;}
    .ef-rank{grid-area:rank;font-size:12.5px;font-weight:700;color:var(--gray);display:flex;gap:6px;align-items:baseline;}
    .ef-seg{display:inline;}
    .efile summary .stance{grid-area:stance;justify-self:end;}
    .ef-body{padding:4px 16px 20px;}
    .cost-row{grid-template-columns:118px 1fr 72px;column-gap:10px;}
    .cost-name{font-size:13px;}
    .sbar{grid-template-columns:86px 1fr 52px;}
    .owner-note{padding:22px;}
  }
`)
