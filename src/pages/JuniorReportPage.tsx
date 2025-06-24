
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getReports } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Footer from "../components/layout/Footer";

const JuniorReportPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [proofs, setProofs] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [seniorName, setSeniorName] = useState("");
  const [seniorBranch, setSeniorBranch] = useState("");
  const [seniorPhone, setSeniorPhone] = useState("");
  const [seniorEmail, setSeniorEmail] = useState("");
  const [seniorCollegeId, setSeniorCollegeId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateNumber = (value: string) => {
    return /^\d*$/.test(value);
  };

  // Handle number field changes with validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumber(value)) {
      setPhone(value);
    }
  };

  const handleSeniorPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumber(value)) {
      setSeniorPhone(value);
    }
  };

  const handleSeniorCollegeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumber(value)) {
      setSeniorCollegeId(value);
    }
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Check file type (PDF only)
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setProofFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a report",
        variant: "destructive",
      });
      return;
    }

    if (!name || !email || !issueDescription) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let proofFileUrl = proofs;

      if (proofFile) {
        const fileName = `${Date.now()}_${proofFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(fileName, proofFile);

        if (uploadError) {
          console.error("File upload error:", uploadError);
          proofFileUrl = proofs || "File upload failed";
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('reports')
            .getPublicUrl(fileName);
          proofFileUrl = publicUrl;
        }
      }
      
      const reportData = {
        user_id: user.id,
        name,
        email,
        phone,
        issue_description: issueDescription,
        proofs: proofFileUrl,
        senior_name: seniorName,
        senior_branch: seniorBranch,
        senior_phone: seniorPhone,
        senior_email: seniorEmail,
        senior_college_id: seniorCollegeId
      };

      console.log("Submitting report data:", reportData);

      const { error: saveError } = await getReports().insert(reportData);

      if (saveError) {
        console.error("Database save error:", saveError);
        throw saveError;
      }

      console.log("Report saved to database successfully");

      // Send email using new edge function
      try {
        console.log("Sending email notification...");
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-report-email', {
          body: { 
            reportData: {
              ...reportData,
              reportType: 'junior'
            },
            receiverEmail: 'stdntpartner@gmail.com'
          }
        });

        console.log("Email function response:", emailData);

        if (emailError) {
          console.error("Email notification error:", emailError);
          throw new Error(`Email sending failed: ${emailError.message}`);
        }

        console.log("Email sent successfully");
      } catch (emailError: any) {
        console.error("Failed to send email notification:", emailError);
        toast({
          title: "Report Submitted",
          description: "Your report has been submitted successfully. However, there was an issue sending the email notification.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully and sent to stdntpartner@gmail.com.",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setIssueDescription("");
      setProofs("");
      setProofFile(null);
      setSeniorName("");
      setSeniorBranch("");
      setSeniorPhone("");
      setSeniorEmail("");
      setSeniorCollegeId("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      navigate("/junior-profile");

    } catch (error: any) {
      console.error("Report submission error:", error);
      toast({
        title: "Error submitting report",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      {/* Header/Navigation */}
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/junior-home" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/junior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/connect-with-senior" className="text-gray-700 hover:text-gray-900">
                Connect With Senior
              </Link>
              <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
                Accommodation
              </Link>
              <Link to="/junior-profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">Report page for Juniors</h2>
          <hr className="border-gray-300 mb-6" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">We are Here to Help you.</h3>
            
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Your Name</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input 
                  type="text" 
                  className="border-gray-300" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={handlePhoneChange}
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
                onChange={(e) => setIssueDescription(e.target.value)}
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
                  onChange={(e) => setProofs(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Links to screenshots or documents"
                />
                <div>
                  <p className="text-xs text-gray-500 mb-2">Or upload a PDF file (max 5MB)</p>
                  <Input 
                    ref={fileInputRef}
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                    className="border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7d9bd2] file:text-white hover:file:bg-[#6b89c0]"
                  />
                </div>
              </div>
            </div>
            
            <hr className="border-gray-300 my-6" />
            
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
                    onChange={(e) => setSeniorName(e.target.value)}
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
                    onChange={(e) => setSeniorBranch(e.target.value)}
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
                    onChange={handleSeniorPhoneChange}
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
                    onChange={(e) => setSeniorEmail(e.target.value)}
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
                    onChange={handleSeniorCollegeIdChange}
                    disabled={isSubmitting}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
            </div>
            
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JuniorReportPage;
