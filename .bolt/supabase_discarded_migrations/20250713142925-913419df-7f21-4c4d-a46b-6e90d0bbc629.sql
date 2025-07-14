-- Fix all profile and storage issues
-- First, let's remove any foreign key constraints that might be blocking profile creation
ALTER TABLE public.junior_profile DROP CONSTRAINT IF EXISTS junior_profile_id_fkey;
ALTER TABLE public.senior_profiles DROP CONSTRAINT IF EXISTS senior_profiles_id_fkey;

-- Ensure RLS policies allow both authenticated users and service role to create profiles
DROP POLICY IF EXISTS "Users can insert own junior profile" ON public.junior_profile;
DROP POLICY IF EXISTS "Users can insert own senior profile" ON public.senior_profiles;

CREATE POLICY "Users can insert own junior profile" 
ON public.junior_profile 
FOR INSERT 
WITH CHECK (
  auth.uid() = id OR 
  auth.jwt() ->> 'role' = 'service_role' OR
  current_setting('role') = 'service_role'
);

CREATE POLICY "Users can insert own senior profile" 
ON public.senior_profiles 
FOR INSERT 
WITH CHECK (
  auth.uid() = id OR 
  auth.jwt() ->> 'role' = 'service_role' OR
  current_setting('role') = 'service_role'
);

-- Create storage buckets for avatars and documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/*']),
  ('documents', 'documents', false, 10485760, ARRAY['application/pdf', 'image/*', 'text/*'])
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for avatars (public bucket)
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'avatars' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'avatars' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'avatars' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);

-- Create storage policies for documents (private bucket)
CREATE POLICY "Users can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'documents' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);

CREATE POLICY "Users can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'documents' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);

CREATE POLICY "Users can update their own documents" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'documents' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);

CREATE POLICY "Users can delete their own documents" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'documents' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'service_role')
);