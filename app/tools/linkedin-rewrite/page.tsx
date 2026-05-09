'use client'

import { useState, useEffect, useRef } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { LinkedinReport } from '@/components/linkedin-report'
import { isMember, activateMembership, clearMembership } from '@/lib/membership'

type ViewState = 'input' | 'loading' | 'result' | 'error'

export default function LinkedinRewritePage() {
  const [headline, setHeadline] = useState('')
  const [about, setAbout] = useState('')
  const [experience, setExperience] = useState('')
  const [targetRole, setTargetRole] = useState('')
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

  const runRewrite = async () => {
    if (!headline.trim() || !about.trim() || !experience.trim()) {
      alert('Paste your headline, About section, and most recent role.')
      return
    }
    setState('loading')
    setCurrentStep(0)
    const interval = startLoadingSteps()

    try {
      const inputs: Record<string, string> = { headline, about, experience }
      if (targetRole.trim()) inputs.targetRole = targetRole.trim()

      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: 'linkedin-rewrite', inputs }),
      })

      clearInterval(interval)

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Could not rewrite your profile — try again.')
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
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%'
    }
  }

  const startOver = () => {
    setHeadline('')
    setAbout('')
    setExperience('')
    setTargetRole('')
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
  const fieldInput: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: '#0F0F12',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#F2F0FF',
    fontFamily: 'Figtree, sans-serif',
    fontSize: '14px',
    boxSizing: 'border-box',
  }
  const fieldTextarea: React.CSSProperties = {
    ...fieldInput,
    minHeight: '160px',
    fontFamily: 'Figtree, monospace',
    fontSize: '13px',
    lineHeight: 1.7,
    resize: 'vertical',
  }

  return (
    <ToolPageShell
      toolName="Your LinkedIn Audition Reel"
      toolDescription="Your headline rewritten three ways. Your About section rewritten completely. Your most recent role in impact-driven bullets. Actual rewrites — not advice."
      category="candidate"
      isFree={false}
      gated={false}
    >
      {/* Dev toggle — visible only in development */}
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
              <label style={fieldLabel}>Your current headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Paste your current LinkedIn headline exactly as it reads."
                style={fieldInput}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={fieldLabel}>Your current About section</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value.slice(0, 4000))}
                placeholder="Paste your current LinkedIn About section. If it's blank, write a few sentences about what you do and what you're looking for."
                style={fieldTextarea}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={fieldLabel}>Your most recent role description</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value.slice(0, 4000))}
                placeholder="Paste your current job title, company, dates, and the bullets from your most recent LinkedIn experience section."
                style={fieldTextarea}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={fieldLabel}>
                Target next role{' '}
                <span style={{ color: '#6B6B7B', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
                  — optional, but helps tune the rewrite
                </span>
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. VP of People at a Series C company"
                style={fieldInput}
              />
            </div>

            <button
              onClick={runRewrite}
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
              Rewrite my profile
            </button>

            <p style={{ marginTop: '14px', fontSize: '12px', color: '#8B8AA0', textAlign: 'center' }}>
              {isMemberUser
                ? 'Members see the full rewrites.'
                : 'See the recruiter’s read free. The rewrites are for members.'}
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
                  transition: 'width 0.8s ease',
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
              {currentStep <= 1 && 'Reading your reel...'}
              {currentStep === 2 && 'Spotting the generic openers...'}
              {currentStep === 3 && 'Rewriting it for you...'}
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
                Your reel, rewritten.
              </h2>
              <p style={{ color: '#8B8AA0', fontSize: '15px', maxWidth: '620px' }}>
                Three headline options, an end-to-end About section, and your most recent role in impact bullets. Copy-paste-ready. Fill in any [your number] placeholders with your actual specifics before you publish.
              </p>
            </div>

            <LinkedinReport result={result} isMember={isMemberUser} />

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
                Edit and re-run
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
                Start over with a different profile
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
              {errorMessage || 'The rewriter didn’t come back. Try once more.'}
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
