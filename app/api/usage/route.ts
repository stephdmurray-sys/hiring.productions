/**
 * GET /api/usage — what tier am I, and how many runs do I have left?
 *
 * Cheap, cookie-only check (no Anthropic call) so the tool pages can
 * show "Run 2 of 3 today" pills and adapt their CTAs.
 */
import { NextRequest, NextResponse } from 'next/server'
import { checkGate } from '@/lib/usage'
import { resolveIdentity, COOKIE_NAMES } from '@/lib/identity'

export async function GET(request: NextRequest) {
  const identity = await resolveIdentity(request)
  const gate = await checkGate(identity)
  const res = NextResponse.json({
    tier: identity.tier,
    remaining: gate.ok ? gate.remaining : 0,
    limit: gate.ok ? gate.limit : gate.limit,
    blocked: !gate.ok,
    reason: gate.ok ? null : gate.reason,
  })

  // Plant the anon cookie eagerly so the very first /api/usage call
  // (which the pill fires on every tool-page mount) stamps the visitor
  // before they even start a tool run. Keeps quota stable from t=0.
  if (identity.newAnonToken) {
    res.cookies.set(COOKIE_NAMES.ANON, identity.newAnonToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  return res
}
