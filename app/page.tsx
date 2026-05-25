'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { submitLead } from '@/lib/submit-lead'
import Image from 'next/image'
import {
  Search,
  ListOrdered,
  TrendingUp,
  Wrench,
  Eye,
  UserCheck,
  FileText,
  Edit3,
  AlertCircle,
  DollarSign,
  Star,
  Building2,
  User,
  Linkedin,
  BarChart3,
} from 'lucide-react'
import { StartHereBoard } from '@/components/start-here-board'
import { QuickHeadlineRead } from '@/components/quick-headline-read'

/**
 * Homepage v2 — single-wedge positioning.
 *
 * Clarity data (May 2026) showed two patterns: (1) brief homepage exits
 * with no clicks, and (2) users hopping between For Companies and For
 * Candidates before bouncing. Both diagnose the same root: the homepage
 * was asking visitors to pick a side before showing them anything they
 * could DO. This rebuild leads with one tool — Where Do You Rank in a
 * Recruiter Search — as the single front door. Bilateral access (which
 * is still the wedge of the product) is preserved as the membership
 * benefit below the fold, not the homepage tagline above it.
 */
export default function HomePage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [userType, setUserType] = useState('hiring')

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    const formData = new FormData(e.currentTarget)
    const fullName = (formData.get('fullName') ?? '').toString().trim()
    const [firstName, ...rest] = fullName.split(/\s+/)
    const lastName = rest.join(' ')

    await submitLead({
      email: (formData.get('email') ?? '').toString(),
      source: 'newsletter',
      firstName,
      lastName,
      audience: userType === 'hiring' ? 'hiring' : 'candidate',
    })
    setFormState('success')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');
        .recruiter-insight-card:hover {
          border-color: rgba(108,71,255,0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(108,71,255,0.12);
        }
        .hero-btn:hover {
          transform: translateY(-2px);
        }
        .result-mock-card:hover {
          border-color: rgba(108,71,255,0.35) !important;
        }
      `}</style>
      <Navigation variant="dark" />

      {/* ──────────────── AUDIENCE PRE-ROUTER ─────────────────
         Thin strip above the candidate hero so hiring leaders landing
         cold don't have to scroll past four candidate question cards
         to find the "different door." The candidate experience is
         the homepage default; this strip is a passive signpost for
         visitors in the wrong room.
      */}
      <Link
        href="/for-companies"
        style={{
          display: 'block',
          background: '#14141B',
          borderBottom: '1px solid rgba(255,79,106,0.18)',
          padding: '12px 24px',
          textAlign: 'center',
          fontFamily: "'Figtree', sans-serif",
          fontSize: 13.5,
          fontWeight: 600,
          color: '#C9C7DA',
          textDecoration: 'none',
          letterSpacing: '0.005em',
        }}
      >
        Hiring a role, not searching for one?{' '}
        <span
          style={{
            color: '#FF8FA3',
            fontWeight: 800,
            borderBottom: '1px solid rgba(255,143,163,0.45)',
            paddingBottom: 1,
          }}
        >
          The hiring-team page is here &rarr;
        </span>
      </Link>

      {/* ──────────────── START HERE — QUESTION BOARD ─────────────────
         Question-led entry. The primary homepage funnel for candidates.
      */}
      <StartHereBoard />

      {/* ──────────────── LIVE QUICK READ ─────────────────
         Paste-your-headline live widget. The visitor's first interaction
         with the site is using the product itself, not reading about it.
         Cal.com / Anthropic / Cursor-style engagement pattern. Uses
         /api/quick-read (Haiku, ~$0.002 per run, capped by global $5/day
         budget ceiling).
      */}
      <QuickHeadlineRead />

      {/* ─────────────── CLOSING ─────────────── */}
      <section
        style={{
          background: '#0F0F12',
          padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: '#F2F0FF',
            }}
          >
            The goal isn&apos;t to win hiring.
          </h2>
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: 0,
            }}
          >
            It&apos;s to finally understand it.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '17px',
              color: '#9D9CB3',
              marginTop: 24,
            }}
          >
            The room you were never in. Open for the first time.
          </p>

          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/membership"
              className="hero-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '15px 34px',
                borderRadius: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
            >
              Go Pro
            </Link>
            <Link
              href="/tools"
              className="hero-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1.5px solid rgba(167,139,250,0.4)',
                background: 'transparent',
                color: '#A78BFA',
                padding: '15px 30px',
                borderRadius: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
            >
              See every tool →
            </Link>
          </div>
        </div>
      </section>


      {/* ─────────────── EMAIL CAPTURE ─────────────── */}
      <section
        style={{
          background: '#0F0F12',
          padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#A78BFA',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            STAY AHEAD
          </div>

          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(26px, 3.5vw, 32px)',
              letterSpacing: '-0.025em',
              color: '#F2F0FF',
              textAlign: 'center',
              marginTop: 12,
            }}
          >
            Get the Recruiter Insight first.
          </h2>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15px',
              color: '#9D9CB3',
              textAlign: 'center',
              marginTop: 10,
              lineHeight: 1.6,
            }}
          >
            New Recruiter Insights, what both sides are doing, and what&apos;s working right now —
            delivered before anyone else.
          </p>

          <form
            onSubmit={handleSubscribe}
            style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              style={inputStyle}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              {['hiring', 'candidate'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setUserType(option)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 8,
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    border: userType === option ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    background: userType === option ? '#6C47FF' : 'transparent',
                    color: userType === option ? 'white' : '#9D9CB3',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {option === 'hiring' ? 'Hiring Professional' : 'Job Seeker'}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={formState === 'submitting'}
              style={{
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '15px',
                borderRadius: 8,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '15px',
                border: 'none',
                cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s',
                opacity: formState === 'submitting' ? 0.7 : 1,
              }}
            >
              {formState === 'idle' && 'Get the Recruiter Insight →'}
              {formState === 'submitting' && 'Sending...'}
              {formState === 'success' && "You're in. ✓"}
            </button>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '12px',
                color: '#8B8AA0',
                textAlign: 'center',
                marginTop: 4,
              }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/* ─────────────── Small style primitives + components ─────────────── */
const cardStyle: React.CSSProperties = {
  background: '#0F0F12',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
  padding: 24,
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  transition: 'all 0.25s',
}
const cardTitle: React.CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 800,
  fontSize: '16px',
  color: '#F2F0FF',
  marginTop: 14,
  marginBottom: 8,
  lineHeight: 1.3,
}
const cardBody: React.CSSProperties = {
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 400,
  fontSize: '13px',
  color: '#9D9CB3',
  lineHeight: 1.6,
}
const inputStyle: React.CSSProperties = {
  background: '#1A1A22',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '14px 16px',
  fontFamily: "'Figtree', sans-serif",
  color: '#F2F0FF',
  fontSize: '14px',
}

function IconCircle({
  Icon,
  accent,
  tintRgba,
}: {
  Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>
  accent: string
  tintRgba: string
}) {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: `rgba(${tintRgba},0.12)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={19} color={accent} strokeWidth={2} />
    </div>
  )
}

function Pill({ text, accent, tintRgba }: { text: string; accent: string; tintRgba: string }) {
  return (
    <div
      style={{
        background: `rgba(${tintRgba},0.14)`,
        color: accent,
        padding: '4px 9px',
        borderRadius: 4,
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: '10px',
        letterSpacing: '0.06em',
        display: 'inline-block',
        marginTop: 14,
        marginBottom: 4,
      }}
    >
      {text}
    </div>
  )
}

function SubLabel({ text, color }: { text: string; color: string }) {
  return (
    <div
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 700,
        fontSize: '11px',
        color,
        marginBottom: 8,
      }}
    >
      {text}
    </div>
  )
}

function CardCTA({ text, color }: { text: string; color: string }) {
  return (
    <div
      style={{
        fontFamily: "'Figtree', sans-serif",
        fontWeight: 800,
        fontSize: '13px',
        color,
        marginTop: 18,
      }}
    >
      {text}
    </div>
  )
}
