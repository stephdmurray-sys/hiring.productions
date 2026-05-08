'use client'

import { ReactNode } from 'react'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'

interface RecruiterReportProps {
  result: string
  /** When false, body content of non-decision sections is blurred and an upgrade card is shown inline. */
  isMember: boolean
  /** When provided + isMember, shows an "Apply these changes" CTA below the moves
   * that triggers the parent to run the rewrite-applied API call. */
  onApplyChanges?: () => void
  /** When true, the apply CTA shows as loading (the rewrite call is in flight). */
  applying?: boolean
}

type SectionKind =
  | 'firstSixSeconds'
  | 'whatImSkipping'
  | 'whatMakesMePause'
  | 'whereYouFit'
  | 'myConcern'
  | 'myDecision'
  | 'nextMoves'
  | 'unknown'

interface Section {
  kind: SectionKind
  heading: string
  body: string
}

const HEADING_RULES: Array<{ kind: SectionKind; test: (h: string) => boolean }> = [
  { kind: 'firstSixSeconds', test: (h) => /first\s*6\s*seconds/i.test(h) },
  { kind: 'whatImSkipping', test: (h) => /what\s*i'?m\s*skipping/i.test(h) },
  { kind: 'whatMakesMePause', test: (h) => /what\s*makes\s*me\s*pause/i.test(h) },
  { kind: 'whereYouFit', test: (h) => /where\s*you\s*fit/i.test(h) },
  { kind: 'myConcern', test: (h) => /^my\s*concern/i.test(h) },
  { kind: 'myDecision', test: (h) => /^my\s*decision/i.test(h) },
  { kind: 'nextMoves', test: (h) => /next\s*three\s*moves|next\s*moves/i.test(h) },
]

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
      // Only open a NEW top-level section when the heading is a known kind.
      // Sub-headers (Move 1: Rewrite, etc.) stay in the current section's body.
      if (kind !== 'unknown') {
        if (current) sections.push(current)
        current = { kind, heading, body: '' }
        continue
      }
    }
    if (current) {
      current.body += (current.body ? '\n' : '') + line
    }
  }
  if (current) sections.push(current)
  return sections
}

function renderInline(text: string, key: string, quoteTone: 'red' | 'green' | 'indigo' | 'none' = 'indigo'): ReactNode {
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
      const palette =
        quoteTone === 'red'
          ? { bg: '#FFE4E0', text: '#7A1F2E' }
          : quoteTone === 'green'
          ? { bg: '#DFF5E6', text: '#1F5436' }
          : { bg: '#E8E4FF', text: '#3D2A8C' }
      if (quoteTone === 'none') {
        return (
          <em key={`${key}-${i}`} style={{ fontStyle: 'italic', color: '#3D2A8C' }}>
            {part}
          </em>
        )
      }
      return (
        <span
          key={`${key}-${i}`}
          style={{
            background: palette.bg,
            color: palette.text,
            padding: '1px 6px',
            borderRadius: '4px',
            fontStyle: 'italic',
            fontWeight: 500,
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {part}
        </span>
      )
    }
    return part
  })
}

// === Section renderers ==========================================

function DecisionSection({ section }: { section: Section }) {
  const text = section.body.trim()
  const upper = text.toUpperCase()
  const verdict: 'keep' | 'pass' | 'fence' | 'unknown' = upper.includes('KEEP READING')
    ? 'keep'
    : upper.includes('ON THE FENCE')
    ? 'fence'
    : upper.includes('PASS')
    ? 'pass'
    : 'unknown'

  const palette =
    verdict === 'keep'
      ? { bg: '#DFF5E6', ring: '#1F8A55', label: 'KEEP READING' }
      : verdict === 'fence'
      ? { bg: '#FEF1D6', ring: '#D97706', label: 'ON THE FENCE' }
      : verdict === 'pass'
      ? { bg: '#FFE4E0', ring: '#C73E5A', label: 'PASS' }
      : { bg: '#E8E4FF', ring: '#7A6CFF', label: 'READ' }

  // Strip the verdict words from the body text so we don't repeat them
  const detail = text
    .replace(/^(keep reading|pass|on the fence)[\s—–-]*/i, '')
    .trim()

  return (
    <div
      style={{
        marginBottom: '36px',
        padding: '28px 32px',
        background: palette.bg,
        borderRadius: '12px',
        border: `1px solid ${palette.ring}33`,
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          color: palette.ring,
          marginBottom: '8px',
        }}
      >
        The recruiter's decision
      </div>
      <div
        style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#1A1A22',
          letterSpacing: '-0.02em',
          marginBottom: detail ? '12px' : 0,
          lineHeight: 1.1,
          fontFamily: 'Figtree, sans-serif',
        }}
      >
        {palette.label}
      </div>
      {detail && (
        <div style={{ fontSize: '15px', color: '#1A1A22', lineHeight: 1.55 }}>
          {renderInline(detail, 'decision', 'none')}
        </div>
      )}
    </div>
  )
}

