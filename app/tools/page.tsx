'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import {
  FileSearch,
  FileText,
  Shield,
  Target,
  Building2,
  Eye,
  Search,
  Pencil,
  MessageSquare,
  User,
  AlertTriangle,
  DollarSign,
  BarChart2,
  Share2,
  Star,
  UserCheck,
  ClipboardList,
  Users,
  Mail,
  Send,
  GitCompare,
  Calendar,
  Lock,
} from 'lucide-react'

// Candidate moments
const candidateMoments = [
  {
    label: 'Before You Apply',
    tools: [
      { name: 'What This Job Actually Is', icon: FileText, free: false, link: '/tools/what-this-job-is', desc: 'See what\'s really between the lines of any job description — and whether it\'s worth your time.' },
      { name: 'Where You Actually Have a Shot', icon: Target, free: false, link: '/tools/where-you-have-a-shot', desc: 'See which platforms actually respond to candidates like you — backed by real data.' },
      { name: 'What This Company Feels Like to Work At', icon: Building2, free: false, link: '/tools/culture-decoder', desc: 'See what a company\'s values actually mean in practice before you invest in applying.' },
    ],
  },
  {
    label: 'When You Apply',
    tools: [
      { name: 'Does My Resume Read as AI?', icon: FileSearch, free: true, link: '/resume', desc: 'See exactly how AI screening reads your resume before a human ever does.' },
      { name: 'Would You Even Make It Through?', icon: Shield, free: false, link: '/tools/ats-reality', desc: 'See exactly how automated screening scores your resume before a human sees it.' },
      { name: 'Your Resume, Through a Recruiter\'s Eyes', icon: Eye, free: false, link: '/tools/resume-recruiter-eyes', desc: 'See the internal monologue of a recruiter reading your resume in the first 6 seconds.' },
      { name: 'Would a Recruiter Even Find You?', icon: Search, free: false, link: '/tools/recruiter-find-you', desc: 'See the exact boolean search string used to find candidates like you — and whether your profile shows up.' },
      { name: 'LinkedIn Profile Rewriter', icon: Pencil, free: false, link: '/tools/linkedin-rewrite', desc: 'See how a recruiter reads your LinkedIn — and get every section rewritten in one pass.' },
      { name: 'RepVera', icon: Star, free: true, link: 'https://www.repvera.com', external: true, desc: 'The part of your application that no resume can show — what the people who\'ve actually worked with you say. Start your proof layer free.' },
    ],
  },
  {
    label: 'When You Interview',
    tools: [
      { name: 'What They\'re Really Asking', icon: MessageSquare, free: false, link: '/tools/what-theyre-asking', desc: 'See the competency underneath any interview question — and what a strong answer actually looks like.' },
      { name: 'How You Actually Come Across', icon: User, free: false, link: '/tools/how-you-come-across', desc: 'See how you sound when someone asks "tell me about yourself" — and make it land.' },
    ],
  },
  {
    label: 'When You\'re Not Hearing Back',
    tools: [
      { name: 'What\'s Breaking Your Search', icon: AlertTriangle, free: false, link: '/tools/whats-breaking-search', desc: 'See the real reason applications aren\'t converting — with a specific diagnosis for your situation.' },
    ],
  },
  {
    label: 'When You Get an Offer',
    tools: [
      { name: 'What You\'re Actually Worth', icon: DollarSign, free: false, link: '/tools/what-youre-worth', desc: 'See what the market actually says — and get a word-for-word negotiation script ready to use.' },
    ],
  },
]

