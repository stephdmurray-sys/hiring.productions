import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'After a Layoff — Resume, Interview, and Follow-Up Tools',
  description:
    'Free tools and honest answers for the job search after a layoff. How to explain it, when to follow up, what to put on the resume, and how long it realistically takes. Built by recruiters who place laid-off candidates every week.',
  keywords: [
    'job search after layoff',
    'how to explain layoff in interview',
    'after layoff resume',
    'laid off how long to find a job',
    'tell recruiter laid off',
    'layoff linkedin headline',
    'laid off follow up recruiter',
    'severance job search timeline',
  ],
  alternates: { canonical: 'https://hiring.productions/after-layoff' },
  openGraph: {
    title: 'After a Layoff — Free Tools + Recruiter-Grade Answers',
    description:
      'Free tools and direct answers for the search after a layoff. Frame the gap, decode the silence, write the follow-up that actually gets a reply.',
    url: 'https://hiring.productions/after-layoff',
    type: 'website',
  },
}

export default function AfterLayoffLayout({ children }: { children: React.ReactNode }) {
  return children
}