function ProseSection({
  section,
  title,
  eyebrow,
  description,
  blurred,
}: {
  section: Section
  title: string
  eyebrow: string
  description: string
  blurred: boolean
}) {
  return (
    <SectionShell
      title={title}
      accentColor="#7A6CFF"
      eyebrow={eyebrow}
      description={description}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            fontSize: '15px',
            color: '#3A3A4A',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            filter: blurred ? 'blur(7px)' : undefined,
            userSelect: blurred ? 'none' : undefined,
            pointerEvents: blurred ? 'none' : undefined,
          }}
          aria-hidden={blurred}
        >
          {renderInline(section.body.trim(), `prose-${section.kind}`, 'indigo')}
        </div>
      </div>
    </SectionShell>
  )
}

interface MoveBlock {
  num: number
  kind: 'rewrite' | 'add' | 'unknown'
  current?: string
  rewrite?: string
  addTo?: string
  addThis?: string
  why?: string
  rawFallback?: string
}

function parseMoveBlocks(body: string): MoveBlock[] {
  const moves: MoveBlock[] = []
  const sections = body.split(/\n(?=\s*\*\*Move\s*\d)/i)
  for (const raw of sections) {
    const text = raw.trim()
    if (!text) continue

    const headerMatch = text.match(/^\s*\*\*Move\s*(\d+):\s*(Rewrite|Add)\*\*/i)
    if (!headerMatch) {
      const numFallback = text.match(/^\s*(\d+)\./)
      if (numFallback) {
        moves.push({
          num: parseInt(numFallback[1], 10),
          kind: 'unknown',
          rawFallback: text.replace(/^\s*\d+\.\s*/, '').trim(),
        })
      }
      continue
    }

    const num = parseInt(headerMatch[1], 10)
    const kind = headerMatch[2].toLowerCase() === 'add' ? 'add' : 'rewrite'

    const grab = (label: string): string | undefined => {
      const re = new RegExp(`^\\s*${label}\\s*:\\s*(.+?)\\s*$`, 'im')
      const m = text.match(re)
      if (!m) return undefined
      return m[1].replace(/^"|"$/g, '').trim() || undefined
    }

    const block: MoveBlock = { num, kind }
    if (kind === 'rewrite') {
      block.current = grab('Current')
      block.rewrite = grab('Rewrite')
    } else {
      block.addTo = grab('Add to')
      block.addThis = grab('Add this')
    }
    block.why = grab('Why')

    if (!block.current && !block.rewrite && !block.addTo && !block.addThis && !block.why) {
      block.kind = 'unknown'
      block.rawFallback = text.replace(/^\s*\*\*Move[^*]+\*\*\s*/i, '').trim()
    }

    moves.push(block)
  }
  return moves
}

