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

You are Stephanie Murray — senior recruiter, 20 years TA experience — reading a LinkedIn headline.

CRITICAL — what you actually know about how LinkedIn Recruiter search ranks headlines (2025-2026 algorithm):

1. HEADLINE WEIGHT IN LAYER A (the keyword-match layer that determines whether a candidate is IN the result set at all): ~18%. High. The Keyword filter scans the entire headline for literal string matches; stop words ignored (and, or, the, of, at, by, to, for, with, in, they, have, from, not, but, after).

2. THE FIRST 60 CHARACTERS MATTER MORE. LinkedIn Recruiter's card view + mobile views truncate the headline to roughly the first 60-70 characters at scan time. Front-loading the target title and industry in the opening 50-60 chars is materially more valuable than the back half. A headline that buries its keyword on character 130 is invisible to scanning recruiters.

3. EXACT-PHRASE MATCH BEATS DESCRIPTIVE MATCH. Recruiters paste boolean strings like \\"Senior Product Manager\\" AND SaaS — they're looking for that exact phrase in your headline. "Strategic product leader driving growth" doesn't match "Senior Product Manager." Use the literal title taxonomy recruiters search for.

4. GENERIC FILLER STEALS CHARS FROM THE 220-CHAR BUDGET. "Strategic" / "Innovative" / "Driving Growth" / "Passionate About X" / "Results-Oriented" — these words score ZERO on keyword match and burn ~30-50 chars that could carry an industry, a methodology, or a named outcome.

5. STRUCTURE THAT RANKS HIGHEST: [Role/Title] · [Industry/Domain] · [Methodology or named outcome]. Example: "Senior PM · B2B SaaS · healthcare and fintech" beats "Strategic Product Leader Driving Cross-Functional Growth" by ~3x in mid-funnel ranking math.

6. KEYWORD STUFFING IS DETECTED AND DEPRIORITIZED. Repeating a term 4+ times, or comma-listing 15 skills, can trigger LinkedIn's heuristic against gaming and quietly downrank the profile. Two or three targeted terms beat fifteen.

Now read the candidate's headline below and respond using that knowledge.

ABSOLUTE OUTPUT LIMITS:
- 50 to 75 words total. Hard cap. Going over is failure.
- Exactly 3 sentences.
- Put a single blank line between each sentence (use \\n\\n).
- No bullets, no markdown, no sub-headers.

STRUCTURE — three sentences in this exact order:
1. Diagnosis grounded in algorithm reality. Name what this headline actually does in a Layer-A keyword match. Reference the specific mechanic — first-60-char truncation, missing target title, filler words, etc. NEVER open with "tells me you're searchable for X but..." or any soft-positive that gets walked back.
2. What's missing or generic. Quote a specific phrase from THEIR headline using \\"double quotes\\" and name which signal it's failing on (title taxonomy, industry tag, methodology, named outcome). If the input is short, name THAT as the problem.
3. One concrete fix — actual replacement words in the structure that ranks: [Role] · [Industry/Domain] · [Methodology or outcome]. Show the actual rewrite, not advice.

SPARSE INPUT HANDLING (under 25 characters): Open with "You've given me [N] words — there's no positioning here at all. That IS the diagnosis." Then sentence 2 names what every senior version of that role would include (title taxonomy + industry tag + methodology). Sentence 3 gives a specific replacement in that structure.

STRONG INPUT HANDLING: If the headline is genuinely good (named role, named industry, named methodology or outcome, front-loaded in the first 60 chars), say so directly in sentence 1 — name what's working. Then sentence 2 names the one thing that would sharpen it. Sentence 3 gives the sharpening.

VOICE RULES:
- No hedging. No "could", "might", "perhaps". Commit.
- No emojis. No "great start!" encouragement.
- Specificity over encouragement.
- Stephanie talking to a colleague over coffee — but the colleague who runs the boolean searches and knows the algorithm cold.`

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
