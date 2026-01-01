-- Create registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  age INTEGER NOT NULL,
  nationality TEXT,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  class TEXT NOT NULL,
  registration_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Disable Row Level Security for public registration
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- Create an index on email for faster lookups
CREATE INDEX idx_registrations_email ON registrations(email);

-- Create an index on registration_date for sorting
CREATE INDEX idx_registrations_date ON registrations(registration_date DESC);

-- Create admin users table (optional - for admin authentication)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow admins to read their own data
CREATE POLICY "Admins can read own data" ON admin_users
FOR SELECT USING (auth.uid() = id);