import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/advertiser-disclosure'

export const metadata: Metadata = {
  title: 'Advertiser Disclosure | Hiring.Productions',
  description: 'How affiliate links work on this site, and what they never buy.',
}

export default function Page() {
  return <MockPage html={html} />
}
