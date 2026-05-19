'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Pause, Play, ArrowRight } from 'lucide-react'

/**
 * What Recruiters Say — rotating monologue section.
 *
 * Five dramatic, specific recruiter voice lines candidates never get
 * to hear. Auto-rotates every 7.5 seconds with a subtle cross-fade
 * (the production-curtain metaphor — one scene closes, the next opens).
 * Click anywhere on the card to jump to the tool that addresses that
 * specific moment.
 *
 * Behavioral hooks:
 *  - Voyeurism: visitors hear the room they're never in
 *  - Specificity: each quote is a concrete moment, not a generic gripe
 *  - Brand voice in 4 seconds: visitors who haven't tried any tool yet
 *    GET the product before they scroll
 *  - Sticky: each line is screenshot-worthy for LinkedIn shares
 *
 * Auto-rotation pauses on hover or after manual interaction; resumes
 * after 12s of idle.
 */

interface Monologue {
  id: string
  room: string
  quote: string
  toolHref: string
  toolCta: string
}

const LINES: Monologue[] = [
  {
    id: 'sourcing',
    room: 'The sourcing room',
    quote:
      'I&rsquo;m searching &ldquo;Senior Director, TA&rdquo; AND healthcare. She&rsquo;s perfect — 12 years, ran a national hiring function. Her headline says &ldquo;People Leader.&rdquo; She doesn&rsquo;t surface. I never message her. She has no idea why.',
    toolHref: '/tools/recruiter-search-rank',
    toolCta: 'See where you rank in real recruiter searches',
  },
  {
    id: 'six-seconds',
    room: 'The six-second resume scan',
    quote:
      'This resume says &ldquo;driving growth&rdquo; four times across three jobs. I have no idea what this person actually did. Six seconds, I&rsquo;m out.',
    toolHref: '/tools/resume-recruiter-eyes',
    toolCta: 'Hear the recruiter monologue on your resume',
  },
  {
    id: 'debrief',
    room: 'The interview debrief',
    quote:
      'He answered every question. I couldn&rsquo;t tell you one specific thing he actually did. The hiring manager liked him. I&rsquo;m voting no — and I&rsquo;m going to win the debrief.',
    toolHref: '/tools/rehearsal-room',
    toolCta: 'Rehearse against the rubric they&rsquo;ll actually use',
  },
  {
    id: 'comp-committee',
    room: 'The offer committee',
    quote:
      'Her ask is $180. The range goes to $195. We&rsquo;ll hit $175 without anyone blinking. She&rsquo;ll probably take $165 because she didn&rsquo;t ask twice.',
    toolHref: '/tools/what-youre-worth',
    toolCta: 'Get the exact words to ask for more',
  },
  {
    id: 'silent-gap',
    room: 'The unspoken gap',
    quote:
      'Her resume has a 14-month gap. She doesn&rsquo;t address it anywhere. Three of my interviewers will assume she got fired. Two will assume health. None will ask. Most won&rsquo;t advance her.',
    toolHref: '/tools/explain-my-gap',
    toolCta: 'Three honest scripts for the gap',
  },
]

const ROTATION_MS = 7500
const IDLE_RESUME_MS = 12000

export function WhatRecruitersSay() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const [paused, setPaused] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-rotation with cross-fade
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => {
      setFading(true)
      // Fade-out completes at 280ms; swap content, fade in.
      setTimeout(() => {
        setIdx((i) => (i + 1) % LINES.length)
        setFading(false)
      }, 280)
    }, ROTATION_MS)
    return () => clearTimeout(t)
  }, [idx, paused])

  // Manual nav: pause briefly, then resume after idle window
  const handleManualNav = (newIdx: number) => {
    setFading(true)
    setTimeout(() => {
      setIdx(newIdx)
      setFading(false)
    }, 200)
    setPaused(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setPaused(false), IDLE_RESUME_MS)
  }

  const togglePause = () => {
    setPaused((p) => !p)
    if (idleTimer.current) clearTimeout(idleTimer.current)
  }

  const current = LINES[idx]

  return (
    <section
      style={{
        position: 'relative',
        background: '#0F0F12',
        color: '#F2F0FF',
        padding: 'clamp(64px, 9vw, 112px) 24px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
      aria-label="What recruiters actually say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (idleTimer.current) clearTimeout(idleTimer.current)
        setPaused(false)
      }}
    >
      {/* Ambient spotlight backdrop — single soft glow, production metaphor */}
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
          What recruiters actually say
        </div>
        <h2
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.12,
            letterSpacing: '-0.015em',
            color: '#F2F0FF',
            margin: 0,
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        >
          The room you&rsquo;re never in.
        </h2>

        {/* The rotating quote card */}
        <Link
          href={current.toolHref}
          style={{
            display: 'block',
            background: '#14141B',
            border: '1px solid rgba(255,143,163,0.22)',
            borderRadius: 24,
            padding: 'clamp(32px, 5vw, 56px) clamp(28px, 5vw, 56px) clamp(28px, 4vw, 40px)',
            textDecoration: 'none',
            position: 'relative',
            transition: 'border-color 0.2s ease, transform 0.2s ease',
            minHeight: 280,
            textAlign: 'left',
          }}
          className="what-recruiters-card"
        >
          <style>{`
            .what-recruiters-card:hover {
              border-color: rgba(255,143,163,0.55) !important;
              transform: translateY(-2px);
            }
            .what-recruiters-fade {
              transition: opacity 0.28s ease;
            }
          `}</style>

          <div
            className="what-recruiters-fade"
            style={{
              opacity: fading ? 0 : 1,
            }}
          >
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#FF8FA3',
                marginBottom: 18,
              }}
            >
              {current.room}
            </div>
            <blockquote
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontStyle: 'italic',
                fontSize: 'clamp(20px, 2.4vw, 26px)',
                lineHeight: 1.45,
                color: '#F2F0FF',
                margin: 0,
                marginBottom: 28,
                paddingLeft: 18,
                borderLeft: '3px solid #FF4F6A',
              }}
              dangerouslySetInnerHTML={{ __html: current.quote }}
            />
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
              }}
            >
              {current.toolCta}
              <ArrowRight size={15} strokeWidth={2.5} />
            </div>
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
                aria-label={`Show line ${i + 1}: ${line.room}`}
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
      </div>
    </section>
  )
}
