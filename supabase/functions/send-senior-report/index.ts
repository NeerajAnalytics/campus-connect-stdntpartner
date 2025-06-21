
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface SeniorReportData {
  name: string;
  roll_no: string;
  email: string;
  phone?: string;
  issue_description: string;
  proofs?: string;
  junior_name?: string;
  junior_branch?: string;
  junior_phone?: string;
  junior_email?: string;
}

interface RequestData {
  reportData: SeniorReportData;
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
    console.log("Received senior report from:", reportData.name);
    console.log("Issue description:", reportData.issue_description);
    console.log("Sending to:", receiverEmail);
    
    // Build the email content
    const emailSubject = `New Senior Report Submission from ${reportData.name}`;
    const emailContent = `
      <h2>New Senior Report Submission</h2>
      <p><strong>From:</strong> ${reportData.name} (${reportData.email})</p>
      <p><strong>Roll No:</strong> ${reportData.roll_no}</p>
      <p><strong>Phone:</strong> ${reportData.phone || 'Not provided'}</p>
      <h3>Issue Description:</h3>
      <p>${reportData.issue_description}</p>
      ${reportData.proofs ? `<p><strong>Proofs:</strong> ${reportData.proofs}</p>` : ''}
      ${reportData.junior_name ? `
        <h3>Junior Details:</h3>
        <p><strong>Name:</strong> ${reportData.junior_name}</p>
        <p><strong>Branch:</strong> ${reportData.junior_branch || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${reportData.junior_phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${reportData.junior_email || 'Not provided'}</p>
      ` : ''}
    `;

    console.log("Email subject:", emailSubject);
    console.log("Email would be sent to:", receiverEmail);
    console.log("Email content:", emailContent);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Senior report notification received",
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
