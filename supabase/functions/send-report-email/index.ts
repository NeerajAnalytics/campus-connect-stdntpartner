
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
  console.log("Report email function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    const { reportData, receiverEmail } = JSON.parse(requestBody) as RequestData;
    
    console.log("Parsed data:", { reportData, receiverEmail });
    console.log("Resend API Key available:", !!Deno.env.get("RESEND_API_KEY"));
    
    // Build email content based on report type
    const isJuniorReport = reportData.reportType === 'junior';
    const reportTitle = isJuniorReport ? 'Junior Report Submission' : 'Senior Report Submission';
    
    let emailContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #5c7bb5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .section { margin-bottom: 20px; padding: 15px; background-color: white; border-radius: 5px; }
        .label { font-weight: bold; color: #5c7bb5; }
        .footer { text-align: center; color: #666; padding: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${reportTitle}</h1>
            <p>CampusConnect Report System</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>Reporter Information</h3>
                <p><span class="label">Name:</span> ${reportData.name}</p>
                <p><span class="label">Email:</span> ${reportData.email}</p>
                <p><span class="label">Phone:</span> ${reportData.phone || 'Not provided'}</p>
                ${!isJuniorReport ? `<p><span class="label">Roll No:</span> ${reportData.roll_no || 'Not provided'}</p>` : ''}
            </div>
            
            <div class="section">
                <h3>Issue Description</h3>
                <p>${reportData.issue_description}</p>
                ${reportData.proofs ? `<p><span class="label">Proofs:</span> <a href="${reportData.proofs}" target="_blank">View Evidence</a></p>` : ''}
            </div>`;

    if (isJuniorReport && reportData.senior_name) {
      emailContent += `
            <div class="section">
                <h3>Senior Details</h3>
                <p><span class="label">Name:</span> ${reportData.senior_name}</p>
                <p><span class="label">Branch:</span> ${reportData.senior_branch || 'Not provided'}</p>
                <p><span class="label">Phone:</span> ${reportData.senior_phone || 'Not provided'}</p>
                <p><span class="label">Email:</span> ${reportData.senior_email || 'Not provided'}</p>
                <p><span class="label">College ID:</span> ${reportData.senior_college_id || 'Not provided'}</p>
            </div>`;
    }

    if (!isJuniorReport && reportData.junior_name) {
      emailContent += `
            <div class="section">
                <h3>Junior Details</h3>
                <p><span class="label">Name:</span> ${reportData.junior_name}</p>
                <p><span class="label">Branch:</span> ${reportData.junior_branch || 'Not provided'}</p>
                <p><span class="label">Phone:</span> ${reportData.junior_phone || 'Not provided'}</p>
                <p><span class="label">Email:</span> ${reportData.junior_email || 'Not provided'}</p>
            </div>`;
    }

    emailContent += `
        </div>
        
        <div class="footer">
            <p>This report was submitted through CampusConnect</p>
            <p>Please respond to the reporter at: ${reportData.email}</p>
        </div>
    </div>
</body>
</html>`;

    // Plain text version for better compatibility
    let textContent = `${reportTitle}

Reporter Information:
Name: ${reportData.name}
Email: ${reportData.email}
Phone: ${reportData.phone || 'Not provided'}
${!isJuniorReport ? `Roll No: ${reportData.roll_no || 'Not provided'}` : ''}

Issue Description:
${reportData.issue_description}

${reportData.proofs ? `Proofs: ${reportData.proofs}` : ''}
`;

    if (isJuniorReport && reportData.senior_name) {
      textContent += `
Senior Details:
Name: ${reportData.senior_name}
Branch: ${reportData.senior_branch || 'Not provided'}
Phone: ${reportData.senior_phone || 'Not provided'}
Email: ${reportData.senior_email || 'Not provided'}
College ID: ${reportData.senior_college_id || 'Not provided'}
`;
    }

    if (!isJuniorReport && reportData.junior_name) {
      textContent += `
Junior Details:
Name: ${reportData.junior_name}
Branch: ${reportData.junior_branch || 'Not provided'}
Phone: ${reportData.junior_phone || 'Not provided'}
Email: ${reportData.junior_email || 'Not provided'}
`;
    }

    textContent += `

---
This report was submitted through CampusConnect
Please respond to the reporter at: ${reportData.email}`;

    console.log("Attempting to send email to:", receiverEmail);
    console.log("From:", reportData.name, reportData.email);

    const emailResponse = await resend.emails.send({
      from: "CampusConnect Reports <onboarding@resend.dev>",
      to: [receiverEmail],
      reply_to: [reportData.email],
      subject: `🚨 ${reportTitle} from ${reportData.name}`,
      html: emailContent,
      text: textContent,
    });

    console.log("Resend API response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Email sending failed: ${emailResponse.error.message}`);
    }

    console.log("Email sent successfully with ID:", emailResponse.data?.id);

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
    console.error("Error in send-report-email function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send report email",
        details: error.stack || "No additional details available"
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
