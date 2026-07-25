-- =====================================================================
-- Dr. Dhir's Dental Care — Supabase schema
-- Paste this whole file into the Supabase dashboard → SQL Editor → Run.
-- Creates two tables (appointments, enquiries) with Row-Level Security
-- that allows the public website to INSERT rows only (no reads/updates
-- from the anon key), so patient data stays protected.
-- =====================================================================

-- ---------- Appointments (from the "Book Appointment" modal) ----------
create table if not exists public.appointments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  patient_type text not null check (patient_type in ('new','existing')),
  name         text not null,
  phone        text not null,
  concern      text,            -- concern (new) or reason for visit (existing)
  preferred_date text,
  preferred_time text,
  source       text,            -- which CTA opened the modal (hero, contact, ...)
  status       text not null default 'new'
);

-- ---------- Enquiries (from the Contact page message form) ----------
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  message     text not null,
  status      text not null default 'new'
);

-- ---------- Row-Level Security ----------
alter table public.appointments enable row level security;
alter table public.enquiries    enable row level security;

-- Allow the public site (anon key) to INSERT only. No select/update/delete.
drop policy if exists "anon can insert appointments" on public.appointments;
create policy "anon can insert appointments"
  on public.appointments for insert to anon
  with check (true);

drop policy if exists "anon can insert enquiries" on public.enquiries;
create policy "anon can insert enquiries"
  on public.enquiries for insert to anon
  with check (true);

-- (Clinic staff read the data from the Supabase dashboard, or later via an
--  authenticated admin panel — never with the public anon key.)
