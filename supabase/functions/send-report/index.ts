
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ReportData {
  name: string;
  email: string;
  phone?: string;
  issue_description: string;
  proofs?: string;
  senior_name?: string;
  senior_branch?: string;
  senior_phone?: string;
  senior_email?: string;
  senior_college_id?: string;
}

interface RequestData {
  reportData: ReportData;
  receiverEmail: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reportData, receiverEmail } = await req.json() as RequestData;
    
    // Log the report data for now (in a real app, you would send an email)
    console.log("Received report from:", reportData.name);
    console.log("Issue description:", reportData.issue_description);
    console.log("Sending to:", receiverEmail);
    
    // Here you would typically send an email notification
    // We'll simulate the email sending for now, but in a real-world scenario,
    // you would integrate with an email service like SendGrid, AWS SES, or Resend.

    // Build the email content
    const emailSubject = `New Report Submission from ${reportData.name}`;
    const emailContent = `
      <h2>New Report Submission</h2>
      <p><strong>From:</strong> ${reportData.name} (${reportData.email})</p>
      <p><strong>Phone:</strong> ${reportData.phone || 'Not provided'}</p>
      <h3>Issue Description:</h3>
      <p>${reportData.issue_description}</p>
      ${reportData.proofs ? `<p><strong>Proofs:</strong> ${reportData.proofs}</p>` : ''}
      ${reportData.senior_name ? `
        <h3>Senior Details:</h3>
        <p><strong>Name:</strong> ${reportData.senior_name}</p>
        <p><strong>Branch:</strong> ${reportData.senior_branch || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${reportData.senior_phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${reportData.senior_email || 'Not provided'}</p>
        <p><strong>College ID:</strong> ${reportData.senior_college_id || 'Not provided'}</p>
      ` : ''}
    `;

    console.log("Email subject:", emailSubject);
    console.log("Email would be sent to:", receiverEmail);
    console.log("Email content:", emailContent);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Report notification received",
        emailSent: true,
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
    return new Response(
      JSON.stringify({
        error: error.message || "An unknown error occurred",
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
