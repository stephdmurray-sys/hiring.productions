import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/guide-ats'

export const metadata: Metadata = {
  title: '14 Best Applicant Tracking Systems for Small Teams (2026)',
  description: 'The best ATS for teams hiring under 50 people a year, compared by a recruiter with 18 years in-house.',
}

export default function Page() {
  return <MockPage html={html} />
}
