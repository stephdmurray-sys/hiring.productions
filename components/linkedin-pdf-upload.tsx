'use client'

import { useRef, useState } from 'react'
import { FileText, Upload, Download, MousePointerClick } from 'lucide-react'

/**
 * Reusable drag-and-drop LinkedIn-PDF upload component, used by every
 * tool that needs a parsed LinkedIn profile as input (recruiter-search-
 * rank, linkedin-rewrite, etc.). Centralizes the upload UI, file
 * validation, extraction call to /api/extract-pdf, error states, and
 * the visual "how to export your LinkedIn as PDF" guide so each tool
 * doesn't reinvent it.
 *
 * The export guide includes a mini-mockup of LinkedIn's button row and
 * the dropdown menu so visitors who've never exported a profile see
 * exactly what to click — text instructions alone tend to lose people
 * who don't already know where "Save to PDF" lives.
 */

interface LinkedInPdfUploadProps {
  /** Extracted PDF text. Empty string when nothing has been parsed yet. */
  value: string
  /** File name of the parsed PDF (display only). */
  fileName: string
  /** Called once the PDF is parsed; passes both extracted text and file name. */
  onParsed: (text: string, fileName: string) => void
  /** Optional: called when the user clears or replaces. */
  onClear?: () => void
}

export function LinkedInPdfUpload({
  value,
  fileName,
  onParsed,
  onClear,
}: LinkedInPdfUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError('')
    if (file.type !== 'application/pdf') {
      setError('That file isn’t a PDF. Export your LinkedIn profile as a PDF and try again.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('PDF is over 5 MB. That’s usually a sign the export included extra pages — try saving again.')
      return
    }
    void uploadPdf(file)
  }

  const uploadPdf = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Could not read this PDF.')
      } else {
        onParsed(data.text, file.name)
      }
    } catch {
      setError('Upload failed. Try again in a moment.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) handleFile(file)
        }}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${
            value
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
            : value
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
        {uploading ? (
          <div
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '14px',
              color: '#A78BFA',
            }}
          >
            Reading your profile…
          </div>
        ) : value && fileName ? (
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
                color: '#1A1A22',
                marginBottom: '6px',
              }}
            >
              {fileName}
            </div>
            <div
              style={{
                fontFamily: "'Figtree', sans-serif",
                fontSize: '12px',
                color: '#5EE6A8',
              }}
            >
              Parsed · {value.length.toLocaleString()} characters of profile text
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
            {onClear && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClear()
                }}
                style={{
                  marginTop: 10,
                  background: 'transparent',
                  border: 'none',
                  color: '#8B8AA0',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <ExportGuide onClickStopProp={(e) => e.stopPropagation()} />
        )}
      </div>
      {error && (
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
          {error}
        </div>
      )}
    </>
  )
}

/**
 * Inline 4-step visual guide shown when no PDF has been parsed yet.
 * Steps 2 and 3 include mini-mockups of LinkedIn's actual UI — the
 * button row with the ⋯ menu and the dropdown showing "Save to PDF" —
 * so users who've never exported a profile see what they're looking
 * for, not just instructions for finding it.
 */
function ExportGuide({
  onClickStopProp,
}: {
  onClickStopProp: (e: React.MouseEvent) => void
}) {
  return (
    <div>
      <Upload size={28} color="#A78BFA" strokeWidth={1.8} style={{ marginBottom: 10 }} />
      <div
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: '15px',
          color: '#1A1A22',
          marginBottom: '14px',
        }}
      >
        Drop your LinkedIn PDF here, or click to upload
      </div>
      <div
        onClick={onClickStopProp}
        style={{
          textAlign: 'left',
          maxWidth: '460px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid #ECECF2',
          borderRadius: 10,
          padding: '16px 18px',
          cursor: 'default',
        }}
      >
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            color: '#A78BFA',
            fontSize: '10.5px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          How to export your profile · 10 seconds
        </div>

        <Step
          n={1}
          body={
            <>
              Open{' '}
              <a
                href="https://www.linkedin.com/in/me"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A78BFA', textDecoration: 'underline' }}
              >
                your LinkedIn profile
              </a>{' '}
              in a new tab.
            </>
          }
        />

        <Step
          n={2}
          body={
            <>
              Find this row of buttons under your name and click the <strong>⋯</strong> menu.
            </>
          }
          visual={<LinkedInButtonRowMock />}
        />

        <Step
          n={3}
          body={<>Pick <strong>Save to PDF</strong> from the dropdown.</>}
          visual={<LinkedInDropdownMock />}
        />

        <Step n={4} body={<>Drag the file here, or click to choose it.</>} last />
      </div>
    </div>
  )
}

