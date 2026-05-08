import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What This Job Actually Is — Decode Any Job Description',
  description: 'See what\'s really between the lines of any job posting — who they actually want and whether it\'s worth your time to apply.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
