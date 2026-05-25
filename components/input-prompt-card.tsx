'use client'

interface InputPromptCardProps {
  title: string
  prompts: string[]
}

/**
 * Persistent prompt card that sits above a textarea, listing what the user
 * should cover. Use this instead of stuffing instructional content into a
 * placeholder — placeholders disappear when the user starts typing, and that's
 * exactly when the guidance is most needed.
 */
export function InputPromptCard({ title, prompts }: InputPromptCardProps) {
  return (
    <div
      style={{
        background: 'rgba(108,71,255,0.06)',
        border: '1px solid rgba(108,71,255,0.18)',
        borderRadius: '10px',
        padding: '16px 20px',
        marginBottom: '12px',
      }}
    >
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: '13px',
          color: '#1A1A22',
          marginBottom: '10px',
        }}
      >
        {title}
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {prompts.map((q) => (
          <li
            key={q}
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '13.5px',
              color: '#5A5A6E',
              lineHeight: 1.55,
              paddingLeft: '14px',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '8px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#A78BFA',
              }}
            />
            {q}
          </li>
        ))}
      </ul>
    </div>
  )
}
