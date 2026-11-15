import type { Metadata } from 'next'
import { SITE } from '@/app/(rebrand)/_components/structured'
import { StackPage, STACK_COPY, STACK_PATH, type SP } from './stack-page'

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams
  const c = STACK_COPY.seekers
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: STACK_PATH.seekers },
    // A shared stack is the same page with picks filled in: index the clean one.
    robots: Object.keys(sp).length ? { index: false, follow: true } : undefined,
    openGraph: { type: 'website', url: `${SITE}${STACK_PATH.seekers}`, title: c.title, description: c.dek, siteName: 'hiring.productions' },
  }
}

export default function Page({ searchParams }: { searchParams: SP }) {
  return <StackPage lane="seekers" searchParams={searchParams} />
}
