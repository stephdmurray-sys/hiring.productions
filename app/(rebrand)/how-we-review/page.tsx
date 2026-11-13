import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/how-we-review'

export const metadata: Metadata = {
  alternates: { canonical: '/how-we-review' },
  title: 'How We Review',
  description: 'Three scores, three sources, refreshed on a schedule. Exactly how our hiring software reviews work.',
}

export default function Page() {
  return <MockPage html={html} active="review" />
}
