/**
 * Styles for the resume tools guide. Base rules match the approved
 * rebrand mockups; the evidence-layer block below them is new.
 */
export const guideCss = `
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

  /* ---------- Evidence layer (convergence view) ---------- */
  :root{ --faint:#9CA3AF; }
  .demo-note{background:#FFF8EB;border-bottom:1px solid #F3E2BF;color:#6B4E0E;font-size:13px;line-height:1.55;padding:11px 0;}
  .demo-note b{color:#4A3609;}
  .lchip{display:inline-block;font-size:12px;font-weight:600;color:var(--ink);background:#fff;border:1px solid var(--border);border-radius:6px;padding:2px 8px;margin:2px 4px 2px 0;white-space:nowrap;}
  .lchip a{color:inherit;}
  .muted{color:var(--gray-lt);font-size:12.5px;}
  .stance{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:10.5px;letter-spacing:0.04em;text-transform:uppercase;padding:5px 11px;border-radius:999px;white-space:nowrap;}
  .stance-agrees{background:#F1F2F4;color:var(--ink);}
  .stance-breaks{background:var(--purple);color:#fff;}
  .stance-thin{background:#fff;color:var(--gray-lt);border:1px dashed #D1D5DB;}
  .agree-table td{vertical-align:middle;}
  .agree-table td:first-child{white-space:nowrap;}
  .breaks-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:20px;}
  .break-card{border:1px solid var(--border);border-radius:14px;padding:20px 22px;background:#fff;}
  .break-card .bc-name{font-family:'Poppins',sans-serif;font-weight:700;font-size:16px;margin-bottom:6px;display:flex;align-items:center;gap:8px;}
  .break-card p{font-size:14px;color:var(--gray);line-height:1.6;}
  .break-card a{display:inline-block;margin-top:10px;font-size:12.5px;font-weight:600;color:var(--purple);}
  .lists-details{margin-top:26px;border:1px solid var(--border);border-radius:12px;padding:16px 20px;background:#fff;}
  .lists-details summary{font-family:'Poppins',sans-serif;font-weight:600;font-size:14.5px;cursor:pointer;}
  .lists-details table td{vertical-align:top;font-size:13px;}
  .lstatus{display:inline-block;font-family:'Poppins',sans-serif;font-weight:700;font-size:10px;letter-spacing:0.05em;text-transform:uppercase;padding:3px 9px;border-radius:999px;white-space:nowrap;background:#F1F2F4;color:var(--gray);}
  .lstatus-counts{background:#EDE9FE;color:var(--purple);}
  .owner-note{margin-top:22px;padding:18px 22px;border-radius:12px;background:var(--hero);color:#D6CCF5;font-size:14px;line-height:1.65;}
  .owner-note b{color:#fff;font-family:'Poppins',sans-serif;}

  .vfacade{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;cursor:pointer;background-color:var(--hero);background-size:cover;background-position:center;}
  .vfacade::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,16,56,0) 40%,rgba(26,16,56,0.55));}
  .vplay{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,0.94);display:flex;align-items:center;justify-content:center;z-index:1;box-shadow:0 4px 18px rgba(0,0,0,0.25);}
  .vfacade:hover .vplay{background:#fff;}
  .vfacade:focus-visible{outline:3px solid var(--purple);outline-offset:2px;}
  .vid-title{font-size:13px;color:var(--gray);line-height:1.5;margin-top:2px;}
  .vid-foot{font-size:11.5px;color:var(--faint);margin-top:8px;}
  .vtag-compare{background:#FEF3E2;color:#8A5A00;}

  .efile{border:1px solid var(--border);border-radius:16px;padding:clamp(20px,3vw,28px);margin-top:20px;box-shadow:0 2px 10px rgba(20,20,32,0.04);scroll-margin-top:24px;}
  .efile .review-head{margin-bottom:2px;}
  .erows{display:grid;grid-template-columns:1fr 1fr;gap:20px 30px;margin:16px 0 6px;}
  .erow h4{font-family:'Poppins',sans-serif;font-weight:700;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--gray-lt);margin-bottom:8px;}
  .erow ul{list-style:none;}
  .erow li{font-size:13.5px;color:var(--gray);line-height:1.55;margin-bottom:5px;}
  .erow li a{color:var(--ink);font-weight:600;}
  .erow li a:hover{color:var(--purple);}
  .erow .sum{font-size:13.5px;color:var(--ink);font-weight:600;margin-bottom:6px;}
  .erow .call-line{font-size:14px;color:var(--ink);line-height:1.6;margin-top:10px;}
  .flag{display:inline-block;font-size:10.5px;font-weight:700;color:#7A5A12;background:#FDF3DF;border-radius:4px;padding:1px 6px;margin-left:6px;white-space:nowrap;}
  .dropped{color:var(--faint);}
  .efile .verdict{border-top:1px solid var(--border);padding-top:16px;margin-top:14px;}
  .refresh-log{margin-top:14px;font-size:13px;color:var(--gray);}
  .refresh-log li{margin-bottom:4px;}
  @media(max-width:760px){.erows{grid-template-columns:1fr;}.breaks-grid{grid-template-columns:1fr;}.v-row{flex-direction:column;gap:2px;}.v-key{width:auto;}}
`
