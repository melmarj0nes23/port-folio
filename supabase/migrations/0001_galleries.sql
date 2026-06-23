-- Create galleries table
create table if not exists galleries (
  id uuid default gen_random_uuid() primary key,
  portfolio_id uuid references portfolios(id) on delete cascade not null,
  url text not null,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table galleries enable row level security;

create policy "Users can manage galleries for their portfolios." on galleries for all using (
  portfolio_id in (select id from portfolios where user_id = auth.uid())
);
create policy "Public can view galleries of published portfolios." on galleries for select using (
  portfolio_id in (select id from portfolios where is_published = true)
);
