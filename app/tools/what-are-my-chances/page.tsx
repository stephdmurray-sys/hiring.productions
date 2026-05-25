'use client'

import { useState, useRef } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ToolSamplePreview } from '@/components/tool-sample-preview'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { UnlockPrescriptionCard } from '@/components/unlock-prescription-card'
import { FounderByline } from '@/components/founder-byline'
import { ResultNextSteps } from '@/components/result-next-steps'
import { useStageRotation } from '@/lib/use-stage-rotation'
import { FileText, Upload } from 'lucide-react'

const RUNNING_STAGES = [
  'Reading your resume…',
  'Reading the job description…',
  'Matching your signal against the must-haves…',
  'Modeling how a recruiter screens this stack…',
  'Calibrating your odds…',
  'Putting the verdict together…',
] as const

export default function WhatAreMyChancesPage() {
  const [resumeText, setResumeText] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')
  const [pdfUploading, setPdfUploading] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState('')
  const [redacted, setRedacted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formTopRef = useRef<HTMLDivElement>(null)

  const handleRunAgain = () => {
    setResult('')
    setRedacted(false)
    setError('')
    setJobDescription('')
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const runningStage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [resumeText, jobDescription].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const uploadPdf = async (file: File) => {
    setPdfError('')
    setPdfUploading(true)
    setResumeText('')
    setPdfFileName('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('kind', 'resume')
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setPdfError(data.error || 'Could not read this PDF.')
      } else {
        setResumeText(data.text)
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
      setPdfError('That file isn’t a PDF. Export your resume as a PDF and try again.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPdfError('PDF is over 5 MB. Try resaving it as a standard resume PDF.')
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
      setError('Upload your resume PDF and paste the job description.')
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
          toolId: 'what-are-my-chances',
          inputs: {
            resumeText,
            jobDescription,
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to calculate your chances')
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
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '15px',
    color: '#F2F0FF',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '180px',
    lineHeight: 1.5,
    fontFamily: "'Figtree', sans-serif",
  }

  const chancePercent = result ? parseChancePercent(result) : null

  return (
    <ToolPageShell
      toolName="What Are My Chances?"
      toolDescription="Drop your resume. Paste the job. See the honest percentage — calibrated against how recruiters actually screen this exact stack."
      category="candidate"
      isFree={true}
    >
      <div ref={formTopRef} style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <ToolSamplePreview
          eyebrow="A sample of what comes back"
          statNumber="23%"
          statCaption="Sample interview-chance score for a Senior PM applying to a clinical SaaS role."
          snippets={[
            {
              label: 'Verdict:',
              text: 'Long shot. Strong PM track but no healthcare signal. Tailor first, or skip.',
            },
            {
              label: 'Lift 1:',
              text: 'Add the patient-intake redesign (14 → 3 days) to your most recent role.',
            },
            {
              label: 'Lift 2:',
              text: 'Headline: change "Strategic Product Leader" to "Senior PM, B2B SaaS · healthcare and fintech."',
            },
          ]}
          note="Sample. Yours will be specific to your resume and the job you paste."
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        <RequiredLabel
          label="1. Your resume (PDF)"
          filled={!!resumeText.trim()}
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
              resumeText
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
              : resumeText
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
              Reading your resume…
            </div>
          ) : resumeText && pdfFileName ? (
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
                  color: '#F2F0FF',
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
                Parsed · {resumeText.length.toLocaleString()} characters
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
                  color: '#F2F0FF',
                  marginBottom: '6px',
                }}
              >
                Drop your resume PDF here, or click to upload
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12.5px',
                  color: '#8B8AA0',
                }}
              >
                Any standard resume PDF works. 5 MB max.
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

        <RequiredLabel
          label="2. The job description you’re considering"
          filled={!!jobDescription.trim()}
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here. The more of it you include — requirements, responsibilities, must-haves — the more honest the percentage."
          rows={8}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
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
            ? 'Run again with a different job'
            : 'See my chances'}
        </button>

        {error && (
          <div
            style={{
              background: '#1A1A22',
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
          {chancePercent !== null && <ChanceRevealCard percent={chancePercent} />}

          <ToolResult result={result} cta={null} />

          {redacted && <UnlockPrescriptionCard />}

          <ProUpsellPanel
            recommend={['Through a Recruiter’s Eyes', 'Would a Recruiter Even Find You?']}
            heading="Now sharpen the resume that landed this percentage. Read it the way a recruiter actually will — line by line."
          />

          <ResultNextSteps
            shareSummary={buildShareSummary(chancePercent)}
            onRunAgain={handleRunAgain}
          />

          <div style={{ marginTop: 32 }}>
            <FounderByline />
          </div>
        </div>
      )}
    </ToolPageShell>
  )
}

function parseChancePercent(result: string): number | null {
  const match = result.match(/Your chance:?\s*\*?\*?\s*(\d{1,3})\s*%/i)
  if (!match) return null
  const n = parseInt(match[1], 10)
  if (Number.isNaN(n) || n < 0 || n > 100) return null
  return n
}

function buildShareSummary(percent: number | null): string {
  if (percent === null) {
    return 'I just saw the honest percentage chance I’d get an interview for the job I was about to apply to. Built by a senior TA director — free to try.'
  }
  return `I just ran my resume against a job I was about to apply to. Honest chance of getting the interview: ${percent}%. Built by a senior TA director.`
}

function ChanceRevealCard({ percent }: { percent: number }) {
  const band = percent >= 70 ? 'strong' : percent >= 40 ? 'real' : percent >= 20 ? 'long' : 'cold'
  const bandLabel: Record<typeof band, string> = {
    strong: 'Strong shot',
    real: 'Real shot',
    long: 'Long shot',
    cold: 'Cold shot',
  }
  const bandColor: Record<typeof band, string> = {
    strong: '#5EE6A8',
    real: '#A78BFA',
    long: '#FF4F6A',
    cold: '#FF4F6A',
  }
  return (
    <section
      style={{
        marginBottom: 24,
        background: '#14141B',
        border: '1px solid rgba(108,71,255,0.35)',
        borderRadius: 20,
        padding: 'clamp(28px, 5vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 360,
          height: 360,
          background:
            'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontSize: '11.5px',
          color: '#A78BFA',
          marginBottom: 18,
        }}
      >
        Your honest chance
      </div>
      <div
        style={{
          position: 'relative',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(72px, 14vw, 120px)',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 14,
        }}
      >
        {percent}%
      </div>
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 100,
          border: `1px solid ${bandColor[band]}`,
          background: `${bandColor[band]}14`,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '12px',
          color: bandColor[band],
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {bandLabel[band]}
      </div>
    </section>
  )
}
