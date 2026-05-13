'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HubQuestionsBlock } from '@/components/hub-questions-block'
import { RepVeraMoment } from '@/components/repvera-moment'
import { BilateralCallout } from '@/components/bilateral-callout'
import { ToolCard } from '@/components/tool-card'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'

const LAYOFF_TOOLS = [
  'How to Explain My Employment Gap',
  'What’s Breaking Your Job Search',
  'Have I Been Ghosted?',
  'Does My Resume Read as AI?',
] as const

const LAYOFF_PRO_TEASE = [
  'Through a Recruiter’s Eyes',
  'Your LinkedIn — Rewritten',
] as const

interface QA {
  question: string
  answer: string[]
}

const QA_BLOCKS: QA[] = [
  {
    question: 'How long does it actually take to find a job after a layoff?',
    answer: [
      'Honest read: for mid-career roles, most searches after a layoff run four to nine months from severance to start date. Senior and director-level roles run longer — fewer openings, more rounds, more committee. The biggest drivers of speed are network strength, how cleanly your materials are positioned, and how concentrated your target field is.',
      'The "couple of months" timeline you hear from career coaches assumes everything goes well, your network is warm, and you start looking the week you’re laid off. Real timelines are longer. Plan for the longer end and be pleasantly surprised.',
      'The candidates who land fastest aren’t the ones who apply to the most jobs — they’re the ones who spend the first two weeks rebuilding materials, the next two reactivating their network, and only then start applying at volume. Volume on a stale resume is wasted volume.',
    ],
  },
  {
    question: 'How should I explain being laid off in an interview?',
    answer: [
      'Name it directly, in one sentence. "I was laid off in [month] when [company] cut [X%] of [team/division]." That’s it.',
      'Then pivot immediately to what you’re ready for now. The mistake candidates make is over-explaining — apologizing, blaming, or telling the long version. Hiring managers in 2026 hear "layoff" multiple times a week and have since the 2023 cycle. It is one of the most normalized words in your story right now, and it will not be the thing that costs you the role.',
      'Two phrases to avoid: "let go" (vague, sounds like a euphemism) and "decided to leave" (if you didn’t decide, don’t imply you did — recruiters check). Just say "I was laid off."',
    ],
  },
  {
    question: 'Should I tell recruiters I was laid off, or say I’m "exploring"?',
    answer: [
      'Tell them you were laid off. Saying you’re "exploring" or "having conversations" when you’re actively unemployed signals exactly one thing to a recruiter: you’re unemployed and you’re trying to hide it.',
      'Recruiters are wired to read between lines. The "exploring" framing tells them you’re ashamed of the situation, which makes them assume the worst about why. The direct framing — "I was laid off in March, looking to land by summer" — tells them you’re self-aware and prepared.',
      'The exception: if you have severance for 6+ months and you’re genuinely being selective, you can say "I’m on a runway through [month] and being thoughtful about the next role." Only use this if it’s actually true.',
    ],
  },
  {
    question: 'What goes on my resume now that I’m unemployed?',
    answer: [
      'Your most recent role still goes at the top, with the end date as the actual end date (e.g. "Senior Product Manager, Acme · 2021 – March 2025"). Don’t hide that the role ended. Don’t write "2021 – Present" if you’re not there anymore — recruiters background-check.',
      'If the gap since the layoff is under 3 months, don’t add anything else. The dates explain themselves.',
      'If the gap is over 3 months and you’ve been doing things (freelancing, certifications, consulting, board work, caregiving) — add a one-line entry under your most recent role: "Career break (April 2025 – present) — UX certification (Coursera, completed July), freelance brand strategy for two seed-stage startups." Specific, brief, no apology.',
      'The single biggest resume mistake after a layoff: leaving the previous role open-ended ("2021 – Present" when you’re not there) to hide the gap. Recruiters cross-check LinkedIn during the first screen and notice. Background checks catch it at the offer stage — and offers get pulled for it.',
    ],
  },
  {
    question: 'How do I follow up when recruiters go silent?',
    answer: [
      'Silence after a layoff search hits harder than usual. It feels personal. It almost never is — recruiters disappear because budget froze, the HM left for vacation, an internal candidate emerged, the role went on hold, or they got reassigned to another req.',
      'The follow-up rules: one thoughtful email after 7-10 days at the resume stage. One after 7-14 days at the phone-screen stage. One after 10-14 days at the onsite stage. After that — move on. More than one follow-up actively hurts you.',
      'A good follow-up isn’t "still interested?" It’s a 3-sentence note that includes one specific value-add (a relevant article, a thought, an answer to something they asked) and ends with a low-pressure close. The "Have I Been Ghosted?" tool will write the email for your specific situation.',
    ],
  },
  {
    question: 'Should I take any job offered, even if it’s a step down?',
    answer: [
      'Generally no, but the "no" comes with conditions.',
      'Taking a clearly-below-level role usually hurts your next search more than a longer gap would. Once you have "Director" on your resume followed by "Associate," the next set of recruiters reads the trajectory as a downgrade, not a stepping stone. The penalty for "took anything to stay employed" is real and lasts longer than the penalty for "stayed unemployed two extra months."',
      'The exception: a role at a much stronger company, even at a slightly lower level, can be a credible move if you spend at least 18 months there and exit at the right level. "Joined Stripe as a Senior PM after being a Director at a Series C" reads as strategic.',
      'The other exception: a contract role that explicitly is contract. Recruiters read contract-to-bridge differently than full-time step-down. Make sure the title and contract status are clear on your resume.',
    ],
  },
  {
    question: 'How do I keep my LinkedIn from screaming "unemployed"?',
    answer: [
      'Don’t put "Open to Work" in your headline as a green frame around your photo. Recruiters in some industries see it; in others it filters you out of "passive candidate" searches. Use the in-profile "Open to Work" setting with the recruiters-only visibility option turned on instead — it puts you in the right searches without broadcasting it.',
      'Update your headline to position you AT the level you want next, with the exact terms recruiters search for. "Senior Director, Talent Acquisition · Healthcare · Recruitment Marketing" works. "Talent Acquisition Leader Open to New Opportunities" doesn’t — that headline gets zero search traffic.',
      'Don’t announce the layoff at the top of your About section. Lead with what you do, work the layoff in matter-of-factly toward the end if at all. Your headline and first two lines are search real estate, not therapy.',
    ],
  },
]

