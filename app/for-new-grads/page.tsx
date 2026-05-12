'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HubQuestionsBlock } from '@/components/hub-questions-block'
import { ToolCard } from '@/components/tool-card'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'

// Tools featured on the new grad hub — selected for the specific audience journey
const NEW_GRAD_TOOLS = [
  'Your New Grad Resume',
  'Does My Resume Read as AI?',
  'Is This Job Posting a Scam?',
  'What This Job Actually Is',
] as const

const NEW_GRAD_PRO_TEASE = [
  'Would a Recruiter Even Find You?',
  'Through a Recruiter’s Eyes',
] as const

interface NewGradQA {
  question: string
  answer: string[]
}

const QA: NewGradQA[] = [
  {
    question: 'How long should a new grad resume be?',
    answer: [
      'One page. Always. There is no exception for new grads — recruiters spend six seconds on a resume on average, and a second page is space they will not read.',
      'If you’re struggling to fill one page, you have too much white space — pull more from your projects and coursework. If you’re overflowing, the things to cut are: unrelated retail jobs from before college, every club you joined, "References available upon request," and any generic summary statement at the top.',
    ],
  },
  {
    question: 'Should I put my GPA on my resume?',
    answer: [
      'If your GPA is 3.5 or higher — yes, include it. It’s a low-effort credibility signal.',
      'If your target is finance, consulting, or investment banking — include your GPA if it is 3.3 or higher. Many of those firms cut at 3.5 at the resume drop and a 3.3 still keeps you in range. Below 3.0 in those fields, leave it off and lean harder on internships and coursework.',
      'If your GPA is below 3.5 and you are not targeting finance or consulting — skip it. The absence is not the flag you think it is. Hiring managers in most fields don’t notice.',
      'Never include a GPA under 3.0 unless the application specifically asks for it.',
    ],
  },
  {
    question: 'What goes on my resume if I have no experience?',
    answer: [
      'You have more experience than you think — you just need to call it what it is. New grad resumes win by replacing "no experience" with "project experience."',
      'Lead with Education at the top of the page (above experience). Then either an "Experience" section if you have internships, or a "Project Experience" section if you don’t. Each project becomes a job: name it, give it 2-3 bullets with strong past-tense verbs, and treat the outcome like a deliverable.',
      'Class capstones, hackathon submissions, personal side projects, club leadership, study abroad, peer-reviewed research, even significant volunteer work — they all count. The format is what matters: lead with what YOU did and what came out of it.',
    ],
  },
  {
    question: 'Do hiring managers really care which school I went to?',
    answer: [
      'For most roles in most industries — much less than students assume. School name matters most for: investment banking, top-tier consulting, certain prestige-dependent fields. For everyone else, the school is a credential check that happens once, then never gets weighed again.',
      'What hiring managers actually care about: did you finish, what did you study, what did you do while you were there. Outside the prestige industries, a 3.7 from a less-known school screens stronger than a 2.6 from a famous one. Inside investment banking and elite consulting, the prestige still wins — those firms screen on school name first, GPA second.',
      'If you went to a less-known school, lead with your specific accomplishments — projects, internships, peer-reviewed work, honors. Those are the signals that override the school filter.',
    ],
  },
  {
    question: 'How do I get on a recruiter’s radar when I’m just starting out?',
    answer: [
      'Recruiters don’t browse LinkedIn — they run boolean searches. To get in their results, your LinkedIn headline needs the exact terms they type. "Recent grad seeking entry-level marketing role" does not surface in any search. "Marketing Coordinator · Content & Social · Recent Grad, [School]" does.',
      'The skills section feeds the search algorithm even more directly. Add 10-15 specific tools, methodologies, and platforms (not "leadership"). For tech: Python, SQL, Git, Figma. For marketing: Google Analytics, HubSpot, Canva, Adobe. The exact tool name as a real skill.',
      'For the searches that matter most — the ones with the highest payoff — try the boolean visibility check tool. It shows you the exact string a recruiter types to find someone like you, and exactly why your profile doesn’t surface in it.',
    ],
  },
  {
    question: 'I keep getting rejected without an interview. Why?',
    answer: [
      'Two most common causes for new grads, in order of frequency:',
      '1. The resume looks like every other new grad’s resume. Generic summary at the top, education in the middle, bullets that describe responsibilities instead of accomplishments, "passionate," "results-driven," "team player." Recruiters see hundreds of these in a week — they pattern-match and skip.',
      '2. You’re applying to roles that require 1-3 years of experience. New grads assume an ATS bot is filtering them out, but in most setups it is a human recruiter looking at the years-of-experience line and moving on. Either way the result is the same: if you don’t meet the bar, you don’t get an interview. Look at the "minimum qualifications" line — if it says "1+ year of experience" and you don’t have an internship that maps to it, your odds are slim.',
      'The single fix that helps more new grads than any other: stop spraying applications and pick five companies you genuinely want to work for. Apply through their careers site. Find one person at each on LinkedIn. Send them a thoughtful 3-sentence message about why you’re interested in their team specifically. This converts dramatically better than volume.',
    ],
  },
  {
    question: 'Should I include my high school?',
    answer: [
      'Skip it. Once you have a college degree (or are within months of one), high school is dead weight on the resume.',
      'Two exceptions: if you went to a particularly notable specialty high school (a known performing arts academy, a STEM magnet, a school in another country with name recognition in your field), and the role would care, you can leave it. Otherwise — out.',
    ],
  },
]

