-- Create pages table
create table if not exists pages (
  id uuid default gen_random_uuid() primary key,
  portfolio_id uuid references portfolios(id) on delete cascade not null,
  slug text not null,
  title text not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table pages enable row level security;

create policy "Users can manage pages for their portfolios." on pages for all using (
  portfolio_id in (select id from portfolios where user_id = auth.uid())
);
create policy "Public can view pages of published portfolios." on pages for select using (
  portfolio_id in (select id from portfolios where is_published = true)
);

-- Create blocks table
create table if not exists blocks (
  id uuid default gen_random_uuid() primary key,
  page_id uuid references pages(id) on delete cascade not null,
  type text not null,
  content jsonb default '{}'::jsonb not null,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table blocks enable row level security;

create policy "Users can manage blocks for their pages." on blocks for all using (
  page_id in (
    select pages.id from pages 
    join portfolios on pages.portfolio_id = portfolios.id 
    where portfolios.user_id = auth.uid()
  )
);
create policy "Public can view blocks of published portfolios." on blocks for select using (
  page_id in (
    select pages.id from pages 
    join portfolios on pages.portfolio_id = portfolios.id 
    where portfolios.is_published = true
  )
);
