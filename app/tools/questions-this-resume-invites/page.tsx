'use client'

import { useState, useRef } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ToolSamplePreview } from '@/components/tool-sample-preview'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { FounderByline } from '@/components/founder-byline'
import { useStageRotation } from '@/lib/use-stage-rotation'
import { FileText, Upload, User, Building2 } from 'lucide-react'

const RUNNING_STAGES = [
  'Reading the resume…',
  'Mapping gaps and transitions…',
  'Pressure-testing the strongest claims…',
  'Finding the weakest line…',
  'Building the interview plan…',
] as const

type Audience = 'candidate' | 'interviewer'

export default function QuestionsThisResumeInvitesPage() {
  const [audience, setAudience] = useState<Audience>('candidate')
  const [resumeText, setResumeText] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')
  const [pdfUploading, setPdfUploading] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const runningStage = useStageRotation(RUNNING_STAGES, loading)
  const canSubmit = Boolean(resumeText.trim())

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
      setPdfError('Export the resume as a PDF and try again.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPdfError('PDF is over 5 MB. Try a standard resume export.')
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
      setError('Upload the resume first.')
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
          toolId: 'questions-this-resume-invites',
          inputs: {
            resumeText,
            audience,
            ...(targetRole.trim() && { targetRole }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to map the questions.')
      } else {
        setResult(data.result)
      }
    } catch {
      setError('An error occurred. Please try again.')
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
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <ToolPageShell
      toolName="Questions This Resume Invites"
      toolDescription="Drop a resume. Get the 8 questions an interviewer will probe on — gaps, transitions, scope, claims. Plus what each is testing for and the answer pattern."
      category="candidate"
      isFree={false}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <ToolSamplePreview
          eyebrow="A sample of what comes back"
          snippets={[
            {
              label: 'Q1:',
              text: '"Walk me through the 14-month gap in 2023." — Testing for: continuity of skills and honesty about life. Pulled from: gap between your 2022 and 2024 roles.',
            },
            {
              label: 'Q2:',
              text: '"You led a team that ‘drove cross-functional growth.’ What was your scope?" — Testing for: real scope vs inflated language. Pulled from: bullet in your current role.',
            },
            {
              label: 'Q3:',
              text: '"Tell me about the patient-intake redesign — what was your actual role?" — Testing for: attribution, depth of involvement. Pulled from: line 6 of role 1.',
            },
          ]}
          note="Sample. Yours will be tied to specific lines in the resume you upload."
        />

        {/* AUDIENCE TOGGLE — the bilateral flip. */}
        <div
          style={{
            marginBottom: 24,
            padding: 4,
            background: '#FFFFFF',
            border: '1px solid #ECECF2',
            borderRadius: 12,
            display: 'flex',
            gap: 4,
          }}
        >
          <AudienceButton
            active={audience === 'candidate'}
            onClick={() => setAudience('candidate')}
            icon={<User size={14} strokeWidth={2.2} />}
            label="I'm prepping to be interviewed"
          />
          <AudienceButton
            active={audience === 'interviewer'}
            onClick={() => setAudience('interviewer')}
            icon={<Building2 size={14} strokeWidth={2.2} />}
            label="I'm prepping to interview someone"
          />
        </div>

        <RequiredFormHeader filledCount={resumeText ? 1 : 0} totalRequired={1} />

        <RequiredLabel
          label={
            audience === 'candidate'
              ? '1. Your resume (PDF)'
              : "1. The candidate's resume (PDF)"
          }
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
            <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 14, color: '#A78BFA' }}>
              Reading the resume…
            </div>
          ) : resumeText && pdfFileName ? (
            <div>
              <FileText size={28} color="#5EE6A8" strokeWidth={1.8} style={{ marginBottom: 10 }} />
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#1A1A22',
                  marginBottom: 6,
                }}
              >
                {pdfFileName}
              </div>
              <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12, color: '#5EE6A8' }}>
                Parsed · {resumeText.length.toLocaleString()} characters
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 12,
                  color: '#8B8AA0',
                  marginTop: 10,
                }}
              >
                Click to replace
              </div>
            </div>
          ) : (
            <div>
              <Upload size={28} color="#A78BFA" strokeWidth={1.8} style={{ marginBottom: 10 }} />
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#1A1A22',
                  marginBottom: 6,
                }}
              >
                Drop the resume here, or click to upload
              </div>
              <div style={{ fontFamily: "'Figtree', sans-serif", fontSize: 12.5, color: '#8B8AA0' }}>
                Any standard resume PDF works. 5 MB max.
              </div>
            </div>
          )}
        </div>
        {pdfError && (
          <div
            style={{
              marginTop: 8,
              padding: '10px 14px',
              background: 'rgba(255,79,106,0.08)',
              border: '1px solid rgba(255,79,106,0.25)',
              borderRadius: 8,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#FF8FA3',
              lineHeight: 1.5,
            }}
          >
            {pdfError}
          </div>
        )}

        <RequiredLabel
          label="The role being interviewed for"
          filled={!!targetRole.trim()}
          required={false}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Optional. e.g. Senior PM at a Series B SaaS · Director of TA at a clinical org"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: 24,
            background: !canSubmit
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: !canSubmit ? '1px solid rgba(255,255,255,0.10)' : 'none',
            borderRadius: 10,
            padding: '15px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 16,
            color: !canSubmit ? '#6B6A82' : 'white',
            cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? runningStage
            : !canSubmit
            ? 'Upload a resume to continue'
            : result
            ? 'Run again'
            : audience === 'candidate'
            ? 'Map the questions they’ll ask'
            : 'Map the questions to ask'}
        </button>

        {error && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(255,79,106,0.3)',
              borderRadius: 10,
              padding: '16px 20px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: '#FF4F6A',
              marginTop: 12,
            }}
          >
            {error}
          </div>
        )}
      </div>

      {result && (
        <div
          style={{
            marginTop: 40,
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 40px',
          }}
        >
          <ToolResult result={result} cta={null} />

          <ProUpsellPanel
            recommend={['The Rehearsal Room', 'What They’re Really Asking']}
            heading="Now rehearse the answers. Pressure-test each question against the rubric a real interviewer scores against."
          />

          <div style={{ marginTop: 32 }}>
            <FounderByline />
          </div>
        </div>
      )}
    </ToolPageShell>
  )
}

function AudienceButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '12px 16px',
        background: active ? 'rgba(108,71,255,0.20)' : 'transparent',
        border: active
          ? '1px solid rgba(167,139,250,0.55)'
          : '1px solid transparent',
        borderRadius: 9,
        color: active ? '#F2F0FF' : '#9D9CB3',
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 700,
        fontSize: 13.5,
        cursor: 'pointer',
        transition: 'all 0.18s ease',
      }}
    >
      {icon}
      {label}
    </button>
  )
}
