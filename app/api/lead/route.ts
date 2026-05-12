/**
 * Email capture endpoint. Plants a hashed-email cookie that unlocks
 * 10 lifetime free-tool runs (the email tier in lib/usage.ts).
 *
 * Why hash the email into the cookie:
 *   - The cookie key MUST be stable so quota tracking survives reloads.
 *   - We don't want raw emails sitting in a browser cookie.
 *   - The raw email goes to our list provider (Resend audience) for
 *     follow-up; the server-side rate limit only needs the hash.
 */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { hash } from '@/lib/usage'
import { COOKIE_NAMES } from '@/lib/identity'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

/**
 * Push the email to Resend if a key is configured. Silent no-op
 * otherwise so the unlock still happens even before Resend is wired up.
 */
async function addToResendAudience(email: string, source: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) return

  try {
    await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        first_name: '',
        last_name: '',
      }),
    })
    // Welcome email — only fires if a from address is set.
    const from = process.env.RESEND_FROM_EMAIL
    if (from) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: 'Your 10 free insights are unlocked.',
          text: [
            "Thanks for dropping your email — you've unlocked 10 free insights across hiring.productions.",
            '',
            "Here's where I'd start:",
            '',
            '1. Does My Resume Read as AI? — https://hiring.productions/resume',
            '2. What This Job Actually Is — https://hiring.productions/tools/what-this-job-is',
            "3. What's Breaking Your Job Search — https://hiring.productions/tools/whats-breaking-search",
            '',
            'When the 10 free insights run out, the whole production — every Recruiter Insight, unlimited — is $20 for the year:',
            'https://hiring.productions/pricing',
            '',
            '— Stephanie',
            'hiring.productions',
          ].join('\n'),
        }),
      })
    }
  } catch (err) {
    console.error('[api/lead] resend error', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const rawEmail: string = (body?.email ?? '').toString().trim().toLowerCase()
    const source: string = (body?.source ?? 'unknown').toString().slice(0, 64)

    if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 200) {
      return NextResponse.json({ error: 'invalid-email' }, { status: 400 })
    }

    const emailHash = await hash(rawEmail)

    // Record the capture in Redis for our own records. Idempotent —
    // re-submissions just refresh the timestamp.
    const r = getRedis()
    if (r) {
      await r.set(
        `lead:${emailHash}`,
        JSON.stringify({ email: rawEmail, source, ts: Date.now() }),
      )
    }

    await addToResendAudience(rawEmail, source)

    const res = NextResponse.json({ ok: true })

    // Plant the email-tier cookie. One year — gives the user plenty
    // of time to use their 10 lifetime runs.
    res.cookies.set(COOKIE_NAMES.EMAIL, emailHash, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    return res
  } catch (err) {
    console.error('[api/lead] error', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
