import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consider Me | Open Engagements',
  description:
    'Recruiters and talent assessors: apply to fast, high trust client engagements. Interview assessments, search, advisory. Every application is for a specific open role.',
  alternates: { canonical: 'https://hiring.productions/consider-me' },
  openGraph: {
    title: 'Get pulled in when the work comes.',
    description:
      'Hiring.Productions brings vetted talent people into fast client engagements. Apply to the open role that fits.',
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
