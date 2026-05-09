'use client'

import { useState } from 'react'

type ShareSource =
  | 'resume-ai-checker'
  | 'recruiter-eyes'
  | 'linkedin'
  | 'rehearsal-room'
  | 'what-this-job-is'
  | 'whats-breaking-search'

interface ShareResultProps {
  source: ShareSource
  /** Optional override for the URL. Defaults to the canonical tool URL. */
  url?: string
  /** Use 'light' on white-document backgrounds, 'dark' on the dark page. */
  variant?: 'light' | 'dark'
}

// Per-tool prefilled share copy. These are conversational starters the user
// can edit before posting — short on Twitter/X (character count matters),
// longer on LinkedIn (narrative format works).
const SHARE_COPY: Record<
  ShareSource,
  { url: string; tweet: string; linkedin: string }
> = {
  'resume-ai-checker': {
    url: 'https://hiring.productions/resume',
    tweet:
      'Just ran my resume through hiring.productions to see if it reads as AI-written. The recruiter\'s verdict was harsh and specific — and free.',
    linkedin:
      '49% of hiring managers auto-reject resumes they suspect were AI-written.\n\nI just ran mine through hiring.productions — a free tool that shows you exactly which lines on your resume give it away as AI, and what to rewrite (in your own voice).\n\nFounded by a 20-year recruiter who has read 10,000+ resumes. The output is direct, specific, and won\'t flatter you.\n\nRecommended.',
  },
  'recruiter-eyes': {
    url: 'https://hiring.productions/tools/resume-recruiter-eyes',
    tweet:
      'hiring.productions just gave me the most honest read of my resume I\'ve ever gotten. They show you the recruiter\'s actual internal monologue — what they skip, what makes them pause, the call they make in 30 seconds.',
    linkedin:
      'I\'ve gotten resume feedback dozens of times. None of it has been as direct as what hiring.productions just gave me.\n\nThe tool shows you the recruiter\'s actual internal monologue while reading your resume against a target job description. What they skip. What makes them pause. The call they make in 30 seconds.\n\nNo hedging, no encouragement, no fabricated metrics. Just specific.\n\nFounded by a 20-year recruiter. The framing — your resume as a script in a production — is doing real work.',
  },
  linkedin: {
    url: 'https://hiring.productions/tools/linkedin-rewrite',
    tweet:
      'Just had my LinkedIn rewritten by hiring.productions. Three headline options + a full About section + the exact terms recruiters search for in LinkedIn Recruiter. Worth the price.',
    linkedin:
      'Most LinkedIn "optimizers" just give you generic tips. hiring.productions gave me actual rewrites — three headline options, a full About rewrite, and the exact search terms a recruiter for my target role types into LinkedIn Recruiter.\n\nWhat made the difference: the tool refuses to fabricate. Anywhere a number would strengthen a line, it leaves a [your number] placeholder for me to fill in. So my profile actually stays mine.\n\nThe framing — your LinkedIn is your audition reel — captures something nobody else has named. Recommended for anyone interviewing right now.',
  },
  'rehearsal-room': {
    url: 'https://hiring.productions/tools/rehearsal-room',
    tweet:
      'hiring.productions just generated 10 interview questions calibrated to the JD I\'m targeting — with what the interviewer is REALLY assessing, the weak vs strong answer, and my literal opening line. This is what coaches charge $200/hr for.',
    linkedin:
      'Best interview prep tool I\'ve found.\n\nPaste a job description into hiring.productions\' Rehearsal Room and you get 10 questions calibrated to that exact role. Each comes with:\n  - What the interviewer is really assessing (the mechanism, not platitudes)\n  - What a weak answer sounds like\n  - What a strong answer sounds like\n  - The literal opening line you can adapt\n\nWhen I added my resume, three of the questions referenced specific moments from my actual background. The hiring manager voice is the differentiator — every question reads like one a real person would ask.\n\nFor anyone interviewing right now: this is the prep I wish I\'d had years ago.',
  },
  'what-this-job-is': {
    url: 'https://hiring.productions/tools/what-this-job-is',
    tweet:
      'hiring.productions has a free tool that decodes any job description — what the role really means day-to-day, the unstated requirements, the red flags, the honest salary read. Wild that this is free.',
    linkedin:
      'Every job description is half marketing, half code. hiring.productions has a free tool that translates the marketing into plain English — and flags the parts that should make you walk away.\n\nFor any candidate weighing whether a posting is worth applying to: try it on the next "fast-paced, mission-driven" listing in your inbox. The honest read might save you 40 hours of interview prep.',
  },
  'whats-breaking-search': {
    url: 'https://hiring.productions/tools/whats-breaking-search',
    tweet:
      'If your job search has stalled, hiring.productions has a free tool that gives you ONE specific diagnosis from a 20-year recruiter (not five maybes) and one 48-hour fix to start with. Worth running.',
    linkedin:
      'If your job search has stalled — applications go out, nothing comes back — hiring.productions has a free diagnostic that gives you ONE specific reason and ONE 48-hour fix.\n\nWhat I appreciate: it commits to a diagnosis. No "could be many things." A 20-year recruiter telling you the actual mechanism that\'s breaking your conversion, and what to change today.\n\nIf you know someone who\'s stuck in a search, send them this.',
  },
}

