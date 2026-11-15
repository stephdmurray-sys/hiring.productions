import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { keepLast } from '@/lib/site-line'
import { formatDate } from '@/lib/evidence'

/**
 * "Is this job even real?": the job seeker side of hiring fraud. Copy is
 * Stephanie's, word for word (Nov 14, 2026). No tool is recommended here:
 * we haven't found a scam checker worth recommending, and the page says so.
 */

const PATH = '/is-this-a-real-job'
const CHECKED = '2026-11-14'
const FTC = 'https://reportfraud.ftc.gov'

const INTRO = 'Fake job postings and fake recruiters are everywhere right now. These are the signs to check before you send a resume or anything else.'

const SIGNS = [
  'They ask you to pay for anything: training, equipment, a background check.',
  'The email comes from a lookalike address, such as amazon-jobs.net in place of amazon.com.',
  'They offer you the job with no real interview.',
  'They push the conversation to WhatsApp, Telegram or another private app.',
  'You can’t find the job on the company’s own website.',
  'The pay is far above what the job usually pays.',
]

const TOOLS_LINE = 'We haven’t found a scam checker we’d recommend yet. When we do, it’ll be on this page.'
const REAL_CHECKS =
  'Some employers now verify your identity during hiring. A real check comes from the company or a named verification service, never costs you money, and never asks for bank details before an offer.'

export const metadata: Metadata = {
  title: 'Is This Job Even Real? How to Spot a Fake Job Posting or a Fake Recruiter',
  description: INTRO,
  alternates: { canonical: PATH },
}

const css = `
  .signs{list-style:none;display:grid;gap:0;margin-top:8px;max-width:820px;border-top:2px solid var(--ink);}
  .signs li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;padding:20px 0;border-bottom:1px solid var(--rule);font-size:clamp(18px,1.9vw,21px);line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .signs li::before{content:"";width:20px;height:20px;margin-top:4px;border:3px solid var(--indigo);border-radius:5px;}
  .todo{list-style:none;display:grid;gap:14px;margin-top:24px;max-width:780px;}
  .todo li{position:relative;padding-left:26px;font-size:clamp(18px,1.8vw,20px);line-height:1.55;color:var(--ink);text-wrap:pretty;}
  .todo li::before{content:"";position:absolute;left:2px;top:.6em;width:10px;height:10px;border-radius:50%;background:var(--indigo);}
  .note-k{font-size:15px;font-weight:900;color:var(--ink);margin:0 0 12px;}
  .note-p{font-size:clamp(19px,1.9vw,22px);line-height:1.55;color:var(--ink);font-weight:600;max-width:780px;padding-left:20px;border-left:4px solid var(--indigo);text-wrap:pretty;}
  .note + .note{margin-top:48px;}
  .job-signup{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:end;border-top:1px solid var(--ink);padding-top:40px;}
  @media(max-width:760px){.job-signup{grid-template-columns:1fr;gap:20px;}}
`

export default function Page() {
  const url = `${SITE}${PATH}`
  const ld = graph(
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      dateModified: CHECKED,
      publisher: { '@id': `${SITE}/#organization` },
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I know a job posting is real?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${INTRO} ${SIGNS.join(' ')} When in doubt, find the job on the company’s own website and apply there. Report a fake posting to the job board it’s on, and to the Federal Trade Commission at reportfraud.ftc.gov.`,
            url,
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'For job seekers', item: `${SITE}/for-job-seekers` },
        { '@type': 'ListItem', position: 3, name: 'Is this job even real?', item: url },
      ],
    },
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Is this job even real?
          </p>
          <h1 className="display">Is this job even real?</h1>
          <p className="dek">{keepLast(INTRO)}</p>
          <p className="dateline">Last checked {formatDate(CHECKED)}</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="signs" aria-label="The signs to check">
        <ul className="signs">
          {SIGNS.map((s) => (
            <li key={s}>{keepLast(s)}</li>
          ))}
        </ul>
      </section>

      <section className="wrap sec" id="what-to-do">
        <h2>What to do</h2>
        <ul className="todo">
          <li>{keepLast('When in doubt, find the job on the company’s own website and apply there.')}</li>
          <li>
            Report a fake posting to the job board it&rsquo;s on, and to the Federal Trade Commission at{' '}
            <a className="tl" href={FTC} rel="nofollow noopener" target="_blank">
              reportfraud.ftc.gov
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="wrap sec" id="tools">
        <div className="note">
          <h2 className="note-k">On tools</h2>
          <p className="note-p">{keepLast(TOOLS_LINE)}</p>
        </div>
        <div className="note">
          <h2 className="note-k">What real checks look like</h2>
          <p className="note-p">{keepLast(REAL_CHECKS)}</p>
        </div>
      </section>

      <section className="wrap sec" id="signup" style={{ paddingBottom: 'clamp(96px,11vw,150px)' }}>
        <div className="job-signup">
          <h2>Get an email when this page&nbsp;changes.</h2>
          <EvidenceSignup source="real_job" page />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
