-- PostgreSQL schema for a later persistent Vire backend.
-- The current website stores requests in the browser and encodes payment links in the URL.
-- Do not store private keys, seed phrases, or wallet secrets in this database.

create table if not exists users (
  id uuid primary key,
  created_at timestamptz not null default now()
);

create table if not exists wallet_links (
  id uuid primary key,
  user_id uuid not null references users (id),
  address text not null unique,
  chain_id integer not null,
  linked_at timestamptz not null default now()
);

create table if not exists auth_nonces (
  id uuid primary key,
  address text not null,
  nonce text not null,
  expires_at timestamptz not null,
  used_at timestamptz
);

create table if not exists usernames (
  handle text primary key,
  address text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists payment_requests (
  id uuid primary key,
  requester_address text not null,
  asset text not null,
  amount numeric,
  note text,
  dynamic_amount boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists merchants (
  address text primary key,
  display_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists payment_requests_requester_idx
  on payment_requests (requester_address, created_at desc);
