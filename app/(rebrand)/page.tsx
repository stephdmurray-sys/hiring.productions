import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/home'

export const metadata: Metadata = {
  title: 'Hiring.Productions | Reviews of Hiring Software for Companies and Job Seekers',
  description: 'Hiring is a Production. Find the right tools and training to make it easier. Independent reviews of hiring software, job search tools, and recruiter training.',
}

export default function Page() {
  return <MockPage html={html} />
}
