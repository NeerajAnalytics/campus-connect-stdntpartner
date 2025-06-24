
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useReportSubmission } from "@/hooks/useReportSubmission";
import JuniorReportFormFields from "./JuniorReportFormFields";
import SeniorDetailsSection from "./SeniorDetailsSection";

const JuniorReportForm: React.FC = () => {
  const navigate = useNavigate();
  const { createNumberHandler } = useFormValidation();
  const { proofFile, fileInputRef, handleFileChange, clearFile } = useFileUpload();
  const { submitReport, isSubmitting } = useReportSubmission();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [proofs, setProofs] = useState("");
  const [seniorName, setSeniorName] = useState("");
  const [seniorBranch, setSeniorBranch] = useState("");
  const [seniorPhone, setSeniorPhone] = useState("");
  const [seniorEmail, setSeniorEmail] = useState("");
  const [seniorCollegeId, setSeniorCollegeId] = useState("");

  const handlePhoneChange = createNumberHandler(setPhone);
  const handleSeniorPhoneChange = createNumberHandler(setSeniorPhone);
  const handleSeniorCollegeIdChange = createNumberHandler(setSeniorCollegeId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reportData = {
      name,
      email,
      phone,
      issueDescription,
      proofs,
      seniorName,
      seniorBranch,
      seniorPhone,
      seniorEmail,
      seniorCollegeId,
    };

    const success = await submitReport(reportData, proofFile);
    
    if (success) {
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setIssueDescription("");
      setProofs("");
      setSeniorName("");
      setSeniorBranch("");
      setSeniorPhone("");
      setSeniorEmail("");
      setSeniorCollegeId("");
      clearFile();
      navigate("/junior-profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">We are Here to Help you.</h3>
      
      <JuniorReportFormFields
        name={name}
        email={email}
        phone={phone}
        issueDescription={issueDescription}
        proofs={proofs}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPhoneChange={handlePhoneChange}
        onIssueDescriptionChange={setIssueDescription}
        onProofsChange={setProofs}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
        isSubmitting={isSubmitting}
      />
      
      <hr className="border-gray-300 my-6" />
      
      <SeniorDetailsSection
        seniorName={seniorName}
        seniorBranch={seniorBranch}
        seniorPhone={seniorPhone}
        seniorEmail={seniorEmail}
        seniorCollegeId={seniorCollegeId}
        onSeniorNameChange={setSeniorName}
        onSeniorBranchChange={setSeniorBranch}
        onSeniorPhoneChange={handleSeniorPhoneChange}
        onSeniorEmailChange={setSeniorEmail}
        onSeniorCollegeIdChange={handleSeniorCollegeIdChange}
        isSubmitting={isSubmitting}
      />
      
      <hr className="border-gray-300 mb-6" />
      
      <div className="flex justify-center gap-4">
        <Button
          type="button"
          className="bg-gray-400 text-white hover:bg-gray-500 rounded-md px-8"
          onClick={() => navigate('/junior-profile')}
          disabled={isSubmitting}
        >
          Back
        </Button>

        <Button
          type="submit"
          className="bg-[#7d9bd2] text-black hover:bg-[#6b89c0] rounded-md px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default JuniorReportForm;
