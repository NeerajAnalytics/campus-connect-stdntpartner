-- Fix RLS policies to allow service role to create profiles during signup
-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own junior profile" ON public.junior_profile;
DROP POLICY IF EXISTS "Users can insert own senior profile" ON public.senior_profiles;
DROP POLICY IF EXISTS "Users can insert their own senior profile" ON public.senior_profiles;

-- Create new policies that allow both authenticated users and service role
CREATE POLICY "Enable insert for authenticated users and service role" ON public.junior_profile
FOR INSERT WITH CHECK (
  auth.uid() = id OR 
  auth.jwt() ->> 'role' = 'service_role'
);

CREATE POLICY "Enable insert for authenticated users and service role" ON public.senior_profiles  
FOR INSERT WITH CHECK (
  auth.uid() = id OR 
  auth.jwt() ->> 'role' = 'service_role'
);

-- Create verification codes table for password reset
CREATE TABLE public.verification_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  code text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone DEFAULT (now() + interval '10 minutes'),
  used boolean DEFAULT false
);

-- Enable RLS on verification codes
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Anyone can insert verification codes (for password reset)
CREATE POLICY "Anyone can insert verification codes" ON public.verification_codes
FOR INSERT WITH CHECK (true);

-- Anyone can select their own verification codes 
CREATE POLICY "Users can view verification codes by email" ON public.verification_codes
FOR SELECT USING (true);

-- Anyone can update verification codes (to mark as used)
CREATE POLICY "Anyone can update verification codes" ON public.verification_codes
FOR UPDATE USING (true);

-- Clean up expired codes automatically
CREATE OR REPLACE FUNCTION public.cleanup_expired_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM public.verification_codes 
  WHERE expires_at < now() OR (used = true AND created_at < now() - interval '1 hour');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;