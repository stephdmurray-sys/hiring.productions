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
  'Lights up. Reading the candidate profile…',
  'Finding the specific hook…',
  'Writing the opening line that isn\'t generic…',
  'Drafting the three follow-ups…',
  'Naming what to check before you hit send…',
] as const

const CHANNEL_OPTIONS = [
  { value: 'linkedin-inmail', label: 'LinkedIn InMail (Recruiter)' },
  { value: 'linkedin-free', label: 'LinkedIn message (free, requires connect)' },
  { value: 'email', label: 'Email (direct address)' },
  { value: 'twitter', label: 'Twitter / X DM' },
  { value: 'other', label: 'Other channel' },
]

const SENDER_OPTIONS = [
  { value: 'recruiter', label: 'Recruiter / TA' },
  { value: 'hiring-manager', label: 'Hiring manager' },
  { value: 'founder', label: 'Founder / CEO' },
  { value: 'peer', label: 'Future peer / IC on the team' },
]

export default function CandidateOutreachPage() {
  const [fields, setField, clearDraft] = useToolDraft('candidate-outreach', {
    candidateProfile: '',
    role: '',
    channel: '',
    senderRole: '',
    companyContext: '',
  })
  const { candidateProfile, role, channel, senderRole, companyContext } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [candidateProfile, role, channel, senderRole].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 4

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
          toolId: 'candidate-outreach',
          inputs: { candidateProfile, role, channel, senderRole, companyContext },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to write the message')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[candidate-outreach] Submit error:', err)
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
      toolName="How to Reach Out Without Being Ignored"
      toolDescription="Tell us about the candidate and the role. Get a send-ready outreach message — short, specific, opens with a real hook, ends with a low-pressure ask — plus three timed follow-ups and what to check before hitting send."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'A send-ready message — under 130 words, specific, no template phrases',
            'Why each line works (opener, middle, ask, what you avoided)',
            'Two alternative versions — shorter (for senior candidates) and warmer (founder voice)',
            'A three-step follow-up sequence with subject lines',
            "The one thing to verify on the candidate's profile before you hit send",
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={4} />

        <RequiredLabel
          label="1. Candidate profile — who they are, what they've done"
          filled={!!candidateProfile.trim()}
          first
        />
        <textarea
          value={candidateProfile}
          onChange={(e) => setField('candidateProfile', e.target.value)}
          placeholder="e.g. Jordan Lee, Senior PM at Notion for 3 years, was at Asana before. Recently posted on LinkedIn about building from 0 to 1 inside an established company. Open to startups."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="2. Role you want them to consider" filled={!!role.trim()} />
        <textarea
          value={role}
          onChange={(e) => setField('role', e.target.value)}
          placeholder="e.g. Senior PM, founding product team at a Series A B2B SaaS in fintech. They'd own discovery, ship 2-3 features in their first 90 days, report directly to founder."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="3. Channel" filled={!!channel.trim()} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CHANNEL_OPTIONS.map((opt) => (
            <label key={opt.value} style={radioOptionStyle(channel === opt.value)}>
              <input
                type="radio"
                name="channel"
                value={opt.value}
                checked={channel === opt.value}
                onChange={(e) => setField('channel', e.target.value)}
                style={{ accentColor: '#FF4F6A', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <RequiredLabel label="4. Who's sending it" filled={!!senderRole.trim()} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SENDER_OPTIONS.map((opt) => (
            <label key={opt.value} style={radioOptionStyle(senderRole === opt.value)}>
              <input
                type="radio"
                name="senderRole"
                value={opt.value}
                checked={senderRole === opt.value}
                onChange={(e) => setField('senderRole', e.target.value)}
                style={{ accentColor: '#FF4F6A', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              color: '#5A5A6E',
              marginBottom: '8px',
              letterSpacing: '0.02em',
            }}
          >
            5. Company context strong candidates would find interesting{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={companyContext}
            onChange={(e) => setField('companyContext', e.target.value)}
            placeholder="e.g. Just closed Series A from Index Ventures. 14 people. Building API-first fraud detection for fintechs. Eng team is 4 ex-Stripe."
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
                ? 'Write a new version'
                : 'Write the message'}
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
        <div style={{ marginTop: '40px', maxWidth: '720px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['The Search String That Finds Your Candidate', 'Are Your Interviewers Even Ready?']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
