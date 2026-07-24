import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consider Me | Join the Bench',
  description:
    'Recruiters and talent assessors: get pulled into fast, high trust client projects. Interview assessments, search, advisory. Share your RepVera and get on the bench.',
  alternates: { canonical: 'https://hiring.productions/consider-me' },
  openGraph: {
    title: 'Get pulled in when the work comes.',
    description:
      'Hiring.Productions pulls vetted talent people into fast client projects. This is how you get on the bench.',
    url: 'https://hiring.productions/consider-me',
  },
}

export default function ConsiderMeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
