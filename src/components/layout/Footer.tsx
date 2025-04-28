
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
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
            <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            <div className="flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">
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
      </div>
      
      <div className="bg-[#7d9bd2] py-4 text-center">
        <p className="text-black">Copyright © Student Partner</p>
      </div>
    </footer>
  );
};

export default Footer;
