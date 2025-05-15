
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileAvatar: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
      <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
        <Avatar className="w-full h-full">
          <AvatarImage src="" alt="Profile" />
          <AvatarFallback className="bg-gray-300 text-gray-600 text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="text-gray-700">
          For the Profile it directly takes from Mail, and the Name is beside it.
        </p>
      </div>
    </div>
  );
};

export default ProfileAvatar;
