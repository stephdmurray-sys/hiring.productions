'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CheckCircle2 } from 'lucide-react'

/**
 * /consider-me — bench signup for recruiters and talent assessors.
 *
 * Stephanie pulls vetted talent people into fast client projects
 * (interview assessments, search, advisory). This page is how they
 * raise their hand. The RepVera link is the key field: receipts
 * instead of reference chasing, which is the whole point of the bench
 * moving fast.
 *
 * Submits to /api/consider-me (Redis + Resend notification to
 * Stephanie + confirmation to the applicant). If the API is ever
 * unreachable the error state offers a prefilled mailto fallback so a
 * submission is never lost.
 */

const SPECIALTIES = [
  'Healthcare & clinical',
  'Tech & engineering',
  'Executive & leadership',
  'Sales & go to market',
  'General & cross industry',
  'Other',
]

const YEARS = ['1 to 3', '4 to 7', '8 to 15', '15+']

const AVAILABILITY = [
  'Available now',
  'A few hours a week',
  'Project by project',
]

/**
 * Open engagements. Add or remove entries here and the page updates:
 * the hero banner, the Open opportunities section, and the form tag
 * all read from this array. Empty array hides the section.
 */
const OPPORTUNITIES = [
  {
    id: 'clinical-talent-assessment-houston',
    title: 'Clinical Talent Assessment Consultant',
    meta: 'Contract. Remote. Short term, project based.',
    client:
      'A growing outpatient psychiatry practice in the Greater Houston area. Client named once you are engaged.',
    sections: [
      {
        heading: 'The role',
        body: 'Our client is expanding their physician team and needs a highly experienced clinical talent leader to help assess psychiatrist candidates during an active hiring push. This is a focused, high trust engagement. You bring the seasoned eye they do not have in house, and you give them the confidence to move quickly on the right people.',
      },
      {
        heading: 'What you will do',
        bullets: [
          'Conduct one hour interviews with psychiatrist candidates',
          'Assess clinical fit, communication, and how each candidate is likely to show up in practice',
          'Deliver a brief written summary after each interview with your impressions and a clear recommendation',
        ],
      },
      {
        heading: 'Who we are looking for',
        bullets: [
          'Deep talent acquisition or talent assessment experience, ideally in healthcare or clinical hiring',
          'Comfortable evaluating physician or provider candidates. Psychiatry or behavioral health a plus',
          'Strong judgment, and the ability to turn one conversation into a crisp, decision ready write up',
          'Available to begin the week of July 28 or August 3',
        ],
      },
      {
        heading: 'Details',
        bullets: [
          'Contract, paid per interview or per project. Rate discussed on intro call',
          'Candidate interviews expected to begin next week or the week after',
          'Flexible scheduling around candidate availability',
        ],
      },
      {
        heading: 'To be considered',
        body: 'Use the application below. Tell us about your clinical hiring background and include your verified RepVera profile so we can see how the people who have worked with you describe you.',
      },
    ],
    questions: [
      'Describe your experience interviewing and qualifying psychiatrists for outpatient roles. Settings, volume, and how you judge clinical fit.',
    ],
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Tell us who you are',
    body: 'Name, specialty, availability. Two minutes, one form.',
  },
  {
    num: '02',
    title: 'Bring your receipts',
    body: 'Share your verified RepVera profile so we can see how you work, fast.',
  },
  {
    num: '03',
    title: 'We move quickly',
    body: 'Your application goes straight to Stephanie. If it fits the engagement, you hear back fast.',
  },
]

