import React from "react";
import { Link } from "react-router-dom";

const JuniorHomePage: React.FC = () => {
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
          {/* First Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold text-[#1a4e8a]">Doubts about Admission Process?</h2>
              <p className="text-gray-800">
                Don't Worry! Your Seniors are always here to help you!
              </p>
              <p className="text-gray-800">
                Through "Campus Connect", you can communicate directly with them and solve all your problems.
              </p>
              <p className="text-gray-800">
                They will guide you through the entire Admission process.
              </p>
              <p className="text-gray-800">
                Not just that, they will guide you through any other problem with their expertise.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img 
                src="/lovable-uploads/def5486f-4474-4ec4-b0e0-98c951a89062.png" 
                alt="Student with question mark" 
                className="max-w-full h-auto max-h-64"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2 flex justify-center items-center">
              <img 
                src="/lovable-uploads/def5486f-4474-4ec4-b0e0-98c951a89062.png" 
                alt="Student walking to college" 
                className="max-w-full h-auto max-h-64"
              />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold text-[#1a4e8a]">How Did We Start?</h2>
              <p className="text-gray-800">
                We are students at NIT Jalandhar, we faced the same problem like you. New to area unaware of the language, all new people and obviously faced some problems during the admission process.
              </p>
              <p className="text-gray-800">
                Then we thought it will be better if someone will help us in going through our doubts.
              </p>
              <p className="text-gray-800">
                We saw the same problem with our juniors so here comes the solution.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold text-[#1a4e8a]">Way 2 College</h2>
              <button className="bg-[#cedcf4] text-[#1a4e8a] py-2 px-6 rounded hover:bg-[#b9ccef] transition-colors">
                NIT'J Location
              </button>
              <h3 className="text-xl font-bold text-[#1a4e8a] mt-4">Click to locate the place</h3>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md border-2 border-[#1a4e8a]">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1a4e8a] flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="mt-6 flex justify-center">
                  <img 
                    src="/lovable-uploads/def5486f-4474-4ec4-b0e0-98c951a89062.png" 
                    alt="Students communicating" 
                    className="max-w-full h-auto max-h-48"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#edf1f8] border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-gray-800">How Can we Help ?</h3>
              <p className="text-gray-700">Contact us any time</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-700">
                +91 9704927248
                <br />
                +91 850093952
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Send Us a Message</h3>
              <p className="text-gray-700">stdntpartner@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Follow Us</h3>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 border-t">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-[#5c7bb5] text-xl font-semibold">
              CampusConnect
            </Link>
            <div className="flex items-center gap-8 text-sm">
              <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
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
    </div>
  );
};

export default JuniorHomePage;
