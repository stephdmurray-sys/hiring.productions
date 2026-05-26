'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/**
 * Dashboard preview — homepage conversion lever.
 *
 * Research basis (see PLATFORM-VISION.md):
 *   - Linear, Loom, Cal.com all show the product on the homepage rather
 *     than describing it. Conversion uplift on this pattern is documented
 *     across multiple SaaS case studies (Pendo, Mutiny, Reforge).
 *   - Goal gradient (Hull 1932): a visible progress bar pulls visitors
 *     toward completion. Showing one that's already partially filled
 *     primes the "I want to complete this" reflex.
 *   - Endowed progress (Nunes & Drèze 2006): showing 2 of 8 steps pre-
 *     done suggests the visitor is closer than they thought.
 *   - Specificity over abstraction: concrete step names beat generic
 *     "tools to help your search" copy.
 *
 * What it does:
 *   - Renders a stylized non-interactive mock of /dashboard
 *   - On scroll into view: progress bar fills, steps check off in
 *     sequence, recent insights fade in
 *   - Uses IntersectionObserver so animation fires once (no replay,
 *     no battery drain) and only when the visitor can see it
 *
 * Where it sits:
 *   - Homepage, between the three moment cards and the "Hired."
 *     destination. The visitor: sees the cards (try a tool) → sees
 *     the dashboard (what happens after I sign up) → sees the
 *     destination (where this ends up).
 */

const STEPS = [
  { label: 'Define your target role', tool: 'target-role' },
  { label: 'Run a recruiter visibility check', tool: 'recruiter-search-rank' },
  { label: 'Audit your LinkedIn audition reel', tool: 'linkedin-rewrite' },
  { label: 'Run your resume through the AI detector', tool: 'resume-ai-check' },
  { label: 'Prep for your first interview', tool: 'rehearsal-room' },
  { label: 'Decode an offer', tool: 'offer-pitch' },
]

const SAMPLE_INSIGHTS = [
  { title: 'Where Do You Rank in a Recruiter Search?', when: '2 days ago' },
  { title: 'Your LinkedIn — Rewritten', when: '3 days ago' },
  { title: 'What Words Are Recruiters Searching For?', when: '5 days ago' },
]

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    // Advance the checkoff one step at a time. Land at 4 of 6 = 67% — a
    // visibly-partway state that primes the goal-gradient instinct
    // without claiming the user has done more than feels real.
    const target = 4
    const intervals: NodeJS.Timeout[] = []
    for (let i = 1; i <= target; i++) {
      intervals.push(setTimeout(() => setStep(i), 380 * i + 250))
    }
    return () => intervals.forEach(clearTimeout)
  }, [visible])

  const pct = (step / STEPS.length) * 100

  return (
    <section
      style={{
        padding: 'clamp(56px, 8vw, 96px) 24px',
        background: '#FAF8F3',
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#5A4FE0',
              marginBottom: 14,
            }}
          >
            After you sign in
          </div>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.06,
              color: '#1A1A22',
              margin: '0 0 14px',
            }}
          >
            Your search, day by day.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16.5,
              color: '#5A5A6E',
              maxWidth: 580,
              margin: '0 auto',
              lineHeight: 1.55,
            }}
          >
            Every tool you run is saved. Every step you complete shows up here.
            Your whole search, in one place. Scripted scene by scene.
          </p>
        </div>

        {/* The mock dashboard card */}
        <div
          ref={containerRef}
          style={{
            background: '#FFFFFF',
            border: '1px solid #ECECF2',
            borderRadius: 18,
            padding: 'clamp(20px, 3vw, 32px)',
            boxShadow: '0 12px 40px rgba(108,71,255,0.10)',
            maxWidth: 780,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* "Preview" pill — honesty marker, this is illustrative */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: 24,
              padding: '4px 10px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#FFFFFF',
              fontFamily: "'Figtree', sans-serif",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 100,
            }}
          >
            Preview · Your dashboard
          </div>

          {/* Greeting */}
          <div style={{ marginBottom: 22, paddingTop: 6 }}>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5A4FE0',
                marginBottom: 6,
              }}
            >
              Your search · The Networking
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 'clamp(20px, 2.6vw, 26px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#1A1A22',
                lineHeight: 1.1,
              }}
            >
              Welcome back, Sarah.
            </div>
          </div>

          {/* Progress strip */}
          <div
            style={{
              background: '#FAFAFB',
              border: '1px solid #ECECF2',
              borderRadius: 12,
              padding: '16px 18px',
              marginBottom: 18,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 13.5,
                  color: '#1A1A22',
                }}
              >
                Your search system
              </span>
              <span
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 12.5,
                  color: '#5A5A6E',
                }}
              >
                {step} of {STEPS.length} steps complete
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 8,
                background: '#F4F1FF',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  transition: 'width 0.7s cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
              />
            </div>
          </div>

          {/* Step checklist */}
          <div
            style={{
              marginBottom: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {STEPS.map((s, i) => {
              const done = i < step
              return (
                <div
                  key={s.tool}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 4px',
                    transition: 'opacity 0.3s ease',
                    opacity: visible ? 1 : 0.6,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: done
                        ? 'linear-gradient(135deg, #6C47FF, #FF4F6A)'
                        : '#FFFFFF',
                      border: done ? 'none' : '1.5px solid #ECECF2',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)',
                      transform: done ? 'scale(1)' : 'scale(0.92)',
                    }}
                  >
                    {done && (
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 5.5L4.5 8L9 2.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: done ? 500 : 600,
                      fontSize: 14,
                      color: done ? '#5A5A6E' : '#1A1A22',
                      textDecoration: done ? 'line-through' : 'none',
                      textDecorationColor: '#ECECF2',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Recent insights — stack visualization */}
          <div
            style={{
              borderTop: '1px solid #ECECF2',
              paddingTop: 18,
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#5A4FE0',
                marginBottom: 12,
              }}
            >
              Recent Insights
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SAMPLE_INSIGHTS.map((insight, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 14px',
                    background: '#FAFAFB',
                    border: '1px solid #ECECF2',
                    borderRadius: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(6px)',
                    transition: `all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) ${
                      0.4 + i * 0.18
                    }s`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#1A1A22',
                    }}
                  >
                    {insight.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: 11.5,
                      color: '#8B8AA0',
                      flexShrink: 0,
                    }}
                  >
                    {insight.when}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action under the preview */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(28px, 4vw, 40px)' }}>
          <Link
            href="/sign-in"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '15px 32px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: '#FFFFFF',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: '0.005em',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 14px 32px rgba(108,71,255,0.22)',
              transition: 'transform 0.2s ease',
            }}
            className="hp-dashboard-preview-cta"
          >
            Start your search, free →
          </Link>
          <style>{`.hp-dashboard-preview-cta:hover { transform: translateY(-2px); }`}</style>
          <div
            style={{
              marginTop: 12,
              fontFamily: "'Figtree', sans-serif",
              fontSize: 12.5,
              color: '#8B8AA0',
            }}
          >
            Your saved insights persist forever on Pro. 30 days on free.
          </div>
        </div>
      </div>
    </section>
  )
}
