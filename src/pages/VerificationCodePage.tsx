
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import Footer from "../components/layout/Footer";
import { toast } from "@/components/ui/use-toast";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

const VerificationCodePage: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

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
      // In a real app, we would verify the code with a backend API
      // For this example, we'll verify against our simulated code in sessionStorage
      const storedCode = sessionStorage.getItem(`vcode_${email}`);
      
      if (!storedCode || storedCode !== verificationCode) {
        throw new Error("Invalid verification code. Please try again.");
      }
      
      // Clear the verification code from sessionStorage
      sessionStorage.removeItem(`vcode_${email}`);
      
      // Redirect to the reset password page
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
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
    
    try {
      // Generate a new verification code
      const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem(`vcode_${email}`, newVerificationCode);
      
      // In a real app, this code would be sent via email
      console.log("New verification code for testing:", newVerificationCode);

      toast({
        title: "Code resent",
        description: "A new verification code has been generated (check console)",
      });
    } catch (error: any) {
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
            <p className="mt-2 text-sm text-gray-500 italic">
              (Check your console for the code in this demo)
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
                className="text-sm text-[#5c7bb5] hover:underline"
              >
                Didn't receive a code? Resend
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