// Hiring team moments
const hiringMoments = [
  {
    label: 'Before You Post',
    tools: [
      { name: 'Is Your Job Even Being Seen?', icon: BarChart2, free: true, link: '/jd-seo-score', desc: 'See how your job description scores across every major platform candidates are actually using.' },
      { name: 'Your Job Post, Through Candidate Eyes', icon: Eye, free: false, link: '/tools/jd-candidate-eyes', desc: 'See your job description the way a strong candidate reads it — and why they click away.' },
      { name: 'How This Sounds in the Wild', icon: Share2, free: false, link: '/tools/job-post-social', desc: 'See how your job post reads on every platform candidates are actually using.' },
      { name: 'What Your Brand Actually Says', icon: Star, free: false, link: '/tools/employer-brand', desc: 'See if your careers page actually convinces anyone — or sounds like every other company.' },
    ],
  },
  {
    label: 'While You Source',
    tools: [
      { name: 'The Search String That Finds Your Candidate', icon: Search, free: false, link: '/tools/boolean-builder', desc: 'See the exact boolean search to run on LinkedIn, Indeed, and Google to find your ideal hire.' },
      { name: 'How to Reach Out Without Being Ignored', icon: Send, free: false, link: '/tools/candidate-outreach', desc: 'See what actually gets a response — and what gets archived without being read.' },
    ],
  },
  {
    label: 'While You Evaluate',
    tools: [
      { name: 'Is This Even a Real Candidate?', icon: UserCheck, free: false, link: '/tools/real-candidate', desc: 'See whether this application is human-authored or AI-generated — and what flagged it.' },
      { name: 'What You\'re Actually Evaluating', icon: ClipboardList, free: false, link: '/tools/what-youre-evaluating', desc: 'See the structured scorecard that reduces gut-feel and creates consistent signal across interviewers.' },
      { name: 'Are Your Interviewers Even Ready?', icon: Users, free: false, link: '/tools/interviewers-ready', desc: 'See the prep guide that stops underprepared hiring managers from killing your best candidates.' },
    ],
  },
  {
    label: 'When You Decide',
    tools: [
      { name: 'How Your Offer Actually Lands', icon: Mail, free: false, link: '/tools/offer-lands', desc: 'See how your offer reads to a candidate who has options — and rewrite it to make them want to sign.' },
    ],
  },
  {
    label: 'After You Hire',
    tools: [
      { name: 'Your Hiring Process, From the Outside', icon: GitCompare, free: false, link: '/tools/hiring-process-outside', desc: 'See every step of your process through a candidate\'s eyes — including where you\'re losing the ones you wanted.' },
      { name: 'What Day One Actually Looks Like', icon: Calendar, free: false, link: '/tools/day-one', desc: 'See your onboarding through a new hire\'s eyes before they walk in — and make it worth staying for.' },
    ],
  },
]

function ToolCard({ tool, isCandidate }: { tool: any; isCandidate: boolean }) {
  const Icon = tool.icon
  const iconBgColor = isCandidate ? 'rgba(108,71,255,0.15)' : 'rgba(255,79,106,0.15)'
  const iconColor = isCandidate ? '#A78BFA' : '#FF4F6A'
  const ctaColor = tool.free ? '#6C47FF' : '#8B8AA0'
  const ctaText = tool.name === 'RepVera' ? 'Start your RepVera — free →' : (tool.free ? 'Get the inside look →' : 'Unlock with Pro →')

  const cardStyle: React.CSSProperties = {
    background: '#1A1A22',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '220px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  }

  const cardInner = (
    <>
      {/* Icon circle */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: iconBgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={18} color={iconColor} />
      </div>

      {/* Status badge */}
      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {tool.free ? (
          <span
            style={{
              background: 'rgba(34,197,94,0.15)',
              color: '#22C55E',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: "'Figtree', sans-serif",
            }}
          >
            Free — No account needed
          </span>
        ) : (
          <>
            <Lock size={12} color="#8B8AA0" />
            <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: "'Figtree', sans-serif", color: '#8B8AA0' }}>
              Pro
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 800,
          fontFamily: "'Figtree', sans-serif",
          color: '#F2F0FF',
          marginTop: '14px',
          marginBottom: '0',
        }}
      >
        {tool.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '13px',
          fontWeight: 400,
          fontFamily: "'Figtree', sans-serif",
          color: '#8B8AA0',
          lineHeight: 1.6,
          marginTop: '6px',
          marginBottom: '16px',
          flex: 1,
        }}
      >
        {tool.desc}
      </p>

      {/* CTA */}
      <span
        style={{
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: "'Figtree', sans-serif",
          color: ctaColor,
          marginTop: 'auto',
        }}
      >
        {ctaText}
      </span>
    </>
  )

  if (tool.external) {
    return (
      <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        style={cardStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(108,71,255,0.4)'
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {cardInner}
      </a>
    )
  }

  return (
    <Link
      href={tool.link}
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(108,71,255,0.4)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {cardInner}
    </Link>
  )
}