export default function ForNewGradsPage() {
  const tools: CatalogTool[] = NEW_GRAD_TOOLS.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  const proTools: CatalogTool[] = NEW_GRAD_PRO_TEASE.map((name) =>
    CATALOG.find((t) => t.name === name),
  ).filter((t): t is CatalogTool => Boolean(t))

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* HERO */}
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
              'radial-gradient(ellipse 900px 600px at 50% -100px, rgba(108,71,255,0.16) 0%, rgba(108,71,255,0.08) 35%, transparent 70%)',
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
            ◆ FOR NEW GRADS
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
            Your first job isn’t where you applied.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              It’s where you got seen.
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
            Free tools, real recruiting practice, and plain-English answers to the questions new
            grads actually ask. Built from twenty years on the recruiter side of the desk — and
            the new-grad pile.
          </p>
        </div>
      </section>

      {/* TOOLS — start here */}
      <section style={{ padding: '40px 24px 30px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="START HERE — FREE"
            eyebrowColor="#A78BFA"
            title="Four free tools built for the no-experience start."
            sub="Use these in order — resume first, scan postings before you waste a Saturday applying to scams."
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

      {/* CONTENT — FAQ */}
      <section style={{ padding: '60px 24px 30px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="THE QUESTIONS NEW GRADS ACTUALLY ASK"
            eyebrowColor="#A78BFA"
            title="The honest read on what hiring managers want."
            sub="The questions every new grad searches for, answered the way a recruiter would actually answer them — over coffee, not on a corporate blog."
          />

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {QA.map((item, idx) => (
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

      {/* PRO TEASE */}
      <section style={{ padding: '70px 24px 30px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="WHEN YOU HAVE INTERVIEWS LINED UP"
            eyebrowColor="#A78BFA"
            title="The Recruiter Insights that get new grads to “yes.”"
            sub="You know what they look for. Here are the Recruiter Insights every new grad uses before their first round of real interviews — $20/year."
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

      {/* CLOSING CTA */}
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
              background:
                'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 60%)',
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
            ◆ START WITH THE RESUME
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
            Start with your resume.
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
            No account. No card. Real recruiter expertise on the first job that actually matters.
          </p>
          <Link
            href="/tools/new-grad-resume"
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
            Build my new grad resume →
          </Link>
        </div>
      </section>

      <HubQuestionsBlock
        title="Questions new grads keep asking"
        items={[
          { question: 'How to get hired as a new grad in 2026', href: '/q/how-to-get-hired-as-new-grad' },
          { question: 'Is my resume good?', href: '/q/is-my-resume-good' },
          { question: 'How to beat an ATS', href: '/q/how-to-beat-ats' },
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
