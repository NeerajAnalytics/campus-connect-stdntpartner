-- Clean up duplicate profiles first, then apply constraints
-- First, identify and remove duplicate junior profiles
WITH ranked_juniors AS (
  SELECT id, email, 
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) as rn
  FROM public.junior_profile 
  WHERE email IS NOT NULL
)
DELETE FROM public.junior_profile 
WHERE id IN (
  SELECT id 
  FROM ranked_juniors 
  WHERE rn > 1
);

-- Clean up duplicate senior profiles
WITH ranked_seniors AS (
  SELECT id, email, 
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) as rn
  FROM public.senior_profiles 
  WHERE email IS NOT NULL
)
DELETE FROM public.senior_profiles 
WHERE id IN (
  SELECT id 
  FROM ranked_seniors 
  WHERE rn > 1
);

-- Now add unique constraints
ALTER TABLE public.junior_profile 
ADD CONSTRAINT unique_junior_email UNIQUE (email);

ALTER TABLE public.senior_profiles 
ADD CONSTRAINT unique_senior_email UNIQUE (email);

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_verification_codes_email_code ON public.verification_codes (email, code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON public.verification_codes (expires_at);