
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface ReportData {
  name: string;
  email: string;
  phone?: string;
  roll_no?: string;
  issue_description: string;
  proofs?: string;
  senior_name?: string;
  senior_branch?: string;
  senior_phone?: string;
  senior_email?: string;
  senior_college_id?: string;
  junior_name?: string;
  junior_branch?: string;
  junior_phone?: string;
  junior_email?: string;
  reportType: 'junior' | 'senior';
}

interface RequestData {
  reportData: ReportData;
  receiverEmail: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reportData, receiverEmail } = await req.json() as RequestData;
    
    console.log("Sending report email from:", reportData.name);
    
    // Build email content based on report type
    const isJuniorReport = reportData.reportType === 'junior';
    const reportTitle = isJuniorReport ? 'Junior Report Submission' : 'Senior Report Submission';
    
    let emailContent = `
New ${reportTitle}

From: ${reportData.name} (${reportData.email})
Phone: ${reportData.phone || 'Not provided'}
${!isJuniorReport ? `Roll No: ${reportData.roll_no || 'Not provided'}` : ''}

Issue Description:
${reportData.issue_description}

${reportData.proofs ? `Proofs: ${reportData.proofs}` : ''}
`;

    if (isJuniorReport && reportData.senior_name) {
      emailContent += `
Senior Details:
Name: ${reportData.senior_name}
Branch: ${reportData.senior_branch || 'Not provided'}
Phone: ${reportData.senior_phone || 'Not provided'}
Email: ${reportData.senior_email || 'Not provided'}
College ID: ${reportData.senior_college_id || 'Not provided'}
`;
    }

    if (!isJuniorReport && reportData.junior_name) {
      emailContent += `
Junior Details:
Name: ${reportData.junior_name}
Branch: ${reportData.junior_branch || 'Not provided'}
Phone: ${reportData.junior_phone || 'Not provided'}
Email: ${reportData.junior_email || 'Not provided'}
`;
    }

    const emailResponse = await resend.emails.send({
      from: "CampusConnect Reports <onboarding@resend.dev>",
      to: [receiverEmail],
      subject: `New ${reportTitle} from ${reportData.name}`,
      text: emailContent,
    });

    console.log("Report email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Report email sent successfully",
        emailId: emailResponse.data?.id,
        recipient: receiverEmail
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending report email:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send report email",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
