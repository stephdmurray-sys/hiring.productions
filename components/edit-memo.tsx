'use client'

import { ReactNode, useState } from 'react'

interface EditMemoProps {
  memo: string
  onBack: () => void
}

type SectionKind =
  | 'header' // EDIT MEMO + meta lines
  | 'verdict'
  | 'rewrites'
  | 'addition'
  | 'metrics'
  | 'keywords'
  | 'strike'
  | 'closing'
  | 'unknown'

interface Section {
  kind: SectionKind
  heading: string
  body: string[]
}

// Detect a section header line by exact label match (the prompt is strict).
const HEADING_MAP: Array<{ label: RegExp; kind: SectionKind }> = [
  { label: /^EDIT\s*MEMO\s*$/i, kind: 'header' },
  { label: /^THE\s*VERDICT\s*$/i, kind: 'verdict' },
  { label: /^REWRITES\b/i, kind: 'rewrites' },
  { label: /^ADDITION\b/i, kind: 'addition' },
  { label: /^METRICS\s*TO\s*ADD/i, kind: 'metrics' },
  { label: /^KEYWORDS\s*TO\s*INCLUDE/i, kind: 'keywords' },
  { label: /^PHRASES\s*TO\s*STRIKE\s*$/i, kind: 'strike' },
  { label: /^WHEN\s*YOU['’]?RE\s*DONE\s*$/i, kind: 'closing' },
]

function classifyHeading(line: string): SectionKind | null {
  for (const rule of HEADING_MAP) {
    if (rule.label.test(line.trim())) return rule.kind
  }
  return null
}

function parseSections(memo: string): Section[] {
  const lines = memo.split('\n')
  const sections: Section[] = []
  let current: Section | null = null

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '')
    const kind = classifyHeading(line)
    if (kind) {
      if (current) sections.push(current)
      current = { kind, heading: line.trim(), body: [] }
      continue
    }
    if (current) current.body.push(line)
  }
  if (current) sections.push(current)
  return sections
}

// Inline render: highlight quoted strings and bold ** markdown if any slipped through.
function renderInline(text: string, key: string, highlightTone: 'red' | 'indigo' | 'none' = 'indigo'): ReactNode {
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
      if (highlightTone === 'none') {
        return (
          <em key={`${key}-${i}`} style={{ fontStyle: 'italic', color: '#3D2A8C' }}>
            {part}
          </em>
        )
      }
      const palette =
        highlightTone === 'red'
          ? { bg: '#FFE4E0', text: '#7A1F2E' }
          : { bg: '#E8E4FF', text: '#3D2A8C' }
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

function MetaHeader({ section }: { section: Section }) {
  // Body is something like:
  //   For: Sarah Chen
  //   Job target: Senior PM at Brex
  const meta: Record<string, string> = {}
  for (const line of section.body) {
    const m = line.match(/^([A-Z][A-Za-z\s]+):\s*(.+)$/)
    if (m) meta[m[1].trim()] = m[2].trim()
  }
  return (
    <div
      style={{
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '2px solid #1A1A22',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          color: '#FF4F6A',
          marginBottom: '4px',
        }}
      >
        Edit memo
      </div>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 900,
          color: '#1A1A22',
          letterSpacing: '-0.02em',
          marginBottom: '14px',
        }}
      >
        The recruiter&apos;s notes for you
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '13px', color: '#5A5A6E' }}>
        {Object.entries(meta).map(([k, v]) => (
          <div key={k}>
            <span
              style={{
                fontWeight: 700,
                color: '#1A1A22',
                textTransform: 'uppercase',
                fontSize: '10px',
                letterSpacing: '0.08em',
                marginRight: '8px',
              }}
            >
              {k}
            </span>
            {v}
          </div>
        ))}
      </div>
    </div>
  )
}

