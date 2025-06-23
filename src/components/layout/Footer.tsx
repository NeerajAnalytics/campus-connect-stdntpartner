
import React from "react";
import { Link } from "react-router-dom";
import { useUserNavigation } from "@/hooks/useUserNavigation";

const Footer: React.FC = () => {
  const { navigateToHome, isLoggedIn, isSenior } = useUserNavigation();

  const handleCampusConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToHome();
  };

  const getHomeLink = () => {
    if (!isLoggedIn) return "/";
    return isSenior ? "/senior-home" : "/junior-home";
  };

  const getFAQLink = () => {
    if (!isLoggedIn) return "/junior-faq";
    return isSenior ? "/senior-faq" : "/junior-faq";
  };

  const getTermsLink = () => {
    if (!isLoggedIn) return "/junior-terms";
    return isSenior ? "/senior-terms" : "/junior-terms";
  };

  return (
    <footer className="border-t border-gray-300 mt-auto">
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <button 
            onClick={handleCampusConnectClick}
            className="text-[#5c7bb5] text-xl font-semibold hover:text-[#4a6ba3] transition-colors"
          >
            CampusConnect
          </button>
          <div className="flex items-center gap-8 text-sm">
            <Link to={getHomeLink()} className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to={getFAQLink()} className="text-gray-700 hover:text-gray-900">
              FAQ's
            </Link>
            <Link to={getTermsLink()} className="text-gray-700 hover:text-gray-900">
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

export default Footer;
