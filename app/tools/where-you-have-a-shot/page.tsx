'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Target } from 'lucide-react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function WhereYouHaveAShotPage() {
  const [targetRole, setTargetRole] = useState('')
  const [seniorityLevel, setSeniorityLevel] = useState('')
  const [location, setLocation] = useState('')
  const [industry, setIndustry] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!targetRole.trim() || !seniorityLevel.trim() || !location.trim()) {
      setError('Provide your target role, seniority level, and location.')
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
          toolId: 'where-you-have-a-shot',
          inputs: {
            targetRole,
            seniorityLevel,
            location,
            industry: industry || 'Not specified',
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to map your odds')
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
      toolName="Where You Actually Have a Shot"
      toolDescription="See which platforms actually respond to candidates like you — backed by real data."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
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
          placeholder="e.g. Director of Talent Acquisition, UX Designer, VP of Finance"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          style={{
            width: '100%',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#F2F0FF',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '20px',
            boxSizing: 'border-box',
          }}
        />

        {/* Seniority Level */}
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
          SENIORITY LEVEL
        </label>
        <input
          type="text"
          placeholder="e.g. Individual Contributor, Manager, Director, VP, C-Suite"
          value={seniorityLevel}
          onChange={(e) => setSeniorityLevel(e.target.value)}
          style={{
            width: '100%',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#F2F0FF',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '20px',
            boxSizing: 'border-box',
          }}
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
          }}
        >
          LOCATION OR WORK PREFERENCE
        </label>
        <input
          type="text"
          placeholder="e.g. Seattle WA, Remote, Hybrid NYC"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            width: '100%',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#F2F0FF',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: '20px',
            boxSizing: 'border-box',
          }}
        />

        {/* Industry (Optional) */}
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
          INDUSTRY (OPTIONAL)
        </label>
        <input
          type="text"
          placeholder="e.g. Healthcare, SaaS, Defense Tech, Financial Services"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={{
            width: '100%',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 400,
            color: '#F2F0FF',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
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
              background: '#1A1A22',
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
          disabled={loading || !targetRole.trim() || !seniorityLevel.trim() || !location.trim()}
          style={{
            width: '100%',
            background:
              loading || !targetRole.trim() || !seniorityLevel.trim() || !location.trim()
                ? 'rgba(108,71,255,0.3)'
                : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            cursor:
              loading || !targetRole.trim() || !seniorityLevel.trim() || !location.trim()
                ? 'not-allowed'
                : 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? 'Mapping your odds...' : 'Map My Platforms'}
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
