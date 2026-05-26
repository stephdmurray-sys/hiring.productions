import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const CANONICAL = 'https://hiring.productions/answers'

export const metadata: Metadata = {
  title: 'Answers: Hiring Questions From a Senior Recruiter',
  description:
    "Direct, no-fluff answers to the questions candidates actually search. From the 7-second rule to ATS scoring to resume red flags. What's real, what's mythology, and what to do about it.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'website',
    title: 'Answers: Hiring Questions From a Senior Recruiter',
    description:
      "Honest, recruiter-side answers to the questions candidates ask. Built from 20 years of talent acquisition practice.",
    url: CANONICAL,
  },
}

/**
 * FAQPage JSON-LD schema. Gives Google structured Q&A data that can
 * surface as a "People Also Ask" rich result. Six highest-intent
 * questions, each with a 2-3 sentence direct answer. The answers are
 * deliberately complete on this hub page (not "click here to learn
 * more") so Google reads them as authoritative and so each Q&A pair
 * is usable as a snippet in its own right.
 */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why am I not getting responses to job applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Four reasons account for almost every silent application: an ATS filter rejected the resume before a human saw it, the platform you applied through has a low response rate for your role, your resume reads too similar to every other candidate at your level, or the role itself was already wired for an internal candidate. The diagnostic is to test one variable at a time. Send the same resume through two different application paths and see if behavior changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the 7-second rule on a resume real?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 7-second initial scan is real. What most people misunderstand is what gets scanned. A recruiter looks at current title, dates, company names, and one or two outcomes. They do not read bullets. They check whether your present pattern fits the role they are filling. If those four signals do not match in the first scan, the resume gets passed on regardless of what is below the fold.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are actual red flags on a resume in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Job hopping is no longer a red flag. The real flags recruiters react to in 2026 are: a current title that does not match any of the recent roles, results that are unquantifiable or sound AI-generated, a stack of senior titles at companies nobody has heard of with no scope context, and a resume that reads like a job description instead of a record of what you actually did. The mythology around resume red flags is mostly a decade out of date.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does an ATS actually work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An ATS (applicant tracking system) parses your resume into structured fields, then runs filters set by the recruiter. The filters usually are: must-have keywords, years of experience, current title within X rungs of the target, and sometimes location radius. Most ATS rejections are not because the resume failed parsing. They are because the recruiter set filters that the resume legitimately does not match. The fix is rarely formatting. It is usually alignment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I explain an employment gap on my resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Three-part script that works for almost any gap reason (layoff, caregiving, health, pivot): name the gap in one short sentence, name what you did during it in one sentence (course, certification, project, family responsibility resolved), then transition forward to what you want next. Do not apologize. Do not overexplain. Recruiters care less about the gap than about whether you can talk about it without making it the story.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does "open to work" on LinkedIn make me look desperate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The private setting (visible only to recruiters with LinkedIn Recruiter) does not make you look desperate, full stop. The public green banner is a different question. It makes you visible to your network, which is sometimes a feature and sometimes a flag depending on your role and seniority. For most candidates the right move is: turn on the private signal, leave the public banner off, then build your profile so recruiters find you whether or not the badge is on.',
      },
    },
  ],
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
    description: 'The first thing a recruiter sees in 6 seconds. The most common reason qualified candidates get filtered before a human reads a word.',
    items: [
      {
        question: 'Is my resume good?',
        href: '/q/is-my-resume-good',
        blurb: "Four checks a senior recruiter actually runs on a resume, plus how to tell which one yours is failing.",
      },
      {
        question: 'What is the 7-second rule on a resume?',
        href: '/q/7-second-rule-resume',
        blurb: "The 7-second scan is real. The way most people understand it isn't. What recruiters actually look at in those seconds.",
      },
      {
        question: 'What are red flags on a resume?',
        href: '/q/resume-red-flags',
        blurb: "Most red-flag lists are stuck in 2010. Job hopping isn't one anymore. Here are the actual flags recruiters react to in 2026.",
      },
      {
        question: 'How to explain a gap on my resume',
        href: '/q/explain-resume-gap',
        blurb: 'The three-part honest script that works for layoffs, caregiving, health, and pivots, without making the gap the story.',
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
    description: 'Why qualified applications never reach a human. ATS, platform choice, and differentiation are three separate filters, each with a different fix. Most candidates apply more when the right move is to apply better.',
    items: [
      {
        question: 'How ATS actually works',
        href: '/how-ats-actually-works',
        blurb: "What an ATS actually checks, why most resumes never reach a human, and the formatting rules that matter.",
      },
      {
        question: 'How to beat an ATS in 2026',
        href: '/q/how-to-beat-ats',
        blurb: 'You don\'t beat it. You align with it. Three specific issues fix 80% of failed ATS screens.',
      },
      {
        question: "Why am I not getting responses?",
        href: '/q/why-am-i-not-getting-responses',
        blurb: "Four reasons applications go dark (ATS, platform, differentiation, strategy) and the diagnostic to identify yours.",
      },
    ],
  },
  {
    label: 'Reading the Market',
    description: 'How to decode what hiring teams actually mean in postings, salary ranges, and interviewer questions. The internal logic of how decisions get made on the other side of the table, by someone who has sat in those rooms for 20 years.',
    items: [
      {
        question: 'What recruiters really think reading your resume',
        href: '/what-recruiters-really-think',
        blurb: "The internal monologue of a senior recruiter. What gets skipped in the first 6 seconds and what makes them stop scrolling.",
      },
      {
        question: 'What is the 70/30 rule in hiring?',
        href: '/q/70-30-rule',
        blurb: "Three different things get called the 70/30 rule. One is real recruiting practice. Two are TikTok inventions.",
      },
      {
        question: "What does 'competitive salary' actually mean?",
        href: '/q/what-does-competitive-salary-mean',
        blurb: 'What that phrase really signals on a job posting, plus the related euphemisms and how to find the real number.',
      },
    ],
  },
  {
    label: 'For Your Moment',
    description: 'Different stages of a career need different playbooks. New grads, career changers, post-layoff, returning to work after a break. Each has a separate set of recruiter expectations and a separate set of moves that work.',
    items: [
      {
        question: 'How to get hired as a new grad in 2026',
        href: '/q/how-to-get-hired-as-new-grad',
        blurb: 'The 2026 new-grad market is structurally tougher. The specific strategy that actually works, not "apply more."',
      },
    ],
  },
]