function VerdictSection({ section }: { section: Section }) {
  // Body: first non-empty line is the verdict word(s), rest is the one-sentence reason
  const cleaned = section.body.map((l) => l.trim()).filter(Boolean)
  const verdictLine = cleaned[0] || ''
  const reason = cleaned.slice(1).join(' ')

  const upper = verdictLine.toUpperCase()
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
      : { bg: '#E8E4FF', ring: '#7A6CFF', label: verdictLine || 'READ' }

  return (
    <SectionShell title="The verdict" eyebrow="Where you stand" accentColor={palette.ring}>
      <div
        style={{
          padding: '20px 24px',
          background: palette.bg,
          borderRadius: '10px',
          border: `1px solid ${palette.ring}33`,
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 900,
            color: '#1A1A22',
            letterSpacing: '-0.02em',
            marginBottom: reason ? '8px' : 0,
            lineHeight: 1.1,
            fontFamily: 'Figtree, sans-serif',
          }}
        >
          {palette.label}
        </div>
        {reason && (
          <div style={{ fontSize: '15px', color: '#1A1A22', lineHeight: 1.55 }}>
            {renderInline(reason, 'verdict', 'none')}
          </div>
        )}
      </div>
    </SectionShell>
  )
}

interface RewriteItem {
  num: string
  context: string
  currentLine: string
  direction: string
  why: string
}

function parseRewriteOrAdditionItems(body: string[], kind: 'rewrite' | 'addition'): RewriteItem[] {
  const text = body.join('\n')
  // Items start with "1." or "2." or "3."
  const splits = text.split(/\n(?=\s*\d+\.)/g)
  const items: RewriteItem[] = []
  for (const chunk of splits) {
    const trimmed = chunk.trim()
    if (!trimmed) continue
    const numMatch = trimmed.match(/^\s*(\d+)\./)
    if (!numMatch) continue
    const num = numMatch[1]

    // Context is the first line after the number, ending with ":"
    // e.g. "In your Senior Product Manager role, the line:" or "To your DoorDash role:"
    const lines = trimmed.replace(/^\s*\d+\.\s*/, '').split('\n')
    const contextLine = lines[0]?.trim() || ''
    const rest = lines.slice(1).join('\n')

    // currentLine: the next quoted line (only for rewrites)
    let currentLine = ''
    if (kind === 'rewrite') {
      const cm = rest.match(/^\s*"([^"]+)"\s*$/m)
      if (cm) currentLine = cm[1]
    }

    // Direction / Topic / Shape it: ...
    const directionLabel = kind === 'addition' ? 'Topic|Shape it|Direction' : 'Direction'
    const directionRe = new RegExp(`(?:${directionLabel})\\s*:\\s*([\\s\\S]+?)(?=\\n\\s*(?:Why|Topic|Shape it):|\\n\\s*$|$)`, 'i')

    let direction = ''
    if (kind === 'addition') {
      // For additions we want both Topic AND Shape (or 'Shape it').
      const topicM = rest.match(/Topic\s*:\s*([\s\S]+?)(?=\n\s*(?:Shape|Why)\s*:|$)/i)
      // Accept both 'Shape:' and 'Shape it:' for backward compat.
      const shapeM = rest.match(/(?:Shape\s*it|Shape)\s*:\s*([\s\S]+?)(?=\n\s*Why\s*:|$)/i)
      const parts: string[] = []
      if (topicM) parts.push(`Topic: ${topicM[1].trim()}`)
      if (shapeM) parts.push(`Shape it: ${shapeM[1].trim()}`)
      direction = parts.join('\n')
    } else {
      const dm = rest.match(directionRe)
      if (dm) direction = dm[1].trim()
    }

    // Why
    const whyM = rest.match(/Why\s*:\s*([\s\S]+?)(?=$)/i)
    const why = whyM ? whyM[1].trim() : ''

    items.push({ num, context: contextLine, currentLine, direction, why })
  }
  return items
}

