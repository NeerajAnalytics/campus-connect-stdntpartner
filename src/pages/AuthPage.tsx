
import React from "react";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const AuthPage: React.FC = () => {
  return <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold mb-8">
          CampusConnect
        </Link>
        
        <h2 className="text-[#1a4e8a] text-2xl mb-12 my-[12px] font-semibold">
          Select Your Path
        </h2>

        <div className="flex flex-col gap-4 mb-8 my-0 py-0 px-[35px] mx-0">
          <Link to="/junior-login" className="bg-[#1a4e8a] text-white rounded-full text-lg font-medium hover:bg-[#153e75] transition-colors mx-0 py-[11px] px-[76px] my-[43px]">
            Junior
          </Link>
          <Link to="/senior-login" className="bg-[#1a4e8a] text-white py-2.5 rounded-full text-lg font-medium hover:bg-[#153e75] transition-colors px-[76px]">
            Senior
          </Link>
        </div>
      </main>
      <Footer />
    </div>;
};

export default AuthPage;
