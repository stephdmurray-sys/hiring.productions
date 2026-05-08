'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function LinkedInRewritePage() {
  const [headline, setHeadline] = useState('')
  const [about, setAbout] = useState('')
  const [experience, setExperience] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!headline.trim() || !about.trim() || !experience.trim()) {
      setError('Please fill in your headline, About section, and most recent role.')
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
          toolId: 'linkedin-rewrite',
          inputs: {
            headline,
            about,
            experience,
            ...(targetRole && { targetRole }),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to rewrite your profile')
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

  const canSubmit = headline.trim() && about.trim() && experience.trim()

  return (
    <ToolPageShell
      toolName="LinkedIn Profile Rewriter"
      toolDescription="See how a recruiter reads your LinkedIn — and get your headline, About section, and experience rewritten in one pass."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Headline */}
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
          YOUR CURRENT HEADLINE
        </label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Paste your current LinkedIn headline exactly as it reads"
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

        {/* About Section */}
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
          YOUR ABOUT SECTION
        </label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Paste your current LinkedIn About section. If it's blank, write a few sentences about what you do and what you're looking for."
          rows={6}
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

        {/* Experience */}
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
          YOUR MOST RECENT ROLE DESCRIPTION
        </label>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Paste your current job title and the bullets from your most recent LinkedIn experience section."
          rows={6}
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

        {/* Target Role (Optional) */}
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
          YOUR TARGET NEXT ROLE (OPTIONAL)
        </label>
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. VP of People at a Series B company — helps tailor the rewrite"
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
          {loading ? 'Rewriting your profile...' : result ? 'Rewrite again' : 'Rewrite my profile'}
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
