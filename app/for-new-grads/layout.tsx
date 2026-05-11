import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For New Grads — Resume, LinkedIn & First Job Tools',
  description:
    'Free tools and honest answers for new graduates. Build a new grad resume that actually gets read, decode job postings, spot scams, and get on a recruiter’s radar. Built by recruiters with 20 years of hiring experience.',
  keywords: [
    'new grad resume',
    'resume with no experience',
    'first job after college',
    'entry level resume',
    'new graduate job search',
    'new grad linkedin',
    'GPA on resume',
    'how to write resume new grad',
  ],
  alternates: {
    canonical: 'https://hiring.productions/for-new-grads',
  },
  openGraph: {
    title: 'For New Grads — Free Tools + Recruiter-Grade Answers',
    description:
      'Free tools and honest answers for new graduates. Resume, LinkedIn, scam detection, JD decoding — built by recruiters who actually screen entry-level resumes.',
    url: 'https://hiring.productions/for-new-grads',
    type: 'website',
  },
}

export default function ForNewGradsLayout({ children }: { children: React.ReactNode }) {
  return children
}
