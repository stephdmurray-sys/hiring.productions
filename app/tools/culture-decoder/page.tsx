'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { InputPromptCard } from '@/components/input-prompt-card'

export default function CultureDecoderPage() {
  const [sourceType, setSourceType] = useState('About / Values page')
  const [companyCopy, setCompanyCopy] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!companyCopy.trim()) {
      setError('Paste company copy to get a culture read.')
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
          toolId: 'culture-decoder',
          inputs: {
            companyCopy,
            companyName: companyName || 'Not specified',
            sourceType,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to read the culture')
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

  const sourceOptions = ['About / Values page', 'Job posting', 'Both']

  return (
    <ToolPageShell
      toolName="What This Company Feels Like to Work At"
      toolDescription="See what a company's values actually mean in practice before you invest in applying."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Source Type Toggle */}
        <label
          style={{
            display: 'block',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8B8AA0',
            marginBottom: '12px',
          }}
        >
          WHAT ARE YOU PASTING?
        </label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {sourceOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSourceType(option)}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontFamily: "'Figtree', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '20px',
                border: sourceType === option ? 'none' : '1px solid rgba(255,255,255,0.08)',
                background: sourceType === option ? '#6C47FF' : 'rgba(255,255,255,0.04)',
                color: sourceType === option ? '#FFFFFF' : '#8B8AA0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Company Copy Textarea */}
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
          PASTE THE COMPANY COPY
        </label>
        <InputPromptCard
          title="Paste any combination of these — the more you paste, the more accurate the read:"
          prompts={[
            'Their About page',
            'Their values statement',
            'A current job posting',
            'Anything from their careers site',
          ]}
        />
        <textarea
          placeholder="Paste it all here."
          value={companyCopy}
          onChange={(e) => setCompanyCopy(e.target.value)}
          rows={12}
          style={{
            width: '100%',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#1A1A22',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid #ECECF2',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '16px',
            boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />

        {/* Character Count */}
        <div
          style={{
            textAlign: 'right',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12px',
            color: '#8B8AA0',
            marginBottom: '20px',
          }}
        >
          {companyCopy.length} characters
        </div>

        {/* Company Name (Optional) */}
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
          COMPANY NAME (OPTIONAL)
        </label>
        <input
          type="text"
          placeholder="Helps if the company is well known"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={{
            width: '100%',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#1A1A22',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid #ECECF2',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '24px',
            boxSizing: 'border-box',
          }}
        />

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(255,79,106,0.2)',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '16px',
              color: '#FF4F6A',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !companyCopy.trim()}
          style={{
            width: '100%',
            background: loading || !companyCopy.trim() ? 'rgba(108,71,255,0.3)' : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            cursor: loading || !companyCopy.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? 'Reading the room...' : 'Decode Culture'}
        </button>
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
