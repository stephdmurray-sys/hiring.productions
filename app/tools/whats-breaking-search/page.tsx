'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { ShareResult } from '@/components/share-result'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'

const APPROACH_OPTIONS = [
  { value: 'mostly-online', label: 'Mostly online applications, mass-applying' },
  { value: 'mostly-online-tailored', label: 'Mostly online, tailored each one' },
  { value: 'mix', label: 'Mix of online + some networking / referrals' },
  { value: 'mostly-networking', label: 'Mostly networking + warm intros' },
]

export default function WhatsBreakingSearchPage() {
  const [searchLength, setSearchLength] = useState('')
  const [targetRoles, setTargetRoles] = useState('')
  const [approach, setApproach] = useState('')
  const [responses, setResponses] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [linkedinText, setLinkedinText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const filledRequired =
    [searchLength, targetRoles, approach, responses].filter((v) => v.trim()).length
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
          toolId: 'whats-breaking-search',
          inputs: {
            searchLength,
            targetRoles,
            approach,
            responses,
            ...(resumeText.trim() && { resumeText }),
            ...(linkedinText.trim() && { linkedinText }),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to diagnose your search')
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
    minHeight: '100px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="What's Breaking Your Job Search"
      toolDescription="Six small questions. One specific diagnosis from real recruiting practice — and the single 48-hour fix to start with."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <RequiredFormHeader filledCount={filledRequired} totalRequired={4} />

        {/* 1. Search length */}
        <RequiredLabel
          label="1. How long have you been searching?"
          filled={!!searchLength.trim()}
          first
        />
        <input
          type="text"
          value={searchLength}
          onChange={(e) => setSearchLength(e.target.value)}
          placeholder="e.g. 3 months · 6 weeks · since I got laid off in February"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        {/* 2. Target roles */}
        <RequiredLabel label="2. What roles are you targeting?" filled={!!targetRoles.trim()} />
        <input
          type="text"
          value={targetRoles}
          onChange={(e) => setTargetRoles(e.target.value)}
          placeholder="e.g. Sr Director of TA at Series B startups · Product Marketing Manager at SaaS companies"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        {/* 3. Approach (radio) */}
        <RequiredLabel label="3. How are you applying?" filled={!!approach.trim()} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {APPROACH_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: approach === opt.value ? 'rgba(108,71,255,0.10)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${approach === opt.value ? '#6C47FF' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                color: '#F2F0FF',
                transition: 'all 0.15s ease',
              }}
            >
              <input
                type="radio"
                name="approach"
                value={opt.value}
                checked={approach === opt.value}
                onChange={(e) => setApproach(e.target.value)}
                style={{
                  accentColor: '#6C47FF',
                  width: 16,
                  height: 16,
                  cursor: 'pointer',
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        {/* 4. Responses */}
        <RequiredLabel
          label="4. What responses are you getting?"
          filled={!!responses.trim()}
        />
        <textarea
          value={responses}
          onChange={(e) => setResponses(e.target.value)}
          placeholder="Be specific. e.g. 'Out of 80 applications: 4 phone screens, 1 onsite, 0 offers. Most are silence.' OR 'Plenty of recruiter calls but always rejected after the hiring manager round.'"
          rows={4}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        {/* 5. Resume — optional */}
        <RequiredLabel
          label="5. Paste your resume (text only)"
          filled={!!resumeText.trim()}
          required={false}
        />
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Optional but the diagnosis gets sharper with this. Just paste the text — we ignore formatting."
          rows={6}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        {/* 6. LinkedIn headline + most recent role — what recruiters actually read */}
        <RequiredLabel
          label="6. Paste your LinkedIn headline + current/most recent role"
          filled={!!linkedinText.trim()}
          required={false}
        />
        <textarea
          value={linkedinText}
          onChange={(e) => setLinkedinText(e.target.value)}
          placeholder={`Optional. The two things recruiters actually read on LinkedIn:

[Headline]
e.g. Senior Director, Talent Acquisition | B2B SaaS

[Current/most recent role — title, company, bullets]
e.g. Sr Director, TA · Brightside Health (2022–Present)
- Built recruiting team from 2 to 8...
- Reduced time-to-hire from 60 to 28 days...`}
          rows={8}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '11.5px',
            color: '#8B8AA0',
            marginTop: '6px',
            lineHeight: 1.5,
          }}
        >
          Why these two: recruiters read the headline religiously and skim the most recent role. The About section is mostly skipped, so don&apos;t waste your time pasting it.
        </div>

        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            color: '#8B8AA0',
            marginTop: '12px',
            lineHeight: 1.5,
          }}
        >
          The more honest you are, the more useful the diagnosis. Don&apos;t describe the best version — describe what&apos;s actually happening.
        </div>

        {/* Submit */}
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
            ? 'Diagnosing your search...'
            : !canSubmit
            ? `Fill ${4 - filledRequired} more required field${4 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Diagnose again'
            : 'Diagnose my search'}
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
          <ShareResult source="whats-breaking-search" variant="dark" />
          <ProUpsellPanel
            recommend={['Your LinkedIn — Rewritten', 'Through a Recruiter’s Eyes']}
            heading="Want the full LinkedIn analysis and resume read?"
          />
        </div>
      )}
    </ToolPageShell>
  )
}
