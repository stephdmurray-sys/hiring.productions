import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Small Hiring Teams — Recruitment Marketing Without a TA Function',
  description:
    "If you're hiring 5–25 people a year without a dedicated recruiter, the playbook is recruitment marketing, not recruiting. Free tools and recruiter-grade answers from 20 years of TA practice.",
  alternates: { canonical: 'https://hiring.productions/for-small-teams' },
  openGraph: {
    type: 'article',
    title: 'For Small Hiring Teams — Recruitment Marketing Without a TA Function',
    description:
      "Hiring well at a small company is recruitment marketing, not recruiting. Free tools, recruiter-grade answers, and consulting from a 20-year TA practitioner.",
    url: 'https://hiring.productions/for-small-teams',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
