'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HubQuestionsBlock } from '@/components/hub-questions-block'
import { RepVeraMoment } from '@/components/repvera-moment'
import { BilateralCallout } from '@/components/bilateral-callout'
import { ToolCard } from '@/components/tool-card'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'

const RETURN_TOOLS = [
  'How to Explain My Employment Gap',
  'What Words Are Recruiters Searching For?',
  'Does My Resume Read as AI?',
  'What This Job Actually Is',
] as const

const RETURN_PRO_TEASE = [
  'Your LinkedIn, Rewritten',
  'Through a Recruiter’s Eyes',
] as const

interface QA {
  question: string
  answer: string[]
}

const QA_BLOCKS: QA[] = [
  {
    question: 'How do I explain a long career break for parenting or caregiving?',
    answer: [
      'Directly, briefly, without apology. "I took a career break from [year] to [year] to be the primary caregiver for my children" is a complete sentence. Nothing else is required.',
      'You are not obligated to share medical specifics about a child, parent, or partner. "Caregiving for a family member" is the professionally normalized phrasing for situations involving health that you don’t want to disclose.',
      'The mistake returning parents and caregivers make most often: over-explaining or pre-apologizing. Hiring managers in 2026 expect to see breaks like this regularly — parental leave, eldercare, sandwich-generation caregiving have become so common that the framing matters more than the gap itself. Direct + brief + pivot to what you’re ready for now = the entire script.',
    ],
  },
  {
    question: 'My skills feel outdated. Am I unhireable?',
    answer: [
      'Almost never the actual problem, even when it feels that way.',
      'For most knowledge-work roles, the skills that matter aren’t tools you used to know — they’re judgment, decision-making, and pattern recognition built over years of work. Those don’t expire during a career break. What expires is FAMILIARITY with the current tools, current vocabulary, and current best practices in your field.',
      'The fix: spend 4-6 weeks before your search refreshing the tool layer. For most fields this means: read industry news for 30 minutes a day, take one focused short course on a current tool (Coursera, LinkedIn Learning, a vendor cert), do one or two small projects that prove you’re current.',
      'Add a "Career break — [year] to [year]" entry on your resume that names what you did during the break: caregiving, certifications, volunteer board work, freelance projects. Don’t hide the years. They’re not the liability; the missing recent-skill signal is.',
    ],
  },
  {
    question: 'Should I apply to the same level I left, or step down?',
    answer: [
      'Start by applying to the same level you left, with one caveat: target companies that have actively returnship-friendly cultures. Some companies (especially in tech and finance) run explicit returnship programs that bring you back at level after a structured re-entry of roughly three to four months. Look for these — they are a much better path than spraying applications at companies that don’t expect a gap.',
      'If after two to three months at-level you’re getting no traction, the data is telling you something: either your positioning doesn’t reflect the level (fix the resume and LinkedIn) or the companies you’re targeting aren’t open to candidates with breaks (target different companies).',
      'Stepping down one level can be a fine bridge if the company is strong. Stepping down two levels rarely recovers cleanly — the resume trajectory reads as a permanent downgrade, and the next salary anchors to the cut.',
    ],
  },
  {
    question: 'What goes in my LinkedIn headline when I’m re-entering?',
    answer: [
      'Not "Returning to work after career break" or "Mom re-entering the workforce." Those headlines get zero recruiter-search traffic — recruiters don’t search for those terms.',
      'Position yourself AT the role you want next, with the exact terms recruiters search for. If you were a marketing director before and want to be one again: "Marketing Director · B2B SaaS · Content & Brand" — not "Marketing leader returning to work."',
      'The career break gets ONE LINE in your About section, far from the top: "After a career break of [duration] for [reason], I’m returning to senior marketing leadership." That’s it. Don’t make the gap the headline. Make your expertise the headline.',
    ],
  },
  {
    question: 'How do I rebuild my professional network after years away?',
    answer: [
      'Start with the people who already know you’re great. Make a list of 20 people you worked with 5+ years ago who would still remember you well — direct reports, peers, managers, clients. Reach out to each with a specific, low-pressure message: "I’m returning to work and starting to explore [target role]. Would love your perspective on [specific question about the field today]." Not "looking for any leads."',
      '15-30 minute coffee or Zoom conversations with old colleagues do three things at once: (1) update you on what’s current in your field, (2) make them think of you when relevant roles come across their desk, (3) rebuild the muscle of professional conversation. The roles you land in re-entry almost always come through warm intros — not job board applications.',
      'New connections matter too, but they come second. Spend the first month reactivating old relationships, then expand. Cold outreach is much less effective for returning candidates than for current job-hunters, because the value-add is harder to surface.',
    ],
  },
  {
    question: 'What interview questions should I expect?',
    answer: [
      'Three you will almost certainly get: (1) "Can you tell me about the gap?" — answer per the gap-explainer tool. (2) "How will you handle the transition back?" — this is a real concern, especially if you’re returning to a demanding role. Have a specific, prepared answer about childcare/eldercare logistics, your support system, and how you’ve already thought through the schedule. (3) "What have you been doing to stay current?" — this is where the 4-6 weeks of pre-search refresh pays off. Have specific recent things: a course, a project, a few thought-leaders you follow.',
      'Two that you might get, and that often catch returning candidates off guard: "Why now?" and "What if a child gets sick on a critical day?" The first is fine to answer honestly ("my youngest started kindergarten this year and the time freed up"). The second is illegal to ask in many places, and you can deflect or address: "I have backup childcare arrangements. Like any working parent, I plan around predictable risks."',
    ],
  },
  {
    question: 'Are returnship programs worth pursuing?',
    answer: [
      'For senior candidates re-entering after 3+ years out — usually yes. Returnships are structured 12-20 week programs run by major employers in finance, tech, and consulting (most large investment banks, several big-tech companies, and a growing set of consultancies). Path Forward, iRelaunch, and reacHIRE are the partner organizations that aggregate them — that is where to look first. They typically pay competitive salaries during the program and convert to full-time roles at high rates.',
      'The trade-offs: returnships are competitive, often require relocation or in-office commitment, and the cycles are fixed — most cohorts run on an annual calendar, so missing a window means waiting a year. They work best for fields with structured corporate paths (finance, tech, consulting) and less well for creative or freelance-heavy fields.',
      'If you have a strong network already and your field doesn’t have major returnship programs, you’re often better off targeting specific companies directly with warm intros. The returnship is a path, not the only path.',
    ],
  },
]

