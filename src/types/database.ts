
// Define our own database types that work with the existing Supabase client
export interface Profile {
  id: string;
  name: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  issue_description: string;
  proofs?: string;
  senior_name?: string;
  senior_branch?: string;
  senior_phone?: string;
  senior_email?: string;
  senior_college_id?: string;
  created_at: string;
}
