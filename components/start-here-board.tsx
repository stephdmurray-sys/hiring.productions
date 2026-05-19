'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'

/**
 * Question-led homepage entry. Replaces the old "everyone gets funneled
 * to the wedge tool" pattern with five candidate-pain prompts that
 * route visitors to 2-3 specific tools from the catalog. No email
 * gate, no navigation — pure client-side inline reveal.
 *
 * Design rationale: 30-day telemetry showed 10 visitors landing on the
 * wedge tool page with zero tool runs. The wedge requires a LinkedIn
 * PDF upload — a 30-90 second cognitive lift that cold visitors won't
 * do without first understanding why it's worth it. This board lets
 * visitors self-identify the pain they're in BEFORE landing on a tool,
 * so they arrive at the upload step already understanding the payoff.
 *
 * The five questions map to the five highest-pain moments in a
 * candidate's job search (silence, application research, interview
 * prep, offer evaluation, unusual-situation framing). Each routes to
 * the existing catalog — no new tools, no new pages. The /tools
 * /q/ and /rank/ SEO landing surfaces stay intact.
 */
interface Question {
  id: string
  eyebrow: string
  label: string
  sub: string
  toolNames: string[]
}

const QUESTIONS: Question[] = [
  {
    id: 'no-responses',
    eyebrow: 'The silence',
    label: 'No one is responding to me.',
    sub: 'You’ve applied and the silence is the worst part. The actual problem is almost never what you think it is. Three places to look first.',
    toolNames: [
      'Where Do You Rank in a Recruiter Search?',
      'Through a Recruiter’s Eyes',
      'What’s Breaking Your Job Search',
    ],
  },
  {
    id: 'specific-job',
    eyebrow: 'Before you spend an hour on it',
    label: 'There’s a specific job I’m considering.',
    sub: 'Decode the JD, run your honest odds, and find the keywords you’re missing — before you waste an evening tailoring for a job that was never going to happen.',
    toolNames: [
      'What This Job Actually Is',
      'What Are My Chances?',
      'What Words Are Recruiters Searching For?',
    ],
  },
  {
    id: 'interview-prep',
    eyebrow: 'The prep',
    label: 'I’m prepping for an interview.',
    sub: 'See the questions they’re really asking, run a rehearsal that matches their actual rubric, and check how you’re coming across before you go in.',
    toolNames: [
      'The Rehearsal Room',
      'What They’re Really Asking',
      'How You Actually Come Across',
    ],
  },
  {
    id: 'got-offer',
    eyebrow: 'The offer',
    label: 'I just got an offer.',
    sub: 'See what’s actually negotiable, get the exact script to ask for more, and read the company before you sign — not after.',
    toolNames: [
      'How to Negotiate This Offer',
      'What This Company Feels Like to Work At',
    ],
  },
  {
    id: 'unusual-situation',
    eyebrow: 'Everyone’s different',
    label: 'My situation is unusual — gap, pivot, layoff, or new grad.',
    sub: 'Specific tools for specific situations. Tell it true, the way someone who reads resumes for a living would tell it.',
    toolNames: [
      'How to Explain My Employment Gap',
      'Your Career Pivot, Translated',
      'Your New Grad Resume',
    ],
  },
]

const FIGTREE_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');"

export function StartHereBoard() {
  const [selected, setSelected] = useState<string | null>(null)
  const current = QUESTIONS.find((q) => q.id === selected) ?? null

  return (
    <section
      style={{
        position: 'relative',
        background: '#0F0F12',
        color: '#F2F0FF',
        padding: 'clamp(64px, 9vw, 120px) 24px clamp(48px, 7vw, 96px)',
        overflow: 'hidden',
      }}
    >
      <style>{FIGTREE_IMPORT}</style>
      {/* Ambient backdrop — restrained, single radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 760,
          height: 760,
          background:
            'radial-gradient(circle, rgba(108,71,255,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto' }}>
        <Eyebrow>Start here</Eyebrow>
        <Heading>
          What&rsquo;s actually happening
          <br />
          in your job search?
        </Heading>
        <SubHeading>
          Skip the menu of tools. Tell us where you are — we&rsquo;ll point you
          straight at what&rsquo;s built for it.
        </SubHeading>

        {/* The board */}
        <div style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
          {current ? (
            <DetailView question={current} onBack={() => setSelected(null)} />
          ) : (
            <QuestionGrid onSelect={setSelected} />
          )}
        </div>

        {/* Hiring-team escape door — small, intentional */}
        <div
          style={{
            marginTop: 'clamp(36px, 5vw, 56px)',
            textAlign: 'center',
            fontFamily: "'Figtree', sans-serif",
            fontSize: 13,
            color: '#8B8AA0',
          }}
        >
          Hiring, not job-searching?{' '}
          <Link
            href="/for-companies"
            style={{
              color: '#FF8FA3',
              textDecoration: 'none',
              fontWeight: 700,
              borderBottom: '1px solid rgba(255,143,163,0.4)',
              paddingBottom: 1,
            }}
          >
            Different door &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

// =====================================================================
// Question grid (default view)
// =====================================================================

function QuestionGrid({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
        gap: 16,
      }}
    >
      {QUESTIONS.map((q) => (
        <QuestionCard key={q.id} question={q} onClick={() => onSelect(q.id)} />
      ))}
    </div>
  )
}

