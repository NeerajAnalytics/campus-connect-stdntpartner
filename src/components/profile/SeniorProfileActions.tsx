
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SeniorProfileActions: React.FC = () => {
  const handleRaiseIssue = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSe7OIarVQZe7_uQ2TiJJQlWZ72uTlAt4rv5jM-4r00viXM3Wg/viewform?usp=dialog', '_blank');
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button 
        className="w-full max-w-xs bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-2 px-6 text-base rounded-lg"
        onClick={handleRaiseIssue}
      >
        Raise Issue
      </Button>
      <Link to="/senior-edit" className="w-full max-w-xs">
        <Button className="w-full bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-2 px-6 text-base rounded-lg">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default SeniorProfileActions;
