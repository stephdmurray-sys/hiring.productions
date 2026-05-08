import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Does My Resume Read as AI?',
  description: 'Find out if your resume triggers AI detection flags before a recruiter ever sees it. Free tool — no account needed.',
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
