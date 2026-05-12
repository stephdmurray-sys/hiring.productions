'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HubQuestionsBlock } from '@/components/hub-questions-block'
import { ToolCard } from '@/components/tool-card'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'

const CHANGER_TOOLS = [
  'Your Career Pivot, Translated',
  'What This Job Actually Is',
  'What Words Are Recruiters Searching For?',
  'What’s Breaking Your Job Search',
] as const

const CHANGER_PRO_TEASE = [
  'Your LinkedIn — Rewritten',
  'Through a Recruiter’s Eyes',
] as const

interface QA {
  question: string
  answer: string[]
}

const QA_BLOCKS: QA[] = [
  {
    question: 'How do you switch careers at 30 (or 40, or 50)?',
    answer: [
      'The hard truth: age is one obstacle, but it is not the biggest one for most pivoters. The biggest is translation. Hiring managers in the new field rarely reject pivoters because of age alone — they reject them because the resume still reads like the old field, and they can’t see what they’d hire you to do.',
      'The fix is the through-line: find the underlying competency that connects your old field to the new one, and rewrite every bullet to LEAD with that competency. A teacher pivoting to UX has "designing for users with varying ability levels and constant feedback loops" — that’s product work, just done in a classroom. An account manager pivoting to product has "translating ambiguous client needs into structured plans" — that’s product, just done in an agency.',
      'Once you find the through-line and rewrite the top of your resume around it, the age question almost never comes up. The candidate looks like a peer, not a pivot.',
    ],
  },
  {
    question: 'Do I need a new degree or certification to change careers?',
    answer: [
      'Almost never a degree. Sometimes a certification — but less often than the people selling certifications would have you believe.',
      'Where certifications actually move the needle: regulated and credential-gated fields (CFA for finance pivots, PMP for project management roles, certain compliance and security certs), and fields where the cert is the credible signal of commitment (AWS certifications for cloud roles, CSM / Scrum for agile and project management, and Google’s professional certificates for some entry-level technical roles).',
      'Where certifications don’t help much: marketing, sales, operations, general business roles, design (a portfolio matters far more than a cert), most product roles (a side project or shipped work matters more), executive roles.',
      'The honest test: search LinkedIn for 20 people currently in the target role and look at their profiles. Do most of them have the certification you’re considering? If yes, it’s table stakes. If no, it’s a distraction.',
    ],
  },
  {
    question: 'How do I explain a career change in an interview?',
    answer: [
      'Three beats, in this order: (1) what you did before, framed as the through-line — the competency that transfers. (2) When you realized you wanted to do this work specifically, with a concrete moment or project. (3) What you’re ready for now.',
      'Example: "I spent six years in account management at a B2B agency. The work I loved most was always the analytical side — figuring out why a campaign wasn’t converting and what to change. About 18 months ago I built a small side project for a friend’s startup and realized I wanted to spend my time on product decisions, not pitch decks. I’m ready for an APM role where I can take that analytical instinct and put it on real product work."',
      'Three beats, under 60 seconds, no apologizing. The interviewer wants to know you’ve thought about this — not that you’ll change your mind in six months.',
    ],
  },
  {
    question: 'How long does a real career change take?',
    answer: [
      'Lateral pivots — same level, different field — typically run six to nine months once your positioning is rewritten. Pivots that require a step down to break in often run nine to twelve. Pivots attempted without rewriting your positioning first run indefinitely.',
      'The candidates who land fastest do three things: they spend the first month rebuilding their materials (resume, LinkedIn, portfolio if applicable) before they apply to anything, they target 10-15 specific companies rather than spraying, and they network into each one. Job-search research consistently finds that application quality and warm intros outperform application volume — and that gap is even wider for pivoters.',
      'If you’ve been pivoting for six-plus months without traction, the problem is usually positioning, not the market. Recruiters in the new field can’t see what you’d be hired to do. Once the through-line is in your headline and at the top of your resume, response rates change within weeks.',
    ],
  },
  {
    question: 'Should I take a pay cut to switch careers?',
    answer: [
      'Sometimes. The question that matters is: at what level do you break in?',
      'If you can pivot at-level (same seniority, different field) — there’s usually no pay cut. The compensation in your new field at your level is whatever it is. You move sideways.',
      'If you have to take a step down to break in — expect a meaningful pay cut for the first role, usually in the 10-25% range. But — and this matters — most pivoters recover that within a few years of growth in the new field. The compounding from a stronger second role closes the gap. The lifetime cost of a clean pivot is almost always smaller than the panic about the first paycheck makes it feel.',
      'Don’t take a pay cut beyond 25% to break in unless you’re explicitly buying optionality — joining a top-tier company that will accelerate your next move. A 40-50% cut to "get a foot in the door" rarely recovers cleanly, because the next role is anchored to the cut salary.',
    ],
  },
  {
    question: 'How do I get my LinkedIn to attract recruiters in the new field?',
    answer: [
      'Your LinkedIn headline is the entire game. Recruiters in the new field run boolean searches for specific terms — and those terms need to be in your headline and your most recent role’s description. If your headline still says "Senior Account Director · B2B SaaS Agency," no UX recruiter is finding you, no matter how much UX work you’ve done on the side.',
      'The pivot headline formula: target title + relevant credibility from the through-line + signal of commitment to the new field. "Product Designer · UX research + service design · former B2B account strategist" works because every term recruiters search for is in there, and the old field is repositioned as supporting context rather than the headline.',
      'Don’t hide the old field. Recruiters can see your work history regardless. The headline is about framing what you ARE now, with the old field as the explanation for the depth you bring.',
    ],
  },
  {
    question: 'Is there a "best industry" to switch INTO?',
    answer: [
      'Right now, in 2026: yes, with caveats. The industries hiring most actively for career-changers are AI infrastructure and AI-adjacent roles (everyone is short-staffed), climate and energy transition (regulatory tailwinds are still pulling in talent), healthcare technology (durable demand, less hype), and cybersecurity at the senior end. These fields are growing faster than they can hire from within, which means they screen pivoters more openly than mature industries.',
      'Be careful about the inverse: industries with the hardest entry for pivoters right now include early-stage VC, traditional banking investment banking, agency creative leadership roles, and most legacy media. Pivoting into a contracting industry is harder regardless of how well you position.',
      'The single best indicator of whether a target industry is friendly to pivoters: search LinkedIn for "Product Manager" (or whatever your target role is) at 10 companies in that industry. Look at the backgrounds. If you see lots of "former teacher / former consultant / former engineer" patterns, it’s an open field. If everyone has been doing the exact same role for 8 years, the industry is closed to pivoters and you’re fighting uphill.',
    ],
  },
]

