import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { WhoToFollow, followCss } from '@/app/(rebrand)/_components/follow'

export const metadata: Metadata = {
  alternates: { canonical: '/who-to-follow' },
  title: 'Who to Follow: Funny and Seriously Helpful Voices for Job Seekers and Hiring Teams',
  description:
    'The people worth your feed on both sides of hiring: career coaches, recruiters and comedians who make the job search and the hiring process easier to survive.',
}

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + followCss }} />
      <SiteNav />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Who to follow
          </p>
          <h1 className="display">Who to follow</h1>
          <p className="dek">
            The people worth your feed, on both sides of the table. Some will make you laugh about work. Some will get you hired, or help
            you hire better.
          </p>
        </div>
      </header>
      <section className="wrap sec-tight">
        <WhoToFollow />
      </section>
      <SiteFooter />
    </>
  )
}