export default function ConsiderMePage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [years, setYears] = useState('')
  const [availability, setAvailability] = useState('')
  const [repvera, setRepvera] = useState('')
  const [notes, setNotes] = useState('')
  const [resume, setResume] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState('')
  const [openOpp, setOpenOpp] = useState<string | null>(
    OPPORTUNITIES.length === 1 ? OPPORTUNITIES[0].id : null,
  )
  // Applications are per role, no general bench. With one open
  // engagement the form is locked to it from the start.
  const [applyingFor, setApplyingFor] = useState(
    OPPORTUNITIES.length === 1 ? OPPORTUNITIES[0].title : '',
  )
  const [hourlyRate, setHourlyRate] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const activeOpp = OPPORTUNITIES.find((o) => o.title === applyingFor)

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  // Missing-field messaging only appears after the first submit attempt,
  // so a fresh visitor sees a normal form, not a wall of warnings.
  const [attempted, setAttempted] = useState(false)

  const isUrl = (v: string) => /^https?:\/\/\S+\.\S+/.test(v.trim())

  const missing: string[] = []
  if (!fullName.trim()) missing.push('full name')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) missing.push('email')
  if (!specialty) missing.push('specialty')
  if (!years) missing.push('years assessing or hiring talent')
  if (!availability) missing.push('availability')
  if (!isUrl(repvera)) missing.push('RepVera profile link')
  if (!hourlyRate.trim()) missing.push('hourly consulting rate')
  for (const q of activeOpp?.questions ?? []) {
    if (!(answers[q] ?? '').trim()) missing.push('the experience question')
  }
  const canSubmit = missing.length === 0

  const RESUME_MAX_BYTES = 3 * 1024 * 1024
  const RESUME_TYPES = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ])

  const handleResume = (file: File | null) => {
    setResumeError('')
    if (!file) {
      setResume(null)
      return
    }
    if (!RESUME_TYPES.has(file.type)) {
      setResume(null)
      setResumeError('Use a PDF or Word file.')
      return
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResume(null)
      setResumeError('Keep it under 3 MB.')
      return
    }
    setResume(file)
  }

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.slice(result.indexOf(',') + 1))
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })

  // Prefilled mailto fallback. Keeps a submission recoverable even if
  // the API is down. Values are joined into a plain text body.
  const mailtoHref = () => {
    const body = [
      `Opportunity: ${applyingFor || 'General bench signup'}`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `LinkedIn: ${linkedin || '(not provided)'}`,
      `Specialty: ${specialty}`,
      `Years assessing or hiring: ${years}`,
      `Availability: ${availability}`,
      `RepVera: ${repvera}`,
      `Hourly consulting rate: ${hourlyRate}`,
      ...(activeOpp?.questions ?? []).map((q) => `\n${q}\n${answers[q] ?? ''}`),
      '',
      'Notes:',
      notes || '(none)',
    ].join('\n')
    return `mailto:stephdmurray@gmail.com?subject=${encodeURIComponent(
      `Consider me: ${fullName}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setAttempted(true)
    if (!canSubmit) return
    setSubmitting(true)
    setError('')
    try {
      const resumePayload = resume
        ? {
            resumeName: resume.name.slice(0, 120),
            resumeData: await fileToBase64(resume),
          }
        : {}
      const res = await fetch('/api/consider-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          linkedin,
          specialty,
          years,
          availability,
          repvera,
          notes,
          opportunity: applyingFor,
          hourlyRate,
          answers: (activeOpp?.questions ?? []).map((q) => ({
            q,
            a: answers[q] ?? '',
          })),
          ...resumePayload,
        }),
      })
      if (!res.ok) throw new Error('submit-failed')
      setSubmitted(true)
    } catch {
      setError(
        'Something went wrong on our end. Try again in a minute, or send it straight to Stephanie:',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const label: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    color: '#1A1A22',
    marginBottom: 6,
  }

  const input: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #ECECF2',
    borderRadius: 10,
    padding: '13px 16px',
    fontFamily: "'Figtree', sans-serif",
    fontSize: 15,
    color: '#1A1A22',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const field: React.CSSProperties = { marginBottom: 18 }

  const focus = (e: React.FocusEvent<HTMLElement>) =>
    ((e.currentTarget as HTMLElement).style.borderColor = '#6C47FF')
  const blur = (e: React.FocusEvent<HTMLElement>) =>
    ((e.currentTarget as HTMLElement).style.borderColor = '#ECECF2')

  return (
    <div style={{ background: '#FAF8F3', color: '#1A1A22', minHeight: '100vh' }}>
      <Navigation variant="light" />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(72px, 10vw, 128px) 24px clamp(48px, 6vw, 72px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A78BFA',
              margin: '0 0 16px',
            }}
          >
            For recruiters and talent assessors
          </p>
          <h1
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(40px, 6.5vw, 72px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 22px',
            }}
          >
            Get pulled in when
            <br />
            the work comes.
          </h1>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              lineHeight: 1.6,
              color: '#5A5A6E',
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            Hiring.Productions brings vetted talent people into fast, high trust
            client projects. Interview assessments, search, advisory. Every
            application is for a specific open engagement.
          </p>
          {OPPORTUNITIES.length > 0 && (
            <a
              href="#opportunities"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 28,
                background: '#FFFFFF',
                border: '1.5px solid rgba(108,71,255,0.35)',
                borderRadius: 999,
                padding: '11px 22px',
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: 14.5,
                color: '#1A1A22',
                textDecoration: 'none',
                boxShadow: '0 10px 26px -18px rgba(108,71,255,0.5)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#0F7A4F',
                  display: 'inline-block',
                }}
              />
              {OPPORTUNITIES.length === 1
                ? `Open now: ${OPPORTUNITIES[0].title}`
                : `${OPPORTUNITIES.length} opportunities open now`}
            </a>
          )}
        </div>
      </section>

      {/* Open opportunities */}
      {OPPORTUNITIES.length > 0 && (
        <section
          id="opportunities"
          style={{ padding: '0 24px clamp(48px, 6vw, 80px)', scrollMarginTop: 90 }}
        >
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#A78BFA',
                textAlign: 'center',
                margin: '0 0 20px',
              }}
            >
              Open opportunities
            </p>
            {OPPORTUNITIES.map((opp) => {
              const isOpen = openOpp === opp.id
              return (
                <div
                  key={opp.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(108,71,255,0.30)',
                    borderRadius: 20,
                    marginBottom: 16,
                    overflow: 'hidden',
                    boxShadow: '0 18px 44px -30px rgba(108,71,255,0.35)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenOpp(isOpen ? null : opp.id)}
                    aria-expanded={isOpen}
                    aria-controls={`opp-body-${opp.id}`}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      padding: 'clamp(20px, 3vw, 28px)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: "'Figtree', sans-serif",
                          fontWeight: 900,
                          fontSize: 'clamp(20px, 2.6vw, 26px)',
                          letterSpacing: '-0.015em',
                          color: '#1A1A22',
                          marginBottom: 6,
                        }}
                      >
                        {opp.title}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: "'Figtree', sans-serif",
                          fontSize: 14,
                          color: '#5A5A6E',
                        }}
                      >
                        {opp.meta}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "'Figtree', sans-serif",
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#6C47FF',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.15s ease',
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`opp-body-${opp.id}`}
                      style={{
                        padding: '0 clamp(20px, 3vw, 28px) clamp(24px, 3vw, 32px)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Figtree', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.55,
                          color: '#5A5A6E',
                          background: 'rgba(108,71,255,0.06)',
                          borderRadius: 10,
                          padding: '12px 16px',
                          margin: '0 0 20px',
                        }}
                      >
                        <strong style={{ color: '#1A1A22' }}>Client:</strong>{' '}
                        {opp.client}
                      </p>
                      {opp.sections.map((s) => (
                        <div key={s.heading} style={{ marginBottom: 18 }}>
                          <h3
                            style={{
                              fontFamily: "'Figtree', sans-serif",
                              fontWeight: 800,
                              fontSize: 16,
                              margin: '0 0 8px',
                            }}
                          >
                            {s.heading}
                          </h3>
                          {'body' in s && s.body && (
                            <p
                              style={{
                                fontFamily: "'Figtree', sans-serif",
                                fontSize: 15,
                                lineHeight: 1.6,
                                color: '#5A5A6E',
                                margin: 0,
                              }}
                            >
                              {s.body}
                            </p>
                          )}
                          {'bullets' in s && s.bullets && (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              {s.bullets.map((b) => (
                                <li
                                  key={b}
                                  style={{
                                    fontFamily: "'Figtree', sans-serif",
                                    fontSize: 15,
                                    lineHeight: 1.6,
                                    color: '#5A5A6E',
                                    marginBottom: 6,
                                  }}
                                >
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setApplyingFor(opp.title)
                          document
                            .getElementById('apply')
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                          border: 'none',
                          borderRadius: 10,
                          padding: '14px 28px',
                          fontFamily: "'Figtree', sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          boxShadow: '0 12px 28px rgba(108,71,255,0.22)',
                        }}
                      >
                        Apply for this role
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* How it works */}
      <section style={{ padding: '0 24px clamp(48px, 6vw, 80px)' }}>
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.num}
              style={{
                background: '#FFFFFF',
                border: '1px solid #ECECF2',
                borderRadius: 16,
                padding: '28px 26px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  color: '#A78BFA',
                  margin: '0 0 10px',
                }}
              >
                {s.num}
              </p>
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: '-0.01em',
                  margin: '0 0 8px',
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: '#5A5A6E',
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RepVera callout */}
      <section style={{ padding: '0 24px clamp(56px, 7vw, 96px)' }}>
        <div
          style={{
            maxWidth: 780,
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1.5px solid rgba(108,71,255,0.30)',
            borderRadius: 20,
            padding: 'clamp(28px, 4vw, 44px)',
            boxShadow: '0 18px 44px -30px rgba(108,71,255,0.35)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(24px, 3vw, 30px)',
              letterSpacing: '-0.02em',
              margin: '0 0 14px',
            }}
          >
            Why we ask for a RepVera, not references.
          </h2>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: '#5A5A6E',
              margin: '0 0 10px',
            }}
          >
            When a client needs someone next week, there is no time to chase
            reference calls. So instead of a list of names, send your receipts.
          </p>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: '#5A5A6E',
              margin: '0 0 24px',
            }}
          >
            To reduce time to trust, we leverage RepVera for verified proof of
            how others experience working with you. Create your profile, paste
            the link in your application, then send your collection link to the
            people who can vouch for you. Your profile updates automatically as
            they respond. It is free and takes a few minutes.
          </p>
          <a
            href="https://repvera.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#FF4F6A',
              color: '#FFFFFF',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: '13px 26px',
              borderRadius: 10,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(255,79,106,0.25)',
            }}
          >
            Create your free RepVera
          </a>
        </div>
      </section>

      {/* Form */}
      <section
        id="apply"
        style={{ padding: '0 24px clamp(80px, 10vw, 128px)', scrollMarginTop: 90 }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {submitted ? (
            <div
              role="status"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(94,230,168,0.45)',
                borderRadius: 20,
                padding: 'clamp(32px, 5vw, 48px)',
                textAlign: 'center',
              }}
            >
              <CheckCircle2
                size={40}
                color="#0F7A4F"
                strokeWidth={2}
                style={{ marginBottom: 16 }}
              />
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: '-0.02em',
                  margin: '0 0 10px',
                }}
              >
                Application received.
              </h2>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: '#5A5A6E',
                  margin: 0,
                }}
              >
                We read every application and we review your RepVera. If it
                fits the engagement, you hear from Stephanie directly. A
                confirmation is on its way to your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(30px, 4vw, 40px)',
                  letterSpacing: '-0.02em',
                  textAlign: 'center',
                  margin: '0 0 8px',
                }}
              >
                {applyingFor ? 'Apply for this engagement.' : 'Consider me.'}
              </h2>
              <p
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 15,
                  color: '#5A5A6E',
                  textAlign: 'center',
                  margin: '0 0 20px',
                }}
              >
                Two minutes. The RepVera link is the part we read first.
              </p>

              {applyingFor && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 26,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(108,71,255,0.08)',
                      border: '1.5px solid rgba(108,71,255,0.35)',
                      borderRadius: 999,
                      padding: '9px 16px',
                      fontFamily: "'Figtree', sans-serif",
                      fontWeight: 700,
                      fontSize: 13.5,
                      color: '#1A1A22',
                    }}
                  >
                    Applying for: {applyingFor}
                  </span>
                </div>
              )}

              <div style={field}>
                <label htmlFor="cm-name" style={label}>
                  Full name <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <input
                  id="cm-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={input}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              <div style={field}>
                <label htmlFor="cm-email" style={label}>
                  Email <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <input
                  id="cm-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={input}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              <div style={field}>
                <label htmlFor="cm-linkedin" style={label}>
                  LinkedIn URL
                </label>
                <input
                  id="cm-linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/you"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  style={input}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              <div style={field}>
                <label htmlFor="cm-resume" style={label}>
                  Resume
                </label>
                <input
                  id="cm-resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => handleResume(e.target.files?.[0] ?? null)}
                  aria-describedby="cm-resume-help"
                  style={{
                    ...input,
                    padding: '11px 16px',
                    cursor: 'pointer',
                    background: '#FFFFFF',
                  }}
                />
                <p
                  id="cm-resume-help"
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: resumeError ? '#C1113A' : '#8B8AA0',
                    margin: '6px 0 0',
                  }}
                >
                  {resumeError
                    ? resumeError
                    : resume
                    ? `Attached: ${resume.name}`
                    : 'Optional. PDF or Word, up to 3 MB.'}
                </p>
              </div>

              <div style={field}>
                <label htmlFor="cm-specialty" style={label}>
                  Specialty <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <select
                  id="cm-specialty"
                  required
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  style={{ ...input, appearance: 'auto', cursor: 'pointer' }}
                  onFocus={focus}
                  onBlur={blur}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div style={field}>
                <label htmlFor="cm-years" style={label}>
                  Years assessing or hiring talent{' '}
                  <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <select
                  id="cm-years"
                  required
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  style={{ ...input, appearance: 'auto', cursor: 'pointer' }}
                  onFocus={focus}
                  onBlur={blur}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div style={field}>
                <label htmlFor="cm-availability" style={label}>
                  Availability <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <select
                  id="cm-availability"
                  required
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  style={{ ...input, appearance: 'auto', cursor: 'pointer' }}
                  onFocus={focus}
                  onBlur={blur}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {AVAILABILITY.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div style={field}>
                <label htmlFor="cm-rate" style={label}>
                  Hourly consulting rate ($) <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <input
                  id="cm-rate"
                  type="text"
                  required
                  inputMode="numeric"
                  placeholder="e.g. 150, or a range like 125 to 175"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  style={input}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              {(activeOpp?.questions ?? []).map((q, i) => (
                <div style={field} key={q}>
                  <label htmlFor={`cm-q-${i}`} style={label}>
                    {q} <span style={{ color: '#C1113A' }}>*</span>
                  </label>
                  <textarea
                    id={`cm-q-${i}`}
                    rows={4}
                    required
                    value={answers[q] ?? ''}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q]: e.target.value }))
                    }
                    style={{ ...input, resize: 'vertical', minHeight: 96, lineHeight: 1.5 }}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              ))}

              {/* RepVera link — the key field, visually emphasized */}
              <div
                style={{
                  background: 'rgba(108,71,255,0.06)',
                  border: '1.5px solid rgba(108,71,255,0.35)',
                  borderRadius: 14,
                  padding: '18px 18px 16px',
                  marginBottom: 18,
                }}
              >
                <label htmlFor="cm-repvera" style={label}>
                  RepVera profile link <span style={{ color: '#C1113A' }}>*</span>
                </label>
                <input
                  id="cm-repvera"
                  type="url"
                  required
                  placeholder="https://repvera.com/r/your-name"
                  value={repvera}
                  onChange={(e) => setRepvera(e.target.value)}
                  aria-describedby="cm-repvera-help"
                  style={input}
                  onFocus={focus}
                  onBlur={blur}
                />
                <p
                  id="cm-repvera-help"
                  style={{
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: '#5A5A6E',
                    margin: '8px 0 0',
                  }}
                >
                  To reduce time to trust, we use RepVera for verified proof of
                  how others experience working with you. Paste your profile
                  link here, then send your collection link to the people who
                  can vouch for you. Your profile updates automatically as they
                  respond. No profile yet? Build one free at{' '}
                  <a
                    href="https://repvera.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#6C47FF', fontWeight: 700 }}
                  >
                    repvera.com
                  </a>
                  .
                </p>
              </div>

              <div style={field}>
                <label htmlFor="cm-notes" style={label}>
                  Anything we should know
                </label>
                <textarea
                  id="cm-notes"
                  rows={4}
                  placeholder="Niches you own, clients you love, rates, timing. Whatever helps."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ ...input, resize: 'vertical', minHeight: 96, lineHeight: 1.5 }}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  marginTop: 6,
                  background: submitting
                    ? 'rgba(108,71,255,0.35)'
                    : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
                  border: 'none',
                  borderRadius: 12,
                  padding: '16px 24px',
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 800,
                  fontSize: 16,
                  color: '#FFFFFF',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: submitting
                    ? 'none'
                    : '0 14px 32px rgba(108,71,255,0.22)',
                }}
              >
                {submitting ? 'Sending...' : 'Consider me'}
              </button>

              {attempted && !canSubmit && (
                <p
                  role="alert"
                  style={{
                    marginTop: 12,
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14,
                    color: '#C1113A',
                    lineHeight: 1.5,
                    textAlign: 'center',
                  }}
                >
                  Almost there. Still needed: {missing.join(', ')}.
                </p>
              )}

              {error && (
                <div
                  role="alert"
                  style={{
                    marginTop: 14,
                    background: '#FFFFFF',
                    border: '1px solid rgba(255,79,106,0.35)',
                    borderRadius: 10,
                    padding: '14px 18px',
                    fontFamily: "'Figtree', sans-serif",
                    fontSize: 14,
                    color: '#1A1A22',
                    lineHeight: 1.5,
                  }}
                >
                  {error}{' '}
                  <a href={mailtoHref()} style={{ color: '#6C47FF', fontWeight: 700 }}>
                    email your details instead
                  </a>
                  .
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
