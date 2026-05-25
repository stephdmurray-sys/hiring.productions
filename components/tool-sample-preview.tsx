'use client'

/**
 * Tool Sample Preview — a small, scannable preview of what the live tool
 * returns. Sits above the upload form on tool pages so visitors stop
 * "buying blind" — they see the shape of what's coming back BEFORE they
 * commit time to filling out the form.
 *
 * Design rules followed (CLAUDE.md):
 *   - One focal point: the snippet itself
 *   - Restraint: no card-on-card chrome, single dashed border on top
 *   - Type does the work: hierarchy by size
 *   - One sentence per row max
 *
 * Per-tool sample content is passed in via props so each flagship tool
 * page provides its own representative output.
 */

interface ToolSamplePreviewProps {
  /** Tiny eyebrow above the preview (e.g. "A sample from your search"). */
  eyebrow?: string
  /** Big stat number, like "47" or "62%". Optional — some tools don't have a numeric verdict. */
  statNumber?: string
  /** Caption that explains the stat (e.g. "estimated rank in your top search"). */
  statCaption?: string
  /** Up to 3 short snippet lines — each can have a bold label + text. */
  snippets?: Array<{ label?: string; text: string }>
  /** Footer note in italic — e.g. "Identifying details scrubbed." */
  note?: string
}

export function ToolSamplePreview({
  eyebrow = 'A sample of what comes back',
  statNumber,
  statCaption,
  snippets = [],
  note,
}: ToolSamplePreviewProps) {
  return (
    <aside
      style={{
        maxWidth: 640,
        margin: '0 auto 32px',
        padding: '24px 26px 22px',
        background: 'rgba(167,139,250,0.05)',
        border: '1px dashed rgba(167,139,250,0.30)',
        borderRadius: 12,
        fontFamily: "'Figtree', sans-serif",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#A78BFA',
          marginBottom: statNumber ? 14 : 10,
        }}
      >
        {eyebrow}
      </div>

      {statNumber && (
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: 'clamp(48px, 6vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {statNumber}
          </div>
          {statCaption && (
            <div
              style={{
                fontWeight: 500,
                fontSize: 13,
                color: '#9D9CB3',
                marginTop: 6,
              }}
            >
              {statCaption}
            </div>
          )}
        </div>
      )}

      {snippets.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {snippets.map((s, i) => (
            <div
              key={i}
              style={{
                fontWeight: 400,
                fontSize: 13.5,
                color: '#C9C7DA',
                lineHeight: 1.55,
              }}
            >
              {s.label && (
                <span
                  style={{
                    fontWeight: 800,
                    color: '#1A1A22',
                    marginRight: 6,
                  }}
                >
                  {s.label}
                </span>
              )}
              {s.text}
            </div>
          ))}
        </div>
      )}

      {note && (
        <div
          style={{
            marginTop: 16,
            fontStyle: 'italic',
            fontSize: 12,
            color: '#6B6A82',
          }}
        >
          {note}
        </div>
      )}
    </aside>
  )
}
