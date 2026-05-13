# Claude instructions for hiring.productions

**Read [BRAND.md](BRAND.md) before writing any user-facing copy, naming any tool, or making visual decisions.** It is the source of truth.

This file is the short version — the rules that apply to every change.

## What this site is

Hiring.productions pulls back the curtain on hiring. It shows candidates how recruiters actually read resumes, and shows hiring teams how strong candidates actually read job posts. Both sides of the same production, in the open for the first time. Founded by Stephanie Murray — 20 years in talent, Senior Director of TA at Brightside Health.

The product is the moment of recognition: *"Wait. Is this what's been happening the whole time?"*

## Voice rules — apply to every line of copy

- **No emojis.** Not in copy, not in CTAs, not in error states. Anywhere.
- **No fake testimonials.** No invented names, no invented quotes, no fabricated company logos.
- **No made-up stats.** Every number on the site must be sourceable. If it's not, cut it.
- **No hedging.** "Might help you" → "shows you." "Could improve" → "fixes." Commit to the claim.
- **Specificity over encouragement.** Don't soften the truth to make people feel better. The directness is the value.
- **Both sides over either side.** Every candidate-facing piece should imply the hiring side exists, and vice versa. That bilateral perspective is what nobody else has.
- **Bilateral access IS the wedge.** The $20 Pro membership unlocks BOTH candidate-side tools AND hiring-team tools — there is no "candidate Pro" or "hiring Pro" tier. Any copy describing Pro must make this visible. A candidate paying $20 gets to see exactly how recruiters source, screen, and decide. A hiring team paying $20 gets to see what their applicants run their resume through. Use the phrase "both sides of the table" or equivalent. Never describe Pro as "candidate tools" or "hiring tools" alone.
- **Tool names are questions the user is already asking.** "Would a recruiter even find you?" not "LinkedIn Visibility Optimizer."
- **Never hardcode tool counts in marketing copy.** "Five Recruiter Insights" goes out of date the moment we ship a sixth. Use "the whole production" / "every Recruiter Insight" / "all your Recruiter Insights" instead. The only place a count is allowed is a list/grid where the number is derived from the catalog at render time.
- **The voice is Stephanie talking to a colleague over coffee.** Direct. Specific. Occasionally dry-funny. Never performing expertise — just having it.
- **Product naming.** The Pro tier is called **"Recruiter Insights"** (capitalized as a product name) — never "inside looks." The unit users get is an **"insight"** (lowercase when descriptive: "3 free insights today"). The umbrella for the whole subscription remains **"the whole production."** Free tools are just **"free tools."**

## Phrases that define the voice (use these patterns, not the ones on the right)

- "See how the other side actually operates" — not "learn helpful tips"
- "The internal monologue of a recruiter" — not "resume feedback"
- "What this job actually is" — not "job description analysis"
- "Is this even a real candidate?" — not "AI detection tool"
- "What's breaking your search" — not "job search optimization"

## The metaphor — production / theater

Use it consistently, never force it:

- Interview = audition
- Practice space = the Rehearsal Room
- Recruiter Insights = backstage pass
- RepVera = your reel
- Job description = casting call

If it doesn't fit naturally, drop it. Forcing the metaphor breaks the brand.

## Visual rules

- **Dark backgrounds** — backstage feeling. Not because dark is trendy.
- **Figtree** — chunky, rounded, 900 weight at large sizes for headers.
- **The palette is small and load-bearing:**
  - **Electric indigo `#6C47FF`** — candidate-side primary, the user's own work
  - **Hot coral `#FF4F6A`** — hiring-team-side primary, the other side of the table, also the "required field empty" warning
  - **Lavender `#A78BFA`** — ambient accent, eyebrows, tier badges, quoted-phrase highlights, secondary text
  - **The indigo→coral gradient** appears only on primary CTAs, flagship Pro flourishes, hero headline color spans, and the closing-section moment. Restraint makes the moments where they combine feel like something.
  - **Success green `#5EE6A8`** is allowed ONLY for semantic success states — form-field filled, PDF parsed, signed-in confirmation, ✓ rubric marks. Never as decoration, never as a theme on a card, never in marketing copy.
- **No per-category theme colors** on tool cards. Audience drives the theme: indigo for candidate, coral for hiring. The data model is in `lib/tool-themes.ts` and is derived from `tool.audience`, not from a separate `theme` field.
- No stock illustrations of people in suits shaking hands. No abstract gradients of generic cool tones. The visual identity is its own category.

## When generating new content

1. Start by re-reading the relevant section of BRAND.md.
2. Pick the one sentence that the page/component is really saying. Write that first.
3. Cut everything that softens it.
4. Sanity check against voice rules above.

## Technical notes

- Next.js 16 + React 19 + Tailwind 4, pnpm-managed.
- Stripe checkout in `app/api/stripe/`. Anthropic-powered tools in `app/api/tool/`.
- Env vars live in `.env.local` (git-ignored). Required: `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Currently deployed via v0 → Vercel. Plan: cut over to this GitHub repo when site is advertise-ready.
