
// Define our own database types that work with the existing Supabase client
export interface Profile {
  id: string;
  name: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeniorProfile {
  id: string;
  name: string | null;
  gender: string | null;
  college_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string | null;
  issue_description: string;
  proofs?: string | null;
  senior_name?: string | null;
  senior_branch?: string | null;
  senior_phone?: string | null;
  senior_email?: string | null;
  senior_college_id?: string | null;
  created_at: string;
}

// Add table type definitions for type-safe database access
export interface Tables {
  profiles: Profile;
  senior_profiles: SeniorProfile;
  reports: Report;
}
