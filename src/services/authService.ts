
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const signUpUser = async (
  email: string, 
  password: string, 
  name: string, 
  gender: string,
  collegeId?: string,
  rollNo?: string,
  phone?: string,
  region?: string
) => {
  const userData: any = {
    name,
    gender,
  };
  
  // Add senior-specific data if provided
  if (collegeId) {
    userData.college_id = collegeId;
    userData.roll_no = rollNo;
    userData.phone = phone;
    userData.email = email;
    userData.region = region;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/junior-login`,
    }
  });

  if (error) throw error;

  toast({
    title: "Sign up successful!",
    description: "Please check your email to confirm your account before logging in.",
  });

  return { success: true, isSenior: !!collegeId };
};

export const signInUser = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // If the error mentions email not confirmed, provide specific guidance
    if (error.message.includes("Email not confirmed")) {
      // Send another confirmation email
      await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      throw new Error("Please check your email to confirm your account. A new confirmation email has been sent.");
    }
    throw error;
  }

  toast({
    title: "Signed in successfully!",
  });

  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const updateUserPassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) throw error;
};
