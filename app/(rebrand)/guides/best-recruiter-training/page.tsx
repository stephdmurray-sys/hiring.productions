import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/guide-training'

export const metadata: Metadata = {
  title: 'The Best Recruiter Training and Certifications of 2026',
  description:
    'Recruiter and sourcing training plus HR certification prep, ranked by a recruiter with 18 years in-house. Includes SHRM and HRCI recertification credit options.',
}

export default function Page() {
  return <MockPage html={html} />
}
