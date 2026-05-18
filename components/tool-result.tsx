'use client'

import { Lock } from 'lucide-react'

interface ToolResultProps {
  result: string
  /**
   * In-card CTA. Pass `null` to suppress entirely — useful when a separate
   * upsell panel is rendered below the result.
   */
  cta?: {
    subtext: string
    label: string
    href: string
  } | null
}

const DEFAULT_CTA = {
  subtext: 'Want to turn insights into proof? Get real recommendations from people who actually worked with you.',
  label: 'Start your RepVera — free →',
  href: 'https://www.repvera.com',
}

// Match inline spans we treat specially.
//   **bold**          → bold weight
//   `code`            → monospace pill (boolean strings, technical terms)
//   "double quotes"   → lavender highlight pill (verbatim quoted phrases)
//   “curly doubles”   → same
//   ‘curly singles’   → same
//   [LOCKED:tag]      → gradient Pro-unlock pill (server-redacted content
//                       for non-Pro users on the wedge tool)
// Deliberately excludes straight single quotes (') because they appear inside
// contractions (you're, that's, can't) and would wrap whole sentences.
const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|"[^"]+"|“[^”]+”|‘[^’]+’|\[LOCKED:[a-z]+\])/g

const LOCKED_LABEL: Record<string, string> = {
  boolean: 'Unlock the boolean — Pro',
  rewrite: 'Unlock the exact rewrite — Pro',
  why: 'Unlock the ranking math — Pro',
  impact: 'Unlock the ranking math — Pro',
  lift: 'Unlock the lift — Pro',
}

