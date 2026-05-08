'use client'

import { useState, useRef, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { ResumeReport } from '@/components/resume-report'
import './resume.css'

type ViewState = 'input' | 'loading' | 'result' | 'error'

export default function ResumeCheckerPage() {
  const [resumeText, setResumeText] = useState('')
  const [roleInput, setRoleInput] = useState('')
  const [state, setState] = useState<ViewState>('input')
  const [result, setResult] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const charCount = resumeText.length.toLocaleString()

  useEffect(() => {
    if (state === 'result' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [state])

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
      if (roleInput.trim()) {
        inputs.targetRole = roleInput.trim()
      }

      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: 'resume-ai-check', inputs }),
      })

      clearInterval(interval)

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong analyzing your resume.')
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
    // Keeps resumeText and roleInput so user can iterate on the same resume
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
    setRoleInput('')
    editAndRecheck()
  }

  return (
    <div style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* INPUT */}
        {state === 'input' && (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'rgba(108,71,255,0.15)',
                  color: '#A78BFA',
                  marginBottom: '20px',
                }}
              >
                Free — for job seekers
              </div>
              <h1
                style={{
                  fontSize: 'clamp(38px, 6vw, 72px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                Does your resume read as <em style={{ fontStyle: 'italic', color: '#FF4F6A' }}>AI?</em>
              </h1>
              <p style={{ color: '#8B8AA0', fontSize: '16px', maxWidth: '620px', lineHeight: 1.6 }}>
                Recruiters are reading every resume now with one extra question in their head: did a person write this, or did ChatGPT? Paste yours. I&apos;ll tell you which lines give it away, what to rewrite, and what to add that no AI would generate.
              </p>
            </div>

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
                  Resume text
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value.slice(0, 6000))}
                    placeholder="Paste your resume here — text only, no formatting needed."
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
                    {charCount} / 6,000
                  </span>
                </div>
              </div>

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
                  Role you&apos;re applying for (optional)
                </label>
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  placeholder="e.g., Senior Product Manager, Staff Engineer"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0F0F12',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#F2F0FF',
                    fontFamily: 'Figtree, sans-serif',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <button
                onClick={runAnalysis}
                className="btn-primary"
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
                Check my resume
              </button>

              <p style={{ marginTop: '14px', fontSize: '12px', color: '#8B8AA0', textAlign: 'center' }}>
                No signup. No paywall. The whole report — free.
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
                height: '24px',
                fontFamily: 'Figtree, sans-serif',
              }}
            >
              {currentStep === 0 && 'Reading your resume...'}
              {currentStep === 1 && 'Reading your resume...'}
              {currentStep === 2 && 'Looking for the AI tells...'}
              {currentStep === 3 && 'Writing your report...'}
            </div>
          </div>
        )}

        {/* RESULT */}
        {state === 'result' && result && (
          <div ref={resultRef}>
            <div style={{ marginBottom: '32px' }}>
              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                  fontFamily: 'Figtree, sans-serif',
                }}
              >
                Here&apos;s what a recruiter sees.
              </h1>
              <p style={{ color: '#8B8AA0', fontSize: '15px' }}>
                Read it like you&apos;re hearing it from a colleague over coffee. Direct. Specific. Yours to use.
              </p>
            </div>

            <ResumeReport result={result} />

            {/* Soft CTA below the document — outside the 'paper' so the report feels complete */}
            <div
              style={{
                maxWidth: '780px',
                margin: '32px auto 0',
                padding: '24px 28px',
                background: 'rgba(108,71,255,0.08)',
                border: '1px solid rgba(108,71,255,0.2)',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  color: '#A78BFA',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}
              >
                Want to go deeper?
              </div>
              <div style={{ fontSize: '16px', color: '#F2F0FF', marginBottom: '14px', lineHeight: 1.5 }}>
                That was the AI tells. <strong style={{ fontWeight: 700 }}>Your resume through a recruiter&apos;s eyes</strong> shows you the whole internal monologue — what they skip, what makes them pause, and the call they make in 30 seconds.
              </div>
              <a
                href="/tools/resume-recruiter-eyes"
                style={{
                  fontFamily: 'Figtree, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  background: 'linear-gradient(135deg, #6C47FF 0%, #FF4F6A 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textDecoration: 'none',
                }}
              >
                See your resume through a recruiter&apos;s eyes →
              </a>
            </div>

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
                Start over with a different resume
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
    </div>
  )
}
