import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/guide-training'

export const metadata: Metadata = {
  alternates: { canonical: '/guides/best-recruiter-training' },
  title: 'Recruiter Training and Certifications of 2026, Compared',
  description:
    'Recruiter and sourcing training plus HR certification prep, compared on what each provider publishes: price, format and SHRM and HRCI recertification credits. Not ranked: public review data is too thin to score.',
}

/**
 * Public review data for training programs is too thin to score, so this
 * guide compares and never ranks. The approved page design lives in
 * _html/guide-training.ts; this page removes the rank numbers and the old
 * "Practitioner" score (no one's opinion is a score input) and labels the
 * three picks as Stephanie's judgment.
 */

function rep(src: string, a: string, b: string): string {
  if (!src.includes(a)) throw new Error(`guide-training: expected text not found: ${a.slice(0, 60)}`)
  return src.split(a).join(b)
}

/** Drop the "#" and "Practitioner*" columns from both comparison tables. */
function unrank(src: string): string {
  return src.replace(/<div class="tscroll"><table>([\s\S]*?)<\/table>/g, (whole, inner: string) => {
    if (!inner.includes('Practitioner*')) return whole
    const rows = inner
      .replace('<tr><th>#</th>', '<tr>')
      .replace('<th>Practitioner*</th></tr>', '</tr>')
      .replace(/<tr><td>\d+<\/td>/g, '<tr>')
      .replace(/<td><span class="tstars">[\s\S]*?<\/span><\/td><\/tr>/g, '</tr>')
    return `<div class="tscroll"><table>${rows}</table>`
  })
}

function evidenceOnly(src: string): string {
  let s = unrank(src)
  s = rep(
    s,
    `font-weight:700;font-size:clamp(26px,3.4vw,38px);line-height:1.2;margin-bottom:12px;max-width:840px;">The Best Recruiter Training and Certifications of 2026</h1>`,
    `font-weight:900;font-size:clamp(40px,6vw,64px);line-height:1.04;letter-spacing:-0.025em;margin-bottom:14px;max-width:900px;">Recruiter training and certifications, compared</h1>`,
  )
  s = rep(s, 'Updated August 23, 2026 &middot; 19 programs researched &middot;', 'Data as of August 23, 2026, from each provider&rsquo;s own pages &middot;')
  s = s.replace(
    /<p class="lead">Training is where hiring quality actually changes,[\s\S]*?every three years\.<\/p>/,
    '<p class="lead">Public review data for training programs is too thin to score, so nothing on this page is ranked or scored. The tables compare what each provider publishes: price, format and the SHRM and HRCI recertification credits certified people must earn every three years. The three below are Stephanie&rsquo;s picks, labeled as her judgment.</p>',
  )
  s = rep(s, '<span class="pick-flag">Recruiter training pick</span>', '<span class="pick-flag">Stephanie&rsquo;s pick: recruiter training</span>')
  s = rep(s, '<span class="pick-flag">Sourcing pick</span>', '<span class="pick-flag">Stephanie&rsquo;s pick: sourcing</span>')
  s = rep(s, '<span class="pick-flag">Cert prep pick</span>', '<span class="pick-flag">Stephanie&rsquo;s pick: cert prep</span>')
  s = rep(s, '<h2>Ranked for how you recruit</h2>', '<h2>Compared, not ranked</h2>')
  s = s.replace(
    /Public review data is thin in this category, so every row is <b>Research based<\/b> and rankings lean on the Practitioner score\. \*Practitioner scores are in final review\./,
    'Public review data is too thin in this category to score, so programs are compared, not ranked. Order within each table carries no meaning.',
  )
  s = s.replace(/<span class="review-rank">#\d+ &middot; /g, '<span class="review-rank">')
  return s
}

export default function Page() {
  return <MockPage html={evidenceOnly(html)} active="hiring" />
}
