'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AudienceHubsRow } from '@/components/audience-hubs-row'
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
import { WhatRecruitersSay } from '@/components/what-recruiters-say'

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

      {/* ──────────── WHAT RECRUITERS SAY — ROTATING MONOLOGUE ────────────
         Auto-rotating quote section showing dramatic-but-real recruiter
         voice lines candidates never hear. Demonstrates the brand voice
         in 4 seconds without requiring a tool upload, and clicks
         through to the tool that addresses each moment.
      */}
      <WhatRecruitersSay />

      {/* ───────────────── CREDIBILITY ─────────────────
         Why this tool, why this person. Anchors the
         "nobody else can build this credibly" claim.
      */}
      <section
        style={{
          background: '#0F0F12',
          padding: 'clamp(64px, 9vw, 100px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#A78BFA',
              marginBottom: 22,
            }}
          >
            WHO BUILT THIS
          </div>

          {/* Headshot — anchored to /public/stephanie.jpg. The image is
              the credibility moment; for a solo expert-founder where the
              moat IS the founder, a face in the credibility section is
              the difference between "yet another resume tool" and "this
              specific recruiter built this." */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
            <Image
              src="/stephanie.jpg"
              alt="Stephanie Murray"
              width={104}
              height={104}
              priority
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(167,139,250,0.45)',
                boxShadow: '0 18px 50px rgba(108,71,255,0.22)',
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(28px, 3.8vw, 40px)',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Built by a recruiter, not a resume tool company.
          </h2>

          {/* Name + role byline, sits under the H2 like a magazine credit
              line. Small, restrained, but unambiguous about who is behind
              the tool. */}
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#A78BFA',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: 22,
            }}
          >
            Stephanie Murray · Senior TA Director · 20 years in talent
          </div>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '17px',
              color: '#9D9CB3',
              lineHeight: 1.7,
              marginBottom: 18,
            }}
          >
            Most recently Senior Director of TA at Brightside Health, where I won Transform&apos;s
            Talent Strategy of the Year in 2025 building a clinical hiring function across all 50
            states. The searches you&apos;ll see are the same ones I ran on LinkedIn Recruiter
            every day to fill senior roles. The ranking model is calibrated to how the algorithm
            actually weights signals — not what a content marketing team guessed.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '15px',
              color: '#8B8AA0',
              lineHeight: 1.65,
              fontStyle: 'italic',
              marginBottom: 28,
            }}
          >
            Every Recruiter Insight on this site is built from real recruiting practice. No
            fabricated specifics. No invented stats.
          </p>

          {/* LinkedIn follow CTA — captures the "interested but not paying
              today" segment. Every follow is a future buyer + amplifier.
              Styled subtly so it doesn't compete with the wedge CTA above
              or the membership CTA below. */}
          <a
            href="https://www.linkedin.com/in/stephaniemurray11/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 20px',
              background: 'rgba(10,102,194,0.12)',
              border: '1px solid rgba(10,102,194,0.42)',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#7BB7E8',
              textDecoration: 'none',
            }}
          >
            <Linkedin size={15} strokeWidth={2.2} />
            Follow Stephanie on LinkedIn for unfiltered recruiter takes
          </a>
        </div>
      </section>

      {/* ─────────────── THE REST OF THE PRODUCTION ───────────────
         The Pro upsell. Bilateral access is the membership benefit
         here, not the homepage tagline. After they care about
         their rank, this becomes "and here's everything else."
      */}
      <section
        style={{
          background: '#1A1A22',
          borderTop: '1px solid rgba(108,71,255,0.18)',
          borderBottom: '1px solid rgba(108,71,255,0.18)',
          padding: 'clamp(64px, 9vw, 110px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#A78BFA',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            THE REST OF THE PRODUCTION
          </div>

          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 4.2vw, 50px)',
              letterSpacing: '-0.025em',
              textAlign: 'center',
              color: '#F2F0FF',
              lineHeight: 1.08,
              marginBottom: 18,
            }}
          >
            Every other Recruiter Insight is included.
          </h2>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '17px',
              color: '#9D9CB3',
              textAlign: 'center',
              maxWidth: '640px',
              margin: '0 auto 18px',
              lineHeight: 1.6,
            }}
          >
            $14.99/mo or $99/yr unlocks the whole production —{' '}
            <span style={{ color: '#F2F0FF', fontWeight: 700 }}>
              both sides of the table
            </span>
            . Candidates see how recruiters actually screen. Hiring teams see what their
            applicants run their resume through. One membership. No separate tiers.
          </p>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '15px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              marginBottom: 52,
              letterSpacing: '0.01em',
            }}
          >
            Less than Jobscan charges for a single day.
          </p>

          {/* Tools grid — compact 4-card row.
              Start Here above surfaces ~14 tools across 5 questions; this
              row exists to show breadth + bilateral + the sister product
              that Start Here doesn't cover, and to seed the "see every
              tool" CTA below it. */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: '20px',
            }}
          >
            {/* Card — LinkedIn Rewrite (Pro candidate flagship) */}
            <Link
              href="/tools/linkedin-rewrite"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={Edit3} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE · PRO" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>Your LinkedIn — Rewritten</h3>
              <SubLabel text="Full Profile Rewrite" color="#A78BFA" />
              <p style={cardBody}>
                Headline, About, and recent roles — rewritten for the searches that matter.
              </p>
              <CardCTA text="Rewrite mine →" color="#6C47FF" />
            </Link>

            {/* Card — Is This Even a Real Candidate (bilateral signal) */}
            <Link
              href="/tools/real-candidate"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={UserCheck} accent="#FF4F6A" tintRgba="255,79,106" />
              <Pill text="HIRING TEAM" accent="#FF4F6A" tintRgba="255,79,106" />
              <h3 style={cardTitle}>Is This Even a Real Candidate?</h3>
              <SubLabel text="AI Application Detector" color="#FF4F6A" />
              <p style={cardBody}>
                Tell whether an application is human-authored or AI-generated — and what flagged it.
              </p>
              <CardCTA text="Run the check →" color="#FF4F6A" />
            </Link>

            {/* Card — Resume AI Check (free, top of funnel) */}
            <Link
              href="/resume"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={FileText} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE · FREE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>Does My Resume Read as AI?</h3>
              <SubLabel text="AI Resume Detector" color="#A78BFA" />
              <p style={cardBody}>
                The exact lines that read AI-generated to a recruiter — and what to rewrite.
              </p>
              <CardCTA text="Run mine →" color="#6C47FF" />
            </Link>

            {/* Card — RepVera (sister product) */}
            <Link
              href="https://www.repvera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={Star} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="REPVERA · FREE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>The part hiring still can&apos;t see</h3>
              <SubLabel text="Verified Reference Profile" color="#A78BFA" />
              <p style={cardBody}>
                What the people who&apos;ve actually worked with you say. Portable. Yours forever.
              </p>
              <CardCTA text="Start your reel →" color="#6C47FF" />
            </Link>
          </div>

          {/* See-all + bilateral footnote */}
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 500,
              fontSize: '14.5px',
              color: '#8B8AA0',
              textAlign: 'center',
              marginTop: '40px',
              maxWidth: 620,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Each Recruiter Insight works in both directions — candidates see how hiring teams
            decide, and hiring teams see what candidates run their materials through. One membership.
            The whole production.
          </p>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
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
                padding: '15px 32px',
                borderRadius: '10px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
            >
              See every Recruiter Insight →
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

      {/* ─────────────── AUDIENCE HUBS (moved to bottom-of-funnel) ───────────────
         The "pick a side" choice is now a deliberate decision after
         someone has seen the wedge and the membership offer — not the
         first thing they're asked. This addresses Clarity Pattern 2
         (users hopping between For Companies and For Candidates).
      */}
      <AudienceHubsRow padding="60px 24px 40px" />

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
            Both sides. Same production. Open for the first time.
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
              The whole production — $14.99/mo or $99/yr
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