function MoveCard({ move }: { move: MoveBlock }) {
  const numStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#FF4F6A',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  } as const

  const labelStyle = {
    fontSize: '10px',
    fontWeight: 800,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '4px',
  }

  const beforeBox = {
    padding: '12px 14px',
    background: '#FFE4E0',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#7A1F2E',
    fontStyle: 'italic' as const,
    lineHeight: 1.5,
  }
  const afterBox = {
    padding: '12px 14px',
    background: '#DFF5E6',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#1F5436',
    fontStyle: 'italic' as const,
    lineHeight: 1.5,
  }
  const whyBox = {
    fontSize: '13px',
    color: '#5A5A6E',
    fontStyle: 'italic' as const,
    marginTop: '10px',
    paddingLeft: '12px',
    borderLeft: '2px solid #ECECF2',
  }

  if (move.kind === 'unknown' && move.rawFallback) {
    return (
      <div style={{ display: 'flex', gap: '14px' }}>
        <div style={numStyle}>{move.num}</div>
        <div style={{ flex: 1, fontSize: '15px', color: '#1A1A22', lineHeight: 1.65 }}>
          {renderInline(move.rawFallback, `mv-${move.num}`, 'green')}
        </div>
      </div>
    )
  }

  if (move.kind === 'add') {
    return (
      <div style={{ display: 'flex', gap: '14px' }}>
        <div style={numStyle}>{move.num}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A22', marginBottom: '12px' }}>
            Add a new line to{' '}
            <span style={{ color: '#7A6CFF' }}>{move.addTo || 'your resume'}</span>
          </div>
          {move.addThis && (
            <div style={{ ...afterBox, marginBottom: 0 }}>
              <div style={{ ...labelStyle, color: '#1F8A55' }}>Add this</div>
              {`"${move.addThis}"`}
            </div>
          )}
          {move.why && <div style={whyBox}>{move.why}</div>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '14px' }}>
      <div style={numStyle}>{move.num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
          {move.current && (
            <div style={beforeBox}>
              <div style={{ ...labelStyle, color: '#C73E5A' }}>Current</div>
              {`"${move.current}"`}
            </div>
          )}
          {move.rewrite && (
            <div style={afterBox}>
              <div style={{ ...labelStyle, color: '#1F8A55' }}>Rewrite to</div>
              {`"${move.rewrite}"`}
            </div>
          )}
        </div>
        {move.why && <div style={whyBox}>{move.why}</div>}
      </div>
    </div>
  )
}

function NextMovesSection({ section, blurred }: { section: Section; blurred: boolean }) {
  const moves = parseMoveBlocks(section.body)
  return (
    <SectionShell
      title="Three rewrites to send instead of what's there now"
      accentColor="#FF4F6A"
      eyebrow="What to fix"
      description="Specific edits — not advice. Each one targets a line from your resume and gives you the exact replacement words."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          filter: blurred ? 'blur(7px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        {moves.map((m, i) => (
          <MoveCard key={`mv-${i}-${m.num}`} move={m} />
        ))}
      </div>
    </SectionShell>
  )
}

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
  description: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: '44px' }}>
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
            paddingBottom: '14px',
            borderBottom: `2px solid ${accentColor}33`,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
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
      </div>
      {children}
    </div>
  )
}

// Inline upgrade card shown to non-members between sections
function InlineUpgradeCard() {
  const inclusions = [
    {
      label: 'The whole monologue',
      sub: 'on this resume — and any other one you run, with or without a job description',
    },
    {
      label: 'LinkedIn Profile Rewriter',
      sub: 'your audition reel, with the actual rewrites — not advice',
    },
    {
      label: 'The Rehearsal Room',
      sub: 'interview prep in a hiring manager’s voice — questions, answer evals, the whole thing',
    },
  ]
  return (
    <div
      style={{
        margin: '8px 0 36px',
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
        Want the rest of the read?
      </div>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 900,
          lineHeight: 1.3,
          marginBottom: '20px',
          letterSpacing: '-0.01em',
        }}
      >
        That was the verdict. Members see the whole monologue — what they skip, what makes them pause, and the call they make in 30 seconds.
      </div>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#8B8AA0',
          marginBottom: '12px',
        }}
      >
        And while you’re a member, you also get
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', marginBottom: '20px' }}>
        {inclusions.map((item, i) => (
          <li
            key={i}
            style={{
              position: 'relative',
              paddingLeft: '20px',
              marginBottom: '10px',
              fontSize: '14px',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '4px',
                top: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#A78BFA',
              }}
            />
            <span style={{ fontWeight: 700, color: '#F2F0FF' }}>{item.label}</span>{' '}
            <span style={{ color: '#B8B6CF' }}>— {item.sub}</span>
          </li>
        ))}
      </ul>

      <div style={{ fontSize: '13px', color: '#8B8AA0', marginBottom: '16px' }}>
        $20/year. Use them on every resume tweak and every job description you’re weighing. Cancel anytime.
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

// === Main component =============================================

