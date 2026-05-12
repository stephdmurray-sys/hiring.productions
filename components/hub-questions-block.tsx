import Link from 'next/link'

interface HubQuestionItem {
  question: string
  href: string
}

interface HubQuestionsBlockProps {
  eyebrow?: string
  title: string
  items: HubQuestionItem[]
}

/**
 * Common-questions strip used at the bottom of audience hub pages
 * (/for-new-grads, /after-layoff, /career-changers, /returning-to-work).
 *
 * Surfaces 3-4 relevant /q/ pages so visitors can discover the question
 * content AND so the audience hub passes internal-link equity to the
 * cluster pages. Same pattern that drives PageRank flow on the rest of
 * the site — every hub points its readers at the relevant answers.
 */
export function HubQuestionsBlock({
  eyebrow = 'COMMON QUESTIONS',
  title,
  items,
}: HubQuestionsBlockProps) {
  return (
    <section style={{ padding: '64px 24px 80px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(26px, 3.6vw, 36px)',
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            margin: '0 0 28px',
            textAlign: 'center',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
            maxWidth: '980px',
            margin: '0 auto',
          }}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: 'none',
                background: '#14141B',
                border: '1px solid rgba(167,139,250,0.18)',
                borderRadius: 12,
                padding: '16px 18px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '14.5px',
                color: '#F2F0FF',
                letterSpacing: '-0.005em',
                lineHeight: 1.35,
                transition: 'border-color 0.18s ease, transform 0.18s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
              className="hp-hub-q-card"
            >
              <span>{item.question}</span>
              <span style={{ color: '#A78BFA', fontWeight: 800 }}>→</span>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 22 }}>
          <Link
            href="/answers"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '13.5px',
              color: '#A78BFA',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            See every answer →
          </Link>
        </div>
      </div>

      <style>{`
        .hp-hub-q-card:hover {
          border-color: rgba(167,139,250,0.45) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  )
}
