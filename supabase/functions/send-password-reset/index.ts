
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
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
    
    if (!requestBody || requestBody.trim() === '') {
      throw new Error('Request body is empty');
    }

    const { email, code }: PasswordResetRequest = JSON.parse(requestBody);
    
    if (!email || !code) {
      throw new Error('Email and code are required');
    }

    // Clean up email - trim spaces and convert to lowercase
    const cleanEmail = email.trim().toLowerCase();
    console.log("Processing password reset for email:", cleanEmail);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if this is a senior user first (senior_profiles has email field)
    const { data: seniorProfile, error: seniorError } = await supabase
      .from('senior_profiles')
      .select('id, email')
      .eq('email', cleanEmail)
      .maybeSingle();

    console.log("Senior profile check:", { 
      found: !!seniorProfile, 
      email: seniorProfile?.email,
      error: seniorError?.message 
    });

    if (seniorProfile) {
      // This is a senior user, proceed with password reset
      console.log("Senior user found, proceeding with password reset");
    } else {
      // Check if this is a junior user (check auth.users first, then profiles table)
      const { data: authUser, error: authError } = await supabase.auth.admin.getUserByEmail(cleanEmail);
      
      console.log("Auth user check for junior:", { 
        email: authUser?.user?.email, 
        id: authUser?.user?.id,
        error: authError?.message 
      });

      if (authUser?.user) {
        // Check if this user exists in junior_profile table (junior)
        const { data: juniorProfile, error: juniorError } = await supabase
          .from('junior_profile')
          .select('id, email')
          .eq('id', authUser.user.id)
          .maybeSingle();

        console.log("Junior profile check:", { 
          found: !!juniorProfile, 
          userId: authUser.user.id,
          error: juniorError?.message 
        });

        if (!juniorProfile) {
          console.log("User exists in auth but not in profiles table:", cleanEmail);
          throw new Error('Email ID is not registered. Please signup first.');
        }
      } else {
        console.log("Email not found in auth.users or senior_profiles:", cleanEmail);
        throw new Error('Email ID is not registered. Please signup first.');
      }
    }

    console.log("User found, proceeding to send verification code");

    // Check if RESEND_API_KEY is available
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background-color: #5c7bb5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
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
        .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; border-radius: 0 0 8px 8px; }
        .warning { color: #d32f2f; font-weight: bold; }
    </style>
</head>
<body>
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
        <p>Need help? Contact our support team</p>
    </div>
</body>
</html>`;

    console.log("Attempting to send password reset email via Resend...");

    const emailResponse = await resend.emails.send({
      from: "CampusConnect Security <onboarding@resend.dev>",
      to: [cleanEmail],
      subject: `🔐 Your CampusConnect Password Reset Code: ${code}`,
      html: htmlContent,
    });

    console.log("Resend API response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Email sending failed: ${JSON.stringify(emailResponse.error)}`);
    }

    console.log("Password reset email sent successfully with ID:", emailResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset code sent successfully",
        emailId: emailResponse.data?.id,
        recipient: cleanEmail
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
    console.error("Error in password reset function:", error);
    
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        details: "Please check your email address and try again. If the problem persists, contact support.",
        timestamp: new Date().toISOString()
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
