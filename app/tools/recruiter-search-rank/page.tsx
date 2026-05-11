'use client'

import { useState, useRef } from 'react'
import { ToolPageShell } from '@/components/tool-page-shell'
import { ToolResult } from '@/components/tool-result'
import { InputPromptCard } from '@/components/input-prompt-card'
import { ProUpsellPanel } from '@/components/pro-upsell-panel'
import { RequiredLabel, RequiredFormHeader } from '@/components/required-label'
import { FileText, Upload } from 'lucide-react'

export default function RecruiterSearchRankPage() {
  const [profileText, setProfileText] = useState('')
  const [pdfFileName, setPdfFileName] = useState('')
  const [pdfUploading, setPdfUploading] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [targetGeo, setTargetGeo] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filledRequired = [profileText, targetRole].filter((v) => v.trim()).length
  const canSubmit = filledRequired === 2

  const uploadPdf = async (file: File) => {
    setPdfError('')
    setPdfUploading(true)
    setProfileText('')
    setPdfFileName('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setPdfError(data.error || 'Could not read this PDF.')
      } else {
        setProfileText(data.text)
        setPdfFileName(file.name)
      }
    } catch {
      setPdfError('Upload failed. Try again in a moment.')
    } finally {
      setPdfUploading(false)
    }
  }

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      setPdfError('That file isn’t a PDF. Export your LinkedIn profile as a PDF and try again.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPdfError('PDF is over 5 MB. That’s usually a sign the export included extra pages — try saving again.')
      return
    }
    uploadPdf(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async () => {
    if (!canSubmit) {
      setError('Upload your LinkedIn PDF and enter a target role.')
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
          toolId: 'recruiter-search-rank',
          inputs: {
            profileText,
            targetRole,
            ...(targetGeo.trim() && { targetGeo }),
            ...(jobDescription.trim() && { jobDescription }),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Failed to run the visibility check')
      } else {
        setResult(data.result)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    padding: '14px 18px',
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 400,
    fontSize: '15px',
    color: '#F2F0FF',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
    lineHeight: 1.5,
  }

  return (
    <ToolPageShell
      toolName="Where Do You Rank in a Recruiter Search?"
      toolDescription="Drop your LinkedIn profile PDF. See the 5 boolean searches a recruiter for your target role would actually run — and your estimated rank in each."
      category="candidate"
      isFree={false}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
        <InputPromptCard
          title="What you’ll get back:"
          prompts={[
            'The 5 boolean searches a recruiter for your target role would actually run',
            'Your estimated rank in each — calibrated to how LinkedIn’s algorithm weights signals',
            'The 3 highest-leverage moves to climb, ranked by total impact across every search',
            'Exact text replacements — current line vs. recommended rewrite',
          ]}
        />

        <RequiredFormHeader filledCount={filledRequired} totalRequired={2} />

        {/* PDF UPLOAD */}
        <RequiredLabel
          label="1. Your LinkedIn profile (export to PDF, drop below)"
          filled={!!profileText.trim()}
          first
        />
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${
              profileText
                ? '#5EE6A8'
                : isDragging
                ? '#6C47FF'
                : 'rgba(255,255,255,0.18)'
            }`,
            borderRadius: '12px',
            padding: '32px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragging
              ? 'rgba(108,71,255,0.06)'
              : profileText
              ? 'rgba(94,230,168,0.06)'
              : 'rgba(255,255,255,0.02)',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
          {pdfUploading ? (
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '14px',
                color: '#A78BFA',
              }}
            >
              Reading your profile…
            </div>
          ) : profileText && pdfFileName ? (
            <div>
              <FileText
                size={28}
                color="#5EE6A8"
                strokeWidth={1.8}
                style={{ marginBottom: '10px' }}
              />
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#F2F0FF',
                  marginBottom: '6px',
                }}
              >
                {pdfFileName}
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12px',
                  color: '#5EE6A8',
                }}
              >
                Parsed · {profileText.length.toLocaleString()} characters of profile text
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12px',
                  color: '#8B8AA0',
                  marginTop: '10px',
                }}
              >
                Click to replace
              </div>
            </div>
          ) : (
            <div>
              <Upload
                size={28}
                color="#A78BFA"
                strokeWidth={1.8}
                style={{ marginBottom: '10px' }}
              />
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#F2F0FF',
                  marginBottom: '14px',
                }}
              >
                Drop your LinkedIn PDF here, or click to upload
              </div>
              <div
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '12.5px',
                  color: '#9D9CB3',
                  lineHeight: 1.7,
                  textAlign: 'left',
                  maxWidth: '440px',
                  margin: '0 auto',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ fontWeight: 700, color: '#C9C7DA', marginBottom: '6px', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  How to export your profile (10 seconds)
                </div>
                <div>
                  <strong style={{ color: '#F2F0FF' }}>1.</strong> Open{' '}
                  <a
                    href="https://www.linkedin.com/in/me"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#A78BFA', textDecoration: 'underline' }}
                  >
                    your LinkedIn profile
                  </a>{' '}
                  in a new tab.
                </div>
                <div>
                  <strong style={{ color: '#F2F0FF' }}>2.</strong> Click the{' '}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.4)',
                      fontSize: '11px',
                      fontWeight: 800,
                      verticalAlign: 'middle',
                      margin: '0 2px',
                      color: '#F2F0FF',
                      letterSpacing: '1px',
                    }}
                  >
                    ⋯
                  </span>{' '}
                  button (next to <em>Open to</em> / <em>Add section</em>).
                </div>
                <div>
                  <strong style={{ color: '#F2F0FF' }}>3.</strong> Pick{' '}
                  <strong style={{ color: '#F2F0FF' }}>Save to PDF</strong>. It
                  downloads to your computer automatically.
                </div>
                <div>
                  <strong style={{ color: '#F2F0FF' }}>4.</strong> Drag the file
                  here, or click to choose it.
                </div>
              </div>
            </div>
          )}
        </div>
        {pdfError && (
          <div
            style={{
              marginTop: '8px',
              padding: '10px 14px',
              background: 'rgba(255,79,106,0.08)',
              border: '1px solid rgba(255,79,106,0.25)',
              borderRadius: 8,
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: '#FF8FA3',
              lineHeight: 1.5,
            }}
          >
            {pdfError}
          </div>
        )}

        {/* TARGET ROLE */}
        <RequiredLabel
          label="2. The role you want recruiters to find you for"
          filled={!!targetRole.trim()}
        />
        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Senior Product Manager at a B2B SaaS · Director of TA at a healthcare company · Senior UX Designer"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        {/* TARGET GEO — OPTIONAL */}
        <RequiredLabel
          label="Your target geography"
          filled={!!targetGeo.trim()}
          required={false}
        />
        <input
          type="text"
          value={targetGeo}
          onChange={(e) => setTargetGeo(e.target.value)}
          placeholder="Optional. e.g. New York metro · San Francisco Bay Area · Remote US"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        />

        {/* JOB DESCRIPTION — OPTIONAL */}
        <RequiredLabel
          label="A specific job description you’re targeting"
          filled={!!jobDescription.trim()}
          required={false}
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Optional but useful. Paste a real JD and we’ll reverse-engineer one query directly from its must-have keywords."
          rows={4}
          style={textareaStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#6C47FF')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
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
            ? 'Running the searches a recruiter would run…'
            : !canSubmit
            ? `Fill ${2 - filledRequired} more required field${
                2 - filledRequired === 1 ? '' : 's'
              }`
            : result
            ? 'Run again with updated inputs'
            : 'Show me where I rank'}
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
            recommend={['Your LinkedIn — Rewritten', 'Through a Recruiter’s Eyes']}
            heading="Now ship the moves. Rewrite your headline, About, and recent roles to climb every search at once."
          />
        </div>
      )}
    </ToolPageShell>
  )
}
