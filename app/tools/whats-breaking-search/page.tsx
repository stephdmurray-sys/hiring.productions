'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function WhatsBreakingSearchPage() {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (description.length < 100) {
      setError('Please provide more detail about your job search for an accurate diagnosis.')
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
            description,
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

  return (
    <ToolPageShell
      toolName="What's Breaking Your Search"
      toolDescription="See the real reason your applications aren't converting — with a specific diagnosis for your exact situation."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Description */}
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
          DESCRIBE YOUR JOB SEARCH
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Be specific: How long have you been searching? What roles are you targeting? How are you applying (platforms, volume, tailored vs mass)? What responses are you getting — none, some, then silence, interviews but no offers? What does your resume/LinkedIn look like? The more detail the more accurate the diagnosis."
          rows={10}
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

        {/* Helper note */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            color: '#8B8AA0',
            marginTop: '8px',
          }}
        >
          The more honest you are here the more useful the diagnosis. Don&apos;t present the best version — describe what&apos;s actually happening.
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || description.length === 0}
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
            cursor: loading || description.length === 0 ? 'not-allowed' : 'pointer',
            opacity: loading || description.length === 0 ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Diagnosing your search...' : result ? 'Diagnose again' : 'Diagnose my search'}
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