function RewritesSection({ section, kind }: { section: Section; kind: 'rewrite' | 'addition' }) {
  const items = parseRewriteOrAdditionItems(section.body, kind)
  const isAddition = kind === 'addition'
  const accent = isAddition ? '#7A6CFF' : '#FF4F6A'
  const eyebrow = isAddition ? 'Add a new bullet' : 'Two lines to rewrite — in your voice'
  const title = isAddition ? 'One new bullet to write' : 'Two lines to rewrite'

  return (
    <SectionShell title={title} eyebrow={eyebrow} accentColor={accent}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {items.map((item) => (
          <div
            key={item.num}
            style={{
              display: 'flex',
              gap: '16px',
              padding: '20px 22px',
              background: '#FAFAFB',
              borderRadius: '10px',
              border: '1px solid #ECECF2',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: accent,
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {item.num}
            </div>
            <div style={{ flex: 1 }}>
              {item.context && (
                <div style={{ fontSize: '14px', color: '#1A1A22', fontWeight: 600, marginBottom: '10px' }}>
                  {item.context}
                </div>
              )}
              {item.currentLine && (
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#FFE4E0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#7A1F2E',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#C73E5A',
                      marginBottom: '4px',
                    }}
                  >
                    Current
                  </div>
                  &ldquo;{item.currentLine}&rdquo;
                </div>
              )}
              {item.direction && (
                <div
                  style={{
                    padding: '12px 14px',
                    background: '#E8E4FF',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#2A1B6B',
                    lineHeight: 1.55,
                    marginBottom: item.why ? '10px' : 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#7A6CFF',
                      marginBottom: '4px',
                    }}
                  >
                    {isAddition ? 'How to shape it' : 'Direction'}
                  </div>
                  {renderInline(item.direction, `dir-${item.num}`, 'none')}
                </div>
              )}
              {item.why && (
                <div
                  style={{
                    fontSize: '13px',
                    color: '#5A5A6E',
                    fontStyle: 'italic',
                    paddingLeft: '12px',
                    borderLeft: '2px solid #ECECF2',
                  }}
                >
                  Why: {item.why}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function MetricsSection({ section }: { section: Section }) {
  // Body has "For your [role]:" sub-headers followed by "- metric" lines
  const blocks: Array<{ role: string; metrics: string[] }> = []
  let current: { role: string; metrics: string[] } | null = null
  for (const raw of section.body) {
    const line = raw.trim()
    if (!line) continue
    const subMatch = line.match(/^For your (.+?):\s*$/i)
    if (subMatch) {
      if (current) blocks.push(current)
      current = { role: subMatch[1].trim(), metrics: [] }
      continue
    }
    const bullet = line.match(/^[-*]\s+(.+)$/)
    if (bullet && current) {
      current.metrics.push(bullet[1])
    }
  }
  if (current) blocks.push(current)

  return (
    <SectionShell
      title="Metrics to add per role"
      eyebrow="The numbers that should be there"
      accentColor="#7A6CFF"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                fontSize: '15px',
                fontWeight: 700,
                color: '#1A1A22',
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}
            >
              {b.role}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {b.metrics.map((m, j) => (
                <li
                  key={`m-${i}-${j}`}
                  style={{
                    position: 'relative',
                    fontSize: '14.5px',
                    color: '#3A3A4A',
                    lineHeight: 1.6,
                    paddingLeft: '22px',
                    marginBottom: '8px',
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
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function KeywordsSection({ section }: { section: Section }) {
  const lines = section.body.map((l) => l.trim()).filter(Boolean)
  const noJd = lines.some((l) => /no target job description/i.test(l))

  if (noJd) {
    return (
      <SectionShell
        title="Keywords from the job description"
        eyebrow="What this JD is asking for"
        accentColor="#7A6CFF"
      >
        <div
          style={{
            padding: '16px 20px',
            background: '#FAFAFB',
            borderRadius: '10px',
            border: '1px dashed #C8C6E0',
            fontSize: '14px',
            color: '#5A5A6E',
            fontStyle: 'italic',
          }}
        >
          No target job description given. Paste a JD next time for keyword guidance.
        </div>
      </SectionShell>
    )
  }

  const keywords = lines
    .map((l) => l.match(/^[-*]\s*"?([^"]+?)"?\s*$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => m[1].trim())
    .filter(Boolean)

  return (
    <SectionShell
      title="Keywords from the job description"
      eyebrow="What this JD is asking for"
      accentColor="#7A6CFF"
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '4px 0',
        }}
      >
        {keywords.map((kw, i) => (
          <span
            key={i}
            style={{
              padding: '8px 14px',
              background: '#E8E4FF',
              color: '#3D2A8C',
              fontWeight: 600,
              fontSize: '13.5px',
              borderRadius: '20px',
              border: '1px solid rgba(108,71,255,0.2)',
              fontFamily: 'Figtree, sans-serif',
            }}
          >
            {kw}
          </span>
        ))}
      </div>
    </SectionShell>
  )
}

function StrikeSection({ section }: { section: Section }) {
  const phrases = section.body
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.match(/^[-*]\s*"?([^"]+?)"?\s*$/))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .map((m) => m[1].trim())

  return (
    <SectionShell
      title="Phrases to strike"
      eyebrow="Cut these from your resume"
      accentColor="#FF4F6A"
    >
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {phrases.map((p, i) => (
          <li
            key={i}
            style={{
              padding: '12px 16px',
              background: '#FFE4E0',
              border: '1px solid rgba(199,62,90,0.25)',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#7A1F2E',
              fontStyle: 'italic',
              fontFamily: 'Figtree, sans-serif',
              textDecoration: 'line-through',
              textDecorationColor: 'rgba(199,62,90,0.55)',
            }}
          >
            &ldquo;{p}&rdquo;
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

function ClosingSection({ section }: { section: Section }) {
  const text = section.body.map((l) => l.trim()).filter(Boolean).join(' ')
  return (
    <SectionShell
      title="When you're done"
      eyebrow="Close the loop"
      accentColor="#7A6CFF"
    >
      <div
        style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #F4F1FF 0%, #FFF4F1 100%)',
          borderRadius: '10px',
          border: '1px solid rgba(122,108,255,0.2)',
          fontSize: '15px',
          color: '#1A1A22',
          lineHeight: 1.6,
        }}
      >
        {renderInline(text, 'closing', 'none')}
      </div>
    </SectionShell>
  )
}

// === Section shell ==============================================

function SectionShell({
  title,
  accentColor,
  eyebrow,
  children,
}: {
  title: string
  accentColor: string
  eyebrow: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ marginBottom: '18px' }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: accentColor,
            marginBottom: '6px',
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontSize: '20px',
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
      </div>
      {children}
    </div>
  )
}

// === Main component =============================================

export function EditMemo({ memo, onBack }: EditMemoProps) {
  const [copied, setCopied] = useState(false)
  const sections = parseSections(memo)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memo)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // older browsers / permissions — silent
    }
  }

  const handleDownload = () => {
    const today = new Date().toISOString().slice(0, 10)
    const blob = new Blob([memo], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `edit-memo-${today}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Back link — sits in dark page space above the document */}
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#A78BFA',
          fontFamily: 'Figtree, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '8px 0',
          marginBottom: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        ← Back to the recruiter&apos;s read
      </button>

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
        {sections.map((section, i) => {
          const key = `s-${i}`
          switch (section.kind) {
            case 'header':
              return <MetaHeader key={key} section={section} />
            case 'verdict':
              return <VerdictSection key={key} section={section} />
            case 'rewrites':
              return <RewritesSection key={key} section={section} kind="rewrite" />
            case 'addition':
              return <RewritesSection key={key} section={section} kind="addition" />
            case 'metrics':
              return <MetricsSection key={key} section={section} />
            case 'keywords':
              return <KeywordsSection key={key} section={section} />
            case 'strike':
              return <StrikeSection key={key} section={section} />
            case 'closing':
              return <ClosingSection key={key} section={section} />
            default:
              return null
          }
        })}

        {/* Action buttons */}
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            paddingTop: '20px',
            borderTop: '1px solid #ECECF2',
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              flex: 1,
              minWidth: '180px',
              padding: '14px 20px',
              background: copied ? '#1F8A55' : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '14px',
              fontFamily: 'Figtree, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {copied ? 'Copied to clipboard' : 'Copy the whole memo'}
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: '14px 20px',
              background: '#ffffff',
              color: '#1A1A22',
              border: '1.5px solid #1A1A22',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'Figtree, sans-serif',
              cursor: 'pointer',
            }}
          >
            Download as .txt
          </button>
        </div>

        {/* Document footer */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid #ECECF2',
            fontSize: '11px',
            color: '#9494A5',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            textAlign: 'center',
          }}
        >
          End of memo · Stephanie Murray, hiring.productions
        </div>
      </div>
    </div>
  )
}
