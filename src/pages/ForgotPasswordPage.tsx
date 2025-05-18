
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Footer from "../components/layout/Footer";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ForgotPasswordPage: React.FC = () => {
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
      // Check if the user exists by trying to sign in with OTP
      // This will not actually sign in the user, but will verify if the email exists
      const { data: userExists, error: userCheckError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Don't create a user if they don't exist
        },
      });
      
      if (userCheckError && userCheckError.message.includes("does not exist")) {
        toast({
          title: "User not found",
          description: "No account exists with this email address",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Generate a 6-digit code and store it in sessionStorage
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem(`vcode_${email}`, verificationCode);
      
      // In a real app, this code would be sent via email
      console.log("Verification code for testing:", verificationCode);
      
      // Navigate to the verification code page
      navigate(`/verification-code?email=${encodeURIComponent(email)}`);
      
      toast({
        title: "Verification code generated",
        description: "Check console for the verification code (this simulates an email)",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
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
              Enter your email to receive a verification code
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
                placeholder="Enter your email"
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
                to="/junior-login"
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

export default ForgotPasswordPage;
