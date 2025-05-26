
import React from "react";
import { Link } from "react-router-dom";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const SeniorFAQPage: React.FC = () => {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      {/* Header/Navigation */}
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
              <Link to="/report" className="text-gray-700 hover:text-gray-900">
                Report
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
      <main className="flex-grow py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">FAQ's</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="bg-[#7d9bd2] text-black p-4 rounded-md hover:no-underline hover:bg-[#6b89c0] data-[state=open]:bg-[#6b89c0] transition-all">
                How will I be connected to Juniors?
              </AccordionTrigger>
              <AccordionContent className="bg-white p-6 mt-1 rounded-md text-center animate-accordion-down shadow-sm">
                <p>You will not be initiating the connection process, juniors will be selecting the seniors they wish to connect.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      {/* Footer */}
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
    </div>
  );
};

export default SeniorFAQPage;
