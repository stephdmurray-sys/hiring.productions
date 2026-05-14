'use client'

import { TrendingUp, Wrench } from 'lucide-react'

/**
 * The "rank reveal" card. Lives at the top of a recruiter-search-rank
 * result so the recognition moment is the first thing the user sees —
 * before they scroll into the full analysis.
 *
 * Pulled into a dedicated component (rather than inlined in the result
 * markdown) so we can:
 *   1) parse rank bands deterministically and compute an honest average,
 *   2) keep the share / screenshot affordances anchored to this one
 *      visual unit, and
 *   3) treat it as the brand moment — the screenshot people post on
 *      LinkedIn is THIS card, not a random scroll of markdown.
 *
 * The card degrades gracefully — if parsing fails for any reason
 * (model output drift, malformed bands, etc.) the card returns null
 * and the full ToolResult renders unchanged below.
 */
interface RankRevealCardProps {
  result: string
  targetRole: string
}

interface ParsedRank {
  averageRank: number
  searchCount: number
  topFixLabel: string | null
  topFixImpact: string | null
}

/**
 * Parse the model output for rank bands and the top recommended fix.
 * The recruiter-search-rank prompt emits a known shape; this regex
 * tolerates spacing/dash variants without being clever.
 */
function parseRankResult(result: string): ParsedRank | null {
  // Match "Estimated rank: 25-40 of ~800 results" or with em/en dashes
  const bandPattern = /Estimated rank:\s*(\d+)\s*[-–—]\s*(\d+)/gi
  const bands: Array<[number, number]> = []
  let match: RegExpExecArray | null
  while ((match = bandPattern.exec(result)) !== null) {
    const low = parseInt(match[1], 10)
    const high = parseInt(match[2], 10)
    if (!Number.isNaN(low) && !Number.isNaN(high)) {
      bands.push([low, high])
    }
  }

  if (bands.length === 0) return null

  // Average the midpoint of each band — honest single number for the headline.
  const midpoints = bands.map(([low, high]) => (low + high) / 2)
  const averageRank = Math.round(midpoints.reduce((a, b) => a + b, 0) / midpoints.length)

  // Pull "Move 1: <label>" and its Impact line.
  const move1Match = result.match(/\*\*Move 1:\s*([^*]+?)\*\*(?:\s*—\s*[^\n]+)?\n([\s\S]*?)(?=\*\*Move 2:|\*\*The honest read|$)/i)
  let topFixLabel: string | null = null
  let topFixImpact: string | null = null
  if (move1Match) {
    topFixLabel = move1Match[1].trim()
    const body = move1Match[2]
    const impactMatch = body.match(/Impact:\s*([^\n]+)/i)
    if (impactMatch) topFixImpact = impactMatch[1].trim()
  }

  return {
    averageRank,
    searchCount: bands.length,
    topFixLabel,
    topFixImpact,
  }
}

export function RankRevealCard({ result, targetRole }: RankRevealCardProps) {
  const parsed = parseRankResult(result)
  if (!parsed) return null

  const { averageRank, searchCount, topFixLabel, topFixImpact } = parsed

  // Honest verbal read on the rank — feeds the emotional moment.
  // Calibrated to how recruiters actually evaluate LinkedIn search position.
  const verdict =
    averageRank <= 20
      ? 'Recruiters are finding you.'
      : averageRank <= 50
      ? 'Recruiters can find you — but not first.'
      : averageRank <= 100
      ? "You're in the result set. Just not high enough to get clicked."
      : 'Most recruiters never scroll this far.'

  const verdictColor =
    averageRank <= 20 ? '#5EE6A8' : averageRank <= 50 ? '#A78BFA' : '#FF4F6A'

  return (
    <div
      style={{
        background: '#0F0F12',
        border: '1px solid rgba(108,71,255,0.32)',
        borderRadius: 20,
        padding: 'clamp(28px, 5vw, 44px)',
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(108,71,255,0.18)',
      }}
    >
      {/* Decorative glow — coral on high ranks, indigo on low. Subtle. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -90,
          right: -70,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${
            averageRank > 50 ? 'rgba(255,79,106,0.20)' : 'rgba(108,71,255,0.22)'
          } 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative' }}>
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#A78BFA',
            marginBottom: 14,
          }}
        >
          Your rank · {targetRole}
        </div>

        {/* The number */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 18,
            flexWrap: 'wrap',
            marginBottom: 22,
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(64px, 12vw, 112px)',
              lineHeight: 0.95,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
            }}
          >
            #{averageRank}
          </div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(15px, 2.2vw, 18px)',
              color: '#9D9CB3',
              lineHeight: 1.4,
              maxWidth: 280,
            }}
          >
            average rank across {searchCount} recruiter search
            {searchCount === 1 ? '' : 'es'}
          </div>
        </div>

        {/* Verdict line */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: `${verdictColor}1F`,
            border: `1px solid ${verdictColor}55`,
            borderRadius: 100,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '13.5px',
            color: verdictColor,
            marginBottom: 24,
          }}
        >
          <TrendingUp size={14} strokeWidth={2.5} />
          {verdict}
        </div>

        {/* Top fix card */}
        {topFixLabel && topFixImpact && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: 22,
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                borderRadius: 10,
                padding: '6px 12px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '11px',
                letterSpacing: '0.06em',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Wrench size={12} strokeWidth={2.5} />
              TOP FIX
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: '16px',
                  color: '#F2F0FF',
                  marginBottom: 6,
                  lineHeight: 1.35,
                }}
              >
                {topFixLabel}
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '14px',
                  color: '#9D9CB3',
                  lineHeight: 1.55,
                }}
              >
                {topFixImpact}
              </div>
            </div>
          </div>
        )}

        {/* Read-on prompt */}
        <div
          style={{
            marginTop: 24,
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13px',
            color: '#8B8AA0',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Full breakdown of every search, ranking math, and all 3 moves below ↓
        </div>
      </div>
    </div>
  )
}
