import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface PasswordResetResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const sendPasswordResetCode = async (email: string): Promise<PasswordResetResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-password-reset', {
      body: { email }
    });

    if (error) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset code');
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Failed to send password reset code');
    }

    toast({
      title: "Code Sent",
      description: "A 6-digit verification code has been sent to your email address.",
    });

    return {
      success: true,
      message: "Verification code sent successfully"
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });

    return {
      success: false,
      message: errorMessage,
      error: errorMessage
    };
  }
};

export const verifyResetCode = async (
  email: string, 
  code: string, 
  newPassword?: string
): Promise<PasswordResetResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('verify-reset-code', {
      body: { email, code, newPassword }
    });

    if (error) {
      console.error('Code verification error:', error);
      throw new Error(error.message || 'Failed to verify code');
    }

    if (!data?.success) {
      throw new Error(data?.error || 'Invalid or expired verification code');
    }

    if (newPassword) {
      toast({
        title: "Password Reset",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
    } else {
      toast({
        title: "Code Verified",
        description: "Verification code is valid. You can now set your new password.",
      });
    }

    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });

    return {
      success: false,
      message: errorMessage,
      error: errorMessage
    };
  }
};

export const validateVerificationCode = (code: string): { valid: boolean; message?: string } => {
  if (!code || code.length !== 6) {
    return { valid: false, message: "Verification code must be 6 digits" };
  }
  
  if (!/^\d{6}$/.test(code)) {
    return { valid: false, message: "Verification code must contain only numbers" };
  }
  
  return { valid: true };
};

export const validatePasswordReset = (password: string, confirmPassword: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long" };
  }
  
  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  
  return { valid: true };
};