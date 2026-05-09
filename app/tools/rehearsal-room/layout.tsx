import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Rehearsal Room — Interview prep in a hiring manager’s voice',
  description:
    'Paste a job description, get ten interview questions calibrated to that exact role — with what they’re really assessing, the weak vs strong answer, and the literal opening line you can use.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
