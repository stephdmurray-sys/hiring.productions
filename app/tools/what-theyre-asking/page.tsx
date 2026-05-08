'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function WhatTheyreAskingPage() {
  const [interviewQuestion, setInterviewQuestion] = useState('')
  const [role, setRole] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!interviewQuestion.trim() || !role.trim()) {
      setError('Paste both the interview question and your target role.')
      return
    }

    if (interviewQuestion.length < 30) {
      setError('Paste the complete interview question.')
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
          toolId: 'what-theyre-asking',
          inputs: {
            interviewQuestion,
            role,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to analyze the question')
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
      toolName="What They're Really Asking"
      toolDescription="See the competency underneath any interview question — and what a strong answer actually looks like."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Question Label */}
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
          PASTE THE INTERVIEW QUESTION
        </label>

        {/* Question Textarea */}
        <textarea
          value={interviewQuestion}
          onChange={(e) => setInterviewQuestion(e.target.value)}
          placeholder="Paste the exact interview question here."
          rows={4}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '12px 14px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            color: '#F2F0FF',
            resize: 'vertical',
            marginBottom: '4px',
          }}
        />

        {/* Character Count */}
        <div style={{ fontSize: '11px', color: '#8B8AA0', marginBottom: '24px' }}>
          {interviewQuestion.length} characters
        </div>

        {/* Role Label */}
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
          ROLE YOU'RE INTERVIEWING FOR
        </label>

        {/* Role Input */}
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Director of Talent Acquisition at a Series B startup"
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            padding: '12px 14px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            color: '#F2F0FF',
            marginBottom: '28px',
          }}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !interviewQuestion.trim() || !role.trim()}
          style={{
            width: '100%',
            background: loading || !interviewQuestion.trim() || !role.trim()
              ? 'rgba(108,71,255,0.4)'
              : 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 24px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            color: '#F2F0FF',
            cursor: loading || !interviewQuestion.trim() || !role.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Reading between the question...' : 'Decode the Question'}
        </button>

        {/* Error Display */}
        {error && (
          <div
            style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,79,106,0.2)',
              borderRadius: '10px',
              padding: '14px',
              marginTop: '24px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              color: '#FF6B7A',
              lineHeight: 1.6,
            }}
          >
            {error}
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div
            style={{
              marginTop: '40px',
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <ToolResult result={result} />
          </div>
        )}
      </div>
    </ToolPageShell>
  )
}