export function RecruiterReport({ result, isMember, onApplyChanges, applying = false }: RecruiterReportProps) {
  const sections = parseSections(result)
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Find the My Decision section to render it first (it's the verdict)
  const decision = sections.find((s) => s.kind === 'myDecision')
  const rest = sections.filter((s) => s.kind !== 'myDecision')

  // For non-members: show the verdict + section headers, blur section bodies,
  // and insert the upgrade card after the first blurred section.
  let upgradeRendered = false

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#1A1A22',
        borderRadius: '16px',
        padding: 'clamp(28px, 5vw, 56px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        maxWidth: '780px',
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
            Inside Look
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A22', letterSpacing: '-0.02em' }}>
            Through a recruiter's eyes
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#6B6B7B', textAlign: 'right' }}>
          Read on {today}
          <div style={{ fontSize: '10px', color: '#9494A5', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            hiring.productions
          </div>
        </div>
      </div>

      {/* Verdict (always visible — this is the "score") */}
      {decision && <DecisionSection section={decision} />}

      {/* All other sections (blurred for non-members) */}
      {rest.map((s, i) => {
        const key = `s-${i}`
        const blurred = !isMember
        let element: ReactNode

        switch (s.kind) {
          case 'firstSixSeconds':
            element = (
              <ProseSection
                key={key}
                section={s}
                title="First six seconds"
                eyebrow="The first impression"
                description="What the recruiter notices the instant your resume opens. The decision starts here."
                blurred={blurred}
              />
            )
            break
          case 'whatImSkipping':
            element = (
              <ProseSection
                key={key}
                section={s}
                title="What I'm skipping"
                eyebrow="The skim"
                description="The lines a recruiter glides past, and exactly why. Most resumes have these — the question is which lines they are on yours."
                blurred={blurred}
              />
            )
            break
          case 'whatMakesMePause':
            element = (
              <ProseSection
                key={key}
                section={s}
                title="What makes me pause"
                eyebrow="The pauses"
                description="Specific lines that catch the recruiter's attention — for good reasons or yellow-flag reasons."
                blurred={blurred}
              />
            )
            break
          case 'whereYouFit':
            element = (
              <ProseSection
                key={key}
                section={s}
                title="Where you fit (and where you don't)"
                eyebrow="The match"
                description="Mapped against the job you pasted in. Where the resume earns the role, and where it falls short of the requirements."
                blurred={blurred}
              />
            )
            break
          case 'myConcern':
            element = (
              <ProseSection
                key={key}
                section={s}
                title="My concern"
                eyebrow="The hesitation"
                description="The one thing that makes a recruiter hesitate. Whether it's a deal-breaker or a question they'd ask in an interview."
                blurred={blurred}
              />
            )
            break
          case 'nextMoves':
            element = <NextMovesSection key={key} section={s} blurred={blurred} />
            break
          default:
            element = (
              <ProseSection
                key={key}
                section={s}
                title={s.heading}
                eyebrow="Note"
                description="Additional context from the recruiter."
                blurred={blurred}
              />
            )
        }

        // After the first blurred section, drop in the upgrade card
        if (!isMember && !upgradeRendered) {
          upgradeRendered = true
          return (
            <div key={key + '-wrap'}>
              {element}
              <InlineUpgradeCard />
            </div>
          )
        }
        return element
      })}

      {/* Apply-changes CTA — members only, lives at the end of the report */}
      {isMember && onApplyChanges && (
        <div
          style={{
            marginTop: '20px',
            padding: '28px 32px',
            background: 'linear-gradient(135deg, #FAF6FF 0%, #FFF4F1 100%)',
            border: '1px solid rgba(108,71,255,0.2)',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#7A6CFF',
              marginBottom: '8px',
            }}
          >
            One more thing
          </div>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 900,
              color: '#1A1A22',
              fontFamily: 'Figtree, sans-serif',
              letterSpacing: '-0.02em',
              margin: '0 0 8px 0',
              lineHeight: 1.25,
            }}
          >
            Want this as an edit memo?
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#5A5A6E',
              lineHeight: 1.55,
              margin: '0 0 18px 0',
            }}
          >
            Get a structured action checklist — every line to rewrite, every metric to add, every keyword from the JD, every phrase to strike. You make the edits in your own voice, so your resume actually stays yours (and won&apos;t flag as AI).
          </p>
          <button
            onClick={onApplyChanges}
            disabled={applying}
            style={{
              padding: '14px 28px',
              background: applying
                ? '#A78BFA'
                : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              fontFamily: 'Figtree, sans-serif',
              cursor: applying ? 'wait' : 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {applying ? 'Writing your edit memo...' : 'Get my edit memo'}
          </button>
        </div>
      )}

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
        End of report · Stephanie Murray, hiring.productions
      </div>
    </div>
  )
}
