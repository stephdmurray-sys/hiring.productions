import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { shortListCss } from '@/app/(rebrand)/_components/short-list'
import { ToolHero, StepHead, FreeCards, toolPageCss, freeSearchCss } from '@/app/(rebrand)/_components/tool-hero'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { Dots } from '@/app/(rebrand)/_components/retro'
import { keepLast } from '@/lib/site-line'
import { moneyLine } from '@/lib/money'
import { formatDate, latestCheck, resumeTools, risingPick } from '@/lib/evidence'
import { recFramework } from '@/lib/evidence/recommend'
import { FREE_TOOLS } from '@/lib/evidence/kit'

/**
 * The $0 job search (Stephanie approved, Nov 15, 2026): every resume tool we
 * rate that has a real free version (not a trial), what free gets you, and the
 * free tools on this site. Everything comes from the same data as the
 * rankings (resume-guide.json), so it changes when the monthly check does.
 */

export const metadata: Metadata = {
  title: 'The $0 Job Search: Resume Tools With a Real Free Version, and What Free Gets You',
  description:
    'The resume builders, checkers and job trackers we rate that have a free version you can keep using, what each free plan includes, and the free tools on hiring.productions.',
  alternates: { canonical: '/free-job-search' },
}

const caps = recFramework.seekers.capabilities as unknown as Record<string, string[]>
const KIND: [string, string][] = [
  ['checker', 'checker'],
  ['builder', 'builder'],
  ['tracker', 'job tracker'],
]
function kindOf(id: string): string {
  const k = KIND.filter(([c]) => caps[c]?.includes(id)).map(([, w]) => w)
  const s = k.length < 3 ? k.join(' and ') : `${k.slice(0, -1).join(', ')} and ${k[k.length - 1]}`
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** "Yes. The free plan gives you X. Pro is $60 a year." becomes free: "The free plan gives you X." and upgrade: "Pro is $60 a year." */
function split(answer: string): { free: string; upgrade: string } {
  const sentences = answer.replace(/^Yes[.,]\s*(with\s+)?/i, '').split(/(?<=\.)\s+/)
  const free = sentences.filter((x) => !x.includes('$')).join(' ')
  const upgrade = sentences.filter((x) => x.includes('$')).join(' ')
  return { free: free.charAt(0).toUpperCase() + free.slice(1), upgrade }
}

export default function Page() {
  const free = resumeTools()
    .all.filter((t) => t.freeLevel === 'full' && t.overall !== null)
    .sort((a, b) => (b.overall ?? 0) - (a.overall ?? 0))
  const checked = latestCheck()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + shortListCss + toolPageCss + freeSearchCss }} />
      <SiteNav active="seekers" />
      <ToolHero
        side="seekers"
        crumbs={
          <>
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / The $0 job search
          </>
        }
        sticker="No trial clock"
        title="The $0 job search"
        dek={`${free.length} of the resume tools we rate have a free version you can keep using. Here’s what each one gives you for free, plus the free tools on this site.`}
        dateline={`Free plans checked ${formatDate(checked)}`}
      />

      <section className="wrap sec sl-sec sl-sec-seekers" id="free-tools">
        <StepHead title="Resume tools with a real free version" sub="Ranked by score, the same scores as our rankings." />
        <div className="sl-tools">
          {free.map((t) => {
            const { free: f, upgrade } = split(t.freeAnswer)
            const pick = risingPick.tool === t.id
            return (
              <div className="sl-tool sl-tool-seekers" key={t.id}>
                <div className="sl-top">
                  <Logo domain={t.domain} name={t.name} size={52} />
                  <div>
                    <span className="sl-kind">{kindOf(t.id)}</span>
                    <h3 className="sl-name">{t.name}</h3>
                  </div>
                </div>
                <p className="fj-score">
                  <span className="rec-bar" aria-hidden="true">
                    <i style={{ width: `${((t.overall ?? 0) / 5) * 100}%` }} />
                  </span>
                  {(t.overall ?? 0).toFixed(2)} out of 5
                </p>
                {pick && <span className="sl-label sl-label-seekers">{risingPick.label}</span>}
                <p className="sl-line fj-free">
                  <b>Free: </b>
                  {keepLast(f)}
                </p>
                {upgrade && <p className="fj-up">If you upgrade later: {upgrade}</p>}
                <div className="sl-act">
                  <span className="kit-go">
                    <a className="sl-go" href={`/go/${t.id}`} rel="nofollow noopener">
                      Go to {t.name} <span className="arr">&#8599;</span>
                    </a>
                    <span className="money">{moneyLine(t.id)}</span>
                  </span>
                  <a className="tl fj-review" href={`/reviews/${t.id}`}>
                    Is {t.name} worth it? <span className="arr">&rarr;</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="wrap sec sl-sec sl-sec-seekers" id="free-here">
        <StepHead title="Free on this site" sub="No account, no trial, and nothing you type is kept unless you ask us to email it." />
        <FreeCards items={[FREE_TOOLS.screening, FREE_TOOLS.interviewPractice, FREE_TOOLS.proofKit, FREE_TOOLS.portfolio, FREE_TOOLS.realJob, FREE_TOOLS.listCheck]} />
      </section>

      <section className="wrap sec" id="signup" style={{ paddingBottom: 'clamp(96px,11vw,150px)' }}>
        <div className="tp-signup tp-signup-seekers">
          <Dots />
          <h2>Get an email if a free plan&nbsp;changes.</h2>
          <EvidenceSignup source="free_plans" page />
        </div>
        <p className="tp-fine">Nobody pays to be featured.</p>
      </section>

      <SiteFooter />
    </>
  )
}
