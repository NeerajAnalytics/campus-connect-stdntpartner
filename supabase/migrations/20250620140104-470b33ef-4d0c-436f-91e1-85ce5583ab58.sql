
-- First, let's add the missing columns to senior_profiles table for contact information
ALTER TABLE public.senior_profiles 
ADD COLUMN IF NOT EXISTS roll_no TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS region TEXT;

-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create comprehensive RLS policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Enable RLS on senior_profiles table if not already enabled
ALTER TABLE public.senior_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view own senior profile" ON public.senior_profiles;
DROP POLICY IF EXISTS "Users can insert own senior profile" ON public.senior_profiles;
DROP POLICY IF EXISTS "Users can update own senior profile" ON public.senior_profiles;
DROP POLICY IF EXISTS "Anyone can view senior profiles" ON public.senior_profiles;

-- Create RLS policies for senior_profiles table
CREATE POLICY "Users can view own senior profile" ON public.senior_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own senior profile" ON public.senior_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own senior profile" ON public.senior_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow juniors to view all senior profiles for the connect page
CREATE POLICY "Anyone can view senior profiles" ON public.senior_profiles
  FOR SELECT USING (true);
