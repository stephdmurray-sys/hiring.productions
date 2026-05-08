import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Download | How to Get Found on LinkedIn',
  description: 'Learn exactly how recruiter search works on LinkedIn and what to fix on your profile to get found. Free presentation download from an 18-year recruiting veteran.',
  keywords: [
    'LinkedIn optimization',
    'get found on LinkedIn',
    'recruiter search',
    'LinkedIn profile tips',
    'job seeker guide',
    'LinkedIn recruiter',
    'career coaching',
  ],
  openGraph: {
    title: 'Free Download | How to Get Found on LinkedIn',
    description: 'Learn exactly how recruiter search works and what to fix on your profile to show up in the right results.',
    url: 'https://hiring.productions/linkedin-guide',
  },
  alternates: {
    canonical: 'https://hiring.productions/linkedin-guide',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LinkedInGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
