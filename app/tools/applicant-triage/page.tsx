'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'
import { useToolDraft } from '@/lib/use-tool-draft'

const RUNNING_STAGES = [
  'Lights up. Reading the JD…',
  'Speed-reading every candidate in the queue…',
  'Flagging AI-likely applications…',
  'Ranking the shortlist…',
  'Writing the archive rationale for each cut…',
  'Spotting the pattern across the batch…',
] as const

// Helper: turn a paste-blob into a candidate count for the running tally.
function countCandidates(applications: string): number {
  if (!applications.trim()) return 0
  const matches = applications.match(/---\s*CANDIDATE\s+\d+/gi)
  if (matches) return matches.length
  // If the user pasted a single resume without separators, count it as 1.
  return 1
}

export default function ApplicantTriagePage() {
  const [fields, setField, clearDraft] = useToolDraft('applicant-triage', {
    jobDescription: '',
    applications: '',
    mustHaves: '',
  })
  const { jobDescription, applications, mustHaves } = fields
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const candidateCount = countCandidates(applications)
  const filledRequired = [jobDescription, applications].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2 && candidateCount <= 10

  const handleSubmit = async () => {
    if (filledRequired < 2) {
      setError('Please paste the JD and at least one application.')
      return
    }
    if (candidateCount > 10) {
      setError('Triage up to 10 candidates per run. Split into batches and run again.')
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
          toolId: 'applicant-triage',
          inputs: { jobDescription, applications, mustHaves },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || data.error || 'Failed to triage the queue')
      } else {
        setResult(data.result)
        clearDraft()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[applicant-triage] Submit error:', err)
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
    minHeight: '160px',
    lineHeight: 1.55,
    fontSize: '14px',
  }

  const applicationsTextareaStyle: React.CSSProperties = {
    ...textareaStyle,
    minHeight: '360px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '13px',
  }

  return (
    <ToolPageShell
      toolName="Triage 200 Applicants in 30 Seconds"
      toolDescription="Paste a JD and up to 10 resumes in one go. Get a ranked triage — interview now, maybe next, archive — with AI-likelihood per candidate, the top reason for each call, and the pattern across the batch."
      category="hiring"
      isFree={false}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you'll get back:"
          prompts={[
            'Per-candidate verdict (Interview now / Maybe next / Archive) with the top reason',
            "Match score and AI-likelihood flag for every candidate",
            'A clean shortlist of who to interview today and who to talk to next',
            "A concrete archive reason for each cut — defensible if the candidate ever asks",
            "What this queue tells you about your JD — three changes for the next batch",
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        <RequiredLabel
          label="1. Paste the job description"
          filled={!!jobDescription.trim()}
          first
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setField('jobDescription', e.target.value)}
          placeholder="Paste the complete JD — title, description, requirements, comp. The triage calls are calibrated against what THIS role actually needs."
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="2. Paste up to 10 candidate resumes (separated by --- CANDIDATE N ---)"
          filled={!!applications.trim()}
        />
        <div
          style={{
            background: 'rgba(167,139,250,0.08)',
            border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '8px',
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12.5px',
            color: '#C9C7DA',
            lineHeight: 1.55,
          }}
        >
          <strong style={{ color: '#A78BFA' }}>How to format:</strong> Paste each resume back-to-back.
          Between each, paste a line like <code style={{ background: '#FFFFFF', padding: '1px 6px', borderRadius: 4 }}>--- CANDIDATE 1 ---</code>, then <code style={{ background: '#FFFFFF', padding: '1px 6px', borderRadius: 4 }}>--- CANDIDATE 2 ---</code>, etc. The separator is how the triage knows where one resume ends and the next begins.
        </div>
        <textarea
          value={applications}
          onChange={(e) => setField('applications', e.target.value)}
          placeholder={`--- CANDIDATE 1 ---
Jordan Lee
jordan.lee@example.com · linkedin.com/in/jordanlee
Senior Software Engineer · Acme Inc · 2021–present
...

--- CANDIDATE 2 ---
Sam Chen
...`}
          style={applicationsTextareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
            fontFamily: "'Figtree', sans-serif",
            fontSize: '12.5px',
            color: candidateCount > 10 ? '#FF4F6A' : '#8B8AA0',
            fontWeight: candidateCount > 10 ? 700 : 500,
          }}
        >
          <span>
            {candidateCount === 0
              ? 'No candidates pasted yet'
              : `${candidateCount} candidate${candidateCount === 1 ? '' : 's'} detected`}
          </span>
          {candidateCount > 10 && (
            <span>Over the 10-candidate cap — split into batches</span>
          )}
        </div>

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
            3. Hard dealbreakers <span style={{ color: '#8B8AA0', fontWeight: 500 }}>· optional</span>
          </label>
          <textarea
            value={mustHaves}
            onChange={(e) => setField('mustHaves', e.target.value)}
            placeholder="e.g. Must have 5+ years of Python · Must be authorized to work in US · No more than two roles under 18 months in the past 5 years"
            style={textareaStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#FF4F6A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
          />
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12.5px',
              color: '#8B8AA0',
              margin: '8px 0 0',
            }}
          >
            Any candidate who fails a dealbreaker gets archived regardless of how strong they otherwise look.
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
              ? candidateCount > 10
                ? `Too many candidates (${candidateCount}/10)`
                : `Fill ${2 - filledRequired} more required field${2 - filledRequired === 1 ? '' : 's'}`
              : result
                ? 'Triage again'
                : `Triage ${candidateCount} candidate${candidateCount === 1 ? '' : 's'}`}
        </button>

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

      {result && (
        <div style={{ marginTop: '40px', maxWidth: '760px', margin: '40px auto 0', padding: '0 40px' }}>
          <ToolResult result={result} />
          <ProUpsellPanel
            recommend={['Is This Even a Real Candidate?', "What You're Actually Evaluating"]}
          />
        </div>
      )}
    </ToolPageShell>
  )
}
