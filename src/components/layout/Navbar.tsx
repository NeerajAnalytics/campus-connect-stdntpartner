
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-[#5c7bb5] text-2xl font-['Poppins'] font-semibold">
            CampusConnect
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/connect" className="text-gray-700 hover:text-gray-900">
              Connect With Senior
            </Link>
            <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
              Accommodation
            </Link>
            <Link
              to="/login"
              className="bg-[#7d9bd2] text-white px-6 py-2 rounded-full hover:bg-[#6b89c0] transition-colors"
            >
              Login/Sign-up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
