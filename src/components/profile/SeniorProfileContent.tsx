
import React from "react";
import { SeniorProfile } from "@/types/database";
import { User } from "@supabase/supabase-js";
import SeniorProfileAvatar from "./SeniorProfileAvatar";
import SeniorProfileInfo from "./SeniorProfileInfo";
import SeniorProfileActions from "./SeniorProfileActions";

interface SeniorProfileContentProps {
  profile: SeniorProfile | null;
  user: User | null;
}

const SeniorProfileContent: React.FC<SeniorProfileContentProps> = ({ profile, user }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">My Profile</h2>
      <hr className="border-gray-300 mb-6" />
      
      <SeniorProfileAvatar />
      <SeniorProfileInfo profile={profile} user={user} />
      
      <hr className="border-gray-300 mb-6" />
      
      <SeniorProfileActions />
    </div>
  );
};

export default SeniorProfileContent;