function isQuoted(part: string) {
  if (!part) return false
  const first = part[0]
  const last = part[part.length - 1]
  return (
    (first === '"' && last === '"') ||
    (first === '“' && last === '”') ||
    (first === '‘' && last === '’')
  )
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(INLINE_PATTERN)
  return parts.map((part, i) => {
    if (!part) return part
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={`${keyPrefix}-${i}`} style={{ fontWeight: 600 }}>
          {part.replace(/\*\*/g, '')}
        </span>
      )
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      // Monospace pill for boolean strings, code-like terms, technical syntax.
      // wordBreak break-word so long boolean strings break gracefully on
      // mobile instead of overflowing the card.
      return (
        <code
          key={`${keyPrefix}-${i}`}
          style={{
            fontFamily:
              '"SF Mono", "Roboto Mono", "Menlo", "Consolas", ui-monospace, monospace',
            fontSize: '13.5px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            padding: '2px 7px',
            borderRadius: '5px',
            color: '#E8E6FF',
            wordBreak: 'break-word',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {part.replace(/`/g, '')}
        </code>
      )
    }
    if (isQuoted(part)) {
      return (
        <span
          key={`${keyPrefix}-${i}`}
          style={{
            background: 'rgba(108, 71, 255, 0.14)',
            color: '#E8E6FF',
            padding: '1px 6px',
            borderRadius: '4px',
            fontStyle: 'italic',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {part}
        </span>
      )
    }
    // Pro-locked content. Server replaces sensitive spans with
    // [LOCKED:tag] sentinels for non-Pro users on the wedge tool; we
    // render each as an inline gradient pill that links to pricing.
    const lockedMatch = part.match(/^\[LOCKED:([a-z]+)\]$/)
    if (lockedMatch) {
      const tag = lockedMatch[1]
      const label = LOCKED_LABEL[tag] ?? 'Unlock with Pro'
      return (
        <a
          key={`${keyPrefix}-${i}`}
          href="/pricing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 10px',
            background:
              'linear-gradient(135deg, rgba(108,71,255,0.18), rgba(255,79,106,0.18))',
            border: '1px solid rgba(167,139,250,0.5)',
            borderRadius: 6,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '12.5px',
            color: '#F2F0FF',
            textDecoration: 'none',
            letterSpacing: '0.01em',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          <Lock size={11} strokeWidth={2.5} aria-hidden />
          {label}
        </a>
      )
    }
    return part
  })
}

export function ToolResult({ result, cta = DEFAULT_CTA }: ToolResultProps) {
  return (
    <>
      {/* Results Card */}
      <div
        style={{
          background: '#1A1A22',
          border: '1px solid rgba(108,71,255,0.25)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 8px 40px rgba(108,71,255,0.08)',
        }}
      >
        {/* Parse and Render Markdown Result */}
        {result.split('\n').map((line, idx) => {
          // SECTION-EYEBROW pattern: line is exactly **text:**
          // — rendered as small uppercase lavender label with left bar.
          const isEyebrow = /^\*\*[^*]+:\*\*$/.test(line)

          if (isEyebrow) {
            const headerText = line.replace(/\*\*/g, '')

            // Special styling for specific metrics that show up as eyebrows
            // in some tools (resume-ai-check, scam-check, ats-reality).
            const isAtsScore = headerText.includes('ATS Score:')
            const isRedFlagCount = headerText.includes('Red flag count:')

            return (
              <div
                key={idx}
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: isAtsScore || isRedFlagCount ? '14px' : '11px',
                  color: isRedFlagCount ? '#FF4F6A' : isAtsScore ? '#6C47FF' : '#A78BFA',
                  textTransform: isAtsScore || isRedFlagCount ? 'none' : 'uppercase',
                  letterSpacing: isAtsScore || isRedFlagCount ? 'normal' : '0.08em',
                  marginTop: idx === 0 ? 0 : '32px',
                  marginBottom: '12px',
                  display: 'block',
                  paddingLeft: '12px',
                  borderLeft: '3px solid rgba(108,71,255,0.5)',
                }}
              >
                {headerText}
              </div>
            )
          }

          // SUB-SECTION HEADER pattern: line starts with **text** and either
          // ends there or is followed by an em-dash tail (e.g. "— improves
          // 4 of 5 searches"). Used for things like "Search 1: name", "Move
          // 1: label", "[Title at Company]:". Rendered prominently so a long
          // structured output is actually navigable.
          const subHeaderMatch = line.match(/^\*\*([^*]+)\*\*\s*(?:—\s*(.+))?$/)
          if (subHeaderMatch) {
            const heading = subHeaderMatch[1].trim()
            const tail = subHeaderMatch[2]?.trim()
            return (
              <div
                key={idx}
                style={{
                  marginTop: '32px',
                  marginBottom: '10px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(108,71,255,0.18)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '19px',
                    letterSpacing: '-0.005em',
                    color: '#F2F0FF',
                    lineHeight: 1.3,
                  }}
                >
                  {heading}
                </span>
                {tail && (
                  <span
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#A78BFA',
                      marginLeft: '10px',
                      letterSpacing: '0.005em',
                    }}
                  >
                    — {tail}
                  </span>
                )}
              </div>
            )
          }

          // Empty lines get extra margin
          if (line.trim() === '') {
            return <div key={idx} style={{ marginBottom: '12px' }} />
          }

          // Check if line starts with a number and period (numbered list)
          const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/)
          if (numberedMatch) {
            const number = numberedMatch[1]
            const content = numberedMatch[2]
            
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(108,71,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#6C47FF',
                  }}
                >
                  {number}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#F2F0FF',
                    lineHeight: 1.85,
                  }}
                >
                  {renderInline(content, `n-${idx}`)}
                </div>
              </div>
            )
          }

          // Bullet lines (e.g., "- foo" or "* foo")
          const bulletMatch = line.match(/^[-*]\s+(.*)$/)
          if (bulletMatch) {
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '14px',
                  paddingLeft: '4px',
                }}
              >
                <div
                  style={{
                    color: '#A78BFA',
                    fontWeight: 700,
                    flexShrink: 0,
                    lineHeight: 1.85,
                  }}
                >
                  •
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    color: '#F2F0FF',
                    lineHeight: 1.85,
                  }}
                >
                  {renderInline(bulletMatch[1], `b-${idx}`)}
                </div>
              </div>
            )
          }

          // Regular lines with possible quotes and bold text
          return (
            <div
              key={idx}
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                color: '#F2F0FF',
                lineHeight: 1.85,
                marginBottom: '8px',
              }}
            >
              {renderInline(line, `r-${idx}`)}
            </div>
          )
        })}
      </div>

      {/* CTA — overridable per tool. Pass cta={null} to hide entirely. */}
      {cta !== null && (
        <>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '28px 0' }} />

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '13px',
            color: '#8B8AA0',
            marginBottom: '8px',
          }}
        >
          {cta.subtext}
        </div>
        <a
          href={cta.href}
          target={cta.href.startsWith('http') ? '_blank' : undefined}
          rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
          }}
        >
          {cta.label}
        </a>
      </div>
        </>
      )}
    </>
  )
}
