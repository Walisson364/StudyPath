create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#2563eb',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  title text not null,
  due_date date,
  priority text not null default 'media' check (priority in ('baixa', 'media', 'alta')),
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  duration_minutes integer not null check (duration_minutes > 0),
  notes text,
  studied_at timestamptz not null default now()
);

create table if not exists public.weekly_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  target_hours numeric(5,2) not null default 10,
  target_tasks integer not null default 8,
  main_objective text not null default '',
  created_at timestamptz not null default now(),
  unique(user_id, week_start)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null,
  title text not null,
  description text not null,
  unlocked_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, code)
);

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

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  streak_days integer not null default 0,
  total_minutes integer not null default 0,
  completed_tasks integer not null default 0,
  overall_progress integer not null default 0 check (overall_progress >= 0 and overall_progress <= 100),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.tasks enable row level security;
alter table public.study_sessions enable row level security;
alter table public.weekly_goals enable row level security;
alter table public.achievements enable row level security;
alter table public.simulation_results enable row level security;
alter table public.user_progress enable row level security;

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users can delete own profile" on public.profiles for delete using (auth.uid() = id);

create policy "Users can read own subjects" on public.subjects for select using (auth.uid() = user_id);
create policy "Users can insert own subjects" on public.subjects for insert with check (auth.uid() = user_id);
create policy "Users can update own subjects" on public.subjects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own subjects" on public.subjects for delete using (auth.uid() = user_id);

create policy "Users can read own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can insert own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update own tasks" on public.tasks for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own tasks" on public.tasks for delete using (auth.uid() = user_id);

create policy "Users can read own sessions" on public.study_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on public.study_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own sessions" on public.study_sessions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own sessions" on public.study_sessions for delete using (auth.uid() = user_id);

create policy "Users can read own goals" on public.weekly_goals for select using (auth.uid() = user_id);
create policy "Users can insert own goals" on public.weekly_goals for insert with check (auth.uid() = user_id);
create policy "Users can update own goals" on public.weekly_goals for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own goals" on public.weekly_goals for delete using (auth.uid() = user_id);

create policy "Users can read own achievements" on public.achievements for select using (auth.uid() = user_id);
create policy "Users can insert own achievements" on public.achievements for insert with check (auth.uid() = user_id);
create policy "Users can update own achievements" on public.achievements for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own achievements" on public.achievements for delete using (auth.uid() = user_id);

create policy "Users can read own simulation results" on public.simulation_results for select using (auth.uid() = user_id);
create policy "Users can insert own simulation results" on public.simulation_results for insert with check (auth.uid() = user_id);
create policy "Users can update own simulation results" on public.simulation_results for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own simulation results" on public.simulation_results for delete using (auth.uid() = user_id);

create policy "Users can read own progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress" on public.user_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete own progress" on public.user_progress for delete using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );

  insert into public.user_progress (user_id) values (new.id);

  insert into public.achievements (user_id, code, title, description) values
    (new.id, 'first-study', 'Primeiro estudo concluido', 'Finalize sua primeira sessao de estudo.'),
    (new.id, 'streak-3', '3 dias seguidos', 'Mantenha tres dias de constancia.'),
    (new.id, 'streak-7', '7 dias seguidos', 'Complete uma semana de estudos.'),
    (new.id, 'tasks-10', '10 tarefas concluidas', 'Conclua dez tarefas academicas.'),
    (new.id, 'weekly-goal', 'Meta semanal concluida', 'Finalize sua primeira meta semanal.'),
    (new.id, 'hours-50', '50 horas estudadas', 'Registre cinquenta horas de estudo.');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
