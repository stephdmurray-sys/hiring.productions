import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { headerHtml, footerHtml } from '@/app/(rebrand)/_html/consulting'
import { RecommendationForm } from './recommendation-form'

export const metadata: Metadata = {
  title: 'Get a Free Hiring Stack Recommendation | Hiring.Productions',
  description:
    'Tell us how you hire and get back the exact tools we would run for your team, built with the same transparent scoring as our guides. Free, no sales call.',
}

export default function Page() {
  return (
    <>
      <MockPage html={headerHtml} />
      <RecommendationForm />
      <MockPage html={footerHtml} />
    </>
  )
}
