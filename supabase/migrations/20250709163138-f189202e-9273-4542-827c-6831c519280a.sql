
-- Drop the reports table since it's no longer needed (reports are handled via Google Forms)
DROP TABLE IF EXISTS public.reports CASCADE;

-- Clean up any orphaned data and ensure email consistency in profiles tables
-- Remove any potential whitespace from emails in profiles table
UPDATE public.profiles 
SET name = TRIM(name) 
WHERE name IS NOT NULL AND name != TRIM(name);

-- Remove any potential whitespace from emails in senior_profiles table  
UPDATE public.senior_profiles 
SET email = TRIM(LOWER(email)),
    name = TRIM(name),
    roll_no = TRIM(roll_no),
    phone = TRIM(phone),
    region = TRIM(region)
WHERE email IS NOT NULL OR name IS NOT NULL OR roll_no IS NOT NULL OR phone IS NOT NULL OR region IS NOT NULL;

-- Ensure all emails in senior_profiles are lowercase and trimmed
UPDATE public.senior_profiles 
SET email = TRIM(LOWER(email))
WHERE email IS NOT NULL AND email != TRIM(LOWER(email));
