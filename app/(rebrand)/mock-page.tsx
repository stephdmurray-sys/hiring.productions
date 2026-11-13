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

export type NavKey = 'hiring' | 'seekers' | 'review' | 'vendors' | 'consulting' | null

const NAV_RE = /<div class="navbar">[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/
const FOOTER_RE = /<footer[\s\S]*?<\/footer>/


const GLOBAL_FIXES = `
  :root{--purple:#6C47FF;--purple-dark:#5A36E8;--purple-chip:#7B5BFF;}
  body{font-family:inherit;-webkit-font-smoothing:antialiased;}
  .wrap,section.wrap{padding-left:24px;padding-right:24px;}
  section.wrap{padding-top:clamp(56px,7vw,96px);}
  section.wrap > h2,.content section > h2{font-size:clamp(32px,4.4vw,48px);line-height:1.1;letter-spacing:-0.02em;}
  .page-hero h1,.page-hero h1[style]{font-size:clamp(36px,5.5vw,60px) !important;line-height:1.08 !important;letter-spacing:-0.025em;text-wrap:balance;}
  :focus-visible{outline:2px solid #A78BFA;outline-offset:3px;}
  input,select,textarea{font-size:16px;}
  details summary{cursor:pointer;}
  @media(max-width:600px){.wrap,section.wrap{padding-left:16px !important;padding-right:16px !important;}}
`

export function MockPage({ html, active = null }: { html: string; active?: NavKey }): ReactNode {
  const hasNav = NAV_RE.test(html)
  const hasFooter = FOOTER_RE.test(html)
  let body = html.replace(NAV_RE, '').replace(FOOTER_RE, '')
  for (const [re, to] of BRAND_SWAPS) body = body.replace(re, to)
  return (
    <>
      {hasNav && <SiteNav active={active} />}
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_FIXES + chromeCss }} />
      {hasFooter && <SiteFooter />}
    </>
  )
}
