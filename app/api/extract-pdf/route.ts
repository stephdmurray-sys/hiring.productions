import { NextRequest, NextResponse } from 'next/server'

// Force Node.js runtime — unpdf works on Edge too but we don't need it and
// the Node runtime gives us the full Buffer API.
export const runtime = 'nodejs'

// Returns the raw extracted text from a PDF upload — Claude does the
// structural parsing downstream, so we don't need to be clever here.
// Uses unpdf (a serverless-optimized pdfjs wrapper) instead of pdf-parse
// because pdf-parse depends on the pdfjs worker file, which Vercel can't
// reliably bundle.
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    // 'linkedin' (default — strict LinkedIn-export check) or 'resume'
    // (any PDF with enough text). Resume mode is for tools that accept
    // a generic resume rather than a LinkedIn profile export.
    const kind = (formData.get('kind') ?? 'linkedin').toString()

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'PDF too large (max 5 MB)' }, { status: 400 })
    }

    const buffer = new Uint8Array(await file.arrayBuffer())

    const { extractText } = await import('unpdf')
    const { text, totalPages } = await extractText(buffer, { mergePages: true })

    const fullText = (typeof text === 'string' ? text : text.join('\n\n')).trim()
    if (!fullText || fullText.length < 100) {
      const reExportTip =
        kind === 'resume'
          ? 'Try re-saving your resume as a standard PDF and uploading again.'
          : 'Make sure you saved your full LinkedIn profile (More → Save to PDF) and try again.'
      return NextResponse.json(
        { error: `Could not read enough text from this PDF. ${reExportTip}` },
        { status: 422 },
      )
    }

    // The LinkedIn-export sanity check only applies to LinkedIn-mode
    // uploads. Resume-mode uploads are any PDF with enough text — a
    // generic resume has no LinkedIn structural markers and would
    // always fail the heuristic.
    if (kind === 'linkedin' && !looksLikeLinkedInExport(fullText)) {
      return NextResponse.json(
        {
          error:
            "This doesn't look like a LinkedIn profile export. The simulator needs the PDF from your LinkedIn profile (open linkedin.com/in/me, click More → Save to PDF) — not a resume or other document.",
        },
        { status: 422 },
      )
    }

    return NextResponse.json({ text: fullText, pageCount: totalPages })
  } catch (error) {
    console.error('extract-pdf error:', error)
    return NextResponse.json(
      { error: 'Failed to read the PDF. Try re-exporting it from LinkedIn.' },
      { status: 500 },
    )
  }
}

/**
 * Heuristic detection that the uploaded PDF is a LinkedIn profile
 * export rather than a resume or other document. LinkedIn PDFs have
 * several reliable structural markers; we require two of them to call
 * it a match. Two-of-N rather than any-one prevents a resume that
 * happens to include a LinkedIn URL in its contact line from sneaking
 * through.
 */
function looksLikeLinkedInExport(text: string): boolean {
  const lowered = text.toLowerCase()
  let signals = 0

  // Profile URL — LinkedIn always includes this near the top.
  if (/linkedin\.com\/in\//.test(lowered)) signals++

  // Pagination footer LinkedIn embeds on every page ("Page 1 of 7").
  if (/\bpage\s+\d+\s+of\s+\d+\b/.test(lowered)) signals++

  // "Top Skills" is a LinkedIn-only section header — resumes call it Skills.
  if (/\btop\s+skills\b/.test(lowered)) signals++

  // Coexistence of multiple LinkedIn section headers in a single doc.
  // Resumes rarely have all four spelled out as section headers.
  let sectionHeaders = 0
  if (/^\s*experience\s*$/im.test(text)) sectionHeaders++
  if (/^\s*education\s*$/im.test(text)) sectionHeaders++
  if (/^\s*skills\s*$/im.test(text)) sectionHeaders++
  if (/^\s*languages\s*$/im.test(text)) sectionHeaders++
  if (/^\s*certifications\s*$/im.test(text)) sectionHeaders++
  if (sectionHeaders >= 3) signals++

  return signals >= 2
}
