/**
 * Counts what Stephanie asked to measure (Nov 14, 2026): picker starts and
 * finishes, picker feedback (yes, partly, no), visits to each RepVera
 * answer and clicks on "See a real RepVera profile". Vendor form
 * submissions are logged where they happen, in /api/vendor-submittal.
 *
 * Only these event names and short, known fields are accepted. Nothing
 * here identifies a person: no email, no IP, no cookie.
 */
import { NextRequest, NextResponse } from 'next/server'
import { logEvent, type EventType } from '@/lib/event-log'

const EVENTS = new Set<EventType>(['picker_start', 'picker_finish', 'picker_feedback', 'repvera_answer_view', 'repvera_profile_click', 'picker_suggest'])
const SIDES = new Set(['seekers', 'hiring'])
const ANSWERS = new Set(['yes', 'partly', 'no'])

const clean = (v: unknown, max = 60) => (typeof v === 'string' ? v.replace(/[^a-z0-9-]/gi, '').slice(0, max) : undefined)

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  const event = body.event as EventType
  if (!EVENTS.has(event)) return NextResponse.json({ ok: false }, { status: 400 })
  const meta: Record<string, string> = {}
  const side = clean(body.side)
  if (side && SIDES.has(side)) meta.side = side
  const problem = clean(body.problem)
  if (problem) meta.problem = problem
  const step = clean(body.step, 10)
  if (step) meta.step = step
  if (event === 'picker_suggest') {
    // The visitor's own words: plain text only, short, with anything that looks like an email or a link removed.
    const raw = typeof body.text === 'string' ? body.text : ''
    const text = raw
      .replace(/\S+@\S+/g, '')
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/[<>{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 200)
    if (text.length < 3) return NextResponse.json({ ok: false }, { status: 400 })
    meta.text = text
  }
  if (event === 'picker_feedback') {
    const answer = clean(body.answer, 10)
    if (!answer || !ANSWERS.has(answer)) return NextResponse.json({ ok: false }, { status: 400 })
    meta.answer = answer
  }
  await logEvent(event, { source: 'picker', meta })
  return NextResponse.json({ ok: true })
}
