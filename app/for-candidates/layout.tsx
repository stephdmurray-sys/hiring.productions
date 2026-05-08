import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Job Seekers — See How You\'re Being Evaluated',
  description: 'See how hiring teams read resumes, build interview questions, and evaluate candidates. Both sides of the production.',
}

export default function ForCandidatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
