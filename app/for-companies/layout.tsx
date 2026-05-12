import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Hiring Teams — See How You\'re Being Experienced',
  description: 'See how candidates read your job postings, experience your process, and make decisions. The Recruiter Insight on your own hiring.',
}

export default function ForCompaniesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
