'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Sentiment = 'good' | 'flag' | 'neutral'

type Beat = {
  t: string
  text: string
  sentiment: Sentiment
}

const BEATS: Beat[] = [
  { t: '0:01', text: 'Senior PM. B2B SaaS, last two roles. OK.', sentiment: 'neutral' },
  { t: '0:01', text: 'Tenure: 18 months, then 14. That’s a pattern.', sentiment: 'flag' },
  { t: '0:02', text: 'Skipping the summary. I always do.', sentiment: 'neutral' },
  { t: '0:02', text: 'Going straight to the most recent role.', sentiment: 'neutral' },
  { t: '0:03', text: '“Led cross-functional team of 12.” Specific. Good.', sentiment: 'good' },
  { t: '0:03', text: 'Next bullet: “drove key initiatives.” That’s nothing.', sentiment: 'flag' },
  { t: '0:04', text: 'Three bullets in a row with no metric. Why.', sentiment: 'flag' },
  { t: '0:04', text: 'Bold formatting in the wrong places. ATS will mangle this.', sentiment: 'flag' },
  { t: '0:05', text: 'Earlier role at a shop I respect. Bumping back up.', sentiment: 'good' },
  { t: '0:05', text: '2021–2022 gap, no explanation anywhere on the page.', sentiment: 'flag' },
  { t: '0:06', text: 'Decision: yes pile. With a question mark.', sentiment: 'neutral' },
]

const STEP_MS = 650
const VERDICT_DELAY_MS = 500

export function RecruiterReadingPreview() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showVerdict, setShowVerdict] = useState(false)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (visibleCount >= BEATS.length) {
      const v = setTimeout(() => setShowVerdict(true), VERDICT_DELAY_MS)
      return () => clearTimeout(v)
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [started, visibleCount])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount, showVerdict])

  const replay = () => {
    setVisibleCount(0)
    setShowVerdict(false)
    setStarted(true)
  }

  const sentimentColor = (s: Sentiment) => {
    if (s === 'good') return '#5EE6A8'
    if (s === 'flag') return '#FF4F6A'
    return 'rgba(167,139,250,0.55)'
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0F0F12',
        borderBottom: '1px solid rgba(108,71,255,0.12)',
        padding: '120px 24px 130px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 700px 500px at 50% 0%, rgba(108,71,255,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '880px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#A78BFA',
            marginBottom: '24px',
          }}
        >
          RECRUITER INSIGHT — LIVE
        </div>

        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            color: '#F2F0FF',
            marginBottom: '20px',
          }}
        >
          Six seconds with a resume. Out loud.
        </h2>

        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: 1.7,
            color: '#8B8AA0',
            maxWidth: '600px',
            margin: '0 auto 56px',
          }}
        >
          The internal monologue of a recruiter reading a resume — start to verdict, with nothing softened. This is what every Recruiter Insight does. From both sides.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '760px',
          margin: '0 auto',
          background: '#14141B',
          border: '1px solid rgba(108,71,255,0.25)',
          borderRadius: '18px',
          boxShadow: '0 30px 100px rgba(108,71,255,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Screen header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 22px',
            background: '#0F0F12',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3A3A45' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3A3A45' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3A3A45' }} />
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: '12px',
              color: '#8B8AA0',
              letterSpacing: '0.02em',
            }}
          >
            recruiter — reading senior-pm-resume.pdf
          </div>
          <div
            style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: '11px',
              color: '#A78BFA',
              letterSpacing: '0.05em',
            }}
          >
            {showVerdict
              ? '0:06 • done'
              : visibleCount === 0
              ? '0:00 • reading'
              : `${BEATS[Math.min(visibleCount, BEATS.length) - 1]?.t ?? '0:00'} • reading`}
          </div>
        </div>

        {/* Monologue */}
        <div
          ref={scrollRef}
          style={{
            padding: '28px 28px 12px',
            minHeight: '420px',
            maxHeight: '420px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          {BEATS.slice(0, visibleCount).map((beat, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                padding: '10px 0',
                borderLeft: `2px solid ${sentimentColor(beat.sentiment)}`,
                paddingLeft: '14px',
                marginBottom: '6px',
                animation: 'recruiter-line-in 320ms ease-out',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: '12px',
                  color: '#6B6A82',
                  paddingTop: '2px',
                  minWidth: '38px',
                }}
              >
                {beat.t}
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 500,
                  fontSize: '15.5px',
                  color: '#F2F0FF',
                  lineHeight: 1.55,
                  textAlign: 'left',
                }}
              >
                {beat.text}
              </div>
            </div>
          ))}

          {!showVerdict && visibleCount < BEATS.length && started && (
            <div
              style={{
                display: 'inline-block',
                width: '8px',
                height: '18px',
                background: '#A78BFA',
                marginLeft: '54px',
                marginTop: '6px',
                animation: 'recruiter-cursor 1s steps(2) infinite',
              }}
            />
          )}

          {showVerdict && (
            <div
              style={{
                marginTop: '18px',
                padding: '18px 20px',
                background: 'rgba(108,71,255,0.10)',
                border: '1px solid rgba(108,71,255,0.35)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                animation: 'recruiter-line-in 320ms ease-out',
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: '11px',
                  color: '#A78BFA',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                }}
              >
                VERDICT
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#F2F0FF',
                  textAlign: 'left',
                }}
              >
                Yes pile — with a question mark on the gap and the missing metrics.
              </div>
            </div>
          )}
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 22px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: '#0F0F12',
          }}
        >
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12px',
              color: '#6B6A82',
            }}
          >
            Sample read. Built from a real recruiter’s decision pattern.
          </div>
          <button
            onClick={replay}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: '1px solid rgba(167,139,250,0.35)',
              color: '#A78BFA',
              padding: '7px 14px',
              borderRadius: '7px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Replay
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '760px',
          margin: '40px auto 0',
          textAlign: 'center',
        }}
      >
        <Link
          href="/tools/resume-recruiter-eyes"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            color: 'white',
            padding: '15px 34px',
            borderRadius: '10px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '16px',
            textDecoration: 'none',
            transition: 'transform 0.2s',
          }}
        >
          Run yours →
        </Link>
        <p
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '13px',
            color: '#6B6A82',
            marginTop: '14px',
          }}
        >
          Paste your resume. Get the full read in 30 seconds.
        </p>
      </div>

      <style>{`
        @keyframes recruiter-line-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes recruiter-cursor {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
