'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit3, Eye, RotateCcw, Linkedin, Twitter, Link2, Check } from 'lucide-react'
import { analytics } from '@/lib/analytics'

/**
 * "What now?" navigation that appears immediately after a tool result.
 *
 * Two jobs:
 *   1. Drive dwell time / second tool runs — the homepage rebuild made
 *      Recruiter Search Rank the front door, but a 90-second result
 *      followed by an empty page sends people away. This section gives
 *      every result an obvious next click.
 *   2. Make each result shareable — LinkedIn / X / copy-link buttons
 *      generate a pre-filled message so a single user's run can produce
 *      organic distribution back to the site.
 *
 * Designed so the recommended Pro tools are bilateral-adjacent — a
 * candidate who just saw their rank is bad is exactly the moment they
 * want to know how recruiters read resumes too.
 */
interface ResultNextStepsProps {
  /** The text the share buttons will use as the seed message. */
  shareSummary: string
  /** Scrolls back to the form + clears it for a fresh run. */
  onRunAgain: () => void
}

export function ResultNextSteps({ shareSummary, onRunAgain }: ResultNextStepsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : 'https://hiring.productions'
      await navigator.clipboard.writeText(`${shareSummary}\n\n${url}`)
      setCopied(true)
      analytics.repveraClick('result-share-copy')
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard blocked — surface nothing rather than throwing in the user's face.
    }
  }

  const shareUrl = 'https://hiring.productions/tools/recruiter-search-rank'
  const linkedInIntent = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const xIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareSummary} ${shareUrl}`)}`

  return (
    <div style={{ marginTop: 40 }}>
      {/* Section 1 — Next tools to run */}
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#A78BFA',
          marginBottom: 16,
        }}
      >
        Now what?
      </div>
      <h2
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(22px, 3vw, 30px)',
          letterSpacing: '-0.02em',
          color: '#1A1A22',
          lineHeight: 1.2,
          marginBottom: 22,
        }}
      >
        Three moves to make this rank real.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
          gap: 14,
          marginBottom: 36,
        }}
      >
        {/* Run again — keeps them on-tool, generates a second LLM call */}
        <button
          onClick={onRunAgain}
          style={{
            ...nextCardStyle,
            cursor: 'pointer',
            textAlign: 'left',
            background: '#FAF8F3',
            font: 'inherit',
            color: 'inherit',
          }}
        >
          <NextCardIcon Icon={RotateCcw} tint="108,71,255" accent="#A78BFA" />
          <div style={nextCardTitle}>Run for a different role</div>
          <div style={nextCardBody}>
            Want to see your rank as a Director instead of a Senior? As a PM in fintech instead of
            healthcare? Update the role, run again.
          </div>
          <div style={{ ...nextCardCta, color: '#A78BFA' }}>Run another search →</div>
        </button>

        {/* LinkedIn rewrite — the Pro upsell that follows naturally from a bad rank */}
        <Link href="/tools/linkedin-rewrite" style={nextCardStyle}>
          <NextCardIcon Icon={Edit3} tint="108,71,255" accent="#A78BFA" />
          <div style={nextCardTitle}>Rewrite my whole profile</div>
          <div style={nextCardBody}>
            Headline, About, every role — rewritten to climb every search at once. Built from the
            same recruiter playbook.
          </div>
          <div style={{ ...nextCardCta, color: '#A78BFA' }}>Rewrite mine →</div>
        </Link>

        {/* Resume recruiter eyes — bilateral pivot, deepens insight */}
        <Link href="/tools/resume-recruiter-eyes" style={nextCardStyle}>
          <NextCardIcon Icon={Eye} tint="255,79,106" accent="#FF4F6A" />
          <div style={nextCardTitle}>See your resume through a recruiter&apos;s eyes</div>
          <div style={nextCardBody}>
            Your LinkedIn rank tells you if you&apos;re findable. This shows what a recruiter
            actually thinks when they open your resume.
          </div>
          <div style={{ ...nextCardCta, color: '#FF4F6A' }}>Hear the read →</div>
        </Link>
      </div>

      {/* Section 2 — Share */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #ECECF2',
          borderRadius: 16,
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 18,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '14.5px',
              color: '#1A1A22',
              marginBottom: 4,
            }}
          >
            Share your rank
          </div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              color: '#5A5A6E',
              maxWidth: 380,
              lineHeight: 1.5,
            }}
          >
            Someone in your network is wondering the same thing. Forward the test, not just the
            result.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a
            href={linkedInIntent}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.repveraClick('result-share-linkedin')}
            style={shareButtonStyle}
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={15} strokeWidth={2} />
            LinkedIn
          </a>
          <a
            href={xIntent}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.repveraClick('result-share-x')}
            style={shareButtonStyle}
            aria-label="Share on X"
          >
            <Twitter size={15} strokeWidth={2} />
            X / Twitter
          </a>
          <button
            onClick={handleCopy}
            style={{
              ...shareButtonStyle,
              border: copied ? '1px solid rgba(94,230,168,0.5)' : shareButtonStyle.border,
              color: copied ? '#5EE6A8' : shareButtonStyle.color,
              cursor: 'pointer',
              font: 'inherit',
              background: shareButtonStyle.background,
            }}
          >
            {copied ? <Check size={15} strokeWidth={2.5} /> : <Link2 size={15} strokeWidth={2} />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  )
}

const nextCardStyle: React.CSSProperties = {
  background: '#FAF8F3',
  border: '1px solid #ECECF2',
  borderRadius: 14,
  padding: 22,
  textDecoration: 'none',
  display: 'block',
  width: '100%',
  transition: 'border-color 0.2s, transform 0.2s',
}
const nextCardTitle: React.CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 800,
  fontSize: '15.5px',
  color: '#1A1A22',
  marginTop: 14,
  marginBottom: 8,
  lineHeight: 1.3,
}
const nextCardBody: React.CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontSize: '13px',
  color: '#5A5A6E',
  lineHeight: 1.55,
  marginBottom: 14,
}
const nextCardCta: React.CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 800,
  fontSize: '12.5px',
}

const shareButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  padding: '9px 14px',
  background: '#FFFFFF',
  border: '1px solid #ECECF2',
  borderRadius: 8,
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 700,
  fontSize: '13px',
  color: '#1A1A22',
  textDecoration: 'none',
}

function NextCardIcon({
  Icon,
  tint,
  accent,
}: {
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
  tint: string
  accent: string
}) {
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 10,
        background: `rgba(${tint},0.12)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={17} color={accent} strokeWidth={2} />
    </div>
  )
}
