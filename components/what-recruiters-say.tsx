'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Pause, Play, ArrowRight } from 'lucide-react'

/**
 * What Recruiters Say — typewriter monologue rotator.
 *
 * Five short, dramatic recruiter voice lines candidates never hear.
 * Each line types out character-by-character (theatrical curtain
 * reveal — fits the production metaphor) with a pulsing "REC"
 * indicator while typing and a blinking cursor when complete.
 *
 * Behavioral hooks:
 *  - The typing creates obvious, continuous motion the eye can't miss
 *  - Each line is one sentence — readable in a single beat
 *  - Voyeuristic framing ("the room you're never in") plus the
 *    recording-style treatment makes it feel like surveillance
 *  - Click anywhere on the card to jump to the tool that addresses
 *    that exact moment
 *
 * Rotation: ~2s type-in + 3.5s read time + 0.4s fade-out = 5.9s/quote.
 * Clicking a dot or play/pause overrides; auto-resumes after 15s idle.
 */

interface Monologue {
  id: string
  room: string
  quote: string
  toolHref: string
  toolCta: string
}

// Use unicode quotes/apostrophes directly — these strings flow through
// React state, not JSX, so HTML entities (&rsquo;) render as literal text.
const LINES: Monologue[] = [
  {
    id: 'sourcing',
    room: 'The sourcing room',
    quote:
      'Her headline says “People Leader.” I’m searching “Senior Director, TA.” I never see her resume.',
    toolHref: '/tools/recruiter-search-rank',
    toolCta: 'See where you rank in real recruiter searches',
  },
  {
    id: 'six-seconds',
    room: 'The six-second resume scan',
    quote:
      '“Driving growth” four times across three jobs. Six seconds, I’m out.',
    toolHref: '/tools/resume-recruiter-eyes',
    toolCta: 'Hear the recruiter monologue on your resume',
  },
  {
    id: 'debrief',
    room: 'The interview debrief',
    quote:
      'He answered every question. I can’t tell you one thing he actually did. Pass.',
    toolHref: '/tools/rehearsal-room',
    toolCta: 'Rehearse against the rubric they’ll actually use',
  },
  {
    id: 'comp-committee',
    room: 'The offer committee',
    quote:
      'Her ask is $180. The range goes to $195. She’ll take $165 because she didn’t ask twice.',
    toolHref: '/tools/what-youre-worth',
    toolCta: 'Get the exact words to ask for more',
  },
  {
    id: 'silent-gap',
    room: 'The unspoken gap',
    quote:
      'Fourteen-month gap. She doesn’t address it. Three interviewers will assume the worst. None will ask.',
    toolHref: '/tools/explain-my-gap',
    toolCta: 'Three honest scripts for the gap',
  },
]

const TYPE_SPEED_MS = 28 // per character
const READ_HOLD_MS = 3400 // pause after typing completes
const FADE_OUT_MS = 360
const IDLE_RESUME_MS = 15000

