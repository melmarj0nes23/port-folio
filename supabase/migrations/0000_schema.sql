-- Create users_profile table
create table if not exists users_profile (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  username text unique not null,
  full_name text,
  headline text,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table users_profile enable row level security;

-- Policies for users_profile
create policy "Users can view their own profile." on users_profile for select using (auth.uid() = user_id);
create policy "Public can view profiles." on users_profile for select using (true);
create policy "Users can insert their own profile." on users_profile for insert with check (auth.uid() = user_id);
create policy "Users can update their own profile." on users_profile for update using (auth.uid() = user_id);

-- Create portfolios table
create table if not exists portfolios (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  template_id integer default 1 check (template_id >= 1 and template_id <= 7),
  theme_color text default '#030213',
  font text default 'Inter',
  is_published boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table portfolios enable row level security;

create policy "Users can manage their own portfolios." on portfolios for all using (auth.uid() = user_id);
create policy "Public can view published portfolios." on portfolios for select using (is_published = true);

-- Create projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  portfolio_id uuid references portfolios(id) on delete cascade not null,
  title text not null,
  description text,
  link text,
  tech_stack text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table projects enable row level security;

create policy "Users can manage projects for their portfolios." on projects for all using (
  portfolio_id in (select id from portfolios where user_id = auth.uid())
);
create policy "Public can view projects of published portfolios." on projects for select using (
  portfolio_id in (select id from portfolios where is_published = true)
);

-- Create experience table
create table if not exists experience (
  id uuid default gen_random_uuid() primary key,
  portfolio_id uuid references portfolios(id) on delete cascade not null,
  company text not null,
  role text not null,
  start_date text,
  end_date text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table experience enable row level security;

create policy "Users can manage experience for their portfolios." on experience for all using (
  portfolio_id in (select id from portfolios where user_id = auth.uid())
);
create policy "Public can view experience of published portfolios." on experience for select using (
  portfolio_id in (select id from portfolios where is_published = true)
);

-- Trigger to create a user profile automatically on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users_profile (user_id, username)
  values (new.id, split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 6));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
