
import React from "react";
import { Link } from "react-router-dom";

const SeniorProfileFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-300 mt-auto">
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/senior-home" className="text-[#5c7bb5] text-xl font-semibold">
            CampusConnect
          </Link>
          <div className="flex items-center gap-8 text-sm">
            <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-gray-900">
              FAQ's
            </Link>
            <Link to="/terms" className="text-gray-700 hover:text-gray-900">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#7d9bd2] py-2 text-center text-black text-sm">
        <p>Copyright © Student Partner</p>
      </div>
    </footer>
  );
};

export default SeniorProfileFooter;
