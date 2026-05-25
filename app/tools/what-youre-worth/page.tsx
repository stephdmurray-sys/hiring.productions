'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { InputPromptCard } from '@/components/input-prompt-card'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'

export default function NegotiateThisOfferPage() {
  const [roleTitle, setRoleTitle] = useState('')
  const [location, setLocation] = useState('')
  const [experience, setExperience] = useState('')
  const [offer, setOffer] = useState('')
  const [marketData, setMarketData] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!roleTitle.trim() || !location.trim() || !experience.trim() || !offer.trim() || !marketData.trim()) {
      setError('Fill in role, location, experience, your offer, and at least one market data point.')
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
            marketData,
            ...(companyType && { companyType }),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to build your script')
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

  const filledCount = [roleTitle, location, experience, offer, marketData].filter((v) => v.trim()).length
  const canSubmit = filledCount === 5

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #ECECF2',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '15px',
    color: '#1A1A22',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <ToolPageShell
      toolName="How to Negotiate This Offer"
      toolDescription="Bring your offer + a few market data points. Get the exact script — opening line, response to “this is our best offer,” and the specific number to ask for."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        {/* Where to get market data — sourced */}
        <InputPromptCard
          title="Step 1 — Get your market data points (we don't make these up):"
          prompts={[
            'Tech roles: levels.fyi (most accurate for engineering, PM, design)',
            'General: payscale.com or glassdoor.com (search your title + city)',
            'Government data: bls.gov/oes (Bureau of Labor Statistics)',
            'Senior + executive: robert half salary guide (free PDF)',
            'Bring 2–3 numbers you find. We use yours, not ours.',
          ]}
        />

        <div
          style={{
            background: 'rgba(108,71,255,0.06)',
            border: '1px solid rgba(108,71,255,0.18)',
            borderRadius: '10px',
            padding: '16px 20px',
            marginTop: '12px',
            marginBottom: '24px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: '#C9C7DA',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: '#1A1A22' }}>Why we ask:</strong> AI compensation estimates go
          stale fast. The script we build is only as accurate as the market data you bring in. Spend
          5 minutes on the sites above first — then come back.
        </div>

        <RequiredFormHeader filledCount={filledCount} totalRequired={5} />

        {/* Role Title */}
        <RequiredLabel label="Your role title" filled={!!roleTitle.trim()} first />
        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          placeholder="e.g. Senior Director of Talent Acquisition"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Location */}
        <RequiredLabel label="Your location" filled={!!location.trim()} />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Seattle WA, Remote (US), New York City"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Experience */}
        <RequiredLabel label="Years of experience" filled={!!experience.trim()} />
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="e.g. 12 years in TA, 4 years at director level"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Current or Pending Offer */}
        <RequiredLabel label="Current or pending offer" filled={!!offer.trim()} />
        <input
          type="text"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder="e.g. $115,000 base + 10% bonus, or 'no offer yet — preparing for the call'"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Market Data — REQUIRED, user-supplied */}
        <RequiredLabel label="Market data you found" filled={!!marketData.trim()} />
        <textarea
          value={marketData}
          onChange={(e) => setMarketData(e.target.value)}
          placeholder="Paste the numbers you found and where they came from. Example: 'Levels.fyi median for Sr. Director TA, Seattle: $185K base. Payscale: $145–195K range. Glassdoor (3 listings): $160K–210K total comp.'"
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Company Type (Optional) */}
        <RequiredLabel label="Company type" filled={!!companyType.trim()} required={false} />
        <input
          type="text"
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
          placeholder="e.g. Series B startup, Fortune 500, healthcare nonprofit"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
            background: !canSubmit
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: !canSubmit ? '1px solid rgba(255,255,255,0.10)' : 'none',
            borderRadius: '10px',
            padding: '15px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            color: !canSubmit ? '#6B6A82' : 'white',
            cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? 'Building your script...'
            : !canSubmit
            ? `Fill ${5 - filledCount} more required field${5 - filledCount === 1 ? '' : 's'}`
            : result
            ? 'Build it again'
            : 'Build my script'}
        </button>

        {/* Error Messages */}
        {error && (
          <div
            style={{
              background: '#FFFFFF',
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
          <ProUpsellPanel
            recommend={['The Rehearsal Room', 'What They’re Really Asking']}
            heading="Rehearse the interview before you negotiate the offer."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
