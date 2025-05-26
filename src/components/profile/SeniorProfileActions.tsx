
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const SeniorProfileActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center">
      <Button
        variant="secondary"
        className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md px-8"
        onClick={() => navigate('/senior-edit')}
      >
        Edit
      </Button>
    </div>
  );
};

export default SeniorProfileActions;
