create extension if not exists pgcrypto;

create type user_role as enum ('admin', 'editor');
create type content_status as enum ('draft', 'pending_approval', 'approved', 'scheduled', 'publishing', 'published', 'failed');
create type message_theme as enum ('amor', 'perdao', 'fe', 'compaixao', 'esperanca', 'reflexao');
create type artist_permission_status as enum ('pending', 'approved', 'rejected');
create type reel_source_type as enum ('original', 'authorized', 'embed');
create type instagram_post_type as enum ('image', 'reel');

create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role user_role not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  content text not null,
  content_en text,
  bible_reference text,
  theme message_theme not null,
  status content_status not null default 'draft',
  publish_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint messages_schedule_requires_date check (status <> 'scheduled' or publish_date is not null)
);

create table artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  instagram_handle text,
  bio text,
  permission_status artist_permission_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table reels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  caption text not null,
  caption_en text,
  video_url text not null,
  artist_id uuid references artists(id) on delete set null,
  source_type reel_source_type not null,
  status content_status not null default 'draft',
  scheduled_at timestamptz,
  instagram_media_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint authorized_reels_require_artist check (source_type <> 'authorized' or artist_id is not null),
  constraint reels_schedule_requires_date check (status <> 'scheduled' or scheduled_at is not null)
);

create table instagram_posts (
  id uuid primary key default gen_random_uuid(),
  type instagram_post_type not null,
  caption text not null,
  media_url text not null,
  status content_status not null default 'draft',
  scheduled_at timestamptz,
  published_at timestamptz,
  retry_count integer not null default 0,
  response jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint instagram_schedule_requires_date check (status <> 'scheduled' or scheduled_at is not null)
);

alter table reels
  add constraint reels_instagram_media_fk
  foreign key (instagram_media_id) references instagram_posts(id) on delete set null;

create table publication_logs (
  id uuid primary key default gen_random_uuid(),
  instagram_post_id uuid references instagram_posts(id) on delete cascade,
  channel text not null default 'instagram',
  status text not null,
  response jsonb,
  created_at timestamptz not null default now()
);

create table ai_agent_runs (
  id uuid primary key default gen_random_uuid(),
  agent_key text not null,
  agent_name text not null,
  subagent_type text not null,
  model text not null,
  status text not null,
  input text not null,
  output jsonb,
  created_at timestamptz not null default now()
);

create index messages_status_publish_date_idx on messages(status, publish_date);
create index reels_status_scheduled_at_idx on reels(status, scheduled_at);
create index instagram_posts_status_scheduled_at_idx on instagram_posts(status, scheduled_at);
create index publication_logs_instagram_post_id_idx on publication_logs(instagram_post_id);
create index ai_agent_runs_agent_key_idx on ai_agent_runs(agent_key, created_at);

create or replace function increment_instagram_retry(post_id uuid)
returns void
language plpgsql
as $$
begin
  update instagram_posts
  set retry_count = retry_count + 1,
      status = 'failed',
      updated_at = now()
  where id = post_id;
end;
$$;

alter table users enable row level security;
alter table messages enable row level security;
alter table artists enable row level security;
alter table reels enable row level security;
alter table instagram_posts enable row level security;
alter table publication_logs enable row level security;
alter table ai_agent_runs enable row level security;

create policy "service role can manage users" on users for all using (auth.role() = 'service_role');
create policy "service role can manage messages" on messages for all using (auth.role() = 'service_role');
create policy "service role can manage artists" on artists for all using (auth.role() = 'service_role');
create policy "service role can manage reels" on reels for all using (auth.role() = 'service_role');
create policy "service role can manage instagram posts" on instagram_posts for all using (auth.role() = 'service_role');
create policy "service role can manage publication logs" on publication_logs for all using (auth.role() = 'service_role');
create policy "service role can manage ai agent runs" on ai_agent_runs for all using (auth.role() = 'service_role');
