
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const JuniorEditPage: React.FC = () => {
  const [name, setName] = useState("I'm user");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("helloworldpassword");

  const handleSave = () => {
    // Here would go the logic to save the updated profile
    // For now, we'll just redirect back to the profile page
    window.location.href = "/junior-profile";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      {/* Header/Navigation */}
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

      {/* Main Content */}
      <main className="flex-grow py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">My Profile</h2>
          <hr className="border-gray-300 mb-6" />
          
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
          
          <div className="space-y-6 mb-6">
            <div>
              <h3 className="font-semibold mb-1">Name</h3>
              <Input 
                type="text" 
                placeholder="Enter New Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Gender</h3>
              <Input 
                type="text" 
                placeholder="Male" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Password</h3>
              <Input 
                type="password" 
                placeholder="Enter New Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300"
              />
            </div>
          </div>
          
          <hr className="border-gray-300 mb-6" />
          
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md px-8"
            >
              Save
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-auto">
        <div className="bg-white py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-[#5c7bb5] text-xl font-semibold">
              CampusConnect
            </Link>
            <div className="flex items-center gap-8 text-sm">
              <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/junior-faq" className="text-gray-700 hover:text-gray-900">
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
    </div>
  );
};

export default JuniorEditPage;
