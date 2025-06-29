
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface EmailRequest {
  to: string;
  subject: string;
  message: string;
  type: 'password-reset' | 'report';
  data?: any;
}

serve(async (req) => {
  console.log("Backup email function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    const { to, subject, message, type, data }: EmailRequest = JSON.parse(requestBody);
    
    console.log(`Sending ${type} email to:`, to);
    console.log("Subject:", subject);
    console.log("Message preview:", message.substring(0, 100) + "...");
    
    // For now, we'll simulate email sending and log the details
    // In a real implementation, you would use a different email service here
    console.log("=== EMAIL DETAILS ===");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", message);
    if (data) {
      console.log("Additional data:", JSON.stringify(data, null, 2));
    }
    console.log("==================");
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${type} email processed successfully`,
        recipient: to,
        timestamp: new Date().toISOString()
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
    console.error("Error in backup email function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process email request",
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
