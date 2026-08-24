import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/about'

export const metadata: Metadata = {
  title: 'About Hiring.Productions | Reviews With the Receipts Shown',
  description:
    'Why hiring.productions exists: independent reviews of hiring software and career tools for both sides of the table, scored on sourced evidence by a recruiter with 18 years in-house.',
}

export default function Page() {
  return <MockPage html={html} />
}
