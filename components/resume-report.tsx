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
    // Match **Heading:**  (with optional trailing colon inside or outside the asterisks)
    const m = line.match(/^\s*\*\*(.+?):?\*\*\s*$/)
    if (m) {
      if (current) sections.push(current)
      const heading = m[1].replace(/:$/, '').trim()
      current = { kind: classifyHeading(heading), heading, body: '' }
    } else if (current) {
      current.body += (current.body ? '\n' : '') + line
    }
  }
  if (current) sections.push(current)
  return sections
}

// Splits a paragraph into [quote, commentary] when the quote is followed
// by an em-dash separator (the model uses "...quote..." — commentary).
function splitQuoteAndComment(text: string): { quote: string | null; comment: string } {
  const m = text.match(/^\s*([""][^""]+[""]|"[^"]+"|'[^']+')\s*[—–-]+\s*(.+)$/s)
  if (m) return { quote: m[1], comment: m[2].trim() }
  return { quote: null, comment: text.trim() }
}

// Inline render: bold (**), and quoted text becomes a soft highlight.
function renderInline(text: string, key: string, quoteTone: 'red' | 'green' | 'indigo' | 'none' = 'indigo'): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|"[^"]+"|'[^']+')/g)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${key}-${i}`} style={{ fontWeight: 700, color: '#1A1A22' }}>
          {part.replace(/\*\*/g, '')}
        </strong>
      )
    }
    if (/^["'].+["']$/.test(part)) {
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
  )
}

function SignalsSection({
  section,
  tone,
  title,
  iconLabel,
}: {
  section: Section
  tone: 'red' | 'green'
  title: string
  iconLabel: string
}) {
  // Split body into items: each item is one paragraph (separated by blank lines)
  const items = section.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  const accent = tone === 'red' ? '#C73E5A' : '#1F8A55'

  return (
    <SectionShell title={title} accentColor={accent} iconLabel={iconLabel}>
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
    <SectionShell title="The phrase a recruiter will land on" accentColor="#7A6CFF" iconLabel="—">
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

function MissingMetricsSection({ section }: { section: Section }) {
  // Each role is a sub-heading **Title at Company:** followed by bullet items.
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
    const bullet = line.match(/^[-*]\s+(.*)$/)
    if (bullet && current) {
      current.metrics.push(bullet[1])
    } else if (current) {
      // catch-all — append to last metric or treat as commentary
      if (current.metrics.length > 0) {
        current.metrics[current.metrics.length - 1] += ' ' + line
      } else {
        current.metrics.push(line)
      }
    }
  }
  if (current) blocks.push(current)

  return (
    <SectionShell title="What's missing for the two most recent roles" accentColor="#7A6CFF" iconLabel="+">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {blocks.map((b, i) => (
          <div
            key={`role-${i}`}
            style={{
              padding: '18px 20px',
              background: '#FAFAFB',
              borderRadius: '8px',
              border: '1px solid #ECECF2',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#1A1A22',
                marginBottom: '12px',
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              {b.role}
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
              {b.metrics.map((m, j) => (
                <li
                  key={`m-${i}-${j}`}
                  style={{
                    position: 'relative',
                    fontSize: '15px',
                    color: '#3A3A4A',
                    lineHeight: 1.7,
                    paddingLeft: '8px',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '-16px',
                      color: '#7A6CFF',
                      fontWeight: 700,
                    }}
                  >
                    +
                  </span>
                  {renderInline(m, `m-${i}-${j}`, 'none')}
                </li>
              ))}
            </ul>
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
    <SectionShell title="What a recruiter will probe in the interview" accentColor="#7A6CFF" iconLabel="?">
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
    <SectionShell title="My read" accentColor="#7A6CFF" iconLabel="*">
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

function NextMovesSection({ section }: { section: Section }) {
  // Items are numbered. Each item may contain "Quote" → "Rewrite" pairs.
  // We split on lines starting with "1." "2." "3." or `^\d+\.`
  const items: string[] = []
  let buf = ''
  for (const raw of section.body.split('\n')) {
    if (/^\s*\d+\./.test(raw)) {
      if (buf.trim()) items.push(buf.trim())
      buf = raw.replace(/^\s*\d+\.\s*/, '')
    } else {
      buf += '\n' + raw
    }
  }
  if (buf.trim()) items.push(buf.trim())

  return (
    <SectionShell title="Your next three moves" accentColor="#FF4F6A" iconLabel="→">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {items.map((item, i) => {
          // Try to detect quote → quote pattern (current → rewrite)
          const quotes = item.match(/(["'][^"']+["'])/g) || []

          if (quotes.length >= 2) {
            // Before/after style
            const beforeIdx = item.indexOf(quotes[0])
            const afterIdx = item.indexOf(quotes[1], beforeIdx + 1)
            const lead = item.slice(0, beforeIdx).replace(/[—–-]+$/, '').trim()
            const between = item.slice(beforeIdx + quotes[0].length, afterIdx).trim()
            const trail = item.slice(afterIdx + quotes[1].length).trim()

            return (
              <div key={`mv-${i}`} style={{ display: 'flex', gap: '14px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#FF4F6A',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  {lead && (
                    <div style={{ fontSize: '14px', color: '#3A3A4A', marginBottom: '10px', fontWeight: 500 }}>
                      {lead}
                    </div>
                  )}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '8px',
                      marginBottom: trail ? '10px' : 0,
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 14px',
                        background: '#FFE4E0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#7A1F2E',
                        fontStyle: 'italic',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#C73E5A',
                          marginBottom: '4px',
                        }}
                      >
                        Current
                      </div>
                      {quotes[0]}
                    </div>
                    <div
                      style={{
                        padding: '12px 14px',
                        background: '#DFF5E6',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#1F5436',
                        fontStyle: 'italic',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#1F8A55',
                          marginBottom: '4px',
                        }}
                      >
                        Rewrite
                      </div>
                      {quotes[1]}
                    </div>
                  </div>
                  {between && (
                    <div style={{ fontSize: '13px', color: '#6B6B7B', marginTop: '6px' }}>{between}</div>
                  )}
                  {trail && (
                    <div style={{ fontSize: '13px', color: '#6B6B7B', marginTop: '6px' }}>{trail}</div>
                  )}
                </div>
              </div>
            )
          }

          // Single-quote / no-quote item — render as a numbered paragraph
          return (
            <div key={`mv-${i}`} style={{ display: 'flex', gap: '14px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#FF4F6A',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: '15px',
                  color: '#1A1A22',
                  lineHeight: 1.65,
                }}
              >
                {renderInline(item, `mv-${i}`, 'green')}
              </div>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}

function SectionShell({
  title,
  accentColor,
  iconLabel,
  children,
}: {
  title: string
  accentColor: string
  iconLabel: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          paddingBottom: '8px',
          borderBottom: '1px solid #ECECF2',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: accentColor,
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {iconLabel}
        </div>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: '#1A1A22',
            fontFamily: 'Figtree, sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
      </div>
      {children}
    </div>
  )
}

function UnknownSection({ section }: { section: Section }) {
  return (
    <SectionShell title={section.heading} accentColor="#7A6CFF" iconLabel="·">
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
            Inside Look
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
                iconLabel="!"
              />
            )
          case 'humanStrengths':
            return (
              <SignalsSection
                key={key}
                section={s}
                tone="green"
                title="What reads as human"
                iconLabel="+"
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
