/**
 * Single client-side helper for capturing leads anywhere on the site.
 *
 * Posts to two destinations in parallel:
 *
 *   1. /api/lead — the authoritative path. Adds to Resend audience,
 *      stores in Redis, plants the email-tier cookie, fires the
 *      source-appropriate welcome email.
 *
 *   2. Google Apps Script → Google Sheet — legacy backup. Kept during
 *      the Resend transition so Stephanie's existing lead spreadsheet
 *      keeps populating. Can be retired once Resend is trusted.
 *
 * Each form on the site (homepage newsletter, LinkedIn guide download,
 * consulting inquiry, coming-soon waitlist) calls this with its own
 * `source` so the welcome email + future segmentation matches context.
 */

// The existing Google Apps Script endpoint Stephanie's been using.
// no-cors = fire-and-forget; response is opaque (this is why the sheet
// "doesn't always load properly" — there's no confirmation channel).
const LEGACY_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbyUFzebPIPYH4nVKqOvbRDqtowfmIJzjFt-mB5kHPt9kxpE6e92pLupSUtXq-E8m7vk/exec'

export interface SubmitLeadInput {
  email: string
  /**
   * Context tag for the welcome email + future segmentation. Use the
   * shapes the /api/lead route understands:
   *   - 'newsletter' | 'linkedin_guide' | 'consulting' | 'modal'
   *   - 'coming_soon:<tool-id>'
   */
  source: string
  firstName?: string
  lastName?: string
  /** Job seeker vs. hiring team — used by the legacy sheet's column. */
  audience?: 'candidate' | 'hiring'
  role?: string
  /**
   * Free-form passthrough to the legacy sheet for tool-specific fields
   * (level, company, score, grade). Only used by the sheet — Resend
   * doesn't use these. Existing forms can keep passing what they were
   * passing before.
   */
  legacyExtras?: Record<string, string>
}

export interface SubmitLeadResult {
  ok: boolean
  /** True only if /api/lead returned 200. Sheet write is fire-and-forget. */
  resendOk: boolean
  /** Error code from /api/lead if anything failed validation. */
  error?: string
}

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const fullName = [input.firstName, input.lastName].filter(Boolean).join(' ').trim()

  // Fire-and-forget to the legacy sheet — no await on the result.
  // Wrapped in a Promise that swallows errors so a failed sheet write
  // never breaks the real lead capture.
  const legacyPromise = fetch(LEGACY_SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      fullName,
      email: input.email,
      tool: input.source,
      audience: input.audience ?? 'candidate',
      role: input.role ?? '',
      level: input.legacyExtras?.level ?? '',
      company: input.legacyExtras?.company ?? '',
      score: input.legacyExtras?.score ?? '',
      grade: input.legacyExtras?.grade ?? '',
    }),
  }).catch(() => undefined)

  // Real write — this is the one we actually care about.
  let resendOk = false
  let error: string | undefined
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email,
        source: input.source,
        firstName: input.firstName,
        lastName: input.lastName,
        role: input.role,
        // Forward legacyExtras to /api/lead so source-specific welcome
        // emails (e.g., the mis-hire calculator result email) can
        // interpolate the data the visitor just calculated.
        extras: input.legacyExtras,
      }),
    })
    resendOk = res.ok
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      error = data.error
    }
  } catch {
    error = 'network'
  }

  // Let the sheet write resolve in the background — UX shouldn't wait.
  void legacyPromise

  return { ok: resendOk, resendOk, error }
}
