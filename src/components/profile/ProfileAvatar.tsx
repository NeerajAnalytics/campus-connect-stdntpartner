
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const ProfileAvatar: React.FC = () => {
  const { user } = useAuth();
  
  // Get the first letter of the email to display in avatar
  const getInitial = () => {
    if (!user?.email) return "?";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
      <div className="w-24 h-24 overflow-hidden flex-shrink-0">
        <Avatar className="w-full h-full">
          <AvatarImage src="" alt="Profile" />
          <AvatarFallback className="bg-green-500 text-white text-4xl">
            {getInitial()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProfileAvatar;
