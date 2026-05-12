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
  const Icon = ICON_MAP[tool.icon] ?? Sparkles

  const card = (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#14141B',
        border: `1px solid ${hover && isClickable ? theme.borderHover : theme.border}`,
        borderRadius: isFeatured ? '18px' : '14px',
        padding: 0,
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
      {/* Flagship flourish — 2px brand-gradient bar at the very top of the card.
          Reserved for FLAGSHIP_PRO tools so it stays a moment, not decoration. */}
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

      {/* Themed top band — subtle gradient + icon */}
      <div
        style={{
          position: 'relative',
          background: theme.previewBg,
          padding: isFeatured ? '24px 26px 20px' : '20px 22px 18px',
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        {/* Icon — flagship tools use the brand gradient + white icon as the
            second flourish. Non-flagship use a soft same-family disc. */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isFeatured ? 44 : 38,
            height: isFeatured ? 44 : 38,
            borderRadius: '50%',
            background: isFlagship ? BRAND_GRADIENT : `${theme.primary}20`,
            border: isFlagship ? 'none' : `1px solid ${theme.primary}40`,
            marginBottom: isFeatured ? 16 : 0,
            boxShadow: isFlagship ? '0 6px 18px rgba(108,71,255,0.35)' : 'none',
          }}
        >
          <Icon
            size={isFeatured ? 20 : 18}
            color={isFlagship ? '#FFFFFF' : theme.accent}
            strokeWidth={2}
          />
        </div>

        {/* Featured-only hook line */}
        {isFeatured && (
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(20px, 2.2vw, 26px)',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
              lineHeight: 1.15,
              maxWidth: '90%',
            }}
          >
            {tool.hook}
          </div>
        )}
      </div>

      {/* Content area */}
      <div
        style={{
          padding: isFeatured ? '22px 26px 24px' : '18px 22px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Badges — audience on left (carries the side color), tier on right
            (lavender, ambient — tells you what it costs without competing
            for attention with the audience signal). */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          <Badge
            label={AUDIENCE_LABEL[tool.audience]}
            bg={`${theme.primary}1A`}
            color={theme.accent}
            border={`1px solid ${theme.primary}33`}
          />
          <Badge label={tier.label} bg={tier.bg} color={tier.color} border={tier.border} />
        </div>

        {/* Brand name */}
        <h3
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: isFeatured ? '19px' : '17px',
            letterSpacing: '-0.01em',
            color: '#F2F0FF',
            lineHeight: 1.25,
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

        {/* Description */}
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: isFeatured ? '14px' : '13px',
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
            marginTop: '18px',
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
