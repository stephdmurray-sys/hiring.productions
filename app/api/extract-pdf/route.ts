import { NextRequest, NextResponse } from 'next/server'

// Force Node.js runtime — pdf-parse uses pdfjs-dist which needs Node APIs
// (Buffer, fs-equivalent streaming). Will not work on Edge.
export const runtime = 'nodejs'

// Returns the raw extracted text from a PDF upload — Claude does the
// structural parsing downstream, so we don't need to be clever here.
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

    // Reasonable cap — LinkedIn profile exports run 50-300 KB. Anything over
    // 5 MB is either a different document type or an abuse attempt.
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'PDF too large (max 5 MB)' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // pdf-parse v2 exposes a class, not a default function. Dynamic import so
    // Next's bundler treats it as a server-only dependency.
    const { PDFParse } = await import('pdf-parse')
    const parser = new PDFParse({ data: buffer })
    const parsed = await parser.getText()

    const text = (parsed.text || '').trim()
    if (!text || text.length < 100) {
      return NextResponse.json(
        {
          error:
            'Could not read enough text from this PDF. Make sure you saved your full LinkedIn profile (More → Save to PDF) and try again.',
        },
        { status: 422 },
      )
    }

    return NextResponse.json({ text, pageCount: parsed.total })
  } catch (error) {
    console.error('extract-pdf error:', error)
    return NextResponse.json(
      { error: 'Failed to read the PDF. Try re-exporting it from LinkedIn.' },
      { status: 500 },
    )
  }
}
