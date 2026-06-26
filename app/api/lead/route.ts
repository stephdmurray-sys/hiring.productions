/**
 * Email capture endpoint — the SINGLE entry point for every lead on the
 * site. Plants a hashed-email cookie that unlocks the 8-run email tier
 * AND adds the visitor to the Resend audience for follow-up.
 *
 * Sources (used to tailor the welcome email):
 *   - 'modal'              email-unlock modal after anon hits 2 free runs
 *   - 'newsletter'         homepage newsletter signup
 *   - 'linkedin_guide'     LinkedIn PDF download form
 *   - 'consulting'         consulting inquiry form
 *   - 'coming_soon:<tool>' waitlist for a not-yet-shipped tool
 *
 * Why hash the email into the cookie:
 *   - The cookie key MUST be stable so quota tracking survives reloads.
 *   - We don't want raw emails sitting in a browser cookie.
 *   - The raw email goes to Resend; the server gate only needs the hash.
 */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { hash } from '@/lib/usage'
import { COOKIE_NAMES } from '@/lib/identity'
import { logEvent } from '@/lib/event-log'

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

interface LeadInput {
  email: string
  source: string
  firstName?: string
  lastName?: string
  role?: string
  /**
   * Source-specific structured data. Used by welcomeForSource to
   * interpolate context into the welcome email (e.g., calculator
   * result figures, score, level). Values are stringified at the
   * client.
   */
  extras?: Record<string, string>
}

/**
 * Build the welcome email text for a given source. Each source gets
 * copy that matches what the user JUST did, not a generic "8 more
 * insights" message that doesn't fit (e.g., PDF downloaders aren't
 * here for the tool gate).
 */
function welcomeForSource(
  source: string,
  extras?: Record<string, string>,
): { subject: string; text: string } | null {
  // Mis-hire calculator result delivery email (RepVera-branded).
  // Interpolates the cost figures the user just calculated so the
  // email IS the result they came for. Voice: RepVera, not Stephanie.
  // No dashes, no banned words (testimonial, feedback, endorsement,
  // insights, AI summary).
  if (source === 'mis_hire_calculator') {
    const roleLabel = extras?.role_label ?? 'this role'
    const salary = extras?.salary_fmt ?? ''
    const hires = extras?.hires ?? ''
    const rate = extras?.rate ?? ''
    const costRange = extras?.cost_range ?? ''
    const annual = extras?.annual ?? ''
    const shrmLabel = extras?.shrm_label ?? ''
    return {
      subject: `Your mis-hire exposure: ${annual} per year`,
      text: [
        'Thanks for running the True Cost of a Mis-Hire calculator.',
        '',
        'Here is what you saw, in writing.',
        '',
        `Role level: ${roleLabel}`,
        `Annual salary: ${salary}`,
        `Hires like this per year: ${hires}`,
        `Assumed mis-hire rate: ${rate}%`,
        '',
        'Cost of a single mis-hire at this level:',
        costRange,
        shrmLabel,
        '',
        'Your estimated exposure per year:',
        annual,
        `Assuming ${hires} hires like this a year and a ${rate}% mis-hire rate.`,
        '',
        'You can verify what someone can do. The harder question is how they actually show up, and that is where mis-hires are made.',
        '',
        'See how RepVera helps:',
        'https://repvera.com',
        '',
        'Methodology: SHRM Talent Acquisition Benchmarking on cost of bad hire (50 to 75 percent of salary for entry, 100 to 150 percent for mid-level, 200 to 213 percent for executive). U.S. Department of Labor on the conservative floor (about 30 percent of first-year earnings). Leadership IQ on behavioral failure (46 to 89 percent of new hires do not last 18 months, almost none on technical ability). These are estimates to size the problem, not a quote.',
        '',
        'RepVera',
        'repvera.com',
      ].join('\n'),
    }
  }

  if (source.startsWith('coming_soon:')) {
    const toolId = source.slice('coming_soon:'.length) || 'this tool'
    return {
      subject: "You're on the waitlist.",
      text: [
        "You're on the waitlist for " + toolId + ".",
        '',
        "I'll email you the moment it goes live — no spam in between.",
        '',
        "While you wait, here's where I'd start:",
        '',
        '1. Does My Resume Read as AI? — https://hiring.productions/resume',
        "2. What's Breaking Your Job Search — https://hiring.productions/tools/whats-breaking-search",
        '3. Every Recruiter Insight for $14.99/mo or $99/yr — https://hiring.productions/pricing',
        '',
        '— Stephanie',
        'hiring.productions',
      ].join('\n'),
    }
  }

  if (source === 'linkedin_guide') {
    return {
      subject: 'Your LinkedIn guide is in your hands.',
      text: [
        "Thanks for grabbing the LinkedIn guide. You should already have the PDF — the download started from the page.",
        '',
        "If you want to go deeper, the matching tool runs your profile through what a recruiter would actually paste into LinkedIn Recruiter:",
        '',
        'Would a Recruiter Even Find You? — https://hiring.productions/tools/recruiter-find-you',
        '',
        "And if your resume needs the same treatment:",
        '',
        'Does My Resume Read as AI? — https://hiring.productions/resume',
        '',
        '— Stephanie',
        'hiring.productions',
      ].join('\n'),
    }
  }

  if (source === 'consulting') {
    return {
      subject: 'Got it — I will reply personally.',
      text: [
        "Got your message — I'll reply personally within one business day.",
        '',
        "In the meantime, if it's useful, the public side of how I work shows up across the site — tools, answers, and the Recruiter Insights membership.",
        '',
        '— Stephanie',
        'hiring.productions',
      ].join('\n'),
    }
  }

  if (source === 'newsletter') {
    return {
      subject: "You're in. First read coming soon.",
      text: [
        "Thanks for subscribing. The first read drops soon — direct, specific, recruiter-side.",
        '',
        "While you wait, here are the three tools I'd run first if I were back in the search:",
        '',
        '1. Does My Resume Read as AI? — https://hiring.productions/resume',
        "2. What's Breaking Your Job Search — https://hiring.productions/tools/whats-breaking-search",
        '3. What This Job Actually Is — https://hiring.productions/tools/what-this-job-is',
        '',
        '— Stephanie',
        'hiring.productions',
      ].join('\n'),
    }
  }

  // Default — modal/email-unlock context. Same copy as before.
  return {
    subject: "You're in — 8 more free insights unlocked.",
    text: [
      "Thanks for dropping your email — you've just unlocked 8 more free insights across hiring.productions.",
      '',
      "Here's where I'd start:",
      '',
      '1. Does My Resume Read as AI? — https://hiring.productions/resume',
      '2. What This Job Actually Is — https://hiring.productions/tools/what-this-job-is',
      "3. What's Breaking Your Job Search — https://hiring.productions/tools/whats-breaking-search",
      '',
      'When your free insights run out, the whole production — every Recruiter Insight, unlimited — is $14.99/month or $99/year:',
      'https://hiring.productions/pricing',
      '',
      '— Stephanie',
      'hiring.productions',
    ].join('\n'),
  }
}

