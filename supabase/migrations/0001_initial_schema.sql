-- ============================================================================
-- Stage 1 initial schema for hiring.productions platform pivot
-- ============================================================================
-- Per PLATFORM-VISION.md (approved 2026-05-25). This migration sets up the
-- minimum durable footprint that turns the editorial tools site into a
-- coached job-search OS:
--   - profiles (extends Supabase auth.users with platform data)
--   - target_roles (the first saved artifact, auto-populates every tool)
--   - insights (every tool run, automatically captured for returning visitors)
--
-- All tables use Row Level Security so users can ONLY read/write their own
-- rows. This is the security boundary that lets us hold resume content
-- safely.
--
-- TO APPLY: paste this entire file into the Supabase SQL Editor and click
-- Run. Re-runnable thanks to IF NOT EXISTS guards.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- profiles: 1:1 with auth.users, holds platform-side metadata
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  -- The scene the visitor enters via during onboarding. One of:
  --   'networking' | 'interview' | 'offer' | null
  -- Maps to the three homepage moment cards. Null = hasn't onboarded yet.
  current_scene text check (current_scene in ('networking', 'interview', 'offer')),
  -- Membership tier — read from Stripe on webhook events; default 'free'.
  --   'free' = anonymous diagnostic tools only
  --   'tools' = $14.99/mo or $99/yr (all individual tools)
  --   'platform' = $29-49/mo (the full platform — Stage 3+)
  membership_tier text not null default 'free' check (membership_tier in ('free', 'tools', 'platform')),
  -- The seven steps of a strong job search. We start every new account at
  -- 2 of 8 complete (target_role + first_tool_run) — Nunes & Drèze 2006
  -- endowed-progress effect, ~doubles completion rate.
  steps_completed text[] not null default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth.users row is inserted.
-- This means we don't have to do it manually from app code.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- target_roles: the visitor's 1-3 target roles (the first saved artifact)
-- ----------------------------------------------------------------------------
-- Auto-populates every tool so the visitor doesn't re-enter "Senior PM" three
-- times. This is the sunk-cost wedge — once they've saved roles, leaving the
-- system means re-entering them somewhere else.
create table if not exists public.target_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  -- Optional secondary phrasings the recruiter might search for, e.g.
  -- a Sr PM might also be searched as "Senior Product Manager" or "Product Lead"
  variations text[] not null default array[]::text[],
  -- Optional: where they want this role (geographic / remote preference)
  location text,
  -- Optional: target seniority — "Sr" / "Staff" / "Principal" etc.
  level text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists target_roles_user_id_idx on public.target_roles(user_id);

-- ----------------------------------------------------------------------------
-- insights: every tool run, auto-saved when a signed-in user runs a tool
-- ----------------------------------------------------------------------------
-- "My Insights" becomes the dashboard's main artifact — a returning visitor
-- sees their history and can re-open old reads. Free users get 30 days
-- retention; paid users get forever (enforced at query time, not at row level).
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Tool catalog identifier (e.g. 'recruiter-search-rank', 'resume-ai-check').
  -- We keep this as text rather than a foreign key because the catalog lives
  -- in TypeScript (lib/tools-catalog.ts), not the database.
  tool_id text not null,
  -- The inputs the user supplied. Stored as JSON so we can replay or compare.
  -- Includes the target_role + any tool-specific fields.
  inputs jsonb not null default '{}'::jsonb,
  -- The full markdown result returned by the tool. Lets us re-render or
  -- annotate without re-running the LLM.
  result text not null,
  -- Optional: a short title the user can edit ("My PM resume run, Apr 22")
  title text,
  -- Optional: the user's own notes after reading the insight
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists insights_user_id_created_idx
  on public.insights(user_id, created_at desc);
create index if not exists insights_user_tool_idx
  on public.insights(user_id, tool_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
-- Users can only read/write their own rows. This is the security boundary
-- that lets us hold PII (resume content, LinkedIn data) safely. Service-role
-- queries from the server bypass RLS — use service-role sparingly.

alter table public.profiles enable row level security;
alter table public.target_roles enable row level security;
alter table public.insights enable row level security;

-- profiles: read + update only your own row. Inserts happen via the trigger.
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- target_roles: full CRUD on your own rows
drop policy if exists "Users read own target_roles" on public.target_roles;
create policy "Users read own target_roles"
  on public.target_roles for select
  using (auth.uid() = user_id);

drop policy if exists "Users insert own target_roles" on public.target_roles;
create policy "Users insert own target_roles"
  on public.target_roles for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users update own target_roles" on public.target_roles;
create policy "Users update own target_roles"
  on public.target_roles for update
  using (auth.uid() = user_id);

drop policy if exists "Users delete own target_roles" on public.target_roles;
create policy "Users delete own target_roles"
  on public.target_roles for delete
  using (auth.uid() = user_id);

-- insights: same pattern
drop policy if exists "Users read own insights" on public.insights;
create policy "Users read own insights"
  on public.insights for select
  using (auth.uid() = user_id);

drop policy if exists "Users insert own insights" on public.insights;
create policy "Users insert own insights"
  on public.insights for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users update own insights" on public.insights;
create policy "Users update own insights"
  on public.insights for update
  using (auth.uid() = user_id);

drop policy if exists "Users delete own insights" on public.insights;
create policy "Users delete own insights"
  on public.insights for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- HELPER: keep updated_at fresh on row updates
-- ============================================================================
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists target_roles_touch_updated_at on public.target_roles;
create trigger target_roles_touch_updated_at
  before update on public.target_roles
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- End of migration 0001
-- ============================================================================