export default function AnswersHubPage() {
  return (
    <main style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      {/* FAQPage JSON-LD. Inline script with Schema.org structured data
          so Google can surface Q&A from this hub as "People Also Ask"
          results. The hub previously had only link-card content and was
          flagged "Crawled, currently not indexed" in GSC because there
          was nothing original on the page for Google to index. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Navigation variant="light" />

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
            color: '#5A5A6E',
            lineHeight: 1.6,
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          Direct answers to the questions candidates actually search, written by a recruiter who has read 10,000+ resumes and built TA functions from scratch. What's real, what's TikTok mythology, what to do.
        </p>
      </section>

      {/* Authority + methodology intro. Added 5/26 because GSC flagged
          this page as "Crawled, currently not indexed." Google's
          assessment was correct: the page was mostly a link-card grid
          with thin per-group descriptions, which reads as a doorway
          page. This block adds substantive recruiter-voice content
          establishing who wrote these answers, why they are different
          from the typical career-advice listicle, and how to use the
          page. Real body content the index can latch onto. */}
      <section
        style={{
          padding: '8px 24px 24px',
          maxWidth: '780px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(108,71,255,0.18)',
            borderRadius: 16,
            padding: '32px 32px',
            boxShadow: '0 8px 28px rgba(108,71,255,0.06)',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 14,
            }}
          >
            Who wrote these answers
          </div>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15.5px',
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 14px',
              letterSpacing: '0.002em',
            }}
          >
            These answers are written by Stephanie Murray. 20 years in
            talent acquisition. Senior Director of TA at Brightside Health,
            where she scaled the clinician hiring system from 19 employees
            to over 1,500. 2025 Transform Award winner for Talent Strategy
            of the Year. She has personally read more than 10,000 resumes
            and built TA functions from scratch at three companies.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15.5px',
              color: '#1A1A22',
              lineHeight: 1.65,
              margin: '0 0 14px',
              letterSpacing: '0.002em',
            }}
          >
            The answers below come from real recruiting practice, not
            from secondhand career-advice blog posts that recycle the
            same five tips. When she says a resume rule is mythology,
            it is because she has watched recruiters ignore it for two
            decades. When she says something works, it is because she
            has personally seen it move outcomes on real searches.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14.5px',
              color: '#5A5A6E',
              lineHeight: 1.6,
              margin: 0,
              letterSpacing: '0.002em',
            }}
          >
            Each link below opens a full answer with the specific
            recruiter-side context, the common misunderstanding, and the
            move that actually works. Pages are organized by where you
            are in your search: your resume, the application filter,
            reading the market, and the specific moment you are in.
          </p>
        </div>
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
                        color: '#5A5A6E',
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
              color: '#5A5A6E',
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
