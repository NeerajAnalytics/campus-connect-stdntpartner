
import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface JuniorReportFormFieldsProps {
  name: string;
  email: string;
  phone: string;
  issueDescription: string;
  proofs: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIssueDescriptionChange: (value: string) => void;
  onProofsChange: (value: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

const JuniorReportFormFields: React.FC<JuniorReportFormFieldsProps> = ({
  name,
  email,
  phone,
  issueDescription,
  proofs,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onIssueDescriptionChange,
  onProofsChange,
  fileInputRef,
  onFileChange,
  isSubmitting,
}) => {
  return (
    <>
      <div className="flex items-start mb-4">
        <div className="w-40 font-semibold">Your Name</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="text" 
            className="border-gray-300" 
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>
      
      <div className="flex items-start mb-4">
        <div className="w-40 font-semibold">Your Mail ID</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="email" 
            className="border-gray-300" 
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>
      
      <div className="flex items-start mb-4">
        <div className="w-40 font-semibold">Your Phone No</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2">
          <Input 
            type="tel" 
            className="border-gray-300" 
            value={phone}
            onChange={onPhoneChange}
            disabled={isSubmitting}
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="font-semibold mb-2">Describe The Issue:</div>
        <Textarea 
          className="w-full border-gray-300" 
          rows={3} 
          value={issueDescription}
          onChange={(e) => onIssueDescriptionChange(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div className="flex items-start mb-4">
        <div className="w-40 font-semibold">Proofs (IF ANY)</div>
        <div className="text-xl">:</div>
        <div className="flex-1 ml-2 space-y-2">
          <Input 
            type="text" 
            className="border-gray-300" 
            value={proofs}
            onChange={(e) => onProofsChange(e.target.value)}
            disabled={isSubmitting}
            placeholder="Links to screenshots or documents"
          />
          <div>
            <p className="text-xs text-gray-500 mb-2">Or upload a PDF file (max 5MB)</p>
            <Input 
              ref={fileInputRef}
              type="file" 
              accept="application/pdf" 
              onChange={onFileChange}
              disabled={isSubmitting}
              className="border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7d9bd2] file:text-white hover:file:bg-[#6b89c0]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JuniorReportFormFields;
