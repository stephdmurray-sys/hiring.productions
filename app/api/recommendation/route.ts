/**
 * Free stack-recommendation intake for /consulting.
 *
 * On submit:
 *   1. Stores the full submission in Redis (recommendation:{emailHash})
 *   2. Emails Stephanie a notification with every field
 *   3. Emails the requester a short confirmation
 *   4. Logs an email_capture event with source get_recommendation
 *
 * Mirrors the consider-me route's tolerance: Redis and Resend are each
 * optional so a missing env var degrades to the next step instead of
 * failing the lead.
 */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { hash } from '@/lib/usage'
import { logEvent } from '@/lib/event-log'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NOTIFY_TO = 'stephdmurray@gmail.com'

const HIRES = new Set([
  'Under 20 hires a year',
  '20 to 50 hires a year',
  '50+ hires a year',
  'High-volume hourly',
])

function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ??
    process.env.UPSTASH_REDIS_REST_URL ??
    process.env.REDIS_URL
  const token =
    process.env.KV_REST_API_TOKEN ??
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.REDIS_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim().slice(0, 120)
    const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200)
    const company = String(body.company ?? '').trim().slice(0, 160)
    const hires = String(body.hires ?? '').trim()
    const roles = String(body.roles ?? '').trim().slice(0, 240)
    const stack = String(body.stack ?? '').trim().slice(0, 240)
    const pain = String(body.pain ?? '').trim().slice(0, 2000)

    if (!name || !company || !roles) {
      return NextResponse.json({ error: 'Name, company, and what you are hiring are required.' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 })
    }
    if (!HIRES.has(hires)) {
      return NextResponse.json({ error: 'Pick a hiring-volume tier.' }, { status: 400 })
    }

    const submission = { name, email, company, hires, roles, stack, pain, submittedAt: new Date().toISOString() }

    const redis = getRedis()
    if (redis) {
      await redis
        .set(`recommendation:${hash(email)}`, JSON.stringify(submission))
        .catch(() => undefined)
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL
    if (resendApiKey && fromAddress) {
      const rows = [
        ['Name', name],
        ['Email', email],
        ['Company', company],
        ['Hires per year', hires],
        ['Hiring', roles],
        ['Current tools', stack || '(none given)'],
        ['What is breaking', pain || '(none given)'],
      ]
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#6B7280;white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:6px 0;">${esc(v)}</td></tr>`,
        )
        .join('')

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
        body: JSON.stringify({
          from: fromAddress,
          to: [NOTIFY_TO],
          subject: `Stack recommendation request: ${company} (${hires})`,
          html: `<div style="font-family:sans-serif;font-size:14px;color:#1A1A22;"><p><b>New recommendation request.</b></p><table>${rows}</table></div>`,
        }),
      }).catch(() => undefined)

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
        body: JSON.stringify({
          from: fromAddress,
          to: [email],
          subject: 'Your hiring stack recommendation is in the works',
          html: `<div style="font-family:sans-serif;font-size:14px;color:#1A1A22;line-height:1.7;"><p>Hi ${esc(name)},</p><p>Got your request. Your recommendation lands within two business days: a named stack for ${esc(company)}, the reasoning behind each pick, and a straight answer on whether you need anything beyond the tools.</p><p>Every pick comes from the same scoring we publish on the site. Vendors cannot pay for placement, rankings, or scores.</p><p>Stephanie Murray<br>Founder, hiring.productions</p></div>`,
        }),
      }).catch(() => undefined)
    }

    await logEvent('email_capture', { meta: { source: 'get_recommendation', hires, company } }).catch(
      () => undefined,
    )

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
