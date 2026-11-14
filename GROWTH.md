# GROWTH.md: how the review site earns leads without spending trust

The operating rules behind the hiring.productions business plan (Stephanie's doc, Nov 2026). Read before adding any email capture, any RepVera mention, or any new tool. DESIGN.md covers how things look; this file covers what we may ask for and where RepVera may appear.

## The one line

hiring.productions is the free, evidence-based place where job seekers and hiring teams figure out what works in hiring. The trust it earns becomes relationships for RepVera, which is never ranked or reviewed here.

## The RepVera firewall (non-negotiable)

hiring.productions and RepVera share an owner. The FTC's rule on reviews, 16 CFR 465.6 (in force since October 21, 2024), makes it unlawful to present a site you control as giving independent reviews of a category that includes your own product. So:

- RepVera never appears in a score, ranking, scoreboard, recommender pick or alternative, "best" list, On the rise entry or comparison table.
- We do not score any category RepVera competes in: reference checking, verified recommendations or candidate verification profiles. If one of those ever needs covering, it is coverage without scores, with the relationship disclosed at the top.
- RepVera may appear only: in the footer disclosure; in a labeled note ("From the team behind hiring.productions") on pages about fraud, references and the cost of a mis-hire; in a hiring-team welcome email, labeled; in a conversation someone asked for.
- Commissions and the RepVera relationship are never inputs to anything in `lib/evidence`.

## Asking for an email

- The evidence is never gated. Ask only in exchange for something extra: a result in writing, a printable scorecard, an alert when an answer changes, the monthly evidence check.
- One ask per moment, after the value. Say exactly what they get and how often.
- Email first; at most two optional questions, and only questions we use (side of the table, company size, hires a year, role).
- Every ask carries: "hiring.productions is made by the team behind RepVera. We never share your email with any vendor."
- Every capture goes through `/api/lead` with its own `source`, so the welcome email delivers what they asked for and the lead record says where it came from.

## Links to RepVera

Tag every RepVera link: `utm_source=hiring.productions&utm_medium=referral&utm_campaign=<page-or-tool>`. Use the helper in `lib/repvera.ts`, never a hand-typed URL.

## What we measure (monthly; targets only after 60 days of baseline)

Reach (visitors, AI-assistant referrals), use (answers, calculator runs, scorecards), capture (emails per tool used), relationship (Ask Stephanie requests, tagged RepVera visits and sign-ups), trust (days since each data set was checked, corrections, unsourced numbers: zero).