export function WhatRecruitersSay() {
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'fading'>('typing')
  const [paused, setPaused] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const current = LINES[idx]

  // Type the current quote, character by character.
  useEffect(() => {
    if (paused) return
    setTyped('')
    setPhase('typing')
    let i = 0
    const interval = setInterval(() => {
      if (i < current.quote.length) {
        i++
        setTyped(current.quote.slice(0, i))
      } else {
        clearInterval(interval)
        setPhase('holding')
      }
    }, TYPE_SPEED_MS)
    return () => clearInterval(interval)
  }, [idx, paused, current.quote])

  // After typing finishes, hold for a beat, then fade out and advance.
  useEffect(() => {
    if (phase !== 'holding' || paused) return
    const hold = setTimeout(() => {
      setPhase('fading')
      const fade = setTimeout(() => {
        setIdx((i) => (i + 1) % LINES.length)
      }, FADE_OUT_MS)
      return () => clearTimeout(fade)
    }, READ_HOLD_MS)
    return () => clearTimeout(hold)
  }, [phase, paused])

  const handleManualNav = (newIdx: number) => {
    setIdx(newIdx)
    setPaused(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setPaused(false), IDLE_RESUME_MS)
  }

  const togglePause = () => {
    setPaused((p) => !p)
    if (idleTimer.current) clearTimeout(idleTimer.current)
  }

  const isTyping = phase === 'typing'

  return (
    <section
      style={{
        position: 'relative',
        background: '#FAF8F3',
        color: '#1A1A22',
        padding: 'clamp(64px, 9vw, 112px) 24px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
      aria-label="What recruiters actually say"
    >
      {/* Coral spotlight backdrop — production metaphor */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -180,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 820,
          height: 820,
          background:
            'radial-gradient(circle, rgba(255,79,106,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: 920,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FF8FA3',
            marginBottom: 16,
          }}
        >
          02 — What recruiters actually say
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.12,
            letterSpacing: '-0.015em',
            color: '#1A1A22',
            margin: 0,
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        >
          The room you&rsquo;re never in.
        </h2>

        {/* The card — internal-note treatment with REC indicator,
            typewriter quote, and blinking cursor */}
        <Link
          href={current.toolHref}
          style={{
            display: 'block',
            background: '#FFFFFF',
            border: '1px solid rgba(255,143,163,0.22)',
            borderRadius: 24,
            padding: 'clamp(28px, 4.5vw, 48px) clamp(24px, 5vw, 56px) clamp(24px, 4vw, 36px)',
            textDecoration: 'none',
            position: 'relative',
            transition: 'border-color 0.2s ease, transform 0.2s ease, opacity 0.36s ease',
            textAlign: 'left',
            opacity: phase === 'fading' ? 0 : 1,
            minHeight: 240,
          }}
          className="what-recruiters-card"
        >
          <style>{`
            .what-recruiters-card:hover {
              border-color: rgba(255,143,163,0.55) !important;
              transform: translateY(-2px);
            }
            @keyframes wr-rec-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.35; transform: scale(0.85); }
            }
            @keyframes wr-cursor-blink {
              0%, 49% { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
            .wr-rec-dot {
              animation: wr-rec-pulse 1.1s ease-in-out infinite;
            }
            .wr-cursor {
              display: inline-block;
              width: 2px;
              height: 0.95em;
              vertical-align: text-bottom;
              background: #FF4F6A;
              margin-left: 4px;
              animation: wr-cursor-blink 0.95s steps(1) infinite;
            }
          `}</style>

          {/* Top row — REC indicator + room label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 22,
            }}
          >
            <span
              className={isTyping ? 'wr-rec-dot' : ''}
              style={{
                display: 'inline-block',
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: '#FF4F6A',
                boxShadow: '0 0 0 4px rgba(255,79,106,0.18)',
                opacity: isTyping ? 1 : 0.5,
                transition: 'opacity 0.2s ease',
              }}
            />
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 10.5,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#FF8FA3',
              }}
            >
              {isTyping ? 'RECORDING' : 'INTERNAL NOTE'} &middot; {current.room}
            </div>
          </div>

          {/* The typewriter quote */}
          <blockquote
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 2.8vw, 30px)',
              lineHeight: 1.4,
              color: '#1A1A22',
              margin: 0,
              marginBottom: 28,
              paddingLeft: 18,
              borderLeft: '3px solid #FF4F6A',
              minHeight: '2.8em',
            }}
          >
            {typed}
            {phase !== 'fading' && <span className="wr-cursor" aria-hidden />}
          </blockquote>

          {/* CTA — appears only after typing is done so the eye focuses
              on the quote first, then the action */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#FF8FA3',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: '0.01em',
              opacity: phase === 'typing' ? 0 : 1,
              transition: 'opacity 0.35s ease',
            }}
          >
            {current.toolCta}
            <ArrowRight size={15} strokeWidth={2.5} />
          </div>
        </Link>

        {/* Dots + play/pause control */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            {LINES.map((line, i) => (
              <button
                key={line.id}
                onClick={() => handleManualNav(i)}
                aria-label={`Jump to: ${line.room}`}
                style={{
                  width: i === idx ? 22 : 8,
                  height: 8,
                  borderRadius: 100,
                  border: 'none',
                  background:
                    i === idx
                      ? '#FF4F6A'
                      : 'rgba(255,143,163,0.25)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
          <button
            onClick={togglePause}
            aria-label={paused ? 'Resume rotation' : 'Pause rotation'}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,143,163,0.25)',
              borderRadius: 100,
              width: 28,
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#FF8FA3',
              padding: 0,
            }}
          >
            {paused ? (
              <Play size={11} strokeWidth={2.5} fill="#FF8FA3" />
            ) : (
              <Pause size={11} strokeWidth={2.5} fill="#FF8FA3" />
            )}
          </button>
        </div>

        {/* Persistent conversion ask — closes the brand moment with a
            direct action. The rotator demonstrates the voice; this line
            converts curiosity ("what's it like in that room?") into the
            ask ("what would they say about ME?"). */}
        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: 15,
              color: '#5A5A6E',
              marginBottom: 14,
              lineHeight: 1.55,
            }}
          >
            Want to know what they&rsquo;d say about <em>your</em> resume?
          </div>
          <Link
            href="/tools/resume-recruiter-eyes"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 26px',
              background: 'linear-gradient(135deg, #FF4F6A, #6C47FF)',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 14.5,
              color: 'white',
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(255,79,106,0.22)',
            }}
          >
            Get the read on yours <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
