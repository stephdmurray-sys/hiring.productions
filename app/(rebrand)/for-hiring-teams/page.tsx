import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/for-hiring-teams'

export const metadata: Metadata = {
  title: 'For Hiring Teams | Hiring.Productions',
  description: 'Buyer guides for ATS, sourcing, screening, assessment, and recruiter training.',
}

export default function Page() {
  return <MockPage html={html} />
}
