import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inside Looks — Both Sides of Hiring',
  description: 'Four polished inside looks that show candidates how the other side actually operates. One free, three for members. $20/year.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
