'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'
import { useToolDraft } from '@/lib/use-tool-draft'

const RUNNING_STAGES = [
  'Lights up. Scanning for AI tells…',
  'Checking bullet patterns and rhythm…',
  'Running the math on the metrics…',
  'Distinguishing polish from fabrication…',
  'Drafting the three interview probes…',
] as const

export default function RealCandidatePage() {
  const [fields, setField, clearDraft] = useToolDraft('real-candidate', {
    application: '',
    targetRole: '',
  })
  const { application, targetRole } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [application].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 1

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please paste the candidate application.')
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
          toolId: 'real-candidate',
          inputs: { application, targetRole },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to run the check')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[real-candidate] Submit error:', err)
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
    minHeight: '260px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  return (
    <ToolPageShell
      toolName="Is This Even a Real Candidate?"
      toolDescription="Paste an inbound application. Get the AI-likelihood score, the specific tells, a math check on the metrics, and three interview probes to verify the experience is real."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'AI-likelihood score (0–100) with the polish-vs-fabrication call',
            'The specific lines that triggered the read — quoted with the pattern named',
            "Math check — do the cited metrics actually hold up at the candidate's level and scale",
            "Three interview probes designed to surface fabrication if it's there",
            'A direct interview-or-not verdict',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={1} />

        <RequiredLabel
          label="1. Paste the application (resume + cover letter if you have both)"
          filled={!!application.trim()}
          first
        />
        <textarea
          value={application}
          onChange={(e) => setField('application', e.target.value)}
          placeholder="Paste the candidate's resume and cover letter as plain text. The whole thing, not just the summary. The more you paste, the more accurate the read."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <div style={{ marginTop: 24 }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              color: '#C9C7DA',
              marginBottom: '8px',
              letterSpacing: '0.02em',
            }}
          >
            2. Target role you&apos;re hiring for <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setField('targetRole', e.target.value)}
            placeholder="e.g. Senior Software Engineer (Backend, Python) at a Series B fintech"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12.5px',
              color: '#8B8AA0',
              margin: '8px 0 0',
            }}
          >
            Calibrates the math check — a Senior PM&apos;s &quot;$5M revenue&quot; reads differently than a CMO&apos;s.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
            background: !canSubmit
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, #FF4F6A, #6C47FF)',
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
            ? stage
            : !canSubmit
              ? 'Paste an application to continue'
              : result
                ? 'Run the check again'
                : 'Run the check'}
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
        <div style={{ marginTop: '40px', maxWidth: '720px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['Your Job Post, Through Candidate Eyes', 'The Search String That Finds Your Candidate']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
