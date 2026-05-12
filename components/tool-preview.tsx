'use client'

import type { PreviewKind } from '@/lib/tools-catalog'
import { legacyThemeToTheme } from '@/lib/tool-themes'
import type { ToolTheme } from '@/lib/tools-catalog'

/**
 * Bold, single-statement previews. One dominant visual per card —
 * not a stack of debug-log lines. Themed to match the tool's color.
 */

interface Props {
  kind: PreviewKind
  theme: ToolTheme
  /** Featured cards get a taller, more dramatic preview */
  featured?: boolean
}

export function ToolPreview({ kind, theme, featured = false }: Props) {
  const t = legacyThemeToTheme(theme)

  const wrapper: React.CSSProperties = {
    width: '100%',
    aspectRatio: featured ? '5 / 3' : '16 / 9',
    background: t.previewBg,
    borderRadius: '12px',
    border: `1px solid ${t.border}`,
    padding: featured ? '24px' : '20px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Figtree', sans-serif",
    position: 'relative',
  }

  const eyebrowStyle: React.CSSProperties = {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 700,
    fontSize: featured ? '11px' : '10px',
    letterSpacing: '0.14em',
    color: t.accent,
    textTransform: 'uppercase',
    marginBottom: featured ? '14px' : '10px',
    opacity: 0.85,
  }

  const bigStat: React.CSSProperties = {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 900,
    fontSize: featured ? 'clamp(36px, 4vw, 56px)' : 'clamp(28px, 3vw, 40px)',
    letterSpacing: '-0.03em',
    color: '#F2F0FF',
    lineHeight: 1,
  }

  switch (kind) {
    case 'recruiter-monologue':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>0:06 — DECISION</div>
          <div style={{ ...bigStat, color: t.primary, marginBottom: 8 }}>YES</div>
          <div
            style={{
              ...quoteStyle(featured),
              borderLeftColor: t.accent,
              color: '#C9C7DA',
            }}
          >
            “…with a question mark on the gap.”
          </div>
        </div>
      )

    case 'boolean-string':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>LINKEDIN RECRUITER · search</div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
              fontSize: featured ? '14px' : '12px',
              color: '#F2F0FF',
              lineHeight: 1.55,
              background: 'rgba(0,0,0,0.35)',
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: '12px 14px',
              marginTop: 'auto',
            }}
          >
            <span style={{ color: t.primary }}>(</span>"Sr PM" <span style={{ color: t.accent }}>OR</span> "Senior Product"<span style={{ color: t.primary }}>)</span>
            {featured ? '\n  ' : ' '}<span style={{ color: t.accent }}>AND</span> "B2B SaaS"
          </div>
          <div style={{ ...microNote(featured), color: t.primary, marginTop: 8 }}>
            ↳ 0 results for your profile
          </div>
        </div>
      )

    case 'linkedin-rewrite':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>HEADLINE — BEFORE / AFTER</div>
          <div
            style={{
              ...beforeText(featured),
            }}
          >
            Senior Product Manager | Tech Industry
          </div>
          <div style={arrowDown(t.accent)}>↓</div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: featured ? '17px' : '15px',
              color: t.accent,
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            B2B SaaS PM · Scaled paid users 4× at Series C
          </div>
        </div>
      )

    case 'interview-question':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>QUESTION 4 of 10</div>
          <div style={{ ...questionLine(featured) }}>
            “Tell me about a time you missed a deadline.”
          </div>
          <div style={{ ...microNote(featured), color: t.accent, marginTop: 'auto' }}>
            ↳ what they’re assessing: <strong style={{ color: t.primary }}>ownership</strong>
          </div>
        </div>
      )

    case 'question-decode':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>WHAT THEY ASKED</div>
          <div style={{ ...questionLine(featured) }}>“What’s your biggest weakness?”</div>
          <div style={arrowDown(t.accent)}>↓</div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: featured ? '17px' : '15px',
              color: t.accent,
              lineHeight: 1.3,
            }}
          >
            Will you cause problems on my team?
          </div>
        </div>
      )

    case 'jd-decode':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>JD — TRANSLATED</div>
          <Translation phrase="“fast-paced”" reveal="understaffed" color={t.primary} featured={featured} />
          <Translation phrase="“wear many hats”" reveal="no clear scope" color={t.primary} featured={featured} />
          <Translation phrase="“competitive comp”" reveal="below market" color={t.primary} featured={featured} />
        </div>
      )

    case 'ai-score':
      return (
        <div style={{ ...wrapper, justifyContent: 'center', alignItems: 'center' }}>
          <div style={eyebrowStyle}>AI-LIKELIHOOD</div>
          <div
            style={{
              ...bigStat,
              color: t.primary,
              fontSize: featured ? 'clamp(64px, 6vw, 92px)' : 'clamp(54px, 5vw, 72px)',
            }}
          >
            74<span style={{ fontSize: '0.45em', opacity: 0.7, marginLeft: 4 }}>%</span>
          </div>
          <div style={{ ...microNote(featured), color: t.primary, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            FLAGGED · 4 lines
          </div>
        </div>
      )

    case 'keyword-gap':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>MISSING FROM YOUR RESUME</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {['GTM strategy', 'OKR planning', 'cross-functional', 'roadmap', 'B2B SaaS'].map((kw) => (
              <span
                key={kw}
                style={{
                  display: 'inline-block',
                  background: 'rgba(0,0,0,0.30)',
                  border: `1px solid ${t.border}`,
                  color: t.accent,
                  padding: featured ? '6px 12px' : '5px 10px',
                  borderRadius: 999,
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: featured ? '13px' : '11px',
                  fontWeight: 700,
                }}
              >
                {kw}
              </span>
            ))}
          </div>
          <div style={{ ...microNote(featured), color: t.primary, marginTop: 'auto' }}>
            ↳ 5 missing — 3 are must-haves
          </div>
        </div>
      )

    case 'negotiation-script':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>YOUR OPENING LINE</div>
          <div
            style={{
              ...quoteStyle(featured),
              borderLeftColor: t.accent,
              color: '#F2F0FF',
              fontStyle: 'italic',
            }}
          >
            “Thank you. The median for this role in NYC is $185K. Can we get there?”
          </div>
          <div style={{ ...microNote(featured), color: t.primary, marginTop: 'auto' }}>
            ↳ ask: <strong>$185K base</strong>
          </div>
        </div>
      )

    case 'search-diagnosis':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>DIAGNOSIS</div>
          <div
            style={{
              ...bigStat,
              fontSize: featured ? '32px' : '24px',
              color: t.primary,
              marginBottom: 8,
            }}
          >
            Volume-over-targeting
          </div>
          <div style={{ fontSize: featured ? '14px' : '12px', color: '#C9C7DA', lineHeight: 1.5, marginBottom: 8 }}>
            ATS filters out everyone who looks generic.
          </div>
          <div style={{ ...microNote(featured), color: t.accent, marginTop: 'auto', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
            FIX → 10 target companies, 2 days
          </div>
        </div>
      )

    case 'culture-decode':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>WHAT THEIR COPY ACTUALLY SAYS</div>
          <Translation phrase="“we’re a family”" reveal="late-night Slack" color={t.primary} featured={featured} />
          <Translation phrase="“ownership”" reveal="no specs" color={t.primary} featured={featured} />
          <Translation phrase="“high standards”" reveal="hard to leave on time" color={t.primary} featured={featured} />
        </div>
      )

    case 'pitch-rewrite':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>VERSION 2 — INTERVIEW</div>
          <div
            style={{
              ...quoteStyle(featured),
              borderLeftColor: t.accent,
              color: '#F2F0FF',
              fontStyle: 'italic',
            }}
          >
            “I’m a B2B PM. Last two years I scaled paid signups 4× at a Series C. I’m looking for the next zero-to-one.”
          </div>
        </div>
      )

    case 'platform-rank':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>YOUR REAL RESPONSE RATES</div>
          <Bar label="Google Jobs" pct={11.3} color={t.primary} featured={featured} />
          <Bar label="LinkedIn" pct={3.1} color={t.primary} featured={featured} />
          <Bar label="Indeed" pct={2.4} color={t.primary} featured={featured} />
          <Bar label="ZipRecruiter" pct={1.6} color={t.primary} featured={featured} />
        </div>
      )

    case 'ats-score':
      return (
        <div style={{ ...wrapper, justifyContent: 'center', alignItems: 'center' }}>
          <div style={eyebrowStyle}>ATS SCORE</div>
          <div
            style={{
              ...bigStat,
              color: t.primary,
              fontSize: featured ? 'clamp(64px, 6vw, 92px)' : 'clamp(54px, 5vw, 72px)',
            }}
          >
            68<span style={{ fontSize: '0.4em', opacity: 0.6, marginLeft: 4 }}>/100</span>
          </div>
          <div style={{ ...microNote(featured), color: t.accent, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            3 fixes will get you to 90+
          </div>
        </div>
      )

    case 'jd-seo-score':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>JD VISIBILITY · BY PLATFORM</div>
          <Bar label="Indeed" pct={42} color={t.primary} featured={featured} />
          <Bar label="LinkedIn" pct={28} color={t.primary} featured={featured} />
          <Bar label="Google for Jobs" pct={15} color={t.primary} featured={featured} />
          <Bar label="ZipRecruiter" pct={9} color={t.primary} featured={featured} />
        </div>
      )

    case 'jd-mirror':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>WHY THEY CLICK AWAY</div>
          <FlagLine text="No salary range." color={t.primary} featured={featured} />
          <FlagLine text="“11 years required” at IC level." color={t.primary} featured={featured} />
          <FlagLine text="No remote signal anywhere." color={t.primary} featured={featured} />
        </div>
      )

    case 'ai-candidate-flag':
      return (
        <div style={{ ...wrapper, justifyContent: 'center', alignItems: 'center' }}>
          <div style={eyebrowStyle}>AI-GENERATED?</div>
          <div
            style={{
              ...bigStat,
              color: t.primary,
              fontSize: featured ? 'clamp(64px, 6vw, 92px)' : 'clamp(54px, 5vw, 72px)',
            }}
          >
            84<span style={{ fontSize: '0.45em', opacity: 0.7, marginLeft: 4 }}>%</span>
          </div>
          <div style={{ ...microNote(featured), color: t.primary, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            HIGH CONFIDENCE · 3 tells
          </div>
        </div>
      )

    case 'evaluation-rubric':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>SCORECARD — 5 SIGNALS</div>
          <RubricLine text="Ownership story" mark="✓" color="#5EE6A8" featured={featured} />
          <RubricLine text="Technical depth" mark="?" color={t.accent} featured={featured} />
          <RubricLine text="Stakeholder mgmt" mark="✕" color={t.primary} featured={featured} />
          <RubricLine text="Pace & resilience" mark="✓" color="#5EE6A8" featured={featured} />
        </div>
      )

    case 'interviewer-prep':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>BRIEF YOUR PANEL</div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: featured ? '17px' : '15px',
              color: '#F2F0FF',
              lineHeight: 1.4,
            }}
          >
            3 things to assess. 2 questions each. The trap to watch for.
          </div>
          <div style={{ ...microNote(featured), color: t.accent, marginTop: 'auto' }}>
            ↳ ready in 4 minutes
          </div>
        </div>
      )

    case 'sourcing-string':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>READY TO PASTE</div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
              fontSize: featured ? '14px' : '12px',
              color: '#F2F0FF',
              lineHeight: 1.55,
              background: 'rgba(0,0,0,0.30)',
              border: `1px solid ${t.border}`,
              borderRadius: 8,
              padding: '12px 14px',
              marginTop: 'auto',
            }}
          >
            (RN <span style={{ color: t.accent }}>OR</span> "Registered Nurse")
            {featured ? '\n  ' : ' '}<span style={{ color: t.accent }}>AND</span> "behavioral health"
          </div>
        </div>
      )

    case 'outreach-message':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>THE FIRST LINE</div>
          <div
            style={{
              ...quoteStyle(featured),
              borderLeftColor: t.accent,
              color: '#F2F0FF',
              fontStyle: 'italic',
            }}
          >
            “Saw your work on the Brightside scale-up — we’re tackling something similar at X.”
          </div>
          <div style={{ ...microNote(featured), color: t.primary, marginTop: 'auto' }}>
            ↳ <strong>3.4× higher response rate</strong>
          </div>
        </div>
      )

    case 'process-audit':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>WHERE THEY DROP OUT</div>
          <Bar label="Application" pct={92} color="#5EE6A8" featured={featured} />
          <Bar label="Phone screen" pct={61} color={t.accent} featured={featured} />
          <Bar label="Onsite" pct={28} color={t.primary} featured={featured} />
          <Bar label="Offer" pct={9} color={t.primary} featured={featured} />
        </div>
      )

    case 'day-one-plan':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>WEEK 1 — THE READ</div>
          <RubricLine text="Mon · Laptop, Slack, coffee chat" mark="✓" color="#5EE6A8" featured={featured} />
          <RubricLine text="Tue · No clear owner intro" mark="✕" color={t.primary} featured={featured} />
          <RubricLine text="Fri · First 1:1 — too late" mark="✕" color={t.primary} featured={featured} />
        </div>
      )

    case 'offer-read':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>HOW IT LANDS</div>
          <Translation phrase="Base" reveal="below their bar" color={t.primary} featured={featured} />
          <Translation phrase="Equity" reveal="opaque vesting" color={t.primary} featured={featured} />
          <Translation phrase="Start date" reveal="too aggressive" color={t.primary} featured={featured} />
        </div>
      )

    case 'gap-explainer':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>3 SCRIPTS · 1 GAP</div>
          <RubricLine text="Resume one-liner" mark="1" color={t.accent} featured={featured} />
          <RubricLine text="Cover letter version" mark="2" color={t.accent} featured={featured} />
          <RubricLine text="Interview answer (30 sec)" mark="3" color={t.accent} featured={featured} />
        </div>
      )

    case 'new-grad-resume':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>SECTION-BY-SECTION</div>
          <RubricLine text="Education — top of page" mark="✓" color="#5EE6A8" featured={featured} />
          <RubricLine text="Projects > unrelated jobs" mark="✓" color="#5EE6A8" featured={featured} />
          <RubricLine text="Skip the generic summary" mark="✕" color={t.primary} featured={featured} />
        </div>
      )

    case 'career-pivot':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>BEFORE / AFTER</div>
          <div
            style={{
              ...beforeText(featured),
              fontSize: featured ? '13px' : '11px',
            }}
          >
            “Managed a portfolio of client accounts.”
          </div>
          <div style={arrowDown(t.accent)}>↓</div>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: featured ? '14px' : '12px',
              color: t.accent,
              lineHeight: 1.4,
            }}
          >
            “Built stakeholder relationships across 12 cross-functional product launches.”
          </div>
        </div>
      )

    case 'scam-flags':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>RED FLAGS DETECTED</div>
          <FlagLine text="“Text us on Telegram” — never legit." color={t.primary} featured={featured} />
          <FlagLine text="$60/hr, no experience, no website." color={t.primary} featured={featured} />
          <FlagLine text="“Hiring manager” has 12 LinkedIn connections." color={t.primary} featured={featured} />
        </div>
      )

    case 'ghost-diagnosis':
      return (
        <div style={wrapper}>
          <div style={eyebrowStyle}>VERDICT</div>
          <div
            style={{
              ...bigStat,
              fontSize: featured ? '30px' : '22px',
              color: t.primary,
              marginBottom: 8,
              lineHeight: 1.05,
            }}
          >
            Probably still in process.
          </div>
          <div style={{ ...microNote(featured), color: t.accent, marginTop: 'auto' }}>
            ↳ send the 2-sentence follow-up
          </div>
        </div>
      )

    default:
      return <div style={wrapper} />
  }
}

