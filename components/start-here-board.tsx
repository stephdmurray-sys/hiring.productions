'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CATALOG, type CatalogTool } from '@/lib/tools-catalog'
import { MOMENTS, type Moment } from '@/lib/moments'
import { QuickHeadlineRead } from '@/components/quick-headline-read'

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
// Alias so the local code reads naturally — these surface as "questions"
// to the visitor but the underlying data shape is a Moment from the
// shared lib.
type Question = Moment
const QUESTIONS = MOMENTS

const FIGTREE_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');"

export function StartHereBoard() {
  const [selected, setSelected] = useState<string | null>(null)
  const current = QUESTIONS.find((q) => q.id === selected) ?? null

  return (
    <section
      style={{
        position: 'relative',
        background: '#FAF8F3',
        color: '#1A1A22',
        padding: 'clamp(64px, 9vw, 120px) 24px clamp(48px, 7vw, 96px)',
        overflow: 'hidden',
      }}
    >
      <style>{FIGTREE_IMPORT}</style>
      {/* Ambient backdrop — restrained, single radial glow. Lighter
          on cream than on dark, but still gives the hero some depth. */}
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
            'radial-gradient(circle, rgba(108,71,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto' }}>
        <Heading>
          Pull back the curtain
          <br />
          on hiring.
        </Heading>
        <SubHeading>Both sides of the table. In the open.</SubHeading>

        {/* The board */}
        <div style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
          {current ? (
            <DetailView question={current} onBack={() => setSelected(null)} />
          ) : (
            <QuestionGrid onSelect={setSelected} />
          )}
        </div>
        {/* Redundant audience-escape link removed — the page-level strip
            above the hero already routes hiring leaders to /for-companies. */}
      </div>
    </section>
  )
}

// =====================================================================
// Question grid (default view)
// =====================================================================

function QuestionGrid({ onSelect }: { onSelect: (id: string) => void }) {
  // Three numbered moments laid out as a journey. On desktop, 3 cards
  // sit in a row + a "→ HIRED" payoff element at the end so the eye
  // reads the cards as steps toward an outcome. On mobile, cards stack
  // and the payoff sits below them.
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: 18,
          maxWidth: 1080,
          margin: '0 auto',
        }}
      >
        {QUESTIONS.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i + 1}
            onClick={() => onSelect(q.id)}
          />
        ))}
      </div>

      {/* The destination — a visual payoff. No eyebrow label; the size
          of the word IS the label. Generous whitespace above so it
          reads as the resolution of the journey, not a card caption. */}
      <div
        aria-hidden
        style={{
          marginTop: 'clamp(56px, 7vw, 88px)',
          textAlign: 'center',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(56px, 9vw, 104px)',
          letterSpacing: '-0.035em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Hired.
      </div>
    </>
  )
}

