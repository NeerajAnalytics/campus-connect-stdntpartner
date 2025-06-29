
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SeniorProfileActions: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <Link to="/senior-edit" className="w-full">
        <Button className="w-full bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-3 text-lg">
          Edit Profile
        </Button>
      </Link>
      
      <Link to="/senior-report" className="w-full">
        <Button className="w-full bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-3 text-lg">
          Report
        </Button>
      </Link>
      
      <Link to="/senior-faq" className="w-full">
        <Button className="w-full bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-3 text-lg">
          FAQ
        </Button>
      </Link>
      
      <Link to="/senior-terms" className="w-full">
        <Button className="w-full bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-3 text-lg">
          Terms and Conditions
        </Button>
      </Link>
    </div>
  );
};

export default SeniorProfileActions;
