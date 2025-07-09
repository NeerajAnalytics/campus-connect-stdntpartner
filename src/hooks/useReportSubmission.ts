
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface ReportData {
  name: string;
  email: string;
  phone: string;
  issueDescription: string;
  proofs: string;
  seniorName: string;
  seniorBranch: string;
  seniorPhone: string;
  seniorEmail: string;
  seniorCollegeId: string;
}

export const useReportSubmission = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitReport = async (reportData: ReportData, proofFile: File | null) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a report",
        variant: "destructive",
      });
      return false;
    }

    if (!reportData.name || !reportData.email || !reportData.issueDescription) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    setIsSubmitting(true);

    try {
      // Redirect to Google Forms for report submission
      // Note: Replace this URL with your actual Google Form URL
      const googleFormUrl = "https://forms.google.com/your-report-form-url";
      
      // Create query parameters to pre-fill the form if possible
      const params = new URLSearchParams({
        'entry.name': reportData.name,
        'entry.email': reportData.email,
        'entry.phone': reportData.phone,
        'entry.issue': reportData.issueDescription,
        'entry.senior_name': reportData.seniorName,
        'entry.senior_branch': reportData.seniorBranch,
        'entry.senior_phone': reportData.seniorPhone,
        'entry.senior_email': reportData.seniorEmail,
        'entry.senior_college_id': reportData.seniorCollegeId,
      });

      // Open Google Form in new tab
      window.open(`${googleFormUrl}?${params.toString()}`, '_blank');

      toast({
        title: "Redirected to Report Form",
        description: "You have been redirected to the Google Form to submit your report.",
      });

      return true;

    } catch (error: any) {
      console.error("Report submission error:", error);
      toast({
        title: "Error opening report form",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitReport,
    isSubmitting,
  };
};
