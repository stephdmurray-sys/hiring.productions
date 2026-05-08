'use client'

import { useState } from 'react'

interface RewrittenResumeProps {
  resume: string
  /** The recruiter's analysis (the markdown report). We use it to extract the
   * exact rewrite and add-this values so we can highlight those lines in
   * purple in the rendered resume. */
  analysis?: string
  onBack: () => void
}

interface ChangeMarkers {
  rewrites: string[]
  additions: string[]
}

function extractChangeMarkers(analysis: string | undefined): ChangeMarkers {
  if (!analysis) return { rewrites: [], additions: [] }
  const rewrites: string[] = []
  const additions: string[] = []
  // Split on Move N: headers and walk each block
  const blocks = analysis.split(/\n\s*\*\*Move\s*\d+:/i).slice(1)
  for (const block of blocks) {
    const isAdd = /^\s*Add\b/i.test(block)
    if (isAdd) {
      const m = block.match(/Add this\s*:\s*"([^"]+)"/i)
      if (m && m[1].trim().length > 0) additions.push(m[1].trim())
    } else {
      const m = block.match(/Rewrite\s*:\s*"([^"]+)"/i)
      if (m && m[1].trim().length > 0) rewrites.push(m[1].trim())
    }
  }
  return { rewrites, additions }
}

function classifyLine(
  line: string,
  markers: ChangeMarkers,
): 'rewrite' | 'add' | null {
  const cleaned = line.trim().replace(/^[-*]\s+/, '').trim()
  if (cleaned.length < 8) return null

  // Use a fuzzy substring match in both directions to tolerate minor
  // wording drift between the analysis quote and what the model produced.
  for (const r of markers.rewrites) {
    if (cleaned === r || cleaned.includes(r) || r.includes(cleaned)) return 'rewrite'
  }
  for (const a of markers.additions) {
    if (cleaned === a || cleaned.includes(a) || a.includes(cleaned)) return 'add'
  }
  return null
}