function QuestionCard({
  question,
  onClick,
}: {
  question: Question
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="start-here-card"
      style={{
        textAlign: 'left',
        background: '#14141B',
        border: '1px solid rgba(167,139,250,0.15)',
        borderRadius: 16,
        padding: '24px 24px 22px',
        cursor: 'pointer',
        fontFamily: "'Figtree', sans-serif",
        color: '#F2F0FF',
        transition: 'all 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 168,
      }}
    >
      <style>{`
        .start-here-card:hover {
          border-color: rgba(167,139,250,0.55) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(108,71,255,0.12);
        }
      `}</style>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#A78BFA',
        }}
      >
        {question.eyebrow}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(20px, 2.4vw, 24px)',
          lineHeight: 1.2,
          color: '#F2F0FF',
        }}
      >
        &ldquo;{question.label}&rdquo;
      </div>
      <div
        style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#A78BFA',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: '0.02em',
        }}
      >
        Start here <ArrowRight size={14} strokeWidth={2.5} />
      </div>
    </button>
  )
}

// =====================================================================
// Detail view (a question is selected — show recommended tools)
// =====================================================================

function DetailView({
  question,
  onBack,
}: {
  question: Question
  onBack: () => void
}) {
  const tools = question.toolNames
    .map((name) => CATALOG.find((t) => t.name === name))
    .filter((t): t is CatalogTool => Boolean(t))

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#A78BFA',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: 'pointer',
          padding: 0,
          marginBottom: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <ArrowLeft size={14} strokeWidth={2.5} /> Pick a different question
      </button>

      <div
        style={{
          background: '#14141B',
          border: '1px solid rgba(108,71,255,0.35)',
          borderRadius: 20,
          padding: 'clamp(28px, 4vw, 40px)',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 14,
          }}
        >
          {question.eyebrow}
        </div>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(26px, 3.2vw, 36px)',
            lineHeight: 1.15,
            color: '#F2F0FF',
            marginBottom: 14,
          }}
        >
          &ldquo;{question.label}&rdquo;
        </div>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.55,
            color: '#C9C7DA',
            maxWidth: 680,
            marginBottom: 32,
          }}
        >
          {question.sub.replace(/\\u2014/g, '—')}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 16,
          }}
        >
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <Link
            href="/tools"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              color: '#8B8AA0',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(139,138,160,0.35)',
              paddingBottom: 1,
            }}
          >
            Or see every tool we have &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

function ToolCard({ tool }: { tool: CatalogTool }) {
  const accent = tool.audience === 'hiring' ? '#FF4F6A' : '#A78BFA'
  const tintRgba = tool.audience === 'hiring' ? '255,79,106' : '108,71,255'
  const isComingSoon = tool.tier === 'soon'

  return (
    <Link
      href={isComingSoon ? '/tools' : tool.href}
      className="start-here-tool-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        textDecoration: 'none',
        background: '#0F0F12',
        border: `1px solid rgba(${tintRgba}, 0.25)`,
        borderRadius: 14,
        padding: '20px 20px 18px',
        transition: 'all 0.18s ease',
        minHeight: 168,
        cursor: isComingSoon ? 'default' : 'pointer',
        opacity: isComingSoon ? 0.7 : 1,
      }}
    >
      <style>{`
        .start-here-tool-card:hover {
          border-color: rgba(${tintRgba}, 0.55) !important;
          transform: translateY(-2px);
        }
      `}</style>
      <div
        style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          padding: '3px 9px',
          borderRadius: 100,
          background: `rgba(${tintRgba}, 0.15)`,
          color: accent,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        {isComingSoon
          ? 'Coming soon'
          : tool.tier === 'free'
          ? 'Free'
          : 'Pro'}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 17,
          lineHeight: 1.25,
          color: '#F2F0FF',
        }}
      >
        {tool.name}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 600,
          fontSize: 12,
          color: accent,
          letterSpacing: '0.01em',
        }}
      >
        {tool.subtitle}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 400,
          fontSize: 13.5,
          lineHeight: 1.5,
          color: '#9D9CB3',
          marginTop: 2,
        }}
      >
        {tool.desc}
      </div>
      <div
        style={{
          marginTop: 'auto',
          paddingTop: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: accent,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 13,
        }}
      >
        {isComingSoon ? 'In the queue' : `${tool.cta} →`}
      </div>
    </Link>
  )
}

// =====================================================================
// Small typographic primitives
// =====================================================================

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: 12,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#A78BFA',
        marginBottom: 18,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 900,
        fontSize: 'clamp(40px, 6.5vw, 72px)',
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        textAlign: 'center',
        color: '#F2F0FF',
        margin: 0,
      }}
    >
      {children}
    </h1>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(16px, 1.8vw, 19px)',
        lineHeight: 1.55,
        color: '#C9C7DA',
        textAlign: 'center',
        maxWidth: 600,
        margin: '20px auto 0',
      }}
    >
      {children}
    </p>
  )
}
