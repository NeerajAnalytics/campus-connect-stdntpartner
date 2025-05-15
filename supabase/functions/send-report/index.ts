
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
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reportData } = await req.json() as RequestData;
    
    // Log the report data for now (in a real app, you would send an email)
    console.log("Received report from:", reportData.name);
    console.log("Issue description:", reportData.issue_description);
    
    // Here you would typically send an email notification
    // For example, using a service like Resend.com

    return new Response(
      JSON.stringify({ success: true, message: "Report notification received" }),
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
