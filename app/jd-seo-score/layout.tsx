import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Is Your Job Even Being Seen? JD SEO Scorecard',
  description: 'See how your job description scores on Indeed, LinkedIn, Google Jobs and 5 other platforms candidates actually use.',
}

export default function JDSEOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