export default function CareerChangersPage() {
  const tools: CatalogTool[] = CHANGER_TOOLS.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  const proTools: CatalogTool[] = CHANGER_PRO_TEASE.map((name) =>
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
            ◆ FOR CAREER CHANGERS
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
            Your past isn’t a liability.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              It’s positioning.
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
            Free tools and recruiter-grade answers for switching fields. The through-line that makes
            you hireable, the translation that makes you legible, the certifications that actually
            matter (and the ones that don’t).
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
            title="Four free tools to translate the pivot."
            sub="Rewrite the bullets. Decode the target field’s JDs. Find the keywords recruiters in the new field actually search."
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
            eyebrow="THE QUESTIONS CAREER CHANGERS ASK"
            eyebrowColor="#A78BFA"
            title="The honest read on switching fields."
            sub="What hiring managers actually look for when they see a non-traditional background — and the moves that move the needle vs. the ones that don’t."
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
            title="Align your LinkedIn and resume to the new field."
            sub="That's the translation work. Here are the Recruiter Insights that make sure recruiters in the new field can actually find you — $20/year."
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
            ◆ FIND YOUR THROUGH-LINE
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
            Translate your experience.
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
            Paste your bullets from the old field plus your target role. Get rewritten bullets,
            a summary paragraph, and the through-line that makes you hireable. Free.
          </p>
          <Link
            href="/tools/career-pivot"
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
            Translate my experience →
          </Link>
        </div>
      </section>

      <HubQuestionsBlock
        title="Questions career changers keep asking"
        items={[
          { question: 'Is my resume good for a different field?', href: '/q/is-my-resume-good' },
          { question: 'How to beat an ATS in a new industry', href: '/q/how-to-beat-ats' },
          { question: "What is the 70/30 rule in hiring?", href: '/q/70-30-rule' },
          { question: 'Why am I not getting responses?', href: '/q/why-am-i-not-getting-responses' },
        ]}
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
