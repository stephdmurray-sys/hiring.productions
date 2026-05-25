'use client'

import { ReactNode } from 'react'

interface ResumeReportProps {
  result: string
}

type SectionKind =
  | 'score'
  | 'aiFlags'
  | 'humanStrengths'
  | 'phraseLandsOn'
  | 'missingMetrics'
  | 'probes'
  | 'myRead'
  | 'nextMoves'
  | 'unknown'

interface Section {
  kind: SectionKind
  heading: string
  body: string
}

const HEADING_RULES: Array<{ kind: SectionKind; test: (h: string) => boolean }> = [
  { kind: 'score', test: (h) => /authenticity score/i.test(h) },
  { kind: 'aiFlags', test: (h) => /reads as ai/i.test(h) },
  { kind: 'humanStrengths', test: (h) => /reads as human/i.test(h) },
  { kind: 'phraseLandsOn', test: (h) => /recruiter will land/i.test(h) },
  { kind: 'missingMetrics', test: (h) => /missing for|missing metrics/i.test(h) },
  { kind: 'probes', test: (h) => /probe in interview|recruiter will probe/i.test(h) },
  { kind: 'myRead', test: (h) => /^my read/i.test(h) },
  { kind: 'nextMoves', test: (h) => /next three moves|next moves/i.test(h) },
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
    // Match **Heading:** — but only treat it as a NEW top-level section
    // when the heading matches one of our known top-level kinds.
    // Otherwise it's a sub-heading inside the current section (e.g. role
    // titles inside Missing Metrics, or Move blocks inside Next Moves)
    // and it stays in the body for that section's own parser to handle.
    const m = line.match(/^\s*\*\*(.+?):?\*\*\s*$/)
    if (m) {
      const heading = m[1].replace(/:$/, '').trim()
      const kind = classifyHeading(heading)
      if (kind !== 'unknown') {
        if (current) sections.push(current)
        current = { kind, heading, body: '' }
        continue
      }
      // Unknown heading — fall through to body append below
    }
    if (current) {
      current.body += (current.body ? '\n' : '') + line
    }
  }
  if (current) sections.push(current)
  return sections
}

