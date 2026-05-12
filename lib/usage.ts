/**
 * Usage gates, cost tracking, and the global $5/day kill switch.
 *
 * Three tiers stacked on top of a single per-day spend ceiling:
 *
 *   1. Anonymous       — 2 free insights/day, identified by cookie
 *   2. Email captured  — 8 lifetime insights after dropping an email
 *                        (so a visitor who captures on call #3 gets 10 total)
 *   3. Pro member      — 15 runs/day (the cost-protection cap; not a UX cap)
 *
 * On top of that, the daily site-wide cost ceiling is $5/day. Anonymous
 * traffic is cut off at $4.50 so paying customers get the last $0.50.
 *
 * Storage is Upstash Redis (free tier). The client picks env vars that
 * either Vercel's KV integration or a direct Upstash database would set.
 */
import { Redis } from '@upstash/redis'

// -------- Tunables ---------------------------------------------------------

// 2 anon + 8 after email = 10 total free insights before the paywall.
// Anon resets daily so returning visitors keep some access; the email
// bump is a one-time 8-run grant on top of any anon usage so far.
export const ANON_DAILY_LIMIT = 2
export const EMAIL_LIFETIME_LIMIT = 8
export const PRO_DAILY_LIMIT = 15

/** Site-wide ceilings in cents (avoids float math in Redis). */
export const DAILY_BUDGET_CENTS = 500 // $5.00
export const ANON_CUTOFF_CENTS = 450 // anons get cut off here, leaving $0.50 for Pro

// -------- Redis client -----------------------------------------------------

/**
 * Lazily create the Upstash client. If env vars are missing, return null
 * and let callers degrade gracefully (no gating, but logged) — this keeps
 * local dev usable without forcing a Redis setup.
 */
let _redis: Redis | null = null
let _redisChecked = false

function getRedis(): Redis | null {
  if (_redisChecked) return _redis
  _redisChecked = true

  const url =
    process.env.KV_REST_API_URL ??
    process.env.UPSTASH_REDIS_REST_URL ??
    process.env.REDIS_URL
  const token =
    process.env.KV_REST_API_TOKEN ??
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.REDIS_TOKEN

  if (!url || !token) {
    console.warn('[usage] Redis env vars missing — gating is OFF (dev mode)')
    return null
  }

  _redis = new Redis({ url, token })
  return _redis
}

// -------- Identity ---------------------------------------------------------

export type Tier = 'anon' | 'email' | 'pro'

export interface UsageIdentity {
  tier: Tier
  /** Stable key for the current visitor — IP+ua for anon, hashed email for email, customer ID for Pro. */
  key: string
  /** The captured email, if known. */
  email?: string
}

/**
 * Today's date key in UTC ("2026-05-12"). Used to namespace daily counters.
 */
export function dayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

/** Quick stable hash for emails / IPs without pulling in a crypto lib. */
export async function hash(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input.trim().toLowerCase())
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 24)
}

// -------- Daily budget -----------------------------------------------------

/**
 * Read today's total spend in cents. Returns 0 if Redis isn't configured.
 */
export async function getDailySpendCents(): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const v = await r.get<number>(`spend:${dayKey()}`)
  return v ?? 0
}

/**
 * Record cost for one call. Atomically increments today's spend counter
 * and sets a 48h TTL so old days expire on their own.
 */
export async function recordSpendCents(cents: number): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const k = `spend:${dayKey()}`
  const total = await r.incrby(k, cents)
  await r.expire(k, 60 * 60 * 48)
  return total
}

// -------- Per-tier counters ------------------------------------------------

/** Reads today's run count for the anon visitor. */
async function getAnonRunsToday(keyHash: string): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const v = await r.get<number>(`anon:${keyHash}:${dayKey()}`)
  return v ?? 0
}

async function bumpAnonRuns(keyHash: string): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const k = `anon:${keyHash}:${dayKey()}`
  const total = await r.incr(k)
  await r.expire(k, 60 * 60 * 36)
  return total
}

/** Reads lifetime run count for an email-captured visitor. */
async function getEmailRunsLifetime(emailHash: string): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const v = await r.get<number>(`email:${emailHash}:total`)
  return v ?? 0
}

async function bumpEmailRuns(emailHash: string): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  return await r.incr(`email:${emailHash}:total`)
}

async function getProRunsToday(customerKey: string): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const v = await r.get<number>(`pro:${customerKey}:${dayKey()}`)
  return v ?? 0
}

async function bumpProRuns(customerKey: string): Promise<number> {
  const r = getRedis()
  if (!r) return 0
  const k = `pro:${customerKey}:${dayKey()}`
  const total = await r.incr(k)
  await r.expire(k, 60 * 60 * 36)
  return total
}

