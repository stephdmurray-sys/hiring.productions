'use client'

import { useState, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import './resume.css'

interface AISignal {
  signal: string
  severity: 'high' | 'medium' | 'low'
  evidence: string
  explanation: string
}

interface AnalysisResult {
  authenticityScore: number
  grade: string
  verdict: string
  riskLevel: string
  aiSignals: AISignal[]
  humanIndicators: Array<{ indicator: string; evidence: string; explanation: string }>
  buzzwordCount: { found: string[]; count: number; assessment: string }
  metricsAnalysis: { roundNumbers: number; specificNumbers: number; assessment: string }
  interviewProbes: Array<{ area: string; question: string; why: string }>
  bottomLine: string
}

export default function ResumeCheckerPage() {
  const [resumeText, setResumeText] = useState('')
  const [roleInput, setRoleInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [state, setState] = useState<'input' | 'loading' | 'partial' | 'payment'>('input')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [gateName, setGateName] = useState('')
  const [gateEmail, setGateEmail] = useState('')
  const [showDevToggle, setShowDevToggle] = useState(true)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const charCount = resumeText.length.toLocaleString()

  const formatSignalName = (name: string) => {
    return name
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
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
        // Simulate progress bar fill
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '100%'
        }
        setTimeout(() => {
          setState('partial')
          setIsLoading(false)
        }, 300)
      }
    }, 800)
  }

  const runAnalysis = async () => {
    if (!resumeText.trim() || resumeText.length < 100) {
      alert('Please paste at least 100 characters of resume text.')
      return
    }

    setIsLoading(true)
    setState('loading')
    setCurrentStep(0)
    startLoadingSteps()

    // Mock results for demo
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        authenticityScore: 61,
        grade: 'C+',
        verdict: 'Resume shows mixed signals. Some generic phrasing suggests possible AI polish, but human details present.',
        riskLevel: 'medium',
        aiSignals: [
          {
            signal: 'BUZZWORD_CLUSTERING',
            severity: 'high',
            evidence: '"Orchestrated strategic initiatives" + "leveraged cross-functional synergy"',
            explanation: 'Multiple corporate buzzwords clustered together. Humans use these sparingly.'
          },
          {
            signal: 'GENERIC_DESCRIPTIONS',
            severity: 'medium',
            evidence: '"Led diverse team to drive key outcomes"',
            explanation: 'Could describe any role. Lacks specific project name or metric.'
          },
          {
            signal: 'ROUND_NUMBERS',
            severity: 'low',
            evidence: '"Increased efficiency by 50%"',
            explanation: 'Round percentages are common AI defaults. Humans often recall exact metrics.'
          }
        ],
        humanIndicators: [
          {
            indicator: 'SPECIFIC_TECHNOLOGIES',
            evidence: 'PostgreSQL, React 18, AWS Lambda, Stripe API',
            explanation: 'Humans list real tools they\'ve used. Too specific to fabricate.'
          },
          {
            indicator: 'EXACT_METRICS',
            evidence: '"Reduced query time from 1.2s to 340ms" and "Q3 2023"',
            explanation: 'Precise numbers humans actually remember. Not round figures.'
          }
        ],
        buzzwordCount: {
          found: ['leveraged', 'orchestrated', 'synergy', 'strategic', 'innovative'],
          count: 5,
          assessment: 'Moderate buzzword usage. Could be normal corporate speak or AI assistance.'
        },
        metricsAnalysis: {
          roundNumbers: 2,
          specificNumbers: 4,
          assessment: '2 round numbers vs 4 specific. Leans toward human-written.'
        },
        interviewProbes: [
          {
            area: '"Orchestrated strategic initiatives across teams"',
            question: 'Walk me through a specific initiative. What was the problem, your exact role, and what was the outcome?',
            why: 'Forces specifics. AI-written resumes often collapse when probed.'
          },
          {
            area: '"Expert in modern cloud architecture"',
            question: 'Describe a time you had to debug a distributed system in production. What went wrong?',
            why: 'Details reveal authenticity. AI often generates plausible-sounding but generic responses.'
          }
        ],
        bottomLine: 'Probe deeper on strategic claims. Some authentic detail present but generic phrasing suggests review.'
      }
      setResult(mockResult)
    }, 3400)
  }

  const handleProceedToPayment = () => {
    setState('payment')
  }

  const devToggleState = (newState: 'input' | 'loading' | 'partial' | 'payment') => {
    setState(newState)
    if (newState === 'partial' && !result) {
      setResult({
        authenticityScore: 61,
        grade: 'C+',
        verdict: 'Resume shows mixed signals.',
        riskLevel: 'medium',
        aiSignals: [],
        humanIndicators: [],
        buzzwordCount: { found: [], count: 0, assessment: '' },
        metricsAnalysis: { roundNumbers: 0, specificNumbers: 0, assessment: '' },
        interviewProbes: [],
        bottomLine: ''
      })
    }
    setIsLoading(false)
  }

  return (
    <div style={{ background: '#0F0F12', color: '#F2F0FF', minHeight: '100vh' }}>
      <Navigation variant="dark" />

      {/* Dev Toggle */}
      {showDevToggle && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#1A1A22',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '8px',
          padding: '12px',
          zIndex: 50,
          fontSize: '11px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          maxWidth: '200px'
        }}>
          <button onClick={() => devToggleState('input')} style={{ padding: '4px 8px', background: state === 'input' ? '#6C47FF' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>Input</button>
          <button onClick={() => devToggleState('loading')} style={{ padding: '4px 8px', background: state === 'loading' ? '#6C47FF' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>Loading</button>
          <button onClick={() => devToggleState('partial')} style={{ padding: '4px 8px', background: state === 'partial' ? '#6C47FF' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>Results</button>
          <button onClick={() => devToggleState('payment')} style={{ padding: '4px 8px', background: state === 'payment' ? '#6C47FF' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>Success</button>
        </div>
      )}

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {/* STATE 1: INPUT */}
        {state === 'input' && (
          <div>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: 'rgba(108,71,255,0.15)', color: '#A78BFA', marginBottom: '20px' }}>For Job Seekers</div>
              <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>Is your resume <em style={{ fontStyle: 'italic', color: '#FF4F6A' }}>AI written?</em></h1>
              <p style={{ color: '#8B8AA0', fontSize: '16px', maxWidth: '540px' }}>Recruiters check for AI-generated content. Fix your resume before they reject it. See exactly what to improve.</p>
            </div>

            <div style={{ background: '#1A1A22', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: '#F2F0FF' }}>Check your resume</h2>
              <p style={{ color: '#8B8AA0', fontSize: '14px', marginBottom: '24px' }}>Paste your resume text. We&apos;ll scan for AI-generated sections, flag suspicious areas, and show you exactly how to fix them.</p>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#8B8AA0', marginBottom: '10px' }}>Resume Text</label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value.slice(0, 6000))}
                    placeholder="Paste your resume here..."
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
                      boxSizing: 'border-box'
                    }}
                  />
                  <span style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '11px', color: '#8B8AA0' }}>{charCount} / 6,000</span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#8B8AA0', marginBottom: '10px' }}>Role they&apos;re applying for (optional)</label>
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
                    boxSizing: 'border-box'
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
                  cursor: 'pointer'
                }}
              >
                Check My Resume
              </button>
            </div>
          </div>
        )}

        {/* STATE 2: LOADING */}
        {state === 'loading' && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '32px'
              }}>
                <div
                  ref={progressBarRef}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #6C47FF, #FF4F6A)',
                    width: '0%',
                    transition: 'width 0.8s ease'
                  }}
                />
              </div>
            </div>

            <div style={{ fontSize: '16px', color: '#F2F0FF', fontWeight: 600, height: '24px' }}>
              {currentStep === 1 && 'Reading your resume...'}
              {currentStep === 2 && 'Scanning for AI patterns...'}
              {currentStep === 3 && 'Building your report...'}
            </div>
          </div>
        )}

        {/* STATE 3: PARTIAL RESULTS + PAYWALL */}
        {state === 'partial' && result && (
          <div>
            {/* Score Card */}
            <div style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '40px 24px',
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              <div style={{ fontSize: '60px', fontWeight: 900, color: '#F2F0FF', marginBottom: '12px' }}>
                {result.authenticityScore}
              </div>
              <div style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 700,
                background: result.authenticityScore >= 70 ? 'rgba(45,106,79,0.15)' : result.authenticityScore >= 50 ? 'rgba(180,83,9,0.15)' : 'rgba(220,38,38,0.15)',
                color: result.authenticityScore >= 70 ? '#2D6A4F' : result.authenticityScore >= 50 ? '#B45309' : '#DC2626',
                marginBottom: '20px'
              }}>
                Grade: {result.grade}
              </div>
              <p style={{ color: '#F2F0FF', fontSize: '15px', marginBottom: '12px' }}>{result.verdict}</p>
              <p style={{ color: '#A78BFA', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{result.bottomLine}</p>
            </div>

            {/* 3 Visible Insight Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {result.aiSignals.slice(0, 3).map((signal, i) => (
                <div key={i} style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: signal.severity === 'high' ? 'rgba(220,38,38,0.15)' : signal.severity === 'medium' ? 'rgba(180,83,9,0.15)' : 'rgba(45,106,79,0.15)',
                    color: signal.severity === 'high' ? '#DC2626' : signal.severity === 'medium' ? '#B45309' : '#2D6A4F',
                    marginBottom: '12px'
                  }}>
                    {signal.severity}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#F2F0FF', marginBottom: '8px' }}>{formatSignalName(signal.signal)}</div>
                  <p style={{ color: '#8B8AA0', fontSize: '13px' }}>{signal.explanation}</p>
                </div>
              ))}
            </div>

            {/* Blurred Cards + Paywall Overlay */}
            <div style={{ position: 'relative', marginBottom: '32px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                filter: 'blur(4px)',
                pointerEvents: 'none',
                opacity: 0.5
              }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{
                    background: '#1A1A22',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '20px',
                    height: '120px'
                  }} />
                ))}
              </div>

              {/* Paywall Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(108,71,255,0.4)',
                  borderRadius: '16px',
                  padding: '32px',
                  maxWidth: '420px',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: 'rgba(108,71,255,0.15)', color: '#A78BFA', marginBottom: '16px' }}>YOUR FULL REPORT</div>

                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#F2F0FF', marginBottom: '12px', fontFamily: 'Figtree, sans-serif' }}>14 more gaps found in your resume.</h3>

                  <p style={{ color: '#8B8AA0', fontSize: '14px', marginBottom: '28px' }}>See every AI-flagged section, the exact phrases triggering rejection, and how to fix each one.</p>

                  <button
                    onClick={handleProceedToPayment}
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
                      marginBottom: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Unlock All 20 Tools — $20/year
                  </button>

                  <p style={{ color: '#8B8AA0', fontSize: '13px', marginBottom: '20px' }}>Less than Jobscan charges for one day. Cancel anytime.</p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', marginTop: '20px' }}>
                    <p style={{ color: '#8B8AA0', fontSize: '13px', marginBottom: '12px' }}>Already a member? Enter your email to restore access</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={gateEmail}
                        onChange={(e) => setGateEmail(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          background: '#0F0F12',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '8px',
                          color: '#F2F0FF',
                          fontSize: '13px',
                          fontFamily: 'Figtree, sans-serif'
                        }}
                      />
                      <button style={{
                        padding: '10px 16px',
                        background: 'transparent',
                        color: '#A78BFA',
                        border: '1.5px solid rgba(108,71,255,0.5)',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13px',
                        fontFamily: 'Figtree, sans-serif',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}>Restore</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STATE 4: PAYMENT SUCCESS */}
        {state === 'payment' && (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            {/* Checkmark Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 32px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px'
            }}>
              ✓
            </div>

            <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#F2F0FF', marginBottom: '16px', fontFamily: 'Figtree, sans-serif' }}>You&apos;re in.</h1>
            <p style={{ fontSize: '18px', color: '#8B8AA0', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>All 20 tools are unlocked. No limits, no ads, ever.</p>

            {/* Tool Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
              {[
                { title: 'Resume AI Checker', tag: 'Candidate', tagColor: '#A78BFA' },
                { title: 'LinkedIn Optimizer', tag: 'Candidate', tagColor: '#A78BFA' },
                { title: 'JD SEO Scorecard', tag: 'Hiring', tagColor: '#FF4F6A' },
                { title: 'Interview Prep', tag: 'Candidate', tagColor: '#A78BFA' }
              ].map((tool, i) => (
                <div key={i} style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'left'
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', color: tool.tagColor }}>{tool.tag}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#F2F0FF' }}>{tool.title}</div>
                  <div style={{ fontSize: '12px', color: '#8B8AA0', marginTop: '8px' }}>Access all features and data.</div>
                </div>
              ))}
            </div>

            {/* RepVera CTA */}
            <div style={{
              background: 'rgba(108,71,255,0.1)',
              border: '1px solid rgba(108,71,255,0.25)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', background: 'rgba(255,79,106,0.15)', color: '#FF4F6A', marginBottom: '16px' }}>ONE MORE THING</div>

              <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#F2F0FF', marginBottom: '12px', fontFamily: 'Figtree, sans-serif' }}>The best candidates are already building their RepVera.</h2>

              <p style={{ color: '#8B8AA0', fontSize: '15px', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>Your tools prove you know how to hire and how to get hired. RepVera proves who you actually are to work with. Start yours — it&apos;s free.</p>

              <button style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '15px',
                fontFamily: 'Figtree, sans-serif',
                cursor: 'pointer'
              }}>
                Start Your RepVera — Free
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
