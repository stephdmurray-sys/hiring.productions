import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Would Your Resume Even Make It Through? ATS Reality Check',
  description: 'See your ATS score, missing keywords, and the top 3 fixes before you submit your next application.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
