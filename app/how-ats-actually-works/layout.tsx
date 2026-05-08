import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "How ATS Actually Works — And Why Your Resume Disappears",
  description: "The complete breakdown of automated screening — what it looks for, what kills your application, and how to get through.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
