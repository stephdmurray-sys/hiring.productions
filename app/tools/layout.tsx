import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools — Both Sides of Hiring',
  description: 'Free tools and members-only Recruiter Insights that show candidates how the other side actually operates. Free to start. Members get the whole production for $20/year.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
