
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthContextType } from "@/types/auth";
import { signUpUser, signInUser, signOutUser, updateUserPassword } from "@/services/authService";
import { createProfileIfNotExists, updateUserProfile, updateSeniorProfile } from "@/services/profileService";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { navigateAfterSignUp, navigateAfterSignIn, navigateAfterSignOut } = useAuthNavigation();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state change:", event, newSession?.user?.id);
        // Only update with synchronous state updates here
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Use setTimeout to avoid deadlock with other Supabase calls
        if (newSession?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            console.log("Creating profile for signed in user:", newSession.user.id);
            // Create a profile for the user if it doesn't exist
            createProfileIfNotExists(newSession.user.id, newSession.user.user_metadata);
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, gender: string, collegeId?: string, rollNo?: string, phone?: string, region?: string) => {
    try {
      const result = await signUpUser(email, password, name, gender, collegeId, rollNo, phone, region);
      navigateAfterSignUp(result.isSenior);
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
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
