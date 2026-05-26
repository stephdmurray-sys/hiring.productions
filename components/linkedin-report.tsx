'use client'

import { ReactNode, useState } from 'react'
import { StripeCheckoutButton } from '@/components/stripe-checkout-button'
import { RepveraBridge } from '@/components/repvera-bridge'
import { ShareResult } from '@/components/share-result'

interface LinkedinReportProps {
  result: string
  /** When false, the rewrite content is blurred and an upgrade card shows inline. */
  isMember: boolean
}

type SectionKind =
  | 'profileSignals'
  | 'searchKeywords'
  | 'skillsToAdd'
  | 'headlineOptions'
  | 'settingsToCheck'
  | 'aboutSection'
  | 'recentRole'
  | 'recommendationsStrategy'
  | 'phraseToAvoid'
  | 'unknown'

interface Section {
  kind: SectionKind
  heading: string
  body: string
}

// Sections grouped by job. The render loop inserts a divider/title before
// the first section in each job so the user knows what each suggestion is for.
const JOB_1_KINDS: SectionKind[] = [
  'searchKeywords',
  'skillsToAdd',
  'headlineOptions',
  'settingsToCheck',
]
const JOB_2_KINDS: SectionKind[] = [
  'aboutSection',
  'recentRole',
  'recommendationsStrategy',
  'phraseToAvoid',
]

const HEADING_RULES: Array<{ kind: SectionKind; test: (h: string) => boolean }> = [
  { kind: 'profileSignals', test: (h) => /your\s*(reel|profile)\s*signals/i.test(h) },
  { kind: 'searchKeywords', test: (h) => /what\s*recruiters\s*search\s*for/i.test(h) },
  { kind: 'skillsToAdd', test: (h) => /skills\s*you\s*should\s*add/i.test(h) },
  { kind: 'headlineOptions', test: (h) => /headline\s*[—-]?\s*rewritten/i.test(h) },
  { kind: 'settingsToCheck', test: (h) => /^settings\s*to\s*check/i.test(h) },
  { kind: 'aboutSection', test: (h) => /about\s*section/i.test(h) },
  { kind: 'recentRole', test: (h) => /(most\s*recent|recent)\s*role/i.test(h) },
  { kind: 'recommendationsStrategy', test: (h) => /recommendations?\s*strategy/i.test(h) },
  { kind: 'phraseToAvoid', test: (h) => /phrase\s*(to\s*(leave\s*behind|never\s*use))/i.test(h) },
]

function classifyHeading(h: string): SectionKind {
  for (const rule of HEADING_RULES) if (rule.test(h)) return rule.kind
  return 'unknown'
}

function parseSections(markdown: string): Section[] {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  let current: Section | null = null
  for (const raw of lines) {
    const line = raw.trimEnd()
    const m = line.match(/^\s*\*\*(.+?):?\*\*\s*$/)
    if (m) {
      const heading = m[1].replace(/:$/, '').trim()
      const kind = classifyHeading(heading)
      if (kind !== 'unknown') {
        if (current) sections.push(current)
        current = { kind, heading, body: '' }
        continue
      }
    }
    if (current) current.body += (current.body ? '\n' : '') + line
  }
  if (current) sections.push(current)
  return sections
}

// Inline render — bold (**) and quoted text get visual treatment.
function renderInline(text: string, key: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|"[^"]+")/g)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${key}-${i}`} style={{ fontWeight: 700, color: '#1A1A22' }}>
          {part.replace(/\*\*/g, '')}
        </strong>
      )
    }
    if (/^".+"$/.test(part)) {
      return (
        <span
          key={`${key}-${i}`}
          style={{
            background: '#E8E4FF',
            color: '#3D2A8C',
            padding: '1px 6px',
            borderRadius: '4px',
            fontStyle: 'italic',
            fontWeight: 500,
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {part}
        </span>
      )
    }
    return part
  })
}

