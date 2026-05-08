import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Where You Have a Shot — Your Real Job Search Strategy',
  description: 'See which companies are actually looking for someone like you — and where you have a real shot.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
