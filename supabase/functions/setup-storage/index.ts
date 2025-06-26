
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    
    if (!supabaseServiceRoleKey || !supabaseUrl) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Create reports bucket if it doesn't exist
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      throw bucketsError;
    }

    const reportsBucketExists = buckets?.some(bucket => bucket.name === 'reports');
    
    if (!reportsBucketExists) {
      const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('reports', {
        public: true,
        allowedMimeTypes: ['application/pdf'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (bucketError) {
        console.error('Error creating bucket:', bucketError);
        throw bucketError;
      }

      console.log('Reports bucket created successfully:', bucketData);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Storage setup completed successfully' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in setup-storage function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
