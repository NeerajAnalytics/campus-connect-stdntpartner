
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SeniorProfileActions: React.FC = () => {
  return (
    <div className="flex justify-center mt-8">
      <Link to="/senior-edit" className="w-full max-w-xs">
        <Button className="w-full bg-[#7d9bd2] text-white hover:bg-[#6b89c0] py-2 px-6 text-base rounded-lg">
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default SeniorProfileActions;
