'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading the competing offer…',
  'Calling the odds honestly…',
  'Drafting the 90-second close script…',
  'Ranking the three closing moves…',
  'Writing the text to send tonight…',
] as const

export default function OfferPitchPage() {
  const [role, setRole] = useState('')
  const [ourCompany, setOurCompany] = useState('')
  const [ourOffer, setOurOffer] = useState('')
  const [candidate, setCandidate] = useState('')
  const [competingOffer, setCompetingOffer] = useState('')
  const [comfortableLeverage, setComfortableLeverage] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [role, ourCompany, ourOffer, candidate, competingOffer].filter((v) =>
    v.trim(),
  ).length
  const canSubmit = filledRequired === 5

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in all required fields.')
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
          toolId: 'offer-pitch',
          inputs: {
            role,
            ourCompany,
            ourOffer,
            candidate,
            competingOffer,
            comfortableLeverage,
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to build the pitch')
      } else {
        setResult(data.result)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[offer-pitch] Submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
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
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '120px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  return (
    <ToolPageShell
      toolName="Win Them Against the Big-Name Offer"
      toolDescription="They have a competing offer from a name brand. You can't match the comp. Get the honest read on your odds, a 90-second close script, three ranked closing moves, and the text to send tonight."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            "Honest odds — high / real / uphill, not a pep talk",
            "What the candidate is ACTUALLY weighing (not what they're saying on the call)",
            'A 90-second pitch script you can read on the close call',
            'Three closing moves ranked by leverage, with when to pull each',
            'Three counter-objection scripts (match the number / sign-on / more time)',
            'A short text to send tonight to hold the candidate while they decide',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={5} />

        <RequiredLabel label="1. The role you're offering" filled={!!role.trim()} first />
        <textarea
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Senior PM, founding product team at our Series A B2B SaaS. They'd own discovery + shipping for 2-3 of our biggest bets, reporting to CEO. First 90 days: rebuild the onboarding funnel; first 6 months: ship the API product."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="2. Your company — stage, size, traction, what's interesting right now"
          filled={!!ourCompany.trim()}
        />
        <textarea
          value={ourCompany}
          onChange={(e) => setOurCompany(e.target.value)}
          placeholder="e.g. Series A, 18 people, $4M ARR growing 3x YoY. Just closed our biggest customer (Notion). Eng team is ex-Stripe and ex-Linear. We're profitable on a unit basis. CEO is technical and ships code."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="3. Your offer — base, bonus, equity, benefits"
          filled={!!ourOffer.trim()}
        />
        <textarea
          value={ourOffer}
          onChange={(e) => setOurOffer(e.target.value)}
          placeholder="e.g. $185K base + 0.4% equity (4-year vest, 1-year cliff) + standard benefits. No bonus. 4 weeks PTO. Remote OK."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="4. The candidate — who they are, why they applied, what they care about"
          filled={!!candidate.trim()}
        />
        <textarea
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          placeholder="e.g. Jordan Lee, 7 years at Stripe, last 2 leading the payouts product. Said in screen: tired of committee decisions, wants to ship faster. Spouse is also tech, two-income household. Lives in SF."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <RequiredLabel
          label="5. The competing offer — what you know"
          filled={!!competingOffer.trim()}
        />
        <textarea
          value={competingOffer}
          onChange={(e) => setCompetingOffer(e.target.value)}
          placeholder="e.g. Anthropic, Senior PM on the API team. $245K base + ~$200K RSUs/yr (~$445K total). They told us they like our scope better but the comp gap is real. Decision by Friday."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        <div style={{ marginTop: 24 }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              color: '#C9C7DA',
              marginBottom: '8px',
              letterSpacing: '0.02em',
            }}
          >
            6. Leverage you&apos;re willing to use{' '}
            <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={comfortableLeverage}
            onChange={(e) => setComfortableLeverage(e.target.value)}
            placeholder="e.g. Can go to $200K base · sign-on up to $25K · accelerated review at 6 months · founder access (CEO 1:1 weekly) · scope expansion (add the partnerships function)"
            style={textareaStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12.5px',
              color: '#8B8AA0',
              margin: '8px 0 0',
            }}
          >
            The tool will only suggest moves you said you could make. Be honest — over-promising and walking it back loses the candidate.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
            background: !canSubmit
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, #FF4F6A, #6C47FF)',
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
            ? stage
            : !canSubmit
              ? `Fill ${5 - filledRequired} more required field${5 - filledRequired === 1 ? '' : 's'}`
              : result
                ? 'Rebuild the pitch'
                : 'Build my offer pitch'}
        </button>

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

      {result && (
        <div style={{ marginTop: '40px', maxWidth: '720px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['Are Your Interviewers Even Ready?', 'How to Reach Out Without Being Ignored']}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
