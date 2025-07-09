
import React from "react";
import { JuniorProfile } from "@/types/database";
import { User } from "@supabase/supabase-js";

interface ProfileInfoProps {
  profile: JuniorProfile | null;
  user: User | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, user }) => {
  // Get user metadata which contains name and gender from sign up
  const userMetadata = user?.user_metadata || {};
  
  // Use profile data if available, fallback to user metadata
  const name = profile?.name || userMetadata.name || 'Not set';
  const gender = profile?.gender || userMetadata.gender || 'Not set';

  return (
    <div className="space-y-6 mb-6">
      <div>
        <h3 className="font-semibold mb-1">Name</h3>
        <p className="text-gray-800">{name}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">G Mail</h3>
        <p className="text-gray-800">{user?.email}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Gender</h3>
        <p className="text-gray-800">{gender}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Password</h3>
        <p className="text-gray-800">••••••••</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
