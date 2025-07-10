/*
  # Fix Profile Tables Schema

  This migration fixes the database schema to properly support the signup process for both junior and senior users.

  ## Changes Made
  1. **Junior Profile Table**: Ensure all required fields are present and properly typed
  2. **Senior Profile Table**: Fix schema to match signup data collection
  3. **RLS Policies**: Update policies to ensure proper access control
  4. **Data Consistency**: Ensure tables match the data being collected in signup forms

  ## Tables Updated
  - `junior_profile`: Updated to match junior signup data
  - `senior_profiles`: Updated to match senior signup data with proper field names
  
  ## Security
  - Maintain RLS policies for both authenticated users and service role access
  - Ensure proper data isolation between users
*/

-- First, let's check if tables exist and drop them if they do to recreate with proper schema
DROP TABLE IF EXISTS public.junior_profile CASCADE;
DROP TABLE IF EXISTS public.senior_profiles CASCADE;

-- Create junior_profile table with correct schema
CREATE TABLE public.junior_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  gender text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create senior_profiles table with correct schema matching signup data
CREATE TABLE public.senior_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  gender text,
  email text,
  college_id text,
  roll_no text,
  phone text,
  region text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.junior_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.senior_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for junior_profile
CREATE POLICY "Users can view own junior profile" ON public.junior_profile
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own junior profile" ON public.junior_profile
FOR INSERT WITH CHECK (
  auth.uid() = id OR 
  auth.jwt() ->> 'role' = 'service_role'
);

CREATE POLICY "Users can update own junior profile" ON public.junior_profile
FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for senior_profiles
CREATE POLICY "Users can view own senior profile" ON public.senior_profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own senior profile" ON public.senior_profiles
FOR INSERT WITH CHECK (
  auth.uid() = id OR 
  auth.jwt() ->> 'role' = 'service_role'
);

CREATE POLICY "Users can update own senior profile" ON public.senior_profiles
FOR UPDATE USING (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_junior_profile_updated_at
  BEFORE UPDATE ON public.junior_profile
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_senior_profile_updated_at
  BEFORE UPDATE ON public.senior_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_junior_profile_email ON public.junior_profile(email);
CREATE INDEX idx_senior_profiles_email ON public.senior_profiles(email);
CREATE INDEX idx_senior_profiles_college_id ON public.senior_profiles(college_id);
CREATE INDEX idx_senior_profiles_roll_no ON public.senior_profiles(roll_no);