// === Reusable copy button ===========================================
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }
  return (
    <button
      onClick={handleCopy}
      style={{
        padding: '6px 12px',
        background: copied ? '#1F8A55' : '#ffffff',
        color: copied ? '#ffffff' : '#3D2A8C',
        border: copied ? 'none' : '1px solid rgba(108,71,255,0.3)',
        borderRadius: '6px',
        fontFamily: 'Figtree, sans-serif',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {copied ? 'Copied' : label}
    </button>
  )
}

// === Section shell ==================================================
function SectionShell({
  title,
  accentColor,
  eyebrow,
  description,
  children,
}: {
  title: string
  accentColor: string
  eyebrow: string
  description?: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ marginBottom: '18px' }}>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: accentColor,
            marginBottom: '8px',
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 900,
            color: '#1A1A22',
            fontFamily: 'Figtree, sans-serif',
            letterSpacing: '-0.02em',
            margin: 0,
            paddingBottom: '12px',
            borderBottom: `2px solid ${accentColor}33`,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: '#5A5A6E',
              fontStyle: 'italic',
              lineHeight: 1.55,
              marginTop: '12px',
              marginBottom: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

// === Section renderers =============================================
function ProfileSignalsSection({ section }: { section: Section }) {
  return (
    <SectionShell
      title="What your reel signals right now"
      accentColor="#7A6CFF"
      eyebrow="The first impression"
      description="What a recruiter takes away in the first scroll. The honest read before the rewrite."
    >
      <div
        style={{
          fontSize: '15px',
          color: '#3A3A4A',
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
        }}
      >
        {renderInline(section.body.trim(), 'profile-signals')}
      </div>
    </SectionShell>
  )
}

// === Search keywords section ============================================
// Body looks like:
//   **Headline:**
//   - "Term" — reason
//   - "Term" — reason
//   **Skills section:**
//   - ...
//   **About:**
//   - ...
//   **Experience bullets:**
//   - ...

interface KeywordItem {
  term: string
  reason: string
}

interface KeywordGroup {
  location: string
  iconLabel: string
  description: string
  items: KeywordItem[]
}

const LOCATION_META: Record<string, { iconLabel: string; description: string }> = {
  Headline: {
    iconLabel: 'Highest weight',
    description: 'Search-weighted heaviest. Title variants here decide whether you appear at all.',
  },
  'Skills section': {
    iconLabel: 'Direct match',
    description: 'Where LinkedIn matches recruiter skill filters and rewards skill assessments.',
  },
  About: {
    iconLabel: 'Keyword scan',
    description: 'Searched in keyword scans. Phrasing matters; weave these in naturally.',
  },
  'Experience bullets': {
    iconLabel: 'Evidence',
    description: 'Becomes the proof a recruiter scans once they click through. Don\'t skip.',
  },
}

function parseKeywordGroups(body: string): KeywordGroup[] {
  const groups: KeywordGroup[] = []
  let current: KeywordGroup | null = null
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const sub = line.match(/^\*\*(.+?):?\*\*\s*$/)
    if (sub) {
      if (current) groups.push(current)
      const location = sub[1].replace(/:$/, '').trim()
      const meta = LOCATION_META[location] ?? {
        iconLabel: 'Search-relevant',
        description: 'Terms a recruiter would type when looking for this background.',
      }
      current = { location, iconLabel: meta.iconLabel, description: meta.description, items: [] }
      continue
    }
    if (!current) continue
    // Match -| "Term" — reason  OR  - "Term": reason
    const m = line.match(/^[-*]\s*"([^"]+)"\s*[—–-]+\s*(.+)$/)
    if (m) {
      current.items.push({ term: m[1].trim(), reason: m[2].trim() })
    }
  }
  if (current) groups.push(current)
  return groups
}

