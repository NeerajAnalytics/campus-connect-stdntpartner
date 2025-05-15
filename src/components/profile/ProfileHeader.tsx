
import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader: React.FC = () => {
  return (
    <header className="bg-[#edf1f8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold">
            CampusConnect
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/connect-with-senior" className="text-gray-700 hover:text-gray-900">
              Connect With Senior
            </Link>
            <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
              Accommodation
            </Link>
            <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
