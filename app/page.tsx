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

      {/* ───────────────────────── HERO ─────────────────────────
         The single wedge. One question, one CTA, one tool.
      */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: '#0F0F12',
        }}
      >
        {/* Radial glows */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(ellipse 700px 520px at 80% 8%, rgba(108,71,255,0.24) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              'radial-gradient(ellipse 500px 400px at 12% 92%, rgba(255,79,106,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(96px, 14vh, 130px) clamp(20px, 5vw, 40px) clamp(60px, 10vh, 100px)',
            textAlign: 'center',
          }}
        >
          {/* Eyebrow — credibility before claim */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'rgba(167,139,250,0.10)',
              border: '1px solid rgba(167,139,250,0.28)',
              borderRadius: 100,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#5EE6A8',
              }}
            />
            FROM A SENIOR RECRUITER · FREE TO TRY
          </div>

          {/* H1 — the question they're already asking.
              "the job you want" is deliberate over "your job" — a strong
              candidate isn't wondering if they're findable for the role
              they have, they're wondering about the next one. */}
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(42px, 6.5vw, 78px)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: '#F2F0FF',
              marginBottom: '22px',
            }}
          >
            Where do you actually rank when a recruiter searches LinkedIn for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the job you want?
            </span>
          </h1>

          {/* Sub — the proof of value */}
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '19px',
              lineHeight: 1.6,
              color: '#9D9CB3',
              maxWidth: '620px',
              margin: '0 auto 44px',
            }}
          >
            Upload your LinkedIn profile. See the 5 boolean searches a recruiter for your target
            role actually runs — and your rank in each. Plus the 3 moves to climb fastest. Built by
            a senior TA director who runs these searches for a living.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/tools/recruiter-search-rank"
              className="hero-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '17px 38px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                boxShadow: '0 18px 50px rgba(108,71,255,0.32)',
              }}
            >
              <Search size={18} />
              Show me where I rank
            </Link>

            <a
              href="#what-you-get"
              className="hero-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                border: '1.5px solid rgba(167,139,250,0.4)',
                background: 'transparent',
                color: '#A78BFA',
                padding: '17px 30px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
            >
              See what you get back ↓
            </a>
          </div>

          {/* Trust microcopy */}
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              '20 years in talent · ex-Senior Director of TA',
              'No account to start',
              '2 free runs a day',
            ].map((text) => (
              <div
                key={text}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 100,
                  padding: '8px 16px',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 600,
                  fontSize: '12.5px',
                  color: '#9D9CB3',
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── WHAT YOU GET BACK ──────────────
         Show the actual result the tool delivers. Four cards
         that mirror the tool's real output, plus a visual
         "rank reveal" mock so the recognition moment is on
         the homepage even before they run it.
      */}
      <section
        id="what-you-get"
        style={{
          background: '#1A1A22',
          borderTop: '1px solid rgba(108,71,255,0.18)',
          borderBottom: '1px solid rgba(108,71,255,0.18)',
          padding: 'clamp(64px, 9vw, 110px) clamp(20px, 5vw, 40px)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          {/* Section label */}
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: '#A78BFA',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            WHAT YOU GET BACK
          </div>

          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(30px, 4vw, 46px)',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              color: '#F2F0FF',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Not advice. Your actual ranking.
          </h2>

          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '17px',
              color: '#9D9CB3',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto 56px',
              lineHeight: 1.6,
            }}
          >
            Calibrated to how LinkedIn&apos;s algorithm actually weights signals — and to how
            real recruiters phrase the search.
          </p>

          {/* Result mock — the visual hit */}
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto 56px',
              background: '#0F0F12',
              border: '1px solid rgba(108,71,255,0.3)',
              borderRadius: 20,
              padding: 'clamp(28px, 5vw, 44px)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(108,71,255,0.15)',
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -80,
                right: -60,
                width: 280,
                height: 280,
                background:
                  'radial-gradient(circle, rgba(108,71,255,0.18) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#8B8AA0',
                  marginBottom: 14,
                }}
              >
                Sample result · Senior Product Manager
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  flexWrap: 'wrap',
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(56px, 9vw, 96px)',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.03em',
                  }}
                >
                  #47
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#9D9CB3',
                  }}
                >
                  average rank across 5 recruiter searches
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  { q: '"Senior PM" AND SaaS', rank: '#31' },
                  { q: '"Product Manager" AND B2B AND growth', rank: '#52' },
                  { q: '"Senior Product Manager" AND analytics', rank: '#68' },
                ].map((row) => (
                  <div
                    key={row.q}
                    style={{
                      background: 'rgba(167,139,250,0.06)',
                      border: '1px solid rgba(167,139,250,0.18)',
                      borderRadius: 10,
                      padding: '12px 14px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Figtree', monospace",
                        fontSize: '11.5px',
                        color: '#A78BFA',
                        marginBottom: 6,
                        wordBreak: 'break-word',
                      }}
                    >
                      {row.q}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontWeight: 800,
                        fontSize: '20px',
                        color: '#F2F0FF',
                      }}
                    >
                      {row.rank}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: 18,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                    color: 'white',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                    flexShrink: 0,
                  }}
                >
                  TOP FIX
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '14.5px',
                    color: '#F2F0FF',
                    lineHeight: 1.55,
                  }}
                >
                  Move <em>&ldquo;Senior Product Manager&rdquo;</em> from your About section into
                  your headline. Adds the exact phrase recruiters search on 4 of the 5 queries.{' '}
                  <span style={{ color: '#5EE6A8', fontWeight: 700 }}>Avg rank: #47 → #29.</span>
                </div>
              </div>
            </div>
          </div>

          {/* What you actually receive — 4 cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: 20,
            }}
          >
            {[
              {
                icon: Search,
                title: 'The 5 actual searches',
                body: 'Boolean strings a recruiter for your target role would type into LinkedIn Recruiter. Not generic. Role-specific.',
              },
              {
                icon: ListOrdered,
                title: 'Your rank in each',
                body: 'Estimated position out of the ~200 candidates LinkedIn surfaces. Calibrated to how the algorithm weights headline, About, skills, and recency.',
              },
              {
                icon: TrendingUp,
                title: '3 moves to climb',
                body: 'Ranked by total impact across every search. The single change that lifts you the most appears first.',
              },
              {
                icon: Wrench,
                title: 'Exact text replacements',
                body: 'Current line vs. recommended rewrite. Copy-paste ready. No "consider adding keywords" hand-waving.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="result-mock-card"
                style={{
                  background: '#0F0F12',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 14,
                  padding: '24px',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(108,71,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <card.icon size={18} color="#A78BFA" strokeWidth={2} />
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 800,
                    fontSize: '15.5px',
                    color: '#F2F0FF',
                    marginBottom: 8,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: '13.5px',
                    color: '#9D9CB3',
                    lineHeight: 1.55,
                  }}
                >
                  {card.body}
                </div>
              </div>
            ))}
          </div>

          {/* CTA repeat */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link
              href="/tools/recruiter-search-rank"
              className="hero-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '16px 36px',
                borderRadius: 12,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'transform 0.2s',
                boxShadow: '0 16px 40px rgba(108,71,255,0.28)',
              }}
            >
              <Search size={17} />
              Run mine — free
            </Link>
          </div>
        </div>
      </section>

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
         The $20 upsell. Bilateral access is the membership benefit
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
            AFTER YOU FIX YOUR RANK
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
            $20/year unlocks the whole production —{' '}
            <span style={{ color: '#F2F0FF', fontWeight: 700 }}>
              both sides of the table
            </span>
            . Candidates see how recruiters actually screen. Hiring teams see what their
            applicants run their resume through. Same $20. No separate tiers.
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

          {/* Tools grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
              gap: '20px',
            }}
          >
            {/* Card — What Are My Chances? */}
            <Link
              href="/tools/what-are-my-chances"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={BarChart3} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>What Are My Chances?</h3>
              <SubLabel text="Application Odds Calculator" color="#A78BFA" />
              <p style={cardBody}>
                Drop your resume, paste the job. See the honest percentage chance — and the 3
                lifts that would move it.
              </p>
              <CardCTA text="See my chances →" color="#6C47FF" />
            </Link>

            {/* Card — Resume Recruiter Eyes */}
            <Link
              href="/tools/resume-recruiter-eyes"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={Eye} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>Your Resume, Through a Recruiter&apos;s Eyes</h3>
              <SubLabel text="Recruiter Resume Read" color="#A78BFA" />
              <p style={cardBody}>
                See the internal monologue of a recruiter reading your resume in the first 6
                seconds.
              </p>
              <CardCTA text="Hear the read →" color="#6C47FF" />
            </Link>

            {/* Card — Is This Even a Real Candidate */}
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
                See whether this application is human-authored or AI-generated — and exactly what
                flagged it.
              </p>
              <CardCTA text="Run the check →" color="#FF4F6A" />
            </Link>

            {/* Card — What This Job Actually Is */}
            <Link
              href="/tools/what-this-job-is"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={FileText} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>What This Job Actually Is</h3>
              <SubLabel text="Job Description Decoder" color="#A78BFA" />
              <p style={cardBody}>
                See what&apos;s really between the lines of any job description — and whether
                it&apos;s actually worth applying.
              </p>
              <CardCTA text="Decode the posting →" color="#6C47FF" />
            </Link>

            {/* Card — LinkedIn Rewrite */}
            <Link
              href="/tools/linkedin-rewrite"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={Edit3} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>Your LinkedIn Profile — Rewritten</h3>
              <SubLabel text="Full LinkedIn Profile Rewrite" color="#A78BFA" />
              <p style={cardBody}>
                Complete rewrite of your headline, About section, and role descriptions —
                optimized for recruiter visibility.
              </p>
              <CardCTA text="Rewrite mine →" color="#6C47FF" />
            </Link>

            {/* Card — What's Breaking Your Search */}
            <Link
              href="/tools/whats-breaking-search"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={AlertCircle} accent="#FF4F6A" tintRgba="255,79,106" />
              <Pill text="CANDIDATE · FREE" accent="#FF4F6A" tintRgba="255,79,106" />
              <h3 style={cardTitle}>What&apos;s Breaking Your Job Search</h3>
              <SubLabel text="Job Search Diagnostic" color="#FF4F6A" />
              <p style={cardBody}>
                Diagnosis of why your job search is stalled — and the one thing that will
                actually fix it.
              </p>
              <CardCTA text="Diagnose mine →" color="#FF4F6A" />
            </Link>

            {/* Card — Negotiate This Offer */}
            <Link
              href="/tools/what-youre-worth"
              className="recruiter-insight-card"
              style={cardStyle}
            >
              <IconCircle Icon={DollarSign} accent="#A78BFA" tintRgba="108,71,255" />
              <Pill text="CANDIDATE · FREE" accent="#A78BFA" tintRgba="108,71,255" />
              <h3 style={cardTitle}>How to Negotiate This Offer</h3>
              <SubLabel text="Salary Negotiation Script Builder" color="#A78BFA" />
              <p style={cardBody}>
                Bring your offer + your market data. Get the exact script — opening line,
                response to &ldquo;best offer,&rdquo; and the number to ask for.
              </p>
              <CardCTA text="Build my script →" color="#6C47FF" />
            </Link>

            {/* Card — RepVera */}
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
            decide, and hiring teams see what candidates run their materials through. One $20.
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

      {/* ─────────────── MEMBERSHIP BANNER ─────────────── */}
      <section
        style={{
          background: '#0F0F12',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(48px, 7vw, 72px) clamp(20px, 5vw, 40px)',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                background: 'rgba(255,79,106,0.15)',
                color: '#FF4F6A',
                padding: '6px 12px',
                borderRadius: 6,
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '10px',
                letterSpacing: '0.1em',
                display: 'inline-block',
                marginBottom: 16,
              }}
            >
              BEST VALUE
            </div>
            <h2
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(28px, 4vw, 38px)',
                letterSpacing: '-0.02em',
                color: '#F2F0FF',
              }}
            >
              The whole production. $20/year.
            </h2>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '15px',
                color: '#9D9CB3',
                marginTop: 10,
                maxWidth: 460,
                lineHeight: 1.6,
              }}
            >
              Every Recruiter Insight — candidate-side and hiring-side, built from real recruiting
              practice — for less than Jobscan charges for a single day. Free tools stay free.
            </p>
          </div>

          <Link
            href="/membership"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: 'white',
              padding: '16px 40px',
              borderRadius: 10,
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'transform 0.2s',
              boxShadow: '0 16px 40px rgba(108,71,255,0.28)',
            }}
          >
            Get Full Access →
          </Link>
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
              href="/tools/recruiter-search-rank"
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
              <Search size={17} />
              Show me where I rank
            </Link>
            <Link
              href="/membership"
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
              See the whole production →
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
