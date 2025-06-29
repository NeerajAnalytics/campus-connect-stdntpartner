
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";

const SeniorProfileHeader: React.FC = () => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-[#edf1f8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
            CampusConnect
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
              Accommodation
            </Link>
            <Link to="/senior-report" className="text-gray-700 hover:text-gray-900">
              Report
            </Link>
            <Link to="/senior-profile" className="text-gray-700 hover:text-gray-900">
              Profile
            </Link>
            <Button 
              variant="ghost"
              className="text-gray-700 hover:text-gray-900" 
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SeniorProfileHeader;
