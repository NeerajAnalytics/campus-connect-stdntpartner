
import React from "react";
import { Input } from "../ui/input";

interface SeniorDetailsSectionProps {
  seniorName: string;
  seniorBranch: string;
  seniorPhone: string;
  seniorEmail: string;
  seniorCollegeId: string;
  onSeniorNameChange: (value: string) => void;
  onSeniorBranchChange: (value: string) => void;
  onSeniorPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSeniorEmailChange: (value: string) => void;
  onSeniorCollegeIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

const SeniorDetailsSection: React.FC<SeniorDetailsSectionProps> = ({
  seniorName,
  seniorBranch,
  seniorPhone,
  seniorEmail,
  seniorCollegeId,
  onSeniorNameChange,
  onSeniorBranchChange,
  onSeniorPhoneChange,
  onSeniorEmailChange,
  onSeniorCollegeIdChange,
  isSubmitting,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-4">Details of Senior, if your issue is with them:</h3>
      
      <div className="flex items-center mb-4">
        <div className="w-28 font-semibold">Name</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="text" 
            className="border-gray-300" 
            value={seniorName}
            onChange={(e) => onSeniorNameChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-28 font-semibold">Branch</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="text" 
            className="border-gray-300" 
            value={seniorBranch}
            onChange={(e) => onSeniorBranchChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-28 font-semibold">Phone No</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="tel" 
            className="border-gray-300" 
            value={seniorPhone}
            onChange={onSeniorPhoneChange}
            disabled={isSubmitting}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-28 font-semibold">G-Mail</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="email" 
            className="border-gray-300" 
            value={seniorEmail}
            onChange={(e) => onSeniorEmailChange(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-28 font-semibold">College ID</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="text" 
            className="border-gray-300" 
            value={seniorCollegeId}
            onChange={onSeniorCollegeIdChange}
            disabled={isSubmitting}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      </div>
    </div>
  );
};

export default SeniorDetailsSection;