// -------- Gate check (pre-call) -------------------------------------------

export type GateResult =
  | { ok: true; tier: Tier; remaining: number; limit: number }
  | { ok: false; reason: GateReason; tier: Tier; remaining: number; limit: number }

export type GateReason =
  | 'anon-limit'
  | 'email-limit'
  | 'pro-limit'
  | 'budget-anon'
  | 'budget-global'

/**
 * Check if the visitor may make a call right now. Does NOT increment any
 * counters — call `recordRun()` after the Anthropic call succeeds.
 */
export async function checkGate(identity: UsageIdentity): Promise<GateResult> {
  const { tier, key } = identity

  // Global budget cap — Pro members get the final $0.50 of headroom.
  const spend = await getDailySpendCents()
  if (tier !== 'pro' && spend >= ANON_CUTOFF_CENTS) {
    return { ok: false, reason: 'budget-anon', tier, remaining: 0, limit: 0 }
  }
  if (spend >= DAILY_BUDGET_CENTS) {
    return { ok: false, reason: 'budget-global', tier, remaining: 0, limit: 0 }
  }

  if (tier === 'anon') {
    const used = await getAnonRunsToday(key)
    const remaining = Math.max(0, ANON_DAILY_LIMIT - used)
    if (remaining <= 0) {
      return { ok: false, reason: 'anon-limit', tier, remaining: 0, limit: ANON_DAILY_LIMIT }
    }
    return { ok: true, tier, remaining, limit: ANON_DAILY_LIMIT }
  }

  if (tier === 'email') {
    const used = await getEmailRunsLifetime(key)
    const remaining = Math.max(0, EMAIL_LIFETIME_LIMIT - used)
    if (remaining <= 0) {
      return { ok: false, reason: 'email-limit', tier, remaining: 0, limit: EMAIL_LIFETIME_LIMIT }
    }
    return { ok: true, tier, remaining, limit: EMAIL_LIFETIME_LIMIT }
  }

  // tier === 'pro'
  const used = await getProRunsToday(key)
  const remaining = Math.max(0, PRO_DAILY_LIMIT - used)
  if (remaining <= 0) {
    return { ok: false, reason: 'pro-limit', tier, remaining: 0, limit: PRO_DAILY_LIMIT }
  }
  return { ok: true, tier, remaining, limit: PRO_DAILY_LIMIT }
}

/**
 * Record a successful run. Increments the tier counter AND the global
 * cost counter. Call AFTER the Anthropic call succeeds so failures don't
 * count against the user's quota.
 */
export async function recordRun(
  identity: UsageIdentity,
  costCents: number,
): Promise<{ remaining: number; limit: number; spendCents: number }> {
  const { tier, key } = identity
  let count = 0
  let limit = 0
  if (tier === 'anon') {
    count = await bumpAnonRuns(key)
    limit = ANON_DAILY_LIMIT
  } else if (tier === 'email') {
    count = await bumpEmailRuns(key)
    limit = EMAIL_LIFETIME_LIMIT
  } else {
    count = await bumpProRuns(key)
    limit = PRO_DAILY_LIMIT
  }
  const spendCents = await recordSpendCents(costCents)
  return { remaining: Math.max(0, limit - count), limit, spendCents }
}

// -------- Anthropic pricing ------------------------------------------------

/**
 * Compute cost in cents from Anthropic usage block. Prices match the
 * public Anthropic pricing page as of 2026-05. Re-check periodically.
 */
export interface AnthropicUsage {
  input_tokens?: number
  output_tokens?: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
}

const PRICES_PER_M = {
  'claude-sonnet-4-5': { input: 300, output: 1500, cacheWrite: 375, cacheRead: 30 }, // cents per 1M tokens
  'claude-haiku-4-5': { input: 100, output: 500, cacheWrite: 125, cacheRead: 10 },
} as const

export type ModelId = keyof typeof PRICES_PER_M

export function priceUsageCents(model: ModelId, usage: AnthropicUsage): number {
  const p = PRICES_PER_M[model]
  const input = usage.input_tokens ?? 0
  const output = usage.output_tokens ?? 0
  const cacheWrite = usage.cache_creation_input_tokens ?? 0
  const cacheRead = usage.cache_read_input_tokens ?? 0
  const cents =
    (input * p.input + output * p.output + cacheWrite * p.cacheWrite + cacheRead * p.cacheRead) /
    1_000_000
  // Round up — better to over-count than under-count against the budget.
  return Math.max(1, Math.ceil(cents))
}
