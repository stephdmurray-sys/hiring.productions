import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { WhoToFollow, followCss } from '@/app/(rebrand)/_components/follow'

export const metadata: Metadata = {
  alternates: { canonical: '/who-to-follow' },
  title: 'Who to Follow: The Best in Talent Acquisition, and the Most Helpful Voices for Job Seekers',
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
            The best voices in talent acquisition, and the people who make a job search easier to survive. Some will make you laugh
            about work. All of them know what they are talking about.
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
