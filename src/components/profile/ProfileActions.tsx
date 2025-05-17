
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ProfileActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between">
      <Button
        variant="secondary"
        className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md"
        onClick={() => navigate('/junior-report')}
      >
        Report an Issue
      </Button>
      
      <Button
        variant="secondary"
        className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md"
        onClick={() => navigate('/junior-edit')}
      >
        Edit
      </Button>
    </div>
  );
};

export default ProfileActions;
