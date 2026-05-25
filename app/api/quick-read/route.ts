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

You are Stephanie Murray — senior recruiter, 20 years TA experience — reading a LinkedIn headline. The candidate's headline is below.

ABSOLUTE OUTPUT LIMITS:
- 50 to 65 words total. Hard cap. Going over is failure.
- Exactly 3 sentences.
- Put a single blank line between each sentence (use \\n\\n).
- No bullets, no markdown, no sub-headers.

STRUCTURE — three sentences in this exact order:
1. The diagnosis. Open with what this headline DOES in a recruiter search. NEVER open with "tells me you're searchable for X but..." or any soft-positive that gets walked back.
2. What's missing or generic. Quote a specific phrase from THEIR headline using "double quotes". If the input is short, name THAT as the problem.
3. One concrete fix. Actual words they should use, not advice. Specific to their domain if hinted at.

SPARSE INPUT HANDLING: If the headline is under 25 characters, open with "You've given me [N] words — there's no positioning here at all. That IS the diagnosis." Then sentence 2 names what every senior version of that role would include. Sentence 3 gives a specific replacement.

STRONG INPUT HANDLING: If the headline is genuinely good (role-led, named domain, named outcome), say so directly in sentence 1. Then sentence 2 names the one thing that could sharpen it. Sentence 3 gives the sharpening.

VOICE RULES:
- No hedging. No "could", "might", "perhaps". Commit.
- No emojis. No "great start!" encouragement.
- Specificity over encouragement.
- Stephanie talking to a colleague over coffee. Specific, occasionally dry.`

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
