'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Linkedin } from 'lucide-react'

/**
 * Founder presence — Stephanie's headshot + one-line bio + LinkedIn
 * follow. Surfaces in two places:
 *   1) Homepage credibility section ("Built by a recruiter")
 *   2) Below every tool result, where a successful user is most likely
 *      to want more from her
 *
 * The expertise IS the moat for hiring.productions — putting her face
 * + a one-click LinkedIn follow makes that explicit and gives the
 * "interested but not paying today" segment a soft yes that builds
 * audience for future buys.
 *
 * Headshot path is /stephanie.jpg in /public. If the file isn't
 * present yet, Next/Image renders nothing (won't break the build).
 */
interface FounderBylineProps {
  /** "full" shows headshot + bio + LinkedIn CTA; "compact" is photo + name only. */
  variant?: 'full' | 'compact'
}

export function FounderByline({ variant = 'full' }: FounderBylineProps) {
  if (variant === 'compact') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 12px 6px 6px',
          background: '#FFFFFF',
          border: '1px solid #ECECF2',
          borderRadius: 100,
        }}
      >
        <Image
          src="/stephanie.jpg"
          alt="Stephanie Murray"
          width={28}
          height={28}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: '#1A1A22',
              lineHeight: 1.2,
            }}
          >
            Stephanie Murray
          </div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 10.5,
              color: '#5A5A6E',
              letterSpacing: '0.02em',
              lineHeight: 1.2,
            }}
          >
            20 years in talent
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '18px 20px',
        background: '#FAFAFA',
        border: '1px solid #ECECF2',
        borderRadius: 16,
        flexWrap: 'wrap',
      }}
    >
      <Image
        src="/stephanie.jpg"
        alt="Stephanie Murray"
        width={72}
        height={72}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
          border: '2px solid rgba(167,139,250,0.25)',
        }}
      />
      <div style={{ flex: 1, minWidth: 200 }}>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 16,
            color: '#1A1A22',
            marginBottom: 3,
            letterSpacing: '-0.005em',
          }}
        >
          Stephanie Murray
        </div>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: 13,
            color: '#5A5A6E',
            lineHeight: 1.5,
            marginBottom: 10,
          }}
        >
          Senior Director of TA at a fast-growing healthcare startup for 4 years. 20 years in
          talent acquisition total. Built hiring.productions because nobody
          outside recruiting can see how it actually works.
        </div>
        <Link
          href="https://www.linkedin.com/in/stephaniemurray11/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 12px',
            background: 'rgba(10,102,194,0.16)',
            border: '1px solid rgba(10,102,194,0.40)',
            borderRadius: 8,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: 12.5,
            color: '#7BB7E8',
            textDecoration: 'none',
            transition: 'background 0.18s ease',
          }}
        >
          <Linkedin size={13} strokeWidth={2.2} />
          Follow on LinkedIn for the unfiltered recruiter take
        </Link>
      </div>
    </div>
  )
}
