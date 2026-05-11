import { NextRequest, NextResponse } from 'next/server'

// pdf-parse is a CommonJS module; dynamic import keeps Next's bundler happy.
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

    const pdfParse = (await import('pdf-parse')).default
    const parsed = await pdfParse(buffer)

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

    return NextResponse.json({ text, pageCount: parsed.numpages })
  } catch (error) {
    console.error('extract-pdf error:', error)
    return NextResponse.json(
      { error: 'Failed to read the PDF. Try re-exporting it from LinkedIn.' },
      { status: 500 },
    )
  }
}
