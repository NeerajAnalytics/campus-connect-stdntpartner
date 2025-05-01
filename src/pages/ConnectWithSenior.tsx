import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";

const ConnectWithSenior: React.FC = () => {
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
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Input 
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md" 
                placeholder="Search" 
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Doubts Section */}
          <h2 className="text-xl font-semibold mb-6">Doubts about Admission Process?</h2>
          
          {/* Senior Cards - First */}
          <div className="bg-[#8aa9db] rounded-md p-6 mb-6 flex items-start">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm mb-1">Name</div>
              <div className="space-y-2">
                <div className="flex">
                  <div className="w-24 font-medium">Roll No:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Phone:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">E-Mail:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Region:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Senior Cards - Second */}
          <div className="bg-[#8aa9db] rounded-md p-6 mb-6 flex items-start">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm mb-1">Name</div>
              <div className="space-y-2">
                <div className="flex">
                  <div className="w-24 font-medium">Roll No:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Phone:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">E-Mail:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Region:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Senior Cards - Third */}
          <div className="bg-[#8aa9db] rounded-md p-6 mb-6 flex items-start">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm mb-1">Name</div>
              <div className="space-y-2">
                <div className="flex">
                  <div className="w-24 font-medium">Roll No:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Phone:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">E-Mail:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Region:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Senior Cards - Fourth */}
          <div className="bg-[#8aa9db] rounded-md p-6 mb-6 flex items-start">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm mb-1">Name</div>
              <div className="space-y-2">
                <div className="flex">
                  <div className="w-24 font-medium">Roll No:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Phone:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">E-Mail:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Region:</div>
                  <div className="border-b border-gray-800 flex-grow"></div>
                </div>
              </div>
            </div>
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

export default ConnectWithSenior;
