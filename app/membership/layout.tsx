import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Pro — Five Inside Looks for $20/year',
  description: 'Less than Jobscan charges for one day. Five polished inside looks built from real recruiting practice, instant access. Cancel anytime.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
