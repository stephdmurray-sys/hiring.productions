import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Found by Recruiters | LinkedIn Optimization Coaching',
  description: 'LinkedIn profile optimization and recruiter search strategy for job seekers. Learn how recruiters actually search, what the LinkedIn algorithm ranks, and how to get surfaced before the job is even posted. 18+ years of recruiting expertise.',
  keywords: [
    'LinkedIn optimization',
    'LinkedIn profile optimization',
    'get found by recruiters',
    'recruiter search optimization',
    'job seeker coaching',
    'career coaching',
    'LinkedIn coaching',
    'LinkedIn strategy',
    'recruiter visibility',
    'LinkedIn algorithm',
    'LinkedIn recruiter search',
    'profile optimization',
    'headline optimization',
    'LinkedIn skills optimization',
    'open to work strategy',
    'job search strategy',
    'career pivot coaching',
    'LinkedIn headline',
    'recruiter view',
    'boolean search',
    'job seeker help',
    'not getting interviews',
    'resume not working',
  ],
  openGraph: {
    title: 'Get Found by Recruiters | LinkedIn Optimization | Hiring.Productions',
    description: 'LinkedIn profile optimization and recruiter search strategy. Learn how recruiters actually search and how to get surfaced before the job is even posted.',
    url: 'https://hiring.productions/get-found',
    images: [
      {
        url: '/images/stephanie-murray.jpg',
        width: 1200,
        height: 630,
        alt: 'Stephanie Murray - LinkedIn Optimization Coach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Found by Recruiters | LinkedIn Optimization',
    description: 'LinkedIn profile optimization and recruiter search strategy for job seekers.',
    images: ['/images/stephanie-murray.jpg'],
  },
  alternates: {
    canonical: 'https://hiring.productions/get-found',
  },
}

export default function GetFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
