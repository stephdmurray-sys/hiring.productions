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
  'Lights up. Mapping the role to keywords…',
  'Building the LinkedIn Recruiter string…',
  'Adapting for free LinkedIn + Google X-ray…',
  'Translating for Indeed syntax…',
  'Picking the alternative-angle pool…',
] as const

export default function BooleanBuilderPage() {
  const [fields, setField, clearDraft] = useToolDraft('boolean-builder', {
    roleTitle: '',
    mustHaves: '',
    niceToHaves: '',
    location: '',
    exclude: '',
  })
  const { roleTitle, mustHaves, niceToHaves, location, exclude } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [roleTitle, mustHaves, location].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 3

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in role title, must-haves, and location.')
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
          toolId: 'boolean-builder',
          inputs: { roleTitle, mustHaves, niceToHaves, location, exclude },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to build the strings')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[boolean-builder] Submit error:', err)
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
    minHeight: '90px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="The Search String That Finds Your Candidate"
      toolDescription="Tell us the role and the must-haves. Get pasteable boolean strings for LinkedIn Recruiter, free LinkedIn / Google X-ray, and Indeed — plus the three pools you might be missing."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'A LinkedIn Recruiter string sized to surface 200–800 qualified results, not noise',
            'A free LinkedIn / Google X-ray string for when you don\'t have Recruiter',
            'An Indeed-syntax string for the different pool Indeed surfaces',
            'Tighter / broader / alternative-angle variations',
            'Where else to look beyond these strings — 3 specific non-LinkedIn channels',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={3} />

        <RequiredLabel label="1. Role title you're hiring for" filled={!!roleTitle.trim()} first />
        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setField('roleTitle', e.target.value)}
          placeholder="e.g. Senior Software Engineer · Director of Marketing · Head of People"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="2. Must-haves (skills, tools, certifications, industries, experience)"
          filled={!!mustHaves.trim()}
        />
        <textarea
          value={mustHaves}
          onChange={(e) => setField('mustHaves', e.target.value)}
          placeholder="e.g. Python and Django · 5+ years backend · worked at a Series A–C SaaS · shipped a payment integration"
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="3. Location" filled={!!location.trim()} />
        <input
          type="text"
          value={location}
          onChange={(e) => setField('location', e.target.value)}
          placeholder="e.g. NYC + remote within US · San Francisco Bay Area · fully remote · Austin TX"
          style={inputStyle}
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
            4. Nice-to-haves <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={niceToHaves}
            onChange={(e) => setField('niceToHaves', e.target.value)}
            placeholder="e.g. healthcare or fintech background · Kubernetes · led a small team · open-source contributor"
            style={textareaStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
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
            5. Exclude <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <input
            type="text"
            value={exclude}
            onChange={(e) => setField('exclude', e.target.value)}
            placeholder="e.g. no agency recruiters · no FAANG · no current bootcamp grads"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
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
              ? `Fill ${3 - filledRequired} more required field${3 - filledRequired === 1 ? '' : 's'}`
              : result
                ? 'Rebuild the strings'
                : 'Build my search strings'}
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
            recommend={['Is This Even a Real Candidate?', 'Your Job Post, Through Candidate Eyes']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