// Splits a paragraph into [quote, commentary] when the quote is followed
// by an em-dash separator (the model uses "...quote..." — commentary).
// Only matches double-quoted strings to avoid mangling contractions.
function splitQuoteAndComment(text: string): { quote: string | null; comment: string } {
  const m = text.match(/^\s*("[^"]+")\s*[—–-]+\s*(.+)$/s)
  if (m) return { quote: m[1], comment: m[2].trim() }
  return { quote: null, comment: text.trim() }
}

// Inline render: bold (**), and double-quoted text becomes a soft highlight.
// Single quotes are deliberately NOT matched — apostrophes in contractions
// ("I'd", "leader's") would otherwise be treated as quote delimiters.
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
          : quoteTone === 'indigo'
          ? { bg: '#E8E4FF', text: '#3D2A8C' }
          : { bg: 'transparent', text: 'inherit' }
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

// === Section renderers =========================================

function ScoreSection({ section }: { section: Section }) {
  // Parse score from heading like "Authenticity score: 75/100"
  const scoreMatch = section.heading.match(/(\d+)\s*\/\s*100/)
  const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null
  const verdict = section.body.trim()

  const palette = score === null
    ? { ring: '#A78BFA', bg: '#F4F1FF', label: 'Authenticity' }
    : score >= 80
    ? { ring: '#1F8A55', bg: '#DFF5E6', label: 'Reads as human' }
    : score >= 60
    ? { ring: '#7A6CFF', bg: '#E8E4FF', label: 'Mixed signals' }
    : score >= 40
    ? { ring: '#D97706', bg: '#FEF1D6', label: 'Leans AI-polished' }
    : { ring: '#C73E5A', bg: '#FFE4E0', label: 'Reads as AI' }

  return (
    <>
      {/* Section annotation — same pattern as the SectionShell-wrapped
          sections below. Recruiter-context explainer of what the score
          actually means. Below 60 is the threshold where a real
          recruiter starts asking probing questions in screen calls. */}
      <div
        style={{
          marginBottom: '16px',
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#5A5A6E',
          fontStyle: 'italic',
        }}
      >
        How a recruiter scores your resume before the first read — pattern-matching
        against the AI-generated resumes they reject every day. Above 80 reads as
        a real person; below 60 triggers the probing questions in the screen call.
      </div>
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          padding: '24px 28px',
          background: palette.bg,
          borderRadius: '12px',
          marginBottom: '32px',
          border: `1px solid ${palette.ring}33`,
        }}
      >
      {score !== null && (
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: '#ffffff',
            border: `4px solid ${palette.ring}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '34px', fontWeight: 900, color: '#1A1A22', lineHeight: 1 }}>{score}</div>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: palette.ring,
            marginBottom: '6px',
          }}
        >
          {palette.label}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 500, color: '#1A1A22', lineHeight: 1.5 }}>
          {renderInline(verdict, 'score-verdict', 'none')}
        </div>
      </div>
    </div>
    </>
  )
}

function SignalsSection({
  section,
  tone,
  title,
  eyebrow,
  description,
}: {
  section: Section
  tone: 'red' | 'green'
  title: string
  eyebrow: string
  description?: string
}) {
  // Split body into items: each item is one paragraph (separated by blank lines)
  const items = section.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const accent = tone === 'red' ? '#C73E5A' : '#1F8A55'

  return (
    <SectionShell title={title} accentColor={accent} eyebrow={eyebrow} description={description}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((item, i) => {
          const { quote, comment } = splitQuoteAndComment(item)
          return (
            <div
              key={`sig-${i}`}
              style={{
                padding: '16px 18px',
                background: '#FAFAFB',
                borderLeft: `3px solid ${accent}`,
                borderRadius: '6px',
              }}
            >
              {quote && (
                <div style={{ marginBottom: '10px' }}>
                  {renderInline(quote, `sig-q-${i}`, tone)}
                </div>
              )}
              <div style={{ fontSize: '15px', color: '#3A3A4A', lineHeight: 1.6 }}>
                {renderInline(comment, `sig-c-${i}`, tone)}
              </div>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

function PhraseLandsOnSection({ section }: { section: Section }) {
  const { quote, comment } = splitQuoteAndComment(section.body.trim())
  return (
    <SectionShell
      title="The phrase a recruiter will land on"
      accentColor="#7A6CFF"
      eyebrow="The line"
      description="If a recruiter has six seconds, this is the line their eye stops on. It's the strongest single signal that AI was involved."
    >
      <div
        style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #F4F1FF 0%, #FFF4F1 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(122,108,255,0.18)',
        }}
      >
        {quote && (
          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              fontStyle: 'italic',
              color: '#3D2A8C',
              marginBottom: '12px',
              lineHeight: 1.4,
            }}
          >
            {quote}
          </div>
        )}
        <div style={{ fontSize: '15px', color: '#3A3A4A', lineHeight: 1.6 }}>
          {renderInline(comment, 'lands', 'none')}
        </div>
      </div>
    </SectionShell>
  )
}

// Normalize various dash characters and bullet glyphs to a plain hyphen,
// so the parser can use a single regex regardless of what the model emitted.
function normalizeDashes(s: string): string {
  return s
    .replace(/[—–]/g, '-') // em-dash, en-dash → hyphen
    .replace(/•/g, '-') // bullet glyph → hyphen
}

// Aggressively split a chunk of text into individual metrics:
// handles "- foo", "- foo - bar", "foo - bar", "* foo * bar", and
// already-split single items.
function splitMetricsAggressively(input: string): string[] {
  const text = normalizeDashes(input).trim()
  if (!text) return []

  // Split on whitespace-bounded bullet markers: " - " or " * ".
  // Then strip any remaining leading marker from each piece.
  const pieces = text
    .split(/\s+[-*]\s+/)
    .map((p) => p.trim().replace(/^[-*]\s*/, '').trim())
    .filter(Boolean)

  // If splitting produced nothing splittable AND the input had a leading
  // "- ", just return the cleaned single item.
  if (pieces.length === 0 && text) {
    return [text.replace(/^[-*]\s*/, '').trim()].filter(Boolean)
  }
  return pieces
}

function MissingMetricsSection({ section }: { section: Section }) {
  // Each role is a sub-heading **Title at Company:** followed by metric items.
  // The model is asked to emit newline-separated bullets, but we tolerate
  // any format the model actually returns (inline, em-dashed, mixed, etc.).
  const blocks: Array<{ role: string; metrics: string[] }> = []
  let current: { role: string; metrics: string[] } | null = null

  for (const raw of section.body.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const subMatch = line.match(/^\*\*(.+?):?\*\*\s*$/)
    if (subMatch) {
      if (current) blocks.push(current)
      current = { role: subMatch[1].replace(/:$/, '').trim(), metrics: [] }
      continue
    }
    if (!current) continue
    splitMetricsAggressively(line).forEach((m) => current!.metrics.push(m))
  }
  if (current) blocks.push(current)

  // Defensive final pass: if any single metric ended up with internal
  // separators that the per-line split missed (rare, but safe), split it.
  for (const block of blocks) {
    const expanded: string[] = []
    for (const m of block.metrics) {
      const further = splitMetricsAggressively(m)
      if (further.length > 1) {
        expanded.push(...further)
      } else {
        expanded.push(m)
      }
    }
    block.metrics = expanded
  }

  return (
    <SectionShell
      title="What's missing for the two most recent roles"
      accentColor="#7A6CFF"
      eyebrow="What's missing"
      description="Beyond word choice, the structural tell of an AI resume is the absence of role-specific metrics that any real candidate would know. Here's what's absent for each of your last two roles."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {blocks.map((b, i) => (
          <div
            key={`role-${i}`}
            style={{
              padding: '20px 22px',
              background: '#FAFAFB',
              borderRadius: '10px',
              border: '1px solid #ECECF2',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#7A6CFF',
                marginBottom: '4px',
              }}
            >
              Role {i + 1}
            </div>
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#1A1A22',
                marginBottom: '14px',
                fontFamily: 'Figtree, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              {b.role}
            </div>
            {b.metrics.length > 0 ? (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {b.metrics.map((m, j) => (
                  <li
                    key={`m-${i}-${j}`}
                    style={{
                      position: 'relative',
                      fontSize: '15px',
                      color: '#3A3A4A',
                      lineHeight: 1.6,
                      paddingLeft: '22px',
                      marginBottom: '10px',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '4px',
                        top: '9px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#7A6CFF',
                      }}
                    />
                    {renderInline(m, `m-${i}-${j}`, 'none')}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ fontSize: '14px', color: '#9494A5', fontStyle: 'italic' }}>
                No metrics in this role yet — start here.
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function ProbesSection({ section }: { section: Section }) {
  // Items are numbered lines or paragraphs
  const rawItems = section.body
    .split(/\n\s*\n|\n(?=\d+\.)/)
    .map((p) => p.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean)

  return (
    <SectionShell
      title="If you make it to interview, here's what they'll probe"
      accentColor="#7A6CFF"
      eyebrow="Cross-examination"
      description="When a resume looks AI-polished but still gets through, recruiters use specific probing questions to see if the claims hold up. These are the ones they'd ask about your resume."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {rawItems.map((item, i) => (
          <div
            key={`probe-${i}`}
            style={{
              display: 'flex',
              gap: '12px',
              padding: '14px 16px',
              background: '#FAFAFB',
              borderRadius: '8px',
              border: '1px solid #ECECF2',
            }}
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#7A6CFF',
                flexShrink: 0,
                lineHeight: '24px',
              }}
            >
              Q{i + 1}
            </div>
            <div style={{ fontSize: '15px', color: '#1A1A22', lineHeight: 1.6 }}>
              {renderInline(item, `probe-${i}`, 'indigo')}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function MyReadSection({ section }: { section: Section }) {
  return (
    <SectionShell
      title="The call I'd make"
      accentColor="#7A6CFF"
      eyebrow="The call"
      description="Putting all the signals together — would I keep reading this resume, or set it aside? Here's the honest answer."
    >
      <div
        style={{
          padding: '18px 22px',
          background: 'linear-gradient(135deg, #F4F1FF 0%, #FAF6FF 100%)',
          borderLeft: '3px solid #7A6CFF',
          borderRadius: '6px',
          fontSize: '16px',
          fontStyle: 'italic',
          color: '#1A1A22',
          lineHeight: 1.65,
        }}
      >
        {renderInline(section.body.trim(), 'myread', 'indigo')}
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
  // Split on **Move N:** headers
  const moves: MoveBlock[] = []
  const sections = body.split(/\n(?=\s*\*\*Move\s*\d)/i)
  for (const raw of sections) {
    const text = raw.trim()
    if (!text) continue

    const headerMatch = text.match(/^\s*\*\*Move\s*(\d+):\s*(Rewrite|Add)\*\*/i)
    if (!headerMatch) {
      // Fallback for unstructured items — keep raw text
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

    // Extract labeled fields. Tolerate double or single colons, tolerate quotes.
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

    // If we got nothing structured, fall back to raw
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

  // Rewrite move
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

function NextMovesSection({ section }: { section: Section }) {
  const moves = parseMoveBlocks(section.body)

  return (
    <SectionShell
      title="Three rewrites to remove the AI tells"
      accentColor="#FF4F6A"
      eyebrow="What to fix"
      description="Specific edits — not advice. Each one targets a line we already flagged. Use the rewrites verbatim, or adapt them in your own voice."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
  description?: string
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

function UnknownSection({ section }: { section: Section }) {
  return (
    <SectionShell title={section.heading} accentColor="#7A6CFF" eyebrow="Note">
      <div style={{ fontSize: '15px', color: '#3A3A4A', lineHeight: 1.6 }}>
        {renderInline(section.body.trim(), `unk-${section.heading}`, 'indigo')}
      </div>
    </SectionShell>
  )
}

// === Main component =============================================

export function ResumeReport({ result }: ResumeReportProps) {
  const sections = parseSections(result)
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

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
            Recruiter Insight
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A22', letterSpacing: '-0.02em' }}>
            Resume audit
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#6B6B7B', textAlign: 'right' }}>
          Read on {today}
          <div style={{ fontSize: '10px', color: '#9494A5', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            hiring.productions
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((s, i) => {
        const key = `s-${i}`
        switch (s.kind) {
          case 'score':
            return <ScoreSection key={key} section={s} />
          case 'aiFlags':
            return (
              <SignalsSection
                key={key}
                section={s}
                tone="red"
                title="What reads as AI"
                eyebrow="Red flags"
                description="These are the specific lines a recruiter's eye snags on as suspicious — not vibes, actual phrases that pattern-match to AI output."
              />
            )
          case 'humanStrengths':
            return (
              <SignalsSection
                key={key}
                section={s}
                tone="green"
                title="What reads as human"
                eyebrow="What's working"
                description="These are the lines that prove a person wrote this. They're what saves the resume even when other parts look AI-polished — protect them."
              />
            )
          case 'phraseLandsOn':
            return <PhraseLandsOnSection key={key} section={s} />
          case 'missingMetrics':
            return <MissingMetricsSection key={key} section={s} />
          case 'probes':
            return <ProbesSection key={key} section={s} />
          case 'myRead':
            return <MyReadSection key={key} section={s} />
          case 'nextMoves':
            return <NextMovesSection key={key} section={s} />
          default:
            return <UnknownSection key={key} section={s} />
        }
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
        End of report · Stephanie Murray, hiring.productions
      </div>
    </div>
  )
}
