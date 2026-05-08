'use client'

import { useState, useEffect, useRef } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { RecruiterReport } from '@/components/recruiter-report'
import { EditMemo } from '@/components/edit-memo'
import { isMember, activateMembership, clearMembership } from '@/lib/membership'

type ViewState = 'input' | 'loading' | 'result' | 'memo' | 'error'

export default function ResumeRecruiterEyesPage() {
  const [resumeText, setResumeText] = useState('')
  const [jdText, setJdText] = useState('')
  const [state, setState] = useState<ViewState>('input')
  const [result, setResult] = useState('')
  const [editMemo, setEditMemo] = useState('')
  const [applying, setApplying] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [isMemberUser, setIsMemberUser] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const memoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    setIsMemberUser(isMember())
  }, [])

  useEffect(() => {
    if (state === 'result' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (state === 'memo' && memoRef.current) {
      memoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [state])

  const generateMemo = async () => {
    if (!result || applying) return
    setApplying(true)
    setErrorMessage('')
    try {
      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'resume-edit-memo',
          inputs: { resume: resumeText, analysis: result },
        }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Could not generate the edit memo — try again.')
      }
      const data = await response.json()
      setEditMemo(data.result)
      setState('memo')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setErrorMessage(msg)
      setState('error')
    } finally {
      setApplying(false)
    }
  }

  const backToReport = () => {
    setState('result')
  }

  const startLoadingSteps = () => {
    const steps = [1, 2, 3]
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setCurrentStep(i + 1)
        i++
      } else {
        clearInterval(interval)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '100%'
        }
      }
    }, 800)
    return interval
  }

  const runAnalysis = async () => {
    if (!resumeText.trim() || resumeText.length < 100) {
      alert('Paste at least 100 characters of resume text.')
      return
    }

    setState('loading')
    setCurrentStep(0)
    const interval = startLoadingSteps()

    try {
      const inputs: Record<string, string> = { resume: resumeText }
      if (jdText.trim()) {
        inputs.jobDescription = jdText.trim()
      }

      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: 'resume-recruiter-eyes', inputs }),
      })

      clearInterval(interval)

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong reading your resume.')
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

  const editAndRecheck = () => {
    setState('input')
    setResult('')
    setErrorMessage('')
    setCurrentStep(0)
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%'
    }
  }

  const startOver = () => {
    setResumeText('')
    setJdText('')
    editAndRecheck()
  }

  // Dev toggle: simulate member/non-member without going through Stripe
  const toggleMembership = () => {
    if (isMemberUser) {
      clearMembership()
      setIsMemberUser(false)
    } else {
      activateMembership('dev@hiring.productions')
      setIsMemberUser(true)
    }
  }

  return (
    <ToolPageShell
      toolName="Your Resume, Through a Recruiter's Eyes"
      toolDescription="The internal monologue of a recruiter reading your resume. What they notice, what they skip, what makes them pause, and the call they make in 30 seconds."
      category="candidate"
      isFree={false}
      gated={false}
    >
      {/* Dev toggle — only visible in development */}
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
          <div>
            <div
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '24px',
              }}
            >
              {/* Resume */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#8B8AA0',
                    marginBottom: '10px',
                  }}
                >
                  Your resume
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value.slice(0, 8000))}
                    placeholder="Paste your full resume here — text only. The more detail, the more accurate the read."
                    style={{
                      width: '100%',
                      minHeight: '240px',
                      padding: '16px',
                      background: '#0F0F12',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '8px',
                      color: '#F2F0FF',
                      fontFamily: 'Figtree, monospace',
                      fontSize: '13px',
                      lineHeight: 1.7,
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      fontSize: '11px',
                      color: '#8B8AA0',
                    }}
                  >
                    {resumeText.length.toLocaleString()} / 8,000
                  </span>
                </div>
              </div>

              {/* Job description (optional) */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#8B8AA0',
                    marginBottom: '10px',
                  }}
                >
                  Target job description{' '}
                  <span style={{ color: '#6B6B7B', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
                    — optional but recommended for a tailored read
                  </span>
                </label>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value.slice(0, 8000))}
                  placeholder="Paste the full job description for the role you're targeting. Without this you'll get a general read; with it, you'll see exactly where you fit and where you don't."
                  style={{
                    width: '100%',
                    minHeight: '160px',
                    padding: '16px',
                    background: '#0F0F12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#F2F0FF',
                    fontFamily: 'Figtree, monospace',
                    fontSize: '13px',
                    lineHeight: 1.7,
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                onClick={runAnalysis}
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
                Get the recruiter&apos;s read
              </button>

              <p style={{ marginTop: '14px', fontSize: '12px', color: '#8B8AA0', textAlign: 'center' }}>
                {isMemberUser
                  ? 'Members see the full read.'
                  : 'See the verdict free. The full monologue is for members.'}
              </p>
            </div>
          </div>
        )}

        {/* LOADING */}
        {state === 'loading' && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ marginBottom: '40px' }}>
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
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: '16px',
                color: '#F2F0FF',
                fontWeight: 600,
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              {currentStep <= 1 && 'Reading your resume...'}
              {currentStep === 2 && (jdText.trim() ? 'Mapping it against the role...' : 'Forming an opinion...')}
              {currentStep === 3 && 'Writing the report...'}
            </div>
          </div>
        )}

        {/* RESULT */}
        {state === 'result' && result && (
          <div ref={resultRef}>
            <div style={{ marginBottom: '32px' }}>
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
                Here&apos;s what a recruiter sees.
              </h2>
              <p style={{ color: '#8B8AA0', fontSize: '15px' }}>
                Read it like you&apos;re hearing it from a colleague over coffee. Direct. Specific. Yours to use.
              </p>
            </div>

            <RecruiterReport
              result={result}
              isMember={isMemberUser}
              onApplyChanges={isMemberUser ? generateMemo : undefined}
              applying={applying}
            />

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <button
                onClick={editAndRecheck}
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
                Edit and re-check
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

        {/* EDIT MEMO */}
        {state === 'memo' && editMemo && (
          <div ref={memoRef}>
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
                The recruiter&apos;s edit memo.
              </h2>
              <p style={{ color: '#8B8AA0', fontSize: '15px', maxWidth: '620px' }}>
                Specific direction — not finished writing. You make the edits in your own voice so your resume keeps its voice. When you&apos;re done, run it back through the AI checker.
              </p>
            </div>

            <EditMemo memo={editMemo} onBack={backToReport} />
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
            <p style={{ color: '#8B8AA0', fontSize: '15px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              {errorMessage || 'The analyzer didn’t come back. Try once more.'}
            </p>
            <button
              onClick={editAndRecheck}
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
