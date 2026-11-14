import type { Metadata } from 'next'
import { siteCss } from '@/app/(rebrand)/_components/site-css'
import { SiteNav, SiteFooter, chromeCss } from '@/app/(rebrand)/_components/site-chrome'
import { Capture } from '@/app/(rebrand)/_components/capture'
import { Logo } from '@/app/(rebrand)/_components/logo'
import { captureCss } from '@/app/(rebrand)/_components/widgets-css'
import { JsonLd, graph, SITE } from '@/app/(rebrand)/_components/structured'
import { atsCapability } from '@/lib/evidence/recommend'
import ats from '@/lib/scorecards/ats-small-teams.json'
import { REPVERA_WHAT, repveraLink } from '@/lib/repvera'

/**
 * "Is this even a real candidate?": the FBI's red flags for fake
 * candidates, what to change in the process, and which systems we track
 * have fraud detection on file. Every item names its source.
 */

const FBI_2025 = { name: 'FBI Internet Crime Complaint Center, I-012325-PSA, January 23, 2025', url: 'https://www.ic3.gov/PSA/2025/PSA250123' }
const FBI_2022 = { name: 'FBI Internet Crime Complaint Center, PSA220628, June 28, 2022', url: 'https://www.ic3.gov/PSA/2022/PSA220628' }
const GARTNER = { name: 'HR Dive, reporting Gartner, July 2025', url: 'https://www.hrdive.com/news/fake-job-candidates-ai/757126/' }

const FLAGS: { stage: string; items: { text: string; src: typeof FBI_2025 }[] }[] = [
  {
    stage: 'Before the interview',
    items: [
      { text: 'Check your applicant tracking system for other applicants with the same resume content or contact information.', src: FBI_2025 },
      { text: 'Check resumes for typos and unusual wording.', src: FBI_2025 },
      { text: 'Verify identity during interviewing, not only at onboarding.', src: FBI_2025 },
    ],
  },
  {
    stage: 'During a video interview',
    items: [
      { text: 'Watch for lip movement that doesn’t match the audio, or a cough or sneeze with no matching movement.', src: FBI_2022 },
      { text: 'Know that face-swapping software has been used to hide who is really on camera.', src: FBI_2025 },
      { text: 'Ask “soft” questions for specific details about where they live and where they studied.', src: FBI_2025 },
    ],
  },
  {
    stage: 'After the offer',
    items: [{ text: 'Do as much of the hiring and onboarding as you can in person.', src: FBI_2025 }],
  },
]

export const metadata: Metadata = {
  title: 'Is This Even a Real Candidate? The FBI’s Red Flags for Fake Job Candidates',
  description:
    'In a Gartner survey of 3,000 candidates, 6% admitted to interview fraud. The FBI’s red flags for fake candidates, what to change in your process, and which applicant tracking systems have fraud detection built in.',
  alternates: { canonical: '/is-this-a-real-candidate' },
}

const css = `
  .flags{display:grid;gap:36px;margin-top:28px;}
  .flag-stage h3{font-weight:900;font-size:clamp(22px,2.4vw,28px);letter-spacing:-0.015em;padding-bottom:10px;border-bottom:2px solid var(--ink);}
  .flag{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;padding:16px 0;border-bottom:1px solid var(--rule);}
  .flag::before{content:"";width:18px;height:18px;margin-top:4px;border:2px solid var(--coral);border-radius:4px;}
  .flag p{font-size:18px;line-height:1.5;color:var(--ink);font-weight:600;}
  .flag a{display:inline-block;margin-top:4px;font-size:13.5px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .sys{display:grid;gap:0;border-top:1px solid var(--rule);margin-top:28px;}
  .sys-row{display:grid;grid-template-columns:auto minmax(0,1fr);gap:18px;padding:22px 0;border-bottom:1px solid var(--rule);align-items:start;}
  .sys-row b{font-size:21px;font-weight:800;}
  .sys-row p{color:var(--ink-2);margin-top:4px;}
  .sys-row a{font-size:13.5px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .sys-note{margin-top:16px;font-size:15px;color:var(--ink-3);max-width:760px;}
  .other{max-width:820px;border-left:4px solid var(--indigo);padding:4px 0 4px 24px;}
  .other-k{display:block;font-size:15px;font-weight:800;color:var(--indigo-text);}
  .other p{font-size:clamp(19px,1.9vw,22px);line-height:1.5;color:var(--ink);font-weight:600;margin-top:8px;}
  .other a{display:inline-block;margin-top:10px;font-size:14px;color:var(--ink-3);text-decoration:underline;text-underline-offset:3px;}
  .ours{max-width:760px;border-left:4px solid var(--indigo);padding:4px 0 4px 24px;}
  .ours-k{display:block;font-size:14px;font-weight:800;color:var(--indigo-text);}
  .ours p{font-size:18px;line-height:1.55;color:var(--ink);margin-top:6px;}
  .ours a{display:inline-block;margin-top:10px;}
`

