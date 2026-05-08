'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'

export default function WhatYoureWorthPage() {
  const [roleTitle, setRoleTitle] = useState('')
  const [location, setLocation] = useState('')
  const [experience, setExperience] = useState('')
  const [offer, setOffer] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!roleTitle.trim() || !location.trim() || !experience.trim() || !offer.trim()) {
      setError('Please fill in your role, location, experience, and current/pending offer.')
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
          toolId: 'what-youre-worth',
          inputs: {
            roleTitle,
            location,
            experience,
            offer,
            ...(companyType && { companyType }),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to read the market')
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

  const canSubmit = roleTitle.trim() && location.trim() && experience.trim() && offer.trim()

  return (
    <ToolPageShell
      toolName="What You're Actually Worth"
      toolDescription="See what the market actually says about your compensation — and get a word-for-word salary negotiation script."
      category="candidate"
      isFree={false}
    >
      {/* Input Section */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Role Title */}
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
          YOUR ROLE TITLE
        </label>
        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          placeholder="e.g. Senior Director of Talent Acquisition"
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
          YOUR LOCATION
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Seattle WA, Remote (US), New York City"
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
          YEARS OF EXPERIENCE
        </label>
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="e.g. 12 years in TA, 4 years at director level"
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

        {/* Current or Pending Offer */}
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
          CURRENT OR PENDING OFFER
        </label>
        <input
          type="text"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="e.g. $115,000 base + 10% bonus, or 'no offer yet — researching market rate'"
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

        {/* Company Type (Optional) */}
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
          COMPANY TYPE (OPTIONAL)
        </label>
        <input
          type="text"
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
          placeholder="e.g. Series B startup, Fortune 500, healthcare nonprofit"
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
          {loading ? 'Reading the market...' : result ? 'Read again' : 'Read the market'}
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
