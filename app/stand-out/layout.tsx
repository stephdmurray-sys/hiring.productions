import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stand Out in the Crowd — What Top Candidates Do Differently',
  description: 'The specific moves that separate candidates who get hired from candidates who get ignored. Seven things almost nobody does.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
