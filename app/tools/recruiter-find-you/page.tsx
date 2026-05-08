'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function RecruiterFindYouPage() {
  const [targetRole, setTargetRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [skills, setSkills] = useState('')
  const [location, setLocation] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!targetRole.trim() || !industry.trim() || !skills.trim() || !location.trim()) {
      setError('Please fill in all fields for an accurate search analysis.')
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
          toolId: 'recruiter-find-you',
          inputs: {
            targetRole,
            industry,
            skills,
            location,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to build your search string')
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

  const canSubmit = targetRole.trim() && industry.trim() && skills.trim() && location.trim()

  return (
    <ToolPageShell
      toolName="Would a Recruiter Even Find You?"
      toolDescription="See the exact search string recruiters paste into LinkedIn to find candidates like you — then see exactly why your profile might not show up in that search."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Explanatory Card */}
        <div style={{
          background: '#1A1A22',
          border: '1px solid rgba(108,71,255,0.15)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: '14px',
          color: '#8B8AA0',
          lineHeight: 1.7,
        }}>
          Recruiters don&apos;t browse LinkedIn — they run boolean searches. This tool shows you the exact string a recruiter would use to find someone with your background, then tells you specifically why your profile might not surface in that search and what to add to fix it.
        </div>
        {/* Target Role */}
        <label
          style={{
            display: 'block',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8B8AA0',
            marginBottom: '8px',
          }}
        >
          YOUR TARGET ROLE
        </label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Director of Talent Acquisition, Senior UX Designer"
          style={{
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
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#6C47FF' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        />

        {/* Industry */}
        <label
          style={{
            display: 'block',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8B8AA0',
            marginBottom: '8px',
            marginTop: '20px',
          }}
        >
          YOUR INDUSTRY
        </label>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g. Healthcare, SaaS, Defense Tech"
          style={{
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
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#6C47FF' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        />

        {/* Skills */}
        <label
          style={{
            display: 'block',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8B8AA0',
            marginBottom: '8px',
            marginTop: '20px',
          }}
        >
          YOUR KEY SKILLS AND KEYWORDS
        </label>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="List the skills, tools, and credentials that define your expertise — the more specific the better."
          rows={4}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '14px 18px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: '#F2F0FF',
            resize: 'vertical',
            transition: 'border-color 0.2s',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#6C47FF' }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
        />

        {/* Location */}
        <label
          style={{
            display: 'block',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8B8AA0',
            marginBottom: '8px',
            marginTop: '20px',
          }}
        >
          YOUR LOCATION OR PREFERENCE
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Seattle WA, Remote, Hybrid NYC"
          style={{
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
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#6C47FF' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: 'none',
            borderRadius: '10px',
            padding: '15px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            color: 'white',
            cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
            opacity: loading || !canSubmit ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Building your search string...' : result ? 'Build again' : 'Build my search string'}
        </button>

        {/* Error Messages */}
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

      {/* Results Section */}
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
          <ToolResult result={result} />
        </div>
      )}
    </ToolPageShell>
  )
}
