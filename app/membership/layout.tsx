import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Pro — All 20 Inside Looks for $20/year',
  description: 'Less than Jobscan charges for one day. All 20 inside looks, both sides of hiring, unlimited runs, instant access.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
