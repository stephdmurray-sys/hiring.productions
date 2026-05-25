'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading the posting…',
  'Cross-checking the red flags…',
  'Looking for the green flags…',
  'Drafting the verdict…',
  'Writing your next move…',
] as const

const PLATFORM_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'indeed', label: 'Indeed' },
  { value: 'ziprecruiter', label: 'ZipRecruiter' },
  { value: 'company-site', label: 'The company’s own careers site' },
  { value: 'craigslist', label: 'Craigslist' },
  { value: 'recruiter-dm', label: 'A recruiter DMed me' },
  { value: 'cold-email', label: 'Cold email / text from someone I don’t know' },
  { value: 'other', label: 'Other / not sure' },
]

export default function ScamCheckPage() {
  const [posting, setPosting] = useState('')
  const [platform, setPlatform] = useState('')
  const [howContacted, setHowContacted] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [posting, platform].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please paste the posting and tell us where you found it.')
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
          toolId: 'scam-check',
          inputs: {
            posting,
            platform,
            ...(howContacted.trim() && { howContacted }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to check this posting')
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

  const textareaStyle: React.CSSProperties = {
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
    resize: 'vertical',
    minHeight: '160px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Is This Job Posting a Scam?"
      toolDescription="Paste the posting and where you found it. Get a verdict, the specific red flags, and exactly what to do next."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you’ll get back:"
          prompts={[
            'A clear verdict — Likely real / Possibly suspicious / Almost certainly a scam',
            'The specific red flags found in this posting',
            'The green flags that suggest it might be legitimate',
            'What to do next — apply, verify, or walk away',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        <RequiredLabel label="1. Paste the full job posting" filled={!!posting.trim()} first />
        <textarea
          value={posting}
          onChange={(e) => setPosting(e.target.value)}
          placeholder="Paste the entire posting — title, company name, description, requirements, comp, contact info. The more complete, the more accurate the check."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="2. Where did you find this?" filled={!!platform.trim()} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PLATFORM_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 16px',
                background: platform === opt.value ? 'rgba(255,79,106,0.10)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${platform === opt.value ? '#FF4F6A' : 'rgba(255,255,255,0.08)'}`,
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
                name="platform"
                value={opt.value}
                checked={platform === opt.value}
                onChange={(e) => setPlatform(e.target.value)}
                style={{ accentColor: '#FF4F6A', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <RequiredLabel
          label="How did they contact you, if at all?"
          filled={!!howContacted.trim()}
          required={false}
        />
        <textarea
          value={howContacted}
          onChange={(e) => setHowContacted(e.target.value)}
          placeholder="Optional but useful. e.g. 'Recruiter DMed me on Telegram asking for a copy of my driver’s license.' OR 'I applied through their careers site and got a generic auto-response.'"
          rows={3}
          style={{ ...textareaStyle, minHeight: '80px' }}
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
            ? `Fill ${2 - filledRequired} more required field${2 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Check another posting'
            : 'Check this posting'}
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
            recommend={['Through a Recruiter’s Eyes', 'Would Your Resume Even Make It Through?']}
            heading="When you’re ready to apply to a real one, be the strongest candidate they see."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