export default function ToolsPage() {
  const [section, setSection] = useState<'candidates' | 'hiring'>('candidates')

  const activeTools = section === 'candidates' ? candidateMoments : hiringMoments

  return (
    <div style={{ background: '#0F0F12', minHeight: '100vh' }}>
      <Navigation />

      {/* Sticky Banner */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
          padding: '12px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Figtree', sans-serif",
          }}
        >
          The full production kit. $20/year. Less than Jobscan charges for one day.
        </span>
        <Link
          href="/membership"
          style={{
            background: 'white',
            color: '#6C47FF',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: "'Figtree', sans-serif",
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Go Pro
        </Link>
      </div>

      {/* Hero Section */}
      <section
        style={{
          padding: '100px 40px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Radial glows */}
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(108,71,255,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,79,106,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8B8AA0',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          BACKSTAGE PASS
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900,
            fontFamily: "'Figtree', sans-serif",
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
            position: 'relative',
            zIndex: 1,
            color: '#F2F0FF',
          }}
        >
          Every inside look you need before the curtain goes up.
        </h1>
        <p
          style={{
            fontSize: '17px',
            fontWeight: 400,
            fontFamily: "'Figtree', sans-serif",
            color: '#8B8AA0',
            lineHeight: 1.6,
            maxWidth: '580px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Both sides of hiring. In the open. Two looks free forever — unlock all 20 for $20/year.
        </p>
      </section>

      {/* Toggle Section */}
      <section
        style={{
          padding: '60px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            gap: '12px',
            background: '#1A1A22',
            padding: '8px',
            borderRadius: '16px',
          }}
        >
          {(['candidates', 'hiring'] as const).map((sectionKey) => {
            const isActive = section === sectionKey
            const label = sectionKey === 'candidates' ? 'For Candidates' : 'For Hiring Teams'

            return (
              <button
                key={sectionKey}
                onClick={() => setSection(sectionKey)}
                style={{
                  padding: '12px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? '#6C47FF' : '#1A1A22',
                  color: isActive ? 'white' : '#8B8AA0',
                  fontSize: '14px',
                  fontWeight: isActive ? 800 : 600,
                  fontFamily: "'Figtree', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: !isActive ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Tools Sections */}
      <section
        style={{
          padding: '0 40px 80px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {activeTools.map((moment, idx) => (
          <div key={idx} style={{ marginBottom: '80px' }}>
            {/* Moment Label */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: section === 'candidates' ? '#FF4F6A' : '#FF4F6A',
                marginBottom: '12px',
                fontFamily: "'Figtree', sans-serif",
              }}
            >
              {moment.label}
            </div>

            {/* Tools Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {moment.tools.map((tool, toolIdx) => (
                <ToolCard key={toolIdx} tool={tool} isCandidate={section === 'candidates'} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA Section */}
      <section
        style={{
          padding: '80px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#1A1A22',
            border: '1px solid rgba(108,71,255,0.25)',
            borderRadius: '20px',
            padding: '60px 40px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              background: 'rgba(255,79,106,0.15)',
              color: '#FF4F6A',
              fontFamily: "'Figtree', sans-serif",
              marginBottom: '24px',
            }}
          >
            UNLOCK EVERYTHING
          </span>

          <h2
            style={{
              fontSize: '40px',
              fontWeight: 900,
              fontFamily: "'Figtree', sans-serif",
              color: '#F2F0FF',
              marginBottom: '12px',
              marginTop: '0',
            }}
          >
            All 20 inside looks. One price.
          </h2>

          <p
            style={{
              fontSize: '16px',
              fontFamily: "'Figtree', sans-serif",
              color: '#8B8AA0',
              marginBottom: '32px',
            }}
          >
            Jobscan charges $49.95/month for one tool. We built 20 of them — for both sides.
          </p>

          <Link
            href="/membership"
            className="btn-primary"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Go Pro — $20/year
          </Link>

          <p
            style={{
              fontSize: '13px',
              fontFamily: "'Figtree', sans-serif",
              color: '#8B8AA0',
              marginTop: '16px',
              marginBottom: '0',
            }}
          >
            Billed annually. Free looks stay free forever. No account needed for free tools.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
