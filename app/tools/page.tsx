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
} from 'lucide-react'

// Candidate moments
const candidateMoments = [
  {
    label: 'Before You Apply',
    tools: [
      { name: 'What This Job Actually Is', icon: FileText, free: false, link: '/tools/what-this-job-is', desc: 'See what\'s really between the lines of any job description — and whether it\'s worth your time.' },
      { name: 'Where You Actually Have a Shot', icon: Target, free: false, link: '/tools/where-you-have-a-shot', desc: 'See which platforms actually respond to candidates like you — and where you’re wasting your time.' },
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
  const ctaText =
    tool.name === 'RepVera'
      ? 'Start your RepVera — free →'
      : tool.free
      ? 'Get the inside look →'
      : 'Inside look — for members →'

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

      {/* Status badge — matches featured-card eyebrow style for consistency */}
      <div
        style={{
          marginTop: '14px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'Figtree', sans-serif",
          fontSize: '10px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: tool.free ? '#34D399' : '#A78BFA',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: tool.free ? '#34D399' : '#A78BFA',
          }}
        />
        {tool.free ? 'Free — No account needed' : 'For members'}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '17px',
          fontWeight: 800,
          fontFamily: "'Figtree', sans-serif",
          color: '#F2F0FF',
          marginTop: '14px',
          marginBottom: '0',
          letterSpacing: '-0.01em',
          lineHeight: 1.25,
        }}
      >
        {tool.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '14px',
          fontWeight: 400,
          fontFamily: "'Figtree', sans-serif",
          color: '#B8B6CF',
          lineHeight: 1.6,
          marginTop: '8px',
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

// === The Core Four (featured at the top of the page) =====================

interface FeaturedTool {
  status: 'free' | 'member' | 'soon'
  badge: string
  title: string
  /** Optional smaller subtitle below the title — useful when the brand-voice
   *  name differs from the SEO-friendly product name (e.g. "Your LinkedIn
   *  Audition Reel" with "LinkedIn Profile Rewriter" underneath). */
  subtitle?: string
  desc: string
  ctaLabel: string
  href: string | null
}

const CORE_FOUR: FeaturedTool[] = [
  {
    status: 'free',
    badge: 'Free forever',
    title: 'Does My Resume Read as AI?',
    desc: 'See exactly how AI-screening reads your resume before a human ever does. The whole report, no paywall.',
    ctaLabel: 'Run it free',
    href: '/resume',
  },
  {
    status: 'member',
    badge: 'For members',
    title: 'Your Resume, Through a Recruiter’s Eyes',
    desc: 'The internal monologue of a recruiter reading your resume. What they skip, what makes them pause, the call they make in 30 seconds.',
    ctaLabel: 'See the verdict',
    href: '/tools/resume-recruiter-eyes',
  },
  {
    status: 'member',
    badge: 'For members',
    title: 'Your LinkedIn Audition Reel',
    subtitle: 'LinkedIn Profile Rewriter',
    desc: 'The actual rewrites — not advice. Headline, About, recent role, all rewritten in your voice in one pass.',
    ctaLabel: 'Rewrite it',
    href: '/tools/linkedin-rewrite',
  },
  {
    status: 'soon',
    badge: 'Coming soon',
    title: 'The Rehearsal Room',
    desc: 'Interview prep in a hiring manager’s voice. Generated questions, real-time answer evaluation, audio rehearsals.',
    ctaLabel: 'Coming soon',
    href: null,
  },
]

function CoreFourFeature() {
  const [mounted, setMounted] = useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      style={{
        padding: '20px 24px 80px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {CORE_FOUR.map((tool, idx) => (
          <FeaturedCard key={tool.title} tool={tool} index={idx} mounted={mounted} />
        ))}
      </div>
    </section>
  )
}

