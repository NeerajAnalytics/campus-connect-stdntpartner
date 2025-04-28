import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/ui/LoginForm";
import ContactForm from "@/components/ui/ContactForm";

const Index: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Function to handle the login/signup button click
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  // Function to handle the contact form button click
  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="bg-gray-100 overflow-hidden">
      {/* Navigation */}
      <header>
        <Navbar />
      </header>

      <main>
        {/* Hero Section */}
        <Hero />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Login / Sign Up"
      >
        <LoginForm />
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Us"
      >
        <ContactForm />
      </Modal>

      {/* Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        <button
          onClick={handleLoginClick}
          className="bg-[rgba(26,78,138,1)] text-white p-3 rounded-full shadow-lg hover:bg-[rgba(21,62,117,1)] transition-colors"
          aria-label="Login or Sign Up"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button
          onClick={handleContactClick}
          className="bg-[rgba(125,155,210,1)] text-white p-3 rounded-full shadow-lg hover:bg-[rgba(92,123,181,1)] transition-colors"
          aria-label="Contact Us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Index;
