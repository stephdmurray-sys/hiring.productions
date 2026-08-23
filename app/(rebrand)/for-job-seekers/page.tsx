import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/for-job-seekers'

export const metadata: Metadata = {
  title: 'For Job Seekers | Hiring.Productions',
  description: 'Tool guides for resume, interviews, tracking, negotiation, and career coaching.',
}

export default function Page() {
  return <MockPage html={html} />
}
