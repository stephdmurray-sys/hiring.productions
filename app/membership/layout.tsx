import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Pro — The Whole Production for $20/year',
  description: 'Less than Jobscan charges for one day. Every inside look — built from real recruiting practice, instant access. Cancel anytime.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