function FeaturedCard({
  tool,
  index,
  mounted,
}: {
  tool: FeaturedTool
  index: number
  mounted: boolean
}) {
  const [hover, setHover] = useState(false)

  const accent =
    tool.status === 'free'
      ? { color: '#34D399', bg: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.35)' }
      : tool.status === 'member'
      ? { color: '#A78BFA', bg: 'rgba(108,71,255,0.10)', border: 'rgba(108,71,255,0.35)' }
      : { color: '#FF4F6A', bg: 'rgba(255,79,106,0.08)', border: 'rgba(255,79,106,0.25)' }

  const isClickable = tool.href !== null

  const cardInner = (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: '#14141C',
        border: `1px solid ${hover && isClickable ? accent.border : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '16px',
        padding: '28px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'transform 0.35s cubic-bezier(0.2,0.8,0.2,1), border-color 0.35s, box-shadow 0.35s, opacity 0.6s ease, translate 0.6s cubic-bezier(0.2,0.8,0.2,1)',
        transform: hover && isClickable ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hover && isClickable ? `0 24px 60px ${accent.bg}, 0 0 0 1px ${accent.border}` : 'none',
        opacity: mounted ? 1 : 0,
        translate: mounted ? '0 0' : '0 12px',
        transitionDelay: `${index * 80}ms`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle stage-light gradient that reveals on hover, like a spotlight catching the card */}
      {isClickable && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 0% 0%, ${accent.bg} 0%, transparent 60%)`,
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Eyebrow / status badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '10px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: accent.color,
          position: 'relative',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: accent.color,
            opacity: tool.status === 'soon' ? 0.6 : 1,
          }}
        />
        {tool.badge}
      </div>

      {/* Title */}
      <div style={{ position: 'relative' }}>
        <h3
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {tool.title}
        </h3>
        {tool.subtitle && (
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              color: '#8B8AA0',
              marginTop: '6px',
              letterSpacing: '0.02em',
            }}
          >
            {tool.subtitle}
          </div>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '15px',
          fontWeight: 400,
          color: '#C4C2D8',
          lineHeight: 1.6,
          margin: 0,
          flex: 1,
          position: 'relative',
        }}
      >
        {tool.desc}
      </p>

      {/* CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          fontWeight: 700,
          color: tool.status === 'soon' ? '#6B6B7B' : accent.color,
          position: 'relative',
          marginTop: '4px',
        }}
      >
        {tool.ctaLabel}
        {isClickable && (
          <span
            style={{
              transition: 'transform 0.25s ease',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            →
          </span>
        )}
      </div>
    </article>
  )

  if (!isClickable) return cardInner
  return (
    <Link href={tool.href!} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {cardInner}
    </Link>
  )
}

// === Page ================================================================

// Tools surfaced in the featured "Core Four" section above — exclude these
// from the journey-organized list below so the same tool doesn't appear twice.
const FEATURED_LINKS = new Set<string>([
  '/resume',
  '/tools/resume-recruiter-eyes',
  '/tools/linkedin-rewrite',
])

function withoutFeatured(moments: typeof candidateMoments) {
  return moments
    .map((moment) => ({
      ...moment,
      tools: moment.tools.filter((t: any) => !FEATURED_LINKS.has(t.link)),
    }))
    .filter((moment) => moment.tools.length > 0)
}

export default function ToolsPage() {
  const [section, setSection] = useState<'candidates' | 'hiring'>('candidates')

  const activeTools =
    section === 'candidates' ? withoutFeatured(candidateMoments) : hiringMoments

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
          Four polished inside looks built by someone who has screened 10,000 resumes. One free forever, three for members. $20/year.
        </p>
      </section>

      {/* Featured: The Four Inside Looks */}
      <CoreFourFeature />

      {/* Section break before the broader vision */}
      <section
        style={{
          padding: '40px 24px 0',
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            marginBottom: '40px',
          }}
        />
        <div
          style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#A78BFA',
            marginBottom: '12px',
          }}
        >
          The full production
        </div>
        <h2
          style={{
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 900,
            fontFamily: "'Figtree', sans-serif",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: '14px',
            letterSpacing: '-0.02em',
            color: '#F2F0FF',
          }}
        >
          The full vision, mapped to the candidate journey.
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: '#8B8AA0',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          The four above are polished and live. The rest are sketches of what comes next — every moment of hiring, on both sides, in development.
        </p>
      </section>

      {/* Toggle Section */}
      <section
        style={{
          padding: '40px 40px',
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
            Four inside looks. One price. No nonsense.
          </h2>

          <p
            style={{
              fontSize: '16px',
              fontFamily: "'Figtree', sans-serif",
              color: '#8B8AA0',
              marginBottom: '32px',
            }}
          >
            Jobscan charges $49.95/month for one tool. We built four — designed by someone who has screened 10,000 resumes — for less than what they charge for a single day.
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