export default function ReturningToWorkPage() {
  const tools: CatalogTool[] = RETURN_TOOLS.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  const proTools: CatalogTool[] = RETURN_PRO_TEASE.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

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
            ◆ RETURNING TO WORK
          </div>

          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 76px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: '#1A1A22',
              margin: '0 0 22px',
            }}
          >
            The gap isn’t the obstacle.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              The framing is.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              color: '#5A5A6E',
              lineHeight: 1.55,
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Free tools and recruiter-grade answers for returning to work after parenting,
            caregiving, or any extended break. The framing that works, the network moves that
            actually land roles, and the level question — answered honestly.
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
            title="Four free tools for the return."
            sub="Frame the break. Find the keywords recruiters search for. Refresh the resume that hasn’t been touched in years."
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
            eyebrow="THE QUESTIONS RETURNING CANDIDATES ASK"
            eyebrowColor="#A78BFA"
            title="The honest read on coming back to work."
            sub="What hiring managers actually look for when they see a multi-year break — and the moves that land roles vs. the ones that waste time."
          />

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {QA_BLOCKS.map((item, idx) => (
              <article
                key={idx}
                style={{
                  background: '#FFFFFF',
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
                    color: '#1A1A22',
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
                      color: '#5A5A6E',
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
            title="Make sure your resume and LinkedIn surface in 2026 searches."
            sub="The framing is yours. Here are the Recruiter Insights that align your resume and LinkedIn to current recruiter behavior."
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
            background: '#FFFFFF',
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
            ◆ THE FRAME FIRST
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 42px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              color: '#1A1A22',
              margin: '0 0 16px',
              position: 'relative',
            }}
          >
            Get the language right before you apply.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15.5px',
              color: '#5A5A6E',
              lineHeight: 1.6,
              margin: '0 0 28px',
              position: 'relative',
            }}
          >
            Three scripts for the gap — resume one-liner, cover letter version, interview answer. Honest, brief, no apology. Free.
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
        title="Questions returning-to-work candidates ask"
        items={[
          { question: 'How to explain a gap on my resume', href: '/q/explain-resume-gap' },
          { question: 'Is my resume good after time away?', href: '/q/is-my-resume-good' },
          { question: 'What are red flags on a resume?', href: '/q/resume-red-flags' },
          { question: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
        ]}
      />

      <BilateralCallout audience="candidate" />

      <RepVeraMoment
        title="Time away doesn't show on a resume. RepVera shows what does."
        body="The skills, judgment, and adaptability you built during the break don't fit a chronological resume. RepVera is a personal page recruiters read in full — built around what you can do now, not what's missing from your timeline. Free to start."
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
          color: '#1A1A22',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          color: '#5A5A6E',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {sub}
      </p>
    </div>
  )
}
