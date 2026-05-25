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
  'Lights up. Reading the candidate notes…',
  'Picking the right length for the stage…',
  'Writing the subject line…',
  'Drafting what NOT to include…',
] as const

const STAGE_OPTIONS = [
  { value: 'auto-reject', label: 'Auto-reject (resume only, no call)' },
  { value: 'phone-screen', label: 'Phone screen / recruiter screen' },
  { value: 'first-round', label: 'First round (HM or panel)' },
  { value: 'final-round', label: 'Final round' },
  { value: 'post-offer', label: 'Post-offer — went with another candidate' },
]

const TONE_OPTIONS = [
  { value: 'warm', label: 'Warm — first-name energy, conversational' },
  { value: 'direct', label: 'Direct — clear, brief, kind (default)' },
  { value: 'minimal', label: 'Minimal — shortest version, just the facts' },
]

export default function RejectionEmailPage() {
  // Form state persists to localStorage so the user doesn't lose work
  // when they hit a paywall, navigate away, or accidentally close the tab.
  const [fields, setField, clearDraft] = useToolDraft('rejection-email', {
    stage: '',
    candidateContext: '',
    yourTone: 'direct',
  })
  const { stage, candidateContext, yourTone } = fields

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stageMsg = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [stage, candidateContext].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please pick a stage and add candidate context.')
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
          toolId: 'rejection-email',
          inputs: { stage, candidateContext, yourTone },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to write the email')
      } else {
        setResult(data.result)
        // Successful run — clear the draft so the form is fresh for the
        // next candidate. The result is rendered separately, so the user
        // still sees their output.
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[rejection-email] Submit error:', err)
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
    minHeight: '120px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  const radioOptionStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '11px 16px',
    background: selected ? 'rgba(255,79,106,0.10)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${selected ? '#FF4F6A' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '10px',
    cursor: 'pointer',
    fontFamily: "'Figtree', sans-serif",
    fontSize: '13.5px',
    color: '#1A1A22',
    transition: 'all 0.15s ease',
  })

  return (
    <ToolPageShell
      toolName="The Rejection Email That Doesn't Burn the Bridge"
      toolDescription="Stage-aware rejection emails — auto-reject through post-offer. Direct, kind, specific. Never templated. Plus a follow-up paragraph for when they ask why."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'A send-ready email with a real subject line — calibrated to the stage',
            'The one phrase or move NOT to include (even if you\'re tempted)',
            'A short follow-up paragraph for if the candidate asks why',
            "Tone adjustable — warm, direct (default), or minimal",
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        <RequiredLabel label="1. What stage did they reach?" filled={!!stage.trim()} first />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STAGE_OPTIONS.map((opt) => (
            <label key={opt.value} style={radioOptionStyle(stage === opt.value)}>
              <input
                type="radio"
                name="stage"
                value={opt.value}
                checked={stage === opt.value}
                onChange={(e) => setField('stage', e.target.value)}
                style={{ accentColor: '#FF4F6A', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <RequiredLabel
          label="2. Candidate context — name (if you want it personal) + why they're not moving forward"
          filled={!!candidateContext.trim()}
        />
        <textarea
          value={candidateContext}
          onChange={(e) => setField('candidateContext', e.target.value)}
          placeholder="e.g. Jordan Lee. Strong panel performance. Went with another finalist who had deeper experience scaling B2B sales teams from $10M to $50M ARR. Would absolutely consider for a less-senior role if one opens up."
          style={textareaStyle}
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
          The honest version. The email won&apos;t lie — it&apos;ll paraphrase. Keep it brief.
        </p>

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
            3. Tone <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· defaults to direct</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TONE_OPTIONS.map((opt) => (
              <label key={opt.value} style={radioOptionStyle(yourTone === opt.value)}>
                <input
                  type="radio"
                  name="yourTone"
                  value={opt.value}
                  checked={yourTone === opt.value}
                  onChange={(e) => setField('yourTone', e.target.value)}
                  style={{ accentColor: '#FF4F6A', width: 16, height: 16, cursor: 'pointer' }}
                />
                {opt.label}
              </label>
            ))}
          </div>
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
            ? stageMsg
            : !canSubmit
              ? `Fill ${2 - filledRequired} more required field${2 - filledRequired === 1 ? '' : 's'}`
              : result
                ? 'Rewrite the rejection'
                : 'Write the rejection'}
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
        <div style={{ marginTop: '40px', maxWidth: '680px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['Win Them Against the Big-Name Offer', "What You're Actually Evaluating"]}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
