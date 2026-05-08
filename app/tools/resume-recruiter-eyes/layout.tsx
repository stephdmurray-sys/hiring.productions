import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Resume, Through a Recruiter\'s Eyes',
  description: 'See the internal monologue of a recruiter reading your resume in the first 6 seconds — what they notice, skip, and decide.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
