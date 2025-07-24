import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { handleAuthError, validateEmail, validatePassword, sanitizeEmail } from "@/utils/authHelpers";


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
  try {
    // Validate inputs
    const cleanEmail = sanitizeEmail(email);
    if (!validateEmail(cleanEmail)) {
      throw new Error("Please enter a valid email address");
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.message || "Invalid password");
    }

    console.log("Signing up user with data:", {
      email: cleanEmail, name, gender, collegeId, rollNo, phone, region
    });
  
  const userData: any = {
    name,
    gender,
    email: cleanEmail, // Make sure email is included in metadata
  };
  
  // Add senior-specific data if provided
  if (collegeId || rollNo) {
    userData.college_id = collegeId || rollNo; // Use rollNo as college_id if collegeId is not provided
    userData.roll_no = rollNo || collegeId; // Use collegeId as roll_no if rollNo is not provided
    userData.phone = phone;
    userData.region = region;
    console.log("Senior signup data:", userData);
  } else {
    // For juniors, include phone in metadata
    userData.phone = phone;
  }

  const { error, data } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/junior-login`,
    }
  });

  if (error) {
    console.error("Signup error:", error);
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  // Create profile based on user type
  if (data.user) {
    if (collegeId || rollNo) {
      // Create senior profile
      const { error: profileError } = await supabase
        .from('senior_profiles')
        .insert({
          id: data.user.id,
          name,
          gender,
          email: cleanEmail,
          phone,
          college_id: collegeId,
          roll_no: rollNo,
          region,
        });

      if (profileError) {
        console.error('Error creating senior profile:', profileError);
        throw new Error('Failed to create senior profile: ' + profileError.message);
      }
    } else {
      // Create junior profile
      const { error: profileError } = await supabase
        .from('junior_profile')
        .insert({
          id: data.user.id,
          name,
          gender,
          email: cleanEmail,
          phone,
        });

      if (profileError) {
        console.error('Error creating junior profile:', profileError);
        throw new Error('Failed to create junior profile: ' + profileError.message);
      }
    }
  }

  toast({
    title: "Sign up successful!",
    description: "Your account has been created successfully. You can now log in.",
  });

  return { success: true, isSenior: !!(collegeId || rollNo) };
  } catch (error) {
    console.error("Signup error:", error);
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const cleanEmail = sanitizeEmail(email);
    if (!validateEmail(cleanEmail)) {
      throw new Error("Please enter a valid email address");
    }

    const { error, data } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

  if (error) {
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }

  toast({
    title: "Signed in successfully!",
  });

  return data;
  } catch (error) {
    console.error("Sign in error:", error);
    const authError = handleAuthError(error);
    throw new Error(authError.message);
  }
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