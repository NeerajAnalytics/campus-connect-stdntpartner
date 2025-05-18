
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, getProfiles } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Profile } from "@/types/database";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, gender: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: {name?: string; gender?: string; password?: string}) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        // Only update with synchronous state updates here
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Use setTimeout to avoid deadlock with other Supabase calls
        if (newSession?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            // Create a profile for the user if it doesn't exist
            createProfileIfNotExists(newSession.user.id);
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
  
  // Helper function to create a profile if it doesn't exist
  const createProfileIfNotExists = async (userId: string) => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await getProfiles()
        .select()
        .eq('id', userId)
        .maybeSingle();
        
      if (fetchError && !fetchError.message.includes('No rows found')) throw fetchError;
      
      // If no profile exists, create one
      if (!existingProfile) {
        const userData = user?.user_metadata;
        const { error: insertError } = await getProfiles().insert({
          id: userId,
          name: userData?.name || null,
          gender: userData?.gender || null,
        });
        
        if (insertError) throw insertError;
      }
    } catch (error) {
      console.error("Error checking/creating profile:", error);
    }
  };

  const signUp = async (email: string, password: string, name: string, gender: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            gender,
          },
          emailRedirectTo: `${window.location.origin}/junior-login`,
        }
      });

      if (error) throw error;

      toast({
        title: "Sign up successful!",
        description: "Please check your email to confirm your account before logging in.",
      });

      navigate("/junior-login");
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
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

      // Successfully signed in, now navigate to the home page
      navigate("/junior-home");
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/junior-login");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: {name?: string; gender?: string; password?: string}) => {
    try {
      if (data.password) {
        // Update password
        const { error: passwordError } = await supabase.auth.updateUser({
          password: data.password,
        });

        if (passwordError) throw passwordError;
      }

      if (data.name || data.gender) {
        // Only update profile if we have name or gender changes
        const updateData: Partial<Profile> = {};
        if (data.name) updateData.name = data.name;
        if (data.gender) updateData.gender = data.gender;

        if (!user) throw new Error("User not authenticated");

        // Use the type-safe helper function
        const { error: profileError } = await getProfiles()
          .update(updateData)
          .eq('id', user.id);

        if (profileError) throw profileError;
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
