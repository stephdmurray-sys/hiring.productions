'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading the JD for what the role actually needs…',
  'Mapping the 6 competencies that predict success…',
  'Writing interview questions that surface each one…',
  'Calibrating the 1-4 rubric levels…',
  'Drafting the decision rule…',
] as const

export default function WhatYoureEvaluatingPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [teamContext, setTeamContext] = useState('')
  const [redFlagsToCatch, setRedFlagsToCatch] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [jobDescription, teamContext].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in the JD and the team context.')
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
          toolId: 'what-youre-evaluating',
          inputs: { jobDescription, teamContext, redFlagsToCatch },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to build the scorecard')
      } else {
        setResult(data.result)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[what-youre-evaluating] Submit error:', err)
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
    minHeight: '140px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  const jdTextareaStyle: React.CSSProperties = {
    ...textareaStyle,
    minHeight: '200px',
  }

  return (
    <ToolPageShell
      toolName="What You're Actually Evaluating"
      toolDescription="A structured interview scorecard built for THIS specific role from THIS specific JD. Six competencies that predict success, with interview questions, 1–4 rubric levels, and a decision rule the team agrees on before the first interview."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            "6 competencies derived from THIS JD — not generic 'communication'",
            'For each: what it looks like, the interview question, what a 4 sounds like, what a 1 sounds like',
            'Which interviewer on your panel is best positioned to evaluate each competency',
            'Three role-specific red flags with the question that confirms each one',
            'A 1-4 rubric + a decision rule the team uses before scheduling debrief',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        <RequiredLabel
          label="1. Paste the full job description"
          filled={!!jobDescription.trim()}
          first
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete JD — title, description, responsibilities, requirements, comp. The more detail you give, the more specific the competencies."
          style={jdTextareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="2. Team context — who's on the interview panel and what they each care about"
          filled={!!teamContext.trim()}
        />
        <textarea
          value={teamContext}
          onChange={(e) => setTeamContext(e.target.value)}
          placeholder="e.g. Recruiter screen (30 min) — me, focused on level/comp fit. Hiring manager (60 min) — VP of Eng, focused on system design and previous shipping. IC peer (45 min) — Senior IC, focused on collaboration and code quality. Skip-level (30 min) — CEO, focused on growth potential and fit."
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
            3. Specific red flags to catch <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={redFlagsToCatch}
            onChange={(e) => setRedFlagsToCatch(e.target.value)}
            placeholder="e.g. Title inflation from past role · candidates who only describe team accomplishments not personal · gaps the candidate is dodging · level-down concern"
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
                ? 'Rebuild the scorecard'
                : 'Build the scorecard'}
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
            recommend={['Are Your Interviewers Even Ready?', 'Is This Even a Real Candidate?']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