export function ShareResult({ source, url, variant = 'light' }: ShareResultProps) {
  const [copied, setCopied] = useState(false)
  const copy = SHARE_COPY[source]
  const shareUrl = url || copy.url

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl,
  )}&summary=${encodeURIComponent(copy.linkedin)}`

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    copy.tweet,
  )}&url=${encodeURIComponent(shareUrl)}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const isLight = variant === 'light'
  const palette = isLight
    ? {
        bg: '#FAFAFB',
        border: '#ECECF2',
        eyebrow: '#7A6CFF',
        title: '#1A1A22',
        body: '#5A5A6E',
        btnBorder: 'rgba(108,71,255,0.3)',
        btnText: '#3D2A8C',
        btnBg: '#ffffff',
      }
    : {
        bg: 'rgba(108,71,255,0.06)',
        border: 'rgba(108,71,255,0.18)',
        eyebrow: '#A78BFA',
        title: '#F2F0FF',
        body: '#B8B6CF',
        btnBorder: 'rgba(108,71,255,0.4)',
        btnText: '#A78BFA',
        btnBg: 'rgba(108,71,255,0.1)',
      }

  return (
    <div
      style={{
        margin: isLight ? '20px 0 0' : '24px 0',
        padding: '20px 24px',
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: '12px',
        fontFamily: 'Figtree, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
        }}
      >
        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: palette.eyebrow,
              marginBottom: '4px',
            }}
          >
            Share what you found
          </div>
          <div style={{ fontSize: '13px', color: palette.body, lineHeight: 1.5 }}>
            Help someone who needs this. Pre-written copy you can edit before posting.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 14px',
              background: palette.btnBg,
              color: palette.btnText,
              border: `1px solid ${palette.btnBorder}`,
              borderRadius: '8px',
              fontFamily: 'Figtree, sans-serif',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Share on LinkedIn
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 14px',
              background: palette.btnBg,
              color: palette.btnText,
              border: `1px solid ${palette.btnBorder}`,
              borderRadius: '8px',
              fontFamily: 'Figtree, sans-serif',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Share on X
          </a>
          <button
            onClick={handleCopyLink}
            style={{
              padding: '8px 14px',
              background: copied
                ? '#1F8A55'
                : palette.btnBg,
              color: copied ? '#ffffff' : palette.btnText,
              border: copied ? 'none' : `1px solid ${palette.btnBorder}`,
              borderRadius: '8px',
              fontFamily: 'Figtree, sans-serif',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  )
}
