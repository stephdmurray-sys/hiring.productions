/**
 * The stack builder's arithmetic, shared by the page (in the browser) and the
 * welcome email (on the server). No data imports here: the lanes come from
 * lib/stack.ts, which reads the evidence files on the server.
 */
import type { StackLane, StackTool } from './stack'

export interface StackState {
  /** The tools in each part of the stack, by part id. One-tool parts hold at most one. */
  picks: Record<string, string[]>
  paid: string[]
  months: number
  seats: number
  employees: number
  /** Hiring: hires a year, for tools per hire. */
  hires: number
}

export type Line = {
  tool: StackTool
  slots: string[]
  /** What it costs for the window (months for job seekers, a year for hiring), in its own currency; null when no price is on file. */
  cost: number | null
  currency: string
  forget: number | null
  how: string
  onFree: boolean
  /** Paid resume tools: the day the payment runs out and it renews, counted from sign-up; null if paid once. */
  renewsAfter?: number | null
}

export const fmt = (n: number, cur = 'USD') => {
  const sym = cur === 'EUR' ? '€' : '$'
  return `${sym}${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`
}

export const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`

export const round2 = (n: number) => Math.round(n * 100) / 100

/** "Monthly + Monthly + Monthly" reads as "Monthly, 3 times". */
export function stepsText(steps: string[]): string {
  const counts = new Map<string, number>()
  for (const st of steps) counts.set(st, (counts.get(st) ?? 0) + 1)
  return [...counts].map(([label, n]) => (n > 1 ? `${label}, ${n} times` : label)).join(' + ')
}

export function atsCost(t: StackTool, s: StackState, paid: boolean): { cost: number | null; how: string; onFree: boolean } {
  const p = t.plan
  if (!p) return { cost: null, how: 'Quote only', onFree: false }
  if (!paid && p.freeTier) return { cost: 0, how: `Free plan: ${p.freeTier}`, onFree: true }
  if (p.maxEmployees && s.employees > p.maxEmployees) return { cost: null, how: `Its published price covers up to ${p.maxEmployees} employees; above that it’s a quote`, onFree: false }
  const year = p.per === 'user-month' ? p.amount * 12 * s.seats : p.per === 'month' ? p.amount * 12 : p.amount
  const how =
    p.per === 'user-month'
      ? `${fmt(p.amount, p.currency)} a user a month, ${plural(s.seats, 'user')}`
      : p.per === 'month'
        ? `${fmt(p.amount, p.currency)} a month`
        : `${fmt(p.amount, p.currency)} a year`
  return { cost: year, how: p.note ? `${how}, ${p.note}` : how, onFree: false }
}

/** One line per tool in the stack: a tool that fills several parts is listed, and paid for, once. */
export function stackLines(lane: StackLane, s: StackState): Line[] {
  const bySlot = new Map<string, string[]>()
  for (const slot of lane.slots) {
    for (const id of s.picks[slot.id] ?? []) {
      if (!lane.tools[id]) continue
      bySlot.set(id, [...(bySlot.get(id) ?? []), slot.id])
    }
  }
  return [...bySlot.entries()].map(([id, slots]) => {
    const t = lane.tools[id]
    const paid = s.paid.includes(id) || t.free === 'none'
    if (lane.lane === 'hiring' && slots.includes('ats')) {
      const c = atsCost(t, s, paid)
      return { tool: t, slots, cost: c.cost, currency: t.plan?.currency ?? 'USD', forget: null, how: c.how, onFree: c.onFree }
    }
    if (t.free === 'site') return { tool: t, slots, cost: 0, currency: 'USD', forget: 0, how: 'Free on this site', onFree: true }
    if (t.free === 'unknown') return { tool: t, slots, cost: null, currency: 'USD', forget: null, how: 'No price on file', onFree: false }
    if (paid && t.paid) {
      const i = Math.min(12, Math.max(1, s.months)) - 1
      return { tool: t, slots, cost: t.paid.cost[i], currency: 'USD', forget: t.paid.forget[i], how: stepsText(t.paid.steps[i]), onFree: false, renewsAfter: t.paid.renewsAfter[i] }
    }
    return { tool: t, slots, cost: 0, currency: 'USD', forget: 0, how: 'Free version', onFree: true }
  })
}

export function stackTotals(L: Line[]) {
  const usd = round2(L.filter((l) => l.cost !== null && l.currency === 'USD').reduce((a, l) => a + (l.cost ?? 0), 0))
  const eur = round2(L.filter((l) => l.cost !== null && l.currency === 'EUR').reduce((a, l) => a + (l.cost ?? 0), 0))
  const forget = round2(L.reduce((a, l) => a + (l.forget ?? 0), 0))
  const unpriced = L.filter((l) => l.cost === null)
  return { usd, eur, forget, unpriced }
}

export function stackQuery(lane: StackLane, s: StackState): string {
  const q = new URLSearchParams()
  for (const slot of lane.slots) if (s.picks[slot.id]?.length) q.set(slot.id, s.picks[slot.id].join(','))
  const all = Object.values(s.picks).flat()
  const paid = s.paid.filter((id) => all.includes(id))
  if (paid.length) q.set('paid', paid.join(','))
  if (lane.lane === 'seekers') q.set('m', String(s.months))
  else {
    q.set('seats', String(s.seats))
    q.set('emp', String(s.employees))
    q.set('hires', String(s.hires))
  }
  return q.toString()
}

/** A stack from the address. Anything that isn't a tool for that part is dropped. */
export function stackFromQuery(lane: StackLane, get: (k: string) => string | null | undefined): StackState {
  const picks: Record<string, string[]> = {}
  for (const slot of lane.slots) {
    const ids = [...new Set((get(slot.id) ?? '').split(','))].filter((id) => lane.tools[id]?.covers.includes(slot.id))
    if (ids.length) picks[slot.id] = slot.multi ? ids : ids.slice(0, 1)
  }
  const paid = (get('paid') ?? '')
    .split(',')
    .filter((id) => lane.tools[id])
  const m = Number(get('m'))
  const seats = Number(get('seats'))
  const emp = Number(get('emp'))
  const hires = Number(get('hires'))
  return {
    picks,
    paid,
    months: Number.isInteger(m) && m >= 1 && m <= 12 ? m : 3,
    seats: lane.seats?.some((o) => o.value === seats) ? seats : 3,
    employees: lane.employees?.some((o) => o.value === emp) ? emp : 50,
    hires: lane.hires?.includes(hires) ? hires : 10,
  }
}

/** The date a day count lands on, from a start date, as "Feb 13, 2027". */
export function dayAfter(start: Date, days: number): string {
  const d = new Date(start.getTime() + days * 86400000)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * A calendar file with one reminder per paid tool, two days before it renews, so cancelling is one tap.
 * Starts from the day it is made, the same "if you start today" the page shows.
 */
export function cancelReminders(L: Line[], start: Date): string | null {
  const due = L.filter((l) => !l.onFree && l.renewsAfter)
  if (!due.length) return null
  const ymd = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const events = due.map((l) => {
    const day = new Date(start.getTime() + (l.renewsAfter! - 2) * 86400000)
    const next = new Date(day.getTime() + 86400000)
    return [
      'BEGIN:VEVENT',
      `UID:${l.tool.id}-${ymd(day)}@hiring.productions`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(day)}`,
      `DTEND;VALUE=DATE:${ymd(next)}`,
      `SUMMARY:Cancel ${l.tool.name} before it renews`,
      `DESCRIPTION:Your ${l.tool.name} plan renews in 2 days. If your search is done\\, cancel it now. From your stack on hiring.productions.`,
      'BEGIN:VALARM',
      'TRIGGER:PT9H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Cancel ${l.tool.name} before it renews`,
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n')
  })
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//hiring.productions//Stack builder//EN', 'CALSCALE:GREGORIAN', ...events, 'END:VCALENDAR'].join('\r\n')
}
