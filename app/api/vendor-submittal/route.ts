/**
 * Vendor intake for /for-vendors: product submittals, walkthrough
 * requests, and early-stage "put us on your radar" requests.
 *
 * On submit:
 *   1. Stores the submission in Redis (vendor:{emailHash})
 *   2. Emails Stephanie a notification with every field
 *   3. Emails the vendor a short confirmation that restates what a
 *      submittal can and cannot change
 *   4. Logs an email_capture event with source vendor_submittal
 *
 * Mirrors the recommendation route: Redis and Resend are each optional,
 * so a missing env var degrades instead of losing the submission.
 */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { hash } from '@/lib/usage'
import { logEvent } from '@/lib/event-log'
import { VENDOR_ASKS, VENDOR_CATEGORIES } from '@/lib/vendor-options'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NOTIFY_TO = 'stephdmurray@gmail.com'

const ASKS = new Set<string>(VENDOR_ASKS)
const CATEGORIES = new Set<string>(VENDOR_CATEGORIES)

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? process.env.REDIS_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.REDIS_TOKEN
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
    const product = String(body.product ?? '').trim().slice(0, 120)
    const website = String(body.website ?? '').trim().slice(0, 200)
    const category = String(body.category ?? '').trim()
    const ask = String(body.ask ?? '').trim()
    const note = String(body.note ?? '').trim().slice(0, 2000)

    if (!name || !product || !website) {
      return NextResponse.json({ error: 'Your name, the product and its website are required.' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 })
    }
    if (!CATEGORIES.has(category)) {
      return NextResponse.json({ error: 'Pick the category that fits best.' }, { status: 400 })
    }
    if (!ASKS.has(ask)) {
      return NextResponse.json({ error: 'Pick what you would like to do.' }, { status: 400 })
    }

    const submission = { name, email, product, website, category, ask, note, submittedAt: new Date().toISOString() }

    const redis = getRedis()
    if (redis) {
      await redis.set(`vendor:${hash(email)}`, JSON.stringify(submission)).catch(() => undefined)
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL
    if (resendApiKey && fromAddress) {
      const rows = [
        ['Name', name],
        ['Email', email],
        ['Product', product],
        ['Website', website],
        ['Category', category],
        ['Wants to', ask],
        ['Note', note || '(none given)'],
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
          subject: `Vendor: ${product} (${ask.toLowerCase()})`,
          html: `<div style="font-family:sans-serif;font-size:14px;color:#1A1A22;"><p><b>New vendor submission.</b></p><table>${rows}</table></div>`,
        }),
      }).catch(() => undefined)

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendApiKey}` },
        body: JSON.stringify({
          from: fromAddress,
          to: [email],
          subject: `We have ${product} on file`,
          html: `<div style="font-family:sans-serif;font-size:14px;color:#1A1A22;line-height:1.7;"><p>Hi ${esc(name)},</p><p>Thanks for sending ${esc(product)}. We read every submission against the same public evidence we use for every tool, and we'll reply about next steps within five business days.</p><p>A written submittal moves a review to the Vendor Submitted evidence level. A product walkthrough moves it to Vendor Demoed, our strongest. Neither one buys a score, a ranking, or a recommendation.</p><p>Stephanie Murray<br>Founder, hiring.productions</p></div>`,
        }),
      }).catch(() => undefined)
    }

    await logEvent('email_capture', { meta: { source: 'vendor_submittal', product, ask } }).catch(() => undefined)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
