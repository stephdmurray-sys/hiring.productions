import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returning to Work — Resume, LinkedIn & Re-entry Tools',
  description:
    'Free tools and honest answers for returning to work after parenting, caregiving, or any extended break. Frame the gap, refresh outdated tools, and rebuild your professional network. Built by recruiters who place returning candidates every month.',
  keywords: [
    'returning to work after maternity leave',
    'how to explain stay at home parent gap',
    'returning to work after years off',
    'resume after long break',
    'returnship programs',
    'returning to work after caregiving',
    'mom returning to work resume',
    'updating resume after break',
  ],
  alternates: { canonical: 'https://hiring.productions/returning-to-work' },
  openGraph: {
    title: 'Returning to Work — Free Tools + Recruiter-Grade Answers',
    description:
      'Free tools and direct answers for re-entering after parenting, caregiving, or any extended career break. The gap isn’t the obstacle — the framing is.',
    url: 'https://hiring.productions/returning-to-work',
    type: 'website',
  },
}

export default function ReturningToWorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
