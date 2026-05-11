import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description:
    'Sign in to your hiring.productions Pro membership. Verified against Stripe — no password.',
  alternates: { canonical: 'https://hiring.productions/sign-in' },
  robots: { index: false, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
