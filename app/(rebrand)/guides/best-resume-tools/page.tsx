import type { Metadata } from 'next'
import { MockPage } from '@/app/(rebrand)/mock-page'
import { html } from '@/app/(rebrand)/_html/guide-resume'

export const metadata: Metadata = {
  title: 'The Best Resume Tools of 2026: Builders and ATS Checkers, Ranked on Evidence',
  description:
    'Ten resume builders and ATS checkers ranked on citable public evidence, with every free-tier catch and renewal price printed plainly.',
}

export default function Page() {
  return <MockPage html={html} />
}
