import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For Career Changers — Resume Translation + Pivot Tools',
  description:
    'Free tools and honest answers for switching fields. The through-line that makes you hireable, the translation that makes your bullets legible, the certifications that actually matter. Built by recruiters who place pivoters every month.',
  keywords: [
    'career change resume',
    'how to switch careers',
    'career pivot at 30',
    'career change at 40',
    'transferable skills resume',
    'switching industries',
    'career change linkedin',
    'how to explain career change',
  ],
  alternates: { canonical: 'https://hiring.productions/career-changers' },
  openGraph: {
    title: 'For Career Changers — Free Tools + Recruiter-Grade Answers',
    description:
      'Free tools and honest answers for switching fields. Find your through-line, translate your experience, position yourself for the new industry.',
    url: 'https://hiring.productions/career-changers',
    type: 'website',
  },
}

export default function CareerChangersLayout({ children }: { children: React.ReactNode }) {
  return children
}
