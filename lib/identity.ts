/**
 * Resolve the calling visitor into a UsageIdentity for the gate.
 *
 * Order of preference:
 *   1. `hp_pro` cookie (signed Stripe customer ID) → tier: 'pro'
 *   2. `hp_email` cookie (hashed email) → tier: 'email'
 *   3. Fallback: anon, keyed by `hp_anon` cookie or IP+ua hash
 *
 * The Pro cookie is signed with HP_COOKIE_SECRET. The email cookie carries
 * an already-hashed value (we never write raw email into a cookie).
 */
import type { NextRequest } from 'next/server'
import { hash, type UsageIdentity } from './usage'

const PRO_COOKIE = 'hp_pro'
const EMAIL_COOKIE = 'hp_email'
const ANON_COOKIE = 'hp_anon'

/** HMAC-SHA256 with Web Crypto (works in Edge + Node runtimes). */
async function hmac(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Verify the Pro cookie. Format: `<customerId>.<hex sig>`. */
async function verifyProCookie(value: string): Promise<string | null> {
  const secret = process.env.HP_COOKIE_SECRET
  if (!secret) return null
  const dot = value.lastIndexOf('.')
  if (dot < 0) return null
  const customerId = value.slice(0, dot)
  const sig = value.slice(dot + 1)
  const expected = await hmac(secret, customerId)
  // Constant-time compare
  if (sig.length !== expected.length) return null
  let diff = 0
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0 ? customerId : null
}

/** Sign a Pro cookie payload. Use this in the Stripe webhook on checkout success. */
export async function signProCookie(customerId: string): Promise<string | null> {
  const secret = process.env.HP_COOKIE_SECRET
  if (!secret) return null
  const sig = await hmac(secret, customerId)
  return `${customerId}.${sig}`
}

/** Extract the visitor's IP from request headers, with Vercel-style fallbacks. */
function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return '0.0.0.0'
}

/** Resolve identity from the request. Async because of hashing. */
export async function resolveIdentity(req: NextRequest): Promise<UsageIdentity> {
  // 1. Pro cookie (signed) wins.
  const pro = req.cookies.get(PRO_COOKIE)?.value
  if (pro) {
    const customerId = await verifyProCookie(pro)
    if (customerId) return { tier: 'pro', key: customerId }
  }

  // 2. Email cookie (already hashed).
  const emailHash = req.cookies.get(EMAIL_COOKIE)?.value
  if (emailHash && /^[a-f0-9]{12,64}$/.test(emailHash)) {
    return { tier: 'email', key: emailHash }
  }

  // 3. Anon — stable per device via cookie, plus IP+ua as a fallback.
  const anon = req.cookies.get(ANON_COOKIE)?.value
  if (anon && /^[a-f0-9]{12,64}$/.test(anon)) {
    return { tier: 'anon', key: anon }
  }

  const ip = getClientIp(req)
  const ua = req.headers.get('user-agent') ?? ''
  const fallback = await hash(`${ip}|${ua}`)
  return { tier: 'anon', key: fallback }
}

/**
 * Generate a fresh anon cookie value (a 24-char hex token) for callers
 * that want to plant a stable anon cookie on the response.
 */
export async function newAnonToken(): Promise<string> {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 24)
}

export const COOKIE_NAMES = {
  PRO: PRO_COOKIE,
  EMAIL: EMAIL_COOKIE,
  ANON: ANON_COOKIE,
} as const