export default function RealCandidatePage() {
  const systems = ats.tools
    .map((t) => ({ t, c: atsCapability('fraud-detection', t.name) }))
    .filter((x) => x.c)
  const others = ats.tools.length - systems.length
  const url = `${SITE}/is-this-a-real-candidate`
  const ld = graph({
    '@type': 'FAQPage',
    url,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you spot a fake job candidate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The FBI's red flags: ${FLAGS.flatMap((f) => f.items.map((i) => i.text)).join(' ')} Sources: ${FBI_2025.name}; ${FBI_2022.name}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Which applicant tracking systems have fraud detection built in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Of the systems hiring.productions tracks, ${systems.map((x) => `${x.t.name} (${x.c!.what}; ${x.c!.source}, ${x.c!.date})`).join(' and ')}. Features as the vendors describe them; not tested by us.`,
        },
      },
    ],
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + chromeCss + captureCss + css }} />
      <JsonLd data={ld} />
      <SiteNav active="hiring" />

      <header className="ph">
        <div className="wrap">
          <p className="crumbs">
            <a href="/">Home</a> / <a href="/for-hiring-teams">For hiring teams</a> / Fake candidates
          </p>
          <h1 className="display">Is this even a real candidate?</h1>
          <p className="dek">
            In a Gartner survey of 3,000 candidates, 6% said they had taken part in interview fraud, posing as someone else or having someone
            stand in for them. The FBI has warned employers more than once. Here are its red flags, and which systems flag fraud for you.
          </p>
          <p className="dateline">
            Sources:{' '}
            <a href={FBI_2025.url} rel="nofollow noopener" target="_blank">
              FBI, 2025
            </a>
            ,{' '}
            <a href={FBI_2022.url} rel="nofollow noopener" target="_blank">
              FBI, 2022
            </a>
            ,{' '}
            <a href={GARTNER.url} rel="nofollow noopener" target="_blank">
              Gartner via HR Dive
            </a>
            . Read November 14, 2026.
          </p>
        </div>
      </header>

      <section className="wrap sec-tight" id="red-flags">
        <h2>The red flags, from the FBI</h2>
        <div className="flags">
          {FLAGS.map((f) => (
            <div className="flag-stage" key={f.stage}>
              <h3>{f.stage}</h3>
              {f.items.map((i) => (
                <div className="flag" key={i.text}>
                  <div>
                    <p>{i.text}</p>
                    <a href={i.src.url} rel="nofollow noopener" target="_blank">
                      {i.src.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec-tight" id="keep">
        <Capture
          source="fraud_checklist"
          audience="hiring"
          promise="Email me this checklist, ready to forward to my interviewers."
          cta="Email me the checklist"
          done="Sent. Forward it to your panel."
          askCompanySize
        />
      </section>

      <section className="wrap sec" id="systems">
        <h2>Which systems flag fraud for you</h2>
        <p className="lead">
          Of the applicant tracking systems we track, these have fraud detection on their own product pages. For the other {others}, we
          have nothing on file yet, which isn&rsquo;t the same as not having it.
        </p>
        <div className="sys">
          {systems.map(({ t, c }) => (
            <div className="sys-row" key={t.name}>
              <Logo domain={t.domain} name={t.name} size={44} />
              <div>
                <b>{t.name}</b>
                <p>{c!.what}.</p>
                <a href={c!.url} rel="nofollow noopener" target="_blank">
                  {c!.source}, {c!.date}
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="sys-note">
          These are features as the vendors describe them. We haven&rsquo;t tested how well they work, and we found no independent accuracy
          data yet.{' '}
          <a className="tl" href="/what-should-i-use?side=hiring&problem=fake-candidates#questions">
            Which one fits your team size and budget?
          </a>
        </p>
      </section>

      <section className="wrap sec" id="candidates">
        <aside className="other" aria-label="What candidates see">
          <span className="other-k">What candidates see</span>
          <p>
            Real candidates go through the checks too. In Greenhouse&rsquo;s version, candidates confirm who they are through CLEAR, with
            biometric and government ID verification. Tell candidates before the interview what you check and why.
          </p>
          <a href="https://www.greenhouse.com/product-features/greenhouse-real-talent" rel="nofollow noopener" target="_blank">
            Source: Greenhouse, Real Talent product page, February 2026
          </a>
        </aside>
      </section>

      <section className="wrap sec" id="repvera">
        <aside className="ours" aria-label="From the team behind hiring.productions">
          <span className="ours-k">From the team behind hiring.productions</span>
          <p>{REPVERA_WHAT}</p>
          <a className="tl tl-strong" href={repveraLink('real-candidate')} rel="noopener">
            See how RepVera works <span className="arr">&#8599;</span>
          </a>
        </aside>
      </section>

      <SiteFooter />
    </>
  )
}