export default function AfterLayoffPage() {
  const tools: CatalogTool[] = LAYOFF_TOOLS.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  const proTools: CatalogTool[] = LAYOFF_PRO_TEASE.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      <section
        style={{
          padding: '110px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 900px 600px at 50% -100px, rgba(108,71,255,0.18) 0%, rgba(108,71,255,0.10) 35%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: '22px',
            }}
          >
            ◆ AFTER A LAYOFF
          </div>

          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 76px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: '#F2F0FF',
              margin: '0 0 22px',
            }}
          >
            You weren’t your job.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              You still aren’t.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              color: '#9D9CB3',
              lineHeight: 1.55,
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Free tools and recruiter-grade answers for the search after a layoff. What to say, when
            to follow up, what to put on the resume, and how long this realistically takes — no
            sanitizing.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#A78BFA',
              letterSpacing: '0.03em',
              marginTop: '20px',
            }}
          >
            By Stephanie Murray · 20 years in talent acquisition · Built the TA function at Brightside Health
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 24px 30px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="START HERE — FREE"
            eyebrowColor="#A78BFA"
            title="Four free tools for the search after a layoff."
            sub="Frame the gap. Diagnose why applications aren’t converting. Decode the silence when it comes."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '32px',
            }}
          >
            {tools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 24px 30px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="THE QUESTIONS AFTER A LAYOFF"
            eyebrowColor="#A78BFA"
            title="The honest read on the search after a layoff."
            sub="The questions every laid-off candidate Googles, answered the way a recruiter actually answers them — direct, specific, kind."
          />

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {QA_BLOCKS.map((item, idx) => (
              <article
                key={idx}
                style={{
                  background: '#14141B',
                  border: '1px solid rgba(108,71,255,0.18)',
                  borderRadius: '16px',
                  padding: '28px 30px',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(20px, 2.2vw, 24px)',
                    letterSpacing: '-0.015em',
                    color: '#F2F0FF',
                    lineHeight: 1.25,
                    margin: '0 0 14px',
                  }}
                >
                  {item.question}
                </h3>
                {item.answer.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#C9C7DA',
                      lineHeight: 1.65,
                      margin: '0 0 12px',
                    }}
                  >
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '70px 24px 30px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="WHEN YOU’RE READY TO APPLY"
            eyebrowColor="#A78BFA"
            title="Make sure your resume and LinkedIn carry the new positioning."
            sub="That's the honest read. Here are the Recruiter Insights every laid-off candidate uses before they send the first application — $20/year."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '20px',
              marginTop: '32px',
            }}
          >
            {proTools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 24px 100px' }}>
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            background: '#14141B',
            border: '1px solid rgba(108,71,255,0.30)',
            borderRadius: '22px',
            padding: '48px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -100,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 460,
              height: 460,
              background: 'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: '16px',
              position: 'relative',
            }}
          >
            ◆ START WITH THE FRAME
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 42px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: '#F2F0FF',
              margin: '0 0 16px',
              position: 'relative',
            }}
          >
            Frame the gap before you send anything.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15.5px',
              color: '#9D9CB3',
              lineHeight: 1.6,
              margin: '0 0 28px',
              position: 'relative',
            }}
          >
            Get three honest scripts — resume one-liner, cover letter version, interview answer —
            in your voice. Free.
          </p>
          <Link
            href="/tools/explain-my-gap"
            style={{
              display: 'inline-block',
              padding: '15px 32px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: 'white',
              borderRadius: '12px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 18px 40px rgba(108,71,255,0.30)',
              position: 'relative',
            }}
          >
            Build my scripts →
          </Link>
        </div>
      </section>

      <HubQuestionsBlock
        title="Questions after a layoff"
        items={[
          { question: 'How to explain a gap on my resume', href: '/q/explain-resume-gap' },
          { question: 'Is my resume good?', href: '/q/is-my-resume-good' },
          { question: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
          { question: 'Why am I not getting responses?', href: '/q/why-am-i-not-getting-responses' },
        ]}
      />

      <BilateralCallout audience="candidate" />

      <RepVeraMoment
        title="The layoff isn't your story. RepVera makes the next chapter visible."
        body="A resume forces you to explain a gap the recruiter already noticed. RepVera is a personal page that leads with what you've built and what you're heading toward — not where you got cut. Free to start, takes 10 minutes."
      />

      <Footer />
    </main>
  )
}

function SectionHeader({
  eyebrow,
  eyebrowColor,
  title,
  sub,
}: {
  eyebrow: string
  eyebrowColor: string
  title: string
  sub: string
}) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '11px',
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: eyebrowColor,
          marginBottom: '14px',
        }}
      >
        <span style={{ width: 24, height: 1, background: eyebrowColor, opacity: 0.6 }} />
        {eyebrow}
        <span style={{ width: 24, height: 1, background: eyebrowColor, opacity: 0.6 }} />
      </div>
      <h2
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          color: '#F2F0FF',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          color: '#9D9CB3',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {sub}
      </p>
    </div>
  )
}
