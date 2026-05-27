create table if not exists collaborations (
  id bigint generated always as identity primary key,
  collaboration_id text default concat('COL-', extract(epoch from now())::bigint),
  brand_name text not null,
  company_name text,
  contact_person_name text,
  designation text,
  email_address text,
  phone_number text,
  whatsapp_number text,
  instagram_handle text,
  website_url text,
  linkedin_profile_url text,
  collaboration_type text check (collaboration_type in ('Paid', 'Barter', 'Affiliate', 'Long-Term Partnership')),
  estimated_value numeric default 0,
  budget numeric default 0,
  deliverables text,
  first_contact_date date,
  last_conversation_date date not null,
  next_follow_up_date date,
  notes text,
  topics_discussed text,
  status text default 'New Lead',
  follow_up_required boolean default false,
  follow_up_priority text default 'None',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists content_calendar (
  id bigint generated always as identity primary key,
  content_title text not null,
  topic text,
  category text,
  description text,
  target_platform text,
  publish_date date,
  publish_time time,
  url text,
  status text default 'Idea',
  created_at timestamptz default now()
);

create table if not exists tasks (
  id bigint generated always as identity primary key,
  task_name text not null,
  description text,
  assigned_user text,
  priority text default 'Medium',
  due_date date,
  status text default 'Pending',
  created_at timestamptz default now()
);

create table if not exists brands (
  id bigint generated always as identity primary key,
  brand_name text not null,
  website text,
  industry text,
  contact_person text,
  email text,
  phone_number text,
  instagram_handle text,
  previous_collaborations integer default 0,
  revenue_generated numeric default 0,
  created_at timestamptz default now()
);

create table if not exists portfolio_inquiries (
  id bigint generated always as identity primary key,
  company_name text,
  contact_name text,
  email text,
  campaign_brief text,
  budget numeric,
  deliverables text,
  created_at timestamptz default now()
);
