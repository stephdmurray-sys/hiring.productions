import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/lib/event-log'
import {
  getDailySpendCents,
  recordRun,
  priceUsageCents,
  DAILY_BUDGET_CENTS,
  type AnthropicUsage,
} from '@/lib/usage'

export const runtime = 'nodejs'

/**
 * /api/quick-read — the homepage live widget.
 *
 * Visitor pastes a LinkedIn headline. The endpoint returns a 2-3 line
 * recruiter take in Stephanie's voice within ~3 seconds. The first
 * interaction with hiring.productions is the product itself, not a
 * marketing pitch.
 *
 * Cost shape: Haiku 4.5, ~150 input tokens + ~80 output tokens per call.
 * Roughly $0.002 per run. The site-wide $5/day spend cap protects us
 * if traffic spikes; no per-user gate beyond the global ceiling.
 *
 * No identity required. The widget is a taste, not a tool — anon visitors
 * get full access to the quick read so they can experience the voice
 * before deciding to use any deeper tool.
 */

const SYSTEM_PROMPT = `Today's date is ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.

You are a senior recruiter (20 years TA experience, Stephanie Murray's voice) reading a LinkedIn headline. The candidate's headline is below.

Respond in EXACTLY 2-3 sentences. NO bullets, NO markdown, NO sub-headers — just the read, in plain text. Total 50-80 words.

Structure:
1. What does the headline signal to a recruiter doing a boolean search for this person? (one sentence — be specific)
2. What's missing or generic, with a phrase quoted from THEIR headline? (one sentence)
3. One concrete fix — actual words to add or remove. (one sentence)

Rules:
- Quote SPECIFIC phrases from their actual headline.
- Be direct. No hedging ("might" / "could" / "perhaps"). Commit to the read.
- No emojis. No "great start!" encouragement.
- If the headline is genuinely strong, say so directly — name what's working.
- If it's bad, name what's bad. Don't soften.
- Voice: Stephanie talking to a colleague over coffee. Specific, occasionally dry.`

const MAX_HEADLINE_LENGTH = 240
const MIN_HEADLINE_LENGTH = 8

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headline = String(body?.headline ?? '').trim()

    if (headline.length < MIN_HEADLINE_LENGTH) {
      return NextResponse.json(
        { error: 'too-short', message: 'Paste your full LinkedIn headline.' },
        { status: 400 },
      )
    }
    if (headline.length > MAX_HEADLINE_LENGTH) {
      return NextResponse.json(
        { error: 'too-long', message: 'LinkedIn headlines max out at 220 characters. Shorten and try again.' },
        { status: 400 },
      )
    }

    // Site-wide daily spend protection. If we're at the ceiling, fall
    // back to a graceful message rather than blowing past budget.
    const spendCents = await getDailySpendCents()
    if (spendCents >= DAILY_BUDGET_CENTS) {
      return NextResponse.json(
        {
          error: 'budget',
          message: "We've hit today's reading capacity. Try again tomorrow, or run the full Recruiter Read on your resume.",
        },
        { status: 429 },
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'config' }, { status: 503 })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 200,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: `Headline:\n${headline}` }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[quick-read] Anthropic error:', errorText)
      return NextResponse.json(
        { error: 'upstream', message: 'Couldn’t generate a read right now. Try again in a moment.' },
        { status: 502 },
      )
    }

    const data = await response.json()
    const read = String(data?.content?.[0]?.text ?? '').trim()
    const usage = (data?.usage ?? {}) as AnthropicUsage
    const costCents = priceUsageCents('claude-haiku-4-5', usage)

    // Use a minimal anon-identity for spend accounting. Quick-read uses the
    // global spend ceiling but doesn't count against per-visitor tool gates.
    await recordRun({ tier: 'anon', key: `quick-read:${Date.now()}` }, costCents)

    void logEvent('tool_run_success', {
      toolId: 'quick-read',
      tier: 'anon',
      costCents,
    })

    return NextResponse.json({ read })
  } catch (error) {
    console.error('[quick-read] error:', error)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
