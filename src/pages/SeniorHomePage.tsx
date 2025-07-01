import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LocationButton from "@/components/ui/LocationButton";

const SeniorHomePage: React.FC = () => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      {/* Header */}
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
                Accommodation
              </Link>
              <Link to="/senior-profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
              <Button 
                variant="ghost"
                className="text-gray-700 hover:text-gray-900" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section with Question Mark */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-[#1a4e8a] mb-4">
                  Doubts about Admission Process?
                </h1>
                <div className="space-y-3 text-gray-700">
                  <p>Don't Worry! Your Seniors are always here to help you!</p>
                  <p>Through "Campus Connect", you can communicate directly with them and solve all your problems.</p>
                  <p>They will guide you through the entire Admission process.</p>
                  <p>Not just that, they will guide you through any other problem with their expertise.</p>
                </div>
              </div>
              <div className="ml-8">
                <img 
                  src="/lovable-uploads/723c149e-d553-4afb-8fe5-cc86d500a60d.png" 
                  alt="Students with question mark" 
                  className="w-80 h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How Did We Start Section */}
        <div className="bg-[#e8f2ff] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="mr-8">
                <img 
                  src="/lovable-uploads/2e444ed3-37d2-4a7b-9280-809c287ba0a1.png" 
                  alt="Student walking to college" 
                  className="w-80 h-auto"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#1a4e8a] mb-4">
                  How Did We Start?
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>We are students at NIT Jalandhar, we faced the same problem like you. New to area unaware of the language, all new people and obviously faced some problems during the admission process.</p>
                  <p>Then we thought it will be better if someone will help us in going through our doubts.</p>
                  <p>We saw the same problem with our juniors so here comes the solution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Way 2 College Section */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#1a4e8a] mb-6">
                  Way 2 College
                </h2>
                <div className="mb-6">
                  <LocationButton className="px-8 py-3 rounded-full">
                    NITJ Location
                  </LocationButton>
                </div>
                <h3 className="text-xl font-semibold text-[#1a4e8a] mb-4">
                  Click to locate the place
                </h3>
              </div>
              <div className="ml-8">
                <img 
                  src="/lovable-uploads/8ac70d6a-732f-4585-8bc6-0f68820d690c.png" 
                  alt="Students with laptop showing checkmark" 
                  className="w-80 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="font-['Poppins']">
        <div className="bg-[#7d9bd2] py-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-black text-lg font-medium mb-2">How Can we Help ?</h3>
              <p className="text-black">Contact us any time</p>
            </div>
            
            <div>
              <h3 className="text-black text-lg font-medium mb-2">Call Us</h3>
              <p className="text-black">
                +91 9704927248
                <br />
                +91 850093952
              </p>
            </div>
            
            <div>
              <h3 className="text-black text-lg font-medium mb-2">Send Us a Message</h3>
              <p className="text-black">stdntpartner@gmail.com</p>
            </div>
            
            <div>
              <h3 className="text-black text-lg font-medium">Follow Us</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white py-6 border-t">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
                CampusConnect
              </Link>
              <div className="flex items-center gap-8">
                <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/senior-faq" className="text-gray-700 hover:text-gray-900">
                  FAQ's
                </Link>
                <Link to="/terms" className="text-gray-700 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#7d9bd2] py-4 text-center">
          <p className="text-black">Copyright © Student Partner</p>
        </div>
      </footer>
    </div>
  );
};

export default SeniorHomePage;
