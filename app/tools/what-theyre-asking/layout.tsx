import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What They\'re Actually Asking — Decode Any Interview Question',
  description: 'See what hiring teams are really trying to find out in their interview questions.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
