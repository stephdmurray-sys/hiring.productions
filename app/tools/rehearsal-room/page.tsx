'use client'

import { useState, useEffect, useRef } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { RehearsalReport } from '@/components/rehearsal-report'
import { isMember, activateMembership, clearMembership } from '@/lib/membership'

type ViewState = 'input' | 'loading' | 'result' | 'error'

export default function RehearsalRoomPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')
  const [state, setState] = useState<ViewState>('input')
  const [result, setResult] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isMemberUser, setIsMemberUser] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    setIsMemberUser(isMember())
  }, [])

  useEffect(() => {
    if (state === 'result' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [state])

  const startLoadingSteps = () => {
    const steps = [1, 2, 3, 4]
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setCurrentStep(i + 1)
        i++
      } else {
        clearInterval(interval)
        if (progressBarRef.current) progressBarRef.current.style.width = '100%'
      }
    }, 900)
    return interval
  }

  const runGeneration = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 100) {
      alert('Paste the full job description (at least 100 characters). The whole tool is calibrated to it.')
      return
    }
    setState('loading')
    setCurrentStep(0)
    const interval = startLoadingSteps()

    try {
      const inputs: Record<string, string> = { jobDescription: jobDescription.trim() }
      if (resume.trim()) inputs.resume = resume.trim()

      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: 'rehearsal-questions', inputs }),
      })

      clearInterval(interval)

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Could not generate your interview script — try again.')
      }
      const data = await response.json()
      setResult(data.result)
      setState('result')
    } catch (err) {
      clearInterval(interval)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setErrorMessage(msg)
      setState('error')
    }
  }

  const editAndRerun = () => {
    setState('input')
    setResult('')
    setErrorMessage('')
    setCurrentStep(0)
    if (progressBarRef.current) progressBarRef.current.style.width = '0%'
  }

  const startOver = () => {
    setJobDescription('')
    setResume('')
    editAndRerun()
  }

  const toggleMembership = () => {
    if (isMemberUser) {
      clearMembership()
      setIsMemberUser(false)
    } else {
      activateMembership('dev@hiring.productions')
      setIsMemberUser(true)
    }
  }

  const fieldLabel: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#8B8AA0',
    marginBottom: '10px',
  }
  const fieldTextarea: React.CSSProperties = {
    width: '100%',
    minHeight: '200px',
    padding: '14px 16px',
    background: '#0F0F12',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#F2F0FF',
    fontFamily: 'Figtree, monospace',
    fontSize: '13px',
    lineHeight: 1.7,
    resize: 'vertical',
    boxSizing: 'border-box',
  }

  return (
    <ToolPageShell
      toolName="The Rehearsal Room"
      toolDescription="Paste a job description, get ten interview questions calibrated to that exact role — with what they're really assessing, the weak vs strong answer pattern, and the literal opening line you can use."
      category="candidate"
      isFree={false}
      gated={false}
    >
      {isClient && process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#1A1A22',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '10px 14px',
            zIndex: 50,
            fontSize: '11px',
            fontFamily: 'Figtree, sans-serif',
            color: '#F2F0FF',
          }}
        >
          <div style={{ marginBottom: '6px', color: '#8B8AA0' }}>
            Dev: {isMemberUser ? 'MEMBER' : 'NON-MEMBER'}
          </div>
          <button
            onClick={toggleMembership}
            style={{
              padding: '4px 10px',
              background: '#6C47FF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            Toggle
          </button>
        </div>
      )}

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 60px' }}>
        {/* INPUT */}
        {state === 'input' && (
          <div
            style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '24px',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <label style={fieldLabel}>
                The job description{' '}
                <span
                  style={{
                    color: '#FF4F6A',
                    fontWeight: 800,
                    textTransform: 'none',
                    letterSpacing: 0,
                    marginLeft: '4px',
                  }}
                >
                  required
                </span>
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={10000}
                placeholder="Paste the full job description for the role you're interviewing for. Every question is calibrated to what THIS role actually does and what the company is really looking for."
                style={{ ...fieldTextarea, minHeight: '260px' }}
              />
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#8B8AA0',
                  textAlign: 'right',
                }}
              >
                {jobDescription.length.toLocaleString()} / 10,000
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={fieldLabel}>
                Your resume{' '}
                <span
                  style={{
                    color: '#6B6B7B',
                    fontWeight: 500,
                    textTransform: 'none',
                    letterSpacing: 0,
                  }}
                >
                  — optional, lets at least 3 questions probe your specific background
                </span>
              </label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                maxLength={8000}
                placeholder="Paste your resume here so the questions can reference your specific role transitions, gaps, and pivots — the things a sharp interviewer would notice."
                style={fieldTextarea}
              />
            </div>

            <button
              onClick={runGeneration}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '15px',
                fontFamily: 'Figtree, sans-serif',
                cursor: 'pointer',
              }}
            >
              Generate my interview script
            </button>

            <p style={{ marginTop: '14px', fontSize: '12px', color: '#8B8AA0', textAlign: 'center' }}>
              {isMemberUser
                ? 'Members see all ten questions with full breakdowns.'
                : 'See the kind of interview + your first question free. The full script is for members.'}
            </p>
          </div>
        )}

        {/* LOADING */}
        {state === 'loading' && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div
              style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '32px',
              }}
            >
              <div
                ref={progressBarRef}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #6C47FF, #FF4F6A)',
                  width: '0%',
                  transition: 'width 0.9s ease',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '16px',
                color: '#F2F0FF',
                fontWeight: 600,
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              {currentStep <= 1 && 'Reading the job description...'}
              {currentStep === 2 && 'Mapping the kind of interview this is...'}
              {currentStep === 3 && 'Drafting the ten questions...'}
              {currentStep === 4 && 'Writing the breakdowns and opening lines...'}
            </div>
          </div>
        )}

        {/* RESULT */}
        {state === 'result' && result && (
          <div ref={resultRef}>
            <div style={{ marginBottom: '24px' }}>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                  fontFamily: 'Figtree, sans-serif',
                  color: '#F2F0FF',
                }}
              >
                Your script for this interview.
              </h2>
              <p style={{ color: '#8B8AA0', fontSize: '15px', maxWidth: '620px' }}>
                Ten questions across five categories. For each: what they're really assessing, what a weak answer sounds like, what a strong one sounds like, and your opening line. Read it over coffee before you walk in.
              </p>
            </div>

            <RehearsalReport result={result} isMember={isMemberUser} />

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <button
                onClick={editAndRerun}
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '15px',
                  fontFamily: 'Figtree, sans-serif',
                  cursor: 'pointer',
                  marginRight: '12px',
                }}
              >
                Try a different JD
              </button>
              <button
                onClick={startOver}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  color: '#8B8AA0',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '13px',
                  fontFamily: 'Figtree, sans-serif',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(139,138,160,0.4)',
                  textUnderlineOffset: '4px',
                }}
              >
                Start over
              </button>
            </div>
          </div>
        )}

        {/* ERROR */}
        {state === 'error' && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 900,
                marginBottom: '12px',
                fontFamily: 'Figtree, sans-serif',
                color: '#F2F0FF',
              }}
            >
              Something broke on our end.
            </h2>
            <p
              style={{
                color: '#8B8AA0',
                fontSize: '15px',
                marginBottom: '32px',
                maxWidth: '500px',
                margin: '0 auto 32px',
              }}
            >
              {errorMessage || 'The script generator didn’t come back. Try once more.'}
            </p>
            <button
              onClick={editAndRerun}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '15px',
                fontFamily: 'Figtree, sans-serif',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </ToolPageShell>
  )
}
