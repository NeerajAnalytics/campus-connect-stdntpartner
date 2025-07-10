import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from "../_shared/cors.ts";

interface CreateProfileRequest {
  userId: string;
  userData: any;
  isSenior: boolean;
}

serve(async (req) => {
  console.log("Create profile function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.text();
    console.log("Request body received:", requestBody);
    
    if (!requestBody || requestBody.trim() === '') {
      throw new Error('Request body is empty');
    }

    const { userId, userData, isSenior }: CreateProfileRequest = JSON.parse(requestBody);
    
    if (!userId || !userData) {
      throw new Error('UserId and userData are required');
    }

    console.log("Creating profile for user:", userId, "isSenior:", isSenior, "userData:", userData);

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    if (isSenior) {
      console.log("Creating senior profile...");
      
      const seniorData = {
        id: userId,
        name: userData?.name || null,
        gender: userData?.gender || null,
        email: userData?.email || null,
        college_id: userData?.college_id || null,
        roll_no: userData?.roll_no || null,
        phone: userData?.phone || null,
        region: userData?.region || null,
      };
      
      console.log("Inserting senior profile data:", seniorData);
      
      const { data, error: insertError } = await supabase
        .from('senior_profiles')
        .insert(seniorData)
        .select();
      
      if (insertError) {
        console.error("Error inserting senior profile:", insertError);
        throw new Error(`Failed to create senior profile: ${insertError.message} (Code: ${insertError.code})`);
      }
      
      console.log("Senior profile created successfully:", data);
    } else {
      console.log("Creating junior profile...");
      
      const profileData = {
        id: userId,
        name: userData?.name || null,
        gender: userData?.gender || null,
        email: userData?.email || null,
        phone: userData?.phone || null,
      };
      
      console.log("Inserting junior profile data:", profileData);
      
      const { data, error: insertError } = await supabase
        .from('junior_profile')
        .insert(profileData)
        .select();
      
      if (insertError) {
        console.error("Error inserting junior profile:", insertError);
        throw new Error(`Failed to create junior profile: ${insertError.message} (Code: ${insertError.code})`);
      }
      
      console.log("Junior profile created successfully:", data);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Profile created successfully"
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
    console.error("Error in create profile function:", error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.stack : 'No stack trace available'
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