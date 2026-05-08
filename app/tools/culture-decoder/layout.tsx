import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Decode Company Culture — What This Culture Actually Is',
  description: 'See what the culture actually is from the inside — the real day-to-day of working there.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
