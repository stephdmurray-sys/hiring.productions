/**
 * Server-side event log — the operational pulse of hiring.productions.
 *
 * Wraps Upstash Redis with a tiny append-and-aggregate API. Every
 * meaningful event in the funnel (tool runs, email captures, paywall
 * opens, checkout starts) writes a JSON blob to a single sorted set
 * keyed by timestamp. The /api/admin/stats endpoint reads a time
 * range, aggregates client-side, and returns a CTO-shaped snapshot
 * (funnel counts, by-day breakdown, by-tool breakdown, spend totals,
 * recent errors).
 *
 * Why one sorted set rather than separate keys per event type:
 *   - 30 days of moderate traffic (~500 events/day) is ~15k events
 *     which fits comfortably in a single ZRANGEBYSCORE call.
 *   - Aggregations stay in app code, easy to extend without schema
 *     migrations on Redis.
 *   - Auto-cleanup is one ZREMRANGEBYSCORE per write.
 *
 * If we ever cross thousands of events per day this becomes too
 * chunky and we'd shard by day or by type. Not today.
 *
 * Graceful degrade: if Redis env vars are missing or the call
 * throws, logEvent silently drops the event. Observability is
 * nice-to-have, never load-bearing.
 */

import { Redis } from '@upstash/redis'

export type EventType =
  | 'page_view'
  | 'tool_run_attempt'
  | 'tool_run_success'
  | 'tool_run_blocked'
  | 'email_capture'
  | 'paywall_open'
  | 'checkout_start'
  | 'payment_success'
  | 'pdf_rejected'
  | 'error'

export interface EventPayload {
  /** Tool involved, if any (e.g. "recruiter-search-rank"). */
  toolId?: string
  /** Identity tier at the time of the event ("anon" | "email" | "pro"). */
  tier?: string
  /** Reason for a blocked run ("anon-limit" | "pro-required" | "budget-anon" | ...). */
  reason?: string
  /** Source label for email captures or paywall opens. */
  source?: string
  /** Cost in cents for tool runs (input + output token spend). */
  costCents?: number
  /** Free-form additional context. Keep it small — every byte hits Redis. */
  meta?: Record<string, string | number | boolean>
}

export interface LoggedEvent extends EventPayload {
  type: EventType
  ts: number
}

const EVENTS_KEY = 'events:log'
const RETENTION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

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

  if (!url || !token) return null
  _redis = new Redis({ url, token })
  return _redis
}

/**
 * Append an event to the log. Never throws — failures log a warning
 * and the calling request continues unaffected.
 */
export async function logEvent(type: EventType, payload: EventPayload = {}): Promise<void> {
  const r = getRedis()
  if (!r) return
  const event: LoggedEvent = { type, ts: Date.now(), ...payload }
  try {
    // Sorted set, ZADD with timestamp as score. The member string contains
    // the full JSON of the event including the timestamp; deduping isn't a
    // concern at this volume so we don't need an event ID.
    await r.zadd(EVENTS_KEY, { score: event.ts, member: JSON.stringify(event) })
    // Trim anything older than the retention window. Cheap and self-healing.
    await r.zremrangebyscore(EVENTS_KEY, 0, Date.now() - RETENTION_MS)
  } catch (err) {
    console.warn('[event-log] write failed:', err)
  }
}

/**
 * Read events in a time range, returning the parsed JSON entries.
 * Order is ascending by timestamp.
 */
export async function readEvents(sinceMs: number, untilMs: number = Date.now()): Promise<LoggedEvent[]> {
  const r = getRedis()
  if (!r) return []
  try {
    // zrange with byScore returns strings; parse each one back.
    const raw = await r.zrange<string[]>(EVENTS_KEY, sinceMs, untilMs, { byScore: true })
    return raw
      .map((s) => {
        try {
          return JSON.parse(s) as LoggedEvent
        } catch {
          return null
        }
      })
      .filter((x): x is LoggedEvent => x !== null)
  } catch (err) {
    console.warn('[event-log] read failed:', err)
    return []
  }
}
