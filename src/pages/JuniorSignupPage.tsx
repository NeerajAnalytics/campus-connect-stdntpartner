
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Footer from "../components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const JuniorSignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !name || !password || !confirmPassword || !gender) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Clean up email - trim spaces and convert to lowercase
      const cleanEmail = email.trim().toLowerCase();
      await signUp(cleanEmail, password, name, gender);
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
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                G-Mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium">
                Enter Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block font-medium">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded h-12 px-3"
                disabled={isLoading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Button 
              type="submit"
              className="w-full block text-center bg-[#7d9bd2] text-black py-2.5 px-4 rounded-full hover:bg-[#6b89c0] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </Button>

            <div className="text-center pt-2">
              <span className="text-sm">
                Already have an Account?{" "}
                <Link to="/junior-login" className="text-[#5c7bb5]">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JuniorSignupPage;
