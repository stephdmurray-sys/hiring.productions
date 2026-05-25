'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { InputPromptCard } from '@/components/input-prompt-card'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading your resume…',
  'Pulling the recruiter’s search terms from the JD…',
  'Scanning your resume…',
  'Flagging the keywords you’re missing…',
  'Ranking each gap by impact…',
] as const

export default function KeywordGapPage() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const handleSubmit = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      setError('Paste both your resume and the job description so we can compare them.')
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
          toolId: 'keyword-gap',
          inputs: { resume, jobDescription },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to scan for keyword gaps')
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

  const filledCount = [resume, jobDescription].filter((v) => v.trim()).length
  const canSubmit = filledCount === 2

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #ECECF2',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    color: '#1A1A22',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '160px',
  }

  return (
    <ToolPageShell
      toolName="What Words Are Recruiters Searching For?"
      toolDescription="Paste your resume + a job description. See the exact keywords recruiters are searching for that aren't on your page — and where to put them."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What this gives you (free, no account):"
          prompts={[
            'The 5–8 keywords from the JD that aren’t on your resume',
            'How critical each one is — must-have vs. nice-to-have',
            'The exact section to put each one in',
            'A short verdict on how recruiter-search-friendly your resume is',
          ]}
        />

        <RequiredFormHeader filledCount={filledCount} totalRequired={2} />

        {/* Resume */}
        <RequiredLabel label="Your resume (paste text)" filled={!!resume.trim()} first />
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your full resume — text only. Don't worry about formatting."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        {/* Job Description */}
        <RequiredLabel label="Job description you're targeting" filled={!!jobDescription.trim()} />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description for the role you want — the more complete, the more accurate the scan."
          style={textareaStyle}
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
            ? stage
            : !canSubmit
            ? `Fill ${2 - filledCount} more required field${2 - filledCount === 1 ? '' : 's'}`
            : result
            ? 'Scan again'
            : 'Scan my resume'}
        </button>

        {/* Error */}
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

      {/* Results */}
      {result && (
        <div
          style={{
            marginTop: '40px',
            maxWidth: '720px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 40px',
          }}
        >
          <ToolResult result={result} cta={null} />
          <ProUpsellPanel
            recommend={['Through a Recruiter’s Eyes', 'Would Your Resume Even Make It Through?']}
            heading="Now hear what a recruiter actually thinks of your resume."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
