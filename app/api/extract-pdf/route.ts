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
      return NextResponse.json(
        {
          error:
            'Could not read enough text from this PDF. Make sure you saved your full LinkedIn profile (More → Save to PDF) and try again.',
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
