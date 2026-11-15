import type { ReactNode } from 'react'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { BRAND_SWAPS } from '@/app/(rebrand)/_components/brand'

/**
 * Staging renderer for the rebrand pages that are still approved mockup
 * HTML. On the way through it applies the site-wide fixes, so every
 * mockup page matches the rebuilt React pages:
 *
 * - brand type (Figtree, already loaded by the root layout) and brand
 *   indigo in place of the mockups' Poppins/Open Sans and violet
 * - the shared nav and footer in place of each mockup's own copy, so
 *   phones get navigation and no link points at "#"
 * - side gutters, section spacing, heading scale, visible focus rings
 *   and 16px form inputs (no iOS zoom)
 *
 * Pages move off this renderer one by one as they are rebuilt.
 */

export type NavKey = 'hiring' | 'seekers' | 'review' | 'vendors' | 'consulting' | 'recommend' | null

const NAV_RE = /<div class="navbar">[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/
const FOOTER_RE = /<footer[\s\S]*?<\/footer>/


const GLOBAL_FIXES = `
  h1,h2,h3,h4{text-wrap:balance;}
  p,li,dd,dt,summary,label,blockquote,figcaption{text-wrap:pretty;}
  :root{
    --paper:#FAF8F3;--paper-2:#F2EEE4;--surface:#FFFFFF;--ink:#1A1A22;--ink-2:#4A4A5A;--ink-3:#62627A;
    --rule:#E3DED2;--rule-2:#CFC8B8;--indigo:#6C47FF;--indigo-text:#5432E0;--coral:#FF4F6A;--coral-text:#C42E48;--ok:#157347;
    --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    --purple:#5432E0;--purple-dark:#3F22B8;--purple-chip:#6C47FF;--hero:#1A1A22;--hero-2:#1A1A22;
    --card:#FFFFFF;--border:#E3DED2;--gray:#4A4A5A;--gray-lt:#62627A;--faint:#62627A;--gold:#1A1A22;
  }
  body{background:var(--paper) !important;color:var(--ink);font-family:inherit;-webkit-font-smoothing:antialiased;font-size:17px;}
  .wrap,section.wrap{padding-left:32px;padding-right:32px;}
  section.wrap{padding-top:clamp(56px,7vw,96px);}
  :focus-visible{outline:2px solid var(--indigo);outline-offset:3px;}
  input,select,textarea{font-size:16px;}

  /* Page headers: paper and ink with a heavy rule, no dark gradient band */
  .page-hero,.rec-hero,[style*="linear-gradient"]{background:var(--paper) !important;color:var(--ink) !important;}
  .page-hero,.rec-hero{border-bottom:2px solid var(--ink);padding:clamp(40px,6vw,80px) 0 clamp(28px,4vw,44px) !important;}
  .page-hero *{color:var(--ink-2) !important;}
  .page-hero h1,.page-hero h1[style]{color:var(--ink) !important;font-weight:800 !important;font-size:clamp(40px,6vw,76px) !important;line-height:1.02 !important;letter-spacing:-0.025em !important;text-wrap:balance;}
  .page-hero a{text-decoration:underline;text-underline-offset:3px;}
  .disclosure{background:none !important;border:0 !important;padding:0 !important;font-size:14px !important;margin-top:8px !important;}
  .badge-live,.badge-live *{background:none !important;border:0 !important;padding:0 !important;border-radius:0 !important;}
  details{border-radius:0 !important;}
  [style*="border-radius:999px"]{border-radius:0 !important;border:0 !important;background:none !important;padding:4px 16px 4px 0 !important;}
  .pulse{display:none !important;}

  /* Type: big section titles, sentence-case labels */
  section.wrap > h2,.content section > h2,.page-hero ~ * h2:not([style*="font-size:2"]){font-weight:900;font-size:clamp(40px,6vw,64px);line-height:1.04;letter-spacing:-0.025em;}
  th,.v-key,.toc-h,.fh,.hdoor-label,.side-label,.pct{text-transform:none !important;letter-spacing:0 !important;}
  th{font-size:13px !important;color:var(--ink-2) !important;border-bottom:1px solid var(--ink) !important;}
  table{border-top:2px solid var(--ink);}
  .lead{color:var(--ink-2);}

  /* Tags and pills become plain words */
  .pick-flag,.etag,.vtag,.pill,.chip,.ribbon-tag,.free-chip,.lstatus{background:none !important;color:var(--ink-2) !important;border:0 !important;border-radius:0 !important;padding:0 !important;text-transform:none !important;letter-spacing:0 !important;font-size:14px !important;font-weight:700 !important;box-shadow:none !important;}
  .pick-flag{position:static !important;display:block;margin-bottom:8px;}
  .etag-demo,.etag-sub{color:var(--ink) !important;}

  /* Cards become ruled blocks: no radius, no shadow, no lift */
  .pick,.review,.vid-card,.scard,.ecard,.sample,.step,.vendor-cta,.ccard,.tcard,.hdoor,.faq details,.author-strip,.news{border-radius:0 !important;box-shadow:none !important;transform:none !important;}
  .pick,.pick.winner{border:0 !important;border-top:2px solid var(--ink) !important;background:transparent !important;padding:18px 0 0 !important;}
  .review{border:0 !important;border-top:2px solid var(--ink) !important;padding:22px 0 0 !important;background:transparent !important;}
  .vid-card{border:0 !important;background:transparent !important;}
  .vid-card iframe{border-radius:0 !important;}
  .scard,.ecard,.sample,.vendor-cta{border:1px solid var(--rule) !important;background:var(--surface) !important;}
  .scores-row{background:transparent !important;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);border-radius:0 !important;padding:10px 0 !important;}
  .favicon{border:0 !important;box-shadow:none !important;background:transparent !important;width:auto !important;height:auto !important;}
  *:hover{box-shadow:none;}
  .pick:hover,.vid-card:hover,.ccard:hover,.review:hover{transform:none !important;}

  /* Accent callouts become boxed notes */
  .callout,[style*="border-left:3px solid"]{border:1px solid var(--ink) !important;border-radius:0 !important;background:var(--surface) !important;}

  /* Buttons: rectangular, solid ink, sentence case */
  .vbtn,.hero-cta,.news-btn,.hdoor-btn,.rec-submit{border-radius:3px !important;text-transform:none !important;letter-spacing:0 !important;font-size:15px !important;font-weight:700 !important;background:var(--ink) !important;color:var(--paper) !important;box-shadow:none !important;}
  .vbtn:hover,.rec-submit:hover{background:#000 !important;}

  /* Stars: the mockups showed the same four stars for every score, so the number stands alone */
  .tstars,.stars{display:none !important;}
  .st,.stars-fill{color:var(--ink) !important;}

  /* Uppercase micro-labels set inline in the mockups */
  [style*="text-transform:uppercase"],.badge-live{text-transform:none !important;letter-spacing:0 !important;}

  /* Visit links: text, not a row of heavy buttons */
  .visit{background:none !important;text-transform:none !important;letter-spacing:0 !important;border-radius:0 !important;color:var(--indigo-text) !important;text-decoration:underline !important;text-underline-offset:3px;padding:0 !important;text-align:left !important;display:inline-block !important;font-size:16px !important;max-width:none !important;margin-top:12px !important;}
  .visit:hover{background:none !important;text-decoration-thickness:2px !important;}

  /* Forms */
  .rec-form input,.rec-form select,.rec-form textarea{border-radius:3px !important;border:1.5px solid var(--ink) !important;background:var(--surface) !important;}
  .rec-n{border-radius:0 !important;background:none !important;color:var(--ink) !important;font-family:var(--mono);}
  .rec-form,.rec-point,.rec-done{border-radius:0 !important;box-shadow:none !important;}

  @media(max-width:600px){.wrap,section.wrap{padding-left:18px !important;padding-right:18px !important;}}
`

export function MockPage({ html, active = null, ratings = 'short', after }: { html: string; active?: NavKey; ratings?: 'short' | 'full'; after?: ReactNode }): ReactNode {
  const hasNav = NAV_RE.test(html)
  const hasFooter = FOOTER_RE.test(html)
  let body = html.replace(NAV_RE, '').replace(FOOTER_RE, '')
  for (const [re, to] of BRAND_SWAPS) body = body.replace(re, to)
  return (
    <>
      {hasNav && <SiteNav active={active} />}
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_FIXES + chromeCss }} />
      {after}
      {hasFooter && <SiteFooter ratings={ratings} />}
    </>
  )
}
