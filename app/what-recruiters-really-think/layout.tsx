import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "What Recruiters Really Think When Reading Your Resume",
  description: "The honest internal monologue of a recruiter reading resumes — what they notice, skip, and decide in the first 6 seconds.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
