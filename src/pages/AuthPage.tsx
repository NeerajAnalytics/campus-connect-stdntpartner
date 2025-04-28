
import React from "react";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold mb-12">
          CampusConnect
        </Link>
        
        <div className="w-full max-w-md mb-12">
          <img
            src="/lovable-uploads/83dd3bdf-de6a-43ad-824a-079319104396.png"
            alt="Students collaborating"
            className="w-full"
          />
        </div>

        <div className="flex gap-4 mb-8">
          <Link
            to="/login"
            className="bg-[#1a4e8a] text-white px-8 py-2.5 rounded-full text-lg font-medium hover:bg-[#153e75] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#1a4e8a] text-white px-8 py-2.5 rounded-full text-lg font-medium hover:bg-[#153e75] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
