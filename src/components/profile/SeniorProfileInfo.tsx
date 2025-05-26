
import React from "react";
import { SeniorProfile } from "@/types/database";
import { User } from "@supabase/supabase-js";

interface SeniorProfileInfoProps {
  profile: SeniorProfile | null;
  user: User | null;
}

const SeniorProfileInfo: React.FC<SeniorProfileInfoProps> = ({ profile, user }) => {
  // Get user metadata which contains name, gender, and college_id from sign up
  const userMetadata = user?.user_metadata || {};
  
  // Use profile data if available, fallback to user metadata
  const name = profile?.name || userMetadata.name || 'Not set';
  const gender = profile?.gender || userMetadata.gender || 'Not set';
  const collegeId = profile?.college_id || userMetadata.college_id || 'Not set';

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
      
      <div>
        <h3 className="font-semibold mb-1">College ID</h3>
        <p className="text-gray-800">{collegeId}</p>
      </div>
    </div>
  );
};

export default SeniorProfileInfo;
