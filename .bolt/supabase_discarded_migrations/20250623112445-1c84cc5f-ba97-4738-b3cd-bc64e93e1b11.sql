
-- Fix the reports table schema by adding the missing junior_branch column
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS junior_branch TEXT;

-- Add missing senior report related columns to reports table
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS junior_name TEXT,
ADD COLUMN IF NOT EXISTS junior_phone TEXT,
ADD COLUMN IF NOT EXISTS junior_email TEXT,
ADD COLUMN IF NOT EXISTS roll_no TEXT;

-- Enable RLS on reports table if not already enabled
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for reports table
DROP POLICY IF EXISTS "Users can view own reports" ON public.reports;
DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;
DROP POLICY IF EXISTS "Users can update own reports" ON public.reports;
DROP POLICY IF EXISTS "Users can delete own reports" ON public.reports;

CREATE POLICY "Users can view own reports" ON public.reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports" ON public.reports
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports" ON public.reports
  FOR DELETE USING (auth.uid() = user_id);
