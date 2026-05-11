import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools — Both Sides of Hiring',
  description: 'Free tools and members-only inside looks that show candidates how the other side actually operates. Ten free, five flagship inside looks for $20/year.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
