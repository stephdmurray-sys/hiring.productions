# DESIGN.md: the review site's design system

Applies to the review site (the `app/(rebrand)/` pages). Read it before building or restyling any page. It exists because sites drift, either back to generic AI-looking defaults or into a bland wall of text, unless the decisions are written down. Tokens live in `app/(rebrand)/_components/site-css.ts`; the shared pieces are in the same folder.

## The idea: the stage

hiring.productions shows both sides of the table, so the page literally does: indigo is the job seeker's side, coral is the hiring team's side, and every tool shows up as its real logo. Color and logos make it feel alive. The evidence stays disciplined: every number is dated, sourced, and set in a real table or scoreboard.

History: Nov 2026 moved from a gradient-heavy first redesign (looked AI-made), to a gray "evidence desk" (looked dead), to this. Founder direction: "Logos are everything. Make it feel alive, not dead." She chose mockups B (Both sides) and C (Scoreboard).

## Tokens

| Token | Value | Use |
|---|---|---|
| Paper | `#FAF8F3` | Page background |
| Surface | `#FFFFFF` | Cards, scoreboard, calculator, tables |
| Ink | `#1A1A22` | Text, default buttons, the ticker |
| Ink 2 / Ink 3 | `#4A4A5A` / `#6E6E80` | Body copy / captions |
| Indigo | `#6C47FF` (text `#5432E0`) | Job seeker side: nav bar, seeker panel and hub hero, score bars, Stephanie's pick card |
| Indigo ink | `#211457` | The backstage band (publisher logos) and the footer |
| Coral | `#FF4F6A` (text `#C42E48`, on-coral text `#2A0B14`) | Hiring side panel and hub hero, hiring score bars, and billing traps |
| Green | `#1F8A55` / `#5EE6A8` | Semantic only: "Counts", a completed step, success |
| Type | Figtree, 900 for display | Hero H1 up to 84px, section H2 `clamp(40px,6vw,64px)` minimum |
| Figures | system monospace | Datelines, "checked" stamps, the ticker |
| Radius | 8px buttons, 14px cards and panels | |

## Components (all in `app/(rebrand)/_components/`)

