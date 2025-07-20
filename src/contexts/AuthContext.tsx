
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthContextType } from "@/types/auth";
import { signUpUser, signInUser, signOutUser, updateUserPassword } from "@/services/authService";
import { updateUserProfile, updateSeniorProfile } from "@/services/profileService";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Now this should work because AuthProvider is inside BrowserRouter
  const { navigateAfterSignUp, navigateAfterSignIn, navigateAfterSignOut } = useAuthNavigation();

  useEffect(() => {
    console.log('Setting up auth listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state change:', event, newSession?.user?.id);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, gender: string, collegeId?: string, rollNo?: string, phone?: string, region?: string) => {
    try {
      console.log("Starting signup process with email:", email);
      
      const userData: any = {
        name,
        gender,
        email,
        phone: phone || null,
      };
      
      // Add senior-specific data if provided
      if (collegeId || rollNo) {
        userData.college_id = collegeId || rollNo;
        userData.roll_no = rollNo || collegeId;
        userData.region = region;
      }

      console.log("User data prepared for signup:", userData);

      // Sign up the user first
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/junior-login`,
        }
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      console.log("User signed up successfully:", data.user?.id);

      // Wait a moment for auth to settle
      await new Promise(resolve => setTimeout(resolve, 1000));

      const isSenior = !!(collegeId || rollNo);
      console.log("Calling create-profile function with isSenior:", isSenior);

      // Create profile using service role via edge function
      const profileResponse = await supabase.functions.invoke('create-profile', {
        body: {
          userId: data.user?.id,
          userData: userData,
          isSenior: isSenior
        }
      });

      console.log("Profile response:", profileResponse);

      if (profileResponse.error) {
        console.error("Profile creation error:", profileResponse.error);
        throw new Error(`Failed to create profile: ${profileResponse.error.message || 'Edge Function returned a non-2xx status code'}`);
      }

      console.log("Profile created successfully");

      toast({
        title: "Sign up successful!",
        description: "Your account has been created successfully. You can now log in.",
      });

      navigateAfterSignUp(isSenior);
    } catch (error: any) {
      console.error("Signup process failed:", error);
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error; // Re-throw to allow calling component to handle
    }
  };

  const signIn = async (email: string, password: string, userType?: 'junior' | 'senior') => {
    try {
      const data = await signInUser(email, password);
      const userData = data.user?.user_metadata;
      navigateAfterSignIn(userType, userData);
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      navigateAfterSignOut();
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: {
    name?: string; 
    gender?: string; 
    password?: string;
    roll_no?: string;
    phone?: string;
    email?: string;
    region?: string;
  }) => {
    try {
      if (data.password) {
        await updateUserPassword(data.password);
      }

      if (!user) throw new Error("User not authenticated");

      // Check if this is a senior user by checking if they have senior-specific fields
      const isSenior = user.user_metadata?.college_id || user.user_metadata?.roll_no || 
                      data.roll_no || data.phone || data.region;

      if (isSenior) {
        // Update senior profile
        const seniorUpdateData: any = {};
        if (data.name !== undefined) seniorUpdateData.name = data.name;
        if (data.gender !== undefined) seniorUpdateData.gender = data.gender;
        if (data.roll_no !== undefined) seniorUpdateData.roll_no = data.roll_no;
        if (data.phone !== undefined) seniorUpdateData.phone = data.phone;
        if (data.email !== undefined) seniorUpdateData.email = data.email;
        if (data.region !== undefined) seniorUpdateData.region = data.region;

        await updateSeniorProfile(user.id, seniorUpdateData);
      } else {
        // Update regular profile
        if (data.name || data.gender) {
          await updateUserProfile(user.id, { name: data.name, gender: data.gender });
        }
      }

      toast({
        title: "Profile updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
