'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { BilateralCallout } from '@/components/bilateral-callout'

interface QA {
  question: string
  answer: string[]
}

const QA_BLOCKS: QA[] = [
  {
    question:
      'How do I write a job description that attracts good candidates when we don’t have a recognizable brand?',
    answer: [
      'Stop writing a job description and start writing a pitch. The first three lines of your posting decide whether a strong candidate keeps reading or scrolls past. Most small-company JDs lead with company history. Candidates don’t care about your founding story — they care about what they’d actually do and why it matters.',
      'The structure that works: open with the problem the role solves ("Our customers are X and we need someone to Y"). Follow with the impact ("In 6 months you’ll have built Z"). Then list responsibilities. Then list requirements. Most companies do this in reverse — requirements first, problem last — and lose strong candidates in the first 30 seconds.',
      'On requirements: cut everything that isn’t actually required. Every "preferred" line scares off the candidates who don’t have that specific thing but could do the job. Research on this is consistent — the more requirements you list, the fewer qualified candidates apply. Small teams suffer most from this because qualified candidates have many options.',
    ],
  },
  {
    question:
      'Where should we post jobs when we can’t afford LinkedIn Recruiter or Indeed Sponsored?',
    answer: [
      'Your own careers page first, your team’s LinkedIn second, free job boards third. In that order, intentionally.',
      'Most small teams skip step one because their careers page is a Notion link or a Greenhouse listing. That’s the single biggest leverage point you have. A real careers page with the role, the team, the problem, the offer, and a working application form converts 3-5× better than the same role posted on LinkedIn — because anyone who lands there came LOOKING for you.',
      'Step two is your team’s LinkedIn. Every employee resharing the role with 1-2 sentences of context outperforms a company-page post by an order of magnitude. The reach is real and free. Most companies just expect this to happen organically; the ones that hire well make it explicit ("hey, would you share this on Friday?").',
      'For free boards, the ones that consistently outperform for small companies in 2026: Hacker News "Who is Hiring?" (engineering), Wellfound (formerly AngelList, for startups), RemoteOK (remote roles), and niche communities specific to your function. Indeed and LinkedIn free postings are noise — too much volume, too little signal.',
    ],
  },
  {
    question: 'How do we compete against bigger companies for the same talent?',
    answer: [
      'You don’t compete on what they win on — total comp, brand prestige, security. You compete on what they CAN’T offer. Speed, autonomy, scope, proximity to the actual work, the chance to build something instead of maintain it. Name those things explicitly in your pitch — most small teams undersell them or treat them as obvious.',
      'The candidates who choose small over big aren’t a niche. They’re a known segment: senior people who got tired of process at their last big-company role, mid-career people who want stretch, builders who hate committees. Speak to those people directly. Stop trying to convert candidates who fundamentally want the big-company experience — you’ll lose every time, and the ones you convince to take less money will leave in 12 months.',
      'On comp specifically: name the range. Pay transparency laws in CA/NY/CO/WA already require it for those states, and applying selectively in those states is now a signal. Candidates assume the worst when you hide the number. Publishing a range tells them you’ve thought about it and you’re serious.',
    ],
  },
  {
    question:
      'What does "employer branding" actually mean for a 15-person company?',
    answer: [
      "It doesn't mean a values page. It doesn't mean stock photos of diverse-looking team meetings. It means: when a strong candidate Googles your company on a Sunday night before deciding whether to apply, what do they find?",
      'Three things should show up consistently: (1) your careers page, real and current; (2) your team’s real LinkedIn presence (your founder/CEO active and human, your engineers/PMs/designers actually building publicly); (3) coverage that signals momentum — a Series A announcement, a product launch on Product Hunt, a podcast interview, a customer case study. Doesn’t have to be much. Has to exist.',
      'What kills small-company perception fastest: a careers page that looks like a default Lever template with three open roles, no team photos, no recent blog posts, a Twitter that hasn’t posted in 6 months, a website that still says "we’re building." Strong candidates read that as "this company is slow, probably struggling, and I won’t learn anything here." Even when none of that is true. The fix is showing up consistently in public — once a week beats once a quarter — not paying for a brand campaign.',
    ],
  },
  {
    question: 'How do I screen 50-100 resumes a week without a recruiter?',
    answer: [
      'Screen for two things only in pass one: did they actually have the relevant experience, and did they take the application seriously. That’s a 30-second per-resume judgment. Save deeper evaluation for the ~20% who pass pass one.',
      'Things that DON’T matter at pass one and waste time when you treat them as filters: GPA, university name (unless it’s genuinely a job requirement), specific job titles (titles vary wildly across companies for similar work), employment gaps under 12 months, perfect formatting.',
      'Things that DO matter at pass one: specific work that matches the role (in their bullets, not just their titles), evidence they tailored the application to you (cover letter mentions your company specifically, not generically), no obvious red flags like multiple <6-month roles in a row or unexplained gaps in the most recent role.',
      'A practical trick: read the top third of every resume only in pass one. Title, recent role, first 2-3 bullets. If those don’t pass, move on. The bottom of the resume only matters for the candidates who passed the top. Most hiring managers read the whole resume and triple their screen time.',
    ],
  },
  {
    question: 'When does it make sense to hire a recruiter (or use consulting help) vs. DIY?',
    answer: [
      'The realistic threshold for hiring an internal recruiter is around 15-25 hires per year. Below that, the recruiter is underutilized and you’ll spend $90-120K + benefits on someone who isn’t at full capacity. Above that, you’re probably already burning more in hiring-manager time + bad hires than the recruiter would cost.',
      'Between those two — say 5-15 hires per year — the right answer is usually fractional or project-based recruiting support. Someone who comes in for 10-20 hours a week, helps you build the playbook (job descriptions, sourcing, screening process, interview kits), then steps back. That’s what most consulting work in this space actually looks like.',
      'Common mistake: hiring an agency recruiter (20-25% of first-year comp) for every role. Agency makes sense for hard-to-fill specialist roles where you have no candidate flow. For most roles at a 5-50 person company, you’re better off investing the same money in your own playbook and using free or low-cost tools to source. Agency recruiters are paid to close fast, not to find your best long-term hires.',
    ],
  },
]

