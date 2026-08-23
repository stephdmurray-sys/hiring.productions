import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/guide-ats'

export const metadata: Metadata = {
  title: 'The 14 Best Applicant Tracking Systems of 2026, Ranked by Team Size',
  description: 'The best ATS for small, growing, and scaling teams, ranked within each tier by a recruiter with 18 years in-house.',
}

export default function Page() {
  return <MockPage html={html} />
}
