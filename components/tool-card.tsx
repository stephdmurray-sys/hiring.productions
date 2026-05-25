'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Eye,
  Search,
  Edit3,
  MessageSquare,
  HelpCircle,
  Sparkles,
  FileText,
  Hash,
  DollarSign,
  AlertCircle,
  Filter,
  Target,
  Building2,
  MessageCircle,
  BarChart3,
  UserCheck,
  Send,
  CheckSquare,
  Mic,
  Mail,
  Map,
  Calendar,
  Star,
  type LucideIcon,
} from 'lucide-react'
import { getTheme, BRAND_GRADIENT } from '@/lib/tool-themes'
import { FLAGSHIP_PRO, type CatalogTool, type ToolIcon } from '@/lib/tools-catalog'

interface ToolCardProps {
  tool: CatalogTool
  /** Featured cards are larger, get the hook line, get the glow */
  variant?: 'featured' | 'standard'
}

const ICON_MAP: Record<ToolIcon, LucideIcon> = {
  Eye,
  Search,
  Edit3,
  MessageSquare,
  HelpCircle,
  Sparkles,
  FileText,
  Hash,
  DollarSign,
  AlertCircle,
  Filter,
  Target,
  Building2,
  MessageCircle,
  BarChart3,
  UserCheck,
  Send,
  CheckSquare,
  Mic,
  Mail,
  Map,
  Calendar,
  Star,
}

// Tier badges read like quiet metadata, not decoration. All on-palette: lavender
// outlined for Free (no-cost, open), lavender filled for Pro (members get it),
// muted gray for Soon (not built yet).
const TIER_BADGE = {
  free: {
    label: 'Free',
    bg: 'rgba(167,139,250,0.10)',
    color: '#A78BFA',
    border: '1px solid rgba(167,139,250,0.35)',
  },
  pro: {
    label: 'Included in Pro',
    bg: 'rgba(167,139,250,0.20)',
    color: '#F2F0FF',
    border: '1px solid rgba(167,139,250,0.40)',
  },
  soon: {
    label: 'On the way',
    bg: 'rgba(139,138,160,0.12)',
    color: '#8B8AA0',
    border: '1px solid rgba(139,138,160,0.25)',
  },
} as const

const AUDIENCE_LABEL = {
  candidate: 'Candidate',
  hiring: 'Hiring Team',
} as const

export function ToolCard({ tool, variant = 'standard' }: ToolCardProps) {
  const [hover, setHover] = useState(false)
  const theme = getTheme(tool)
  const tier = TIER_BADGE[tool.tier]
  const isClickable = tool.tier !== 'soon'
  const isFeatured = variant === 'featured'
  const isFlagship = FLAGSHIP_PRO.includes(tool.name as never)

  // Redesigned (May 2026): dropped the themed top band + icon disc.
  // Stephanie's audit: "the icon above the words is taking up more space
  // on the sections... too much going on." The icons were generic
  // Lucide shapes not specific to each tool's intent. Cards now lead
  // with title + subtitle, with badges as quiet metadata. Flagship
  // tools keep the 2px gradient top stripe as a single restrained
  // flourish.

  const card = (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#14141B',
        border: `1px solid ${hover && isClickable ? theme.borderHover : theme.border}`,
        borderRadius: isFeatured ? '18px' : '14px',
        padding: isFeatured ? '24px 26px 22px' : '20px 22px 20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: isClickable ? 'pointer' : 'default',
        opacity: tool.tier === 'soon' ? 0.85 : 1,
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        transform: hover && isClickable ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hover && isClickable ? theme.glow : '0 4px 16px rgba(0,0,0,0.20)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flagship flourish — 2px brand-gradient bar at the top of the card.
          Reserved for FLAGSHIP_PRO so it stays a moment, not decoration. */}
      {isFlagship && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: BRAND_GRADIENT,
            zIndex: 1,
          }}
        />
      )}

      {/* Badges — audience on left (carries the side color), tier on right.
          These read as quiet metadata above the title. */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <Badge
          label={AUDIENCE_LABEL[tool.audience]}
          bg={`${theme.primary}1A`}
          color={theme.accent}
          border={`1px solid ${theme.primary}33`}
        />
        <Badge label={tier.label} bg={tier.bg} color={tier.color} border={tier.border} />
      </div>

      {/* Brand name — the headline of the card */}
      <h3
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: isFeatured ? '20px' : '18px',
          letterSpacing: '-0.01em',
          color: '#F2F0FF',
          lineHeight: 1.22,
          margin: '0 0 4px',
        }}
      >
        {tool.name}
      </h3>

      {/* Plain-English subtitle */}
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: '11.5px',
          color: theme.accent,
          letterSpacing: '0.04em',
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}
      >
        {tool.subtitle}
      </div>

      {/* Featured-only hook line — only the hero card on a page gets this */}
      {isFeatured && (
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(18px, 2vw, 22px)',
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            lineHeight: 1.18,
            margin: '4px 0 12px',
          }}
        >
          {tool.hook}
        </div>
      )}

      {/* Description */}
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 400,
          fontSize: isFeatured ? '14px' : '13.5px',
          color: '#9D9CB3',
          lineHeight: 1.55,
          margin: 0,
          flex: 1,
        }}
      >
        {tool.desc}
      </p>

      {/* CTA */}
      <div
        style={{
          marginTop: '16px',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '13px',
          color: tool.tier === 'soon' ? '#6B6A82' : theme.accent,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {tool.cta}
        {isClickable && (
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.2s ease',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            →
          </span>
        )}
      </div>
    </article>
  )

  if (!isClickable) return <div style={{ height: '100%' }}>{card}</div>

  return (
    <Link
      href={tool.href}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: '100%',
      }}
    >
      {card}
    </Link>
  )
}

function Badge({
  label,
  bg,
  color,
  border,
}: {
  label: string
  bg: string
  color: string
  border?: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: bg,
        color,
        border,
        padding: '4px 9px',
        borderRadius: 5,
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: '10px',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </span>
  )
}
