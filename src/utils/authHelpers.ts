import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export const handleAuthError = (error: any): AuthError => {
  const authError: AuthError = {
    message: "An unexpected error occurred",
    code: error?.code,
    status: error?.status,
  };

  // Handle specific Supabase auth errors
  if (error?.message) {
    switch (error.message) {
      case "Invalid login credentials":
        authError.message = "Invalid email or password. Please check your credentials and try again.";
        break;
      case "Email not confirmed":
        authError.message = "Please check your email and click the confirmation link to activate your account.";
        break;
      case "User not found":
        authError.message = "No account found with this email address. Please sign up first.";
        break;
      case "Email rate limit exceeded":
        authError.message = "Too many requests. Please wait a few minutes before trying again.";
        break;
      case "Signup disabled":
        authError.message = "Account creation is currently disabled. Please contact support.";
        break;
      case "Password should be at least 6 characters":
        authError.message = "Password must be at least 6 characters long.";
        break;
      case "User already registered":
        authError.message = "An account with this email already exists. Please try logging in instead.";
        break;
      default:
        authError.message = error.message;
    }
  }

  return authError;
};

export const showAuthError = (error: any) => {
  const authError = handleAuthError(error);
  toast({
    title: "Authentication Error",
    description: authError.message,
    variant: "destructive",
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long" };
  }
  if (password.length > 72) {
    return { valid: false, message: "Password must be less than 72 characters long" };
  }
  return { valid: true };
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const checkUserExists = async (email: string): Promise<{ exists: boolean; userType?: 'junior' | 'senior' }> => {
  const cleanEmail = sanitizeEmail(email);
  
  try {
    // Check junior profiles
    const { data: juniorProfile } = await supabase
      .from('junior_profile')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (juniorProfile) {
      return { exists: true, userType: 'junior' };
    }

    // Check senior profiles
    const { data: seniorProfile } = await supabase
      .from('senior_profiles')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (seniorProfile) {
      return { exists: true, userType: 'senior' };
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking user existence:', error);
    return { exists: false };
  }
};

export const getCurrentUserType = async (userId: string): Promise<'junior' | 'senior' | null> => {
  try {
    // Check junior profile first
    const { data: juniorProfile } = await supabase
      .from('junior_profile')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (juniorProfile) {
      return 'junior';
    }

    // Check senior profile
    const { data: seniorProfile } = await supabase
      .from('senior_profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (seniorProfile) {
      return 'senior';
    }

    return null;
  } catch (error) {
    console.error('Error determining user type:', error);
    return null;
  }
};