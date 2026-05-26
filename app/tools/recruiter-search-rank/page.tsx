'use client'

import { useState, useRef, useEffect } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ToolSamplePreview } from '@/components/tool-sample-preview'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { RankRevealCard } from '@/components/rank-reveal-card'
import { ResultNextSteps } from '@/components/result-next-steps'
import { UnlockPrescriptionCard } from '@/components/unlock-prescription-card'
import { FounderByline } from '@/components/founder-byline'
import { useStageRotation } from '@/lib/use-stage-rotation'
import { FileText, Upload } from 'lucide-react'

// Theatrical stages cycled through while the simulator is running. Roughly
// matches the real beats happening server-side (read PDF → generate queries
// → score → rank moves) so the storytelling doesn't feel decorative.
const RUNNING_STAGES = [
  'Lights up. Reading your profile…',
  'Casting the searches a recruiter would run…',
  'Recruiter takes the seat…',
  'Running the boolean strings…',
  'Scoring your rank in each search…',
  'Ranking the highest-leverage moves…',
  'Putting the call sheet together…',
] as const

export default function RecruiterSearchRankPage() {
  const [profileText, setProfileText] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')
  const [pdfUploading, setPdfUploading] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [targetGeo, setTargetGeo] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  // Open-to-Work and Activity level aren't in the LinkedIn PDF export
  // (the PDF is a static content snapshot — these are dynamic profile
  // state). Without them the ranking model has to guess on signals that
  // recruiters explicitly filter on. Both default to 'unknown' so an
  // honest user who isn't sure still gets a calibrated result.
  const [openToWork, setOpenToWork] = useState<'unknown' | 'recruiters-only' | 'public-frame' | 'no'>('unknown')
  const [activityLevel, setActivityLevel] = useState<'unknown' | 'weekly' | 'monthly' | 'passive' | 'inactive'>('unknown')
  const [result, setResult] = useState('')
  // Tracks whether the just-returned result was server-redacted for a
  // non-Pro tier — drives the UnlockPrescriptionCard at the bottom of
  // the result. Pro users get the full text and never see the card.
  const [redacted, setRedacted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formTopRef = useRef<HTMLDivElement>(null)

  // Pre-fill the targetRole field from the ?role= query param. This is
  // how the /rank/[role] SEO landing pages route into the simulator —
  // a Google visitor lands on /rank/product-manager, clicks "Show me
  // where I rank", and arrives here with "Senior Product Manager at a
  // B2B SaaS" already in the input. One less step before they upload
  // their PDF.
  //
  // Reading from window.location.search directly (rather than via
  // useSearchParams) sidesteps Next.js 16's Suspense-boundary
  // requirement during static prerender — the effect only runs after
  // hydration, where `window` is defined.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const roleParam = params.get('role')
    if (roleParam) {
      setTargetRole((current) => (current ? current : roleParam))
    }
  }, [])

  // Reset for "Run for a different role" — keeps the uploaded profile so
  // the user doesn't have to re-upload, clears the result, and scrolls
  // them back to the form. This is the primary dwell-time lever; every
  // second run is another minute on site.
  const handleRunAgain = () => {
    setResult('')
    setRedacted(false)
    setError('')
    setTargetRole('')
    setJobDescription('')
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const runningStage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [profileText, targetRole].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const uploadPdf = async (file: File) => {
    setPdfError('')
    setPdfUploading(true)
    setProfileText('')
    setPdfFileName('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setPdfError(data.error || 'Could not read this PDF.')
      } else {
        setProfileText(data.text)
        setPdfFileName(file.name)
      }
    } catch {
      setPdfError('Upload failed. Try again in a moment.')
    } finally {
      setPdfUploading(false)
    }
  }

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      setPdfError('That file isn’t a PDF. Export your LinkedIn profile as a PDF and try again.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPdfError('PDF is over 5 MB. That’s usually a sign the export included extra pages — try saving again.')
      return
    }
    uploadPdf(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Upload your LinkedIn PDF and enter a target role.')
      return
    }
    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'recruiter-search-rank',
          inputs: {
            profileText,
            targetRole,
            ...(targetGeo.trim() && { targetGeo }),
            ...(jobDescription.trim() && { jobDescription }),
            // These two come from the form pills below the PDF upload —
            // they capture profile state the LinkedIn PDF export
            // doesn't include but recruiters explicitly filter on.
            // Pass through whenever the user actually picked a value
            // (skip the default 'unknown' so the prompt knows when to
            // gracefully omit the signal).
            ...(openToWork !== 'unknown' && { openToWork }),
            ...(activityLevel !== 'unknown' && { activityLevel }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to run the visibility check')
      } else {
        setResult(data.result)
        setRedacted(Boolean(data.redacted))
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #ECECF2',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '15px',
    color: '#1A1A22',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Where Do You Rank in a Recruiter Search?"
      toolDescription="Drop your LinkedIn profile PDF. See the 5 boolean searches a recruiter for your target role would actually run — and your estimated rank in each."
      category="candidate"
      isFree={true}
    >
      <div ref={formTopRef} style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <ToolSamplePreview
          eyebrow="A sample of what comes back"
          statNumber="#47"
          statCaption="Sample average rank for a Senior PM across 5 recruiter searches — before three small fixes."
          snippets={[
            {
              label: '“Senior PM” AND SaaS',
              text: '#31 — your headline is a near-match on the first 60 chars.',
            },
            {
              label: '“Product Manager” AND B2B AND growth',
              text: '#52 — your About front-loads function but skills are thin.',
            },
            {
              label: 'Top move:',
              text: 'Add "B2B SaaS" to your headline. Climbs your rank in 4 of 5 searches.',
            },
          ]}
          note="Sample. Yours will be specific to your LinkedIn profile and target role."
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        {/* PDF UPLOAD */}
        <RequiredLabel
          label="1. Your LinkedIn profile (export to PDF, drop below)"
          filled={!!profileText.trim()}
          first
        />
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${
              profileText
                ? '#5EE6A8'
                : isDragging
                ? '#6C47FF'
                : 'rgba(255,255,255,0.18)'
            }`,
            borderRadius: '12px',
            padding: '32px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragging
              ? 'rgba(108,71,255,0.06)'
              : profileText
              ? 'rgba(94,230,168,0.06)'
              : 'rgba(255,255,255,0.02)',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
          {pdfUploading ? (
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                color: '#A78BFA',
              }}
            >
              Reading your profile…
            </div>
          ) : profileText && pdfFileName ? (
            <div>
              <FileText
                size={28}
                color="#5EE6A8"
                strokeWidth={1.8}
                style={{ marginBottom: '10px' }}
              />
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#1A1A22',
                  marginBottom: '6px',
                }}
              >
                {pdfFileName}
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12px',
                  color: '#5EE6A8',
                }}
              >
                Parsed · {profileText.length.toLocaleString()} characters of profile text
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12px',
                  color: '#8B8AA0',
                  marginTop: '10px',
                }}
              >
                Click to replace
              </div>
            </div>
          ) : (
            <div>
              <Upload
                size={28}
                color="#A78BFA"
                strokeWidth={1.8}
                style={{ marginBottom: '10px' }}
              />
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#1A1A22',
                  marginBottom: '14px',
                }}
              >
                Drop your LinkedIn PDF here, or click to upload
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12.5px',
                  color: '#5A5A6E',
                  lineHeight: 1.7,
                  textAlign: 'left',
                  maxWidth: '440px',
                  margin: '0 auto',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ fontWeight: 700, color: '#5A5A6E', marginBottom: '6px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  How to export your profile (10 seconds)
                </div>
                <div>
                  <strong style={{ color: '#1A1A22' }}>1.</strong> Open{' '}
                  <a
                    href="https://www.linkedin.com/in/me"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#A78BFA', textDecoration: 'underline' }}
                  >
                    your LinkedIn profile
                  </a>{' '}
                  in a new tab.
                </div>
                <div>
                  <strong style={{ color: '#1A1A22' }}>2.</strong> Click the{' '}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.4)',
                      fontSize: '11px',
                      fontWeight: 800,
                      verticalAlign: 'middle',
                      margin: '0 2px',
                      color: '#1A1A22',
                      letterSpacing: '1px',
                    }}
                  >
                    ⋯
                  </span>{' '}
                  button (next to <em>Open to</em> / <em>Add section</em>).
                </div>
                <div>
                  <strong style={{ color: '#1A1A22' }}>3.</strong> Pick{' '}
                  <strong style={{ color: '#1A1A22' }}>Save to PDF</strong>. It
                  downloads to your computer automatically.
                </div>
                <div>
                  <strong style={{ color: '#1A1A22' }}>4.</strong> Drag the file
                  here, or click to choose it.
                </div>
              </div>
            </div>
          )}
        </div>
        {pdfError && (
          <div
            style={{
              marginTop: '8px',
              padding: '10px 14px',
              background: 'rgba(255,79,106,0.08)',
              border: '1px solid rgba(255,79,106,0.25)',
              borderRadius: 8,
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: '#FF8FA3',
              lineHeight: 1.5,
            }}
          >
            {pdfError}
          </div>
        )}

        {/* TARGET ROLE */}
        <RequiredLabel
          label="2. The role you want recruiters to find you for"
          filled={!!targetRole.trim()}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Product Manager at a B2B SaaS · Director of TA at a healthcare company · Senior UX Designer"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* TARGET GEO — OPTIONAL */}
        <RequiredLabel
          label="Your target geography"
          filled={!!targetGeo.trim()}
          required={false}
        />
        <input
          type="text"
          value={targetGeo}
          onChange={(e) => setTargetGeo(e.target.value)}
          placeholder="Optional. e.g. New York metro · San Francisco Bay Area · Remote US"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* JOB DESCRIPTION — OPTIONAL */}
        <RequiredLabel
          label="A specific job description you’re targeting"
          filled={!!jobDescription.trim()}
          required={false}
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Optional but useful. Paste a real JD and we’ll reverse-engineer one query directly from its must-have keywords."
          rows={4}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* OPEN-TO-WORK — OPTIONAL
            Profile-state signal LinkedIn weighs at ~5% and not in the
            PDF. "Recruiters Only" mode boosts active-candidate
            searches; the public green frame helps active-candidate
            search but quietly hurts passive-candidate search at some
            firms. */}
        <RequiredLabel
          label="Your Open to Work status"
          filled={openToWork !== 'unknown'}
          required={false}
        />
        <PillToggle
          value={openToWork}
          onChange={setOpenToWork}
          options={[
            { value: 'unknown', label: 'Skip' },
            { value: 'recruiters-only', label: 'Yes — recruiters only' },
            { value: 'public-frame', label: 'Yes — green frame' },
            { value: 'no', label: 'Not set' },
          ]}
        />

        {/* ACTIVITY LEVEL — OPTIONAL
            Powers LinkedIn's "More Likely to Respond" recruiter filter.
            Active profiles get a small but real ranking boost in
            passive-candidate searches as of 2025-2026. */}
        <RequiredLabel
          label="How active are you on LinkedIn?"
          filled={activityLevel !== 'unknown'}
          required={false}
        />
        <PillToggle
          value={activityLevel}
          onChange={setActivityLevel}
          options={[
            { value: 'unknown', label: 'Skip' },
            { value: 'weekly', label: 'Posting weekly' },
            { value: 'monthly', label: 'Posting monthly' },
            { value: 'passive', label: 'Read-only' },
            { value: 'inactive', label: 'Mostly inactive' },
          ]}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
            background: !canSubmit
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: !canSubmit ? '1px solid rgba(255,255,255,0.10)' : 'none',
            borderRadius: '10px',
            padding: '15px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            color: !canSubmit ? '#6B6A82' : 'white',
            cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? runningStage
            : !canSubmit
            ? `Fill ${2 - filledRequired} more required field${
                2 - filledRequired === 1 ? '' : 's'
              }`
            : result
            ? 'Run again with updated inputs'
            : 'Show me where I rank'}
        </button>

        {error && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(255,79,106,0.3)',
              borderRadius: '10px',
              padding: '16px 20px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: '#FF4F6A',
              marginTop: '12px',
            }}
          >
            {error}
          </div>
        )}
      </div>

      {result && (
        <div
          style={{
            marginTop: '40px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 40px',
          }}
        >
          {/* The recognition moment — visual rank reveal above the full
              markdown. Built to be screenshot-worthy on its own. */}
          <RankRevealCard result={result} targetRole={targetRole || 'your target role'} />

          <ToolResult result={result} cta={null} />

          {/* If this was a free-tier (redacted) run, the unlock card is
              the conversion moment — it names exactly what's behind the
              paywall and triggers Stripe checkout. Pro members get the
              full text inline and never see this card. */}
          {redacted && <UnlockPrescriptionCard />}

          <ProUpsellPanel
            recommend={['Your LinkedIn, Rewritten', 'Through a Recruiter’s Eyes']}
            heading="Now ship the moves. Rewrite your headline, About, and recent roles to climb every search at once."
          />

          {/* What-now navigation — drives second tool runs + LinkedIn/X
              share. Designed to turn a single result page into 5+ minutes
              on the site by giving every visitor an obvious next click. */}
          <ResultNextSteps
            shareSummary={buildShareSummary(result, targetRole)}
            onRunAgain={handleRunAgain}
          />

          {/* Founder byline below the result — captures the user at the
              moment they've just received value and are most receptive to
              wanting "more from her." LinkedIn follow CTA inside builds
              audience for the segment that won't pay today but
              will engage with weekly recruiter content. */}
          <div style={{ marginTop: 32 }}>
            <FounderByline />
          </div>
        </div>
      )}
    </ToolPageShell>
  )
}

/**
 * Parses the result for the rank number + search count and builds a
 * short, shareable sentence for the LinkedIn / X / copy buttons. Falls
 * back to a generic line if parsing fails (model drift, etc.).
 */
function buildShareSummary(result: string, targetRole: string): string {
  const bandPattern = /Estimated rank:\s*(\d+)\s*[-–—]\s*(\d+)/gi
  const midpoints: number[] = []
  let m: RegExpExecArray | null
  while ((m = bandPattern.exec(result)) !== null) {
    const low = parseInt(m[1], 10)
    const high = parseInt(m[2], 10)
    if (!Number.isNaN(low) && !Number.isNaN(high)) {
      midpoints.push((low + high) / 2)
    }
  }
  if (midpoints.length === 0) {
    return 'I just saw exactly where I rank when recruiters search LinkedIn for my role. The simulator is built by a senior TA director — free to try.'
  }
  const avg = Math.round(midpoints.reduce((a, b) => a + b, 0) / midpoints.length)
  const role = targetRole.trim() || 'my target role'
  return `Just ran the recruiter-search simulator on my LinkedIn profile — average rank #${avg} across ${midpoints.length} searches a recruiter for ${role} would actually run. Built by a senior TA director. Free.`
}

/**
 * Small pill-toggle for optional categorical inputs (Open-to-Work,
 * Activity Level). Kept inline rather than promoted to a shared
 * component because the two uses here are the only ones today and
 * the component is short enough that the indirection would cost more
 * than it saves.
 */
type PillToggleProps<T extends string> = {
  value: T
  onChange: (next: T) => void
  options: ReadonlyArray<{ value: T; label: string }>
}

function PillToggle<T extends string>({ value, onChange, options }: PillToggleProps<T>) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 4,
      }}
    >
      {options.map((option) => {
        const selected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            style={{
              padding: '9px 14px',
              borderRadius: 100,
              border: selected
                ? '1.5px solid rgba(167,139,250,0.55)'
                : '1px solid rgba(255,255,255,0.10)',
              background: selected ? 'rgba(108,71,255,0.18)' : 'rgba(255,255,255,0.03)',
              color: selected ? '#F2F0FF' : '#9D9CB3',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
