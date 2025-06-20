
import { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, gender: string, collegeId?: string, rollNo?: string, phone?: string, region?: string) => Promise<void>;
  signIn: (email: string, password: string, userType?: 'junior' | 'senior') => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: {name?: string; gender?: string; password?: string}) => Promise<void>;
}
