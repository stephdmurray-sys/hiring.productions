import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/for-vendors'

export const metadata: Metadata = {
  title: 'For Vendors | Hiring.Productions',
  description: 'Submit your product for review. Listing is free. Scores are earned.',
}

export default function Page() {
  return <MockPage html={html} />
}
