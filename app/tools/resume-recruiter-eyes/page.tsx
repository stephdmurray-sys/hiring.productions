'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function ResumeRecruiterEyesPage() {
  const [resumeText, setResumeText] = useState('')
  const [roleInput, setRoleInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (resumeText.length < 200) {
      setError('Paste more of your resume for an accurate read — at least a few paragraphs.')
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
          toolId: 'resume-recruiter-eyes',
          inputs: {
            resume: resumeText,
            ...(roleInput && { role: roleInput }),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to process your resume')
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

  return (
    <ToolPageShell
      toolName="Your Resume, Through a Recruiter's Eyes"
      toolDescription="See the internal monologue of a recruiter reading your resume in the first 6 seconds."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Resume Label */}
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
          PASTE YOUR RESUME
        </label>

        {/* Resume Textarea */}
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your full resume text here — the more detail the more accurate the read."
          rows={14}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '16px 18px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: '#F2F0FF',
            resize: 'vertical',
            transition: 'border-color 0.2s',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6C47FF'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255,255,255,0.08)'
          }}
        />

        {/* Character Count */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            color: '#8B8AA0',
            textAlign: 'right',
            marginTop: '6px',
          }}
        >
          {resumeText.length.toLocaleString()} characters
        </div>

        {/* Target Role Label */}
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
          TARGET ROLE (OPTIONAL)
        </label>

        {/* Target Role Input */}
        <input
          type="text"
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          placeholder="e.g. Senior Product Manager at a Series B startup"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '16px 18px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: '#F2F0FF',
            transition: 'border-color 0.2s',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#6C47FF'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
          }}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || resumeText.length === 0}
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
            cursor: loading || resumeText.length === 0 ? 'not-allowed' : 'pointer',
            opacity: loading || resumeText.length === 0 ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Reading your resume...' : result ? 'Read it again →' : 'Get the recruiter\'s read →'}
        </button>

        {/* Minimum Character Warning */}
        {error && resumeText.length < 200 && (
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              color: '#FF4F6A',
              marginTop: '12px',
            }}
          >
            {error}
          </div>
        )}

        {/* Other Error Messages */}
        {error && resumeText.length >= 200 && (
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