function QuestionCard({
  question,
  index,
  onClick,
}: {
  question: Question
  index: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="start-here-card"
      style={{
        textAlign: 'left',
        background: '#FFFFFF',
        border: '1px solid #ECECF2',
        borderRadius: 16,
        padding: '24px 24px 22px',
        cursor: 'pointer',
        fontFamily: "'Figtree', sans-serif",
        color: '#1A1A22',
        transition: 'all 0.18s ease',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        // Lock to equal height across the row. Grid items stretch by
        // default; height:100% lets each card claim that stretched
        // height so The Silence + The Story match The Interview even
        // though their bullet counts differ.
        height: '100%',
      }}
    >
      <style>{`
        .start-here-card:hover {
          border-color: rgba(108,71,255,0.40) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(108,71,255,0.10);
        }
        .start-here-card:hover .start-here-cta {
          color: #1A1A22 !important;
        }
      `}</style>

      {/* TOP ROW — chapter number on the left, "Start here →" on the right.
          The action sits where the eye expects it; the number anchors the
          journey rhythm without competing for attention. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: '0.14em',
            color: '#A78BFA',
          }}
        >
          0{index}
        </span>
        <span
          className="start-here-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            color: '#A78BFA',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12.5,
            letterSpacing: '0.02em',
            transition: 'color 0.18s ease',
          }}
        >
          Start here <ArrowRight size={13} strokeWidth={2.5} />
        </span>
      </div>

      {/* TITLE */}
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(26px, 3.2vw, 32px)',
          lineHeight: 1.1,
          letterSpacing: '-0.015em',
          color: '#1A1A22',
          marginBottom: 4,
        }}
      >
        {question.title}
      </div>

      {/* QUOTE — the visitor's voice. */}
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 13,
          lineHeight: 1.4,
          color: '#5A5A6E',
          textWrap: 'balance',
        }}
      >
        &ldquo;{question.quote}&rdquo;
      </div>

      {/* BULLETS — always visible. The value-tease lives on the card. */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginTop: 14,
          paddingTop: 14,
          borderTop: '1px dashed #ECECF2',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {question.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#3A3A4A',
              lineHeight: 1.45,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                color: '#6C47FF',
                fontWeight: 800,
                lineHeight: 1.45,
                flexShrink: 0,
              }}
            >
              ·
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
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
          background: '#FFFFFF',
          border: '1px solid rgba(108,71,255,0.35)',
          borderRadius: 20,
          padding: 'clamp(28px, 4vw, 40px)',
        }}
      >
        {/* Match the card hierarchy: big title, smaller italic quote. */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(32px, 4.2vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1A1A22',
            marginBottom: 8,
          }}
        >
          {question.title}
        </div>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            color: '#A78BFA',
            marginBottom: 20,
          }}
        >
          &ldquo;{question.quote}&rdquo;
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

        {/* Live Quick Read — only on The Silence (the moment Quick Read
            actually answers). Visitor sees the recruiter take in 3
            seconds, then the deeper tools below earn the click for the
            full run. */}
        {question.id === 'no-responses' && (
          <div
            style={{
              marginBottom: 32,
              padding: 'clamp(20px, 3vw, 28px)',
              background: '#FAF8F3',
              border: '1px solid rgba(167,139,250,0.18)',
              borderRadius: 16,
            }}
          >
            <QuickHeadlineRead inline />
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 16,
          }}
        >
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} startHere={i === 0} />
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

function ToolCard({ tool, startHere }: { tool: CatalogTool; startHere?: boolean }) {
  const accent = tool.audience === 'hiring' ? '#FF4F6A' : '#A78BFA'
  const tintRgba = tool.audience === 'hiring' ? '255,79,106' : '108,71,255'
  const isComingSoon = tool.tier === 'soon'
  // Same principle as the /tools page ToolCard: title + ONE result-focused
  // tease + CTA. No subtitle, no long desc. Click into the tool for depth.
  const tease = tool.getBack ?? tool.desc

  return (
    <Link
      href={isComingSoon ? '/tools' : tool.href}
      className="start-here-tool-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textDecoration: 'none',
        background: '#FAF8F3',
        border: startHere
          ? `1.5px solid rgba(${tintRgba}, 0.6)`
          : `1px solid rgba(${tintRgba}, 0.25)`,
        borderRadius: 14,
        padding: '20px 20px 18px',
        transition: 'all 0.18s ease',
        // Equal height enforcement: fill grid row + floor so cards stay
        // visually balanced regardless of tease length.
        height: '100%',
        minHeight: 210,
        cursor: isComingSoon ? 'default' : 'pointer',
        opacity: isComingSoon ? 0.7 : 1,
        boxShadow: startHere ? `0 14px 36px rgba(${tintRgba}, 0.18)` : undefined,
        position: 'relative',
      }}
    >
      {startHere && (
        <div
          style={{
            position: 'absolute',
            top: -10,
            left: 16,
            background: `rgba(${tintRgba}, 0.95)`,
            color: '#FFFFFF',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '3px 10px',
            borderRadius: 100,
          }}
        >
          Start here
        </div>
      )}
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
          color: '#1A1A22',
        }}
      >
        {tool.name}
      </div>
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 400,
          fontSize: 13.5,
          lineHeight: 1.5,
          color: '#C9C7DA',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {tease}
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
        color: '#1A1A22',
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
        color: '#5A5A6E',
        textAlign: 'center',
        maxWidth: 600,
        margin: '20px auto 0',
      }}
    >
      {children}
    </p>
  )
}
