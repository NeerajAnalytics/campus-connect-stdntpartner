import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from "../_shared/cors.ts";

interface VerifyCodeRequest {
  email: string;
  code: string;
  newPassword?: string;
}

serve(async (req) => {
  console.log("Verify reset code function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    if (!requestBody || requestBody.trim() === '') {
      throw new Error('Request body is empty');
    }

    const { email, code, newPassword }: VerifyCodeRequest = JSON.parse(requestBody);
    
    if (!email || !code) {
      throw new Error('Email and code are required');
    }

    // Clean up email - trim spaces and convert to lowercase
    const cleanEmail = email.trim().toLowerCase();
    console.log("Verifying code for email:", cleanEmail);

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the verification code
    const { data: verificationData, error: verifyError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', cleanEmail)
      .eq('code', code)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (verifyError) {
      console.error("Error checking verification code:", verifyError);
      throw new Error('Error verifying code');
    }

    if (!verificationData) {
      console.log("Invalid or expired verification code");
      throw new Error('Invalid or expired verification code');
    }

    console.log("Valid verification code found");

    // If newPassword is provided, update the password
    if (newPassword) {
      console.log("Updating password for user");
      
      // Get user by email
      const { data: authUser, error: authError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1
      });
      
      const foundUser = authUser?.users?.find(user => user.email === cleanEmail);
      
      if (authError || !foundUser) {
        console.error("Error getting user:", authError);
        throw new Error('User not found');
      }

      // Update user password
      const { error: passwordError } = await supabase.auth.admin.updateUserById(
        foundUser.id,
        { password: newPassword }
      );

      if (passwordError) {
        console.error("Error updating password:", passwordError);
        throw new Error('Failed to update password');
      }

      console.log("Password updated successfully");
    }

    // Mark verification code as used
    const { error: updateError } = await supabase
      .from('verification_codes')
      .update({ used: true })
      .eq('id', verificationData.id);

    if (updateError) {
      console.error("Error marking code as used:", updateError);
      // Don't throw error here as the main operation succeeded
    }

    console.log("Verification code marked as used");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: newPassword ? "Password reset successfully" : "Code verified successfully"
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
    console.error("Error in verify reset code function:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
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