async function addToResendAudience(input: LeadInput): Promise<void> {
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
        email: input.email,
        unsubscribed: false,
        first_name: input.firstName ?? '',
        last_name: input.lastName ?? '',
      }),
    })

    const from = process.env.RESEND_FROM_EMAIL
    const welcome = welcomeForSource(input.source, input.extras)
    if (from && welcome) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: input.email,
          subject: welcome.subject,
          text: welcome.text,
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
    const firstName: string = (body?.firstName ?? '').toString().slice(0, 80)
    const lastName: string = (body?.lastName ?? '').toString().slice(0, 80)
    const role: string = (body?.role ?? '').toString().slice(0, 120)
    // Parse source-specific structured extras for welcome-email
    // interpolation. Limited to plain string values, capped per key
    // so a malformed client cannot stuff arbitrary content into an
    // outgoing email.
    const rawExtras = body?.extras
    let extras: Record<string, string> | undefined
    if (rawExtras && typeof rawExtras === 'object') {
      extras = {}
      for (const [k, v] of Object.entries(rawExtras)) {
        if (typeof k !== 'string' || k.length > 64) continue
        if (typeof v !== 'string') continue
        extras[k] = v.slice(0, 280)
      }
    }

    if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 200) {
      return NextResponse.json({ error: 'invalid-email' }, { status: 400 })
    }

    const emailHash = await hash(rawEmail)

    // Record the capture in Redis for our own records. Idempotent —
    // re-submissions overwrite with the latest metadata.
    const r = getRedis()
    if (r) {
      await r.set(
        `lead:${emailHash}`,
        JSON.stringify({
          email: rawEmail,
          source,
          firstName,
          lastName,
          role,
          ts: Date.now(),
        }),
      )
    }

    await addToResendAudience({ email: rawEmail, source, firstName, lastName, role, extras })

    // Feed the admin event log so /api/admin/stats can count captures.
    void logEvent('email_capture', { source })

    const res = NextResponse.json({ ok: true })

    // Plant the email-tier cookie. One year — gives the user plenty
    // of time to use their 8 lifetime tool runs. Also benefits PDF
    // downloaders and newsletter subscribers since they've earned
    // engagement reward.
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
