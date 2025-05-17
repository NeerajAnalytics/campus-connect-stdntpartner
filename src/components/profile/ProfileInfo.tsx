
import React from "react";
import { Profile } from "@/types/database";
import { User } from "@supabase/supabase-js";

interface ProfileInfoProps {
  profile: Profile | null;
  user: User | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, user }) => {
  return (
    <div className="space-y-6 mb-6">
      <div>
        <h3 className="font-semibold mb-1">Name</h3>
        <p className="text-gray-800">{profile?.name || 'Not set'}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">G Mail</h3>
        <p className="text-gray-800">{user?.email}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Gender</h3>
        <p className="text-gray-800">{profile?.gender || 'Not set'}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Password</h3>
        <p className="text-gray-800">••••••••</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
