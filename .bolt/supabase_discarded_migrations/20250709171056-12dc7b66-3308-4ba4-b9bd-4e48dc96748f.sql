-- Rename profiles table to junior_profile for clarity
ALTER TABLE public.profiles RENAME TO junior_profile;

-- Add missing columns to junior_profile table
ALTER TABLE public.junior_profile 
ADD COLUMN email TEXT,
ADD COLUMN phone TEXT;

-- Update RLS policies to use new table name
DROP POLICY IF EXISTS "Users can insert own profile" ON public.junior_profile;
DROP POLICY IF EXISTS "Users can update own profile" ON public.junior_profile;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.junior_profile;
DROP POLICY IF EXISTS "Users can view own profile" ON public.junior_profile;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.junior_profile;

-- Create new RLS policies for junior_profile
CREATE POLICY "Users can insert own junior profile" 
ON public.junior_profile 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own junior profile" 
ON public.junior_profile 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can view own junior profile" 
ON public.junior_profile 
FOR SELECT 
USING (auth.uid() = id);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_junior_profile_email ON public.junior_profile(email);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_junior_profile_updated_at
    BEFORE UPDATE ON public.junior_profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();