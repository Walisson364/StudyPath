create table if not exists public.simulation_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  score numeric(7,2) not null default 0,
  total_questions integer not null default 0,
  correct_answers integer not null default 0,
  subject_focus text,
  taken_at timestamptz not null default now()
);

alter table public.simulation_results enable row level security;

drop policy if exists "Users can read own simulation results" on public.simulation_results;
drop policy if exists "Users can insert own simulation results" on public.simulation_results;
drop policy if exists "Users can update own simulation results" on public.simulation_results;
drop policy if exists "Users can delete own simulation results" on public.simulation_results;

create policy "Users can read own simulation results" on public.simulation_results
  for select using (auth.uid() = user_id);

create policy "Users can insert own simulation results" on public.simulation_results
  for insert with check (auth.uid() = user_id);

create policy "Users can update own simulation results" on public.simulation_results
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own simulation results" on public.simulation_results
  for delete using (auth.uid() = user_id);
