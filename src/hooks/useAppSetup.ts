
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useAppSetup = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupApp = async () => {
      try {
        console.log('Setting up application...');
        
        // Call the setup-storage function to ensure storage is configured
        const { data, error } = await supabase.functions.invoke('setup-storage');
        
        if (error) {
          console.error('Setup error:', error);
          toast({
            title: "Setup Warning",
            description: "Some features may not work properly. Please refresh the page.",
            variant: "destructive",
          });
        } else {
          console.log('App setup completed successfully:', data);
        }
        
        setIsSetupComplete(true);
      } catch (error) {
        console.error('App setup failed:', error);
        setIsSetupComplete(true); // Continue anyway
      } finally {
        setIsLoading(false);
      }
    };

    setupApp();
  }, []);

  return { isSetupComplete, isLoading };
};
