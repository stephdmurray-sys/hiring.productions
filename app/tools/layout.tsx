import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Tools for Job Seekers and Hiring Teams',
  description:
    'Every free tool on hiring.productions, for both sides of the table: is this job or candidate real, what to ask in the interview, what screening software does, and what your tools will cost. No sign-up.',
  alternates: { canonical: '/tools' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
