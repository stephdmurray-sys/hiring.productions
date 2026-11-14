import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage, type RGB } from 'pdf-lib'
import ExcelJS from 'exceljs'
import { scorecardData as data, scorecardTitle, scorecardUrl, type Competency } from '@/lib/scorecard'

/**
 * The scorecard as files, for the email: a PDF to print (one per
 * interviewer, per candidate) and an Excel workbook to score up to five
 * candidates side by side, with averages that fill in as ratings go in.
 * Both are built from scorecard.json, the same content as the page.
 */

const INK = rgb(0x1a / 255, 0x1a / 255, 0x22 / 255)
const INK_2 = rgb(0x4a / 255, 0x4a / 255, 0x5a / 255)
const INK_3 = rgb(0x62 / 255, 0x62 / 255, 0x7a / 255)
const RULE = rgb(0xd3 / 255, 0xcd / 255, 0xbf / 255)
const CORAL_TEXT = rgb(0xc4 / 255, 0x2e / 255, 0x48 / 255)
const TINT = rgb(0xff / 255, 0xf3 / 255, 0xf5 / 255)

const W = 612 // US Letter, points
const H = 792
const M = 48 // margin
const CW = W - M * 2

/** Keep only characters the standard PDF font can draw; swap the rest for close ASCII. */
function safe(font: PDFFont, s: string): string {
  const ok = new Set(font.getCharacterSet())
  const swap: Record<string, string> = { '‘': "'", '’': "'", '“': '"', '”': '"', '–': '-', '—': '-', '…': '...', ' ': ' ' }
  let out = ''
  for (const ch of s) {
    const cp = ch.codePointAt(0)!
    if (ok.has(cp)) out += ch
    else if (swap[ch] && [...swap[ch]].every((c) => ok.has(c.codePointAt(0)!))) out += swap[ch]
    else out += ch.normalize('NFKD').replace(/[^\x20-\x7e]/g, '')
  }
  return out
}

function wrap(font: PDFFont, text: string, size: number, width: number): string[] {
  const words = safe(font, text).split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const tryLine = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(tryLine, size) <= width) {
      line = tryLine
      continue
    }
    if (line) lines.push(line)
    // A single word wider than the column is split by characters.
    let w = word
    while (font.widthOfTextAtSize(w, size) > width) {
      let i = w.length
      while (i > 1 && font.widthOfTextAtSize(w.slice(0, i), size) > width) i--
      lines.push(w.slice(0, i))
      w = w.slice(i)
    }
    line = w
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

class Writer {
  doc: PDFDocument
  regular: PDFFont
  bold: PDFFont
  page!: PDFPage
  y = 0
  pages: PDFPage[] = []
  constructor(doc: PDFDocument, regular: PDFFont, bold: PDFFont) {
    this.doc = doc
    this.regular = regular
    this.bold = bold
    this.newPage()
  }
  newPage() {
    this.page = this.doc.addPage([W, H])
    this.pages.push(this.page)
    this.y = H - M
  }
  ensure(h: number) {
    if (this.y - h < M + 24) this.newPage()
  }
  text(s: string, o: { size?: number; bold?: boolean; color?: RGB; x?: number; width?: number; gap?: number } = {}) {
    const size = o.size ?? 10
    const font = o.bold ? this.bold : this.regular
    const lh = size * 1.32
    const lines = wrap(font, s, size, o.width ?? CW)
    for (const l of lines) {
      this.ensure(lh)
      this.page.drawText(l, { x: o.x ?? M, y: this.y - size, size, font, color: o.color ?? INK })
      this.y -= lh
    }
    this.y -= o.gap ?? 0
  }
  height(s: string, size: number, width: number, bold = false) {
    return wrap(bold ? this.bold : this.regular, s, size, width).length * size * 1.32
  }
  rule(color = RULE, thickness = 0.75) {
    this.page.drawLine({ start: { x: M, y: this.y }, end: { x: W - M, y: this.y }, thickness, color })
  }
}

