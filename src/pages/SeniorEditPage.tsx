
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getSeniorProfiles } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { SeniorProfile } from "@/types/database";
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader";
import SeniorProfileFooter from "@/components/profile/SeniorProfileFooter";
import SeniorEditProfileForm from "@/components/profile/SeniorEditProfileForm";

const SeniorEditPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
      
      setProfile(data as SeniorProfile);
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

  const handleSave = async (name: string, gender: string, collegeId: string, rollNo: string, phone: string, email: string, region: string, password: string) => {
    try {
      if (!user) throw new Error("User not authenticated");

      // Update senior profile in database
      const updateData: Partial<SeniorProfile> = {};
      if (name) updateData.name = name;
      if (gender) updateData.gender = gender;
      if (collegeId) updateData.college_id = collegeId;
      if (rollNo) updateData.roll_no = rollNo;
      if (phone) updateData.phone = phone;
      if (email) updateData.email = email;
      if (region) updateData.region = region;

      if (Object.keys(updateData).length > 0) {
        const { error: profileError } = await getSeniorProfiles()
          .update(updateData)
          .eq('id', user.id);

        if (profileError) throw profileError;
      }

      // Update password if provided
      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password,
        });

        if (passwordError) throw passwordError;
      }

      toast({
        title: "Profile updated successfully!",
      });

      navigate("/senior-profile");
    } catch (error: any) {
      throw error;
    }
  };

  // Get user metadata which contains data from sign up
  const userMetadata = user?.user_metadata || {};
  
  // Use profile data if available, fallback to user metadata
  const initialName = profile?.name || userMetadata.name || '';
  const initialGender = profile?.gender || userMetadata.gender || '';
  const initialCollegeId = profile?.college_id || userMetadata.college_id || '';
  const initialRollNo = profile?.roll_no || userMetadata.roll_no || '';
  const initialPhone = profile?.phone || userMetadata.phone || '';
  const initialEmail = profile?.email || user?.email || '';
  const initialRegion = profile?.region || userMetadata.region || '';

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      <SeniorProfileHeader />

      <main className="flex-grow py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/def5486f-4474-4ec4-b0e0-98c951a89062.png" 
              alt="CampusConnect Logo" 
              className="w-24 h-24"
            />
          </div>

          <div className="bg-white rounded-lg p-6">
            <SeniorEditProfileForm
              initialName={initialName}
              initialGender={initialGender}
              initialCollegeId={initialCollegeId}
              initialRollNo={initialRollNo}
              initialPhone={initialPhone}
              initialEmail={initialEmail}
              initialRegion={initialRegion}
              isLoading={loading}
              onSave={handleSave}
            />
          </div>
        </div>
      </main>

      <SeniorProfileFooter />
    </div>
  );
};

export default SeniorEditPage;