function SearchKeywordsSection({ section, blurred }: { section: Section; blurred: boolean }) {
  const groups = parseKeywordGroups(section.body)

  return (
    <SectionShell
      title="What recruiters actually search for"
      accentColor="#7A6CFF"
      eyebrow="The search side of the audition"
      description="LinkedIn Recruiter weights different sections of your profile differently. These are the exact terms recruiters type, grouped by where they need to live to surface you in their search."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          filter: blurred ? 'blur(8px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        {groups.map((g, i) => (
          <div
            key={`g-${i}`}
            style={{
              padding: '20px 22px',
              background: '#FAFAFB',
              borderRadius: '10px',
              border: '1px solid #ECECF2',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '4px',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#1A1A22',
                  fontFamily: 'Figtree, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
                {g.location}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#7A6CFF',
                  flexShrink: 0,
                }}
              >
                {g.iconLabel}
              </div>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: '#6B6B7B',
                fontStyle: 'italic',
                lineHeight: 1.5,
                margin: '0 0 14px 0',
              }}
            >
              {g.description}
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {g.items.map((item, j) => (
                <li
                  key={`k-${i}-${j}`}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderTop: j === 0 ? 'none' : '1px solid #ECECF2',
                  }}
                >
                  <span
                    style={{
                      padding: '4px 10px',
                      background: '#E8E4FF',
                      color: '#3D2A8C',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: '1px solid rgba(108,71,255,0.2)',
                      fontFamily: 'Figtree, sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {item.term}
                  </span>
                  <span
                    style={{
                      fontSize: '13.5px',
                      color: '#3A3A4A',
                      lineHeight: 1.55,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {item.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

// === Skills to add section ============================================
// Body lines are: - "Skill name" — reason
function SkillsToAddSection({ section, blurred }: { section: Section; blurred: boolean }) {
  const items: KeywordItem[] = []
  for (const raw of section.body.split('\n')) {
    const line = raw.trim()
    const m = line.match(/^[-*]\s*"([^"]+)"\s*[—–-]+\s*(.+)$/)
    if (m) items.push({ term: m[1].trim(), reason: m[2].trim() })
  }

  return (
    <SectionShell
      title="Skills to add to your Skills section"
      accentColor="#7A6CFF"
      eyebrow="The filter match"
      description="LinkedIn matches recruiter skill filters literally. Add these so you appear in the right filtered searches. Only ones that legitimately apply to your background."
    >
      <div
        style={{
          padding: '20px 22px',
          background: '#FAFAFB',
          border: '1px solid #ECECF2',
          borderRadius: '10px',
          filter: blurred ? 'blur(8px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {items.map((item, i) => (
            <li
              key={`s-${i}`}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                gap: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderTop: i === 0 ? 'none' : '1px solid #ECECF2',
              }}
            >
              <span
                style={{
                  padding: '4px 10px',
                  background: '#E8E4FF',
                  color: '#3D2A8C',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: '1px solid rgba(108,71,255,0.2)',
                  fontFamily: 'Figtree, sans-serif',
                  flexShrink: 0,
                }}
              >
                {item.term}
              </span>
              <span style={{ fontSize: '13.5px', color: '#3A3A4A', lineHeight: 1.55, flex: 1, minWidth: 0 }}>
                {item.reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

// === Settings to check ===============================================
// Body lines are: - Setting name — what to set it to and why
// Only split on em-dash / en-dash — plain hyphens appear naturally in
// URLs, hyphenated words, and titles like "C-suite" or "full-cycle".
function capFirst(s: string): string {
  return s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s
}
function stripQuotes(s: string): string {
  return s.replace(/["“”]/g, '').trim()
}
function SettingsToCheckSection({ section, blurred }: { section: Section; blurred: boolean }) {
  const items: { name: string; advice: string }[] = []
  for (const raw of section.body.split('\n')) {
    const line = raw.trim()
    const m = line.match(/^[-*]\s*(.+?)\s*[—–]+\s*(.+)$/)
    if (m) {
      items.push({
        name: stripQuotes(m[1]),
        advice: capFirst(m[2].trim()),
      })
    }
  }

  return (
    <SectionShell
      title="Settings to check"
      accentColor="#7A6CFF"
      eyebrow="Outside the profile content"
      description="Settings outside your profile copy that decide whether you appear in recruiter searches at all. Change these once and they keep working."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          filter: blurred ? 'blur(8px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        {items.map((item, i) => (
          <div
            key={`set-${i}`}
            style={{
              display: 'flex',
              gap: '14px',
              padding: '14px 18px',
              background: '#FAFAFB',
              border: '1px solid #ECECF2',
              borderRadius: '10px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'rgba(108,71,255,0.15)',
                color: '#7A6CFF',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: '#1A1A22',
                  marginBottom: '4px',
                  fontFamily: 'Figtree, sans-serif',
                }}
              >
                {item.name}
              </div>
              <div style={{ fontSize: '14px', color: '#3A3A4A', lineHeight: 1.6 }}>{item.advice}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

// === Recommendations strategy =======================================
// Body lines are: - Who to ask — what to ask them to write about
// Same rule as Settings: em-dash / en-dash only as separator. Capitalize
// the body so it doesn't read as a sentence fragment after the heading.
function RecommendationsStrategySection({ section, blurred }: { section: Section; blurred: boolean }) {
  const items: { who: string; ask: string }[] = []
  for (const raw of section.body.split('\n')) {
    const line = raw.trim()
    const m = line.match(/^[-*]\s*(.+?)\s*[—–]+\s*(.+)$/)
    if (m) {
      items.push({
        who: stripQuotes(m[1]),
        ask: capFirst(m[2].trim()),
      })
    }
  }

  return (
    <SectionShell
      title="Recommendations strategy"
      accentColor="#FF4F6A"
      eyebrow="Your validation layer"
      description="Recommendations from the right people are the social-proof recruiters actually weight. Specific, requested for a specific reason."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          filter: blurred ? 'blur(8px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        {items.map((item, i) => (
          <div
            key={`rec-${i}`}
            style={{
              padding: '16px 18px',
              background: '#FAFAFB',
              border: '1px solid #ECECF2',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#FF4F6A',
                marginBottom: '4px',
              }}
            >
              Ask {i + 1}
            </div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#1A1A22',
                marginBottom: '8px',
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              {item.who}
            </div>
            <div style={{ fontSize: '14px', color: '#3A3A4A', lineHeight: 1.6 }}>{item.ask}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

// === Job-group divider (visible label between sections) ==============
function JobGroupDivider({
  jobNumber,
  title,
  why,
  accent,
}: {
  jobNumber: 1 | 2
  title: string
  why: string
  accent: string
}) {
  return (
    <div
      style={{
        margin: '12px 0 36px',
        padding: '24px 28px',
        background: 'linear-gradient(135deg, #FAF6FF 0%, #FFF4F1 100%)',
        borderRadius: '14px',
        border: `1.5px solid ${accent}33`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '14px',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: accent,
            flexShrink: 0,
          }}
        >
          Job {jobNumber}
        </div>
        <div
          style={{
            height: '1px',
            background: `${accent}33`,
            flex: 1,
          }}
        />
      </div>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 900,
          color: '#1A1A22',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          fontFamily: 'Figtree, sans-serif',
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: '14px', color: '#5A5A6E', lineHeight: 1.55, fontStyle: 'italic' }}>
        {why}
      </div>
    </div>
  )
}

function HeadlineOptionsSection({ section, blurred }: { section: Section; blurred: boolean }) {
  // Lines starting with "1." / "2." / "3."
  const options: string[] = []
  for (const raw of section.body.split('\n')) {
    const m = raw.trim().match(/^\d+\.\s+(.+)$/)
    if (m) options.push(m[1].trim())
  }

  return (
    <SectionShell
      title="Your headline, rewritten three ways"
      accentColor="#FF4F6A"
      eyebrow="Your opening line"
      description="Pick the one that sounds most like you. Each option is under 220 characters and tuned to your background."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          filter: blurred ? 'blur(8px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        {options.map((opt, i) => (
          <div
            key={`opt-${i}`}
            style={{
              display: 'flex',
              gap: '14px',
              padding: '16px 18px',
              background: '#FAFAFB',
              border: '1px solid #ECECF2',
              borderRadius: '10px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#FF4F6A',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, fontSize: '14.5px', color: '#1A1A22', lineHeight: 1.55, fontFamily: 'Figtree, sans-serif' }}>
              {opt}
              <div style={{ marginTop: '6px', fontSize: '11px', color: '#9494A5' }}>
                {opt.length} characters
              </div>
            </div>
            {!blurred && <CopyButton text={opt} />}
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

function AboutSectionRender({ section, blurred }: { section: Section; blurred: boolean }) {
  const text = section.body.trim()
  return (
    <SectionShell
      title="Your About section, rewritten"
      accentColor="#7A6CFF"
      eyebrow="Your sizzle reel"
      description="Stops the scroll, tells your story in your voice, ends with a clear next step. Ready to paste. Fill in any [your number] placeholders with your actual specifics."
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            padding: '20px 22px',
            background: '#FAFAFB',
            border: '1px solid #ECECF2',
            borderRadius: '10px',
            fontSize: '14.5px',
            color: '#1A1A22',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            fontFamily: 'Figtree, sans-serif',
            filter: blurred ? 'blur(8px)' : undefined,
            userSelect: blurred ? 'none' : undefined,
            pointerEvents: blurred ? 'none' : undefined,
          }}
          aria-hidden={blurred}
        >
          {renderInline(text, 'about')}
          {!blurred && (
            <div
              style={{
                marginTop: '12px',
                fontSize: '11px',
                color: '#9494A5',
                paddingTop: '12px',
                borderTop: '1px solid #ECECF2',
              }}
            >
              {text.length} / 2,000 characters
            </div>
          )}
        </div>
        {!blurred && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
            }}
          >
            <CopyButton text={text} label="Copy About" />
          </div>
        )}
      </div>
    </SectionShell>
  )
}

function RecentRoleSection({ section, blurred }: { section: Section; blurred: boolean }) {
  // Bullet lines starting with "- "
  const bullets: string[] = []
  for (const raw of section.body.split('\n')) {
    const m = raw.trim().match(/^[-*]\s+(.+)$/)
    if (m) bullets.push(m[1].trim())
  }
  const fullText = bullets.map((b) => `- ${b}`).join('\n')

  return (
    <SectionShell
      title="Your most recent role, rewritten"
      accentColor="#7A6CFF"
      eyebrow="Your highlight clips"
      description="Impact-driven bullets in past tense, ready to paste. Fill in any [your number] placeholders with your actual specifics."
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            padding: '20px 22px',
            background: '#FAFAFB',
            border: '1px solid #ECECF2',
            borderRadius: '10px',
            filter: blurred ? 'blur(8px)' : undefined,
            userSelect: blurred ? 'none' : undefined,
            pointerEvents: blurred ? 'none' : undefined,
          }}
          aria-hidden={blurred}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {bullets.map((b, i) => (
              <li
                key={`b-${i}`}
                style={{
                  position: 'relative',
                  paddingLeft: '20px',
                  fontSize: '14.5px',
                  color: '#1A1A22',
                  lineHeight: 1.6,
                  marginBottom: '10px',
                  fontFamily: 'Figtree, sans-serif',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '4px',
                    top: '8px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#7A6CFF',
                  }}
                />
                {renderInline(b, `b-${i}`)}
              </li>
            ))}
          </ul>
        </div>
        {!blurred && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
            }}
          >
            <CopyButton text={fullText} label="Copy bullets" />
          </div>
        )}
      </div>
    </SectionShell>
  )
}

function PhraseToAvoidSection({ section, blurred }: { section: Section; blurred: boolean }) {
  const text = section.body.trim()
  // Pull first quoted phrase; the rest is the recruiter's reason.
  const match = text.match(/^\s*"([^"]+)"\s*[—–-]?\s*(.*)$/s)
  const phrase = match ? match[1] : text
  const reason = match ? match[2].trim() : ''

  return (
    <SectionShell
      title="The phrase to leave behind"
      accentColor="#FF4F6A"
      eyebrow="Cutting-room floor"
      description="The single most damaging generic phrase in your current profile. Cut it and rewrite around it."
    >
      <div
        style={{
          padding: '18px 22px',
          background: '#FFE4E0',
          border: '1px solid rgba(199,62,90,0.25)',
          borderRadius: '10px',
          filter: blurred ? 'blur(8px)' : undefined,
          userSelect: blurred ? 'none' : undefined,
          pointerEvents: blurred ? 'none' : undefined,
        }}
        aria-hidden={blurred}
      >
        <div
          style={{
            fontSize: '15px',
            color: '#7A1F2E',
            fontStyle: 'italic',
            textDecoration: 'line-through',
            textDecorationColor: 'rgba(199,62,90,0.55)',
            marginBottom: reason ? '10px' : 0,
            fontFamily: 'Figtree, sans-serif',
          }}
        >
          “{phrase}”
        </div>
        {reason && (
          <div style={{ fontSize: '13.5px', color: '#3A3A4A', lineHeight: 1.55 }}>
            {renderInline(reason, 'phrase-reason')}
          </div>
        )}
      </div>
    </SectionShell>
  )
}

// Inline upgrade card for non-members
function InlineUpgradeCard() {
  return (
    <div
      style={{
        margin: '12px 0 36px',
        padding: '28px 32px',
        background: 'linear-gradient(135deg, #1A1A22 0%, #2A1F3D 100%)',
        borderRadius: '14px',
        border: '1.5px solid rgba(108,71,255,0.4)',
        color: '#1A1A22',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#A78BFA',
          marginBottom: '10px',
        }}
      >
        Want the rewrites?
      </div>
      <div style={{ fontSize: '20px', fontWeight: 900, lineHeight: 1.3, marginBottom: '20px' }}>
        That was the recruiter&apos;s read of your reel. Members see the actual rewrites: three headline options, your About section rewritten end-to-end, and your most recent role in impact-driven bullets. All ready to paste.
      </div>
      <div style={{ fontSize: '14px', color: '#8B8AA0', marginBottom: '16px' }}>
        $14.99/mo or $99/yr. Use it on every revision. Cancel anytime.
      </div>
      <StripeCheckoutButton
        style={{
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          border: 'none',
          borderRadius: '10px',
          padding: '14px 24px',
          fontFamily: 'Figtree, sans-serif',
          fontSize: '15px',
          fontWeight: 800,
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Get full access · $14.99/mo or $99/yr
      </StripeCheckoutButton>
    </div>
  )
}

// === Main component ================================================
export function LinkedinReport({ result, isMember }: LinkedinReportProps) {
  const sections = parseSections(result)
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // For non-members: show profileSignals fully, blur the rewrites, drop in
  // the upgrade card right after profileSignals.
  let upgradeRendered = false

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#1A1A22',
        borderRadius: '16px',
        padding: 'clamp(28px, 5vw, 56px)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
        maxWidth: '780px',
        margin: '0 auto',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      {/* Document header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '28px',
          paddingBottom: '18px',
          borderBottom: '2px solid #1A1A22',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#7A6CFF',
              marginBottom: '4px',
            }}
          >
            Recruiter Insight
          </div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#1A1A22', letterSpacing: '-0.02em' }}>
            Your LinkedIn audition reel
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#6B6B7B', textAlign: 'right' }}>
          Read on {today}
          <div style={{ fontSize: '10px', color: '#9494A5', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            hiring.productions
          </div>
        </div>
      </div>

      {(() => {
        // Render the sections in order, but inject "Job 1" / "Job 2" group
        // dividers right before the first section that belongs to each job.
        let job1HeaderDone = false
        let job2HeaderDone = false
        const out: ReactNode[] = []

        sections.forEach((s, i) => {
          const key = `s-${i}`

          // The "What your reel signals" section is always fully visible —
          // it's the read, the hook. Everything else gets blurred for
          // non-members.
          const isProfileSignals = s.kind === 'profileSignals'
          const blurred = !isMember && !isProfileSignals

          // Render group dividers before the first section of each job
          if (!job1HeaderDone && JOB_1_KINDS.includes(s.kind)) {
            job1HeaderDone = true
            out.push(
              <JobGroupDivider
                key={`job1-divider`}
                jobNumber={1}
                title="Get found in recruiter searches"
                why="A recruiter for your target role uses LinkedIn Recruiter to filter from millions of profiles down to a few dozen. None of the rewrites below matter if you don't surface in their results. These are the moves that get you in the search."
                accent="#7A6CFF"
              />,
            )
          }
          if (!job2HeaderDone && JOB_2_KINDS.includes(s.kind)) {
            job2HeaderDone = true
            out.push(
              <JobGroupDivider
                key={`job2-divider`}
                jobNumber={2}
                title="Be compelling once a recruiter clicks through"
                why="A recruiter spends six to fifteen seconds on your profile before deciding whether to send InMail. These rewrites are what land that decision."
                accent="#FF4F6A"
              />,
            )
          }

          let element: ReactNode = null
          switch (s.kind) {
            case 'profileSignals':
              element = <ProfileSignalsSection key={key} section={s} />
              break
            case 'searchKeywords':
              element = <SearchKeywordsSection key={key} section={s} blurred={blurred} />
              break
            case 'skillsToAdd':
              element = <SkillsToAddSection key={key} section={s} blurred={blurred} />
              break
            case 'headlineOptions':
              element = <HeadlineOptionsSection key={key} section={s} blurred={blurred} />
              break
            case 'settingsToCheck':
              element = <SettingsToCheckSection key={key} section={s} blurred={blurred} />
              break
            case 'aboutSection':
              element = <AboutSectionRender key={key} section={s} blurred={blurred} />
              break
            case 'recentRole':
              element = <RecentRoleSection key={key} section={s} blurred={blurred} />
              break
            case 'recommendationsStrategy':
              element = <RecommendationsStrategySection key={key} section={s} blurred={blurred} />
              break
            case 'phraseToAvoid':
              element = <PhraseToAvoidSection key={key} section={s} blurred={blurred} />
              break
            default:
              element = null
          }

          // Drop the upgrade card right after profileSignals for non-members
          if (!isMember && isProfileSignals && !upgradeRendered) {
            upgradeRendered = true
            out.push(
              <div key={`${key}-wrap`}>
                {element}
                <InlineUpgradeCard />
              </div>,
            )
          } else {
            out.push(element)
          }
        })

        return out
      })()}

      {/* RepVera bridge — members see this; non-members see the upgrade card */}
      {isMember && <RepveraBridge source="linkedin" variant="light" />}

      {/* Share — sits at the end so visitors leave on the ask to spread
          what they learned. Pre-written LinkedIn post they can edit
          before sending. */}
      <ShareResult source="linkedin" variant="light" />

      {/* Document footer */}
      <div
        style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #ECECF2',
          fontSize: '11px',
          color: '#9494A5',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          textAlign: 'center',
        }}
      >
        End of report · Stephanie Murray, hiring.productions
      </div>
    </div>
  )
}
