# Claude instructions for hiring.productions

**Required reading before any work on this project:**

1. **[PLATFORM-VISION.md](PLATFORM-VISION.md)** — the strategic anchor. The platform vision (job-search OS), the 3-stage roadmap, the behavioral framework, the decision filter for new features, the visual direction (light/warm palette pivot), the moat we will not dilute. On platform/strategy questions, this file overrides this one.
2. **[BRAND.md](BRAND.md)** — voice and visual identity tokens. Read before writing any user-facing copy, naming any tool, or making visual decisions.

This file (CLAUDE.md) is the short version — the operating rules that apply to every change.

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
- **Bilateral access IS the wedge.** Pro ($14.99/mo or $99/yr — save 45%) unlocks BOTH candidate-side tools AND hiring-team tools — there is no "candidate Pro" or "hiring Pro" tier. Any copy describing Pro must make this visible. A candidate gets to see exactly how recruiters source, screen, and decide. A hiring team gets to see what their applicants run their resume through. Use the phrase "both sides of the table" or equivalent. Never describe Pro as "candidate tools" or "hiring tools" alone. **Pricing reframe (May 2026):** the old $20/year was undervalued and signaled "side project" rather than "serious recruiting intelligence." New pricing positions the product against career coaches and Jobscan — less than one hour of coaching, less than Jobscan charges for one day.
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

## The five design rules — applied to every section, every page

These are load-bearing. Established May 2026 after the site felt busy
and hard to read. Linear / Notion / Stripe / Anthropic / Apple all
follow the same five rules. Before designing or editing anything,
re-read these.

1. **One focal point per section.** Write down, BEFORE designing,
   what the one thing the eye should land on is. Everything else
   supports. If two elements compete for that role, cut one or
   shrink one. No section has two equal-weight visuals.

2. **Whitespace is content.** Sections breathe with 96-160px of
   vertical padding (`clamp(96px, 12vw, 160px)`). Cards have 32px+
   interior padding. Adjacent elements have 24-48px between them.
   Whitespace is what makes a site feel premium — not what makes it
   feel empty. Generous whitespace > tight layout, always.

3. **Restraint with color.** Three colors load-bearing: indigo
   `#6C47FF`, coral `#FF4F6A`, the indigo→coral gradient, plus
   lavender `#A78BFA` for ambient accents. Success green `#5EE6A8`
   is allowed for semantic success states only. NO additional
   accent colors. The whole page should be readable in greyscale —
   color only marks the most important moments.

4. **Type does the work; chrome doesn't.** Hierarchy is established
   by SIZE alone. 56-72px for hero headings. 32-42px for section
   titles. 17-19px for body. 12-14px for captions. No tinted
   background cards, no bordered pills, no eyebrow labels everywhere.
   If a border doesn't earn its place by separating distinct
   entities, it doesn't get one. Decorative chrome is cut.

5. **One CTA per moment.** Every section has zero or one buttons.
   Two buttons compete for the visitor's attention — split it and
   you lose both. The visitor's attention is the scarcest resource
   on the page; spend it on a single ask.

**Plus one content rule:** write the conclusion. Strip the
explanation. Instead of "First six seconds: I notice X, Y, Z, then
she stays..." just write what you'd say if someone asked for the
one-line verdict. People who want depth will click in.

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
