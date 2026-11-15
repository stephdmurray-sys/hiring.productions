# Monthly evidence check

The runbook for the first-week-of-the-month refresh. One run per month, kept lean on purpose: re-read data points, update JSON, flag what moved. No copy rewrites. Pages compute every score from the data, so nothing is hand-edited in page files.

**Covers today:** the resume tools guide (`/guides/best-resume-tools`). The ATS and recruiter-training guides are still hand-typed mockups and join this process when they move onto the evidence layer.

## Before you start

- **Network.** The run needs these hosts: `www.g2.com`, `chromewebstore.google.com`, `play.google.com`, `itunes.apple.com`, `web.archive.org`, `tranco-list.eu`, `www.youtube.com`, plus each list publisher in `benchmarks.json`. If they are blocked, stop and report that, rather than filling in from search snippets.
- **Branch.** Work on a branch; never commit straight to `main` or `rebrand`.
- **Files.** `lib/scorecards/resume-tools.json` (ratings, prices, traffic), `lib/evidence/benchmarks.json`, `lib/evidence/videos.json`, `lib/evidence/resume-guide.json` (refresh log, next check date), `lib/evidence/sources.json` (which sources are allowed).

## 1. Ratings and review counts

For each tool in `resume-tools.json`, re-read every rating listed under `sources.ratings` on its live page.

- Update `rating`, `reviews` and `as_of`.
- App Store: read through Apple's search API (`https://itunes.apple.com/lookup?id=<app id>&country=us`), not the web page. Log the storefront.
- Google Play: log the country.
- Save each page with `https://web.archive.org/save/<url>`.
- Only sources marked `foundation` or `secondary` in `sources.json` may be added. `permission-pending` sources stay as they are and stay flagged. Never add an `excluded` source.
- The G2 family (G2, Capterra, GetApp, Software Advice) is one review pool. Record G2; the page drops the others automatically when G2 is present.

## 2. Prices and free tiers

For each tool, open the pricing page, save it to the Internet Archive, and compare with `sources.pricing` and `sources.free_tier`. Update what changed. Any change goes in the report: a price change is news for job seekers.

## 3. Other reviewers' lists

For each list in `benchmarks.json`:

1. Open the live page. Confirm the title, the edition or last-updated date, the picks and their order, and the affiliate disclosure.
2. Update `picks` (use `tool` for tools we review, `name` for the rest), `edition`, `checked`, and set `verified: true`.
3. Re-apply the status rules at the top of the file. Check ownership when a publisher changes hands.
4. Save the page to the Internet Archive.

Then run one search per category (resume builders, ATS resume checkers) for lists ranking on page one that we do not track yet, and add any that a job seeker is likely to read, whatever their status.

## 4. Demo videos

For each video in `videos.json`:

1. Confirm who made it: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<id>&format=json` returns `author_name` and `author_url`. If the author is the company's own channel, `kind` is `vendor`. Set `verified: true`.
2. Drop videos that are gone or private.

Then look for newer videos per tool: keep at most three per tool, prefer independent reviews from the last 12 months, and mark one per key tool `featured`. Flag creator videos that carry discount codes or affiliate links in the title or description; label them, don't hide them.

## 5. Check the build

```bash
pnpm build
```

Open `/guides/best-resume-tools` and confirm the demo-build notice disappears once every list and video is verified.

## 6. Flag for the founder (do not decide these)

Write a short report covering:

- **Rank moves:** any tool whose rank or "not enough evidence" status changed.
- **Stance changes:** a tool that gained or lost a place on a list that counts, which may change its "Agrees with the field" or "Breaks from the pack" call.
- **New breaks:** places where we now land far from the field.
- **Price changes** and new billing traps.

Do not edit `call` lines, verdict copy or `product_score_draft`. Those are the founder's. Propose wording in the report instead.

## 7. Log it

Append to `refreshLog` in `resume-guide.json`:

```json
{ "date": "YYYY-MM-DD", "what": "Ratings, prices, lists and videos", "how": "Read on the live pages." }
```

Set `nextCheck` to the first day of next month. Commit with a message naming the month, push the branch, and send the report.

## House rules for anything a visitor reads

No em dashes. No emojis. No invented numbers: every figure is dated and sourced. Cite ratings as facts, never copy review text.

## On the rise and the cost calculator (added Nov 2026)

- `rising.json`: for each tool on the watchlist, re-check the lists in its `evidence` (still live, still naming it), count citable reviews on foundation sources and write the number to `citableReviews`. A tool with 25 or more citable reviews and a recruiter walkthrough graduates: move it into a scorecard and off this list, and add a line to `graduated` (id, name, date, the board it moved to, one sentence on what was checked). That log shows on /on-the-rise and in the llms files, so a reader can see a tool's path from the wings to a score. A tool that runs during a live interview (category "Live interview co-pilot") stays out of interview-practice answers in the recommender; it is news to watch, not a recommendation. Evidence you could not open on the live page gets `confirmed: false`, and the page says so. Add new names only with a linkable source; never add a line you can't trace. Set `verified: true` once each evidence line is confirmed on the live page.
- `resume-guide.json` → `plans`: when a pricing page changes, update the plan prices and lengths. The calculator, every review page's cost table and `yearCost` all read from here (keep `yearCost` consistent with the plans).
- `resume-guide.json` → `freeAnswer`: re-read if the free tier changed.

## Step 0, every month: run the discovery net (added Nov 2026)

Why this exists: in Nov 2026 Juicebox, Stephanie's top pick for hiring teams, sat on the watchlist as "not scored" only because nobody had counted its reviews, and because there was no sourcing board for it to rank on. The net below makes that impossible to repeat.

1. Sweep every trigger in `discovery.json` for each category we cover and each category in research. Anything that trips one trigger goes into `rising.json` with its `trigger`, a `checkDue` month (next month at the latest) and its `board` (null if its category has no scoreboard).
2. Check everything due this month: count citable reviews on foundation sources, read the lists that name it. Record the number. No entry keeps `citableReviews: null` past its due month: `/desk` shows it as overdue.
3. Write the outcome: scored (move it into a scorecard), in the wings (real counts, what's missing), or dropped (reason, in the log).
4. Report category gaps to Stephanie with every tool stuck in each one. Building a board is her call; leaving a gap unreported is not an option.
5. Discovery never moves a score. Follower counts, awards and vendors' own lists are not signals (see `notSignals`).

## Scores are data only (Nov 2026)

Stephanie's direction: her score never goes on the board. Every score is computed from public data: users 40%, market 25%, critics 20%, value 15% (formulas in `lib/evidence/index.ts`; ATS uses users, market and value until independent ATS lists are tracked). Never add a hand-set or rubric score. Her judgment appears only as labeled picks (`founder-picks.json`, `risingPick` in `resume-guide.json`) and as watchlist nominations, and never changes a score. Older notes in this file that mention practitioner scores are superseded.

## Videos and who to follow (Nov 2026)

- Run `pnpm check:videos` every month and before every deploy. A video passes only if YouTube's embed check returns 200 (it exists and its owner lets it play on other sites), so it plays on our page instead of sending people to YouTube. Replace any that fail; the player also shows a short "no longer available" note if one disappears between checks.
- `follow.json` (who to follow) is Stephanie's editorial list. Re-check each link monthly. Add people only from verified profile links; never use follower counts to choose.
- `framework.json` holds the research behind the rating framework, shown on How we review and summarized in the footer. If a weight or formula changes, update it there in the same commit.

## Contrast (Nov 2026)

Every page passed an automated WCAG AA contrast check (axe-core, color-contrast rule: 4.5:1 for normal text, 3:1 for large) on Nov 13, 2026, after fixing the nav links, the success green (now #157347), the older pages' gray (now #62627A), faded text on the colored hub headers, and the free stack recommendation page. The footer and nav carry their own color fallbacks so they render on the older page designs too. Re-run the check after any color change.

## AI readability (Nov 2026)

AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot) read the site three ways, and all three rebuild from this folder, so a monthly data update updates them too:

- `app/robots.ts` names each AI crawler and allows the whole public site. Only `/api/`, `/admin`, `/desk` and `/mockups` are closed. Don't block `/_next/`: it stops crawlers seeing images.
- `/llms.txt` (short map) and `/llms-full.txt` (every score part, price, list and source), from `app/llms.txt` and `app/llms-full.txt`.
- Structured data (schema.org JSON-LD) on every page, from `app/(rebrand)/_components/structured.tsx`: each review page carries the tool, its four parts and our score as a Review; the guides, hubs and homepage carry the rankings; /who-to-follow carries the people and their profile links. Users' ratings from other sites are listed as plain facts, never as an aggregateRating we didn't collect.

Check after a build: fetch a page as an AI crawler and confirm it returns 200 with the text in the raw HTML, e.g. `curl -A "ClaudeBot/1.0" localhost:3000/reviews/teal`.

Vercel preview links are marked noindex and may sit behind Vercel's login, so AI tools can't read them. They read the production domain.

## The recommendation framework (Nov 2026)

`recommend.json` holds the rules, the questions and the data the recommender needs beyond the scorecards; `recommend.ts` applies them. At each monthly check:

- Update `hiring.prices` when an applicant tracking system's pricing changes in `lib/scorecards/ats-small-teams.json` (same date, same source).
- Update `seekers.capabilities` when a tool adds or drops a job tracker, builder or checker, from its own pricing or features page.
- Every `otherSide` line states a published finding and links to it. Re-check the links each quarter; if a source moves or a newer study replaces it, update the line and the source together. No line without a source, and no line in Stephanie's first person.
- Every situation in `situations.list` must use option values that exist in `limits` (the test in the recommender check enforces it): change both together.
- After any change, run every combination through the engine (each side's problems x limits x must-haves) and confirm nothing throws, nothing reads `undefined`, no em dashes, and each situation's link opens its own answer.

## Confirming list placements (Nov 14, 2026)

Every placement that counts toward a score is read on the live page, never from a search listing. Record every pick the list makes (`picksComplete: true`), not only the tools we track, so the agreement grid can say "not named" with confidence.

- A page that blocks automated readers (Fast Company today) gets status `unconfirmed`: shown, labeled "Not yet confirmed", and excluded from scores. A person opens it in a normal browser, confirms each placement, and flips it back to `counts` with `verified: true`. Never work around a site's bot protection.
- When placements change, check every `call.line` in `resume-guide.json` that names lists: the copy must match the data.
- The "Still being confirmed" note appears only while a counted list or a shown video rests on a search listing.

The Nov 14 read found Zapier, Geekflare and SkillScouter name more of our tools than we'd recorded; scores rose for Huntr, Kickresume, Jobscan, Rezi and Resume.io, ranks held.

## Comparison pages

Nothing to edit. `/compare/*` pages are computed from the scores, prices and free levels on every build (`lib/compare.ts`), so they update with the refresh. After a refresh, open two or three and read the verdict line: if a tool changed category or tier, its comparisons move with it.

## Affiliate links and money lines

Nothing to refresh while no affiliate deal is live. When one is approved: add the partner id to `PAYS_US` in `lib/money.ts` the same day the `/go` destination swaps to the tracked link, and change the two static lines in `_html/guide-ats.ts` and `_html/guide-training.ts` that say no link on the page earns anything.

## Applicant tracking data (the December check)

G2 blocks automated reads, so the applicant tracking ratings in `lib/scorecards/ats-small-teams.json` need a person in a normal browser: read each system's G2 and Capterra rating and review count, update the file with the date read, and run the build. The hiring pages show the date of the last read.

## The guided picker and what it counts

The questions and the RepVera answers live in `lib/evidence/guided.ts`, word for word from Stephanie's handoff; change them only with her. If a problem id in `recommend.json` changes, update the paths there too (the guided test walks every path). The picker records starts, finishes, RepVera answer visits, profile clicks and "Did this help you decide?" answers through `/api/track`; vendor form submissions are recorded in `/api/vendor-submittal`. Counts appear by type on /admin.

## The short kit and short lists (Nov 14, 2026)

Every picker answer is a short kit, in this order: best match for you, also worth a look (up to two, each with one label: best free option, most complete, or Stephanie's pick), what we ruled out (collapsed), what a tool won't do, free from us, who to follow on this, what the other side sees. The labels come from the data in `recommend.ts`; the fixed lines are Stephanie's and live in `kit.ts`. Two slots stay empty until she supplies them: who to follow (only the fraud answers have a match) and what the other side sees (her voice, never written for her).

Short lists (`shortlists.ts`) are categories too new to score: no scores, a few tools, a reason for each, and a date. Each month, open every vendor link on each short list and confirm it still goes to the company's own page for that product; update the `checked` date only after that. A category moves to scored rankings once there is enough public data, and How we review says so. The first short list is Fraud tools to know (`/guides/hiring-fraud-tools`), which is where the picker's fake candidates path ends. The second is Portfolio sites to know (`/guides/portfolio-sites`, Nov 15, 2026): its lines are built only from facts on each company's own pages, and paid prices stay off until someone reads them on the live pricing pages. Four of its sites also appear inside the job seeker proof answer (`PORTFOLIO_PICKS`).

## Free tools for job seekers built from the site's data (Nov 15, 2026)

Four pages reuse data that's already checked monthly, so they change when the data does: The $0 job search (`/free-job-search`, every rated resume tool with a free version you can keep using, from resume-guide.json), What does the screening software do to my resume? (`/how-ats-actually-works`, only the sourced lines in recommend.json and the dated product pages in its capabilities), Is this best-of list paid for? (`/is-this-list-paid-for`, benchmarks.json, its four checks are the list rules) and the proof kit (`/show-how-you-work`, the proof answer as three steps, with the checklist by email). When a source line, a free plan or a list status changes in the data, these pages change with it; nothing on them is typed by hand except the short framing lines.

## Pricing traps, searched comparisons and the AI data block (Nov 15, 2026)

Pricing trap pages (`/pricing-traps/[tool]`) build themselves for any resume tool whose plans on file show a trial that rolls into billing every 4 weeks (`lib/pricing-traps.ts`); today that's Resume.io and Zety. `/pricing-traps` lists every tool by what the first year costs if you forget to cancel. When a plan changes in resume-guide.json, these pages, the review pages' four pricing questions (and their FAQPage markup), the Offer markup and the JSON block at the top of `/llms-full.txt` all change with it. Comparisons people search across groups (Teal vs Kickresume, Manatal vs Greenhouse) live in `SEARCHED_PAIRS` in `lib/compare.ts`; add a pair there when search demand shows up.