// =====================================================================
// Internal building blocks
// =====================================================================

function quoteStyle(featured: boolean): React.CSSProperties {
  return {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 500,
    fontSize: featured ? '15.5px' : '13px',
    lineHeight: 1.5,
    paddingLeft: 14,
    borderLeft: '3px solid',
  }
}

function microNote(featured: boolean): React.CSSProperties {
  return {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 700,
    fontSize: featured ? '12px' : '11px',
    letterSpacing: '0.02em',
  }
}

function beforeText(featured: boolean): React.CSSProperties {
  return {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 500,
    fontSize: featured ? '14px' : '12px',
    color: '#6B6A82',
    textDecoration: 'line-through',
    lineHeight: 1.4,
  }
}

function questionLine(featured: boolean): React.CSSProperties {
  return {
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 700,
    fontSize: featured ? '20px' : '16px',
    color: '#F2F0FF',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  }
}

function arrowDown(color: string): React.CSSProperties {
  return {
    fontFamily: "'Figtree', sans-serif",
    color,
    fontSize: 14,
    fontWeight: 800,
    margin: '6px 0',
  }
}

function Translation({
  phrase,
  reveal,
  color,
  featured,
}: {
  phrase: string
  reveal: string
  color: string
  featured: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginBottom: featured ? 10 : 7,
        fontSize: featured ? '14px' : '12px',
      }}
    >
      <span style={{ color: '#8B8AA0', fontFamily: "'Figtree', sans-serif" }}>{phrase}</span>
      <span style={{ color: '#6B6A82', fontFamily: "'Figtree', sans-serif" }}>→</span>
      <span style={{ color, fontFamily: "'Figtree', sans-serif", fontWeight: 700, textAlign: 'right' }}>
        {reveal}
      </span>
    </div>
  )
}

