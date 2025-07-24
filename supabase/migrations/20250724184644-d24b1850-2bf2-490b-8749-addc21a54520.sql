-- Fix database security warnings and add constraints
-- Update existing functions with proper search_path settings

-- Update cleanup_expired_codes function
CREATE OR REPLACE FUNCTION public.cleanup_expired_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.verification_codes 
  WHERE expires_at < now() OR (used = true AND created_at < now() - interval '1 hour');
END;
$$;

-- Update handle_updated_at function  
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Add unique constraint on email for junior_profile
ALTER TABLE public.junior_profile 
ADD CONSTRAINT unique_junior_email UNIQUE (email);

-- Add unique constraint on email for senior_profiles
ALTER TABLE public.senior_profiles 
ADD CONSTRAINT unique_senior_email UNIQUE (email);

-- Add index on verification_codes email for better performance
CREATE INDEX IF NOT EXISTS idx_verification_codes_email_code ON public.verification_codes (email, code);

-- Add index on verification_codes expires_at for cleanup performance
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON public.verification_codes (expires_at);

-- Clean up any existing duplicate profiles
DELETE FROM public.junior_profile 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM public.junior_profile 
    GROUP BY email
);

DELETE FROM public.senior_profiles 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM public.senior_profiles 
    GROUP BY email
);