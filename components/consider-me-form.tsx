'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { Opportunity } from '@/lib/opportunities'

/**
 * Application form for one open engagement. Lives on the role page
 * (/consider-me/{slug}). Applications are always per role, so the
 * form takes the opportunity as a prop and tags every submission
 * with it. Role specific screening questions render as required
 * textareas.
 *
 * Submits to /api/consider-me (Redis + Resend notification to
 * Stephanie + confirmation to the applicant). If the API is ever
 * unreachable the error state offers a prefilled mailto fallback so
 * an application is never lost.
 */

const SKILLS = [
  'Interviewing & assessment',
  'Sourcing & search',
  'Screening & qualifying',
  'Offer negotiation & closing',
  'Onboarding',
  'Employer branding & recruitment marketing',
  'Talent strategy & advisory',
]

const YEARS = ['1 to 3', '4 to 7', '8 to 15', '15+']

const AVAILABILITY = ['Available now', 'A few hours a week', 'Project by project']

export function ConsiderMeForm({ opportunity }: { opportunity: Opportunity }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [years, setYears] = useState('')
  const [availability, setAvailability] = useState('')
  const [repvera, setRepvera] = useState('')
  const [notes, setNotes] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [resume, setResume] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  // Missing-field messaging only appears after the first submit attempt,
  // so a fresh visitor sees a normal form, not a wall of warnings.
  const [attempted, setAttempted] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  const isUrl = (v: string) => /^https?:\/\/\S+\.\S+/.test(v.trim())

  const toggleSkill = (skill: string) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((x) => x !== skill) : [...prev, skill],
    )

  const missing: string[] = []
  if (!fullName.trim()) missing.push('full name')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) missing.push('email')
  if (skills.length === 0) missing.push('at least one thing you are great at')
  if (!years) missing.push('years assessing or hiring talent')
  if (!availability) missing.push('availability')
  if (!hourlyRate.trim()) missing.push('hourly consulting rate')
  if (repvera.trim() && !isUrl(repvera)) missing.push('a valid RepVera link')
  for (const q of opportunity.questions) {
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

  // Prefilled mailto fallback. Keeps an application recoverable even
  // if the API is down.
  const mailtoHref = () => {
    const body = [
      `Opportunity: ${opportunity.title}`,
      `Name: ${fullName}`,
      `Email: ${email}`,
      `LinkedIn: ${linkedin || '(not provided)'}`,
      `Great at: ${skills.join(', ')}`,
      `Years assessing or hiring: ${years}`,
      `Availability: ${availability}`,
      `Hourly consulting rate: ${hourlyRate}`,
      `RepVera: ${repvera || '(not provided)'}`,
      ...opportunity.questions.map((q) => `\n${q}\n${answers[q] ?? ''}`),
      '',
      'Notes:',
      notes || '(none)',
    ].join('\n')
    return `mailto:stephdmurray@gmail.com?subject=${encodeURIComponent(
      `Consider me: ${fullName} for ${opportunity.title}`,
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
          skills,
          years,
          availability,
          repvera,
          notes,
          opportunity: opportunity.title,
          hourlyRate,
          answers: opportunity.questions.map((q) => ({ q, a: answers[q] ?? '' })),
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

  if (submitted) {
    return (
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
        <CheckCircle2 size={40} color="#0F7A4F" strokeWidth={2} style={{ marginBottom: 16 }} />
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
          We read every application, and if you shared a RepVera we review it
          closely. If it fits the engagement, you hear from Stephanie directly.
          A confirmation is on its way to your inbox.
        </p>
      </div>
    )
  }

  return (
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
        Apply for this engagement.
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
        Two minutes. Receipts optional, but they move you to the front.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
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
          Applying for: {opportunity.title}
        </span>
      </div>

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
          style={{ ...input, padding: '11px 16px', cursor: 'pointer', background: '#FFFFFF' }}
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

      <fieldset style={{ ...field, border: 'none', padding: 0, margin: '0 0 18px' }}>
        <legend style={{ ...label, padding: 0 }}>
          What are you great at? <span style={{ color: '#C1113A' }}>*</span>{' '}
          <span style={{ fontWeight: 400, color: '#8B8AA0' }}>Check all that apply.</span>
        </legend>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 8,
            marginTop: 4,
          }}
        >
          {SKILLS.map((skill) => {
            const checked = skills.includes(skill)
            return (
              <label
                key={skill}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: checked ? 'rgba(108,71,255,0.07)' : '#FFFFFF',
                  border: checked
                    ? '1.5px solid rgba(108,71,255,0.45)'
                    : '1px solid #ECECF2',
                  borderRadius: 10,
                  padding: '11px 14px',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1A1A22',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSkill(skill)}
                  style={{
                    accentColor: '#6C47FF',
                    width: 16,
                    height: 16,
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />
                {skill}
              </label>
            )
          })}
        </div>
      </fieldset>

      <div style={field}>
        <label htmlFor="cm-years" style={label}>
          Years assessing or hiring talent <span style={{ color: '#C1113A' }}>*</span>
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

      {opportunity.questions.map((q, i) => (
        <div style={field} key={q}>
          <label htmlFor={`cm-q-${i}`} style={label}>
            {q} <span style={{ color: '#C1113A' }}>*</span>
          </label>
          <textarea
            id={`cm-q-${i}`}
            rows={4}
            required
            value={answers[q] ?? ''}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [q]: e.target.value }))}
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
          RepVera profile link{' '}
          <span style={{ fontWeight: 400, color: '#8B8AA0' }}>Optional</span>
        </label>
        <input
          id="cm-repvera"
          type="url"
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
          Optional, and applications with receipts move first. To reduce time
          to trust, we use RepVera for verified proof of how others experience
          working with you. No profile yet? Build one free at{' '}
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

        <button
          type="button"
          onClick={() => setShowWhy((v) => !v)}
          aria-expanded={showWhy}
          aria-controls="cm-repvera-why"
          style={{
            marginTop: 12,
            background: 'transparent',
            border: 'none',
            padding: 0,
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: 13.5,
            color: '#6C47FF',
            cursor: 'pointer',
          }}
        >
          {showWhy ? 'Hide' : 'Why a RepVera, not references?'}
        </button>

        {showWhy && (
          <div id="cm-repvera-why" style={{ marginTop: 10 }}>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: '#5A5A6E',
                margin: '0 0 10px',
              }}
            >
              When a client needs someone next week, there is no time to chase
              reference calls. So instead of a list of names, you send verified
              proof.
            </p>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: '#5A5A6E',
                margin: '0 0 10px',
              }}
            >
              Your RepVera is portable and it is yours. Build it once and it
              travels with you from engagement to engagement. Pull in the
              recognition and recommendations you already have, so your
              receipts live in one place.
            </p>
            <p
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: '#5A5A6E',
                margin: '0 0 14px',
              }}
            >
              Send your collection link to the people who can vouch for you.
              Your profile updates automatically as they respond. Free, and it
              takes a few minutes.
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
                fontSize: 14,
                padding: '11px 20px',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              Create your free RepVera
            </a>
          </div>
        )}
      </div>

      <div style={field}>
        <label htmlFor="cm-notes" style={label}>
          Anything we should know
        </label>
        <textarea
          id="cm-notes"
          rows={4}
          placeholder="Niches you own, clients you love, timing. Whatever helps."
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
          background: submitting ? 'rgba(108,71,255,0.35)' : '#6C47FF',
          border: 'none',
          borderRadius: 12,
          padding: '16px 24px',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: 16,
          color: '#FFFFFF',
          cursor: submitting ? 'not-allowed' : 'pointer',
          boxShadow: submitting ? 'none' : '0 12px 26px rgba(108,71,255,0.25)',
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
            email your application instead
          </a>
          .
        </div>
      )}
    </form>
  )
}
