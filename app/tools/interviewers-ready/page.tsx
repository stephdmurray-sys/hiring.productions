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
  'Lights up. Reading the role + the panel…',
  'Writing the 10-minute pre-read for every interviewer…',
  'Crafting the opening question that gets real signal…',
  'Listing the three follow-ups that get past the rehearsed answer…',
  'Naming what to mention in passing that wins the offer…',
] as const

export default function InterviewersReadyPage() {
  const [fields, setField, clearDraft] = useToolDraft('interviewers-ready', {
    role: '',
    panel: '',
    candidateProfile: '',
    competitiveContext: '',
  })
  const { role, panel, candidateProfile, competitiveContext } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [role, panel].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in the role and the panel.')
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
          toolId: 'interviewers-ready',
          inputs: { role, panel, candidateProfile, competitiveContext },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to build the prep guide')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[interviewers-ready] Submit error:', err)
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
    minHeight: '120px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  return (
    <ToolPageShell
      toolName="Are Your Interviewers Even Ready?"
      toolDescription="A 10-minute pre-read for every interviewer on the panel. The opening question that gets real signal. Three follow-ups that get past rehearsed answers. The two questions to avoid. The thing to mention in passing that wins the offer."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            '10-minute pre-read brief per interviewer — what to figure out, what to avoid asking',
            'A specific opening question that surfaces real thinking (not the rehearsed pitch)',
            'Three follow-up phrases for when the candidate is too smooth or too vague',
            'Two question patterns to NOT ask (and why each fails for THIS role)',
            'The thing to drop in passing that makes the candidate want this role over others',
            'A two-line debrief template the interviewer fills in within 10 minutes',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        <RequiredLabel
          label="1. Role + context"
          filled={!!role.trim()}
          first
        />
        <textarea
          value={role}
          onChange={(e) => setField('role', e.target.value)}
          placeholder="e.g. Senior Software Engineer, founding eng team at Series A B2B SaaS, ~6-10 yrs of experience, full-stack TypeScript + Python, reports to CTO, will be one of first 5 engineers."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="2. The interview panel — who's interviewing, in what order, for how long"
          filled={!!panel.trim()}
        />
        <textarea
          value={panel}
          onChange={(e) => setField('panel', e.target.value)}
          placeholder="e.g. 1) Recruiter screen 30 min — me. 2) Hiring manager (VP Eng) 60 min — system design + previous shipping. 3) IC peer 45 min — coding pair + collaboration. 4) CEO 30 min — strategy + culture fit."
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
            3. Candidate profile (if known) <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={candidateProfile}
            onChange={(e) => setField('candidateProfile', e.target.value)}
            placeholder="e.g. Sam Chen, 8 yrs at Stripe, led the payouts platform rewrite. Active on LinkedIn about devex. Wants to join a smaller team where they can ship faster."
            style={textareaStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        </div>

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
            4. Competitive context — what else they&apos;re considering{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={competitiveContext}
            onChange={(e) => setField('competitiveContext', e.target.value)}
            placeholder="e.g. Also interviewing at Stripe (staying) and at a Series B company. Comp is comparable. We win on scope and ownership; we lose on brand and security."
            style={textareaStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
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
              ? `Fill ${2 - filledRequired} more required field${2 - filledRequired === 1 ? '' : 's'}`
              : result
                ? 'Rebuild the prep guide'
                : 'Build the prep guide'}
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
            recommend={["What You're Actually Evaluating", 'How to Reach Out Without Being Ignored']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
