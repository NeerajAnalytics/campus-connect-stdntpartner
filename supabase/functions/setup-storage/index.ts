
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  console.log("Setup storage function called:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    console.log("Setting up storage buckets...");

    // Check if buckets already exist
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    console.log("Existing buckets:", existingBuckets?.map(b => b.name));

    const buckets = [
      { name: 'avatars', public: true, sizeLimit: 5242880, types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
      { name: 'documents', public: false, sizeLimit: 10485760, types: ['application/pdf', 'image/*', 'text/*'] },
      { name: 'reports', public: true, sizeLimit: 5242880, types: ['application/pdf'] }
    ];
    
    const results = [];

    for (const bucket of buckets) {
      const bucketExists = existingBuckets?.find(b => b.name === bucket.name);
      
      if (bucketExists) {
        console.log(`Bucket ${bucket.name} already exists`);
        results.push({
          bucket: bucket.name,
          status: 'exists',
          message: 'Bucket already exists'
        });
      } else {
        console.log(`Creating bucket: ${bucket.name}`);
        
        const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(bucket.name, {
          public: bucket.public,
          fileSizeLimit: bucket.sizeLimit,
          allowedMimeTypes: bucket.types
        });

        if (bucketError) {
          console.error(`Error creating bucket ${bucket.name}:`, bucketError);
          results.push({
            bucket: bucket.name,
            status: 'error',
            message: bucketError.message
          });
        } else {
          console.log(`Bucket ${bucket.name} created successfully:`, bucketData);
          results.push({
            bucket: bucket.name,
            status: 'created',
            message: 'Bucket created successfully'
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Storage setup completed",
        results: results
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
    console.error("Error in setup-storage function:", error);
    
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
