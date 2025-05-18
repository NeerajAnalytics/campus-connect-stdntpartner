
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getProfiles } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileFooter from "@/components/profile/ProfileFooter";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import EditProfileForm from "@/components/profile/EditProfileForm";

const JuniorEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
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

      const { data, error } = await getProfiles()
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error && !error.message.includes('No rows found')) throw error;
      
      if (data) {
        setName(data.name || '');
        setGender(data.gender || '');
      }
    } catch (error: any) {
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (name: string, gender: string, password: string) => {
    try {
      const updateData: {name?: string; gender?: string; password?: string} = {};
      
      if (name) updateData.name = name;
      if (gender) updateData.gender = gender;
      if (password) updateData.password = password;

      await updateProfile(updateData);
      navigate("/junior-profile");
    } catch (error: any) {
      throw error;
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <hr className="border-gray-300 mb-6" />
          
          <ProfileAvatar />
          
          <EditProfileForm 
            initialName={name}
            initialGender={gender}
            isLoading={false}
            onSave={handleSave}
          />
        </div>
      </main>

      <ProfileFooter />
    </div>
  );
};

export default JuniorEditPage;
