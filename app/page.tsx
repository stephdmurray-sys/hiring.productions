'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Building2, User, Eye, Filter, MessageSquare, FileSearch, FileText, HelpCircle, UserCheck, Star, Search, Edit3, AlertCircle, DollarSign } from 'lucide-react'

export default function HomePage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [userType, setUserType] = useState('hiring')

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')

    const formData = new FormData(e.currentTarget)
    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbyUFzebPIPYH4nVKqOvbRDqtowfmIJzjFt-mB5kHPt9kxpE6e92pLupSUtXq-E8m7vk/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            tool: 'newsletter',
            audience: userType === 'hiring' ? 'company' : 'candidate',
            role: '',
            level: '',
            company: '',
            score: '',
            grade: '',
          }),
        }
      )
      setFormState('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      console.error('Form submission failed:', err)
    }
  }

  return (
    <main style={{ background: '#0F0F12', color: '#F2F0FF' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap');
        .inside-look-card:hover {
          border-color: rgba(108,71,255,0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(108,71,255,0.12);
        }
        .hero-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
      <Navigation variant="dark" />

      {/* SECTION 1 — HERO */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0F0F12',
      }}>
        {/* Radial glows */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse 600px 500px at 85% 10%, rgba(108,71,255,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse 500px 400px at 10% 90%, rgba(255,79,106,0.16) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '860px',
          margin: '0 auto',
          padding: '130px 40px 110px',
          textAlign: 'center',
        }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#8B8AA0',
            marginBottom: '28px',
          }}>
            BOTH SIDES OF HIRING. FINALLY IN THE OPEN.
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(44px, 6.5vw, 80px)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: '#F2F0FF',
            marginBottom: '24px',
          }}>
            Behind every strong hire is a real production.
          </h1>

          {/* Subhead */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: 1.65,
            color: '#8B8AA0',
            maxWidth: '580px',
            margin: '0 auto 52px',
          }}>
            Most people only see their side of it. This is where both sides finally see the whole thing.
          </p>

          {/* Two buttons */}
          <div style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Ghost button */}
            <Link href="/for-companies" className="hero-btn" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid rgba(108,71,255,0.5)',
              background: 'transparent',
              color: '#A78BFA',
              padding: '15px 34px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>
              <Building2 size={17} />
              I&apos;m Hiring
            </Link>

            {/* Primary gradient button */}
            <Link href="/for-candidates" className="hero-btn" style={{
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
            }}>
              <User size={17} />
              I&apos;m Job Searching
            </Link>
          </div>

          {/* Stat chips */}
          <div style={{
            marginTop: '52px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {['From a 20-year recruiter', 'Three tools free, three for members', 'No fabricated specifics'].map((text) => (
              <div key={text} style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '100px',
                padding: '10px 20px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                color: '#8B8AA0',
              }}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE STRANGE THING ABOUT HIRING */}
      <section style={{
        background: '#0F0F12',
        borderBottom: '1px solid rgba(108,71,255,0.12)',
        padding: '140px 40px',
        position: 'relative',
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: 'radial-gradient(ellipse 600px 450px at 50% 40%, rgba(108,71,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#6C47FF',
            marginBottom: '28px',
          }}>
            THE PROBLEM
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 5vw, 56px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            color: '#F2F0FF',
            marginBottom: '36px',
          }}>
            The strange thing about hiring
          </h2>

          {/* Opening line */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '20px',
            color: '#A78BFA',
            lineHeight: 1.75,
            marginBottom: '56px',
          }}>
            Think about what&apos;s actually happening right now.
          </p>

          {/* Three accent lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '56px' }}>
            {[
              'Candidates are trying to guess what hiring teams want.',
              'Hiring teams are trying to guess who someone really is.',
              'Resumes. Interviews. Job descriptions. It\'s all part of the same production.',
            ].map((text, idx) => (
              <div key={idx} style={{
                background: 'rgba(108,71,255,0.1)',
                borderLeft: '4px solid #6C47FF',
                borderRadius: '0 14px 14px 0',
                padding: '22px 32px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 500,
                fontSize: '17px',
                color: '#F2F0FF',
                lineHeight: 1.65,
                textAlign: 'left',
              }}>
                {text}
              </div>
            ))}
          </div>

          {/* Bridge line */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: '21px',
            color: '#F2F0FF',
            marginBottom: '48px',
          }}>
            But nobody sees the full picture.
          </p>

          {/* Three consequence lines */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            {[
              'That\'s why good people get overlooked.',
              'That\'s why great candidates end up in the wrong roles.',
              'That\'s why hiring still feels like guessing.',
            ].map((text, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,79,106,0.08)',
                borderLeft: '4px solid #FF4F6A',
                borderRadius: '0 14px 14px 0',
                padding: '20px 30px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: '17px',
                color: '#F2F0FF',
                lineHeight: 1.6,
                textAlign: 'left',
              }}>
                {text}
              </div>
            ))}
          </div>

          {/* Closing line */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: '36px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginTop: '72px',
            letterSpacing: '-0.02em',
          }}>
            Until now.
          </p>
        </div>
      </section>

      {/* SECTION 4 — WHAT YOU'LL FIND HERE */}
      <section style={{
        background: '#1A1A22',
        borderTop: '1px solid rgba(108,71,255,0.2)',
        borderBottom: '1px solid rgba(108,71,255,0.2)',
        padding: '100px 40px',
        position: 'relative',
      }}>
        {/* Radial glows */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: 'radial-gradient(ellipse 400px 300px at 90% 20%, rgba(108,71,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          background: 'radial-gradient(ellipse 300px 250px at 10% 80%, rgba(255,79,106,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#8B8AA0',
            textAlign: 'center',
            marginBottom: '24px',
          }}>
            BOTH SIDES. OPEN.
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            color: '#F2F0FF',
            marginBottom: '14px',
          }}>
            What you&apos;ll find here
          </h2>

          {/* Subhead */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '17px',
            color: '#8B8AA0',
            textAlign: 'center',
            maxWidth: '520px',
            margin: '0 auto 64px',
          }}>
            Not advice. Not templates. What actually happens on the other side — so both sides can finally see it.
          </p>

          {/* Two-column grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
          }}>
            {/* Left card - For Hiring Teams */}
            <div style={{
              background: '#0F0F12',
              border: '1px solid rgba(255,79,106,0.2)',
              borderRadius: '18px',
              padding: '40px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                color: '#FF4F6A',
              }}>
                <Building2 size={20} />
              </div>
              <div style={{
                background: 'rgba(255,79,106,0.1)',
                color: '#FF4F6A',
                padding: '6px 12px',
                borderRadius: '6px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginBottom: '24px',
              }}>
                FOR HIRING TEAMS
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '20px',
                color: '#F2F0FF',
                marginBottom: '24px',
              }}>
                See what candidates actually see.
              </h3>
              {[
                { icon: Eye, text: 'See how candidates read your job descriptions — and why the good ones click away.' },
                { icon: Filter, text: 'See what a resume looks like when someone has 200 more to read today.' },
                { icon: MessageSquare, text: 'See how candidates prepare for your interviews before they walk in.' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  marginBottom: '18px',
                }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255,79,106,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={16} color="#FF4F6A" />
                  </div>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#F2F0FF',
                    lineHeight: 1.5,
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right card - For Job Seekers */}
            <div style={{
              background: '#0F0F12',
              border: '1px solid rgba(108,71,255,0.2)',
              borderRadius: '18px',
              padding: '40px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '28px',
                right: '28px',
                color: '#A78BFA',
              }}>
                <User size={20} />
              </div>
              <div style={{
                background: 'rgba(108,71,255,0.1)',
                color: '#A78BFA',
                padding: '6px 12px',
                borderRadius: '6px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginBottom: '24px',
              }}>
                FOR JOB SEEKERS
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '20px',
                color: '#F2F0FF',
                marginBottom: '24px',
              }}>
                See what hiring teams actually do.
              </h3>
              {[
                { icon: FileSearch, text: 'See how hiring teams score your resume before a human ever reads it.' },
                { icon: FileText, text: 'See how job descriptions are written — and why they all sound the same.' },
                { icon: HelpCircle, text: 'See how interview questions get built and what hiring teams are really trying to find out.' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  marginBottom: '18px',
                }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(108,71,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={16} color="#A78BFA" />
                  </div>
                  <p style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#F2F0FF',
                    lineHeight: 1.5,
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FOUR FEATURED INSIDE LOOKS */}
      <section style={{
        background: '#0F0F12',
        padding: '100px 40px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#8B8AA0',
            textAlign: 'center',
            marginBottom: '24px',
          }}>
            INSIDE LOOKS
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            color: '#F2F0FF',
            marginBottom: '14px',
          }}>
            The inside looks aren&apos;t shortcuts.
          </h2>

          {/* Subhead with gradient */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '22px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '56px',
            backgroundColor: 'transparent',
          }}>
            They&apos;re windows.
          </p>

          {/* 3-column Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }} className="grid-responsive">
            {/* Card 1 */}
            <Link href="/tools/resume-recruiter-eyes" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(108,71,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Eye size={20} color="#A78BFA" />
              </div>
              <div style={{
                background: 'rgba(108,71,255,0.15)',
                color: '#A78BFA',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                CANDIDATE
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                Your Resume, Through a Recruiter&apos;s Eyes
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                See the internal monologue of a recruiter reading your resume in the first 6 seconds.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#6C47FF',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/tools/real-candidate" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,79,106,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <UserCheck size={20} color="#FF4F6A" />
              </div>
              <div style={{
                background: 'rgba(255,79,106,0.15)',
                color: '#FF4F6A',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                HIRING TEAM
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                Is This Even a Real Candidate?
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                See whether this application is human-authored or AI-generated — and exactly what flagged it.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#FF4F6A',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/tools/what-this-job-is" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(108,71,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FileText size={20} color="#A78BFA" />
              </div>
              <div style={{
                background: 'rgba(108,71,255,0.15)',
                color: '#A78BFA',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                CANDIDATE
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                What This Job Actually Is
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                See what&apos;s really between the lines of any job description — and whether it&apos;s actually worth applying.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#6C47FF',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 4 — Recruiter Find You */}
            <Link href="/tools/recruiter-find-you" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(108,71,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Search size={20} color="#A78BFA" />
              </div>
              <div style={{
                background: 'rgba(108,71,255,0.15)',
                color: '#A78BFA',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                CANDIDATE
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                Would a Recruiter Even Find You?
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                See the exact boolean search string a recruiter uses to find candidates like you.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#6C47FF',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 5 — LinkedIn Rewrite */}
            <Link href="/tools/linkedin-rewrite" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(108,71,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Edit3 size={20} color="#A78BFA" />
              </div>
              <div style={{
                background: 'rgba(108,71,255,0.15)',
                color: '#A78BFA',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                CANDIDATE
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                Your LinkedIn Profile — Rewritten
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                Complete rewrite of your headline, About section, and role descriptions — optimized for recruiter visibility.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#6C47FF',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 6 — What's Breaking Your Search */}
            <Link href="/tools/whats-breaking-search" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,79,106,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AlertCircle size={20} color="#FF4F6A" />
              </div>
              <div style={{
                background: 'rgba(255,79,106,0.15)',
                color: '#FF4F6A',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                CANDIDATE
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                What&apos;s Breaking Your Search
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                Diagnosis of why your job search is stalled — and the one thing that will actually fix it.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#FF4F6A',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 7 — What You're Worth */}
            <Link href="/tools/what-youre-worth" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(108,71,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <DollarSign size={20} color="#A78BFA" />
              </div>
              <div style={{
                background: 'rgba(108,71,255,0.15)',
                color: '#A78BFA',
                padding: '4px 8px',
                borderRadius: '4px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '10px',
                display: 'inline-block',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                CANDIDATE
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                What You&apos;re Worth
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                Market rate analysis for your role, level, and location — plus the negotiation script you need.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#6C47FF',
                marginTop: '20px',
              }}>
                Get the inside look →
              </div>
            </Link>

            {/* Card 8 — RepVera */}
            <Link href="https://www.repvera.com" target="_blank" rel="noopener noreferrer" className="inside-look-card" style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '28px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(108,71,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Star size={20} color="#A78BFA" />
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
              }}>
                <div style={{
                  background: 'rgba(108,71,255,0.15)',
                  color: '#A78BFA',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '10px',
                  display: 'inline-block',
                  marginTop: '12px',
                  marginBottom: '8px',
                }}>
                  CANDIDATE
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22C55E',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '10px',
                  display: 'inline-block',
                  marginTop: '12px',
                  marginBottom: '8px',
                }}>
                  Free
                </div>
              </div>
              <h3 style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '16px',
                color: '#F2F0FF',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                RepVera
              </h3>
              <p style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                color: '#8B8AA0',
                lineHeight: 1.6,
              }}>
                The part of your application that no resume can show — what the people who&apos;ve actually worked with you say.
              </p>
              <div style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                color: '#6C47FF',
                marginTop: '20px',
              }}>
                Start your RepVera — free →
              </div>
            </Link>
          </div>

          {/* Text below cards */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: '15px',
            color: '#8B8AA0',
            textAlign: 'center',
            marginTop: '40px',
          }}>
            Every inside look works in both directions. Because hiring only makes sense when both sides can see it.
          </p>

          {/* See all button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link href="/tools" className="hero-btn" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid rgba(108,71,255,0.5)',
              background: 'transparent',
              color: '#A78BFA',
              padding: '15px 34px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>
              See the four inside looks →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — REPVERA */}
      <section style={{
        background: 'linear-gradient(160deg, #0F0F12 0%, #120e1f 60%, #0F0F12 100%)',
        borderTop: '1px solid rgba(108,71,255,0.08)',
        borderBottom: '1px solid rgba(108,71,255,0.08)',
        padding: '100px 40px',
        position: 'relative',
        zIndex: 0,
      }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          {/* Section label */}
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#8B8AA0',
            marginBottom: '12px',
          }}>
            THE MISSING PIECE
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 48px)',
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            marginTop: '16px',
          }}>
            The part hiring still can&apos;t see.
          </h2>

          {/* Paragraph 1 */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '17px',
            color: '#8B8AA0',
            lineHeight: 1.85,
            maxWidth: '600px',
            margin: '36px auto 0',
          }}>
            You can now see how hiring works. You can see how decisions get made. You can see the whole production — from both sides.
          </p>

          {/* Paragraph 2 */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: '21px',
            color: '#F2F0FF',
            marginTop: '32px',
            marginBottom: '40px',
            lineHeight: 1.7,
          }}>
            But there&apos;s still one thing that doesn&apos;t show up anywhere in this process.
          </p>

          {/* Three bullet lines */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            maxWidth: '540px',
            margin: '0 auto',
          }}>
            {[
              'How someone handles pressure.',
              'How they show up when things go sideways.',
              'How the people who\'ve worked with them actually describe them.',
            ].map((text, idx) => (
              <div key={idx} style={{
                background: 'rgba(108,71,255,0.1)',
                borderLeft: '4px solid #6C47FF',
                borderRadius: '0 14px 14px 0',
                padding: '20px 30px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: '17px',
                color: '#F2F0FF',
                lineHeight: 1.65,
                textAlign: 'left',
              }}>
                {text}
              </div>
            ))}
          </div>

          {/* Final paragraph */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 600,
            fontSize: '21px',
            color: '#8B8AA0',
            marginTop: '48px',
            lineHeight: 1.7,
          }}>
            That part is still invisible in hiring.
          </p>

          {/* Card */}
          <div style={{
            marginTop: '48px',
            background: '#1A1A22',
            border: '1px solid rgba(108,71,255,0.3)',
            borderRadius: '20px',
            padding: '32px 36px',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'left',
            boxShadow: '0 24px 80px rgba(108,71,255,0.15)',
          }}>
            <div style={{
              background: 'rgba(255,79,106,0.15)',
              color: '#FF4F6A',
              padding: '6px 12px',
              borderRadius: '6px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '10px',
              display: 'inline-block',
              marginBottom: '12px',
            }}>
              REPVERA
            </div>
            <h3 style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '22px',
              color: '#F2F0FF',
              marginTop: '12px',
              marginBottom: '14px',
            }}>
              This is what RepVera is for.
            </h3>
            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '15px',
              color: '#8B8AA0',
              lineHeight: 1.75,
            }}>
              The people who already know what you&apos;re like to work with — your managers, teammates, clients — put it on record. Verified. Portable. Yours forever.
            </p>
            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: '#8B8AA0',
              fontStyle: 'italic',
              marginTop: '16px',
            }}>
              It doesn&apos;t replace the production. It finally shows the part the production keeps missing.
            </p>
            <Link href="https://www.repvera.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'block',
              marginTop: '28px',
              background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              textDecoration: 'none',
              textAlign: 'center',
              transition: 'transform 0.2s',
            }}>
              Start your RepVera — free
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 — MEMBERSHIP BANNER */}
      <section style={{
        background: '#1A1A22',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '72px 40px',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
        }}>
          {/* Left side */}
          <div>
            <div style={{
              background: 'rgba(255,79,106,0.15)',
              color: '#FF4F6A',
              padding: '6px 12px',
              borderRadius: '6px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '10px',
              display: 'inline-block',
              marginBottom: '16px',
            }}>
              BEST VALUE
            </div>
            <h2 style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: '36px',
              letterSpacing: '-0.02em',
              color: '#F2F0FF',
            }}>
              Four inside looks. $20/year.
            </h2>
            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '15px',
              color: '#8B8AA0',
              marginTop: '10px',
              maxWidth: '440px',
            }}>
              Jobscan charges $49.95/month for one tool. Three deep inside looks — designed by someone who has screened 10,000 resumes — for less than what they charge for a single day. Plus three free tools, no account required.
            </p>
          </div>

          {/* Right side - button */}
          <Link href="/membership" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '10px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            textDecoration: 'none',
            transition: 'transform 0.2s',
          }}>
            Get Full Access →
          </Link>
        </div>
      </section>

      {/* SECTION 8 — EMAIL CAPTURE */}
      <section style={{
        background: '#0F0F12',
        padding: '80px 40px',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          {/* Label */}
          <div style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#8B8AA0',
            textAlign: 'center',
            marginBottom: '12px',
          }}>
            STAY AHEAD
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: '30px',
            letterSpacing: '-0.025em',
            color: '#F2F0FF',
            textAlign: 'center',
            marginTop: '12px',
          }}>
            Get the inside look first.
          </h2>

          {/* Subhead */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            color: '#8B8AA0',
            textAlign: 'center',
            marginTop: '10px',
            lineHeight: 1.6,
          }}>
            New inside looks, hiring insights, and what both sides are doing — delivered before anyone else.
          </p>

          {/* Form */}
          <form onSubmit={handleSubscribe} style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            {/* Name input */}
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              required
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '14px 16px',
                fontFamily: "'Figtree', sans-serif",
                color: '#F2F0FF',
                fontSize: '14px',
              }}
            />

            {/* Email input */}
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              style={{
                background: '#1A1A22',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '14px 16px',
                fontFamily: "'Figtree', sans-serif",
                color: '#F2F0FF',
                fontSize: '14px',
              }}
            />

            {/* Role toggle pills */}
            <div style={{
              display: 'flex',
              gap: '8px',
            }}>
              {['hiring', 'candidate'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setUserType(option)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 700,
                    fontSize: '13px',
                    border: userType === option ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    background: userType === option ? '#6C47FF' : 'transparent',
                    color: userType === option ? 'white' : '#8B8AA0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {option === 'hiring' ? 'Hiring Professional' : 'Job Seeker'}
                </button>
              ))}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={formState === 'submitting'}
              style={{
                background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 800,
                fontSize: '15px',
                border: 'none',
                cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s',
                opacity: formState === 'submitting' ? 0.7 : 1,
              }}
            >
              {formState === 'idle' && 'Get the inside look →'}
              {formState === 'submitting' && 'Sending...'}
              {formState === 'success' && 'You\'re in. ✓'}
            </button>

            {/* Fine print */}
            <p style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              color: '#8B8AA0',
              textAlign: 'center',
              marginTop: '8px',
            }}>
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* SECTION 9 — CLOSING */}
      <section style={{
        background: '#0F0F12',
        padding: '100px 40px',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          {/* Headline */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(34px, 5vw, 58px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            color: '#F2F0FF',
          }}>
            The goal isn&apos;t to win hiring.
          </h2>

          {/* Second line with gradient */}
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(34px, 5vw, 58px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginTop: '0',
          }}>
            It&apos;s to finally understand it.
          </h2>

          {/* Subhead */}
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 400,
            fontSize: '17px',
            color: '#8B8AA0',
            marginTop: '24px',
          }}>
            Both sides. Same production. Open for the first time.
          </p>

          {/* Two buttons */}
          <div style={{
            marginTop: '44px',
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Ghost button */}
            <Link href="/for-companies" className="hero-btn" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1.5px solid rgba(108,71,255,0.5)',
              background: 'transparent',
              color: '#A78BFA',
              padding: '15px 34px',
              borderRadius: '10px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>
              <Building2 size={17} />
              I&apos;m Hiring
            </Link>

            {/* Primary gradient button */}
            <Link href="/for-candidates" className="hero-btn" style={{
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
            }}>
              <User size={17} />
              I&apos;m Job Searching
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
