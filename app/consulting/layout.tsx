import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talent Consulting with Stephanie Murray',
  description: '20 years of talent acquisition expertise. Hiring strategy, employer branding, and recruitment infrastructure for healthcare and growth-stage companies.',
}

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