export function RewrittenResume({ resume, analysis, onBack }: RewrittenResumeProps) {
  const [copied, setCopied] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resume)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // ignore — older browsers / permissions
    }
  }

  const handleDownload = () => {
    const blob = new Blob([resume], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `resume-rewritten-${today.replace(/[, ]+/g, '-').toLowerCase()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Render resume preserving line breaks. Detect SECTION HEADERS (lines that
  // are short, all caps, or followed by content) and style them. Bullets get
  // a clean prefix.
  const lines = resume.split('\n')
  const markers = extractChangeMarkers(analysis)
  const hasMarkers = markers.rewrites.length + markers.additions.length > 0

  return (
    <div>
      {/* Back link — sits above the document, in dark page space */}
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
                color: '#FF4F6A',
                marginBottom: '4px',
              }}
            >
              Updated draft
            </div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A22', letterSpacing: '-0.02em' }}>
              Your resume, rewritten
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#6B6B7B', textAlign: 'right' }}>
            Updated {today}
            <div
              style={{
                fontSize: '10px',
                color: '#9494A5',
                marginTop: '2px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              hiring.productions
            </div>
          </div>
        </div>

        {/* Intro line */}
        <p
          style={{
            fontSize: '14px',
            color: '#5A5A6E',
            fontStyle: 'italic',
            lineHeight: 1.55,
            margin: '0 0 16px 0',
          }}
        >
          The recruiter&apos;s three moves applied to your resume — every other line preserved exactly as you had it. Copy it, paste it, ship it.
        </p>

        {/* Legend — visible when we have markers */}
        {hasMarkers && (
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              padding: '12px 16px',
              background: '#FAF6FF',
              border: '1px solid rgba(108,71,255,0.15)',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '12px',
              color: '#3D2A8C',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '14px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(108,71,255,0.35)',
                }}
              />
              Rewritten lines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '14px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'rgba(108,71,255,0.7)',
                }}
              />
              New lines added
            </div>
            <div style={{ color: '#7B6BB0', fontStyle: 'italic' }}>
              Everything not highlighted is exactly as you wrote it.
            </div>
          </div>
        )}

        {/* Resume content */}
        <div
          style={{
            fontFamily: '"SF Mono", "Roboto Mono", Menlo, Monaco, Consolas, monospace',
            fontSize: '13.5px',
            color: '#1A1A22',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            background: '#FAFAFB',
            border: '1px solid #ECECF2',
            borderRadius: '10px',
            padding: '24px 26px',
            marginBottom: '28px',
          }}
        >
          {lines.map((line, idx) => {
            const trimmed = line.trim()
            // Detect "section header" — short, all-caps line
            const isHeader =
              trimmed.length > 0 &&
              trimmed.length < 50 &&
              trimmed === trimmed.toUpperCase() &&
              /[A-Z]/.test(trimmed)

            if (isHeader) {
              return (
                <div
                  key={idx}
                  style={{
                    fontWeight: 800,
                    color: '#3D2A8C',
                    letterSpacing: '0.06em',
                    marginTop: idx === 0 ? 0 : '14px',
                    marginBottom: '6px',
                  }}
                >
                  {trimmed}
                </div>
              )
            }

            const change = classifyLine(trimmed, markers)

            const highlightStyle =
              change === 'add'
                ? {
                    background: 'rgba(108,71,255,0.18)',
                    color: '#2A1B6B',
                    borderLeft: '3px solid #7A6CFF',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    paddingRight: '10px',
                    borderRadius: '4px',
                    margin: '4px 0',
                  }
                : change === 'rewrite'
                ? {
                    background: 'rgba(108,71,255,0.08)',
                    color: '#2A1B6B',
                    borderLeft: '3px solid rgba(108,71,255,0.4)',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    paddingRight: '10px',
                    borderRadius: '4px',
                    margin: '4px 0',
                  }
                : {}

            // Bullet line
            if (/^[-*]\s+/.test(trimmed)) {
              return (
                <div
                  key={idx}
                  style={{
                    paddingLeft: '14px',
                    position: 'relative',
                    ...highlightStyle,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: change ? '8px' : 0,
                      color: change === 'add' ? '#7A6CFF' : change === 'rewrite' ? '#9080D9' : '#7A6CFF',
                      fontWeight: 700,
                    }}
                  >
                    •
                  </span>
                  <span style={{ paddingLeft: change ? '8px' : 0, display: 'inline-block' }}>
                    {trimmed.replace(/^[-*]\s+/, '')}
                  </span>
                  {change === 'add' && (
                    <span
                      style={{
                        marginLeft: '10px',
                        padding: '1px 8px',
                        background: '#7A6CFF',
                        color: '#ffffff',
                        fontSize: '9px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        borderRadius: '4px',
                        verticalAlign: 'middle',
                        fontFamily: 'Figtree, sans-serif',
                      }}
                    >
                      New
                    </span>
                  )}
                </div>
              )
            }

            // Empty line
            if (trimmed === '') {
              return <div key={idx} style={{ height: '8px' }} />
            }

            // Regular line (rare — most content is bullets or headers)
            return (
              <div key={idx} style={highlightStyle}>
                {trimmed}
                {change === 'add' && (
                  <span
                    style={{
                      marginLeft: '10px',
                      padding: '1px 8px',
                      background: '#7A6CFF',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      borderRadius: '4px',
                      verticalAlign: 'middle',
                      fontFamily: 'Figtree, sans-serif',
                    }}
                  >
                    New
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              flex: 1,
              minWidth: '160px',
              padding: '14px 20px',
              background: copied
                ? '#1F8A55'
                : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
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
            {copied ? 'Copied to clipboard' : 'Copy the whole thing'}
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
          Resume updated · Stephanie Murray, hiring.productions
        </div>
      </div>
    </div>
  )
}
