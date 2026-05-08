'use client'

interface ToolResultProps {
  result: string
  cta?: {
    subtext: string
    label: string
    href: string
  }
}

const DEFAULT_CTA = {
  subtext: 'Want to turn insights into proof? Get real recommendations from people who actually worked with you.',
  label: 'Start your RepVera — free →',
  href: 'https://www.repvera.com',
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(["'][^"']*["']|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part && part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={`${keyPrefix}-${i}`} style={{ fontWeight: 600 }}>
          {part.replace(/\*\*/g, '')}
        </span>
      )
    }
    if (part && /(["'])(.+?)\1/.test(part)) {
      return (
        <span key={`${keyPrefix}-${i}`} style={{ fontStyle: 'italic', color: '#D8D7F2' }}>
          {part}
        </span>
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
          // Check if this is a section header (starts and ends with **)
          const isHeader = /^\*\*.*:\*\*$/.test(line)

          if (isHeader) {
            const headerText = line.replace(/\*\*/g, '')
            
            // Special styling for specific metrics
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
                  marginTop: idx === 0 ? 0 : '28px',
                  marginBottom: '10px',
                  display: 'block',
                  paddingLeft: isHeader ? '12px' : 0,
                  borderLeft: isHeader ? '3px solid rgba(108,71,255,0.5)' : 'none',
                }}
              >
                {headerText}
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
                  marginBottom: '8px',
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
                marginBottom: '4px',
              }}
            >
              {renderInline(line, `r-${idx}`)}
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '28px 0' }} />

      {/* CTA — overridable per tool, defaults to RepVera */}
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
  )
}
