
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getJuniorProfiles } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { JuniorProfile } from "@/types/database";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileFooter from "@/components/profile/ProfileFooter";
import ProfileContent from "@/components/profile/ProfileContent";

const JuniorProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<JuniorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const { data, error } = await getJuniorProfiles()
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error && !error.message.includes('No rows found')) {
        throw error;
      }
      
      // If profile exists in database, use it
      if (data) {
        setProfile(data as JuniorProfile);
      } else {
        // Otherwise create a new profile using user metadata
        const userData = user.user_metadata;
        
        // Make sure to explicitly set id as it's required for the insert
        const newProfile = {
          id: user.id,
          name: userData?.name || null,
          gender: userData?.gender || null,
          email: userData?.email || null,
          phone: userData?.phone || null,
        };
        
        // Insert the new profile
        const { error: insertError } = await getJuniorProfiles()
          .insert([newProfile]);  // Pass as array to fix TypeScript error
          
        if (insertError) throw insertError;
        
        // Set the new profile for immediate display
        setProfile(newProfile as JuniorProfile);
      }
    } catch (error: any) {
      console.error("Profile fetch error:", error);
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c7bb5]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      <ProfileHeader />

      <main className="flex-grow py-6 px-4">
        <ProfileContent profile={profile} user={user} />
      </main>

      <ProfileFooter />
    </div>
  );
};

export default JuniorProfilePage;