- **Logo** (`logo.tsx`): the real logo on a white tile with a lettermark underneath. Use it everywhere a tool or publisher is named. Logos load in the visitor's browser (in the build sandbox they show as letters).
- **Both-sides split** (homepage): an indigo half and a coral half, each with logos, one featured pick and one button.
- **Ticker**: one ink strip of this month's findings, pauses on hover, still for reduced motion.
- **Scoreboard** (`scoreboard.tsx`): rank, logo, name, publisher logos for the lists that name it, a bar that fills on load, the score. Every score is public data (users, market, critics, value); hovering splits the bar into those four. Indigo bars for job seeker tools, coral for hiring tools, a coral bar on the seeker board for 4-week billing.
- **Cost calculator** (`cost-calculator.tsx`): drag months, tools re-sort by the cheapest way to pay, with the forget-to-cancel year beside it. Numbers come from `plans` in `lib/evidence/resume-guide.json`.
- **Waiting in the wings** (`rising.tsx`): tools too new to score, set as rows on a board titled "Not scored yet" (an extension of the scoreboard, like a chart's "bubbling under"). Each row shows only evidence it has. Beside it, Stephanie's up-and-coming pick is set like a columnist's note: byline with her photo, one sentence, a link. Data: `lib/evidence/rising.json`.
- **On the rise** (`/on-the-rise`): the whole watch list on one page. Hero question, the board with Stephanie's labeled picks beside it, one alert sign-up, then "Graduated to a score" (the public log of tools that earned a place on a scoreboard) and "How a tool gets here" (the discovery triggers from `discovery.json`, as label-and-note rows in two columns). Never ranked, never paid for, and RepVera never appears here except in the ownership line under the sign-up.
- **Who to follow** (`follow.tsx`): set like a cast list. One row per audience (the best in talent acquisition first, then job seekers), three photo cards per row on desktop, two on tablet, face-beside-text on phones. Each card: the person's own public profile photo (saved in `public/people`, initials in the side color when no confirmed photo exists), a colored vibe word, name, show or company, one line on why, platform links. No follower counts.
- **What should I use?** (`recommender.tsx`, `/what-should-i-use`): the recommender. Questions are plain sentences: the two sides as color blocks, problems as rows on a ruled board, limits as underlined words (the tab rule), must-haves as small checkboxes. Every choice updates the answer in place and the address becomes the answer's link; without JavaScript it is a GET form. The answer leads with a verdict as a section-size heading ("Use Teal."), one white card for the pick (logo, score bar, what it costs you, one button in the side's color), the alternative as a ruled row, then "What the hiring side sees" or "What candidates see" set as a rule-and-type note in the other side's color with its source. Ruled-out tools sit in one collapsed "Why not the others?" row. The answer ends with one quiet "Share this answer" text button (the phone share menu, or copies the link on a computer); never a raw URL in a box. Common questions get permanent pages (`/what-should-i-use/[slug]`). Rules and data: `lib/evidence/recommend.json`.
- **Hiring-team tools** (`/interview-scorecard`, `/hiring-costs`, `/is-this-a-real-candidate`): each named as the question the team is asking. Coral is the side color. The scorecard is a white sheet that prints alone (nav, builder and asks hidden in print). Up to six skills; past six the other boxes lock. The email ask sends it as a PDF to print and an Excel sheet to score five candidates side by side (`lib/scorecard-files.ts`, rebuilt from `scorecard.json` by id). The calculator keeps its result in a sticky white card beside the inputs. Every claim on these pages names its source inline (OPM, SHRM, FBI, Gartner via HR Dive, the vendor's own page).
- **Interview practice** (`/interview-practice`, job seekers, indigo): "What will they ask me in the interview?" Six plain rules of a structured interview, then the job and skills (up to six), then one white card per question: the question, the follow-ups, what a 5, 3 and 1 sound like, and three boxes to plan the answer. Same content as the hiring team's scorecard, from `scorecard.json`, so both sides see the same questions.
- **"From the team behind hiring.productions"**: the only way RepVera appears on a page. An indigo rule with a label, one sentence, one link. Never inside a score, a ranking, a recommendation or a comparison.
- **Homepage:** the "What should you use?" rows follow the split hero, one column per side, each problem linking into the recommender. Stephanie's picks live on the hubs, not the homepage.
- **About Stephanie** (`/about/stephanie`): photo and name as the hero, one big sourced number ("15 days") as the focal point of the results section, her own line from the Transform interview set as a type-only pull quote, the does/never-does lists from `framework.json`, one indigo button to the recommender. Every number cites the Transform winner spotlight.
- **Stack request** (`/consulting`) and **Advertiser disclosure**: rebuilt in the site system (no MockPage). The stack form is one white card beside a ruled "What comes back" list; the ownership disclosure sits under the button.
- **Footer: How ratings work**: the four parts with weights and a one-paragraph summary from `framework.json`, on every page.
- **Pick labels** live on the scoreboard rows ("Best overall", "Small teams pick") in the side's color, not on separate pick cards.
- **Hub hero** (`hub.tsx`): a full block of the side's color carrying every logo that side covers, and one white card titled "Where are you stuck?" listing that side's problems, each linking straight into the recommender. Never a single tool or a personal pick in the hero: picks live lower on the page, labeled.
- **ATS review page** (`/reviews/ats/[slug]`): same layout as a resume tool review, in coral. Score card with the three parts and their sources, what a year costs for 1, 3, 5 and 10 users, G2 and Capterra ratings, the guide's verdict where one exists, labeled videos (`ats-videos.json`), built-in checks on file, one "What should we use?" ask, then the alternatives in the same team-size tier. Data from `lib/ats-profiles.ts`.
- **Comparison page** (`/compare/[pair]`, index at `/compare`): "X or Y?" for every pair of rated tools that compete (checkers with checkers, builders with builders, applicant tracking systems within one team-size tier). Two score cards side by side, "Who wins what" with a colored pill for each winner, "Which one fits you", one video of each, one ask, more comparisons. Every line is computed in `lib/compare.ts` from the same data as the scores; gaps under 0.05 and price gaps under 5% (or $5) are shown as ties. Indigo for job seeker tools, coral for hiring tools.
- **404 page** (`app/not-found.tsx`): same chrome, one question, one button to the recommender.
- **Review page** (`reviews/[tool]`): one per tool. Answers "is it worth it", "is it free", the real cost, who else names it, videos, alternatives and an FAQ with schema.
- **Stance**: words in color. "Agrees with the field" green, "Breaks from the pack" indigo, "Too little evidence" gray italic.

## Motion: it has to show you something

Every movement on the site reveals evidence. None of it is decoration.
- Score bars fill when they scroll into view (`motion.tsx`).
- Hovering a scoreboard row splits its bar into users, market, critics and value, and the line under the name swaps to those numbers.
- Publisher logos fan out on hover so each list is visible.
- Logo tiles show the tool's name and score; list tiles show why a list counts or doesn't.
- In the calculator, rows slide into their new order as you drag.
- Links: the underline drops and the arrow nudges.
- Still banned: hover lifts, scale-ups, glows, parallax, counting-up stat numbers. Everything respects reduced motion.

### The 80s layer (Stephanie's call, Nov 14, 2026)

The one place motion is allowed to be playful: the "Where are you stuck?" box on both hubs (`_components/retro.tsx`). A tilted "Start here" sticker pops in, a hand-drawn arrow draws itself to the box and keeps nudging toward it, and Memphis shapes (squiggle and dot grid at the top-right corner, zigzag at the bottom-right) peek out from behind the box and drift. Every shape is anchored to a corner of the box; nothing floats loose. Hard ink outlines and offset shadows, never soft blurs or glows. Palette only: coral sticker and white arrow on indigo, indigo sticker and ink arrow on coral. On phones the box moves up to sit right after the intro. Reduced motion: everything holds still, arrow fully drawn.

Homepage (same layer, `retro.tsx`): the two lanes are separate cards with a gap, each with the thick ink outline and hard shadow. Shapes sit only at each lane's outer corners and mirror each other: dot grid top-left and zigzag bottom-left on the job seeker lane, squiggle top-right and dot grid bottom-right on the hiring lane. On phones the zigzag and squiggle meet in the gap between the stacked lanes. "everyone" in the headline gets a coral hand-drawn underline that draws once. Buttons, side labels and logo tiles use the same ink outline and offset shadow; buttons press in on hover.

### Movement that pulls a visitor forward (engagement review, Nov 14, 2026)

- Sections and cards below the first screen ease in as they scroll into view, a few at a time (`motion.tsx`, `.rv-hide` and `.rv-show` in `chromeCss`). Nothing on the first screen is ever hidden, nothing is hidden without scripts, and reduced motion shows everything still.
- Each picker question brings its answer cards in one after another, and a card's arrow slides toward the next step on hover.
- The arrow on the hero "Help me choose" buttons nudges every few seconds, the only repeating motion on the homepage.

### Length and words (engagement review, Nov 14, 2026)

- One idea per section and one short lead line under each heading. If a lead runs past about 25 words, cut it.
- Long reference material (research tables, source lists, schedules, extra videos) goes behind a "See ..." fold, open on one tap. The essentials stay open.
- The picker never repeats what a visitor has just answered: after the guided questions it shows one summary line and only the next question; under an answer, nothing but the answer.
- Phones get 72px between sections instead of 96px.

## Rules that keep color from turning into slop

- Color marks a side or a fact. Indigo means job seeker, coral means hiring team or "this costs you". Never decoration.
- No gradients, glows, glass blur or neon-on-black. Flat color blocks only. The one pattern allowed is the hatched "if you forget to cancel" bar, because it means something.
- One CTA per section. The split hero is the exception: one per side.
- No uppercase letter-spaced eyebrow labels, no pill badges, no hover lifts, no pulsing dots, no tilted card stacks, no rows of giant stat numbers.
- Cards hold real evidence (a logo, a score, a source). Never a card for an icon and a slogan.
- A list is rows on a ruled board, never a grid of identical cards (2x2, 3-up). If the content would read fine as a table, it's rows.
- No accent-trimmed cards: no colored strip along the top or left edge of a box.
- No testimonial cards: no round avatar plus quote in curly marks plus name and title in a colored box. Stephanie speaks in bylined notes.
- No tinted callout boxes (lavender or pink panels behind a paragraph). Use a rule and plain type.
- No app widgets on a reading page: no stepper progress bars, no segmented-control toggles. Tabs are underlined words.
- No stock people. The only face on the site is Stephanie's (`public/stephanie.jpg`).

## Navigation, hubs and money lines (review of Nov 14, 2026)

- The top menu runs by topic: What should I use?, Resume tools, Applicant tracking systems, Guides (`/guides`), How we review. Audience pages light up their topic. The homepage doors lead to the audience pages.
- Each hub has six sections and no more: headline, "Where are you stuck?", the scoreboard, Stephanie's picks (RepVera listed there without a score), the guides and the email.
- Every button or link to a vendor's site has one line under it from `lib/money.ts`: "We earn nothing from this link." or "We earn a commission if you buy through this link." Never a vendor link without it.
- The footer's ratings summary is one sentence and a link everywhere except How we review, which keeps the full block (`SiteFooter ratings="full"`).
- The one-sentence description of the site lives in `lib/site-line.ts` and feeds search results, link previews, the share image and the footer.

## The short kit and short lists (Nov 14, 2026)

A picker answer is a short kit, always in the same order, and a part with nothing in it is left out. The best match is the one highlighted card (a hard shadow in the side's color); everything after it is a small bold heading and plain content. One outbound button per tool, with the money line right under it. Short list pages (`short-list.tsx`) reuse the kit's parts: a row per tool, a small outlined button to the vendor, and the same bottom block (who to follow, free from us, nobody pays to be featured).

## The journey rules (Nov 15, 2026)

Every picker path ends in an answer with a best match (or a plain "no tool" verdict), at least one alternative, what was ruled out and why, the real cost, one "Your next step" line, the button to act on it, and a way to save or share it. Job seeker answers start at 3 months and no set budget, both on screen and changeable, so the answer shows as soon as the problem is picked; hiring teams answer hires, company size and seats. Review pages open with Pay for it if, Skip it if, What's good and Watch out for, then how the score breaks down. Guides lead with picks, then rankings, then costs, under a sticky bar that marks where you are. Every page ends with one next step (`next-step.tsx`), and addresses people guess redirect to the right page (`next.config.mjs`, GUESSES).

## Copy tells to avoid

- Talk like a person (Stephanie, Nov 15, 2026). Every question and answer reads the way someone would say it out loud: "What would help you get the offer?", never "What would tip it your way?"; "Which sounds like you?", never "Which is closer?".

- "X, not Y" or "not just X, but Y" as a rhetorical move. Fine when it states a fact ("priced per posting, not per seat").
- Two-beat slogans ("Her opinion, labeled as hers. It never changes a score."). Say it in one plain sentence: "This is Stephanie's opinion, and it has no effect on the score."
- Filler: actually, genuinely, real talk, finally, quietly. And the words quiet and gap, anywhere.
- "One pick". Say "one tool and a backup". "Receipts" belongs to RepVera only.
- Lists of three by default. Use two or four, or a sentence.
- Plus the house rules in CLAUDE.md: no em dashes, no emojis, no unsourced numbers.
