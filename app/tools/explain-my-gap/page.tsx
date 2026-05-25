'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading your gap…',
  'Drafting the resume one-liner…',
  'Writing the cover-letter version…',
  'Writing the 30-second interview answer…',
  'Stripping out the apology…',
] as const

const REASON_OPTIONS = [
  { value: 'layoff', label: 'Layoff / company downsizing' },
  { value: 'caregiving', label: 'Caregiving (family, parents, partner)' },
  { value: 'parenting', label: 'Parenting / parental leave' },
  { value: 'health', label: 'Health (yours or a family member’s)' },
  { value: 'mental-health', label: 'Mental health / burnout recovery' },
  { value: 'sabbatical', label: 'Intentional break / sabbatical' },
  { value: 'school', label: 'Returning to school / certification' },
  { value: 'travel', label: 'Travel / personal project' },
  { value: 'looking', label: 'Looking but not finding the right role' },
  { value: 'other', label: 'Other (specify in “what you were doing”)' },
]

export default function ExplainMyGapPage() {
  const [whenGap, setWhenGap] = useState('')
  const [length, setLength] = useState('')
  const [reason, setReason] = useState('')
  const [whatYouDid, setWhatYouDid] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired =
    [whenGap, length, reason, whatYouDid, targetRole].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 5

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
          toolId: 'explain-my-gap',
          inputs: { whenGap, length, reason, whatYouDid, targetRole },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to build your scripts')
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
    minHeight: '100px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="How to Explain My Employment Gap"
      toolDescription="Tell us when the gap happened and what you were actually doing. Get three scripts — resume one-liner, cover letter version, interview answer — written in your voice."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you’ll get back:"
          prompts={[
            'A resume one-liner (with dates) that frames the gap without hiding it',
            'A cover letter / LinkedIn-message version that opens with confidence',
            'A 30-second spoken answer for the inevitable interview question',
            'What NOT to say — the phrases that make recruiters lean in with concern',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={5} />

        <RequiredLabel label="1. When did the gap start?" filled={!!whenGap.trim()} first />
        <input
          type="text"
          value={whenGap}
          onChange={(e) => setWhenGap(e.target.value)}
          placeholder="e.g. February 2024 · after I was laid off in March · spring 2023"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="2. How long was (or is) the gap?"
          filled={!!length.trim()}
        />
        <input
          type="text"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="e.g. 8 months · still ongoing · 2 years · 14 months"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="3. What was the main reason?" filled={!!reason.trim()} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REASON_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 16px',
                background: reason === opt.value ? 'rgba(255,119,176,0.10)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${reason === opt.value ? '#FF77B0' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13.5px',
                color: '#1A1A22',
                transition: 'all 0.15s ease',
              }}
            >
              <input
                type="radio"
                name="reason"
                value={opt.value}
                checked={reason === opt.value}
                onChange={(e) => setReason(e.target.value)}
                style={{ accentColor: '#FF77B0', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <RequiredLabel
          label="4. What were you actually doing during the gap?"
          filled={!!whatYouDid.trim()}
        />
        <textarea
          value={whatYouDid}
          onChange={(e) => setWhatYouDid(e.target.value)}
          placeholder="Be honest. e.g. 'Took 9 months to care for my mom through chemo. Did some freelance brand strategy work in the last 3 months while she was in remission. Took a UX certification in the second half.'"
          rows={5}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="5. What role/industry are you targeting now?"
          filled={!!targetRole.trim()}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Product Manager at a B2B SaaS · Director of Marketing at a healthcare startup"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
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
            ? stage
            : !canSubmit
            ? `Fill ${5 - filledRequired} more required field${5 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Rewrite my scripts'
            : 'Build my scripts'}
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
            recommend={['Through a Recruiter’s Eyes', 'Your LinkedIn — Rewritten']}
            heading="Now make sure your resume and LinkedIn carry the same frame."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
