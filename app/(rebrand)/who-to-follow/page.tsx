import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { WhoToFollow, followCss } from '@/app/(rebrand)/_components/follow'
import { JsonLd, graph, peopleLd } from '@/app/(rebrand)/_components/structured'

export const metadata: Metadata = {
  alternates: { canonical: '/who-to-follow' },
  title: 'Who to Follow: The Best in Talent Acquisition, and the Most Helpful Voices for Job Seekers',
  description:
    'The best people to follow in recruiting and HR, and for your job search: recruiters, HR leaders, career coaches and a few comedians.',
}

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + followCss }} />
      <JsonLd data={graph(peopleLd())} />
      <SiteNav />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Who to follow
          </p>
          <h1 className="display">Who to follow</h1>
          <p className="dek">
            The best people to follow in recruiting and HR, and for your job search. Some are funny. All of them know their stuff.
          </p>
        </div>
      </header>
      <section className="wrap sec-tight">
        <WhoToFollow />
      </section>
      <NextStep side="both" line="Ready to pick your tools? Answer a few questions and get your best match." button="Help me choose" href="/what-should-i-use#questions" />
      <SiteFooter />
    </>
  )
}
