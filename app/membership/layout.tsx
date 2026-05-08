import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Pro — Four Inside Looks for $20/year',
  description: 'Less than Jobscan charges for one day. Four polished inside looks built by a 20-year recruiter, instant access. Cancel anytime.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
