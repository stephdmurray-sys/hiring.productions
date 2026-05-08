import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How You Come Across — Your First Impression, Decoded',
  description: 'See how you actually come across in your interviews and application materials.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
