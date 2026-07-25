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

const SKILLS = new Set([
  'Interviewing & assessment',
  'Sourcing & search',
  'Screening & qualifying',
  'Offer negotiation & closing',
  'Onboarding',
  'Employer branding & recruitment marketing',
  'Talent strategy & advisory',
])

const YEARS = new Set(['1 to 3', '4 to 7', '8 to 15', '15+'])

const AVAILABILITY = new Set([
  'Available now',
  'A few hours a week',
  'Project by project',
])

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const fullName: string = (body?.fullName ?? '').toString().trim().slice(0, 120)
    const email: string = (body?.email ?? '').toString().trim().toLowerCase().slice(0, 200)
    const linkedin: string = (body?.linkedin ?? '').toString().trim().slice(0, 300)
    // What they are great at, within talent work. Multi select.
    const rawSkills = Array.isArray(body?.skills) ? body.skills : []
    const skills: string[] = rawSkills
      .map((x: unknown) => (x ?? '').toString())
      .filter((x: string) => SKILLS.has(x))
      .slice(0, 10)
    const years: string = (body?.years ?? '').toString().trim().slice(0, 20)
    const availability: string = (body?.availability ?? '').toString().trim().slice(0, 40)
    const repvera: string = (body?.repvera ?? '').toString().trim().slice(0, 300)
    const notes: string = (body?.notes ?? '').toString().trim().slice(0, 2000)
    // Which open engagement the person applied for, if any. Free text
    // from the client but capped and only ever echoed into our own
    // notification email and Redis record.
    const opportunity: string = (body?.opportunity ?? '').toString().trim().slice(0, 160)
    const hourlyRate: string = (body?.hourlyRate ?? '').toString().trim().slice(0, 60)
    // Role specific screening answers: [{ q, a }], capped so a
    // malformed client cannot stuff arbitrary content into the email.
    const rawAnswers = Array.isArray(body?.answers) ? body.answers : []
    const answers: Array<{ q: string; a: string }> = rawAnswers
      .slice(0, 5)
      .map((x: { q?: unknown; a?: unknown }) => ({
        q: (x?.q ?? '').toString().slice(0, 300),
        a: (x?.a ?? '').toString().slice(0, 2000),
      }))
      .filter((x: { q: string; a: string }) => x.q && x.a)

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
    if (skills.length === 0) {
      return NextResponse.json({ error: 'missing-skills' }, { status: 400 })
    }
    if (!YEARS.has(years)) {
      return NextResponse.json({ error: 'invalid-years' }, { status: 400 })
    }
    if (!AVAILABILITY.has(availability)) {
      return NextResponse.json({ error: 'invalid-availability' }, { status: 400 })
    }
    if (repvera && !/^https?:\/\/\S+\.\S+/.test(repvera)) {
      return NextResponse.json({ error: 'invalid-repvera' }, { status: 400 })
    }
    // Applications are per role. No blanket bench submissions.
    if (!opportunity) {
      return NextResponse.json({ error: 'missing-opportunity' }, { status: 400 })
    }
    if (!hourlyRate) {
      return NextResponse.json({ error: 'missing-rate' }, { status: 400 })
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
          skills,
          years,
          availability,
          repvera,
          notes,
          opportunity,
          hourlyRate,
          answers,
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
        `Great at: ${skills.join(', ')}`,
        `Years assessing or hiring: ${years}`,
        `Availability: ${availability}`,
        `RepVera: ${repvera || '(not provided)'}`,
        `Hourly consulting rate: ${hourlyRate}`,
        `Resume: ${hasResume ? `attached (${resumeName})` : '(not provided)'}`,
        ...answers.flatMap((x) => ['', x.q, x.a]),
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
          subject: `Applicant: ${fullName} for ${opportunity}`,
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

      // Confirmation to the applicant. Branded HTML matching the
      // magic-link email template: styled wordmark, no images (images
      // hurt deliverability), plain text fallback included.
      const firstName = fullName.split(' ')[0]
      const confirmText = [
        `Hi ${firstName},`,
        '',
        `Thank you for applying on short notice for ${opportunity}. That speed is exactly what these engagements run on.`,
        '',
        'Here is what happens next. We are reviewing applications over the next three days. If your background fits, I will reach out directly to set up a short intro call.',
        '',
        'If you shared a RepVera, I read it closely. If you have not yet, there is still time: build one free at repvera.com and reply to this email with the link. Having others speak for how you show up is extra validation and reduces time to trust.',
        '',
        'Either way, thank you for raising your hand. New engagements always post first at hiring.productions/consider-me.',
        '',
        'Stephanie Murray',
        'Founder, hiring.productions',
      ].join('\n')

      const para = 'font-size:15px;color:#5A5A6E;line-height:1.6;margin:0 0 16px;'
      const confirmHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Application received</title>
  </head>
  <body style="margin:0;padding:0;background:#FAF8F3;font-family:'Figtree',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1A1A22;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FAF8F3;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="520" style="max-width:520px;background:#FFFFFF;border:1px solid #ECECF2;border-radius:16px;padding:36px 32px;">
            <tr>
              <td>
                <div style="font-size:14px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#5A4FE0;margin-bottom:10px;">hiring.productions</div>
                <h1 style="font-size:24px;font-weight:900;letter-spacing:-0.015em;color:#1A1A22;line-height:1.2;margin:0 0 14px;">Application received.</h1>
                <p style="${para}">Hi ${firstName},</p>
                <p style="${para}">Thank you for applying on short notice for <strong style="color:#1A1A22;">${opportunity}</strong>. That speed is exactly what these engagements run on.</p>
                <p style="${para}">Here is what happens next. We are reviewing applications over the next three days. If your background fits, I will reach out directly to set up a short intro call.</p>
                <p style="${para}">If you shared a RepVera, I read it closely. If you have not yet, there is still time: build one free at <a href="https://repvera.com" style="color:#5A4FE0;font-weight:700;">repvera.com</a> and reply to this email with the link. Having others speak for how you show up is extra validation and reduces time to trust.</p>
                <p style="font-size:15px;color:#5A5A6E;line-height:1.6;margin:0 0 24px;">Either way, thank you for raising your hand. New engagements always post first at <a href="https://hiring.productions/consider-me" style="color:#5A4FE0;font-weight:700;">hiring.productions/consider-me</a>.</p>
                <p style="font-size:15px;color:#1A1A22;line-height:1.5;margin:0;">
                  <strong>Stephanie Murray</strong><br />
                  <span style="color:#8B8AA0;font-size:13px;">Founder, hiring.productions</span>
                </p>
              </td>
            </tr>
          </table>
          <div style="font-size:11px;color:#8B8AA0;margin-top:18px;font-family:'Figtree',-apple-system,sans-serif;">
            hiring.productions &middot; Both sides of the table. In the open.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`

      // Awaited on purpose: Vercel freezes the function once the response
      // returns, so a fire-and-forget send here would be killed mid-flight.
      // Failures are logged but never fail the application.
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: email,
          subject: 'Application received. Here is what happens next.',
          html: confirmHtml,
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
