/**
 * Custom magic-link generator — bypasses Supabase's Site URL redirect
 * config entirely so we don't depend on the dashboard for redirect URL
 * management, and so the user gets a branded email from us via Resend
 * (not from noreply@mail.supabase.io).
 *
 * Flow:
 *   1. Visitor submits email on /sign-in
 *   2. This route generates a signup OR magiclink token via Supabase
 *      admin API (service-role auth — works regardless of Site URL config)
 *   3. We extract `hashed_token` from the response
 *   4. We construct OUR verify URL: /auth/verify?token={hashed_token}&type=magiclink
 *   5. We send a branded email through Resend
 *   6. Visitor clicks → /auth/verify exchanges the token for a session
 *
 * Why this works: Supabase's `verifyOtp({ token_hash, type })` accepts the
 * hashed_token without needing the URL to be in the redirect allow-list.
 * The Site URL config is only consulted when Supabase ITSELF builds the
 * redirect (which we're not using).
 *
 * Why this is better than Supabase's default magic-link emails:
 *   - From: stephanie@hiring.productions (not noreply@mail.supabase.io)
 *   - Branded HTML (Figtree, indigo/coral accents)
 *   - No spam-hits-by-default problem
 *   - We control the link domain (hiring.productions) — no localhost surprises
 *   - We can change the email template without leaving the codebase
 */
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

interface RequestBody {
  email?: string
}

export async function POST(request: NextRequest) {
  let body: RequestBody = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email ?? '').toString().trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'A valid email is required.' },
      { status: 400 },
    )
  }

  const supabase = createAdminClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hiring.productions'

  // Two-step flow: ensure the auth.users row exists, then generate a
  // magic-link token against it. This avoids the signup-link variant
  // (which requires a password we don't want to make up).
  //
  // 1. Try generateLink({type: 'magiclink'}). If the user exists, this
  //    returns a token. If not, we hit a user_not_found error.
  // 2. On user_not_found, call admin.createUser({ email, email_confirm:
  //    false }) to create the auth.users row. Then retry the magic link.
  //
  // The profile row is created automatically via the on_auth_user_created
  // trigger we set up in the migration.

  let actionResult = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${siteUrl}/auth/verify`,
    },
  })

  if (
    actionResult.error &&
    (actionResult.error.code === 'user_not_found' ||
      actionResult.error.message?.toLowerCase().includes('not found'))
  ) {
    const created = await supabase.auth.admin.createUser({
      email,
      // Don't auto-confirm — the magic-link click is what confirms them.
      email_confirm: false,
    })
    if (created.error) {
      console.error('[send-magic-link] createUser error:', created.error)
      return NextResponse.json(
        { error: 'Could not create your account. Please try again.' },
        { status: 500 },
      )
    }

    actionResult = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo: `${siteUrl}/auth/verify`,
      },
    })
  }

  if (actionResult.error) {
    console.error('[send-magic-link] generateLink error:', actionResult.error)
    return NextResponse.json(
      { error: 'Could not send the sign-in link. Please try again.' },
      { status: 500 },
    )
  }

  // We get back `properties.hashed_token` AND `properties.email_otp` — we
  // use the hashed_token because verifyOtp(token_hash) is what our
  // /auth/verify page calls.
  const props = actionResult.data?.properties as
    | {
        hashed_token?: string
        email_otp?: string
        verification_type?: string
      }
    | undefined

  const hashedToken = props?.hashed_token
  if (!hashedToken) {
    console.error('[send-magic-link] missing hashed_token in response')
    return NextResponse.json(
      { error: 'Sign-in link generation failed. Please try again.' },
      { status: 500 },
    )
  }

  // We always generate magiclink type now (createUser + magiclink instead
  // of signup-link), so type is fixed.
  const verifyUrl = new URL(`${siteUrl}/auth/verify`)
  verifyUrl.searchParams.set('token', hashedToken)
  verifyUrl.searchParams.set('type', 'magiclink')

  // Send the branded email via Resend.
  const resendApiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_EMAIL
  if (!resendApiKey || !fromAddress) {
    console.error(
      '[send-magic-link] RESEND_API_KEY or RESEND_FROM_EMAIL missing',
    )
    return NextResponse.json(
      { error: 'Email service not configured.' },
      { status: 500 },
    )
  }

  const html = buildMagicLinkEmailHtml({
    verifyUrl: verifyUrl.toString(),
    expiresInMinutes: 30,
  })

  const text = buildMagicLinkEmailText({ verifyUrl: verifyUrl.toString() })

  const sendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject: 'Your hiring.productions sign-in link',
      html,
      text,
      tags: [{ name: 'category', value: 'magic-link' }],
    }),
  })

  if (!sendRes.ok) {
    const err = await sendRes.text().catch(() => '')
    console.error('[send-magic-link] Resend error:', sendRes.status, err)
    return NextResponse.json(
      { error: 'Could not send the email. Please try again in a moment.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}

// ---------- email templates ----------

function buildMagicLinkEmailHtml({
  verifyUrl,
  expiresInMinutes,
}: {
  verifyUrl: string
  expiresInMinutes: number
}): string {
  // Branded but plain — no images (those hit spam filters), Figtree-ish
  // safe stack, indigo/coral accents from the brand palette.
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Your hiring.productions sign-in link</title>
  </head>
  <body style="margin:0;padding:0;background:#FAF8F3;font-family:'Figtree',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1A1A22;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#FAF8F3;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="520" style="max-width:520px;background:#FFFFFF;border:1px solid #ECECF2;border-radius:16px;padding:36px 32px;">
            <tr>
              <td>
                <div style="font-size:14px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#5A4FE0;margin-bottom:10px;">hiring.productions</div>
                <h1 style="font-size:24px;font-weight:900;letter-spacing:-0.015em;color:#1A1A22;line-height:1.2;margin:0 0 14px;">Your sign-in link</h1>
                <p style="font-size:15px;color:#5A5A6E;line-height:1.55;margin:0 0 24px;">
                  Click the button below to sign in to your search. This link works once and expires in ${expiresInMinutes} minutes.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-radius:10px;background:linear-gradient(135deg,#6C47FF,#FF4F6A);">
                      <a href="${verifyUrl}" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:800;color:#FFFFFF;text-decoration:none;border-radius:10px;font-family:'Figtree',-apple-system,sans-serif;">
                        Sign in to hiring.productions
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="font-size:13px;color:#8B8AA0;line-height:1.5;margin:28px 0 0;">
                  Or copy and paste this URL into your browser:<br />
                  <a href="${verifyUrl}" style="color:#5A4FE0;word-break:break-all;">${verifyUrl}</a>
                </p>
                <hr style="border:none;border-top:1px solid #ECECF2;margin:28px 0;" />
                <p style="font-size:12px;color:#8B8AA0;line-height:1.5;margin:0;">
                  If you didn't request this email, you can safely ignore it — no one can sign in without clicking the link.
                </p>
              </td>
            </tr>
          </table>
          <div style="font-size:11px;color:#8B8AA0;margin-top:18px;font-family:'Figtree',-apple-system,sans-serif;">
            hiring.productions · Both sides of the table. In the open.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildMagicLinkEmailText({ verifyUrl }: { verifyUrl: string }): string {
  return [
    'Your hiring.productions sign-in link',
    '',
    'Click the link below to sign in to your search. This link works once and expires in 30 minutes.',
    '',
    verifyUrl,
    '',
    "If you didn't request this email, you can safely ignore it — no one can sign in without clicking the link.",
    '',
    'hiring.productions',
  ].join('\n')
}
