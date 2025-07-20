import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    if (!email) {
      throw new Error('Email is required');
    }

    // Check if RESEND_API_KEY is available
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const emailResponse = await resend.emails.send({
      from: "CampusConnect Test <onboarding@resend.dev>",
      to: [email],
      subject: "🧪 CampusConnect Email Test",
      html: `
        <h1>Email Test Successful!</h1>
        <p>If you can see this email, the Resend API integration is working correctly.</p>
        <p>This is a test email from CampusConnect.</p>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Email sending failed: ${JSON.stringify(emailResponse.error)}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Test email sent successfully",
        emailId: emailResponse.data?.id
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
    console.error("Error in test email function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});