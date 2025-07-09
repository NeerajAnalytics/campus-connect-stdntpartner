
import React from "react";
import { JuniorProfile } from "@/types/database";
import { User } from "@supabase/supabase-js";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";

interface ProfileContentProps {
  profile: JuniorProfile | null;
  user: User | null;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profile, user }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">My Profile</h2>
      <hr className="border-gray-300 mb-6" />
      
      <ProfileAvatar />
      <ProfileInfo profile={profile} user={user} />
      
      <hr className="border-gray-300 mb-6" />
      
      <ProfileActions />
    </div>
  );
};

export default ProfileContent;
