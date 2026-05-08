import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'JD SEO Scorecard | Job Description Optimization | Hiring.Productions',
  description: 'Score and optimize your job descriptions for search visibility. JD SEO tool to improve job posting visibility and attract better candidates.',
  keywords: ['job description SEO', 'JD SEO', 'job description optimization', 'recruitment marketing'],
  alternates: {
    canonical: 'https://hiring.productions/jd-seo-score',
  },
}

export default function JDSEOScorePage() {
  redirect('/jd-seo-score.html')
}
