import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Pro — The Whole Production for $14.99/mo or $99/yr',
  description: 'Less than Jobscan charges for one day. Every Recruiter Insight — built from real recruiting practice, instant access. Cancel anytime.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
