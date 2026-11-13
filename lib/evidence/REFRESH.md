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

- `rising.json`: for each tool on the watchlist, re-check the lists in its `evidence` (still live, still naming it), count citable reviews on foundation sources and write the number to `citableReviews`. A tool with 25 or more citable reviews and a recruiter walkthrough graduates: move it into a scorecard and off this list. Add new names only with a linkable source; never add a line you can't trace. Set `verified: true` once each evidence line is confirmed on the live page.
- `resume-guide.json` → `plans`: when a pricing page changes, update the plan prices and lengths. The calculator, every review page's cost table and `yearCost` all read from here (keep `yearCost` consistent with the plans).
- `resume-guide.json` → `freeAnswer`: re-read if the free tier changed.
