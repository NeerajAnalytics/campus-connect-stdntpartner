
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFormValidation } from "@/hooks/useFormValidation";
import Footer from "../components/layout/Footer";

const SeniorReportPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { proofFile, fileInputRef, handleFileChange, clearFile } = useFileUpload();
  const { createNumberHandler, createAlphabetHandler } = useFormValidation();

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    issueDescription: "",
    proofs: "",
    juniorName: "",
    juniorBranch: "",
    juniorPhone: "",
    juniorEmail: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation handlers
  const handleNameChange = createAlphabetHandler((value) => 
    setFormData(prev => ({ ...prev, name: value }))
  );

  const handleJuniorNameChange = createAlphabetHandler((value) => 
    setFormData(prev => ({ ...prev, juniorName: value }))
  );

  const handleRollNoChange = createNumberHandler((value) => 
    setFormData(prev => ({ ...prev, rollNo: value }))
  );

  const handlePhoneChange = createNumberHandler((value) => 
    setFormData(prev => ({ ...prev, phone: value }))
  );

  const handleJuniorPhoneChange = createNumberHandler((value) => 
    setFormData(prev => ({ ...prev, juniorPhone: value }))
  );

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a report",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.issueDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Issue Description)",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let proofFileUrl = formData.proofs;

      // Upload file if provided
      if (proofFile) {
        const fileName = `senior_report_${Date.now()}_${proofFile.name}`;
        console.log("Uploading file:", fileName);
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(fileName, proofFile);

        if (uploadError) {
          console.error("File upload error:", uploadError);
          toast({
            title: "File Upload Failed",
            description: "Unable to upload proof file. Report will be submitted without it.",
            variant: "destructive",
          });
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('reports')
            .getPublicUrl(fileName);
          proofFileUrl = publicUrl;
          console.log("File uploaded successfully:", publicUrl);
        }
      }
      
      // Prepare report data
      const reportData = {
        user_id: user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roll_no: formData.rollNo,
        issue_description: formData.issueDescription,
        proofs: proofFileUrl,
        junior_name: formData.juniorName,
        junior_branch: formData.juniorBranch,
        junior_phone: formData.juniorPhone,
        junior_email: formData.juniorEmail
      };

      console.log("Submitting senior report:", reportData);

      // Save to database
      const { error: saveError } = await supabase
        .from('reports')
        .insert(reportData);

      if (saveError) {
        console.error("Database save error:", saveError);
        throw new Error(`Failed to save report: ${saveError.message}`);
      }

      console.log("Report saved to database successfully");

      // Send email notification
      try {
        console.log("Sending email notification...");
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-report-email', {
          body: { 
            reportData: {
              ...reportData,
              reportType: 'senior'
            },
            receiverEmail: 'stdntpartner@gmail.com'
          }
        });

        if (emailError) {
          console.error("Email sending error:", emailError);
          throw new Error(`Email failed: ${emailError.details || emailError.message}`);
        }

        console.log("Email sent successfully:", emailData);
        
        toast({
          title: "Report Submitted Successfully!",
          description: "Your report has been submitted and sent to stdntpartner@gmail.com.",
        });

        // Reset form
        setFormData({
          name: "",
          rollNo: "",
          email: "",
          phone: "",
          issueDescription: "",
          proofs: "",
          juniorName: "",
          juniorBranch: "",
          juniorPhone: "",
          juniorEmail: ""
        });
        clearFile();

        // Navigate to profile after short delay
        setTimeout(() => navigate("/senior-profile"), 1500);

      } catch (emailError: any) {
        console.error("Email notification failed:", emailError);
        toast({
          title: "Report Submitted",
          description: "Your report was saved but email notification failed. We'll contact you soon.",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error("Report submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#edf1f8] font-['Poppins']">
      {/* Header */}
      <header className="bg-[#edf1f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/senior-home" className="text-[#5c7bb5] text-2xl font-semibold">
              CampusConnect
            </Link>
            
            <div className="flex items-center gap-8">
              <Link to="/senior-home" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/senior-profile" className="text-gray-700 hover:text-gray-900 font-medium">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-sm p-8 w-full">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
              Here we are to help you
            </h1>
            
            <Separator className="mb-8" />
            
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Enter your full name"
                    className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                    disabled={isSubmitting}
                    required
                  />
                  <p className="text-xs text-gray-500">Only alphabets allowed</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Roll No <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="text"
                    value={formData.rollNo}
                    onChange={handleRollNoChange}
                    placeholder="Enter your roll number"
                    className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                    disabled={isSubmitting}
                    inputMode="numeric"
                    required
                  />
                  <p className="text-xs text-gray-500">Only numbers allowed</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Mail ID <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="Enter your email address"
                    className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Phone No
                  </label>
                  <Input 
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                    disabled={isSubmitting}
                    inputMode="numeric"
                  />
                  <p className="text-xs text-gray-500">Only numbers allowed</p>
                </div>
              </div>

              {/* Issue Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Describe the issue <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  value={formData.issueDescription}
                  onChange={handleInputChange('issueDescription')}
                  placeholder="Please describe your issue in detail..."
                  className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5] min-h-[120px]"
                  disabled={isSubmitting}
                  required
                />
              </div>

              {/* Proofs Section */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Proofs related to it (If any)
                </label>
                
                <div className="space-y-3">
                  <Input 
                    type="text"
                    value={formData.proofs}
                    onChange={handleInputChange('proofs')}
                    placeholder="Paste links to screenshots or documents"
                    className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                    disabled={isSubmitting}
                  />
                  
                  <div className="text-center text-gray-500 text-sm">OR</div>
                  
                  <div className="space-y-2">
                    <Input 
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7d9bd2] file:text-white hover:file:bg-[#6b89c0]"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-gray-500">Upload a PDF file (maximum 5MB)</p>
                    {proofFile && (
                      <p className="text-sm text-green-600">File selected: {proofFile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Junior Details Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">
                  Details of the Junior, if your issue is with them:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input 
                      type="text"
                      value={formData.juniorName}
                      onChange={handleJuniorNameChange}
                      placeholder="Junior's full name"
                      className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Branch</label>
                    <Input 
                      type="text"
                      value={formData.juniorBranch}
                      onChange={handleInputChange('juniorBranch')}
                      placeholder="Junior's branch/department"
                      className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone No</label>
                    <Input 
                      type="tel"
                      value={formData.juniorPhone}
                      onChange={handleJuniorPhoneChange}
                      placeholder="Junior's phone number"
                      className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                      disabled={isSubmitting}
                      inputMode="numeric"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mail ID</label>
                    <Input 
                      type="email"
                      value={formData.juniorEmail}
                      onChange={handleInputChange('juniorEmail')}
                      placeholder="Junior's email address"
                      className="w-full border-gray-300 focus:border-[#5c7bb5] focus:ring-[#5c7bb5]"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/senior-profile')}
                  disabled={isSubmitting}
                  className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 bg-[#7d9bd2] text-white hover:bg-[#6b89c0] focus:ring-[#5c7bb5]"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorReportPage;
