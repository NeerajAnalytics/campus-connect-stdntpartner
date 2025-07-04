
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import Footer from "../components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

const VerificationCodePage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const storedCodeData = sessionStorage.getItem(`vcode_${email}`);
      
      if (!storedCodeData) {
        throw new Error("No verification code found. Please request a new code.");
      }

      const { code: storedCode, timestamp } = JSON.parse(storedCodeData);
      
      // Check if code is expired (10 minutes = 600000 ms)
      const isExpired = Date.now() - timestamp > 600000;
      if (isExpired) {
        sessionStorage.removeItem(`vcode_${email}`);
        throw new Error("Verification code has expired. Please request a new code.");
      }
      
      if (storedCode !== verificationCode) {
        throw new Error("Invalid verification code. Please try again.");
      }
      
      // Code is valid, clean up and proceed
      sessionStorage.removeItem(`vcode_${email}`);
      
      toast({
        title: "Code verified",
        description: "Redirecting to password reset page...",
      });
      
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to verify code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    
    if (countdown > 0) {
      toast({
        title: "Please wait",
        description: `You can request a new code in ${countdown} seconds.`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const codeData = {
        code: newVerificationCode,
        timestamp: Date.now(),
        email: email
      };
      sessionStorage.setItem(`vcode_${email}`, JSON.stringify(codeData));
      
      console.log("Resending verification code to:", email);
      
      // Send new code via email
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-password-reset', {
        body: { 
          email,
          code: newVerificationCode
        }
      });

      if (emailError) {
        throw new Error(`Failed to send email: ${emailError.message}`);
      }

      if (emailData && emailData.success === false) {
        throw new Error(emailData.error || "Failed to resend verification code");
      }
      
      setCountdown(60);
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email",
      });
    } catch (error: any) {
      console.error("Resend error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to resend code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold">
            CampusConnect
          </Link>
          <div className="w-[50px]"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Verification Code</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter the 6-digit code sent to {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                className="mx-auto"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full block text-center bg-[#7d9bd2] text-black py-2.5 px-4 rounded-full hover:bg-[#6b89c0] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center mt-4 space-y-2">
              <button
                type="button"
                onClick={handleResendCode}
                className={`text-sm ${countdown > 0 ? 'text-gray-400' : 'text-[#5c7bb5] hover:underline'}`}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Resend code in ${countdown}s` : "Didn't receive a code? Resend"}
              </button>
              <div>
                <Link
                  to="/junior-login"
                  className="text-sm text-[#5c7bb5] hover:underline block mt-2"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerificationCodePage;
