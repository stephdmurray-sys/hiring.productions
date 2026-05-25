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
  'Lights up. Looking up the vendor and the use case…',
  'Checking per-jurisdiction requirements…',
  'Running the four-fifths math if there\'s an audit…',
  'Drafting the careers-page disclosure block…',
  'Writing the three questions to ask the vendor in writing…',
] as const

export default function AiVendorCompliancePage() {
  const [fields, setField, clearDraft] = useToolDraft('ai-vendor-compliance', {
    vendorName: '',
    useCase: '',
    states: '',
    rolesUsed: '',
    auditSummary: '',
  })
  const { vendorName, useCase, states, rolesUsed, auditSummary } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [vendorName, useCase, states].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 3

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in vendor, use case, and states.')
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
          toolId: 'ai-vendor-compliance',
          inputs: { vendorName, useCase, states, rolesUsed, auditSummary },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to scan the vendor')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[ai-vendor-compliance] Submit error:', err)
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
    minHeight: '110px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  return (
    <ToolPageShell
      toolName="Is Your AI Hiring Vendor Going to Get You Sued?"
      toolDescription="NYC Local Law 144 enforcement is live. CA/NJ/IL/CO legislation is in flight. Get a plain-English risk readout on any AI hiring vendor you use, per-state risk, copy-paste disclosure language, and the three questions to put to the vendor in writing."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'A risk readout (Green / Yellow / Red) for your specific use case + states',
            "Per-jurisdiction risk — what's required, the penalty exposure, the single action to take",
            'Four-fifths-rule math in plain English — does the vendor\'s audit actually pass',
            'Copy-paste disclosure block for your careers page (NYC LL144 specifically)',
            "Three questions to put to the vendor IN WRITING before signing or renewing",
            "The single action to take in the next 7 days",
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={3} />

        <RequiredLabel
          label="1. AI hiring vendor / tool you're scanning"
          filled={!!vendorName.trim()}
          first
        />
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setField('vendorName', e.target.value)}
          placeholder="e.g. HireVue · Pymetrics · Greenhouse Predict · iCIMS Talent Cloud · Workday Talent Optimization · custom in-house tool"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="2. What is the AI actually doing in your hiring funnel?"
          filled={!!useCase.trim()}
        />
        <textarea
          value={useCase}
          onChange={(e) => setField('useCase', e.target.value)}
          placeholder="e.g. Ranking inbound resumes for SWE roles · scoring 1-way video interviews on behavioral signals · chatbot screening for retail roles · keyword-matching resumes to JDs"
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="3. States where you hire (or 'remote within US')"
          filled={!!states.trim()}
        />
        <textarea
          value={states}
          onChange={(e) => setField('states', e.target.value)}
          placeholder="e.g. NYC · CA · IL · Remote within US · NY state + NJ + CT"
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
          NYC LL144 enforcement is in force. IL Video Interview Act is in force. CO SB24-205 effective Feb 2026. CA and NJ legislation in flight.
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
            4. Role types the tool screens{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <input
            type="text"
            value={rolesUsed}
            onChange={(e) => setField('rolesUsed', e.target.value)}
            placeholder="e.g. Entry-level retail · Senior engineering · Sales · All exempt roles · All hourly roles"
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
            Disparate-impact risk shifts based on the role pool — entry-level retail is a different pool than senior engineering.
          </p>
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
            5. Paste the vendor&apos;s bias audit summary{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={auditSummary}
            onChange={(e) => setField('auditSummary', e.target.value)}
            placeholder="If you have it, paste the audit summary or the published selection-rate ratios. The tool will run the four-fifths math against it."
            style={textareaStyle}
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
                ? 'Re-scan the vendor'
                : 'Scan my vendor'}
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

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12px',
            color: '#6B6A82',
            lineHeight: 1.6,
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          Compliance guidance, not legal advice. For any vendor where the readout comes back Yellow or Red, run the disclosure block + vendor questions by employment counsel before posting or signing.
        </p>
      </div>

      {result && (
        <div style={{ marginTop: '40px', maxWidth: '720px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['What Range Do I Have to Post?', 'Is This Even a Real Candidate?']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
