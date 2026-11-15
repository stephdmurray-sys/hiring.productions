import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { ShortListPage, shortListCss } from '@/app/(rebrand)/_components/short-list'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { PORTFOLIO_SITES as list } from '@/lib/evidence/shortlists'

/** Portfolio sites to know: the job seeker short list behind the proof answer (no scores yet). */

export const metadata: Metadata = {
  title: list.metaTitle,
  description: list.description,
  alternates: { canonical: list.path },
}

export default function Page() {
  const url = `${SITE}${list.path}`
  const ld = graph(
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: list.title,
      description: list.description,
      url,
      dateModified: list.checked,
      publisher: { '@id': `${SITE}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
        { '@type': 'ListItem', position: 3, name: list.title, item: url },
      ],
    },
  )
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />
      <ShortListPage list={list} />
      <SiteFooter />
    </>
  )
}
