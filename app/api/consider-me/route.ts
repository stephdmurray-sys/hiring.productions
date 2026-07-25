/**
 * Bench signup endpoint for /consider-me — recruiters and talent
 * assessors who want to be pulled into fast client projects
 * (interview assessments, search, advisory).
 *
 * On submit:
 *   1. Stores the full submission in Redis (considerme:{emailHash})
 *   2. Emails Stephanie a notification with every field
 *   3. Emails the applicant a short confirmation
 *   4. Logs an email_capture event with source consider_me so the
 *      admin dashboard picks it up without a new event type
 *
 * Kept separate from /api/lead because bench signups carry structured
 * fields (specialty, availability, RepVera link) that the lead route
 * does not persist, and because Stephanie needs a notification email
 * per signup, which leads never send.
 */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { hash } from '@/lib/usage'
import { logEvent } from '@/lib/event-log'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const NOTIFY_TO = 'stephdmurray@gmail.com'

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

const SPECIALTIES = new Set([
  'Healthcare & clinical',
  'Tech & engineering',
  'Executive & leadership',
  'Sales & go to market',
  'General & cross industry',
  'Other',
])

const YEARS = new Set(['1 to 3', '4 to 7', '8 to 15', '15+'])

const AVAILABILITY = new Set([
  'Available now',
  'A few hours a week',
  'Project by project',
  'Just keeping in touch',
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const fullName: string = (body?.fullName ?? '').toString().trim().slice(0, 120)
    const email: string = (body?.email ?? '').toString().trim().toLowerCase().slice(0, 200)
    const linkedin: string = (body?.linkedin ?? '').toString().trim().slice(0, 300)
    const specialty: string = (body?.specialty ?? '').toString().trim().slice(0, 60)
    const years: string = (body?.years ?? '').toString().trim().slice(0, 20)
    const availability: string = (body?.availability ?? '').toString().trim().slice(0, 40)
    const repvera: string = (body?.repvera ?? '').toString().trim().slice(0, 300)
    const notes: string = (body?.notes ?? '').toString().trim().slice(0, 2000)
    // Which open engagement the person applied for, if any. Free text
    // from the client but capped and only ever echoed into our own
    // notification email and Redis record.
    const opportunity: string = (body?.opportunity ?? '').toString().trim().slice(0, 160)

    // Optional resume, sent as base64 and forwarded to Stephanie as an
    // email attachment. 3 MB file cap on the client; base64 inflates by
    // ~4/3 so allow 4.2 MB of encoded payload here. Anything bigger is
    // dropped, not rejected: the signup itself still matters more.
    const resumeName: string = (body?.resumeName ?? '')
      .toString()
      .replace(/[^\w.\- ]/g, '')
      .slice(0, 120)
    let resumeData: string = (body?.resumeData ?? '').toString()
    if (
      resumeData.length > 4.2 * 1024 * 1024 ||
      !/^[A-Za-z0-9+/=]*$/.test(resumeData)
    ) {
      resumeData = ''
    }
    const hasResume = Boolean(resumeName && resumeData)

    if (!fullName) {
      return NextResponse.json({ error: 'missing-name' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'invalid-email' }, { status: 400 })
    }
    if (!SPECIALTIES.has(specialty)) {
      return NextResponse.json({ error: 'invalid-specialty' }, { status: 400 })
    }
    if (!YEARS.has(years)) {
      return NextResponse.json({ error: 'invalid-years' }, { status: 400 })
    }
    if (!AVAILABILITY.has(availability)) {
      return NextResponse.json({ error: 'invalid-availability' }, { status: 400 })
    }
    if (!/^https?:\/\/\S+\.\S+/.test(repvera)) {
      return NextResponse.json({ error: 'invalid-repvera' }, { status: 400 })
    }

    const emailHash = await hash(email)

    // Store for our own records. Re-submissions overwrite with the
    // latest details, same policy as /api/lead.
    const r = getRedis()
    if (r) {
      await r.set(
        `considerme:${emailHash}`,
        JSON.stringify({
          fullName,
          email,
          linkedin,
          specialty,
          years,
          availability,
          repvera,
          notes,
          opportunity: opportunity || null,
          resume: hasResume ? resumeName : null,
          ts: Date.now(),
        }),
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL

    if (resendApiKey && fromAddress) {
      // Notification to Stephanie with every field. This is the one
      // that matters: it is how the bench actually gets reviewed.
      const notifyText = [
        opportunity
          ? `New application from /consider-me for: ${opportunity}`
          : 'New bench signup from /consider-me.',
        '',
        `Name: ${fullName}`,
        `Email: ${email}`,
        `LinkedIn: ${linkedin || '(not provided)'}`,
        `Specialty: ${specialty}`,
        `Years assessing or hiring: ${years}`,
        `Availability: ${availability}`,
        `RepVera: ${repvera}`,
        `Resume: ${hasResume ? `attached (${resumeName})` : '(not provided)'}`,
        '',
        'Notes:',
        notes || '(none)',
      ].join('\n')

      const notifyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: NOTIFY_TO,
          reply_to: email,
          subject: opportunity
            ? `Applicant: ${fullName} for ${opportunity}`
            : `Bench signup: ${fullName} (${specialty}, ${availability})`,
          text: notifyText,
          tags: [{ name: 'category', value: 'consider-me' }],
          ...(hasResume
            ? { attachments: [{ filename: resumeName, content: resumeData }] }
            : {}),
        }),
      })

      if (!notifyRes.ok) {
        const err = await notifyRes.text().catch(() => '')
        console.error('[consider-me] notify email failed:', notifyRes.status, err)
      }

      // Short confirmation to the applicant. Plain, on voice, no promises.
      const confirmText = [
        `Thanks, ${fullName.split(' ')[0]}.`,
        '',
        'You are on the bench list at Hiring.Productions.',
        '',
        'Here is how it works. We read every submission and we review your RepVera. When a client project fits your specialty and availability, you hear from Stephanie directly. No newsletters, no drip sequence, just a call when the work comes.',
        '',
        'Stephanie Murray',
        'hiring.productions',
      ].join('\n')

      // Awaited on purpose: Vercel freezes the function once the response
      // returns, so a fire-and-forget send here would be killed mid-flight.
      // Failures are logged but never fail the signup.
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: email,
          subject: 'You are on the bench list.',
          text: confirmText,
          tags: [{ name: 'category', value: 'consider-me' }],
        }),
      }).catch((err) => console.error('[consider-me] confirm email failed', err))
    } else {
      console.error('[consider-me] RESEND_API_KEY or RESEND_FROM_EMAIL missing')
    }

    void logEvent('email_capture', { source: 'consider_me' })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[consider-me] error', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
