
import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader: React.FC = () => {
  return (
    <header className="border-b border-gray-300">
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/junior-home" className="text-[#5c7bb5] text-xl font-semibold">
            CampusConnect
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
            <Link to="/connect-with-senior" className="text-gray-700 hover:text-gray-900">
              Connect with Senior
            </Link>
            <Link to="/junior-report" className="text-gray-700 hover:text-gray-900">
              Report
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
