import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { headerHtml, footerHtml } from '@/app/(rebrand)/_html/consulting'
import { RecommendationForm } from './recommendation-form'

export const metadata: Metadata = {
  alternates: { canonical: '/consulting' },
  title: 'Get a Free Hiring Stack Recommendation',
  description:
    'Tell us how you hire and get back the exact tools we would run for your team, built with the same transparent scoring as our guides. Free, no sales call.',
}

export default function Page() {
  return (
    <>
      <MockPage html={headerHtml} active="consulting" />
      <RecommendationForm />
      <MockPage html={footerHtml} active="consulting" />
    </>
  )
}
