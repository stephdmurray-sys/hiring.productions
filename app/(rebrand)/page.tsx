import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/home'

export const metadata: Metadata = {
  title: 'Hiring.Productions | Hiring Is a Production. We Are Here for Everyone in It.',
  description: 'Tools, software, research, and training for the people doing the hiring, and for the people trying to get hired. Independent reviews with the receipts shown.',
}

export default function Page() {
  return <MockPage html={html} />
}
