'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'

export default function CareerPivotPage() {
  const [currentRole, setCurrentRole] = useState('')
  const [currentBullets, setCurrentBullets] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [whyPivot, setWhyPivot] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const filledRequired = [currentRole, currentBullets, targetRole].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 3

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in all required fields.')
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
          toolId: 'career-pivot',
          inputs: {
            currentRole,
            currentBullets,
            targetRole,
            ...(whyPivot.trim() && { whyPivot }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to translate your experience')
      } else {
        setResult(data.result)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[v0] Submit error:', err)
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
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Your Career Pivot, Translated"
      toolDescription="Paste your bullets from your old field plus your target role. Get rewritten bullets that translate your transferable skills into the language of the new industry."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you’ll get back:"
          prompts={[
            'The through-line — the underlying competency that connects your old field to your new one',
            'Three to five rewritten bullets that lead with the transferable skill, not the old role',
            'A summary paragraph framing the pivot honestly (for resume top + LinkedIn About)',
            'Which of your skills genuinely transfer — and which to stop selling',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={3} />

        <RequiredLabel
          label="1. Your current or most recent role"
          filled={!!currentRole.trim()}
          first
        />
        <input
          type="text"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          placeholder="e.g. Senior Account Manager at an ad agency · Elementary teacher · Restaurant GM"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="2. Paste 3–5 bullets from your current/most recent role"
          filled={!!currentBullets.trim()}
        />
        <textarea
          value={currentBullets}
          onChange={(e) => setCurrentBullets(e.target.value)}
          placeholder="Paste them straight from your resume. Don’t edit, don’t shorten — we need the raw material to translate it well."
          rows={6}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="3. What role / industry are you pivoting INTO?"
          filled={!!targetRole.trim()}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Product Manager at a B2B SaaS · Customer Success at a fintech · UX Designer at a healthcare company"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="Why this pivot? (optional)"
          filled={!!whyPivot.trim()}
          required={false}
        />
        <textarea
          value={whyPivot}
          onChange={(e) => setWhyPivot(e.target.value)}
          placeholder="Optional. The honest version — gives us a stronger summary paragraph to write. e.g. 'I’ve been doing the analytical part of account management for 6 years and realized that’s where I want to spend my time, not in pitch decks.'"
          rows={3}
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
            ? 'Translating your experience...'
            : !canSubmit
            ? `Fill ${3 - filledRequired} more required field${3 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Translate again'
            : 'Translate my experience'}
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
          <ToolResult result={result} cta={null} />
          <ProUpsellPanel
            recommend={['Your LinkedIn — Rewritten', 'Through a Recruiter’s Eyes']}
            heading="Now align your LinkedIn and resume to the new positioning."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
