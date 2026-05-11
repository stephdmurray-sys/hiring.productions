'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading their last message…',
  'Pulling the recruiter playbook for this stage…',
  'Decoding the silence…',
  'Drafting your follow-up…',
  'The verdict is coming…',
] as const

const STAGE_OPTIONS = [
  { value: 'applied', label: 'I applied through their site / a job board' },
  { value: 'recruiter-screen', label: 'I had a recruiter phone screen' },
  { value: 'hiring-manager', label: 'I had a hiring manager interview' },
  { value: 'onsite-panel', label: 'I did the onsite / panel / final round' },
  { value: 'offer-pending', label: 'They said an offer was coming' },
  { value: 'recruiter-outreach', label: 'A recruiter reached out to me first, then went quiet' },
]

export default function GhostedPage() {
  const [stage, setStage] = useState('')
  const [howLong, setHowLong] = useState('')
  const [lastContact, setLastContact] = useState('')
  const [followedUp, setFollowedUp] = useState('')
  const [roleType, setRoleType] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const runningStage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [stage, howLong, lastContact, roleType].filter((v) => v.trim()).length
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
          toolId: 'ghosted',
          inputs: {
            stage,
            howLong,
            lastContact,
            roleType,
            ...(followedUp.trim() && { followedUp }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to decode the silence')
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
    minHeight: '90px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Have I Been Ghosted?"
      toolDescription="Tell us where you are in their process and how long it’s been. Get the honest read on what’s actually happening — and exactly what to do next."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you’ll get back:"
          prompts={[
            'Verdict — Ghosted / Probably still in process / Worth following up',
            'What’s likely actually happening on their side at this stage',
            'The specific 48-hour action — wait, follow up, or move on',
            'A ready-to-send follow-up email (if it’s worth sending)',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={4} />

        <RequiredLabel label="1. Where are you in their process?" filled={!!stage.trim()} first />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STAGE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 16px',
                background: stage === opt.value ? 'rgba(255,119,176,0.10)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${stage === opt.value ? '#FF77B0' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13.5px',
                color: '#F2F0FF',
                transition: 'all 0.15s ease',
              }}
            >
              <input
                type="radio"
                name="stage"
                value={opt.value}
                checked={stage === opt.value}
                onChange={(e) => setStage(e.target.value)}
                style={{ accentColor: '#FF77B0', width: 16, height: 16, cursor: 'pointer' }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        <RequiredLabel
          label="2. How long has it been since their last response?"
          filled={!!howLong.trim()}
        />
        <input
          type="text"
          value={howLong}
          onChange={(e) => setHowLong(e.target.value)}
          placeholder="e.g. 9 days · 3 weeks · over a month · 6 days since the onsite"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="3. What did they say last? (Quote it if you can)"
          filled={!!lastContact.trim()}
        />
        <textarea
          value={lastContact}
          onChange={(e) => setLastContact(e.target.value)}
          placeholder="Paste their last message word-for-word if possible. e.g. 'Thanks for coming in! We’re finishing a few other conversations this week and will be in touch by end of next week.' OR 'Just confirming you’re still interested?'"
          rows={3}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="4. What kind of role is this?"
          filled={!!roleType.trim()}
        />
        <input
          type="text"
          value={roleType}
          onChange={(e) => setRoleType(e.target.value)}
          placeholder="e.g. Sr Product Manager at a Series C startup · Marketing Director at a Fortune 500 · entry-level customer success"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="Have you followed up already?"
          filled={!!followedUp.trim()}
          required={false}
        />
        <textarea
          value={followedUp}
          onChange={(e) => setFollowedUp(e.target.value)}
          placeholder="Optional. e.g. 'Sent a friendly check-in 5 days ago, no response' OR 'Haven’t followed up at all yet.'"
          rows={2}
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
            ? runningStage
            : !canSubmit
            ? `Fill ${4 - filledRequired} more required field${4 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Run it again'
            : 'Decode the silence'}
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
            recommend={['Through a Recruiter’s Eyes', 'Would a Recruiter Even Find You?']}
            heading="If your search keeps going quiet, the cause is upstream — see what’s breaking it."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
