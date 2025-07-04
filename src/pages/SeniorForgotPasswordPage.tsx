
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Footer from "../components/layout/Footer";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SeniorForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate a 6-digit code for verification
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store code with timestamp for expiration
      const codeData = {
        code: verificationCode,
        timestamp: Date.now(),
        email: email
      };
      sessionStorage.setItem(`vcode_${email}`, JSON.stringify(codeData));
      
      console.log("Sending verification code to:", email);
      console.log("Generated code:", verificationCode);
      
      // Send the code via email using our edge function
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-password-reset', {
        body: { 
          email,
          code: verificationCode
        }
      });

      console.log("Email function response:", emailData);
      console.log("Email function error:", emailError);

      if (emailError) {
        console.error("Email sending error:", emailError);
        throw new Error(`Failed to send email: ${emailError.message}`);
      }

      // Check if the response indicates success or failure
      if (emailData && emailData.success === false) {
        throw new Error(emailData.error || "Failed to send verification code");
      }

      toast({
        title: "Verification code sent",
        description: "Please check your email for the 6-digit verification code.",
      });
      
      // Navigate to the verification code page
      navigate(`/senior-verification-code?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error("Password reset error:", error);
      
      // More specific error messages
      let errorMessage = "Failed to send verification code. Please try again.";
      
      if (error.message.includes("No account found")) {
        errorMessage = "No account found with this email address. Please check your email or sign up for a new account.";
      } else if (error.message.includes("RESEND_API_KEY")) {
        errorMessage = "Email service configuration error. Please contact support.";
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.message.includes("invalid") || error.message.includes("email")) {
        errorMessage = "Please enter a valid email address.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            <h1 className="text-2xl font-semibold text-gray-900">Forgot Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your registered email to receive a verification code
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                placeholder="Enter your registered email"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full block text-center bg-[#7d9bd2] text-black py-2.5 px-4 rounded-full hover:bg-[#6b89c0] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/senior-login"
                className="text-sm text-[#5c7bb5] hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorForgotPasswordPage;
