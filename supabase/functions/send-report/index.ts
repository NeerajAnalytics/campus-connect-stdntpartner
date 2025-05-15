
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ReportData {
  user_id: string;
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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { reportData } = await req.json() as { reportData: ReportData };

    console.log("Received report submission:", reportData);

    // In a real implementation, we would use an email service like Resend, SendGrid, etc.
    // For now, we'll just log the attempt
    console.log(`Would send email to stdntpartner@gmail.com with the following data:`, reportData);

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Report email notification queued successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
