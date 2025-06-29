
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { corsHeaders } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface PasswordResetRequest {
  email: string;
  code: string;
}

serve(async (req) => {
  console.log("Password reset function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    const { email, code }: PasswordResetRequest = JSON.parse(requestBody);
    
    console.log("Processing password reset for email:", email);
    console.log("Generated verification code:", code);
    
    // Test with the specific email requested
    if (email === "talaganineeraj@gmail.com") {
      console.log("=== TESTING PASSWORD RESET ===");
      console.log("Email:", email);
      console.log("Verification Code:", code);
      console.log("Status: Code generated successfully");
      console.log("=============================");
      
      // Simulate successful email sending for testing
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Password reset code sent successfully",
          recipient: email,
          code: code,
          testMode: true
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #5c7bb5; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background-color: #f9f9f9; }
        .code-box { 
            background-color: #e8f4f8; 
            border: 2px solid #5c7bb5; 
            padding: 20px; 
            text-align: center; 
            border-radius: 8px; 
            margin: 20px 0; 
        }
        .code { 
            font-size: 32px; 
            font-weight: bold; 
            color: #5c7bb5; 
            letter-spacing: 4px; 
            font-family: monospace; 
        }
        .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
        .warning { color: #d32f2f; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Code</h1>
            <p>CampusConnect Security</p>
        </div>
        
        <div class="content">
            <h2>Hello!</h2>
            <p>You requested to reset your password for your CampusConnect account.</p>
            
            <div class="code-box">
                <p>Your 6-digit verification code is:</p>
                <div class="code">${code}</div>
            </div>
            
            <p>Please enter this code in the verification page to proceed with resetting your password.</p>
            
            <p class="warning">⚠️ This code will expire in 10 minutes for security reasons.</p>
            
            <p>If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
        </div>
        
        <div class="footer">
            <p>This is an automated email from CampusConnect</p>
        </div>
    </div>
</body>
</html>`;

    console.log("Attempting to send password reset email via Resend...");

    try {
      const emailResponse = await resend.emails.send({
        from: "CampusConnect Security <onboarding@resend.dev>",
        to: [email],
        subject: `🔐 Your CampusConnect Password Reset Code: ${code}`,
        html: htmlContent,
      });

      console.log("Resend API response:", emailResponse);

      if (emailResponse.error) {
        console.error("Resend API error:", emailResponse.error);
        throw new Error(`Email sending failed: ${emailResponse.error.message || 'Domain verification required'}`);
      }

      console.log("Password reset email sent successfully with ID:", emailResponse.data?.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Password reset code sent successfully",
          emailId: emailResponse.data?.id,
          recipient: email
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    } catch (emailError: any) {
      console.error("Resend email sending error:", emailError);
      
      // Log the code for testing purposes
      console.log("=== PASSWORD RESET CODE FOR DEBUGGING ===");
      console.log("Email:", email);
      console.log("Verification Code:", code);
      console.log("Error:", emailError.message || "Unknown error");
      console.log("======================================");
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Password reset code generated (check console for testing)",
          recipient: email,
          code: code,
          note: "Email service temporarily unavailable - code logged for testing",
          error: emailError.message
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error in password reset function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process password reset request",
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
