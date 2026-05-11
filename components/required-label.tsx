'use client'

/**
 * Form field label with a clear required/optional indicator + a "filled" check
 * once the user provides a value. Solves the "I didn't realize that field was
 * required" problem we kept hitting.
 */

interface RequiredLabelProps {
  label: string
  /** True when the user has typed something. Drives the green check. */
  filled: boolean
  /** Default true. Set false for optional fields. */
  required?: boolean
  /** First label in form, no top margin */
  first?: boolean
}

export function RequiredLabel({ label, filled, required = true, first = false }: RequiredLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: first ? 0 : 20,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#8B8AA0',
        }}
      >
        <span>{label}</span>
        {required ? (
          <span
            style={{
              color: filled ? '#5EE6A8' : '#FF4F6A',
              fontWeight: 800,
              fontSize: '10px',
              letterSpacing: '0.06em',
              transition: 'color 0.2s ease',
            }}
          >
            {filled ? '✓ FILLED' : '* REQUIRED'}
          </span>
        ) : (
          <span
            style={{
              color: '#6B6A82',
              fontWeight: 600,
              fontSize: '10px',
              letterSpacing: '0.06em',
            }}
          >
            OPTIONAL
          </span>
        )}
      </div>
    </div>
  )
}

interface RequiredFormHeaderProps {
  filledCount: number
  totalRequired: number
}

/**
 * Sticky-feeling header pill that shows progress on required fields.
 * Sits between the prompt cards and the first input.
 */
export function RequiredFormHeader({ filledCount, totalRequired }: RequiredFormHeaderProps) {
  const complete = filledCount >= totalRequired
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        background: complete ? 'rgba(94,230,168,0.08)' : 'rgba(255,79,106,0.06)',
        border: `1px solid ${complete ? 'rgba(94,230,168,0.30)' : 'rgba(255,79,106,0.25)'}`,
        borderRadius: '10px',
        padding: '12px 16px',
        marginTop: '16px',
        marginBottom: '24px',
        fontFamily: "'Figtree', sans-serif",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '13px',
          color: complete ? '#5EE6A8' : '#F2F0FF',
        }}
      >
        {complete ? 'All required fields filled — ready to run.' : 'Fill all required fields to continue.'}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
          fontWeight: 700,
          fontSize: '12px',
          color: complete ? '#5EE6A8' : '#FF4F6A',
        }}
      >
        {filledCount}/{totalRequired}
      </div>
    </div>
  )
}
