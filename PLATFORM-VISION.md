# PLATFORM-VISION.md

**Status:** APPROVED 2026-05-25. Active strategic anchor.
**Owner:** Stephanie Murray. Claude proposes; Stephanie approves.
**Precedence:** On platform/strategy questions, this file overrides `CLAUDE.md`. `BRAND.md` still owns visual identity tokens. `CLAUDE.md` still owns voice + tech rules.

---

## What hiring.productions is becoming

Today, hiring.productions is positioned as editorial — a visitor gets a "moment of recognition" from a single tool and leaves. The ceiling on that business is fixed: people don't read editorial twice.

The platform vision is operational: a guided job-search operating system for candidates in moments of pain (post-layoff, post-pivot, post-frustration with a stalled search). Persistent data. Daily-active behavior. Visible progress toward "desirable on the market." Voice-led, recruiter-authored, bilaterally informed.

This is a different company than what's live today. It's a better one.

---

## The strategic shape

**The wedge stays the wedge.** A cold visitor lands, gets a free moment of recognition (live LinkedIn headline read, resume AI check, JD decoder), feels the brand. That hooks them in 30 seconds.

**The platform is what they stay for.** Once inside, the experience is a persistent, structured job-search system — their data, their progress, their next step always visible. They return daily. They build artifacts over weeks. They invest enough that they don't migrate.

**The pricing follows the value.**

- **Free** — the diagnostic tools (3–5 of them). Stays free forever. Generates demand.
- **Tools — $14.99/mo or $99/yr** — all individual tools, including current Pro tools. The current pricing holds. Grandfathered for existing customers.
- **Platform — $29–49/mo** (price TBD, test with research) — the full job-search OS. Persistence, progress bar, multi-role tracker, networking templates, interview transcription, weekly nudges, shareable milestones.

Existing $14.99 customers are not auto-migrated. They keep their price as long as they hold the subscription. Punishing early adopters destroys word of mouth.

---

## Why this is defensible (the moat)

Comparable products exist: Teal (~$15/mo, raised $7M, ~250K users), Huntr (~$10–15/mo, application tracking), JobScan ($49/mo, narrower scope). All three are generic. Three things make hiring.productions different — and these are non-negotiable in every feature we build:

1. **A recruiter's voice across every artifact.** No saved item is generic CRUD. Every tool result, every saved draft, every dashboard cell comes WITH Stephanie's recruiter take. The voice is the moat. Without it, this is Teal.
2. **Bilateral context everywhere.** Every candidate-facing artifact shows what the hiring side does/sees. "You sent 10 outreach messages — here are the 3 a recruiter would actually open" beats "you sent 10 messages" ten times out of ten.
3. **The moment-of-recognition onramp.** Generic products have generic landing pages. We have the live LinkedIn headline read. That's the funnel. Don't dilute it.

If a feature can be shipped in a way indistinguishable from Teal's version, it does not ship.

---

## The 3 stages

### Stage 1: Persistence (4–6 weeks)

The minimum durable footprint that creates return-visit behavior. Ships:

- Magic-link sign-in via Resend (no passwords, low friction)
- One first-class saved artifact: **target role list** (1–3 roles + variations)
- Target roles auto-populate every existing tool — visitor doesn't re-enter the same info three times
- Every tool result automatically saves to "My Insights" — returning visitor sees their history
- A minimal dashboard with three blocks: target roles, latest insights, next suggested step

