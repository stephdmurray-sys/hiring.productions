import type { Metadata } from 'next'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { buildComparison, compareHref, comparePairs, type Comparison } from '@/lib/compare'

/** Every "X vs Y" page, grouped the way people shop: by what the tool does and, for hiring teams, by team size. */

export const metadata: Metadata = {
  title: 'Compare Resume Tools and Applicant Tracking Systems, Two at a Time',
  description:
    'Down to two? See them side by side: ratings, what they really cost, the free versions and a video of each. Resume checkers, resume builders and applicant tracking systems.',
  alternates: { canonical: '/compare' },
}

const css = `
  .cg{margin-top:40px;}
  .cg h3{font-size:clamp(22px,2.2vw,26px);font-weight:900;letter-spacing:-0.01em;}
  .cg ul{columns:2;column-gap:48px;margin-top:14px;max-width:960px;}
  .cg li{list-style:none;padding:12px 0;border-bottom:1px solid var(--rule);break-inside:avoid;font-size:17px;}
  .cg li span{display:block;font-size:14.5px;color:var(--ink-3);margin-top:2px;}
  .cg-end{padding-bottom:clamp(96px,11vw,150px);}
  @media(max-width:760px){.cg ul{columns:1;}}
`

function Group({ title, items }: { title: string; items: { slug: string; c: Comparison }[] }) {
  if (items.length === 0) return null
  return (
    <div className="cg">
      <h3>{title}</h3>
      <ul>
        {items.map(({ slug, c }) => (
          <li key={slug}>
            <a className="tl" href={compareHref(slug)}>
              {c.a.name} vs {c.b.name}
            </a>
            <span>{c.verdict}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CompareIndex() {
  const all = comparePairs().map((p) => ({ slug: p.slug, c: buildComparison(p.slug)! }))
  const by = (group: string) => all.filter((x) => x.c.group === group)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <SiteNav />
      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / Comparisons
          </p>
          <h1 className="display">Down to two?</h1>
          <p className="dek">Every tool we rate against the ones it really competes with: the ratings, what each costs, the free versions and a video of each.</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="job-seekers">
        <h2>For job seekers</h2>
        <Group title="Resume checkers" items={by('resume checkers')} />
        <Group title="Resume builders" items={by('resume builders')} />
        <Group title="Often searched together" items={by('resume tools')} />
      </section>

      <section className="wrap sec cg-end" id="hiring-teams">
        <h2>For hiring teams</h2>
        <Group title="Applicant tracking for small teams" items={by('applicant tracking systems for small teams')} />
        <Group title="Applicant tracking for growing teams" items={by('applicant tracking systems for growing teams')} />
        <Group title="Applicant tracking for scaling teams" items={by('applicant tracking systems for scaling teams')} />
        <Group title="Often searched together" items={by('applicant tracking systems')} />
      </section>
      <NextStep side="both" line="Not sure which tool fits you? Answer a few questions and get your best match." button="Help me choose" href="/what-should-i-use#questions" />
      <SiteFooter />
    </>
  )
}
