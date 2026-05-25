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
  'Lights up. Mapping the jurisdictions that apply…',
  'Calibrating the defensible range for this level + function…',
  'Drafting per-state compliance notes…',
  'Writing copy-paste disclosure language…',
  'Listing the three mistakes small teams make here…',
] as const

const LEVEL_OPTIONS = [
  { value: 'junior', label: 'Junior (0–3 yrs)' },
  { value: 'mid', label: 'Mid (3–6 yrs)' },
  { value: 'senior', label: 'Senior (6–10 yrs)' },
  { value: 'lead', label: 'Lead / Staff (10+ yrs)' },
  { value: 'director', label: 'Director' },
  { value: 'vp', label: 'VP / Head' },
  { value: 'exec', label: 'C-level / Executive' },
]

export default function PayRangeCompliancePage() {
  const [fields, setField, clearDraft] = useToolDraft('pay-range-compliance', {
    roleTitle: '',
    level: '',
    func: '',
    workLocations: '',
    userProposedRange: '',
    comp: '',
  })
  const { roleTitle, level, func, workLocations, userProposedRange, comp } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [roleTitle, level, func, workLocations].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 4

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in role, level, function, and work locations.')
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
          toolId: 'pay-range-compliance',
          inputs: { roleTitle, level, function: func, workLocations, userProposedRange, comp },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to build the disclosure')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[pay-range-compliance] Submit error:', err)
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
      toolName="What Range Do I Have to Post?"
      toolDescription="17 states + DC now require posted pay ranges. Penalties run per-posting per-day. Get a defensible range, per-state compliance notes, and copy-paste disclosure language."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'A specific, defensible range to post (validated against your input if you provided one)',
            'Per-state compliance notes — what the law requires, the "good faith" standard, penalty exposure',
            'Copy-paste disclosure language for the bottom of your JD',
            'Three mistakes small teams make on pay-transparency compliance',
            'A 3-step preflight checklist before you click Post',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={4} />

        <RequiredLabel label="1. Role title" filled={!!roleTitle.trim()} first />
        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setField('roleTitle', e.target.value)}
          placeholder="e.g. Senior Software Engineer · Director of Marketing · Recruiting Coordinator"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="2. Level" filled={!!level.trim()} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LEVEL_OPTIONS.map((opt) => (
            <label key={opt.value} style={radioOptionStyle(level === opt.value)}>
              <input
                type="radio"
                name="level"
                value={opt.value}
                checked={level === opt.value}
                onChange={(e) => setField('level', e.target.value)}
                style={{ accentColor: '#FF4F6A', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <RequiredLabel label="3. Function" filled={!!func.trim()} />
        <input
          type="text"
          value={func}
          onChange={(e) => setField('func', e.target.value)}
          placeholder="e.g. Engineering · Product Management · People / HR · Sales · Customer Success"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="4. Work locations (states the role can be performed in)"
          filled={!!workLocations.trim()}
        />
        <textarea
          value={workLocations}
          onChange={(e) => setField('workLocations', e.target.value)}
          placeholder="e.g. NY, CA, TX · or 'Remote within US' · or 'In-office Austin TX only' · or 'Remote within CA, WA, CO, NY'"
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
          Remote roles posted nationally trigger every state with a posting requirement. Be honest about where the role can actually be performed.
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
            5. The range you were going to post{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <input
            type="text"
            value={userProposedRange}
            onChange={(e) => setField('userProposedRange', e.target.value)}
            placeholder="e.g. $140K-$180K · $48-$58/hr · skip if you want a recommendation instead"
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
            If you provide a range, the tool will validate it against market and compliance. If you skip, the tool will propose one.
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
            6. Full comp context — equity, bonus, benefits{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={comp}
            onChange={(e) => setField('comp', e.target.value)}
            placeholder="e.g. Base + 0.1-0.4% equity (early-stage) + 4-week PTO + medical/dental/vision + remote stipend. CO/WA/IL/MN/NJ/MA/HI require benefits in the disclosure."
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
              ? `Fill ${4 - filledRequired} more required field${4 - filledRequired === 1 ? '' : 's'}`
              : result
                ? 'Rebuild the disclosure'
                : 'Build my pay disclosure'}
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
          Compliance guidance, not legal advice. For roles posted across multiple jurisdictions or with equity components, run the final disclosure by employment counsel.
        </p>
      </div>

      {result && (
        <div style={{ marginTop: '40px', maxWidth: '720px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['Your Job Post, Through Candidate Eyes', "What You're Actually Evaluating"]}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