function competencyHeight(w: Writer, c: Competency, n: number): number {
  const colW = (CW - 4 * 6) / 5
  const scaleH = Math.max(...[c.low, c.average, c.outstanding].map((t) => w.height(t, 7.5, colW - 10))) + 26
  return (
    w.height(`${n}. ${c.name}`, 14, CW, true) +
    w.height(c.definition, 7.5, CW) +
    w.height(`Ask: ${c.question}`, 10.5, CW, true) +
    data.method.probes.length * 12 +
    scaleH +
    96
  )
}

export async function scorecardPdf(role: string, chosen: Competency[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  doc.setTitle(scorecardTitle(role))
  doc.setAuthor('hiring.productions')
  doc.setSubject("Structured interview scorecard, built on the US Office of Personnel Management's method")
  doc.setCreator('hiring.productions')
  const w = new Writer(doc, await doc.embedFont(StandardFonts.Helvetica), await doc.embedFont(StandardFonts.HelveticaBold))
  const m = data.method

  // Title block
  w.text('hiring.productions', { size: 9, bold: true, color: CORAL_TEXT, gap: 4 })
  w.text(scorecardTitle(role), { size: 20, bold: true, gap: 2 })
  w.text("Built on the US Office of Personnel Management's structured interview method.", { size: 9, color: INK_3, gap: 14 })

  // Candidate, interviewer, date
  const third = (CW - 24) / 3
  ;['Candidate', 'Interviewer', 'Date'].forEach((label, i) => {
    const x = M + i * (third + 12)
    w.page.drawText(label, { x, y: w.y - 8, size: 8, font: w.bold, color: INK_3 })
    w.page.drawLine({ start: { x, y: w.y - 30 }, end: { x: x + third, y: w.y - 30 }, thickness: 0.75, color: RULE })
  })
  w.y -= 42
  w.rule(INK, 1.5)
  w.y -= 10
  for (const s of m.standard) w.text(`-  ${s}`, { size: 9, color: INK_2, gap: 1 })
  w.y -= 8

  // One block per skill, kept on one page
  chosen.forEach((c, i) => {
    w.ensure(competencyHeight(w, c, i + 1))
    w.rule()
    w.y -= 12
    w.text(`${i + 1}. ${c.name}`, { size: 14, bold: true, gap: 2 })
    w.text(c.definition, { size: 7.5, color: INK_3, gap: 6 })
    const askLines = wrap(w.bold, `Ask: ${c.question}`, 10.5, CW)
    askLines.forEach((l, k) => {
      if (k === 0) {
        w.page.drawText('Ask:', { x: M, y: w.y - 10.5, size: 10.5, font: w.bold, color: CORAL_TEXT })
        w.page.drawText(safe(w.bold, l.slice(4)), { x: M + w.bold.widthOfTextAtSize('Ask:', 10.5), y: w.y - 10.5, size: 10.5, font: w.bold, color: INK })
      } else {
        w.page.drawText(l, { x: M, y: w.y - 10.5, size: 10.5, font: w.bold, color: INK })
      }
      w.y -= 10.5 * 1.32
    })
    w.y -= 4
    for (const p of m.probes) w.text(`${p.kind} probes: ${p.items.join(' ')}`, { size: 8.5, color: INK_2, gap: 1 })
    w.y -= 6

    // The 1 to 5 scale, benchmarks at 1, 3 and 5
    const colW = (CW - 4 * 6) / 5
    const cells: [string, string][] = [
      ['1  Low', c.low],
      ['2', ''],
      ['3  Average', c.average],
      ['4', ''],
      ['5  Outstanding', c.outstanding],
    ]
    const boxH = Math.max(...cells.map(([, t]) => (t ? w.height(t, 7.5, colW - 10) : 0))) + 26
    cells.forEach(([head, body], k) => {
      const x = M + k * (colW + 6)
      w.page.drawRectangle({ x, y: w.y - boxH, width: colW, height: boxH, borderColor: RULE, borderWidth: 0.75, color: k % 2 === 0 ? TINT : undefined })
      w.page.drawText(head, { x: x + 5, y: w.y - 13, size: 8.5, font: w.bold, color: INK })
      wrap(w.regular, body, 7.5, colW - 10).forEach((l, j) => {
        w.page.drawText(l, { x: x + 5, y: w.y - 25 - j * 7.5 * 1.32, size: 7.5, font: w.regular, color: INK_2 })
      })
    })
    w.y -= boxH + 10

    // Notes and the rating
    const notesW = CW - 5 * 24 - 24
    w.page.drawText('Notes on the answer', { x: M, y: w.y - 8, size: 8, font: w.bold, color: INK_3 })
    w.page.drawRectangle({ x: M, y: w.y - 64, width: notesW, height: 52, borderColor: RULE, borderWidth: 0.75 })
    const rx = M + notesW + 24
    w.page.drawText('Rating', { x: rx, y: w.y - 8, size: 8, font: w.bold, color: INK_3 })
    for (let k = 0; k < 5; k++) {
      const bx = rx + k * 24
      w.page.drawRectangle({ x: bx, y: w.y - 38, width: 20, height: 20, borderColor: RULE, borderWidth: 1 })
      w.page.drawText(String(k + 1), { x: bx + 7.5, y: w.y - 32, size: 9, font: w.bold, color: INK_3 })
    }
    w.y -= 76
  })

  // How to rate, and the errors to avoid
  w.ensure(200)
  w.rule(INK, 1.5)
  w.y -= 14
  w.text('Before anyone discusses a candidate', { size: 12, bold: true, gap: 4 })
  for (const r of m.rating) w.text(`-  ${r}`, { size: 9, color: INK_2, gap: 1 })
  w.y -= 8
  w.text('Rating errors to avoid', { size: 12, bold: true, gap: 4 })
  for (const a of m.avoid) w.text(`-  ${a.name}: ${a.what}`, { size: 9, color: INK_2, gap: 1 })
  w.y -= 10
  w.text(
    `Definitions: ${data.sources.competencies.name}. Method, probes and rating errors: ${data.sources.guide.name}. The benchmarks follow the pattern of OPM's worked example; have the people who know the job review them before the first interview.`,
    { size: 7.5, color: INK_3 },
  )

  // Footer on every page
  const link = scorecardUrl(role, chosen).replace(/^https:\/\//, '')
  w.pages.forEach((p, i) => {
    const foot = safe(w.regular, `${link}   ·   page ${i + 1} of ${w.pages.length}`)
    p.drawLine({ start: { x: M, y: M - 6 }, end: { x: W - M, y: M - 6 }, thickness: 0.5, color: RULE })
    p.drawText(foot.length > 120 ? `hiring.productions/interview-scorecard   ·   page ${i + 1} of ${w.pages.length}` : foot, {
      x: M,
      y: M - 20,
      size: 7.5,
      font: w.regular,
      color: INK_3,
    })
  })
  return doc.save()
}

const CANDIDATES = 5

export async function scorecardXlsx(role: string, chosen: Competency[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'hiring.productions'
  wb.title = scorecardTitle(role)
  const m = data.method
  const coral = 'FFFF4F6A'
  const tint = 'FFFFF3F5'
  const ink3 = 'FF62627A'

  // Sheet 1: score up to five candidates side by side
  const ws = wb.addWorksheet('Scorecard', {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 4 }],
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  })
  ws.columns = [
    { width: 24 },
    { width: 52 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    ...Array.from({ length: CANDIDATES }, () => ({ width: 15 })),
  ]
  ws.getCell('A1').value = scorecardTitle(role)
  ws.getCell('A1').font = { bold: true, size: 16 }
  ws.getCell('A2').value =
    'Ask every candidate the same question, in the same order. Rate each answer 1 to 5 against the benchmarks before anyone discusses it. Type candidate names over "Candidate 1" and so on.'
  ws.getCell('A2').font = { size: 10, color: { argb: ink3 } }
  ws.mergeCells(1, 1, 1, 5 + CANDIDATES)
  ws.mergeCells(2, 1, 2, 5 + CANDIDATES)
  ws.getRow(2).height = 30
  ws.getCell('A2').alignment = { wrapText: true, vertical: 'top' }

  const head = ws.getRow(4)
  head.values = ['Skill', 'Ask every candidate', '1  Low', '3  Average', '5  Outstanding', ...Array.from({ length: CANDIDATES }, (_, i) => `Candidate ${i + 1}`)]
  head.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  head.alignment = { vertical: 'middle', wrapText: true }
  head.height = 22
  head.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1A22' } }
  })

  const first = 5
  chosen.forEach((c, i) => {
    const r = ws.getRow(first + i)
    r.values = [c.name, c.question, c.low, c.average, c.outstanding]
    r.alignment = { wrapText: true, vertical: 'top' }
    r.getCell(1).font = { bold: true }
    r.height = 96
    for (let k = 0; k < CANDIDATES; k++) {
      const cell = r.getCell(6 + k)
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: tint } }
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
      cell.font = { bold: true, size: 14 }
      cell.dataValidation = {
        type: 'whole',
        operator: 'between',
        allowBlank: true,
        formulae: [1, 5],
        showErrorMessage: true,
        errorTitle: 'Rate 1 to 5',
        error: 'Enter a whole number from 1 to 5.',
      }
    }
  })
  const last = first + chosen.length - 1
  const avg = ws.getRow(last + 1)
  avg.getCell(1).value = 'Average'
  avg.getCell(2).value = 'Fills in as you rate. Blank until a candidate has a rating.'
  avg.getCell(1).font = { bold: true }
  avg.getCell(2).font = { size: 10, color: { argb: ink3 } }
  for (let k = 0; k < CANDIDATES; k++) {
    const col = ws.getColumn(6 + k).letter
    const cell = avg.getCell(6 + k)
    cell.value = { formula: `IF(COUNT(${col}${first}:${col}${last})=0,"",ROUND(AVERAGE(${col}${first}:${col}${last}),2))` }
    cell.font = { bold: true, size: 14, color: { argb: coral } }
    cell.alignment = { horizontal: 'center' }
    cell.border = { top: { style: 'medium' } }
  }
  avg.getCell(1).border = { top: { style: 'medium' } }
  avg.getCell(2).border = { top: { style: 'medium' } }
  const notes = ws.getRow(last + 2)
  notes.getCell(1).value = 'Notes'
  notes.getCell(1).font = { bold: true }
  notes.height = 60
  for (let k = 0; k < CANDIDATES; k++) notes.getCell(6 + k).alignment = { wrapText: true, vertical: 'top' }
  ws.getCell(`A${last + 4}`).value = 'Built on the US Office of Personnel Management’s structured interview method. Full link:'
  ws.getCell(`A${last + 4}`).font = { size: 9, color: { argb: ink3 } }
  const url = scorecardUrl(role, chosen)
  ws.getCell(`A${last + 5}`).value = { text: url, hyperlink: url }
  ws.getCell(`A${last + 5}`).font = { size: 9, color: { argb: 'FF5432E0' }, underline: true }

  // Sheet 2: how to run it
  const how = wb.addWorksheet('How to run it')
  how.columns = [{ width: 30 }, { width: 100 }]
  const add = (a: string, b = '', bold = false) => {
    const r = how.addRow([a, b])
    r.alignment = { wrapText: true, vertical: 'top' }
    if (bold) r.font = { bold: true, size: 12 }
  }
  add('How to run a structured interview', '', true)
  m.standard.forEach((s) => add('', s))
  add('')
  add('Probes (the same ones for every candidate)', '', true)
  m.probes.forEach((p) => add(p.kind, p.items.join(' ')))
  m.probeRules.forEach((s) => add('', s))
  add('')
  add('Before anyone discusses a candidate', '', true)
  m.rating.forEach((s) => add('', s))
  add('')
  add('Rating errors to avoid', '', true)
  m.avoid.forEach((a) => add(a.name, a.what))
  add('')
  add('Sources', '', true)
  for (const s of [data.sources.competencies, data.sources.guide, data.sources.example]) {
    const r = how.addRow([s.name, { text: s.url, hyperlink: s.url }])
    r.alignment = { wrapText: true, vertical: 'top' }
  }

  // Sheet 3: OPM's definitions, verbatim
  const defs = wb.addWorksheet('Definitions')
  defs.columns = [{ width: 26 }, { width: 110 }]
  defs.addRow(['Skill', "OPM's definition"]).font = { bold: true }
  chosen.forEach((c) => {
    const r = defs.addRow([c.name, c.definition])
    r.alignment = { wrapText: true, vertical: 'top' }
  })

  return Buffer.from(await wb.xlsx.writeBuffer())
}