function FlagLine({ text, color, featured }: { text: string; color: string; featured: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        marginBottom: featured ? 8 : 6,
        fontSize: featured ? '14px' : '12px',
      }}
    >
      <span
        style={{
          color,
          fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
          fontWeight: 700,
        }}
      >
        ✕
      </span>
      <span style={{ color: '#F2F0FF', fontFamily: "'Figtree', sans-serif" }}>{text}</span>
    </div>
  )
}

function RubricLine({
  text,
  mark,
  color,
  featured,
}: {
  text: string
  mark: string
  color: string
  featured: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        marginBottom: featured ? 8 : 6,
        fontSize: featured ? '14px' : '12px',
      }}
    >
      <span
        style={{
          color,
          fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
          fontWeight: 700,
          minWidth: 14,
        }}
      >
        {mark}
      </span>
      <span style={{ color: '#F2F0FF', fontFamily: "'Figtree', sans-serif" }}>{text}</span>
    </div>
  )
}

function Bar({
  label,
  pct,
  color,
  featured,
}: {
  label: string
  pct: number
  color: string
  featured: boolean
}) {
  return (
    <div style={{ marginBottom: featured ? 8 : 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: featured ? '12px' : '10.5px',
            color: '#C9C7DA',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: featured ? '12px' : '10.5px',
            color,
            fontWeight: 800,
          }}
        >
          {pct.toFixed(1)}%
        </span>
      </div>
      <div style={{ height: featured ? 6 : 4, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
        <div
          style={{
            width: `${Math.min(pct * 6, 100)}%`,
            height: '100%',
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  )
}
