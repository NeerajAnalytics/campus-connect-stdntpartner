
import { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getReports } from "@/integrations/supabase/client";
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
      let proofFileUrl = reportData.proofs;

      if (proofFile) {
        const fileName = `${Date.now()}_${proofFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('reports')
          .upload(fileName, proofFile);

        if (uploadError) {
          console.error("File upload error:", uploadError);
          proofFileUrl = reportData.proofs || "File upload failed";
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('reports')
            .getPublicUrl(fileName);
          proofFileUrl = publicUrl;
        }
      }
      
      const submissionData = {
        user_id: user.id,
        name: reportData.name,
        email: reportData.email,
        phone: reportData.phone,
        issue_description: reportData.issueDescription,
        proofs: proofFileUrl,
        senior_name: reportData.seniorName,
        senior_branch: reportData.seniorBranch,
        senior_phone: reportData.seniorPhone,
        senior_email: reportData.seniorEmail,
        senior_college_id: reportData.seniorCollegeId
      };

      console.log("Submitting report data:", submissionData);

      const { error: saveError } = await getReports().insert(submissionData);

      if (saveError) {
        console.error("Database save error:", saveError);
        throw saveError;
      }

      console.log("Report saved to database successfully");

      // Send email using edge function
      try {
        console.log("Sending email notification...");
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-report-email', {
          body: { 
            reportData: {
              ...submissionData,
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
        return true;
      }

      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully and sent to stdntpartner@gmail.com.",
      });

      return true;

    } catch (error: any) {
      console.error("Report submission error:", error);
      toast({
        title: "Error submitting report",
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
