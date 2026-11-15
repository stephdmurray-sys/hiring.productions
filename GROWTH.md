# GROWTH.md: how the review site earns leads without spending trust

The operating rules behind the hiring.productions business plan (Stephanie's doc, Nov 2026). Read before adding any email capture, any RepVera mention, or any new tool. DESIGN.md covers how things look; this file covers what we may ask for and where RepVera may appear.

## The one line

hiring.productions is the free, evidence-based place where job seekers and hiring teams figure out what works in hiring. The trust it earns becomes relationships for RepVera, which is never ranked or reviewed here.

## The RepVera firewall (non-negotiable)

hiring.productions and RepVera share an owner. The FTC's rule on reviews, 16 CFR 465.6 (in force since October 21, 2024), makes it unlawful to present a site you control as giving independent reviews of a category that includes your own product. So:

- RepVera never appears in a score, ranking, scoreboard, recommender pick or alternative, "best" list, On the rise entry or comparison table.
- Since Nov 14, 2026 RepVera is listed in its own category, verified professional reputation, with no score and no rank (on /reviews), and it is the recommendation for one situation on each side of the guided picker (`lib/evidence/guided.ts`). Every appearance carries the label "Stephanie built this one" and her note "Full disclosure: I built RepVera, so I don't give it a score. Take a look and decide for yourself." Nothing in that category is scored or ranked, and neither is reference checking or candidate verification. Never call RepVera's category "reference checking". RepVera copy says "receipts", never "feedback". Stephanie, Nov 15, 2026: RepVera isn't reference checking, but it is a better version of what references were, so an occasional comparison to references (including in a customer's own words) is fine.
- Do not write in Stephanie's first-person voice beyond copy she supplied (her instruction, Nov 14, 2026).
- What RepVera is: hiring teams ask for a candidate's RepVera early in the process, from application through interviews depending on the team, to see verified experiences of what someone is like to work with; candidates share theirs too. It is not a late-stage reference check: never describe it as one, or as the last step.
- Since Nov 15, 2026 both RepVera picker answers carry real quotes (`lib/repvera-quotes.ts`, word for word from Stephanie's sheets, each switched off on the production site until that person approves it), a screenshot of Stephanie's own profile, and on the hiring side Stephanie's booking link for a free one-role pilot (Calendly). Pilot quotes say they came from the free pilot.
- RepVera may appear only: in the footer disclosure ("Made by Stephanie Murray, who also built RepVera"); as a plain ownership statement on the advertiser disclosure, About and How we review pages; in its unscored listing on /reviews and its two picker answers; in a labeled note ("From Stephanie, who built RepVera") beside our screening and interview tools (the fraud checklist, the scorecard builder, interview prep) and the cost of a mis-hire; in a hiring-team welcome email from those tools, labeled; in a conversation someone asked for. Every link goes to repvera.com, tagged.
- Commissions and the RepVera relationship are never inputs to anything in `lib/evidence`.
- Stack requests from /hiring-stack (was /consulting) join the same lead record (`lead:{emailHash}`, source `stack_request`, audience `hiring`) and the Resend audience, so a team that asked for a stack and later used the scorecard is one relationship, not two.

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
