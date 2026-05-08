import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inside Looks — Both Sides of Hiring',
  description: '20 inside looks for candidates and hiring teams. See how the other side operates. Two free forever — unlock all 20 for $20/year.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
