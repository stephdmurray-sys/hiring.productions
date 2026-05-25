'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'

export default function RecruiterFindYouPage() {
  const [currentHeadline, setCurrentHeadline] = useState('')
  const [currentTitleOnLi, setCurrentTitleOnLi] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [industry, setIndustry] = useState('')
  const [location, setLocation] = useState('')
  const [aboutSection, setAboutSection] = useState('')
  const [skillsListed, setSkillsListed] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')
  const [openToWork, setOpenToWork] = useState('')

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const filledRequired = [
    currentHeadline,
    currentTitleOnLi,
    targetRole,
    industry,
    location,
  ].filter((v) => v.trim()).length
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
          toolId: 'recruiter-find-you',
          inputs: {
            currentHeadline,
            currentTitleOnLi,
            targetRole,
            industry,
            location,
            ...(aboutSection.trim() && { aboutSection }),
            ...(skillsListed.trim() && { skillsListed }),
            ...(yearsExperience.trim() && { yearsExperience }),
            ...(openToWork.trim() && { openToWork }),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to run the analysis')
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

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '90px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Would a Recruiter Even Find You?"
      toolDescription="Paste your real LinkedIn headline and current role. Get the exact boolean string recruiters use to find candidates like you — and a specific tear-down of what's wrong with your profile right now."
      category="candidate"
      isFree={false}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back — a real Pro-grade analysis:"
          prompts={[
            'The exact boolean string a recruiter pastes into LinkedIn Recruiter to find candidates like you',
            'Your CURRENT headline torn apart, line by line — what keywords are wrong, missing, or invisible',
            'A rewritten headline option, ready to paste',
            'The exact keywords missing from your About and Skills sections',
            'LinkedIn settings to verify (Open to Work, industry tag, location, premium signals)',
            'A visibility score with the specific reasons it’s not higher',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={5} />

        {/* Current headline — the most important input */}
        <RequiredLabel
          label="1. Your CURRENT LinkedIn headline (paste exactly)"
          filled={!!currentHeadline.trim()}
          first
        />
        <input
          type="text"
          value={currentHeadline}
          onChange={(e) => setCurrentHeadline(e.target.value)}
          placeholder='e.g. "Senior Talent Acquisition Leader | Driving Strategic Growth | Healthcare TA Expert"'
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12px',
            color: '#8B8AA0',
            marginTop: '6px',
          }}
        >
          The headline is the #1 driver of whether you surface. Copy yours exactly from LinkedIn —
          including punctuation, abbreviations, and emoji if you have any.
        </div>

        <RequiredLabel
          label="2. The title shown on your most recent LinkedIn role"
          filled={!!currentTitleOnLi.trim()}
        />
        <input
          type="text"
          value={currentTitleOnLi}
          onChange={(e) => setCurrentTitleOnLi(e.target.value)}
          placeholder='e.g. "Founder & Recruiting Consultant" or "Sr Director, Talent Acquisition"'
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="3. The target role you want recruiters to find you for"
          filled={!!targetRole.trim()}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Director of Talent Acquisition · VP of People · Director of Recruiting"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="4. Target industry" filled={!!industry.trim()} />
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="e.g. Healthcare · B2B SaaS · Financial services · Edtech"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="5. Location / location preference" filled={!!location.trim()} />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Seattle WA · NYC area · Remote (US) · Open to relocation to Austin"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Optional but high-value */}
        <RequiredLabel
          label="Your About section"
          filled={!!aboutSection.trim()}
          required={false}
        />
        <textarea
          value={aboutSection}
          onChange={(e) => setAboutSection(e.target.value)}
          placeholder="Optional. Paste your About section verbatim. We'll analyze its keyword density and recruiter-search-friendliness."
          rows={5}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="Skills listed on your profile"
          filled={!!skillsListed.trim()}
          required={false}
        />
        <textarea
          value={skillsListed}
          onChange={(e) => setSkillsListed(e.target.value)}
          placeholder="Optional. Comma-separate or list the skills currently in your Skills section. The Skills section feeds the search algorithm directly."
          rows={3}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="Years of experience in this field"
          filled={!!yearsExperience.trim()}
          required={false}
        />
        <input
          type="text"
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
          placeholder="e.g. 12 years · 18 years · 6 years"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label='Is "Open to Work" turned on?'
          filled={!!openToWork.trim()}
          required={false}
        />
        <input
          type="text"
          value={openToWork}
          onChange={(e) => setOpenToWork(e.target.value)}
          placeholder='e.g. "Yes, recruiters-only mode" · "Yes, public green frame" · "No" · "Not sure"'
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Submit */}
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
            ? 'Running the recruiter search...'
            : !canSubmit
            ? `Fill ${5 - filledRequired} more required field${5 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Run it again'
            : 'Test my visibility'}
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
        <div
          style={{
            marginTop: '40px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 40px',
          }}
        >
          <ToolResult
            result={result}
            cta={{
              subtext:
                "Want the full rewrite — three headline options, a complete About rewrite, and every recent role rewritten for impact?",
              label: 'Get your full LinkedIn rewrite →',
              href: '/tools/linkedin-rewrite',
            }}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
