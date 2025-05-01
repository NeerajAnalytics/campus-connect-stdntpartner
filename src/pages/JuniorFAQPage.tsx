
import React from "react";
import { Link } from "react-router-dom";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../components/ui/accordion";
import { ArrowUp } from "lucide-react";

const JuniorFAQPage: React.FC = () => {
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
          <h1 className="text-3xl font-bold mb-8">FAQ's</h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="bg-[#7d9bd2] text-black p-4 rounded-md hover:no-underline hover:bg-[#6b89c0] data-[state=open]:bg-[#6b89c0] transition-all">
                How can I connect with my Seniors?
              </AccordionTrigger>
              <AccordionContent className="bg-white p-6 mt-1 rounded-md text-center animate-accordion-down shadow-sm">
                <p>Open "Connect With Senior" Section then select any of the senior and then click on chat with any of the senior you wish to connect with.</p>
                <p className="mt-4">Not just that you can directly call your Seniors, if their number is available over there.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger className="bg-[#7d9bd2] text-black p-4 rounded-md hover:no-underline hover:bg-[#6b89c0] data-[state=open]:bg-[#6b89c0] transition-all">
                Documents needed for Admission Process?
              </AccordionTrigger>
              <AccordionContent className="bg-white p-6 mt-1 rounded-md text-center animate-accordion-down shadow-sm">
                <p>Your Seniors are open to many thing, during the admission time, they'll guide you through the admission process and will help you to get solve all other problems in the campus.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger className="bg-[#7d9bd2] text-black p-4 rounded-md hover:no-underline hover:bg-[#6b89c0] data-[state=open]:bg-[#6b89c0] transition-all">
                In what all cases I can seek help from seniors?
              </AccordionTrigger>
              <AccordionContent className="bg-white p-6 mt-1 rounded-md text-center animate-accordion-down shadow-sm">
                <p>Visit the link and check out the entire admission process in NIT Jalandhar.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger className="bg-[#7d9bd2] text-black p-4 rounded-md hover:no-underline hover:bg-[#6b89c0] data-[state=open]:bg-[#6b89c0] transition-all">
                What documents are needed for Admission Process?
              </AccordionTrigger>
              <AccordionContent className="bg-white p-6 mt-1 rounded-md text-center animate-accordion-down shadow-sm">
                <p>Visit the link and check out all the entire list and make sure you get all of them before you start the admission process.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
              <Link to="/junior-terms" className="text-gray-700 hover:text-gray-900">
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

export default JuniorFAQPage;
