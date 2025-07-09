
// Define our own database types that work with the existing Supabase client
export interface JuniorProfile {
  id: string;
  name: string | null;
  gender: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface SeniorProfile {
  id: string;
  name: string | null;
  gender: string | null;
  college_id: string | null;
  roll_no: string | null;
  phone: string | null;
  email: string | null;
  region: string | null;
  created_at: string;
  updated_at: string;
}

// Add table type definitions for type-safe database access
export interface Tables {
  junior_profile: JuniorProfile;
  senior_profiles: SeniorProfile;
}
