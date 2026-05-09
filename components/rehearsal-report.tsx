'use client'

import { ReactNode } from 'react'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'

interface RehearsalReportProps {
  result: string
  /** When false, the questions after Q1 are blurred and an upgrade card shows inline. */
  isMember: boolean
}

type SectionKind =
  | 'theKind'
  | 'opening'
  | 'behavioral'
  | 'skills'
  | 'culture'
  | 'curveball'
  | 'unknown'

interface Section {
  kind: SectionKind
  heading: string
  body: string
}

const HEADING_RULES: Array<{ kind: SectionKind; test: (h: string) => boolean }> = [
  { kind: 'theKind', test: (h) => /kind\s*of\s*interview/i.test(h) },
  { kind: 'opening', test: (h) => /^opening\b/i.test(h) },
  { kind: 'behavioral', test: (h) => /^behavioral\b/i.test(h) },
  { kind: 'skills', test: (h) => /^skills\b/i.test(h) },
  { kind: 'culture', test: (h) => /^culture\b/i.test(h) },
  { kind: 'curveball', test: (h) => /^curveball\b/i.test(h) },
]

const CATEGORY_META: Record<
  Exclude<SectionKind, 'theKind' | 'unknown'>,
  { eyebrow: string; title: string; description: string }
> = {
  opening: {
    eyebrow: 'Getting started',
    title: 'Opening',
    description: 'How they take your temperature in the first three minutes. Get this wrong and the rest of the interview is uphill.',
  },
  behavioral: {
    eyebrow: 'Past performance',
    title: 'Behavioral',
    description: 'They want stories with real outcomes. Specifics, not summaries — and a clear arc you owned.',
  },
  skills: {
    eyebrow: 'Can you do this work',
    title: 'Skills',
    description: 'The actual work of the role, surfaced through specific scenarios. This is where weak candidates get exposed.',
  },
  culture: {
    eyebrow: 'Will you thrive here',
    title: 'Culture',
    description: 'Tuned to the company signals in the JD. The wrong answer here can override every other right one.',
  },
  curveball: {
    eyebrow: 'How you think under pressure',
    title: 'Curveball',
    description: 'Not brain teasers — the questions that show how you handle ambiguity, conflict, or uncomfortable truth.',
  },
}

function classifyHeading(h: string): SectionKind {
  for (const rule of HEADING_RULES) if (rule.test(h)) return rule.kind
  return 'unknown'
}

function parseSections(markdown: string): Section[] {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  let current: Section | null = null

  for (const raw of lines) {
    const line = raw.trimEnd()
    const m = line.match(/^\s*\*\*(.+?):?\*\*\s*$/)
    if (m) {
      const heading = m[1].replace(/:$/, '').trim()
      const kind = classifyHeading(heading)
      if (kind !== 'unknown') {
        if (current) sections.push(current)
        current = { kind, heading, body: '' }
        continue
      }
    }
    if (current) current.body += (current.body ? '\n' : '') + line
  }
  if (current) sections.push(current)
  return sections
}

interface Question {
  num: number
  question: string
  assessing?: string
  weak?: string
  strong?: string
  openWith?: string
}

function parseQuestions(body: string): Question[] {
  const questions: Question[] = []
  // Split on lines that start with **Qn:**
  const blocks = body.split(/\n(?=\s*\*\*Q\d+:)/i)

  for (const raw of blocks) {
    const text = raw.trim()
    if (!text) continue

    // Header: **Q1:** "Question text"
    const header = text.match(/^\s*\*\*Q(\d+):\*\*\s*"([^"]+)"/i)
    if (!header) continue

    const num = parseInt(header[1], 10)
    const question = header[2].trim()

    const grab = (label: string): string | undefined => {
      const re = new RegExp(
        `(?:^|\\n)\\s*${label}\\s*:\\s*([\\s\\S]+?)(?=\\n\\s*(?:Assessing|Weak|Strong|Open with)\\s*:|$)`,
        'i',
      )
      const m = text.match(re)
      if (!m) return undefined
      return m[1].trim().replace(/^"|"$/g, '').trim() || undefined
    }

    questions.push({
      num,
      question,
      assessing: grab('Assessing'),
      weak: grab('Weak'),
      strong: grab('Strong'),
      openWith: grab('Open with'),
    })
  }

  return questions
}

