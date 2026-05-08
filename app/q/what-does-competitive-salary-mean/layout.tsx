import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "What 'Competitive Salary' Actually Means in a Job Posting",
  description: "The honest translation of 'competitive salary' and other compensation phrases that hide what companies actually pay.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
