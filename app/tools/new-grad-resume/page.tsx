'use client'

import { useState } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { InputPromptCard } from '@/components/input-prompt-card'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { useStageRotation } from '@/lib/use-stage-rotation'

const RUNNING_STAGES = [
  'Lights up. Reading what you’ve actually done…',
  'Pulling what hiring managers want for this role…',
  'Building the section structure…',
  'Drafting example bullets in your voice…',
  'Calling out what to leave out…',
] as const

export default function NewGradResumePage() {
  const [degree, setDegree] = useState('')
  const [gradDate, setGradDate] = useState('')
  const [school, setSchool] = useState('')
  const [gpa, setGpa] = useState('')
  const [internships, setInternships] = useState('')
  const [projects, setProjects] = useState('')
  const [otherWork, setOtherWork] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const stage = useStageRotation(RUNNING_STAGES, loading)

  const filledRequired = [degree, gradDate, targetRole].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 3

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    setResult('')

    try {
      const response = await fetch('/api/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: 'new-grad-resume',
          inputs: {
            degree,
            gradDate,
            targetRole,
            ...(school.trim() && { school }),
            ...(gpa.trim() && { gpa }),
            ...(internships.trim() && { internships }),
            ...(projects.trim() && { projects }),
            ...(otherWork.trim() && { otherWork }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to build your resume')
      } else {
        setResult(data.result)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('[v0] Submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #ECECF2',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '15px',
    color: '#1A1A22',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '90px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Your New Grad Resume"
      toolDescription="What hiring managers actually want when you have no traditional experience. Section-by-section guidance plus real example bullets adapted to your background."
      category="candidate"
      isFree={true}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you’ll get back:"
          prompts={[
            'A section-by-section guide: Summary, Education, Experience, Skills, Projects',
            'Which sections to LEAD with (it’s not the same as someone with 10 years of experience)',
            'Real example bullets adapted to your degree, projects, and target role',
            'GPA verdict — when to include, when to skip',
            'What to leave OUT (the common new grad mistakes hiring managers spot in 2 seconds)',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={3} />

        <RequiredLabel label="1. Your degree + major" filled={!!degree.trim()} first />
        <input
          type="text"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="e.g. BA in Communications · BS in Computer Science · MBA"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="2. When did you (or will you) graduate?" filled={!!gradDate.trim()} />
        <input
          type="text"
          value={gradDate}
          onChange={(e) => setGradDate(e.target.value)}
          placeholder="e.g. May 2026 · expected December 2026 · December 2024"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="3. What role / industry are you targeting?"
          filled={!!targetRole.trim()}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Marketing Coordinator at a B2B SaaS · Entry-level data analyst at a healthcare company"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="School name" filled={!!school.trim()} required={false} />
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="e.g. University of Washington · Northeastern · Cornell"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel label="GPA" filled={!!gpa.trim()} required={false} />
        <input
          type="text"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          placeholder="e.g. 3.6 · skip if under 3.5 — we’ll tell you whether to include it"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="Internships you’ve done"
          filled={!!internships.trim()}
          required={false}
        />
        <textarea
          value={internships}
          onChange={(e) => setInternships(e.target.value)}
          placeholder="List internships and what you actually did. e.g. 'Marketing intern at Acme Co (Summer 2025) — wrote 12 LinkedIn posts that got 50K impressions, owned weekly newsletter.'"
          rows={4}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="Projects / coursework relevant to the target role"
          filled={!!projects.trim()}
          required={false}
        />
        <textarea
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
          placeholder="Personal projects, class projects, capstone, hackathons, club leadership. e.g. 'Senior capstone: built a sentiment-analysis dashboard for political ads using Python + Streamlit. Presented to faculty panel.'"
          rows={4}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <RequiredLabel
          label="Part-time or non-related work"
          filled={!!otherWork.trim()}
          required={false}
        />
        <textarea
          value={otherWork}
          onChange={(e) => setOtherWork(e.target.value)}
          placeholder="Retail, food service, tutoring, summer jobs. Don’t skip this — we’ll tell you which ones are worth including and what to emphasize."
          rows={3}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#ECECF2')}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !canSubmit}
          style={{
            width: '100%',
            marginTop: '24px',
            background: !canSubmit
              ? 'rgba(255,255,255,0.05)'
              : 'linear-gradient(135deg, #6C47FF, #FF4F6A)',
            border: !canSubmit ? '1px solid rgba(255,255,255,0.10)' : 'none',
            borderRadius: '10px',
            padding: '15px',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            color: !canSubmit ? '#6B6A82' : 'white',
            cursor: loading || !canSubmit ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? stage
            : !canSubmit
            ? `Fill ${3 - filledRequired} more required field${3 - filledRequired === 1 ? '' : 's'}`
            : result
            ? 'Rebuild it'
            : 'Build my resume'}
        </button>

        {error && (
          <div
            style={{
              background: '#1A1A22',
              border: '1px solid rgba(255,79,106,0.3)',
              borderRadius: '10px',
              padding: '16px 20px',
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              color: '#FF4F6A',
              marginTop: '12px',
            }}
          >
            {error}
          </div>
        )}
      </div>

      {result && (
        <div
          style={{
            marginTop: '40px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 40px',
          }}
        >
          <ToolResult result={result} cta={null} />
          <ProUpsellPanel
            recommend={['Through a Recruiter’s Eyes', 'Would a Recruiter Even Find You?']}
            heading="Now make sure your resume actually surfaces in recruiter searches."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
