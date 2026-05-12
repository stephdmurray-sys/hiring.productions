# Setting up the usage gates

This is the one-time setup for the rate-limiting / cost-tracking / email-capture
system that lives in `lib/usage.ts`, `lib/identity.ts`, `/api/tool`, `/api/lead`,
and `/api/usage`.

Until the env vars below are set in Vercel, the gates **do nothing** — every
request goes straight to Anthropic. That's by design so local dev is painless,
but it means the site is unprotected until step 2 is done.

## What you'll set up

1. **Cookie signing secret** — used to sign the Pro cookie so it can't be forged.
2. **Upstash Redis** — the cheap, fast KV store that holds counters + spend.
3. **Resend** (optional, for email capture) — list provider + welcome email.

Total time: **~5 minutes**.

---

## 1. Cookie signing secret (`HP_COOKIE_SECRET`)

Generate a random 32-byte hex string:

```bash
openssl rand -hex 32
```

Copy the output. Then in Vercel → Project → Settings → Environment Variables,
add:

| Name                 | Value                  | Environment   |
|----------------------|------------------------|---------------|
| `HP_COOKIE_SECRET`   | (the hex you just made) | Production    |

This is what the Stripe webhook will use to sign the Pro cookie on successful
checkout. Without it, Pro members can't bypass free-tier limits.

---

## 2. Upstash Redis

Two options, equally fine:

### Option A — Vercel integration (recommended)

1. Vercel dashboard → your `hiring-productions` project → **Storage** tab.
2. **Create Database** → pick **Upstash for Redis** (the marketplace integration).
3. Pick the free tier ("Free 10K commands/day"). That's plenty — each tool run
   uses ~4 Redis commands.
4. Click through the connect flow. Vercel auto-sets these env vars in Production:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - (plus a few others — they're fine to ignore)
5. Trigger a redeploy so the new env vars take effect: `vercel --prod`.

### Option B — Direct Upstash

1. Go to [upstash.com](https://upstash.com), sign in, **Create Database** →
   pick the free tier, region closest to your Vercel region (probably `us-east-1`).
2. Open the database, copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Paste both into Vercel env vars (Production).
4. Redeploy.

The code reads either set — pick whichever is easier.

### Verifying it works

Once deployed, hit `https://hiring.productions/api/usage` in a browser. You
should see something like:

```json
{ "tier": "anon", "remaining": 3, "limit": 3, "blocked": false }
```

After running a free tool 3 times, `remaining` should drop to 0 and the next
attempt should pop the email-capture modal. If `remaining` stays at 3 forever,
Redis isn't connected — check the env vars.

---

## 3. Resend email capture (optional but recommended)

The email-capture modal works without Resend — it still plants the email-tier
cookie and unlocks the 10 extra runs. Resend just makes the email actually
useful (collects to a list + sends a welcome email).

1. Sign up at [resend.com](https://resend.com), free tier is fine.
2. Verify your sending domain (this requires a few DNS records on `hiring.productions`).
3. Create an **Audience** in the Resend dashboard → copy its ID.
4. Create an **API Key** → copy it.
5. Add to Vercel env vars (Production):

| Name                  | Value                                |
|-----------------------|--------------------------------------|
| `RESEND_API_KEY`      | `re_xxx…`                            |
| `RESEND_AUDIENCE_ID`  | `aud_xxx…`                           |
| `RESEND_FROM_EMAIL`   | `Stephanie <stephanie@hiring.productions>` |

6. Redeploy.

The welcome email copy lives in `app/api/lead/route.ts` — edit there to taste.

---

## 4. (Future) Hook the Stripe webhook to plant the Pro cookie

Right now, Pro is gated client-side by a localStorage flag (legacy). The
server-side gate in `/api/tool` only trusts the **signed `hp_pro` cookie**,
which is *not* yet planted by the Stripe webhook. Until that's wired:

- All paying members still get the *frontend* Pro experience (localStorage).
- But the server still treats them as anon for the rate limit.
- Net effect: paying customers might hit the 3-runs/day anon limit. Bad.

The fix is a 10-minute change to the Stripe webhook: after `checkout.session.completed`,
call `signProCookie(customerId)` from `lib/identity.ts` and set the resulting
value as the `hp_pro` cookie on the redirect response (or as a magic-link click
through). Track that work in a separate task before paid ads launch.

---

## Tuning knobs

All limits live in `lib/usage.ts`:

```ts
ANON_DAILY_LIMIT = 3        // free runs/day for anon visitors
EMAIL_LIFETIME_LIMIT = 10   // total free runs after email capture
PRO_DAILY_LIMIT = 15        // safety cap for Pro members
DAILY_BUDGET_CENTS = 500    // $5.00 global ceiling per day
ANON_CUTOFF_CENTS = 450     // anon traffic cut off at $4.50 so Pro has $0.50 of headroom
```

Pricing per model is in the same file (`PRICES_PER_M`). Re-check those numbers
against [anthropic.com/pricing](https://www.anthropic.com/pricing) every few
months.

---

## What gets logged

Every successful `/api/tool` call logs one line to Vercel's function logs:

```
[api/tool] keyword-gap tier=anon cost=8c spend=72c remaining=2/3
```

Filter Vercel logs for `[api/tool]` to watch the budget tick up in real time.
