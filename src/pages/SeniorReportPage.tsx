
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const SeniorReportPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [juniorName, setJuniorName] = useState("");
  const [juniorBranch, setJuniorBranch] = useState("");
  const [juniorPhone, setJuniorPhone] = useState("");
  const [juniorEmail, setJuniorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateAlphabets = (value: string) => {
    return /^[A-Za-z\s]*$/.test(value);
  };

  const validateNumbers = (value: string) => {
    return /^\d*$/.test(value);
  };

  // Handle field changes with validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateAlphabets(value)) {
      setName(value);
    }
  };

  const handleRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumbers(value)) {
      setRollNo(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumbers(value)) {
      setPhone(value);
    }
  };

  const handleJuniorPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateNumbers(value)) {
      setJuniorPhone(value);
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

  const handleSignOut = async () => {
    await signOut();
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

    // Basic validation
    if (!name || !rollNo || !email || !issueDescription) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare report data
      const reportData = {
        user_id: user.id,
        name,
        roll_no: rollNo,
        email,
        phone,
        issue_description: issueDescription,
        proofs: proofFile ? proofFile.name : null,
        junior_name: juniorName,
        junior_branch: juniorBranch,
        junior_phone: juniorPhone,
        junior_email: juniorEmail
      };

      // Insert report into database
      const { error: insertError } = await supabase
        .from('reports')
        .insert(reportData);

      if (insertError) throw insertError;

      // Send email notification using edge function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-senior-report', {
          body: { 
            reportData,
            receiverEmail: 'stdntpartner@gmail.com'
          }
        });

        if (emailError) {
          console.error("Email notification error:", emailError);
          throw emailError;
        }
      } catch (emailError: any) {
        console.error("Failed to send email notification:", emailError);
        throw new Error(`Failed to send email: ${emailError.message}`);
      }

      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully and sent to stdntpartner@gmail.com.",
      });

      // Reset form
      setName("");
      setRollNo("");
      setEmail("");
      setPhone("");
      setIssueDescription("");
      setProofFile(null);
      setJuniorName("");
      setJuniorBranch("");
      setJuniorPhone("");
      setJuniorEmail("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Redirect to profile page
      navigate("/senior-profile");

    } catch (error: any) {
      toast({
        title: "Error submitting report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      {/* Header */}
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="/accommodation" className="text-gray-700 hover:text-gray-900">
                Accommodation
              </Link>
              <Link to="/report" className="text-gray-700 hover:text-gray-900">
                Report
              </Link>
              <Link to="/senior-profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
              <Button 
                variant="ghost"
                className="text-gray-700 hover:text-gray-900" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">Here we are to help you</h2>
          
          <Separator className="mb-6" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Your Name</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input 
                  type="text" 
                  className="border-gray-300" 
                  value={name}
                  onChange={handleNameChange}
                  disabled={isSubmitting}
                  required
                  placeholder="Only alphabets allowed"
                />
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <div className="w-40 font-semibold">Your Roll No</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <Input 
                  type="text" 
                  className="border-gray-300" 
                  value={rollNo}
                  onChange={handleRollNoChange}
                  disabled={isSubmitting}
                  required
                  placeholder="Only numbers allowed"
                  inputMode="numeric"
                  pattern="[0-9]*"
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
                  placeholder="Only numbers allowed"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold mb-2">Describe the issue:</div>
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
              <div className="w-40 font-semibold">Proofs related to it (If any)</div>
              <div className="text-xl">:</div>
              <div className="flex-1 ml-2">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Upload a PDF file (max 5MB)</p>
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
            
            <Separator className="my-6" />
            
            <div className="mb-4">
              <h3 className="font-semibold mb-4">Details of the Junior, if your issue is with them:</h3>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">Name</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input 
                    type="text" 
                    className="border-gray-300" 
                    value={juniorName}
                    onChange={(e) => setJuniorName(e.target.value)}
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
                    value={juniorBranch}
                    onChange={(e) => setJuniorBranch(e.target.value)}
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
                    value={juniorPhone}
                    onChange={handleJuniorPhoneChange}
                    disabled={isSubmitting}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-28 font-semibold">Mail ID</div>
                <div className="text-xl">:</div>
                <div className="flex-1 ml-2">
                  <Input 
                    type="email" 
                    className="border-gray-300" 
                    value={juniorEmail}
                    onChange={(e) => setJuniorEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                className="bg-gray-400 text-white hover:bg-gray-500 rounded-md px-8"
                onClick={() => navigate('/senior-profile')}
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

      {/* Footer */}
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
              <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
                CampusConnect
              </Link>
              <div className="flex items-center gap-8">
                <Link to="/senior-home" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/senior-faq" className="text-gray-700 hover:text-gray-900">
                  FAQ's
                </Link>
                <Link to="/senior-terms" className="text-gray-700 hover:text-gray-900">
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
    </div>
  );
};

export default SeniorReportPage;