// === Inline render helpers ============================================
function renderInline(text: string, key: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|"[^"]+")/g)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${key}-${i}`} style={{ fontWeight: 700, color: '#1A1A22' }}>
          {part.replace(/\*\*/g, '')}
        </strong>
      )
    }
    if (/^".+"$/.test(part)) {
      return (
        <em key={`${key}-${i}`} style={{ fontStyle: 'italic', color: '#3D2A8C' }}>
          {part}
        </em>
      )
    }
    return part
  })
}

// === Section shell ====================================================
function SectionShell({
  title,
  accentColor,
  eyebrow,
  description,
  children,
}: {
  title: string
  accentColor: string
  eyebrow: string
  description?: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: accentColor,
            marginBottom: '8px',
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 900,
            color: '#1A1A22',
            fontFamily: 'Figtree, sans-serif',
            letterSpacing: '-0.02em',
            margin: 0,
            paddingBottom: '12px',
            borderBottom: `2px solid ${accentColor}33`,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: '#5A5A6E',
              fontStyle: 'italic',
              lineHeight: 1.55,
              marginTop: '12px',
              marginBottom: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

// === The kind of interview (the verdict) ==============================
function TheKindSection({ section }: { section: Section }) {
  return (
    <div
      style={{
        marginBottom: '36px',
        padding: '28px 32px',
        background: 'linear-gradient(135deg, #F4F1FF 0%, #FFF4F1 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(122,108,255,0.2)',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: '#7A6CFF',
          marginBottom: '8px',
        }}
      >
        Before you walk in
      </div>
      <h2
        style={{
          fontSize: '22px',
          fontWeight: 900,
          color: '#1A1A22',
          letterSpacing: '-0.02em',
          margin: '0 0 14px 0',
          lineHeight: 1.2,
          fontFamily: 'Figtree, sans-serif',
        }}
      >
        The kind of interview this is
      </h2>
      <div
        style={{
          fontSize: '15px',
          color: '#1A1A22',
          lineHeight: 1.65,
          whiteSpace: 'pre-wrap',
        }}
      >
        {renderInline(section.body.trim(), 'kind')}
      </div>
    </div>
  )
}

// === Question card ====================================================
function QuestionCard({ q, blurred }: { q: Question; blurred: boolean }) {
  const labelStyle = {
    fontSize: '10px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '4px',
  }
  const fieldStyle = {
    fontSize: '14px',
    color: '#1A1A22',
    lineHeight: 1.55,
  }

  return (
    <div
      style={{
        padding: '22px 24px',
        background: '#FAFAFB',
        border: '1px solid #ECECF2',
        borderRadius: '12px',
        filter: blurred ? 'blur(8px)' : undefined,
        userSelect: blurred ? 'none' : undefined,
        pointerEvents: blurred ? 'none' : undefined,
      }}
      aria-hidden={blurred}
    >
      {/* Question header */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#1A1A22',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'Figtree, sans-serif',
            letterSpacing: '0.04em',
          }}
        >
          Q{q.num}
        </div>
        <div
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#1A1A22',
            lineHeight: 1.4,
            fontFamily: 'Figtree, sans-serif',
            paddingTop: '4px',
            letterSpacing: '-0.01em',
          }}
        >
          “{q.question}”
        </div>
      </div>

      {/* Four labeled fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {q.assessing && (
          <div
            style={{
              padding: '12px 14px',
              background: '#E8E4FF',
              borderRadius: '8px',
            }}
          >
            <div style={{ ...labelStyle, color: '#7A6CFF' }}>What they're really assessing</div>
            <div style={fieldStyle}>{renderInline(q.assessing, `as-${q.num}`)}</div>
          </div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '8px',
          }}
        >
          {q.weak && (
            <div
              style={{
                padding: '12px 14px',
                background: '#FFE4E0',
                borderRadius: '8px',
              }}
            >
              <div style={{ ...labelStyle, color: '#C73E5A' }}>Weak answer</div>
              <div style={{ ...fieldStyle, color: '#7A1F2E' }}>
                {renderInline(q.weak, `w-${q.num}`)}
              </div>
            </div>
          )}
          {q.strong && (
            <div
              style={{
                padding: '12px 14px',
                background: '#DFF5E6',
                borderRadius: '8px',
              }}
            >
              <div style={{ ...labelStyle, color: '#1F8A55' }}>Strong answer</div>
              <div style={{ ...fieldStyle, color: '#1F5436' }}>
                {renderInline(q.strong, `s-${q.num}`)}
              </div>
            </div>
          )}
        </div>
        {q.openWith && (
          <div
            style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, rgba(108,71,255,0.10) 0%, rgba(255,79,106,0.08) 100%)',
              border: '1px dashed rgba(108,71,255,0.3)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                ...labelStyle,
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '6px',
              }}
            >
              Open with
            </div>
            <div
              style={{
                fontSize: '14.5px',
                color: '#1A1A22',
                fontStyle: 'italic',
                lineHeight: 1.55,
              }}
            >
              “{q.openWith}”
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// === Category section ================================================
function CategorySection({
  section,
  blurredQuestions,
}: {
  section: Section
  blurredQuestions: Set<number>
}) {
  if (section.kind === 'unknown' || section.kind === 'theKind') return null
  const meta = CATEGORY_META[section.kind]
  const questions = parseQuestions(section.body)

  return (
    <SectionShell
      title={meta.title}
      accentColor="#7A6CFF"
      eyebrow={meta.eyebrow}
      description={meta.description}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {questions.map((q) => (
          <QuestionCard key={`q-${q.num}`} q={q} blurred={blurredQuestions.has(q.num)} />
        ))}
      </div>
    </SectionShell>
  )
}

// === Inline upgrade card =============================================
function InlineUpgradeCard() {
  return (
    <div
      style={{
        margin: '24px 0 32px',
        padding: '28px 32px',
        background: 'linear-gradient(135deg, #1A1A22 0%, #2A1F3D 100%)',
        borderRadius: '14px',
        border: '1.5px solid rgba(108,71,255,0.4)',
        color: '#F2F0FF',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#A78BFA',
          marginBottom: '10px',
        }}
      >
        Want the rest of the questions?
      </div>
      <div style={{ fontSize: '20px', fontWeight: 900, lineHeight: 1.3, marginBottom: '20px' }}>
        That was one. Members see all ten — every category, every question with what they're really assessing, the weak vs strong answer, and the literal opening line to start with.
      </div>
      <div style={{ fontSize: '14px', color: '#8B8AA0', marginBottom: '16px' }}>
        $20/year. Use it on every interview prep. Cancel anytime.
      </div>
      <StripeCheckoutButton
        style={{
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          border: 'none',
          borderRadius: '10px',
          padding: '14px 24px',
          fontFamily: 'Figtree, sans-serif',
          fontSize: '15px',
          fontWeight: 800,
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Get full access — $20/year
      </StripeCheckoutButton>
    </div>
  )
}

// === Main component =================================================
export function RehearsalReport({ result, isMember }: RehearsalReportProps) {
  const sections = parseSections(result)
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Non-member preview: show The Kind + the first question (Q1) only.
  // Blur Q2 through Q10 and drop the upgrade card after the opening section.
  const blurredQuestions = isMember ? new Set<number>() : new Set([2, 3, 4, 5, 6, 7, 8, 9, 10])

  const theKind = sections.find((s) => s.kind === 'theKind')
  const categories = sections.filter((s) => s.kind !== 'theKind' && s.kind !== 'unknown')

  let upgradeRendered = false

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#1A1A22',
        borderRadius: '16px',
        padding: 'clamp(28px, 5vw, 56px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        maxWidth: '820px',
        margin: '0 auto',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      {/* Document header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '28px',
          paddingBottom: '18px',
          borderBottom: '2px solid #1A1A22',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#7A6CFF',
              marginBottom: '4px',
            }}
          >
            The Rehearsal Room
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A22', letterSpacing: '-0.02em' }}>
            Your interview script
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#6B6B7B', textAlign: 'right' }}>
          Read on {today}
          <div style={{ fontSize: '10px', color: '#9494A5', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            hiring.productions
          </div>
        </div>
      </div>

      {theKind && <TheKindSection section={theKind} />}

      {categories.map((s, i) => {
        const element = (
          <CategorySection key={`cat-${i}`} section={s} blurredQuestions={blurredQuestions} />
        )

        // Drop the upgrade card right after the Opening section for non-members
        if (!isMember && s.kind === 'opening' && !upgradeRendered) {
          upgradeRendered = true
          return (
            <div key={`cat-${i}-wrap`}>
              {element}
              <InlineUpgradeCard />
            </div>
          )
        }
        return element
      })}

      {/* Document footer */}
      <div
        style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #ECECF2',
          fontSize: '11px',
          color: '#9494A5',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textAlign: 'center',
        }}
      >
        End of script · Stephanie Murray, hiring.productions
      </div>
    </div>
  )
}
