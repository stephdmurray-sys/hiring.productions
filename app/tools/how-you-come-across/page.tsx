'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { InputPromptCard } from '@/components/input-prompt-card'

export default function HowYouComeAcrossPage() {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Write how you\'d describe yourself professionally.')
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
          toolId: 'how-you-come-across',
          inputs: {
            description,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to analyze your pitch')
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
      toolName="How You Actually Come Across"
      toolDescription="See how you sound when someone asks 'tell me about yourself' — and make it land."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Description Label */}
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
          HOW WOULD YOU DESCRIBE YOURSELF PROFESSIONALLY?
        </label>

        <InputPromptCard
          title="Write it like you’d actually say it out loud. Try to cover:"
          prompts={[
            'What you do',
            'What you’re known for',
            'What you’re looking for next',
          ]}
        />

        {/* Description Textarea */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Don’t overthink it. Just say what you’d say if someone asked, “so tell me about yourself.”"
          rows={8}
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
            marginBottom: '8px',
            boxSizing: 'border-box',
          }}
        />

        {/* Helper Note */}
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '12px',
            color: '#8B8AA0',
            marginTop: '8px',
            marginBottom: '24px',
          }}
        >
          No right answer here. The more honest and natural the better — that's what we're analyzing.
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,79,106,0.3)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '20px',
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              color: '#FF4F6A',
            }}
          >
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: loading
              ? 'rgba(108,71,255,0.4)'
              : 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
            border: 'none',
            borderRadius: '10px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            color: '#F2F0FF',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {loading ? 'Listening...' : 'Analyze How I Sound'}
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
