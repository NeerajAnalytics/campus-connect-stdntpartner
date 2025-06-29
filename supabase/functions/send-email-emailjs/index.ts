
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
  console.log("EmailJS function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    const { to, subject, message, type, data }: EmailRequest = JSON.parse(requestBody);
    
    console.log(`Processing ${type} email to:`, to);
    console.log("Subject:", subject);
    console.log("Message preview:", message.substring(0, 100) + "...");
    
    // EmailJS API call
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_campus_connect',
        template_id: type === 'password-reset' ? 'template_password_reset' : 'template_report',
        user_id: 'your_emailjs_user_id',
        template_params: {
          to_email: to,
          subject: subject,
          message: message,
          ...data
        }
      })
    });

    if (!emailjsResponse.ok) {
      throw new Error(`EmailJS API error: ${emailjsResponse.status}`);
    }

    const result = await emailjsResponse.text();
    console.log("EmailJS response:", result);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${type} email sent successfully via EmailJS`,
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
    console.error("Error in EmailJS function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send email via EmailJS",
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
