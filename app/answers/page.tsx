import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const CANONICAL = 'https://hiring.productions/answers'

export const metadata: Metadata = {
  title: 'Answers — Hiring Questions From a Senior Recruiter',
  description:
    "Direct, no-fluff answers to the questions candidates actually search. From the 7-second rule to ATS scoring to resume red flags — what's real, what's mythology, and what to do.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    title: 'Answers — Hiring Questions From a Senior Recruiter',
    description:
      "Honest, recruiter-side answers to the questions candidates ask. Built from 20 years of talent acquisition practice.",
    url: CANONICAL,
  },
}

/**
 * Hub page for every /q/ page on the site. Grouped by candidate-journey
 * stage so the page reads like a map of "what should I look up at this
 * point in my search."
 *
 * Pulls double duty as:
 *   - A topical-authority signal to Google (single hub linking to all the
 *     question pages in the cluster)
 *   - A discoverable destination for visitors who land somewhere else and
 *     want to see what other questions are answered
 */

interface AnswerLink {
  question: string
  href: string
  blurb: string
}

interface Group {
  label: string
  description: string
  items: AnswerLink[]
}

const GROUPS: Group[] = [
  {
    label: 'Your Resume',
    description: 'The first thing a recruiter sees — and the most common reason candidates get filtered.',
    items: [
      {
        question: 'Is my resume good?',
        href: '/q/is-my-resume-good',
        blurb: "Four checks a senior recruiter actually runs on a resume — and how to tell which one yours is failing.",
      },
      {
        question: 'What is the 7-second rule on a resume?',
        href: '/q/7-second-rule-resume',
        blurb: "The 7-second scan is real. The way most people understand it isn't. What recruiters actually look at in those seconds.",
      },
      {
        question: 'What are red flags on a resume?',
        href: '/q/resume-red-flags',
        blurb: "Most red-flag lists are stuck in 2010. Job hopping isn't one anymore. Here are the actual flags recruiters flag in 2026.",
      },
      {
        question: 'How to explain a gap on my resume',
        href: '/q/explain-resume-gap',
        blurb: 'The three-part honest script that works for layoffs, caregiving, health, and pivots — without making the gap the story.',
      },
      {
        question: 'How to tell if a resume is AI-written',
        href: '/q/how-to-tell-if-resume-is-ai',
        blurb: "Written for hiring teams, useful for candidates: the specific patterns that reveal AI generation, and how to avoid them.",
      },
    ],
  },
  {
    label: 'The Application Filter',
    description: 'Why qualified applications never reach a human — and what to do about it.',
    items: [
      {
        question: 'How ATS actually works',
        href: '/how-ats-actually-works',
        blurb: "What an ATS actually checks, why most resumes never reach a human, and the formatting rules that matter.",
      },
      {
        question: 'How to beat an ATS in 2026',
        href: '/q/how-to-beat-ats',
        blurb: 'You don\'t beat it — you align with it. Three specific issues fix 80% of failed ATS screens.',
      },
      {
        question: "Why am I not getting responses?",
        href: '/q/why-am-i-not-getting-responses',
        blurb: "Four reasons applications go dark — ATS, platform, differentiation, strategy — and the diagnostic to identify yours.",
      },
    ],
  },
  {
    label: 'Reading the Market',
    description: 'How to decode what hiring teams actually mean — and how they really decide.',
    items: [
      {
        question: 'What recruiters really think reading your resume',
        href: '/what-recruiters-really-think',
        blurb: "The internal monologue of a senior recruiter — what gets skipped in the first 6 seconds and what makes them stop scrolling.",
      },
      {
        question: 'What is the 70/30 rule in hiring?',
        href: '/q/70-30-rule',
        blurb: "Three different things get called the 70/30 rule. One is real recruiting practice. Two are TikTok inventions.",
      },
      {
        question: "What does 'competitive salary' actually mean?",
        href: '/q/what-does-competitive-salary-mean',
        blurb: 'What that phrase really signals on a job posting, plus the related euphemisms — and how to find the real number.',
      },
    ],
  },
  {
    label: 'For Your Moment',
    description: 'Different stages of a career need different playbooks.',
    items: [
      {
        question: 'How to get hired as a new grad in 2026',
        href: '/q/how-to-get-hired-as-new-grad',
        blurb: 'The 2026 new-grad market is structurally tougher. The specific strategy that actually works — not "apply more."',
      },
    ],
  },
]

export default function AnswersHubPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* Hero */}
      <section
        style={{
          padding: '80px 24px 48px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: '20px',
          }}
        >
          ◆ ANSWERS
        </div>
        <h1
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 64px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: '#1A1A22',
            margin: '0 auto 18px',
            maxWidth: '780px',
          }}
        >
          The questions you'd ask a recruiter at a bar.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Answered.
          </span>
        </h1>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '17px',
            color: '#9D9CB3',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          Direct answers to the questions candidates actually search — written by a recruiter who has read 10,000+ resumes and built TA functions from scratch. What's real, what's TikTok mythology, what to do.
        </p>
      </section>

      {/* Groups */}
      <section style={{ padding: '32px 24px 72px' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          {GROUPS.map((group) => (
            <div key={group.label} style={{ marginTop: '56px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  marginBottom: 6,
                  flexWrap: 'wrap',
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: '28px',
                    letterSpacing: '-0.02em',
                    color: '#1A1A22',
                    margin: 0,
                  }}
                >
                  {group.label}
                </h2>
              </div>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '15px',
                  color: '#8B8AA0',
                  margin: '0 0 22px',
                }}
              >
                {group.description}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 14,
                }}
              >
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      textDecoration: 'none',
                      background: '#FFFFFF',
                      border: '1px solid rgba(167,139,250,0.18)',
                      borderRadius: 14,
                      padding: '20px 22px',
                      transition: 'border-color 0.18s ease, transform 0.18s ease',
                      display: 'block',
                    }}
                    className="hp-answer-card"
                  >
                    <div
                      style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontWeight: 800,
                        fontSize: '16px',
                        color: '#1A1A22',
                        letterSpacing: '-0.01em',
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.question}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: '13.5px',
                        color: '#9D9CB3',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {item.blurb}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: '24px 24px 96px' }}>
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid rgba(108,71,255,0.30)',
            borderRadius: 20,
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 28px 80px rgba(108,71,255,0.18)',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: 12,
            }}
          >
            STOP READING, START RUNNING
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.6vw, 36px)',
              letterSpacing: '-0.02em',
              color: '#1A1A22',
              margin: '0 0 12px',
            }}
          >
            Want your actual resume read?
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15.5px',
              color: '#9D9CB3',
              lineHeight: 1.55,
              margin: '0 0 24px',
            }}
          >
            Skip the theory. Run your resume through the recruiter's first-pass scan and see what gets read, what gets skipped, and what makes it through. Free.
          </p>
          <Link
            href="/resume"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#FFFFFF',
              borderRadius: 12,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 18px 40px rgba(108,71,255,0.30)',
            }}
          >
            Run my resume →
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        .hp-answer-card:hover {
          border-color: rgba(167,139,250,0.45) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </main>
  )
}
