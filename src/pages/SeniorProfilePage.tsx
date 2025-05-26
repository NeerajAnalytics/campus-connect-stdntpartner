import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getSeniorProfiles } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { SeniorProfile } from "@/types/database";
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader";
import SeniorProfileFooter from "@/components/profile/SeniorProfileFooter";
import SeniorProfileContent from "@/components/profile/SeniorProfileContent";

const SeniorProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SeniorProfile | null>(null);
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

      const { data, error } = await getSeniorProfiles()
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error && !error.message.includes('No rows found')) {
        throw error;
      }
      
      // If profile exists in database, use it
      if (data) {
        setProfile(data as SeniorProfile);
      } else {
        // Otherwise create a new profile using user metadata
        const userData = user.user_metadata;
        
        // Make sure to explicitly set id as it's required for the insert
        const newProfile = {
          id: user.id,
          name: userData?.name || null,
          gender: userData?.gender || null,
          college_id: userData?.college_id || null,
        };
        
        // Insert the new profile
        const { error: insertError } = await getSeniorProfiles()
          .insert([newProfile]);
          
        if (insertError) throw insertError;
        
        // Set the new profile for immediate display
        setProfile(newProfile as SeniorProfile);
      }
    } catch (error: any) {
      console.error("Senior profile fetch error:", error);
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
      <SeniorProfileHeader />

      <main className="flex-grow py-6 px-4">
        <SeniorProfileContent profile={profile} user={user} />
      </main>

      <SeniorProfileFooter />
    </div>
  );
};

export default SeniorProfilePage;
