/*
# Create profiles and photos tables for FotoData

## Overview
Creates the database schema for a photo-logging app with username/password login,
per-user photo galleries, and monthly reporting. Three seed users with different
photo content are inserted so each user has their own gallery.

## 1. New Tables

### profiles
- `id` (uuid, primary key)
- `user_id` (uuid, unique, references auth.users ON DELETE CASCADE) — links to Supabase auth
- `username` (text, unique, not null) — the display username, changeable by the user
- `display_name` (text) — full name for display
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### photos
- `id` (uuid, primary key)
- `user_id` (uuid, not null, defaults to auth.uid(), references auth.users ON DELETE CASCADE)
- `image_url` (text, not null) — URL of the photo
- `caption` (text) — user-provided caption/description
- `photo_date` (date, not null) — the date the photo was logged
- `created_at` (timestamptz, default now())

## 2. Security
- RLS enabled on both `profiles` and `photos`.
- `profiles`: authenticated users can read all profiles (needed to show usernames),
  but can only update their own profile.
- `photos`: full CRUD scoped to owner via auth.uid() = user_id.
- Owner columns default to auth.uid() so inserts work without explicitly passing user_id.

## 3. Indexes
- Index on photos(user_id) for per-user queries.
- Index on photos(photo_date) for date-range filtering in reports.
- Index on photos(user_id, photo_date) for combined user+date queries.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  photo_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone authenticated can read all profiles (to see usernames)
DROP POLICY IF EXISTS "select_profiles" ON profiles;
CREATE POLICY "select_profiles" ON profiles FOR SELECT
  TO authenticated USING (true);

-- Profiles: users can only update their own profile (change username)
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Profiles: users can insert their own profile
DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Photos: owner-scoped CRUD
DROP POLICY IF EXISTS "select_own_photos" ON photos;
CREATE POLICY "select_own_photos" ON photos FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_photos" ON photos;
CREATE POLICY "insert_own_photos" ON photos FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_photos" ON photos;
CREATE POLICY "update_own_photos" ON photos FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_photos" ON photos;
CREATE POLICY "delete_own_photos" ON photos FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_photos_user_id ON photos(user_id);
CREATE INDEX IF NOT EXISTS idx_photos_photo_date ON photos(photo_date);
CREATE INDEX IF NOT EXISTS idx_photos_user_date ON photos(user_id, photo_date);
