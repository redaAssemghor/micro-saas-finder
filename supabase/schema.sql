-- Run in the Supabase SQL editor. Only the server service-role key may access this table.
create table if not exists public.startup_plans (
  user_id text not null,
  id uuid not null,
  plan jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);
alter table public.startup_plans enable row level security;
revoke all on public.startup_plans from anon, authenticated;
grant all on public.startup_plans to service_role;
create index if not exists startup_plans_owner_created on public.startup_plans(user_id, created_at desc);
