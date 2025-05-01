
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const JuniorReportPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would go the logic to submit the report
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
          <h2 className="text-2xl font-semibold text-center mb-6">Report page for Juniors</h2>
          <hr className="border-gray-300 mb-6" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">We are Here to Help you.</h3>
            
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Your Name</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input type="text" className="border-gray-300" />
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Your Mail ID</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input type="email" className="border-gray-300" />
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Your Phone No</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input type="tel" className="border-gray-300" />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold mb-2">Describe The Issue:</div>
              <Textarea className="w-full border-gray-300" rows={3} />
            </div>
            
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Proofs (IF ANY)</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input type="text" className="border-gray-300" />
              </div>
            </div>
            
            <hr className="border-gray-300 my-6" />
            
            <div className="mb-4">
              <h3 className="font-semibold mb-4">Details of Senior, if your issue is with them:</h3>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">Name</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input type="text" className="border-gray-300" />
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">Branch</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input type="text" className="border-gray-300" />
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">Phone No</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input type="tel" className="border-gray-300" />
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">G-Mail</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input type="email" className="border-gray-300" />
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">College ID</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input type="text" className="border-gray-300" />
                </div>
              </div>
            </div>
            
            <hr className="border-gray-300 mb-6" />
            
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md px-8"
              >
                Submit
              </Button>
            </div>
          </form>
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

export default JuniorReportPage;
