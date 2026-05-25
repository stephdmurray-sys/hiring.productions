'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ShareResult } from '@/components/share-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'

export default function WhatThisJobIsPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (jobDescription.length < 200) {
      setError('Paste the full job description for an accurate read — at least a few paragraphs.')
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
          toolId: 'what-this-job-is',
          inputs: {
            jobDescription: jobDescription,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to analyze the job description')
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
      toolName="What This Job Actually Is"
      toolDescription="Paste any job description. See what's really between the lines — the unstated requirements, the red flags, the salary read, and whether it's worth your time."
      category="candidate"
      isFree={true}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* JD Label */}
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
          PASTE THE JOB DESCRIPTION
        </label>

        {/* JD Textarea */}
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job posting here — the more complete the more accurate the read."
          rows={14}
          style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1px solid #ECECF2',
            borderRadius: '10px',
            padding: '16px 18px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: '#1A1A22',
            resize: 'vertical',
            transition: 'border-color 0.2s',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6C47FF'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ECECF2'
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
          {jobDescription.length.toLocaleString()} characters
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || jobDescription.length === 0}
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
            cursor: loading || jobDescription.length === 0 ? 'not-allowed' : 'pointer',
            opacity: loading || jobDescription.length === 0 ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Reading between the lines...' : result ? 'Read it again →' : 'Get the real story →'}
        </button>

        {/* Minimum Character Warning */}
        {error && jobDescription.length < 200 && (
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
        {error && jobDescription.length >= 200 && (
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
          <ToolResult result={result} cta={null} />
          <ShareResult source="what-this-job-is" variant="dark" />
          <ProUpsellPanel
            recommend={['Through a Recruiter’s Eyes', 'Would Your Resume Even Make It Through?']}
            heading="Now see how your resume stacks up against this job."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
