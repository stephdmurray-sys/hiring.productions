import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools — Both Sides of Hiring',
  description: 'Free tools and Pro Recruiter Insights that show candidates how the other side actually operates. Free to start. Pro gets the whole production for $14.99/mo or $99/yr.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
