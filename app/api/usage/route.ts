/**
 * GET /api/usage — what tier am I, and how many runs do I have left?
 *
 * Cheap, cookie-only check (no Anthropic call) so the tool pages can
 * show "Run 2 of 3 today" pills and adapt their CTAs.
 */
import { NextRequest, NextResponse } from 'next/server'
import { checkGate } from '@/lib/usage'
import { resolveIdentity } from '@/lib/identity'

export async function GET(request: NextRequest) {
  const identity = await resolveIdentity(request)
  const gate = await checkGate(identity)
  return NextResponse.json({
    tier: identity.tier,
    remaining: gate.ok ? gate.remaining : 0,
    limit: gate.ok ? gate.limit : gate.limit,
    blocked: !gate.ok,
    reason: gate.ok ? null : gate.reason,
  })
}