export default function ForSmallTeamsPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 110px) clamp(20px, 5vw, 24px) 60px',
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
              'radial-gradient(ellipse 900px 600px at 50% -100px, rgba(255,79,106,0.18) 0%, rgba(255,79,106,0.08) 35%, transparent 70%)',
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
              color: '#FF4F6A',
              marginBottom: '22px',
            }}
          >
            ◆ FOR SMALL HIRING TEAMS
          </div>

          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              color: '#1A1A22',
              margin: '0 0 22px',
            }}
          >
            You can&apos;t outspend the names everyone knows.
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              You can outhire them.
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
            If you&apos;re hiring 5–25 people a year without a dedicated TA function, the playbook
            is different. It&apos;s recruitment marketing, not recruiting. Free tools, recruiter-grade
            answers, and the consulting work that fills in the rest.
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
            By Stephanie Murray · 20 years in talent acquisition · Built the TA function at a fast-growing healthcare startup
          </p>
        </div>
      </section>

      {/* Start here — free tools */}
      <section style={{ padding: 'clamp(32px, 5vw, 40px) clamp(20px, 5vw, 24px) 30px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <SectionHeader
            eyebrow="START HERE — FREE"
            eyebrowColor="#FF4F6A"
            title="The free tool worth running first."
            sub="Most small-team hiring problems start with the job description. Score yours before you start the rest of the work."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '20px',
              marginTop: '32px',
              maxWidth: '720px',
              marginInline: 'auto',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                border: '1px dashed rgba(255,79,106,0.30)',
                borderRadius: 14,
                padding: '24px',
                opacity: 0.85,
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  color: '#FF4F6A',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                On the way · For Hiring Teams
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '18px',
                  color: '#1A1A22',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                JD SEO Scorecard
              </div>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  color: '#5A5A6E',
                  lineHeight: 1.55,
                  margin: '0 0 12px',
                }}
              >
                Paste any job description. Get the score for visibility on LinkedIn + Indeed, the
                language candidates actually search for, and the three fixes that move qualified
                applicants the most.
              </p>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '13px',
                  color: '#8B8AA0',
                }}
              >
                In the queue
              </div>
            </div>

            <div
              style={{
                background: '#FAF8F3',
                border: '1px dashed rgba(255,79,106,0.22)',
                borderRadius: 14,
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  color: '#8B8AA0',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                In production · Coming soon
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '18px',
                  color: '#1A1A22',
                  letterSpacing: '-0.005em',
                  lineHeight: 1.3,
                  marginBottom: 8,
                }}
              >
                Eight more hiring-team tools
              </div>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  color: '#5A5A6E',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                Job-post-through-candidate-eyes. AI candidate detection. Boolean source strings.
                Outreach templates. Interviewer prep. Hiring-process audit. Offer-lands. Day-one
                plans. Shipping over the next 90 days — see the full catalog on the tools page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Long-form Q&A */}
      <section
        style={{
          padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 24px) 40px',
          maxWidth: '820px',
          margin: '0 auto',
        }}
      >
        <SectionHeader
          eyebrow="THE PLAYBOOK"
          eyebrowColor="#FF4F6A"
          title="What small teams actually need to fix first."
          sub="Direct answers to the questions that come up in every consulting call. Built from 20 years of recruiting practice — applied to teams that don't have a recruiter."
        />

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 36 }}>
          {QA_BLOCKS.map((block, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(255,79,106,0.18)',
                borderRadius: 18,
                padding: 'clamp(24px, 5vw, 36px)',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(20px, 2.6vw, 26px)',
                  letterSpacing: '-0.015em',
                  color: '#1A1A22',
                  margin: '0 0 18px',
                  lineHeight: 1.25,
                }}
              >
                {block.question}
              </h2>
              {block.answer.map((para, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '15.5px',
                    color: '#5A5A6E',
                    lineHeight: 1.7,
                    margin: pIdx === 0 ? '0 0 14px' : '14px 0',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Consulting moment — small-teams equivalent of the RepVera moment */}
      <section style={{ padding: 'clamp(40px, 6vw, 56px) clamp(20px, 5vw, 24px) 80px' }}>
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(255,79,106,0.12) 0%, rgba(108,71,255,0.08) 100%)',
            border: '1px solid rgba(255,79,106,0.32)',
            borderRadius: 22,
            padding: 'clamp(32px, 6vw, 52px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -100,
              right: -80,
              width: 320,
              height: 320,
              background:
                'radial-gradient(circle, rgba(255,79,106,0.20) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 12px',
              background: 'rgba(255,79,106,0.16)',
              border: '1px solid rgba(255,79,106,0.40)',
              borderRadius: 100,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FF4F6A',
              marginBottom: 16,
            }}
          >
            ◆ WHEN THE TOOLS AREN&apos;T ENOUGH
          </div>

          <h2
            style={{
              position: 'relative',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.6vw, 38px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#1A1A22',
              margin: '0 0 14px',
            }}
          >
            Need the playbook applied to your specific situation?
          </h2>

          <p
            style={{
              position: 'relative',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '16px',
              color: '#5A5A6E',
              lineHeight: 1.65,
              maxWidth: '560px',
              margin: '0 auto 24px',
            }}
          >
            Fractional and project-based recruitment marketing for teams hiring 5–25 a year. JD audits,
            sourcing setup, interview kits, and the parts of TA that fall through the cracks when you
            don&apos;t have a recruiter. Most engagements run 10–20 hours a week for 2–4 months.
          </p>

          <Link
            href="/consulting"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #FF4F6A 0%, #6C47FF 100%)',
              color: '#FFFFFF',
              borderRadius: 12,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 18px 40px rgba(255,79,106,0.30)',
            }}
          >
            Book a consulting conversation →
          </Link>
        </div>
      </section>

      <BilateralCallout audience="hiring" />

      <Footer />

      <style>{`
        .hp-st-tool-card:hover {
          border-color: rgba(255,79,106,0.55) !important;
          transform: translateY(-2px);
        }
      `}</style>
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
    <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
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
          fontSize: 'clamp(26px, 3.5vw, 38px)',
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
