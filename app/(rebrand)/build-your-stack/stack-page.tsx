import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, toolPageCss } from '@/app/(rebrand)/_components/tool-hero'
import { NextStep } from '@/app/(rebrand)/_components/next-step'
import { StackBuilder } from '@/app/(rebrand)/_components/stack-builder'
import { stackCss } from '@/app/(rebrand)/_components/stack-css'
import { JsonLd, graph, PERSON, SITE } from '@/app/(rebrand)/_components/structured'
import { atsAsOf } from '@/app/(rebrand)/_components/data'
import { formatDate, latestCheck } from '@/lib/evidence'
import { hiringLane, seekerLane, type Lane } from '@/lib/stack'
import { stackFromQuery } from '@/lib/stack-math'

/**
 * Build your stack: one page per lane. Job seekers click a tool into each
 * part of a search and see the cost for their timeline, the forget-to-cancel
 * cost and the $0 version. Hiring teams do the same for a year, at their
 * team size. The builder itself is stack-builder.tsx; the numbers are
 * lib/stack.ts.
 */

export type SP = Promise<Record<string, string | string[] | undefined>>

export const STACK_PATH = { seekers: '/build-your-stack', hiring: '/build-your-stack/hiring' } as const

export const STACK_COPY = {
  seekers: {
    title: 'What will your job search cost?',
    metaTitle: 'What Will Your Job Search Cost? Build Your Resume Tool Stack and See the Real Total',
    description:
      'Click a resume builder, checker and job tracker into your stack. See the real total for your timeline, the first year if you forget to cancel, the $0 version of the same stack, and the day each plan renews, with a calendar reminder to cancel. From each tool’s own pricing.',
    dek: 'Click a tool into each part of your search. See the real total for your timeline, the $0 version of the same stack, and the day each plan renews, with a calendar reminder to cancel.',
  },
  hiring: {
    title: 'What will your hiring tools cost?',
    metaTitle: 'What Will Your Hiring Tools Cost? Build Your Hiring Stack and See the Year’s Total',
    description:
      'Click an applicant tracking system, interview scorecard and fraud check into your hiring stack. See the year’s cost for your team size, the cost per hire next to SHRM’s median, and what you can run for $0.',
    dek: 'Click a tool into each part of your hiring. See the year’s cost for your team size, what it comes to per hire, and what you can run for $0.',
  },
} as const

export async function StackPage({ lane: which, searchParams }: { lane: Lane; searchParams: SP }) {
  const sp = await searchParams
  const lane = which === 'seekers' ? seekerLane() : hiringLane()
  const one = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? v[0] : v
  }
  const initial = stackFromQuery(lane, one)
  const copy = STACK_COPY[which]
  const path = STACK_PATH[which]
  const other = which === 'seekers' ? 'hiring' : 'seekers'
  const ld = graph({
    '@type': 'WebApplication',
    '@id': `${SITE}${path}#app`,
    name: copy.title,
    url: `${SITE}${path}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    author: PERSON,
    description: copy.description,
  })
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + stackCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active={which} />
      <ToolHero
        side={which}
        crumbs={
          <>
            <a href="/">Home</a> / <a href={which === 'seekers' ? '/for-job-seekers' : '/for-hiring-teams'}>{which === 'seekers' ? 'For job seekers' : 'For hiring teams'}</a> / Build your stack
          </>
        }
        sticker="Click to build"
        title={copy.title}
        dek={copy.dek}
        dateline={
          which === 'seekers'
            ? `Prices from each tool’s own pricing page, checked ${formatDate(latestCheck())} · nobody pays to be in a stack`
            : `Applicant tracking prices as of ${formatDate(atsAsOf)} · nobody pays to be in a stack`
        }
      />

      <section className="wrap sec stk-sec" aria-label="Build your stack">
        <p className="stk-switch">
          {which === 'seekers' ? 'Hiring instead?' : 'Looking for a job instead?'}{' '}
          <a className="tl" href={STACK_PATH[other]}>
            {which === 'seekers' ? 'Build a hiring stack' : 'Build a job search stack'} <span className="arr">&rarr;</span>
          </a>
        </p>
        <StackBuilder lane={lane} initial={initial} path={path} />
      </section>

      <NextStep
        side={which}
        line={which === 'seekers' ? 'Want a single best match for your search? Answer a few questions.' : 'Want a single best match for your team? Answer a few questions.'}
        button="Help me choose"
        href={`/what-should-i-use?side=${which}#questions`}
      />
      <SiteFooter />
    </>
  )
}

const css = `
  .stk-sec{padding-top:clamp(48px,6vw,80px);}
  .stk-switch{margin:0 0 24px;font-size:16px;color:var(--ink-2);font-weight:600;}
`
