import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { EvidenceSignup } from '@/app/(rebrand)/_components/evidence-signup'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { keepLast } from '@/lib/site-line'
import { formatDate } from '@/lib/evidence'
import { Dots, Squiggle, Zigzag, retroCss } from '@/app/(rebrand)/_components/retro'
import { KnowList, knowCss } from '@/app/(rebrand)/_components/know-list'
import { moneyCss } from '@/lib/money'
import { JOB_CHECKS } from '@/lib/evidence/tools-to-know'

/**
 * "Is this job even real?": the job seeker side of hiring fraud. Copy is
 * Stephanie's, word for word (Nov 14, 2026). No scam checker is recommended:
 * we haven't found one worth recommending, and the page says so. The free
 * official ways to check (BBB, LinkedIn, ICANN, state registries) were added
 * Nov 16, 2026 from the value audit.
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
  .job-hero{position:relative;overflow:hidden;background:var(--indigo);color:#fff;padding:clamp(40px,6vw,80px) 0 clamp(48px,6vw,84px);border-bottom:3px solid var(--ink);}
  .job-hero .wrap{position:relative;}
  .job-hero .crumbs,.job-hero .crumbs a,.job-hero .dek,.job-hero .dateline{color:inherit;}
  .job-hero .crumbs a{text-decoration-color:currentColor;}
  .job-hero h1,.job-hero .dek{position:relative;z-index:2;color:inherit;}
  .job-hero :focus-visible{outline-color:currentColor;}
  .job-hero .m-dots{top:-6px;right:5%;color:var(--lavender);}
  .job-hero .m-zig{bottom:-40px;right:24%;color:var(--coral);}
  .job-hero .m-squig{top:48%;right:8%;color:#fff;}
  @media(max-width:760px){.job-hero .m-squig{display:none;}.job-hero .m-zig{right:8%;}.job-hero .m-dots{top:-30px;right:-62px;}}
  .job-sticker{position:relative;z-index:2;display:inline-block;margin:6px 0 18px;padding:9px 14px 8px;font-weight:900;font-size:14px;line-height:1;letter-spacing:.08em;text-transform:uppercase;background:var(--coral);color:var(--ink);border:3px solid var(--ink);border-radius:10px;box-shadow:4px 4px 0 var(--ink);transform:rotate(-4deg);}
  .signs{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:22px;margin:0;padding:0;}
  .sign{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:start;padding:22px;background:#fff;border:3px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);font-size:clamp(17px,1.7vw,19px);line-height:1.5;font-weight:700;color:var(--ink);text-wrap:pretty;}
  .sign-n{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:var(--coral);color:var(--coral-deep);border:3px solid var(--ink);font-weight:900;font-size:18px;line-height:1;transform:rotate(-6deg);}
  .todo{list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr));gap:22px;margin-top:28px;padding:0;}
  .todo li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:16px;align-items:start;padding:22px;background:var(--indigo-tint);border:3px solid var(--ink);border-radius:16px;box-shadow:6px 6px 0 var(--ink);font-size:clamp(17px,1.7vw,19px);line-height:1.55;font-weight:600;color:var(--ink);text-wrap:pretty;}
  .todo-n{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;background:var(--indigo);color:#fff;border:3px solid var(--ink);font-weight:900;font-size:18px;line-height:1;}
  .notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:28px;}
  .note{position:relative;padding:clamp(22px,3vw,32px);background:#fff;border:3px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--ink);}
  .note .m-squig{top:-16px;right:24px;color:var(--coral);}
  .note-k{position:relative;z-index:2;font-size:clamp(22px,2.4vw,28px);font-weight:900;letter-spacing:-0.015em;line-height:1.15;color:var(--ink);margin:0 0 12px;}
  .note-p{position:relative;z-index:2;font-size:clamp(18px,1.8vw,20px);line-height:1.55;color:var(--ink-2);font-weight:600;margin:0;text-wrap:pretty;}
  .job-signup{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:end;padding:clamp(28px,4vw,44px);background:var(--indigo-tint);border:3px solid var(--ink);border-radius:20px;box-shadow:8px 8px 0 var(--ink);}
  .job-signup .m-dots{top:-34px;right:-26px;color:var(--lavender);}
  .job-signup > :not(.memphis){position:relative;z-index:2;}
  @media(max-width:760px){.job-signup{grid-template-columns:1fr;gap:20px;}.job-signup .m-dots{right:-10px;}}
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
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + retroCss + moneyCss + knowCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="seekers" />

      <header className="job-hero">
        <div className="wrap">
          <Dots />
          <Zigzag />
          <Squiggle />
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-job-seekers">For job seekers</a> / Is this job even real?
          </p>
          <p className="job-sticker">{SIGNS.length} signs to check</p>
          <h1 className="display">Is this job even real?</h1>
          <p className="dek">{keepLast(INTRO)}</p>
          <p className="dateline">Last checked {formatDate(CHECKED)}</p>
        </div>
      </header>

      <section className="wrap sec-tight" id="signs" aria-label="The signs to check">
        <ol className="signs">
          {SIGNS.map((s, i) => (
            <li className="sign" key={s}>
              <span className="sign-n" aria-hidden="true">
                {i + 1}
              </span>
              <span>{keepLast(s)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap sec" id="what-to-do">
        <h2>What to do</h2>
        <ol className="todo">
          <li>
            <span className="todo-n" aria-hidden="true">
              1
            </span>
            <span>{keepLast('When in doubt, find the job on the company’s own website and apply there.')}</span>
          </li>
          <li>
            <span className="todo-n" aria-hidden="true">
              2
            </span>
            <span>
              Report a fake posting to the job board it&rsquo;s on, and to the Federal Trade Commission at{' '}
              <a className="tl" href={FTC} rel="nofollow noopener" target="_blank">
                reportfraud.ftc.gov
              </a>
              .
            </span>
          </li>
        </ol>
      </section>

      <section className="wrap sec" id="check">
        <h2>Free ways to check it yourself</h2>
        <p className="lead">{keepLast('Look up the phone number, the email domain and the company before you send anything.')}</p>
        <KnowList tools={JOB_CHECKS} side="seekers" />
      </section>

      <section className="wrap sec" id="tools">
        <div className="notes">
          <div className="note">
            <h2 className="note-k">On tools</h2>
            <p className="note-p">{keepLast(TOOLS_LINE)}</p>
          </div>
          <div className="note">
            <Squiggle />
            <h2 className="note-k">What real checks look like</h2>
            <p className="note-p">{keepLast(REAL_CHECKS)}</p>
          </div>
        </div>
      </section>

      <section className="wrap sec" id="signup" style={{ paddingBottom: 'clamp(96px,11vw,150px)' }}>
        <div className="job-signup">
          <Dots />
          <h2>Get an email when this page&nbsp;changes.</h2>
          <EvidenceSignup source="real_job" page />
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
