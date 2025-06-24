
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface PasswordResetRequest {
  email: string;
  code: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, code }: PasswordResetRequest = await req.json();
    
    console.log("Sending password reset code to:", email);
    
    const emailResponse = await resend.emails.send({
      from: "CampusConnect <onboarding@resend.dev>",
      to: [email],
      subject: "Password Reset Code",
      text: `Your code to change your password is: ${code}`,
    });

    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset code sent successfully",
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
    console.error("Error sending password reset email:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send password reset email",
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
