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
  'Lights up. Reading your JD as a strong candidate would…',
  'Pausing where they pause…',
  'Marking where they click away…',
  'Running the comp read…',
  'Drafting the three rewrites…',
] as const

export default function JdCandidateEyesPage() {
  const [fields, setField, clearDraft] = useToolDraft('jd-candidate-eyes', {
    jobDescription: '',
    targetCandidate: '',
  })
  const { jobDescription, targetCandidate } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [jobDescription].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 1

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please paste the job description.')
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
          toolId: 'jd-candidate-eyes',
          inputs: { jobDescription, targetCandidate },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to read the JD')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[jd-candidate-eyes] Submit error:', err)
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
    minHeight: '220px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  return (
    <ToolPageShell
      toolName="Your Job Post, Through Candidate Eyes"
      toolDescription="Paste any job description. Get the candidate's actual internal monologue — what they pause on, what makes them click away, and the three rewrites that bring strong applicants back."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'The first 8 seconds — what a strong candidate notices when they open this',
            'The exact line that decides whether they keep reading or close the tab',
            'What works (with quotes) and what loses them (with quotes + why)',
            'The unspoken signals about your company the JD reveals',
            'Three specific rewrites with current and new versions',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={1} />

        <RequiredLabel
          label="1. Paste the full job description"
          filled={!!jobDescription.trim()}
          first
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setField('jobDescription', e.target.value)}
          placeholder="Paste the complete posting — title, description, requirements, benefits, comp, the whole thing. The more you give, the more specific the read."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
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
            2. Target candidate level / function <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <input
            type="text"
            value={targetCandidate}
            onChange={(e) => setField('targetCandidate', e.target.value)}
            placeholder="e.g. Senior PM at B2B SaaS · Director of Talent at healthcare startup · Mid-level engineer with 4–7 yrs"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
          />
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12.5px',
              color: '#8B8AA0',
              margin: '8px 0 0',
            }}
          >
            Adds calibration so the read maps against the specific candidate you're trying to attract.
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
              ? 'Paste a job description to continue'
              : result
                ? 'Read it again'
                : 'Read it through candidate eyes'}
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
            recommend={['The Search String That Finds Your Candidate', 'Is This Even a Real Candidate?']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