**Behavioral mechanisms served:** endowment effect (saved data they won't abandon), sunk cost (returning to use what they invested in), friction reduction (no re-entry of target role across tools).

**Gate to Stage 2:** Don't ship Stage 2 until Stage 1's return-visit metrics validate the model. If users sign in once and never come back, the platform vision needs revision before more is built on top.

### Stage 2: Progress (weeks 6–12)

Defines what "desirable on the market" means as a measurable journey. Ships:

- 7–10 "Steps to Desirable" — each maps to an existing or planned tool
- **Endowed progress:** every new account starts at 2/8 complete (Nunes & Drèze 2006 showed pre-stamping 2-of-10 nearly doubled completion rate vs. 0-of-8)
- Each step completion advances the bar and unlocks a Stephanie-voice annotation explaining what that step does for recruiter visibility
- Email nudge when a step has been stalled 7+ days (Zeigarnik open-loops in the inbox)

**Behavioral mechanisms served:** goal gradient (motivation increases with visible progress), Zeigarnik (incomplete tasks occupy mental space), identity reframing ("running a search" instead of "unemployed"), mere measurement (tracked behavior increases).

### Stage 3: Pro features (weeks 12+)

Justifies the $29–49/mo tier. Ships:

- Interview transcription + AI-generated follow-up question writer
- Networking outreach drafts saved per recruiter type + per role
- Multiple-role tracker with status per role (applied → screening → interview → offer)
- Weekly check-in email summarizing progress and suggesting next move
- Shareable progress milestones ("I just hit step 6 of 8") — viral mechanism

**Behavioral mechanisms served:** behavioral activation (structured small actions in a depressed population — Paul & Moser 2009 meta-analysis showed 34% depression prevalence in unemployed vs 16% employed), variable reinforcement (recruiter responses are unpredictable rewards), social proof (shareable milestones).

---

## The behavioral framework

**Rule: a feature that doesn't serve a documented behavioral mechanism doesn't ship.**

The mechanisms in play across the platform:

1. **Goal Gradient Effect** — Hull (1932); Kivetz, Urminsky, Zheng (2006), *Journal of Marketing Research*. Motivation increases as visible progress approaches goal. Served by the progress bar, milestone notifications.
2. **Endowed Progress Effect** — Nunes & Drèze (2006), *Journal of Consumer Research*. Pre-completing initial steps measurably increases completion rate. Served by starting new accounts at 2/8 (target role saved + first tool run).
3. **Zeigarnik Effect** — Zeigarnik (1927). Incomplete tasks occupy disproportionate mental space. Served by dashboard surfacing stalled steps, email nudges on incomplete loops.
4. **Behavioral Activation** — CBT literature; Paul & Moser (2009), *Journal of Vocational Behavior*, showing 34% depression prevalence in unemployed adults vs. 16% in employed. The evidence-based intervention is structured small actions with measurable progress. Served by every "Step to Desirable" being small, concrete, immediately doable.
5. **Identity Reframing** — Markus & Nurius (1986), *American Psychologist*, "Possible Selves." Agency-restoring language reduces learned helplessness. Served by "your system, your roles, your progress" framing across the platform.
6. **Endowment Effect / Sunk Cost** — Thaler. Saved data creates switching costs. Served by persistence of target roles, drafts, transcripts, insights.
7. **Mere Measurement Effect** — Morwitz, Johnson, Schmittlein (1993), *Journal of Consumer Research*. Tracking behavior changes behavior. Served by visible metrics on outreach sent, interviews scheduled, application status.
8. **Variable Reinforcement** — Skinner. Unpredictable rewards drive engagement. Served by surfacing recruiter response events when they happen.

The brand frame ("pull back the curtain") also serves a 9th mechanism:

9. **Bypassing Identity-Protective Cognition** — candidates resist feedback that threatens self-concept. Voyeurism framing (you're looking BACKSTAGE, not receiving feedback) bypasses the defense. This is the onramp into all of the above.

---

## The metaphor

Production / theater stays. It scales naturally from editorial to platform:

- **Audition** — your LinkedIn (the reel recruiters scan first)
- **Casting call** — the job description (what they're actually casting for)
- **Rehearsal** — interview practice + transcription
- **The room** — the active interview
- **Debrief** — post-interview follow-up
- **Closing scene** — offer negotiation
- **Your reel** — RepVera (the lasting artifact)

**Old framing:** "Pull back the dark curtain — peek backstage." (voyeuristic, dim, editorial)

**New framing:** "The room is open. Let's run your production." (working, lit, operational)

Same metaphor, different act. Dark theme was the trailer. Light theme is the show. Don't drop production language — extend it through every new feature.

---

## The visual direction

The site is moving from dark-mode editorial to light-mode operational. Wellfound, Cal.com, Anthropic, Linear, Notion all live in this space. The shift is principled, not aesthetic:

- Daily-active products live in light. Editorial products live in dark. We're becoming the former. Buchner & Baumgartner (2007) and follow-up studies on dashboard fatigue show dark mode is excellent for focused viewing but cognitively heavier for scanning/skimming patterns sustained over weeks.
- The result pages (`resume-report.tsx`, `linkedin-report.tsx`) are ALREADY light-themed. Unifying to light fixes an existing inconsistency — visitors today get a confusing dark→light→dark experience.
- The brand voice (direct, dry-funny, conversational) reads more like a notebook over coffee on a light bg than a stage whisper on a dark one.

### Palette

| Role | Color | Notes |
|---|---|---|
| Background | `#FAF8F3` (warm cream) | Wellfound/Anthropic/Cal.com pattern. Lower anxiety than pure white. Reduces eye strain over weeks of daily use. |
| Card surface | `#FFFFFF` with subtle shadow | Distinct from background, signals "active surface" |
| Primary text | `#1A1A22` | Already in the system. Near-black, not pure black — softer on the eye |
| Secondary text | `#5A5A6E` | Already in the reports. Body copy, captions |
| Border | `#ECECF2` | Already in the reports. Almost-invisible separation |
| Indigo (candidate) | `#6C47FF` | Unchanged. Pops MORE on light backgrounds |
| Coral (hiring) | `#FF4F6A` | Unchanged. Same logic |
| Success / progress | `#1F8A55` | The platform's motivational color — progress complete, step done, rubric checkmark. More visible on a light platform. |
| Gradient (rare moments) | indigo → coral | Reserved for hero accents and progress-complete states |

This is the same palette as today, plus elevating success-green from semantic-only to a load-bearing platform color. Brand DNA unchanged; canvas changes.

### Typography (unchanged)

- Figtree, 900 weight at large sizes for hero headings
- Hierarchy through size, never through chrome
- Generous line-height (≥1.5) for body — light-bg readability

### Motion

- Subtle hover lifts (translateY -2px, never more)
- Gentle fade-ins on dashboard updates
- Progress bar fills with easing, never instant snap
- Never decorative motion — only motion that signals state change

---

## What stays consistent from current brand

- The five design rules (one focal point per section; whitespace is content; restraint with color; type does the work; one CTA per moment) — these apply BETTER on light backgrounds
- The brand voice (Stephanie talking to a colleague over coffee — direct, specific, dry-funny, no emojis, no hedging, no made-up stats)
- Figtree typography
- Indigo + coral + lavender palette accents
- The production metaphor
- The bilateral wedge (every candidate artifact implies the hiring side)
- The result-page annotation pattern (every section has a "why this matters" in Stephanie's voice)
- Pro tier called "Recruiter Insights" — never "inside looks"
- Free tools stay free forever

---

## What we will NOT dilute

If we lose any of these, we become Teal:

1. **Voice on every saved artifact.** No generic CRUD. Every dashboard cell, every saved draft, every metric comes with Stephanie's recruiter take. If a screen could ship as-is on Teal, it ships differently here.
2. **Bilateral context.** Every candidate-facing feature shows what the hiring side does/sees. Network outreach drafts come with "here's what makes a recruiter open this." Application tracking shows "here's where this stalls in real ATS queues."
3. **Specificity over encouragement.** No "you're doing great." Every interaction is direct, specific, dry. Encouragement is what coaching ($150–300/hr) offers and what people pay coaches to overcome.
4. **The moment-of-recognition onramp.** The free wedge tools (live headline read, AI resume check, JD decoder, ghost-detect, what's-breaking-search) stay free forever. They are the funnel. Don't gate them.

---

## Decision filter — when to ship vs. skip

For any proposed feature, ALL five must be yes:

1. **Does it serve a documented behavioral mechanism?** (one of the nine above)
2. **Does it preserve voice, bilateral context, and specificity?**
3. **Does it advance Stage 1, 2, or 3?** (or is it foundational infrastructure for one of them)
4. **Does it avoid building Teal-like generic functionality?** (or if it's similar to a generic feature, does it bake in voice/bilateral context)
5. **Does it create return-visit behavior or compound on existing data?**

If any answer is no, the feature is reshaped, deferred, or skipped.

---

## Distribution model — how growth changes

The current distribution model depends on Stephanie's LinkedIn posts driving traffic. The platform model creates compounding distribution:

- **Daily-active users** → word of mouth (people share progress with friends in similar situations)
- **Email retention loops** — weekly nudges keep the system top-of-mind
- **Shareable artifacts** — progress milestones, "I hit step 6" cards (referencing existing ShareResult infrastructure)
- **Public landing pages per saved target role** — long-tail SEO ("Senior Product Manager — recruiter searches for this role" generates per-role pages indexed by Google)
- **Referral mechanic at milestone completion** — invite a friend who's job hunting; both get a free month

The platform IS the marketing engine once Stage 2 ships. The LinkedIn-post lever stays useful but becomes one of several compounding channels.

---

## Open questions to resolve before/during Stage 1

These are decisions we don't have to lock in until the artifact exists. Listed here so future-Claude doesn't accidentally lock them in by accident:

- **Magic-link sign-in:** do anonymous "guest" users still get free tool runs? Or does sign-in gate the diagnostic tools too? (Recommendation: keep diagnostic tools fully anonymous to preserve the onramp.)
- **Saved insights retention:** how long does free retention last? (Recommendation: forever for paid users, 30 days for free — creates a small upgrade pressure without punishing the visitor.)
- **Target role list size:** 1 role only, or 1–3? (Tradeoff: more choice = more cognitive load and more personalization friction; fewer = thinner targeting.)
- **Progress bar step count:** 7 or 8 or 10? (Working memory caps at ~7±2 — Miller 1956 — so 7–9 is the research-supported range.)
- **Platform tier price:** $29 vs $39 vs $49? (Anchor: Teal at $14.99 charges too little for the scope we're proposing; coaching at $150+/hr too much; sweet spot is testing $29–39.)
- **Email cadence:** weekly nudge feels right; daily would feel like spam, monthly would lose Zeigarnik effect.

---

## Maintenance notes

This file is at the repo root. It is referenced as required reading in `CLAUDE.md`. Future Claude sessions load it automatically.

When this file conflicts with `CLAUDE.md` or `BRAND.md`:

- This file takes precedence on platform/strategy questions.
- `CLAUDE.md` takes precedence on voice and tech rules.
- `BRAND.md` takes precedence on visual identity tokens.

This file should be updated by Stephanie, not by Claude. If Claude proposes an addition or revision, it surfaces it in conversation and waits for explicit approval before editing.
