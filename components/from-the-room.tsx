'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * From the Room — homepage section linking the long-form /q/ and /rank/
 * SEO pages. Before this, those pages were orphans (no internal links
 * from the homepage), which kills their crawl authority. This section
 * pipes pagerank into the strongest article and rank pages, and gives
 * cold visitors a no-friction reading path before they're ready to
 * try a tool.
 */

interface Article {
  href: string
  category: 'question' | 'rank'
  title: string
  hook: string
}

const FEATURED: Article[] = [
  {
    href: '/q/why-am-i-not-getting-responses',
    category: 'question',
    title: 'Why am I not getting responses?',
    hook: 'The four reasons your applications die in silence. Three of them have nothing to do with your resume.',
  },
  {
    href: '/q/how-to-tell-if-resume-is-ai',
    category: 'question',
    title: 'How recruiters tell your resume was written by AI.',
    hook: 'The specific phrasings that flag it in six seconds. And what to rewrite instead.',
  },
  {
    href: '/q/resume-red-flags',
    category: 'question',
    title: 'Resume red flags — the real list.',
    hook: 'Not the LinkedIn-influencer list. The actual things recruiters mark a resume down for.',
  },
  {
    href: '/q/explain-resume-gap',
    category: 'question',
    title: 'How to explain a resume gap.',
    hook: 'Three honest scripts. Tell it true; tell it once; stop apologizing for it.',
  },
  {
    href: '/rank/product-manager',
    category: 'rank',
    title: 'Where Senior PMs rank in a recruiter search.',
    hook: 'The five boolean strings recruiters paste in. Where your profile actually lands.',
  },
  {
    href: '/rank/software-engineer',
    category: 'rank',
    title: 'Where engineers rank in a recruiter search.',
    hook: 'The exact title/skill combos that surface — and the ones that hide you.',
  },
]

export function FromTheRoom() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#FAF8F3',
        color: '#1A1A22',
        padding: 'clamp(64px, 9vw, 112px) 24px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 16,
          }}
        >
          05 — From the room
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#1A1A22',
              margin: 0,
            }}
          >
            The questions you&rsquo;re Googling at 2am.
          </h2>
          <Link
            href="/answers"
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#A78BFA',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(167,139,250,0.4)',
              paddingBottom: 1,
              whiteSpace: 'nowrap',
            }}
          >
            See every answer &rarr;
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 16,
          }}
        >
          {FEATURED.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="from-the-room-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 14,
                padding: '22px 22px 20px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.18s ease, transform 0.18s ease',
              }}
            >
              <style>{`
                .from-the-room-card:hover {
                  border-color: rgba(167,139,250,0.45) !important;
                  transform: translateY(-2px);
                }
              `}</style>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: article.category === 'rank' ? '#FF8FA3' : '#A78BFA',
                  marginBottom: 12,
                }}
              >
                {article.category === 'rank' ? 'Where you rank' : 'Answers'}
              </div>
              <h3
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  letterSpacing: '-0.01em',
                  color: '#1A1A22',
                  lineHeight: 1.25,
                  margin: '0 0 8px',
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 400,
                  fontSize: 13.5,
                  color: '#5A5A6E',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {article.hook}
              </p>
              <div
                style={{
                  marginTop: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#A78BFA',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 12.5,
                }}
              >
                Read it <ArrowRight size={13} strokeWidth={2.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
