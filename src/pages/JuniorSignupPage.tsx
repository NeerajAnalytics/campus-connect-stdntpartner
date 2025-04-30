
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import Footer from "../components/layout/Footer";

const JuniorSignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold">
            CampusConnect
          </Link>
          <div className="w-[50px]"></div> {/* Empty div for alignment */}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                G-Mail
              </label>
              <Input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium">
                Enter Password
              </label>
              <Input
                id="password"
                type="password"
                className="w-full border border-gray-300 rounded h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                className="w-full border border-gray-300 rounded h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block font-medium">
                Gender
              </label>
              <Input
                id="gender"
                type="text"
                className="w-full border border-gray-300 rounded h-12"
              />
            </div>

            <Link 
              to="/junior-login"
              className="w-full block text-center bg-[#7d9bd2] text-black py-2.5 px-4 rounded-full hover:bg-[#6b89c0] transition-colors"
            >
              Signup
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JuniorSignupPage;