function Step({
  n,
  body,
  visual,
  last,
}: {
  n: number
  body: React.ReactNode
  visual?: React.ReactNode
  last?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: last ? 0 : 14 }}>
      <div
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: 'rgba(108,71,255,0.18)',
          color: '#A78BFA',
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 800,
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '13.5px',
            color: '#1A1A22',
            lineHeight: 1.55,
          }}
        >
          {body}
        </div>
        {visual && <div style={{ marginTop: 10 }}>{visual}</div>}
      </div>
    </div>
  )
}

/**
 * Mini-mockup of the LinkedIn button row under a profile name. The
 * actual LinkedIn UI shows "Open to | Add section | Enhance profile | ⋯".
 * We highlight the ⋯ with a coral ring + caption so the user's eye
 * lands on the exact target before they switch tabs to LinkedIn.
 */
function LinkedInButtonRowMock() {
  const pill: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: 100,
    fontFamily: "'Figtree', sans-serif",
    fontWeight: 700,
    fontSize: '11.5px',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#5A5A6E',
    background: '#FAFAFA',
    whiteSpace: 'nowrap',
  }
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 8,
        padding: '14px 12px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <div
          style={{
            padding: '6px 14px',
            borderRadius: 100,
            background: '#0A66C2',
            color: 'white',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 700,
            fontSize: '11.5px',
          }}
        >
          Open to
        </div>
        <div style={{ ...pill, color: '#0A66C2', borderColor: '#0A66C2' }}>Add section</div>
        <div style={{ ...pill, color: '#0A66C2', borderColor: '#0A66C2' }}>Enhance profile</div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '2px solid #FF4F6A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1F2937',
            fontWeight: 800,
            fontSize: '14px',
            fontFamily: "'Figtree', sans-serif",
            background: 'white',
            boxShadow: '0 0 0 4px rgba(255,79,106,0.18)',
            position: 'relative',
          }}
        >
          ⋯
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            color: '#FF4F6A',
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '0.02em',
          }}
        >
          <MousePointerClick size={12} strokeWidth={2.5} />
          Click here
        </div>
      </div>
    </div>
  )
}

/**
 * Mini-mockup of the dropdown menu that appears after clicking the ⋯ —
 * highlights the "Save to PDF" row so the user knows exactly which
 * item to pick.
 */
function LinkedInDropdownMock() {
  const row: React.CSSProperties = {
    padding: '8px 12px',
    fontFamily: "'Figtree', sans-serif",
    fontSize: '12.5px',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  }
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 8,
        padding: '6px 0',
        maxWidth: 240,
        boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
      }}
    >
      <div style={row}>Send profile in a message</div>
      <div
        style={{
          ...row,
          background: 'rgba(255,79,106,0.12)',
          borderLeft: '3px solid #FF4F6A',
          color: '#111827',
          fontWeight: 800,
        }}
      >
        <Download size={14} strokeWidth={2.5} />
        Save to PDF
        <span
          style={{
            marginLeft: 'auto',
            color: '#FF4F6A',
            fontSize: '10.5px',
            fontWeight: 800,
            letterSpacing: '0.04em',
          }}
        >
          PICK THIS
        </span>
      </div>
      <div style={row}>Saved items</div>
      <div style={row}>Activity</div>
    </div>
  )
}
